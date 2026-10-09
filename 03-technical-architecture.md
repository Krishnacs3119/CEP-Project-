# PlantInfo v2 — Technical Architecture

## 1. Recommended stack (and why)

| Layer | Choice | Why |
|-------|--------|-----|
| Framework | **Next.js 15 (App Router) + TypeScript** | Server routes keep the LLM API key secret, SSR/SEO for plant pages, easy admin routes, one codebase |
| Styling | **Tailwind CSS** + CSS variables for tokens | Fast to match the v1 UI, easy responsive work |
| Animation | **Framer Motion** (+ CSS transitions) | Page transitions, layout animation, modals, scroll reveals |
| Database / Auth / Storage | **Supabase** (Postgres + Auth + Storage) | Free tier, SQL search, row-level security, image storage, admin login built in |
| AI chat | **LLM API called from a Next.js route handler**, streamed | Provider is swappable via env vars; default Claude via the Anthropic API |
| QR codes | `qrcode` npm package | Generate PNG/SVG server- or client-side |
| Validation | `zod` | Validate forms and API input |
| Rate limiting | Upstash Redis `@upstash/ratelimit` (or a Supabase table) | Protect the chat endpoint from abuse and cost spikes |
| Hosting | **Vercel** (or Netlify, which also runs Next.js) | Simple deploys, preview URLs |
| Testing | Vitest (unit), Playwright (e2e) | Covers search, admin flow, chat |

**Alternative if you want to stay closer to v1:** React + Vite + Netlify Functions for the chat endpoint. It works, but you would build routing, SEO, and admin protection yourself. Next.js is the better fit for this feature set.

## 2. High-level architecture

```
Browser (Next.js pages, Framer Motion)
   │
   ├── Public pages (SSR/ISR): /, /about, /service, /contact, /statistics, /plants/[slug]
   ├── Admin pages (auth required): /admin/*
   │
   ├── Route handlers
   │     ├── GET  /api/plants           → list/search/paginate
   │     ├── GET  /api/plants/random    → one random plant
   │     ├── GET  /api/stats            → counters
   │     ├── GET  /api/quotes           → quotes
   │     └── POST /api/chat             → streamed LLM answer (rate limited)
   │
   └── Supabase (Postgres + Auth + Storage)   LLM provider API
```

The browser never sees the LLM API key or the Supabase service-role key.

## 3. Project structure

```
plantinfo/
├─ app/
│  ├─ (public)/
│  │  ├─ page.tsx                 # Home
│  │  ├─ about/page.tsx
│  │  ├─ service/page.tsx
│  │  ├─ contact/page.tsx
│  │  ├─ statistics/page.tsx
│  │  └─ plants/[slug]/page.tsx   # QR target
│  ├─ admin/
│  │  ├─ login/page.tsx
│  │  ├─ page.tsx                 # dashboard
│  │  ├─ plants/(list|new|[id])/page.tsx
│  │  ├─ categories/page.tsx
│  │  ├─ quotes/page.tsx
│  │  └─ settings/page.tsx
│  ├─ api/
│  │  ├─ plants/route.ts
│  │  ├─ plants/random/route.ts
│  │  ├─ stats/route.ts
│  │  ├─ quotes/route.ts
│  │  └─ chat/route.ts
│  ├─ layout.tsx                  # header, footer, chat widget, page transitions
│  └─ globals.css                 # design tokens
├─ components/
│  ├─ ui/ (Button, Modal, Skeleton, Toast, Counter)
│  ├─ PlantCard.tsx, PlantModal.tsx, PlantList.tsx, SearchBar.tsx
│  ├─ QuotesModal.tsx, Navbar.tsx, Footer.tsx
│  ├─ chat/ (ChatWidget, ChatPanel, MessageBubble, SuggestedPrompts)
│  └─ admin/ (PlantForm, PlantTable, QrDownload)
├─ lib/
│  ├─ supabase/ (server.ts, client.ts, middleware.ts)
│  ├─ llm.ts                      # provider wrapper
│  ├─ prompts.ts                  # chatbot system prompt
│  ├─ ratelimit.ts
│  ├─ qr.ts
│  └─ validators.ts               # zod schemas
├─ public/images/                 # background, logo, icons from v1
├─ supabase/migrations/           # SQL below
├─ middleware.ts                  # protects /admin
└─ tests/
```

## 4. Data model (Postgres)

```sql
create extension if not exists pg_trgm;

create table categories (
  id uuid primary key default gen_random_uuid(),
  name text unique not null,
  created_at timestamptz default now()
);

create table plants (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  common_name text not null,
  scientific_name text not null,
  category_id uuid references categories(id) on delete set null,
  description text,
  lifespan text,                 -- e.g. "50-100 years" (free text; keep flexible)
  height text,                   -- e.g. "15-20 m"
  oxygen_level text,             -- e.g. "High" (v1 field name)
  care_instructions text,
  image_url text,
  is_published boolean default true,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index plants_common_trgm on plants using gin (common_name gin_trgm_ops);
create index plants_sci_trgm on plants using gin (scientific_name gin_trgm_ops);
create index plants_category_idx on plants (category_id);

create table quotes (
  id uuid primary key default gen_random_uuid(),
  text text not null,
  author text not null,
  created_at timestamptz default now()
);

create table site_settings (       -- single row (id = 1)
  id int primary key default 1,
  contact_person text,
  phone text,
  address text,
  working_hours text,
  map_query text,
  footer_credit text,
  target_plant_count int default 100,   -- denominator for "% coverage"
  check (id = 1)
);

create table admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);
```

**Statistics queries**
- Total plant records: `select count(*) from plants where is_published`
- Unique species: `select count(distinct lower(scientific_name)) from plants where is_published`
- Categories: `select count(*) from categories` (or categories that have plants)
- % coverage: `round(100.0 * total / target_plant_count)` — v1's formula is unknown, so this is a proposed definition; confirm with the owner.

**Row-level security (summary)**
- `plants`, `categories`, `quotes`, `site_settings`: public `select` (plants only where `is_published`).
- Insert/update/delete: only when `auth.uid()` exists in `admins`.
- Storage bucket `plant-images`: public read, admin-only write.

## 5. API contracts

### `GET /api/plants`
Query: `q` (search), `category`, `page` (default 1), `limit` (default 24, max 60), `sort` (`name`|`newest`).
Response:
```json
{ "items": [ { "id": "...", "slug": "neem", "commonName": "Neem", "scientificName": "Azadirachta indica", "category": "Tree", "imageUrl": "..." } ],
  "page": 1, "limit": 24, "total": 132 }
```
Search: `common_name ilike %q% or scientific_name ilike %q%` (trigram-indexed), ordered by similarity.

### `GET /api/plants/random` → one full plant object (avoid returning the same one twice in a row with an optional `exclude` param).

### `GET /api/stats` → `{ totalPlants, uniqueSpecies, categories, coveragePercent }` (cached 60 s).

### `GET /api/quotes` → `[ { text, author } ]`.

### `POST /api/chat`
Request: `{ "messages": [ { "role": "user"|"assistant", "content": "..." } ] }` (last 10 messages max, each ≤ 1,000 chars).
Response: streamed text (SSE or fetch streaming). Errors: `429` (rate limit), `400` (invalid), `503` (LLM unavailable).
See the chatbot spec for prompts and limits.

## 6. Admin and authentication

- Supabase Auth, email + password (or magic link). Only users listed in `admins` can write.
- `middleware.ts` redirects unauthenticated requests for `/admin/*` to `/admin/login`.
- Server actions or route handlers re-check admin status on every write (never trust the client).
- Create the first admin manually: sign up in Supabase, then insert the user's id into `admins`.

## 7. QR code identification

- Each plant URL: `https://<site>/plants/<slug>`. QR encodes only this URL.
- Admin plant row has **Download QR** (PNG and SVG), generated with `qrcode` at 1024 px, error-correction level `M`.
- Optional: printable sheet page `/admin/qr-sheet` that lays out selected plants' QR codes with names, 3 × 4 per A4 page.
- Slugs must stay stable after creation, so changing a plant's name should not change its slug unless the admin confirms (old printed QRs would break).

## 8. Environment variables

```
NEXT_PUBLIC_SITE_URL=
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=      # server only
LLM_API_KEY=                    # server only
LLM_MODEL=                      # e.g. claude-haiku-4-5-20251001 (fast/cheap) or claude-sonnet-5
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```
Ship a `.env.example`; never commit real keys.

## 9. Performance and caching

- ISR for public pages (`revalidate` 60 s) plus on-demand revalidation when admin saves a plant.
- `next/image` with Supabase storage domain allow-listed; upload resize to max 1600 px on the client before upload.
- List pagination at the API level; never fetch all plants at once.
- Debounce search input by 250 ms; cancel in-flight requests.

## 10. Security checklist

- RLS enabled on every table; test with an anonymous client.
- Validate all inputs with zod (server side).
- Sanitize rendered text (no `dangerouslySetInnerHTML` for plant/admin content).
- Rate limit `/api/chat` (see chatbot spec); cap message length and history.
- Upload restrictions: images only, ≤ 5 MB.
- Security headers (CSP, `X-Content-Type-Options`, `Referrer-Policy`).
- Do not log secrets or full chat transcripts.

## 11. Deployment

1. Create Supabase project → run migrations → create storage bucket → add first admin.
2. Push repo to GitHub → import into Vercel (or Netlify) → set env vars.
3. Set the production `NEXT_PUBLIC_SITE_URL` **before** printing any QR codes.
4. Run Lighthouse and the e2e suite against the preview URL before going live.

# PlantInfo v2 — Build Plan, Phased Prompts, and Test Checklist

## 0. Before you start

1. Create an empty project folder and open it in Antigravity.
2. Put these docs in `/docs` inside the project (`01-PRD.md`, `02-UI-UX-and-animation.md`, `03-technical-architecture.md`, `04-ai-chatbot-spec.md`, this file).
3. Collect from v1: screenshots of every page (desktop and mobile) and the images (`background.jpg`, `logoheade.jpg`, `logo.jpg`, `mission1-3.png`, `scanner.jpg`). Put images in `/reference/` and screenshots in `/reference/screens/`. **This is what makes the UI match exactly.**
4. Create accounts/keys: Supabase project, an LLM API key, (optional) Upstash Redis.

## 1. How to use Antigravity for this

Give the agent **one phase at a time** (below), not the whole project in one go. After each phase: run the app, compare with screenshots, fix, then move on. Ask the agent to summarize what it changed and to list anything it assumed.

Working rules to paste at the start of every phase:

```
Read /docs first and follow it. Do not invent requirements. If something is ambiguous or marked [TO CONFIRM], look at /reference/screens and match it; if still unclear, ask me before proceeding. Keep changes scoped to this phase. Never put API keys in client code or commit secrets. After finishing, run the app and any tests, and give me a short summary plus a list of assumptions.
```

## 2. Phased prompts

### Phase 1 — Scaffold and static pages (Milestone M1)

```
Create a Next.js (App Router) + TypeScript + Tailwind project named plantinfo. Add Framer Motion. Implement design tokens from /docs/02-UI-UX-and-animation.md in globals.css and the Tailwind config, using the real colors and fonts from /reference/screens where visible.

Build the shared Navbar (Home, About, Services, Contact Us, Statistics; sticky; mobile drawer), Footer, and the pages: Home (hero only for now), About, Services, Contact, Statistics. Copy the v1 text from the PRD/UI doc. Contact details and footer credit must come from a config object with placeholder values, not hard-coded personal data. Counters can use placeholder numbers for now.

Match the layout of the screenshots in /reference/screens as closely as possible. Make it responsive from 360px up. Do not add animation yet except hover states.
```

### Phase 2 — Database and plant features (M2)

```
Set up Supabase per /docs/03-technical-architecture.md: write migrations for categories, plants, quotes, site_settings, admins, with RLS and indexes. Add lib/supabase clients and a .env.example.

Implement GET /api/plants (search, category filter, pagination), GET /api/plants/random, GET /api/stats, GET /api/quotes. Build on the Home page: Search, List of Plants modal, plant detail view, New One (random), Favorite Quotes modal. Add /plants/[slug]. Wire the About and Statistics counters to /api/stats. Add skeleton loading, empty, and error states. Seed 10 sample plants and 10 quotes for development only (clearly marked as sample data).
```

### Phase 3 — Admin panel and QR (M3)

```
Build /admin per the docs: Supabase Auth login, middleware protecting /admin, dashboard, Plants CRUD with image upload (client-side resize, 5MB limit, images only), Categories, Quotes, Settings (contact info, footer credit, target plant count). Re-check admin status on every write server-side. Add QR download (PNG and SVG) for each plant using the qrcode package, pointing to NEXT_PUBLIC_SITE_URL/plants/<slug>, plus an optional printable QR sheet. Keep slugs stable on edit unless the admin confirms. Validate everything with zod.
```

### Phase 4 — AI chatbot (M4)

```
Implement the chatbot exactly as in /docs/04-ai-chatbot-spec.md: floating ChatWidget on all pages, ChatPanel with suggested prompts, streaming responses, markdown rendering (safe), clear/stop buttons, disclaimer, error and rate-limit states. Create POST /api/chat with zod validation, the system prompt from the spec in lib/prompts.ts, model read from LLM_MODEL, streaming, rate limiting (20 per 10 min, 100 per day per client), and no transcript storage. Add an "Ask about this plant" button on plant pages that opens the chat with a prefilled question. Include the test prompts from section 7 as an automated or manual checklist.
```

### Phase 5 — Animation, accessibility, performance (M5)

```
Add all animations from section 6 of /docs/02-UI-UX-and-animation.md: page transitions, hero entrance, scroll reveals, counters, modal motion, card hovers, layout animation for search results, quote transitions, chat animations, skeleton shimmer. Respect prefers-reduced-motion. Animate only transform/opacity. Then run an accessibility pass (keyboard, focus traps, aria-live in chat, contrast) and a performance pass (next/image, lazy loading, Lighthouse Performance >= 90 on mobile). Fix issues you find and report before/after scores.
```

### Phase 6 — Test and deploy

```
Write Playwright e2e tests for: search, list modal, random plant, quotes modal, plant page from a QR URL, admin login and add/edit/delete plant, unauthorized access to /admin, chat happy path (mocked LLM), chat rate limit. Write Vitest tests for validators and the stats calculation. Then prepare deployment: README with setup steps, env var table, Supabase setup, first-admin instructions, and deploy to Vercel or Netlify.
```

## 3. Definition of done (per milestone)

| Milestone | Done when |
|-----------|-----------|
| M1 | All five pages exist, match the screenshots within reason, responsive at 360 / 768 / 1280 |
| M2 | Search, list, detail, random, quotes work against real database data; counters match the DB |
| M3 | Admin can add a plant with an image and download its QR; anonymous users can't write |
| M4 | Chat streams answers, refuses off-topic, rate limits work, key is not in the browser bundle |
| M5 | Animations match the spec, reduced motion respected, Lighthouse Performance ≥ 90, no a11y blockers |
| Launch | e2e suite passes, production env vars set, real site URL configured, QR codes tested on a phone |

## 4. Manual test checklist

**Home / core**
- [ ] Nav links and order match v1; active state correct
- [ ] Search finds by common and scientific name; empty state shows
- [ ] List of Plants opens/closes (×, Esc, backdrop); selecting a plant shows details
- [ ] New One shows a different plant most of the time
- [ ] Favorite Quotes opens, rotates, closes

**Pages**
- [ ] About and Statistics counters equal database counts
- [ ] Services text and three cards correct
- [ ] Contact info comes from settings; map loads

**Plants and QR**
- [ ] `/plants/<slug>` loads directly and has correct title/meta
- [ ] Printed or on-screen QR scanned with a phone opens the same page
- [ ] Editing a plant name does not silently change its slug

**Admin**
- [ ] `/admin` redirects to login when signed out
- [ ] Signed-in non-admin user cannot write (test with a second account)
- [ ] Image over 5 MB or non-image is rejected
- [ ] Deleting asks for confirmation

**Chatbot**
- [ ] All test prompts in the chatbot spec behave as listed
- [ ] API key not visible in browser network tab or source
- [ ] Rate limit triggers and recovers

**Quality**
- [ ] Works in Chrome, Safari, Edge, Firefox; iOS Safari and Android Chrome
- [ ] Keyboard-only run-through of home, modals, chat, admin form
- [ ] Reduced-motion mode shows no large movement
- [ ] Lighthouse mobile: Performance ≥ 90, Accessibility ≥ 95, SEO ≥ 90

## 5. Risks and mitigations

| Risk | Mitigation |
|------|------------|
| UI doesn't match v1 exactly | Provide screenshots; ask the agent to compare screenshot vs. render each phase |
| LLM gives wrong plant facts or safety advice | Disclaimer, uncertainty rule, safety rules in the system prompt, no dosages |
| Chat cost spikes | Rate limits, token caps, daily budget alert |
| Broken printed QR codes after a domain change | Set the production domain first; keep slugs stable; consider a custom domain you control |
| Personal data in the codebase | Contact details only in admin settings, `.env.example` only with placeholders |
| Heavy animation hurts phones | Transform/opacity only, disable decorative effects on mobile, test on a real mid-range phone |

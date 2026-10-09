# PlantInfo v2 — Start Here

## Reading order

| File | What it is |
|------|------------|
| `01-PRD.md` | What we're building, features, acceptance criteria |
| `02-UI-UX-and-animation.md` | Design tokens, pages, components, full animation spec |
| `03-technical-architecture.md` | Stack, data model (SQL), APIs, admin, QR, security, deploy |
| `04-ai-chatbot-spec.md` | Chatbot behavior, system prompt, limits, test prompts |
| `05-build-plan-and-test-checklist.md` | Phased prompts, milestones, test checklist |

## What to prepare first

1. Put all five docs in `/docs` of your project.
2. Put screenshots of every v1 page (desktop + mobile) in `/reference/screens/` and the v1 images in `/reference/`.
3. Keep Supabase and LLM API keys ready (you'll add them to `.env.local`, never in chat or code).

## Master prompt (paste this into Antigravity first)

```
You are building "PlantInfo v2", a recreation of my existing site https://guileless-kashata-e37be7.netlify.app/ (a garden-based plant encyclopedia) with the SAME functions and SAME UI, plus (1) rich animations and (2) an AI chatbot that answers questions about any plant, and (3) an admin panel where I add plants myself.

Source of truth: the docs in /docs (PRD, UI/UX and animation spec, technical architecture, chatbot spec, build plan). Visual source of truth: screenshots and images in /reference. Read all of them before writing any code.

Existing v1 features to preserve: navbar (Home, About, Services, Contact Us, Statistics); Home with the heading "Welcome to Garden based plant encyclopedia", a Search box, a "List of Plants" modal, plant image and details, a "New One" (random plant) button, and a "Favorite Quotes" modal; About page with mission cards and statistics counters; Services page (Plant Information, QR Identification, Nursery Support); Contact page with address, hours and embedded map; Statistics page with four counters.

Stack: Next.js (App Router) + TypeScript + Tailwind + Framer Motion + Supabase (Postgres, Auth, Storage) + an LLM API called only from a server route with streaming.

How we'll work: we build in phases from /docs/05-build-plan-and-test-checklist.md. Start with Phase 1 only. Before coding, give me a short plan and list any questions or assumptions. Ask me when something is ambiguous instead of guessing. After each phase, run the app, compare with /reference/screens, summarize changes, and wait for my go-ahead.

Non-negotiables: match the v1 UI; no hard-coded personal contact data (use settings/config with placeholders); no secrets in client code or the repo; respect prefers-reduced-motion; accessible and responsive from 360px; chatbot must stay on plant topics and never expose the API key.
```

## Notes

- If Antigravity produces something that doesn't match the look of v1, paste the screenshot into the chat and say: *"Match this exactly: fix spacing, colors, fonts, and layout. List what you changed."*
- Keep the docs updated: when you decide something new (colors, fields, copy), edit the doc and tell the agent to re-read it.

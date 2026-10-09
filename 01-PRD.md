# PlantInfo v2 — Product Requirements Document (PRD)

**Status:** Draft v1 · **Reference site:** https://guileless-kashata-e37be7.netlify.app/ (the "v1 site")

---

## 1. Summary

PlantInfo is a garden / campus plant encyclopedia. v1 is a static multi-page site with a plant list, search, a random-plant button, a favorite-quotes modal, and info pages. **v2 recreates every v1 function and its UI, adds motion and animation throughout, adds an AI chatbot that answers questions about any plant, and adds an admin panel so the owner can add unlimited plants.**

## 2. Goals

| # | Goal | Measure |
|---|------|---------|
| G1 | Feature parity with v1 | Every item in section 5 (P0) works |
| G2 | Visual parity with v1 | Side-by-side screenshot review passes (layout, palette, typography match) |
| G3 | Polished, performant motion | 60 fps on a mid-range phone, Lighthouse Performance ≥ 90 |
| G4 | Helpful AI plant assistant | Answers plant questions in < 3 s to first token; refuses off-topic |
| G5 | Scale to n plants | Search and list stay fast at 10,000 plant records |
| G6 | Owner can manage data without code | Add / edit / delete a plant in < 1 minute via admin panel |

## 3. Non-goals (v2)

- User accounts for the public (only the owner/admin logs in)
- E-commerce, payments, plant marketplace
- Photo-based plant identification (possible later)
- Native mobile apps (site is responsive/PWA-friendly instead)

## 4. Users and personas

1. **Visitor / student (primary):** browses plants, searches, scans a QR on a real plant, asks the chatbot questions.
2. **Plant enthusiast:** wants care tips and facts, uses the chatbot heavily.
3. **Admin / nursery or campus staff:** adds plants, uploads images, prints QR codes, checks statistics.

## 5. Features

### P0 — Parity with v1 (must have)

| ID | Feature | Behavior |
|----|---------|----------|
| F1 | Home page | Full-bleed background image, logo, nav bar, welcome heading, action buttons |
| F2 | Navigation | Home · About · Services · Contact Us · Statistics (same order), sticky, mobile menu |
| F3 | List of Plants | Button opens a modal/panel listing all plants; click a plant to view its details |
| F4 | Search | Search box filters plants by name (common + scientific); shows results and a "no match" state |
| F5 | Plant detail view | Image, common name, scientific name, lifespan, oxygen level, height, care instructions |
| F6 | "New One" button | Shows a random plant |
| F7 | Favorite Quotes modal | Shows a plant-related quote with author (v1 example: Terri Guillemets, "Plants give us oxygen for the lungs and for the soul."). Rotates through several quotes; Close button |
| F8 | About page | Mission text, three mission cards (Inspire Learning, Advance Research, Promote Conservation), Key Plant Statistics counters |
| F9 | Services page | Three cards: Plant Information, QR Identification, Nursery Support |
| F10 | Contact page | Contact person, address, working hours, embedded map. **All values come from a config file / admin setting, not hard-coded** |
| F11 | Statistics page | Four counters: total plant records, unique species, plant categories, % coverage. **Computed from the database, not hard-coded** |
| F12 | QR identification | Every plant has a unique URL and a downloadable QR code; scanning opens that plant's detail page |
| F13 | Footer | Copyright and credit line (editable) |

### P1 — New in v2 (must have for launch)

| ID | Feature | Behavior |
|----|---------|----------|
| N1 | Animations | Page transitions, scroll reveals, animated counters, modal motion, hover effects, loading skeletons (see UI/UX doc) |
| N2 | AI chatbot | Floating chat button on every page opens a chat panel; user asks about any plant; streamed answers; suggested prompts; plant-only scope (see chatbot spec) |
| N3 | Admin panel | Login-protected. CRUD for plants, image upload, category management, QR download, quotes management, site settings (contact info) |
| N4 | Scalable plant browsing | Plant list uses pagination or infinite scroll, category filter, sort; search is debounced and server-side |
| N5 | Dedicated plant pages | `/plants/[slug]` for shareable, SEO-friendly URLs (this is what QR codes point to) |

### P2 — Later

- Bookmark/favorite plants (local storage)
- Dark mode
- Multi-language (English + Hindi)
- Photo-based plant identification
- Chatbot handing off to a plant page ("Open full page") when a matching plant exists in the database

## 6. User stories (samples)

- As a visitor, I click **List of Plants**, see plants load smoothly, and open one to read its care instructions.
- As a visitor, I scan the QR on a tree and land directly on its page.
- As a visitor, I ask the chatbot "Which plants are safe for cats?" and get a streamed, clearly-worded answer.
- As an admin, I sign in, click **Add plant**, fill the form, upload a photo, and see the plant appear on the site immediately.
- As an admin, I download a plant's QR as PNG/SVG to print on a tag.

## 7. Acceptance criteria (highlights)

1. All v1 nav links exist with the same labels and order.
2. Search returns matching plants within 300 ms (perceived) and handles empty results gracefully.
3. Statistics and About counters equal the real database counts and animate from 0 when scrolled into view.
4. Scanning a plant QR opens the correct plant page on a phone.
5. Chatbot politely declines non-plant questions, never exposes the API key, and is rate-limited.
6. Admin routes are inaccessible without login (verified by direct URL access).
7. Respects `prefers-reduced-motion` (animations minimized).
8. Works on latest Chrome, Safari, Edge, Firefox; widths 360 px to 1920 px.

## 8. Non-functional requirements

- **Performance:** LCP < 2.5 s on 4G; images lazy-loaded and optimized (WebP/AVIF).
- **Accessibility:** WCAG 2.1 AA — keyboard navigation, focus traps in modals, alt text, color contrast.
- **Security:** API keys server-side only; admin auth; input validation; chat rate limiting; no secrets in client bundle.
- **SEO:** Proper titles/meta, Open Graph tags, sitemap including plant pages.
- **Privacy:** Do not log chat content with personal data; no tracking beyond basic analytics.

## 9. Assumptions and open items

- The v1 site's exact colors, fonts, and spacing must be confirmed from screenshots (see UI/UX doc, "TO CONFIRM" tags).
- Contact details in v1 belong to a real person. **Use placeholders in the repo and let the owner enter real values in the admin settings.**
- Chatbot uses the LLM's general plant knowledge (owner's choice). Answers can be wrong, so the UI shows a short "AI can make mistakes; verify before handling or eating any plant" note.
- Plant data is entered by the owner through the admin panel (no bulk dataset initially). A CSV import is a nice-to-have.

## 10. Release plan

| Milestone | Scope |
|-----------|-------|
| M1 | Design tokens + static pages matching v1 (Home, About, Services, Contact, Statistics) |
| M2 | Database, plant list/search/detail, random plant, quotes |
| M3 | Admin panel + image upload + QR generation |
| M4 | AI chatbot |
| M5 | Animation polish, accessibility, performance pass, deploy |

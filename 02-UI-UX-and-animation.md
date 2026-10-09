# PlantInfo v2 — UI/UX and Animation Spec

> **Important:** This spec is written from the *text structure* of the v1 site. Anything tagged **[TO CONFIRM]** must be checked against screenshots of v1 and overwritten with the real value (colors, fonts, spacing, exact layouts). Until confirmed, use the defaults given.

---

## 1. Design principles

1. **Same layout, same feel as v1** — nature/garden theme, clean and readable.
2. **Motion with purpose** — animation guides attention; it never blocks content.
3. **Mobile first** — every screen designed at 360 px first.
4. **Accessible by default** — keyboard, screen reader, reduced motion.

## 2. Design tokens

| Token | Default value | Notes |
|-------|---------------|-------|
| `--color-primary` | `#2E7D32` (leaf green) | [TO CONFIRM] |
| `--color-primary-dark` | `#1B5E20` | [TO CONFIRM] |
| `--color-accent` | `#A5D6A7` | [TO CONFIRM] |
| `--color-bg` | `#F4FAF4` | [TO CONFIRM] |
| `--color-surface` | `#FFFFFF` | cards, modals |
| `--color-text` | `#1F2A1F` | body |
| `--color-muted` | `#5F6F5F` | secondary text |
| `--radius-card` | `16px` | [TO CONFIRM] |
| `--shadow-card` | `0 8px 24px rgba(0,0,0,.08)` | |
| Font (headings) | Use v1's font, else `Poppins` | [TO CONFIRM] |
| Font (body) | Use v1's font, else `Inter` | [TO CONFIRM] |
| Spacing scale | 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 px | |
| Breakpoints | 480 / 768 / 1024 / 1280 px | |

Assets from v1 to reuse: `background.jpg` (home background), `logoheade.jpg` (header logo), `logo.jpg` (list-of-plants button image), `mission1-3.png` (About icons), `scanner.jpg` (Services card). Download from the v1 site or replace with equivalent images.

## 3. Global components

### 3.1 Header / navbar
- Logo left, links right: **Home · About · Services · Contact Us · Statistics**.
- Sticky; background turns from transparent to solid + shadow after 40 px scroll.
- Active link has an animated underline.
- Under 768 px: hamburger opens a slide-in drawer.

### 3.2 Footer
- "© 2026 PlantInfo" plus a credit line (editable in admin settings; v1 uses a developer credit). Small, centered.

### 3.3 Buttons
- Primary (filled green), secondary (outline), icon button. Hover lift + subtle shadow; press scale 0.97; visible focus ring.

### 3.4 Modal
- Backdrop blur + dark overlay, centered card, × close button top-right, Esc and backdrop click close. Focus is trapped while open and returns to the trigger on close.

### 3.5 Plant card
- Image (4:3), common name, scientific name in italic, a small category chip. Whole card clickable.

### 3.6 Chat widget (new)
- Floating circular button bottom-right (leaf/chat icon). Opens a panel (380 × 560 px on desktop, full-screen sheet on mobile). Details in the chatbot spec.

## 4. Pages

### 4.1 Home `/`
Layout, top to bottom:
1. Full-viewport hero with background image and dark-green gradient overlay.
2. Heading: **"Welcome to Garden based plant encyclopedia"** (keep v1 wording; v1 wraps it in quotes).
3. **Search** input with search button (prominent, centered).
4. Action row: **List of Plants** (with the `logo.jpg` image), **New One** (random plant), **Favorite Quotes**.
5. Result area: search results grid or the selected plant's detail (image + fields).

Modals on home: List of Plants, Plant detail, Favorite Quotes.
**[TO CONFIRM]** exact positions of the buttons and whether the plant image and details appear inline or in a modal in v1.

### 4.2 About `/about`
- Title **About PlantInfo**, subtitle **Your Trusted Source for Plant Knowledge**.
- Two intro paragraphs (v1 text is about world-wide plant knowledge, accuracy, and community).
- **🌱 Our Mission:** three cards with icon: *Inspire Learning*, *Advance Research*, *Promote Conservation*, each with its one-line description.
- **📊 Key Plant Statistics:** three counters — Total Plants Documented, Unique Species Identified, Plant Categories Covered.

### 4.3 Services `/service`
- Title **Our Services**, subtitle **What We Offer**.
- Three image cards: **Plant Information**, **QR Identification**, **Nursery Support**, each with a one-to-two-sentence description (see v1 copy: scientific name, lifespan, oxygen level, height, care instructions; scanning QR codes; nursery tracking with digital records).

### 4.4 Contact `/contact`
- Title **Contact Us**, tagline **We would love to connect with you 🌿**.
- Left/top: contact person, phone, address, working hours (all from settings; **use placeholders in code**).
- Right/bottom: embedded Google Map (address from settings).

### 4.5 Statistics `/statistics`
- Title **📊 Plant Statistics**, subtitle **Overview of Our Campus Plant Biodiversity**.
- Four counters: Total Plant Records, Unique Species, Plant Categories, % Campus Coverage.
- **New:** optional bar/donut chart of plants per category (animated draw-in).

### 4.6 Plant page `/plants/[slug]` (new, QR target)
- Hero image, common + scientific name, fact grid (lifespan, height, oxygen level, category), care instructions, "Ask the AI about this plant" button that opens the chat with a prefilled prompt.

### 4.7 Admin `/admin` (new)
- Login screen, then sidebar: **Plants · Categories · Quotes · Settings**.
- Plants table: search, sort, pagination, Add / Edit / Delete, "Download QR".
- Add/Edit form: common name, scientific name, category, lifespan, height, oxygen level, care instructions, description, image upload with preview, live slug.
- Admin UI can be simpler than the public site but should share tokens.

## 5. UX states (every data view needs these)

| State | Behavior |
|-------|----------|
| Loading | Skeleton shimmer cards (not spinners) |
| Empty search | Friendly message "No plants match '…'. Try another name or ask the chatbot." with a button to open the chat |
| Error | Inline message with Retry button |
| Success (admin) | Toast, auto-dismiss in 3 s |

## 6. Animation spec

Use **Framer Motion** for React interactions and **CSS transitions** for simple hovers. Default easing `cubic-bezier(0.22, 1, 0.36, 1)`; durations 150–600 ms.

| Area | Animation | Duration / details |
|------|-----------|--------------------|
| Page load (home) | Heading fades up; buttons stagger in (80 ms apart); background slow zoom (scale 1 → 1.06 over 20 s, looping ease) | 600 ms |
| Route change | Cross-fade with 12 px vertical slide | 300 ms |
| Navbar | Background transition on scroll; underline slides between links | 250 ms |
| Scroll reveal | Sections and cards fade + rise 24 px when 20% visible, staggered per card, once only | 500 ms |
| Counters | Count from 0 to value with easeOut when scrolled into view | 1.6 s |
| Buttons | Hover lift (−2 px) + shadow; press scale 0.97 | 150 ms |
| Plant cards | Hover: image zooms 1.05, card lifts | 250 ms |
| Modal | Backdrop fades; card scales 0.95 → 1 with fade; exit reverses | 250 ms |
| List of Plants | Items stagger in (30 ms apart, first 12 only) | 400 ms |
| Search results | Layout animation when filtering (cards animate to new positions) | 300 ms |
| New One | Card flip or crossfade to the next plant | 500 ms |
| Favorite Quotes | Quote text fades; leaf icon gently sways | 400 ms |
| Chat button | Gentle pulse every 8 s until first opened | 1.2 s |
| Chat panel | Slides up from the button with scale + fade | 300 ms |
| Chat messages | Message bubble fade + rise; typing indicator with three bouncing dots; streamed text appears progressively | 200 ms |
| Skeletons | Shimmer gradient loop | 1.4 s |
| Decorative | Optional floating leaves in the hero, low opacity, slow drift (disable on mobile and reduced motion) | 12–20 s |

**Rules**
- Animate only `transform` and `opacity` where possible.
- Respect `prefers-reduced-motion: reduce` — replace movement with simple fades or no animation, and show final counter values instantly.
- No animation may delay access to content by more than 600 ms.
- Lazy-load heavy effects; the hero must render before decorative motion starts.

## 7. Responsive behavior

| Width | Layout |
|-------|--------|
| < 480 | Single column, hamburger nav, chat as full-screen sheet, modals as bottom sheets |
| 480–767 | Two-column plant grid |
| 768–1023 | Two/three columns, full nav |
| ≥ 1024 | Three/four columns, centered container (max width 1200 px) |

## 8. Accessibility checklist

- Semantic landmarks (`header`, `nav`, `main`, `footer`).
- All images have meaningful `alt` text (plant name).
- Color contrast ≥ 4.5:1 for body text.
- Modals: `role="dialog"`, `aria-modal`, labelled, focus trap, Esc closes.
- Chat: live region (`aria-live="polite"`) announces new assistant messages.
- Counters expose the final number to screen readers.
- Everything reachable and usable with keyboard only.

## 9. Content rules

- Keep v1 copy for headings, mission text, and services text unless the owner changes it.
- Do not hard-code personal contact details in the codebase.
- Quotes: at least 10 seeded plant/nature quotes with authors, editable in admin. **Use quotes you have the right to display; keep each one short and attributed.**

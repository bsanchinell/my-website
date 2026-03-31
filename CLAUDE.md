# CLAUDE.md — Bryan Sanchinell Consulting Website

## Project Overview

Personal consulting website for Bryan Sanchinell, a workforce development strategist.

- **Live site:** https://bryansanchinell.com
- **GitHub:** https://github.com/bsanchinell/my-website
- **Deployed on:** Cloudflare Pages (auto-deploys on push to `main`)

---

## Tech Stack

| Tool | Version | Role |
|------|---------|------|
| Astro | ^6.0.1 | Static site generator |
| Tailwind CSS | ^4.2.1 | Utility-first styling |
| @tailwindcss/vite | ^4.2.1 | Tailwind Vite plugin (no tailwind.config.js) |
| Sanity | ^5.18.0 | Headless CMS |
| @sanity/client | ^7.20.0 | Sanity data client |
| @sanity/astro | ^3.3.1 | Sanity/Astro integration + Studio hosting |
| React | ^19.2.4 | Required by @sanity/astro for Studio |
| Formspree | — | Contact form backend |

**Node requirement:** >= 22.12.0

**Sanity config:**
- Project ID: `qe8ugdbs`
- Dataset: `production`
- Studio path: `/studio` (hash-based router for static hosting)
- API version: `2024-01-01`

**Formspree endpoint:** `https://formspree.io/f/xbdprgdv`
> Never change this without updating `src/pages/contact.astro`

**Social:**
- LinkedIn: https://www.linkedin.com/in/bryan-sanchinell/

---

## Project Structure

```
my-website/
├── public/
│   └── favicon.svg
├── schemas/                    # Sanity schema definitions
│   ├── index.ts                # Exports all schema types
│   ├── homepage.ts             # Hero, stats (singleton)
│   ├── about.ts                # Bio, timeline, skills (singleton)
│   ├── service.ts              # 6 service offerings
│   ├── blogPost.ts             # Blog posts
│   ├── caseStudy.ts            # Case studies
│   └── contact.ts              # Contact page content (singleton)
├── scripts/
│   └── seed-sanity.mjs         # Seed script to populate Sanity with initial content
├── src/
│   ├── layouts/
│   │   └── Layout.astro        # Main layout (nav, footer, Google Fonts)
│   ├── lib/
│   │   └── sanity.ts           # Sanity client + urlFor() image helper
│   ├── pages/
│   │   ├── index.astro         # Homepage (hero, stats, who I help, about preview)
│   │   ├── about.astro         # About (bio, timeline, skills)
│   │   ├── services.astro      # Services (6 offerings, 4-step process)
│   │   ├── blog.astro          # Blog/Writing (post cards, LinkedIn CTA)
│   │   ├── impact.astro        # Case studies & metrics
│   │   └── contact.astro       # Contact form (Formspree)
│   ├── styles/
│   │   └── global.css          # Tailwind import + @theme variables + base styles
│   └── env.d.ts
├── astro.config.mjs
├── sanity.config.ts
├── tsconfig.json
└── package.json
```

---

## Design System

### Color Palette

All colors are defined as CSS variables in `src/styles/global.css` under `@theme`:

| Variable | Hex | Usage |
|----------|-----|-------|
| `--color-navy` | `#0D2145` | Primary navy — hero sections, dark backgrounds |
| `--color-navy-mid` | `#1A2F55` | Lighter navy variant |
| `--color-navy-card` | `#1A3060` | Card backgrounds on navy |
| `--color-blue` | `#4A90D9` | Accent — CTAs, links, highlights |
| `--color-gold` | `#C9A84C` | Accent — emphasis text ("Work"), footer year |
| `--color-off-white` | `#F5F2EC` | Light section backgrounds, cards |
| `--color-footer-bg` | `#060E1C` | Footer background |
| `--color-muted` | `#A8B4C8` | Secondary text, subheadings on navy |
| `--color-pill-border` | `#2A3F6A` | Tag/pill borders |
| `--color-pill-text` | `#CBD5E0` | Tag/pill text |

### Typography

- **Headlines (h1, h2, h3):** Playfair Display (serif) — loaded from Google Fonts
- **Body / UI:** DM Sans (sans-serif) — loaded from Google Fonts

### Section Pattern

All pages alternate between navy and white/off-white sections:
- **Navy sections:** dark background (`bg-[#0D2145]`), light text
- **White sections:** white or `bg-[#F5F2EC]` background, dark text

**This alternating pattern must be maintained on all pages and when adding new sections.**

---

## Key Conventions

1. **Always push to GitHub after making changes** — Cloudflare auto-deploys from `main`.
2. **Always run `npm run build` before pushing** — catches TypeScript and Astro build errors early.
3. **Maintain navy/white alternating section pattern** on all pages.
4. **Keep Sanity schemas in sync** — when adding new content fields to a page, add them to the corresponding schema in `schemas/` and re-seed or update via the Studio.
5. **Never change the Formspree endpoint** without also updating `src/pages/contact.astro`.
6. **All pages have hardcoded fallbacks** — Sanity fetch failures gracefully degrade to hardcoded default content; keep fallbacks up to date when content changes.
7. **Tailwind config is inline** — theme variables live in `src/styles/global.css` under `@theme {}`, not in a separate `tailwind.config.js`.

---

## Sanity Content Architecture

Each page pulls from one or more Sanity document types:

| Page | Sanity Document(s) |
|------|--------------------|
| `index.astro` | `homepage` (singleton), `about` (preview) |
| `about.astro` | `about` (singleton) |
| `services.astro` | `service` (6 documents, ordered by `number`) |
| `blog.astro` | `blogPost` (all, ordered by date) |
| `impact.astro` | `caseStudy` (all) |
| `contact.astro` | `contact` (singleton) |

**Singleton documents** (`homepage`, `about`, `contact`) use fixed IDs (`singleton-homepage`, `singleton-about`, `singleton-contact`) and restrict actions to update/publish only.

The Sanity client is in `src/lib/sanity.ts` and exports:
- `client` — pre-configured `@sanity/client` instance
- `urlFor(source)` — image URL builder for Sanity image assets

---

## Common Tasks

### Preview locally

```bash
npm run dev
```

Site runs at `http://localhost:4321`. Sanity Studio available at `http://localhost:4321/studio`.

### Check for build errors

```bash
npm run build
```

Always run this before pushing. Build output goes to `dist/`.

### Preview the production build locally

```bash
npm run preview
```

### Update content via Sanity Studio

1. Run `npm run dev`
2. Go to `http://localhost:4321/studio`
3. Edit content — changes reflect immediately in Studio; rebuilt pages will reflect changes on next deploy

### Run the seed script (initial data population)

Requires a Sanity write token from the Sanity dashboard:

```bash
SANITY_TOKEN=<your-write-token> node scripts/seed-sanity.mjs
```

This is idempotent — safe to re-run. It creates or replaces all content documents.

### Add a new page

1. Create `src/pages/your-page.astro`
2. Use `Layout.astro` as the wrapper: `import Layout from '../layouts/Layout.astro'`
3. Follow the navy/white alternating section pattern
4. Add a nav link in `src/layouts/Layout.astro` (both desktop nav and mobile menu)
5. If the page needs CMS content, create a schema in `schemas/your-page.ts`, export it from `schemas/index.ts`, and add a fetch call in the page's frontmatter
6. Run `npm run build` to verify, then push to GitHub

### Add new Sanity content fields

1. Add the field to the appropriate schema file in `schemas/`
2. Update the GROQ query in the corresponding page to fetch the new field
3. Update the hardcoded fallback in the page with a sensible default
4. Run `npm run dev` and verify in Studio that the field appears
5. If needed, update `scripts/seed-sanity.mjs` to seed the new field

---

## Deployment

- **Platform:** Cloudflare Pages
- **Trigger:** Every push to `main` branch triggers an auto-deploy
- **Build command:** `npm run build`
- **Output directory:** `dist`
- No environment variables are required at build time (Sanity uses public project ID + CDN reads)

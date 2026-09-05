# vaibhavvijay.com

Personal site of **Vaibhav Vijay** — Product Manager, Head of Growth, GTM Strategy.

**Live:** https://vaibhavvijay.com
**Repo:** https://github.com/vaibhavvijay10/Vaibhav-portfolio
**Stack:** Vite 7 + React 19 + TypeScript + Tailwind 4, deployed on Vercel

---

## Table of contents

1. [What this is](#what-this-is)
2. [Quick start on a new machine](#quick-start-on-a-new-machine)
3. [Project structure](#project-structure)
4. [Everything that's been built](#everything-thats-been-built)
5. [How to add content](#how-to-add-content)
6. [Deployment](#deployment)
7. [Domain & DNS](#domain--dns)
8. [SEO / GEO / AEO stack](#seo--geo--aeo-stack)
9. [Analytics](#analytics)
10. [Where everything lives](#where-everything-lives)
11. [Continuing in a new AI session](#continuing-in-a-new-ai-session)

---

## What this is

A personal portfolio + content site that doubles as a **discoverability engine**. It started as an export from Manus (a no-code platform) in April 2026 and was rebuilt from the ground up as a clean, self-hosted, SEO/AEO-optimised static site.

What makes it different from a typical portfolio:

- **31 indexable URLs** — homepage, /about, /services, /projects (+3 detail pages), 4 topic clusters, 15 blog articles
- **Prerendered static HTML for every route** — so AI crawlers (GPTBot, ClaudeBot, PerplexityBot) that don't execute JavaScript still see full content
- **9 JSON-LD schema types** — Person, ProfessionalService, WebSite, WebPage, BreadcrumbList, FAQPage, BlogPosting, CollectionPage, CreativeWork
- **19 FAQ entries** engineered for AEO (Answer Engine Optimization) — designed to be quoted verbatim by ChatGPT / Perplexity / Google AI Overviews
- **Zero backend** — contact form uses `mailto:`, no database, no serverless functions, no ops burden

---

## Quick start on a new machine

```bash
git clone https://github.com/vaibhavvijay10/Vaibhav-portfolio.git
cd Vaibhav-portfolio
npm install
npm run dev          # http://localhost:3000
```

### All commands

| Command | What it does |
|---|---|
| `npm run dev` | Dev server at localhost:3000 with hot reload |
| `npm run build` | Production build → `dist/` **and** runs the prerender script |
| `npm run preview` | Serve the production build locally |
| `npm run check` | TypeScript typecheck only (no emit) |
| `npm run format` | Prettier across the repo |

**Requirements:** Node 20+ (developed on Node 25.6.0), npm 10+. No Python, no Docker, no database.

---

## Project structure

```
Vaibhav-portfolio/
├── index.html                    # Site <head>: meta, OG, 6 JSON-LD blocks, 19 FAQ entries
├── package.json                  # build = vite build && node scripts/prerender-blog.mjs
├── vercel.json                   # SPA rewrites, security headers, MIME types, cache policy
├── vite.config.ts                # react + tailwind plugins only
├── tsconfig.json                 # @/* alias → ./src/*
├── README.md                     # ← this file
├── HANDOFF.md                    # Deep context doc for AI session transfer
│
├── public/                       # Served as-is at the domain root
│   ├── robots.txt                # Allows Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, etc.
│   ├── sitemap.xml               # All 31 URLs with image extensions + hreflang
│   ├── llms.txt                  # LLM-readable fact sheet (proposed AEO standard)
│   ├── ai.txt                    # Per-vendor AI training/usage permissions
│   ├── humans.txt
│   ├── site.webmanifest          # PWA manifest
│   ├── favicon.svg / .ico        # Cyan "VV" tile
│   ├── apple-touch-icon.png      # 180×180
│   ├── og-image.jpg              # 1200×630 social share card
│   ├── profile.jpg
│   ├── Resume-VaibhavVijay.pdf   # ← replace this file to update the CV download
│   └── blog/                     # Self-hosted WebP article images
│
├── src/
│   ├── App.tsx                   # wouter Router, code-split routes, analytics mounts
│   ├── main.tsx
│   ├── index.css                 # Tailwind + CSS vars (accent = #0891b2 cyan)
│   │
│   ├── data/                     # ★ SINGLE SOURCE OF TRUTH — edit these to change content
│   │   ├── blog-posts.ts         # All 15 articles
│   │   ├── projects.ts           # All 3 projects (AlphaPulse, Karmic.ai, WinningKings)
│   │   ├── topics.ts             # 4 topic clusters + related-post logic
│   │   └── services.ts           # 6 service offerings
│   │
│   ├── pages/
│   │   ├── HomePage.tsx          # Scroll layout: Hero → About → Experience → Skills → Projects → Blog → Contact
│   │   ├── BlogPostPage.tsx      # /blog/:slug
│   │   ├── ProjectsPage.tsx      # /projects
│   │   ├── ProjectDetailPage.tsx # /projects/:slug
│   │   ├── AboutPage.tsx         # /about — AEO-engineered, 10 question-form H2s
│   │   ├── ServicesPage.tsx      # /services — 6 services with Service schema
│   │   └── TopicPage.tsx         # /topics/:slug
│   │
│   ├── components/
│   │   ├── Hero.tsx, About.tsx, Experience.tsx, Skills.tsx
│   │   ├── Projects.tsx          # Homepage projects section (3 cards)
│   │   ├── Blog.tsx, Contact.tsx, ContactForm.tsx, Footer.tsx, Navigation.tsx
│   │   ├── ScrollToTop.tsx       # Resets scroll on route change
│   │   ├── GoogleAnalytics.tsx   # GA4 gtag loader + SPA pageview tracking
│   │   ├── ErrorBoundary.tsx
│   │   └── ui/                   # shadcn/Radix primitives
│   │
│   ├── lib/
│   │   ├── analytics.ts          # ★ GA4 Measurement ID + trackEvent() helper
│   │   └── utils.ts              # cn() helper
│   │
│   ├── contexts/ThemeContext.tsx
│   └── hooks/                    # useComposition, useMobile, usePersistFn
│
└── scripts/
    └── prerender-blog.mjs        # ★ Post-build: static HTML for every route + RSS feed
```

★ = the files you'll actually edit for content changes.

---

## Everything that's been built

### Phase 1 — Migration off Manus (Apr 27, 2026)

Started from `vaibhav-portfolio-clean.tar.gz`, a Manus platform export. Removed:

| Removed | Why |
|---|---|
| `vite-plugin-manus-runtime` | Injected Manus watermark + OAuth |
| `@builder.io/vite-plugin-jsx-loc` | Dev-only debug tooling |
| Custom Manus debug-collector plugin | Wrote browser logs to `.manus-logs/` |
| `public/__manus__/debug-collector.js` | Telemetry beacon |
| `ManusDialog.tsx` | Unused, coupled to Manus OAuth |
| `server/index.ts` (Express) | Manus needed it; Vercel serves static directly |
| `%VITE_ANALYTICS_ENDPOINT%` script | Left raw template placeholders in rendered HTML |
| `wouter` patch reference | Pointed at a non-existent `patches/` folder |
| Unused scaffolding | `Map.tsx`, `pages/Home.tsx`, `shared/`, `const.ts` |

Result: 95 dependencies → 51. No phone-home. No watermark.

### Phase 2 — Domain, deploy, indexing (Apr 27–28, 2026)

- GitHub repo created, Vercel project connected with auto-deploy on push to `main`
- `vaibhavvijay.com` pointed from Hostinger DNS to Vercel (A record + www CNAME)
- Apex chosen as canonical; `www` 308-redirects to it
- Free SSL auto-provisioned by Vercel
- Google Search Console verified (DNS TXT), sitemap submitted
- Bing Webmaster Tools connected (imports from GSC — powers ChatGPT search + Copilot)
- LinkedIn / Facebook OG previews cache-primed before first share

### Phase 3 — SEO / AEO foundation (Apr 28, 2026)

- 6 JSON-LD schemas on the homepage
- `robots.txt` with explicit allow rules for every major AI crawler
- `llms.txt` and `ai.txt` — the emerging AEO standards
- `sitemap.xml` with image extensions and hreflang
- Accessibility pass: contrast bumped (`#6b7280` → `#4b5563`), aria-labels on all icon-only buttons

### Phase 4 — Blog architecture (Apr 28, 2026)

The single biggest SEO change. Articles moved from hash anchors (`/#blog`) to **individual indexable URLs** (`/blog/:slug`).

Why it mattered: Google collapses hash anchors into the parent URL, so all articles were competing for one ranking signal. Now each article ranks independently.

Also added:
- Build-time prerendering — every article gets static HTML with per-post `<title>`, meta, OG tags, `BlogPosting` JSON-LD **including full `articleBody`**, and a `<noscript>` fallback with the complete article text
- Self-hosted images — LinkedIn CDN URLs contain expiring tokens and Manus CloudFront URLs disappear when the account closes. All images downloaded, converted to WebP, committed to the repo
- Gallery support with images interleaved through article paragraphs (not stacked at the end)

### Phase 5 — Content engine (Apr 29 – May 14, 2026)

15 articles published, covering AI/AEO, performance marketing, retention/lifecycle, automation, and iGaming.

### Phase 6 — Authority infrastructure (May 16, 2026)

- **`/about`** — long-form AEO-engineered bio, 10 question-form H2s, `AboutPage` + `FAQPage` schema. This is the page AI engines quote for "Who is Vaibhav Vijay?"
- **`/services`** — 6 offerings, each with `Service` schema
- **4 topic cluster pages** — `/topics/ai-and-aeo`, `/topics/performance-marketing`, `/topics/retention-and-lifecycle`, `/topics/automation-and-operations`. These aggregate related articles and signal topical authority to Google
- **Related articles** on every blog post, computed from tag overlap
- **`/rss.xml`** — for newsletter platforms and AI training crawlers

### Phase 7 — Performance (May 16, 2026)

Real Experience Score had regressed to 58 on desktop. Fixed with:

- **Route-level code splitting** via `React.lazy` — initial JS dropped 126 KB → 99.7 KB gzipped
- **Image recompression** — all 20 blog WebPs re-encoded at quality 70, saving 379 KB (22%)
- **`fetchpriority="high"`** on the LCP hero image

### Phase 8 — Product repositioning + Projects (Sep 6, 2026)

- Resume updated → site repositioned from "Head of Growth" to **"Product Manager · Head of Growth · GTM Strategy"**
- KPAX experience consolidated into one role (Oct 2021 – Nov 2025) with the Strategy Lead → Head promotion noted
- Ekatra revenue corrected to $50K → $2M
- Revenue stat converted from ₹20Cr+ to **$3.5M+** everywhere (9 places across 6 files)
- Skills restructured to match resume: Product / Growth & GTM / AI Tools / Growth Stack
- Education section added
- **NEW: `/projects` + 3 detail pages** — AlphaPulse, Karmic.ai, WinningKings, each expanded from a resume bullet into a full case study with architecture, approach, outcomes, learnings, and cross-links to related articles
- **Google Analytics 4** installed (`G-QCS95HX7JM`) with SPA route tracking

---

## How to add content

### Add a blog article

1. Download the article image, convert to WebP, save to `public/blog/post-<name>.webp`:
   ```bash
   npm install --no-save sharp
   # convert with sharp at quality 82, then:
   rm -rf node_modules/sharp
   ```
2. Add an entry to the **top** of the array in `src/data/blog-posts.ts`:
   ```ts
   {
     id: "16",
     slug: "url-friendly-slug",          // lowercase-kebab, no special chars
     title: "The Headline",
     excerpt: "1-2 sentences shown on cards and in meta description.",
     content: `Paragraph one.

   Paragraph two.`,                       // template literal, blank line = new paragraph
     date: "Sep 6, 2026",
     isoDate: "2026-09-06",
     linkedinUrl: "https://www.linkedin.com/posts/...",
     infographicUrl: "/blog/post-name.webp",
     gallery: [                           // optional, for multi-image carousels
       { url: "/blog/post-name-2.webp", alt: "Descriptive alt text" },
     ],
     tags: ["Tag One", "Tag Two", "Tag Three"],
   }
   ```
3. Add a `<url>` block to `public/sitemap.xml`
4. `npm run build` → confirms "generated N static blog pages"
5. `git add -A && git commit -m "Add article: ..." && git push`
6. Request indexing in Google Search Console (URL Inspection → Request Indexing)

### Add a project

Same pattern, but edit `src/data/projects.ts`. The `Project` interface supports `overview`, `sections[]` (with `body` and/or `bullets`), `stack[]`, `outcomes[]`, `learnings[]`, and `relatedArticles[]`.

### Add an FAQ entry (AEO)

Edit the `FAQPage` JSON-LD block in `index.html`. Pattern:

```json
{
  "@type": "Question",
  "name": "Exact question phrasing, matching how people search",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Direct first-sentence answer, then elaboration with specific numbers."
  }
}
```

Also update the duplicate `ABOUT_FAQS` array in `scripts/prerender-blog.mjs` if the entry belongs on `/about`.

### Update the resume

Replace `public/Resume-VaibhavVijay.pdf`. That's it — the Download CV buttons point at a fixed path.

---

## Deployment

**Fully automatic.** Push to `main` → Vercel builds and deploys in 30–60 seconds.

```bash
git add -A
git commit -m "describe the change"
git push
```

Build command is `npm run build`, which chains `vite build && node scripts/prerender-blog.mjs`. Output directory is `dist`.

### Rolling back a bad deploy

Vercel dashboard → project → **Deployments** → find the last good one → ⋮ → **Promote to Production**. Takes seconds, no git surgery.

---

## Domain & DNS

Domain registered at **Hostinger**, DNS managed there, hosting on **Vercel**.

| Type | Name | Value |
|---|---|---|
| A | `@` | `216.198.79.1` |
| CNAME | `www` | `cname.vercel-dns.com` |
| TXT | `@` | `google-site-verification=vjx1sz9Sng2O4-cKiS4K14YXpJmX_XRwsMtPdfqVYrg` |

⚠️ **Do not delete any of these.** The A record keeps the site resolving, the CNAME keeps `www` working, and the TXT record keeps Google Search Console verified.

Domain expires **2026-09-02** with auto-renewal ON. Check the payment method on file annually.

---

## SEO / GEO / AEO stack

| Asset | Purpose |
|---|---|
| `robots.txt` | Explicit allow for Googlebot, Bingbot, GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, OAI-SearchBot |
| `sitemap.xml` | 31 URLs with image extensions, hreflang, lastmod |
| `llms.txt` | Canonical fact-sheet for LLMs (proposed standard) |
| `ai.txt` | Per-vendor AI training permissions with citation requirement |
| `rss.xml` | Feed for newsletter platforms + AI crawlers |
| Prerendered HTML | Every route has static HTML with full content in `<noscript>` |
| 9 schema types | Person, ProfessionalService, WebSite, WebPage, BreadcrumbList, FAQPage, BlogPosting, CollectionPage, CreativeWork |

**Why prerendering matters:** GPTBot, ClaudeBot and PerplexityBot in text-only mode do not run JavaScript. A pure SPA serves them an empty `<div id="root">`. The prerender script generates per-route static HTML so those crawlers see the complete article text and structured data. This is the single highest-leverage AEO decision in the codebase.

### Validation

- Schema: https://validator.schema.org — 0 errors
- Rich Results: https://search.google.com/test/rich-results — FAQ + Breadcrumbs eligible
- PageSpeed: SEO 100/100 mobile and desktop

---

## Analytics

Four dashboards, each answering a different question:

| Tool | Answers | Where |
|---|---|---|
| **Vercel Web Analytics** | How many visitors, from where, which pages | Vercel dashboard → Analytics |
| **Vercel Speed Insights** | Real-user Core Web Vitals | Vercel dashboard → Speed Insights |
| **Google Analytics 4** | User journeys, custom events, conversions | analytics.google.com |
| **Google Search Console** | Search queries, impressions, CTR, indexing | search.google.com/search-console |
| **Bing Webmaster Tools** | Bing/ChatGPT search performance + AI Performance tab | bing.com/webmasters |

**GA4 Measurement ID:** `G-QCS95HX7JM` — set in `src/lib/analytics.ts`.

Custom event tracking is available via the helper:

```ts
import { trackEvent } from "@/lib/analytics";
trackEvent("email_clicked", { location: "hero" });
```

⚠️ **Ad blockers block both Vercel Analytics and GA4.** Test in an incognito window without extensions.

**Vercel Hobby plan limits:** 2,500 analytics events/month, 30-day retention (longer windows are Pro-only). GA4 has unlimited retention, so it's the long-term time-series source.

---

## Where everything lives

| Thing | Location |
|---|---|
| Live site | https://vaibhavvijay.com |
| Repo | https://github.com/vaibhavvijay10/Vaibhav-portfolio |
| Vercel dashboard | https://vercel.com/vaibhavvijay10s-projects/vaibhav-portfolio |
| Vercel preview URL | https://vaibhav-portfolio-flame.vercel.app |
| Domain / DNS | https://hpanel.hostinger.com → Domains → vaibhavvijay.com |
| Search Console | https://search.google.com/search-console (Domain property) |
| Bing Webmaster | https://www.bing.com/webmasters |
| Google Analytics | https://analytics.google.com (property: Vaibhavvijay) |
| Local working copy | `C:\Users\91998\Desktop\Vaibhav's Website\vaibhav-portfolio-vercel` |

All accounts use **vvvj.14@gmail.com**. No passwords are stored in this repo.

---

## Continuing in a new AI session

`HANDOFF.md` in this repo is a purpose-built context document for exactly this. It contains the full architecture, every decision and its reasoning, known gotchas, verification commands, and account details.

**To resume work with any AI assistant:**

> I'm continuing work on my portfolio site vaibhavvijay.com. Full project context is in `HANDOFF.md` at the repo root — read it before responding.
>
> Local: `C:\Users\91998\Desktop\Vaibhav's Website\vaibhav-portfolio-vercel`
> GitHub: `https://github.com/vaibhavvijay10/Vaibhav-portfolio`
> Live: `https://vaibhavvijay.com`
>
> [Then state what you want done]

If the assistant has no file access, paste the contents of `HANDOFF.md` directly.

---

## Known gotchas

1. **`/blog` without a slug returns 404** — intentional. Routing it to a blog index would duplicate the homepage's blog section.
2. **The "Page with redirect" warning in Search Console** refers to `www → apex` and `http → https`. Both are by design. Ignore it.
3. **"Discovered – currently not indexed"** is normal for new URLs. Use URL Inspection → Request Indexing to accelerate. Only investigate if it persists past 30 days.
4. **Git Bash `/tmp` maps to `C:\tmp`** which doesn't exist. In Node scripts use `process.env.TEMP`.
5. **Python is not installed** despite `python.exe` appearing in PATH — those are Microsoft Store stubs. Use Node for scripting.
6. **The prerender script parses TypeScript as text**, not via import. If you add exotic syntax to the data files, check that `pluck()` / `pluckArray()` / `pluckTemplate()` still parse it. It handles both `"double"` and `'single'` quoted strings and template literals.
7. **`og-image.jpg` is a rasterized asset** — updating the stats shown on it requires regenerating the image, not just a code change.

---

## License

MIT — but the content (articles, copy, images, resume) is © Vaibhav Vijay, all rights reserved.

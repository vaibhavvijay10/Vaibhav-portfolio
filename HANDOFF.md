# Project Handoff — vaibhavvijay.com

> **Use this document to continue work in a new Claude session.**
> Paste the entire file as your first message. Claude reads it as full context.

Last updated: 2026-04-29

---

## 30-second TL;DR

A personal portfolio site for **Vaibhav Vijay** (Product Manager · Head of Growth · GTM Strategy, India, 7+ yrs experience). Originally built on Manus, migrated to a clean Vite + React 19 + Tailwind 4 SPA, deployed on Vercel from GitHub, served from custom domain `vaibhavvijay.com` via Hostinger DNS. Full SEO/GEO/AEO stack: 9 JSON-LD schema types, 19 FAQ entries, **31 indexable URLs** (homepage, /about, /services, /projects + 3 detail pages, 4 topic clusters, 15 blog articles) each with prerendered HTML for non-JS AI crawlers. GA4 + Vercel Analytics live. Live in production. PageSpeed: SEO 100, A11y 92, Performance 89 (mobile) / 99 (desktop).

> **Note on ordering:** the timeline sections below were written incrementally. The most recent state is always in "Phase 8" of `README.md` and the "Most recent commits" section at the bottom of this file.

The site is **technically complete**. Bottleneck now is content/distribution, not code.

---

## Where everything lives

### Local machine (Windows)

```
C:\Users\91998\Desktop\Vaibhav's Website\
├── vaibhav-portfolio-clean.tar.gz                # Original Manus export (backup, do not modify)
├── Vaibhav_Vijay_Portfolio_-_Migration_Guide_from_Manus_to_Vercel.docx  # Original migration brief
├── SEO-GEO-AEO-Strategy.pdf                      # Generated visibility playbook
├── How-We-Built-The-Site.pdf                     # Generated build doc
├── vaibhav-export/                               # Extracted Manus archive (also backup)
└── vaibhav-portfolio-vercel/                     # ← THE ACTIVE PROJECT, work happens here
```

The user works on Windows in **Command Prompt** (not PowerShell or Git Bash). They are not a developer — they are a marketer. Use simple, copy-pasteable commands. Avoid jargon unless you also explain it.

### GitHub

- Repo: **https://github.com/vaibhavvijay10/Vaibhav-portfolio**
- Canonical case: `Vaibhav-portfolio` (capital V) — pushes to `vaibhav-portfolio` (lowercase) silently redirect.
- Default branch: `main`
- Remote name: `origin`
- Auth: Git Credential Manager browser flow (no PAT). User has done one OAuth handshake; subsequent pushes don't re-prompt.

### Vercel

- Project: **vaibhav-portfolio** under user **vaibhavvijay10**
- Auto-deploys on every push to `main` (~30–60 sec build time)
- Vercel preview URL: `vaibhav-portfolio-flame.vercel.app` (kept active; not the canonical URL)
- Production URL: **https://vaibhavvijay.com** (apex primary)
- Build command: `npm run build` (runs `vite build && node scripts/prerender-blog.mjs`)
- Output dir: `dist`
- Framework preset: Vite

### Domain (Hostinger)

- Registrar: Hostinger (https://hpanel.hostinger.com)
- Domain: **vaibhavvijay.com**
- Expiry: 2026-09-02 (auto-renewal ON)
- DNS managed via Hostinger DNS panel (NOT Vercel DNS) — see DNS records below
- Email: vvvj.14@gmail.com (user's primary, no domain email set up — MX records absent)

### DNS records (Hostinger)

```
Type    Name   Content                                                         TTL
A       @      216.198.79.1                                                    14400
CNAME   www    cname.vercel-dns.com                                            14400
TXT     @      google-site-verification=vjx1sz9Sng2O4-cKiS4K14YXpJmX_XRwsMtPdfqVYrg   14400
```

The Vercel anycast IP `216.198.79.1` is current (Apr 2026). The old `76.76.21.21` still works but new IP is recommended.

### Vercel domain config

- `vaibhavvijay.com` → primary, served from Mumbai edge (`bom1`)
- `www.vaibhavvijay.com` → 308 permanent redirect to apex
- `vaibhav-portfolio-flame.vercel.app` → still works as fallback

### Google Search Console

- Property: **vaibhavvijay.com** (Domain property, not URL prefix)
- Verified: 2026-04-28 via DNS TXT record
- Sitemap submitted: `https://vaibhavvijay.com/sitemap.xml`
- Last status (Apr 28): Discovered 8 URLs, all green
- Apr 29 status: 1 indexed, 9 "discovered – not indexed" (NORMAL for 2-day-old domain)

### Bing Webmaster Tools

- Property: vaibhavvijay.com
- Imported from Google Search Console (one-click import)
- Sitemap: same — `https://vaibhavvijay.com/sitemap.xml`
- Powers ChatGPT search, Microsoft Copilot, DuckDuckGo, Yahoo

### Social cache-priming

- LinkedIn Post Inspector: ran 2x with apex URL, OG card cached correctly
- Facebook Sharing Debugger: ran with `https://` prefix, scraped at 206 OK, OG card cached
- Twitter/X: skipped (user has no X account)

---

## Tech stack

```
Frontend:        React 19.2 + TypeScript 5.6
Build tool:      Vite 7.3 + @vitejs/plugin-react
Styling:         Tailwind CSS v4 + tw-animate-css
UI primitives:   Radix UI (via shadcn-style components in src/components/ui/)
Icons:           lucide-react
Routing:         wouter (3.3) — chosen over react-router for tiny bundle size
Forms:           react-hook-form + zod
Animations:      framer-motion
Carousel:        embla-carousel
Markdown:        (none in production — streamdown was removed during cleanup)
Deploy:          Vercel free tier
Domain:          Hostinger (DNS only) → Vercel (hosting)
Analytics:       @vercel/analytics + @vercel/speed-insights
                 (packages installed, dashboards NOT YET ENABLED in Vercel UI)
```

---

## File structure (current, reflects production)

```
vaibhav-portfolio-vercel/
├── HANDOFF.md                           # ← this file
├── README.md                            # User-facing project overview
├── index.html                           # Site head: 6 JSON-LD blocks, 19 FAQ entries, OG/Twitter/GEO/Dublin Core meta
├── package.json                         # Dependencies; build script chains vite + prerender
├── tsconfig.json                        # @/* alias → ./src/*
├── vercel.json                          # SPA rewrites, security headers, MIME types, immutable cache
├── vite.config.ts                       # 25 lines, react+tailwind only
├── .gitignore
│
├── public/
│   ├── robots.txt                       # Allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot-Extended, etc
│   ├── sitemap.xml                      # 10 URLs (home + 8 articles + resume PDF)
│   ├── llms.txt                         # Proposed AEO standard — canonical fact-sheet for LLMs
│   ├── ai.txt                           # Per-vendor AI training/usage permissions
│   ├── humans.txt
│   ├── site.webmanifest                 # PWA manifest
│   ├── favicon.svg                      # Cyan "VV" tile
│   ├── favicon.ico                      # Multi-size legacy fallback (generated from SVG)
│   ├── apple-touch-icon.png             # 180x180, generated from SVG
│   ├── og-image.jpg                     # 1200x630 social card, designed in SVG then rasterised
│   ├── profile.jpg                      # User's headshot (existing)
│   ├── Resume-VaibhavVijay.pdf          # CV (existing)
│   └── blog/                            # Self-hosted WebP infographics (one per article)
│       ├── post-ask-an-agent.webp
│       ├── post-apple-search-ads.webp
│       ├── post-igaming.webp
│       ├── post-reactivation.webp
│       ├── post-geo-aeo.webp
│       ├── post-discovery-shift.webp
│       ├── post-annie-duke.webp
│       └── post-meta-vs-google.webp
│
├── src/
│   ├── App.tsx                          # wouter Router + ScrollToTop + Analytics + SpeedInsights
│   ├── main.tsx                         # createRoot mount
│   ├── index.css                        # Tailwind imports + CSS vars (accent #0891b2 cyan)
│   │
│   ├── pages/
│   │   ├── HomePage.tsx                 # Original portfolio scroll layout (Hero/About/Experience/Skills/Blog/Contact/Footer)
│   │   └── BlogPostPage.tsx             # Per-post detail page; updates document.title, OG meta, BlogPosting JSON-LD via React effect
│   │
│   ├── components/
│   │   ├── Hero.tsx                     # Landing hero with stats (7+, ₹20Cr+, 4)
│   │   ├── About.tsx                    # Bio + Core Competencies + Achievements (ASO #1, 5x LTV, Shark Tank)
│   │   ├── Experience.tsx               # Work history
│   │   ├── Skills.tsx                   # Categorized skills
│   │   ├── Blog.tsx                     # Home Blog section — cards link to /blog/[slug]
│   │   ├── Contact.tsx                  # Contact info + form
│   │   ├── ContactForm.tsx              # mailto: form (NO backend; opens user's email client on submit)
│   │   ├── Footer.tsx
│   │   ├── Navigation.tsx               # Sidebar nav (desktop) + slide-out (mobile); icons have aria-labels
│   │   ├── ErrorBoundary.tsx
│   │   ├── ScrollToTop.tsx              # Resets scroll on route change unless URL has hash anchor
│   │   └── ui/                          # shadcn primitives (Radix wrappers) — many unused, kept for future
│   │
│   ├── data/
│   │   ├── blog-posts.ts                # ★ SINGLE SOURCE OF TRUTH for the 15 blog articles
│   │   ├── projects.ts                  # ★ 3 projects: AlphaPulse, Karmic.ai, WinningKings
│   │   ├── topics.ts                    # 4 topic clusters + getRelatedPosts()
│   │   └── services.ts                  # 6 service offerings
│   │                                    #   Adding a new article = 1 entry here + push
│   │
│   ├── contexts/
│   │   └── ThemeContext.tsx             # Light/dark theme provider (currently fixed to light)
│   │
│   ├── hooks/
│   │   ├── useComposition.ts            # Used by Input/Textarea (IME composition support)
│   │   ├── useMobile.tsx                # Used by sidebar primitive
│   │   └── usePersistFn.ts              # Used by useComposition
│   │
│   └── lib/
│       ├── utils.ts                     # cn() helper (clsx + tailwind-merge)
│       └── seoOptimization.ts           # Currently UNUSED; tree-shaken from prod bundle
│
└── scripts/
    └── prerender-blog.mjs               # ★ Post-build: per-post static HTML files with full <head> meta + <noscript> body
                                          #   Critical for non-JS AI crawlers (GPTBot, ClaudeBot, PerplexityBot text-mode)
```

★ = the two most important files for content updates.

---

## Key decisions and reasoning

### Why apex (`vaibhavvijay.com`) is the primary URL, not `www.`
Cleaner brand. Vercel default suggests www-as-primary because of CNAME flattening, but for a personal portfolio, `vaibhavvijay.com` looks better than `www.vaibhavvijay.com`. We override-d the default and configured a 308 redirect from www to apex.

### Why Hostinger DNS (not Vercel DNS)
User wanted Hostinger to remain the registrar. We added A + CNAME records in Hostinger pointing at Vercel's anycast IP. Trade-off: if Vercel changes IP later, we update one A record. Benefit: registrar and DNS stay in one place.

### Why we kept it as a Vite SPA, not migrated to Next.js
Portfolio sites have ~7 pages. SSR gives marginal benefit and adds complexity. Instead we shipped build-time prerendering for blog routes only. Best of both worlds.

### Why each blog post has its own URL (not just hash anchors)
Hash anchors (`/#blog`) are collapsed to the parent URL by Google. With dedicated URLs (`/blog/structured-generosity-igaming-ltv`), we went from 1 indexable surface to 8. Each article ranks independently for its long-tail query.

### Why we prerender blog HTML at build time
GPTBot, ClaudeBot, PerplexityBot in text-only mode do NOT execute JavaScript. A pure SPA serves them empty `<div id="root">`. Our `scripts/prerender-blog.mjs` generates per-post static HTML with:
- Per-post `<title>`, meta description, canonical URL
- Per-post Open Graph + Twitter card meta tags
- Full `BlogPosting` JSON-LD with `articleBody` (entire post text in structured data)
- `<noscript>` fallback containing the article rendered as plain HTML
JS users get the React SPA mounting on top. Non-JS crawlers see the noscript article body. Same file, two experiences.

### Why we self-hosted blog images (instead of LinkedIn/Manus CDN URLs)
Both fail silently:
- **Manus CloudFront** — disappears when Manus account is closed
- **LinkedIn media URLs** — include expiring signed tokens (e=...)
We downloaded all infographics, converted to WebP (saved 26%), committed to `public/blog/`. Now they ship with the deploy.

### Why we stopped at Performance 89 (mobile)
Remaining gains require disproportionate effort. Three hours of optimization vs three hours writing one great LinkedIn post or commenting on 30 posts: distribution wins, every time. SEO 100 / A11y 92 / Performance 89 is genuinely good for a content site.

### Why ContactForm uses `mailto:` (not a serverless API)
No backend means nothing to maintain or break. The form opens the user's default email client pre-filled with name/subject/body. User gets the message at `vvvj.14@gmail.com` like any other email.

---

## What's been done (chronological)

| Date | Milestone |
|---|---|
| 2026-04-27 | Stripped Manus runtime, debug collector, Express server. Restructured for Vercel static deploy. |
| 2026-04-27 | Built initial SEO stack: 6 JSON-LD schemas, llms.txt, ai.txt, robots.txt with AI bot allowlist, sitemap.xml |
| 2026-04-27 | Generated favicon.svg, og-image.jpg (designed in SVG, rasterised via sharp), apple-touch-icon.png, favicon.ico |
| 2026-04-27 | First successful production build (109 KB gzipped JS, 0 TS errors) |
| 2026-04-27 | GitHub repo created, code pushed |
| 2026-04-27 | Vercel project imported from GitHub, first deploy live |
| 2026-04-27 | Hostinger DNS reconfigured: deleted 4 parking A records, added A → 216.198.79.1 + CNAME www → cname.vercel-dns.com |
| 2026-04-27 | Both vaibhavvijay.com (apex primary) and www.vaibhavvijay.com (308 redirect) live with green padlock |
| 2026-04-27 | Cache-primed LinkedIn Post Inspector + Facebook Debugger with custom OG card |
| 2026-04-28 | Google Search Console verified via DNS TXT, sitemap submitted, 8 URLs discovered |
| 2026-04-28 | Bing Webmaster Tools imported from GSC, sitemap submitted |
| 2026-04-28 | Schema validator: 6 schemas detected, 0 errors. Rich Results Test: FAQ + Breadcrumbs eligible. PageSpeed: SEO 100. |
| 2026-04-28 | Mobile a11y fix: muted-foreground contrast bumped #6b7280 → #4b5563, aria-labels on icon buttons. A11y 86 → 92 |
| 2026-04-28 | Added 10 new high-value FAQ entries (CAC, LTV:CAC, ASA, ASO, lifecycle, GTM, GEO/AEO, India consulting rates) |
| 2026-04-28 | Major refactor: blog data extracted to src/data/blog-posts.ts; wouter Router added; HomePage + BlogPostPage extracted; build-time prerender script; 6 articles got individual /blog/[slug] URLs |
| 2026-04-28 | Blog images converted JPG → WebP (saved 300 KB / 26%); Manus CloudFront refs replaced with self-hosted /blog/*.webp |
| 2026-04-29 | Two new articles added: "Ask an Agent Your Own Name" (Apr 29) + "Apple Search Ads, the Hidden Channel" (Apr 28) |
| 2026-04-29 | Sitemap expanded to 10 URLs |
| 2026-04-29 | Generated 2 PDFs in attached folder: SEO-GEO-AEO-Strategy.pdf, How-We-Built-The-Site.pdf |
| 2026-04-29 | Added @vercel/analytics + @vercel/speed-insights packages; ScrollToTop component fixed scroll-on-route-change bug |
| 2026-04-29 | URL Inspection requests for blog URLs in GSC (in progress at handoff time) |

---

## What's currently pending (at handoff time)

### User actions (no code change needed)
1. **Finish 7 remaining URL Inspection requests** in GSC for the blog URLs (1 done, 7 to go). Forces Google to crawl + decide indexing within 24h instead of natural cycle.
2. **Resubmit sitemap to Google Search Console** — remove existing entry + re-add `https://vaibhavvijay.com/sitemap.xml`. Should show "Discovered: 10 URLs". (Old report showed 8; we added 2 articles since.)
3. **Resubmit sitemap to Bing Webmaster Tools** — same drill.
4. **Enable Vercel Web Analytics** — Vercel dashboard → project → Analytics tab → click "Enable Web Analytics" button. Tracking code is already in production code; just needs the dashboard toggle flipped.
5. **Enable Vercel Speed Insights** — same dashboard, Speed Insights tab → Enable.
6. **Post LinkedIn launch post** — drafted version ready in chat; user has the PDF playbook to deliver to anyone who comments "AI Agents".
7. **Trigger first analytics events** — open vaibhavvijay.com in Chrome incognito (or any browser without ad-blockers), click around. After ~30 sec, Vercel Analytics dashboard will populate.

### Blocked / waiting on platforms
- Google indexing of the 7 newer blog URLs — typical wait 24–72h after URL Inspection requests
- Bing crawl — usually 3–5 days after sitemap submit
- AI engine citations (ChatGPT/Perplexity) — typical wait 7–14 days; user should run AEO smoke test on **2026-05-12** with query *"Who is Vaibhav Vijay?"* in ChatGPT (web search), Perplexity, Google AI Overviews

---

## Future ideas not yet built (mentioned, not implemented)

1. **`/about` AEO page** — dedicated long-form bio engineered for the query "Who is Vaibhav Vijay?". Big AEO win; ~15 min to build.
2. **`/services` page** — Service schema per offering (Growth Strategy, Performance Marketing, CRM, CRO). Targets buyers searching for consultants. ~20 min.
3. **`/rss.xml` feed** — for newsletter platforms and AI crawlers to subscribe to blog updates. ~10 min.
4. **`/playbook` page** — host the SEO-GEO-AEO-Strategy.pdf publicly so the LinkedIn launch post's "Comment 'AI Agents' for the playbook" CTA can be auto-fulfilled via a link instead of manual DMs. ~10 min.
5. **WebP conversion of og-image.jpg** + lazy-loading on remaining images — small perf wins.
6. **Document carousel post for LinkedIn** — 4-slide PDF designed for the algorithm. Mentioned, not built.
7. **Day 7-10 follow-up LinkedIn post** — "What I learned from posting my site to ChatGPT, Claude & Perplexity" with actual citation data. Strategic narrative arc planned but not executed.

---

## How to add a new blog article (the most common ongoing task)

User typically pastes the LinkedIn post body + the LinkedIn post URL + the LinkedIn image URL. Workflow:

1. **Download the image** to local temp:
   ```bash
   curl -sL "<linkedin-image-url>" -o /tmp/post-<slug>.jpg
   ```
   Verify with `head -c 4 file.jpg | xxd | head -1` — should show `ffd8ffe0` (JPEG magic).

2. **Convert to WebP** (briefly install sharp, run, uninstall):
   ```bash
   npm install --no-save --silent sharp
   # write a tiny script using sharp.webp({quality: 82, effort: 6})
   # save to public/blog/post-<slug>.webp
   rm -rf node_modules/sharp
   ```

3. **Add entry to `src/data/blog-posts.ts`** — at TOP of array (newest first). Required fields: `id`, `slug` (lowercase-kebab, no special chars), `title`, `excerpt` (1-2 sentences), `content` (template literal, preserves line breaks), `date` ("Apr 29, 2026"), `isoDate` ("2026-04-29"), `linkedinUrl`, `infographicUrl` (`/blog/post-<slug>.webp`), `tags` (array of 3-4 strings).

4. **Add entry to `public/sitemap.xml`** — copy an existing `<url>` block, swap loc + lastmod + image fields. Keep ordering newest → oldest.

5. **Build + verify**:
   ```bash
   npm run build  # runs vite build && prerender-blog.mjs
   ```
   Should show "generated N static blog pages" where N = number of articles in blog-posts.ts.

6. **Commit + push**:
   ```bash
   git add -A
   git commit -m "Add article: <title>"
   git push
   ```

7. **Verify production** ~60 sec after push:
   ```bash
   curl -s https://vaibhavvijay.com/blog/<new-slug> | grep -oE '<title>[^<]+</title>'
   ```
   Should match the new title.

8. **(Optional but recommended)** Request indexing via GSC URL Inspection for the new URL. Tell user.

---

## How to add a new FAQ entry to the JSON-LD

In `index.html`, find the `FAQPage` JSON-LD block (around line 220-310). It contains a `mainEntity` array of `Question` objects. Add new `Question` entries before the closing `]`. Pattern:

```json
{
  "@type": "Question",
  "name": "Exact question phrase, matching how people search",
  "acceptedAnswer": {
    "@type": "Answer",
    "text": "Direct first-sentence answer. Then elaboration with specific numbers and frameworks. First-person experience markers when relevant. Quotable, verbatim by AI engines."
  }
}
```

Then build, commit, push. No prerender impact — FAQ JSON-LD only lives on the homepage, not blog post pages.

---

## User profile and communication style

- **Name:** Vaibhav Vijay
- **Email:** vvvj.14@gmail.com
- **Role:** Head of Growth & Performance Marketing (India, 7+ yrs)
- **Tech level:** Marketer, not developer. Knows enough to follow instructions but doesn't write code. Prefers Command Prompt over PowerShell. Uses Windows.
- **Communication preference:** Wants clear step-by-step. Sends screenshots when stuck. Asks "where" or "how to do this" questions when navigating new tools (Vercel, GSC, Bing). Will paste raw output rather than ask "what does this mean".
- **Decisions to defer to:** Content (article tone, voice, what to write about). Branding choices.
- **Decisions to make confidently and explain after:** Architecture, file structure, refactors, performance trade-offs, technical SEO, deploy mechanics. The user trusts the AI to make these calls and explain reasoning.
- **What annoys them:** Optimizing past the point of diminishing returns. Recommending heavy-weight solutions (Next.js migration, paid analytics, expensive SEO tools) when free/lightweight alternatives suffice.
- **What they value:** Honest assessments ("you're done, stop optimizing, go post on LinkedIn"). Specific numbers over vague claims. Trade-off explanations.

---

## Common gotchas / things to remember

1. **When committing** — git config user.email + user.name must be set globally on the user's machine. Already done with `vvvj.14@gmail.com` and `Vaibhav Vijay`. Don't re-prompt.
2. **GitHub repo case** — pushing to lowercase silently redirects. Use the canonical URL `https://github.com/vaibhavvijay10/Vaibhav-portfolio.git` to avoid redirects.
3. **Domain property in GSC** — sitemap submission needs the FULL URL including `https://`, not just `sitemap.xml` (because it's a Domain property, not URL prefix).
4. **WebP browser support** — 97%+ globally. Safe to use without JPG fallback.
5. **Vercel Analytics blocked by ad blockers** — Brave, uBlock Origin, Ghostery block by default. Test in Chrome incognito. This is correct browser behavior, not a bug.
6. **Facebook Debugger** — sometimes scrapes `http://` instead of `https://` and reports a misleading 403. The actual `https://` URL works fine. Always paste with explicit `https://` prefix.
7. **PageSpeed run-to-run variance** — ±3 points is normal. Don't chase ghosts.
8. **/blog without slug returns 404** — by design. Don't "fix" it by routing to a blog index page; that would create duplicate content with the homepage's blog section.
9. **The "Page with redirect" warning in GSC** — refers to www → apex and http → https. Both intentional. Ignore.
10. **"Discovered – currently not indexed" for new URLs** — normal for a 2-day-old domain. Use URL Inspection to manually request indexing. Wait 30 days before treating as a real problem.

---

## Quick verification commands (run these to confirm site state)

```bash
# Apex serves 200 OK from Vercel
curl -sI https://vaibhavvijay.com/ | head -5

# www → apex 308 redirect
curl -sI https://www.vaibhavvijay.com/ | grep -iE "^HTTP|^location"

# Sitemap has 10 URLs
curl -s https://vaibhavvijay.com/sitemap.xml | grep -c "<loc>"

# A specific blog post serves prerendered HTML with per-post title
curl -s https://vaibhavvijay.com/blog/ask-an-agent-your-own-name | grep -oE "<title>[^<]+</title>"

# BlogPosting JSON-LD present
curl -s https://vaibhavvijay.com/blog/ask-an-agent-your-own-name | grep -c '"@type":"BlogPosting"'

# noscript article body present (for non-JS AI crawlers)
curl -s https://vaibhavvijay.com/blog/ask-an-agent-your-own-name | grep -c "<noscript>"
# Should return 2 (one for the font fallback, one for the article body)

# robots.txt allows AI bots
curl -s https://vaibhavvijay.com/robots.txt | grep -E "GPTBot|ClaudeBot|PerplexityBot"
```

---

## Sep 2026 update — Product repositioning + Projects

The site was repositioned from a pure growth-marketing portfolio to **Product Manager · Head of Growth · GTM Strategy**, driven by an updated resume.

**Content/data changes:**
- KPAX experience consolidated into ONE role (Oct 2021 – Nov 2025), noting the Strategy Lead → Head promotion. Previously it was split into two entries.
- Ekatra revenue corrected: `$50K → $220K` became `$50K → $2M`
- Revenue stat changed from `₹20Cr+` to `$3.5M+` in 9 places across 6 files (Hero, AboutPage, BlogPostPage, index.html, prerender script, llms.txt)
- Skills restructured to match the resume's 4 categories, adding Claude Code, Claude Cowork, OpenAI Codex, Cursor, Antigravity, MCP Connectors, RAG Agents, HubSpot, Braze, Mixpanel, Figma, Jira
- Education section added to the homepage About component
- About bio de-hyphenated (em-dashes replaced with commas/colons/sentence breaks) at the user's request

**New: Projects**
- `src/data/projects.ts` — 3 projects, each expanded from a one-line resume bullet into a full case study with `overview`, `sections[]`, `stack[]`, `outcomes[]`, `learnings[]`, `relatedArticles[]`
- `/projects` index page + `/projects/:slug` detail pages (4 new indexable URLs)
- Homepage `Projects.tsx` section between Skills and Blog, with matching nav item (Rocket icon)
- `CreativeWork` JSON-LD per project; `CollectionPage` + `ItemList` on the index
- Prerender script extended with `loadProjects()` + `prerenderProjectPages()`

**IMPORTANT — content provenance:** The project write-ups were expanded by AI from 2-line resume bullets. Every claim traces back to something stated in the resume (rule-based signals, backtesting, risk controls, Expo/React Native/TypeScript/Claude API/n8n/RAG, GTM/paid/CRM/P&L ownership, CPA below $4, LTV $70→$350). **No metrics were invented.** Where specifics were unknown, the copy describes approach and reasoning rather than asserting numbers. The user should review and adjust any detail that misrepresents the actual work.

**Analytics:**
- Google Analytics 4 installed. Measurement ID `G-QCS95HX7JM` lives in `src/lib/analytics.ts`
- `GoogleAnalytics.tsx` injects gtag once and fires a `page_view` on every wouter route change (`send_page_view: false` in config to avoid double-counting the first view)
- `trackEvent(name, params)` helper available for future conversion events

**Resume:** `public/Resume-VaibhavVijay.pdf` replaced with the Sep 2026 product-focused version.

---

## Most recent commits (last 5)

```
2d7b78b  Fix scroll on route change + add Vercel Analytics & Speed Insights
3dd4498  Add 2 new articles: 'Ask an Agent Your Own Name' (Apr 29) + 'Apple Search Ads, the Hidden Channel' (Apr 28)
da93009  Add /blog/[slug] routing, prerendered HTML, WebP images, 10 new FAQs
e1bd6aa  Improve mobile a11y (contrast + aria-labels) and LCP (font preload)
deccaf4  Self-host all 6 blog infographics (LinkedIn + Manus CDN URLs were temporary)
```

---

## How to continue from here in a new Claude session

Open a new chat in your Claude Max account. As your **first message**, paste:

> I'm continuing work on my portfolio site `vaibhavvijay.com`. The complete project context, file structure, decisions, and current state are in `HANDOFF.md` at the repo root. Read it before responding.
>
> Local path: `C:\Users\91998\Desktop\Vaibhav's Website\vaibhav-portfolio-vercel`
> GitHub: `https://github.com/vaibhavvijay10/Vaibhav-portfolio`
> Live: `https://vaibhavvijay.com`
>
> [Then state your specific request, e.g. "I want to add a new blog article" or "the contact form is broken" or "let's build the /about AEO page"]

Claude will read `HANDOFF.md` first via the file system, then respond with full context. The new session inherits everything: architecture, decisions, your communication preferences, and what's pending.

If the new Claude doesn't have file-system access, paste the contents of this `HANDOFF.md` directly as the first message. Same outcome.

---

# Addendum: things almost forgotten (2026-04-29)

After reviewing the original HANDOFF.md, ran a real audit. Seven gaps that would have caused friction in a future session — captured below.

## A. Confirmed dev tooling on the user's Windows machine

Verified by running `--version` on each:

| Tool | Version | Notes |
|---|---|---|
| Node.js | **25.6.0** | At `C:\Program Files\nodejs\node.exe` |
| npm | **11.8.0** | At `C:\Program Files\nodejs\npm` |
| git | **2.53.0.windows.2** | Git Credential Manager configured for GitHub auth |
| curl | **8.18.0** (Schannel + brotli + zstd) | Windows-native, supports `-sI`, `-L`, etc. |
| Python | ❌ **NOT INSTALLED** | The `python.exe` and `python3.exe` in `WindowsApps` are Microsoft Store stubs that redirect to install. Don't try to use them. If a Python script is needed, use Node + a JS library (sharp, pdfkit, etc.) instead. |
| GitHub CLI (`gh`) | ❌ **NOT INSTALLED** | Use raw `curl` against the GitHub API or push the user toward github.com UI for repo settings |
| ImageMagick | ❌ **NOT INSTALLED** | For image work, install `sharp` ad-hoc: `npm install --no-save sharp`, run, then `rm -rf node_modules/sharp` |

Shell context: the user's Bash sessions run inside a Git for Windows / mingw64 environment. `/tmp` maps to `C:\tmp` (which doesn't exist by default!). For temp files, use `process.env.TEMP` or `process.env.TMP` in Node — these resolve correctly to `C:\Users\91998\AppData\Local\Temp\`.

## B. Account identifiers (NO passwords stored; user must log in manually)

| Platform | Login URL | Username/email | Login method |
|---|---|---|---|
| GitHub | https://github.com/login | `vaibhavvijay10` | Browser auth (Git Credential Manager handles git CLI) |
| Vercel | https://vercel.com/login | `vaibhavvijay10` (linked to GitHub) | Continue with GitHub |
| Google (GSC, Gmail, Analytics) | https://accounts.google.com | `vvvj.14@gmail.com` | Google OAuth, likely 2FA on |
| Bing Webmaster Tools | https://www.bing.com/webmasters | Linked via "Import from Google Search Console" | Microsoft account or Google sign-in |
| Hostinger | https://hpanel.hostinger.com | `vvvj.14@gmail.com` | Email + password |
| LinkedIn | https://www.linkedin.com/login | profile is `linkedin.com/in/vaibhavvijay10` | Email + password |

If the new Claude needs to operate on any of these, it can only **guide the user** — passwords are never stored. The user logs in themselves and shares screenshots.

## C. Critical "do not delete" items

If any of these go away, the site breaks or loses verification status. Documented loudly:

| Item | Where | If deleted |
|---|---|---|
| **A record `@ → 216.198.79.1`** in Hostinger DNS | hpanel → DNS | `vaibhavvijay.com` stops resolving. SITE GOES DOWN. |
| **CNAME record `www → cname.vercel-dns.com`** | Hostinger DNS | `www.vaibhavvijay.com` stops working (apex still works) |
| **TXT record `@ → google-site-verification=vjx1sz9Sng2O4-cKiS4K14YXpJmX_XRwsMtPdfqVYrg`** | Hostinger DNS | Google Search Console loses verification, sitemap submission breaks |
| Vercel preview URL `vaibhav-portfolio-flame.vercel.app` | Vercel project | Currently active fallback. Do not "remove" it from Vercel — it's auto-managed. |
| `main` branch on GitHub | github.com | Vercel watches `main`. Renaming or deleting kills auto-deploys. |
| `package.json` `"build"` script chaining `vite build && node scripts/prerender-blog.mjs` | repo root | Removing the prerender chain means `/blog/[slug]` URLs lose their per-post HTML — back to SPA-only, AEO regression |

DNS verified live as of 2026-04-29: A record resolves to `216.198.79.1`, CNAME resolves to `cname.vercel-dns.com`, TXT contains the GSC verification token. Re-run `nslookup -type=TXT vaibhavvijay.com 8.8.8.8` to verify at any time.

## D. Disaster recovery / how to roll back

| Scenario | Recovery |
|---|---|
| Bad deploy breaks the live site | Vercel dashboard → project → **Deployments** tab → find the last good deploy → ⋮ menu → **"Promote to production"**. Site flips back in seconds. No git revert needed. |
| Accidentally delete a file locally | `git checkout -- path/to/file` (restores from last commit). If already committed: `git revert <commit-sha>`. |
| Vercel account deleted | Code is on GitHub, can re-import to a new Vercel account in 5 min. DNS records still point at Vercel's IP — once re-deployed, site works again. |
| GitHub repo deleted | Local copy at `C:\Users\91998\Desktop\Vaibhav's Website\vaibhav-portfolio-vercel\` has full git history. Can push to a new remote. |
| Hostinger account suspended | Domain becomes inaccessible until billing fixed. Vercel preview URL (`vaibhav-portfolio-flame.vercel.app`) still works. |
| Domain expires | Auto-renewal is ON, expiry **2026-09-02**. If billing fails: 30-day grace, then 30-day redemption (with fee), then drop. Set a calendar reminder for 2026-08-01. |

## E. Platform constraints and limits

### Vercel Hobby plan (free tier — what we're on)

| Limit | Value | When it matters |
|---|---|---|
| Web Analytics events | **2,500 / month** | A modest portfolio is fine. If a launch post drives 3,000+ unique visits in one month, you'll see partial data only. Upgrade to Pro ($20/mo) doubles this and removes the cap on most features. |
| Bandwidth | **100 GB / month** | At ~16 KB HTML + ~115 KB JS per visit, that's ~750k page views before hitting cap |
| Build minutes | **6,000 / month** | Each deploy uses ~15 sec, so ~24,000 deploys before cap. Not a real constraint. |
| Serverless function execution | **100k invocations / month** | We don't use serverless functions. |
| Custom domains per project | unlimited | |
| HTTPS / SSL | free, auto-renew | |

### Google Search Console

- **URL Inspection "Request Indexing"** rate limit: ~10 URLs / day per property. Use sparingly during the launch window.
- Search Performance data has a **2-day lag** — today's clicks show up day after tomorrow.

### Bing Webmaster Tools

- Sitemaps are recrawled on Bing's own schedule, ~3–5 days for new URLs.
- Bing's index powers **ChatGPT search, Microsoft Copilot, DuckDuckGo, Yahoo**.

## F. Content workflow constraint — there is NO CMS

All blog content lives in `src/data/blog-posts.ts`. Adding/editing requires:
1. Editing the TypeScript file directly
2. `git commit && git push`
3. Vercel auto-deploys

There is **no admin panel, no Notion sync, no Sanity/Contentful integration, no markdown drop folder**. This is intentional (zero ops, zero cost), but means content updates require AI assistance or developer comfort. If the user ever wants to write articles without touching code, that's a separate build (Notion API + ISR, or migrating to a CMS-backed framework like Astro Content Collections or Next.js + Sanity).

## G. The two reference PDFs are NOT in git

Located at:
- `C:\Users\91998\Desktop\Vaibhav's Website\SEO-GEO-AEO-Strategy.pdf`
- `C:\Users\91998\Desktop\Vaibhav's Website\How-We-Built-The-Site.pdf`

**These are personal references, not site assets.** They were intentionally placed in the parent folder, NOT in the repo. They will not be backed up by GitHub. If you want them backed up, copy them to OneDrive/Drive/Dropbox manually, or move them to the project's `public/` folder and reference from a private route like `/playbook` (potential future addition).

## H. Other minor things worth knowing

- **No domain email.** `vaibhav@vaibhavvijay.com` doesn't exist. There are no MX records on the domain. If the user ever wants email at the domain, Hostinger offers Business Email (paid) or Google Workspace can be linked — adds 4–5 MX records to DNS.
- **Public PII on the site (by design):** email `vvvj.14@gmail.com`, phone/WhatsApp `+91-99822-67285`, LinkedIn `linkedin.com/in/vaibhavvijay10`. These appear in the footer, contact section, and JSON-LD. The user has explicitly chosen to publish these for inbound consulting leads. If you ever want to remove or change them, search `99822` and `vvvj.14` across `src/**` and `index.html`.
- **No error tracking / monitoring.** No Sentry, no Datadog, no Vercel Errors integration. For a portfolio this is fine — if something breaks, the user finds out via friends visiting. If the site ever becomes business-critical, add Sentry (free tier covers personal use).
- **Repo visibility unverified.** I don't have GitHub CLI access to confirm whether the repo is public or private. The user can check at https://github.com/vaibhavvijay10/Vaibhav-portfolio (look for the lock icon next to the repo name). If public, anyone can see the code (this is fine — it's a personal portfolio, not a secret). Sensitive items like API keys would need to move to Vercel Environment Variables; currently there are zero env vars in the project.
- **No `.env` file exists.** Build does not require any environment variables. `.gitignore` would catch one if added, but currently there's nothing to gitignore.
- **Wouter routing quirk.** `ScrollToTop.tsx` uses `behavior: "instant"` (not "smooth") on route changes — intentional, smooth-scroll on a navigation feels janky vs an instant snap. Hash anchors (`/#about`) skip the scroll reset and rely on `HomePage.tsx`'s hash-detection effect.
- **Build output is `dist/`** (not `build/` or `out/`). If a tool ever asks "where is your build output?", it's `dist`.

## I. Single-page reference: every URL the user might need

```
SITE URLs
  Production:        https://vaibhavvijay.com
  www redirect:      https://www.vaibhavvijay.com (308 -> apex)
  Vercel preview:    https://vaibhav-portfolio-flame.vercel.app
  Sitemap:           https://vaibhavvijay.com/sitemap.xml
  Robots:            https://vaibhavvijay.com/robots.txt
  llms.txt:          https://vaibhavvijay.com/llms.txt

CODE / DEPLOY
  GitHub repo:       https://github.com/vaibhavvijay10/Vaibhav-portfolio
  Vercel dashboard:  https://vercel.com/dashboard
  Vercel project:    https://vercel.com/vaibhavvijay10/vaibhav-portfolio (probably; varies by account)

DOMAIN
  Hostinger:         https://hpanel.hostinger.com (Domains -> vaibhavvijay.com -> DNS)

SEO / SEARCH
  Google Search Console:    https://search.google.com/search-console
  Bing Webmaster Tools:     https://www.bing.com/webmasters
  Schema validator:         https://validator.schema.org
  Google Rich Results Test: https://search.google.com/test/rich-results
  PageSpeed Insights:       https://pagespeed.web.dev

SOCIAL CACHE-PRIMING
  LinkedIn Post Inspector:  https://www.linkedin.com/post-inspector/
  Facebook Sharing Debug:   https://developers.facebook.com/tools/debug/
  Twitter Card Validator:   https://cards-dev.twitter.com/validator

ANALYTICS
  Vercel Analytics:    https://vercel.com/dashboard -> project -> Analytics tab
  Vercel Speed Insights: https://vercel.com/dashboard -> project -> Speed Insights tab
  Google Search Console -> Performance: query data, impressions, CTR
  Bing Webmaster Tools -> AI Performance (beta): when ChatGPT/Copilot cites you
```


# Vaibhav Vijay — Portfolio (Vercel-ready)

Production-ready, static-deployable copy of the portfolio originally hosted on
Manus. Looks identical to https://vaibhavfolio-ltsa5bgv.manus.space, but with
**no Manus watermark / runtime**, a hardened **SEO + GEO + AEO** stack, and a
clean Vite + React 19 + Tailwind v4 build.

---

## What changed vs. the Manus export

Removed:

- `vite-plugin-manus-runtime`, `@builder.io/vite-plugin-jsx-loc`, the in-house
  Manus debug-collector plugin
- `client/public/__manus__/` debug script
- Unused `ManusDialog.tsx`, `Map.tsx`, scaffolding `pages/` (Home/NotFound),
  `shared/`, `const.ts`
- `server/` (Express was only there to serve the static build — Vercel does this)
- The `<script>` line that left raw `%VITE_ANALYTICS_ENDPOINT%` placeholders
  in the rendered HTML
- `wouter` patch reference that pointed at a missing `patches/` folder

Restructured:

- Project now mounts at the repo root (no nested `client/`)
- Single Vite config, single `tsconfig.json`, single `package.json`

Added / improved:

- `vercel.json` with SPA rewrites, security headers (HSTS, XFO, Referrer-Policy,
  Permissions-Policy), correct `Content-Type` for `sitemap.xml` and
  `site.webmanifest`, immutable cache for hashed assets
- `index.html` rebuilt from scratch with: hreflang, OG profile tags, Twitter
  card, GEO microdata + ICBM, Dublin Core, AI declaration, preconnect/dns-prefetch
- 6 JSON-LD blocks: `Person`, `ProfessionalService`, `WebSite`, `WebPage`,
  `BreadcrumbList`, `FAQPage`
- `llms.txt` (proposed AEO standard) and `ai.txt` (training-policy declaration)
  with explicit allow rules for GPTBot, ClaudeBot, PerplexityBot,
  Google-Extended, Applebot-Extended, etc.
- `humans.txt`, `site.webmanifest`, SVG favicon (matches the navigation "VV"
  mark)
- Sitemap rewritten — hash anchors removed (search engines collapse them to
  the root) and replaced with image extensions + hreflang

---

## Local development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # → dist/
npm run preview # serve the production build locally
npm run check   # TypeScript-only typecheck
```

Verified: `npm run build` produces ~109 kB gzipped JS, TypeScript passes
with no errors.

---

## Three things to add before launch (binary assets I cannot generate)

These are referenced in `index.html` and `site.webmanifest`. Until you add
them you will get 404s in dev tools (the page still renders fine):

1. **`public/og-image.jpg`** — 1200×630 social share card.
   Used by LinkedIn, X, WhatsApp, Slack.
   Suggested tools: Figma, Canva, [og-playground.vercel.app](https://og-playground.vercel.app/),
   or Vercel's [@vercel/og](https://vercel.com/docs/og-image-generation).
2. **`public/apple-touch-icon.png`** — 180×180 PNG for iOS Add-to-Home-Screen.
   Easiest path: open `favicon.svg` in any image editor, export 180×180 PNG.
3. **`public/favicon.ico`** — multi-size ICO for old IE / Edge legacy.
   Optional. Modern browsers use `favicon.svg` already.
   Convert at [realfavicongenerator.net](https://realfavicongenerator.net/) from
   the existing `favicon.svg`.

---

## Deploying to Vercel (free tier)

You don't strictly need GitHub — Vercel can deploy from the CLI directly — but
the GitHub flow gives you free auto-deploys on every commit, which is the
recommended path.

### Path A — GitHub + Vercel (recommended)

1. **Create a GitHub repo** (free):
   - Go to https://github.com/new
   - Name: `vaibhav-portfolio` (or anything), Private or Public
   - **Do not** initialize with a README — we already have one
2. **Push this folder to GitHub** (run from inside `vaibhav-portfolio-vercel/`):
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Vercel-ready portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/vaibhav-portfolio.git
   git push -u origin main
   ```
3. **Sign up at https://vercel.com** with that same GitHub account (free, no
   credit card).
4. Click **Add New → Project** → import the repo. Vercel will auto-detect Vite.
   Leave all defaults (`Framework: Vite`, build command `npm run build`,
   output `dist`). Click **Deploy**.
5. ~30 seconds later you'll get a `*.vercel.app` URL. Open it. Verify the site
   matches the Manus version.

### Path B — Vercel CLI only (no GitHub)

```bash
npm install -g vercel
vercel login
vercel        # follow prompts; choose "Vite" preset
vercel --prod # promote to production
```

You can switch to Path A later without redeploying.

---

## Connecting `vaibhavvijay.com` from Hostinger

1. In Vercel, open the project → **Settings → Domains** → add
   `vaibhavvijay.com` **and** `www.vaibhavvijay.com`. Vercel will show you the
   exact DNS records it expects — usually:
   - `A` record on the apex (`@`) → `76.76.21.21`
   - `CNAME` on `www` → `cname.vercel-dns.com`
2. In **Hostinger** → **hPanel → Domains → vaibhavvijay.com → DNS / Nameservers
   → Manage DNS Records**:
   - Delete any existing `A`, `AAAA`, or `CNAME` records on `@` and `www`
     that conflict
   - Add the records Vercel showed you
   - Leave MX records alone if you use Hostinger email
3. Wait 5–60 minutes for DNS propagation. Vercel auto-issues a Let's Encrypt
   SSL certificate as soon as DNS resolves — you do **not** need to buy SSL
   from Hostinger.
4. Set the **production** redirect: in Vercel **Settings → Domains**, mark
   `vaibhavvijay.com` as the primary and have `www.vaibhavvijay.com` redirect
   to it (or vice-versa — pick one and stick with it).

> Hostinger has a built-in option to "point domain to Vercel" via nameserver
> change too — that works but **is not recommended** because you'll lose
> control of MX (email), TXT (verifications) and other records. Stick with the
> A/CNAME approach above.

---

## SEO / GEO / AEO checklist (do these once, post-launch)

After your domain is live and SSL is green:

- [ ] **Google Search Console** — add `https://vaibhavvijay.com/`, verify via
      DNS TXT, submit `https://vaibhavvijay.com/sitemap.xml`
- [ ] **Bing Webmaster Tools** — same drill, will pull from Search Console if
      you import
- [ ] **Schema validation** — paste the live URL into
      [validator.schema.org](https://validator.schema.org/) and Google's
      [Rich Results Test](https://search.google.com/test/rich-results). All
      6 JSON-LD blocks should validate; FAQPage should be eligible for rich
      results.
- [ ] **Social previews** — test in
      [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/),
      [Twitter Card Validator](https://cards-dev.twitter.com/validator) and
      [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/).
      First share triggers their cache-prime — **do this before sharing on
      LinkedIn**, otherwise the cached version with no OG image sticks for
      24 h.
- [ ] **PageSpeed Insights** — run https://pagespeed.web.dev/ on the production
      URL. Target Performance ≥ 90, SEO 100, Best Practices ≥ 95.
- [ ] **AEO smoke test** — ask "Who is Vaibhav Vijay?" in ChatGPT (web search
      enabled), Perplexity, Google AI Overviews. Re-test in 7–14 days; LLM
      indexes lag.
- [ ] **`og-image.jpg` real artwork** — see "Three things to add" above.

---

## Project structure

```
vaibhav-portfolio-vercel/
├── index.html              # SEO/GEO/AEO meta + 6× JSON-LD
├── package.json            # No Manus deps; React 19 + Vite 7
├── tsconfig.json           # @/* alias → ./src/*
├── vercel.json             # SPA rewrites, security headers, MIME types
├── vite.config.ts          # 25 lines, no plugins beyond react+tailwind
├── public/
│   ├── robots.txt          # Allows Google, Bing, GPTBot, ClaudeBot, …
│   ├── sitemap.xml         # Single-URL sitemap with image extensions
│   ├── llms.txt            # Proposed AEO standard
│   ├── ai.txt              # Training-data permissions
│   ├── humans.txt
│   ├── site.webmanifest    # PWA manifest
│   ├── favicon.svg         # "VV" cyan tile
│   ├── profile.jpg         # Already provided
│   └── Resume-VaibhavVijay.pdf
└── src/                    # React app — unchanged from original
    ├── App.tsx, main.tsx, index.css
    ├── components/         # Hero, About, Experience, Skills, Blog, Contact, …
    ├── components/ui/      # shadcn/Radix primitives
    ├── contexts/, hooks/, lib/
```

---

## Note on `seoOptimization.ts`

`src/lib/seoOptimization.ts` exists but is unused at runtime — kept in case
you want to adopt it later for per-page dynamic JSON-LD. Tree-shaking removes
it from the production bundle, so it has zero size cost.

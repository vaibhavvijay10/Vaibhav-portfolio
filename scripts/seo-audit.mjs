// SEO/GEO audit of the built dist/ folder. Run after `npm run build`: node scripts/seo-audit.mjs  (add --titles to list every title and description length)
import fs from "node:fs";
import path from "node:path";

const ROOT = path.resolve(process.argv[2] || ".");
const DIST = path.join(ROOT, "dist");
const PUBLIC = path.join(ROOT, "public");
const SITE = "https://vaibhavvijay.com";
const TODAY = new Date(Date.now() + 36e5 * 24).toISOString().slice(0, 10); // +1 day tolerance for timezones

const issues = [];
const add = (route, check, detail) => issues.push({ route, check, detail });

function walk(dir, out = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else out.push(p);
  }
  return out;
}

const allFiles = walk(DIST);
const htmlFiles = allFiles.filter((f) => f.endsWith("index.html"));
const routeOf = (f) => {
  const rel = path.relative(DIST, path.dirname(f)).split(path.sep).join("/");
  return rel ? `/${rel}` : "/";
};
const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function meta(html, attr, key) {
  const re = new RegExp(`<meta\\s+${attr}="${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\s+content="([^"]*)"`, "g");
  return [...html.matchAll(re)].map((m) => decode(m[1]));
}

const pages = [];
const titles = new Map();
const descs = new Map();
const FAQ_ALLOWED = (r) => r === "/" || r === "/about" || r.startsWith("/answers/");

for (const f of htmlFiles) {
  const route = routeOf(f);
  const html = fs.readFileSync(f, "utf-8");
  const robots = meta(html, "name", "robots")[0] || "";
  const noindex = /noindex/.test(robots);
  pages.push({ route, html, noindex });
  if (noindex) continue;

  const titleM = [...html.matchAll(/<title>([^<]*)<\/title>/g)];
  if (titleM.length !== 1) add(route, "title", `found ${titleM.length} <title> tags`);
  const title = titleM[0] ? decode(titleM[0][1]) : "";
  if (!title) add(route, "title", "missing");
  else {
    if (title.length > 60) add(route, "title-length", `${title.length} chars: ${title}`);
    titles.set(title, [...(titles.get(title) || []), route]);
  }

  const d = meta(html, "name", "description");
  if (d.length !== 1) add(route, "description", `found ${d.length}`);
  const desc = d[0] || "";
  if (desc && (desc.length < 120 || desc.length > 160)) add(route, "description-length", `${desc.length} chars`);
  if (desc) descs.set(desc, [...(descs.get(desc) || []), route]);

  const h1 = (html.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) add(route, "h1", `found ${h1}`);

  const canon = [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1]);
  const expected = route === "/" ? `${SITE}/` : `${SITE}${route}`;
  if (canon.length !== 1) add(route, "canonical", `found ${canon.length}`);
  else if (canon[0] !== expected) add(route, "canonical", `${canon[0]} != ${expected}`);

  for (const k of ["og:url", "og:title", "og:description", "og:image"]) {
    const v = meta(html, "property", k);
    if (!v.length || !v[0]) add(route, k, "missing");
    if (k === "og:url" && v[0] && v[0] !== expected) add(route, "og:url", `${v[0]} != ${expected}`);
    if (k === "og:image" && v[0] && v[0].startsWith(SITE)) {
      const p = v[0].slice(SITE.length);
      if (!fs.existsSync(path.join(DIST, p))) add(route, "og:image", `file missing: ${p}`);
    }
  }
  for (const k of ["twitter:title", "twitter:description", "twitter:image"]) {
    if (!meta(html, "name", k).length) add(route, k, "missing");
  }

  // JSON-LD
  const lds = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  const types = [];
  for (const m of lds) {
    try {
      const j = JSON.parse(m[1]);
      const arr = Array.isArray(j) ? j : j["@graph"] || [j];
      for (const x of arr) {
        types.push(x["@type"]);
        if (x["@type"] === "BlogPosting") {
          for (const k of ["datePublished", "dateModified", "mainEntityOfPage", "author", "headline", "image"])
            if (!x[k]) add(route, "BlogPosting", `missing ${k}`);
          if (x.author && x.author["@id"] !== `${SITE}/#person`) add(route, "BlogPosting", "author @id wrong");
        }
        if (x["@type"] === "WebPage" && x.url && x.url !== expected && route !== "/")
          add(route, "jsonld-webpage", `inherited WebPage for ${x.url}`);
        if (x["@type"] === "BreadcrumbList" && route !== "/") {
          const last = x.itemListElement?.[x.itemListElement.length - 1]?.item;
          if (last && last !== expected) add(route, "jsonld-breadcrumb", `breadcrumb ends at ${last}`);
        }
      }
    } catch (e) {
      add(route, "jsonld-parse", e.message);
    }
  }
  if (types.includes("FAQPage") && !FAQ_ALLOWED(route)) add(route, "faqpage", "FAQPage on a page without visible Q&A");
  if (FAQ_ALLOWED(route) && !types.includes("FAQPage")) add(route, "faqpage", "expected FAQPage missing");
  if (route.startsWith("/blog/") && !types.includes("BlogPosting")) add(route, "BlogPosting", "missing");
  const dupIds = {};
  pages.at(-1).types = types;

  // images
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]+"/.test(m[0])) add(route, "img-alt", m[0].slice(0, 100));
  }
}
for (const [t, rs] of titles) if (rs.length > 1) add(rs.join(", "), "title-duplicate", t);
for (const [d, rs] of descs) if (rs.length > 1) add(rs.join(", "), "description-duplicate", d.slice(0, 60));

// Internal links
const routeSet = new Set(pages.map((p) => p.route));
const linkTargets = new Map();
function resolves(href) {
  let p = href.split("#")[0].split("?")[0];
  if (p === "" || p === "/") return true;
  p = decodeURIComponent(p).replace(/\/$/, "");
  if (routeSet.has(p)) return true;
  if (fs.existsSync(path.join(DIST, p)) && fs.statSync(path.join(DIST, p)).isFile()) return true;
  return false;
}
for (const { route, html } of pages) {
  for (const m of html.matchAll(/\bhref="(\/[^"]*)"/g)) {
    if (m[1].startsWith("//")) continue;
    if (!resolves(decode(m[1]))) add(route, "broken-link", m[1]);
  }
  for (const m of html.matchAll(/\bsrc="(\/[^"]*)"/g)) {
    if (!resolves(decode(m[1]))) add(route, "broken-src", m[1]);
  }
  if (/igaming\.vaibhavvijay\.com/i.test(html)) add(route, "igaming-subdomain", "mention found");
}
// Links inside source (SPA) too
for (const f of walk(path.join(ROOT, "src")).filter((f) => /\.(tsx?|ts)$/.test(f))) {
  const s = fs.readFileSync(f, "utf-8");
  for (const m of s.matchAll(/(?:to|href)=["{`]+(\/[a-zA-Z0-9\-_/.#?=&]*)["}`]/g)) {
    const h = m[1];
    if (h.includes("${")) continue;
    if (!resolves(h)) add(path.relative(ROOT, f), "src-broken-link", h);
  }
  for (const m of s.matchAll(/"href":\s*"(\/[^"]*)"/g)) if (!resolves(m[1])) add(path.relative(ROOT, f), "src-broken-link", m[1]);
  if (/igaming\.vaibhavvijay\.com/i.test(s)) add(path.relative(ROOT, f), "igaming-subdomain", "mention found");
}

// llms files
for (const name of ["llms.txt", "llms-full.txt"]) {
  const p = path.join(DIST, name);
  if (!fs.existsSync(p)) {
    add(`/${name}`, "llms", "missing");
    continue;
  }
  const s = fs.readFileSync(p, "utf-8");
  for (const m of s.matchAll(/https:\/\/vaibhavvijay\.com(\/[^\s)\]>"]*)?/g)) {
    const h = m[1] || "/";
    if (!resolves(h)) add(`/${name}`, "broken-link", h);
  }
  if (/igaming\.vaibhavvijay\.com/i.test(s)) add(`/${name}`, "igaming-subdomain", "mention found");
}

// Sitemap vs routes
const sm = fs.readFileSync(path.join(DIST, "sitemap.xml"), "utf-8");
const urls = [...sm.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => ({
  loc: (m[1].match(/<loc>([^<]*)<\/loc>/) || [])[1],
  lastmod: (m[1].match(/<lastmod>([^<]*)<\/lastmod>/) || [])[1],
  body: m[1],
}));
const smLocs = new Set(urls.map((u) => u.loc));
for (const p of pages) {
  if (p.noindex) continue;
  const u = p.route === "/" ? `${SITE}/` : `${SITE}${p.route}`;
  if (!smLocs.has(u)) add(p.route, "sitemap-missing", u);
}
const seenLoc = new Set();
for (const u of urls) {
  if (seenLoc.has(u.loc)) add(u.loc, "sitemap-duplicate", "");
  seenLoc.add(u.loc);
  const r = u.loc.slice(SITE.length) || "/";
  if (!resolves(r)) add(u.loc, "sitemap-stale", "no such route/file");
  if (!u.lastmod || !/^\d{4}-\d{2}-\d{2}$/.test(u.lastmod)) add(u.loc, "sitemap-lastmod", `bad: ${u.lastmod}`);
  else if (u.lastmod > TODAY) add(u.loc, "sitemap-lastmod", `future: ${u.lastmod}`);
  for (const im of u.body.matchAll(/<image:loc>([^<]*)<\/image:loc>/g)) {
    const r2 = im[1].slice(SITE.length);
    if (!resolves(r2)) add(u.loc, "sitemap-image-missing", r2);
  }
}
// lastmod vs blog isoDate in built page
for (const p of pages) {
  if (!p.route.startsWith("/blog/")) continue;
  const m = p.html.match(/"datePublished":"([^"]+)"/);
  const u = urls.find((x) => x.loc === `${SITE}${p.route}`);
  if (m && u && u.lastmod && u.lastmod < m[1]) add(p.route, "sitemap-lastmod", `${u.lastmod} older than datePublished ${m[1]}`);
}

// vercel rewrites
const vercel = JSON.parse(fs.readFileSync(path.join(ROOT, "vercel.json"), "utf-8"));
const rewrites = vercel.rewrites || [];
function matchRewrite(route) {
  for (const r of rewrites) {
    const src = r.source;
    let re;
    if (src.startsWith("/((?!")) re = new RegExp("^" + src + "$");
    else re = new RegExp("^" + src.replace(/:(\w+)/g, "(?<$1>[^/]+)") + "$");
    const m = route.match(re);
    if (m) {
      let dest = r.destination;
      for (const [k, v] of Object.entries(m.groups || {})) dest = dest.replace(`:${k}`, v);
      return dest;
    }
  }
  return null;
}
for (const p of pages) {
  if (p.route === "/") continue;
  const dest = matchRewrite(p.route);
  const want = `${p.route}/index.html`;
  if (dest !== want) add(p.route, "vercel-rewrite", `resolves to ${dest}, expected ${want}`);
}
for (const r of rewrites) {
  if (r.destination.includes(":")) continue;
  if (!fs.existsSync(path.join(DIST, r.destination))) add(r.source, "vercel-rewrite", `destination missing ${r.destination}`);
}

// Output
console.log(`Audited ${pages.length} HTML routes (${pages.filter((p) => p.noindex).length} noindex skipped)`);
const byCheck = {};
for (const i of issues) (byCheck[i.check] ||= []).push(i);
for (const [c, list] of Object.entries(byCheck)) {
  console.log(`\n== ${c} (${list.length})`);
  for (const i of list) console.log(`  ${i.route}  ${i.detail}`);
}
if (!issues.length) console.log("No issues.");
if (process.argv.includes("--titles")) {
  for (const p of pages) {
    const t = (p.html.match(/<title>([^<]*)<\/title>/) || [])[1];
    const d = meta(p.html, "name", "description")[0] || "";
    console.log(`${p.route} | ${t?.length} | ${d.length} | ${decode(t || "")}`);
  }
}

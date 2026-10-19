/**
 * Post-build prerender script.
 *
 * For each blog post in src/data/blog-posts.ts, generate a static HTML file at
 *   dist/blog/<slug>/index.html
 * with post-specific <title>, meta tags, OG/Twitter cards, canonical URL, and
 * BlogPosting JSON-LD baked into the head.
 *
 * The <body> still mounts the SPA, so client-side navigation and interactivity
 * are unchanged. The static HTML exists purely so non-JS crawlers (GPTBot,
 * ClaudeBot, PerplexityBot when running text-only) and slow networks see the
 * correct meta data and structured data without executing JavaScript.
 */

import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE_URL = "https://vaibhavvijay.com";
const ROOT = path.resolve(".");
const DIST = path.join(ROOT, "dist");

// Load blog posts. The TS file is small and import-clean, so we read it as text
// and pull out a JSON-friendly structure with a tiny eval-free parser.
async function loadPosts() {
  const src = await fs.readFile(
    path.join(ROOT, "src", "data", "blog-posts.ts"),
    "utf-8"
  );

  // Find each `{ id: ..., slug: ..., ... }` post-object entry. We use a
  // permissive regex that captures the entire object literal between the
  // outermost braces of each post.
  const posts = [];
  const startMarker = /\{\s*id:\s*"/g;
  let match;
  while ((match = startMarker.exec(src)) !== null) {
    let depth = 0;
    let i = match.index;
    let start = i;
    for (; i < src.length; i++) {
      const ch = src[i];
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          const block = src.slice(start, i + 1);
          posts.push(parseBlock(block));
          break;
        }
      } else if (ch === "`") {
        // Skip template literal — find matching backtick (no nested templates)
        i++;
        while (i < src.length && src[i] !== "`") {
          if (src[i] === "\\") i++;
          i++;
        }
      } else if (ch === '"') {
        i++;
        while (i < src.length && src[i] !== '"') {
          if (src[i] === "\\") i++;
          i++;
        }
      }
    }
    startMarker.lastIndex = i + 1;
  }
  return posts;
}

function pluck(block, key) {
  // Match `key: "..."` or `key: '...'` (TypeScript allows both for string literals).
  const dq = new RegExp(`${key}:\\s*"((?:\\\\.|[^"\\\\])*)"`);
  const sq = new RegExp(`${key}:\\s*'((?:\\\\.|[^'\\\\])*)'`);
  const m = block.match(dq) ?? block.match(sq);
  if (!m) return undefined;
  return m[1].replace(/\\"/g, '"').replace(/\\'/g, "'").replace(/\\\\/g, "\\");
}

function pluckTemplate(block, key) {
  // Match `key: \`...\``
  const re = new RegExp(`${key}:\\s*\`([\\s\\S]*?)\``, "m");
  const m = block.match(re);
  return m ? m[1] : undefined;
}

function pluckArray(block, key) {
  // Walk balanced [...] honouring string boundaries — so commas inside
  // string literals don't get treated as array separators.
  const startMatch = block.match(new RegExp(`${key}:\\s*\\[`));
  if (!startMatch) return [];
  let i = startMatch.index + startMatch[0].length;
  let depth = 1;
  const start = i;
  while (i < block.length && depth > 0) {
    const ch = block[i];
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) break;
    } else if (ch === '"' || ch === "'") {
      const quote = ch;
      i++;
      while (i < block.length && block[i] !== quote) {
        if (block[i] === "\\") i++;
        i++;
      }
    }
    i++;
  }
  const arrBody = block.slice(start, i);

  // Extract each string literal from the array body
  const items = [];
  let j = 0;
  while (j < arrBody.length) {
    const ch = arrBody[j];
    if (ch === '"' || ch === "'") {
      const quote = ch;
      j++;
      const strStart = j;
      while (j < arrBody.length && arrBody[j] !== quote) {
        if (arrBody[j] === "\\") {
          j += 2;
          continue;
        }
        j++;
      }
      items.push(
        arrBody
          .slice(strStart, j)
          .replace(/\\"/g, '"')
          .replace(/\\'/g, "'")
          .replace(/\\\\/g, "\\")
      );
    }
    j++;
  }
  return items;
}

/**
 * Parse a `gallery: [ { url: "...", alt: "..." }, ... ]` field.
 * The array may span multiple lines and contain commas inside the alt text,
 * so we walk the brace-balanced structure manually.
 */
function pluckGallery(block) {
  const startMatch = block.match(/gallery:\s*\[/);
  if (!startMatch) return [];
  let i = startMatch.index + startMatch[0].length;
  let depth = 1;
  let start = i;
  while (i < block.length && depth > 0) {
    const ch = block[i];
    if (ch === "[") depth++;
    else if (ch === "]") {
      depth--;
      if (depth === 0) break;
    } else if (ch === '"') {
      i++;
      while (i < block.length && block[i] !== '"') {
        if (block[i] === "\\") i++;
        i++;
      }
    }
    i++;
  }
  const arrBody = block.slice(start, i);
  // Now extract each {...} entry
  const items = [];
  let j = 0;
  while (j < arrBody.length) {
    if (arrBody[j] === "{") {
      let d = 1;
      const objStart = j + 1;
      j++;
      while (j < arrBody.length && d > 0) {
        if (arrBody[j] === "{") d++;
        else if (arrBody[j] === "}") {
          d--;
          if (d === 0) break;
        } else if (arrBody[j] === '"') {
          j++;
          while (j < arrBody.length && arrBody[j] !== '"') {
            if (arrBody[j] === "\\") j++;
            j++;
          }
        }
        j++;
      }
      const objBody = arrBody.slice(objStart, j);
      items.push({
        url: pluck(objBody, "url"),
        alt: pluck(objBody, "alt"),
      });
    }
    j++;
  }
  return items.filter((it) => it.url);
}

function parseBlock(block) {
  return {
    id: pluck(block, "id"),
    slug: pluck(block, "slug"),
    title: pluck(block, "title"),
    excerpt: pluck(block, "excerpt"),
    content: pluckTemplate(block, "content") ?? "",
    date: pluck(block, "date"),
    isoDate: pluck(block, "isoDate"),
    dateModified: pluck(block, "dateModified"),
    updatedIsoDate: pluck(block, "updatedIsoDate"),
    linkedinUrl: pluck(block, "linkedinUrl"),
    infographicUrl: pluck(block, "infographicUrl"),
    gallery: pluckGallery(block),
    tags: pluckArray(block, "tags"),
  };
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function escapeJson(s) {
  return JSON.stringify(s).slice(1, -1);
}

// ============================================================================
// SEO helpers. These mirror src/lib/seo.ts so the static HTML (for crawlers
// that do not run JavaScript) and the SPA (for Google, which does) produce the
// same <title> and meta description. Change both together.
// ============================================================================
const BRAND_SUFFIX = " | Vaibhav Vijay";
const TITLE_MAX = 60;
const DESC_MAX = 160;
const DESC_MIN = 120;
const PERSON_ID = `${SITE_URL}/#person`;

const SEO_OVERRIDES = JSON.parse(
  await fs.readFile(path.join(ROOT, "src", "data", "seo-overrides.json"), "utf-8")
);

function seoTitle(base) {
  const withBrand = `${base}${BRAND_SUFFIX}`;
  return withBrand.length <= TITLE_MAX ? withBrand : base;
}

function seoDescription(text) {
  const t = String(text ?? "").replace(/\s+/g, " ").trim();
  if (t.length <= DESC_MAX) return t;
  const sentences = t.match(/[^.!?]+[.!?]+(\s|$)/g) ?? [t];
  let out = "";
  for (const s of sentences) {
    if ((out + s).trim().length > DESC_MAX) break;
    out += s;
  }
  out = out.trim();
  if (out.length >= DESC_MIN) return out;
  const cut = t.slice(0, DESC_MAX - 1);
  return cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:\s—–-]+$/, "") + "…";
}

const blogTitle = (post) => seoTitle(SEO_OVERRIDES.blog?.[post.slug]?.title ?? post.title);
const answerTitle = (a) => seoTitle(SEO_OVERRIDES.answers?.[a.slug]?.title ?? a.question);

// Related answers for a blog post (mirror of getRelatedAnswers in src/lib/seo.ts)
const GENERIC_TAGS = new Set(["ai", "india", "strategy", "marketing", "growth", "cost", "b2b"]);
const normTag = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
function tagScore(a, b) {
  const na = normTag(a);
  const nb = normTag(b);
  if (!na || !nb) return 0;
  if (na === nb) return GENERIC_TAGS.has(na) ? 0 : 2;
  const [short, long] = na.length <= nb.length ? [na, nb] : [nb, na];
  if (GENERIC_TAGS.has(short)) return 0;
  const longWords = new Set(long.split(" "));
  return short.split(" ").every((w) => longWords.has(w)) ? 1 : 0;
}
const SLUG_STOPWORDS = new Set(["with", "from", "your", "what", "does", "have", "that", "this", "into", "india", "biggest"]);
const slugWords = (slug) => new Set(slug.split("-").filter((w) => w.length >= 4 && !SLUG_STOPWORDS.has(w)));
function getRelatedAnswers(post, answers, limit = 3) {
  const postWords = slugWords(post.slug);
  return answers
    .map((a) => {
      const tagPoints = a.tags.reduce(
        (sum, at) => sum + Math.max(0, ...post.tags.map((pt) => tagScore(pt, at))),
        0
      );
      const slugPoints = [...slugWords(a.slug)].filter((w) => postWords.has(w)).length * 2;
      return { a, tagPoints, score: tagPoints + slugPoints };
    })
    .filter((x) => x.tagPoints > 0)
    .sort((x, y) => y.score - x.score || y.a.isoDate.localeCompare(x.a.isoDate))
    .slice(0, limit)
    .map((x) => x.a);
}

// Related posts (mirror of getRelatedPosts in src/data/topics.ts)
function getRelatedPosts(post, posts, limit = 3) {
  const postTags = new Set(post.tags.map((t) => t.toLowerCase()));
  return posts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ post: p, overlap: p.tags.filter((t) => postTags.has(t.toLowerCase())).length }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) => b.overlap - a.overlap || b.post.isoDate.localeCompare(a.post.isoDate))
    .slice(0, limit)
    .map((x) => x.post);
}

function breadcrumbLd(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map(([name, item], i) => ({
      "@type": "ListItem",
      position: i + 1,
      name,
      item,
    })),
  };
}

/** A JSON-LD block with a fixed element id. Using the same id the SPA uses
 * means the SPA replaces the block on mount instead of adding a duplicate. */
const ld = (id, data) => ({ __id: id, data });

/** index.html carries a WebPage and BreadcrumbList that describe the homepage
 * only. Remove them from every other route's head. */
function stripHomeOnlyBlocks(head) {
  return head.replace(
    /\s*<!--[^>]*?-->\s*(?=<script type="application\/ld\+json" data-home-only)/g,
    "\n    "
  ).replace(/<script type="application\/ld\+json" data-home-only(?:="")?>[\s\S]*?<\/script>\s*/g, "");
}

function buildHead(post, baseHead) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = blogTitle(post);
  warnLongTitle(`/blog/${post.slug}`, title);
  const description = seoDescription(post.excerpt);
  const image = post.infographicUrl
    ? `${SITE_URL}${post.infographicUrl}`
    : `${SITE_URL}/og-vaibhav-vijay.jpg`;

  // Replace title
  let head = baseHead.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );

  // Replace meta description
  head = head.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(description)}"`
  );

  // Replace canonical
  head = head.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${url}"`
  );

  // Replace alternate hreflang
  head = head.replace(
    /<link rel="alternate" hreflang="en" href="[^"]*"/,
    `<link rel="alternate" hreflang="en" href="${url}"`
  );
  head = head.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*"/,
    `<link rel="alternate" hreflang="x-default" href="${url}"`
  );

  // OG tags
  head = head.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="article"`
  );
  head = head.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${url}"`
  );
  head = head.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeHtml(post.title)}"`
  );
  head = head.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(description)}"`
  );
  head = head.replace(
    /<meta property="og:image" content="[^"]*"/g,
    `<meta property="og:image" content="${image}"`
  );
  head = head.replace(
    /<meta property="og:image:secure_url" content="[^"]*"/,
    `<meta property="og:image:secure_url" content="${image}"`
  );
  head = head.replace(
    /<meta property="og:image:alt" content="[^"]*"/,
    `<meta property="og:image:alt" content="${escapeHtml(post.title)}"`
  );

  // Twitter
  head = head.replace(
    /<meta name="twitter:url" content="[^"]*"/,
    `<meta name="twitter:url" content="${url}"`
  );
  head = head.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeHtml(post.title)}"`
  );
  head = head.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(description)}"`
  );
  head = head.replace(
    /<meta name="twitter:image" content="[^"]*"/g,
    `<meta name="twitter:image" content="${image}"`
  );
  head = head.replace(
    /<meta name="twitter:image:alt" content="[^"]*"/,
    `<meta name="twitter:image:alt" content="${escapeHtml(post.title)}"`
  );

  // Inject BlogPosting JSON-LD just before </head>. dateModified uses an
  // optional `dateModified` / `updatedIsoDate` field on the post when present.
  const modified = post.dateModified ?? post.updatedIsoDate ?? post.isoDate;
  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    headline: post.title,
    description: post.excerpt,
    image: [image],
    datePublished: post.isoDate,
    dateModified: modified,
    url: url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Vaibhav Vijay",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      "@id": PERSON_ID,
      name: "Vaibhav Vijay",
    },
    isPartOf: { "@id": `${SITE_URL}/#website` },
    articleSection: post.tags[0],
    inLanguage: "en",
    wordCount: post.content.split(/\s+/).filter(Boolean).length,
    articleBody: post.content,
  };

  const blocks = [
    `<script type="application/ld+json" id="blog-post-jsonld">${JSON.stringify(
      blogPostingLd
    ).replace(/</g, "\\u003c")}</script>`,
    `<script type="application/ld+json" id="blog-breadcrumb-jsonld">${JSON.stringify(
      breadcrumbLd([
        ["Home", `${SITE_URL}/`],
        [post.title, url],
      ])
    ).replace(/</g, "\\u003c")}</script>`,
  ];

  head = head.replace("</head>", `${blocks.join("\n  ")}\n  </head>`);

  return head;
}

function buildBodyPreview(post, posts, answers) {
  // Inject a hidden but crawlable text block so non-JS crawlers (GPTBot,
  // ClaudeBot) can read the full post content even before the SPA mounts.
  const url = `${SITE_URL}/blog/${post.slug}`;
  const safeTitle = escapeHtml(post.title);
  const safeTags = post.tags.map(escapeHtml).join(", ");
  const relatedAnswers = getRelatedAnswers(post, answers, 3);
  const relatedPosts = getRelatedPosts(post, posts, 3);

  return `
    <noscript>
      <article style="max-width:720px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a;">
        <p><a href="/#blog">&larr; All articles</a></p>
        <h1>${safeTitle}</h1>
        <p><time datetime="${post.isoDate}">${escapeHtml(
    post.date
  )}</time> &middot; By Vaibhav Vijay &middot; ${safeTags}</p>
        ${
          post.infographicUrl
            ? `<img src="${escapeHtml(post.infographicUrl)}" alt="${safeTitle}" style="max-width:100%;height:auto;border-radius:8px;margin:1.5rem 0;" />`
            : ""
        }
        ${renderInterleavedBody(post)}
        <p><a href="${escapeHtml(post.linkedinUrl)}">Read &amp; engage on LinkedIn</a></p>
        <p><a href="${url}">Permalink</a></p>
        ${
          relatedAnswers.length
            ? `<section><h2>Related answers</h2><ul>${relatedAnswers
                .map(
                  (a) =>
                    `<li><a href="/answers/${escapeHtml(a.slug)}">${escapeHtml(a.question)}</a><br>${escapeHtml(a.shortAnswer)}</li>`
                )
                .join("")}</ul></section>`
            : ""
        }
        ${
          relatedPosts.length
            ? `<section><h2>Related articles</h2><ul>${relatedPosts
                .map((p) => `<li><a href="/blog/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a></li>`)
                .join("")}</ul></section>`
            : ""
        }
      </article>
    </noscript>`;
}

/**
 * Renders the article body with gallery images interleaved between
 * content paragraphs (so images don't stack back-to-back at the end).
 * Mirrors the React component's distribution algorithm exactly.
 */
function renderInterleavedBody(post) {
  const paragraphs = post.content.split(/\n\n+/);
  const gallery = post.gallery ?? [];

  const imagePositions =
    gallery.length > 0
      ? gallery.map((_, i) =>
          Math.floor(((i + 1) * paragraphs.length) / (gallery.length + 1))
        )
      : [];

  const figureFor = (img) =>
    `<figure style="margin:2rem 0;"><img src="${escapeHtml(
      img.url
    )}" alt="${escapeHtml(img.alt ?? post.title)}" style="max-width:100%;height:auto;border-radius:8px;" />${
      img.alt
        ? `<figcaption style="font-size:0.875rem;color:#4b5563;margin-top:0.5rem;">${escapeHtml(img.alt)}</figcaption>`
        : ""
    }</figure>`;

  const parts = [];
  paragraphs.forEach((p, pIdx) => {
    parts.push(
      `<p style="margin:1rem 0;line-height:1.6;">${escapeHtml(p).replace(/\n/g, "<br>")}</p>`
    );
    imagePositions.forEach((pos, gIdx) => {
      if (pos === pIdx + 1) parts.push(figureFor(gallery[gIdx]));
    });
  });
  // Tail-append any images whose computed position lands past the last paragraph
  imagePositions.forEach((pos, gIdx) => {
    if (pos >= paragraphs.length && pos > 0) parts.push(figureFor(gallery[gIdx]));
  });
  return parts.join("");
}

// ============================================================================
// Static page prerendering (non-blog: /about, /services, /topics/<slug>)
// ============================================================================

/**
 * Generic <head> rewrite for any static page. Takes pre-computed title,
 * description, canonical URL, OG type, image, and optional JSON-LD scripts.
 */
function buildStaticHead(opts, baseHead) {
  const {
    url,
    title,
    description,
    ogType = "website",
    ogImage = `${SITE_URL}/og-vaibhav-vijay.jpg`,
    ogTitle = opts.title,
    jsonLdBlocks = [],
  } = opts;

  let head = baseHead.replace(
    /<title>[^<]*<\/title>/,
    `<title>${escapeHtml(title)}</title>`
  );
  head = head.replace(
    /<meta name="description" content="[^"]*"/,
    `<meta name="description" content="${escapeHtml(description)}"`
  );
  head = head.replace(
    /<link rel="canonical" href="[^"]*"/,
    `<link rel="canonical" href="${url}"`
  );
  head = head.replace(
    /<link rel="alternate" hreflang="en" href="[^"]*"/,
    `<link rel="alternate" hreflang="en" href="${url}"`
  );
  head = head.replace(
    /<link rel="alternate" hreflang="x-default" href="[^"]*"/,
    `<link rel="alternate" hreflang="x-default" href="${url}"`
  );
  head = head.replace(
    /<meta property="og:type" content="[^"]*"/,
    `<meta property="og:type" content="${ogType}"`
  );
  head = head.replace(
    /<meta property="og:url" content="[^"]*"/,
    `<meta property="og:url" content="${url}"`
  );
  head = head.replace(
    /<meta property="og:title" content="[^"]*"/,
    `<meta property="og:title" content="${escapeHtml(ogTitle)}"`
  );
  head = head.replace(
    /<meta property="og:description" content="[^"]*"/,
    `<meta property="og:description" content="${escapeHtml(description)}"`
  );
  head = head.replace(
    /<meta property="og:image" content="[^"]*"/g,
    `<meta property="og:image" content="${ogImage}"`
  );
  head = head.replace(
    /<meta property="og:image:secure_url" content="[^"]*"/,
    `<meta property="og:image:secure_url" content="${ogImage}"`
  );
  head = head.replace(
    /<meta property="og:image:alt" content="[^"]*"/,
    `<meta property="og:image:alt" content="${escapeHtml(title)}"`
  );
  head = head.replace(
    /<meta name="twitter:url" content="[^"]*"/,
    `<meta name="twitter:url" content="${url}"`
  );
  head = head.replace(
    /<meta name="twitter:title" content="[^"]*"/,
    `<meta name="twitter:title" content="${escapeHtml(ogTitle)}"`
  );
  head = head.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(description)}"`
  );
  head = head.replace(
    /<meta name="twitter:image" content="[^"]*"/g,
    `<meta name="twitter:image" content="${ogImage}"`
  );
  head = head.replace(
    /<meta name="twitter:image:alt" content="[^"]*"/,
    `<meta name="twitter:image:alt" content="${escapeHtml(title)}"`
  );

  // Inject any extra JSON-LD blocks before </head>. Blocks made with ld(id, data)
  // keep the id the SPA uses, so the SPA replaces them instead of duplicating.
  const ldScripts = jsonLdBlocks
    .map((block, i) => {
      const id = block.__id ?? `static-page-jsonld-${i}`;
      const data = block.__id ? block.data : block;
      return `<script type="application/ld+json" id="${id}">${JSON.stringify(data).replace(
        /</g,
        "\\u003c"
      )}</script>`;
    })
    .join("\n  ");
  if (ldScripts) {
    head = head.replace("</head>", `${ldScripts}\n  </head>`);
  }

  return head;
}

function warnLongTitle(route, title) {
  if (title.length > TITLE_MAX)
    console.warn(
      `[seo] <title> is ${title.length} chars on ${route} (aim for ${TITLE_MAX} or less). Add a short title for this slug to src/data/seo-overrides.json`
    );
}

async function writeStaticPage(relativePath, opts, noscriptBody, fullHead, baseBody) {
  warnLongTitle(`/${relativePath}`, opts.title);
  const newHead = buildStaticHead(opts, fullHead);
  const newBody = baseBody.replace("<body>", `<body>${noscriptBody}`);
  const html = `<!doctype html>\n<html lang="en">\n${newHead}\n${newBody}`;
  const outDir = path.join(DIST, ...relativePath.split("/"));
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8");
  console.log(`[prerender] wrote dist/${relativePath}/index.html`);
}

// ----- /about FAQs (kept in sync with src/pages/AboutPage.tsx) -----
const ABOUT_FAQS = [
  {
    q: "Who is Vaibhav Vijay?",
    a: "Vaibhav Vijay is a Product Manager and Head of Growth based in India with 7+ years taking consumer and B2B products from 0 to 1 across India and international markets. He launched a gaming platform end to end, took an app from #180 to #1 in its App Store category through ASO and Apple Search Ads, and grew customer LTV 5x from $70 to $350. He now consults on product and revenue strategy, builds AI automation systems for businesses, and is available for Product Manager, Head of Growth and fractional roles.",
  },
  {
    q: "What is Vaibhav's professional background?",
    a: "Vaibhav has spent 7+ years across product and growth. He started in 2019 as a Growth and Product Associate running acquisition experiments and launching a lifecycle CRM product, moved into go-to-market and product marketing at Ekatra after its Shark Tank India appearance, then spent four years at KPAX Marketing as Head of Growth and Product, where he led the 0 to 1 launch of a gaming platform and owned roadmap, hypothesis backlog and KPIs across acquisition, monetisation and lifecycle. Since 2026 he has consulted on product and revenue strategy and built AI-powered internal platforms and agentic workflows.",
  },
  {
    q: "What industries has Vaibhav worked in?",
    a: "Vaibhav has worked across iGaming and gaming operations, direct-to-consumer (D2C) brands, mobile apps, SaaS, and consumer fintech. The iGaming background is particularly relevant because the industry forces a level of financial rigour — measuring unit economics in hours rather than quarters — that transfers cleanly to every other category.",
  },
  {
    q: "What are Vaibhav's notable career achievements?",
    a: "Notable outcomes from past engagements include: helping multiple brands scale from $0 to $3.5M+ in annual revenue; taking an app from #180 to #1 in its App Store category over 90 days through ASO and ASA optimization; growing customer LTV 5x from $70 to $350 through a restructured retention and incentive program; building the go-to-market playbook for Ekatra following its Shark Tank India appearance; rebuilding the reactivation engine for a brand where dormant users outnumbered active 3:1, bringing 14% of dormant users back at one fifth of fresh acquisition CAC.",
  },
  {
    q: "What does Vaibhav specialize in?",
    a: "Six core specializations: Growth Strategy and Go-to-Market; Performance Marketing across Meta, Google and Apple Search Ads with cohort-aware unit economics; Lifecycle Marketing, CRM and Retention using MoEngage, Customer.io and similar platforms; Conversion Rate Optimization and funnel design; AI-native marketing workflows and AEO/GEO strategy; Fractional Head of Growth leadership.",
  },
  {
    q: "What is Vaibhav's approach to growth?",
    a: "Vaibhav uses a data-driven, full-funnel approach focused on acquisition, activation, retention, revenue and customer experience. Three principles run through every engagement: shorten the feedback loop (set kill criteria before scaling), reward the right behaviour with incentives, and measure unit economics at the cohort level.",
  },
  {
    q: "Where is Vaibhav Vijay based?",
    a: "Vaibhav Vijay is based in India. He works with clients globally on a fully remote and hybrid basis. He is fluent in English and Hindi.",
  },
  {
    q: "What tools and platforms does Vaibhav use?",
    a: "Meta Ads Manager, Google Ads, Apple Search Ads, MoEngage, Customer.io, Klaviyo, Braze, GA4, Mixpanel, Amplitude, Looker Studio, Optimizely, VWO, PostHog, ChatGPT, Claude, Perplexity, local LLM agents on personal infrastructure, and custom n8n / Make workflows.",
  },
  {
    q: "How can I hire Vaibhav or contact him for consulting?",
    a: "Email vvvj.14@gmail.com, phone/WhatsApp +91-99822-67285, or LinkedIn at linkedin.com/in/vaibhavvijay10. He typically responds within 24 hours and is open to fractional Head of Growth engagements, project-based consulting, and advisory roles.",
  },
  {
    q: "What is Vaibhav's writing and thought leadership about?",
    a: "Vaibhav publishes regularly on growth marketing, AI's impact on discovery (AEO/GEO), workflow automation, performance marketing across Meta/Google/Apple, retention and lifecycle plays, and the financial rigour that comes from iGaming. Recent essays cover the Death of the Funnel, the rise of AI agents in marketing operations, structured generosity in iGaming, and how a single strategist can operate as a full growth engine when paired with the right AI tools.",
  },
];

async function prerenderAboutPage(fullHead, baseBody) {
  const url = `${SITE_URL}/about`;
  // Keep title and description in sync with src/pages/AboutPage.tsx
  const title =
    "About Vaibhav Vijay | Product Manager & Head of Growth";
  const description =
    "About Vaibhav Vijay, Product Manager and Head of Growth in India: 7+ years of 0 to 1 launches, an app taken from #180 to #1 and customer LTV grown 5x.";

  const aboutPageLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": `${url}#aboutpage`,
    url,
    name: title,
    description,
    mainEntity: { "@id": `${SITE_URL}/#person` },
    inLanguage: "en",
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: ABOUT_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const noscript = `
    <noscript>
      <article style="max-width:720px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a;">
        <p><a href="/">&larr; Home</a></p>
        <h1>Vaibhav Vijay — Product Manager &amp; Head of Growth</h1>
        <p>Data-driven growth leader with 7+ years scaling startups and digital-first brands across iGaming, D2C, mobile apps and SaaS. Based in India, working with clients globally. 7+ years experience. $3.5M+ revenue scaled. 5x LTV growth. ASO ranking #180 to #1.</p>
        ${ABOUT_FAQS.map(
          (f) =>
            `<section style="margin:2rem 0;"><h2>${escapeHtml(f.q)}</h2><p>${escapeHtml(f.a)}</p></section>`
        ).join("")}
        <h2>Work with Vaibhav</h2>
        <p>Email: <a href="mailto:vvvj.14@gmail.com">vvvj.14@gmail.com</a> · WhatsApp: +91-99822-67285 · <a href="https://linkedin.com/in/vaibhavvijay10">LinkedIn</a> · <a href="/services">View services</a></p>
      </article>
    </noscript>`;

  await writeStaticPage(
    "about",
    {
      url,
      title,
      description,
      ogType: "profile",
      jsonLdBlocks: [
        ld("about-page-jsonld", aboutPageLd),
        ld("about-faq-jsonld", faqLd),
        ld("about-breadcrumb-jsonld", breadcrumbLd([["Home", `${SITE_URL}/`], ["About", url]])),
      ],
    },
    noscript,
    fullHead,
    baseBody
  );
}

// ----- /services data loader (reads src/data/services.ts as text) -----
async function loadServices() {
  const src = await fs.readFile(
    path.join(ROOT, "src", "data", "services.ts"),
    "utf-8"
  );
  const services = [];
  const startMarker = /\{\s*slug:\s*"/g;
  let match;
  while ((match = startMarker.exec(src)) !== null) {
    let depth = 0;
    let i = match.index;
    const start = i;
    for (; i < src.length; i++) {
      const ch = src[i];
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          const block = src.slice(start, i + 1);
          services.push({
            slug: pluck(block, "slug"),
            name: pluck(block, "name"),
            tagline: pluck(block, "tagline"),
            description: pluck(block, "description"),
            deliverables: pluckArray(block, "deliverables"),
            outcomes: pluckArray(block, "outcomes"),
            format: pluck(block, "format"),
            bestFor: pluck(block, "bestFor"),
          });
          break;
        }
      } else if (ch === '"' || ch === "'") {
        const quote = ch;
        i++;
        while (i < src.length && src[i] !== quote) {
          if (src[i] === "\\") i++;
          i++;
        }
      }
    }
    startMarker.lastIndex = i + 1;
  }
  return services;
}

async function prerenderServicesPage(fullHead, baseBody) {
  const services = await loadServices();
  const url = `${SITE_URL}/services`;
  // Keep title and description in sync with src/pages/ServicesPage.tsx
  const title = "Growth & Performance Marketing Services | Vaibhav Vijay";
  const description =
    "Fractional Head of Growth, performance marketing optimization, lifecycle CRM, CRO, AI marketing and GTM strategy for startups and digital-first brands.";

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#collection`,
    url,
    name: title,
    description,
    about: { "@id": `${SITE_URL}/#service` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Service",
          "@id": `${url}#${s.slug}`,
          name: s.name,
          description: s.description,
          provider: { "@id": `${SITE_URL}/#person` },
          areaServed: [
            { "@type": "Country", name: "India" },
            { "@type": "Place", name: "Global (Remote)" },
          ],
          serviceType: s.name,
          url: `${url}#${s.slug}`,
        },
      })),
    },
  };

  const servicesNoscript = services
    .map(
      (s, i) => `
      <section style="margin:2.5rem 0;padding-bottom:2rem;border-bottom:1px solid #e5e7eb;">
        <p style="font-size:0.875rem;color:#0891b2;text-transform:uppercase;letter-spacing:0.1em;margin-bottom:0.5rem;">0${i + 1}</p>
        <h2 style="font-size:1.5rem;margin-bottom:0.5rem;">${escapeHtml(s.name)}</h2>
        <p style="font-style:italic;color:#0891b2;margin-bottom:1rem;">${escapeHtml(s.tagline)}</p>
        <p style="margin-bottom:1rem;">${escapeHtml(s.description)}</p>
        <h3 style="font-size:0.875rem;text-transform:uppercase;letter-spacing:0.1em;margin-top:1rem;">What you get</h3>
        <ul>${s.deliverables.map((d) => `<li>${escapeHtml(d)}</li>`).join("")}</ul>
        <h3 style="font-size:0.875rem;text-transform:uppercase;letter-spacing:0.1em;margin-top:1rem;">Outcomes you target</h3>
        <ul>${s.outcomes.map((o) => `<li>${escapeHtml(o)}</li>`).join("")}</ul>
        <p><strong>Format:</strong> ${escapeHtml(s.format)}</p>
        <p><strong>Best for:</strong> ${escapeHtml(s.bestFor)}</p>
      </section>`
    )
    .join("");

  const noscript = `
    <noscript>
      <article style="max-width:720px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a;">
        <p><a href="/">&larr; Home</a></p>
        <h1>How I work with growth-stage companies</h1>
        <p>${escapeHtml(description)}</p>
        ${servicesNoscript}
        <h2>Not sure which one fits?</h2>
        <p>Most first conversations are a 30-minute intro call where we figure out where you actually are vs. where you think you are. Email <a href="mailto:vvvj.14@gmail.com">vvvj.14@gmail.com</a> or read more <a href="/about">about Vaibhav</a>.</p>
      </article>
    </noscript>`;

  await writeStaticPage(
    "services",
    {
      url,
      title,
      description,
      jsonLdBlocks: [
        ld("services-collection-jsonld", collectionLd),
        ld("services-breadcrumb-jsonld", breadcrumbLd([["Home", `${SITE_URL}/`], ["Services", url]])),
      ],
    },
    noscript,
    fullHead,
    baseBody
  );
}

// ----- /topics/* data loader -----
async function loadTopics() {
  const src = await fs.readFile(
    path.join(ROOT, "src", "data", "topics.ts"),
    "utf-8"
  );
  const topics = [];
  const startMarker = /\{\s*slug:\s*"/g;
  let match;
  while ((match = startMarker.exec(src)) !== null) {
    let depth = 0;
    let i = match.index;
    const start = i;
    for (; i < src.length; i++) {
      const ch = src[i];
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) {
          const block = src.slice(start, i + 1);
          topics.push({
            slug: pluck(block, "slug"),
            title: pluck(block, "title"),
            shortTitle: pluck(block, "shortTitle"),
            description: pluck(block, "description"),
            primer: pluckTemplate(block, "primer") ?? "",
            matchTags: pluckArray(block, "matchTags"),
            keywords: pluckArray(block, "keywords"),
          });
          break;
        }
      } else if (ch === '"' || ch === "`" || ch === "'") {
        const quote = ch;
        i++;
        while (i < src.length && src[i] !== quote) {
          if (src[i] === "\\") i++;
          i++;
        }
      }
    }
    startMarker.lastIndex = i + 1;
  }
  return topics;
}

async function prerenderTopicPages(fullHead, baseBody, posts) {
  const topics = await loadTopics();
  for (const topic of topics) {
    const url = `${SITE_URL}/topics/${topic.slug}`;
    const title = seoTitle(topic.title);
    const tagSet = new Set(topic.matchTags.map((t) => t.toLowerCase()));
    const topicPosts = posts.filter((p) =>
      (p.tags ?? []).some((t) => tagSet.has(t.toLowerCase()))
    );

    const collectionLd = {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#collection`,
      url,
      name: topic.title,
      description: topic.description,
      keywords: topic.keywords.join(", "),
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: topicPosts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/blog/${p.slug}`,
          name: p.title,
        })),
      },
    };

    const otherTopics = topics.filter((t) => t.slug !== topic.slug);

    const noscript = `
      <noscript>
        <article style="max-width:720px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a;">
          <p><a href="/#blog">&larr; All articles</a></p>
          <h1>${escapeHtml(topic.title)}</h1>
          <p>${escapeHtml(topic.description)}</p>
          ${topic.primer
            .split(/\n\n+/)
            .map((p) => `<p>${escapeHtml(p)}</p>`)
            .join("")}
          <h2>Articles on ${escapeHtml(topic.shortTitle)} (${topicPosts.length})</h2>
          <ul>
            ${topicPosts
              .map(
                (p) =>
                  `<li><a href="/blog/${escapeHtml(p.slug)}">${escapeHtml(p.title)}</a> — <small>${escapeHtml(p.date)}</small><br>${escapeHtml(p.excerpt)}</li>`
              )
              .join("")}
          </ul>
          <h2>Explore other topics</h2>
          <ul>
            ${otherTopics
              .map(
                (t) =>
                  `<li><a href="/topics/${escapeHtml(t.slug)}">${escapeHtml(t.shortTitle)}</a> — ${escapeHtml(t.description)}</li>`
              )
              .join("")}
          </ul>
        </article>
      </noscript>`;

    await writeStaticPage(
      `topics/${topic.slug}`,
      {
        url,
        title,
        description: seoDescription(topic.description),
        jsonLdBlocks: [
          ld("topic-jsonld", collectionLd),
          ld("topic-breadcrumb-jsonld", breadcrumbLd([["Home", `${SITE_URL}/`], [topic.shortTitle || topic.title, url]])),
        ],
      },
      noscript,
      fullHead,
      baseBody
    );
  }
}

// ----- /projects data loader -----
async function loadProjects() {
  const src = await fs.readFile(
    path.join(ROOT, "src", "data", "projects.ts"),
    "utf-8"
  );
  const projects = [];
  const startMarker = /\{\s*id:\s*"/g;
  let match;
  while ((match = startMarker.exec(src)) !== null) {
    let depth = 0;
    let i = match.index;
    const start = i;
    for (; i < src.length; i++) {
      const ch = src[i];
      if (ch === "{") depth++;
      else if (ch === "}") {
        depth--;
        if (depth === 0) break;
      } else if (ch === '"' || ch === "'") {
        const q = ch;
        i++;
        while (i < src.length && src[i] !== q) {
          if (src[i] === "\\") i++;
          i++;
        }
      } else if (ch === "`") {
        i++;
        while (i < src.length && src[i] !== "`") {
          if (src[i] === "\\") i++;
          i++;
        }
      }
    }
    const block = src.slice(start, i + 1);
    // Only top-level project objects have a slug + tagline pair
    const slug = pluck(block, "slug");
    const name = pluck(block, "name");
    if (slug && name) {
      projects.push({
        slug,
        name,
        tagline: pluck(block, "tagline"),
        category: pluck(block, "category"),
        status: pluck(block, "status"),
        period: pluck(block, "period"),
        role: pluck(block, "role"),
        excerpt: pluck(block, "excerpt"),
        overview: pluckTemplate(block, "overview") ?? "",
        outcomes: pluckArray(block, "outcomes"),
        learnings: pluckArray(block, "learnings"),
        tags: pluckArray(block, "tags"),
      });
    }
    startMarker.lastIndex = i + 1;
  }
  return projects;
}

async function prerenderProjectPages(fullHead, baseBody) {
  const projects = await loadProjects();
  const indexUrl = `${SITE_URL}/projects`;

  // --- /projects index ---
  // Keep title and description in sync with src/pages/ProjectsPage.tsx
  const indexTitle = "Projects | Vaibhav Vijay — Product, AI and Growth Builds";
  const indexDesc =
    "Things Vaibhav Vijay has built: AlphaPulse (algorithmic trading engine), Karmic.ai (AI first mobile app) and WinningKings (casino brand launch in India).";

  const indexLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${indexUrl}#collection`,
    url: indexUrl,
    name: indexTitle,
    description: indexDesc,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#person` },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: projects.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${indexUrl}/${p.slug}`,
        name: `${p.name} — ${p.tagline}`,
      })),
    },
  };

  const indexNoscript = `
    <noscript>
      <article style="max-width:720px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a;">
        <p><a href="/">&larr; Home</a></p>
        <h1>Things I've built</h1>
        <p>${escapeHtml(indexDesc)}</p>
        ${projects
          .map(
            (p) => `<section style="margin:2rem 0;">
              <h2><a href="/projects/${escapeHtml(p.slug)}">${escapeHtml(p.name)} — ${escapeHtml(p.tagline ?? "")}</a></h2>
              <p><strong>${escapeHtml(p.status ?? "")}</strong> &middot; ${escapeHtml(p.category ?? "")} &middot; ${escapeHtml(p.period ?? "")}</p>
              <p>${escapeHtml(p.excerpt ?? "")}</p>
            </section>`
          )
          .join("")}
      </article>
    </noscript>`;

  await writeStaticPage(
    "projects",
    {
      url: indexUrl,
      title: indexTitle,
      description: indexDesc,
      jsonLdBlocks: [
        ld("projects-collection-jsonld", indexLd),
        ld("projects-breadcrumb-jsonld", breadcrumbLd([["Home", `${SITE_URL}/`], ["Projects", indexUrl]])),
      ],
    },
    indexNoscript,
    fullHead,
    baseBody
  );

  // --- /projects/<slug> detail pages ---
  for (const p of projects) {
    const url = `${indexUrl}/${p.slug}`;
    const title = seoTitle(`${p.name} — ${p.tagline}`);

    const projectLd = {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${url}#project`,
      name: `${p.name} — ${p.tagline}`,
      headline: p.name,
      description: p.excerpt,
      url,
      creator: { "@id": `${SITE_URL}/#person` },
      author: { "@id": `${SITE_URL}/#person` },
      about: p.category,
      keywords: (p.tags ?? []).join(", "),
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en",
    };

    const noscript = `
      <noscript>
        <article style="max-width:720px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a;">
          <p><a href="/projects">&larr; All projects</a></p>
          <h1>${escapeHtml(p.name)}</h1>
          <p><strong>${escapeHtml(p.tagline ?? "")}</strong></p>
          <p>${escapeHtml(p.status ?? "")} &middot; ${escapeHtml(p.category ?? "")} &middot; ${escapeHtml(p.period ?? "")}</p>
          <p><em>Role:</em> ${escapeHtml(p.role ?? "")}</p>
          ${p.overview
            .split(/\n\n+/)
            .map((para) => `<p>${escapeHtml(para)}</p>`)
            .join("")}
          ${
            (p.outcomes ?? []).length > 0
              ? `<h2>Outcomes</h2><ul>${p.outcomes.map((o) => `<li>${escapeHtml(o)}</li>`).join("")}</ul>`
              : ""
          }
          ${
            (p.learnings ?? []).length > 0
              ? `<h2>What it taught me</h2><ul>${p.learnings.map((l) => `<li>${escapeHtml(l)}</li>`).join("")}</ul>`
              : ""
          }
          <p><a href="${url}">Permalink</a></p>
        </article>
      </noscript>`;

    await writeStaticPage(
      `projects/${p.slug}`,
      {
        url,
        title,
        description: seoDescription(p.excerpt),
        ogType: "article",
        jsonLdBlocks: [
          ld("project-jsonld", projectLd),
          ld(
            "project-breadcrumb-jsonld",
            breadcrumbLd([
              ["Home", `${SITE_URL}/`],
              ["Projects", indexUrl],
              [p.name, url],
            ])
          ),
        ],
      },
      noscript,
      fullHead,
      baseBody
    );
  }
}

// ----- Homepage: visible-FAQ schema + static copy for non-JS crawlers -----
async function loadJsonArray(file, marker) {
  const src = await fs.readFile(path.join(ROOT, "src", "data", file), "utf-8");
  const start = src.indexOf(marker);
  if (start < 0) throw new Error(`marker not found in ${file}`);
  const from = src.indexOf("[", src.indexOf("=", start));
  const to = src.indexOf("];", from);
  return JSON.parse(src.slice(from, to + 1));
}

async function prerenderHomepageFaq(indexHtml) {
  const faqs = await loadJsonArray("home-faq.ts", "export const homeFaqs");
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const ld = `<script type="application/ld+json" id="home-faq-jsonld">${JSON.stringify(faqLd).replace(/</g, "\\u003c")}</script>`;
  const noscript = `
    <noscript>
      <main style="max-width:760px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a;">
        <h1>Vaibhav Vijay — Product Manager · Head of Growth · GTM Strategy</h1>
        <p>Product Manager and Head of Growth with 7+ years taking consumer and B2B products from 0 to 1 across India and international markets. Took an app from #180 to #1 in its App Store category, grew LTV 5x from $70 to $350, and builds AI automation systems for businesses.</p>
        <p><a href="/about">About</a> · <a href="/projects">Projects</a> · <a href="/services">Services</a> · <a href="/answers">Answers</a> · <a href="/Resume-VaibhavVijay.pdf">Resume</a></p>
        <h2>Frequently asked questions</h2>
        ${faqs.map((f) => `<section><h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p></section>`).join("")}
      </main>
    </noscript>`;
  let html = indexHtml.replace("</head>", `${ld}\n  </head>`);
  html = html.replace("<body>", `<body>${noscript}`);
  await fs.writeFile(path.join(DIST, "index.html"), html, "utf-8");
  console.log(`[prerender] homepage: ${faqs.length} visible FAQs + FAQPage schema`);
}

// ----- /answers hub + /answers/<slug> -----
function renderAnswerTable(t) {
  return `<table border="1" cellpadding="6" style="border-collapse:collapse;margin:1rem 0;">
    <caption>${escapeHtml(t.caption)}</caption>
    <thead><tr>${t.columns.map((c) => `<th scope="col">${escapeHtml(c)}</th>`).join("")}</tr></thead>
    <tbody>${t.rows.map((r) => `<tr>${r.map((c) => `<td>${escapeHtml(c)}</td>`).join("")}</tr>`).join("")}</tbody>
  </table>`;
}

async function prerenderAnswerPages(fullHead, baseBody, answers) {
  const hubUrl = `${SITE_URL}/answers`;
  // Keep in sync with src/pages/AnswersPage.tsx
  const hubTitle = "Short Answers Backed by Real Numbers | Vaibhav Vijay";
  const hubDesc =
    "Short, data-backed answers on automation costs, Apple Search Ads, LTV, conversion and go-to-market, each built on numbers from products Vaibhav Vijay has run.";

  const hubLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${hubUrl}#page`,
      url: hubUrl,
      name: hubTitle,
      description: hubDesc,
      author: { "@id": `${SITE_URL}/#person` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: answers.map((a, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${hubUrl}/${a.slug}`,
          name: a.question,
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Answers", item: hubUrl },
      ],
    },
  ];
  const hubNoscript = `
    <noscript>
      <main style="max-width:760px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a;">
        <p><a href="/">&larr; Home</a></p>
        <h1>Answers</h1>
        <p>One question per page, answered in two sentences, then the numbers behind it.</p>
        ${answers.map((a) => `<section><h2><a href="/answers/${escapeHtml(a.slug)}">${escapeHtml(a.question)}</a></h2><p>${escapeHtml(a.shortAnswer)}</p></section>`).join("")}
      </main>
    </noscript>`;
  await writeStaticPage("answers", { url: hubUrl, title: hubTitle, description: hubDesc, jsonLdBlocks: hubLd }, hubNoscript, fullHead, baseBody);

  for (const a of answers) {
    const url = `${hubUrl}/${a.slug}`;
    const person = { "@type": "Person", "@id": `${SITE_URL}/#person`, name: "Vaibhav Vijay", url: SITE_URL };
    const articleLd = {
      "@context": "https://schema.org",
      "@type": "Article",
      "@id": `${url}#article`,
      headline: a.question,
      description: a.description,
      abstract: a.shortAnswer,
      url,
      mainEntityOfPage: url,
      datePublished: a.isoDate,
      dateModified: a.isoDate,
      inLanguage: "en",
      keywords: a.tags.join(", "),
      author: person,
      publisher: person,
      image: `${SITE_URL}/og-vaibhav-vijay.jpg`,
      speakable: { "@type": "SpeakableSpecification", cssSelector: [".answer-short", "h1"] },
    };
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${url}#faq`,
      mainEntity: [{ q: a.question, a: a.shortAnswer }, ...a.faqs].map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };
    const crumbs = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        { "@type": "ListItem", position: 2, name: "Answers", item: hubUrl },
        { "@type": "ListItem", position: 3, name: a.question, item: url },
      ],
    };
    const body = a.sections
      .map(
        (s) => `<section><h2>${escapeHtml(s.heading)}</h2>
          ${(s.paragraphs || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
          ${s.bullets ? `<ul>${s.bullets.map((b) => `<li>${escapeHtml(b)}</li>`).join("")}</ul>` : ""}
          ${s.table ? renderAnswerTable(s.table) : ""}
        </section>`
      )
      .join("");
    const noscript = `
    <noscript>
      <article style="max-width:760px;margin:2rem auto;padding:1rem;font-family:system-ui,sans-serif;line-height:1.6;color:#1a1a1a;">
        <p><a href="/answers">&larr; All answers</a></p>
        <h1>${escapeHtml(a.question)}</h1>
        <p>By <a href="/about">Vaibhav Vijay</a> · <time datetime="${a.isoDate}">${a.isoDate}</time></p>
        <p class="answer-short"><strong>Short answer:</strong> ${escapeHtml(a.shortAnswer)}</p>
        ${body}
        ${a.faqs.length ? `<h2>Related questions</h2>${a.faqs.map((f) => `<h3>${escapeHtml(f.q)}</h3><p>${escapeHtml(f.a)}</p>`).join("")}` : ""}
        ${a.related.length ? `<h2>Read next</h2><ul>${a.related.map((r) => `<li><a href="${escapeHtml(r.href)}">${escapeHtml(r.label)}</a></li>`).join("")}</ul>` : ""}
      </article>
    </noscript>`;
    await writeStaticPage(
      `answers/${a.slug}`,
      {
        url,
        title: answerTitle(a),
        ogTitle: a.question,
        description: seoDescription(a.description),
        ogType: "article",
        jsonLdBlocks: [articleLd, faqLd, crumbs],
      },
      noscript,
      fullHead,
      baseBody
    );
  }
  console.log(`[prerender] answers: hub + ${answers.length} pages`);
}

// ----- RSS feed -----
async function writeRssFeed(posts) {
  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/blog/${p.slug}`;
      const pubDate = new Date(p.isoDate + "T09:00:00+05:30").toUTCString();
      return `    <item>
      <title>${escapeHtml(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${pubDate}</pubDate>
      <description>${escapeHtml(p.excerpt)}</description>
      <author>vvvj.14@gmail.com (Vaibhav Vijay)</author>
      <category>${escapeHtml((p.tags ?? [])[0] ?? "Growth Marketing")}</category>
    </item>`;
    })
    .join("\n");

  const lastBuildDate = new Date().toUTCString();
  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Vaibhav Vijay — Growth &amp; Performance Marketing</title>
    <link>${SITE_URL}/</link>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    <description>Growth marketing, performance marketing, lifecycle CRM, AEO/GEO and AI-native marketing essays from Vaibhav Vijay.</description>
    <language>en</language>
    <copyright>Copyright ${new Date().getFullYear()} Vaibhav Vijay</copyright>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <ttl>1440</ttl>
${items}
  </channel>
</rss>
`;
  await fs.writeFile(path.join(DIST, "rss.xml"), rss, "utf-8");
  console.log(`[prerender] wrote dist/rss.xml (${posts.length} items)`);
}

// ----- llms.txt (refreshed lists) + llms-full.txt (full text) -----
const mdCell = (s) => String(s).replace(/\|/g, "\\|").replace(/\n+/g, " ");

function answerToMarkdown(a) {
  const out = [
    `## ${a.question}`,
    "",
    `URL: ${SITE_URL}/answers/${a.slug}`,
    `Published: ${a.isoDate}`,
    `Author: Vaibhav Vijay`,
    a.tags?.length ? `Tags: ${a.tags.join(", ")}` : "",
    "",
    `**Short answer:** ${a.shortAnswer}`,
    "",
  ];
  for (const s of a.sections ?? []) {
    out.push(`### ${s.heading}`, "");
    for (const p of s.paragraphs ?? []) out.push(p, "");
    if (s.bullets?.length) out.push(...s.bullets.map((b) => `- ${b}`), "");
    if (s.table) {
      const t = s.table;
      if (t.caption) out.push(`Table: ${t.caption}`, "");
      out.push(`| ${t.columns.map(mdCell).join(" | ")} |`);
      out.push(`| ${t.columns.map(() => "---").join(" | ")} |`);
      for (const r of t.rows) out.push(`| ${r.map(mdCell).join(" | ")} |`);
      out.push("");
    }
  }
  if (a.faqs?.length) {
    out.push("### Related questions", "");
    for (const f of a.faqs) out.push(`**${f.q}**`, "", f.a, "");
  }
  if (a.related?.length) {
    out.push("### Read next", "");
    for (const r of a.related) {
      const href = r.href.startsWith("/") ? `${SITE_URL}${r.href}` : r.href;
      out.push(`- [${r.label}](${href})`);
    }
    out.push("");
  }
  return out.filter((l, i, arr) => !(l === "" && arr[i - 1] === "")).join("\n");
}

function postToMarkdown(p) {
  return [
    `## ${p.title}`,
    "",
    `URL: ${SITE_URL}/blog/${p.slug}`,
    `Published: ${p.date} (${p.isoDate})`,
    `Author: Vaibhav Vijay`,
    p.tags?.length ? `Tags: ${p.tags.join(", ")}` : "",
    p.linkedinUrl ? `Originally posted on LinkedIn: ${p.linkedinUrl}` : "",
    "",
    p.content.trim(),
    "",
  ]
    .filter((l, i, arr) => !(l === "" && arr[i - 1] === ""))
    .join("\n");
}

/** Split a markdown file into { preamble, sections: [{ heading, body }] } on "## " headings. */
function splitMarkdownSections(md) {
  const parts = md.split(/^(?=## )/m);
  const preamble = parts[0];
  const sections = parts.slice(1).map((chunk) => {
    const nl = chunk.indexOf("\n");
    return { heading: chunk.slice(3, nl).trim(), body: chunk.slice(nl + 1) };
  });
  return { preamble, sections };
}

async function writeLlmsFiles(posts, answers) {
  const llmsPath = path.join(DIST, "llms.txt");
  const llms = await fs.readFile(llmsPath, "utf-8");
  const { preamble, sections } = splitMarkdownSections(llms);

  // 1. dist/llms.txt: regenerate the Answers and Articles lists from the data
  //    files so new pages show up without hand edits. Everything else in
  //    public/llms.txt is kept as written.
  const answersList =
    answers
      .map((a) => `- [${a.question}](${SITE_URL}/answers/${a.slug}): ${a.shortAnswer}`)
      .join("\n") + "\n\n";
  const articlesList =
    posts.map((p) => `- [${p.title}](${SITE_URL}/blog/${p.slug}), ${p.date}`).join("\n") + "\n\n";
  for (const s of sections) {
    if (/^Answers\b/i.test(s.heading)) s.body = `\n${answersList}`;
    if (/^Articles\b/i.test(s.heading)) s.body = `\n${articlesList}`;
  }
  const rebuilt = preamble + sections.map((s) => `## ${s.heading}\n${s.body}`).join("");
  await fs.writeFile(llmsPath, rebuilt, "utf-8");

  // 2. dist/llms-full.txt: who Vaibhav is (facts reused from llms.txt), then
  //    the full text of every answer page and every blog post.
  const FACT_SECTIONS = /^(Key facts|Experience|Projects and systems built|Core expertise|Notable outcomes|Citation guidance)/i;
  const summary = (preamble.match(/^>.*$/m) ?? [""])[0];
  const facts = sections
    .filter((s) => FACT_SECTIONS.test(s.heading))
    .map((s) => `## ${s.heading}\n${s.body}`)
    .join("");
  const today = new Date().toISOString().slice(0, 10);

  const full = [
    "# Vaibhav Vijay: full text of vaibhavvijay.com",
    "",
    summary,
    "",
    `Generated: ${today}`,
    "",
    `This is the long form of llms.txt (${SITE_URL}/llms.txt). It holds the full text of every answer page and every article on vaibhavvijay.com, so AI assistants can read and cite them without crawling each page. The canonical URL of each item is listed under its heading; please cite that URL.`,
    "",
    facts.trim(),
    "",
    "---",
    "",
    `# Answers (${answers.length})`,
    "",
    "Short, data-backed answers. Each one is a single page on the site.",
    "",
    answers.map(answerToMarkdown).join("\n---\n\n"),
    "",
    "---",
    "",
    `# Articles (${posts.length})`,
    "",
    "Newest first.",
    "",
    posts.map(postToMarkdown).join("\n---\n\n"),
    "",
  ].join("\n");
  await fs.writeFile(path.join(DIST, "llms-full.txt"), full, "utf-8");
  console.log(
    `[prerender] wrote dist/llms.txt (lists refreshed) and dist/llms-full.txt (${answers.length} answers, ${posts.length} articles, ${Math.round(full.length / 1024)} KB)`
  );
}

// ----- sitemap.xml: add missing routes, bump stale lastmod, drop dead URLs -----
async function syncSitemap(posts, answers) {
  const smPath = path.join(DIST, "sitemap.xml");
  let xml = await fs.readFile(smPath, "utf-8");
  const topics = await loadTopics();
  const projects = await loadProjects();
  const maxDate = (dates) => dates.filter(Boolean).sort().at(-1);
  const today = new Date().toISOString().slice(0, 10);
  const latestPost = maxDate(posts.map((p) => p.dateModified ?? p.updatedIsoDate ?? p.isoDate));
  const latestAnswer = maxDate(answers.map((a) => a.isoDate));

  const routes = [
    { loc: `${SITE_URL}/`, lastmod: maxDate([latestPost, latestAnswer]), priority: "1.0" },
    { loc: `${SITE_URL}/about` },
    { loc: `${SITE_URL}/services` },
    { loc: `${SITE_URL}/projects` },
    ...projects.map((p) => ({ loc: `${SITE_URL}/projects/${p.slug}`, priority: "0.9" })),
    ...topics.map((t) => {
      const tags = new Set(t.matchTags.map((x) => x.toLowerCase()));
      const inTopic = posts.filter((p) => p.tags.some((x) => tags.has(x.toLowerCase())));
      return { loc: `${SITE_URL}/topics/${t.slug}`, lastmod: maxDate(inTopic.map((p) => p.isoDate)), priority: "0.85" };
    }),
    { loc: `${SITE_URL}/answers`, lastmod: latestAnswer, priority: "0.9" },
    ...answers.map((a) => ({ loc: `${SITE_URL}/answers/${a.slug}`, lastmod: a.isoDate, priority: "0.85" })),
    ...posts.map((p) => ({
      loc: `${SITE_URL}/blog/${p.slug}`,
      lastmod: p.dateModified ?? p.updatedIsoDate ?? p.isoDate,
      priority: "0.8",
      image: p.infographicUrl ? { loc: `${SITE_URL}${p.infographicUrl}`, title: p.title } : null,
    })),
  ];
  const known = new Set(routes.map((r) => r.loc));
  let added = 0;
  let bumped = 0;
  let removed = 0;

  // Drop <url> entries for generated sections whose page no longer exists
  xml = xml.replace(/\s*<url>\s*<loc>([^<]+)<\/loc>[\s\S]*?<\/url>/g, (block, loc) => {
    if (/\/(blog|answers|topics|projects)\/[^/]+$/.test(loc) && !known.has(loc)) {
      removed++;
      console.warn(`[sitemap] removed stale URL ${loc}`);
      return "";
    }
    return block;
  });

  for (const r of routes) {
    const re = new RegExp(
      `(<loc>${r.loc.replace(/[.*+?^${}()|[\]\\/]/g, "\\$&")}</loc>(?:(?!</url>)[\\s\\S])*?<lastmod>)([^<]*)(</lastmod>)`
    );
    const m = xml.match(re);
    if (m) {
      if (r.lastmod && m[2] < r.lastmod) {
        xml = xml.replace(re, `$1${r.lastmod}$3`);
        bumped++;
      }
      continue;
    }
    if (xml.includes(`<loc>${r.loc}</loc>`)) continue;
    const image = r.image
      ? `\n    <image:image>\n      <image:loc>${escapeHtml(r.image.loc)}</image:loc>\n      <image:title>${escapeHtml(r.image.title)}</image:title>\n    </image:image>`
      : "";
    xml = xml.replace(
      "</urlset>",
      `  <url>\n    <loc>${r.loc}</loc>\n    <lastmod>${r.lastmod ?? today}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>${r.priority ?? "0.8"}</priority>${image}\n  </url>\n\n</urlset>`
    );
    added++;
    console.warn(`[sitemap] added missing URL ${r.loc} (also add it to public/sitemap.xml)`);
  }
  await fs.writeFile(smPath, xml, "utf-8");
  console.log(`[prerender] sitemap: ${added} added, ${bumped} lastmod updated, ${removed} removed`);
}

async function main() {
  const posts = await loadPosts();
  if (posts.length === 0) {
    console.error("[prerender-blog] No posts found, aborting.");
    process.exit(1);
  }
  const answers = await loadJsonArray("answers.ts", "export const answers");

  const indexHtml = await fs.readFile(path.join(DIST, "index.html"), "utf-8");
  const headMatch = indexHtml.match(/<head>([\s\S]*?)<\/head>/);
  if (!headMatch) {
    console.error("[prerender-blog] Could not find <head> in dist/index.html");
    process.exit(1);
  }
  // Every non-home route starts from the homepage head minus its homepage-only
  // WebPage and BreadcrumbList blocks.
  const fullHead = stripHomeOnlyBlocks(`<head>${headMatch[1]}</head>`);
  const baseBody = indexHtml.slice(indexHtml.indexOf("</head>") + 7);

  // 1. Blog posts
  for (const post of posts) {
    const newHead = buildHead(post, fullHead);
    const noscriptPreview = buildBodyPreview(post, posts, answers);
    const newBody = baseBody.replace("<body>", `<body>${noscriptPreview}`);
    const html = `<!doctype html>\n<html lang="en">\n${newHead}\n${newBody}`;
    const outDir = path.join(DIST, "blog", post.slug);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8");
    console.log(`[prerender-blog] wrote dist/blog/${post.slug}/index.html`);
  }
  console.log(`[prerender-blog] generated ${posts.length} static blog pages.`);

  // 2. Static pages
  await prerenderAboutPage(fullHead, baseBody);
  await prerenderServicesPage(fullHead, baseBody);
  await prerenderTopicPages(fullHead, baseBody, posts);
  await prerenderProjectPages(fullHead, baseBody);
  await prerenderAnswerPages(fullHead, baseBody, answers);

  // 2b. Homepage gets its FAQ schema + static copy last, so no other route inherits it
  await prerenderHomepageFaq(indexHtml);

  // 3. RSS feed
  await writeRssFeed(posts);

  // 4. GEO files and sitemap
  await writeLlmsFiles(posts, answers);
  await syncSitemap(posts, answers);

  console.log(`[prerender] complete.`);
}

main().catch((err) => {
  console.error("[prerender-blog] fatal:", err);
  process.exit(1);
});

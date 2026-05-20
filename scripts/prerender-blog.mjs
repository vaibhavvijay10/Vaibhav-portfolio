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

function buildHead(post, baseHead) {
  const url = `${SITE_URL}/blog/${post.slug}`;
  const title = `${post.title} | Vaibhav Vijay`;
  const description = post.excerpt;
  const image = post.infographicUrl
    ? `${SITE_URL}${post.infographicUrl}`
    : `${SITE_URL}/og-image.jpg`;

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

  // Inject BlogPosting JSON-LD just before </head>
  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blogposting`,
    headline: post.title,
    description: description,
    image: [image],
    datePublished: post.isoDate,
    dateModified: post.isoDate,
    url: url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.tags.join(", "),
    author: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Vaibhav Vijay",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Vaibhav Vijay",
    },
    articleSection: post.tags[0],
    inLanguage: "en",
    articleBody: post.content,
  };

  const ldScript = `<script type="application/ld+json" id="blog-post-jsonld">${escapeJson(
    JSON.stringify(blogPostingLd)
  )
    .replace(/\\n/g, "\\n")
    .replace(/</g, "\\u003c")}</script>`;

  // Re-parse to use safer JSON output (the escapeJson hack above isn't ideal)
  const cleanLdScript = `<script type="application/ld+json" id="blog-post-jsonld">${JSON.stringify(
    blogPostingLd
  ).replace(/</g, "\\u003c")}</script>`;

  head = head.replace("</head>", `${cleanLdScript}\n  </head>`);

  // Quietly drop the unused early-binding variable
  void ldScript;

  return head;
}

function buildBodyPreview(post) {
  // Inject a hidden but crawlable text block so non-JS crawlers (GPTBot,
  // ClaudeBot) can read the full post content even before the SPA mounts.
  const url = `${SITE_URL}/blog/${post.slug}`;
  const safeTitle = escapeHtml(post.title);
  const safeContent = escapeHtml(post.content).replace(/\n/g, "<br>");
  const safeTags = post.tags.map(escapeHtml).join(", ");

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
    ogImage = `${SITE_URL}/og-image.jpg`,
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
    `<meta property="og:title" content="${escapeHtml(title)}"`
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
    `<meta name="twitter:title" content="${escapeHtml(title)}"`
  );
  head = head.replace(
    /<meta name="twitter:description" content="[^"]*"/,
    `<meta name="twitter:description" content="${escapeHtml(description)}"`
  );
  head = head.replace(
    /<meta name="twitter:image" content="[^"]*"/g,
    `<meta name="twitter:image" content="${ogImage}"`
  );

  // Inject any extra JSON-LD blocks before </head>
  const ldScripts = jsonLdBlocks
    .map(
      (block, i) =>
        `<script type="application/ld+json" id="static-page-jsonld-${i}">${JSON.stringify(
          block
        ).replace(/</g, "\\u003c")}</script>`
    )
    .join("\n  ");
  if (ldScripts) {
    head = head.replace("</head>", `${ldScripts}\n  </head>`);
  }

  return head;
}

async function writeStaticPage(relativePath, opts, noscriptBody, fullHead, baseBody) {
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
    a: "Vaibhav Vijay is a Head of Growth and Performance Marketing leader based in India with 7+ years of experience scaling startups and digital-first brands. He has helped scale multiple brands to $3.5M+ in revenue across 4 companies, taken an app from #180 to #1 in its category through ASO, and grown customer LTV 5x (from $70 to $350) through retention optimization. He specializes in performance marketing across Meta, Google and Apple Search Ads; lifecycle marketing and CRM; conversion rate optimization; and AI-native marketing workflows. He is available for consulting, fractional Head of Growth roles, and strategic partnerships.",
  },
  {
    q: "What is Vaibhav's professional background?",
    a: "Vaibhav has spent the last seven plus years building and scaling growth functions across iGaming, D2C, mobile apps and SaaS. He started in performance marketing — running paid acquisition across Meta, Google and Apple Search Ads — and over time grew the scope to include lifecycle CRM, retention, conversion rate optimization, marketing analytics and go-to-market strategy. Today he operates as a full-funnel growth leader who can own the entire growth P&L, not just one channel.",
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
  const title =
    "About Vaibhav Vijay | Head of Growth & Performance Marketing Leader";
  const description =
    "Vaibhav Vijay is a Head of Growth and Performance Marketing leader with 7+ years scaling startups and digital brands in India. $3.5M+ revenue scaled, 5x LTV growth, ASO #180→#1. Based in India, available for consulting globally.";

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
        <h1>Vaibhav Vijay — Head of Growth &amp; Performance Marketing Leader</h1>
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
      jsonLdBlocks: [aboutPageLd, faqLd],
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
  const title =
    "Services | Vaibhav Vijay — Growth & Performance Marketing Consulting";
  const description =
    "Fractional Head of Growth, performance marketing optimization, lifecycle CRM, CRO, AI marketing and GTM strategy for startups and digital-first brands. India-based, working globally.";

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
    { url, title, description, jsonLdBlocks: [collectionLd] },
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
    const title = `${topic.title} | Vaibhav Vijay`;
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
        description: topic.description,
        jsonLdBlocks: [collectionLd],
      },
      noscript,
      fullHead,
      baseBody
    );
  }
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

async function main() {
  const posts = await loadPosts();
  if (posts.length === 0) {
    console.error("[prerender-blog] No posts found, aborting.");
    process.exit(1);
  }

  const indexHtml = await fs.readFile(path.join(DIST, "index.html"), "utf-8");
  const headMatch = indexHtml.match(/<head>([\s\S]*?)<\/head>/);
  if (!headMatch) {
    console.error("[prerender-blog] Could not find <head> in dist/index.html");
    process.exit(1);
  }
  const fullHead = `<head>${headMatch[1]}</head>`;
  const baseBody = indexHtml.slice(indexHtml.indexOf("</head>") + 7);

  // 1. Blog posts
  for (const post of posts) {
    const newHead = buildHead(post, fullHead);
    const noscriptPreview = buildBodyPreview(post);
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

  // 3. RSS feed
  await writeRssFeed(posts);

  console.log(`[prerender] complete.`);
}

main().catch((err) => {
  console.error("[prerender-blog] fatal:", err);
  process.exit(1);
});

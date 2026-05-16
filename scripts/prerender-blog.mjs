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
  // Match `key: "value"` (with possible escapes)
  const re = new RegExp(`${key}:\\s*"((?:\\\\.|[^"\\\\])*)"`);
  const m = block.match(re);
  return m ? m[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\") : undefined;
}

function pluckTemplate(block, key) {
  // Match `key: \`...\``
  const re = new RegExp(`${key}:\\s*\`([\\s\\S]*?)\``, "m");
  const m = block.match(re);
  return m ? m[1] : undefined;
}

function pluckArray(block, key) {
  const re = new RegExp(`${key}:\\s*\\[([^\\]]*)\\]`);
  const m = block.match(re);
  if (!m) return [];
  return m[1]
    .split(",")
    .map((s) => s.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);
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
        <div>${safeContent}</div>
        ${
          (post.gallery ?? []).length > 0
            ? `<div style="margin-top:2rem;">${(post.gallery ?? [])
                .map(
                  (img) =>
                    `<figure style="margin:1.5rem 0;"><img src="${escapeHtml(
                      img.url
                    )}" alt="${escapeHtml(img.alt ?? post.title)}" style="max-width:100%;height:auto;border-radius:8px;" />${
                      img.alt
                        ? `<figcaption style="font-size:0.875rem;color:#4b5563;margin-top:0.5rem;">${escapeHtml(img.alt)}</figcaption>`
                        : ""
                    }</figure>`
                )
                .join("")}</div>`
            : ""
        }
        <p><a href="${escapeHtml(post.linkedinUrl)}">Read &amp; engage on LinkedIn</a></p>
        <p><a href="${url}">Permalink</a></p>
      </article>
    </noscript>`;
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
  // Reconstruct full <head>...</head> string (we'll mutate then splice back)
  const fullHead = `<head>${headMatch[1]}</head>`;
  const baseBody = indexHtml.slice(indexHtml.indexOf("</head>") + 7);

  for (const post of posts) {
    const newHead = buildHead(post, fullHead);
    const noscriptPreview = buildBodyPreview(post);
    // Inject the noscript preview right after the opening <body> tag so
    // non-JS crawlers see the full article without affecting the SPA mount.
    const newBody = baseBody.replace("<body>", `<body>${noscriptPreview}`);
    const html = `<!doctype html>\n<html lang="en">\n${newHead}\n${newBody}`;

    const outDir = path.join(DIST, "blog", post.slug);
    await fs.mkdir(outDir, { recursive: true });
    await fs.writeFile(path.join(outDir, "index.html"), html, "utf-8");
    console.log(`[prerender-blog] wrote dist/blog/${post.slug}/index.html`);
  }

  console.log(`[prerender-blog] generated ${posts.length} static blog pages.`);
}

main().catch((err) => {
  console.error("[prerender-blog] fatal:", err);
  process.exit(1);
});

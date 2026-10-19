/**
 * Shared SEO helpers for the SPA.
 *
 * scripts/prerender-blog.mjs mirrors seoTitle(), seoDescription() and
 * getRelatedAnswers() for the static HTML. If you change the rules here,
 * change them there too, so crawlers that run JavaScript (Google) and
 * crawlers that do not (GPTBot, ClaudeBot, PerplexityBot) see the same head.
 */
import overrides from "@/data/seo-overrides.json";
import { answers, type Answer } from "@/data/answers";

export const SITE_URL = "https://vaibhavvijay.com";
export const BRAND_SUFFIX = " | Vaibhav Vijay";
const TITLE_MAX = 60;
const DESC_MAX = 160;
const DESC_MIN = 120;

/** Homepage head values. Keep in sync with index.html. */
export const HOME_TITLE = "Vaibhav Vijay | Product Manager & Head of Growth (7+ Yrs)";
export const HOME_DESC =
  "Vaibhav Vijay, Product Manager and Head of Growth with 7+ years taking products from 0 to 1. Took an app from #180 to #1 and grew customer LTV 5x.";
export const HOME_OG_TITLE = "Vaibhav Vijay | Product Manager · Head of Growth · GTM Strategy";

type OverrideMap = Record<string, { title?: string }>;
const blogOverrides = (overrides as { blog: OverrideMap }).blog;
const answerOverrides = (overrides as { answers: OverrideMap }).answers;

/** Headline plus " | Vaibhav Vijay" when that fits in about 60 characters, else the headline alone. */
export function seoTitle(base: string): string {
  const withBrand = `${base}${BRAND_SUFFIX}`;
  return withBrand.length <= TITLE_MAX ? withBrand : base;
}

/** Trim to whole sentences within 160 characters; fall back to a word boundary with an ellipsis. */
export function seoDescription(text: string): string {
  const t = text.replace(/\s+/g, " ").trim();
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

export function blogTitle(post: { slug: string; title: string }): string {
  return seoTitle(blogOverrides[post.slug]?.title ?? post.title);
}

export function answerTitle(answer: { slug: string; question: string }): string {
  return seoTitle(answerOverrides[answer.slug]?.title ?? answer.question);
}

// ---------------------------------------------------------------------------
// Related answers: answer pages whose tags overlap a blog post's tags.
// Exact tag match scores 2. A tag whose words are all inside the other tag
// ("Automation" inside "AI Automation") scores 1. Tags too generic to mean
// anything on their own ("AI", "India", "Strategy") never count.
// ---------------------------------------------------------------------------
const GENERIC_TAGS = new Set(["ai", "india", "strategy", "marketing", "growth", "cost", "b2b"]);
const norm = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

function tagScore(a: string, b: string): number {
  const na = norm(a);
  const nb = norm(b);
  if (!na || !nb) return 0;
  if (na === nb) return GENERIC_TAGS.has(na) ? 0 : 2;
  const [short, long] = na.length <= nb.length ? [na, nb] : [nb, na];
  if (GENERIC_TAGS.has(short)) return 0;
  const longWords = new Set(long.split(" "));
  return short.split(" ").every((w) => longWords.has(w)) ? 1 : 0;
}

// Among answers that share a tag, ones whose slug shares a distinctive word
// with the post's slug ("invoice", "store") rank first.
const SLUG_STOPWORDS = new Set(["with", "from", "your", "what", "does", "have", "that", "this", "into", "india", "biggest"]);
const slugWords = (slug: string) =>
  new Set(slug.split("-").filter((w) => w.length >= 4 && !SLUG_STOPWORDS.has(w)));

export function getRelatedAnswers(post: { slug: string; tags: string[] }, limit = 3): Answer[] {
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

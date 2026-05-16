import { blogPosts, type BlogPost } from "./blog-posts";

export interface Topic {
  slug: string;
  title: string;
  /** Short label used in nav + breadcrumbs */
  shortTitle: string;
  /** Used as meta description + intro paragraph */
  description: string;
  /** 2-3 paragraph primer at the top of the topic page */
  primer: string;
  /** A blog post is included on this topic page if it has any of these tags */
  matchTags: string[];
  /** Optional keywords used for SEO meta tags */
  keywords: string[];
}

export const topics: Topic[] = [
  {
    slug: "ai-and-aeo",
    title: "AI, AEO and the Future of Marketing",
    shortTitle: "AI & AEO",
    description:
      "How AI search, generative engines and AEO are reshaping how brands get discovered — and the playbooks for staying visible.",
    primer: `Discovery is moving from search bars to conversations with AI. People are asking ChatGPT, Perplexity, Claude and Google AI Overviews to shortlist, compare and recommend brands before they ever open a website. This section collects everything I have published on Generative Engine Optimization (GEO), Answer Engine Optimization (AEO), AI-native marketing workflows, and how marketers should adapt when the agent is the new gatekeeper.

If your marketing strategy still assumes a linear funnel and a Google-only discovery layer, you are competing in last year's market. The articles below cover the new mental models, the technical hygiene that makes your brand "legible" to AI crawlers, and the specific tactics that have worked across the brands I have advised.`,
    matchTags: [
      "AI",
      "AEO",
      "GEO",
      "AI Marketing",
      "AI Search",
      "AI Discovery",
      "Local AI",
      "OpenAI",
      "Anthropic",
      "Personal Branding",
    ],
    keywords: [
      "AEO",
      "GEO",
      "generative engine optimization",
      "answer engine optimization",
      "AI search marketing",
      "ChatGPT marketing",
      "Perplexity marketing",
      "AI-first brand strategy",
    ],
  },
  {
    slug: "performance-marketing",
    title: "Performance Marketing — Meta, Google, Apple Search Ads",
    shortTitle: "Performance Marketing",
    description:
      "The mental models, frameworks and concrete plays for running performance marketing across Meta, Google and Apple Search Ads — with unit economics that hold up under scrutiny.",
    primer: `Performance marketing is where most growth budgets live and where most teams quietly bleed money. The difference between channels that look profitable on a dashboard and channels that actually grow LTV is usually a question of cohort discipline, attribution honesty, and creative throughput — not "more spend."

This section pulls together the platform-specific plays I have used across Meta, Google, Apple Search Ads and ASO, plus the unit-economic frameworks I learned in iGaming that apply to every paid channel. Whether you are spending ₹5L per month or ₹5Cr, these are the questions and mental models that separate efficient growth from expensive vanity metrics.`,
    matchTags: [
      "Performance Marketing",
      "Meta Ads",
      "Google Ads",
      "Apple Search Ads",
      "ASO",
      "Mobile Growth",
      "User Acquisition",
      "iGaming",
      "Unit Economics",
    ],
    keywords: [
      "performance marketing",
      "Meta Ads strategy",
      "Google Ads strategy",
      "Apple Search Ads",
      "ASO",
      "app store optimization",
      "user acquisition",
      "unit economics marketing",
    ],
  },
  {
    slug: "retention-and-lifecycle",
    title: "Retention, Lifecycle and CRM",
    shortTitle: "Retention & CRM",
    description:
      "The cheapest revenue you can earn is from users you already paid to acquire. Frameworks and plays for lifecycle marketing, CRM, retention and reactivation — drawn from real cohorts.",
    primer: `Acquisition gets the budget. Retention gets the leftovers. And reactivation? Most teams pretend it does not exist. That is exactly why the highest-leverage growth work for most brands is not finding more users — it is keeping and re-engaging the ones they already have.

This section gathers the lifecycle, CRM and retention work: how to structure incentives so they reward the right behaviour, how to build reactivation engines that bring 10-15% of dormant users back at a fifth of fresh-acquisition CAC, and why LTV growth almost always beats CAC reduction as a growth strategy.`,
    matchTags: [
      "CRM",
      "Lifecycle",
      "Retention Marketing",
      "Player Retention",
      "Reactivation",
      "LTV",
    ],
    keywords: [
      "lifecycle marketing",
      "CRM strategy",
      "retention marketing",
      "customer reactivation",
      "LTV optimization",
      "MoEngage",
      "Customer.io",
    ],
  },
  {
    slug: "automation-and-operations",
    title: "Automation, AI Agents and Marketing Operations",
    shortTitle: "Automation",
    description:
      'How a single growth leader can operate like a team of six using workflow automation, local AI agents and "build-it-yourself" thinking — without a six month engineering roadmap.',
    primer: `If more than 30% of your week is spent on tasks a well-written workflow could handle, you are not leading — you are operating. The shift I am building my practice around is simple: one strategist who understands the entire stack, paired with the right automation tools, can deliver what used to require a mid-sized team.

This section covers the systems I have built to remove the bottleneck between thinking and execution — invoice automation on WhatsApp, AI agents that compound in capability, workflow systems that watch dashboards and brief teams before standup. Nothing fancy. Just one person asking "why am I still doing this manually" enough times.`,
    matchTags: [
      "Automation",
      "Productivity",
      "Workflow",
      "BuildInPublic",
      "Local AI",
      "Open Source",
      "WhatsApp",
      "Small Business India",
    ],
    keywords: [
      "marketing automation",
      "workflow automation",
      "local AI agent",
      "AI marketing tools",
      "build in public",
      "growth operations",
    ],
  },
];

export function getTopicBySlug(slug: string): Topic | undefined {
  return topics.find((t) => t.slug === slug);
}

export function getPostsForTopic(topic: Topic): BlogPost[] {
  const tagSet = new Set(topic.matchTags.map((t) => t.toLowerCase()));
  return blogPosts.filter((p) =>
    p.tags.some((t) => tagSet.has(t.toLowerCase()))
  );
}

/**
 * Given a post, find up to N other posts that share at least one tag.
 * Used for the "Related articles" section at the bottom of each blog post.
 */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const postTags = new Set(post.tags.map((t) => t.toLowerCase()));
  const scored = blogPosts
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({
      post: p,
      overlap: p.tags.filter((t) => postTags.has(t.toLowerCase())).length,
    }))
    .filter((x) => x.overlap > 0)
    .sort((a, b) => {
      if (b.overlap !== a.overlap) return b.overlap - a.overlap;
      // Tie-break: more recent post wins
      return b.post.isoDate.localeCompare(a.post.isoDate);
    });
  return scored.slice(0, limit).map((x) => x.post);
}

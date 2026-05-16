export interface Service {
  slug: string;
  name: string;
  /** One-line headline */
  tagline: string;
  /** 2-3 sentence description used as meta + intro */
  description: string;
  /** Concrete deliverables for the service */
  deliverables: string[];
  /** Outcomes / KPIs the engagement targets */
  outcomes: string[];
  /** Typical engagement format */
  format: string;
  /** Best fit for */
  bestFor: string;
}

export const services: Service[] = [
  {
    slug: "growth-strategy-and-gtm",
    name: "Growth Strategy & Go-to-Market",
    tagline: "From positioning to channel mix to 90-day proof.",
    description:
      "Top-down growth strategy and go-to-market planning for startups and digital-first brands. Defines the ICP, channels, sequencing and KPI tree that turns vague ambition into a defensible 6-12 month growth plan.",
    deliverables: [
      "Ideal Customer Profile (ICP) definition with named cohorts",
      'Positioning and one-sentence "why us" tied to the ICP',
      "Channel mix with rationale, budget allocation and sequencing",
      "90-day execution plan with kill criteria for each initiative",
      "KPI tree mapping every metric back to a business outcome",
    ],
    outcomes: [
      "Clarity on where the next ₹50L-5Cr of growth comes from",
      "Stop guessing across channels; allocate by influence moment",
      "Align team, founders and investors around one growth thesis",
    ],
    format:
      "4-8 week project, ending with a written GTM document + 2 weeks of execution support",
    bestFor:
      "Founders preparing for a raise, post-funding scale-ups, and growth leaders taking over a new function",
  },
  {
    slug: "performance-marketing",
    name: "Performance Marketing (Meta, Google, Apple Search Ads)",
    tagline: "Cohort discipline, not channel theatre.",
    description:
      "Hands-on optimization of paid acquisition across Meta Ads, Google Ads and Apple Search Ads, with attribution and unit economics that hold up under scrutiny. Designed to scale efficient channels and quietly kill the ones that look good only because of last-click bias.",
    deliverables: [
      "Audit of current paid channels with channel-level CAC, LTV:CAC and payback by cohort",
      "Campaign restructure with creative testing framework",
      "Attribution model that does not lie (multi-touch + cohort-aware)",
      "Weekly optimization cadence with named kill criteria",
      "Reporting dashboard tied to business KPIs (not platform vanity metrics)",
    ],
    outcomes: [
      "15-40% efficiency lift on current paid spend within 60 days",
      "Confidence that scaling spend will scale revenue, not just costs",
      "Creative testing velocity 3-5x existing baseline",
    ],
    format:
      "Monthly retainer (4-8 hrs/week) or 90-day intensive engagement",
    bestFor:
      "Brands spending ₹5L-5Cr/month on paid acquisition and not sure if it is working",
  },
  {
    slug: "lifecycle-and-crm",
    name: "Lifecycle Marketing, CRM & Retention",
    tagline: "The cheapest revenue is from users you already paid to acquire.",
    description:
      "Building or rebuilding the lifecycle, CRM and retention engine. Covers segmentation, journey design, channel orchestration across push, email, WhatsApp and in-app, and reactivation programs that bring dormant users back at one fifth of fresh-acquisition CAC.",
    deliverables: [
      "Behaviour-based segmentation model",
      "Onboarding, engagement, retention, win-back and advocacy journey designs",
      "Channel orchestration across push, email, WhatsApp, in-app",
      "Reactivation engine with kill criteria per cohort",
      "CRM platform recommendation (MoEngage, Customer.io, Klaviyo, Braze) tied to stage and channel mix",
    ],
    outcomes: [
      "20-40% lift in 90-day retention",
      "2-5x LTV growth on best cohorts",
      "Reactivation rates of 10-15% on dormant base",
    ],
    format: "12-week build-out, then optional retained advisory",
    bestFor:
      "D2C and app-first brands with >10k active users and a CAC problem",
  },
  {
    slug: "cro-and-funnel-optimization",
    name: "Conversion Rate Optimization & Funnel Design",
    tagline: "A 30% CRO lift cuts effective CAC by 30% at zero added spend.",
    description:
      "Funnel and landing page optimization across web and app, anchored in a testing framework that produces compounding wins. Covers everything from hero-section copy to checkout flow to onboarding activation.",
    deliverables: [
      "End-to-end funnel audit with conversion drop-off analysis",
      "Hypothesis backlog ranked by ICE (Impact, Confidence, Ease)",
      "A/B testing framework + tooling setup (GA4, Mixpanel, Optimizely or PostHog)",
      "Landing page and checkout copy/design revisions",
      "Activation funnel design for apps (first-day, first-week retention milestones)",
    ],
    outcomes: [
      "Compounding 5-20% CRO lifts every 4-6 weeks",
      "Lower effective CAC without changing channel spend",
      "Clear, replicable test cadence the team owns after I leave",
    ],
    format: "12-week sprint or rolling monthly retainer",
    bestFor:
      "Brands with paid traffic that converts at <2% on web or <30% on app install-to-activation",
  },
  {
    slug: "ai-marketing-and-aeo",
    name: "AI Marketing, AEO & GEO Strategy",
    tagline: "Be the brand AI engines recommend when humans ask.",
    description:
      "Strategy and execution for AI-native marketing: making your brand legible to ChatGPT, Perplexity, Claude and Google AI Overviews; building AI-led creative workflows that compress campaign timelines; and using local AI agents to automate operational work.",
    deliverables: [
      "AEO/GEO audit — how AI engines currently describe (or don't describe) your brand",
      "Structured data implementation (Person, Organization, FAQPage, BlogPosting schema)",
      "Content rewrite for question-form headings and direct-answer paragraphs",
      "AI bot crawler allowlist and llms.txt setup",
      "AI-led creative and ops workflow setup (one strategist + agents = full growth engine)",
    ],
    outcomes: [
      "Brand appears in AI-generated answers for 5-15 high-intent queries within 60 days",
      "5-10x reduction in time-to-ship for creative campaigns",
      "Internal AI agents handling 30-50% of repetitive growth ops",
    ],
    format: "8-week strategy + build engagement, then quarterly check-ins",
    bestFor:
      'Founders and CMOs who want to skip the "should we do AI?" debate and start shipping',
  },
  {
    slug: "fractional-head-of-growth",
    name: "Fractional Head of Growth",
    tagline: "A senior growth leader, two days a week.",
    description:
      "Embedded fractional engagement where I act as your Head of Growth for 2-3 days per week. Covers all the above disciplines plus team building, agency management, board reporting and strategic decision-making at exec level.",
    deliverables: [
      "Weekly growth review with leadership team",
      "Growth team hiring and structure recommendations",
      "Agency / vendor management and renegotiation",
      "Investor / board updates with credible growth narrative",
      "Direct ownership of the growth P&L for the duration of engagement",
    ],
    outcomes: [
      "Senior growth leadership at 1/3 the cost of a full-time hire",
      "Speed-to-decision that a part-time consultant cannot provide",
      "Mentorship of in-house team so the function compounds after I leave",
    ],
    format: "6-12 month embedded engagement, 2-3 days per week",
    bestFor:
      "Series A-C startups not yet ready to commit to a full-time Head of Growth, or scale-ups in growth transitions",
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

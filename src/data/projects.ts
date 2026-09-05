export interface ProjectSection {
  heading: string;
  /** Paragraphs separated by blank lines */
  body?: string;
  bullets?: string[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  /** Short descriptor shown under the name */
  tagline: string;
  category: string;
  status: "Live" | "In Progress" | "Shipped";
  period: string;
  role: string;
  /** 1-2 sentence preview used on cards and meta descriptions */
  excerpt: string;
  /** Opening narrative — 2-3 paragraphs */
  overview: string;
  sections: ProjectSection[];
  stack: { label: string; items: string[] }[];
  outcomes?: string[];
  learnings: string[];
  relatedArticles?: { slug: string; title: string }[];
  /** lucide-react icon name rendered on the card */
  icon: "TrendingUp" | "Sparkles" | "Crown";
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "alphapulse-algorithmic-trading-engine",
    name: "AlphaPulse",
    tagline: "Algorithmic Trading Engine",
    category: "Fintech / Systematic Trading",
    status: "Live",
    period: "2025 – Present",
    role: "Co-builder — system design, signal logic, risk framework",
    excerpt:
      "An automated trading system with rule based signal generation, backtesting, and risk controls. Runs live with automated execution and P&L tracking, built on the principle that a documented rule beats a confident opinion.",
    overview: `Most retail trading fails for reasons that have nothing to do with market knowledge. It fails because a human sits between the signal and the execution, and that human is tired, anxious, over-confident after a win, or gun-shy after a loss. The edge gets eaten by the emotion.

AlphaPulse was co-built to remove that gap entirely. It is a rule based trading system: signals are generated from explicitly defined conditions, every strategy is validated against historical data before a single rupee is risked, position sizing and risk limits are enforced by the system rather than by willpower, and execution happens automatically once conditions are met.

The design philosophy is deliberately unfashionable. It does not use an opaque machine learning model that produces a number nobody can interrogate. Every signal traces back to a rule you can read, argue with, and disprove. When the system loses money, and it does, you can point at exactly which rule was responsible and decide whether to fix it or kill it.`,
    sections: [
      {
        heading: "Rule based signal generation",
        body: `Signals are defined as explicit, testable conditions rather than model outputs. This makes every entry and exit auditable: when a trade is taken, it is possible to name the exact rule that fired and the exact market state that triggered it.

The trade-off is accepted knowingly. A rule based engine will underperform a well-tuned model in the best conditions, but it fails predictably, degrades visibly, and can be debugged by a human at 2am. For a system running live capital with no team on call, predictable beats optimal.`,
      },
      {
        heading: "Backtesting before capital",
        body: `No strategy reaches live execution without being run against historical data first. Backtesting is treated as the gate, not the formality: a strategy has to survive the historical record before it earns the right to risk real money.

This is the same discipline as a hypothesis backlog in product work. The backtest is the equivalent of a pre-registered experiment, and the results are read honestly rather than tuned until they look good. Overfitting a backtest is the trading equivalent of p-hacking an A/B test, and it fails the same way in production.`,
      },
      {
        heading: "Risk controls that the system enforces",
        body: `Risk management is coded into the engine rather than left to discretion. Position sizing, exposure limits, and stop conditions are enforced by the system, which means the worst possible day is bounded by design rather than by discipline.

This is the single highest-value component. Signal quality determines whether the system makes money in good conditions. Risk controls determine whether it survives the bad ones.`,
      },
      {
        heading: "Live execution and P&L tracking",
        body: `The engine runs live with automated execution and continuous P&L tracking. Performance is measured against the backtested expectation, so drift between what the strategy should do and what it actually does becomes visible quickly rather than after a drawdown.

Continuous measurement is what turns a trading system into a feedback loop instead of a gamble.`,
      },
    ],
    stack: [
      {
        label: "Core",
        items: ["Rule based signal engine", "Backtesting framework", "Automated execution", "Risk control layer"],
      },
      {
        label: "Measurement",
        items: ["Live P&L tracking", "Strategy-vs-backtest drift monitoring", "Cohort-style trade analysis"],
      },
    ],
    outcomes: [
      "Runs live with fully automated execution — no manual intervention between signal and order",
      "Every trade traceable to a named rule, making post-mortems specific instead of speculative",
      "Downside bounded by system-enforced risk limits rather than by discretion",
    ],
    learnings: [
      "A rule you can read and disprove is worth more than a model you have to trust.",
      "Backtesting is a gate, not a formality. A strategy that has not survived history has not earned live capital.",
      "Risk controls, not signal quality, determine whether a system survives long enough for the edge to matter.",
      "The same loop that runs a good growth program runs a good trading system: hypothesis, test, kill criteria, measure, repeat.",
    ],
    relatedArticles: [
      {
        slug: "annie-duke-3-frameworks-decision-quality",
        title: "Upgrade Your Decision Quality: 3 Frameworks from Annie Duke",
      },
      {
        slug: "every-cfo-inside-igaming-war-room",
        title: "Why Every CFO Should Spend a Month Inside an iGaming War Room",
      },
    ],
    icon: "TrendingUp",
    tags: ["Algorithmic Trading", "Backtesting", "Risk Management", "Fintech"],
  },
  {
    id: "2",
    slug: "karmic-ai-mobile-app",
    name: "Karmic.ai",
    tagline: "AI First Consumer Mobile App",
    category: "AI Product / Consumer Mobile",
    status: "In Progress",
    period: "2026 – Present",
    role: "Founder / Product and Build",
    excerpt:
      "An AI first consumer app being built on Expo, React Native, and TypeScript, powered by the Claude API, n8n workflows, and RAG based agents. AI first meaning the intelligence is the product, not a feature bolted onto one.",
    overview: `Most apps that describe themselves as AI powered are conventional apps with a chat box added near the end of the roadmap. The AI is a feature sitting on top of a product that would function without it.

Karmic.ai is being built the other way around. The intelligence layer is the product surface, and the conventional app scaffolding exists to serve it. That distinction changes almost every decision: what gets stored, how context is retained between sessions, what the app does while the user is not looking, and what the interface asks the user to do versus what it infers.

It is in active development and being built in public. The stack was chosen for iteration speed over architectural purity, because for a consumer product still finding its shape, the ability to ship a change and see it on a real device the same day is worth more than a perfect abstraction.`,
    sections: [
      {
        heading: "What AI first actually changes",
        bullets: [
          "Context is persistent, not per-session. The app is designed to remember rather than to restart.",
          "Retrieval is grounded in the user's own data, so responses are specific rather than generically plausible.",
          "Workflows run in the background between sessions instead of only when a screen is open.",
          "The interface infers where it can and asks only where it must, which reduces the form-filling tax most apps impose.",
        ],
      },
      {
        heading: "Why this stack",
        body: `Expo and React Native mean one codebase reaches both platforms with over-the-air updates, so iteration is measured in hours rather than release cycles. TypeScript is non-negotiable on a codebase where an AI layer produces a lot of dynamically shaped data, because the type system is what stops runtime surprises from reaching users.

The Claude API handles reasoning. n8n orchestrates the workflows that run between app sessions, which keeps orchestration logic out of the client and makes it changeable without shipping a new build. RAG based agents ground responses in retrieved context rather than relying on what a model happens to recall, which is the difference between an assistant that knows the user and one that guesses convincingly.`,
      },
      {
        heading: "Building it as a product manager, not a hobbyist",
        body: `The same discipline that applies to a client roadmap applies here: a hypothesis backlog rather than a feature wishlist, explicit success metrics before a feature is built, and kill criteria for anything that does not earn its place.

Building a product end to end, rather than specifying it for someone else to build, is the fastest available education in what is actually expensive to implement. That feedback changes how a roadmap gets written.`,
      },
    ],
    stack: [
      {
        label: "App",
        items: ["Expo", "React Native", "TypeScript"],
      },
      {
        label: "Intelligence",
        items: ["Claude API", "RAG based agents", "Retrieval / grounding layer"],
      },
      {
        label: "Orchestration",
        items: ["n8n workflows", "Background automation", "MCP connectors"],
      },
    ],
    learnings: [
      "AI first is an architecture decision, not a marketing adjective. It shows up in what you store and when you compute, not in whether there is a chat box.",
      "RAG is what separates an assistant that knows the user from one that guesses convincingly.",
      "Keeping orchestration outside the client means workflow changes ship without an app release.",
      "Building the product yourself is the fastest way to learn what is genuinely expensive to build.",
    ],
    relatedArticles: [
      {
        slug: "local-ai-agent-self-improving",
        title: "Breaking News: The #1 AI Agent Just Launched. It Was Not Built by OpenAI or Anthropic.",
      },
      {
        slug: "shipped-ipl-campaign-without-a-team",
        title: "R.I.P. Marketing — I Shipped an Entire IPL Campaign Without a Designer, Copywriter, or Brief",
      },
    ],
    icon: "Sparkles",
    tags: ["AI Product", "React Native", "Claude API", "RAG"],
  },
  {
    id: "3",
    slug: "winningkings-casino-brand-launch",
    name: "WinningKings",
    tagline: "Casino Brand Launch — India Market",
    category: "0-to-1 Brand Launch / iGaming",
    status: "Shipped",
    period: "At KPAX Marketing",
    role: "Launch and Growth Lead — GTM, paid acquisition, CRM, P&L",
    excerpt:
      "Led the launch and growth of the WinningKings brand at KPAX, owning go-to-market, paid acquisition, CRM, and P&L across the India market. A 0-to-1 launch in one of the most competitive and measurement-intensive verticals there is.",
    overview: `iGaming is an unforgiving place to launch a brand. Acquisition costs are high, the competitive set is dense and well funded, players are promiscuous by default, and the unit economics move fast enough that a campaign profitable at 9am can be underwater by 2pm. There is nowhere to hide behind quarterly averages.

WinningKings was a 0-to-1 launch into that market. The mandate covered the full stack: positioning and go-to-market, paid acquisition across the major ecosystems, CRM and lifecycle, and ownership of the P&L that all of it rolled up into.

Owning the P&L alongside the channels is what made the work different from a typical growth brief. When the same person owns both the acquisition budget and the number it has to produce, the incentive to report a flattering CAC disappears.`,
    sections: [
      {
        heading: "Go-to-market in a crowded category",
        body: `Launching into a category where every competitor is making broadly the same promise means positioning has to do real work rather than decorate a media plan. The GTM covered positioning, the channel mix that positioning implied, and the sequencing of which surfaces to build first.

India specific dynamics shaped the plan: payment behaviour, platform and channel availability, and a regulatory environment that constrains where and how a brand in this category can show up.`,
      },
      {
        heading: "Paid acquisition with cohort discipline",
        body: `Acquisition ran across the Meta, Google, and Apple Search Ads ecosystems. The operative discipline was refusing to evaluate channels on blended averages.

A channel that produces a flattering blended CAC while quietly acquiring a cohort that churns in 72 hours is not a good channel, it is a slow leak with good reporting. Evaluating by cohort rather than by channel average is what surfaces that difference early enough to act on.`,
        bullets: [
          "Channel performance judged on cohort value and payback, not blended CAC",
          "Creative testing systems built to sustain throughput rather than one-off campaigns",
          "Apple Search Ads keyword and creative systems scaled to CPA below $4 within the KPAX portfolio",
        ],
      },
      {
        heading: "CRM and lifecycle as the retention engine",
        body: `In this category the difference between a profitable brand and an expensive one is almost entirely retention. Acquisition gets a player through the door once. Lifecycle determines whether that player has any value beyond the first session.

The lifecycle work covered segmentation, journey design across channels, and incentive architecture. That last piece is the one most operators get wrong: bonus structures that reward the wrong behaviour attract exactly the cohort that extracts the value and leaves. Structuring incentives around behaviours that correlate with long-term retention, rather than around raw deposit size, is what makes generosity compound instead of leak.`,
      },
      {
        heading: "P&L ownership",
        body: `Owning the P&L meant the growth decisions and the financial consequences sat with the same person. Budget allocation, scaling decisions, and the point at which a profitable campaign turns dilutive were all judged against the number the business actually needed, not against a channel dashboard.`,
      },
    ],
    stack: [
      {
        label: "Acquisition",
        items: ["Meta Ads", "Google Ads", "Apple Search Ads", "Creative testing systems"],
      },
      {
        label: "Lifecycle",
        items: ["CRM journeys", "Segmentation", "Incentive architecture", "Retention experiments"],
      },
      {
        label: "Commercial",
        items: ["P&L ownership", "Cohort economics", "Payback modelling"],
      },
    ],
    outcomes: [
      "0-to-1 brand launch delivered across GTM, paid acquisition, CRM and P&L",
      "Apple Search Ads scaled efficiently to CPA below $4 within the KPAX portfolio",
      "Retention and incentive restructuring contributed to LTV growth from $70 to $350 across the wider KPAX book",
    ],
    learnings: [
      "Incentives that reward the wrong behaviour attract the wrong customers. Generosity without structure destroys value.",
      "Blended CAC hides the cohort that is quietly bleeding you. Judge channels by cohort, not by average.",
      "In a category measured in hours, quarterly thinking is a liability.",
      "Owning the P&L alongside the channels removes the incentive to report a flattering number.",
    ],
    relatedArticles: [
      {
        slug: "structured-generosity-igaming-ltv",
        title: "I Spent Years in iGaming. The Biggest Lesson Had Nothing to Do With Odds",
      },
      {
        slug: "every-cfo-inside-igaming-war-room",
        title: "Why Every CFO Should Spend a Month Inside an iGaming War Room",
      },
      {
        slug: "reactivation-cheaper-than-acquisition",
        title: "The Most Expensive Customer Is the One You Already Paid For Twice",
      },
    ],
    icon: "Crown",
    tags: ["iGaming", "0-to-1 Launch", "GTM", "P&L Ownership"],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

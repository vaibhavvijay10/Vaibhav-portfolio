export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  isoDate: string;
  linkedinUrl: string;
  /** Lead image — shown at the top of the article and as the og:image */
  infographicUrl?: string;
  /** Additional images shown below the article body (LinkedIn carousels often have 3-10 images) */
  gallery?: { url: string; alt?: string }[];
  tags: string[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "11",
    slug: "death-of-the-funnel",
    title: "The Death of the Funnel",
    excerpt:
      "Awareness. Consideration. Conversion. We have been drawing the same triangle for 25 years — and it has never been less accurate than it is right now. What replaces the funnel is not another framework. It is a mental model built around moments of influence.",
    content: `Awareness. Consideration. Conversion. We have been drawing the same triangle for 25 years. And it has never been less accurate than it is right now.

The funnel assumes a linear path: someone discovers you, evaluates you, and then buys from you, in that order. But real customer journeys in 2026 look nothing like this.

A person might discover your brand through a friend's story, research you through a language model, compare you on Reddit, see a retargeting ad that reminds them you exist, and finally convert through an organic search three weeks later.

There is no top. There is no bottom. There is a web of touchpoints, some of which you control and most of which you do not.

What replaces the funnel is not another neat framework. It is a mental model built around "moments of influence" rather than stages. The question shifts from "where is this customer in the funnel?" to "what is the next moment where we can add value or build trust, regardless of where they are?"

When I started applying this to a brand's attribution and budgeting model, it changed everything. We stopped allocating budget by funnel stage and started allocating by influence moment. Brand mentions in community forums got investment alongside paid search. Content that answered long-tail questions got the same priority as bottom-funnel landing pages.

The brand did not just see more conversions. It saw more resilient conversions: customers who stayed longer because they had multiple trust anchors, not just one click path.

If your marketing budget is still organized by funnel stage, what would it look like reorganized around moments of influence?`,
    date: "May 10, 2026",
    isoDate: "2026-05-10",
    linkedinUrl:
      "https://www.linkedin.com/posts/vaibhavvijay10_marketingstrategy-customerjourney-growthmarketing-activity-7459497840013123584-RWbG",
    infographicUrl: "/blog/post-death-of-funnel.webp",
    tags: ["Marketing Strategy", "Attribution", "Customer Journey", "Brand Building"],
  },
  {
    id: "10",
    slug: "fired-myself-from-23-tasks",
    title: "I Listed Every Task I Do Twice a Week. Then I Fired Myself From 23 of Them.",
    excerpt:
      "Six months ago I listed every task I did more than twice a week. The list hit 23. Most of what I called 'work' was just moving information from one place to another. Here is how I fired myself from 23 of them — and what changed when I did.",
    content: `Six months ago I sat down and listed every task I did more than twice a week. Invoice follow ups. Campaign reporting. Lead scoring updates. Slack summaries. Creative briefing templates. The list hit 23 items.

Then I asked a simple question: which of these actually need my judgement, and which ones just need my fingers?

The answer was uncomfortable. Most of what I called "work" was really just moving information from one place to another. Pulling data from a dashboard into a slide. Copying invoice details into a tracker. Formatting a weekly update that nobody reads past the first paragraph.

So I started building. Nothing fancy. Small systems that do one thing well. An invoice lands in a WhatsApp group, the system reads it and logs every detail before anyone opens the chat. A campaign crosses its daily budget, my phone buzzes with a recommendation before I have had my coffee. A lead fills out a form at 2 AM, by morning it is scored, tagged, and sitting in the right pipeline. No code army. No six month roadmap. Just one person asking "why am I still doing this manually" enough times.

The shift was not about saving time. It was about what I did with the time I got back. Instead of being the person who moves information, I became the person who decides what to do with it. Strategy sessions got deeper. Experiments got bolder. The team started coming to me with ideas instead of status updates.

The uncomfortable truth for most growth leaders: if more than 30% of your week is spent on tasks a well written workflow could handle, you are not leading. You are operating.

What is the one task you do every single week that you know should be automated but you have not gotten around to fixing?`,
    date: "May 6, 2026",
    isoDate: "2026-05-06",
    linkedinUrl:
      "https://www.linkedin.com/posts/vaibhavvijay10_automation-growthmarketing-productivity-activity-7458002685691285504-krt0",
    infographicUrl: "/blog/post-23-tasks.webp",
    tags: ["Automation", "Productivity", "Workflow", "Leadership"],
  },
  {
    id: "9",
    slug: "whatsapp-invoice-automation-india",
    title:
      "Every Small Business in India Loses Money the Same Way. I Fixed It for ₹470 a Month.",
    excerpt:
      "An Indian business running on a Finnish server for ₹470 a month. The invoice automation system I built for a Shark Tank funded client — and the hidden intelligence layer it quietly created from WhatsApp conversations.",
    content: `One of my Shark Tank funded clients had the same problem every business in India has. Invoices buried in WhatsApp groups. Nobody remembering to chase payment after 30 days. The founder spending Sunday night in Excel asking "who owes us what?"

So I built a system that watches the team's WhatsApp group around the clock. The moment someone drops an invoice PDF, it reads the document, pulls out the amount, due date, client, and GST details automatically. Every day at 1 PM, each point of contact gets a clean digest of their overdue invoices. One tap sends a follow up email directly to the vendor. WhatsApp reminders go out automatically to clients who have crossed their payment window.

No generic SaaS. This is built around how their business actually operates. Their team, their workflows, their vendor relationships.

But the part that surprised me most was the intelligence layer. Because every invoice flows through the system, it quietly builds a picture no spreadsheet ever could. Which sectors pay on time. Which clients stretch their credit cycle. Where receivables cluster. Seasonal patterns nobody noticed because the data was scattered across 14 WhatsApp groups. All of this just from the conversations the team is already having with clients.

The whole thing runs on a single server sitting in Helsinki for ₹470 a month flat. An Indian business powered by a Finnish data centre. 2026 is wild.

Here is my challenge to every business owner reading this: you are sitting on a goldmine of business intelligence inside your WhatsApp groups right now. Invoices, client conversations, payment patterns. It is all there. You are just not capturing it.

What is the most painful manual process in your business that you have accepted as "just how it works"?`,
    date: "Apr 30, 2026",
    isoDate: "2026-04-30",
    linkedinUrl:
      "https://www.linkedin.com/posts/vaibhavvijay10_buildinpublic-smallbusinessindia-invoicing-activity-7455473552201531392-lAIE",
    infographicUrl: "/blog/post-invoice-architecture.webp",
    gallery: [
      { url: "/blog/post-invoice-dashboard.webp", alt: "The main dashboard — ₹65.0L invoiced, ₹54.5L overdue, with ageing buckets and recent invoice list" },
      { url: "/blog/post-invoice-analytics.webp", alt: "The intelligence layer — Marketing Insights view with revenue by sector pie chart and monthly trend" },
      { url: "/blog/post-invoice-server-map.webp", alt: "The single VPS server in Helsinki powering the entire system for ₹470/month" },
    ],
    tags: ["Automation", "WhatsApp", "Small Business India", "BuildInPublic"],
  },
  {
    id: "8",
    slug: "ask-an-agent-your-own-name",
    title: "Go Ask an Agent Your Own Name. I Dare You.",
    excerpt:
      "Open ChatGPT and search your own name. If the answer is vague or wrong, you just found the biggest blind spot in your personal brand. Here is how I rebuilt mine for the agents quietly deciding who gets the call.",
    content: `Open ChatGPT right now. Type "Who is [your name]?" and see what comes back.

If the answer is vague, generic, or completely wrong, you just discovered the biggest blind spot in your personal brand.

I tried this on myself a few weeks ago. The result was embarrassing. Years of work, real results, clients I had actually helped. ChatGPT had almost nothing to say. Claude drew a blank. Perplexity gave me two lines.

So I rebuilt everything. Not for Google. For the agents that are quietly becoming the first place people go when they need to find or shortlist a professional.

I rewrote content as answers instead of headlines. Structured everything so crawlers could read it without running JavaScript. Wrote FAQs the way a colleague would explain my work in conversation. Took about a week.

The experiment is still running. I will share what actually worked and what did not once the data is in. Building in public means sharing the misses too.

But here is the uncomfortable part regardless: your LinkedIn looks great, your website is sharp. If ChatGPT, Claude, and Perplexity have nothing to say about you, you are invisible in the conversations that increasingly decide who gets the call.

Try it. Right now. The answer might sting.

What came back when you searched yourself?`,
    date: "Apr 29, 2026",
    isoDate: "2026-04-29",
    linkedinUrl:
      "https://www.linkedin.com/posts/vaibhavvijay10_personalbranding-growthmarketing-aeo-activity-7455047243633438720-PnNs",
    infographicUrl: "/blog/post-ask-an-agent.webp",
    tags: ["AEO", "GEO", "Personal Branding", "AI Search"],
  },
  {
    id: "7",
    slug: "apple-search-ads-the-hidden-channel",
    title:
      "The Channel Your Competitors Forgot About Is Sitting Inside the App Store",
    excerpt:
      "Most teams obsess over Meta and Google UAC, then ignore the place where their highest intent users are literally searching for the product. Here is what happened when we rebuilt Apple Search Ads from scratch — 2x retention, 40% higher 90-day LTV.",
    content: `There is a strange gap in most mobile growth strategies. Teams obsess over Meta creative testing, pour budget into Google UAC, and fine tune programmatic bids across a dozen DSPs. Then they completely ignore the place where their highest intent users are literally searching for their product.

Apple Search Ads sits at the bottom of the funnel in a way no other channel can replicate. These are users who have opened the App Store, typed a query, and are actively looking to download. The intent signal is as strong as it gets.

When I took over the mobile growth mix for an app, ASA was the last priority. Small budget, generic keywords, zero creative customization. We rebuilt it from scratch: exact match keywords mapped to Custom Product Pages, bid adjustments by device and time of day, and measurement tied to 90 day LTV instead of just install volume.

The results told the story. Users acquired through ASA retained at nearly 2x the rate of broader channels, and their 90 day LTV was 40% higher than the portfolio average. The channel went from afterthought to our most efficient acquisition source.

Not every channel needs to be your biggest. Some just need to be your smartest.

Is there a high intent channel in your stack that your team is underinvesting in because it "seems too small"?`,
    date: "Apr 28, 2026",
    isoDate: "2026-04-28",
    linkedinUrl:
      "https://www.linkedin.com/posts/vaibhavvijay10_mobilegrowth-applesearchads-appstoreoptimization-activity-7454726098262609920-yFxU",
    infographicUrl: "/blog/post-apple-search-ads.webp",
    tags: ["Apple Search Ads", "Mobile Growth", "ASO", "User Acquisition"],
  },
  {
    id: "4",
    slug: "structured-generosity-igaming-ltv",
    title: "I Spent Years in iGaming. The Biggest Lesson Had Nothing to Do With Odds",
    excerpt:
      "iGaming is one of the most advanced classrooms in behavioural economics on the planet. The sharpest lesson: generosity without structure destroys value. Here is how restructured incentives lifted player LTV nearly 5x.",
    content: `Most people hear "iGaming" and think of luck and flashy promotions. What they miss is that this industry is one of the most advanced classrooms in behavioural economics on the planet.

Every decision a player makes is a real time experiment in risk tolerance, loss aversion, and reward sensitivity. And on the operator side, every bonus structure, every loyalty tier, every cashback mechanic is a hypothesis about what drives LTV versus short term NGR spikes.

I spent years in this space, and the sharpest lesson was this: generosity without structure destroys value. The instinct was always to offer bigger bonuses. More free bets, higher match percentages. The deposit numbers looked great for a week. Then the cohort would churn, having extracted the value and moved on. Classic bonus abuse pattern.

The turning point came when we shifted from "how much can we give" to "what behaviour are we rewarding." We rebuilt the bonus architecture around actions that correlated with long term retention: consecutive day logins, multi product engagement, responsible deposit patterns. The bonuses got smaller, but player lifetime value jumped nearly 5x and wagering frequency stabilized across cohorts.

The transferable insight is universal: in any business, incentives that reward the wrong behaviour will attract the wrong customers. Whether you are running a sportsbook, a casino, a SaaS free trial, or a loyalty program, the question is the same.

Are your incentives driving real player engagement or just inflating your FTD numbers?`,
    date: "Apr 27, 2026",
    isoDate: "2026-04-27",
    linkedinUrl:
      "https://www.linkedin.com/posts/vaibhavvijay10_igaming-sportsbook-onlinecasino-activity-7454390128829132800-FRsg",
    infographicUrl: "/blog/post-igaming.webp",
    tags: ["iGaming", "Player Retention", "LTV", "CRM"],
  },
  {
    id: "5",
    slug: "reactivation-cheaper-than-acquisition",
    title: "The Most Expensive Customer Is the One You Already Paid For Twice",
    excerpt:
      "Acquisition gets the budget. Retention gets the leftovers. Reactivation gets ignored. Here is how a sequenced reactivation engine brought 14% of dormant users back at one fifth the cost of fresh acquisition.",
    content: `Acquisition gets the budget. Retention gets the leftovers. And reactivation? Most teams pretend it does not exist.

Here is what nobody talks about: dormant users already trusted you once. They downloaded your app, created an account, maybe even made a purchase. Then they went silent. And most brands just keep spending to acquire new users who look exactly like the ones they already lost.

If your reactivation rate is near zero, your effective CAC is much higher than your dashboard shows. A chunk of those "acquired" users are just cycling through a revolving door.

I spent a quarter rebuilding the reactivation engine for a brand where dormant users outnumbered active ones 3 to 1. We segmented by last activity, predicted the saveable cohort, and ran sequenced journeys across push, email, and in app messaging. Kill criteria were strict: if a cohort did not show positive value per recipient within 7 days, we pulled the spend.

The result: 14% of the dormant base came back, and the cost per reactivated user was roughly one fifth of acquiring a fresh one.

Retention is not a department. It is a growth strategy most teams underinvest in because it is less glamorous than top of funnel campaigns.

What percentage of your user base is dormant right now, and does anyone in your org own that number?`,
    date: "Apr 26, 2026",
    isoDate: "2026-04-26",
    linkedinUrl:
      "https://www.linkedin.com/posts/vaibhavvijay10_retentionmarketing-crm-lifecyclemarketing-activity-7454005111053471745-A1hp",
    infographicUrl: "/blog/post-reactivation.webp",
    tags: ["Retention Marketing", "CRM", "Reactivation", "Lifecycle"],
  },
  {
    id: "6",
    slug: "your-brand-just-lost-a-customer",
    title: "Your Brand Just Lost a Customer It Never Knew About",
    excerpt:
      "Discovery is moving from search bars to conversations with machines. The brands winning in this new layer share a few things in common, and they have nothing to do with traditional SEO.",
    content: `Last month, a friend asked Claude Cowork to recommend a CRM tool. It gave him three names. She picked one without ever opening Google.

No ad was clicked. No landing page was visited. No retargeting pixel fired. The brands that lost? They have no idea they were even in the running.

Discovery is moving from search bars to conversations with machines. People are asking agents to shortlist, compare, and recommend. By the time a human lands on your website, the decision is already half made.

The brands winning in this new layer share a few things: crystal clear positioning, structured data that machines can parse, strong third party proof (reviews, citations, community mentions), and a narrative that holds up without a salesperson in the room.

When I tested this with a brand I was consulting for, we restructured their knowledge base, FAQ schema, and review strategy to be "readable" by the agents people actually use today. Within weeks, the brand started appearing in recommendations for queries we had never ranked for organically.

This is not about abandoning SEO. It is about making your brand legible to the machines doing the shortlisting for your customers.

Who is your invisible competitor, the one getting recommended in conversations you cannot even track?`,
    date: "Apr 25, 2026",
    isoDate: "2026-04-25",
    linkedinUrl:
      "https://www.linkedin.com/posts/vaibhavvijay10_growthmarketing-brandstrategy-performancemarketing-activity-7453508188294926336-VhFW",
    infographicUrl: "/blog/post-geo-aeo.webp",
    tags: ["GEO", "AEO", "Brand Strategy", "AI Discovery"],
  },
  {
    id: "1",
    slug: "next-customer-may-never-visit-your-website",
    title: "Your Next Customer May Never Visit Your Website",
    excerpt:
      "Marketing now has 2 audiences: humans and AI agents. The brands that adapt early will own the next discovery layer. Here is what wins now.",
    content: `Your next customer may never visit your website!!

Let that sink in.

We're entering a phase where:
• Humans use AI to discover
• AI agents shortlist options
• Brands get chosen before a click even happens

That means marketing is no longer just SEO (ranking on search).
It's also GEO - making sure your brand is understood, trusted, and recommended by AI.

The threat?
• If AI gives the answer, fewer people visit your site.
• If your brand data is weak, someone else gets recommended.
• If you only market to humans, you may miss the real decision maker: the machine assistant.

What wins now?
• Clear positioning
• Strong proof
• Great reviews
• Structured information
• Community trust

The brands that adapt early will own the next discovery layer.

Marketing now has 2 audiences: Humans and AI agents.

How is your team preparing for this shift, are you still optimizing only for search, or also for AI recommendations?`,
    date: "Mar 18, 2026",
    isoDate: "2026-03-18",
    linkedinUrl: "https://linkedin.com/in/vaibhavvijay10",
    infographicUrl: "/blog/post-discovery-shift.webp",
    tags: ["Marketing", "AI", "GEO", "Strategy"],
  },
  {
    id: "2",
    slug: "annie-duke-3-frameworks-decision-quality",
    title: "Upgrade Your Decision Quality: 3 Frameworks from Annie Duke",
    excerpt:
      "If you think you need 5–10 years to know whether a decision was good, you are usually just choosing to wait. Three frameworks I am taking back into work.",
    content: `"There is no such thing as a long feedback loop." ~ Annie Duke

That line hit hard. If you think you need 5–10 years to know whether a decision was good, you're usually just choosing to wait.

3 ideas I'm taking back into work:

1) Shorten the loop
Define near-term signals that correlate with the long term outcome (retention, payback, cohort quality) and decide early.

2) Stop discovering in meetings
Collect input asynchronously first. Meetings are for debate + decisions, not for finding out what everyone thinks in real time.

3) Set kill criteria
Pre agree the signals that mean "pivot" or "stop." Otherwise sunk cost quietly runs the show.

Work example: for reactivation journeys, we tracked 7-day value/recipient + unsub rate, with kill criteria before expanding segments.

Curious: what's one "short feedback loop" metric you trust most in your business?`,
    date: "Mar 15, 2026",
    isoDate: "2026-03-15",
    linkedinUrl: "https://linkedin.com/in/vaibhavvijay10",
    infographicUrl: "/blog/post-annie-duke.webp",
    tags: ["Decision Making", "Growth", "Strategy", "Leadership"],
  },
  {
    id: "3",
    slug: "meta-vs-google-ads-the-two-machines",
    title: "The Two Machines: Meta vs. Google Ads",
    excerpt:
      "Meta is a demand creation engine. Google is a demand capture engine. Understanding the difference is how you allocate budget and craft strategy.",
    content: `Meta and Google Ads represent fundamentally different approaches to digital advertising.

Meta focuses on discovery, where the goal is to earn attention and often create demand through creative strategies and angles.

On the other hand, Google Search is centered around intent, matching user queries with relevant content, structured information, and effective landing pages.

Key Differences:

META (The Demand Engine):
• Functional Blueprint: Demand Creation
• Meta earns attention to create new desire
• Probabilistic Signals: Meta guesses intent based on behavior
• CPM-First: Meta buys access to attention
• Levers for Success: Creative Throughput
• When to Lean In: Visual Storytelling/Impulse

GOOGLE (The Capture Engine):
• Functional Blueprint: Demand Capture
• Google shows up to fulfill existing queries
• Explicit Signals: Google knows intent because the user typed it
• CPC-First: Google buys expressed intent through the click
• Levers for Success: Information Architecture
• When to Lean In: Urgent-Intent or Search-Heavy

Understanding these fundamental differences is crucial for allocating your budget and crafting the right strategy for each platform.

Disclaimer: This is a simplified mental model.`,
    date: "Mar 12, 2026",
    isoDate: "2026-03-12",
    linkedinUrl: "https://linkedin.com/in/vaibhavvijay10",
    infographicUrl: "/blog/post-meta-vs-google.webp",
    tags: ["Performance Marketing", "Meta Ads", "Google Ads", "Strategy"],
  },
];

export const getPostBySlug = (slug: string): BlogPost | undefined =>
  blogPosts.find((post) => post.slug === slug);

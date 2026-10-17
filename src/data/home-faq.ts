/**
 * Homepage FAQ. Rendered visibly by src/components/HomeFAQ.tsx and turned into
 * FAQPage JSON-LD for the homepage only by scripts/prerender-blog.mjs.
 * Keep this a plain JSON array: the prerender script parses it with JSON.parse.
 */
export interface HomeFaq {
  q: string;
  a: string;
}

export const homeFaqs: HomeFaq[] = [
  {
    "q": "Who is Vaibhav Vijay?",
    "a": "Vaibhav Vijay is a Product Manager and Head of Growth based in India with 7+ years taking consumer and B2B products from 0 to 1 across India and international markets. He launched a gaming platform end to end, took an app from #180 to #1 in its App Store category, grew customer LTV 5x from $70 to $350, and now builds AI automation systems for businesses alongside product and growth consulting."
  },
  {
    "q": "What services does Vaibhav Vijay offer?",
    "a": "Vaibhav offers product management and 0 to 1 launch consulting (roadmaps, PRDs, KPI frameworks), go-to-market strategy, growth and performance marketing (Meta, Google and Apple Search Ads), lifecycle marketing and CRM, conversion rate optimization, and AI automation systems for operations such as invoice tracking, HR and dispatch, built with Claude, n8n and Cloudflare."
  },
  {
    "q": "How many years of experience does Vaibhav Vijay have?",
    "a": "Vaibhav has 7+ years of experience across product management, growth and performance marketing, from a Growth and Product Associate role in 2019 to Head of Growth and Product and, since 2026, product and revenue strategy consulting. He has worked with 4+ companies across gaming, D2C, B2B and consumer apps."
  },
  {
    "q": "What platforms and tools does Vaibhav Vijay specialize in?",
    "a": "Vaibhav specializes in Meta Ads (Facebook, Instagram), Google Ads (Search, Display, Performance Max), Apple Search Ads, App Store Optimization (ASO), CRM platforms (MoEngage, Customer.io), analytics tools (Google Analytics 4, Looker Studio) and marketing automation platforms."
  },
  {
    "q": "How can I contact Vaibhav Vijay for consulting or collaboration?",
    "a": "You can contact Vaibhav via email at vvvj.14@gmail.com, by phone or WhatsApp at +91-99822-67285, or through LinkedIn at linkedin.com/in/vaibhavvijay10. He is available for consulting, speaking engagements and strategic partnerships."
  },
  {
    "q": "What is Vaibhav Vijay's approach to growth and scaling?",
    "a": "Vaibhav uses a data-driven, full-funnel approach focused on acquisition, activation, retention, revenue and customer experience. He builds sustainable growth engines backed by analytics, testing frameworks and customer-centric strategies rather than relying on a single channel."
  },
  {
    "q": "What is GEO and AEO in marketing?",
    "a": "GEO (Generative Engine Optimization) is the practice of optimizing content and brand information for AI search engines like ChatGPT, Perplexity and Google AI Overviews. AEO (Agentic Engine Optimization or Answer Engine Optimization) focuses on getting your brand cited by AI agents and direct-answer surfaces. Both are becoming critical as more users discover brands through AI rather than traditional search."
  },
  {
    "q": "What growth marketing metrics should I track?",
    "a": "Key metrics include Customer Acquisition Cost (CAC), Lifetime Value (LTV), the LTV:CAC ratio, payback period, retention rate, churn rate, conversion rate at each funnel stage and return on ad spend (ROAS). Track these across all channels and cohorts."
  },
  {
    "q": "Where is Vaibhav Vijay based?",
    "a": "Vaibhav Vijay is based in India and works with clients globally on a remote and hybrid basis."
  },
  {
    "q": "What is the difference between performance marketing and growth marketing?",
    "a": "Performance marketing is a sub-discipline of growth marketing focused specifically on paid acquisition channels (Meta Ads, Google Ads, Apple Search Ads) where every rupee spent is measurable against a conversion. Growth marketing is the broader discipline that covers the entire customer journey — acquisition, activation, retention, revenue and referral — across paid, organic, lifecycle, CRM, CRO, and product-led levers. A performance marketer optimizes a campaign; a growth marketer optimizes the entire funnel and decides which campaign to run in the first place."
  },
  {
    "q": "How can I reduce Customer Acquisition Cost (CAC) for a startup?",
    "a": "To reduce CAC, focus on five levers in this order: (1) improve creative and landing page conversion rate before spending more — a 30 percent CRO lift cuts effective CAC by 30 percent at zero added spend; (2) audit attribution to find channels with inflated CAC due to last-click bias; (3) reactivate dormant users — reactivation typically costs one fifth of fresh acquisition; (4) shift budget toward retention to grow LTV, which makes a higher CAC sustainable; (5) build organic and referral loops so a chunk of acquisition has zero marginal cost. Most teams jump to point five before doing one through four, which is backwards."
  },
  {
    "q": "What is a healthy LTV to CAC ratio for a startup?",
    "a": "A healthy LTV to CAC ratio is at least 3:1 for most consumer and SaaS businesses, with payback period under 12 months for B2C and under 18 months for B2B SaaS. Below 3:1, your unit economics are too thin to absorb operating costs and growth investment. Above 5:1, you are likely under-investing in growth and leaving market share on the table. The ratio should be measured per cohort and per channel, not blended across the business — a blended healthy ratio can hide a single channel that is bleeding money."
  },
  {
    "q": "How long does growth marketing take to show results?",
    "a": "Performance marketing channels (Meta, Google, Apple Search Ads) typically show meaningful signal within 2 to 4 weeks of consistent budget and disciplined testing. Lifecycle marketing and CRM journeys show retention impact in 4 to 8 weeks once cohorts mature. Conversion rate optimization compounds over 8 to 12 weeks as winning variants stack. SEO and brand-led growth take 3 to 6 months minimum. The mistake teams make is judging long-loop channels by short-loop metrics. Set the right feedback loop length per channel before you measure."
  },
  {
    "q": "What is lifecycle marketing and why does it matter?",
    "a": "Lifecycle marketing is the practice of designing distinct journeys, messages and triggers for each stage of the customer relationship — onboarding, activation, engagement, retention, win-back and advocacy. It matters because acquisition is increasingly expensive; the cheapest revenue is from users you have already paid to acquire. A well-built lifecycle program typically lifts retention by 20 to 40 percent and grows lifetime value by 2x or more, which is a bigger lever than any acquisition channel optimization. The core tools are CRM platforms like MoEngage and Customer.io, a clear segmentation model, and predefined kill criteria so underperforming journeys do not waste sends."
  },
  {
    "q": "How do I improve App Store Optimization (ASO) ranking?",
    "a": "App Store Optimization ranking improvement comes from five compounding levers: (1) keyword strategy — research high-intent, lower-competition terms using tools like AppTweak or Sensor Tower, then engineer them into your title, subtitle and keyword field; (2) conversion rate optimization on the listing — first three screenshots and the icon drive 80 percent of the install decision, A/B test them; (3) ratings and reviews velocity — prompt happy users in-app at the right moment; (4) Apple Search Ads to seed download velocity, which the algorithm reads as quality signal; (5) consistent fresh content via app updates. In one project I took an app from #180 to #1 in its category by stacking these levers over 90 days."
  },
  {
    "q": "What is the best CRM platform for a D2C brand?",
    "a": "The right CRM depends on stage and channel mix. For early-stage D2C brands under ₹10Cr revenue, MoEngage and WebEngage are strong India-friendly choices with solid push, email and WhatsApp orchestration at reasonable cost. For mid-market brands ₹10 to 100Cr, Customer.io and Klaviyo offer more sophisticated journey logic and event-based triggering. For larger brands, Braze and Iterable add real-time computed segments and stronger experimentation. The platform matters less than the operating model — most brands fail not because of the tool but because they have no clear segmentation, no kill criteria for journeys, and no analyst owning lifecycle KPIs."
  },
  {
    "q": "How do I optimize Apple Search Ads (ASA) for higher ROAS?",
    "a": "To improve Apple Search Ads ROAS, structure campaigns into four types: (1) Brand defense — bid on your own brand keywords, very high ROAS, low spend; (2) Generic discovery — broad match on category keywords with auto-targeting, lets Apple find new keyword candidates; (3) Competitor — bid on competitor brand names where ToS allows, watch CPI carefully; (4) Exact match scaling — promote winning keywords from discovery into dedicated exact-match campaigns. Optimize at the keyword level for tap-through rate (above 0.7 percent is healthy) and conversion rate (above 50 percent for branded, 30 percent for generic). Pair ASA with strong store-listing CRO; you cannot out-bid a weak listing."
  },
  {
    "q": "What is GTM (Go-to-Market) strategy and what should it include?",
    "a": "A go-to-market strategy is the plan for how a product reaches its target customer, beats alternatives, and scales economically. A complete GTM should answer six questions: (1) Who is the ideal customer profile, defined narrowly enough to act on; (2) What problem are we solving and what is the alternative the customer uses today; (3) What is the positioning — why us, in one sentence; (4) Which channels do we use to reach this customer profitably; (5) What is the pricing and packaging structure that captures fair value; (6) What does success look like at 90 days, 6 months, 12 months — with named kill criteria. Skipping any of these is the most common reason early growth efforts plateau."
  },
  {
    "q": "How much does growth marketing consulting cost in India?",
    "a": "Growth marketing consulting rates in India vary by experience tier and engagement model. Independent senior consultants with 7 plus years of experience typically charge ₹2,000 to ₹6,000 per hour for project work, ₹1.5L to ₹5L per month for retained advisory engagements (4 to 8 hours per week), and ₹5L to ₹25L for fixed-scope projects like growth audits, GTM build-outs, or lifecycle program builds. Boutique agencies are usually 2 to 4x these rates. The right benchmark is not the lowest rate but the consultant who has run the exact playbook you need at a comparable stage and category."
  },
  {
    "q": "What is the difference between SEO, GEO and AEO?",
    "a": "SEO (Search Engine Optimization) is the practice of ranking on traditional search engines like Google and Bing for query-based discovery. GEO (Generative Engine Optimization) is the practice of getting your brand and content cited by generative AI engines like ChatGPT, Perplexity, Claude and Google AI Overviews when users ask questions in natural language. AEO (Answer Engine Optimization, sometimes Agentic Engine Optimization) is the narrower practice of getting your specific answers quoted directly inside AI-generated responses, typically powered by structured data like FAQPage schema. SEO drives clicks; GEO drives mentions; AEO drives citations. All three matter because user behavior is fragmenting across them, but the effective tactics differ — backlinks for SEO, structured data and authoritative citations for GEO, and direct first-sentence answers with FAQPage schema for AEO."
  },
  {
    "q": "Is Vaibhav Vijay a Product Manager?",
    "a": "Yes. Vaibhav Vijay works as a Product Manager and Head of Growth. He owns product roadmaps, PRDs and the KPI stack from activation to LTV, and has led 0 to 1 launches including a gaming platform built end to end: product spec, pre and post login UX, payments, app store approval and go-to-market."
  },
  {
    "q": "What AI automation systems has Vaibhav Vijay built?",
    "a": "Vaibhav has built and shipped four AI-assisted systems for Ekatra, a B2B gifting company: an invoice tracker that reads invoice PDFs from WhatsApp with OCR and sends automated reminders, an HR system that computes attendance, leave, overtime and payroll previews from biometric exports, a B2B dispatch tracker with courier sticker OCR, and Karmic AI, an AI-first consumer mobile app on React Native and the Claude API."
  },
  {
    "q": "What does Vaibhav Vijay do now?",
    "a": "Since February 2026 Vaibhav consults on product and revenue strategy with Ekatra Collective, scaling its B2B gifting platform and introducing AI-powered internal platforms and agentic workflows. He is open to Product Manager and Head of Growth roles and to building AI automation systems for businesses."
  }
];

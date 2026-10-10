import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  achievements: string[];
  skills: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "1",
    company: "Ekatra Collective",
    role: "Product and Revenue Strategy, Consulting",
    period: "Feb 2026 – Present",
    description:
      "Scaling a B2B gifting platform that now supplies teams at Google, Microsoft, Netflix, and Salesforce, while introducing AI-powered internal platforms and opening the export channel.",
    achievements: [
      "Scaled the B2B gifting platform now supplying teams at Google, Microsoft, Netflix, and Salesforce, delivering bulk orders as large as 30,000 units in one run",
      "Introduced AI-powered internal platforms and agentic workflows, including a B2B invoice tracker that surfaces receivables ageing, margin by client, and repeat order patterns, plus Reminder Pro for automated follow up",
      "Cracked the export channel through trade expos and buyer meets, converting the first US enterprise account into a ₹1.4 Cr contract",
    ],
    skills: [
      "Revenue Strategy",
      "B2B Platforms",
      "Agentic AI Workflows",
      "Internal Tooling",
      "Export GTM",
    ],
  },
  {
    id: "2",
    company: "OptiServ Consulting",
    role: "Product and Customer Experience Manager",
    period: "Dec 2025 – Feb 2026",
    description:
      "Owned the product roadmap and KPI framework for the customer experience platform, combining segmentation, lifecycle journeys, and automated triggers.",
    achievements: [
      "Owned the product roadmap and KPI framework for the customer experience platform, combining segmentation, lifecycle journeys, and automated triggers",
      "Defined PRDs, user stories, and success metrics with engineering, lifting repeat usage 15%, CSAT 9%, and response time 27%",
      "Led a 25-member cross-functional team across Product, CX, QA, and Ops, owning client onboarding, escalation paths, and the reporting cadence the account now runs on",
    ],
    skills: [
      "Product Roadmap",
      "PRDs",
      "KPI Frameworks",
      "Lifecycle Journeys",
      "Client Onboarding",
      "Team Leadership",
    ],
  },
  {
    id: "3",
    company: "KPAX Marketing",
    role: "Head of Growth and Product",
    period: "Oct 2021 – Nov 2025",
    description:
      "Led the 0-to-1 launch of a gaming platform end to end and owned roadmap, hypothesis backlog, and KPIs across acquisition, monetisation, and lifecycle, scaling the business to $2.5–3.5M annual net revenue.",
    achievements: [
      "Led the 0-to-1 launch of a gaming platform end to end: product spec, pre and post login UX, game mix, payments (UPI/IMPS/cards), app store approval, and GTM playbook",
      "Took the app from #180 to #1 in its App Store category through ASO and Apple Search Ads, lifting organic installs 80–120% and cutting blended CAC 15–25%",
      "Improved registration-to-deposit conversion ~20% through offer and UX experiments across landing pages, KYC guidance, and friction removal",
      "Built VIP and deposit tier segmentation with behavioural triggers, raising repeat transactions 15–25%, LTV 10–20%, and cutting churn 8–12%",
      "Owned roadmap, hypothesis backlog, and KPIs across acquisition, monetisation, and lifecycle; scaled the business to $2.5–3.5M annual net revenue and lifted LTV from $70 to $350",
    ],
    skills: [
      "0-to-1 Product Launch",
      "Product Strategy",
      "PRDs & Roadmapping",
      "ASO",
      "Apple Search Ads",
      "Payments UX",
      "Segmentation",
      "LTV Optimization",
    ],
  },
  {
    id: "4",
    company: "Ekatra Collective",
    role: "GTM and Product Marketing Manager",
    period: "Dec 2020 – Oct 2021",
    description:
      "Owned post Shark Tank GTM across positioning, packaging, brand narrative, and channel mix, scaling revenue from $50K to $2M.",
    achievements: [
      "Owned post Shark Tank GTM across positioning, packaging, brand narrative, and channel mix, scaling revenue from $50K to $2M",
      "Stood up corporate gifting as a product line with catalogue, customisation options, and pricing tiers that turned one-off buyers into repeat enterprise accounts",
      "Built the demand engine across Meta and Google Ads, influencer seeding, retargeting, and Email/WhatsApp CRM",
    ],
    skills: ["GTM Strategy", "Product Marketing", "Brand Positioning", "Corporate Gifting", "Meta Ads", "Google Ads"],
  },
  {
    id: "5",
    company: "ThinkQuant",
    role: "Growth and Product Associate",
    period: "Feb 2019 – Nov 2020",
    description:
      "Launched a multi-channel lifecycle CRM product on MoEngage and ran acquisition experiments across Google and Meta with end-to-end ROI tracking.",
    achievements: [
      "Launched a multi-channel lifecycle CRM product (Push, SMS, Email, WhatsApp) on MoEngage",
      "Ran acquisition experiments across Google and Meta that grew monthly new user signups +57% with end-to-end ROI tracking",
    ],
    skills: ["Growth Experimentation", "Google Ads", "Meta Ads", "CRM", "MoEngage"],
  },
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState<string | null>("1");

  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "#f8fafb" }}>

      {/* === SVG BACKGROUND GRAPHIC === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="expGrad" cx="100%" cy="0%" r="55%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#expGrad)" />
          {/* Horizontal flowing lines */}
          <path d="M 0 80 Q 400 40 800 100 T 1600 80" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeOpacity="0.07" />
          <path d="M 0 160 Q 400 120 800 180 T 1600 160" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.05" />
          {/* Left accent bar */}
          <rect x="0" y="0" width="4" height="100%" fill="#0891b2" fillOpacity="0.12" />
          {/* Dot grid top-right */}
          <pattern id="expDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.09" />
          </pattern>
          <rect x="70%" y="0" width="30%" height="40%" fill="url(#expDots)" />
          {/* Large faint circle bottom-left */}
          <circle cx="0" cy="100%" r="300" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.07" />
        </svg>
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="accent-line mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Professional Experience</h2>
          <p className="text-lg text-muted-foreground">7+ years building consumer and platform products at the intersection of product, growth, and GTM</p>
        </div>

        {/* Experience Timeline */}
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="experience-card cursor-pointer bg-white"
              onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-bold text-foreground">{exp.role}</h3>
                  <p className="text-accent font-semibold mt-1">{exp.company}</p>
                  <p className="text-sm text-muted-foreground mt-1">{exp.period}</p>
                </div>
                <ChevronDown
                  size={24}
                  className={`text-accent transition-transform duration-300 flex-shrink-0 ml-4 ${expandedId === exp.id ? "rotate-180" : ""}`}
                />
              </div>

              {expandedId === exp.id && (
                <div className="mt-6 space-y-4 border-t border-border pt-6">
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Key Achievements</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-muted-foreground">
                          <span className="text-accent font-bold mt-0.5">•</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Skills Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map((skill) => (
                        <span key={skill} className="skill-badge">{skill}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

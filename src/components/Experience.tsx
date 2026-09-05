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
    company: "OptiServ Consulting",
    role: "Product and Customer Experience Manager",
    period: "Dec 2025 – Present",
    description:
      "Owning product roadmap and KPI framework for the customer experience platform — combining segmentation, lifecycle journeys, trigger-based automations, and A/B testing to lift repeat usage, CSAT, and SLA adherence.",
    achievements: [
      "Owned product roadmap and KPI framework for the customer experience platform, driving repeat usage +15%, CSAT +9%, and response time -27%",
      "Partnered with engineering on product instrumentation and experiment design; defined PRDs, user stories, and success metrics for support workflow and SLA improvement initiatives",
      "Led a 25-member cross-functional team across Product, CX, QA, and Ops to ship product enhancements, SOPs, and QA cadences that lifted SLA adherence",
    ],
    skills: [
      "Product Roadmap",
      "PRDs",
      "A/B Testing",
      "Lifecycle Journeys",
      "Team Leadership",
    ],
  },
  {
    id: "2",
    company: "KPAX Marketing",
    role: "Head of Growth and Product",
    period: "Oct 2021 – Nov 2025",
    description:
      "Owned end-to-end product strategy for acquisition, monetization, and lifecycle surfaces across the Meta, Google, and Apple Search Ads ecosystems. Promoted from Strategy Lead to Head while leading a 15-member cross-functional org.",
    achievements: [
      "Scaled brands to $3.5M in annual revenue within 9 months by shipping lifecycle, paid, and analytics product features",
      "Improved LTV from $70 to $350 and reduced payback time by 40% through cohort-based retention experiments, personalization, and journey optimization",
      "Owned end-to-end product strategy for acquisition, monetization, and lifecycle surfaces; defined roadmap, hypothesis backlog, and KPIs across Meta, Google, and Apple Search Ads ecosystems",
      "Led a 15-member cross-functional org across Product, Growth, CRM, and Operations; promoted from Strategy Lead to Head",
      "Led 0-to-1 product launch and GTM; defined PRDs, user requirements, onboarding, checkout, and payment journeys, lifting adoption and conversion through iterative experimentation",
      "Drove customer segmentation and lifecycle product journeys, increasing repeat transactions 15–25%, ROI 10–20%, and reducing churn 8–12%",
      "Built creative testing and keyword product systems on Apple Search Ads, scaling efficiently to CPA below $4",
    ],
    skills: [
      "Product Strategy",
      "PRDs & Roadmapping",
      "0-to-1 Product Launch",
      "LTV Optimization",
      "Meta Ads",
      "Google Ads",
      "Apple Search Ads",
      "Team Leadership",
    ],
  },
  {
    id: "3",
    company: "Ekatra Collective",
    role: "GTM and Product Marketing Manager",
    period: "Dec 2020 – Oct 2021",
    description:
      "Owned post Shark Tank product marketing and GTM — refining positioning, packaging, brand narrative, and channel mix to scale revenue from $50K to $2M.",
    achievements: [
      "Owned post Shark Tank product marketing and GTM; refined positioning, packaging, brand narrative, and channel mix to scale revenue from $50K to $2M",
      "Built repeat purchase loops via Meta and Google Ads, influencer seeding, retargeting, and Email/WhatsApp CRM",
    ],
    skills: ["GTM Strategy", "Product Marketing", "Brand Positioning", "Meta Ads", "Google Ads"],
  },
  {
    id: "4",
    company: "ThinkQuant",
    role: "Growth and Product Associate",
    period: "Feb 2019 – Nov 2020",
    description:
      "Drove user acquisition product experiments and launched a multi-channel CRM product on MoEngage to drive lifecycle engagement.",
    achievements: [
      "Drove user acquisition product experiments via Google PPC and Meta Ads, lifting monthly new user signups +57%",
      "Launched a multi-channel CRM product (Push, SMS, Email, WhatsApp) on MoEngage to drive lifecycle engagement",
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

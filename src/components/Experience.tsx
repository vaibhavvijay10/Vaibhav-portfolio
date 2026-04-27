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
    role: "Customer Experience & Growth Manager",
    period: "Dec 2025 – Present",
    description: "Leading customer experience and growth initiatives, building lifecycle engines and managing high-performing teams.",
    achievements: [
      "Built & scaled lifecycle & customer growth engine using segmentation, trigger journeys, SOPs, & QA",
      "Improved repeat usage by 15%, CSAT by 9%, & response time by 27%",
      "Led a 25-member CX/Support team to improve CSAT and SLA adherence",
    ],
    skills: ["CX Strategy", "Team Leadership", "Lifecycle Management", "QA"],
  },
  {
    id: "2",
    company: "KPAX Marketing",
    role: "Head of Growth",
    period: "Jan 2025 – Nov 2025",
    description: "Owned growth strategy across paid channels, built analytics foundation, and scaled brands to ₹20-30 Cr revenue.",
    achievements: [
      "Owned Meta, Google Ads, & ASO strategy across performance marketing funnels",
      "Built paid, lifecycle, & analytics foundation that helped scale brands to ₹20–30 Cr annual revenue",
      "Improved LTV from $70 to $350 and reduced payback time by 40%",
      "Built and led 15-member cross-functional team",
    ],
    skills: ["Meta Ads", "Google Ads", "ASO", "Team Leadership", "Analytics"],
  },
  {
    id: "3",
    company: "KPAX Marketing",
    role: "Growth & Product Strategy Lead",
    period: "Oct 2021 – Dec 2024",
    description: "Led 0-to-1 product launches, optimized customer journeys, and scaled Apple Search Ads efficiently.",
    achievements: [
      "Led 0-to-1 product launch & GTM, defining requirements, onboarding, checkout flows, & KPI tracking",
      "Optimized customer segmentation & lifecycle journeys, increasing repeat transactions by 15–25%",
      "Scaled Apple Search Ads efficiently to CPA below $4",
      "Increased ROI by 10–20% and reduced churn by 8–12%",
    ],
    skills: ["Product Launch", "GTM", "Apple Search Ads", "Funnel Optimization"],
  },
  {
    id: "4",
    company: "Ekatra Collective",
    role: "Digital Marketing Manager",
    period: "Dec 2020 – Oct 2021",
    description: "Drove demand generation and built GTM strategy post-Shark Tank, scaling revenue from ₹39L to ₹1.8 Cr.",
    achievements: [
      "Drove demand via Meta & Google Ads, influencer seeding, retargeting, content strategy",
      "Scaled revenue from ₹39L to ₹1.8 Cr",
      "Built post Shark Tank GTM strategy with refined positioning and brand narrative",
      "Executed via website, social, PR/events to drive awareness and credibility",
    ],
    skills: ["Meta Ads", "Google Ads", "GTM Strategy", "Content Marketing"],
  },
  {
    id: "5",
    company: "ThinkQuant",
    role: "Associate",
    period: "Feb 2019 – Nov 2020",
    description: "Drove user acquisition and built multi-channel CRM, growing monthly signups by 57%.",
    achievements: [
      "Grew monthly new-user signups +57% via Google PPC/Facebook ads acquisition",
      "Launched multi-channel CRM on MoEngage (Push/SMS/Email/WhatsApp)",
      "Implemented ROI tracking and optimization across channels",
    ],
    skills: ["Google Ads", "Facebook Ads", "CRM", "User Acquisition"],
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
          <p className="text-lg text-muted-foreground">7+ years of driving growth and scaling startups</p>
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

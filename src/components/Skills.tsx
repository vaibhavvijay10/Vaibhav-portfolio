interface SkillCategory {
  name: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    name: "Product Management",
    skills: [
      "Product Strategy",
      "PRDs & Roadmapping",
      "0-to-1 Product Launch",
      "A/B Testing",
      "User Journey Design",
      "Product Instrumentation",
    ],
  },
  {
    name: "Growth & Strategy",
    skills: [
      "Go-To-Market (GTM)",
      "Product-Led Growth",
      "Growth Experimentation",
      "Funnel Optimization",
      "User-Journey Design",
      "P&L Ownership",
      "Stakeholder Management",
    ],
  },
  {
    name: "Performance Marketing",
    skills: ["Meta Ads", "Google Ads", "Apple Search Ads", "ASO", "Retargeting", "Campaign Management"],
  },
  {
    name: "Customer & Retention",
    skills: ["Lifecycle Management", "LTV Maximization", "Customer Segmentation", "Retention Strategy", "CRM Platforms", "Email Marketing"],
  },
  {
    name: "AI & Product Development",
    skills: [
      "AI-Powered Products",
      "Gen-AI Prototyping",
      "Claude Code & Cowork",
      "AI-Led Workflows",
      "LLM Agents",
      "Prompt Engineering",
    ],
  },
  {
    name: "Analytics & Tools",
    skills: ["GA4", "Looker Studio", "AppsFlyer", "Mixpanel", "SEMrush", "Ahrefs", "Excel", "Data Analysis"],
  },
  {
    name: "Platforms & Tools",
    skills: ["MoEngage", "Customer.io", "Intercom", "Freshdesk", "Zapier", "n8n", "Slack"],
  },
  {
    name: "Soft Skills",
    skills: [
      "Team Leadership",
      "Cross-functional Collaboration",
      "Strategic Thinking",
      "Stakeholder Management",
      "Communication",
      "Problem Solving",
      "Mentoring",
    ],
  },
];

export default function Skills() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">

      {/* === SVG BACKGROUND GRAPHIC === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="skillsGrad1" cx="50%" cy="100%" r="60%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="skillsGrad2" cx="0%" cy="0%" r="40%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#skillsGrad1)" />
          <rect width="100%" height="100%" fill="url(#skillsGrad2)" />
          {/* Hexagon-like geometric shapes */}
          <polygon points="80,0 160,0 200,70 160,140 80,140 40,70" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.08" transform="translate(1100, 50) scale(1.5)" />
          <polygon points="80,0 160,0 200,70 160,140 80,140 40,70" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.05" transform="translate(1150, 80) scale(2)" />
          {/* Curved wave bottom */}
          <path d="M 0 90% Q 400 80% 800 90% T 1600 90%" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeOpacity="0.07" />
          {/* Dot grid left */}
          <pattern id="skillsDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.09" />
          </pattern>
          <rect x="0" y="20%" width="20%" height="60%" fill="url(#skillsDots)" />
          {/* Large circle top-right */}
          <circle cx="100%" cy="0" r="220" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.07" />
        </svg>
      </div>

      <div className="relative z-10 container max-w-4xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="accent-line mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Skills & Expertise</h2>
          <p className="text-lg text-muted-foreground">7+ years of product, growth, AI and analytics tools, platforms, and competencies I've shipped with</p>
        </div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {skillCategories.map((category) => (
            <div key={category.name} className="space-y-4 bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-border/50 shadow-sm">
              <h3 className="text-xl font-bold text-foreground border-l-4 border-accent pl-4">{category.name}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="skill-badge hover:bg-accent hover:text-white transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Proficiency Levels */}
        <div className="mt-16 bg-foreground text-white rounded-2xl p-8 relative overflow-hidden">
          {/* Inner graphic */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <pattern id="profDots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.05" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#profDots)" />
              <circle cx="100%" cy="50%" r="180" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.06" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-8 relative z-10">Proficiency Levels</h3>
          <div className="space-y-6 relative z-10">
            {[
              { label: "Growth Strategy & Execution", level: "Expert", pct: 95 },
              { label: "Product Development", level: "Expert", pct: 92 },
              { label: "Performance Marketing", level: "Expert", pct: 90 },
              { label: "AI-Led Product & Workflows", level: "Advanced", pct: 88 },
              { label: "Team Leadership", level: "Advanced", pct: 88 },
              { label: "Data Analysis & Reporting", level: "Advanced", pct: 85 },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-white">{item.label}</span>
                  <span className="text-sm text-gray-400">{item.level}</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-accent h-2 rounded-full transition-all duration-700" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

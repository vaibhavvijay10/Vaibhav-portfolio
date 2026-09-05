export default function About() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">

      {/* === SVG BACKGROUND GRAPHIC === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <radialGradient id="aboutGrad" cx="0%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.07" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#aboutGrad)" />
          {/* Large decorative arc */}
          <path d="M -80 0 Q 200 400 600 200 T 1400 300" fill="none" stroke="#0891b2" strokeWidth="1.5" strokeOpacity="0.08" />
          <path d="M -80 60 Q 200 460 600 260 T 1400 360" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.05" />
          {/* Corner accent */}
          <circle cx="100%" cy="0" r="250" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.08" />
          <circle cx="100%" cy="0" r="180" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.06" />
          {/* Dot pattern bottom-right */}
          <pattern id="aboutDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.09" />
          </pattern>
          <rect x="65%" y="50%" width="35%" height="50%" fill="url(#aboutDots)" />
        </svg>
      </div>

      <div className="relative z-10 container max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="accent-line mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">About Me</h2>
          <p className="text-lg text-muted-foreground">My professional journey and expertise</p>
        </div>

        {/* Main Content with Profile Picture */}
        <div className="grid md:grid-cols-3 gap-8 items-start mb-12">
          {/* Profile Picture */}
          <div className="md:col-span-1 flex justify-center">
            <div className="w-64 h-64 rounded-2xl overflow-hidden shadow-xl border-4 border-accent/20 hover:border-accent/50 transition-all duration-300">
              <img src="/profile.jpg" alt="Vaibhav Vijay" className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Bio */}
          <div className="md:col-span-2 space-y-4">
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm <strong className="text-foreground">Vaibhav Vijay</strong>, a data driven Product and Growth leader with <strong className="text-accent">7+ years of experience</strong> building consumer and platform products at the intersection of product, growth, and GTM. I specialize in 0 to 1 product launches, lifecycle product journeys, performance marketing, CRM, CRO, and AI led product development, with a strong focus on turning experiments into durable business outcomes.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              From 0 to 1 launches to scaling brands from $0 to $3.5M in annual revenue, I've owned the full KPI stack across acquisition, activation, retention, and LTV. Along the way I've defined PRDs, partnered with engineering on instrumentation and experiment design, and shipped product features that move the metrics that matter.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Beyond titles and channels, I see myself as someone who enjoys <strong className="text-foreground">building things that work</strong>: better journeys, stronger teams, clearer narratives, and more efficient systems for growth. I'm deeply interested in the relationship between human behavior, analytics, product experience, and marketing performance.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Outside work, I'm a dog person, a traveler, a surfing enthusiast, and someone who genuinely enjoys sports and analytics. These are the kind of interests that keep me curious, competitive, and always learning.
            </p>
          </div>
        </div>

        {/* Core Competencies and What I Bring */}
        <div className="grid md:grid-cols-2 gap-8 py-8 mb-12">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground border-l-4 border-accent pl-4">Core Competencies</h3>
            <ul className="space-y-3">
              {[
                "Product Strategy, PRDs & Roadmapping",
                "0-to-1 Product Launch & GTM",
                "Growth Strategy & Go-to-Market (GTM)",
                "Performance Marketing (Meta, Google & Apple Search Ads)",
                "Lifecycle Marketing, CRM & Retention",
                "Conversion Rate Optimization (CRO) & Funnel Optimization",
                "Product-Led Growth & Customer Journey Design",
                "AI-Led Product Development & Gen-AI Prototyping",
                "Marketing Analytics, Attribution & LTV Optimization",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">→</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-foreground border-l-4 border-accent pl-4">What I Bring</h3>
            <ul className="space-y-3">
              {[
                "0-to-1 launch and scale-up execution",
                "Full-funnel growth across acquisition, activation, retention, and revenue",
                "Data-driven experimentation and decision-making",
                "Cross-functional leadership across growth, product, CRM, and CX",
                "Strong commercial mindset with focus on ROI, LTV, and payback",
                "Hands-on execution across strategy, analytics, automation, and optimization",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-accent font-bold mt-1">→</span>
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Achievements */}
        <div className="bg-foreground text-white rounded-2xl p-8 border border-border relative overflow-hidden">
          {/* Inner graphic */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <circle cx="100%" cy="0" r="200" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.06" />
              <circle cx="0" cy="100%" r="150" fill="none" stroke="white" strokeWidth="1" strokeOpacity="0.06" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold mb-6 relative z-10">Key Achievements</h3>
          <div className="grid md:grid-cols-3 gap-6 relative z-10">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">ASO #1</div>
              <p className="text-sm text-gray-300">Ranked from #180 to #1 Category Ranking</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">5x LTV</div>
              <p className="text-sm text-gray-300">Grew LTV from $70 to $350 through retention optimization</p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-accent">Shark Tank</div>
              <p className="text-sm text-gray-300">Built GTM strategy for Ekatra post-Shark Tank success</p>
            </div>
          </div>
        </div>

        {/* Education */}
        <div className="mt-12">
          <h3 className="text-2xl font-bold text-foreground border-l-4 border-accent pl-4 mb-6">
            Education
          </h3>
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-5 border border-border/50 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-lg font-bold text-foreground">
                  Bachelor of Technology, Information Technology
                </h4>
                <span className="text-sm text-accent font-semibold">67.5%</span>
              </div>
              <p className="text-muted-foreground mt-1">
                Jaipur Engineering College and Research Centre (JECRC Foundation), Jaipur
              </p>
            </div>
            <div className="bg-white rounded-xl p-5 border border-border/50 shadow-sm">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h4 className="text-lg font-bold text-foreground">
                  St. Paul Sr. Sec. School, Kota
                </h4>
                <span className="text-sm text-accent font-semibold">
                  12th: 80.6% &middot; 10th: 8.6 CGPA
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

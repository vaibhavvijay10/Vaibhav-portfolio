import { Link } from "wouter";
import { ArrowRight, TrendingUp, Sparkles, Crown } from "lucide-react";
import { projects } from "@/data/projects";

const ICONS = { TrendingUp, Sparkles, Crown } as const;

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  "In Progress": "bg-amber-500/10 text-amber-700 border-amber-500/30",
  Shipped: "bg-accent/10 text-accent border-accent/30",
};

export default function Projects() {
  return (
    <section className="relative py-20 overflow-hidden" style={{ background: "#f8fafb" }}>
      {/* === SVG BACKGROUND GRAPHIC === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="projSecGrad" cx="20%" cy="15%" r="55%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>
            <pattern id="projSecDots" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.09" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#projSecGrad)" />
          <rect x="0" y="0" width="4" height="100%" fill="#0891b2" fillOpacity="0.12" />
          <circle cx="88%" cy="85%" r="200" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.08" />
          <rect x="70%" y="0" width="30%" height="35%" fill="url(#projSecDots)" />
        </svg>
      </div>

      <div className="relative z-10 container max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="accent-line mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Projects</h2>
          <p className="text-lg text-muted-foreground">
            Things I've built — a live trading engine, an AI first mobile app, and a 0-to-1 brand launch
          </p>
        </div>

        {/* Project cards */}
        <div className="grid md:grid-cols-3 gap-5">
          {projects.map((p) => {
            const Icon = ICONS[p.icon];
            return (
              <Link
                key={p.slug}
                to={`/projects/${p.slug}`}
                className="group flex flex-col bg-white hover:bg-white border border-border/50 hover:border-accent/50 rounded-xl p-6 transition-all hover:shadow-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-lg bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                    <Icon size={20} aria-hidden="true" />
                  </div>
                  <span
                    className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                      STATUS_STYLES[p.status] ?? STATUS_STYLES.Shipped
                    }`}
                  >
                    {p.status}
                  </span>
                </div>

                <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                  {p.name}
                </h3>
                <p className="text-sm text-accent font-medium mb-3">{p.tagline}</p>

                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {p.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="skill-badge text-[11px]">
                      {t}
                    </span>
                  ))}
                </div>

                <span className="inline-flex items-center gap-2 text-accent group-hover:text-accent/80 font-semibold text-sm mt-auto">
                  Read more
                  <ArrowRight size={14} aria-hidden="true" />
                </span>
              </Link>
            );
          })}
        </div>

        {/* View all */}
        <div className="mt-8 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 font-semibold rounded-lg transition-colors"
          >
            View all projects
            <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

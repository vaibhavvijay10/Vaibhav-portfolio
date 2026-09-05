import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import {
  ArrowLeft,
  ArrowRight,
  TrendingUp,
  Sparkles,
  Crown,
  Check,
  Lightbulb,
  Mail,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getProjectBySlug, projects } from "@/data/projects";

const SITE_URL = "https://vaibhavvijay.com";
const ICONS = { TrendingUp, Sparkles, Crown } as const;

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  "In Progress": "bg-amber-500/10 text-amber-700 border-amber-500/30",
  Shipped: "bg-accent/10 text-accent border-accent/30",
};

function setLinkTag(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function injectJsonLd(id: string, data: object) {
  document.getElementById(id)?.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

interface Props {
  slug: string;
}

export default function ProjectDetailPage({ slug }: Props) {
  const [, navigate] = useLocation();
  const project = getProjectBySlug(slug);
  const otherProjects = projects.filter((p) => p.slug !== slug);

  useEffect(() => {
    if (!project) return;
    const url = `${SITE_URL}/projects/${project.slug}`;
    const title = `${project.name} — ${project.tagline} | Vaibhav Vijay`;

    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", project.excerpt);
    setLinkTag("canonical", url);

    document.querySelector('meta[property="og:type"]')?.setAttribute("content", "article");
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", project.excerpt);

    injectJsonLd("project-jsonld", {
      "@context": "https://schema.org",
      "@type": "CreativeWork",
      "@id": `${url}#project`,
      name: `${project.name} — ${project.tagline}`,
      headline: project.name,
      description: project.excerpt,
      url,
      creator: { "@id": `${SITE_URL}/#person` },
      author: { "@id": `${SITE_URL}/#person` },
      about: project.category,
      keywords: project.tags.join(", "),
      isPartOf: { "@id": `${SITE_URL}/#website` },
      inLanguage: "en",
    });

    return () => {
      document.getElementById("project-jsonld")?.remove();
    };
  }, [project]);

  if (!project) {
    return (
      <div className="flex">
        <Navigation onNavigate={(s) => navigate(`/#${s}`)} activeSection="projects" />
        <main className="flex-1 md:ml-20">
          <section className="min-h-screen flex items-center justify-center px-6 bg-white">
            <div className="text-center max-w-lg">
              <div className="text-6xl font-bold text-foreground mb-4">404</div>
              <h1 className="text-2xl font-bold text-foreground mb-4">Project not found</h1>
              <p className="text-muted-foreground mb-8">
                That project doesn't exist. Browse all projects instead.
              </p>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <ArrowLeft size={18} />
                All projects
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  const Icon = ICONS[project.icon];

  return (
    <div className="flex">
      <Navigation onNavigate={(s) => navigate(`/#${s}`)} activeSection="projects" />

      <main className="flex-1 md:ml-20">
        <article className="relative bg-white overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="pdGrad" cx="80%" cy="8%" r="52%">
                  <stop offset="0%" stopColor="#0891b2" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                </radialGradient>
                <pattern id="pdDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.10" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#pdGrad)" />
              <circle cx="92%" cy="10%" r="170" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.09" />
              <rect x="0" y="72%" width="26%" height="28%" fill="url(#pdDots)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              All projects
            </Link>

            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-4 mb-5">
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                  <Icon size={26} aria-hidden="true" />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                      STATUS_STYLES[project.status] ?? STATUS_STYLES.Shipped
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="text-xs text-muted-foreground">{project.category}</span>
                </div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-2">
                {project.name}
              </h1>
              <p className="text-xl sm:text-2xl text-accent font-medium mb-6">{project.tagline}</p>

              {/* Meta strip */}
              <dl className="grid sm:grid-cols-2 gap-4 p-5 bg-secondary/40 rounded-xl border border-border/50">
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Role
                  </dt>
                  <dd className="text-foreground font-medium">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-xs uppercase tracking-widest text-muted-foreground mb-1">
                    Period
                  </dt>
                  <dd className="text-foreground font-medium">{project.period}</dd>
                </div>
              </dl>
            </header>

            {/* Overview */}
            <section className="mb-12">
              {project.overview.split(/\n\n+/).map((para, i) => (
                <p key={i} className="text-lg text-foreground/85 leading-relaxed mb-5">
                  {para}
                </p>
              ))}
            </section>

            {/* Sections */}
            <div className="space-y-10 mb-12">
              {project.sections.map((s, i) => (
                <section key={i}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-4">
                    {s.heading}
                  </h2>
                  {s.body &&
                    s.body.split(/\n\n+/).map((para, j) => (
                      <p key={j} className="text-lg text-foreground/85 leading-relaxed mb-4">
                        {para}
                      </p>
                    ))}
                  {s.bullets && (
                    <ul className="space-y-3 mt-4">
                      {s.bullets.map((b, j) => (
                        <li key={j} className="flex items-start gap-3">
                          <span className="text-accent font-bold mt-1 flex-shrink-0">→</span>
                          <span className="text-lg text-foreground/85 leading-relaxed">{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Stack */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Stack &amp; components
              </h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {project.stack.map((group) => (
                  <div
                    key={group.label}
                    className="bg-white rounded-xl p-5 border border-border/50 shadow-sm"
                  >
                    <h3 className="text-sm font-bold uppercase tracking-widest text-accent mb-3">
                      {group.label}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map((item) => (
                        <span key={item} className="skill-badge text-xs">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Outcomes */}
            {project.outcomes && project.outcomes.length > 0 && (
              <section className="mb-12">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">Outcomes</h2>
                <ul className="space-y-3">
                  {project.outcomes.map((o, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check size={20} className="text-accent mt-1 flex-shrink-0" aria-hidden="true" />
                      <span className="text-lg text-foreground/85 leading-relaxed">{o}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Learnings */}
            <section className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                What it taught me
              </h2>
              <div className="space-y-4">
                {project.learnings.map((l, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 bg-accent/5 border border-accent/20 rounded-xl p-4"
                  >
                    <Lightbulb size={20} className="text-accent mt-0.5 flex-shrink-0" aria-hidden="true" />
                    <span className="text-lg text-foreground/85 leading-relaxed">{l}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Related articles */}
            {project.relatedArticles && project.relatedArticles.length > 0 && (
              <section className="mb-12 pt-10 border-t border-border">
                <h2 className="text-xl font-bold text-foreground mb-5">
                  I've written more about this
                </h2>
                <div className="space-y-3">
                  {project.relatedArticles.map((a) => (
                    <Link
                      key={a.slug}
                      to={`/blog/${a.slug}`}
                      className="group flex items-start justify-between gap-4 p-4 bg-secondary/40 hover:bg-accent/10 border border-border/50 hover:border-accent/40 rounded-lg transition-colors"
                    >
                      <span className="font-medium text-foreground group-hover:text-accent leading-snug">
                        {a.title}
                      </span>
                      <ArrowRight
                        size={16}
                        className="text-muted-foreground group-hover:text-accent flex-shrink-0 mt-1"
                        aria-hidden="true"
                      />
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {/* Other projects */}
            <section className="mb-12">
              <h2 className="text-xl font-bold text-foreground mb-5">Other projects</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {otherProjects.map((p) => {
                  const OtherIcon = ICONS[p.icon];
                  return (
                    <Link
                      key={p.slug}
                      to={`/projects/${p.slug}`}
                      className="group flex items-center gap-3 p-4 bg-secondary/40 hover:bg-accent/10 border border-border/50 hover:border-accent/40 rounded-lg transition-colors"
                    >
                      <OtherIcon size={18} className="text-accent flex-shrink-0" aria-hidden="true" />
                      <div className="min-w-0 flex-1">
                        <div className="font-semibold text-foreground group-hover:text-accent truncate">
                          {p.name}
                        </div>
                        <div className="text-xs text-muted-foreground truncate">{p.tagline}</div>
                      </div>
                      <ArrowRight
                        size={16}
                        className="text-muted-foreground group-hover:text-accent flex-shrink-0"
                        aria-hidden="true"
                      />
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* CTA */}
            <div className="bg-foreground text-white rounded-2xl p-8 text-center space-y-4">
              <h2 className="text-xl font-bold">Working on something like this?</h2>
              <p className="opacity-90">
                I work with startups and digital brands on product strategy, 0-to-1 launches,
                growth, and AI-led builds.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <a
                  href={`mailto:vvvj.14@gmail.com?subject=${encodeURIComponent(`Re: ${project.name}`)}`}
                  className="bg-accent hover:bg-accent/90 text-white px-5 py-3 font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail size={18} aria-hidden="true" />
                  Email Vaibhav
                </a>
                <Link
                  to="/services"
                  className="border-2 border-white/30 hover:bg-white/10 text-white px-5 py-3 font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                >
                  See services
                </Link>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </main>
    </div>
  );
}

import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, TrendingUp, Sparkles, Crown, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { projects } from "@/data/projects";

const SITE_URL = "https://vaibhavvijay.com";
const PAGE_URL = `${SITE_URL}/projects`;

const PAGE_TITLE = "Projects | Vaibhav Vijay — Product, AI and Growth Builds";
const PAGE_DESC =
  "Things Vaibhav Vijay has built: AlphaPulse (algorithmic trading engine), Karmic.ai (AI first mobile app), and WinningKings (0-to-1 casino brand launch in India). Architecture, approach and what each one taught.";

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

export default function ProjectsPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = PAGE_TITLE;
    document.querySelector('meta[name="description"]')?.setAttribute("content", PAGE_DESC);
    setLinkTag("canonical", PAGE_URL);
    document.querySelector('meta[property="og:type"]')?.setAttribute("content", "website");
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", PAGE_URL);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", PAGE_TITLE);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", PAGE_DESC);

    injectJsonLd("projects-collection-jsonld", {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#collection`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#person` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: projects.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${PAGE_URL}/${p.slug}`,
          name: `${p.name} — ${p.tagline}`,
        })),
      },
    });

    return () => {
      document.getElementById("projects-collection-jsonld")?.remove();
    };
  }, []);

  return (
    <div className="flex">
      <Navigation onNavigate={(s) => navigate(`/#${s}`)} activeSection="projects" />

      <main className="flex-1 md:ml-20">
        <article className="relative bg-white overflow-hidden">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="projGrad" cx="85%" cy="10%" r="55%">
                  <stop offset="0%" stopColor="#0891b2" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                </radialGradient>
                <pattern id="projDots" x="0" y="0" width="30" height="30" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.10" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#projGrad)" />
              <circle cx="92%" cy="10%" r="180" fill="none" stroke="#0891b2" strokeWidth="1" strokeOpacity="0.10" />
              <rect x="0" y="70%" width="28%" height="30%" fill="url(#projDots)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              Home
            </Link>

            <header className="mb-12">
              <div className="accent-line mb-4" />
              <p className="text-xs sm:text-sm font-semibold text-accent tracking-widest uppercase mb-3">
                Projects
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
                Things I've built
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                A trading engine that runs live, an AI first mobile app in active development, and a
                0-to-1 casino brand launch in one of the most competitive markets there is. Each one
                below has the architecture, the approach, and what it actually taught me.
              </p>
            </header>

            {/* Project cards */}
            <div className="space-y-6">
              {projects.map((p) => {
                const Icon = ICONS[p.icon];
                return (
                  <Link
                    key={p.slug}
                    to={`/projects/${p.slug}`}
                    className="group block bg-white hover:bg-secondary/30 border border-border/50 hover:border-accent/50 rounded-2xl p-6 sm:p-8 transition-all hover:shadow-lg"
                  >
                    <div className="flex items-start gap-4 sm:gap-5">
                      <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                        <Icon size={24} aria-hidden="true" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`text-[11px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
                              STATUS_STYLES[p.status] ?? STATUS_STYLES.Shipped
                            }`}
                          >
                            {p.status}
                          </span>
                          <span className="text-xs text-muted-foreground">{p.category}</span>
                        </div>

                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                          {p.name}
                        </h2>
                        <p className="text-base sm:text-lg text-accent font-medium mb-3">
                          {p.tagline}
                        </p>

                        <p className="text-muted-foreground leading-relaxed mb-4">{p.excerpt}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {p.tags.map((t) => (
                            <span key={t} className="skill-badge text-xs">
                              {t}
                            </span>
                          ))}
                        </div>

                        <span className="inline-flex items-center gap-2 text-accent group-hover:text-accent/80 font-semibold text-sm">
                          Read the full breakdown
                          <ArrowRight size={14} aria-hidden="true" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* CTA */}
            <div className="mt-14 bg-foreground text-white rounded-2xl p-8 text-center space-y-4 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                  <pattern id="projCtaDots" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.05" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#projCtaDots)" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold relative z-10">Building something similar?</h2>
              <p className="text-lg opacity-90 relative z-10 max-w-2xl mx-auto">
                I work with startups and digital brands on product strategy, 0-to-1 launches,
                growth, and AI-led builds. Always open to a conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10 pt-2">
                <a
                  href="mailto:vvvj.14@gmail.com?subject=Project%20enquiry"
                  className="bg-accent hover:bg-accent/90 text-white px-6 py-3 font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail size={18} aria-hidden="true" />
                  Get in touch
                </a>
                <Link
                  to="/services"
                  className="border-2 border-white/30 hover:bg-white/10 text-white px-6 py-3 font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
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

import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Mail, Check } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { services } from "@/data/services";

const SITE_URL = "https://vaibhavvijay.com";
const PAGE_URL = `${SITE_URL}/services`;

const PAGE_TITLE =
  "Services | Vaibhav Vijay — Growth & Performance Marketing Consulting";
const PAGE_DESC =
  "Fractional Head of Growth, performance marketing optimization, lifecycle CRM, CRO, AI marketing and GTM strategy for startups and digital-first brands. India-based, working globally.";

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
  const existing = document.getElementById(id);
  if (existing) existing.remove();
  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.id = id;
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

export default function ServicesPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = PAGE_TITLE;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", PAGE_DESC);
    setLinkTag("canonical", PAGE_URL);

    document
      .querySelector('meta[property="og:type"]')
      ?.setAttribute("content", "website");
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", PAGE_URL);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", PAGE_TITLE);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", PAGE_DESC);

    // CollectionPage with an ItemList of Service entries
    injectJsonLd("services-collection-jsonld", {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${PAGE_URL}#collection`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      about: { "@id": `${SITE_URL}/#service` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: services.map((s, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            "@id": `${PAGE_URL}#${s.slug}`,
            name: s.name,
            description: s.description,
            provider: { "@id": `${SITE_URL}/#person` },
            areaServed: [
              { "@type": "Country", name: "India" },
              { "@type": "Place", name: "Global (Remote)" },
            ],
            serviceType: s.name,
            url: `${PAGE_URL}#${s.slug}`,
          },
        })),
      },
    });

    return () => {
      document.getElementById("services-collection-jsonld")?.remove();
    };
  }, []);

  return (
    <div className="flex">
      <Navigation onNavigate={(s) => navigate(`/#${s}`)} activeSection="services" />

      <main className="flex-1 md:ml-20">
        <article className="relative bg-white overflow-hidden">
          {/* SVG background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="servicesGrad" cx="15%" cy="15%" r="55%">
                  <stop offset="0%" stopColor="#0891b2" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#servicesGrad)" />
              <circle
                cx="8%"
                cy="8%"
                r="180"
                fill="none"
                stroke="#0891b2"
                strokeWidth="1"
                strokeOpacity="0.10"
              />
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
                Services
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
                How I work with growth-stage companies
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Six ways I engage with clients. Pick the one closest to where you are,
                or {""}
                <a
                  href="mailto:vvvj.14@gmail.com"
                  className="text-accent hover:underline font-medium"
                >
                  email me
                </a>{" "}
                directly if it does not quite match — most engagements are shaped to fit
                the team and stage.
              </p>
            </header>

            <div className="space-y-12">
              {services.map((s, i) => (
                <section
                  key={s.slug}
                  id={s.slug}
                  className="scroll-mt-24 pb-12 border-b border-border last:border-b-0"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-sm font-semibold text-muted-foreground">
                      0{i + 1}
                    </span>
                    <span className="text-xs uppercase tracking-widest text-accent font-semibold">
                      {s.format.split(",")[0]}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight mb-3">
                    {s.name}
                  </h2>
                  <p className="text-lg text-accent font-medium mb-4 italic">
                    {s.tagline}
                  </p>
                  <p className="text-lg text-foreground/85 leading-relaxed mb-6">
                    {s.description}
                  </p>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-3">
                        What you get
                      </h3>
                      <ul className="space-y-2">
                        {s.deliverables.map((d, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-foreground/85">
                            <Check size={16} className="text-accent mt-1 flex-shrink-0" aria-hidden="true" />
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground mb-3">
                        Outcomes you target
                      </h3>
                      <ul className="space-y-2">
                        {s.outcomes.map((o, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-foreground/85">
                            <Check size={16} className="text-accent mt-1 flex-shrink-0" aria-hidden="true" />
                            <span>{o}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="bg-secondary/40 rounded-lg p-4 border border-border/50 space-y-2 mb-4">
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">Format:</span>{" "}
                      <span className="text-foreground/80">{s.format}</span>
                    </p>
                    <p className="text-sm">
                      <span className="font-semibold text-foreground">Best for:</span>{" "}
                      <span className="text-foreground/80">{s.bestFor}</span>
                    </p>
                  </div>

                  <a
                    href={`mailto:vvvj.14@gmail.com?subject=${encodeURIComponent(`Inquiry: ${s.name}`)}`}
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
                  >
                    Discuss this engagement
                    <ArrowRight size={16} aria-hidden="true" />
                  </a>
                </section>
              ))}
            </div>

            {/* Footer CTA */}
            <div className="mt-16 bg-foreground text-white rounded-2xl p-8 text-center space-y-4 relative overflow-hidden">
              <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <svg
                  className="absolute inset-0 w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <pattern
                    id="servicesCtaDots"
                    x="0"
                    y="0"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.05" />
                  </pattern>
                  <rect width="100%" height="100%" fill="url(#servicesCtaDots)" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold relative z-10">
                Not sure which one fits?
              </h2>
              <p className="text-lg opacity-90 relative z-10 max-w-2xl mx-auto">
                Most first conversations are a 30-minute intro call where we figure out
                where you actually are vs. where you think you are. No pitch, no sales
                deck.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10 pt-2">
                <a
                  href="mailto:vvvj.14@gmail.com?subject=Intro%20call%20request"
                  className="bg-accent hover:bg-accent/90 text-white px-6 py-3 font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                >
                  <Mail size={18} aria-hidden="true" />
                  Book an intro call
                </a>
                <Link
                  to="/about"
                  className="border-2 border-white/30 hover:bg-white/10 text-white px-6 py-3 font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                >
                  About Vaibhav
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

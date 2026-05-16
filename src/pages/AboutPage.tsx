import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Mail, Linkedin, MessageCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const SITE_URL = "https://vaibhavvijay.com";
const PAGE_URL = `${SITE_URL}/about`;

const PAGE_TITLE = "About Vaibhav Vijay | Head of Growth & Performance Marketing Leader";
const PAGE_DESC =
  "Vaibhav Vijay is a Head of Growth and Performance Marketing leader with 7+ years scaling startups and digital brands in India. ₹20Cr+ revenue scaled, 5x LTV growth, ASO #180→#1. Based in India, available for consulting globally.";

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

export default function AboutPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = PAGE_TITLE;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", PAGE_DESC);
    setLinkTag("canonical", PAGE_URL);

    // OG
    document
      .querySelector('meta[property="og:type"]')
      ?.setAttribute("content", "profile");
    document
      .querySelector('meta[property="og:url"]')
      ?.setAttribute("content", PAGE_URL);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", PAGE_TITLE);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", PAGE_DESC);

    // AboutPage JSON-LD
    injectJsonLd("about-page-jsonld", {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      "@id": `${PAGE_URL}#aboutpage`,
      url: PAGE_URL,
      name: PAGE_TITLE,
      description: PAGE_DESC,
      mainEntity: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en",
    });

    return () => {
      document.getElementById("about-page-jsonld")?.remove();
    };
  }, []);

  // FAQs targeting the highest-intent "Who is Vaibhav Vijay" queries
  const faqs = [
    {
      q: "Who is Vaibhav Vijay?",
      a: `Vaibhav Vijay is a Head of Growth and Performance Marketing leader based in India with 7+ years of experience scaling startups and digital-first brands. He has helped scale multiple brands to ₹20Cr+ in revenue across 4 companies, taken an app from #180 to #1 in its category through ASO, and grown customer LTV 5x (from $70 to $350) through retention optimization. He specializes in performance marketing across Meta, Google and Apple Search Ads; lifecycle marketing and CRM; conversion rate optimization; and AI-native marketing workflows. He is available for consulting, fractional Head of Growth roles, and strategic partnerships.`,
    },
    {
      q: "What is Vaibhav's professional background?",
      a: `Vaibhav has spent the last seven plus years building and scaling growth functions across iGaming, D2C, mobile apps and SaaS. He started in performance marketing — running paid acquisition across Meta, Google and Apple Search Ads — and over time grew the scope to include lifecycle CRM, retention, conversion rate optimization, marketing analytics and go-to-market strategy. Today he operates as a full-funnel growth leader who can own the entire growth P&L, not just one channel.`,
    },
    {
      q: "What industries has Vaibhav worked in?",
      a: `Vaibhav has worked across iGaming and gaming operations, direct-to-consumer (D2C) brands, mobile apps, SaaS, and consumer fintech. The iGaming background is particularly relevant because the industry forces a level of financial rigour — measuring unit economics in hours rather than quarters — that transfers cleanly to every other category. He has applied the same cohort discipline to D2C brands and seen 2-5x LTV improvements as a result.`,
    },
    {
      q: "What are Vaibhav's notable career achievements?",
      a: `Notable outcomes from past engagements include: helping multiple brands scale to ₹20 Cr+ in annual revenue; taking an app from #180 to #1 in its App Store category over 90 days through ASO and ASA optimization; growing customer LTV 5x from $70 to $350 through a restructured retention and incentive program; building the go-to-market playbook for Ekatra following its Shark Tank India appearance; rebuilding the reactivation engine for a brand where dormant users outnumbered active 3:1, bringing 14% of dormant users back at one fifth of fresh acquisition CAC.`,
    },
    {
      q: "What does Vaibhav specialize in?",
      a: `Six core specializations: (1) Growth Strategy and Go-to-Market — defining ICP, channel mix and 90-day proof; (2) Performance Marketing across Meta, Google and Apple Search Ads with cohort-aware unit economics; (3) Lifecycle Marketing, CRM and Retention using MoEngage, Customer.io and similar platforms; (4) Conversion Rate Optimization and funnel design; (5) AI-native marketing workflows and AEO/GEO strategy; (6) Fractional Head of Growth leadership for Series A-C startups.`,
    },
    {
      q: "What is Vaibhav's approach to growth?",
      a: `Vaibhav uses a data-driven, full-funnel approach focused on acquisition, activation, retention, revenue and customer experience. He believes in building sustainable growth engines backed by analytics, testing frameworks and customer-centric strategies rather than relying on any single channel. Three principles run through every engagement: shorten the feedback loop (set kill criteria before scaling), reward the right behaviour with incentives (not the wrong cohorts), and measure unit economics at the cohort level (channel averages lie).`,
    },
    {
      q: "Where is Vaibhav Vijay based?",
      a: `Vaibhav Vijay is based in India. He works with clients globally on a fully remote and hybrid basis. Most of his client work is with India-based startups and D2C brands, with occasional engagements in Southeast Asia, the Middle East and the United States. He is fluent in English and Hindi.`,
    },
    {
      q: "What tools and platforms does Vaibhav use?",
      a: `Performance marketing: Meta Ads Manager, Google Ads, Apple Search Ads, App Store Connect. Lifecycle and CRM: MoEngage, Customer.io, Klaviyo, Braze. Analytics and attribution: Google Analytics 4, Mixpanel, Amplitude, Looker Studio, GA4 + BigQuery. CRO: Optimizely, VWO, PostHog, Mixpanel. AI and automation: ChatGPT, Claude, Perplexity, local LLM agents on personal infrastructure, custom n8n / Make workflows.`,
    },
    {
      q: "How can I hire Vaibhav or contact him for consulting?",
      a: `Email: vvvj.14@gmail.com. Phone and WhatsApp: +91-99822-67285. LinkedIn: linkedin.com/in/vaibhavvijay10. He typically responds within 24 hours and is open to fractional Head of Growth engagements, project-based consulting (growth audits, GTM build-outs, lifecycle program builds), and advisory roles. Booking a 30-minute intro call is the fastest way to determine fit.`,
    },
    {
      q: "What is Vaibhav's writing and thought leadership about?",
      a: `Vaibhav publishes regularly on growth marketing, AI's impact on discovery (AEO/GEO), workflow automation, performance marketing across Meta/Google/Apple, retention and lifecycle plays, and the financial rigour that comes from iGaming. His writing is built around real numbers from real engagements — not abstract frameworks. Recent essays cover the Death of the Funnel, the rise of AI agents in marketing operations, structured generosity in iGaming, and how a single strategist can operate as a full growth engine when paired with the right AI tools.`,
    },
  ];

  // Build FAQ JSON-LD specifically for this page (more focused than the homepage FAQ)
  useEffect(() => {
    injectJsonLd("about-faq-jsonld", {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${PAGE_URL}#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    });
    return () => {
      document.getElementById("about-faq-jsonld")?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex">
      <Navigation onNavigate={(s) => navigate(`/#${s}`)} activeSection="about" />

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
                <radialGradient id="aboutPageGrad" cx="85%" cy="15%" r="55%">
                  <stop offset="0%" stopColor="#0891b2" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                </radialGradient>
                <pattern
                  id="aboutPageDots"
                  x="0"
                  y="0"
                  width="30"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.10" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#aboutPageGrad)" />
              <circle
                cx="92%"
                cy="12%"
                r="180"
                fill="none"
                stroke="#0891b2"
                strokeWidth="1"
                strokeOpacity="0.10"
              />
              <rect x="65%" y="0" width="35%" height="40%" fill="url(#aboutPageDots)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              Home
            </Link>

            {/* Header */}
            <header className="mb-12">
              <div className="accent-line mb-4" />
              <p className="text-xs sm:text-sm font-semibold text-accent tracking-widest uppercase mb-3">
                About
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
                Vaibhav Vijay — Head of Growth &amp; Performance Marketing Leader
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Data-driven growth leader with 7+ years scaling startups and digital-first
                brands across iGaming, D2C, mobile apps and SaaS. Based in India, working
                with clients globally.
              </p>
            </header>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12 p-6 bg-secondary/40 rounded-2xl border border-border/50">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-accent">7+</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">Years experience</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-accent">₹20Cr+</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">Revenue scaled</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-accent">5x</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">LTV growth</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-accent">#1</div>
                <div className="text-xs sm:text-sm text-muted-foreground mt-1">ASO ranking (from #180)</div>
              </div>
            </div>

            {/* FAQ sections — each is its own H2 (question form, AEO-engineered) */}
            <div className="space-y-10">
              {faqs.map((f, i) => (
                <section key={i}>
                  <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 leading-tight">
                    {f.q}
                  </h2>
                  <p className="text-lg text-foreground/85 leading-relaxed">{f.a}</p>
                </section>
              ))}
            </div>

            {/* Contact CTAs */}
            <div className="mt-16 pt-10 border-t border-border space-y-6">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">
                Work with Vaibhav
              </h2>
              <p className="text-lg text-foreground/85 leading-relaxed">
                Available for fractional Head of Growth engagements, project-based consulting
                (growth audits, GTM build-outs, lifecycle program builds, performance
                marketing optimization), and advisory roles. Most replies within 24 hours.
              </p>
              <div className="flex flex-wrap gap-3">
                <a
                  href="mailto:vvvj.14@gmail.com"
                  className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 font-semibold rounded-lg transition-colors"
                >
                  <Mail size={18} aria-hidden="true" />
                  Email Vaibhav
                </a>
                <a
                  href="https://wa.me/919982267285?text=Hi%20Vaibhav%2C%20I%20would%20like%20to%20discuss%20a%20growth%20opportunity."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-accent text-accent hover:bg-accent/10 px-5 py-3 font-semibold rounded-lg transition-colors"
                >
                  <MessageCircle size={18} aria-hidden="true" />
                  WhatsApp
                </a>
                <a
                  href="https://linkedin.com/in/vaibhavvijay10"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-border text-foreground hover:bg-secondary px-5 py-3 font-semibold rounded-lg transition-colors"
                >
                  <Linkedin size={18} aria-hidden="true" />
                  LinkedIn
                </a>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold px-3 py-3 transition-colors"
                >
                  View services
                  <ArrowRight size={16} aria-hidden="true" />
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

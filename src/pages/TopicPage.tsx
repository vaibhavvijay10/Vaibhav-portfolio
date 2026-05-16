import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getTopicBySlug, getPostsForTopic, topics } from "@/data/topics";

const SITE_URL = "https://vaibhavvijay.com";

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

interface Props {
  slug: string;
}

export default function TopicPage({ slug }: Props) {
  const [, navigate] = useLocation();
  const topic = getTopicBySlug(slug);
  const posts = topic ? getPostsForTopic(topic) : [];

  useEffect(() => {
    if (!topic) return;
    const url = `${SITE_URL}/topics/${topic.slug}`;
    const title = `${topic.title} | Vaibhav Vijay`;

    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", topic.description);
    setLinkTag("canonical", url);

    document
      .querySelector('meta[property="og:type"]')
      ?.setAttribute("content", "website");
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", topic.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", topic.description);

    // CollectionPage + ItemList for the articles in this topic
    injectJsonLd("topic-jsonld", {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      "@id": `${url}#collection`,
      url,
      name: topic.title,
      description: topic.description,
      keywords: topic.keywords.join(", "),
      isPartOf: { "@id": `${SITE_URL}/#website` },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${SITE_URL}/blog/${p.slug}`,
          name: p.title,
        })),
      },
    });

    return () => {
      document.getElementById("topic-jsonld")?.remove();
    };
  }, [topic, posts]);

  if (!topic) {
    return (
      <div className="flex">
        <Navigation onNavigate={(s) => navigate(`/#${s}`)} activeSection="blog" />
        <main className="flex-1 md:ml-20">
          <section className="min-h-screen flex items-center justify-center px-6 bg-white">
            <div className="text-center max-w-lg">
              <div className="text-6xl font-bold text-foreground mb-4">404</div>
              <h1 className="text-2xl font-bold text-foreground mb-4">Topic not found</h1>
              <p className="text-muted-foreground mb-8">
                That topic does not exist. Browse all topics from the homepage.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <ArrowLeft size={18} />
                Back to home
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  // Other topics (for inter-topic linking — boosts crawl depth + entity reconciliation)
  const otherTopics = topics.filter((t) => t.slug !== topic.slug);

  return (
    <div className="flex">
      <Navigation onNavigate={(s) => navigate(`/#${s}`)} activeSection="blog" />

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
                <radialGradient id="topicGrad" cx="50%" cy="20%" r="60%">
                  <stop offset="0%" stopColor="#0891b2" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                </radialGradient>
                <pattern
                  id="topicDots"
                  x="0"
                  y="0"
                  width="28"
                  height="28"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.10" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#topicGrad)" />
              <rect x="0" y="60%" width="30%" height="40%" fill="url(#topicDots)" />
            </svg>
          </div>

          <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              All articles
            </Link>

            <header className="mb-12">
              <div className="accent-line mb-4" />
              <p className="text-xs sm:text-sm font-semibold text-accent tracking-widest uppercase mb-3">
                Topic
              </p>
              <h1 className="text-4xl sm:text-5xl font-bold text-foreground leading-tight mb-6">
                {topic.title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {topic.description}
              </p>
            </header>

            {/* Primer paragraph(s) — gives Google + AI engines context for what the topic covers */}
            <div className="prose prose-lg max-w-none mb-12 space-y-5">
              {topic.primer.split(/\n\n+/).map((para, i) => (
                <p key={i} className="text-lg text-foreground/85 leading-relaxed">
                  {para}
                </p>
              ))}
            </div>

            {/* Articles in this topic */}
            <section className="mb-16">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-6">
                Articles on {topic.shortTitle}{" "}
                <span className="text-base text-muted-foreground font-normal">
                  ({posts.length})
                </span>
              </h2>
              {posts.length === 0 ? (
                <p className="text-muted-foreground italic">
                  No articles yet — coming soon.
                </p>
              ) : (
                <div className="space-y-5">
                  {posts.map((p) => (
                    <Link
                      key={p.slug}
                      to={`/blog/${p.slug}`}
                      className="group block bg-white hover:bg-secondary/30 border border-border/50 hover:border-accent/50 rounded-xl p-5 transition-all"
                    >
                      <div className="flex items-baseline gap-3 mb-1">
                        <time
                          dateTime={p.isoDate}
                          className="text-xs text-muted-foreground"
                        >
                          {p.date}
                        </time>
                        <div className="flex flex-wrap gap-1">
                          {p.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] uppercase tracking-wide text-accent/80 font-semibold"
                            >
                              {tag}
                            </span>
                          )).reduce((acc: React.ReactNode[], el, i, arr) => {
                            acc.push(el);
                            if (i < arr.length - 1) acc.push(<span key={`sep-${i}`} className="text-muted-foreground/50">·</span>);
                            return acc;
                          }, [])}
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-foreground leading-tight group-hover:text-accent transition-colors mb-2">
                        {p.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed mb-3">
                        {p.excerpt}
                      </p>
                      <span className="inline-flex items-center gap-2 text-accent group-hover:text-accent/80 font-semibold text-sm">
                        Read full article
                        <ArrowRight size={14} aria-hidden="true" />
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </section>

            {/* Other topics — internal-linking surface */}
            <section className="border-t border-border pt-10">
              <h2 className="text-xl font-bold text-foreground mb-5">
                Explore other topics
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {otherTopics.map((t) => (
                  <Link
                    key={t.slug}
                    to={`/topics/${t.slug}`}
                    className="group flex items-center justify-between gap-4 p-4 bg-secondary/40 hover:bg-accent/10 border border-border/50 hover:border-accent/40 rounded-lg transition-colors"
                  >
                    <span className="font-semibold text-foreground group-hover:text-accent">
                      {t.shortTitle}
                    </span>
                    <ArrowRight
                      size={16}
                      className="text-muted-foreground group-hover:text-accent flex-shrink-0"
                      aria-hidden="true"
                    />
                  </Link>
                ))}
              </div>
            </section>

            {/* Footer CTA */}
            <div className="mt-12 bg-foreground text-white rounded-2xl p-8 text-center space-y-4">
              <h2 className="text-xl font-bold">
                Working on a problem in this area?
              </h2>
              <p className="opacity-90">
                I work with startups and digital brands on growth, performance marketing,
                lifecycle CRM and AI-native marketing. Always open to a conversation.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Link
                  to="/services"
                  className="bg-accent hover:bg-accent/90 text-white px-5 py-3 font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                >
                  See services
                </Link>
                <a
                  href="mailto:vvvj.14@gmail.com"
                  className="border-2 border-white/30 hover:bg-white/10 text-white px-5 py-3 font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                >
                  Email Vaibhav
                  <ExternalLink size={16} aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </main>
    </div>
  );
}

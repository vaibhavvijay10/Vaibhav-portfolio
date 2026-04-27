import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ExternalLink, Calendar } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { getPostBySlug } from "@/data/blog-posts";

interface Props {
  slug: string;
}

const SITE_URL = "https://vaibhavvijay.com";

function setMetaTag(selector: string, attr: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    const [tag, key] = selector.replace("meta[", "").replace("]", "").split("=");
    const cleanKey = key?.replace(/['"]/g, "");
    if (tag === "name" || tag === "property") el.setAttribute(tag, cleanKey ?? "");
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

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

export default function BlogPostPage({ slug }: Props) {
  const [, navigate] = useLocation();
  const post = getPostBySlug(slug);

  // Per-post head updates (title, meta, canonical, OG tags, BlogPosting JSON-LD)
  useEffect(() => {
    if (!post) return;

    const url = `${SITE_URL}/blog/${post.slug}`;
    const title = `${post.title} | Vaibhav Vijay`;
    const image = post.infographicUrl
      ? `${SITE_URL}${post.infographicUrl}`
      : `${SITE_URL}/og-image.jpg`;

    document.title = title;

    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", post.excerpt);

    setLinkTag("canonical", url);

    // Open Graph
    document.querySelector('meta[property="og:type"]')?.setAttribute("content", "article");
    document.querySelector('meta[property="og:url"]')?.setAttribute("content", url);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", post.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", post.excerpt);
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", image);
    document
      .querySelector('meta[property="og:image:secure_url"]')
      ?.setAttribute("content", image);
    document
      .querySelector('meta[property="og:image:alt"]')
      ?.setAttribute("content", post.title);

    // Twitter
    document.querySelector('meta[name="twitter:url"]')?.setAttribute("content", url);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", post.title);
    document
      .querySelector('meta[name="twitter:description"]')
      ?.setAttribute("content", post.excerpt);
    document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", image);

    // BlogPosting JSON-LD
    injectJsonLd("blog-post-jsonld", {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "@id": `${url}#blogposting`,
      headline: post.title,
      description: post.excerpt,
      image: [image],
      datePublished: post.isoDate,
      dateModified: post.isoDate,
      url,
      mainEntityOfPage: { "@type": "WebPage", "@id": url },
      keywords: post.tags.join(", "),
      author: {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Vaibhav Vijay",
        url: SITE_URL,
      },
      publisher: {
        "@type": "Person",
        "@id": `${SITE_URL}/#person`,
        name: "Vaibhav Vijay",
      },
      articleSection: post.tags[0],
      inLanguage: "en",
    });

    setMetaTag('meta[name="article:author"]', "content", "Vaibhav Vijay");

    // Cleanup: restore site-wide tags when navigating away
    return () => {
      const homeUrl = `${SITE_URL}/`;
      const homeTitle =
        "Vaibhav Vijay | Head of Growth & Performance Marketing Leader (7+ Yrs)";
      const homeDesc =
        "Vaibhav Vijay is a Head of Growth and Performance Marketing leader with 7+ years scaling startups and digital brands. Expertise in growth strategy, performance marketing (Meta, Google, Apple Search Ads), lifecycle marketing, CRM, retention, CRO and go-to-market strategy.";
      const homeImage = `${SITE_URL}/og-image.jpg`;

      document.title = homeTitle;
      document
        .querySelector('meta[name="description"]')
        ?.setAttribute("content", homeDesc);
      setLinkTag("canonical", homeUrl);
      document.querySelector('meta[property="og:type"]')?.setAttribute("content", "profile");
      document.querySelector('meta[property="og:url"]')?.setAttribute("content", homeUrl);
      document
        .querySelector('meta[property="og:title"]')
        ?.setAttribute(
          "content",
          "Vaibhav Vijay — Head of Growth & Performance Marketing Leader"
        );
      document
        .querySelector('meta[property="og:description"]')
        ?.setAttribute(
          "content",
          "7+ years scaling startups and digital brands through performance marketing, lifecycle CRM, CRO and data-driven growth strategy. ₹20Cr+ revenue scaled across 4 companies."
        );
      document
        .querySelector('meta[property="og:image"]')
        ?.setAttribute("content", homeImage);
      document.querySelector('meta[name="twitter:image"]')?.setAttribute("content", homeImage);

      const stale = document.getElementById("blog-post-jsonld");
      if (stale) stale.remove();
    };
  }, [post]);

  // 404 view
  if (!post) {
    return (
      <div className="flex">
        <Navigation onNavigate={(s) => navigate(`/#${s}`)} activeSection="blog" />
        <main className="flex-1 md:ml-20">
          <section className="min-h-screen flex items-center justify-center px-6 bg-white">
            <div className="text-center max-w-lg">
              <div className="text-6xl font-bold text-foreground mb-4">404</div>
              <h1 className="text-2xl font-bold text-foreground mb-4">
                Article not found
              </h1>
              <p className="text-muted-foreground mb-8">
                That article doesn't exist (or has moved). Head back to all articles.
              </p>
              <Link
                to="/#blog"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <ArrowLeft size={18} />
                Back to all articles
              </Link>
            </div>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Navigation onNavigate={(s) => navigate(`/#${s}`)} activeSection="blog" />

      <main className="flex-1 md:ml-20">
        <article className="relative bg-white overflow-hidden">
          {/* === SVG BACKGROUND GRAPHIC (matches About / Hero) === */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="xMidYMid slice"
              aria-hidden="true"
            >
              <defs>
                <radialGradient id="postGrad1" cx="80%" cy="10%" r="50%">
                  <stop offset="0%" stopColor="#0891b2" stopOpacity="0.10" />
                  <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
                </radialGradient>
                <radialGradient id="postGrad2" cx="10%" cy="90%" r="55%">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.08" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0" />
                </radialGradient>
                <pattern
                  id="postDots"
                  x="0"
                  y="0"
                  width="30"
                  height="30"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.10" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#postGrad1)" />
              <rect width="100%" height="100%" fill="url(#postGrad2)" />
              <circle
                cx="92%"
                cy="12%"
                r="180"
                fill="none"
                stroke="#0891b2"
                strokeWidth="1"
                strokeOpacity="0.10"
              />
              <circle
                cx="92%"
                cy="12%"
                r="120"
                fill="none"
                stroke="#0891b2"
                strokeWidth="1"
                strokeOpacity="0.08"
              />
              <rect x="60%" y="0" width="40%" height="40%" fill="url(#postDots)" />
              <rect x="0" y="65%" width="25%" height="35%" fill="url(#postDots)" />
            </svg>
          </div>

          {/* === ARTICLE === */}
          <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
            {/* Back link */}
            <Link
              to="/#blog"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              All articles
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span key={tag} className="skill-badge text-xs">
                  {tag}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight mb-4">
              {post.title}
            </h1>

            {/* Date + author byline */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-10">
              <div className="flex items-center gap-2">
                <Calendar size={14} aria-hidden="true" />
                <time dateTime={post.isoDate}>{post.date}</time>
              </div>
              <span aria-hidden="true">•</span>
              <span>By Vaibhav Vijay</span>
            </div>

            {/* Hero image */}
            {post.infographicUrl && (
              <div className="rounded-xl overflow-hidden mb-10 border border-border/50 shadow-sm">
                <img
                  src={post.infographicUrl}
                  alt={post.title}
                  className="w-full h-auto"
                  loading="eager"
                  decoding="async"
                />
              </div>
            )}

            {/* Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-lg text-foreground/90 whitespace-pre-wrap leading-relaxed">
                {post.content}
              </div>
            </div>

            {/* CTA cluster */}
            <div className="mt-12 pt-8 border-t border-border space-y-6">
              <a
                href={post.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold transition-colors"
              >
                Read &amp; engage on LinkedIn
                <ExternalLink size={16} aria-hidden="true" />
              </a>

              <div className="bg-foreground text-white rounded-2xl p-8 text-center space-y-4 relative overflow-hidden">
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                  <svg
                    className="absolute inset-0 w-full h-full"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <pattern
                      id="postCtaDots"
                      x="0"
                      y="0"
                      width="24"
                      height="24"
                      patternUnits="userSpaceOnUse"
                    >
                      <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.05" />
                    </pattern>
                    <rect width="100%" height="100%" fill="url(#postCtaDots)" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold relative z-10">
                  Working on a similar problem?
                </h3>
                <p className="opacity-90 relative z-10">
                  I work with startups and digital brands on growth, performance marketing,
                  lifecycle CRM and CRO. Always open to a conversation.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
                  <Link
                    to="/#contact"
                    className="bg-accent hover:bg-accent/90 text-white px-6 py-3 font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    Get in touch
                  </Link>
                  <Link
                    to="/#blog"
                    className="border-2 border-white/30 hover:bg-white/10 text-white px-6 py-3 font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    More articles
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </article>

        <Footer />
      </main>
    </div>
  );
}

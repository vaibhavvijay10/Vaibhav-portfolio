import { Link } from "wouter";
import { ArrowRight, ExternalLink } from "lucide-react";
import { blogPosts } from "@/data/blog-posts";

export default function Blog() {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* === SVG BACKGROUND GRAPHIC === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="blogGrad" cx="50%" cy="50%" r="60%">
              <stop offset="0%" stopColor="#0891b2" stopOpacity="0.06" />
              <stop offset="100%" stopColor="#0891b2" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#blogGrad)" />
          <path
            d="M 0 50% Q 300 30% 600 50% T 1200 50%"
            fill="none"
            stroke="#0891b2"
            strokeWidth="1.5"
            strokeOpacity="0.08"
          />
          <path
            d="M 0 55% Q 300 35% 600 55% T 1200 55%"
            fill="none"
            stroke="#0891b2"
            strokeWidth="1"
            strokeOpacity="0.05"
          />
          <circle
            cx="15%"
            cy="20%"
            r="120"
            fill="none"
            stroke="#0891b2"
            strokeWidth="1"
            strokeOpacity="0.07"
          />
          <circle
            cx="85%"
            cy="80%"
            r="150"
            fill="none"
            stroke="#0891b2"
            strokeWidth="1"
            strokeOpacity="0.07"
          />
          <pattern
            id="blogDots"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="2" cy="2" r="1.2" fill="#0891b2" fillOpacity="0.08" />
          </pattern>
          <rect x="0" y="70%" width="100%" height="30%" fill="url(#blogDots)" />
        </svg>
      </div>

      <div className="relative z-10 container max-w-5xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <div className="accent-line mb-4" />
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Growth Insights &amp; Articles
          </h2>
          <p className="text-lg text-muted-foreground">
            Latest thoughts on growth, marketing, and scaling startups
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-1 gap-6">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="bg-white rounded-xl border border-border/50 overflow-hidden hover:shadow-lg transition-all duration-300 group"
            >
              {/* Infographic */}
              {post.infographicUrl && (
                <Link to={`/blog/${post.slug}`} aria-label={`Read: ${post.title}`}>
                  <div className="relative w-full h-48 md:h-64 overflow-hidden bg-secondary cursor-pointer">
                    <img
                      src={post.infographicUrl}
                      alt={post.title}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>
              )}

              {/* Content */}
              <div className="p-6 space-y-4">
                <div>
                  <Link to={`/blog/${post.slug}`}>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground leading-tight group-hover:text-accent transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mt-2">
                    <time dateTime={post.isoDate}>{post.date}</time>
                  </p>
                </div>

                {/* Excerpt */}
                <p className="text-muted-foreground leading-relaxed text-base">
                  {post.excerpt}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span key={tag} className="skill-badge text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read full article + LinkedIn */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-base transition-colors"
                  >
                    Read full article
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                  <a
                    href={post.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent font-medium text-sm transition-colors"
                  >
                    On LinkedIn
                    <ExternalLink size={14} aria-hidden="true" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-foreground text-white rounded-2xl p-8 text-center space-y-4 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <svg
              className="absolute inset-0 w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <pattern
                id="blogCtaDots"
                x="0"
                y="0"
                width="24"
                height="24"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="2" cy="2" r="1" fill="white" fillOpacity="0.04" />
              </pattern>
              <rect width="100%" height="100%" fill="url(#blogCtaDots)" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold relative z-10">More Insights Coming Soon</h3>
          <p className="text-lg opacity-90 relative z-10">
            Follow me on LinkedIn for the latest growth strategies and marketing insights
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center relative z-10">
            <a
              href="https://linkedin.com/in/vaibhavvijay10"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent hover:bg-accent/90 text-white px-8 py-3 font-semibold rounded-lg inline-flex items-center justify-center gap-2 transition-colors"
            >
              Follow on LinkedIn
              <ExternalLink size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

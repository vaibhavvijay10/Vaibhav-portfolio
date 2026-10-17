import { ChevronDown } from "lucide-react";
import { homeFaqs } from "@/data/home-faq";

/**
 * Visible homepage FAQ. The same questions are emitted as FAQPage JSON-LD on
 * the homepage only (see scripts/prerender-blog.mjs), so the structured data
 * always matches what visitors can read.
 */
export default function HomeFAQ() {
  return (
    <section className="relative py-20 bg-white" aria-labelledby="home-faq-heading">
      <div className="container max-w-4xl mx-auto px-4">
        <div className="mb-10">
          <div className="accent-line mb-4" />
          <h2 id="home-faq-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground">
            Short answers about my work, plus the growth questions founders ask me most.{" "}
            <a href="/answers" className="text-accent font-semibold hover:underline">
              See the longer answers with data
            </a>
            .
          </p>
        </div>

        <div className="divide-y divide-border border-y border-border">
          {homeFaqs.map((f, i) => (
            <details key={f.q} className="group" open={i === 0}>
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-semibold text-foreground [&::-webkit-details-marker]:hidden">
                <h3 className="text-base sm:text-lg">{f.q}</h3>
                <ChevronDown
                  size={20}
                  aria-hidden="true"
                  className="flex-shrink-0 text-accent transition-transform duration-200 group-open:rotate-180"
                />
              </summary>
              <p className="pb-5 pr-8 text-muted-foreground leading-relaxed">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

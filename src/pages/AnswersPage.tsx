import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { answers } from "@/data/answers";

const SITE_URL = "https://vaibhavvijay.com";
// Keep in sync with prerenderAnswerPages() in scripts/prerender-blog.mjs
const PAGE_TITLE = "Short Answers Backed by Real Numbers | Vaibhav Vijay";
const PAGE_DESC =
  "Short, data-backed answers on automation costs, Apple Search Ads, LTV, conversion and go-to-market, each built on numbers from products Vaibhav Vijay has run.";

export default function AnswersPage() {
  const [, navigate] = useLocation();

  useEffect(() => {
    document.title = PAGE_TITLE;
    document.head.querySelector('meta[name="description"]')?.setAttribute("content", PAGE_DESC);
    document.head.querySelector('link[rel="canonical"]')?.setAttribute("href", `${SITE_URL}/answers`);
  }, []);

  return (
    <div className="flex">
      <Navigation onNavigate={(s) => navigate(`/#${s}`)} activeSection="blog" />
      <main className="flex-1 md:ml-20">
        <section className="bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <div className="accent-line mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">Answers</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mb-12">
              One question per page, answered in two sentences, then the numbers behind it. Every figure
              comes from a product or system I have run.
            </p>

            <ul className="grid gap-4">
              {answers.map((a) => (
                <li key={a.slug}>
                  <Link
                    to={`/answers/${a.slug}`}
                    className="group block rounded-xl border border-border p-5 sm:p-6 hover:border-accent hover:shadow-sm transition-all"
                  >
                    <h2 className="text-xl sm:text-2xl font-bold text-foreground group-hover:text-accent transition-colors">
                      {a.question}
                    </h2>
                    <p className="mt-2 text-muted-foreground leading-relaxed">{a.shortAnswer}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-accent">
                      Read the numbers <ArrowRight size={14} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
        <Footer />
      </main>
    </div>
  );
}

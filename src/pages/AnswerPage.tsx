import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ArrowLeft, ArrowRight, Mail } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { answers, getAnswerBySlug } from "@/data/answers";

const SITE_URL = "https://vaibhavvijay.com";

function setMeta(selector: string, value: string) {
  document.head.querySelector(selector)?.setAttribute("content", value);
}

interface Props {
  slug: string;
}

export default function AnswerPage({ slug }: Props) {
  const [, navigate] = useLocation();
  const answer = getAnswerBySlug(slug);
  const others = answers.filter((a) => a.slug !== slug).slice(0, 3);

  useEffect(() => {
    if (!answer) return;
    const url = `${SITE_URL}/answers/${answer.slug}`;
    document.title = `${answer.question} | Vaibhav Vijay`;
    setMeta('meta[name="description"]', answer.description);
    setMeta('meta[property="og:title"]', answer.question);
    setMeta('meta[property="og:description"]', answer.description);
    setMeta('meta[property="og:url"]', url);
    document.head.querySelector('link[rel="canonical"]')?.setAttribute("href", url);
  }, [answer]);

  if (!answer) {
    return (
      <div className="flex">
        <Navigation onNavigate={(s) => navigate(`/#${s}`)} activeSection="blog" />
        <main className="flex-1 md:ml-20">
          <section className="max-w-3xl mx-auto px-4 py-24 text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Answer not found</h1>
            <Link to="/answers" className="text-accent font-semibold">
              See all answers
            </Link>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="flex">
      <Navigation onNavigate={(s) => navigate(`/#${s}`)} activeSection="blog" />

      <main className="flex-1 md:ml-20">
        <article className="bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
            <Link
              to="/answers"
              className="inline-flex items-center gap-2 text-accent hover:text-accent/80 font-semibold text-sm mb-8 transition-colors"
            >
              <ArrowLeft size={16} />
              All answers
            </Link>

            <header className="mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {answer.tags.map((t) => (
                  <span key={t} className="skill-badge">
                    {t}
                  </span>
                ))}
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground leading-tight">
                {answer.question}
              </h1>
              <p className="mt-4 text-sm text-muted-foreground">
                By <a href="/about" className="text-accent hover:underline">Vaibhav Vijay</a> ·{" "}
                <time dateTime={answer.isoDate}>
                  {new Date(answer.isoDate).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </time>
              </p>
            </header>

            {/* The short answer: first thing on the page, two sentences */}
            <div className="answer-short rounded-xl border-l-4 border-accent bg-accent/5 px-5 py-4 mb-10">
              <p className="text-xs font-semibold uppercase tracking-wide text-accent mb-1">Short answer</p>
              <p className="text-lg sm:text-xl text-foreground leading-relaxed">{answer.shortAnswer}</p>
            </div>

            {answer.sections.map((sec) => (
              <section key={sec.heading} className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">{sec.heading}</h2>
                {sec.paragraphs?.map((p) => (
                  <p key={p} className="text-lg text-foreground/90 leading-relaxed mb-4">
                    {p}
                  </p>
                ))}
                {sec.bullets && (
                  <ul className="list-disc pl-6 space-y-2 text-lg text-foreground/90">
                    {sec.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                )}
                {sec.table && (
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-left text-sm sm:text-base">
                      <caption className="caption-bottom px-4 py-2 text-xs text-muted-foreground text-left">
                        {sec.table.caption}
                      </caption>
                      <thead className="bg-secondary/60">
                        <tr>
                          {sec.table.columns.map((c) => (
                            <th key={c} scope="col" className="px-4 py-3 font-semibold text-foreground">
                              {c}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border">
                        {sec.table.rows.map((row, ri) => (
                          <tr
                            key={ri}
                            className={row[0] === "Total" || row[0] === "Result" ? "font-semibold bg-accent/5" : ""}
                          >
                            {row.map((cell, ci) => (
                              <td key={ci} className="px-4 py-3 text-foreground/90 tabular-nums">
                                {cell}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </section>
            ))}

            {answer.faqs.length > 0 && (
              <section className="mb-10">
                <h2 className="text-2xl font-bold text-foreground mb-4">Related questions</h2>
                <div className="divide-y divide-border border-y border-border">
                  {answer.faqs.map((f) => (
                    <div key={f.q} className="py-4">
                      <h3 className="font-semibold text-foreground mb-1">{f.q}</h3>
                      <p className="text-foreground/80 leading-relaxed">{f.a}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {answer.related.length > 0 && (
              <section className="mb-10">
                <h2 className="text-lg font-bold text-foreground mb-3">Read next</h2>
                <ul className="space-y-2">
                  {answer.related.map((r) => (
                    <li key={r.href}>
                      <a href={r.href} className="inline-flex items-center gap-2 text-accent font-semibold hover:underline">
                        <ArrowRight size={16} aria-hidden="true" />
                        {r.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <div className="rounded-xl bg-secondary/40 border border-border p-6 flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
              <p className="text-foreground">
                Want numbers like these for your product or operations?
              </p>
              <a
                href="/#contact"
                className="inline-flex items-center gap-2 bg-accent hover:bg-accent/90 text-white px-5 py-3 rounded-lg font-semibold transition-colors"
              >
                <Mail size={18} aria-hidden="true" />
                Get in touch
              </a>
            </div>

            {others.length > 0 && (
              <nav aria-label="More answers" className="mt-14">
                <h2 className="text-lg font-bold text-foreground mb-4">More answers</h2>
                <ul className="grid gap-3">
                  {others.map((o) => (
                    <li key={o.slug}>
                      <Link
                        to={`/answers/${o.slug}`}
                        className="block rounded-lg border border-border px-4 py-3 hover:border-accent transition-colors text-foreground font-medium"
                      >
                        {o.question}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>
        </article>
        <Footer />
      </main>
    </div>
  );
}

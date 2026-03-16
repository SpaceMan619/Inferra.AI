"use client";

import Link from "next/link";
import { Inview, TextReveal } from "./Reveal";

const articles = [
  {
    category: "Infrastructure",
    date: "Feb 2026",
    title: "Africa Data Centres expands with new facilities in Ghana and South Africa",
    slug: "#",
    bg: "transparent",
    textDark: true,
    hasImage: true,
  },
  {
    category: "Connectivity",
    date: "Jan 2026",
    title: "2Africa subsea cable system nears completion, promising lower latency across the continent",
    slug: "#",
    bg: "#222f30",
    textDark: false,
    hasImage: false,
  },
  {
    category: "Policy",
    date: "Dec 2025",
    title: "Kenya and Rwanda lead Africa\u2019s push for national AI strategies and data sovereignty frameworks",
    slug: "#",
    bg: "#445e5f",
    textDark: false,
    hasImage: false,
  },
];

export default function Newsroom() {
  return (
    <section
      className="-round-block"
      style={{
        backgroundColor: "#eeeeee",
        borderRadius: "20px 20px 0 0",
      }}
    >
      <div
        className="mx-auto max-w-[1524px] px-[clamp(30px,5vw,50px)]"
        style={{
          paddingTop: "clamp(60px, calc(60px + 6vw), 120px)",
          paddingBottom: "clamp(80px, calc(80px + 6vw), 140px)",
        }}
      >
        {/* Header */}
        <div className="flex items-end justify-between mb-12">
          <TextReveal
            style={{
              fontSize:
                "clamp(3rem, calc(3rem + 2.9vw), 5.625rem)",
              letterSpacing: "-0.02em",
              lineHeight: "1em",
              fontWeight: 400,
              color: "#222f30",
            }}
          >
            Signals
          </TextReveal>

          <Inview className="hidden sm:block">
            <span
              className="text-[14px] font-light"
              style={{ color: "rgba(34, 47, 48, 0.5)" }}
            >
              What we&apos;re watching
            </span>
          </Inview>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--gap,20px)]">
          {articles.map((article, i) => (
            <Inview key={article.title} delay={i * 0.1}>
              <Link
                href={article.slug}
                className="group block overflow-hidden"
                style={{
                  backgroundColor: article.bg,
                  borderRadius: "12px",
                  color: article.textDark ? "#222f30" : "#fff",
                  minHeight: "clamp(280px, 35vw, 400px)",
                }}
              >
                <article className="flex flex-col justify-between h-full p-6 lg:p-8">
                  {/* Image placeholder for first article */}
                  {article.hasImage && (
                    <div
                      className="w-full rounded-lg overflow-hidden mb-6 relative"
                      style={{
                        aspectRatio: "16/10",
                        backgroundColor: "rgba(34, 47, 48, 0.06)",
                      }}
                    >
                      <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105" />
                    </div>
                  )}

                  {!article.hasImage && <div className="flex-1" />}

                  <div>
                    {/* Category + date */}
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className="text-[11px] font-medium px-2.5 py-1 rounded-full uppercase"
                        style={{
                          backgroundColor: article.textDark
                            ? "rgba(34, 47, 48, 0.08)"
                            : "rgba(255, 255, 255, 0.15)",
                          color: article.textDark
                            ? "rgba(34, 47, 48, 0.7)"
                            : "rgba(255, 255, 255, 0.8)",
                        }}
                      >
                        {article.category}
                      </span>
                      <span
                        className="text-[12px] font-light"
                        style={{
                          color: article.textDark
                            ? "rgba(34, 47, 48, 0.4)"
                            : "rgba(255, 255, 255, 0.5)",
                        }}
                      >
                        {article.date}
                      </span>
                    </div>

                    {/* Title */}
                    <h3
                      className="font-normal leading-[1.3] tracking-[-0.02em]"
                      style={{
                        fontSize:
                          "clamp(1.125rem, calc(1.125rem + 0.3vw), 1.375rem)",
                      }}
                    >
                      {article.title}
                    </h3>
                  </div>
                </article>
              </Link>
            </Inview>
          ))}
        </div>
      </div>
    </section>
  );
}

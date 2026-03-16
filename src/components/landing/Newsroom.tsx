"use client";

import { Inview, TextReveal } from "./Reveal";

const articles = [
  {
    category: "Infrastructure",
    date: "Feb 2026",
    title: "Africa Data Centres expands with new facilities in Ghana and South Africa",
    url: "https://www.datacenterdynamics.com/en/news/africa-data-centres-6mw-expansion-goes-live-in-cape-town-south-africa/",
    image: "/news-datacenter.jpg",
  },
  {
    category: "Connectivity",
    date: "Jan 2026",
    title: "2Africa subsea cable system nears completion, promising lower latency across the continent",
    url: "https://techafricanews.com/2026/02/12/2africa-is-here-how-africa-can-capture-the-full-potential-of-the-subsea-cable/",
    image: "/news-subsea.jpg",
  },
  {
    category: "Policy",
    date: "Nov 2025",
    title: "Ghana, Rwanda and Kenya pioneer national AI strategies for inclusive growth",
    url: "https://furtherafrica.com/2025/11/07/ghana-rwanda-and-kenya-pioneer-national-ai-strategies-for-inclusive-growth/",
    image: "/news-policy.jpg",
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
              lineHeight: "1.15",
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
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden"
                style={{
                  borderRadius: "12px",
                  backgroundColor: "#fff",
                  border: "1px solid rgba(34, 47, 48, 0.08)",
                  color: "#222f30",
                }}
              >
                {/* Image */}
                <div
                  className="w-full overflow-hidden relative"
                  style={{ aspectRatio: "16/10" }}
                >
                  <img
                    src={article.image}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <article className="p-6 lg:p-7">
                  {/* Category + date */}
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className="text-[11px] font-medium px-2.5 py-1 rounded-full uppercase"
                      style={{
                        backgroundColor: "rgba(34, 47, 48, 0.06)",
                        color: "rgba(34, 47, 48, 0.7)",
                      }}
                    >
                      {article.category}
                    </span>
                    <span
                      className="text-[12px] font-light"
                      style={{ color: "rgba(34, 47, 48, 0.4)" }}
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

                  {/* Read arrow */}
                  <div
                    className="mt-4 flex items-center gap-2 text-[13px] font-light transition-colors duration-200 group-hover:opacity-100"
                    style={{ color: "rgba(34, 47, 48, 0.5)" }}
                  >
                    <span>Read article</span>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-transform duration-300 group-hover:translate-x-1"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7V17" />
                    </svg>
                  </div>
                </article>
              </a>
            </Inview>
          ))}
        </div>
      </div>
    </section>
  );
}

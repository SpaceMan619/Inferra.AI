import Link from "next/link";

const articles = [
  {
    category: "News",
    date: "Mar 4, 2026",
    title: "Equinix announces 40MW expansion in Johannesburg campus",
    slug: "#",
  },
  {
    category: "Report",
    date: "Feb 18, 2026",
    title: "Q4 2025 Africa AI Readiness Index: West Africa leads growth",
    slug: "#",
  },
  {
    category: "Analysis",
    date: "Feb 3, 2026",
    title: "How new subsea cables are reshaping East African latency maps",
    slug: "#",
  },
];

const categoryColors: Record<string, string> = {
  News: "bg-[#10b981]/10 text-[#10b981]",
  Report: "bg-[#1a2b2c]/8 text-[#1a2b2c]/70",
  Analysis: "bg-amber-50 text-amber-700",
};

export default function Newsroom() {
  return (
    <section className="bg-[#fafaf8] px-6 md:px-10 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1524px]">
        {/* Header */}
        <div className="flex items-end justify-between mb-14">
          <h2
            className="text-[#1a2b2c] font-normal tracking-[-0.03em]"
            style={{
              fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.25rem)",
            }}
          >
            Newsroom
          </h2>
          <Link
            href="/newsroom"
            className="hidden sm:inline-flex text-[14px] font-medium text-[#1a2b2c] hover:text-[#10b981] transition-colors tracking-[-0.1px]"
          >
            View all articles&nbsp;&rarr;
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {articles.map((article) => (
            <article key={article.title} className="group">
              {/* Thumbnail placeholder */}
              <div className="aspect-[16/10] w-full rounded-xl bg-gradient-to-br from-[#1a2b2c]/[0.04] to-[#10b981]/[0.06] mb-5 overflow-hidden transition-transform duration-300 group-hover:scale-[1.01]" />

              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`text-[11px] font-medium px-2.5 py-1 rounded-full ${
                    categoryColors[article.category] ?? ""
                  }`}
                >
                  {article.category}
                </span>
                <span className="text-[12px] text-[#1a2b2c]/35 font-light">
                  {article.date}
                </span>
              </div>

              <h3 className="text-[#1a2b2c] text-[16px] font-normal leading-[1.45] tracking-[-0.02em] mb-3">
                {article.title}
              </h3>

              <Link
                href={article.slug}
                className="text-[13px] font-medium text-[#1a2b2c]/60 hover:text-[#10b981] transition-colors"
              >
                Read article&nbsp;&rarr;
              </Link>
            </article>
          ))}
        </div>

        {/* Mobile "View all" */}
        <div className="mt-10 sm:hidden">
          <Link
            href="/newsroom"
            className="text-[14px] font-medium text-[#1a2b2c] hover:text-[#10b981] transition-colors"
          >
            View all articles&nbsp;&rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

export default function About() {
  return (
    <section className="bg-[#fafaf8] px-6 md:px-10 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1524px]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image placeholder */}
          <div className="aspect-video w-full rounded-2xl bg-gradient-to-br from-[#10b981]/20 via-[#1a2b2c]/10 to-[#10b981]/5 overflow-hidden relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNiw0Myw0NCwwLjA1KSIvPjwvc3ZnPg==')] opacity-60" />
          </div>

          {/* Text */}
          <div>
            <h2
              className="text-[#1a2b2c] font-normal tracking-[-0.03em] leading-[1.15] mb-6"
              style={{
                fontSize: "clamp(1.5rem, 1.25rem + 1vw, 2.25rem)",
              }}
            >
              Bold analysis for a continent on the rise
            </h2>

            <p className="text-[#1a2b2c]/55 text-[15px] font-light leading-[1.7] tracking-[-0.1px] mb-8 max-w-[540px]">
              Inferra AI was founded on the conviction that Africa&apos;s AI
              future shouldn&apos;t be left to guesswork. We built the first
              platform that synthesizes infrastructure data, policy landscapes,
              and market intelligence into a single decision-support layer --
              giving investors, operators, and policymakers the clarity they need
              to act with confidence.
            </p>

            <Link
              href="/company"
              className="inline-flex items-center text-[14px] font-medium text-[#1a2b2c] hover:text-[#10b981] transition-colors tracking-[-0.1px]"
            >
              Learn more about us&nbsp;&rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[#fafaf8] px-6 md:px-10 pt-[72px]">
      <div className="mx-auto max-w-[1524px] w-full py-24 md:py-32 lg:py-40">
        <div className="max-w-[920px]">
          <h1
            className="text-[#1a2b2c] font-normal tracking-[-0.04em] leading-[1.08] animate-[fade-in-up_0.8s_ease-out_both]"
            style={{
              fontSize: "clamp(2.15rem, 2.15rem + 1.13vw, 3rem)",
            }}
          >
            Mapping the future of AI infrastructure in Africa.
          </h1>

          <p
            className="mt-8 max-w-[645px] text-[#1a2b2c]/60 font-light leading-[1.7] tracking-[-0.1px] animate-[fade-in-up_0.8s_ease-out_0.15s_both]"
            style={{
              fontSize: "clamp(1rem, 0.95rem + 0.25vw, 1.125rem)",
            }}
          >
            We track data centers, connectivity, and policy signals — so you
            know exactly where AI inference can realistically be deployed.
          </p>

          <div className="mt-12 animate-[fade-in-up_0.8s_ease-out_0.3s_both]">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-full bg-[#1a2b2c] px-8 py-3 text-[14px] font-medium text-white hover:opacity-85 transition-opacity"
            >
              Explore the Map&nbsp;&rarr;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

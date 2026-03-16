export default function WhatWeDo() {
  return (
    <section className="bg-[#fafaf8] px-6 md:px-10 py-24 md:py-32 lg:py-40">
      <div className="mx-auto max-w-[1524px]">
        <p className="text-[12px] font-medium uppercase tracking-[0.15em] text-[#10b981] mb-10">
          What we do
        </p>

        <p
          className="max-w-[920px] text-[#1a2b2c] font-light leading-[1.65] tracking-[-0.1px]"
          style={{
            fontSize: "clamp(1.125rem, 1rem + 0.5vw, 1.375rem)",
          }}
        >
          AI deployment in Africa is an intrinsically complex systems challenge.
          Our Integrated Platform is purpose-built to unravel its intricate
          networks. By combining real-time infrastructure data, policy tracking,
          and AI-powered analysis, we map deployment readiness with unprecedented
          clarity, enabling a systematic exploration of opportunities that was
          previously inaccessible.
        </p>
      </div>
    </section>
  );
}

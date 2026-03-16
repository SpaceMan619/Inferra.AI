"use client";

const marqueeText = "Mapping Africa\u2019s AI future\u00A0\u2013\u00A0";

export default function Marquee() {
  return (
    <section
      className="overflow-hidden py-12 lg:py-16"
      style={{ backgroundColor: "#f7f7f5" }}
    >
      <div className="marquee relative flex whitespace-nowrap">
        <div className="marquee_scroll flex animate-marquee">
          {/* Duplicate the content enough times to fill the screen + overflow */}
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="flex-shrink-0 pr-4"
              style={{
                fontSize: "clamp(2rem, calc(2rem + 3vw), 5rem)",
                letterSpacing: "-0.02em",
                lineHeight: "1em",
                fontWeight: 300,
                color: "#222f30",
              }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
        <div className="marquee_scroll flex animate-marquee" aria-hidden="true">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="flex-shrink-0 pr-4"
              style={{
                fontSize: "clamp(2rem, calc(2rem + 3vw), 5rem)",
                letterSpacing: "-0.02em",
                lineHeight: "1em",
                fontWeight: 300,
                color: "#222f30",
              }}
            >
              {marqueeText}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

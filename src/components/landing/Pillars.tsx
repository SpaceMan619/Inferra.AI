"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const pillars = [
  {
    number: "01.",
    title: "Infrastructure",
    description:
      "We track compute availability, cloud maturity, and operational friction across 30 African markets.",
    bg: "#cef79e",
    textDark: true,
    icon: (
      <svg width="114" height="114" viewBox="0 0 114 114" fill="none" stroke="#272727" strokeMiterlimit="10">
        <circle cx="57" cy="57" r="40" strokeWidth="1" />
        <circle cx="57" cy="57" r="25" strokeWidth="1" />
        <line x1="57" y1="10" x2="57" y2="104" strokeWidth="1" />
        <line x1="10" y1="57" x2="104" y2="57" strokeWidth="1" />
        <line x1="23" y1="23" x2="91" y2="91" strokeWidth="1" />
        <line x1="91" y1="23" x2="23" y2="91" strokeWidth="1" />
      </svg>
    ),
  },
  {
    number: "02.",
    title: "Intelligence",
    description:
      "We synthesise infrastructure, connectivity, and policy signals into composite readiness scores across 30 markets.",
    bg: "#222f30",
    textDark: false,
    icon: (
      <svg width="115" height="115" viewBox="0 0 115 115" fill="none" stroke="#fff" strokeMiterlimit="10">
        <path d="M57.5 10 L95 35 L95 80 L57.5 105 L20 80 L20 35 Z" strokeWidth="1" />
        <path d="M57.5 25 L82 40 L82 72 L57.5 87 L33 72 L33 40 Z" strokeWidth="1" />
        <path d="M57.5 40 L69 48 L69 64 L57.5 72 L46 64 L46 48 Z" strokeWidth="1" />
      </svg>
    ),
  },
  {
    number: "03.",
    title: "Policy",
    description:
      "We monitor regulatory frameworks, AI policy adoption, and investment signals across 30 African markets.",
    bg: "#e7e8e1",
    textDark: true,
    icon: (
      <svg width="115" height="114" viewBox="0 0 115 114" fill="none" stroke="#272727" strokeMiterlimit="10">
        <path d="M57.5 10 L95 30 L95 85 L57.5 105 L20 85 L20 30 Z" strokeWidth="1" />
        <line x1="57.5" y1="10" x2="57.5" y2="105" strokeWidth="1" />
        <line x1="20" y1="57" x2="95" y2="57" strokeWidth="1" />
        <path d="M38 20 L77 20 L95 57 L77 94 L38 94 L20 57 Z" strokeWidth="1" />
      </svg>
    ),
  },
];

export default function Pillars() {
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".cards_item");

    items.forEach((item) => {
      gsap.set(item, { opacity: 0, y: 20 });
    });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(items, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: { each: 0.1 },
          ease: "power2.out",
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, []);

  return (
    <section style={{ backgroundColor: "#f7f7f5" }}>
      <div ref={cardsRef} className="grid grid-cols-1 lg:grid-cols-3 gap-0">
        {pillars.map((pillar) => (
          <div
            key={pillar.number}
            className="cards_item flex flex-col justify-end p-6 lg:p-10"
            style={{
              backgroundColor: pillar.bg,
              minHeight: "clamp(280px, 40vw, 420px)",
              gap: "40px",
              color: pillar.textDark ? "#222f30" : "#fff",
            }}
          >
            {/* Icon */}
            <div className="flex-1 flex items-start">
              <div className="w-[68px] h-[68px] lg:w-[114px] lg:h-[114px]">
                {pillar.icon}
              </div>
            </div>

            {/* Index */}
            <div
              className="uppercase tracking-[-0.02em]"
              style={{
                fontSize: "clamp(0.75rem, calc(0.75rem + 0.15vw), 0.875rem)",
                fontFamily: "var(--font-body), system-ui, monospace",
              }}
            >
              {pillar.number}
            </div>

            {/* Content */}
            <div>
              <h3
                className="mb-3"
                style={{
                  fontSize: "clamp(1.625rem, calc(1.625rem + 0.15vw), 1.75rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.1em",
                  fontWeight: 400,
                }}
              >
                {pillar.title}
              </h3>
              <p
                style={{
                  fontSize: "clamp(1rem, calc(1rem + 0.2vw), 1.1875rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.3em",
                  opacity: 0.7,
                }}
              >
                {pillar.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { Inview, TextReveal } from "./Reveal";

export default function WhatWeDo() {
  return (
    <section style={{ backgroundColor: "#f7f7f5" }}>
      <div
        className="mx-auto max-w-[1524px] px-[clamp(30px,5vw,50px)] grid gap-y-11 gap-x-11 grid-cols-1 lg:grid-cols-[1fr_2fr]"
        style={{
          paddingTop: "clamp(60px, calc(25px + 8.333vw), 160px)",
          paddingBottom: "clamp(60px, calc(33.75px + 6.25vw), 135px)",
        }}
      >
        {/* Sidebar label */}
        <aside>
          <Inview>
            <div
              className="uppercase font-light tracking-wide"
              style={{
                fontSize: "clamp(0.75rem, calc(0.75rem + 0.15vw), 0.875rem)",
                color: "rgba(34, 47, 48, 0.5)",
              }}
            >
              The integrated platform
            </div>
          </Inview>
          <div
            className="mt-6 h-[1px] w-full lg:block hidden"
            style={{ backgroundColor: "rgba(34, 47, 48, 0.1)" }}
          />
        </aside>

        {/* Content */}
        <div
          className="flex flex-col items-start"
          style={{ gap: "clamp(20px, calc(20px + 4vw), 60px)" }}
        >
          <TextReveal
            className="max-w-[920px]"
            style={{
              fontSize: "clamp(1.625rem, calc(1.625rem + 3.5vw), 4.75rem)",
              letterSpacing: "-0.02em",
              lineHeight: "1.1em",
              fontWeight: 400,
              color: "#222f30",
            }}
          >
            Bringing together infrastructure signals, policy context, and open data into a{" "}
            <span style={{ color: "#c9cbbe" }}>directional lens for AI readiness.</span>
          </TextReveal>

          <Inview>
            <p
              className="max-w-[790px]"
              style={{
                fontSize: "clamp(1rem, calc(1rem + 0.2vw), 1.1875rem)",
                letterSpacing: "-0.02em",
                lineHeight: "1.3em",
                color: "rgba(34, 47, 48, 0.8)",
              }}
            >
              AI deployment in Africa is shaped by a web of factors that
              are hard to see in isolation. We surface these signals — compute
              availability, cloud maturity, ops friction, latency, and regulatory
              context — across 30 markets, so founders and operators can think
              more clearly about where to build next.
            </p>
          </Inview>

          <Inview>
            <Link
              href="/dashboard"
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 font-light transition-all duration-300 whitespace-nowrap"
              style={{
                fontSize: "clamp(1rem, calc(1rem + 0.15vw), 1.125rem)",
                backgroundColor: "#222f30",
                color: "#fff",
              }}
            >
              <span>Explore the platform</span>
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-110">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m7 17 9.2-9.2M17 17V7H7" />
                </svg>
              </span>
            </Link>
          </Inview>
        </div>
      </div>
    </section>
  );
}

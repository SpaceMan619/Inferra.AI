"use client";

import Link from "next/link";
import { Inview, TextReveal } from "./Reveal";

export default function About() {
  return (
    <section style={{ backgroundColor: "#f7f7f5" }}>
      {/* Company label hgroup */}
      <div
        className="mx-auto max-w-[1524px] px-[clamp(30px,5vw,50px)] grid gap-y-6 gap-x-11 grid-cols-1 lg:grid-cols-[1fr_1fr]"
        style={{
          paddingTop: "0",
          paddingBottom: "clamp(35px, calc(28px + 1.667vw), 55px)",
        }}
      >
        <aside>
          <Inview>
            <div
              className="uppercase font-light tracking-wide"
              style={{
                fontSize: "clamp(0.75rem, calc(0.75rem + 0.15vw), 0.875rem)",
                color: "rgba(34, 47, 48, 0.5)",
              }}
            >
              Our Company
            </div>
          </Inview>
        </aside>
      </div>

      {/* Media + multicol content */}
      <div
        className="mx-auto max-w-[1524px] px-[clamp(30px,5vw,50px)] grid gap-y-11 gap-x-[var(--gap,44px)] grid-cols-1 lg:grid-cols-2 items-start"
        style={{
          paddingTop: "clamp(35px, calc(28px + 1.667vw), 55px)",
          paddingBottom: "clamp(70px, calc(46.9px + 5.5vw), 136px)",
        }}
      >
        {/* Image */}
        <aside>
          <Inview>
            <figure
              className="relative overflow-hidden w-full m-0"
              style={{
                aspectRatio: "623 / 500",
                borderRadius: "12px",
                maxWidth: "623px",
              }}
            >
              <img
                src="/about-africa.jpg"
                alt="Aerial view of the Kigali Convention Centre, Rwanda"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Location / source tag */}
              <div
                className="absolute bottom-0 left-0 right-0 px-6 pt-20 pb-10"
                style={{
                  background: "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)",
                }}
              >
                <p
                  className="font-light text-white"
                  style={{ fontSize: "0.9375rem", opacity: 0.92 }}
                >
                  Kigali Convention Centre
                </p>
                <p
                  className="font-light text-white"
                  style={{ fontSize: "0.8125rem", opacity: 0.58 }}
                >
                  Kigali, Rwanda — Photo: Emmanuel Kwizera, CC BY-SA 4.0
                </p>
              </div>
            </figure>
          </Inview>
        </aside>

        {/* Content */}
        <div
          className="flex flex-col items-start"
          style={{ gap: "clamp(20px, calc(20px + 4vw), 60px)" }}
        >
          <TextReveal
            className="max-w-[752px]"
            style={{
              fontSize:
                "clamp(1.1875rem, calc(1.1875rem + 1.6vw), 2.625rem)",
              letterSpacing: "-0.02em",
              lineHeight: "1.1em",
              fontWeight: 400,
              color: "#222f30",
              textWrap: "balance",
            }}
          >
            A starting point for understanding where AI deployment in Africa could begin to take shape.
          </TextReveal>

          {/* Two-column text */}
          <Inview>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[752px]">
              <p
                style={{
                  fontSize: "clamp(1rem, calc(1rem + 0.2vw), 1.1875rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.3em",
                  color: "rgba(34, 47, 48, 0.8)",
                }}
              >
                Inferra AI started from a simple question: what would it
                take to actually deploy AI inference on the African continent?
                We&apos;re building a platform that brings together what
                data we can find — infrastructure, policy, connectivity —
                into one place where the picture starts to become clearer.
              </p>
              <p
                style={{
                  fontSize: "clamp(1rem, calc(1rem + 0.2vw), 1.1875rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: "1.3em",
                  color: "rgba(34, 47, 48, 0.8)",
                }}
              >
                The data isn&apos;t perfect and the landscape is constantly
                shifting — but we believe that even a directional view is
                better than flying blind. Our goal is to help African
                founders, investors, and policymakers ask better questions
                about where to build next.
              </p>
            </div>
          </Inview>

          <Inview>
            <Link
              href="/company"
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 font-light transition-all duration-300 whitespace-nowrap"
              style={{
                fontSize: "clamp(1rem, calc(1rem + 0.15vw), 1.125rem)",
                backgroundColor: "#222f30",
                color: "#fff",
              }}
            >
              <span>Learn more about us</span>
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/20 transition-transform duration-300 group-hover:scale-110">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
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

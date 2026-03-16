"use client";

import { Inview, TextReveal } from "./Reveal";

export default function FounderNote() {
  return (
    <section style={{ backgroundColor: "#f7f7f5" }}>
      <div
        className="mx-auto max-w-[1524px] px-[clamp(30px,5vw,50px)]"
        style={{
          paddingTop: "clamp(60px, calc(60px + 6vw), 120px)",
          paddingBottom: "clamp(80px, calc(80px + 6vw), 140px)",
        }}
      >
        {/* Label */}
        <Inview>
          <div
            className="uppercase font-light tracking-wide mb-10"
            style={{
              fontSize: "clamp(0.75rem, calc(0.75rem + 0.15vw), 0.875rem)",
              color: "rgba(34, 47, 48, 0.5)",
            }}
          >
            From the founder
          </div>
        </Inview>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-11 lg:gap-16 items-start">
          {/* Photo placeholder */}
          <Inview>
            <figure
              className="relative overflow-hidden w-full m-0"
              style={{
                aspectRatio: "4 / 5",
                borderRadius: "12px",
                maxWidth: "480px",
              }}
            >
              <img
                src="/founder.png"
                alt="Rajveer — Founder, Inferra AI"
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Name overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p
                  className="font-light text-white/60"
                  style={{ fontSize: "0.875rem" }}
                >
                  Rajveer
                </p>
                <p
                  className="font-light text-white/40"
                  style={{ fontSize: "0.8125rem" }}
                >
                  Founder, Inferra AI
                </p>
              </div>
            </figure>
          </Inview>

          {/* Note */}
          <div
            className="flex flex-col"
            style={{ gap: "clamp(24px, calc(24px + 2vw), 48px)" }}
          >
            <TextReveal
              style={{
                fontSize:
                  "clamp(1.375rem, calc(1.375rem + 1.2vw), 2.625rem)",
                letterSpacing: "-0.02em",
                lineHeight: "1.2em",
                fontWeight: 400,
                color: "#222f30",
              }}
            >
              As a young entrepreneur being exposed to the bleeding edge, I
              worry about Africa&apos;s foothold in the AI race.
            </TextReveal>

            <Inview>
              <div
                className="flex flex-col gap-5 max-w-[640px]"
              >
                <p
                  style={{
                    fontSize: "clamp(1rem, calc(1rem + 0.2vw), 1.1875rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.45em",
                    color: "rgba(34, 47, 48, 0.8)",
                  }}
                >
                  For us to lead the frontier in technology, we need to
                  understand where our inference lies. The truth is that we
                  aren&apos;t competing with the rest of the world — because our
                  needs, use cases, and problems are different.
                </p>
                <p
                  style={{
                    fontSize: "clamp(1rem, calc(1rem + 0.2vw), 1.1875rem)",
                    letterSpacing: "-0.02em",
                    lineHeight: "1.45em",
                    color: "rgba(34, 47, 48, 0.8)",
                  }}
                >
                  Inferra AI is meant to be a blueprint — a way for African
                  founders to understand where to deploy their solutions, and
                  what aspects still hold them back. It&apos;s not about having
                  all the answers. It&apos;s about asking the right questions
                  with better visibility.
                </p>
              </div>
            </Inview>

            <Inview>
              <div
                className="h-[1px] w-16"
                style={{ backgroundColor: "rgba(34, 47, 48, 0.15)" }}
              />
            </Inview>

            <Inview>
              <p
                className="font-light"
                style={{
                  fontSize: "0.9375rem",
                  color: "rgba(34, 47, 48, 0.5)",
                  letterSpacing: "-0.02em",
                }}
              >
                A Project Future initiative
              </p>
            </Inview>
          </div>
        </div>
      </div>
    </section>
  );
}

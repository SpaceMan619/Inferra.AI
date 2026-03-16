"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

const scrollerItems = [
  "Understanding where AI can be deployed in Africa starts with seeing the full picture — infrastructure, connectivity, policy, and power. We\u2019re building a lens for that.",
  "By bringing together available data on data centers, submarine cables, and regulatory signals, we aim to surface patterns that help founders and investors think directionally.",
  "This isn\u2019t a crystal ball. It\u2019s a starting point — a blueprint for African builders trying to understand where inference might realistically happen today.",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const indexCurrentRef = useRef<HTMLSpanElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const frame = frameRef.current;
    const heading = headingRef.current;
    const subtext = subtextRef.current;
    const button = buttonRef.current;
    const scroller = scrollerRef.current;
    const progress = progressRef.current;
    const indexCurrent = indexCurrentRef.current;
    if (!section || !canvas || !frame || !heading || !subtext || !button || !scroller || !progress || !indexCurrent) return;

    // --- CLIP-PATH REVEAL ---
    gsap.set(canvas, {
      clipPath: "inset(50% 50% 50% 50% round 200px)",
    });

    gsap.to(canvas, {
      clipPath: "inset(0% 0% 0% 0% round 0px)",
      duration: 2,
      delay: 0.3,
      ease: "expo.inOut",
    });

    // --- HEADING SPLIT TEXT ---
    const headingSplit = new SplitText(heading, {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });
    gsap.set(headingSplit.lines, { y: "110%" });
    // Show parent now that mask hides the lines
    gsap.set(heading, { opacity: 1 });

    const subtextSplit = new SplitText(subtext, {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });
    gsap.set(subtextSplit.lines, { y: "110%" });
    // Show parent now that mask hides the lines
    gsap.set(subtext, { opacity: 1 });
    gsap.set(button, { opacity: 0, scale: 0.9, y: 20 });

    // Content animation timeline
    const tl = gsap.timeline({ delay: 1.6 });
    tl.to(headingSplit.lines, {
      y: "0%",
      duration: 0.8,
      stagger: { each: 0.05 },
      ease: "power2.out",
    });
    tl.to(
      subtextSplit.lines,
      {
        y: "0%",
        duration: 0.8,
        stagger: { each: 0.05 },
        ease: "power2.out",
      },
      "-=0.4"
    );
    tl.to(
      button,
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "back.out(1.7)",
      },
      "-=0.4"
    );

    // --- BACKGROUND PARALLAX ON SCROLL ---
    const bgChild = canvas.querySelector(".background-video-inner");
    if (bgChild) {
      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          const scale = 1 + p * 0.2;
          const opacity = 0.875 - p * 0.275;
          gsap.set(bgChild, { scale, opacity });
        },
      });
    }

    // --- SCROLLER SECTION ---
    const items = itemRefs.current.filter(Boolean) as HTMLDivElement[];
    const splitItems: { chars: Element[] }[] = [];

    items.forEach((item) => {
      const p = item.querySelector("p");
      if (p) {
        const split = new SplitText(p, {
          type: "chars,lines",
          linesClass: "line",
        });
        splitItems.push(split);
        gsap.set(split.chars, { opacity: 0.4 });
      }
    });

    // Show first item
    if (items[0]) gsap.set(items[0], { opacity: 1 });

    // Scroll-linked scroller
    const totalItems = items.length;
    if (totalItems > 0) {
      ScrollTrigger.create({
        trigger: scroller,
        start: "top top",
        end: () => `+=${totalItems * 100}%`,
        scrub: true,
        pin: true,
        onUpdate: (self) => {
          const p = self.progress;
          const activeIndex = Math.min(
            Math.floor(p * totalItems),
            totalItems - 1
          );

          // Update progress bar
          gsap.set(progress, {
            scaleX: ((activeIndex + 1) / totalItems),
          });

          // Update counter
          indexCurrent.textContent = String(activeIndex + 1).padStart(2, "0");

          // Show/hide items
          items.forEach((item, i) => {
            if (i === activeIndex) {
              gsap.set(item, { opacity: 1 });
            } else {
              gsap.set(item, { opacity: 0 });
            }
          });

          // Animate chars of active item
          if (splitItems[activeIndex]) {
            const itemProgress =
              (p * totalItems - activeIndex) / 1;
            const chars = splitItems[activeIndex].chars;
            chars.forEach((char, ci) => {
              const charProgress = ci / chars.length;
              const op = charProgress < itemProgress ? 1 : 0.4;
              gsap.set(char, { opacity: op });
            });
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
      headingSplit.revert();
      subtextSplit.revert();
      splitItems.forEach((s) => {
        if (s && 'revert' in s) (s as { revert: () => void }).revert();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} className="c-hero-xl relative">
      {/* ── BACKGROUND (absolute — covers hero section only) ── */}
      <figure
        className="hero_background absolute top-0 left-0 w-full h-full z-0 m-0 pointer-events-none"
      >
        <div
          className="sticky top-0 w-full h-[100lvh]"
        >
          <div
            ref={frameRef}
            className="background_frame absolute inset-3 overflow-hidden"
            style={{ borderRadius: "20px" }}
          >
            <div
              ref={canvasRef}
              className="background_canvas absolute inset-0 bg-black"
              style={{
                clipPath: "inset(50% 50% 50% 50% round 200px)",
              }}
            >
              <div className="background-video-inner absolute inset-0 w-full h-full">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ opacity: 0.875 }}
                >
                  <source src="/hero-bg.mp4" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </div>
      </figure>

      {/* ── MAIN HERO ── */}
      <div className="hero_main relative z-[1] text-white">
        <div className="main_inner flex flex-col justify-between h-[100lvh] px-[var(--container-padding)] pt-[clamp(112px,calc(112px+(148-112)*((100vw-440px)/(1440-440))),148px)] pb-[clamp(32px,calc(32px+0.012*(100vw-440px)),44px)]">
          <h1
            ref={headingRef}
            className="main_heading max-w-[1070px]"
            style={{
              fontSize: "clamp(3.125rem, calc(3.125rem + 0.062 * (100vw - 27.5rem)), 7rem)",
              letterSpacing: "-0.03em",
              lineHeight: "1.15",
              textWrap: "pretty",
              opacity: 0,
            } as React.CSSProperties}
          >
            Exploring the landscape of AI&nbsp;infrastructure&nbsp;in&nbsp;Africa.
          </h1>

          <div className="main_bottom flex flex-col lg:flex-row lg:items-end justify-between gap-6 w-full">
            <h2
              ref={subtextRef}
              className="main_text max-w-[640px]"
              style={{
                fontSize: "clamp(1.25rem, calc(1.25rem + 0.004 * (100vw - 27.5rem)), 1.5rem)",
                letterSpacing: "-0.02em",
                lineHeight: "1.45",
                textWrap: "pretty",
                opacity: 0,
              } as React.CSSProperties}
            >
              A directional tool for understanding where data centers,
              connectivity, and policy signals point — so African builders
              can start to see where AI deployment might be possible.
            </h2>

            <div ref={buttonRef} style={{ opacity: 0 }}>
              <Link
                href="/dashboard"
                className="group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-light hover:bg-white/90 transition-colors duration-300 whitespace-nowrap"
                style={{ color: "#222f30", fontSize: "clamp(1rem, calc(1rem + 0.002 * (100vw - 27.5rem)), 1.125rem)" }}
              >
                <span>Explore the Map</span>
                <span className="flex items-center justify-center w-10 h-10 rounded-full bg-[#222f30] text-white transition-transform duration-300 group-hover:scale-110">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m7 17 9.2-9.2M17 17V7H7" />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── SCROLLER ("What we do") ── */}
      <div
        ref={scrollerRef}
        className="hero_scroller relative z-[1] text-white h-[100lvh]"
      >
        <div className="flex flex-col h-full">
          {/* Head */}
          <div className="scroller_head px-[var(--container-padding)] pt-20 lg:pt-12 pb-11 flex-shrink-0">
            <span className="text-[clamp(0.75rem,calc(0.75rem+0.002*(100vw-27.5rem)),0.875rem)] uppercase tracking-wide opacity-70 font-light">
              What we do
            </span>
          </div>

          {/* Progress bar */}
          <div className="mx-[var(--container-padding)] h-[1px] bg-white/20 relative overflow-hidden flex-shrink-0">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 w-full bg-white origin-left"
              style={{ transform: "scaleX(0.333)" }}
            />
          </div>

          {/* Content */}
          <div className="scroller_content px-[var(--container-padding)] pt-8 flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_2fr] gap-11">
            {/* Index counter */}
            <aside className="content_index">
              <div className="inline-flex items-center border border-white/40 rounded-[20px] px-[17px] py-3 text-sm font-light">
                <span ref={indexCurrentRef} className="min-w-[20px] text-center">
                  01
                </span>
                <span className="text-white/30 min-w-[20px] text-center">
                  /
                </span>
                <span className="text-white/30 min-w-[20px] text-center">
                  {String(scrollerItems.length).padStart(2, "0")}
                </span>
              </div>
            </aside>

            {/* Scrolling text items */}
            <div className="content_main relative w-full h-full">
              {scrollerItems.map((text, i) => (
                <div
                  key={i}
                  ref={(el) => { itemRefs.current[i] = el; }}
                  className="main_item absolute top-0 left-0 w-full flex flex-col transition-opacity duration-300"
                  style={{ opacity: i === 0 ? 1 : 0 }}
                >
                  <p
                    style={{
                      fontSize: "clamp(1.25rem, calc(1.25rem + 0.038 * (100vw - 27.5rem)), 3.625rem)",
                      letterSpacing: "-0.02em",
                      lineHeight: "1.15em",
                      wordBreak: "keep-all",
                      overflowWrap: "normal",
                    }}
                  >
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}

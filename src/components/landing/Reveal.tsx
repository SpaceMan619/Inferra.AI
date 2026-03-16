"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, SplitText);

/* ═══════════════════════════════════════════════════════
   1. INVIEW — scroll-triggered fade+slide (matches inspo)

   From: opacity 0, y 20
   To:   opacity 1, y 0
   Duration: 0.8s, ease: power2.out, stagger: 0.05
   ═══════════════════════════════════════════════════════ */
interface InviewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function Inview({
  children,
  className = "",
  delay = 0,
}: InviewProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    gsap.set(el, { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power2.out",
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [delay]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   2. TEXT REVEAL — SplitText lines mask

   Splits into lines, each masked by overflow:hidden,
   slides up from y:110% to 0.
   Exactly matches the inspo site's data-text-reveal.
   ═══════════════════════════════════════════════════════ */
interface TextRevealProps {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** If true, animates on page load. If false (default), on scroll. */
  immediate?: boolean;
  /** Wrapper element — rendered as a div always, use className for semantics */
  as?: string;
}

export function TextReveal({
  children,
  className = "",
  style,
  delay = 0,
  stagger = 0.05,
  duration = 0.8,
  immediate = false,
  as: _tag,
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const split = new SplitText(el, {
      type: "lines",
      linesClass: "line",
      mask: "lines",
    });

    gsap.set(split.lines, { y: "110%" });

    if (immediate) {
      gsap.to(split.lines, {
        y: "0%",
        duration,
        delay,
        stagger: { each: stagger },
        ease: "power2.out",
      });
    } else {
      ScrollTrigger.create({
        trigger: el,
        start: "top 80%",
        onEnter: () => {
          gsap.to(split.lines, {
            y: "0%",
            duration,
            delay,
            stagger: { each: stagger },
            ease: "power2.out",
          });
        },
        once: true,
      });
    }

    return () => {
      split.revert();
    };
  }, [delay, stagger, duration, immediate]);

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   3. INVIEW GROUP — staggered children
   ═══════════════════════════════════════════════════════ */
interface InviewGroupProps {
  children: ReactNode;
  className?: string;
  stagger?: number;
  selector?: string;
}

export function InviewGroup({
  children,
  className = "",
  stagger = 0.05,
  selector = ".inview-child",
}: InviewGroupProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets = el.querySelectorAll(selector);
    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y: 20 });

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 80%",
      onEnter: () => {
        gsap.to(targets, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: { each: stagger },
          ease: "power2.out",
        });
      },
      once: true,
    });

    return () => trigger.kill();
  }, [stagger, selector]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

/* For backwards compat — simple default export */
export default Inview;

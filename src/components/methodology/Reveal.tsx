"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  children: ReactNode;
  /** Stagger direct children instead of moving the block as one piece. */
  stagger?: boolean;
  className?: string;
};

/**
 * Scroll reveal for the methodology page. Deliberately quiet: a short rise and
 * fade, nothing that draws attention to itself while someone is reading.
 *
 * Anyone who has asked their OS to reduce motion sees the content already in
 * place, never a blank block, because the tween only ever runs inside the
 * matchMedia branch that excludes them.
 */
export default function Reveal({ children, stagger = false, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? Array.from(el.children) : [el];

        gsap.from(targets, {
          y: 18,
          autoAlpha: 0,
          duration: 0.7,
          ease: "power2.out",
          stagger: stagger ? 0.06 : 0,
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        });
      });
    }, el);

    return () => ctx.revert();
  }, [stagger]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

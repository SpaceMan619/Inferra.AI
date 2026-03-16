"use client";

import { motion } from "framer-motion";
import AfricaSilhouette from "./AfricaSilhouette";
import ScrollIndicator from "./ScrollIndicator";

const headlineWords = ["Where", "AI", "runs", "on", "the", "continent."];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Radial gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(200, 132, 58, 0.06) 0%, transparent 70%)",
        }}
      />

      <AfricaSilhouette />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-3xl">
        {/* Headline */}
        <h1 className="font-serif font-light text-5xl md:text-7xl lg:text-8xl leading-[1.1] tracking-tight mb-6">
          {headlineWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-[0.3em]"
              style={{
                color:
                  word === "AI" ? "var(--primary)" : "var(--text-primary)",
              }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg leading-relaxed max-w-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          InferraAI maps inference readiness across African markets — so you
          deploy with confidence, not guesswork.
        </motion.p>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-16 h-px mt-8"
          style={{ background: "var(--primary)", opacity: 0.4 }}
        />
      </div>

      <ScrollIndicator />

      {/* Bottom gradient fade into next section */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent, var(--bg-deep))",
        }}
      />
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import RotatingGlobe from "./RotatingGlobe";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Subtle gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 70% 50%, rgba(79, 70, 229, 0.06) 0%, rgba(16, 185, 129, 0.03) 50%, transparent 80%)",
        }}
      />

      <div className="relative z-10 w-full max-w-[1300px] mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Left: Text content */}
        <div className="flex-1 max-w-xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide mb-6"
            style={{
              background: "rgba(79, 70, 229, 0.08)",
              border: "1px solid rgba(79, 70, 229, 0.15)",
              color: "var(--primary)",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
            Live Inference Data
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mb-5"
            style={{ color: "var(--text-primary)" }}
          >
            Where{" "}
            <span
              style={{
                background: "linear-gradient(135deg, var(--primary), var(--secondary))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              AI inference
            </span>{" "}
            runs on the continent
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)" }}
          >
            InferraAI maps inference readiness across African markets — so you
            deploy with confidence, not guesswork.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-3"
          >
            <a
              href="#explore"
              className="px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              style={{
                background: "var(--primary)",
                color: "#fff",
                boxShadow: "0 2px 12px rgba(79, 70, 229, 0.25)",
              }}
            >
              Explore the Map
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-7 py-3 rounded-xl text-sm font-semibold transition-all duration-200 hover:bg-black/[0.03]"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-secondary)",
              }}
            >
              Learn More
            </a>
          </motion.div>
        </div>

        {/* Right: Rotating Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0"
        >
          <RotatingGlobe />
        </motion.div>
      </div>

      <ScrollIndicator />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg-deep))",
        }}
      />
    </section>
  );
}

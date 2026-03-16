"use client";

import { motion } from "framer-motion";
import ParticleNetwork from "./ParticleNetwork";
import ScrollIndicator from "./ScrollIndicator";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Gradient backdrop */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 45%, rgba(255, 107, 53, 0.08) 0%, rgba(0, 201, 167, 0.04) 40%, transparent 70%)",
        }}
      />

      {/* Particle network */}
      <ParticleNetwork />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-4xl">
        {/* Tag */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium tracking-wider uppercase mb-8"
          style={{
            background: "rgba(255, 107, 53, 0.1)",
            border: "1px solid rgba(255, 107, 53, 0.2)",
            color: "var(--primary)",
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
          Live Inference Readiness Data
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="font-sans font-bold text-5xl md:text-7xl lg:text-8xl leading-[1.05] tracking-tight mb-6"
        >
          <span style={{ color: "var(--text-primary)" }}>Where </span>
          <span
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--accent))",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AI runs
          </span>
          <br />
          <span style={{ color: "var(--text-primary)" }}>on the continent</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-base md:text-lg leading-relaxed max-w-xl mb-10"
          style={{ color: "var(--text-secondary)" }}
        >
          InferraAI maps inference readiness across African markets — so you
          deploy with confidence, not guesswork.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-4"
        >
          <a
            href="#explore"
            className="px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{
              background: "linear-gradient(135deg, var(--primary), #e85d2a)",
              color: "#fff",
              boxShadow: "0 4px 20px rgba(255, 107, 53, 0.3)",
            }}
          >
            Explore the Map
          </a>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full text-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: "transparent",
              border: "1px solid var(--glass-border)",
              color: "var(--text-secondary)",
            }}
          >
            Learn More
          </a>
        </motion.div>
      </div>

      <ScrollIndicator />

      {/* Bottom gradient */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, var(--bg-deep))",
        }}
      />
    </section>
  );
}

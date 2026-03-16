"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Globe3D from "./Globe3D";
import ParticleNetwork from "./ParticleNetwork";

const MARKETS = [
  { name: "South Africa", status: "Viable", color: "var(--secondary)" },
  { name: "Egypt", status: "Viable", color: "var(--secondary)" },
  { name: "Nigeria", status: "Emerging", color: "var(--accent)" },
  { name: "Kenya", status: "Emerging", color: "var(--accent)" },
  { name: "Morocco", status: "Emerging", color: "var(--accent)" },
  { name: "Ghana", status: "Emerging", color: "var(--accent)" },
  { name: "Rwanda", status: "Early", color: "var(--danger)" },
];

const TAGLINES = [
  { main: "Deploy AI in Africa", highlight: "with clarity." },
  { main: "Map GPU availability", highlight: "across 7 markets." },
  { main: "Understand policy signals", highlight: "before you build." },
  { main: "Route inference workloads", highlight: "with confidence." },
  { main: "Real infrastructure data", highlight: "not guesswork." },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero() {
  const [taglineIndex, setTaglineIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTaglineIndex((prev) => (prev + 1) % TAGLINES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const tagline = TAGLINES[taglineIndex];

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16">
      {/* Particle network background */}
      <div className="absolute inset-0 pointer-events-none">
        <ParticleNetwork />
      </div>

      {/* Layered background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute bottom-[-15%] left-[-8%] w-[600px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.06) 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-5 md:px-6 flex flex-col xl:flex-row items-center gap-10 xl:gap-14">
        {/* Left: Content */}
        <div className="flex-1 max-w-[620px] text-center xl:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 sm:gap-2.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-[11px] sm:text-[13px] font-semibold mb-6 sm:mb-8"
            style={{
              background: "rgba(79,70,229,0.06)",
              border: "1px solid rgba(79,70,229,0.12)",
              color: "var(--primary)",
            }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary)] opacity-40" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary)]" />
            </span>
            Live inference readiness data — 7 African markets
          </motion.div>

          {/* Rotating Headline — cinematic scale+opacity, NO filter (Safari-safe) */}
          <div className="min-h-[110px] sm:min-h-[130px] md:min-h-[160px] xl:min-h-[180px] mb-6">
            <AnimatePresence mode="wait">
              <motion.h1
                key={taglineIndex}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -16, scale: 0.98 }}
                transition={{ duration: 0.65, ease }}
                className="text-[1.85rem] sm:text-[2.4rem] md:text-[3.5rem] xl:text-[4.2rem] font-extrabold leading-[1.08] tracking-[-0.03em]"
              >
                <span className="text-[var(--text-primary)]">
                  {tagline.main}
                  <br />
                </span>
                <span
                  className="inline-block"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--primary) 0%, #818cf8 50%, var(--secondary) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {tagline.highlight}
                </span>
              </motion.h1>
            </AnimatePresence>
          </div>

          {/* Tagline progress dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-1.5 mb-8 justify-center xl:justify-start"
          >
            {TAGLINES.map((_, i) => (
              <div
                key={i}
                className="h-1 rounded-full transition-all duration-500"
                style={{
                  width: i === taglineIndex ? 24 : 6,
                  background:
                    i === taglineIndex
                      ? "var(--primary)"
                      : "rgba(0,0,0,0.1)",
                }}
              />
            ))}
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease }}
            className="text-[15px] sm:text-[17px] md:text-lg leading-[1.7] mb-8 sm:mb-10 max-w-[520px] mx-auto xl:mx-0"
            style={{ color: "var(--text-secondary)" }}
          >
            InferraAI maps real infrastructure — GPU availability, latency,
            data centers, and policy signals — so you know exactly where AI
            inference workloads can run.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease }}
            className="flex flex-wrap gap-4 mb-12 justify-center xl:justify-start"
          >
            <a
              href="#explore"
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-[14px] sm:text-[15px] font-bold text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
              style={{
                background: "var(--primary)",
                color: "#fff",
                boxShadow:
                  "0 4px 20px rgba(79,70,229,0.3), 0 0 0 1px rgba(79,70,229,0.1)",
              }}
            >
              Explore the Map
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#features"
              className="inline-flex items-center px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl text-[14px] sm:text-[15px] font-bold transition-all duration-300 hover:bg-black/[0.03] hover:-translate-y-0.5"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-secondary)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
            >
              How it works
            </a>
          </motion.div>

          {/* Market ticker strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <p
              className="text-[12px] font-semibold uppercase tracking-[0.15em] mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              Markets tracked
            </p>
            <div className="flex flex-wrap gap-2 justify-center xl:justify-start">
              {MARKETS.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.9 + i * 0.06 }}
                  className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-[12px] font-medium"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--glass-border)",
                    color: "var(--text-secondary)",
                  }}
                >
                  <div
                    className="w-1.5 h-1.5 rounded-full"
                    style={{ background: m.color }}
                  />
                  {m.name}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: COBE Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.88, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease }}
          className="flex-shrink-0 relative"
        >
          <div
            className="absolute inset-0 blur-3xl rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(79,70,229,0.1) 0%, rgba(16,185,129,0.05) 50%, transparent 70%)",
              transform: "scale(1.4)",
            }}
          />
          <div className="relative w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[420px] md:h-[420px] xl:w-[520px] xl:h-[520px]">
            <Globe3D interactive={false} />
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.5 }}
            className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-[11px] font-semibold whitespace-nowrap"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--glass-border)",
              color: "var(--text-muted)",
              boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
            }}
          >
            Real-time infrastructure mapping
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1.5"
        style={{ animation: "float-bounce 2.5s ease-in-out infinite" }}
      >
        <div
          className="w-5 h-8 rounded-full border-2 flex justify-center pt-1.5"
          style={{ borderColor: "var(--text-muted)" }}
        >
          <motion.div
            className="w-1 h-1.5 rounded-full"
            style={{ background: "var(--text-muted)" }}
            animate={{ y: [0, 6, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
    </section>
  );
}

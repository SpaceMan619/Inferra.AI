"use client";

import { motion } from "framer-motion";
import RotatingGlobe from "./RotatingGlobe";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(79,70,229,0.07) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
        {/* Left: Content */}
        <div className="flex-1 max-w-[560px]">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-[13px] font-medium mb-7"
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
            Live inference readiness data
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="text-[3.2rem] md:text-[4rem] lg:text-[4.5rem] font-extrabold leading-[1.05] tracking-[-0.025em] mb-6"
          >
            <span style={{ color: "var(--text-primary)" }}>
              Deploy AI in Africa{" "}
            </span>
            <span
              style={{
                background: "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              with clarity
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg md:text-xl leading-relaxed mb-10"
            style={{ color: "var(--text-secondary)" }}
          >
            InferraAI gives founders and operators a real-time view of
            where AI inference workloads can be deployed across 7+ African
            markets. Infrastructure data. Policy signals. No guesswork.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap gap-4"
          >
            <a
              href="#explore"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              style={{
                background: "var(--primary)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(79,70,229,0.25)",
              }}
            >
              Explore the Map
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="#features"
              className="inline-flex items-center px-7 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 hover:bg-black/[0.03]"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--glass-border)",
                color: "var(--text-secondary)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
              }}
            >
              How it works
            </a>
          </motion.div>

          {/* Trust strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-center gap-6 mt-12"
          >
            <div className="flex -space-x-2">
              {["#4f46e5", "#10b981", "#f59e0b", "#ef4444"].map((c, i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white"
                  style={{ background: c, opacity: 0.8 }}
                />
              ))}
            </div>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              <span className="font-semibold" style={{ color: "var(--text-secondary)" }}>
                7 markets
              </span>{" "}
              tracked across 4 regions
            </p>
          </motion.div>
        </div>

        {/* Right: Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex-shrink-0 relative"
        >
          {/* Glow behind globe */}
          <div
            className="absolute inset-0 blur-3xl rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(79,70,229,0.08) 0%, rgba(16,185,129,0.04) 50%, transparent 70%)",
              transform: "scale(1.3)",
            }}
          />
          <div className="relative">
            <RotatingGlobe />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
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
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}

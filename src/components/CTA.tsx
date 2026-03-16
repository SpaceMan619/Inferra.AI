"use client";

import { motion } from "framer-motion";

export default function CTA() {
  return (
    <section className="relative z-10 py-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[800px] mx-auto text-center rounded-3xl px-8 py-16 relative overflow-hidden"
        style={{
          background: "var(--bg-dark)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.15)",
        }}
      >
        {/* Decorative gradients */}
        <div
          className="absolute top-0 right-0 w-[300px] h-[300px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(79,70,229,0.2) 0%, transparent 70%)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[200px] h-[200px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.15) 0%, transparent 70%)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="relative">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4 text-white">
            Ready to deploy?
          </h2>
          <p className="text-base md:text-lg mb-8 max-w-md mx-auto" style={{ color: "rgba(255,255,255,0.6)" }}>
            Sign up for early access to InferraAI Pro — custom reports, API access, and expanded market coverage.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <button
              className="px-8 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer"
              style={{
                background: "var(--primary)",
                color: "#fff",
                boxShadow: "0 4px 16px rgba(79,70,229,0.35)",
              }}
            >
              Get Early Access
            </button>
            <a
              href="#explore"
              className="px-8 py-3.5 rounded-xl text-[15px] font-semibold transition-all duration-200 hover:bg-white/[0.08]"
              style={{
                border: "1px solid rgba(255,255,255,0.15)",
                color: "rgba(255,255,255,0.7)",
              }}
            >
              Try the Map
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

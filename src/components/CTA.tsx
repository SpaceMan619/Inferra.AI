"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative z-10 py-16 px-5 md:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-[820px] mx-auto text-center rounded-3xl px-6 md:px-14 py-14 md:py-20 relative overflow-hidden"
        style={{
          background: "var(--bg-dark)",
          boxShadow: "0 8px 48px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(255,255,255,0.03)",
        }}
      >
        {/* Decorative gradients */}
        <div
          className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(79,70,229,0.18) 0%, transparent 60%)",
            transform: "translate(30%, -40%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-[250px] h-[250px] rounded-full pointer-events-none"
          style={{
            background: "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 60%)",
            transform: "translate(-30%, 40%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.05] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        <div className="relative">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] mb-5" style={{ color: "rgba(129,140,248,0.75)" }}>
            Get started
          </p>
          <h2 className="text-[1.5rem] sm:text-[1.75rem] md:text-[2.75rem] font-extrabold tracking-tight mb-5 text-white leading-tight">
            Ready to deploy
            <br />
            AI in Africa?
          </h2>
          <p className="text-[14px] sm:text-[15px] md:text-[17px] mb-8 sm:mb-10 max-w-md mx-auto leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
            Sign up for early access to InferraAI Pro — custom reports, API
            access, and expanded market coverage.
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-3">
            <Link
              href="/signup"
              className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl text-[14px] sm:text-[15px] font-bold text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(145deg, #6058f7 0%, #4f46e5 55%, #3a33c0 100%)",
                boxShadow: "0 4px 20px rgba(79,70,229,0.4), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              Get Early Access
            </Link>
            <a
              href="#explore"
              className="px-7 sm:px-9 py-3.5 sm:py-4 rounded-2xl text-[14px] sm:text-[15px] font-bold transition-all duration-300 hover:bg-white/[0.08]"
              style={{
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.6)",
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

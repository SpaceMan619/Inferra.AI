"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(250,250,248,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.05)" : "1px solid transparent",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-2 group">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-sm font-bold"
            style={{ background: "var(--primary)" }}
          >
            iA
          </div>
          <span className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>
            Inferra<span style={{ color: "var(--primary)" }}>AI</span>
          </span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          <a
            href="#features"
            className="text-sm font-medium transition-colors hover:text-[var(--primary)]"
            style={{ color: "var(--text-secondary)" }}
          >
            Features
          </a>
          <a
            href="#explore"
            className="text-sm font-medium transition-colors hover:text-[var(--primary)]"
            style={{ color: "var(--text-secondary)" }}
          >
            Map
          </a>
          <a
            href="#insights"
            className="text-sm font-medium transition-colors hover:text-[var(--primary)]"
            style={{ color: "var(--text-secondary)" }}
          >
            Insights
          </a>
        </div>

        {/* Auth buttons */}
        <div className="flex items-center gap-3">
          <button
            className="text-sm font-medium px-4 py-2 rounded-lg transition-colors hover:bg-black/[0.04] cursor-pointer"
            style={{ color: "var(--text-secondary)" }}
          >
            Log in
          </button>
          <button
            className="text-sm font-semibold px-5 py-2 rounded-lg transition-all hover:shadow-md hover:-translate-y-px cursor-pointer"
            style={{
              background: "var(--primary)",
              color: "#fff",
              boxShadow: "0 1px 4px rgba(79,70,229,0.2)",
            }}
          >
            Sign up
          </button>
        </div>
      </div>
    </motion.nav>
  );
}

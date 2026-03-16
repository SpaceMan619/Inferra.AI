"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Map", href: "#explore" },
  { label: "Insights", href: "#insights" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-3">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-2 md:gap-3 rounded-full px-3 md:px-4 py-2 w-full transition-all duration-300"
        style={{
          maxWidth: "min(680px, calc(100vw - 32px))",
          background: scrolled ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(24px) saturate(180%)",
          WebkitBackdropFilter: "blur(24px) saturate(180%)",
          border: "1px solid rgba(0,0,0,0.06)",
          boxShadow: scrolled
            ? "0 4px 24px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)"
            : "0 2px 12px rgba(0,0,0,0.04)",
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 pl-0.5 shrink-0">
          <div
            className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-[11px] font-bold"
            style={{
              background: "linear-gradient(135deg, var(--primary), var(--primary-light))",
              boxShadow: "0 2px 8px rgba(79,70,229,0.25)",
            }}
          >
            iA
          </div>
          <span className="text-[15px] font-bold tracking-tight text-[var(--text-primary)]">
            Inferra<span className="text-[var(--primary)]">AI</span>
          </span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-1 ml-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-[13px] font-semibold px-4 py-2 rounded-lg transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/[0.04]"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Auth + Dashboard buttons */}
        <Link
          href="/login"
          className="hidden sm:block text-[13px] font-semibold px-4 py-2 rounded-xl transition-colors duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/[0.04]"
        >
          Log in
        </Link>
        <Link
          href="/dashboard"
          className="text-[12px] sm:text-[13px] font-bold px-4 sm:px-5 py-2 rounded-xl text-white transition-all duration-200 hover:shadow-lg hover:-translate-y-px"
          style={{
            background: "var(--primary)",
            boxShadow: "0 2px 8px rgba(79,70,229,0.2)",
          }}
        >
          Dashboard
        </Link>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden flex flex-col gap-[4px] p-2 rounded-lg hover:bg-black/[0.04] transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          <span className={`block w-4 h-[1.5px] bg-[var(--text-secondary)] transition-all duration-200 origin-center ${mobileOpen ? "rotate-45 translate-y-[5.5px]" : ""}`} />
          <span className={`block w-4 h-[1.5px] bg-[var(--text-secondary)] transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-4 h-[1.5px] bg-[var(--text-secondary)] transition-all duration-200 origin-center ${mobileOpen ? "-rotate-45 -translate-y-[5.5px]" : ""}`} />
        </button>
      </motion.nav>

      {/* Mobile dropdown */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden absolute top-[60px] left-4 right-4 rounded-2xl p-3 flex flex-col gap-1"
            style={{
              background: "rgba(255,255,255,0.92)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)",
              border: "1px solid rgba(0,0,0,0.06)",
              boxShadow: "0 8px 32px rgba(0,0,0,0.1)",
            }}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[15px] font-medium px-4 py-3 rounded-xl transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/[0.04]"
              >
                {link.label}
              </a>
            ))}
            <div className="h-px mx-2 my-1" style={{ background: "var(--glass-border)" }} />
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-[15px] font-medium px-4 py-3 rounded-xl text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-black/[0.04]"
            >
              Log in
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

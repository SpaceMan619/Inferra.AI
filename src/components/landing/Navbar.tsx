"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Platform", href: "/platform" },
  { label: "Company", href: "/company" },
  { label: "Newsroom", href: "/newsroom" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#fafaf8]/80 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.04)]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1524px] px-6 md:px-10">
        <div className="flex h-[72px] items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#1a2b2c] text-white text-xs font-semibold tracking-wide">
              iA
            </span>
            <span className="text-[#1a2b2c] text-[15px] font-medium tracking-[-0.2px]">
              InferraAI
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[14px] font-light text-[#1a2b2c]/70 hover:text-[#1a2b2c] transition-colors tracking-[-0.1px]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/dashboard"
              className="inline-flex items-center rounded-full bg-[#1a2b2c] px-7 py-2.5 text-[13px] font-medium text-white hover:opacity-85 transition-opacity"
            >
              Dashboard
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-[#1a2b2c]"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#fafaf8]/95 backdrop-blur-xl border-t border-black/[0.04]">
          <div className="px-6 py-6 flex flex-col gap-5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="text-[15px] font-light text-[#1a2b2c]/70 hover:text-[#1a2b2c] transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="inline-flex w-fit items-center rounded-full bg-[#1a2b2c] px-7 py-2.5 text-[13px] font-medium text-white hover:opacity-85 transition-opacity mt-2"
            >
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}

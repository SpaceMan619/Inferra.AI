"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-3 lg:top-5 left-0 right-0 z-[100] px-5 lg:px-0"
      >
        <div
          className="mx-auto flex items-center justify-between transition-all duration-600"
          style={{
            maxWidth: "calc(100% - 40px)",
            height: "54px",
            padding: "0 12px 0 16px",
            backgroundColor: scrolled ? "rgba(255,255,255,0.8)" : "transparent",
            backdropFilter: scrolled ? "blur(8px)" : "none",
            WebkitBackdropFilter: scrolled ? "blur(8px)" : "none",
            borderRadius: scrolled ? "27px" : "0",
          }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-semibold tracking-wide transition-transform duration-300 group-hover:scale-95"
              style={{
                backgroundColor: scrolled ? "#222f30" : "#fff",
                color: scrolled ? "#fff" : "#222f30",
              }}
            >
              iA
            </span>
            <span
              className="text-[14px] font-medium tracking-[-0.5px] transition-colors duration-300"
              style={{ color: scrolled ? "#222f30" : "#fff" }}
            >
              InferraAI
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-[17px] py-2 text-[14px] font-light transition-all duration-300 rounded-full hover:bg-black/5"
                style={{
                  color: scrolled ? "#222f30" : "#fff",
                  height: "39px",
                  display: "inline-flex",
                  alignItems: "center",
                }}
              >
                {link.label}
              </Link>
            ))}

            <Link
              href="/login"
              className="relative px-[17px] py-2 text-[14px] font-light transition-all duration-300 rounded-full hover:bg-black/5"
              style={{
                color: scrolled ? "#222f30" : "#fff",
                height: "39px",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Log in
            </Link>

            <Link
              href="/signup"
              className="ml-1 px-5 py-2 text-[13px] font-medium rounded-full transition-all duration-300"
              style={{
                backgroundColor: scrolled ? "#222f30" : "#fff",
                color: scrolled ? "#fff" : "#222f30",
                height: "39px",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              Sign up
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex items-center justify-center w-12 h-12 rounded-full transition-colors"
            style={{
              backgroundColor: scrolled ? "rgba(34,47,48,0.05)" : "rgba(255,255,255,0.1)",
            }}
            aria-label="Toggle menu"
          >
            <div className="relative w-5 h-3 flex flex-col justify-between">
              <span
                className="block h-[1.5px] w-full rounded-full transition-all duration-300"
                style={{
                  backgroundColor: scrolled ? "#222f30" : "#fff",
                  transform: mobileOpen ? "rotate(45deg) translate(4px, 4px)" : "none",
                }}
              />
              <span
                className="block h-[1.5px] w-full rounded-full transition-all duration-300"
                style={{
                  backgroundColor: scrolled ? "#222f30" : "#fff",
                  transform: mobileOpen ? "rotate(-45deg) translate(4px, -4px)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile fullscreen menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[99] bg-[#222f30] flex flex-col justify-center px-10">
          <div className="flex flex-col gap-6">
            <Link
              href="/dashboard"
              onClick={() => setMobileOpen(false)}
              className="text-white text-[2.875rem] font-light tracking-[-0.02em] leading-[1.1] hover:opacity-70 transition-opacity"
            >
              Dashboard
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="text-white text-[2.875rem] font-light tracking-[-0.02em] leading-[1.1] hover:opacity-70 transition-opacity"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              onClick={() => setMobileOpen(false)}
              className="text-white text-[2.875rem] font-light tracking-[-0.02em] leading-[1.1] hover:opacity-70 transition-opacity"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const navLinks = [
  { label: "Dashboard", href: "/dashboard" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-5 lg:top-5 left-0 right-0 z-[100] px-5 lg:px-0"
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.6s ease",
          pointerEvents: visible ? "auto" : "none",
        }}
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

      {/* Backdrop scrim */}
      <div
        className="fixed inset-0 lg:hidden transition-all duration-400"
        style={{
          backgroundColor: "rgba(0,0,0,0.45)",
          backdropFilter: mobileOpen ? "blur(6px)" : "blur(0px)",
          WebkitBackdropFilter: mobileOpen ? "blur(6px)" : "blur(0px)",
          opacity: mobileOpen ? 1 : 0,
          pointerEvents: mobileOpen ? "auto" : "none",
          zIndex: 97,
        }}
        onClick={() => setMobileOpen(false)}
      />

      {/* iOS 26-style slide-up glass sheet */}
      <div
        className="fixed left-3 right-3 lg:hidden"
        style={{
          bottom: "calc(16px + env(safe-area-inset-bottom))",
          zIndex: 98,
          transform: mobileOpen ? "translateY(0)" : "translateY(calc(100% + 32px))",
          transition: "transform 0.42s cubic-bezier(0.32, 0.72, 0, 1), opacity 0.3s ease",
          opacity: mobileOpen ? 1 : 0,
        }}
      >
        {/* Gradient border wrapper */}
        <div
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.14) 100%)",
            borderRadius: "28px",
            padding: "1px",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5), 0 8px 24px rgba(0,0,0,0.3)",
          }}
        >
          {/* Glass surface — dark enough that white text always reads */}
          <div
            style={{
              background: "linear-gradient(160deg, rgba(15,15,15,0.72) 0%, rgba(10,10,10,0.82) 100%)",
              backdropFilter: "blur(48px) saturate(160%)",
              WebkitBackdropFilter: "blur(48px) saturate(160%)",
              borderRadius: "27px",
              overflow: "hidden",
              boxShadow: [
                "inset 0 1.5px 0 rgba(255,255,255,0.12)",
                "inset 0 -1px 0 rgba(0,0,0,0.3)",
              ].join(", "),
            }}
          >
            {/* Drag handle */}
            <div className="flex justify-center pt-3 pb-1">
              <div
                style={{
                  width: "36px",
                  height: "4px",
                  borderRadius: "999px",
                  backgroundColor: "rgba(255,255,255,0.3)",
                }}
              />
            </div>

            {/* Nav links */}
            <div className="px-6 pt-4 pb-6 flex flex-col gap-1">
              {[
                { href: "/dashboard", label: "Dashboard", sub: "AI infrastructure readiness" },
                { href: "/login", label: "Log in", sub: "Access your account" },
                { href: "/signup", label: "Sign up", sub: "Join Inferra AI" },
              ].map((link, i) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between rounded-2xl px-4 py-3.5 transition-all duration-150"
                  style={{
                    backgroundColor: "rgba(255,255,255,0.07)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    animationDelay: `${i * 50}ms`,
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.12)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  <div>
                    <div style={{ color: "#fff", fontSize: "17px", fontWeight: 400, letterSpacing: "-0.01em", lineHeight: 1.2 }}>
                      {link.label}
                    </div>
                    <div style={{ color: "rgba(255,255,255,0.45)", fontSize: "12px", marginTop: "2px" }}>
                      {link.sub}
                    </div>
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

"use client";

import Link from "next/link";
import { Inview } from "./Reveal";
import { InferraLogoMark } from "@/components/InferraLogo";

export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: "#000",
        color: "#fff",
        minHeight: "calc(100vh - 120px)",
      }}
    >
      <div
        className="mx-auto max-w-[1524px] px-[clamp(30px,5vw,50px)] flex flex-col"
        style={{
          paddingTop: "40px",
          paddingBottom: "24px",
          minHeight: "inherit",
        }}
      >
        {/* Main footer content */}
        <div
          className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_minmax(0,634px)] gap-12 lg:gap-8"
          style={{ paddingBottom: "clamp(50px, 8vw, 100px)" }}
        >
          {/* Left — heading */}
          <Inview>
            <h2
              style={{
                fontSize:
                  "clamp(1.75rem, calc(1.75rem + 1vw), 2.625rem)",
                letterSpacing: "-0.02em",
                lineHeight: "1.1em",
                fontWeight: 400,
                color: "#fff",
              }}
            >
              A directional lens for
              <br />
              AI infrastructure in Africa.
            </h2>
            <p
              className="mt-4 font-light"
              style={{
                fontSize: "0.9375rem",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              Developed by Project Future
            </p>
          </Inview>

          {/* Right — info columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-10">
            {/* Navigation */}
            <div
              className="pl-6"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.2)" }}
            >
              <p
                className="uppercase mb-5"
                style={{
                  fontSize: "clamp(0.8125rem, calc(0.8125rem + 0.05vw), 0.875rem)",
                  letterSpacing: "-0.02em",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Navigate
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <Link
                    href="/dashboard"
                    className="text-white font-light transition-opacity duration-300 hover:opacity-60"
                    style={{
                      fontSize: "clamp(1rem, calc(1rem + 0.15vw), 1.125rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="text-white font-light transition-opacity duration-300 hover:opacity-60"
                    style={{
                      fontSize: "clamp(1rem, calc(1rem + 0.15vw), 1.125rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Log in
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="text-white font-light transition-opacity duration-300 hover:opacity-60"
                    style={{
                      fontSize: "clamp(1rem, calc(1rem + 0.15vw), 1.125rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Sign up
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div
              className="pl-6"
              style={{ borderLeft: "1px solid rgba(255,255,255,0.2)" }}
            >
              <p
                className="uppercase mb-5"
                style={{
                  fontSize: "clamp(0.8125rem, calc(0.8125rem + 0.05vw), 0.875rem)",
                  letterSpacing: "-0.02em",
                  color: "rgba(255,255,255,0.5)",
                }}
              >
                Contact
              </p>
              <ul className="flex flex-col gap-3">
                <li>
                  <a
                    href="mailto:rajveer@projectfuture.co.za"
                    className="text-white font-light transition-opacity duration-300 hover:opacity-60"
                    style={{
                      fontSize: "clamp(1rem, calc(1rem + 0.15vw), 1.125rem)",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    rajveer@projectfuture.co.za
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <p
          className="text-center text-[11px] pb-6"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          Inferra AI provides directional intelligence for research and planning purposes only. Data is aggregated from public sources and should not be treated as investment-grade or legally binding. Always verify with primary sources before making deployment decisions.
        </p>

        {/* Bottom bar */}
        <div
          className="pt-6 flex items-center justify-between"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-white">
              <InferraLogoMark size={16} color="#222f30" />
            </span>
          </Link>

          <p
            className="font-light"
            style={{
              fontSize: "0.875rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            &copy; 2026 Inferra AI &middot; A Project Future initiative
          </p>
        </div>
      </div>
    </footer>
  );
}

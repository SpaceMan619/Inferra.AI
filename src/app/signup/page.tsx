"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [org, setOrg] = useState("");

  return (
    <div className="auth-bg flex items-center justify-center px-4 py-12">
      {/* Floating orbs */}
      <div
        className="absolute top-[10%] right-[20%] w-[350px] h-[350px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 55%)",
          animation: "pulse-glow 7s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[15%] left-[10%] w-[280px] h-[280px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 55%)",
          animation: "pulse-glow 9s ease-in-out infinite 3s",
        }}
      />
      <div
        className="absolute top-[55%] left-[50%] w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(245,158,11,0.06) 0%, transparent 50%)",
          animation: "pulse-glow 5s ease-in-out infinite 1s",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-[420px]"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 mb-10 group w-fit">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-[11px] font-bold transition-transform duration-300 group-hover:scale-105"
            style={{
              background: "linear-gradient(145deg, #6058f7 0%, #4f46e5 55%, #3a33c0 100%)",
              boxShadow: "0 2px 8px rgba(79,70,229,0.4)",
            }}
          >
            iA
          </div>
          <span className="text-[15px] font-bold tracking-[-0.01em] text-white/90">
            Inferra<span className="text-[var(--primary-light)]">AI</span>
          </span>
        </Link>

        {/* Card */}
        <div className="liquid-glass-dark rounded-2xl p-8">
          <h1 className="text-[22px] font-bold text-white mb-1.5">
            Create your account
          </h1>
          <p className="text-[13px] text-white/40 mb-7">
            Get early access to African AI infrastructure intelligence
          </p>

          {/* Social logins */}
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            <button
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12.5px] font-medium text-white/70 transition-all duration-200 hover:bg-white/[0.08] cursor-pointer"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Google
            </button>
            <button
              className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[12.5px] font-medium text-white/70 transition-all duration-200 hover:bg-white/[0.08] cursor-pointer"
              style={{ border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              GitHub
            </button>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-[11px] font-medium text-white/25 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* Form */}
          <form onSubmit={(e) => e.preventDefault()} className="space-y-3.5">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-medium text-white/40 mb-1.5 uppercase tracking-wider">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Jane"
                  className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--primary)]/30"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              </div>
              <div>
                <label className="block text-[11px] font-medium text-white/40 mb-1.5 uppercase tracking-wider">
                  Organization
                </label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="Acme AI"
                  className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--primary)]/30"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-medium text-white/40 mb-1.5 uppercase tracking-wider">
                Work email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--primary)]/30"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-white/40 mb-1.5 uppercase tracking-wider">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Min 8 characters"
                className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/20 outline-none transition-all duration-200 focus:ring-2 focus:ring-[var(--primary)]/30"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl text-[13px] font-bold text-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-pointer mt-1"
              style={{
                background: "linear-gradient(145deg, #6058f7 0%, #4f46e5 55%, #3a33c0 100%)",
                boxShadow: "0 4px 18px rgba(79,70,229,0.35), inset 0 1px 0 rgba(255,255,255,0.15)",
              }}
            >
              Create account
            </button>
          </form>

          {/* Terms */}
          <p className="text-[10px] text-white/20 mt-4 leading-relaxed text-center">
            By creating an account, you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>

        {/* Footer link */}
        <p className="text-center text-[12px] text-white/30 mt-6">
          Already have an account?{" "}
          <Link href="/login" className="text-[var(--primary-light)] font-medium hover:text-white transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}

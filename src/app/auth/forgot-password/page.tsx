"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient, getURL } from "@/lib/supabase/client";
import { sanitizeAuthError } from "@/lib/authErrors";
import { InferraLogoMark } from "@/components/InferraLogo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: getURL("/auth/callback?next=/auth/reset-password"),
    });

    if (error) {
      setError(sanitizeAuthError(error.message));
      setLoading(false);
      return;
    }

    setSent(true);
    setLoading(false);
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 32, 28, 0.72)" }} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="px-[clamp(20px,4vw,48px)] py-5">
          <Link href="/login" className="flex items-center gap-2.5 group w-fit">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <InferraLogoMark size={20} color="#fff" />
            </div>
            <span className="text-[15px] font-medium tracking-[-0.02em] text-white/80">Inferra AI</span>
          </Link>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[400px]"
          >
            {sent ? (
              <div
                className="rounded-2xl p-8 text-center"
                style={{ backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
                  style={{ backgroundColor: "rgba(206,247,158,0.15)", border: "1px solid rgba(206,247,158,0.3)" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#cef79e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className="text-[1.3rem] font-medium tracking-[-0.03em] mb-2 text-white">Reset link sent</h2>
                <p className="text-[13px] font-light text-white/70 leading-relaxed">
                  Check your inbox for <span className="text-white font-normal">{email}</span>.<br />The link expires in 1 hour.
                </p>
                <Link href="/login" className="mt-6 inline-block text-[12px] text-white/60 hover:text-white transition-colors">
                  ← Back to sign in
                </Link>
              </div>
            ) : (
              <>
                <div className="mb-8">
                  <h1 className="text-[1.75rem] font-medium tracking-[-0.03em] mb-2 text-white">Reset password</h1>
                  <p className="text-[14px] font-light text-white/65">Enter your email and we&apos;ll send a reset link.</p>
                </div>

                <div
                  className="rounded-2xl p-7"
                  style={{ backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-[11px] uppercase tracking-widest mb-1.5 font-normal text-white/80">Email</label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@company.com"
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45"
                      />
                    </div>

                    {error && <p className="text-[12px] text-red-400/90">{error}</p>}

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-3 rounded-xl text-[13px] font-normal text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                      style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
                      onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; }}
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                          </svg>
                          Sending…
                        </>
                      ) : "Send reset link"}
                    </button>
                  </form>

                  <div className="mt-4 text-center">
                    <Link href="/login" className="text-[12px] text-white/60 hover:text-white transition-colors">
                      ← Back to sign in
                    </Link>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

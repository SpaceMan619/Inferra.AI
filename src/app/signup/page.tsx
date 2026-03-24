"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { createClient, getURL } from "@/lib/supabase/client";
import { sanitizeAuthError } from "@/lib/authErrors";
import { InferraLogoMark } from "@/components/InferraLogo";
import { getPasswordStrength, STRENGTH_CONFIG } from "@/lib/passwordStrength";

const ROLES = [
  { value: "", label: "Select your role" },
  { value: "founder", label: "Founder / Builder" },
  { value: "investor", label: "Investor / VC" },
  { value: "policy", label: "Policy / Government" },
  { value: "researcher", label: "Researcher / Academic" },
  { value: "operator", label: "Cloud / DC Operator" },
  { value: "other", label: "Other" },
];

export default function SignupPage() {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [confirmed, setConfirmed] = useState(false);

  const supabase = createClient();
  const strengthScore = getPasswordStrength(password);
  const strengthInfo = STRENGTH_CONFIG[strengthScore];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: getURL("/auth/callback"),
        data: { name, org, role },
      },
    });

    if (error) {
      setError(sanitizeAuthError(error.message));
      setLoading(false);
      return;
    }

    setConfirmed(true);
    setLoading(false);
  }

  async function handleOAuth(provider: "google" | "github") {
    setError("");
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: getURL("/auth/callback") },
    });
  }

  // ── Confirmation state ──────────────────────────────────────────
  if (confirmed) {
    return (
      <div className="relative min-h-screen flex flex-col overflow-hidden">
        <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
          <source src="/auth-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 32, 28, 0.72)" }} />
        <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[400px] text-center"
          >
            <div
              className="rounded-2xl p-8"
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
              <h2 className="text-[1.4rem] font-medium tracking-[-0.03em] mb-2 text-white">Check your inbox</h2>
              <p className="text-[13px] font-light text-white/70 leading-relaxed">
                We sent a confirmation link to <span className="text-white font-normal">{email}</span>.<br />Click it to activate your account.
              </p>
              <Link href="/login" className="mt-6 inline-block text-[13px] text-white underline underline-offset-2 decoration-white/40 hover:decoration-white transition-colors">
                Back to sign in →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Signup form ─────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 32, 28, 0.72)" }} />

      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="px-[clamp(20px,4vw,48px)] py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <InferraLogoMark size={20} color="#fff" />
            </div>
            <span className="text-[15px] font-medium tracking-[-0.02em] text-white/80">Inferra AI</span>
          </Link>
          <p className="text-[13px] font-light text-white/40">
            Already have an account?{" "}
            <Link href="/login" className="text-white/70 font-normal hover:text-white transition-colors">Sign in</Link>
          </p>
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-6 sm:py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[440px]"
          >
            <div className="mb-5 sm:mb-8 text-center">
              <h1 className="text-[1.75rem] font-medium tracking-[-0.03em] mb-2 text-white">Get early access</h1>
              <p className="text-[14px] font-light text-white/45">African AI infrastructure intelligence, built for builders</p>
            </div>

            <div
              className="rounded-2xl p-5 sm:p-7"
              style={{ backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              {/* OAuth */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {[
                  {
                    label: "Google", provider: "google" as const,
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                      </svg>
                    ),
                  },
                  {
                    label: "GitHub", provider: "github" as const,
                    icon: (
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    ),
                  },
                ].map((btn) => (
                  <button
                    key={btn.label}
                    type="button"
                    onClick={() => handleOAuth(btn.provider)}
                    className="flex items-center justify-center gap-2 py-2.5 rounded-xl text-[14px] sm:text-[12.5px] font-normal text-white/70 sm:text-white/60 transition-all duration-200 cursor-pointer hover:text-white/90"
                    style={{ border: "1px solid rgba(255,255,255,0.1)", backgroundColor: "rgba(255,255,255,0.04)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.09)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.04)"; }}
                  >
                    {btn.icon} {btn.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[13px] sm:text-[11px] font-light uppercase tracking-wider text-white/40 sm:text-white/25">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[13px] sm:text-[11px] uppercase tracking-widest mb-1.5 text-white/80">Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" required
                      className="w-full px-3.5 py-2.5 rounded-xl text-[15px] sm:text-[13px] text-white placeholder:text-white/50 sm:placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45" />
                  </div>
                  <div>
                    <label className="block text-[13px] sm:text-[11px] uppercase tracking-widest mb-1.5 text-white/80">Org</label>
                    <input type="text" value={org} onChange={(e) => setOrg(e.target.value)} placeholder="Company"
                      className="w-full px-3.5 py-2.5 rounded-xl text-[15px] sm:text-[13px] text-white placeholder:text-white/50 sm:placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45" />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest mb-1.5 text-white/80">I am a</label>
                  <select value={role} onChange={(e) => setRole(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl text-[13px] outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45 cursor-pointer appearance-none"
                    style={{
                      color: role ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.55)",
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L6 6L11 1' stroke='white' stroke-opacity='0.3' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                      backgroundRepeat: "no-repeat", backgroundPosition: "right 14px center",
                    }}>
                    {ROLES.map((r) => (
                      <option key={r.value} value={r.value} disabled={r.value === ""} style={{ backgroundColor: "#1a2820", color: "white" }}>
                        {r.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest mb-1.5 text-white/80">Work email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required
                    className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45" />
                </div>

                <div>
                  <label className="block text-[11px] uppercase tracking-widest mb-1.5 text-white/80">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 8 characters" required
                    className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45" />
                  {/* Password strength meter */}
                  {password.length > 0 && (
                    <div className="mt-2">
                      <div className="h-1 w-full rounded-full bg-white/10 overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-300"
                          style={{ width: strengthInfo.width, backgroundColor: strengthInfo.color }}
                        />
                      </div>
                      <p className="text-[11px] mt-1 transition-colors duration-300" style={{ color: strengthInfo.color }}>
                        {strengthInfo.label}
                      </p>
                    </div>
                  )}
                </div>

                {error && <p className="text-[12px] text-red-400/90 leading-relaxed">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 rounded-xl text-[15px] sm:text-[13px] font-normal text-white transition-all duration-300 hover:-translate-y-0.5 cursor-pointer mt-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                  style={{ backgroundColor: "rgba(255,255,255,0.12)", border: "1px solid rgba(255,255,255,0.18)" }}
                  onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.18)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.12)"; }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      Creating account…
                    </>
                  ) : "Create account"}
                </button>
              </form>

              <p className="text-[11px] mt-4 text-center text-white/25 leading-relaxed">
                By creating an account you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

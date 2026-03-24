"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient, getURL } from "@/lib/supabase/client";
import { sanitizeAuthError } from "@/lib/authErrors";
import { InferraLogoMark } from "@/components/InferraLogo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError(sanitizeAuthError(error.message));
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh(); // sync RSC cache after session is established
  }

  async function handleOAuth(provider: "google" | "github") {
    setError("");
    await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: getURL("/auth/callback") },
    });
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      {/* Video background */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0"
        style={{ backgroundColor: "rgba(20, 32, 28, 0.72)" }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navbar */}
        <header className="px-[clamp(20px,4vw,48px)] py-5 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <InferraLogoMark size={20} color="#fff" />
            </div>
            <span className="text-[15px] font-medium tracking-[-0.02em] text-white/80">
              Inferra AI
            </span>
          </Link>
          <p className="text-[13px] font-light text-white/40">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-white/70 font-normal hover:text-white transition-colors">
              Sign up
            </Link>
          </p>
        </header>

        {/* Main */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-[400px]"
          >
            <div className="mb-8">
              <h1 className="text-[1.75rem] font-medium tracking-[-0.03em] mb-2 text-white">
                Welcome back
              </h1>
              <p className="text-[14px] font-light text-white/45">
                Sign in to your infrastructure dashboard
              </p>
            </div>

            {/* Card */}
            <div
              className="rounded-2xl p-7"
              style={{
                backgroundColor: "rgba(255,255,255,0.06)",
                backdropFilter: "blur(24px)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* OAuth */}
              <div className="grid grid-cols-2 gap-2.5 mb-6">
                {[
                  {
                    label: "Google",
                    provider: "google" as const,
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
                    label: "GitHub",
                    provider: "github" as const,
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
                    {btn.icon}
                    {btn.label}
                  </button>
                ))}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[13px] sm:text-[11px] font-light uppercase tracking-wider text-white/40 sm:text-white/25">or</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[13px] sm:text-[11px] uppercase tracking-widest mb-1.5 font-normal text-white/80">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl text-[15px] sm:text-[13px] text-white placeholder:text-white/50 sm:placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[13px] sm:text-[11px] uppercase tracking-widest font-normal text-white/80">
                      Password
                    </label>
                    <Link href="/auth/forgot-password" className="text-[13px] sm:text-[11px] text-white/80 hover:text-white underline underline-offset-2 decoration-white/30 hover:decoration-white/70 transition-colors">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      className="w-full px-3.5 py-2.5 pr-10 rounded-xl text-[15px] sm:text-[13px] text-white placeholder:text-white/50 sm:placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 hover:text-white/55 transition-colors cursor-pointer"
                    >
                      {showPassword ? (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <p className="text-[13px] text-red-400/90 leading-relaxed">{error}</p>
                )}

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
                      Signing in…
                    </>
                  ) : "Sign in"}
                </button>
              </form>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}

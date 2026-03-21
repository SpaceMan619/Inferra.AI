"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { sanitizeAuthError } from "@/lib/authErrors";
import { getPasswordStrength, STRENGTH_CONFIG } from "@/lib/passwordStrength";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(sanitizeAuthError(error.message));
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 32, 28, 0.72)" }} />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[400px]"
        >
          <div className="mb-8">
            <h1 className="text-[1.75rem] font-medium tracking-[-0.03em] mb-2 text-white">Set new password</h1>
            <p className="text-[14px] font-light text-white/65">Choose a strong password for your account.</p>
          </div>

          <div
            className="rounded-2xl p-7"
            style={{ backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[11px] uppercase tracking-widest mb-1.5 text-white/80">New password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl text-[13px] text-white placeholder:text-white/35 outline-none transition-all duration-200 bg-white/[0.05] border border-white/20 focus:border-white/45"
                />
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

              <div>
                <label className="block text-[11px] uppercase tracking-widest mb-1.5 text-white/80">Confirm password</label>
                <input
                  type="password"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Repeat password"
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
                    Updating…
                  </>
                ) : "Update password"}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

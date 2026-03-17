"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState(
    searchParams.get("message") ?? "Something went wrong. Please try again."
  );

  // Supabase sometimes sends errors in the URL hash fragment (e.g. otp_expired).
  // Hash is not sent to the server, so we read it client-side here.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const params = new URLSearchParams(hash);
    const description = params.get("error_description");
    const code = params.get("error_code");

    if (description) {
      const readable = description.replace(/\+/g, " ");
      setMessage(
        code === "otp_expired"
          ? "This confirmation link has expired. Please sign up or request a new link."
          : readable
      );
    }
  }, []);

  return (
    <div className="w-full max-w-[420px]">
      <div
        className="rounded-2xl p-8 text-center"
        style={{ backgroundColor: "rgba(255,255,255,0.06)", backdropFilter: "blur(24px)", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        {/* Icon */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
          style={{ backgroundColor: "rgba(239,68,68,0.12)", border: "1px solid rgba(239,68,68,0.25)" }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
        </div>

        <h2 className="text-[1.3rem] font-medium tracking-[-0.03em] mb-3 text-white">
          Authentication failed
        </h2>
        <p className="text-[13px] font-light text-white/70 leading-relaxed mb-7">
          {message}
        </p>

        <div className="flex flex-col gap-2.5">
          <Link
            href="/login"
            className="w-full py-2.5 rounded-xl text-[13px] font-normal text-white text-center transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
          >
            Back to sign in
          </Link>
          <Link
            href="/signup"
            className="text-[12px] text-white/50 hover:text-white/80 transition-colors"
          >
            Create a new account →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <div className="relative min-h-screen flex flex-col overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover" autoPlay muted loop playsInline>
        <source src="/auth-bg.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ backgroundColor: "rgba(20, 32, 28, 0.72)" }} />

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-[420px]"
        >
          <Suspense fallback={null}>
            <ErrorContent />
          </Suspense>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import type { CountryData } from "@/types";

interface StatsBarProps {
  countries: CountryData[];
}

interface StatProps {
  value: number;
  label: string;
  color: string;
  suffix?: string;
  icon: React.ReactNode;
}

function Stat({ value, label, color, suffix, icon }: StatProps) {
  const { ref, count } = useCountUp(value, 2000);
  return (
    <div className="flex items-center gap-2.5 sm:gap-4">
      <div
        className="w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ background: `${color}10`, color }}
      >
        {icon}
      </div>
      <div>
        <span
          ref={ref}
          className="block text-xl sm:text-2xl md:text-3xl font-extrabold tabular-nums leading-tight"
          style={{ color }}
        >
          {count}
          {suffix}
        </span>
        <span className="block text-[11px] sm:text-[13px] font-medium mt-0.5 text-[var(--text-muted)]">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function StatsBar({ countries }: StatsBarProps) {
  const total = countries.length;
  const viable = countries.filter(
    (c) => c.ai_inference_readiness === "Viable"
  ).length;
  const gpu = countries.filter((c) =>
    c.ai_compute_availability.toLowerCase().includes("gpu")
  ).length;
  const strong = countries.filter(
    (c) => c.ai_policy_signal === "Strong"
  ).length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 max-w-[1000px] mx-auto px-5 md:px-6 -mt-4 pb-16"
    >
      <div
        className="rounded-2xl px-5 sm:px-6 md:px-12 py-6 sm:py-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--glass-border)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.05), 0 0 0 1px rgba(0,0,0,0.02)",
        }}
      >
        <Stat
          value={total}
          label="Markets tracked"
          color="var(--text-primary)"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
            </svg>
          }
        />
        <Stat
          value={viable}
          label="Viable for inference"
          color="var(--secondary)"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
          }
        />
        <Stat
          value={gpu}
          label="GPU available"
          color="var(--primary)"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="4" y="4" width="16" height="16" rx="2" />
              <rect x="9" y="9" width="6" height="6" />
              <path d="M15 2v2M9 2v2M15 20v2M9 20v2M2 15h2M2 9h2M20 15h2M20 9h2" />
            </svg>
          }
        />
        <Stat
          value={strong}
          label="Strong AI policy"
          color="var(--accent)"
          icon={
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          }
        />
      </div>
    </motion.section>
  );
}

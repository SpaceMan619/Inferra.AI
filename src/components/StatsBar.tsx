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
}

function Stat({ value, label, color, suffix }: StatProps) {
  const { ref, count } = useCountUp(value, 2000);
  return (
    <div className="text-center">
      <span ref={ref} className="block text-4xl md:text-5xl font-extrabold tabular-nums" style={{ color }}>
        {count}{suffix}
      </span>
      <span className="block text-sm font-medium mt-2" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
    </div>
  );
}

export default function StatsBar({ countries }: StatsBarProps) {
  const total = countries.length;
  const viable = countries.filter((c) => c.ai_inference_readiness === "Viable").length;
  const gpu = countries.filter((c) => c.ai_compute_availability.toLowerCase().includes("gpu")).length;
  const strong = countries.filter((c) => c.ai_policy_signal === "Strong").length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 max-w-[900px] mx-auto px-6 py-20"
    >
      <div
        className="rounded-2xl px-8 py-10 grid grid-cols-2 md:grid-cols-4 gap-8"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--glass-border)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
        }}
      >
        <Stat value={total} label="Markets tracked" color="var(--text-primary)" />
        <Stat value={viable} label="Viable for inference" color="var(--secondary)" />
        <Stat value={gpu} label="GPU available" color="var(--primary)" />
        <Stat value={strong} label="Strong AI policy" color="var(--accent)" />
      </div>
    </motion.section>
  );
}

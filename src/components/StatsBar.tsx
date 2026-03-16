"use client";

import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/useCountUp";
import type { CountryData } from "@/types";

interface StatsBarProps {
  countries: CountryData[];
}

interface StatItemProps {
  value: number;
  label: string;
  color: string;
}

function StatItem({ value, label, color }: StatItemProps) {
  const { ref, count } = useCountUp(value, 1800);

  return (
    <div className="flex flex-col items-center gap-1 px-6 py-4">
      <span
        ref={ref}
        className="text-4xl md:text-5xl font-bold tabular-nums"
        style={{ color }}
      >
        {count}
      </span>
      <span
        className="text-xs tracking-[0.15em] uppercase font-medium"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

function Separator() {
  return (
    <div
      className="hidden md:block w-px h-12 self-center"
      style={{ background: "var(--glass-border)" }}
    />
  );
}

export default function StatsBar({ countries }: StatsBarProps) {
  const totalMarkets = countries.length;
  const viableHubs = countries.filter(
    (c) => c.ai_inference_readiness === "Viable"
  ).length;
  const gpuMarkets = countries.filter((c) =>
    c.ai_compute_availability.toLowerCase().includes("gpu")
  ).length;
  const strongPolicy = countries.filter(
    (c) => c.ai_policy_signal === "Strong"
  ).length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 mx-auto max-w-4xl px-4 -mt-8"
    >
      <div className="glass-panel flex flex-wrap justify-center md:justify-between items-center">
        <StatItem value={totalMarkets} label="Markets Tracked" color="var(--text-primary)" />
        <Separator />
        <StatItem value={viableHubs} label="Viable Hubs" color="var(--secondary)" />
        <Separator />
        <StatItem value={gpuMarkets} label="GPU Available" color="var(--primary)" />
        <Separator />
        <StatItem value={strongPolicy} label="Strong Policy" color="var(--accent)" />
      </div>
    </motion.section>
  );
}

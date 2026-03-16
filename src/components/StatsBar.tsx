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
  suffix?: string;
}

function StatItem({ value, label, suffix }: StatItemProps) {
  const { ref, count } = useCountUp(value, 1800);

  return (
    <div className="flex flex-col items-center gap-1 px-6 py-3">
      <span
        ref={ref}
        className="font-serif text-3xl md:text-4xl font-light"
        style={{ color: "var(--primary-light)" }}
      >
        {count}
        {suffix}
      </span>
      <span
        className="text-xs tracking-[0.15em] uppercase"
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
      className="hidden md:block w-px h-10 self-center"
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
        <StatItem value={totalMarkets} label="Markets Tracked" />
        <Separator />
        <StatItem value={viableHubs} label="Viable Hubs" />
        <Separator />
        <StatItem value={gpuMarkets} label="GPU Available" />
        <Separator />
        <StatItem value={strongPolicy} label="Strong Policy" />
      </div>
    </motion.section>
  );
}

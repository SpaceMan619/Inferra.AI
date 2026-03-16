"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { CountryData, ViewMode } from "@/types";
import ReadinessBadge from "./ReadinessBadge";

interface CountryPanelProps {
  country: CountryData | null;
  mode: ViewMode;
}

interface MetricProps {
  label: string;
  value: string;
  sub?: string;
}

function Metric({ label, value, sub }: MetricProps) {
  return (
    <div
      className="rounded-xl p-3.5 transition-all duration-150 hover:shadow-sm"
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--glass-border)" }}
    >
      <div className="text-[10px] uppercase tracking-widest font-semibold mb-1" style={{ color: "var(--text-muted)" }}>
        {label}
      </div>
      <div className="text-[13px] font-bold" style={{ color: "var(--text-primary)" }}>
        {value}
      </div>
      {sub && (
        <div className="text-[10px] mt-0.5" style={{ color: "var(--text-muted)" }}>
          {sub}
        </div>
      )}
    </div>
  );
}

export default function CountryPanel({ country, mode }: CountryPanelProps) {
  if (!country) {
    return (
      <div
        className="h-full flex items-center justify-center rounded-2xl p-8"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--glass-border)",
          boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
          minHeight: "550px",
        }}
      >
        <div className="text-center">
          <div className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center" style={{ background: "var(--bg-elevated)" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
            </svg>
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--text-muted)" }}>
            Select a country to view details
          </p>
        </div>
      </div>
    );
  }

  const founderMetrics: MetricProps[] = [
    { label: "Inference Route", value: country.primary_inference_route },
    { label: "Latency to EU", value: `${country.est_rtt_to_europe_ms} ms` },
    { label: "Compute", value: country.ai_compute_availability },
    { label: "Readiness", value: country.ai_inference_readiness },
  ];

  const policyMetrics: MetricProps[] = [
    { label: "Policy Signal", value: country.ai_policy_signal },
    { label: "Data Governance", value: country.ai_data_governance_posture },
    { label: "Compute Policy", value: country.ai_compute_policy_commitment },
    { label: "Cross-Border", value: country.cross_border_ai_alignment },
  ];

  const infraMetrics: MetricProps[] = [
    { label: "Data Centers", value: country.active_data_centers, sub: country.dc_pipeline },
    { label: "Power", value: country.power_reliability },
    { label: "Cloud", value: country.cloud_maturity },
    { label: "Ops Friction", value: country.ops_friction },
  ];

  const primaryMetrics = mode === "founder" ? founderMetrics : policyMetrics;
  const statusValue = mode === "founder" ? country.ai_inference_readiness : country.ai_policy_signal;

  return (
    <div
      className="h-full rounded-2xl overflow-hidden"
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--glass-border)",
        boxShadow: "0 2px 20px rgba(0,0,0,0.04)",
        minHeight: "550px",
      }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={`${country.country}-${mode}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="p-6 h-full overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <p className="text-[10px] uppercase tracking-widest font-semibold mb-0.5" style={{ color: "var(--text-muted)" }}>
                {country.region}
              </p>
              <h2 className="text-2xl font-extrabold tracking-tight">{country.country}</h2>
            </div>
            <ReadinessBadge label={statusValue} />
          </div>
          <p className="text-xs font-medium mb-5" style={{ color: "var(--text-secondary)" }}>
            {country.connectivity_role}
          </p>

          <div className="h-px w-full mb-5" style={{ background: "var(--glass-border)" }} />

          {/* Primary metrics */}
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-2.5" style={{ color: "var(--text-muted)" }}>
            {mode === "founder" ? "Infrastructure" : "Policy Signals"}
          </p>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {primaryMetrics.map((m) => <Metric key={m.label} {...m} />)}
          </div>

          {/* Infra context */}
          <p className="text-[10px] uppercase tracking-widest font-semibold mb-2.5" style={{ color: "var(--text-muted)" }}>
            Infrastructure
          </p>
          <div className="grid grid-cols-2 gap-2 mb-5">
            {infraMetrics.map((m) => <Metric key={m.label} {...m} />)}
          </div>

          {/* Insight */}
          <div className="rounded-xl p-4" style={{ background: "rgba(79,70,229,0.04)", borderLeft: "3px solid var(--primary)" }}>
            <p className="text-[10px] uppercase tracking-widest font-semibold mb-1.5" style={{ color: "var(--primary)" }}>
              Founder Insight
            </p>
            <p className="text-[13px] leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {country.founder_insight}
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

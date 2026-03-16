"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { CountryData, ViewMode } from "@/types";
import ReadinessBadge from "./ReadinessBadge";
import MetricCard from "./MetricCard";

interface CountryPanelProps {
  country: CountryData | null;
  mode: ViewMode;
}

export default function CountryPanel({ country, mode }: CountryPanelProps) {
  if (!country) {
    return (
      <div
        className="glass-panel h-full flex items-center justify-center p-8"
        style={{ minHeight: "500px" }}
      >
        <p
          className="text-center text-sm"
          style={{ color: "var(--text-muted)" }}
        >
          Select a country on the map to view details.
        </p>
      </div>
    );
  }

  const founderMetrics = [
    { label: "Inference Route", value: country.primary_inference_route },
    { label: "Latency to EU", value: `${country.est_rtt_to_europe_ms} ms` },
    { label: "Compute", value: country.ai_compute_availability },
    { label: "Readiness", value: country.ai_inference_readiness },
  ];

  const policyMetrics = [
    { label: "Policy Signal", value: country.ai_policy_signal },
    { label: "Data Governance", value: country.ai_data_governance_posture },
    { label: "Compute Policy", value: country.ai_compute_policy_commitment },
    { label: "Cross-Border", value: country.cross_border_ai_alignment },
  ];

  const infraMetrics = [
    {
      label: "Data Centers",
      value: country.active_data_centers,
      subtitle: `Pipeline: ${country.dc_pipeline}`,
    },
    { label: "Power", value: country.power_reliability },
    { label: "Cloud", value: country.cloud_maturity },
    { label: "Ops Friction", value: country.ops_friction },
  ];

  const primaryMetrics = mode === "founder" ? founderMetrics : policyMetrics;
  const statusValue =
    mode === "founder"
      ? country.ai_inference_readiness
      : country.ai_policy_signal;

  return (
    <div className="glass-panel p-6 h-full overflow-y-auto" style={{ minHeight: "500px" }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={`${country.country}-${mode}`}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-1">
            <div>
              <p
                className="text-xs tracking-wider uppercase mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                {country.region}
              </p>
              <h2 className="font-serif text-3xl font-light" style={{ color: "var(--text-primary)" }}>
                {country.country}
              </h2>
            </div>
            <ReadinessBadge label={statusValue} />
          </div>

          {/* Connectivity Role tag */}
          <p className="text-xs mb-5" style={{ color: "var(--text-secondary)" }}>
            {country.connectivity_role}
          </p>

          {/* Divider */}
          <div
            className="h-px w-full mb-5"
            style={{ background: "var(--glass-border)" }}
          />

          {/* Primary Metrics Grid */}
          <p
            className="text-xs tracking-wider uppercase mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            {mode === "founder" ? "Infrastructure" : "Policy Signals"}
          </p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {primaryMetrics.map((m) => (
              <MetricCard key={m.label} label={m.label} value={m.value} />
            ))}
          </div>

          {/* Infrastructure Context Grid */}
          <p
            className="text-xs tracking-wider uppercase mb-3"
            style={{ color: "var(--text-muted)" }}
          >
            Infrastructure Context
          </p>
          <div className="grid grid-cols-2 gap-3 mb-5">
            {infraMetrics.map((m) => (
              <MetricCard
                key={m.label}
                label={m.label}
                value={m.value}
                subtitle={m.subtitle}
              />
            ))}
          </div>

          {/* Founder Insight */}
          <div
            className="rounded-xl p-4"
            style={{
              background: "rgba(200, 132, 58, 0.04)",
              borderLeft: "3px solid var(--primary)",
            }}
          >
            <p
              className="text-xs tracking-wider uppercase mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Founder Insight
            </p>
            <p
              className="text-sm leading-relaxed italic"
              style={{ color: "var(--text-secondary)" }}
            >
              &ldquo;{country.founder_insight}&rdquo;
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

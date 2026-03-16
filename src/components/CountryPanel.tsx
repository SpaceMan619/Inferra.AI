"use client";

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
      className="rounded-xl p-3.5 transition-colors duration-150"
      style={{
        backgroundColor: "rgba(34, 47, 48, 0.025)",
        border: "1px solid rgba(34, 47, 48, 0.06)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(34, 47, 48, 0.05)";
        e.currentTarget.style.borderColor = "rgba(34, 47, 48, 0.12)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = "rgba(34, 47, 48, 0.025)";
        e.currentTarget.style.borderColor = "rgba(34, 47, 48, 0.06)";
      }}
    >
      <div
        className="text-[10px] uppercase tracking-widest mb-1.5"
        style={{ color: "rgba(34, 47, 48, 0.5)", fontWeight: 400 }}
      >
        {label}
      </div>
      <div
        className="text-[13px] font-medium"
        style={{ color: "#222f30" }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-[11px] mt-0.5"
          style={{ color: "rgba(34, 47, 48, 0.5)" }}
        >
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
          backgroundColor: "#fff",
          border: "1px solid rgba(34, 47, 48, 0.08)",
          minHeight: "400px",
        }}
      >
        <div className="text-center">
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{ backgroundColor: "rgba(34, 47, 48, 0.04)" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(34,47,48,0.35)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20" />
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10" />
            </svg>
          </div>
          <p
            className="text-[14px]"
            style={{ color: "rgba(34, 47, 48, 0.5)" }}
          >
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
        backgroundColor: "#fff",
        border: "1px solid rgba(34, 47, 48, 0.08)",
      }}
    >
      <div className="p-6 h-full overflow-y-auto">
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <p
              className="text-[10px] uppercase tracking-widest mb-1"
              style={{ color: "rgba(34, 47, 48, 0.5)", fontWeight: 400 }}
            >
              {country.region}
            </p>
            <h2
              className="text-[1.5rem] font-medium tracking-[-0.02em]"
              style={{ color: "#222f30" }}
            >
              {country.country}
            </h2>
          </div>
          <ReadinessBadge label={statusValue} />
        </div>
        <p
          className="text-[13px] mb-5"
          style={{ color: "rgba(34, 47, 48, 0.6)" }}
        >
          {country.connectivity_role}
        </p>

        <div
          className="h-px w-full mb-5"
          style={{ backgroundColor: "rgba(34, 47, 48, 0.08)" }}
        />

        {/* Primary metrics */}
        <p
          className="text-[10px] uppercase tracking-widest mb-2.5"
          style={{ color: "rgba(34, 47, 48, 0.5)", fontWeight: 400 }}
        >
          {mode === "founder" ? "Infrastructure" : "Policy Signals"}
        </p>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {primaryMetrics.map((m) => <Metric key={m.label} {...m} />)}
        </div>

        {/* Infra context */}
        <p
          className="text-[10px] uppercase tracking-widest mb-2.5"
          style={{ color: "rgba(34, 47, 48, 0.5)", fontWeight: 400 }}
        >
          Infrastructure
        </p>
        <div className="grid grid-cols-2 gap-2 mb-5">
          {infraMetrics.map((m) => <Metric key={m.label} {...m} />)}
        </div>

        {/* Insight */}
        <div
          className="rounded-xl p-4 transition-colors duration-150"
          style={{
            backgroundColor: "rgba(34, 47, 48, 0.025)",
            borderLeft: "2px solid rgba(34, 47, 48, 0.2)",
          }}
        >
          <p
            className="text-[10px] uppercase tracking-widest mb-1.5"
            style={{ color: "rgba(34, 47, 48, 0.5)", fontWeight: 400 }}
          >
            Context
          </p>
          <p
            className="text-[13px] leading-[1.6]"
            style={{ color: "rgba(34, 47, 48, 0.75)" }}
          >
            {country.founder_insight}
          </p>
        </div>
      </div>
    </div>
  );
}

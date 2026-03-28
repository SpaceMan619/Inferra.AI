"use client";

import { useState, useRef } from "react";
import type { CountryData, ViewMode } from "@/types";
import ReadinessBadge from "./ReadinessBadge";

interface SourceEntry {
  primary_sources: string[];
  confidence: string;
  confidence_note: string;
}

interface CountryPanelProps {
  country: CountryData | null;
  mode: ViewMode;
  sources?: SourceEntry | null;
}

interface MetricProps {
  label: string;
  value: string;
  sub?: string;
}

function Metric({ label, value, sub }: MetricProps) {
  return (
    <div
      className="py-3 border-b"
      style={{ borderColor: "rgba(34,47,48,0.06)" }}
    >
      <div
        className="text-[10px] uppercase tracking-widest mb-1 font-normal"
        style={{ color: "rgba(34,47,48,0.4)" }}
      >
        {label}
      </div>
      <div
        className="text-[13px] leading-snug font-medium"
        style={{ color: "#222f30" }}
      >
        {value}
      </div>
      {sub && (
        <div
          className="text-[11px] mt-0.5 leading-snug font-normal"
          style={{ color: "rgba(34,47,48,0.5)" }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] uppercase tracking-widest mt-5 mb-0 font-normal"
      style={{ color: "rgba(34,47,48,0.4)" }}
    >
      {children}
    </p>
  );
}

const confidenceColors: Record<string, { bg: string; text: string; dot: string }> = {
  high:   { bg: "rgba(16,185,129,0.08)", text: "#059669", dot: "#10b981" },
  medium: { bg: "rgba(245,158,11,0.08)", text: "#b45309", dot: "#f59e0b" },
  low:    { bg: "rgba(239,68,68,0.08)",  text: "#dc2626", dot: "#ef4444" },
};

function SourcesSection({ sources }: { sources: SourceEntry }) {
  const [open, setOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const colors = confidenceColors[sources.confidence] ?? confidenceColors.medium;

  function toggle() {
    const next = !open;
    setOpen(next);
    if (next) {
      setTimeout(() => sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 120);
    }
  }

  return (
    <div ref={sectionRef} className="mt-5">
      {/* Header row */}
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between group"
        style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
      >
        <p
          className="text-[10px] uppercase tracking-widest font-normal"
          style={{ color: "rgba(34,47,48,0.4)" }}
        >
          Sources
        </p>
        <div className="flex items-center gap-2">
          {/* Confidence badge */}
          <span
            className="text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-full font-medium flex items-center gap-1"
            style={{ backgroundColor: colors.bg, color: colors.text }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: colors.dot }}
            />
            {sources.confidence}
          </span>
          {/* Chevron */}
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="rgba(34,47,48,0.35)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Collapsible body */}
      <div
        style={{
          overflow: "hidden",
          maxHeight: open ? "600px" : "0px",
          transition: "max-height 0.3s ease",
        }}
      >
        <div className="mt-3 space-y-1.5">
          {sources.primary_sources.map((src, i) => {
            // Split "Label: url" format into display + href
            const colonIdx = src.lastIndexOf(": ");
            const label = colonIdx > -1 ? src.slice(0, colonIdx) : src;
            const rawUrl = colonIdx > -1 ? src.slice(colonIdx + 2).trim() : "";
            const href = rawUrl ? (rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`) : null;

            return (
              <div
                key={i}
                className="flex items-start gap-2 py-2 border-b"
                style={{ borderColor: "rgba(34,47,48,0.06)" }}
              >
                <span
                  className="text-[10px] mt-0.5 shrink-0 font-mono"
                  style={{ color: "rgba(34,47,48,0.3)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0">
                  <p
                    className="text-[12px] leading-snug"
                    style={{ color: "#222f30" }}
                  >
                    {label}
                  </p>
                  {href && (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] break-all hover:underline"
                      style={{ color: "#4f46e5" }}
                    >
                      {rawUrl}
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Confidence note */}
        <p
          className="text-[11px] leading-[1.6] mt-3 pb-2"
          style={{ color: "rgba(34,47,48,0.45)" }}
        >
          {sources.confidence_note}
        </p>
      </div>
    </div>
  );
}

export default function CountryPanel({ country, mode, sources }: CountryPanelProps) {
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
    { label: "Latency to EU",   value: country.est_rtt_to_europe_ms },
    { label: "Compute",         value: country.ai_compute_availability },
    { label: "Readiness",       value: country.ai_inference_readiness },
  ];

  const policyMetrics: MetricProps[] = [
    { label: "Policy Signal",   value: country.ai_policy_signal },
    { label: "Data Governance", value: country.ai_data_governance_posture },
    { label: "Compute Policy",  value: country.ai_compute_policy_commitment },
    { label: "Cross-Border",    value: country.cross_border_ai_alignment },
  ];

  const infraMetrics: MetricProps[] = [
    { label: "Data Centers", value: country.active_data_centers, sub: country.dc_pipeline },
    { label: "Power",         value: country.power_reliability },
    { label: "Cloud",         value: country.cloud_maturity },
    { label: "Ops Friction",  value: country.ops_friction },
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
          className="text-[13px] mb-4"
          style={{ color: "rgba(34, 47, 48, 0.6)" }}
        >
          {country.connectivity_role}
        </p>

        <div
          className="h-px w-full"
          style={{ backgroundColor: "rgba(34, 47, 48, 0.08)" }}
        />

        {/* Primary metrics */}
        <SectionLabel>{mode === "founder" ? "AI Readiness" : "Policy Signals"}</SectionLabel>
        <div className="flex flex-col">
          {primaryMetrics.map((m) => <Metric key={m.label} {...m} />)}
        </div>

        {/* Infra context */}
        <SectionLabel>Infrastructure</SectionLabel>
        <div className="flex flex-col">
          {infraMetrics.map((m) => <Metric key={m.label} {...m} />)}
        </div>

        {/* Insight */}
        <div
          className="rounded-xl p-4 mt-5 transition-colors duration-150"
          style={{
            backgroundColor: "rgba(34, 47, 48, 0.025)",
            borderLeft: "2px solid #22c55e",
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

        {/* Sources */}
        {sources && <SourcesSection sources={sources} />}
      </div>
    </div>
  );
}

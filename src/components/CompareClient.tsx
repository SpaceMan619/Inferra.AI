"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { CountryData } from "@/types";
import RadarChart from "./RadarChart";

const COMPARE_STYLES = `
  @keyframes comp-fade-up {
    from { opacity: 0; transform: translateY(5px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .comp-insight { animation: comp-fade-up 0.28s ease both; }
  .comp-radar   { animation: comp-fade-up 0.22s ease both; }
`;

const COLOR_A = "#22c55e";
const COLOR_B = "#818cf8";

const READINESS_COLORS: Record<string, string> = {
  "Viable":           "#059669",
  "Emerging":         "#d97706",
  "Emerging (Early)": "#ea580c",
};
const READINESS_BG: Record<string, string> = {
  "Viable":           "rgba(5,150,105,0.1)",
  "Emerging":         "rgba(217,119,6,0.1)",
  "Emerging (Early)": "rgba(234,88,12,0.1)",
};

const SCORE_DIMS = [
  { key: "compute",      label: "Compute",      icon: "⬡" },
  { key: "connectivity", label: "Connectivity", icon: "◎" },
  { key: "power",        label: "Power",        icon: "◈" },
  { key: "policy",       label: "Policy",       icon: "◇" },
  { key: "ecosystem",    label: "Ecosystem",    icon: "◉" },
] as const;

const METRIC_ROWS: {
  label: string;
  field: keyof CountryData;
  type: "text" | "number";
  unit?: string;
  lowerIsBetter?: boolean;
}[] = [
  { label: "DCs (total)",     field: "dc_count_total",            type: "number" },
  { label: "AI-Capable DCs", field: "dc_ai_capable",             type: "number" },
  { label: "IT Load",         field: "it_load_mw",                type: "number", unit: "MW" },
  { label: "IXPs",            field: "ixp_count",                 type: "number" },
  { label: "Latency to EU",   field: "est_rtt_to_europe_ms",      type: "text",  lowerIsBetter: true },
  { label: "Inference Route", field: "primary_inference_route",   type: "text" },
  { label: "Cloud Maturity",  field: "cloud_maturity",            type: "text" },
  { label: "Compute Access",  field: "ai_compute_availability",   type: "text" },
  { label: "Power Grid",      field: "power_reliability",         type: "text" },
  { label: "Ops Friction",    field: "ops_friction",              type: "text" },
  { label: "Data Residency",  field: "data_residency_constraint", type: "text" },
  { label: "AI Strategy",     field: "ai_strategy_status",        type: "text" },
  { label: "Policy Signal",   field: "ai_policy_signal",          type: "text" },
];

// ─── Country Selector ─────────────────────────────────────────────────────

function CountrySelector({
  countries, selected, color, label, onSelect,
}: {
  countries: CountryData[];
  selected: CountryData;
  color: string;
  label: string;
  onSelect: (name: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(
    () => countries.filter(
      (c) =>
        c.country.toLowerCase().includes(search.toLowerCase()) ||
        c.region.toLowerCase().includes(search.toLowerCase()),
    ),
    [countries, search],
  );

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node))
        setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60);
    else setSearch("");
  }, [open]);

  return (
    <div ref={panelRef} className="relative flex flex-col min-w-0">
      <p className="text-[10px] uppercase tracking-widest mb-2 font-medium"
        style={{ color: "rgba(34,47,48,0.35)" }}>
        {label}
      </p>

      {/* Trigger — plain button, CSS transition only */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex-1 w-full text-left p-4 rounded-2xl flex flex-col"
        style={{
          backgroundColor: "#fff",
          border: `1.5px solid ${open ? color : "rgba(34,47,48,0.08)"}`,
          boxShadow: open ? `0 0 0 3px ${color}18` : "0 1px 4px rgba(34,47,48,0.04)",
          transition: "border-color 0.15s, box-shadow 0.15s",
        }}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1.5 overflow-hidden">
              <span
                className="text-[10px] font-normal px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
                style={{
                  backgroundColor: READINESS_BG[selected.ai_inference_readiness] || "rgba(34,47,48,0.06)",
                  color: READINESS_COLORS[selected.ai_inference_readiness] || "rgba(34,47,48,0.5)",
                }}
              >
                {selected.ai_inference_readiness}
              </span>
              <span className="text-[10px] truncate" style={{ color: "rgba(34,47,48,0.35)" }}>
                {selected.region}
              </span>
            </div>
            <h3
              className="text-[18px] font-semibold tracking-[-0.03em] truncate pb-1"
              style={{ color: "#222f30", transition: "opacity 0.1s" }}
            >
              {selected.country}
            </h3>
          </div>
          <div className="flex-shrink-0 flex flex-col items-end gap-1.5">
            <span
              className="text-[28px] font-bold tabular-nums leading-none block"
              style={{ color, transition: "opacity 0.1s" }}
            >
              {selected.readiness_score}
            </span>
            <span className="text-[10px]" style={{ color: "rgba(34,47,48,0.3)" }}>/ 100</span>
          </div>
        </div>

        {/* Spacer pushes bottom row to the card's bottom edge */}
        <div className="flex-1" />

        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-[11px] font-light leading-snug line-clamp-2" style={{ color: "rgba(34,47,48,0.45)" }}>
            {selected.connectivity_role}
          </span>
          <svg
            style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="rgba(34,47,48,0.3)" strokeWidth="2" strokeLinecap="round"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </div>
      </button>

      {/* Dropdown — single AnimatePresence for open/close only */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.13 }}
            className="absolute top-full left-0 right-0 mt-2 z-50 rounded-2xl overflow-hidden"
            style={{
              backgroundColor: "#fff",
              border: "1px solid rgba(34,47,48,0.08)",
              boxShadow: "0 12px 40px rgba(34,47,48,0.12), 0 4px 12px rgba(34,47,48,0.06)",
            }}
          >
            <div className="p-3 border-b" style={{ borderColor: "rgba(34,47,48,0.06)" }}>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search markets…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full text-[13px] px-3 py-2 rounded-xl outline-none"
                style={{ backgroundColor: "rgba(34,47,48,0.04)", color: "#222f30" }}
              />
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "240px" }}>
              {filtered.map((c) => {
                const isActive = c.country === selected.country;
                return (
                  <button
                    key={c.country}
                    onClick={() => { onSelect(c.country); setOpen(false); }}
                    className="w-full text-left flex items-center justify-between px-4 py-2.5"
                    style={{
                      backgroundColor: isActive ? `${color}10` : "transparent",
                      color: isActive ? color : "#222f30",
                      transition: "background-color 0.1s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.03)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.backgroundColor = "transparent";
                    }}
                  >
                    <span className="text-[13px]">{c.country}</span>
                    <span className="text-[12px] tabular-nums font-medium"
                      style={{ color: isActive ? color : "rgba(34,47,48,0.35)" }}>
                      {c.readiness_score}
                    </span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Dimension bar row ────────────────────────────────────────────────────
// Only the bars use motion — scaleX is a GPU compositor transform.
// Everything else is plain HTML.

function DimRow({
  label, icon, scoreA, scoreB, colorA, colorB, animKey,
}: {
  label: string; icon: string;
  scoreA: number; scoreB: number;
  colorA: string; colorB: string;
  nameA: string; nameB: string;
  index: number;
  animKey: string;
}) {
  const aWins = scoreA > scoreB;
  const bWins = scoreB > scoreA;

  return (
    <div className="grid gap-2" style={{ gridTemplateColumns: "1fr 48px 1fr" }}>
      <div className="flex items-center gap-2 justify-end">
        <span className="text-[12px] tabular-nums font-medium"
          style={{ color: aWins ? colorA : "rgba(34,47,48,0.4)" }}>
          {scoreA}
        </span>
        <div className="flex-1 flex justify-end" style={{ maxWidth: "140px" }}>
          <motion.div
            key={`a-${animKey}`}
            className="h-2 rounded-full"
            style={{ width: `${scoreA}%`, backgroundColor: `${colorA}${aWins ? "cc" : "55"}`, transformOrigin: "right center" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center gap-0.5">
        <span className="text-[14px]">{icon}</span>
        <span className="text-[9px] uppercase tracking-wider text-center leading-tight"
          style={{ color: "rgba(34,47,48,0.3)" }}>
          {label}
        </span>
      </div>

      <div className="flex items-center gap-2">
        <div className="flex-1" style={{ maxWidth: "140px" }}>
          <motion.div
            key={`b-${animKey}`}
            className="h-2 rounded-full"
            style={{ width: `${scoreB}%`, backgroundColor: `${colorB}${bWins ? "cc" : "55"}`, transformOrigin: "left center" }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <span className="text-[12px] tabular-nums font-medium"
          style={{ color: bWins ? colorB : "rgba(34,47,48,0.4)" }}>
          {scoreB}
        </span>
      </div>
    </div>
  );
}

// ─── Helpers ──────────────────────────────────────────────────────────────

function numericCompare(a: unknown, b: unknown): "a" | "b" | null {
  const aNum = typeof a === "number" ? a : parseFloat(String(a).replace(/[^0-9.-]/g, ""));
  const bNum = typeof b === "number" ? b : parseFloat(String(b).replace(/[^0-9.-]/g, ""));
  if (isNaN(aNum) || isNaN(bNum)) return null;
  if (aNum > bNum) return "a";
  if (bNum > aNum) return "b";
  return null;
}

// ─── Main ─────────────────────────────────────────────────────────────────

export default function CompareClient({ countries, onCountryChange, onGoToOverview }: {
  countries: CountryData[];
  onCountryChange?: (name: string) => void;
  onGoToOverview?: (name: string) => void;
}) {
  const [nameA, setNameA] = useState(() => countries[0]?.country ?? "");
  const [nameB, setNameB] = useState(() => countries[1]?.country ?? "");

  function pickA(name: string) { setNameA(name); onCountryChange?.(name); }
  function pickB(name: string) { setNameB(name); onCountryChange?.(name); }
  const [insightExpanded, setInsightExpanded] = useState(false);

  const countryA = useMemo(() => countries.find((c) => c.country === nameA) ?? countries[0], [countries, nameA]);
  const countryB = useMemo(() => countries.find((c) => c.country === nameB) ?? countries[1], [countries, nameB]);

  const scoreDelta = countryA.readiness_score - countryB.readiness_score;

  const radarKey = `${nameA}-${nameB}`;

  // Collapse insights whenever the selection changes
  const prevPairRef = useRef(radarKey);
  if (prevPairRef.current !== radarKey) {
    prevPairRef.current = radarKey;
    if (insightExpanded) setInsightExpanded(false);
  }

  return (
    <div className="flex flex-col gap-6 max-w-[1100px] mx-auto">
      <style>{COMPARE_STYLES}</style>

      {/* ── Selectors ────────────────────────────── */}
      <div className="grid gap-3 items-stretch" style={{ gridTemplateColumns: "1fr auto 1fr" }}>
        <CountrySelector countries={countries} selected={countryA}
          color={COLOR_A} label="Market A" onSelect={pickA} />

        <div className="flex items-center justify-center pt-6">
          <button
            onClick={() => { setNameA(nameB); setNameB(nameA); onCountryChange?.(nameB); }}
            className="flex items-center justify-center rounded-xl"
            style={{
              width: 40, height: 40,
              backgroundColor: "#fff",
              border: "1px solid rgba(34,47,48,0.08)",
              color: "rgba(34,47,48,0.4)",
              transition: "background-color 0.15s, transform 0.15s",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.04)"; e.currentTarget.style.transform = "scale(1.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff"; e.currentTarget.style.transform = "scale(1)"; }}
            title="Swap countries"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M8 3L4 7l4 4" /><path d="M4 7h16" />
              <path d="M16 21l4-4-4-4" /><path d="M20 17H4" />
            </svg>
          </button>
        </div>

        <CountrySelector countries={countries} selected={countryB}
          color={COLOR_B} label="Market B" onSelect={pickB} />
      </div>

      {/* ── Radar + Dimensions ───────────────────── */}
      <div className="flex gap-5 flex-col xl:flex-row">

        {/* Radar card — plain div, CSS transition */}
        <div className="rounded-2xl p-6 flex flex-col items-center gap-4"
          style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.08)", minWidth: 0 }}>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLOR_A }} />
              <button
                onClick={() => onGoToOverview?.(countryA.country)}
                className="text-[12px] font-medium transition-opacity duration-150 hover:opacity-60"
                style={{ color: "#222f30" }}
                title={`View ${countryA.country} in Overview`}
              >{countryA.country}</button>
            </div>
            <span className="text-[11px] font-light" style={{ color: "rgba(34,47,48,0.3)" }}>vs</span>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: COLOR_B }} />
              <button
                onClick={() => onGoToOverview?.(countryB.country)}
                className="text-[12px] font-medium transition-opacity duration-150 hover:opacity-60"
                style={{ color: "#222f30" }}
                title={`View ${countryB.country} in Overview`}
              >{countryB.country}</button>
            </div>
          </div>

          <div key={radarKey} className="comp-radar w-full" style={{ maxWidth: 280 }}>
            <RadarChart countryA={countryA} countryB={countryB}
              colorA={COLOR_A} colorB={COLOR_B} size={280} />
          </div>

          <div className="flex items-center gap-4 pt-2">
            <div className="text-center">
              <div className="text-[32px] font-bold leading-none tabular-nums" style={{ color: COLOR_A }}>
                {countryA.readiness_score}
              </div>
              <div className="text-[10px] mt-1 uppercase tracking-wider" style={{ color: "rgba(34,47,48,0.35)" }}>
                {countryA.country}
              </div>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div
                className="text-[11px] font-medium px-2.5 py-1 rounded-lg tabular-nums"
                style={{
                  backgroundColor: scoreDelta === 0 ? "rgba(34,47,48,0.05)"
                    : scoreDelta > 0 ? `${COLOR_A}18` : `${COLOR_B}18`,
                  color: scoreDelta === 0 ? "rgba(34,47,48,0.4)"
                    : scoreDelta > 0 ? COLOR_A : COLOR_B,
                }}
              >
                {scoreDelta === 0 ? "Tied" : scoreDelta > 0 ? `+${scoreDelta}` : scoreDelta}
              </div>
              <div className="text-[9px] uppercase tracking-wider" style={{ color: "rgba(34,47,48,0.25)" }}>delta</div>
            </div>
            <div className="text-center">
              <div className="text-[32px] font-bold leading-none tabular-nums" style={{ color: COLOR_B }}>
                {countryB.readiness_score}
              </div>
              <div className="text-[10px] mt-1 uppercase tracking-wider" style={{ color: "rgba(34,47,48,0.35)" }}>
                {countryB.country}
              </div>
            </div>
          </div>
        </div>

        {/* Dimension breakdown — plain div */}
        <div className="flex-1 rounded-2xl p-6 flex flex-col justify-between gap-5"
          style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.08)" }}>
          <div>
            <h3 className="text-[11px] uppercase tracking-widest font-medium mb-5"
              style={{ color: "rgba(34,47,48,0.35)" }}>
              Dimension Breakdown
            </h3>

            <div className="grid gap-2 mb-3" style={{ gridTemplateColumns: "1fr 48px 1fr" }}>
              <div className="flex items-center justify-end gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLOR_A }} />
                <button
                  onClick={() => onGoToOverview?.(countryA.country)}
                  className="text-[11px] font-medium truncate pb-0.5 transition-opacity duration-150 hover:opacity-60"
                  style={{ color: "#222f30" }}
                  title={`View ${countryA.country} in Overview`}
                >{countryA.country}</button>
              </div>
              <div />
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: COLOR_B }} />
                <button
                  onClick={() => onGoToOverview?.(countryB.country)}
                  className="text-[11px] font-medium truncate pb-0.5 transition-opacity duration-150 hover:opacity-60"
                  style={{ color: "#222f30" }}
                  title={`View ${countryB.country} in Overview`}
                >{countryB.country}</button>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {SCORE_DIMS.map(({ key, label, icon }, i) => (
                <DimRow
                  key={key} label={label} icon={icon} index={i}
                  scoreA={countryA.scores[key]} scoreB={countryB.scores[key]}
                  colorA={COLOR_A} colorB={COLOR_B}
                  nameA={countryA.country} nameB={countryB.country}
                  animKey={radarKey}
                />
              ))}
            </div>
          </div>

          {/* Insight snippets */}
          <div className="pt-2 border-t" style={{ borderColor: "rgba(34,47,48,0.06)" }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
              {([countryA, countryB] as const).map((c, i) => (
                <div key={`insight-${i}-${c.country}`} className="comp-insight p-3 rounded-xl"
                  style={{ backgroundColor: "rgba(34,47,48,0.025)" }}>
                  <button
                    onClick={() => onGoToOverview?.(c.country)}
                    className="text-[10px] uppercase tracking-wider mb-1.5 font-medium transition-opacity duration-150 hover:opacity-60"
                    style={{ color: i === 0 ? COLOR_A : COLOR_B }}
                    title={`View ${c.country} in Overview`}
                  >
                    {c.country}
                  </button>
                  <p
                    className={`text-[11px] font-light leading-[1.6] pb-1 ${insightExpanded ? "" : "line-clamp-3"}`}
                    style={{ color: "rgba(34,47,48,0.6)" }}>
                    {c.founder_insight}
                  </p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setInsightExpanded((v) => !v)}
              className="flex items-center gap-1.5 mx-auto text-[11px] font-medium transition-colors duration-150"
              style={{ color: "rgba(34,47,48,0.4)" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#222f30"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(34,47,48,0.4)"; }}
            >
              {insightExpanded ? "Show less" : "Read more"}
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                style={{ transition: "transform 0.2s", transform: insightExpanded ? "rotate(180deg)" : "rotate(0deg)" }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* ── Metrics table — all plain divs ───────── */}
      <div className="rounded-2xl overflow-hidden"
        style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.08)" }}>
        <div className="px-6 py-4 border-b" style={{ borderColor: "rgba(34,47,48,0.06)" }}>
          <h3 className="text-[11px] uppercase tracking-widest font-medium"
            style={{ color: "rgba(34,47,48,0.35)" }}>Key Metrics</h3>
        </div>

        <div className="grid px-6 py-2.5 text-[10px] uppercase tracking-wider"
          style={{ gridTemplateColumns: "1fr 1fr 1fr", color: "rgba(34,47,48,0.35)" }}>
          <span>Metric</span>
          <span style={{ color: COLOR_A }}>{countryA.country}</span>
          <span style={{ color: COLOR_B }}>{countryB.country}</span>
        </div>

        {METRIC_ROWS.map((row, idx) => {
          const valA = countryA[row.field];
          const valB = countryB[row.field];
          const winner = row.type === "number" ? numericCompare(valA, valB) : null;
          const winnerA = winner === (row.lowerIsBetter ? "b" : "a");
          const winnerB = winner === (row.lowerIsBetter ? "a" : "b");
          const displayA = row.unit ? `${valA} ${row.unit}` : String(valA);
          const displayB = row.unit ? `${valB} ${row.unit}` : String(valB);

          const isText = row.type === "text";
          return (
            <div key={row.label} className="grid px-6 py-3 text-[13px] items-start"
              style={{
                gridTemplateColumns: "1fr 1fr 1fr",
                backgroundColor: idx % 2 === 0 ? "rgba(34,47,48,0.015)" : "transparent",
                borderTop: "1px solid rgba(34,47,48,0.04)",
              }}>
              <span className="font-light pt-0.5" style={{ color: "rgba(34,47,48,0.5)" }}>{row.label}</span>
              <span
                className={isText ? "line-clamp-2 leading-snug pr-4" : ""}
                title={isText ? displayA : undefined}
                style={{ color: winnerA ? COLOR_A : "#222f30", fontWeight: winnerA ? 500 : 400 }}
              >{displayA}</span>
              <span
                className={isText ? "line-clamp-2 leading-snug pr-2" : ""}
                title={isText ? displayB : undefined}
                style={{ color: winnerB ? COLOR_B : "#222f30", fontWeight: winnerB ? 500 : 400 }}
              >{displayB}</span>
            </div>
          );
        })}
      </div>

      <div className="h-4 lg:h-0" />
    </div>
  );
}

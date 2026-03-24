"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { BriefInputs, BriefResult } from "./advisorTypes";

const ACCENT = "#22c55e";

const CONFIDENCE_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  "High confidence": { bg: "rgba(5,150,105,0.08)", text: "#065f46", border: "rgba(5,150,105,0.25)" },
  "Medium confidence": { bg: "rgba(217,119,6,0.08)", text: "#92400e", border: "rgba(217,119,6,0.25)" },
  "Exploratory": { bg: "rgba(234,88,12,0.08)", text: "#7c2d12", border: "rgba(234,88,12,0.25)" },
};

const RANK_COLORS = ["#222f30", "#475569", "#94a3b8"];

interface Props {
  inputs: BriefInputs;
  result: BriefResult;
  onSave: () => void;
  onNewBrief: () => void;
  onBackToLanding: () => void;
  onGoToOverview: (country: string) => void;
  onGoToCompare: () => void;
}

function Section({ title, delay = 0, children }: { title: string; delay?: number; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6"
    >
      <p className="text-[11px] uppercase tracking-widest font-medium mb-3" style={{ color: "rgba(34,47,48,0.35)" }}>
        {title}
      </p>
      {children}
    </motion.div>
  );
}

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-2xl p-4 ${className}`}
      style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.08)" }}
    >
      {children}
    </div>
  );
}

export default function AdvisorResults({
  result,
  onSave,
  onNewBrief,
  onBackToLanding,
  onGoToOverview,
  onGoToCompare,
}: Props) {
  const [saved, setSaved] = useState(false);
  const conf = CONFIDENCE_COLORS[result.confidenceTier] ?? CONFIDENCE_COLORS["Exploratory"];

  function handleSave() {
    onSave();
    setSaved(true);
  }

  return (
    <div className="max-w-[720px] mx-auto">

      {/* ── Header bar ── */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-start justify-between gap-4 flex-wrap mb-7"
      >
        <div>
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span
              className="text-[11px] font-medium px-2.5 py-1 rounded-full"
              style={{ backgroundColor: conf.bg, color: conf.text, border: `1px solid ${conf.border}` }}
            >
              {result.confidenceTier}
            </span>
          </div>
          <h2 className="text-[24px] sm:text-[28px] font-bold tracking-[-0.03em] leading-tight mb-1" style={{ color: "#222f30" }}>
            {result.strategyLabel}
          </h2>
          <p className="text-[13px] font-light" style={{ color: "rgba(34,47,48,0.5)" }}>
            {result.confidenceExplanation}
          </p>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
          {!saved ? (
            <button
              onClick={handleSave}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-medium transition-all duration-200"
              style={{ backgroundColor: `${ACCENT}12`, color: "#166534", border: `1px solid ${ACCENT}30` }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = `${ACCENT}20`; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = `${ACCENT}12`; }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" /><polyline points="17 21 17 13 7 13 7 21" /><polyline points="7 3 7 8 15 8" />
              </svg>
              Save Brief
            </button>
          ) : (
            <span
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-medium"
              style={{ backgroundColor: `${ACCENT}12`, color: "#166534" }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              Saved
            </span>
          )}
          <button
            onClick={onNewBrief}
            className="px-4 py-2 rounded-xl text-[12px] font-medium transition-all duration-200"
            style={{ backgroundColor: "rgba(34,47,48,0.06)", color: "rgba(34,47,48,0.7)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.06)"; }}
          >
            New Brief
          </button>
          <button
            onClick={onBackToLanding}
            className="px-4 py-2 rounded-xl text-[12px] font-medium transition-all duration-200"
            style={{ backgroundColor: "rgba(34,47,48,0.06)", color: "rgba(34,47,48,0.7)" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.1)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.06)"; }}
          >
            ← All Briefs
          </button>
        </div>
      </motion.div>

      {/* ── Strategy summary ── */}
      <Section title="Strategic Summary" delay={0.05}>
        <Card>
          <p className="text-[14px] leading-relaxed font-light" style={{ color: "rgba(34,47,48,0.8)" }}>
            {result.strategySummary}
          </p>
        </Card>
      </Section>

      {/* ── Ranked markets ── */}
      <Section title="Ranked Markets" delay={0.1}>
        <div className="flex flex-col gap-3">
          {result.rankedMarkets.map((m, i) => (
            <Card key={m.country}>
              <div className="flex items-start gap-3">
                <span
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: i === 0 ? "#222f30" : "rgba(34,47,48,0.08)", color: i === 0 ? "#fff" : RANK_COLORS[i] }}
                >
                  {m.rank}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                    <p className="text-[15px] font-semibold" style={{ color: "#222f30" }}>{m.country}</p>
                    <span className="text-[11px] font-medium" style={{ color: "rgba(34,47,48,0.4)" }}>{m.keyMetric}</span>
                  </div>
                  <p className="text-[12px] font-light leading-relaxed mb-1.5" style={{ color: "rgba(34,47,48,0.65)" }}>
                    {m.whyItFits}
                  </p>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "rgba(34,47,48,0.06)", color: "rgba(34,47,48,0.55)" }}>
                      Route: {m.routeAlignment}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: "rgba(239,68,68,0.07)", color: "#b91c1c" }}>
                      ⚠ {m.majorTradeoff}
                    </span>
                  </div>
                  {i === 0 && (
                    <button
                      onClick={() => onGoToOverview(m.country)}
                      className="mt-2 text-[11px] font-medium flex items-center gap-1 transition-colors"
                      style={{ color: ACCENT }}
                      onMouseEnter={(e) => { e.currentTarget.style.color = "#16a34a"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.color = ACCENT; }}
                    >
                      Open in Overview →
                    </button>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* ── Recommended route ── */}
      <Section title="Recommended Route" delay={0.15}>
        <Card>
          <p className="text-[13px] font-semibold mb-2" style={{ color: "#222f30" }}>{result.recommendedRoute}</p>
          <p className="text-[13px] font-light leading-relaxed mb-3" style={{ color: "rgba(34,47,48,0.7)" }}>
            {result.routeExplanation}
          </p>
          <div
            className="flex items-start gap-2 rounded-xl p-3 text-[12px] font-light"
            style={{ backgroundColor: "rgba(245,158,11,0.07)", border: "1px solid rgba(245,158,11,0.2)" }}
          >
            <span style={{ color: "#b45309" }}>⚠</span>
            <span style={{ color: "#92400e" }}>{result.routeCompromise}</span>
          </div>
        </Card>
      </Section>

      {/* ── Gains & Givens ── */}
      <Section title="Gains & Givens" delay={0.2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Card>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: ACCENT }}>You gain</p>
            <ul className="flex flex-col gap-2">
              {result.gains.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] font-light" style={{ color: "rgba(34,47,48,0.75)" }}>
                  <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: ACCENT }} />
                  {g}
                </li>
              ))}
            </ul>
          </Card>
          <Card>
            <p className="text-[11px] font-semibold uppercase tracking-widest mb-3" style={{ color: "#d97706" }}>You give up</p>
            <ul className="flex flex-col gap-2">
              {result.givens.map((g, i) => (
                <li key={i} className="flex items-start gap-2 text-[13px] font-light" style={{ color: "rgba(34,47,48,0.75)" }}>
                  <span className="mt-1 flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#d97706" }} />
                  {g}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Section>

      {/* ── Risks ── */}
      <Section title="Risks to Monitor" delay={0.25}>
        <Card>
          <ul className="flex flex-col gap-3">
            {result.risks.map((r, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ backgroundColor: "rgba(239,68,68,0.1)" }}>
                  <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                </span>
                <p className="text-[13px] font-light leading-relaxed" style={{ color: "rgba(34,47,48,0.75)" }}>{r}</p>
              </li>
            ))}
          </ul>
        </Card>
      </Section>

      {/* ── Why not others ── */}
      {result.whyNotAlternatives.length > 0 && (
        <Section title="Why Not the Others?" delay={0.3}>
          <div className="flex flex-col gap-2">
            {result.whyNotAlternatives.map((alt) => (
              <Card key={alt.country}>
                <p className="text-[13px] font-semibold mb-1" style={{ color: "#222f30" }}>{alt.country}</p>
                <p className="text-[12px] font-light mb-1" style={{ color: "rgba(34,47,48,0.6)" }}>{alt.whatItDoes}</p>
                <p className="text-[12px] font-light" style={{ color: "#b91c1c" }}>{alt.whyItLost}</p>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* ── Suggested next move ── */}
      <Section title="Suggested Next Move" delay={0.35}>
        <Card>
          <div className="flex items-start gap-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-xl flex items-center justify-center mt-0.5" style={{ backgroundColor: `${ACCENT}12` }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={ACCENT} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            </span>
            <div>
              <p className="text-[13px] font-light leading-relaxed mb-3" style={{ color: "rgba(34,47,48,0.75)" }}>
                {result.suggestedNextMove}
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => onGoToOverview(result.primaryMarket)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-medium text-white transition-all duration-200"
                  style={{ backgroundColor: "#222f30" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#2d3f40"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#222f30"; }}
                >
                  Open {result.primaryMarket} →
                </button>
                <button
                  onClick={onGoToCompare}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-medium transition-all duration-200"
                  style={{ backgroundColor: "rgba(34,47,48,0.06)", color: "rgba(34,47,48,0.7)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.06)"; }}
                >
                  Compare Markets
                </button>
              </div>
            </div>
          </div>
        </Card>
      </Section>

      <div className="h-16" />
    </div>
  );
}

"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { SavedBrief } from "./advisorTypes";

const ACCENT = "#22c55e";

interface Props {
  savedBriefs: SavedBrief[];
  onStart: () => void;
  onDeleteBrief: (id: string) => void;
  onViewBrief: (brief: SavedBrief) => void;
}

const PERSONA_LABELS: Record<string, string> = {
  founder: "Founder / Builder",
  operator: "Operator / Infrastructure",
  policy: "Policy / Public Sector",
  research: "Research / Strategy",
};

const WORKLOAD_LABELS: Record<string, string> = {
  startup: "Startup product / SaaS",
  enterprise: "Enterprise AI system",
  government: "Government deployment",
  research: "Research deployment",
  sovereign: "Sovereign AI initiative",
  exploration: "General exploration",
};

const CONFIDENCE_COLORS: Record<string, string> = {
  "High confidence": "#059669",
  "Medium confidence": "#d97706",
  "Exploratory": "#ea580c",
};

export default function AdvisorLanding({ savedBriefs, onStart, onDeleteBrief, onViewBrief }: Props) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  return (
    <div className="max-w-[860px] mx-auto">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="mb-10"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h2
              className="text-[13px] uppercase tracking-widest font-medium mb-3"
              style={{ color: ACCENT }}
            >
              New Feature
            </h2>
            <p
              className="text-[28px] sm:text-[32px] font-bold tracking-[-0.03em] mb-3 leading-tight"
              style={{ color: "#222f30" }}
            >
              Deployment Advisor
            </p>
            <p
              className="text-[15px] font-light leading-relaxed max-w-[540px]"
              style={{ color: "rgba(34,47,48,0.6)" }}
            >
              Answer 7 questions about your constraints, priorities, and workload.
              Get a strategic deployment brief with ranked markets, route recommendations, and tradeoffs — built from Inferra&apos;s infrastructure data.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 mt-7 flex-wrap">
          <button
            onClick={onStart}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-[14px] font-medium text-white transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: "#222f30" }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#2d3f40"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#222f30"; }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            Start New Brief
          </button>
          <p className="text-[12px] font-light" style={{ color: "rgba(34,47,48,0.35)" }}>
            ~2 min · saved locally in this browser
          </p>
        </div>
      </motion.div>

      {/* What to expect */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10"
      >
        {[
          { icon: "◎", label: "Guided flow", desc: "One question at a time. 7 steps, no fluff." },
          { icon: "◇", label: "Ranked markets", desc: "3 markets ranked by fit for your specific constraints." },
          { icon: "◈", label: "Strategic brief", desc: "Route, tradeoffs, risks, and a confidence rating." },
        ].map((item) => (
          <div
            key={item.label}
            className="rounded-2xl p-5"
            style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.08)" }}
          >
            <span className="text-[20px] block mb-2">{item.icon}</span>
            <p className="text-[13px] font-medium mb-1" style={{ color: "#222f30" }}>{item.label}</p>
            <p className="text-[12px] font-light leading-relaxed" style={{ color: "rgba(34,47,48,0.5)" }}>{item.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Saved briefs */}
      {savedBriefs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <p
            className="text-[11px] uppercase tracking-widest font-medium mb-3"
            style={{ color: "rgba(34,47,48,0.35)" }}
          >
            Saved Briefs
          </p>
          <div className="flex flex-col gap-2">
            {savedBriefs.map((brief) => (
              <div
                key={brief.id}
                className="rounded-2xl p-4 flex items-center justify-between gap-4"
                style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.08)" }}
              >
                <button
                  onClick={() => onViewBrief(brief)}
                  className="flex-1 text-left min-w-0"
                >
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="text-[11px] font-medium px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: `${CONFIDENCE_COLORS[brief.confidenceTier] ?? "#222f30"}15`,
                        color: CONFIDENCE_COLORS[brief.confidenceTier] ?? "#222f30",
                      }}
                    >
                      {brief.confidenceTier}
                    </span>
                    <span className="text-[11px]" style={{ color: "rgba(34,47,48,0.35)" }}>
                      {new Date(brief.savedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <p className="text-[14px] font-semibold truncate" style={{ color: "#222f30" }}>
                    {brief.strategyLabel}
                  </p>
                  <p className="text-[12px] font-light mt-0.5" style={{ color: "rgba(34,47,48,0.5)" }}>
                    {PERSONA_LABELS[brief.persona]} · {WORKLOAD_LABELS[brief.workload]} · {brief.topMarket}
                  </p>
                </button>

                {confirmDeleteId === brief.id ? (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button
                      onClick={() => { onDeleteBrief(brief.id); setConfirmDeleteId(null); }}
                      className="text-[12px] font-medium text-red-500 hover:text-red-700 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="text-[12px]"
                      style={{ color: "rgba(34,47,48,0.4)" }}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(brief.id)}
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200"
                    style={{ color: "rgba(34,47,48,0.3)" }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = "#ef4444"; e.currentTarget.style.backgroundColor = "rgba(239,68,68,0.08)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(34,47,48,0.3)"; e.currentTarget.style.backgroundColor = "transparent"; }}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /><path d="M9 6V4h6v2" />
                    </svg>
                  </button>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <div className="h-16" />
    </div>
  );
}

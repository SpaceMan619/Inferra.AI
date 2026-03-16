"use client";

import { useState } from "react";
import type { CountryData } from "@/types";

interface CountryListProps {
  countries: CountryData[];
  selected: string;
  onSelect: (name: string) => void;
  height?: number;
  fill?: boolean;
}

function tierDot(score: number) {
  if (score >= 60) return "#22c55e";
  if (score >= 40) return "#d97706";
  return "#dc2626";
}

export default function CountryList({
  countries,
  selected,
  onSelect,
  height,
  fill,
}: CountryListProps) {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? countries.filter((c) =>
        c.country.toLowerCase().includes(query.toLowerCase()) ||
        c.region?.toLowerCase().includes(query.toLowerCase())
      )
    : countries;

  return (
    <div
      className={`rounded-2xl overflow-hidden flex flex-col ${fill ? "flex-1 min-h-0" : ""}`}
      style={{
        backgroundColor: "#fff",
        border: "1px solid rgba(34, 47, 48, 0.08)",
        height: height ?? (fill ? "100%" : "auto"),
        maxHeight: height ?? (fill ? undefined : "min(520px, 50vh)"),
      }}
    >
      {/* Header + search */}
      <div
        className="px-4 pt-4 pb-3 flex-shrink-0"
        style={{ borderBottom: "1px solid rgba(34, 47, 48, 0.07)" }}
      >
        <p
          className="text-[10px] uppercase tracking-widest mb-2.5"
          style={{ color: "rgba(34, 47, 48, 0.45)", fontWeight: 400 }}
        >
          Markets
        </p>
        <div className="relative">
          <svg
            className="absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="rgba(34,47,48,0.35)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 rounded-lg text-[12px] outline-none transition-all duration-150"
            style={{
              backgroundColor: "rgba(34, 47, 48, 0.04)",
              border: "1px solid rgba(34, 47, 48, 0.08)",
              color: "#222f30",
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = "rgba(34, 47, 48, 0.22)";
              e.currentTarget.style.backgroundColor = "rgba(34, 47, 48, 0.06)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = "rgba(34, 47, 48, 0.08)";
              e.currentTarget.style.backgroundColor = "rgba(34, 47, 48, 0.04)";
            }}
          />
        </div>
      </div>

      {/* Scrollable list */}
      <div className="flex-1 overflow-y-auto px-2 py-2">
        {filtered.length === 0 && (
          <p
            className="text-[12px] text-center py-6"
            style={{ color: "rgba(34, 47, 48, 0.4)" }}
          >
            No results
          </p>
        )}
        {filtered.map((c) => {
          const isActive = selected === c.country;
          const dot = tierDot(c.readiness_score);
          return (
            <button
              key={c.country}
              onClick={() => onSelect(c.country)}
              className="w-full text-left px-3 py-2 rounded-xl flex items-center gap-2.5 group transition-all duration-150"
              style={{
                backgroundColor: isActive
                  ? "rgba(34, 47, 48, 0.07)"
                  : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor =
                    "rgba(34, 47, 48, 0.04)";
              }}
              onMouseLeave={(e) => {
                if (!isActive)
                  e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {/* Coloured tier dot */}
              <span
                className="flex-shrink-0 w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: dot }}
              />

              {/* Country name */}
              <span
                className="flex-1 text-[12.5px] truncate pb-0.5"
                style={{
                  color: isActive ? "#222f30" : "rgba(34, 47, 48, 0.72)",
                  fontWeight: isActive ? 500 : 400,
                }}
              >
                {c.country}
              </span>

              {/* Score */}
              <span
                className="flex-shrink-0 text-[11px] tabular-nums"
                style={{ color: isActive ? "#222f30" : "rgba(34, 47, 48, 0.38)", fontWeight: isActive ? 500 : 400 }}
              >
                {c.readiness_score}
              </span>
            </button>
          );
        })}
      </div>

      {/* Footer count */}
      <div
        className="px-4 py-2.5 flex-shrink-0 flex items-center justify-between"
        style={{ borderTop: "1px solid rgba(34, 47, 48, 0.06)" }}
      >
        <span
          className="text-[10px] font-light tabular-nums"
          style={{ color: "rgba(34, 47, 48, 0.35)" }}
        >
          {filtered.length} of {countries.length}
        </span>
        <span className="flex items-center gap-2.5 text-[10px]" style={{ color: "rgba(34, 47, 48, 0.35)" }}>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#22c55e" }} /> Viable</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#d97706" }} /> Emerging</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#dc2626" }} /> Early</span>
        </span>
      </div>
    </div>
  );
}

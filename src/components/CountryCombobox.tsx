"use client";

import { useState, useRef, useEffect } from "react";
import type { CountryData } from "@/types";

function tierDot(score: number) {
  if (score >= 60) return "#22c55e";
  if (score >= 40) return "#d97706";
  return "#dc2626";
}

interface CountryComboboxProps {
  countries: CountryData[];
  selected: string;
  onSelect: (name: string) => void;
}

export default function CountryCombobox({
  countries,
  selected,
  onSelect,
}: CountryComboboxProps) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const selectedCountry = countries.find((c) => c.country === selected);

  const filtered = query.trim()
    ? countries.filter((c) =>
        c.country.toLowerCase().includes(query.toLowerCase())
      )
    : countries;

  useEffect(() => {
    if (!open) return;
    function onClickOutside(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function handleSelect(name: string) {
    onSelect(name);
    setOpen(false);
    setQuery("");
  }

  const dot = selectedCountry
    ? tierDot(selectedCountry.readiness_score)
    : "#dc2626";

  return (
    <div ref={containerRef} className="relative mb-3">
      {/* Trigger */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl transition-all duration-150"
        style={{
          backgroundColor: "#fff",
          border: "1px solid rgba(34, 47, 48, 0.1)",
          boxShadow: open
            ? "0 0 0 2px rgba(34,47,48,0.08)"
            : "none",
        }}
      >
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: dot }}
        />
        <span
          className="flex-1 text-left text-[13px] font-medium tracking-[-0.01em] truncate"
          style={{ color: "#222f30" }}
        >
          {selected}
        </span>
        <span
          className="text-[11px] tabular-nums mr-1"
          style={{ color: "rgba(34,47,48,0.45)" }}
        >
          {selectedCountry?.readiness_score}
        </span>
        {/* Chevron */}
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="rgba(34,47,48,0.4)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`flex-shrink-0 transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div
          className="absolute top-full left-0 right-0 mt-1.5 rounded-xl overflow-hidden z-50"
          style={{
            backgroundColor: "#fff",
            border: "1px solid rgba(34, 47, 48, 0.1)",
            boxShadow:
              "0 8px 24px rgba(34,47,48,0.1), 0 2px 6px rgba(34,47,48,0.06)",
          }}
        >
          {/* Search input */}
          <div
            className="p-2.5"
            style={{ borderBottom: "1px solid rgba(34,47,48,0.07)" }}
          >
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
                ref={inputRef}
                type="text"
                placeholder="Search markets…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 rounded-lg text-[12px] outline-none transition-all duration-150"
                style={{
                  backgroundColor: "rgba(34,47,48,0.04)",
                  border: "1px solid rgba(34,47,48,0.08)",
                  color: "#222f30",
                }}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor = "rgba(34,47,48,0.22)";
                  e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.06)";
                }}
                onBlur={(e) => {
                  e.currentTarget.style.borderColor = "rgba(34,47,48,0.08)";
                  e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.04)";
                }}
              />
            </div>
          </div>

          {/* Scrollable list */}
          <div className="overflow-y-auto max-h-[240px] px-1.5 py-1.5">
            {filtered.length === 0 && (
              <p
                className="text-[12px] text-center py-4"
                style={{ color: "rgba(34,47,48,0.4)" }}
              >
                No results
              </p>
            )}
            {filtered.map((c) => {
              const isActive = c.country === selected;
              return (
                <button
                  key={c.country}
                  onClick={() => handleSelect(c.country)}
                  className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center gap-2 transition-all duration-100"
                  style={{
                    backgroundColor: isActive
                      ? "rgba(34,47,48,0.07)"
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor =
                        "rgba(34,47,48,0.04)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.backgroundColor = "transparent";
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: tierDot(c.readiness_score) }}
                  />
                  <span
                    className="flex-1 text-[12.5px] truncate pb-0.5"
                    style={{
                      color: isActive ? "#222f30" : "rgba(34,47,48,0.72)",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {c.country}
                  </span>
                  <span
                    className="text-[11px] tabular-nums"
                    style={{
                      color: isActive ? "#222f30" : "rgba(34,47,48,0.38)",
                      fontWeight: isActive ? 500 : 400,
                    }}
                  >
                    {c.readiness_score}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Footer legend */}
          <div
            className="px-3.5 py-2 flex items-center gap-3"
            style={{ borderTop: "1px solid rgba(34,47,48,0.06)" }}
          >
            <span
              className="text-[10px] tabular-nums"
              style={{ color: "rgba(34,47,48,0.35)" }}
            >
              {filtered.length} of {countries.length}
            </span>
            <span className="flex items-center gap-2.5 ml-auto text-[10px]" style={{ color: "rgba(34,47,48,0.35)" }}>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#22c55e" }} />
                Viable
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#d97706" }} />
                Emerging
              </span>
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full inline-block" style={{ backgroundColor: "#dc2626" }} />
                Early
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

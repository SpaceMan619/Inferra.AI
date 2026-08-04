"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { CountryData } from "@/types";

const ROUTES = ["Local-Native", "Hybrid-Edge", "Regional-Tethered"] as const;

function readinessStyle(label: string) {
  if (label === "Viable") return { color: "#047857", backgroundColor: "rgba(16,185,129,0.1)" };
  if (label === "Emerging") return { color: "#b45309", backgroundColor: "rgba(245,158,11,0.1)" };
  return { color: "#c2410c", backgroundColor: "rgba(239,68,68,0.08)" };
}

function firstSentence(value: string) {
  const stop = value.search(/[.!?](?:\s|$)/);
  return stop === -1 ? value : value.slice(0, stop + 1);
}

interface MarketsDirectoryProps {
  countries: CountryData[];
  onOpenOverview: (country: string) => void;
}

export default function MarketsDirectory({ countries, onOpenOverview }: MarketsDirectoryProps) {
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState("all");
  const [route, setRoute] = useState("all");
  const [selectedName, setSelectedName] = useState(countries[0]?.country ?? "");
  const [thesisOpen, setThesisOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
    }
    document.addEventListener("keydown", handleShortcut);
    return () => document.removeEventListener("keydown", handleShortcut);
  }, []);

  const regions = useMemo(
    () => [...new Set(countries.map((country) => country.region).filter(Boolean))].sort(),
    [countries],
  );

  const routeCounts = useMemo(
    () => Object.fromEntries(ROUTES.map((item) => [item, countries.filter((country) => country.primary_inference_route === item).length])),
    [countries],
  );

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return countries.filter((country) => {
      const matchesRoute = route === "all" || country.primary_inference_route === route;
      const matchesRegion = region === "all" || country.region === region;
      const matchesQuery = !needle || `${country.country} ${country.region} ${country.connectivity_role} ${country.primary_inference_route}`.toLowerCase().includes(needle);
      return matchesRoute && matchesRegion && matchesQuery;
    });
  }, [countries, query, region, route]);

  const selected = countries.find((country) => country.country === selectedName) ?? countries[0];

  function resetFilters() {
    setQuery("");
    setRegion("all");
    setRoute("all");
  }

  if (!selected) return null;

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">
        <div
          className="flex items-center gap-1 p-1 rounded-xl overflow-x-auto"
          style={{ backgroundColor: "rgba(255,255,255,0.7)", border: "1px solid rgba(34,47,48,0.08)" }}
        >
          {[
            { key: "all", label: "All markets", count: countries.length },
            ...ROUTES.map((item) => ({ key: item, label: item.replace("-", " "), count: routeCounts[item] ?? 0 })),
          ].map((item) => {
            const active = route === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setRoute(item.key)}
                className="h-10 px-3.5 rounded-lg flex items-center gap-2 whitespace-nowrap text-[13px] transition-all duration-150"
                style={{
                  color: active ? "#222f30" : "rgba(34,47,48,0.58)",
                  backgroundColor: active ? "#fff" : "transparent",
                  boxShadow: active ? "0 1px 5px rgba(34,47,48,0.07)" : "none",
                  fontWeight: active ? 500 : 400,
                }}
              >
                {item.label}
                <span className="text-[11px] tabular-nums" style={{ color: "rgba(34,47,48,0.38)" }}>{item.count}</span>
              </button>
            );
          })}
        </div>

        <div className="flex gap-2 min-w-0">
          <label
            className="h-11 px-3.5 rounded-xl flex items-center gap-2 flex-1 xl:w-[240px] xl:flex-none"
            style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.08)" }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(34,47,48,0.38)" strokeWidth="1.7" strokeLinecap="round">
              <circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" />
            </svg>
            <span className="sr-only">Search markets</span>
            <input
              ref={searchRef}
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search markets"
              className="min-w-0 flex-1 bg-transparent outline-none text-[13px]"
              style={{ color: "#222f30" }}
            />
            <kbd
              className="hidden sm:block px-1.5 py-0.5 rounded text-[10px]"
              style={{ color: "rgba(34,47,48,0.38)", backgroundColor: "#f7f7f5", border: "1px solid rgba(34,47,48,0.08)" }}
            >
              ⌘ K
            </kbd>
          </label>

          <label className="relative h-11 rounded-xl" style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.08)" }}>
            <span className="sr-only">Filter by region</span>
            <select
              value={region}
              onChange={(event) => setRegion(event.target.value)}
              className="h-full appearance-none bg-transparent pl-3.5 pr-9 outline-none text-[13px]"
              style={{ color: "rgba(34,47,48,0.62)" }}
            >
              <option value="all">All regions</option>
              {regions.map((item) => <option key={item}>{item}</option>)}
            </select>
            <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="rgba(34,47,48,0.4)" strokeWidth="1.8" strokeLinecap="round">
              <path d="m8 10 4 4 4-4" />
            </svg>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[minmax(600px,1.25fr)_minmax(360px,0.75fr)] gap-4 items-start">
        <section className="rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.08)" }}>
          <div className="px-5 py-4 flex items-end justify-between gap-4" style={{ borderBottom: "1px solid rgba(34,47,48,0.07)" }}>
            <div>
              <p className="text-[11px] uppercase tracking-widest mb-1" style={{ color: "rgba(34,47,48,0.38)" }}>Market directory</p>
              <p className="text-[17px] font-medium tracking-[-0.02em]" style={{ color: "#222f30" }}>{filtered.length} countries</p>
            </div>
            <p className="hidden sm:block text-[12px]" style={{ color: "rgba(34,47,48,0.4)" }}>Select a row for a deployment brief</p>
          </div>

          <div
            className="hidden sm:grid px-5 h-10 items-center gap-3 text-[10px] uppercase tracking-wider"
            style={{ gridTemplateColumns: "minmax(170px,1.35fr) 62px minmax(130px,1fr) 108px 18px", color: "rgba(34,47,48,0.38)", backgroundColor: "rgba(34,47,48,0.018)", borderBottom: "1px solid rgba(34,47,48,0.06)" }}
          >
            <span>Market</span><span>Score</span><span>Route</span><span>EU latency</span><span />
          </div>

          <div className="overflow-y-auto" style={{ maxHeight: "calc(100vh - 290px)", minHeight: 440 }}>
            {filtered.length === 0 ? (
              <div className="py-20 text-center">
                <p className="text-[14px] mb-2" style={{ color: "rgba(34,47,48,0.58)" }}>No markets match those filters.</p>
                <button onClick={resetFilters} className="text-[13px] font-medium" style={{ color: "#047857" }}>Reset filters</button>
              </div>
            ) : filtered.map((country) => {
              const active = country.country === selected.country;
              return (
                <button
                  key={country.country}
                  onClick={() => { setSelectedName(country.country); setThesisOpen(false); }}
                  className="w-full min-h-[68px] px-5 grid grid-cols-[minmax(0,1fr)_50px_18px] sm:grid-cols-[minmax(170px,1.35fr)_62px_minmax(130px,1fr)_108px_18px] items-center gap-3 text-left transition-colors duration-150"
                  style={{
                    backgroundColor: active ? "rgba(34,197,94,0.055)" : "transparent",
                    borderBottom: "1px solid rgba(34,47,48,0.055)",
                    boxShadow: active ? "inset 2px 0 #22c55e" : "none",
                  }}
                >
                  <span className="min-w-0">
                    <strong className="block text-[14px] font-medium truncate" style={{ color: "#222f30" }}>{country.country}</strong>
                    <small className="block text-[11px] mt-0.5 truncate" style={{ color: "rgba(34,47,48,0.42)" }}>{country.region}</small>
                  </span>
                  <span className="text-[14px] tabular-nums font-medium" style={{ color: active ? "#047857" : "#222f30" }}>{country.readiness_score}</span>
                  <span className="hidden sm:block text-[12px] truncate" style={{ color: "rgba(34,47,48,0.6)" }}>{country.primary_inference_route}</span>
                  <span className="hidden sm:block text-[12px] tabular-nums" style={{ color: "#222f30" }}>{country.est_rtt_to_europe_ms.match(/~?\d+[–-]\d+ms|~?\d+ms/)?.[0] ?? country.est_rtt_to_europe_ms}</span>
                  <span className="text-[18px]" style={{ color: active ? "#047857" : "rgba(34,47,48,0.24)" }}>›</span>
                </button>
              );
            })}
          </div>
        </section>

        <aside className="xl:sticky xl:top-[104px] rounded-2xl overflow-hidden" style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.08)" }}>
          <div className="p-6" style={{ borderBottom: "1px solid rgba(34,47,48,0.08)" }}>
            <div className="flex items-start justify-between gap-5">
              <div>
                <p className="text-[11px] uppercase tracking-widest mb-2" style={{ color: "rgba(34,47,48,0.38)" }}>{selected.region}</p>
                <h2 className="text-[28px] font-medium tracking-[-0.04em] leading-tight" style={{ color: "#222f30" }}>{selected.country}</h2>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="block text-[26px] font-semibold tabular-nums leading-none" style={{ color: "#222f30" }}>{selected.readiness_score}</span>
                <span className="text-[10px]" style={{ color: "rgba(34,47,48,0.38)" }}>/ 100</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <span className="text-[11px] font-medium px-2.5 py-1 rounded-full" style={readinessStyle(selected.ai_inference_readiness)}>{selected.ai_inference_readiness}</span>
              <span className="text-[12px]" style={{ color: "rgba(34,47,48,0.48)" }}>{selected.connectivity_role}</span>
            </div>
          </div>

          <div className="p-6">
            <p className="text-[11px] uppercase tracking-widest mb-2" style={{ color: "rgba(34,47,48,0.38)" }}>Market thesis</p>
            <p className={`text-[14px] leading-[1.7] ${thesisOpen ? "" : "line-clamp-3"}`} style={{ color: "rgba(34,47,48,0.74)" }}>{selected.founder_insight}</p>
            <button onClick={() => setThesisOpen((open) => !open)} className="text-[12px] font-medium mt-2" style={{ color: "#047857" }}>
              {thesisOpen ? "Show less" : "Read full thesis"}
            </button>

            <div className="grid grid-cols-2 my-6" style={{ borderTop: "1px solid rgba(34,47,48,0.07)", borderLeft: "1px solid rgba(34,47,48,0.07)" }}>
              {[
                ["Deployment route", selected.primary_inference_route],
                ["Compute access", firstSentence(selected.ai_compute_availability)],
                ["Latency to Europe", selected.est_rtt_to_europe_ms],
                ["Operational friction", selected.ops_friction],
              ].map(([label, value]) => (
                <div key={label} className="p-3.5 min-w-0" style={{ borderRight: "1px solid rgba(34,47,48,0.07)", borderBottom: "1px solid rgba(34,47,48,0.07)" }}>
                  <span className="block text-[10px] uppercase tracking-wider mb-1.5" style={{ color: "rgba(34,47,48,0.38)" }}>{label}</span>
                  <strong className="block text-[12px] font-medium line-clamp-2" style={{ color: "#222f30" }}>{value}</strong>
                </div>
              ))}
            </div>

            <p className="text-[11px] uppercase tracking-widest mb-3" style={{ color: "rgba(34,47,48,0.38)" }}>Signals to watch</p>
            <div className="flex flex-col mb-6">
              {[
                ["Compute", firstSentence(selected.ai_compute_availability)],
                ["Power", firstSentence(selected.power_reliability)],
                ["Policy", firstSentence(selected.ai_data_governance_posture)],
              ].map(([label, value]) => (
                <div key={label} className="py-3 flex gap-4" style={{ borderBottom: "1px solid rgba(34,47,48,0.06)" }}>
                  <span className="w-[58px] flex-shrink-0 text-[11px] font-medium" style={{ color: "#222f30" }}>{label}</span>
                  <p className="text-[12px] leading-[1.55] line-clamp-2" style={{ color: "rgba(34,47,48,0.6)" }}>{value}</p>
                </div>
              ))}
            </div>

            <button
              onClick={() => onOpenOverview(selected.country)}
              className="h-11 px-4 rounded-xl flex items-center justify-center gap-8 text-[12px] font-medium text-white transition-transform duration-150 hover:-translate-y-0.5"
              style={{ backgroundColor: "#222f30" }}
            >
              Open in Overview <span style={{ color: "#22c55e" }}>→</span>
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

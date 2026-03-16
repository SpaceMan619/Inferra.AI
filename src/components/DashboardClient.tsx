"use client";

import { useState, useCallback } from "react";
import DashboardSidebar from "./DashboardSidebar";
import ParticleGlobe from "./ParticleGlobe";
import MapView from "./MapView";
import CountryPanel from "./CountryPanel";
import ModeToggle from "./ModeToggle";
import type { CountryData, ViewMode } from "@/types";

interface DashboardClientProps {
  countries: CountryData[];
}

export default function DashboardClient({ countries }: DashboardClientProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedCountry, setSelectedCountry] = useState("South Africa");
  const [mode, setMode] = useState<ViewMode>("founder");

  const countryData =
    countries.find((c) => c.country === selectedCountry) || countries[0];

  const handleMarkerClick = useCallback(
    (marker: { name: string }) => {
      const match = countries.find((c) => c.country === marker.name);
      if (match) setSelectedCountry(match.country);
    },
    [countries]
  );

  const sectionTitles: Record<string, { title: string; sub: string }> = {
    overview: {
      title: "Overview",
      sub: "Directional readiness signals across 7 African markets",
    },
    map: {
      title: "Infrastructure Map",
      sub: "Geographic view of data centers, connectivity, and policy signals",
    },
    markets: {
      title: "Markets",
      sub: "Compare readiness indicators across countries",
    },
    insights: {
      title: "Insights",
      sub: "Emerging patterns and observations",
    },
  };

  const current = sectionTitles[activeSection] || sectionTitles.overview;

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#f7f7f5" }}>
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main content */}
      <main className="flex-1 ml-[220px]">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-8 py-5"
          style={{
            backgroundColor: "rgba(247, 247, 245, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(34, 47, 48, 0.08)",
          }}
        >
          <div>
            <h1
              className="text-[18px] font-medium tracking-[-0.02em]"
              style={{ color: "#222f30" }}
            >
              {current.title}
            </h1>
            <p
              className="text-[13px] font-light"
              style={{ color: "rgba(34, 47, 48, 0.55)" }}
            >
              {current.sub}
            </p>
          </div>
          <ModeToggle mode={mode} onModeChange={setMode} />
        </header>

        {/* Content */}
        <div className="p-8">
          {activeSection === "overview" && (
            <div>
              {/* Globe + Country Panel */}
              <div className="flex gap-5 flex-col lg:flex-row" style={{ minHeight: 500 }}>
                <div
                  className="rounded-2xl overflow-hidden flex-1 relative"
                  style={{
                    backgroundColor: "#0a0c10",
                    border: "1px solid rgba(34, 47, 48, 0.08)",
                    height: 520,
                  }}
                >
                  <ParticleGlobe
                    interactive
                    onMarkerClick={handleMarkerClick}
                    className="absolute inset-0"
                  />
                </div>

                <div className="w-full lg:w-[380px] flex-shrink-0">
                  <CountryPanel country={countryData} mode={mode} />
                </div>
              </div>

              {/* Country quick-select */}
              <div className="flex flex-wrap gap-2 mt-6">
                {countries.map((c) => {
                  const isActive = selectedCountry === c.country;
                  return (
                    <button
                      key={c.country}
                      onClick={() => setSelectedCountry(c.country)}
                      className="px-5 py-2.5 rounded-full text-[13px] transition-all duration-200 hover:shadow-sm"
                      style={{
                        backgroundColor: isActive ? "#222f30" : "#fff",
                        color: isActive ? "#fff" : "#222f30",
                        border: `1px solid ${isActive ? "#222f30" : "rgba(34, 47, 48, 0.12)"}`,
                        fontWeight: isActive ? 400 : 300,
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = "rgba(34, 47, 48, 0.3)";
                          e.currentTarget.style.backgroundColor = "rgba(255,255,255,1)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.borderColor = "rgba(34, 47, 48, 0.12)";
                          e.currentTarget.style.backgroundColor = "#fff";
                        }
                      }}
                    >
                      {c.country}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {activeSection === "map" && (
            <div className="flex gap-6 flex-col xl:flex-row">
              <div
                className="flex-1 rounded-2xl overflow-hidden"
                style={{ minHeight: 560 }}
              >
                <MapView
                  countries={countries}
                  mode={mode}
                  selectedCountry={selectedCountry}
                  onSelectCountry={setSelectedCountry}
                />
              </div>
              <div className="w-full xl:w-[380px]">
                <CountryPanel country={countryData} mode={mode} />
              </div>
            </div>
          )}

          {activeSection === "markets" && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {countries.map((c) => (
                <button
                  key={c.country}
                  onClick={() => {
                    setSelectedCountry(c.country);
                    setActiveSection("overview");
                  }}
                  className="text-left p-6 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md group"
                  style={{
                    backgroundColor: "#fff",
                    border: "1px solid rgba(34, 47, 48, 0.08)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(34, 47, 48, 0.18)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(34, 47, 48, 0.08)";
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3
                      className="text-[15px] font-medium tracking-[-0.02em] group-hover:underline underline-offset-2"
                      style={{ color: "#222f30" }}
                    >
                      {c.country}
                    </h3>
                    <span
                      className="text-[11px] font-normal px-2.5 py-0.5 rounded-full"
                      style={{
                        backgroundColor:
                          c.ai_inference_readiness === "Viable"
                            ? "rgba(16,185,129,0.12)"
                            : c.ai_inference_readiness === "Emerging"
                            ? "rgba(245,158,11,0.12)"
                            : "rgba(239,68,68,0.1)",
                        color:
                          c.ai_inference_readiness === "Viable"
                            ? "#047857"
                            : c.ai_inference_readiness === "Emerging"
                            ? "#b45309"
                            : "#b91c1c",
                      }}
                    >
                      {c.ai_inference_readiness}
                    </span>
                  </div>
                  <p
                    className="text-[13px] font-light mb-3 leading-[1.5]"
                    style={{ color: "rgba(34, 47, 48, 0.65)" }}
                  >
                    {c.founder_insight}
                  </p>
                  <div
                    className="h-px w-full mb-3"
                    style={{ backgroundColor: "rgba(34, 47, 48, 0.06)" }}
                  />
                  <div
                    className="flex gap-4 text-[11px]"
                    style={{ color: "rgba(34, 47, 48, 0.55)" }}
                  >
                    <span>GPU: {c.ai_compute_availability}</span>
                    <span>Latency: {c.est_rtt_to_europe_ms}</span>
                  </div>
                </button>
              ))}
            </div>
          )}

          {activeSection === "insights" && (
            <div
              className="rounded-2xl p-10"
              style={{
                backgroundColor: "#fff",
                border: "1px solid rgba(34, 47, 48, 0.08)",
              }}
            >
              <div className="max-w-[520px]">
                <h3
                  className="text-[1.25rem] font-medium tracking-[-0.02em] mb-3"
                  style={{ color: "#222f30" }}
                >
                  Coming soon
                </h3>
                <p
                  className="text-[14px] font-light leading-[1.6]"
                  style={{ color: "rgba(34, 47, 48, 0.6)" }}
                >
                  This section will surface emerging patterns from the data —
                  trend lines, market comparisons, and directional signals
                  that help you think about where the landscape is heading.
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
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

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-deep)" }}>
      <DashboardSidebar
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />

      {/* Main content — offset by sidebar width */}
      <main className="flex-1 ml-[220px]">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
          style={{
            background: "rgba(250,250,248,0.8)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--glass-border)",
          }}
        >
          <div>
            <h1
              className="text-[18px] font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {activeSection === "overview" && "Dashboard Overview"}
              {activeSection === "map" && "Infrastructure Map"}
              {activeSection === "markets" && "Market Analysis"}
              {activeSection === "insights" && "AI Insights"}
            </h1>
            <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
              Real-time inference readiness across 7 African markets
            </p>
          </div>
          <ModeToggle mode={mode} onModeChange={setMode} />
        </header>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeSection === "overview" && (
              <motion.div
                key="overview"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Globe + Country Panel side by side */}
                <div className="flex gap-5 flex-col lg:flex-row" style={{ minHeight: 500 }}>
                  <div
                    className="rounded-2xl overflow-hidden flex-1 relative"
                    style={{
                      background: "#08090d",
                      border: "1px solid rgba(255,255,255,0.06)",
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
                  {countries.map((c) => (
                    <button
                      key={c.country}
                      onClick={() => setSelectedCountry(c.country)}
                      className="px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200"
                      style={{
                        background:
                          selectedCountry === c.country
                            ? "var(--primary)"
                            : "var(--bg-surface)",
                        color:
                          selectedCountry === c.country
                            ? "#fff"
                            : "var(--text-secondary)",
                        border: `1px solid ${
                          selectedCountry === c.country
                            ? "var(--primary)"
                            : "var(--glass-border)"
                        }`,
                      }}
                    >
                      {c.country}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "map" && (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
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
              </motion.div>
            )}

            {activeSection === "markets" && (
              <motion.div
                key="markets"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {countries.map((c) => (
                    <button
                      key={c.country}
                      onClick={() => {
                        setSelectedCountry(c.country);
                        setActiveSection("overview");
                      }}
                      className="text-left p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3
                          className="text-[15px] font-bold"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {c.country}
                        </h3>
                        <span
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background:
                              c.ai_inference_readiness === "Viable"
                                ? "rgba(16,185,129,0.1)"
                                : c.ai_inference_readiness === "Emerging"
                                ? "rgba(245,158,11,0.1)"
                                : "rgba(239,68,68,0.1)",
                            color:
                              c.ai_inference_readiness === "Viable"
                                ? "#10b981"
                                : c.ai_inference_readiness === "Emerging"
                                ? "#f59e0b"
                                : "#ef4444",
                          }}
                        >
                          {c.ai_inference_readiness}
                        </span>
                      </div>
                      <p
                        className="text-[12px] mb-2"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {c.founder_insight}
                      </p>
                      <div
                        className="flex gap-4 text-[11px]"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        <span>GPU: {c.ai_compute_availability}</span>
                        <span>Latency: {c.est_rtt_to_europe_ms}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "insights" && (
              <motion.div
                key="insights"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <p
                    className="text-[15px]"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    AI-powered insights coming soon. This section will feature
                    trend analysis, market comparisons, and predictive readiness
                    scoring.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

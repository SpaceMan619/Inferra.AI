"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import DashboardSidebar from "./DashboardSidebar";
import CountryPanel from "./CountryPanel";
import CountryList from "./CountryList";
import ModeToggle from "./ModeToggle";
import InsightsDashboard from "./InsightsDashboard";
import CompareClient from "./CompareClient";

const GlobeView = dynamic(() => import("./GlobeView"), { ssr: false });
const MapView   = dynamic(() => import("./MapView"),   { ssr: false });
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

  const sectionTitles: Record<string, { title: string; shortTitle: string; sub: string }> = {
    overview: {
      title: "Overview",
      shortTitle: "Overview",
      sub: `Directional readiness signals across ${countries.length} African markets`,
    },
    map: {
      title: "Infrastructure Map",
      shortTitle: "Map",
      sub: "Geographic view of data centers, connectivity, and policy signals",
    },
    markets: {
      title: "Markets",
      shortTitle: "Markets",
      sub: "Compare readiness indicators across countries",
    },
    insights: {
      title: "Insights",
      shortTitle: "Insights",
      sub: `Readiness rankings, dimension leaders, and key signals across ${countries.length} markets`,
    },
    compare: {
      title: "Compare Markets",
      shortTitle: "Compare",
      sub: "Side-by-side readiness analysis across all dimensions",
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
      <main className="flex-1 ml-0 lg:ml-[220px] pb-28 lg:pb-0">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8 py-4 lg:py-5"
          style={{
            backgroundColor: "rgba(247, 247, 245, 0.85)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            borderBottom: "1px solid rgba(34, 47, 48, 0.08)",
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-3">
            {/* Mobile logo */}
            <span
              className="flex lg:hidden h-6 w-6 items-center justify-center rounded-md text-[9px] font-semibold tracking-wide flex-shrink-0"
              style={{ backgroundColor: "#222f30", color: "#fff" }}
            >
              iA
            </span>
            <div className="min-w-0">
              <h1
                className="text-[15px] lg:text-[18px] font-medium tracking-[-0.02em] truncate pb-0.5"
                style={{ color: "#222f30" }}
              >
                <span className="lg:hidden">{current.shortTitle}</span>
                <span className="hidden lg:inline">{current.title}</span>
              </h1>
              <p
                className="text-[11px] lg:text-[13px] font-light hidden sm:block truncate pb-0.5"
                style={{ color: "rgba(34, 47, 48, 0.55)" }}
              >
                {current.sub}
              </p>
            </div>
          </div>
          <div className="flex-shrink-0">
            <ModeToggle mode={mode} onModeChange={setMode} />
          </div>
        </header>

        {/* Content */}
        <div className="p-4 lg:p-8">
          <AnimatePresence mode="wait">

            {activeSection === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-5 flex-col xl:flex-row"
                style={{ minHeight: "auto" }}
              >
                {/* Globe */}
                <div
                  className="rounded-2xl overflow-hidden flex-1 relative"
                  style={{
                    backgroundColor: "#0a0c10",
                    border: "1px solid rgba(34, 47, 48, 0.08)",
                    minHeight: "min(480px, 58vh)",
                  }}
                >
                  <GlobeView
                    selectedCountry={selectedCountry}
                    countries={countries}
                    onSelectCountry={setSelectedCountry}
                  />
                  {/* Selected country overlay */}
                  <div
                    className="absolute bottom-4 left-4 px-4 py-2.5 rounded-xl pointer-events-none z-10"
                    style={{
                      backgroundColor: "rgba(6, 8, 18, 0.75)",
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.1)",
                    }}
                  >
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mb-0.5">
                      Selected
                    </p>
                    <p className="text-[14px] font-medium text-white tracking-[-0.02em]">
                      {countryData.country}
                    </p>
                  </div>
                </div>

                {/* Country list */}
                <div className="w-full xl:w-[200px] flex-shrink-0">
                  <CountryList
                    countries={countries}
                    selected={selectedCountry}
                    onSelect={setSelectedCountry}
                  />
                </div>

                {/* Detail panel */}
                <div className="w-full xl:w-[360px] flex-shrink-0">
                  <CountryPanel country={countryData} mode={mode} />
                </div>
              </motion.div>
            )}

            {activeSection === "map" && (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-6 flex-col xl:flex-row"
              >
                <div
                  className="flex-1 rounded-2xl overflow-hidden"
                  style={{ minHeight: "min(560px, 55vh)" }}
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
              </motion.div>
            )}

            {activeSection === "markets" && (
              <motion.div
                key="markets"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
              >
                {countries.map((c, i) => (
                  <motion.button
                    key={c.country}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.18, delay: i * 0.03, ease: "easeOut" }}
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
                      className="text-[13px] font-light mb-3 leading-[1.5] line-clamp-3 pb-1"
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
                  </motion.button>
                ))}
              </motion.div>
            )}

            {activeSection === "insights" && (
              <motion.div
                key="insights"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <InsightsDashboard countries={countries} />
              </motion.div>
            )}

            {activeSection === "compare" && (
              <motion.div
                key="compare"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                <CompareClient countries={countries} />
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}

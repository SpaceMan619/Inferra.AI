"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { CountryData, ViewMode } from "@/types";
import ModeToggle from "./ModeToggle";
import MapView from "./MapView";
import CountryPanel from "./CountryPanel";

interface ToolSectionProps {
  countries: CountryData[];
}

export default function ToolSection({ countries }: ToolSectionProps) {
  const [mode, setMode] = useState<ViewMode>("founder");
  const [selectedCountry, setSelectedCountry] = useState<string>(
    countries[0]?.country ?? ""
  );

  const selectedData =
    countries.find((c) => c.country === selectedCountry) || null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative z-10 max-w-[1400px] mx-auto px-4 md:px-8 py-16"
      id="explore"
    >
      {/* Section header */}
      <div className="text-center mb-10">
        <h2
          className="text-3xl md:text-4xl font-bold mb-2"
          style={{ color: "var(--text-primary)" }}
        >
          Explore the Map
        </h2>
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Click a country to see its inference readiness profile
        </p>
      </div>

      <ModeToggle mode={mode} onModeChange={setMode} />

      {/* Map + Panel layout */}
      <div className="flex flex-col lg:flex-row gap-6" style={{ minHeight: "600px" }}>
        <div className="flex-[3] min-h-[500px]">
          <MapView
            countries={countries}
            mode={mode}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
          />
        </div>
        <div className="flex-[2]">
          <CountryPanel country={selectedData} mode={mode} />
        </div>
      </div>

      {/* Country quick-select pills */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {countries.map((c) => (
          <button
            key={c.country}
            onClick={() => setSelectedCountry(c.country)}
            className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer"
            style={{
              background:
                selectedCountry === c.country ? "var(--primary)" : "var(--bg-surface)",
              border: `1px solid ${
                selectedCountry === c.country ? "var(--primary)" : "var(--glass-border)"
              }`,
              color: selectedCountry === c.country ? "#fff" : "var(--text-secondary)",
              boxShadow:
                selectedCountry === c.country
                  ? "0 2px 8px rgba(79, 70, 229, 0.2)"
                  : "none",
            }}
          >
            {c.country}
          </button>
        ))}
      </div>
    </motion.section>
  );
}

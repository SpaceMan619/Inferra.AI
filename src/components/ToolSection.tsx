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
    >
      {/* Section header */}
      <div className="text-center mb-10">
        <h2
          className="text-3xl md:text-4xl font-bold mb-3"
          id="explore"
          style={{ color: "var(--text-primary)" }}
        >
          Explore the Map
        </h2>
        <div
          className="w-12 h-px mx-auto"
          style={{ background: "var(--primary)", opacity: 0.3 }}
        />
      </div>

      <ModeToggle mode={mode} onModeChange={setMode} />

      {/* Map + Panel layout */}
      <div className="flex flex-col lg:flex-row gap-6" style={{ minHeight: "600px" }}>
        {/* Map */}
        <div className="flex-[3] min-h-[500px]">
          <MapView
            countries={countries}
            mode={mode}
            selectedCountry={selectedCountry}
            onSelectCountry={setSelectedCountry}
          />
        </div>

        {/* Country Panel */}
        <div className="flex-[2]">
          <CountryPanel country={selectedData} mode={mode} />
        </div>
      </div>

      {/* Country quick-select pills (below the map) */}
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        {countries.map((c) => (
          <button
            key={c.country}
            onClick={() => setSelectedCountry(c.country)}
            className="px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer"
            style={{
              background:
                selectedCountry === c.country
                  ? "var(--glass-bg-hover)"
                  : "transparent",
              border: `1px solid ${
                selectedCountry === c.country
                  ? "var(--primary)"
                  : "var(--glass-border)"
              }`,
              color:
                selectedCountry === c.country
                  ? "var(--primary-light)"
                  : "var(--text-muted)",
            }}
          >
            {c.country}
          </button>
        ))}
      </div>
    </motion.section>
  );
}

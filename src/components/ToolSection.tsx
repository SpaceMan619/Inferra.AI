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
    <section id="explore" className="relative z-10 py-24 px-6">
      {/* Background accent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-elevated) 30%, var(--bg-elevated) 70%, var(--bg-deep) 100%)",
        }}
      />

      <div className="relative max-w-[1400px] mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--primary)" }}
          >
            Interactive Map
          </p>
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold tracking-tight mb-4">
            Explore African Markets
          </h2>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-secondary)" }}>
            Click any country to see its full infrastructure and policy profile.
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <ModeToggle mode={mode} onModeChange={setMode} />
        </motion.div>

        {/* Map + Panel — map takes 2/3, panel 1/3, like the Streamlit original */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col xl:flex-row gap-5"
          style={{ minHeight: "650px" }}
        >
          {/* Map — large and prominent */}
          <div className="xl:flex-[2.2] min-h-[550px] xl:min-h-0">
            <MapView
              countries={countries}
              mode={mode}
              selectedCountry={selectedCountry}
              onSelectCountry={setSelectedCountry}
            />
          </div>

          {/* Panel */}
          <div className="xl:flex-1 xl:max-w-[420px]">
            <CountryPanel country={selectedData} mode={mode} />
          </div>
        </motion.div>

        {/* Country quick-select */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-wrap justify-center gap-2 mt-8"
        >
          {countries.map((c) => {
            const active = selectedCountry === c.country;
            return (
              <button
                key={c.country}
                onClick={() => setSelectedCountry(c.country)}
                className="px-5 py-2.5 rounded-full text-[13px] font-medium transition-all duration-200 cursor-pointer"
                style={{
                  background: active ? "var(--primary)" : "var(--bg-surface)",
                  border: `1px solid ${active ? "var(--primary)" : "var(--glass-border)"}`,
                  color: active ? "#fff" : "var(--text-secondary)",
                  boxShadow: active
                    ? "0 2px 10px rgba(79,70,229,0.25)"
                    : "0 1px 2px rgba(0,0,0,0.03)",
                }}
              >
                {c.country}
              </button>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

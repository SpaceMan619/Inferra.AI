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

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function ToolSection({ countries }: ToolSectionProps) {
  const [mode, setMode] = useState<ViewMode>("founder");
  const [selectedCountry, setSelectedCountry] = useState<string>(
    countries[0]?.country ?? ""
  );

  const selectedData =
    countries.find((c) => c.country === selectedCountry) || null;

  return (
    <section id="explore" className="relative z-10 pt-12 pb-20 px-5 md:px-6">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-elevated) 25%, var(--bg-elevated) 75%, var(--bg-deep) 100%)",
        }}
      />

      <motion.div
        className="relative max-w-[1400px] mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-60px" }}
      >
        {/* Section header */}
        <motion.div variants={fadeUp} className="text-center mb-10">
          <p
            className="text-[13px] font-bold uppercase tracking-[0.2em] mb-4"
            style={{ color: "var(--primary)" }}
          >
            Interactive Map
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-extrabold tracking-tight mb-5">
            Explore African Markets
          </h2>
          <p
            className="text-[17px] max-w-xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Click any country to see its full infrastructure and policy profile.
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div variants={fadeUp}>
          <ModeToggle mode={mode} onModeChange={setMode} />
        </motion.div>

        {/* Map + Panel */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col xl:flex-row gap-5"
        >
          {/* Map */}
          <div className="xl:flex-[2.2] min-h-[350px] md:min-h-[550px] xl:min-h-0">
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
          variants={fadeUp}
          className="flex flex-wrap justify-center gap-2 mt-8"
        >
          {countries.map((c) => {
            const active = selectedCountry === c.country;
            return (
              <button
                key={c.country}
                onClick={() => setSelectedCountry(c.country)}
                className="px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-full text-[12px] sm:text-[13px] font-semibold transition-all duration-200 cursor-pointer hover:-translate-y-0.5"
                style={{
                  background: active ? "var(--primary)" : "var(--bg-surface)",
                  border: `1px solid ${active ? "var(--primary)" : "var(--glass-border)"}`,
                  color: active ? "#fff" : "var(--text-secondary)",
                  boxShadow: active
                    ? "0 2px 12px rgba(79,70,229,0.3)"
                    : "0 1px 2px rgba(0,0,0,0.03)",
                }}
              >
                {c.country}
              </button>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}

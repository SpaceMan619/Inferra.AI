"use client";

import { motion } from "framer-motion";

const INSIGHTS = [
  { stat: "~35ms", label: "Morocco → EU latency", detail: "Lowest RTT to Europe of any African market" },
  { stat: "15-25", label: "South Africa data centers", detail: "Most operational enterprise-grade facilities on the continent" },
  { stat: "2", label: "Markets with GPU", detail: "Only South Africa and Egypt have confirmed H100/A100 availability" },
  { stat: "4", label: "Flexible data governance", detail: "Morocco, Ghana, Rwanda, and more allow cross-border AI data flows" },
];

export default function Insights() {
  return (
    <section id="insights" className="relative z-10 py-28 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Left text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 max-w-md"
          >
            <p className="text-sm font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--secondary)" }}>
              Key Insights
            </p>
            <h2 className="text-3xl md:text-[2.5rem] font-extrabold tracking-tight leading-tight mb-5">
              The data behind the map
            </h2>
            <p className="text-base leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
              Every data point in InferraAI is sourced from public infrastructure reports,
              latency measurements, and policy documents. We focus on what matters for
              inference deployment — not hype.
            </p>
            <a
              href="#explore"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors"
              style={{ color: "var(--primary)" }}
            >
              Explore the full map
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
          </motion.div>

          {/* Right: insight cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 grid grid-cols-2 gap-4"
          >
            {INSIGHTS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--glass-border)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}
              >
                <div className="text-2xl font-extrabold mb-1" style={{ color: "var(--primary)" }}>
                  {item.stat}
                </div>
                <div className="text-sm font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  {item.label}
                </div>
                <div className="text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>
                  {item.detail}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

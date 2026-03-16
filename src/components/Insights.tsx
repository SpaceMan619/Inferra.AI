"use client";

import { motion } from "framer-motion";

const INSIGHTS = [
  {
    stat: "~35ms",
    label: "Morocco → EU latency",
    detail: "Lowest RTT to Europe of any African market",
    color: "var(--secondary)",
  },
  {
    stat: "15-25",
    label: "South Africa data centers",
    detail: "Most operational enterprise-grade facilities on the continent",
    color: "var(--primary)",
  },
  {
    stat: "2",
    label: "Markets with GPU",
    detail: "Only South Africa and Egypt have confirmed H100/A100 availability",
    color: "var(--accent)",
  },
  {
    stat: "4",
    label: "Flexible data governance",
    detail: "Morocco, Ghana, Rwanda, and more allow cross-border AI data flows",
    color: "var(--danger)",
  },
];

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export default function Insights() {
  return (
    <section id="insights" className="relative z-10 py-20 px-5 md:px-6">
      {/* Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(180deg, var(--bg-deep) 0%, var(--bg-elevated) 30%, var(--bg-elevated) 70%, var(--bg-deep) 100%)",
        }}
      />

      <motion.div
        className="relative max-w-[1200px] mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left text */}
          <motion.div
            variants={fadeUp}
            className="flex-1 max-w-md text-center lg:text-left"
          >
            <p className="text-[13px] font-bold uppercase tracking-[0.2em] mb-4 text-[var(--secondary)]">
              Key Insights
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-[2.5rem] font-extrabold tracking-tight leading-tight mb-5">
              The data behind
              <br />
              the map
            </h2>
            <p className="text-[15px] leading-[1.7] mb-8 text-[var(--text-secondary)]">
              Every data point in InferraAI is sourced from public
              infrastructure reports, latency measurements, and policy
              documents. We focus on what matters for inference deployment —
              not hype.
            </p>
            <a
              href="#explore"
              className="inline-flex items-center gap-2 text-sm font-bold transition-all duration-200 hover:gap-3 text-[var(--primary)]"
            >
              Explore the full map
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 8H13M13 8L9 4M13 8L9 12"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>

          {/* Right: insight cards */}
          <motion.div
            className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4"
            variants={cardGridVariants}
          >
            {INSIGHTS.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="rounded-2xl p-5 sm:p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--glass-border)",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
                }}
              >
                <div
                  className="text-[26px] sm:text-[32px] font-extrabold mb-2 leading-none"
                  style={{ color: item.color }}
                >
                  {item.stat}
                </div>
                <div className="text-[14px] font-bold mb-1.5 text-[var(--text-primary)]">
                  {item.label}
                </div>
                <div className="text-[13px] leading-relaxed text-[var(--text-muted)]">
                  {item.detail}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

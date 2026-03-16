"use client";

import { motion } from "framer-motion";

const FEATURES = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "7 African Markets",
    desc: "Real infrastructure data for South Africa, Nigeria, Kenya, Egypt, Morocco, Ghana, and Rwanda — the continent's emerging inference hubs.",
    color: "var(--primary)",
    bg: "rgba(79,70,229,0.06)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 20V10" />
        <path d="M18 20V4" />
        <path d="M6 20v-4" />
      </svg>
    ),
    title: "Founder Mode",
    desc: "See deployment reality: GPU availability, latency to Europe, data center counts, power reliability, and operational friction scores.",
    color: "var(--secondary)",
    bg: "rgba(16,185,129,0.06)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Policy Mode",
    desc: "Toggle to see AI policy signals, data governance postures, compute commitments, and cross-border alignment at a glance.",
    color: "var(--accent)",
    bg: "rgba(245,158,11,0.06)",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Inference Routing",
    desc: "Visualize real data flow paths — which markets run inference locally, which route to regional hubs, and which go offshore to Europe.",
    color: "var(--danger)",
    bg: "rgba(239,68,68,0.06)",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export default function Features() {
  return (
    <section id="features" className="relative z-10 py-28 px-6">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-3"
            style={{ color: "var(--primary)" }}
          >
            What you get
          </p>
          <h2 className="text-3xl md:text-[2.75rem] font-extrabold tracking-tight mb-4">
            Everything you need to deploy
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Infrastructure intelligence, policy signals, and inference routing
            — all in one interactive map.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid md:grid-cols-2 gap-5"
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              className="group relative rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--glass-border)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              }}
              whileHover={{
                boxShadow: "0 8px 30px rgba(0,0,0,0.06)",
              }}
            >
              {/* Icon */}
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
                style={{ background: f.bg, color: f.color }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{f.title}</h3>
              <p
                className="text-[15px] leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

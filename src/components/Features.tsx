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

const sectionVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const cardGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

export default function Features() {
  return (
    <section id="features" className="relative z-10 py-20 px-5 md:px-6">
      {/* Subtle top divider */}
      <div className="max-w-[200px] mx-auto mb-16">
        <div className="h-px w-full" style={{ background: "linear-gradient(90deg, transparent, var(--glass-border), transparent)" }} />
      </div>

      <motion.div
        className="max-w-[1200px] mx-auto"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
      >
        {/* Header */}
        <motion.div variants={fadeUp} className="text-center mb-16">
          <p className="text-[13px] font-bold uppercase tracking-[0.2em] mb-4 text-[var(--primary)]">
            What you get
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-[2.75rem] font-extrabold tracking-tight mb-5">
            Everything you need to deploy
          </h2>
          <p className="text-[17px] max-w-2xl mx-auto leading-relaxed text-[var(--text-secondary)]">
            Infrastructure intelligence, policy signals, and inference routing
            — all in one interactive map.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          variants={cardGridVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-5"
        >
          {FEATURES.map((f, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              className="group relative rounded-2xl p-5 sm:p-7 md:p-8 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--glass-border)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
              }}
              whileHover={{
                boxShadow: "0 12px 40px rgba(0,0,0,0.07)",
              }}
            >
              {/* Accent line */}
              <div
                className="absolute top-0 left-8 right-8 h-[2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: f.color }}
              />
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-5"
                style={{ background: f.bg, color: f.color }}
              >
                {f.icon}
              </div>
              <h3 className="text-lg font-bold mb-2.5">{f.title}</h3>
              <p className="text-[15px] leading-[1.7] text-[var(--text-secondary)]">
                {f.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

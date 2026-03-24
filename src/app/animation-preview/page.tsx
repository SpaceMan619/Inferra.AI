"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Shared brand values ────────────────────────────────────────────────────
const BG = "#0f1a14";
const GREEN = "#22c55e";
const LIME = "#cef79e";

// ══════════════════════════════════════════════════════════════════════════════
// A — STROKE DRAW
// The chevron logo draws itself, then the wordmark types in
// ══════════════════════════════════════════════════════════════════════════════
function AnimationA({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3200); return () => clearTimeout(t); }, [onDone]);

  const paths = [
    "M 37.5 101.25 L 60 82.5 L 82.5 101.25",
    "M 22.5 75 L 60 52.5 L 97.5 75",
    "M 11.25 48.75 L 60 22.5 L 108.75 48.75",
  ];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-6" style={{ backgroundColor: BG }}>
      <svg width="120" height="120" viewBox="0 0 120 120">
        {paths.map((d, i) => (
          <motion.path
            key={i} d={d} fill="none"
            stroke={LIME} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 + i * 0.35, ease: "easeInOut" }}
          />
        ))}
      </svg>

      <motion.div
        className="flex gap-[2px] overflow-hidden"
        initial="hidden" animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.06, delayChildren: 1.5 } } }}
      >
        {"INFERRA AI".split("").map((ch, i) => (
          <motion.span
            key={i}
            className="text-[28px] font-semibold tracking-[0.18em]"
            style={{ color: ch === " " ? "transparent" : "#fff", minWidth: ch === " " ? "12px" : undefined }}
            variants={{
              hidden: { opacity: 0, y: 12 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
            }}
          >
            {ch}
          </motion.span>
        ))}
      </motion.div>

      <motion.p
        className="text-[13px] font-light tracking-widest uppercase"
        style={{ color: "rgba(255,255,255,0.35)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.6 }}
      >
        African AI Infrastructure Intelligence
      </motion.p>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// B — PARTICLE CONVERGENCE
// Green particles scatter then converge to form the logo
// ══════════════════════════════════════════════════════════════════════════════
function AnimationB({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, [onDone]);

  const particles = Array.from({ length: 28 }, (_, i) => ({
    id: i,
    startX: (Math.sin(i * 137.5 * Math.PI / 180) * 220),
    startY: (Math.cos(i * 137.5 * Math.PI / 180) * 180),
    delay: i * 0.04,
    size: 3 + (i % 3),
    opacity: 0.4 + (i % 4) * 0.15,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden" style={{ backgroundColor: BG }}>
      <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{ width: p.size, height: p.size, backgroundColor: GREEN, opacity: p.opacity }}
            initial={{ x: p.startX, y: p.startY, scale: 1 }}
            animate={{ x: 0, y: 0, scale: 0 }}
            transition={{ duration: 1.1, delay: 0.2 + p.delay, ease: [0.55, 0, 0.45, 1] }}
          />
        ))}

        {/* Logo appears as particles converge */}
        <motion.div
          className="absolute flex flex-col items-center gap-3"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <svg width="80" height="80" viewBox="0 0 120 120" fill="none">
            <path d="M 37.5 101.25 L 60 82.5 L 82.5 101.25" stroke={LIME} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 22.5 75 L 60 52.5 L 97.5 75" stroke={LIME} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 11.25 48.75 L 60 22.5 L 108.75 48.75" stroke={LIME} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <motion.p
            className="text-[22px] font-semibold tracking-[0.15em] text-white"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}
          >
            INFERRA AI
          </motion.p>
        </motion.div>

        {/* Ripple ring */}
        <motion.div
          className="absolute rounded-full border"
          style={{ borderColor: `${GREEN}40` }}
          initial={{ width: 0, height: 0, opacity: 1 }}
          animate={{ width: 220, height: 220, opacity: 0 }}
          transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// C — SKELETON SHIMMER REVEAL
// Dashboard card skeletons shimmer, then fade into a clean "you're in" state
// ══════════════════════════════════════════════════════════════════════════════
function AnimationC({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3400); return () => clearTimeout(t); }, [onDone]);
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRevealed(true), 2000); return () => clearTimeout(t); }, []);

  const shimmer = {
    background: `linear-gradient(90deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.09) 50%, rgba(255,255,255,0.03) 100%)`,
    backgroundSize: "200% 100%",
    animation: "shimmer 1.4s infinite",
  } as React.CSSProperties;

  return (
    <div className="absolute inset-0 flex flex-col" style={{ backgroundColor: BG }}>
      <style>{`
        @keyframes shimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      `}</style>

      {/* Topbar skeleton */}
      <div className="flex items-center gap-3 px-6 py-4 border-b" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div className="w-7 h-7 rounded-md" style={{ ...shimmer, backgroundColor: "rgba(255,255,255,0.06)" }} />
        <div className="w-24 h-4 rounded-full" style={{ ...shimmer, backgroundColor: "rgba(255,255,255,0.06)" }} />
      </div>

      {/* Content skeletons */}
      <div className="flex-1 p-6 flex flex-col gap-4">
        <div className="grid grid-cols-3 gap-3">
          {[0,1,2].map(i => (
            <motion.div key={i} className="rounded-2xl p-4 h-24"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", ...shimmer }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i, duration: 0.4 }}
            />
          ))}
        </div>
        <motion.div className="rounded-2xl h-36"
          style={{ backgroundColor: "rgba(255,255,255,0.04)", ...shimmer }}
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }} />
        <div className="grid grid-cols-2 gap-3">
          {[0,1].map(i => (
            <motion.div key={i} className="rounded-2xl h-28"
              style={{ backgroundColor: "rgba(255,255,255,0.04)", ...shimmer }}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + 0.1*i, duration: 0.4 }} />
          ))}
        </div>
      </div>

      {/* Reveal overlay */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4"
            style={{ backgroundColor: BG }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}>
              <svg width="64" height="64" viewBox="0 0 120 120" fill="none">
                <path d="M 37.5 101.25 L 60 82.5 L 82.5 101.25" stroke={LIME} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 22.5 75 L 60 52.5 L 97.5 75" stroke={LIME} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M 11.25 48.75 L 60 22.5 L 108.75 48.75" stroke={LIME} strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </motion.div>
            <motion.p className="text-[22px] font-semibold text-white tracking-[-0.02em]"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}>
              Loading your dashboard
            </motion.p>
            <motion.p className="text-[13px] font-light" style={{ color: "rgba(255,255,255,0.35)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.4 }}>
              Fetching infrastructure data…
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// D — CINEMATIC WORD REVEAL
// Full dark screen, bold words drop in staggered, green underline sweeps
// ══════════════════════════════════════════════════════════════════════════════
function AnimationD({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3600); return () => clearTimeout(t); }, [onDone]);

  const lines = [
    { text: "Africa's AI", delay: 0.2, size: "text-[38px]" },
    { text: "Infrastructure", delay: 0.55, size: "text-[38px]", accent: true },
    { text: "Intelligence.", delay: 0.9, size: "text-[38px]" },
  ];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-8" style={{ backgroundColor: BG }}>
      {/* Subtle grid background */}
      <div className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative flex flex-col items-center gap-1">
        {lines.map((line, i) => (
          <div key={i} className="relative overflow-hidden">
            <motion.p
              className={`${line.size} font-bold tracking-[-0.03em] text-white leading-tight text-center`}
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: line.delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              {line.text}
            </motion.p>
            {line.accent && (
              <motion.div
                className="absolute bottom-1 left-0 h-[3px] rounded-full"
                style={{ backgroundColor: LIME }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: line.delay + 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </div>
        ))}

        <motion.div className="flex items-center gap-2.5 mt-6"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.9, duration: 0.5 }}>
          <svg width="20" height="20" viewBox="0 0 120 120" fill="none">
            <path d="M 37.5 101.25 L 60 82.5 L 82.5 101.25" stroke={LIME} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 22.5 75 L 60 52.5 L 97.5 75" stroke={LIME} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M 11.25 48.75 L 60 22.5 L 108.75 48.75" stroke={LIME} strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="text-[15px] font-medium tracking-[0.08em] text-white/70 uppercase">Inferra AI</span>
        </motion.div>
      </div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// E — STROKE DRAW + CINEMATIC TEXT (Light theme)
// Logo draws itself on white, then words drop in staggered with green underline
// ══════════════════════════════════════════════════════════════════════════════
function AnimationE({ onDone }: { onDone: () => void }) {
  useEffect(() => { const t = setTimeout(onDone, 3800); return () => clearTimeout(t); }, [onDone]);

  const paths = [
    "M 37.5 101.25 L 60 82.5 L 82.5 101.25",
    "M 22.5 75 L 60 52.5 L 97.5 75",
    "M 11.25 48.75 L 60 22.5 L 108.75 48.75",
  ];

  const words = ["Africa's", "AI", "Infrastructure", "Intelligence"];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 px-8"
      style={{ backgroundColor: "#f7f7f5" }}>

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `linear-gradient(rgba(34,47,48,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,47,48,0.8) 1px, transparent 1px)`,
          backgroundSize: "36px 36px",
        }}
      />

      {/* Logo stroke draw */}
      <motion.div className="relative" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0 }}>
        <svg width="110" height="110" viewBox="0 0 120 120" fill="none">
          {paths.map((d, i) => (
            <motion.path
              key={i} d={d} fill="none"
              stroke="#222f30" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.3, ease: "easeInOut" }}
            />
          ))}
        </svg>

      </motion.div>

      {/* Staggered word reveal */}
      <motion.div
        className="flex flex-col items-center gap-0.5"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.18, delayChildren: 1.4 } } }}
      >
        {words.map((word, i) => (
          <div key={i} className="relative overflow-hidden">
            <motion.p
              className="text-[32px] font-bold tracking-[-0.03em] leading-tight text-center"
              style={{ color: "#222f30" }}
              variants={{
                hidden: { y: "105%", opacity: 0 },
                visible: { y: 0, opacity: 1, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
              }}
            >
              {word}
            </motion.p>
            {/* Green underline on "Infrastructure" */}
            {word === "Infrastructure" && (
              <motion.div
                className="absolute bottom-1 left-0 h-[3px] rounded-full"
                style={{ backgroundColor: GREEN }}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.4 + (i * 0.18) + 0.45, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </div>
        ))}
      </motion.div>

      {/* Inferra AI wordmark */}
      <motion.div
        className="flex items-center gap-2 mt-1"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 3.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="text-[18px] font-semibold tracking-[-0.01em]"
          style={{ color: "#222f30" }}>
          Inferra AI
        </span>
      </motion.div>
    </div>
  );
}

// ══════════════════════════════════════════════════════════════════════════════
// Preview shell
// ══════════════════════════════════════════════════════════════════════════════
const ANIMATIONS = [
  { id: "A", label: "Stroke Draw",          desc: "Logo draws itself line by line, then wordmark types in" },
  { id: "B", label: "Particle Convergence", desc: "Green dots scatter then flow inward to form the logo" },
  { id: "C", label: "Skeleton Reveal",      desc: "Dashboard cards shimmer then dissolve to a clean splash" },
  { id: "D", label: "Cinematic Text",       desc: "Bold words drop in staggered with a glowing underline" },
  { id: "E", label: "A + D Light",          desc: "Stroke draw logo + staggered word reveal on light background" },
];

const COMPONENTS: Record<string, React.ComponentType<{ onDone: () => void }>> = {
  A: AnimationA, B: AnimationB, C: AnimationC, D: AnimationD, E: AnimationE,
};

export default function AnimationPreviewPage() {
  const [current, setCurrent] = useState("A");
  const [playing, setPlaying] = useState(true);
  const [key, setKey] = useState(0);
  const prevRef = useRef(current);

  function replay() { setKey((k) => k + 1); setPlaying(true); }

  function select(id: string) {
    setCurrent(id);
    prevRef.current = id;
    setKey((k) => k + 1);
    setPlaying(true);
  }

  const Anim = COMPONENTS[current];
  const meta = ANIMATIONS.find((a) => a.id === current)!;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#0a0f0b", color: "#fff" }}>
      {/* Header */}
      <div className="px-6 py-4 border-b flex items-center justify-between" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
        <div>
          <p className="text-[11px] uppercase tracking-widest font-medium" style={{ color: "rgba(255,255,255,0.35)" }}>
            Inferra AI — Welcome Animation Preview
          </p>
        </div>
        <button
          onClick={replay}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium transition-all"
          style={{ backgroundColor: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.5" />
          </svg>
          Replay
        </button>
      </div>

      {/* Animation stage */}
      <div className="relative mx-auto mt-6 rounded-2xl overflow-hidden"
        style={{ width: "min(420px, calc(100vw - 48px))", aspectRatio: "9/16", border: "1px solid rgba(255,255,255,0.08)" }}>
        <AnimatePresence mode="wait">
          <motion.div key={`${current}-${key}`} className="absolute inset-0"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}>
            <Anim onDone={() => setPlaying(false)} />
          </motion.div>
        </AnimatePresence>

        {/* Done overlay — replay prompt */}
        <AnimatePresence>
          {!playing && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
              style={{ backgroundColor: "rgba(0,0,0,0.55)", backdropFilter: "blur(4px)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={replay}
            >
              <div className="flex flex-col items-center gap-2 text-center">
                <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round">
                  <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.5" />
                </svg>
                <p className="text-[12px] font-light text-white/60">Click to replay</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Current label */}
      <div className="text-center mt-4 px-6">
        <p className="text-[18px] font-semibold text-white">{meta.id} — {meta.label}</p>
        <p className="text-[13px] font-light mt-1" style={{ color: "rgba(255,255,255,0.4)" }}>{meta.desc}</p>
      </div>

      {/* Selector */}
      <div className="flex gap-3 px-6 mt-6 pb-8 justify-center flex-wrap">
        {ANIMATIONS.map((a) => (
          <button
            key={a.id}
            onClick={() => select(a.id)}
            className="flex flex-col items-center gap-1 px-5 py-3 rounded-2xl transition-all text-left"
            style={{
              backgroundColor: current === a.id ? `${GREEN}18` : "rgba(255,255,255,0.04)",
              border: `1.5px solid ${current === a.id ? GREEN : "rgba(255,255,255,0.08)"}`,
              minWidth: "80px",
            }}
          >
            <span className="text-[22px] font-bold" style={{ color: current === a.id ? GREEN : "rgba(255,255,255,0.5)" }}>
              {a.id}
            </span>
            <span className="text-[11px] font-medium whitespace-nowrap" style={{ color: current === a.id ? "#fff" : "rgba(255,255,255,0.4)" }}>
              {a.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

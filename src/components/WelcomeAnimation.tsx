"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const GREEN = "#22c55e";

const PATHS = [
  "M 37.5 101.25 L 60 82.5 L 82.5 101.25",
  "M 22.5 75 L 60 52.5 L 97.5 75",
  "M 11.25 48.75 L 60 22.5 L 108.75 48.75",
];

const WORDS = ["Africa's", "AI", "Infrastructure", "Intelligence"];

export default function WelcomeAnimation() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Play once per browser session (clears on tab close / fresh login)
    if (!sessionStorage.getItem("inferra-welcomed")) {
      sessionStorage.setItem("inferra-welcomed", "1");
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 px-8"
        style={{ backgroundColor: "#f7f7f5" }}
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.035] pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(34,47,48,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,47,48,0.8) 1px, transparent 1px)`,
            backgroundSize: "36px 36px",
          }}
        />

        {/* Logo stroke draw */}
        <svg width="110" height="110" viewBox="0 0 120 120" fill="none">
          {PATHS.map((d, i) => (
            <motion.path
              key={i} d={d} fill="none"
              stroke="#222f30" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.55, delay: 0.2 + i * 0.3, ease: "easeInOut" }}
            />
          ))}
        </svg>

        {/* Staggered word reveal */}
        <motion.div
          className="flex flex-col items-center gap-0.5"
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.18, delayChildren: 1.4 } } }}
        >
          {WORDS.map((word, i) => (
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
              {word === "Infrastructure" && (
                <motion.div
                  className="absolute bottom-1 left-0 h-[3px] rounded-full"
                  style={{ backgroundColor: GREEN }}
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1.4 + i * 0.18 + 0.45, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </div>
          ))}
        </motion.div>

        {/* Inferra AI wordmark */}
        <motion.p
          className="text-[18px] font-semibold tracking-[-0.01em]"
          style={{ color: "#222f30" }}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          Inferra AI
        </motion.p>

        {/* Dismiss after animation completes */}
        <DismissAfter delay={3700} onDone={() => setVisible(false)} />
      </motion.div>
    </AnimatePresence>
  );
}

function DismissAfter({ delay, onDone }: { delay: number; onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, delay);
    return () => clearTimeout(t);
  }, [delay, onDone]);
  return null;
}

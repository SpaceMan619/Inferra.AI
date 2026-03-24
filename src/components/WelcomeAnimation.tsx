"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const GREEN = "#22c55e";

const PATHS = [
  "M 37.5 101.25 L 60 82.5 L 82.5 101.25",
  "M 22.5 75 L 60 52.5 L 97.5 75",
  "M 11.25 48.75 L 60 22.5 L 108.75 48.75",
];

const WORDS = ["Africa's", "AI", "Infrastructure", "Intelligence"];

export default function WelcomeAnimation() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (searchParams.get("welcome") === "1") {
      setVisible(true);
      // Strip the param from the URL immediately so refresh doesn't replay
      router.replace("/dashboard", { scroll: false });
    }
  }, [searchParams, router]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="welcome"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 px-8"
          style={{ backgroundColor: "#f7f7f5", willChange: "opacity" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Subtle grid */}
          <div
            className="absolute inset-0 pointer-events-none opacity-[0.035]"
            style={{
              backgroundImage: `linear-gradient(rgba(34,47,48,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(34,47,48,0.8) 1px, transparent 1px)`,
              backgroundSize: "36px 36px",
            }}
          />

          {/* Logo stroke draw */}
          <svg width="110" height="110" viewBox="0 0 120 120" fill="none"
            style={{ willChange: "transform" }}>
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
              <div key={i} className="relative" style={{ overflow: "hidden" }}>
                <motion.p
                  className="text-[32px] font-bold tracking-[-0.03em] leading-tight text-center"
                  style={{ color: "#222f30", willChange: "transform, opacity" }}
                  variants={{
                    hidden: { opacity: 0, y: 40 },
                    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
                  }}
                >
                  {word}
                </motion.p>
                {word === "Infrastructure" && (
                  <motion.div
                    className="absolute bottom-1 left-0 h-[3px] rounded-full"
                    style={{ backgroundColor: GREEN, willChange: "width" }}
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
            style={{ color: "#222f30", willChange: "transform, opacity" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            Inferra AI
          </motion.p>

          <DismissAfter delay={3700} onDone={() => setVisible(false)} />
        </motion.div>
      )}
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

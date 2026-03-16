"use client";

import { motion } from "framer-motion";
import type { ViewMode } from "@/types";

interface ModeToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div className="flex justify-center mb-8">
      <div
        className="relative inline-flex rounded-full p-1"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--glass-border)",
          boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        }}
      >
        <motion.div
          className="absolute top-1 bottom-1 rounded-full"
          style={{
            background: "var(--primary)",
            width: "calc(50% - 4px)",
          }}
          animate={{
            left: mode === "founder" ? 4 : "calc(50%)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        />
        <button
          onClick={() => onModeChange("founder")}
          className="relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer"
          style={{ color: mode === "founder" ? "#fff" : "var(--text-muted)" }}
        >
          Founder Mode
        </button>
        <button
          onClick={() => onModeChange("policy")}
          className="relative z-10 px-6 py-2.5 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer"
          style={{ color: mode === "policy" ? "#fff" : "var(--text-muted)" }}
        >
          Policy Mode
        </button>
      </div>
    </div>
  );
}

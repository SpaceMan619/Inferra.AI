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
        className="relative flex rounded-full p-1"
        style={{
          background: "var(--bg-surface)",
          border: "1px solid var(--glass-border)",
        }}
      >
        {/* Sliding indicator */}
        <motion.div
          layoutId="mode-indicator"
          className="absolute top-1 bottom-1 rounded-full"
          style={{
            background: "var(--glass-bg-hover)",
            border: "1px solid var(--glass-border)",
            width: "calc(50% - 4px)",
          }}
          animate={{
            left: mode === "founder" ? 4 : "calc(50%)",
          }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        />

        <button
          onClick={() => onModeChange("founder")}
          className="relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer"
          style={{
            color:
              mode === "founder"
                ? "var(--text-primary)"
                : "var(--text-muted)",
          }}
        >
          Founder Mode
        </button>
        <button
          onClick={() => onModeChange("policy")}
          className="relative z-10 px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer"
          style={{
            color:
              mode === "policy"
                ? "var(--text-primary)"
                : "var(--text-muted)",
          }}
        >
          Policy Mode
        </button>
      </div>
    </div>
  );
}

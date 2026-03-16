"use client";

import type { ViewMode } from "@/types";

interface ModeToggleProps {
  mode: ViewMode;
  onModeChange: (mode: ViewMode) => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div
      className="relative inline-flex rounded-full p-[3px]"
      style={{
        backgroundColor: "rgba(34, 47, 48, 0.06)",
      }}
    >
      <button
        onClick={() => onModeChange("founder")}
        className="relative z-10 px-3 sm:px-5 py-2 rounded-full text-[12px] sm:text-[13px] transition-all duration-300"
        style={{
          color: mode === "founder" ? "#fff" : "rgba(34, 47, 48, 0.6)",
          backgroundColor: mode === "founder" ? "#222f30" : "transparent",
          fontWeight: mode === "founder" ? 400 : 300,
        }}
        onMouseEnter={(e) => {
          if (mode !== "founder") e.currentTarget.style.color = "#222f30";
        }}
        onMouseLeave={(e) => {
          if (mode !== "founder") e.currentTarget.style.color = "rgba(34, 47, 48, 0.6)";
        }}
      >
        <span className="sm:hidden">Infra</span>
        <span className="hidden sm:inline">Infrastructure</span>
      </button>
      <button
        onClick={() => onModeChange("policy")}
        className="relative z-10 px-3 sm:px-5 py-2 rounded-full text-[12px] sm:text-[13px] transition-all duration-300"
        style={{
          color: mode === "policy" ? "#fff" : "rgba(34, 47, 48, 0.6)",
          backgroundColor: mode === "policy" ? "#222f30" : "transparent",
          fontWeight: mode === "policy" ? 400 : 300,
        }}
        onMouseEnter={(e) => {
          if (mode !== "policy") e.currentTarget.style.color = "#222f30";
        }}
        onMouseLeave={(e) => {
          if (mode !== "policy") e.currentTarget.style.color = "rgba(34, 47, 48, 0.6)";
        }}
      >
        Policy
      </button>
    </div>
  );
}

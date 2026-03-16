"use client";

import { motion } from "framer-motion";

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
      </svg>
    ),
  },
  {
    id: "map",
    label: "Map",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    id: "markets",
    label: "Markets",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
  },
  {
    id: "insights",
    label: "Insights",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
];

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function DashboardSidebar({ activeSection, onSectionChange }: DashboardSidebarProps) {
  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-[220px] flex flex-col z-40"
      style={{
        background: "var(--bg-deep)",
        borderRight: "1px solid var(--glass-border)",
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2.5">
        <div
          className="w-8 h-8 rounded-xl flex items-center justify-center"
          style={{ background: "var(--primary)" }}
        >
          <span className="text-white font-bold text-sm">I</span>
        </div>
        <span className="text-[15px] font-bold" style={{ color: "var(--text-primary)" }}>
          InferraAI
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200"
              style={{
                color: isActive ? "var(--primary)" : "var(--text-secondary)",
                background: isActive ? "rgba(79,70,229,0.08)" : "transparent",
              }}
            >
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "rgba(79,70,229,0.08)" }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.icon}</span>
              <span className="relative z-10">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* User placeholder */}
      <div
        className="px-5 py-4 flex items-center gap-3"
        style={{ borderTop: "1px solid var(--glass-border)" }}
      >
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[12px] font-bold"
          style={{ background: "rgba(79,70,229,0.1)", color: "var(--primary)" }}
        >
          U
        </div>
        <div>
          <p className="text-[12px] font-semibold" style={{ color: "var(--text-primary)" }}>
            User
          </p>
          <p className="text-[10px]" style={{ color: "var(--text-muted)" }}>
            Free plan
          </p>
        </div>
      </div>
    </aside>
  );
}

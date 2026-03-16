"use client";

import Link from "next/link";

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "map",
    label: "Map",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    id: "markets",
    label: "Markets",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
  },
  {
    id: "insights",
    label: "Insights",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
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
        backgroundColor: "#f7f7f5",
        borderRight: "1px solid rgba(34, 47, 48, 0.08)",
      }}
    >
      {/* Logo */}
      <div className="px-5 py-5 flex items-center gap-2.5">
        <Link href="/" className="flex items-center gap-2 group">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-semibold tracking-wide transition-transform duration-300 group-hover:scale-95"
            style={{ backgroundColor: "#222f30", color: "#fff" }}
          >
            iA
          </span>
          <span
            className="text-[14px] font-medium tracking-[-0.5px]"
            style={{ color: "#222f30" }}
          >
            InferraAI
          </span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className="relative flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] transition-all duration-200"
              style={{
                color: isActive ? "#222f30" : "rgba(34, 47, 48, 0.6)",
                backgroundColor: isActive ? "rgba(34, 47, 48, 0.07)" : "transparent",
                fontWeight: isActive ? 400 : 300,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "rgba(34, 47, 48, 0.04)";
                  e.currentTarget.style.color = "#222f30";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "rgba(34, 47, 48, 0.6)";
                }
              }}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom — Project Future */}
      <div
        className="px-5 py-4"
        style={{ borderTop: "1px solid rgba(34, 47, 48, 0.08)" }}
      >
        <p
          className="text-[11px] font-light"
          style={{ color: "rgba(34, 47, 48, 0.35)" }}
        >
          A Project Future initiative
        </p>
      </div>
    </aside>
  );
}

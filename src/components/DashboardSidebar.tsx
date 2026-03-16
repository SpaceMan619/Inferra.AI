"use client";

import Link from "next/link";

const NAV_ITEMS = [
  {
    id: "overview",
    label: "Overview",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    id: "map",
    label: "Map",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" /><line x1="8" y1="2" x2="8" y2="18" /><line x1="16" y1="6" x2="16" y2="22" />
      </svg>
    ),
  },
  {
    id: "markets",
    label: "Markets",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10" /><line x1="18" y1="20" x2="18" y2="4" /><line x1="6" y1="20" x2="6" y2="16" />
      </svg>
    ),
  },
  {
    id: "insights",
    label: "Insights",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" />
      </svg>
    ),
  },
];

// Subtle neon-adjacent green that works on the light background
const ACCENT = "#22c55e";

interface DashboardSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export default function DashboardSidebar({ activeSection, onSectionChange }: DashboardSidebarProps) {
  return (
    <>
      {/* ─── Desktop sidebar ─── */}
      <aside
        className="fixed left-0 top-0 bottom-0 w-[220px] hidden lg:flex flex-col z-40"
        style={{
          backgroundColor: "#f7f7f5",
          borderRight: "1px solid rgba(34, 47, 48, 0.08)",
        }}
      >
        {/* Logo */}
        <div className="px-5 py-5 flex items-center gap-2.5">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span
              className="flex h-7 w-7 items-center justify-center rounded-md text-[10px] font-semibold tracking-wide transition-all duration-200 group-hover:scale-95"
              style={{
                backgroundColor: "#222f30",
                color: "#fff",
                boxShadow: `0 0 0 0 ${ACCENT}40`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 10px 2px ${ACCENT}35`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 0 ${ACCENT}40`;
              }}
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

        {/* Divider */}
        <div className="mx-5 h-px" style={{ backgroundColor: "rgba(34, 47, 48, 0.07)" }} />

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
                  color: isActive ? "#222f30" : "rgba(34, 47, 48, 0.55)",
                  backgroundColor: isActive ? `${ACCENT}12` : "transparent",
                  fontWeight: isActive ? 500 : 400,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = `${ACCENT}08`;
                    e.currentTarget.style.color = "#222f30";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = "transparent";
                    e.currentTarget.style.color = "rgba(34, 47, 48, 0.55)";
                  }
                }}
              >
                {/* Active left accent bar */}
                <span
                  className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 rounded-full transition-all duration-200"
                  style={{
                    backgroundColor: isActive ? ACCENT : "transparent",
                    opacity: isActive ? 1 : 0,
                  }}
                />
                {/* Icon — green when active */}
                <span style={{ color: isActive ? ACCENT : "inherit" }}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Bottom */}
        <div
          className="px-5 py-4"
          style={{ borderTop: "1px solid rgba(34, 47, 48, 0.07)" }}
        >
          <p className="text-[11px] font-light" style={{ color: "rgba(34, 47, 48, 0.35)" }}>
            A Project Future initiative
          </p>
        </div>
      </aside>

      {/* ─── Mobile floating pill nav (iOS 26 liquid glass) ─── */}
      <div
        className="fixed left-0 right-0 z-50 flex lg:hidden justify-center pointer-events-none"
        style={{ bottom: "calc(20px + env(safe-area-inset-bottom))" }}
      >
        {/* Outer wrapper = gradient border (light hits top-left, dims at bottom-right) */}
        <div
          className="pointer-events-auto"
          style={{
            background: "linear-gradient(145deg, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.18) 45%, rgba(255,255,255,0.42) 100%)",
            borderRadius: "999px",
            padding: "1px",
            boxShadow: [
              "0 16px 48px rgba(34, 47, 48, 0.18)",
              "0 4px 12px rgba(34, 47, 48, 0.10)",
              "0 1px 3px rgba(34, 47, 48, 0.08)",
            ].join(", "),
          }}
        >
          {/* Inner pill = liquid glass surface */}
          <nav
            className="flex items-center gap-1 px-2 py-2"
            style={{
              background: "linear-gradient(145deg, rgba(255,255,255,0.28) 0%, rgba(247,247,245,0.10) 100%)",
              backdropFilter: "blur(40px) saturate(200%) brightness(1.08)",
              WebkitBackdropFilter: "blur(40px) saturate(200%) brightness(1.08)",
              borderRadius: "999px",
              boxShadow: [
                "inset 0 1.5px 0 rgba(255,255,255,0.95)",  // top specular highlight
                "inset 0 -1px 0 rgba(34,47,48,0.07)",      // bottom inner shadow
                "inset 1px 0 0 rgba(255,255,255,0.3)",     // left edge light
              ].join(", "),
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSectionChange(item.id)}
                  className="relative flex items-center transition-all duration-250"
                  style={{
                    borderRadius: "999px",
                    padding: isActive ? "8px 16px" : "8px 14px",
                    gap: isActive ? "7px" : "0",
                    background: isActive
                      ? "linear-gradient(145deg, rgba(34,47,48,0.11) 0%, rgba(34,47,48,0.06) 100%)"
                      : "transparent",
                    boxShadow: isActive
                      ? "inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -1px 0 rgba(34,47,48,0.08)"
                      : "none",
                    color: isActive ? "#222f30" : "rgba(34, 47, 48, 0.4)",
                  }}
                >
                  <span
                    style={{
                      color: isActive ? ACCENT : "inherit",
                      display: "flex",
                      alignItems: "center",
                      flexShrink: 0,
                    }}
                  >
                    {item.icon}
                  </span>
                  {/* Label slides open when active */}
                  <span
                    className="overflow-hidden transition-all duration-250 whitespace-nowrap text-[12px]"
                    style={{
                      maxWidth: isActive ? "80px" : "0px",
                      opacity: isActive ? 1 : 0,
                      fontWeight: 500,
                      color: "#222f30",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </>
  );
}

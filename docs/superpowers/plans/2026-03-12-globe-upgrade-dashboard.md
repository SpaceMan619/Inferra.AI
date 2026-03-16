# Globe Upgrade + Dashboard Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the COBE canvas globe with a react-globe.gl Three.js globe (submarine cable arcs, pulsing markers, atmosphere), and split the app into a public landing page (`/`) and a logged-in dashboard (`/dashboard`).

**Architecture:** The globe becomes a reusable `<Globe3D />` component with two modes — `interactive={false}` for the landing hero (auto-rotate, no controls) and `interactive={true}` for the dashboard (orbit controls, clickable markers, arcs). The landing page keeps Hero, StatsBar, Features, Insights, CTA, Footer. The dashboard gets a new layout with sidebar nav + main content area containing the interactive globe, MapView, CountryPanel, and ModeToggle (moved from ToolSection).

**Tech Stack:** Next.js 16 (App Router), React 19, react-globe.gl, three, framer-motion, Tailwind CSS 4, Mapbox GL

---

## Chunk 1: Globe Component + Landing Integration

### Task 1: Install react-globe.gl

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install the package**

```bash
cd ~/dev/inferraai && npm install react-globe.gl
```

- [ ] **Step 2: Verify install**

```bash
cd ~/dev/inferraai && node -e "require('react-globe.gl')" 2>&1 || echo "ESM only - that's fine for Next.js"
```

Expected: Package installs without errors. It's ESM-only which Next.js handles.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install react-globe.gl for 3D globe upgrade"
```

---

### Task 2: Create the Globe3D component

**Files:**
- Create: `src/components/Globe3D.tsx`

- [ ] **Step 1: Create the Globe3D component**

This component wraps `react-globe.gl` with two modes. It receives `interactive` prop to toggle between landing (auto-rotate eye candy) and dashboard (full interaction) modes.

Data to include:
- 7 African market markers (from current `RotatingGlobe.tsx` `AFRICA_MARKERS`)
- 24 global DC markers (from current `RotatingGlobe.tsx` `GLOBAL_DCS`)
- Submarine cable arcs connecting African markets to nearest global hubs
- Atmosphere glow
- Custom marker rendering with pulsing effect for African markets

```tsx
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

// Dynamic import — react-globe.gl uses Three.js which needs window
const GlobeGL = dynamic(() => import("react-globe.gl"), { ssr: false });

// ── African market markers ────────────────────────
const AFRICA_MARKETS = [
  { lat: -30.5, lng: 22.9, name: "South Africa", status: "Viable", color: "#10b981", size: 0.8 },
  { lat: 9.08, lng: 8.68, name: "Nigeria", status: "Emerging", color: "#f59e0b", size: 0.6 },
  { lat: -0.02, lng: 37.9, name: "Kenya", status: "Emerging", color: "#f59e0b", size: 0.6 },
  { lat: 26.82, lng: 30.8, name: "Egypt", status: "Viable", color: "#10b981", size: 0.8 },
  { lat: 31.79, lng: -7.09, name: "Morocco", status: "Emerging", color: "#f59e0b", size: 0.6 },
  { lat: 7.95, lng: -1.02, name: "Ghana", status: "Emerging", color: "#f59e0b", size: 0.6 },
  { lat: -1.94, lng: 29.87, name: "Rwanda", status: "Early", color: "#ef4444", size: 0.5 },
];

// ── Global DC hubs (subtle markers) ───────────────
const GLOBAL_DCS = [
  { lat: 38.9, lng: -77.4, name: "Virginia", size: 0.3 },
  { lat: 51.5, lng: -0.1, name: "London", size: 0.3 },
  { lat: 50.1, lng: 8.7, name: "Frankfurt", size: 0.3 },
  { lat: 48.9, lng: 2.3, name: "Paris", size: 0.3 },
  { lat: 1.3, lng: 103.8, name: "Singapore", size: 0.3 },
  { lat: 35.7, lng: 139.7, name: "Tokyo", size: 0.3 },
  { lat: -33.9, lng: 151.2, name: "Sydney", size: 0.3 },
  { lat: 25.3, lng: 55.3, name: "Dubai", size: 0.3 },
  { lat: 19.1, lng: 72.9, name: "Mumbai", size: 0.3 },
  { lat: 13.1, lng: 77.6, name: "Bangalore", size: 0.3 },
];

// ── Submarine cable arcs (Africa ↔ global hubs) ──
const CABLE_ARCS = [
  // South Africa connections
  { startLat: -30.5, startLng: 22.9, endLat: 51.5, endLng: -0.1, color: ["#10b98140", "#4f46e540"] },
  { startLat: -30.5, startLng: 22.9, endLat: 19.1, endLng: 72.9, color: ["#10b98140", "#f59e0b40"] },
  // Nigeria connections
  { startLat: 9.08, startLng: 8.68, endLat: 51.5, endLng: -0.1, color: ["#f59e0b40", "#4f46e540"] },
  { startLat: 9.08, startLng: 8.68, endLat: 38.9, endLng: -77.4, color: ["#f59e0b40", "#4f46e540"] },
  // Kenya connections
  { startLat: -0.02, startLng: 37.9, endLat: 19.1, endLng: 72.9, color: ["#f59e0b40", "#4f46e540"] },
  { startLat: -0.02, startLng: 37.9, endLat: 25.3, endLng: 55.3, color: ["#f59e0b40", "#4f46e540"] },
  // Egypt connections
  { startLat: 26.82, startLng: 30.8, endLat: 50.1, endLng: 8.7, color: ["#10b98140", "#4f46e540"] },
  { startLat: 26.82, startLng: 30.8, endLat: 19.1, endLng: 72.9, color: ["#10b98140", "#4f46e540"] },
  // Morocco connections
  { startLat: 31.79, startLng: -7.09, endLat: 48.9, endLng: 2.3, color: ["#f59e0b40", "#4f46e540"] },
  { startLat: 31.79, startLng: -7.09, endLat: 38.9, endLng: -77.4, color: ["#f59e0b40", "#4f46e540"] },
  // Ghana connections
  { startLat: 7.95, startLng: -1.02, endLat: 51.5, endLng: -0.1, color: ["#f59e0b40", "#4f46e540"] },
  // Rwanda connections
  { startLat: -1.94, startLng: 29.87, endLat: -0.02, endLng: 37.9, color: ["#ef444440", "#f59e0b40"] },
];

// Combine all markers
const ALL_MARKERS = [
  ...AFRICA_MARKETS.map((m) => ({ ...m, isAfrica: true })),
  ...GLOBAL_DCS.map((m) => ({ ...m, status: "Global DC", color: "#6366f1", isAfrica: false })),
];

interface Globe3DProps {
  interactive?: boolean;
  width?: number;
  height?: number;
  onMarkerClick?: (marker: { name: string; status: string }) => void;
  className?: string;
}

export default function Globe3D({
  interactive = false,
  width = 520,
  height = 520,
  onMarkerClick,
  className = "",
}: Globe3DProps) {
  const globeRef = useRef<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Set initial POV to Africa
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.pointOfView({ lat: 5, lng: 20, altitude: 2.2 }, 0);

      // Configure controls based on mode
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = !interactive;
        controls.autoRotateSpeed = 0.4;
        controls.enableZoom = interactive;
        controls.enablePan = false;
        controls.enableRotate = interactive;

        if (!interactive) {
          controls.minDistance = 250;
          controls.maxDistance = 250;
        }
      }
    }
  }, [interactive, isClient]);

  const handleMarkerClick = useCallback(
    (point: any) => {
      if (interactive && onMarkerClick && point.isAfrica) {
        onMarkerClick({ name: point.name, status: point.status });
      }
    },
    [interactive, onMarkerClick]
  );

  if (!isClient) {
    return (
      <div
        className={className}
        style={{ width, height, background: "transparent" }}
      />
    );
  }

  return (
    <div className={className} style={{ width, height }}>
      <GlobeGL
        ref={globeRef}
        width={width}
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        atmosphereColor="#4f46e5"
        atmosphereAltitude={0.18}
        showAtmosphere={true}
        pointsData={ALL_MARKERS}
        pointLat="lat"
        pointLng="lng"
        pointColor="color"
        pointAltitude={(d: any) => (d.isAfrica ? 0.06 : 0.01)}
        pointRadius={(d: any) => (d.isAfrica ? d.size : d.size)}
        pointsMerge={false}
        onPointClick={handleMarkerClick}
        arcsData={CABLE_ARCS}
        arcStartLat="startLat"
        arcStartLng="startLng"
        arcEndLat="endLat"
        arcEndLng="endLng"
        arcColor="color"
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000}
        arcStroke={0.5}
        labelsData={interactive ? AFRICA_MARKETS : []}
        labelLat="lat"
        labelLng="lng"
        labelText="name"
        labelSize={1.2}
        labelColor={() => "#ffffff"}
        labelDotRadius={0.4}
        labelAltitude={0.07}
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify it compiles**

```bash
cd ~/dev/inferraai && npx next build 2>&1 | tail -20
```

Expected: Build succeeds (or only non-Globe-related warnings).

- [ ] **Step 3: Commit**

```bash
git add src/components/Globe3D.tsx
git commit -m "feat: add Globe3D component with react-globe.gl, cable arcs, and dual mode"
```

---

### Task 3: Update Hero to use Globe3D

**Files:**
- Modify: `src/components/Hero.tsx`

- [ ] **Step 1: Replace RotatingGlobe import with Globe3D**

In `Hero.tsx`, change the import from `RotatingGlobe` to `Globe3D` and update the JSX. The globe in the hero is non-interactive (landing mode).

Replace:
```tsx
import RotatingGlobe from "./RotatingGlobe";
```
With:
```tsx
import Globe3D from "./Globe3D";
```

Replace the globe render section (inside the motion.div for the globe):
```tsx
<div className="relative">
  <RotatingGlobe />
</div>
```
With:
```tsx
<div className="relative">
  <Globe3D interactive={false} width={520} height={520} className="hidden xl:block" />
  <Globe3D interactive={false} width={420} height={420} className="hidden md:block xl:hidden" />
  <Globe3D interactive={false} width={300} height={300} className="hidden sm:block md:hidden" />
  <Globe3D interactive={false} width={240} height={240} className="block sm:hidden" />
</div>
```

- [ ] **Step 2: Verify dev server renders correctly**

```bash
cd ~/dev/inferraai && npm run dev
```

Open `http://localhost:3000` and verify the globe renders with atmosphere, cable arcs, and African market markers.

- [ ] **Step 3: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: swap COBE globe for Globe3D in hero section"
```

---

## Chunk 2: Dashboard Page + Layout

### Task 4: Create dashboard layout

**Files:**
- Create: `src/app/dashboard/page.tsx`
- Create: `src/app/dashboard/layout.tsx`
- Create: `src/components/DashboardSidebar.tsx`

- [ ] **Step 1: Create DashboardSidebar component**

A slim sidebar with the InferraAI logo, navigation links (Overview, Map, Markets, Insights), and a user placeholder section at the bottom.

```tsx
// src/components/DashboardSidebar.tsx
"use client";

import { useState } from "react";
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

      {/* User section placeholder */}
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
```

- [ ] **Step 2: Create dashboard layout**

```tsx
// src/app/dashboard/layout.tsx
export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 3: Create dashboard page**

This page brings together the sidebar, Globe3D (interactive mode), MapView, CountryPanel, and ModeToggle — essentially what ToolSection was, but in its own route with a proper dashboard layout.

```tsx
// src/app/dashboard/page.tsx
import fs from "fs/promises";
import path from "path";
import { CountryData } from "@/types";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const filePath = path.join(process.cwd(), "public", "data", "countries.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const countries: CountryData[] = JSON.parse(raw);

  return <DashboardClient countries={countries} />;
}
```

- [ ] **Step 4: Commit**

```bash
git add src/app/dashboard/ src/components/DashboardSidebar.tsx
git commit -m "feat: add dashboard route with sidebar navigation"
```

---

### Task 5: Create DashboardClient component

**Files:**
- Create: `src/components/DashboardClient.tsx`

- [ ] **Step 1: Create the DashboardClient**

This is the main dashboard client component. It manages state for active section, selected country, and view mode. Renders DashboardSidebar + content area with Globe3D, MapView, CountryPanel, and ModeToggle.

```tsx
// src/components/DashboardClient.tsx
"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DashboardSidebar from "./DashboardSidebar";
import Globe3D from "./Globe3D";
import MapView from "./MapView";
import CountryPanel from "./CountryPanel";
import ModeToggle from "./ModeToggle";
import type { CountryData, ViewMode } from "@/types";

interface DashboardClientProps {
  countries: CountryData[];
}

export default function DashboardClient({ countries }: DashboardClientProps) {
  const [activeSection, setActiveSection] = useState("overview");
  const [selectedCountry, setSelectedCountry] = useState("South Africa");
  const [mode, setMode] = useState<ViewMode>("founder");

  const countryData = countries.find((c) => c.country === selectedCountry) || countries[0];

  const handleMarkerClick = useCallback(
    (marker: { name: string }) => {
      const match = countries.find((c) => c.country === marker.name);
      if (match) setSelectedCountry(match.country);
    },
    [countries]
  );

  return (
    <div className="flex min-h-screen" style={{ background: "var(--bg-deep)" }}>
      <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Main content — offset by sidebar width */}
      <main className="flex-1 ml-[220px]">
        {/* Top bar */}
        <header
          className="sticky top-0 z-30 flex items-center justify-between px-6 py-4"
          style={{
            background: "rgba(250,250,248,0.8)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--glass-border)",
          }}
        >
          <div>
            <h1 className="text-[18px] font-bold" style={{ color: "var(--text-primary)" }}>
              {activeSection === "overview" && "Dashboard Overview"}
              {activeSection === "map" && "Infrastructure Map"}
              {activeSection === "markets" && "Market Analysis"}
              {activeSection === "insights" && "AI Insights"}
            </h1>
            <p className="text-[12px]" style={{ color: "var(--text-muted)" }}>
              Real-time inference readiness across 7 African markets
            </p>
          </div>
          <ModeToggle mode={mode} setMode={setMode} />
        </header>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            {activeSection === "overview" && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Overview: Globe + quick stats + country panel */}
                <div className="flex gap-6 flex-col xl:flex-row">
                  {/* Globe */}
                  <div
                    className="rounded-2xl overflow-hidden flex-shrink-0 flex items-center justify-center"
                    style={{
                      background: "var(--bg-surface)",
                      border: "1px solid var(--glass-border)",
                    }}
                  >
                    <Globe3D
                      interactive
                      width={520}
                      height={520}
                      onMarkerClick={handleMarkerClick}
                    />
                  </div>

                  {/* Country Panel */}
                  <div className="flex-1 min-w-[320px]">
                    <CountryPanel country={countryData} mode={mode} />
                  </div>
                </div>

                {/* Country quick-select */}
                <div className="flex flex-wrap gap-2 mt-6">
                  {countries.map((c) => (
                    <button
                      key={c.country}
                      onClick={() => setSelectedCountry(c.country)}
                      className="px-4 py-2 rounded-xl text-[13px] font-medium transition-all duration-200"
                      style={{
                        background:
                          selectedCountry === c.country
                            ? "var(--primary)"
                            : "var(--bg-surface)",
                        color:
                          selectedCountry === c.country
                            ? "#fff"
                            : "var(--text-secondary)",
                        border: `1px solid ${
                          selectedCountry === c.country
                            ? "var(--primary)"
                            : "var(--glass-border)"
                        }`,
                      }}
                    >
                      {c.country}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "map" && (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex gap-6 flex-col xl:flex-row">
                  <div className="flex-1 rounded-2xl overflow-hidden" style={{ minHeight: 560 }}>
                    <MapView
                      countries={countries}
                      mode={mode}
                      selectedCountry={selectedCountry}
                      onSelectCountry={setSelectedCountry}
                    />
                  </div>
                  <div className="w-full xl:w-[380px]">
                    <CountryPanel country={countryData} mode={mode} />
                  </div>
                </div>
              </motion.div>
            )}

            {activeSection === "markets" && (
              <motion.div
                key="markets"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {countries.map((c) => (
                    <button
                      key={c.country}
                      onClick={() => {
                        setSelectedCountry(c.country);
                        setActiveSection("overview");
                      }}
                      className="text-left p-5 rounded-2xl transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: "var(--bg-surface)",
                        border: "1px solid var(--glass-border)",
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[15px] font-bold" style={{ color: "var(--text-primary)" }}>
                          {c.country}
                        </h3>
                        <span
                          className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                          style={{
                            background:
                              c.readiness === "Viable"
                                ? "rgba(16,185,129,0.1)"
                                : c.readiness === "Emerging"
                                ? "rgba(245,158,11,0.1)"
                                : "rgba(239,68,68,0.1)",
                            color:
                              c.readiness === "Viable"
                                ? "#10b981"
                                : c.readiness === "Emerging"
                                ? "#f59e0b"
                                : "#ef4444",
                          }}
                        >
                          {c.readiness}
                        </span>
                      </div>
                      <p className="text-[12px] mb-2" style={{ color: "var(--text-muted)" }}>
                        {c.founderInsight}
                      </p>
                      <div className="flex gap-4 text-[11px]" style={{ color: "var(--text-secondary)" }}>
                        <span>GPU: {c.gpuAvailability}</span>
                        <span>Latency: {c.avgLatency}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {activeSection === "insights" && (
              <motion.div
                key="insights"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="rounded-2xl p-8 text-center"
                  style={{
                    background: "var(--bg-surface)",
                    border: "1px solid var(--glass-border)",
                  }}
                >
                  <p className="text-[15px]" style={{ color: "var(--text-secondary)" }}>
                    AI-powered insights coming soon. This section will feature trend analysis,
                    market comparisons, and predictive readiness scoring.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
cd ~/dev/inferraai && npx next build 2>&1 | tail -20
```

- [ ] **Step 3: Commit**

```bash
git add src/components/DashboardClient.tsx
git commit -m "feat: add DashboardClient with overview, map, markets, and insights sections"
```

---

### Task 6: Clean up landing page

**Files:**
- Modify: `src/components/ClientApp.tsx`

- [ ] **Step 1: Remove ToolSection from landing**

In `ClientApp.tsx`, remove the `ToolSection` import and its usage. The landing page should be: Navbar → Hero → StatsBar → Features → Insights → CTA → Footer.

Remove:
```tsx
import ToolSection from "./ToolSection";
```

Remove the `<ToolSection countries={countries} />` line.

Also remove the `countries` prop from `ClientApp` if no other component needs it — but `StatsBar` uses it, so keep it.

- [ ] **Step 2: Verify landing page still works**

```bash
cd ~/dev/inferraai && npm run dev
```

Open `http://localhost:3000` — should show the marketing landing page without the interactive tool section.
Open `http://localhost:3000/dashboard` — should show the full dashboard.

- [ ] **Step 3: Commit**

```bash
git add src/components/ClientApp.tsx
git commit -m "refactor: remove ToolSection from landing page, now lives in /dashboard"
```

---

### Task 7: Add dashboard link to Navbar

**Files:**
- Modify: `src/components/Navbar.tsx`

- [ ] **Step 1: Update nav links**

Change the "Log in" button to link to `/dashboard` (temporary — will become auth-gated later). Keep the existing nav structure but make sure there's a clear path to the dashboard.

- [ ] **Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: update navbar with dashboard link"
```

---

### Task 8: Final verification

- [ ] **Step 1: Full build check**

```bash
cd ~/dev/inferraai && npx next build
```

Expected: Clean build with no errors.

- [ ] **Step 2: Manual smoke test**

- Landing page (`/`): Hero with 3D globe (auto-rotating, cable arcs visible), StatsBar, Features, Insights, CTA, Footer
- Dashboard (`/dashboard`): Sidebar nav, interactive globe, country panel, map view, mode toggle
- Globe interaction: Click African markers to select countries
- Navigation: Sidebar sections switch correctly
- Responsive: Landing globe resizes, dashboard sidebar is fixed

- [ ] **Step 3: Final commit**

```bash
git add -A
git commit -m "feat: complete globe upgrade and dashboard implementation"
```

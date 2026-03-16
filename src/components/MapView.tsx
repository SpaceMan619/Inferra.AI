"use client";

import { useState, useRef } from "react";
import { Map, Marker } from "react-map-gl/mapbox";
import type { CountryData, ViewMode } from "@/types";
import {
  FOUNDER_COLORS,
  POLICY_COLORS,
  INITIAL_VIEW_STATE,
  MAPBOX_STYLE,
} from "@/lib/mapConfig";

interface MapViewProps {
  countries: CountryData[];
  mode: ViewMode;
  selectedCountry: string;
  onSelectCountry: (name: string) => void;
}

const READINESS_SIZE: Record<string, number> = {
  Viable: 32,
  Emerging: 26,
  "Emerging (Early)": 20,
};

function rgbaToCSS(arr: number[]): string {
  return `rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, ${(arr[3] ?? 255) / 255})`;
}

export default function MapView({
  countries,
  mode,
  selectedCountry,
  onSelectCountry,
}: MapViewProps) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    country: CountryData;
  } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const colorMap = mode === "policy" ? POLICY_COLORS : FOUNDER_COLORS;
  const colorKey =
    mode === "policy" ? "ai_policy_signal" : "ai_inference_readiness";

  const statusLabel = mode === "founder" ? "Readiness" : "Policy";

  return (
    <div
      ref={containerRef}
      className="map-wrap relative w-full h-full"
      style={{ minHeight: "clamp(350px, 60vh, 550px)" }}
    >
      {mapboxToken && (
        <Map
          initialViewState={INITIAL_VIEW_STATE}
          mapboxAccessToken={mapboxToken}
          mapStyle={MAPBOX_STYLE}
          attributionControl={false}
          dragRotate={false}
          pitchWithRotate={false}
          touchPitch={false}
          style={{ width: "100%", height: "100%" }}
        >
          {countries.map((c) => {
            const key = c[colorKey] as string;
            const color = colorMap[key] || [156, 163, 175, 160];
            const size = READINESS_SIZE[c.ai_inference_readiness] || 20;
            const isSelected = c.country === selectedCountry;
            const cssColor = rgbaToCSS([...color.slice(0, 3), 255]);

            return (
              <Marker
                key={c.country}
                latitude={c.latitude}
                longitude={c.longitude}
                anchor="center"
              >
                {/*
                  Single container div centered by the Marker anchor="center".
                  Everything inside is positioned relative to this center.
                */}
                <div
                  className="relative cursor-pointer group"
                  style={{ width: size, height: size }}
                  onClick={() => onSelectCountry(c.country)}
                  onMouseEnter={(e) => {
                    const rect =
                      containerRef.current?.getBoundingClientRect();
                    if (rect) {
                      setTooltip({
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                        country: c,
                      });
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  {/* Selection ring — centered via inset negative margins */}
                  {isSelected && (
                    <>
                      <div
                        className="absolute rounded-full animate-ping"
                        style={{
                          inset: -8,
                          background: `${cssColor}20`,
                          animationDuration: "2s",
                        }}
                      />
                      <div
                        className="absolute rounded-full"
                        style={{
                          inset: -6,
                          border: `2.5px solid ${cssColor}`,
                          opacity: 0.6,
                        }}
                      />
                    </>
                  )}
                  {/* Core dot */}
                  <div
                    className="absolute inset-0 rounded-full transition-transform duration-200 group-hover:scale-110"
                    style={{
                      background: `radial-gradient(circle at 35% 35%, ${cssColor}, ${rgbaToCSS(color)})`,
                      border: "2px solid rgba(255,255,255,0.85)",
                      boxShadow: `0 2px 8px ${rgbaToCSS([...color.slice(0, 3), 80])}`,
                    }}
                  />
                </div>
              </Marker>
            );
          })}
        </Map>
      )}

      {/* Custom tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-20 rounded-xl px-3.5 py-2.5"
          style={{
            left: tooltip.x + 14,
            top: tooltip.y - 14,
            background: "white",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            border: "1px solid rgba(0,0,0,0.06)",
          }}
        >
          <div className="text-sm font-bold" style={{ color: "#111827" }}>
            {tooltip.country.country}
          </div>
          <div className="text-xs" style={{ color: "#6b7280" }}>
            {statusLabel}:{" "}
            {mode === "founder"
              ? tooltip.country.ai_inference_readiness
              : tooltip.country.ai_policy_signal}
          </div>
        </div>
      )}

      {/* Mode badge */}
      <div
        className="absolute top-4 left-4 glass px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--text-muted)" }}
      >
        {mode === "founder" ? "Infrastructure" : "Policy"} Layer
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 glass rounded-xl px-4 py-3 flex flex-col gap-1.5">
        {mode === "founder" ? (
          <>
            <LegendItem color="var(--secondary)" label="Viable" />
            <LegendItem color="var(--accent)" label="Emerging" />
            <LegendItem color="var(--danger)" label="Early Stage" />
          </>
        ) : (
          <>
            <LegendItem color="var(--primary)" label="Strong Signal" />
            <LegendItem color="var(--accent)" label="Emerging" />
            <LegendItem color="#9ca3af" label="Unclear" />
          </>
        )}
      </div>
    </div>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-2.5 h-2.5 rounded-full"
        style={{ background: color }}
      />
      <span
        className="text-[11px] font-medium"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
    </div>
  );
}

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
      className="relative w-full h-full overflow-hidden"
      style={{
        minHeight: "clamp(350px, 60vh, 550px)",
        borderRadius: "16px",
        border: "1px solid rgba(34, 47, 48, 0.08)",
      }}
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
                          border: `2px solid ${cssColor}`,
                          opacity: 0.5,
                        }}
                      />
                    </>
                  )}
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

      {/* Tooltip */}
      {tooltip && (
        <div
          className="absolute pointer-events-none z-20 rounded-xl px-3.5 py-2.5"
          style={{
            left: tooltip.x + 14,
            top: tooltip.y - 14,
            backgroundColor: "#fff",
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
            border: "1px solid rgba(34, 47, 48, 0.08)",
          }}
        >
          <div
            className="text-[13px] font-normal"
            style={{ color: "#222f30" }}
          >
            {tooltip.country.country}
          </div>
          <div
            className="text-[11px] font-light"
            style={{ color: "rgba(34, 47, 48, 0.45)" }}
          >
            {statusLabel}:{" "}
            {mode === "founder"
              ? tooltip.country.ai_inference_readiness
              : tooltip.country.ai_policy_signal}
          </div>
        </div>
      )}

      {/* Mode badge */}
      <div
        className="absolute top-4 left-4 px-3.5 py-2 rounded-xl text-[11px] font-light uppercase tracking-wider"
        style={{
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          color: "rgba(34, 47, 48, 0.5)",
          border: "1px solid rgba(34, 47, 48, 0.08)",
        }}
      >
        {mode === "founder" ? "Infrastructure" : "Policy"} layer
      </div>

      {/* Legend */}
      <div
        className="absolute bottom-4 left-4 rounded-xl px-4 py-3 flex flex-col gap-1.5"
        style={{
          backgroundColor: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(34, 47, 48, 0.08)",
        }}
      >
        {mode === "founder" ? (
          <>
            <LegendItem color="#059669" label="Viable" />
            <LegendItem color="#d97706" label="Emerging" />
            <LegendItem color="#dc2626" label="Early Stage" />
          </>
        ) : (
          <>
            <LegendItem color="#222f30" label="Strong Signal" />
            <LegendItem color="#d97706" label="Emerging" />
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
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <span
        className="text-[11px] font-light"
        style={{ color: "rgba(34, 47, 48, 0.5)" }}
      >
        {label}
      </span>
    </div>
  );
}

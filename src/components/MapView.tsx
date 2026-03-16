"use client";

import { useMemo, useCallback, useState } from "react";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { Map } from "react-map-gl/mapbox";
import type { CountryData, ViewMode } from "@/types";
import type { PickingInfo } from "@deck.gl/core";
import {
  FOUNDER_COLORS,
  POLICY_COLORS,
  RADIUS_MAP,
  INITIAL_VIEW_STATE,
  MAPBOX_STYLE,
} from "@/lib/mapConfig";

interface MapViewProps {
  countries: CountryData[];
  mode: ViewMode;
  selectedCountry: string;
  onSelectCountry: (name: string) => void;
}

export default function MapView({
  countries,
  mode,
  selectedCountry,
  onSelectCountry,
}: MapViewProps) {
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  const handleClick = useCallback(
    (info: PickingInfo) => {
      if (info.object) {
        const country = info.object as CountryData;
        onSelectCountry(country.country);
      }
    },
    [onSelectCountry]
  );

  const layers = useMemo(() => {
    const colorMap = mode === "policy" ? POLICY_COLORS : FOUNDER_COLORS;
    const colorKey =
      mode === "policy" ? "ai_policy_signal" : "ai_inference_readiness";

    return [
      // Main country dots
      new ScatterplotLayer({
        id: "countries",
        data: countries,
        getPosition: (d: CountryData) => [d.longitude, d.latitude],
        getFillColor: (d: CountryData) => {
          const key = d[colorKey] as string;
          return colorMap[key] || [156, 163, 175, 160];
        },
        getRadius: (d: CountryData) =>
          RADIUS_MAP[d.ai_inference_readiness] || 130000,
        radiusMinPixels: 14,
        radiusMaxPixels: 45,
        pickable: true,
        stroked: true,
        getLineColor: [255, 255, 255, 200],
        getLineWidth: 2,
        lineWidthMinPixels: 2,
        onClick: handleClick,
        autoHighlight: true,
        highlightColor: [79, 70, 229, 50],
        updateTriggers: {
          getFillColor: mode,
        },
        transitions: {
          getFillColor: { duration: 400 },
        },
      }),

      // Selection ring
      new ScatterplotLayer({
        id: "selection-ring",
        data: countries.filter((c) => c.country === selectedCountry),
        getPosition: (d: CountryData) => [d.longitude, d.latitude],
        getRadius: (d: CountryData) =>
          (RADIUS_MAP[d.ai_inference_readiness] || 130000) * 1.5,
        radiusMinPixels: 20,
        radiusMaxPixels: 60,
        filled: false,
        stroked: true,
        getLineColor: [79, 70, 229, 160],
        getLineWidth: 5000,
        lineWidthMinPixels: 3,
        lineWidthMaxPixels: 4,
        pickable: false,
      }),
    ];
  }, [countries, mode, selectedCountry, handleClick]);

  // Tooltip
  const getTooltip = useCallback(
    ({ object }: PickingInfo) => {
      if (!object) return null;
      const c = object as CountryData;
      const status =
        mode === "founder" ? c.ai_inference_readiness : c.ai_policy_signal;
      return {
        html: `<div style="padding:8px 12px;font-family:Inter,sans-serif;font-size:13px">
          <strong style="font-size:14px">${c.country}</strong><br/>
          <span style="color:#6b7280">${mode === "founder" ? "Readiness" : "Policy"}: ${status}</span>
        </div>`,
        style: {
          background: "white",
          borderRadius: "10px",
          boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.06)",
          color: "#111827",
        },
      };
    },
    [mode]
  );

  return (
    <div className="map-wrap relative w-full h-full" style={{ minHeight: "550px" }}>
      <DeckGL
        viewState={viewState}
        onViewStateChange={({ viewState: vs }) => setViewState(vs as typeof INITIAL_VIEW_STATE)}
        controller={{ dragRotate: false }}
        layers={layers}
        getTooltip={getTooltip}
        getCursor={({ isHovering }) => (isHovering ? "pointer" : "grab")}
        style={{ position: "relative", width: "100%", height: "100%" }}
      >
        {mapboxToken && (
          <Map
            mapboxAccessToken={mapboxToken}
            mapStyle={MAPBOX_STYLE}
            attributionControl={false}
          />
        )}
      </DeckGL>

      {/* Mode badge */}
      <div
        className="absolute top-4 left-4 glass px-3.5 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider"
        style={{ color: "var(--text-muted)" }}
      >
        {mode === "founder" ? "Infrastructure" : "Policy"} Layer
      </div>

      {/* Legend */}
      <div
        className="absolute bottom-4 left-4 glass rounded-xl px-4 py-3 flex flex-col gap-1.5"
      >
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
      <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
      <span className="text-[11px] font-medium" style={{ color: "var(--text-muted)" }}>
        {label}
      </span>
    </div>
  );
}

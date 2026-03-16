"use client";

import { useMemo, useCallback } from "react";
import DeckGL from "@deck.gl/react";
import { ScatterplotLayer, PathLayer } from "@deck.gl/layers";
import { Map } from "react-map-gl/mapbox";
import type { CountryData, ViewMode } from "@/types";
import type { PickingInfo } from "@deck.gl/core";
import {
  FOUNDER_COLORS,
  POLICY_COLORS,
  RADIUS_MAP,
  REGIONAL_HUBS,
  EU_HUB,
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

  // Build path data for inference routing lines
  const pathData = useMemo(() => {
    const paths: { path: [number, number][] }[] = [];
    for (const c of countries) {
      const start: [number, number] = [c.longitude, c.latitude];
      const route = c.primary_inference_route;
      if (route === "Regional-Tethered") {
        const hub = REGIONAL_HUBS[c.region];
        if (hub) paths.push({ path: [start, [hub.lon, hub.lat]] });
      } else if (route === "Hybrid-Edge") {
        paths.push({ path: [start, [EU_HUB.lon, EU_HUB.lat]] });
      }
    }
    return paths;
  }, [countries]);

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
      // Routing paths
      new PathLayer({
        id: "paths",
        data: pathData,
        getPath: (d: { path: [number, number][] }) => d.path,
        getWidth: 3,
        getColor: [79, 70, 229, 60],
        widthMinPixels: 1,
        widthMaxPixels: 4,
        pickable: false,
      }),

      // Main scatter dots
      new ScatterplotLayer({
        id: "countries",
        data: countries,
        getPosition: (d: CountryData) => [d.longitude, d.latitude],
        getFillColor: (d: CountryData) => {
          const key = d[colorKey] as string;
          return colorMap[key] || [107, 90, 69, 140];
        },
        getRadius: (d: CountryData) =>
          RADIUS_MAP[d.ai_inference_readiness] || 130000,
        radiusMinPixels: 12,
        radiusMaxPixels: 40,
        pickable: true,
        stroked: true,
        getLineColor: [255, 255, 255, 180],
        getLineWidth: 2,
        lineWidthMinPixels: 1,
        onClick: handleClick,
        autoHighlight: true,
        highlightColor: [79, 70, 229, 60],
        updateTriggers: {
          getFillColor: mode,
        },
        transitions: {
          getFillColor: { duration: 500 },
        },
      }),

      // Selection halo
      new ScatterplotLayer({
        id: "selection-halo",
        data: countries.filter((c) => c.country === selectedCountry),
        getPosition: (d: CountryData) => [d.longitude, d.latitude],
        getRadius: (d: CountryData) =>
          (RADIUS_MAP[d.ai_inference_readiness] || 130000) * 1.4,
        radiusMinPixels: 18,
        radiusMaxPixels: 55,
        filled: false,
        stroked: true,
        getLineColor: [79, 70, 229, 180],
        getLineWidth: 6000,
        lineWidthMinPixels: 3,
        lineWidthMaxPixels: 5,
        pickable: false,
      }),
    ];
  }, [countries, mode, selectedCountry, pathData, handleClick]);

  return (
    <div className="map-container relative w-full h-full min-h-[500px]">
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
        getCursor={({ isHovering }) =>
          isHovering ? "pointer" : "grab"
        }
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

      {/* Mode indicator label */}
      <div
        className="absolute top-4 left-4 glass-panel px-3 py-1.5 text-xs tracking-wider uppercase"
        style={{ color: "var(--text-muted)", borderRadius: "8px" }}
      >
        {mode === "founder" ? "Infrastructure Layer" : "Policy Layer"}
      </div>
    </div>
  );
}

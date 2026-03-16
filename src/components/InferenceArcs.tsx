"use client";

import { useEffect, useRef, useMemo } from "react";
import { Source, Layer, useMap } from "react-map-gl/mapbox";
import type { LayerProps } from "react-map-gl/mapbox";
import type { CountryData } from "@/types";
import { ROUTE_CONFIGS } from "@/lib/routeData";

// Spherical linear interpolation between two geographic points.
// Returns an array of [lng, lat] GeoJSON coordinate pairs.
function arcPoints(
  from: [number, number], // [lng, lat]
  to: [number, number],   // [lng, lat]
  steps = 50,
): [number, number][] {
  const D2R = Math.PI / 180;
  const R2D = 180 / Math.PI;
  const lat1 = from[1] * D2R, lng1 = from[0] * D2R;
  const lat2 = to[1] * D2R,   lng2 = to[0] * D2R;
  const d = 2 * Math.asin(
    Math.sqrt(
      Math.sin((lat2 - lat1) / 2) ** 2 +
      Math.cos(lat1) * Math.cos(lat2) * Math.sin((lng2 - lng1) / 2) ** 2,
    ),
  );
  if (d < 0.0001) return [from, to];
  const pts: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const f = i / steps;
    const A = Math.sin((1 - f) * d) / Math.sin(d);
    const B = Math.sin(f * d) / Math.sin(d);
    const x = A * Math.cos(lat1) * Math.cos(lng1) + B * Math.cos(lat2) * Math.cos(lng2);
    const y = A * Math.cos(lat1) * Math.sin(lng1) + B * Math.cos(lat2) * Math.sin(lng2);
    const z = A * Math.sin(lat1) + B * Math.sin(lat2);
    pts.push([
      Math.atan2(y, x) * R2D,
      Math.atan2(z, Math.sqrt(x * x + y * y)) * R2D,
    ]);
  }
  return pts;
}

// 14-frame cycle that shifts a dash pattern forward by 0.5 units per frame,
// creating a smooth flowing-dot animation without any JS per-pixel work.
const DASH_SEQUENCE = [
  [0, 4, 3],     [0.5, 4, 2.5], [1, 4, 2],     [1.5, 4, 1.5],
  [2, 4, 1],     [2.5, 4, 0.5], [3, 4, 0],
  [0, 0.5, 3, 3.5], [0, 1, 3, 3], [0, 1.5, 3, 2.5],
  [0, 2, 3, 2],  [0, 2.5, 3, 1.5], [0, 3, 3, 1], [0, 3.5, 3, 0.5],
];

const hybridBaseLayer: LayerProps = {
  id: "arc-hybrid-base",
  type: "line",
  paint: { "line-color": "#f59e0b", "line-width": 1, "line-opacity": 0.18 },
  layout: { "line-cap": "round", "line-join": "round" },
};
const hybridFlowLayer: LayerProps = {
  id: "arc-hybrid-flow",
  type: "line",
  paint: {
    "line-color": "#f59e0b",
    "line-width": 1.5,
    "line-opacity": 0.7,
    "line-dasharray": [0, 4, 3],
  },
  layout: { "line-cap": "round", "line-join": "round" },
};
const tetheredBaseLayer: LayerProps = {
  id: "arc-tethered-base",
  type: "line",
  paint: { "line-color": "#f97316", "line-width": 1, "line-opacity": 0.18 },
  layout: { "line-cap": "round", "line-join": "round" },
};
const tetheredFlowLayer: LayerProps = {
  id: "arc-tethered-flow",
  type: "line",
  paint: {
    "line-color": "#f97316",
    "line-width": 1.5,
    "line-opacity": 0.7,
    "line-dasharray": [0, 4, 3],
  },
  layout: { "line-cap": "round", "line-join": "round" },
};

interface InferenceArcsProps {
  countries: CountryData[];
}

export default function InferenceArcs({ countries }: InferenceArcsProps) {
  const { current: mapRef } = useMap();
  const rafRef = useRef<number | null>(null);

  const coordMap = useMemo(() => {
    const m: Record<string, [number, number]> = {};
    for (const c of countries) m[c.country] = [c.longitude, c.latitude];
    return m;
  }, [countries]);

  const { hybridGeoJSON, tetheredGeoJSON } = useMemo(() => {
    const hybridFeatures: GeoJSON.Feature[] = [];
    const tetheredFeatures: GeoJSON.Feature[] = [];

    for (const route of ROUTE_CONFIGS) {
      const from = coordMap[route.country];
      if (!from || route.type === "Local-Native" || !route.dest) continue;

      if (route.type === "Hybrid-Edge") {
        hybridFeatures.push({
          type: "Feature",
          properties: { country: route.country },
          geometry: { type: "LineString", coordinates: arcPoints(from, route.dest) },
        });
      } else if (route.type === "Regional-Tethered" && route.hub) {
        // Two segments drawn as separate features: country→hub, hub→europe
        tetheredFeatures.push({
          type: "Feature",
          properties: { country: route.country, segment: "leg-1" },
          geometry: { type: "LineString", coordinates: arcPoints(from, route.hub, 30) },
        });
        tetheredFeatures.push({
          type: "Feature",
          properties: { country: route.country, segment: "leg-2" },
          geometry: { type: "LineString", coordinates: arcPoints(route.hub, route.dest, 40) },
        });
      }
    }

    return {
      hybridGeoJSON:    { type: "FeatureCollection" as const, features: hybridFeatures },
      tetheredGeoJSON:  { type: "FeatureCollection" as const, features: tetheredFeatures },
    };
  }, [coordMap]);

  // Drive the dasharray animation via rAF — zero DOM cost, GPU-composited.
  useEffect(() => {
    if (!mapRef) return;
    const map = mapRef.getMap();
    let lastStep = -1;

    function animate(ts: number) {
      const step = Math.floor(ts / 60) % DASH_SEQUENCE.length;
      if (step !== lastStep) {
        lastStep = step;
        if (map.getLayer("arc-hybrid-flow"))
          map.setPaintProperty("arc-hybrid-flow", "line-dasharray", DASH_SEQUENCE[step]);
        if (map.getLayer("arc-tethered-flow"))
          map.setPaintProperty("arc-tethered-flow", "line-dasharray", DASH_SEQUENCE[step]);
      }
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current !== null) cancelAnimationFrame(rafRef.current); };
  }, [mapRef]);

  return (
    <>
      <Source id="hybrid-arcs" type="geojson" data={hybridGeoJSON}>
        <Layer {...hybridBaseLayer} />
        <Layer {...hybridFlowLayer} />
      </Source>
      <Source id="tethered-arcs" type="geojson" data={tetheredGeoJSON}>
        <Layer {...tetheredBaseLayer} />
        <Layer {...tetheredFlowLayer} />
      </Source>
    </>
  );
}

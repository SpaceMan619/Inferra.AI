"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import dynamic from "next/dynamic";

const GlobeGL = dynamic(() => import("react-globe.gl"), { ssr: false });

// ── African market markers ────────────────────────
const AFRICA_MARKETS = [
  { lat: -30.5, lng: 22.9, name: "South Africa", status: "Viable", color: "#10b981", size: 1.4 },
  { lat: 9.08, lng: 8.68, name: "Nigeria", status: "Emerging", color: "#f59e0b", size: 1.2 },
  { lat: -0.02, lng: 37.9, name: "Kenya", status: "Emerging", color: "#f59e0b", size: 1.2 },
  { lat: 26.82, lng: 30.8, name: "Egypt", status: "Viable", color: "#10b981", size: 1.4 },
  { lat: 31.79, lng: -7.09, name: "Morocco", status: "Emerging", color: "#f59e0b", size: 1.2 },
  { lat: 7.95, lng: -1.02, name: "Ghana", status: "Emerging", color: "#f59e0b", size: 1.2 },
  { lat: -1.94, lng: 29.87, name: "Rwanda", status: "Early", color: "#ef4444", size: 1.0 },
];

// ── Global DC hubs (subtle markers) ───────────────
const GLOBAL_DCS = [
  { lat: 38.9, lng: -77.4, name: "Virginia", size: 0.4 },
  { lat: 51.5, lng: -0.1, name: "London", size: 0.4 },
  { lat: 50.1, lng: 8.7, name: "Frankfurt", size: 0.4 },
  { lat: 48.9, lng: 2.3, name: "Paris", size: 0.4 },
  { lat: 1.3, lng: 103.8, name: "Singapore", size: 0.4 },
  { lat: 35.7, lng: 139.7, name: "Tokyo", size: 0.4 },
  { lat: -33.9, lng: 151.2, name: "Sydney", size: 0.4 },
  { lat: 25.3, lng: 55.3, name: "Dubai", size: 0.4 },
  { lat: 19.1, lng: 72.9, name: "Mumbai", size: 0.4 },
  { lat: 13.1, lng: 77.6, name: "Bangalore", size: 0.4 },
];

// ── Submarine cable arcs (Africa ↔ global hubs) ──
const CABLE_ARCS = [
  { startLat: -30.5, startLng: 22.9, endLat: 51.5, endLng: -0.1, color: ["#10b98160", "#4f46e560"] },
  { startLat: -30.5, startLng: 22.9, endLat: 19.1, endLng: 72.9, color: ["#10b98160", "#f59e0b60"] },
  { startLat: 9.08, startLng: 8.68, endLat: 51.5, endLng: -0.1, color: ["#f59e0b60", "#4f46e560"] },
  { startLat: 9.08, startLng: 8.68, endLat: 38.9, endLng: -77.4, color: ["#f59e0b60", "#4f46e560"] },
  { startLat: -0.02, startLng: 37.9, endLat: 19.1, endLng: 72.9, color: ["#f59e0b60", "#4f46e560"] },
  { startLat: -0.02, startLng: 37.9, endLat: 25.3, endLng: 55.3, color: ["#f59e0b60", "#4f46e560"] },
  { startLat: 26.82, startLng: 30.8, endLat: 50.1, endLng: 8.7, color: ["#10b98160", "#4f46e560"] },
  { startLat: 26.82, startLng: 30.8, endLat: 19.1, endLng: 72.9, color: ["#10b98160", "#4f46e560"] },
  { startLat: 31.79, startLng: -7.09, endLat: 48.9, endLng: 2.3, color: ["#f59e0b60", "#4f46e560"] },
  { startLat: 31.79, startLng: -7.09, endLat: 38.9, endLng: -77.4, color: ["#f59e0b60", "#4f46e560"] },
  { startLat: 7.95, startLng: -1.02, endLat: 51.5, endLng: -0.1, color: ["#f59e0b60", "#4f46e560"] },
  { startLat: -1.94, startLng: 29.87, endLat: -0.02, endLng: 37.9, color: ["#ef444460", "#f59e0b60"] },
];

// ── Ring markers for clickability (pulsing rings around African markets) ──
const RING_DATA = AFRICA_MARKETS.map((m) => ({
  lat: m.lat,
  lng: m.lng,
  name: m.name,
  status: m.status,
  color: m.color,
  maxR: 3,
  propagationSpeed: 2,
  repeatPeriod: 1200,
}));

// All point markers
const ALL_MARKERS = [
  ...AFRICA_MARKETS.map((m) => ({ ...m, isAfrica: true })),
  ...GLOBAL_DCS.map((m) => ({
    ...m,
    status: "Global DC",
    color: "#6366f1",
    isAfrica: false,
  })),
];

interface Globe3DProps {
  interactive?: boolean;
  onMarkerClick?: (marker: { name: string; status: string }) => void;
  className?: string;
}

export default function Globe3D({
  interactive = false,
  onMarkerClick,
  className = "",
}: Globe3DProps) {
  const globeRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isClient, setIsClient] = useState(false);

  // Measure container
  useEffect(() => {
    setIsClient(true);
    const container = containerRef.current;
    if (!container) return;

    const measure = () => {
      const { width, height } = container.getBoundingClientRect();
      setDimensions({ width: Math.floor(width), height: Math.floor(height) });
    };
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  // Set initial POV + controls
  useEffect(() => {
    if (!globeRef.current) return;

    globeRef.current.pointOfView({ lat: 5, lng: 20, altitude: 2.2 }, 0);

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
  }, [interactive, isClient, dimensions]);

  const handleRingClick = useCallback(
    (ring: any) => {
      if (interactive && onMarkerClick) {
        onMarkerClick({ name: ring.name, status: ring.status });

        // Fly to the clicked market
        if (globeRef.current) {
          globeRef.current.pointOfView(
            { lat: ring.lat, lng: ring.lng, altitude: 1.8 },
            800
          );
        }
      }
    },
    [interactive, onMarkerClick]
  );

  return (
    <div ref={containerRef} className={`w-full h-full ${className}`}>
      {isClient && dimensions.width > 0 && (
        <GlobeGL
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          atmosphereColor="#6366f1"
          atmosphereAltitude={0.22}
          showAtmosphere={true}
          // Point markers
          pointsData={ALL_MARKERS}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={(d: any) => (d.isAfrica ? 0.06 : 0.01)}
          pointRadius={(d: any) => d.size}
          pointsMerge={false}
          onPointClick={handleRingClick}
          // Pulsing ring markers for Africa (visual affordance)
          ringsData={interactive ? RING_DATA : []}
          ringLat="lat"
          ringLng="lng"
          ringColor="color"
          ringMaxRadius="maxR"
          ringPropagationSpeed="propagationSpeed"
          ringRepeatPeriod="repeatPeriod"
          // Cable arcs
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
          // Labels (interactive only)
          labelsData={interactive ? AFRICA_MARKETS : []}
          labelLat="lat"
          labelLng="lng"
          labelText="name"
          labelSize={1.4}
          labelColor={() => "rgba(255,255,255,0.9)"}
          labelDotRadius={0.6}
          labelAltitude={0.07}
        />
      )}
    </div>
  );
}

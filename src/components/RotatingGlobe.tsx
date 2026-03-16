"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";
import type { CountryData } from "@/types";

interface RotatingGlobeProps {
  selectedCountry?: string;
  countries?: CountryData[];
}

// Global DC hubs — subtle grey background markers
const GLOBAL_DCS: { location: [number, number]; size: number }[] = [
  { location: [38.9, -77.4], size: 0.04 },   // Virginia
  { location: [45.6, -121.2], size: 0.03 },  // Oregon
  { location: [-23.5, -46.6], size: 0.03 },  // São Paulo
  { location: [51.5, -0.1], size: 0.04 },    // London
  { location: [50.1, 8.7], size: 0.04 },     // Frankfurt
  { location: [52.4, 4.9], size: 0.03 },     // Amsterdam
  { location: [48.9, 2.3], size: 0.03 },     // Paris
  { location: [19.1, 72.9], size: 0.03 },    // Mumbai
  { location: [1.3, 103.8], size: 0.04 },    // Singapore
  { location: [35.7, 139.7], size: 0.04 },   // Tokyo
  { location: [-33.9, 151.2], size: 0.03 },  // Sydney
  { location: [53.3, -6.3], size: 0.03 },    // Dublin
  { location: [59.3, 18.1], size: 0.03 },    // Stockholm
  { location: [43.7, -79.4], size: 0.03 },   // Toronto
  { location: [22.3, 114.2], size: 0.03 },   // Hong Kong
  { location: [37.6, 127.0], size: 0.03 },   // Seoul
  { location: [26.1, 50.5], size: 0.03 },    // Bahrain
  { location: [25.3, 55.3], size: 0.03 },    // Dubai
  { location: [13.1, 77.6], size: 0.03 },    // Bangalore
];

const SUBTLE_GREY: [number, number, number] = [0.26, 0.28, 0.34];

function getMarkerColor(readiness: string): [number, number, number] {
  if (readiness === "Viable") return [0.13, 0.77, 0.37];         // brand green
  if (readiness === "Emerging") return [0.95, 0.60, 0.05];       // amber
  if (readiness === "Emerging (Early)") return [0.93, 0.38, 0.15]; // orange-red
  return [0.88, 0.22, 0.22];                                      // red (Early Stage)
}

function getMarkerSize(readiness: string): number {
  if (readiness === "Viable") return 0.10;
  if (readiness === "Emerging") return 0.08;
  return 0.06;
}

const DEFAULT_PHI = (15 / 180) * Math.PI;   // center on Africa
const DEFAULT_THETA = (5 / 180) * Math.PI;  // slight north tilt

export default function RotatingGlobe({ selectedCountry, countries }: RotatingGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const phiRef = useRef(DEFAULT_PHI);
  const targetPhiRef = useRef(DEFAULT_PHI);
  const widthRef = useRef(0);

  // Spin to selected country when selection changes
  useEffect(() => {
    if (!selectedCountry || !countries) return;
    const country = countries.find((c) => c.country === selectedCountry);
    if (!country) return;
    targetPhiRef.current = (country.longitude / 180) * Math.PI;
  }, [selectedCountry, countries]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) widthRef.current = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);
    onResize();

    // Build live markers from countries data
    const africaMarkers = (countries ?? []).map((c) => ({
      location: [c.latitude, c.longitude] as [number, number],
      size: getMarkerSize(c.ai_inference_readiness),
      color: getMarkerColor(c.ai_inference_readiness),
    }));

    const allMarkers = [
      ...GLOBAL_DCS.map((m) => ({ ...m, color: SUBTLE_GREY })),
      ...africaMarkers,
    ];

    const globe = createGlobe(canvas, {
      devicePixelRatio: Math.min(2, window.devicePixelRatio ?? 1),
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: DEFAULT_PHI,
      theta: DEFAULT_THETA,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      mapBaseBrightness: 0,
      baseColor: [0.16, 0.18, 0.24],
      markerColor: [0.13, 0.77, 0.37],
      glowColor: [0.1, 0.15, 0.22],
      scale: 1.05,
      offset: [0, 0],
      markers: allMarkers,
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          // Lerp toward target phi, then resume slow auto-rotate
          const diff = targetPhiRef.current - phiRef.current;
          const norm = Math.atan2(Math.sin(diff), Math.cos(diff));
          if (Math.abs(norm) > 0.012) {
            phiRef.current += norm * 0.07;
          } else {
            phiRef.current += 0.003;
            targetPhiRef.current = phiRef.current;
          }
        }
        state.phi = phiRef.current;
        state.theta = DEFAULT_THETA;
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting.current = e.clientX;
      canvas.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      pointerInteracting.current = null;
      targetPhiRef.current = phiRef.current; // don't snap back after drag
      canvas.style.cursor = "grab";
    };
    const onPointerOut = () => {
      pointerInteracting.current = null;
      targetPhiRef.current = phiRef.current;
      canvas.style.cursor = "grab";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current;
        pointerInteracting.current = e.clientX;
        phiRef.current += delta / 300;
        targetPhiRef.current = phiRef.current;
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerout", onPointerOut);
    canvas.addEventListener("pointermove", onPointerMove);

    return () => {
      globe.destroy();
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerout", onPointerOut);
      canvas.removeEventListener("pointermove", onPointerMove);
    };
  }, [countries]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        cursor: "grab",
        height: "100%",
        aspectRatio: "1 / 1",
        maxHeight: "100%",
        display: "block",
      }}
    />
  );
}

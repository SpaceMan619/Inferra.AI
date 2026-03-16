"use client";

import { useEffect, useRef } from "react";
import createGlobe from "cobe";

// ── Global data center hubs (dark/muted markers) ────────
const GLOBAL_DCS: { location: [number, number]; size: number }[] = [
  { location: [38.9, -77.4], size: 0.04 },   // Virginia/Ashburn
  { location: [45.6, -121.2], size: 0.03 },   // Oregon
  { location: [-23.5, -46.6], size: 0.03 },   // São Paulo
  { location: [51.5, -0.1], size: 0.04 },     // London
  { location: [50.1, 8.7], size: 0.04 },      // Frankfurt
  { location: [52.4, 4.9], size: 0.03 },      // Amsterdam
  { location: [48.9, 2.3], size: 0.03 },      // Paris
  { location: [19.1, 72.9], size: 0.03 },     // Mumbai
  { location: [1.3, 103.8], size: 0.04 },     // Singapore
  { location: [35.7, 139.7], size: 0.04 },    // Tokyo
  { location: [-33.9, 151.2], size: 0.03 },   // Sydney
  { location: [53.3, -6.3], size: 0.03 },     // Dublin
  { location: [59.3, 18.1], size: 0.03 },     // Stockholm
  { location: [43.7, -79.4], size: 0.03 },    // Toronto
  { location: [22.3, 114.2], size: 0.03 },    // Hong Kong
  { location: [37.6, 127.0], size: 0.03 },    // Seoul
  { location: [26.1, 50.5], size: 0.03 },     // Bahrain
  { location: [-6.2, 106.8], size: 0.03 },    // Jakarta
  { location: [47.6, -122.3], size: 0.03 },   // Seattle
  { location: [37.4, -122.1], size: 0.03 },   // Silicon Valley
  { location: [25.3, 55.3], size: 0.03 },     // Dubai
  { location: [39.9, 116.4], size: 0.03 },    // Beijing
  { location: [31.2, 121.5], size: 0.03 },    // Shanghai
  { location: [13.1, 77.6], size: 0.03 },     // Bangalore
];

// ── Africa tracked markets (bright green markers) ───────
const AFRICA_MARKERS: { location: [number, number]; size: number }[] = [
  { location: [-30.5, 22.9], size: 0.08 },    // South Africa
  { location: [9.08, 8.68], size: 0.06 },     // Nigeria
  { location: [-0.02, 37.9], size: 0.06 },    // Kenya
  { location: [26.82, 30.8], size: 0.08 },    // Egypt
  { location: [31.79, -7.09], size: 0.06 },   // Morocco
  { location: [7.95, -1.02], size: 0.06 },    // Ghana
  { location: [-1.94, 29.87], size: 0.05 },   // Rwanda
];

const DARK_DOT: [number, number, number] = [0.22, 0.22, 0.28];
const GREEN_DOT: [number, number, number] = [0.063, 0.82, 0.502];

const ALL_MARKERS = [
  ...GLOBAL_DCS.map((m) => ({ ...m, color: DARK_DOT })),
  ...AFRICA_MARKERS.map((m) => ({ ...m, color: GREEN_DOT })),
];

const AFRICA_PHI = (20 / 180) * Math.PI;
const AFRICA_THETA = (5 / 180) * Math.PI;

export default function RotatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const phiRef = useRef(AFRICA_PHI);
  const widthRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const onResize = () => {
      if (canvas) {
        widthRef.current = canvas.offsetWidth;
      }
    };
    window.addEventListener("resize", onResize);
    onResize();

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      phi: AFRICA_PHI,
      theta: AFRICA_THETA,
      dark: 0,
      diffuse: 1.2,
      mapSamples: 28000,
      mapBrightness: 1.6,
      mapBaseBrightness: 0.03,
      baseColor: [1, 1, 1],
      markerColor: [0.31, 0.27, 0.9],
      glowColor: [0.93, 0.93, 0.91],
      scale: 1.05,
      offset: [0, 0],
      markers: ALL_MARKERS,
      onRender: (state) => {
        if (pointerInteracting.current === null) {
          phiRef.current += 0.002;
        }
        state.phi = phiRef.current + pointerInteractionMovement.current;
        state.theta = AFRICA_THETA;
        state.width = widthRef.current * 2;
        state.height = widthRef.current * 2;
      },
    });

    const onPointerDown = (e: PointerEvent) => {
      pointerInteracting.current = e.clientX - pointerInteractionMovement.current;
      canvas.style.cursor = "grabbing";
    };
    const onPointerUp = () => {
      pointerInteracting.current = null;
      canvas.style.cursor = "grab";
    };
    const onPointerOut = () => {
      pointerInteracting.current = null;
      canvas.style.cursor = "grab";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (pointerInteracting.current !== null) {
        const delta = e.clientX - pointerInteracting.current;
        pointerInteractionMovement.current = delta / 200;
        phiRef.current = AFRICA_PHI + pointerInteractionMovement.current;
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
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-[240px] h-[240px] sm:w-[300px] sm:h-[300px] md:w-[420px] md:h-[420px] xl:w-[520px] xl:h-[520px] contain-layout"
      style={{
        cursor: "grab",
        maxWidth: "100%",
        aspectRatio: "1",
      }}
    />
  );
}

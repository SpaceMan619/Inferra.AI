"use client";

import { useEffect, useRef } from "react";

// Simplified continent coordinate data [lat, lon] for dot placement
// These approximate the coastlines of major landmasses visible when viewing Africa
const LAND_POINTS: [number, number][] = [
  // Africa outline (dense)
  [35, -6], [35, 0], [37, 10], [32, 13], [31, 32], [30, 31],
  [27, 34], [22, 36], [15, 40], [12, 43], [10, 45], [5, 42],
  [0, 42], [-5, 40], [-10, 40], [-15, 35], [-20, 35], [-25, 33],
  [-30, 30], [-34, 25], [-34, 18], [-30, 17], [-25, 15], [-20, 12],
  [-15, 12], [-10, 14], [-5, 12], [0, 10], [5, 1], [5, -5],
  [10, -15], [15, -17], [20, -17], [25, -15], [30, -10], [35, -6],
  // Africa interior
  [25, 30], [20, 30], [15, 30], [10, 30], [5, 30], [0, 30],
  [-5, 30], [-10, 25], [-15, 25], [-20, 25], [-25, 25],
  [25, 20], [20, 20], [15, 20], [10, 20], [5, 20], [0, 20], [-5, 20],
  [20, 10], [15, 10], [10, 10], [5, 10], [0, 10], [-5, 10],
  [20, 0], [15, 0], [10, 0], [5, 0],
  [25, 25], [15, 35], [10, 35], [5, 35], [0, 35], [-5, 35],
  [30, 0], [28, 5], [26, 10], [22, 15],
  // Europe hints
  [40, -8], [42, -3], [43, 3], [46, 7], [48, 2], [50, 5],
  [52, 10], [55, 12], [48, 16], [45, 12], [42, 12], [38, 24],
  [40, 20], [45, 20], [50, 20], [55, 25], [60, 25], [60, 30],
  // Middle East hints
  [32, 35], [30, 40], [25, 45], [20, 55], [15, 50],
  [35, 40], [37, 45], [33, 45], [28, 48],
  // South America hint (far left)
  [5, -60], [0, -50], [-5, -45], [-10, -40], [-15, -45],
  [-20, -45], [-25, -50], [-30, -55], [-5, -35], [0, -55],
  [-15, -50], [-10, -50],
  // More Africa density
  [8, 5], [12, 5], [8, 15], [12, 15], [8, 25], [12, 25],
  [-2, 15], [-2, 25], [-8, 18], [-12, 20], [-18, 28],
  [28, 28], [22, 32], [18, 38], [6, 38], [-2, 38],
  [16, -8], [14, -12], [12, -8], [6, -3], [4, -8],
];

// 7 tracked countries with their colors
const TRACKED: { lat: number; lon: number; color: string }[] = [
  { lat: -30.5, lon: 22.9, color: "#10b981" },   // South Africa — Viable
  { lat: 9.08, lon: 8.68, color: "#f59e0b" },    // Nigeria — Emerging
  { lat: -0.02, lon: 37.9, color: "#f59e0b" },   // Kenya — Emerging
  { lat: 26.82, lon: 30.8, color: "#10b981" },   // Egypt — Viable
  { lat: 31.79, lon: -7.09, color: "#f59e0b" },  // Morocco — Emerging
  { lat: 7.95, lon: -1.02, color: "#f59e0b" },   // Ghana — Emerging
  { lat: -1.94, lon: 29.87, color: "#ef4444" },  // Rwanda — Early
];

function latLonToXYZ(lat: number, lon: number, R: number) {
  const phi = (lat * Math.PI) / 180;
  const theta = (lon * Math.PI) / 180;
  return {
    x: R * Math.cos(phi) * Math.cos(theta),
    y: R * Math.sin(phi),
    z: R * Math.cos(phi) * Math.sin(theta),
  };
}

function rotateY(x: number, z: number, angle: number) {
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return { x: x * cos - z * sin, z: x * sin + z * cos };
}

export default function RotatingGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const angleRef = useRef(-0.3); // start slightly rotated to show Africa

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 500;
    canvas.width = size;
    canvas.height = size;
    const cx = size / 2;
    const cy = size / 2;
    const R = size * 0.38;

    function drawGlobe() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const angle = angleRef.current;

      // Globe outline circle
      ctx.beginPath();
      ctx.arc(cx, cy, R, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 0, 0, 0.06)";
      ctx.lineWidth = 1;
      ctx.stroke();

      // Latitude/longitude grid lines (very subtle)
      ctx.strokeStyle = "rgba(0, 0, 0, 0.03)";
      ctx.lineWidth = 0.5;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        for (let lon = -180; lon <= 180; lon += 3) {
          const p = latLonToXYZ(lat, lon, R);
          const r = rotateY(p.x, p.z, angle);
          if (r.z < 0) continue; // back of globe
          const sx = cx + r.x;
          const sy = cy - p.y;
          if (lon === -180 || r.z < 0) ctx.moveTo(sx, sy);
          else ctx.lineTo(sx, sy);
        }
        ctx.stroke();
      }

      // Land dots
      for (const [lat, lon] of LAND_POINTS) {
        const p = latLonToXYZ(lat, lon, R);
        const r = rotateY(p.x, p.z, angle);
        if (r.z < 0) continue; // hide back-facing

        const depth = (r.z + R) / (2 * R); // 0 at back, 1 at front
        const sx = cx + r.x;
        const sy = cy - p.y;

        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(79, 70, 229, ${0.12 + depth * 0.2})`;
        ctx.fill();
      }

      // Tracked country dots (larger, colored, with glow)
      for (const t of TRACKED) {
        const p = latLonToXYZ(t.lat, t.lon, R);
        const r = rotateY(p.x, p.z, angle);
        if (r.z < 0) continue;

        const depth = (r.z + R) / (2 * R);
        const sx = cx + r.x;
        const sy = cy - p.y;

        // Glow
        const grad = ctx.createRadialGradient(sx, sy, 0, sx, sy, 12);
        grad.addColorStop(0, t.color + "40");
        grad.addColorStop(1, t.color + "00");
        ctx.beginPath();
        ctx.arc(sx, sy, 12, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(sx, sy, 3.5, 0, Math.PI * 2);
        ctx.fillStyle = t.color;
        ctx.globalAlpha = 0.6 + depth * 0.4;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      angleRef.current += 0.003; // slow rotation
      animRef.current = requestAnimationFrame(drawGlobe);
    }

    drawGlobe();
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="w-[400px] h-[400px] md:w-[500px] md:h-[500px]"
      style={{ opacity: 0.85 }}
    />
  );
}

"use client";

import { motion } from "framer-motion";
import type { CountryData } from "@/types";

const DIMS = [
  { key: "compute",      label: "Compute" },
  { key: "connectivity", label: "Connectivity" },
  { key: "power",        label: "Power" },
  { key: "policy",       label: "Policy" },
  { key: "ecosystem",    label: "Ecosystem" },
] as const;

const N = DIMS.length;
const RINGS = [25, 50, 75, 100];

interface Point { x: number; y: number }

function polar(cx: number, cy: number, r: number, i: number): Point {
  const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function polygon(cx: number, cy: number, r: number): string {
  return Array.from({ length: N }, (_, i) => {
    const p = polar(cx, cy, r, i);
    return `${p.x},${p.y}`;
  }).join(" ");
}

function dataPolygon(scores: CountryData["scores"], cx: number, cy: number, maxR: number): string {
  return DIMS.map(({ key }, i) => {
    const val = scores[key as keyof typeof scores];
    const r = (val / 100) * maxR;
    const p = polar(cx, cy, r, i);
    return `${p.x},${p.y}`;
  }).join(" ");
}

interface RadarChartProps {
  countryA: CountryData;
  countryB: CountryData;
  colorA: string;
  colorB: string;
  size?: number;
}

export default function RadarChart({
  countryA,
  countryB,
  colorA,
  colorB,
  size = 300,
}: RadarChartProps) {
  const LABEL_PAD = 42;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - LABEL_PAD;

  const polyA = dataPolygon(countryA.scores, cx, cy, maxR);
  const polyB = dataPolygon(countryB.scores, cx, cy, maxR);

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      style={{ overflow: "visible" }}
    >
      {/* Grid rings */}
      {RINGS.map((pct) => (
        <polygon
          key={pct}
          points={polygon(cx, cy, (pct / 100) * maxR)}
          fill="none"
          stroke="rgba(34,47,48,0.08)"
          strokeWidth="1"
        />
      ))}

      {/* Axis spokes */}
      {DIMS.map((_, i) => {
        const tip = polar(cx, cy, maxR, i);
        return (
          <line
            key={i}
            x1={cx} y1={cy}
            x2={tip.x} y2={tip.y}
            stroke="rgba(34,47,48,0.07)"
            strokeWidth="1"
          />
        );
      })}

      {/* Country B fill — draw first so A sits on top */}
      <motion.polygon
        points={polyB}
        fill={`${colorB}22`}
        stroke={colorB}
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Country A fill */}
      <motion.polygon
        points={polyA}
        fill={`${colorA}22`}
        stroke={colorA}
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ opacity: 0, scale: 0.4 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: `${cx}px ${cy}px` }}
      />

      {/* Vertex dots — B */}
      {DIMS.map(({ key }, i) => {
        const val = countryB.scores[key as keyof CountryData["scores"]];
        const p = polar(cx, cy, (val / 100) * maxR, i);
        return (
          <circle key={`b-${i}`} cx={p.x} cy={p.y} r={3.5}
            fill={colorB} stroke="white" strokeWidth="1.5" />
        );
      })}

      {/* Vertex dots — A */}
      {DIMS.map(({ key }, i) => {
        const val = countryA.scores[key as keyof CountryData["scores"]];
        const p = polar(cx, cy, (val / 100) * maxR, i);
        return (
          <circle key={`a-${i}`} cx={p.x} cy={p.y} r={3.5}
            fill={colorA} stroke="white" strokeWidth="1.5" />
        );
      })}

      {/* Axis labels */}
      {DIMS.map(({ label }, i) => {
        const p = polar(cx, cy, maxR + 22, i);
        const anchor =
          p.x < cx - 4 ? "end" :
          p.x > cx + 4 ? "start" : "middle";
        return (
          <text
            key={label}
            x={p.x}
            y={p.y + (p.y < cy ? -2 : 4)}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="10"
            fontFamily="inherit"
            fill="rgba(34,47,48,0.45)"
            fontWeight="500"
            letterSpacing="0.04em"
          >
            {label.toUpperCase()}
          </text>
        );
      })}
    </svg>
  );
}

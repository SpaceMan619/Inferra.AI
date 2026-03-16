"use client";

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

function polar(cx: number, cy: number, r: number, i: number) {
  const angle = (i * 2 * Math.PI) / N - Math.PI / 2;
  return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
}

function gridPolygon(cx: number, cy: number, r: number) {
  return Array.from({ length: N }, (_, i) => {
    const p = polar(cx, cy, r, i);
    return `${p.x},${p.y}`;
  }).join(" ");
}

function dataPolygon(scores: CountryData["scores"], cx: number, cy: number, maxR: number) {
  return DIMS.map(({ key }, i) => {
    const r = (scores[key as keyof typeof scores] / 100) * maxR;
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

export default function RadarChart({ countryA, countryB, colorA, colorB, size = 300 }: RadarChartProps) {
  const LABEL_PAD = 42;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = size / 2 - LABEL_PAD;

  // Extra viewBox margin so side/top labels are never clipped by the SVG viewport.
  // All internal coordinates stay the same — only the declared viewport shifts.
  const HM = 78; // horizontal margin for CONNECTIVITY / ECOSYSTEM
  const VM = 26; // vertical margin for COMPUTE / POWER / POLICY

  const polyA = dataPolygon(countryA.scores, cx, cy, maxR);
  const polyB = dataPolygon(countryB.scores, cx, cy, maxR);

  return (
    <>
      {/* CSS animation — no framer-motion, no JS per frame */}
      <style>{`
        @keyframes radar-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        .radar-poly-b { animation: radar-in 0.4s ease 0.1s both; }
        .radar-poly-a { animation: radar-in 0.4s ease 0s both; }
      `}</style>

      <svg
        viewBox={`${-HM} ${-VM} ${size + HM * 2} ${size + VM * 2}`}
        width="100%"
        style={{ display: "block", overflow: "visible" }}
      >
        {/* Grid rings */}
        {RINGS.map((pct) => (
          <polygon key={pct} points={gridPolygon(cx, cy, (pct / 100) * maxR)}
            fill="none" stroke="rgba(34,47,48,0.08)" strokeWidth="1" />
        ))}

        {/* Axis spokes */}
        {DIMS.map((_, i) => {
          const tip = polar(cx, cy, maxR, i);
          return <line key={i} x1={cx} y1={cy} x2={tip.x} y2={tip.y}
            stroke="rgba(34,47,48,0.07)" strokeWidth="1" />;
        })}

        {/* B fill */}
        <polygon className="radar-poly-b" points={polyB}
          fill={`${colorB}22`} stroke={colorB} strokeWidth="2" strokeLinejoin="round" />

        {/* A fill */}
        <polygon className="radar-poly-a" points={polyA}
          fill={`${colorA}22`} stroke={colorA} strokeWidth="2" strokeLinejoin="round" />

        {/* Vertex dots */}
        {DIMS.map(({ key }, i) => {
          const vB = countryB.scores[key as keyof CountryData["scores"]];
          const vA = countryA.scores[key as keyof CountryData["scores"]];
          const pB = polar(cx, cy, (vB / 100) * maxR, i);
          const pA = polar(cx, cy, (vA / 100) * maxR, i);
          return (
            <g key={i}>
              <circle cx={pB.x} cy={pB.y} r={3.5} fill={colorB} stroke="white" strokeWidth="1.5" />
              <circle cx={pA.x} cy={pA.y} r={3.5} fill={colorA} stroke="white" strokeWidth="1.5" />
            </g>
          );
        })}

        {/* Axis labels */}
        {DIMS.map(({ label }, i) => {
          const p = polar(cx, cy, maxR + 22, i);
          const anchor = p.x < cx - 4 ? "end" : p.x > cx + 4 ? "start" : "middle";
          return (
            <text key={label} x={p.x} y={p.y + (p.y < cy ? -2 : 4)}
              textAnchor={anchor} dominantBaseline="middle"
              fontSize="10" fontFamily="inherit"
              fill="rgba(34,47,48,0.45)" fontWeight="500" letterSpacing="0.04em">
              {label.toUpperCase()}
            </text>
          );
        })}
      </svg>
    </>
  );
}

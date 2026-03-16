"use client";

interface DotData {
  cx: number;
  cy: number;
  color: string;
  delay: number;
  size: number;
}

const DOTS: DotData[] = [
  // South Africa — Viable
  { cx: 320, cy: 520, color: "#3d6b4f", delay: 0, size: 8 },
  // Nigeria — Emerging
  { cx: 245, cy: 310, color: "#d4a34a", delay: 0.4, size: 7 },
  // Kenya — Emerging
  { cx: 380, cy: 350, color: "#d4a34a", delay: 0.8, size: 7 },
  // Egypt — Viable
  { cx: 340, cy: 180, color: "#3d6b4f", delay: 1.2, size: 8 },
  // Morocco — Emerging
  { cx: 215, cy: 155, color: "#d4a34a", delay: 1.6, size: 7 },
  // Ghana — Emerging
  { cx: 225, cy: 325, color: "#d4a34a", delay: 2.0, size: 6 },
  // Rwanda — Emerging (Early)
  { cx: 360, cy: 370, color: "#c05a2e", delay: 2.4, size: 5 },
];

export default function AfricaSilhouette() {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
      <svg
        viewBox="0 0 600 700"
        className="w-[60vh] h-[70vh] max-w-[500px] opacity-[0.12]"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Simplified Africa continent outline */}
        <path
          d="M280,60 C270,55 255,58 245,62 C230,68 218,72 210,85
             C200,95 195,108 188,120 C180,130 172,140 168,155
             C162,170 158,185 155,195 C150,210 148,225 150,240
             C148,255 142,268 138,280 C132,295 128,310 130,325
             C128,340 125,352 128,365 C130,378 135,390 140,400
             C148,412 155,420 162,430 C170,442 178,452 185,462
             C195,475 205,488 218,498 C228,508 238,518 248,525
             C258,535 268,542 278,548 C290,555 302,560 312,562
             C325,565 335,565 345,558 C355,548 362,538 368,525
             C375,512 380,498 382,482 C385,468 388,455 390,440
             C392,425 388,410 382,398 C378,385 372,375 368,362
             C362,348 358,335 355,320 C352,305 355,290 360,278
             C365,265 372,252 378,240 C382,228 385,215 385,200
             C385,188 382,175 378,165 C372,152 365,142 358,132
             C350,122 342,115 335,108 C325,100 315,92 305,85
             C295,78 288,68 280,60Z"
          fill="currentColor"
          className="text-[var(--primary)]"
          opacity="0.6"
        />

        {/* Madagascar hint */}
        <ellipse
          cx="420"
          cy="445"
          rx="12"
          ry="35"
          fill="currentColor"
          className="text-[var(--primary)]"
          opacity="0.3"
          transform="rotate(-15, 420, 445)"
        />

        {/* Pulsing data dots */}
        {DOTS.map((dot, i) => (
          <g key={i}>
            {/* Outer glow ring */}
            <circle
              cx={dot.cx}
              cy={dot.cy}
              r={dot.size * 2.5}
              fill={dot.color}
              opacity="0.15"
              style={{
                animation: `dot-pulse 3s ease-in-out ${dot.delay}s infinite`,
                transformOrigin: `${dot.cx}px ${dot.cy}px`,
              }}
            />
            {/* Core dot */}
            <circle
              cx={dot.cx}
              cy={dot.cy}
              r={dot.size}
              fill={dot.color}
              style={{
                animation: `dot-pulse 3s ease-in-out ${dot.delay}s infinite`,
                transformOrigin: `${dot.cx}px ${dot.cy}px`,
              }}
            />
            {/* Bright center */}
            <circle
              cx={dot.cx}
              cy={dot.cy}
              r={dot.size * 0.4}
              fill="white"
              opacity="0.5"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}

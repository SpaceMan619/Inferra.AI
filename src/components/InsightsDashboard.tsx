"use client";

import type { CountryData } from "@/types";

interface Props {
  countries: CountryData[];
}

const SCORE_COLORS: Record<string, string> = {
  high: "#22c55e",   // accent green
  mid: "#d97706",    // amber
  low: "#dc2626",    // red
};

function scoreColor(score: number) {
  if (score >= 60) return SCORE_COLORS.high;
  if (score >= 40) return SCORE_COLORS.mid;
  return SCORE_COLORS.low;
}

function scoreTier(score: number) {
  if (score >= 60) return "Viable";
  if (score >= 40) return "Emerging";
  return "Early";
}

const DIMENSION_LABELS: Record<keyof CountryData["scores"], string> = {
  compute: "Compute",
  connectivity: "Connectivity",
  power: "Power",
  policy: "Policy",
  ecosystem: "Ecosystem",
};

const DIMENSION_ICONS: Record<keyof CountryData["scores"], string> = {
  compute: "⬡",
  connectivity: "◎",
  power: "◈",
  policy: "◇",
  ecosystem: "◉",
};

export default function InsightsDashboard({ countries }: Props) {
  // --- computed stats ---
  const totalMarkets = countries.length;
  const totalDcMw = countries.reduce((s, c) => s + (c.it_load_mw ?? 0), 0);
  const avgReadiness = Math.round(
    countries.reduce((s, c) => s + c.readiness_score, 0) / countries.length
  );
  const adoptedCount = countries.filter(
    (c) => c.ai_strategy_status === "Adopted"
  ).length;
  const totalDcCount = countries.reduce((s, c) => s + (c.dc_count ?? 0), 0);

  // --- ranked countries ---
  const ranked = [...countries].sort(
    (a, b) => b.readiness_score - a.readiness_score
  );
  const maxScore = ranked[0]?.readiness_score ?? 100;

  // --- dimension leaders ---
  const dimensions = Object.keys(DIMENSION_LABELS) as Array<
    keyof CountryData["scores"]
  >;
  const leaders = dimensions.map((dim) => {
    const leader = countries.reduce((best, c) =>
      (c.scores?.[dim] ?? 0) > (best.scores?.[dim] ?? 0) ? c : best
    );
    return { dim, leader, score: leader.scores?.[dim] ?? 0 };
  });

  const statCards = [
    {
      value: totalMarkets,
      label: "Markets tracked",
      sub: "across all African regions",
    },
    {
      value: `${totalDcCount}`,
      label: "Data centers",
      sub: `${totalDcMw.toFixed(0)} MW total IT load`,
    },
    {
      value: `${avgReadiness}`,
      label: "Avg readiness score",
      sub: "out of 100 across all markets",
    },
    {
      value: `${adoptedCount}/${totalMarkets}`,
      label: "AI strategies adopted",
      sub: "national-level policies in place",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Key stats */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((s, i) => (
          <div
            key={i}
            className="rounded-2xl p-4 lg:p-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm"
            style={{
              backgroundColor: "#fff",
              border: "1px solid rgba(34, 47, 48, 0.08)",
              borderTop: "2px solid #22c55e",
            }}
          >
            <div
              className="text-[1.6rem] lg:text-[2rem] font-semibold tracking-[-0.04em] leading-none mb-1.5"
              style={{ color: "#22c55e" }}
            >
              {s.value}
            </div>
            <div
              className="text-[12px] lg:text-[13px] font-medium mb-0.5"
              style={{ color: "#222f30" }}
            >
              {s.label}
            </div>
            <div
              className="text-[11px] lg:text-[12px] font-light leading-snug"
              style={{ color: "rgba(34, 47, 48, 0.5)" }}
            >
              {s.sub}
            </div>
          </div>
        ))}
      </div>

      {/* Two-col layout: ranking + leaders */}
      <div className="grid grid-cols-1 xl:grid-cols-5 gap-6">
        {/* Readiness ranking */}
        <div
          className="xl:col-span-3 rounded-2xl p-4 lg:p-6"
          style={{
            backgroundColor: "#fff",
            border: "1px solid rgba(34, 47, 48, 0.08)",
          }}
        >
          <h3
            className="text-[15px] font-medium tracking-[-0.02em] mb-5"
            style={{ color: "#222f30" }}
          >
            Readiness ranking
          </h3>
          <div className="space-y-3">
            {ranked.map((c, idx) => {
              const barPct = (c.readiness_score / maxScore) * 100;
              const color = scoreColor(c.readiness_score);
              const tier = scoreTier(c.readiness_score);
              return (
                <div key={c.country}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className="text-[11px] font-medium w-5 text-right tabular-nums flex-shrink-0"
                        style={{ color: "rgba(34, 47, 48, 0.35)" }}
                      >
                        {idx + 1}
                      </span>
                      <span
                        className="text-[12px] lg:text-[13px] font-normal truncate pb-0.5"
                        style={{ color: "#222f30" }}
                      >
                        {c.country}
                      </span>
                      <span
                        className="hidden sm:inline-block text-[10px] px-2 py-0.5 rounded-full font-normal flex-shrink-0"
                        style={{
                          backgroundColor: `${color}18`,
                          color: color,
                        }}
                      >
                        {tier}
                      </span>
                    </div>
                    <span
                      className="text-[12px] lg:text-[13px] font-medium tabular-nums flex-shrink-0"
                      style={{ color: "#222f30" }}
                    >
                      {c.readiness_score}
                    </span>
                  </div>
                  <div
                    className="h-1.5 rounded-full overflow-hidden"
                    style={{ backgroundColor: "rgba(34, 47, 48, 0.06)" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${barPct}%`,
                        backgroundColor: color,
                        opacity: 0.75,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dimension leaders */}
        <div className="xl:col-span-2 space-y-4">
          <div
            className="rounded-2xl p-4 lg:p-6"
            style={{
              backgroundColor: "#fff",
              border: "1px solid rgba(34, 47, 48, 0.08)",
            }}
          >
            <h3
              className="text-[15px] font-medium tracking-[-0.02em] mb-5"
              style={{ color: "#222f30" }}
            >
              Dimension leaders
            </h3>
            <div className="space-y-4">
              {leaders.map(({ dim, leader, score }) => (
                <div key={dim} className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-[15px] flex-shrink-0"
                    style={{ backgroundColor: "rgba(34, 47, 48, 0.05)" }}
                  >
                    {DIMENSION_ICONS[dim]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span
                        className="text-[11px] uppercase tracking-widest font-normal"
                        style={{ color: "rgba(34, 47, 48, 0.45)" }}
                      >
                        {DIMENSION_LABELS[dim]}
                      </span>
                      <span
                        className="text-[12px] font-medium tabular-nums"
                        style={{ color: "#222f30" }}
                      >
                        {score}
                      </span>
                    </div>
                    <div
                      className="text-[13px] font-normal truncate pb-0.5"
                      style={{ color: "#222f30" }}
                    >
                      {leader.country}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick insight callout */}
          <div
            className="rounded-2xl p-5"
            style={{
              backgroundColor: "rgba(34, 47, 48, 0.04)",
              border: "1px solid rgba(34, 47, 48, 0.07)",
            }}
          >
            <p
              className="text-[12px] font-normal leading-[1.65]"
              style={{ color: "rgba(34, 47, 48, 0.65)" }}
            >
              <span
                className="font-medium"
                style={{ color: "#222f30" }}
              >
                Coverage:{" "}
              </span>
              {totalMarkets} markets spanning{" "}
              {[
                ...new Set(
                  countries
                    .map((c) => c.region)
                    .filter(Boolean)
                ),
              ].length}{" "}
              African regions. Data sourced from public infrastructure
              reports, latency measurements, and policy documents.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import {
  DIMENSIONS,
  READINESS_TIERS,
  computeReadinessScore,
  tierForScore,
  type Dimension,
} from "./methodology";

type CountryRow = Record<string, unknown> & {
  country: string;
  readiness_score: number;
};

// countries.json is a bare top-level array, not an object with a `countries` key.
const countries = JSON.parse(
  readFileSync(join(process.cwd(), "public/data/countries.json"), "utf8")
) as CountryRow[];

/**
 * The dataset carries dimension scores in two shapes: the original markets use
 * flat `compute_score` keys, while those added in v2.0 nest them under
 * `scores`. Both are read here rather than normalised, so the test reflects
 * what actually ships.
 */
function dimensionScores(row: CountryRow): Record<Dimension["key"], number> {
  const nested = row.scores as Record<string, number> | undefined;
  return Object.fromEntries(
    DIMENSIONS.map((d) => [d.key, (row[`${d.key}_score`] ?? nested?.[d.key]) as number])
  ) as Record<Dimension["key"], number>;
}

describe("scoring rubric", () => {
  it("weights sum to exactly 1", () => {
    const total = DIMENSIONS.reduce((sum, d) => sum + d.weight, 0);
    expect(total).toBeCloseTo(1, 10);
  });

  it("readiness tiers cover 0-100 with no gap or overlap", () => {
    const sorted = [...READINESS_TIERS].sort((a, b) => a.min - b.min);
    expect(sorted[0].min).toBe(0);
    expect(sorted[sorted.length - 1].max).toBe(100);
    for (let i = 1; i < sorted.length; i++) {
      expect(sorted[i].min).toBe(sorted[i - 1].max + 1);
    }
  });

  it("every dimension's bands cover 0-100 with no gap or overlap", () => {
    for (const d of DIMENSIONS) {
      const sorted = [...d.bands].sort((a, b) => a.min - b.min);
      expect(sorted[0].min, `${d.label} lowest band`).toBe(0);
      expect(sorted[sorted.length - 1].max, `${d.label} highest band`).toBe(100);
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i].min, `${d.label} band boundary`).toBe(sorted[i - 1].max + 1);
      }
    }
  });
});

describe("published rubric matches the live dataset", () => {
  it("loads countries", () => {
    expect(countries.length).toBeGreaterThan(0);
  });

  it("every country carries all five dimension scores in one shape or the other", () => {
    for (const row of countries) {
      const scores = dimensionScores(row);
      for (const d of DIMENSIONS) {
        expect(typeof scores[d.key], `${row.country}.${d.key}`).toBe("number");
      }
    }
  });

  // The point of the whole module: the weighting published on /methodology has
  // to actually reproduce the scores shipped in the dataset. If this fails, the
  // page would be publishing a rubric the data does not follow.
  it("recomputes each stored readiness_score from the published weights", () => {
    const mismatches = countries
      .map((row) => {
        const expected = computeReadinessScore(dimensionScores(row));
        return { country: row.country, stored: row.readiness_score, expected };
      })
      // NaN must be treated as a mismatch, not skipped: any comparison against
      // NaN is false, so a missing dimension would otherwise pass silently.
      .filter(
        ({ stored, expected }) =>
          !Number.isFinite(expected) || !Number.isFinite(stored) || Math.abs(stored - expected) > 1
      );

    expect(
      mismatches,
      `these countries' stored readiness_score does not match the published weighting:\n` +
        mismatches.map((m) => `  ${m.country}: stored ${m.stored}, rubric gives ${m.expected}`).join("\n")
    ).toEqual([]);
  });

  it("every country's tier label matches its score band", () => {
    for (const row of countries) {
      expect(() => tierForScore(row.readiness_score), row.country).not.toThrow();
    }
  });
});

/**
 * Canonical scoring and provenance constants for the Inferra AI dataset.
 *
 * This module is the single source of truth. The public methodology page
 * renders it, and DATA-PROTOCOL.md defers to it for scoring numbers rather
 * than restating them, so a weight can only ever be changed in one place.
 *
 * methodology.test.ts recomputes every country's composite from these weights
 * and asserts it matches the stored readiness_score, which is what turns the
 * published rubric from a claim into something CI enforces.
 */

export type ScoreBand = {
  /** Inclusive lower bound. */
  min: number;
  /** Inclusive upper bound. */
  max: number;
  criteria: string;
};

export type Dimension = {
  /** Matches the `*_score` key in countries.json, minus the suffix. */
  key: "compute" | "connectivity" | "power" | "policy" | "ecosystem";
  label: string;
  /** Fraction of the composite. All weights must sum to 1. */
  weight: number;
  summary: string;
  bands: ScoreBand[];
};

export const DIMENSIONS: Dimension[] = [
  {
    key: "compute",
    label: "Compute",
    weight: 0.25,
    summary:
      "Whether AI-grade compute is actually available: AI-capable facilities, hyperscaler region depth, and whether GPUs can be rented or colocated at all.",
    bands: [
      { min: 80, max: 100, criteria: "5+ AI-capable data centres; two or more full hyperscaler regions; active GPU colocation" },
      { min: 60, max: 79, criteria: "2–4 AI-capable data centres; at least one full region or local zone; GPUs colocatable" },
      { min: 40, max: 59, criteria: "1–2 AI-capable data centres; edge points of presence only; GPUs scarce or expensive" },
      { min: 20, max: 39, criteria: "0–1 AI-capable data centres; edge only; no practical GPU access" },
      { min: 0, max: 19, criteria: "No AI-capable infrastructure" },
    ],
  },
  {
    key: "connectivity",
    label: "Connectivity",
    weight: 0.25,
    summary:
      "Submarine cable access, internet exchange density, and round-trip latency to the nearest European point of presence.",
    bands: [
      { min: 80, max: 100, criteria: "Five or more cable systems, multiple IXPs, sub-60ms to Europe" },
      { min: 60, max: 79, criteria: "Three or four cable systems, established IXP, 60–100ms" },
      { min: 40, max: 59, criteria: "One or two cable systems or strong terrestrial transit, 100–150ms" },
      { min: 20, max: 39, criteria: "Limited transit, minimal exchange presence, 150–200ms" },
      { min: 0, max: 19, criteria: "Single fragile route or worse, over 200ms" },
    ],
  },
  {
    key: "power",
    label: "Power",
    weight: 0.2,
    summary:
      "Grid reliability for sustained inference workloads. Large facilities run generators, which mitigates outages but raises operating cost.",
    bands: [
      { min: 80, max: 100, criteria: "Under 30 minutes average outage per day; renewables above 20%; strong facility power" },
      { min: 60, max: 79, criteria: "Under 2 hours per day; major facilities independently powered" },
      { min: 40, max: 59, criteria: "2–6 hours per day; large sites workable on generators" },
      { min: 20, max: 39, criteria: "6–12 hours per day; severe reliability problems, high operating cost" },
      { min: 0, max: 19, criteria: "Over 12 hours per day, or effectively no national grid" },
    ],
  },
  {
    key: "policy",
    label: "Policy",
    weight: 0.15,
    summary:
      "The rules you'd operate under: data protection in force, a national AI strategy, and whether cross-border data flows are aligned.",
    bands: [
      { min: 80, max: 100, criteria: "Data protection law implemented, active national AI strategy, international data flow alignment" },
      { min: 60, max: 79, criteria: "Data protection law in force and a published AI strategy" },
      { min: 40, max: 59, criteria: "Either a data protection law or an AI strategy, not both" },
      { min: 20, max: 39, criteria: "Basic telecoms regulation only" },
      { min: 0, max: 19, criteria: "No relevant regulatory frameworks" },
    ],
  },
  {
    key: "ecosystem",
    label: "Ecosystem",
    weight: 0.15,
    summary:
      "The founder and developer base that determines local talent, tooling, and actual demand for AI products.",
    bands: [
      { min: 80, max: 100, criteria: "Mature ecosystem, significant international venture capital, notable exits" },
      { min: 60, max: 79, criteria: "Active ecosystem, multiple accelerators, notable venture deals" },
      { min: 40, max: 59, criteria: "Growing ecosystem, some hubs, limited venture activity" },
      { min: 20, max: 39, criteria: "Early stage, minimal hubs, pre-venture" },
      { min: 0, max: 19, criteria: "Minimal tech ecosystem" },
    ],
  },
];

export type ReadinessTier = {
  label: string;
  min: number;
  max: number;
  meaning: string;
};

export const READINESS_TIERS: ReadinessTier[] = [
  { label: "Viable", min: 60, max: 100, meaning: "Local or near-local inference is operationally feasible today." },
  { label: "Emerging", min: 40, max: 59, meaning: "Infrastructure exists, with real gaps in compute, power or policy." },
  { label: "Emerging (Early)", min: 0, max: 39, meaning: "Early stage. Offshore inference is the only practical option." },
];

export type SourceTier = {
  tier: 1 | 2 | 3 | 4;
  label: string;
  description: string;
  examples: string;
};

/**
 * Canonical four-tier scale. Deliberately separates an operator describing its
 * own capacity from an independent regulator publishing sector statistics:
 * the operator has a commercial incentive the regulator does not share, and
 * that difference is what catches announced-as-operational claims.
 */
export const SOURCE_TIERS: SourceTier[] = [
  {
    tier: 1,
    label: "Self-disclosure",
    description: "The organisation describing itself. Authoritative on its own facilities, and commercially motivated.",
    examples: "An operator's own capacity page, a company's financial filing",
  },
  {
    tier: 2,
    label: "Official statistics",
    description: "A national statistics office or sector regulator, independent of whoever is being described.",
    examples: "National statistics releases, telecoms regulator quarterly reports",
  },
  {
    tier: 3,
    label: "Multilateral and specialist research",
    description: "Bodies that publish methodology alongside numbers.",
    examples: "World Bank, ITU, PeeringDB, submarine cable registries, sector research firms",
  },
  {
    tier: 4,
    label: "Trade press",
    description: "Useful for corroboration and for finding primary sources. Never the sole basis for a value.",
    examples: "Industry publications, general news reporting",
  },
];

export const CONFIDENCE_LEVELS = [
  { level: "high", meaning: "Verified against a primary source that states the value directly." },
  { level: "medium", meaning: "Derived from more than one secondary source, or partly carried forward from an earlier pass." },
  { level: "low", meaning: "Estimated from limited or indirect evidence. Treat with caution." },
] as const;

/**
 * Three dates, routinely conflated, kept separate on purpose. Conflating the
 * first two is the specific defect this dataset was rebuilt to correct.
 */
export const DATE_SEMANTICS = [
  { field: "reporting_period", meaning: "The period the number actually describes. This is the accuracy claim." },
  { field: "retrieved_at", meaning: "When the source was read." },
  { field: "refreshed_at", meaning: "When this country's collection pass ran." },
];

/** Weighted composite, matching the published rubric. */
export function computeReadinessScore(scores: Record<Dimension["key"], number>): number {
  return Math.round(
    DIMENSIONS.reduce((total, d) => total + scores[d.key] * d.weight, 0)
  );
}

export function tierForScore(score: number): ReadinessTier {
  const tier = READINESS_TIERS.find((t) => score >= t.min && score <= t.max);
  if (!tier) throw new Error(`No readiness tier covers score ${score}`);
  return tier;
}

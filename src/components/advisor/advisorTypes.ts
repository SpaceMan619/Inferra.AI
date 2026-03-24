// ── Advisor Types ─────────────────────────────────────────────────────────

export type Persona =
  | "founder"
  | "operator"
  | "policy"
  | "research";

export type Workload =
  | "startup"
  | "enterprise"
  | "government"
  | "research"
  | "sovereign"
  | "exploration";

export type Region =
  | "East Africa"
  | "West Africa"
  | "North Africa"
  | "Southern Africa"
  | "Central Africa"
  | "Pan-African"
  | "Global but Africa-focused";

export type Priority =
  | "Low latency"
  | "Local data residency"
  | "Strong policy clarity"
  | "Access to compute"
  | "Low ops friction"
  | "Fastest path to launch"
  | "Regional scalability"
  | "Ecosystem strength"
  | "Institutional trust";

export type Constraint =
  | "Data must stay in-country"
  | "Sensitive or regulated data"
  | "Need enterprise or government trust"
  | "Low budget"
  | "No in-house infra team"
  | "Need local partners"
  | "Need GPU access soon"
  | "Need cross-border scalability";

export type RouteTolerance =
  | "Yes, that is fine"
  | "Only temporarily"
  | "No, it needs to be local"
  | "Not sure";

// 0 = Launch fast, 2 = Balanced, 4 = Max sovereignty
export type SovereigntySlider = 0 | 1 | 2 | 3 | 4;

export interface RankedPriority {
  priority: Priority;
  rank: 1 | 2 | 3;
}

export interface BriefInputs {
  persona: Persona | null;
  workload: Workload | null;
  regions: Region[];
  projectDescription: string;
  rankedPriorities: RankedPriority[];
  constraints: Constraint[];
  routeTolerance: RouteTolerance | null;
  sovereigntySlider: SovereigntySlider;
}

export const BLANK_INPUTS: BriefInputs = {
  persona: null,
  workload: null,
  regions: [],
  projectDescription: "",
  rankedPriorities: [],
  constraints: [],
  routeTolerance: null,
  sovereigntySlider: 2,
};

export type ConfidenceTier = "High confidence" | "Medium confidence" | "Exploratory";

export interface RankedMarket {
  rank: 1 | 2 | 3;
  country: string;
  region: string;
  readinessScore: number;
  whyItFits: string;
  majorTradeoff: string;
  routeAlignment: string;
  keyMetric: string;
  score: number;
}

export interface WhyNotAlternative {
  country: string;
  whatItDoes: string;
  whyItLost: string;
}

export interface BriefResult {
  strategyLabel: string;
  primaryMarket: string;
  recommendedRoute: string;
  routeExplanation: string;
  routeCompromise: string;
  confidenceTier: ConfidenceTier;
  confidenceExplanation: string;
  strategySummary: string;
  rankedMarkets: RankedMarket[];
  gains: string[];
  givens: string[];
  whyNotAlternatives: WhyNotAlternative[];
  risks: string[];
  suggestedNextMove: string;
}

export interface SavedBrief {
  id: string;
  savedAt: string; // ISO string
  strategyLabel: string;
  persona: Persona;
  workload: Workload;
  topMarket: string;
  route: string;
  confidenceTier: ConfidenceTier;
  inputs: BriefInputs;
  result: BriefResult;
}

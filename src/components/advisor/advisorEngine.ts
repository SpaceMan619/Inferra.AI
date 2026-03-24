import type { CountryData } from "@/types";
import type {
  BriefInputs,
  BriefResult,
  ConfidenceTier,
  Persona,
  Priority,
  RankedMarket,
  WhyNotAlternative,
  Workload,
} from "./advisorTypes";

// ── Priority → data field mapping ────────────────────────────────────────

function priorityScore(country: CountryData, priority: Priority): number {
  switch (priority) {
    case "Low latency": {
      const rtt = parseFloat(String(country.est_rtt_to_europe_ms).replace(/[^0-9.]/g, ""));
      if (isNaN(rtt)) return 40;
      return Math.max(0, 100 - rtt / 3);
    }
    case "Local data residency":
      return country.data_residency_constraint === "None" ? 90
        : country.data_residency_constraint === "Emerging" ? 60
        : 30;
    case "Strong policy clarity":
      return country.scores.policy ?? 0;
    case "Access to compute":
      return country.scores.compute ?? 0;
    case "Low ops friction":
      return country.ops_friction === "Low" ? 90
        : country.ops_friction === "Medium" ? 60
        : 25;
    case "Fastest path to launch":
      return (
        ((country.scores.compute ?? 0) * 0.3) +
        ((country.scores.connectivity ?? 0) * 0.3) +
        (country.ops_friction === "Low" ? 40 : country.ops_friction === "Medium" ? 25 : 10)
      );
    case "Regional scalability":
      return country.scores.connectivity ?? 0;
    case "Ecosystem strength":
      return country.scores.ecosystem ?? 0;
    case "Institutional trust":
      return country.scores.policy ?? 0;
  }
}

// ── Constraint penalty ────────────────────────────────────────────────────

function constraintPenalty(country: CountryData, inputs: BriefInputs): number {
  let penalty = 0;
  for (const c of inputs.constraints) {
    switch (c) {
      case "Data must stay in-country":
        if (country.data_residency_constraint === "Strict") penalty -= 0;
        else if (country.data_residency_constraint === "None") penalty -= 25;
        else penalty -= 10;
        break;
      case "Sensitive or regulated data":
        if ((country.scores.policy ?? 0) < 50) penalty -= 20;
        break;
      case "Need enterprise or government trust":
        if (country.cloud_maturity === "Nascent") penalty -= 30;
        else if (country.cloud_maturity === "Emerging") penalty -= 10;
        break;
      case "Low budget":
        if (country.ops_friction === "High") penalty -= 20;
        break;
      case "No in-house infra team":
        if (country.ops_friction === "High") penalty -= 25;
        break;
      case "Need local partners":
        if ((country.scores.ecosystem ?? 0) < 40) penalty -= 20;
        break;
      case "Need GPU access soon":
        if (country.ai_compute_availability === "None" || country.ai_compute_availability === "Very Limited") penalty -= 35;
        else if (country.ai_compute_availability === "Limited") penalty -= 15;
        break;
      case "Need cross-border scalability":
        if ((country.scores.connectivity ?? 0) < 50) penalty -= 20;
        break;
    }
  }
  return penalty;
}

// ── Sovereignty / route bonus ─────────────────────────────────────────────

function sovereigntyBonus(country: CountryData, inputs: BriefInputs): number {
  const slider = inputs.sovereigntySlider; // 0=speed, 4=sovereignty
  if (slider >= 3) {
    // Prefer local route
    let bonus = 0;
    if (country.primary_inference_route?.toLowerCase().includes("local")) bonus += 15;
    if (country.data_residency_constraint === "Strict") bonus += 10;
    return bonus;
  }
  if (slider <= 1) {
    // Prefer speed
    let bonus = 0;
    if (country.ops_friction === "Low") bonus += 15;
    if (country.primary_inference_route?.toLowerCase().includes("cloud")) bonus += 10;
    return bonus;
  }
  return 0;
}

// ── Region filter ─────────────────────────────────────────────────────────

function regionMatch(country: CountryData, inputs: BriefInputs): boolean {
  if (inputs.regions.length === 0) return true;
  if (inputs.regions.includes("Pan-African") || inputs.regions.includes("Global but Africa-focused")) return true;
  return inputs.regions.some((r) => country.region.toLowerCase().includes(r.toLowerCase().replace(" africa", "")));
}

// ── Master score ──────────────────────────────────────────────────────────

function scoreCountry(country: CountryData, inputs: BriefInputs): number {
  let score = 0;

  // Weighted priorities (rank 1=3pts, 2=2pts, 3=1pt weight multiplier)
  const rankWeight: Record<number, number> = { 1: 3, 2: 2, 3: 1 };
  for (const rp of inputs.rankedPriorities) {
    score += priorityScore(country, rp.priority) * rankWeight[rp.rank];
  }

  // Normalize to 100 base if priorities selected
  const totalWeight = inputs.rankedPriorities.reduce((s, rp) => s + rankWeight[rp.rank], 0);
  if (totalWeight > 0) score = score / totalWeight;

  // Fallback: use readiness_score if no priorities
  if (inputs.rankedPriorities.length === 0) score = country.readiness_score;

  // Region boost
  if (regionMatch(country, inputs)) score += 8;

  // Sovereignty/route
  score += sovereigntyBonus(country, inputs);

  // Constraints
  score += constraintPenalty(country, inputs);

  return Math.max(0, Math.round(score));
}

// ── Confidence ────────────────────────────────────────────────────────────

function deriveConfidence(
  topScore: number,
  secondScore: number,
  inputs: BriefInputs,
  winner: CountryData
): { tier: ConfidenceTier; explanation: string } {
  const gap = topScore - secondScore;
  const hardConstraintCount = inputs.constraints.length;
  const priorityCount = inputs.rankedPriorities.length;
  const penalty = constraintPenalty(winner, inputs);

  if (gap >= 12 && hardConstraintCount <= 2 && penalty > -15 && priorityCount >= 2) {
    return {
      tier: "High confidence",
      explanation: "Your top priorities align strongly with this market's readiness and route profile.",
    };
  }
  if (gap >= 5 && penalty > -30) {
    return {
      tier: "Medium confidence",
      explanation: "Strong fit overall, but with one or two meaningful deployment tradeoffs.",
    };
  }
  return {
    tier: "Exploratory",
    explanation: "This recommendation is directionally useful, but your constraints push against current market realities.",
  };
}

// ── Strategy label ────────────────────────────────────────────────────────

function deriveStrategyLabel(inputs: BriefInputs, topMarket: CountryData): string {
  const region = topMarket.region;
  const slider = inputs.sovereigntySlider;
  const hasDataResidency = inputs.constraints.includes("Data must stay in-country");
  const hasPolicy = inputs.rankedPriorities.some((p) => p.priority === "Strong policy clarity" && p.rank === 1);
  const wantsSpeed = slider <= 1;
  const wantsSovereignty = slider >= 3;

  if (hasDataResidency && wantsSovereignty) return "Sovereignty-Balanced Rollout";
  if (hasPolicy) return "Policy-First Expansion Path";
  if (wantsSpeed) return `${region} Launch Wedge`;
  if (inputs.workload === "sovereign") return "National Infrastructure Pathway";
  if (inputs.persona === "operator") return "Infrastructure-Led Market Entry";
  return `${region} Strategic Deployment`;
}

// ── Route recommendation ──────────────────────────────────────────────────

function deriveRoute(country: CountryData, inputs: BriefInputs): { route: string; explanation: string; compromise: string } {
  const local = country.primary_inference_route;
  const slider = inputs.sovereigntySlider;

  if (slider >= 3 || inputs.constraints.includes("Data must stay in-country")) {
    return {
      route: local ?? "In-country inference",
      explanation: `Given your sovereignty preference, in-country inference through ${country.country}'s available infrastructure is recommended.`,
      compromise: "Higher latency for users outside the region and limited burst capacity vs cloud.",
    };
  }
  if (slider <= 1) {
    return {
      route: "Regional cloud-first",
      explanation: `For fastest time-to-deployment, route inference through the nearest cloud region with ${country.country} as your primary market anchor.`,
      compromise: "Data leaves the country — may conflict with future residency requirements.",
    };
  }
  return {
    route: local ?? "Hybrid regional",
    explanation: `A balanced approach — use ${country.country}'s existing route infrastructure with cloud burst capability for scale.`,
    compromise: "Moderate complexity in managing dual-route architecture.",
  };
}

// ── Why-not alternatives ──────────────────────────────────────────────────

function deriveWhyNots(
  scored: { country: CountryData; score: number }[],
  top3: CountryData[],
  inputs: BriefInputs
): WhyNotAlternative[] {
  return scored
    .filter((s) => !top3.find((t) => t.country === s.country.country))
    .slice(0, 2)
    .map(({ country }) => {
      const penalty = constraintPenalty(country, inputs);
      const issue = penalty < -20
        ? "failed to meet one or more of your hard constraints"
        : country.ops_friction === "High"
        ? "high operational friction would slow your deployment timeline"
        : (country.scores.compute ?? 0) < 40
        ? "limited compute availability relative to your needs"
        : "lower overall alignment with your ranked priorities";

      return {
        country: country.country,
        whatItDoes: `Readiness score ${country.readiness_score}/100 with ${country.ai_inference_readiness.toLowerCase()} inference status.`,
        whyItLost: `It has ${issue}.`,
      };
    });
}

// ── Strategy summary ──────────────────────────────────────────────────────

function deriveStrategySummary(inputs: BriefInputs, winner: CountryData): string {
  const personaLabel: Record<string, string> = {
    founder: "As a founder",
    operator: "As an infrastructure operator",
    policy: "From a policy and public-sector perspective",
    research: "For research and strategy purposes",
  };
  const prefix = personaLabel[inputs.persona ?? "founder"] ?? "Based on your inputs";
  const workloadNote = inputs.workload === "startup"
    ? "deploying a startup product"
    : inputs.workload === "enterprise"
    ? "running an enterprise AI system"
    : inputs.workload === "government"
    ? "executing a government deployment"
    : inputs.workload === "sovereign"
    ? "building sovereign AI infrastructure"
    : "evaluating deployment options";

  return `${prefix} ${workloadNote}, ${winner.country} emerges as your strongest starting point. It offers ${winner.connectivity_role?.toLowerCase() ?? "solid regional connectivity"}, and its ${winner.ai_inference_readiness.toLowerCase()} inference readiness means deployment timelines are realistic. ${inputs.projectDescription ? `Given what you're building — ${inputs.projectDescription} — ` : ""}the market's combination of infrastructure depth and policy trajectory makes it a credible anchor for African expansion.`;
}

// ── Risks ─────────────────────────────────────────────────────────────────

function deriveRisks(winner: CountryData, inputs: BriefInputs): string[] {
  const risks: string[] = [];
  if ((winner.scores.compute ?? 0) < 50) risks.push("Policy signal is positive but compute depth remains shallow — capacity constraints may emerge at scale.");
  if (winner.ops_friction === "High") risks.push("Operational friction is high — budget additional time and cost for local setup and partnerships.");
  if (inputs.sovereigntySlider <= 1 && winner.data_residency_constraint !== "None") risks.push("Faster deployment via cloud-first routing may conflict with future data residency requirements.");
  if ((winner.scores.policy ?? 0) < 50) risks.push("Policy environment is still maturing — regulatory clarity may shift during your deployment window.");
  if (inputs.constraints.includes("Need GPU access soon") && winner.ai_compute_availability === "Limited") risks.push("GPU access is limited — plan for cloud-based compute augmentation in the near term.");
  if (risks.length === 0) risks.push("No critical blockers identified, but monitor regional policy developments closely as the AI regulatory landscape across Africa is actively evolving.");
  return risks.slice(0, 3);
}

// ── Main engine ───────────────────────────────────────────────────────────

export function generateBrief(inputs: BriefInputs, countries: CountryData[]): BriefResult {
  // Score all countries
  const scored = countries
    .map((c) => ({ country: c, score: scoreCountry(c, inputs) }))
    .sort((a, b) => b.score - a.score);

  const top3Countries = scored.slice(0, 3).map((s) => s.country);
  const winner = top3Countries[0];
  const second = scored[1];
  const third = scored[2];

  const { tier, explanation: confExplanation } = deriveConfidence(
    scored[0].score, scored[1]?.score ?? 0, inputs, winner
  );

  const route = deriveRoute(winner, inputs);

  const marketLabel = (c: CountryData, rank: 1 | 2 | 3, score: number): RankedMarket => ({
    rank,
    country: c.country,
    region: c.region,
    readinessScore: c.readiness_score,
    score,
    whyItFits: c.founder_insight ? c.founder_insight.slice(0, 120) + "…" : `Strong readiness score of ${c.readiness_score}/100.`,
    majorTradeoff: c.ops_friction === "High"
      ? "High operational friction — local setup requires more effort."
      : (c.scores.compute ?? 0) < 50
      ? "Compute depth is limited — may require cloud augmentation."
      : (c.scores.policy ?? 0) < 50
      ? "Policy environment still maturing."
      : "No single dominant tradeoff — well-rounded market.",
    routeAlignment: c.primary_inference_route ?? "Regional cloud",
    keyMetric: `${c.readiness_score}/100 readiness · ${c.ai_inference_readiness}`,
  });

  return {
    strategyLabel: deriveStrategyLabel(inputs, winner),
    primaryMarket: winner.country,
    recommendedRoute: route.route,
    routeExplanation: route.explanation,
    routeCompromise: route.compromise,
    confidenceTier: tier,
    confidenceExplanation: confExplanation,
    strategySummary: deriveStrategySummary(inputs, winner),
    rankedMarkets: [
      marketLabel(winner, 1, scored[0].score),
      marketLabel(second.country, 2, second.score),
      marketLabel(third.country, 3, third.score),
    ],
    gains: [
      `Strong alignment with your top priority: ${inputs.rankedPriorities[0]?.priority ?? "overall readiness"}.`,
      `${winner.country} has ${winner.ai_inference_readiness.toLowerCase()} inference readiness — deployment is realistic.`,
      inputs.regions.length > 0 ? `Geographic match with your target region (${inputs.regions[0]}).` : "Broad regional coverage for pan-African expansion.",
    ],
    givens: [
      route.compromise,
      (winner.scores.compute ?? 0) < 60 ? "Limited local compute — cloud augmentation likely required." : "Cloud dependency for burst workloads.",
      inputs.sovereigntySlider >= 3 ? "Sovereignty-first approach may slow initial deployment speed." : "Speed-first approach may require revisiting data residency later.",
    ],
    whyNotAlternatives: deriveWhyNots(scored, top3Countries, inputs),
    risks: deriveRisks(winner, inputs),
    suggestedNextMove: `Explore ${winner.country} in depth on the Overview tab, then use Compare to benchmark it against ${second.country.country} and ${third.country.country}.`,
  };
}

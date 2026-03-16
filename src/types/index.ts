export interface CountryScores {
  compute: number;
  connectivity: number;
  power: number;
  policy: number;
  ecosystem: number;
}

export interface CountryData {
  // Identity
  country: string;
  iso2: string;
  region: string;
  latitude: number;
  longitude: number;

  // Socioeconomic context
  population_m: number;
  gdp_usd_bn: number;
  internet_penetration_pct: number;
  mobile_penetration_pct: number;

  // Infrastructure
  dc_count: number;
  it_load_mw: number;
  ixp_count: number;
  submarine_cables: string[];
  cloud_providers: string[];
  dc_operators: string[];

  // Policy
  ai_strategy_status: "Adopted" | "Drafting" | "None";
  key_regulations: string[];

  // Readiness scores (0–100)
  readiness_score: number;
  scores: CountryScores;

  // Legacy / dashboard display fields
  ai_inference_readiness: "Viable" | "Emerging" | "Emerging (Early)";
  active_data_centers: string;
  dc_pipeline: string;
  ai_compute_availability: string;
  cloud_maturity: string;
  connectivity_role: string;
  power_reliability: string;
  ops_friction: string;
  data_residency_constraint: string;
  primary_inference_route: string;
  est_rtt_to_europe_ms: string;
  founder_insight: string;
  ai_policy_signal: "Strong" | "Emerging" | "Unclear";
  ai_data_governance_posture: string;
  ai_compute_policy_commitment: string;
  cross_border_ai_alignment: string;
}

export type ViewMode = "founder" | "policy";

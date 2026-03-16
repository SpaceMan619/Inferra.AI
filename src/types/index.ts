export interface CountryData {
  country: string;
  region: string;
  latitude: number;
  longitude: number;
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

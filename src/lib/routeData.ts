// [lng, lat] — GeoJSON coordinate order
export const EUROPE_POPS: Record<string, [number, number]> = {
  london:    [-0.09, 51.51],
  marseille: [ 5.37, 43.30],
};

export const REGIONAL_HUBS: Record<string, [number, number]> = {
  nairobi:       [ 36.82,  -1.29],
  johannesburg:  [ 28.04, -26.20],
  djibouti:      [ 43.15,  11.59],
  lagos:         [  3.38,   6.52],
};

export type RouteType = "Local-Native" | "Hybrid-Edge" | "Regional-Tethered";

export interface RouteConfig {
  country: string;
  type: RouteType;
  hub?: [number, number];
  dest?: [number, number];
}

export const ROUTE_CONFIGS: RouteConfig[] = [
  // Local-Native (South Africa has hyperscaler regions locally — no arc)
  { country: "South Africa", type: "Local-Native" },

  // Hybrid-Edge → London (West Africa / Atlantic cables)
  { country: "Nigeria",     type: "Hybrid-Edge", dest: EUROPE_POPS.london },
  { country: "Ghana",       type: "Hybrid-Edge", dest: EUROPE_POPS.london },
  { country: "Ivory Coast", type: "Hybrid-Edge", dest: EUROPE_POPS.london },
  { country: "Angola",      type: "Hybrid-Edge", dest: EUROPE_POPS.london },

  // Hybrid-Edge → Marseille (Indian Ocean / Mediterranean cables)
  { country: "Kenya",       type: "Hybrid-Edge", dest: EUROPE_POPS.marseille },
  { country: "Egypt",       type: "Hybrid-Edge", dest: EUROPE_POPS.marseille },
  { country: "Morocco",     type: "Hybrid-Edge", dest: EUROPE_POPS.marseille },
  { country: "Tanzania",    type: "Hybrid-Edge", dest: EUROPE_POPS.marseille },
  { country: "Senegal",     type: "Hybrid-Edge", dest: EUROPE_POPS.marseille },
  { country: "Tunisia",     type: "Hybrid-Edge", dest: EUROPE_POPS.marseille },
  { country: "Mozambique",  type: "Hybrid-Edge", dest: EUROPE_POPS.marseille },
  { country: "Djibouti",    type: "Hybrid-Edge", dest: EUROPE_POPS.marseille },

  // Regional-Tethered via Nairobi → Marseille
  { country: "Rwanda",   type: "Regional-Tethered", hub: REGIONAL_HUBS.nairobi,      dest: EUROPE_POPS.marseille },
  { country: "Uganda",   type: "Regional-Tethered", hub: REGIONAL_HUBS.nairobi,      dest: EUROPE_POPS.marseille },

  // Regional-Tethered via Djibouti → Marseille
  { country: "Ethiopia", type: "Regional-Tethered", hub: REGIONAL_HUBS.djibouti,     dest: EUROPE_POPS.marseille },

  // Regional-Tethered via Johannesburg → Marseille
  { country: "Zambia",    type: "Regional-Tethered", hub: REGIONAL_HUBS.johannesburg, dest: EUROPE_POPS.marseille },
  { country: "Botswana",  type: "Regional-Tethered", hub: REGIONAL_HUBS.johannesburg, dest: EUROPE_POPS.marseille },
  { country: "Mauritius", type: "Regional-Tethered", hub: REGIONAL_HUBS.johannesburg, dest: EUROPE_POPS.marseille },

  // Regional-Tethered via Lagos → London
  { country: "Cameroon", type: "Regional-Tethered", hub: REGIONAL_HUBS.lagos,        dest: EUROPE_POPS.london },
];

export const FOUNDER_COLORS: Record<string, [number, number, number, number]> = {
  "Viable": [61, 107, 79, 220],
  "Emerging": [212, 163, 74, 200],
  "Emerging (Early)": [192, 90, 46, 180],
};

export const POLICY_COLORS: Record<string, [number, number, number, number]> = {
  "Strong": [200, 132, 58, 230],
  "Emerging": [168, 148, 120, 180],
  "Unclear": [107, 90, 69, 140],
};

export const RADIUS_MAP: Record<string, number> = {
  "Viable": 220000,
  "Emerging": 170000,
  "Emerging (Early)": 130000,
};

export const REGIONAL_HUBS: Record<string, { lat: number; lon: number }> = {
  "East Africa": { lat: -1.286389, lon: 36.817223 },
  "West Africa": { lat: 6.524379, lon: 3.379206 },
  "Southern Africa": { lat: -33.9249, lon: 18.4241 },
  "North Africa": { lat: 30.0444, lon: 31.2357 },
};

export const EU_HUB = { lat: 43.0, lon: 3.0 };

export const INITIAL_VIEW_STATE = {
  latitude: 5,
  longitude: 20,
  zoom: 3.2,
  pitch: 45,
  bearing: 0,
};

export const MAPBOX_STYLE = "mapbox://styles/mapbox/dark-v11";

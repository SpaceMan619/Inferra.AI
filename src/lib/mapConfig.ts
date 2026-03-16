export const FOUNDER_COLORS: Record<string, [number, number, number, number]> = {
  "Viable": [16, 185, 129, 230],      // emerald
  "Emerging": [245, 158, 11, 210],     // amber
  "Emerging (Early)": [239, 68, 68, 190],  // red
};

export const POLICY_COLORS: Record<string, [number, number, number, number]> = {
  "Strong": [79, 70, 229, 230],       // indigo
  "Emerging": [245, 158, 11, 200],    // amber
  "Unclear": [156, 163, 175, 160],    // gray
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
  pitch: 0,
  bearing: 0,
};

export const MAPBOX_STYLE = "mapbox://styles/mapbox/light-v11";

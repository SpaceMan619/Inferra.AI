import type { SavedBrief } from "./advisorTypes";

const KEY = "inferra-saved-briefs";

export function loadSavedBriefs(): SavedBrief[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as SavedBrief[]) : [];
  } catch {
    return [];
  }
}

export function saveBrief(brief: SavedBrief): void {
  const briefs = loadSavedBriefs();
  briefs.unshift(brief);
  localStorage.setItem(KEY, JSON.stringify(briefs));
}

export function deleteBrief(id: string): void {
  const briefs = loadSavedBriefs().filter((b) => b.id !== id);
  localStorage.setItem(KEY, JSON.stringify(briefs));
}

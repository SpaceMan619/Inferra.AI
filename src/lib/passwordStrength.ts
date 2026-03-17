/**
 * Returns a strength score 0–4.
 * 0 = empty, 1 = Weak, 2 = Fair, 3 = Good, 4 = Strong
 */
export function getPasswordStrength(password: string): number {
  if (!password) return 0;

  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  // Map 5-point scale to 4 tiers
  if (score <= 2) return 1; // Weak   — missing length or only one case type
  if (score === 3) return 2; // Fair  — length + both cases, no number/special
  if (score === 4) return 3; // Good  — length + both cases + number
  return 4;                  // Strong — all 5 criteria
}

export const STRENGTH_CONFIG = [
  { label: "", color: "transparent", width: "0%" },
  { label: "Weak", color: "#ef4444", width: "25%" },
  { label: "Fair", color: "#f97316", width: "50%" },
  { label: "Good", color: "#eab308", width: "75%" },
  { label: "Strong", color: "#22c55e", width: "100%" },
] as const;

/**
 * Maps raw Supabase auth error messages to safe, user-facing strings.
 * Prevents leaking backend state (account existence, rate limits, provider details).
 */

const AUTH_ERROR_MAP: Record<string, string> = {
  "Invalid login credentials": "Incorrect email or password.",
  "Email not confirmed": "Please confirm your email before signing in.",
  "User already registered": "An account with this email already exists.",
  "Email rate limit exceeded": "Too many attempts. Please wait a moment and try again.",
  "Password should be at least 6 characters": "Password must be at least 8 characters.",
  "New password should be different from the old password": "New password must be different from your current one.",
  "Auth session missing": "Your session has expired. Please sign in again.",
  "Token has expired or is invalid": "This link has expired. Please request a new one.",
};

export function sanitizeAuthError(message: string): string {
  // Direct match first
  if (AUTH_ERROR_MAP[message]) return AUTH_ERROR_MAP[message];

  // Partial matches for verbose Supabase messages
  if (message.toLowerCase().includes("rate limit")) return "Too many attempts. Please wait a moment and try again.";
  if (message.toLowerCase().includes("expired")) return "This link has expired. Please request a new one.";
  if (message.toLowerCase().includes("invalid") && message.toLowerCase().includes("token")) return "This link is invalid. Please request a new one.";

  // Safe fallback — never leak raw provider messages
  return "Something went wrong. Please try again.";
}

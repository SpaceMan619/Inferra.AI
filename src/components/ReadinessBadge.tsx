"use client";

interface ReadinessBadgeProps {
  label: string;
}

const BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  "Viable": { bg: "rgba(16, 185, 129, 0.1)", text: "#059669" },
  "Emerging": { bg: "rgba(245, 158, 11, 0.1)", text: "#d97706" },
  "Emerging (Early)": { bg: "rgba(239, 68, 68, 0.08)", text: "#dc2626" },
  "Strong": { bg: "rgba(34, 47, 48, 0.08)", text: "#222f30" },
  "Unclear": { bg: "rgba(34, 47, 48, 0.05)", text: "rgba(34, 47, 48, 0.45)" },
  "Restricted": { bg: "rgba(239, 68, 68, 0.08)", text: "#dc2626" },
  "Flexible": { bg: "rgba(16, 185, 129, 0.1)", text: "#059669" },
  "Explicit": { bg: "rgba(34, 47, 48, 0.08)", text: "#222f30" },
  "Implied": { bg: "rgba(245, 158, 11, 0.1)", text: "#d97706" },
  "Absent": { bg: "rgba(34, 47, 48, 0.05)", text: "rgba(34, 47, 48, 0.4)" },
  "Supported": { bg: "rgba(16, 185, 129, 0.1)", text: "#059669" },
  "Conditional": { bg: "rgba(245, 158, 11, 0.1)", text: "#d97706" },
};

export default function ReadinessBadge({ label }: ReadinessBadgeProps) {
  const style = BADGE_STYLES[label] || { bg: "rgba(34,47,48,0.05)", text: "rgba(34,47,48,0.4)" };

  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-[11px] font-normal"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {label}
    </span>
  );
}

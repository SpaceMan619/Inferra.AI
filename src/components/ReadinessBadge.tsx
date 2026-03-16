"use client";

interface ReadinessBadgeProps {
  label: string;
}

const BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  "Viable": { bg: "rgba(0, 201, 167, 0.15)", text: "#00c9a7" },
  "Emerging": { bg: "rgba(255, 209, 102, 0.15)", text: "#ffd166" },
  "Emerging (Early)": { bg: "rgba(255, 107, 53, 0.15)", text: "#ff6b35" },
  "Strong": { bg: "rgba(0, 201, 167, 0.15)", text: "#00c9a7" },
  "Unclear": { bg: "rgba(106, 106, 128, 0.15)", text: "#6a6a80" },
  "Restricted": { bg: "rgba(239, 71, 111, 0.15)", text: "#ef476f" },
  "Flexible": { bg: "rgba(0, 201, 167, 0.15)", text: "#00c9a7" },
  "Explicit": { bg: "rgba(255, 209, 102, 0.15)", text: "#ffd166" },
  "Implied": { bg: "rgba(255, 140, 90, 0.15)", text: "#ff8c5a" },
  "Absent": { bg: "rgba(106, 106, 128, 0.15)", text: "#6a6a80" },
  "Supported": { bg: "rgba(0, 201, 167, 0.15)", text: "#00c9a7" },
  "Conditional": { bg: "rgba(255, 209, 102, 0.15)", text: "#ffd166" },
};

export default function ReadinessBadge({ label }: ReadinessBadgeProps) {
  const style = BADGE_STYLES[label] || {
    bg: "rgba(106, 106, 128, 0.15)",
    text: "#b0b0c0",
  };

  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-semibold tracking-wide"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {label}
    </span>
  );
}

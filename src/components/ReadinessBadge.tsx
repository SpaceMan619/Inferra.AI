"use client";

interface ReadinessBadgeProps {
  label: string;
}

const BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  Viable: { bg: "rgba(61, 107, 79, 0.2)", text: "#5a9a72" },
  Emerging: { bg: "rgba(212, 163, 74, 0.2)", text: "#d4a34a" },
  "Emerging (Early)": { bg: "rgba(192, 90, 46, 0.2)", text: "#c05a2e" },
  Strong: { bg: "rgba(200, 132, 58, 0.2)", text: "#daa05d" },
  Unclear: { bg: "rgba(107, 90, 69, 0.2)", text: "#a89478" },
  Restricted: { bg: "rgba(192, 90, 46, 0.15)", text: "#c05a2e" },
  Flexible: { bg: "rgba(61, 107, 79, 0.15)", text: "#5a9a72" },
  Explicit: { bg: "rgba(200, 132, 58, 0.15)", text: "#daa05d" },
  Implied: { bg: "rgba(212, 163, 74, 0.15)", text: "#d4a34a" },
  Absent: { bg: "rgba(107, 90, 69, 0.15)", text: "#6b5a45" },
  Supported: { bg: "rgba(61, 107, 79, 0.15)", text: "#5a9a72" },
  Conditional: { bg: "rgba(212, 163, 74, 0.15)", text: "#d4a34a" },
};

export default function ReadinessBadge({ label }: ReadinessBadgeProps) {
  const style = BADGE_STYLES[label] || {
    bg: "rgba(107, 90, 69, 0.2)",
    text: "#a89478",
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

"use client";

interface ReadinessBadgeProps {
  label: string;
}

const BADGE_STYLES: Record<string, { bg: string; text: string }> = {
  "Viable": { bg: "#ecfdf5", text: "#059669" },
  "Emerging": { bg: "#fffbeb", text: "#d97706" },
  "Emerging (Early)": { bg: "#fef2f2", text: "#dc2626" },
  "Strong": { bg: "#eef2ff", text: "#4f46e5" },
  "Unclear": { bg: "#f3f4f6", text: "#6b7280" },
  "Restricted": { bg: "#fef2f2", text: "#dc2626" },
  "Flexible": { bg: "#ecfdf5", text: "#059669" },
  "Explicit": { bg: "#eef2ff", text: "#4f46e5" },
  "Implied": { bg: "#fffbeb", text: "#d97706" },
  "Absent": { bg: "#f3f4f6", text: "#9ca3af" },
  "Supported": { bg: "#ecfdf5", text: "#059669" },
  "Conditional": { bg: "#fffbeb", text: "#d97706" },
};

export default function ReadinessBadge({ label }: ReadinessBadgeProps) {
  const style = BADGE_STYLES[label] || { bg: "#f3f4f6", text: "#6b7280" };

  return (
    <span
      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
      style={{ backgroundColor: style.bg, color: style.text }}
    >
      {label}
    </span>
  );
}

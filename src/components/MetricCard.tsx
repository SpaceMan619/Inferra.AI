"use client";

interface MetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
}

export default function MetricCard({ label, value, subtitle }: MetricCardProps) {
  return (
    <div
      className="glass-panel glass-panel-hover p-4 transition-all duration-200"
      style={{ borderRadius: "12px" }}
    >
      <div
        className="text-xs tracking-wider uppercase mb-1.5"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </div>
      <div
        className="text-sm font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {value}
      </div>
      {subtitle && (
        <div
          className="text-xs mt-1"
          style={{ color: "var(--text-muted)" }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

"use client";

interface MetricCardProps {
  label: string;
  value: string;
  subtitle?: string;
}

export default function MetricCard({ label, value, subtitle }: MetricCardProps) {
  return (
    <div
      className="rounded-xl p-3.5 transition-all duration-200 hover:shadow-sm"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--glass-border)",
      }}
    >
      <div
        className="text-[11px] tracking-wider uppercase mb-1 font-medium"
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
          className="text-[11px] mt-0.5"
          style={{ color: "var(--text-muted)" }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
}

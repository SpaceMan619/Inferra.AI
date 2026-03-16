"use client";

export default function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      style={{ animation: "float-bounce 2.5s ease-in-out infinite" }}
    >
      <span
        className="text-xs tracking-[0.25em] uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        Explore
      </span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{ color: "var(--text-muted)" }}
      >
        <path
          d="M4 7L10 13L16 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

import type { ReactNode } from "react";

/**
 * Line icons matching the dashboard sidebar: 24-unit grid, 1.5 stroke,
 * round caps, no fill. Size is set by the caller so the same glyph can run
 * small beside a heading or larger inside a panel.
 */
function Glyph({ size = 22, children }: { size?: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

/* ── Dimensions ─────────────────────────────── */

export const ComputeIcon = ({ size }: { size?: number }) => (
  <Glyph size={size}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" rx="1" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
  </Glyph>
);

export const ConnectivityIcon = ({ size }: { size?: number }) => (
  <Glyph size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12h18" />
    <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
  </Glyph>
);

export const PowerIcon = ({ size }: { size?: number }) => (
  <Glyph size={size}>
    <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
  </Glyph>
);

export const PolicyIcon = ({ size }: { size?: number }) => (
  <Glyph size={size}>
    <path d="M12 3 4 6v6c0 4.5 3.2 8.3 8 9 4.8-.7 8-4.5 8-9V6l-8-3z" />
    <path d="M9 12l2 2 4-4" />
  </Glyph>
);

export const EcosystemIcon = ({ size }: { size?: number }) => (
  <Glyph size={size}>
    <circle cx="12" cy="6" r="2.5" />
    <circle cx="5.5" cy="17" r="2.5" />
    <circle cx="18.5" cy="17" r="2.5" />
    <path d="M10.3 7.9 7.2 14.8M13.7 7.9l3.1 6.9M8 17h8" />
  </Glyph>
);

/* ── Sections ───────────────────────────────── */

export const MeasureIcon = ({ size }: { size?: number }) => (
  <Glyph size={size}>
    <line x1="6" y1="20" x2="6" y2="14" />
    <line x1="12" y1="20" x2="12" y2="8" />
    <line x1="18" y1="20" x2="18" y2="4" />
  </Glyph>
);

export const BandsIcon = ({ size }: { size?: number }) => (
  <Glyph size={size}>
    <rect x="3" y="5" width="18" height="4" rx="1" />
    <rect x="3" y="15" width="18" height="4" rx="1" />
    <path d="M8 9v6M16 9v6" />
  </Glyph>
);

export const TiersIcon = ({ size }: { size?: number }) => (
  <Glyph size={size}>
    <path d="M12 3 3 8l9 5 9-5-9-5z" />
    <path d="M3 13l9 5 9-5" />
  </Glyph>
);

export const SourceIcon = ({ size }: { size?: number }) => (
  <Glyph size={size}>
    <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H19v15H6.5A2.5 2.5 0 0 0 4 20.5z" />
    <path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H19v3H6.5A2.5 2.5 0 0 1 4 20.5z" />
    <path d="M9 8h6" />
  </Glyph>
);

export const VerifyIcon = ({ size }: { size?: number }) => (
  <Glyph size={size}>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
    <path d="m8.5 11 2 2 4-4" />
  </Glyph>
);

export const LimitsIcon = ({ size }: { size?: number }) => (
  <Glyph size={size}>
    <circle cx="12" cy="12" r="9" />
    <path d="M5.6 5.6l12.8 12.8" />
  </Glyph>
);

export const DIMENSION_ICONS: Record<string, (p: { size?: number }) => ReactNode> = {
  compute: ComputeIcon,
  connectivity: ConnectivityIcon,
  power: PowerIcon,
  policy: PolicyIcon,
  ecosystem: EcosystemIcon,
};

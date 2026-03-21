interface Props {
  size?: number;
  color?: string;
  className?: string;
}

export function InferraLogoMark({ size = 32, color = "#222f30", className }: Props) {
  const s = size / 32;
  const w = 2.2 / s;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Inferra AI"
    >
      <path d="M 10 27 L 16 22 L 22 27" stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 6 20 L 16 14 L 26 20"  stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 3 13 L 16 6 L 29 13"   stroke={color} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

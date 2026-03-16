"use client";

interface ParticleGlobeProps {
  interactive?: boolean;
  onMarkerClick?: (marker: { name: string; status: string }) => void;
  selectedCountry?: string;
  className?: string;
}

export default function ParticleGlobe({ className = "" }: ParticleGlobeProps) {
  return (
    <div
      className={className}
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgba(255,255,255,0.2)",
        fontSize: 13,
        fontWeight: 500,
      }}
    >
      Globe — coming soon
    </div>
  );
}

"use client";

import { useRef, useEffect, useCallback } from "react";
import { Map, Marker } from "react-map-gl/mapbox";
import type { MapRef } from "react-map-gl/mapbox";
import type { CountryData } from "@/types";

interface GlobeViewProps {
  selectedCountry?: string;
  countries?: CountryData[];
  onSelectCountry?: (name: string) => void;
}

function getMarkerStyle(c: CountryData, isSelected: boolean) {
  const size =
    c.ai_inference_readiness === "Viable" ? 13
    : c.ai_inference_readiness === "Emerging" ? 11
    : 9;
  const color =
    c.ai_inference_readiness === "Viable" ? "#22c55e"
    : c.ai_inference_readiness === "Emerging" ? "#f59e0b"
    : c.ai_inference_readiness === "Emerging (Early)" ? "#f97316"
    : "#ef4444";

  return {
    width: size,
    height: size,
    borderRadius: "50%",
    backgroundColor: color,
    border: isSelected ? "2.5px solid #fff" : "1.5px solid rgba(255,255,255,0.7)",
    cursor: "pointer",
    boxShadow: isSelected
      ? `0 0 0 3px ${color}55, 0 2px 8px rgba(0,0,0,0.5)`
      : "0 1px 4px rgba(0,0,0,0.5)",
    transition: "box-shadow 0.2s",
  };
}

export default function GlobeView({ selectedCountry, countries, onSelectCountry }: GlobeViewProps) {
  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const mapRef = useRef<MapRef>(null);
  const rafRef = useRef<number | null>(null);
  const isInteracting = useRef(false);

  const stopRotation = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startRotation = useCallback(() => {
    stopRotation();
    const map = mapRef.current?.getMap();
    if (!map) return;
    // Smooth continuous rotation via easeTo with very long duration
    const center = map.getCenter();
    map.easeTo({
      center: [center.lng + 180, center.lat],
      duration: 60000,
      easing: (t) => t,
    });
  }, [stopRotation]);

  // Fly to selected country
  useEffect(() => {
    if (!selectedCountry || !countries) return;
    const country = countries.find((c) => c.country === selectedCountry);
    if (!country) return;
    const map = mapRef.current?.getMap();
    if (!map) return;
    stopRotation();
    map.flyTo({
      center: [country.longitude, country.latitude],
      zoom: 3.5,
      duration: 1800,
      essential: true,
    });
    // Resume rotation after fly completes
    const t = setTimeout(startRotation, 2200);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedCountry]);

  // Pause rotation when tab hidden
  useEffect(() => {
    const onVisibility = () => {
      if (document.hidden) stopRotation();
      else startRotation();
    };
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, [startRotation, stopRotation]);

  if (!token) {
    return (
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-2"
        style={{ backgroundColor: "#0a0c10" }}
      >
        <p className="text-[12px]" style={{ color: "rgba(255,255,255,0.25)" }}>
          Globe requires Mapbox token
        </p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0">
      <Map
        ref={mapRef}
        mapboxAccessToken={token}
        mapStyle="mapbox://styles/mapbox/satellite-streets-v12"
        initialViewState={{ longitude: 20, latitude: 2, zoom: 1.6 }}
        attributionControl={false}
        scrollZoom={false}
        dragRotate={false}
        pitchWithRotate={false}
        touchPitch={false}
        style={{ width: "100%", height: "100%" }}
        onMouseDown={() => { isInteracting.current = true; stopRotation(); }}
        onMouseUp={() => { isInteracting.current = false; startRotation(); }}
        onTouchStart={() => { isInteracting.current = true; stopRotation(); }}
        onTouchEnd={() => { isInteracting.current = false; startRotation(); }}
        onLoad={(e) => {
          const map = e.target;
          // Set globe projection
          map.setProjection({ name: "globe" } as Parameters<typeof map.setProjection>[0]);
          // Atmosphere — Earth from space look
          map.setFog({
            color: "rgba(120, 160, 210, 0.6)",
            "high-color": "rgb(30, 80, 200)",
            "horizon-blend": 0.03,
            "space-color": "rgb(6, 8, 18)",
            "star-intensity": 0.7,
          } as Parameters<typeof map.setFog>[0]);
          startRotation();
        }}
      >
        {countries?.map((c) => {
          const isSelected = c.country === selectedCountry;
          return (
            <Marker
              key={c.country}
              latitude={c.latitude}
              longitude={c.longitude}
              anchor="center"
            >
              <div
                style={getMarkerStyle(c, isSelected)}
                onClick={() => onSelectCountry?.(c.country)}
              />
            </Marker>
          );
        })}
      </Map>
    </div>
  );
}

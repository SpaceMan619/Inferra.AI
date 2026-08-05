import type { Metadata } from "next";
import MethodologyContent from "@/components/methodology/MethodologyContent";

export const metadata: Metadata = {
  title: "Methodology — Inferra AI",
  description:
    "How Inferra AI scores AI infrastructure readiness across Africa: what we measure, where every number comes from, and how each one is verified.",
};

/**
 * Public route. Signed-in users reach the same content as a dashboard section
 * instead, so they keep the sidebar; this standalone version exists for anyone
 * arriving from the landing page, a search result, or a shared link.
 */
export default function MethodologyPage() {
  return (
    <main>
      <MethodologyContent chrome="page" />
    </main>
  );
}

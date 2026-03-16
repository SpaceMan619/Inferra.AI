"use client";

import type { CountryData } from "@/types";
import Hero from "./Hero";
import StatsBar from "./StatsBar";
import ToolSection from "./ToolSection";
import Footer from "./Footer";

interface ClientAppProps {
  countries: CountryData[];
}

export default function ClientApp({ countries }: ClientAppProps) {
  return (
    <main>
      <Hero />
      <StatsBar countries={countries} />
      <ToolSection countries={countries} />
      <Footer />
    </main>
  );
}

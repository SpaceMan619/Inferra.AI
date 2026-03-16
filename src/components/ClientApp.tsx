"use client";

import type { CountryData } from "@/types";
import Navbar from "./Navbar";
import Hero from "./Hero";
import StatsBar from "./StatsBar";
import Features from "./Features";
import Insights from "./Insights";
import CTA from "./CTA";
import Footer from "./Footer";

interface ClientAppProps {
  countries: CountryData[];
}

export default function ClientApp({ countries }: ClientAppProps) {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar countries={countries} />
        <Features />
        <Insights />
        <CTA />
      </main>
      <Footer />
    </>
  );
}

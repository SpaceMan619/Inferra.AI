import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhatWeDo from "@/components/landing/WhatWeDo";
import Pillars from "@/components/landing/Pillars";
import Marquee from "@/components/landing/Marquee";
import About from "@/components/landing/About";
import FounderNote from "@/components/landing/FounderNote";
import Newsroom from "@/components/landing/Newsroom";
import Footer from "@/components/landing/Footer";
import SmoothScroll from "@/components/landing/SmoothScroll";

export default function Home() {
  return (
    <main>
      <SmoothScroll />
      <Navbar />
      <Hero />
      <WhatWeDo />
      <Pillars />
      <Marquee />
      <About />
      <FounderNote />
      <Newsroom />
      <Footer />
    </main>
  );
}

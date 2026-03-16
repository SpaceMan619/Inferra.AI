import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import WhatWeDo from "@/components/landing/WhatWeDo";
import Pillars from "@/components/landing/Pillars";
import About from "@/components/landing/About";
import Newsroom from "@/components/landing/Newsroom";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhatWeDo />
      <Pillars />
      <About />
      <Newsroom />
      <Footer />
    </main>
  );
}

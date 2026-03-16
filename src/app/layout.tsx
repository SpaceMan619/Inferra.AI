import type { Metadata } from "next";
import { Cormorant_Garamond, Outfit } from "next/font/google";
import "./globals.css";

const heading = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const body = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "InferraAI — AI Inference Readiness Across Africa",
  description:
    "Visual decision-support tool mapping where AI inference workloads can realistically be deployed across the African continent.",
  openGraph: {
    title: "InferraAI",
    description: "Where AI runs on the continent.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${heading.variable} ${body.variable} font-sans antialiased grain-overlay`}
      >
        {children}
      </body>
    </html>
  );
}

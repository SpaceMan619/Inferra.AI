# InferraAI Design Document

> **Date:** 2026-03-09
> **Status:** Approved
> **Origin:** Recreation of `ai-inference-map` (Streamlit prototype) as a production-grade Next.js app

---

## Overview

InferraAI is a founder-facing decision-support tool that visualizes where AI inference workloads can realistically be deployed across the African continent. It replaces the existing Streamlit prototype with a visually striking, animated single-page experience deployed on Vercel.

---

## Visual Identity

### Color Palette — Rich Earth Tones

| Token              | Value       | Usage                                      |
|--------------------|-------------|---------------------------------------------|
| `--bg-deep`        | `#0f0b07`   | Page background, deepest layer              |
| `--bg-surface`     | `#1a1208`   | Cards, panels, elevated surfaces            |
| `--primary`        | `#c8843a`   | CTAs, highlights, active states (ochre)      |
| `--secondary`      | `#3d6b4f`   | Viable markers, positive signals (forest)    |
| `--danger`         | `#c05a2e`   | Emerging (Early) markets (terracotta)        |
| `--warning`        | `#d4a34a`   | Emerging markets (warm amber)                |
| `--text-primary`   | `#f0e6d3`   | Body text on dark backgrounds (warm cream)   |
| `--text-secondary` | `#a89478`   | Muted labels, captions                       |
| `--glass-bg`       | `rgba(200, 132, 58, 0.06)` | Liquid glass panel fill        |
| `--glass-border`   | `rgba(200, 132, 58, 0.15)` | Liquid glass panel border      |

### Liquid Glass Effect

```css
.glass-panel {
  background: var(--glass-bg);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
}
```

### Typography

- **Headings:** Serif (e.g., Playfair Display or similar) — premium, editorial feel
- **Body:** Sans-serif (Inter or Geist) — clean readability for data

---

## Page Structure

Single route (`/`) — one seamless scroll experience.

### Section 1: Hero (100vh)

- Full-viewport dark background
- Africa continent SVG silhouette as animated background element
- Country dots pulse slowly in readiness colors (green/amber/terracotta)
- **Headline:** "Where AI runs on the continent." (serif, large)
- **Subheadline:** "InferraAI maps inference readiness across African markets — so you deploy with confidence, not guesswork."
- Scroll indicator arrow with gentle bounce animation
- Words animate in via Framer Motion stagger

### Section 2: Stats Bar

- Horizontal strip with key metrics
- `7 markets tracked · 2 viable inference hubs · 3 GPU-available · 2 strong policy signals`
- Numbers count up (counter animation) when scrolling into view
- Subtle glass background

### Section 3: Tool Section (main interactive area)

- **Mode Toggle:** Founder / Policy pill switcher with animated sliding indicator
- **Layout:** Map (left, ~60%) + Country Detail Panel (right, ~40%)
- **Map:**
  - deck.gl ScatterplotLayer on Mapbox GL base (warm/earth-tone map style)
  - 3D tilt (pitch ~45deg)
  - Country dots: color = readiness tier, radius = readiness level
  - PathLayer for inference routing lines (regional-tethered, hybrid-edge)
  - Click dot → selects country → detail panel updates
  - Highlight halo on selected country (amber glow ring)
- **Country Detail Panel:**
  - Liquid glass card
  - Country name + readiness badge (colored pill)
  - Metrics grid (4 cards, 2x2): Inference Route, Latency, Compute Availability, Readiness Status
  - Second row: Data Centers, Power Reliability, Cloud Maturity, Ops Friction
  - Founder Insight quote block
  - Panel content cross-fades on country or mode change

### Section 4: Footer

- InferraAI wordmark + tagline
- GitHub link
- Disclaimer: "Data is directional and based on public sources."

---

## Animations

| Element              | Library         | Effect                                               |
|----------------------|-----------------|-------------------------------------------------------|
| Hero headline        | Framer Motion   | Words stagger in: `y: 20 → 0, opacity: 0 → 1`       |
| Hero dots            | CSS keyframes   | Pulse scale + opacity with staggered delays            |
| Stats counter        | Custom hook     | Count-up on `whileInView` trigger                      |
| Section reveals      | Framer Motion   | `y: 40 → 0, opacity: 0 → 1` on scroll enter           |
| Mode toggle pill     | Framer Motion   | `layoutId` sliding indicator                           |
| Map dot hover        | deck.gl + CSS   | Scale up + glow ring                                   |
| Country panel        | Framer Motion   | Slide in from right with spring physics                |
| Mode switch          | Framer Motion   | Cross-fade map colors + panel content simultaneously   |

---

## Tech Stack

| Component          | Technology                     |
|--------------------|--------------------------------|
| Framework          | Next.js 14 (App Router)        |
| Language           | TypeScript                     |
| Styling            | Tailwind CSS                   |
| Map                | deck.gl + Mapbox GL JS         |
| Animations         | Framer Motion                  |
| Data               | CSV → JSON at build time (fs)  |
| Deployment         | Vercel (via GitHub)            |

---

## Data

Source CSV: `data/ai_inference_readiness_africa_v0.csv` (copied from original project).

Loaded at build time in a Server Component using Node `fs`, parsed to JSON, passed as props to client components. No runtime API calls needed.

### Key Data Fields

**Founder Mode:** country, latitude, longitude, region, ai_inference_readiness, primary_inference_route, est_rtt_to_europe_ms, ai_compute_availability, active_data_centers, dc_pipeline, power_reliability, cloud_maturity, ops_friction, founder_insight

**Policy Mode:** ai_policy_signal, ai_data_governance_posture, ai_compute_policy_commitment, cross_border_ai_alignment

---

## Out of Scope (v1)

- Authentication / user accounts
- Waitlist / email capture
- Real-time data updates
- More than 7 countries (existing dataset)
- Mobile-responsive map (desktop-first)

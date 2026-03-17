<div align="center">

<br />

# Inferra AI

**Interactive intelligence platform mapping AI infrastructure readiness across Africa.**

Compute · Connectivity · Power · Policy — across 30 markets, built for founders and investors.

<br />

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=flat-square&logo=mapbox)](https://mapbox.com)

<br />

</div>

---

## What it is

Africa is receiving $10B+ in AI infrastructure investment — but founders have almost no visibility into where they can actually deploy. Only one country on the continent has a hyperscaler cloud region.

Inferra AI is the intelligence layer. It maps compute availability, submarine cable connectivity, power reliability, and AI policy signals across 30 African markets so builders can make informed decisions about where to run inference, what the trade-offs are, and what's coming next.

---

## Dashboard

The dashboard has five sections:

| Section | What it shows |
|---|---|
| **Overview** | Mapbox satellite globe + searchable country selector + full country detail panel |
| **Map** | Geographic infrastructure view with animated inference route arcs |
| **Markets** | Card grid across all 30 markets — tier badges, founder insights, quick stats |
| **Insights** | Live-computed readiness rankings, dimension leaders, aggregate signals |
| **Compare** | Side-by-side radar chart overlaying 5 readiness dimensions for any two countries |

Switch between **Infrastructure** and **Policy** modes across all sections.

---

## Data

`public/data/countries.json` covers **30 African markets** — fully sourced and audited.

Each country includes:

- `readiness_score` — composite 0–100 score
- `scores` — five sub-dimensions: compute, connectivity, power, policy, ecosystem
- `dc_count_total` / `dc_ai_capable` — total data centers vs AI-capable (30kW+/rack, N+1 power, 2+ fiber, carrier-neutral)
- `est_rtt_to_europe_ms` — estimated latency to EU
- `ai_compute_availability` / `power_reliability` / `cloud_maturity` / `ops_friction`
- `primary_inference_route` — Local-Native / Hybrid-Edge / Regional-Tethered
- `ai_policy_signal` / `ai_strategy_status` / `data_residency_constraint`
- `founder_insight` — directional note for builders

Sources cited in `public/data/sources.json`. Data is directional — not a substitute for primary due diligence.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS v4, CSS custom properties |
| Animations | GSAP (ScrollTrigger, SplitText), Framer Motion, Lenis |
| Map / Globe | Mapbox GL via `react-map-gl` — satellite globe projection |
| Charts | Custom SVG radar chart (no external dependency) |
| Data | Static JSON, server-rendered via `page.tsx` |

---

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your NEXT_PUBLIC_MAPBOX_TOKEN

# Run development server
npm run dev
```

Landing page → [http://localhost:3000](http://localhost:3000)
Dashboard → [http://localhost:3000/dashboard](http://localhost:3000/dashboard)

### Environment Variables

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox access token for the satellite globe and map |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                 # Landing page (server component)
│   ├── dashboard/page.tsx       # Dashboard entry (server, loads data)
│   ├── login/ & signup/         # Auth pages (UI complete)
├── components/
│   ├── landing/
│   │   ├── Hero.tsx             # GSAP clip-path video hero + scroll scroller
│   │   ├── WhatWeDo.tsx         # Platform description with TextReveal
│   │   ├── Pillars.tsx          # Infrastructure / Intelligence / Policy cards
│   │   ├── About.tsx            # About section
│   │   ├── FounderNote.tsx      # Founder statement
│   │   ├── Newsroom.tsx         # Signals / live article links
│   │   ├── Marquee.tsx          # Scrolling marquee banner
│   │   ├── Navbar.tsx           # Top navigation
│   │   └── Footer.tsx
│   ├── DashboardClient.tsx      # Main shell — routing, layout, state
│   ├── DashboardSidebar.tsx     # Desktop sidebar nav
│   ├── GlobeView.tsx            # Mapbox satellite globe (Overview)
│   ├── MapView.tsx              # Mapbox infrastructure map (Map tab)
│   ├── CountryPanel.tsx         # Country detail — vertical key-value layout
│   ├── CountryList.tsx          # Searchable scrollable market list
│   ├── CountryCombobox.tsx      # Compact desktop country selector (dropdown)
│   ├── InsightsDashboard.tsx    # Rankings and dimension leaders
│   ├── CompareClient.tsx        # Side-by-side country comparison
│   ├── RadarChart.tsx           # SVG radar chart (5 dimensions)
│   ├── InferenceArcs.tsx        # Animated route arcs on the map
│   └── ModeToggle.tsx           # Infrastructure / Policy toggle
├── types/index.ts               # All TypeScript interfaces
├── hooks/                       # useCountUp, etc.
└── lib/                         # Route data, map config
public/
└── data/
    ├── countries.json           # 30-country dataset
    └── sources.json             # Data citations
```

---

## Status

**Active development.** The dashboard, data layer, and all five tabs are functional. Auth (login/signup) is UI-complete but not yet wired to a backend.

---

<div align="center">

Built by **Rajveer Singh Jolly** · [Project Future](https://projectfuture.co.za)

</div>

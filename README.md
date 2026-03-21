<div align="center">

<br />

# Inferra AI

**Interactive intelligence platform mapping AI infrastructure readiness across Africa.**

Compute · Connectivity · Power · Policy — across 30 markets, built for founders and investors.

<br />

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat-square&logo=supabase&logoColor=white)](https://supabase.com)
[![Mapbox](https://img.shields.io/badge/Mapbox-000000?style=flat-square&logo=mapbox)](https://mapbox.com)

<br />

</div>

---

## What it is

Africa is receiving $10B+ in AI infrastructure investment — but founders have almost no visibility into where they can actually deploy. Only one country on the continent has a hyperscaler cloud region.

Inferra AI is the intelligence layer. It maps compute availability, submarine cable connectivity, power reliability, and AI policy signals across 30 African markets so builders can make informed decisions about where to run inference, what the trade-offs are, and what's coming next.

---

## Dashboard

The dashboard has six sections:

| Section | What it shows |
| --- | --- |
| **Overview** | Mapbox satellite globe + searchable country selector + full country detail panel |
| **Map** | Geographic infrastructure view with animated inference route arcs |
| **Markets** | Card grid across all 30 markets — tier badges, founder insights, quick stats |
| **Insights** | Live-computed readiness rankings, dimension leaders, aggregate signals |
| **Compare** | Side-by-side radar chart overlaying 5 readiness dimensions for any two countries |
| **Profile** | Account management — name, organisation, role, password |

Switch between **Founder** and **Policy** modes on Overview and Map.

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
| --- | --- |
| Framework | Next.js 16 (App Router, Turbopack) |
| Frontend | React 19, TypeScript |
| Styling | Tailwind CSS v4, CSS custom properties |
| Animations | GSAP (ScrollTrigger, SplitText), Framer Motion, Lenis |
| Map / Globe | Mapbox GL via `react-map-gl` — satellite globe projection |
| Charts | Custom SVG radar chart (no external dependency) |
| Auth | Supabase Auth — email/password + Google + GitHub OAuth |
| Email | Resend SMTP — branded transactional templates |
| Data | Static JSON, server-rendered via page.tsx |

---

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Fill in the required values (see below)

# Run development server
npm run dev
```

Landing page → http://localhost:3000
Dashboard → http://localhost:3000/dashboard *(requires auth)*

### Environment Variables

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox access token for the satellite globe and map |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx                     # Landing page (server component)
│   ├── login/ & signup/             # Auth pages
│   ├── auth/                        # callback/, forgot-password/, reset-password/, error/
│   ├── dashboard/
│   │   ├── layout.tsx               # Server-side auth gate
│   │   └── page.tsx                 # Loads user + data, renders DashboardClient
├── components/
│   ├── landing/                     # Hero, WhatWeDo, About, FounderNote, Newsroom, Navbar, Footer
│   ├── DashboardClient.tsx          # Main shell — section routing, shared state
│   ├── DashboardSidebar.tsx         # Desktop sidebar + mobile pill nav
│   ├── GlobeView.tsx                # Mapbox satellite globe (Overview)
│   ├── MapView.tsx                  # Mapbox infrastructure map (Map tab)
│   ├── CountryPanel.tsx             # Country detail — vertical key-value layout
│   ├── CountryList.tsx              # Searchable scrollable market list
│   ├── CountryCombobox.tsx          # Compact desktop country selector
│   ├── InsightsDashboard.tsx        # Rankings and dimension leaders
│   ├── CompareClient.tsx            # Side-by-side country comparison
│   ├── RadarChart.tsx               # SVG radar chart (5 dimensions)
│   ├── ProfileSection.tsx           # Account management (in-page section)
│   ├── InferraLogo.tsx              # SVG logo mark component
│   └── ModeToggle.tsx               # Founder / Policy toggle
├── lib/
│   ├── supabase/client.ts           # Browser Supabase client
│   ├── supabase/server.ts           # Server Supabase client (SSR cookies)
│   ├── authErrors.ts                # Auth error sanitization
│   └── passwordStrength.ts          # Password strength scoring utility
├── middleware.ts                    # Route protection — gates /dashboard/*
└── types/index.ts                   # All TypeScript interfaces
public/
└── data/
    ├── countries.json               # 30-country dataset
    └── sources.json                 # Data citations
```

---

## Auth

Full authentication via Supabase:
- Email/password signup with name, organisation, and role metadata
- Google and GitHub OAuth
- Password reset via branded email (Resend SMTP)
- HTTP-only cookie session storage — server-side auth gate on all dashboard routes
- Profile section to update details and change password

---

<div align="center">

Built by **Rajveer Singh Jolly** · [Project Future](https://projectfuture.co.za)

</div>

# Inferra AI

A directional tool for understanding AI infrastructure readiness across Africa.

Inferra AI brings together available data on data centers, submarine cables, power availability, and regulatory frameworks — giving founders, investors, and policymakers a starting point for thinking about where AI deployment might be possible on the continent.

## Features

- **Interactive Dashboard** — explore 7 African markets with infrastructure and policy readiness signals
- **Infrastructure Map** — geographic view of data centers, connectivity, and policy indicators via Mapbox
- **Market Comparison** — side-by-side readiness indicators across countries
- **Dual View Modes** — switch between Infrastructure and Policy lenses

## Tech Stack

- **Framework**: Next.js 16 (App Router, Turbopack)
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, CSS variables
- **Animations**: GSAP (ScrollTrigger, SplitText), Lenis smooth scroll
- **Map**: Mapbox GL via react-map-gl
- **Globe**: cobe (lightweight WebGL globe)

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

Open [http://localhost:3000](http://localhost:3000) to view the landing page.
Navigate to [http://localhost:3000/dashboard](http://localhost:3000/dashboard) for the dashboard.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_MAPBOX_TOKEN` | Mapbox access token for the infrastructure map |

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing page
│   ├── dashboard/          # Dashboard page
│   ├── login/              # Login page
│   └── signup/             # Signup page
├── components/
│   ├── landing/            # Landing page components
│   │   ├── Hero.tsx        # Video hero with clip-path reveal
│   │   ├── WhatWeDo.tsx    # Platform description
│   │   ├── Pillars.tsx     # Three-column feature cards
│   │   ├── Marquee.tsx     # Scrolling text banner
│   │   ├── About.tsx       # About section
│   │   ├── FounderNote.tsx # Founder's statement
│   │   ├── Newsroom.tsx    # Signals / articles
│   │   ├── Navbar.tsx      # Navigation bar
│   │   ├── Footer.tsx      # Footer
│   │   ├── Reveal.tsx      # Scroll animation primitives
│   │   └── SmoothScroll.tsx
│   ├── DashboardClient.tsx # Main dashboard layout
│   ├── DashboardSidebar.tsx
│   ├── MapView.tsx         # Mapbox infrastructure map
│   ├── CountryPanel.tsx    # Country detail panel
│   ├── ModeToggle.tsx      # Infrastructure/Policy toggle
│   └── ReadinessBadge.tsx  # Status badge component
├── types/                  # TypeScript interfaces
├── hooks/                  # Custom React hooks
└── lib/                    # Utilities and config
```

## Data

Country data is stored in `public/data/countries.json` covering 7 markets: South Africa, Nigeria, Kenya, Egypt, Morocco, Ghana, and Rwanda. Data is directional and should not be treated as authoritative.

## Developed By

**Project Future**

Contact: rajveer@projectfuture.co.za

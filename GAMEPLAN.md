# InferraAI — Game Plan & Directions

## Where We Are Now — 16 March 2026 (Session 3)

### ✅ Done
- Landing page — GSAP clip-path hero, scroll-pinned narrative, founder note, newsroom with live links
- Dashboard with **5 fully functional sections**: Overview, Map, Markets, Insights, Compare
- **30 African markets** with fully sourced, audited data (`public/data/countries.json` + `sources.json`)
- Founder Mode / Policy Mode toggle across all dashboard sections
- **Mapbox satellite globe** (globe projection) on Overview — auto-rotates, flies to selected country, viewport-aware centering
- **CountryCombobox** on desktop Overview — compact searchable dropdown above detail panel
- **Animated inference arc routes** on Map tab (Local-Native, Hybrid-Edge, Regional-Tethered)
- **Compare tab** — side-by-side radar chart across 5 dimensions, animated score bars
- **Insights tab** — live-computed from data: rankings, dimension leaders, aggregate stats
- Full mobile responsiveness — floating pill tab bar (iOS 26 glass), hamburger slide-up sheet, capped scrollable country list
- Security headers in `next.config.ts` (CSP, HSTS, X-Frame-Options)
- Login/signup pages — UI complete, video background, glassmorphism card

### 🔶 Still Missing
- **Supabase auth** — login/signup are decorative, not wired
- **Deep-dive country pages** (`/dashboard/country/[slug]`)
- **"Can I Run This Here?"** feature in country panels
- Map tab differentiation beyond inference arcs

**What will push this from great to unforgettable for a presentation:**

---

## Phase 1: Auth & Logged-In Experience (Priority: NOW)

### Architecture

```
/                  → Landing page (public, marketing)
/login             → Login page
/signup            → Signup page
/dashboard         → Logged-in home (protected)
/dashboard/[country] → Deep-dive country view (protected)
```

### Landing vs Dashboard Split

**Landing (public)** stays as-is: hero, globe, features, CTA — this is the marketing site. Remove the interactive map and detailed data from the public page. Replace with a teaser/preview that drives signups.

**Dashboard (authenticated)** gets ALL the rich data:
- Full interactive map with Mapbox
- Country panels with deep metrics
- Founder/Policy mode toggle
- Everything that's currently in ToolSection + CountryPanel

### Auth Implementation

- NextAuth.js (or Auth.js v5) with Google + GitHub + email/password providers
- Middleware-based route protection (`/dashboard/*`)
- Session context wrapping the dashboard layout
- User profile stored in a lightweight DB (Neon Postgres or Supabase)

---

## Phase 2: Make the Dashboard a Real Tool (Priority: HIGH)

This is where the project goes from "landing page with a map" to "actual product people would pay for."

### 2A: Country Deep-Dive Pages (`/dashboard/[country]`)

Each country gets its own dedicated page with:

- **Infrastructure Scorecard** — visual radial/bar chart showing readiness across 6 dimensions (compute, latency, power, data centers, cloud maturity, ops friction)
- **Inference Route Diagram** — animated SVG showing how data flows: local processing vs regional hub vs offshore to Europe. Animated particle paths showing data movement.
- **Timeline View** — when did data centers come online? What's in the pipeline? Show infrastructure growth as a timeline with milestones.
- **Comparison Slider** — "Compare with..." dropdown to see two countries side-by-side on every metric
- **Risk Matrix** — 2x2 grid: infrastructure readiness vs policy friendliness. Plot the country as a dot. Show where it sits relative to others.
- **Export** — PDF report generation for each country (jsPDF or similar)

### 2B: Dashboard Home (`/dashboard`)

- **Live overview map** — same Mapbox map but with richer interactions
- **Leaderboard table** — sortable/filterable table of all 7 markets ranked by any metric
- **Quick comparison cards** — drag any 2 countries to compare them instantly
- **Search / Command palette** — Cmd+K to jump to any country, metric, or view
- **Notifications feed** — "Egypt added 2 new data centers" / "Morocco updated AI policy" (mock data for now, real later)
- **Bookmarks / Watchlist** — save countries to track, pin them to the top of the dashboard

### 2C: Data Visualizations That Impress

This is the #1 differentiator. Replace boring text metrics with:

- **D3.js or Recharts** for:
  - Radar charts (country capability profiles)
  - Sankey diagrams (inference routing flows across continent)
  - Bubble charts (market size vs readiness vs GPU availability)
  - Animated bar races (data center growth over time)
- **Deck.gl or custom WebGL** for:
  - 3D arc connections on the map (data flow routes, animated)
  - Heat map overlay showing latency zones
  - Particle system showing live inference routing (simulated)
- **Scroll-driven animations** for the country deep-dive pages — as you scroll, charts build up, routes animate in, timelines reveal

---

## Phase 3: Features That Make It Feel "Real Product" (Priority: MEDIUM)

### 3A: AI-Powered Insights

- **"Ask InferraAI"** — a chat interface in the dashboard sidebar where users can ask natural language questions about the data: "Which market has the lowest latency to Frankfurt?" "Compare Nigeria and Kenya for inference deployment." Uses Claude API or OpenAI to query the dataset.
- **Smart Recommendations** — "Based on your requirements (low latency, GPU access, flexible data governance), we recommend: South Africa (92% match), Egypt (78% match)..."
- **Weekly Digest** — auto-generated summary of what changed across all markets (mock for now)

### 3B: Collaboration & Sharing

- **Shareable snapshots** — generate a public link to a specific country view or comparison
- **Team workspaces** — invite team members, share notes on countries
- **Annotation system** — add sticky notes to the map, tag specific data points with comments

### 3C: API & Integrations

- **REST API** for programmatic access to the data (`/api/v1/countries`, `/api/v1/countries/[code]`)
- **Webhook notifications** — get pinged when a tracked market's data changes
- **Embed widget** — `<iframe>` embed code to put the map on other sites

---

## Phase 4: Visual Polish That Wins Presentations (Priority: HIGH)

### 4A: Cinematic Landing Page Upgrades

- **Particle system background** — subtle floating particles that react to mouse movement (tsParticles or custom canvas)
- **Scroll-driven narrative** — the landing page tells a story as you scroll: "Africa's AI infrastructure is evolving..." with each scroll section revealing a new visualization or data point. Think Apple product pages.
- **Video hero** — short looping background video or Lottie animation in the hero showing data flowing across Africa
- **Testimonial/use-case section** — "How founders are using InferraAI" with rotating cards
- **Live counter** — "X data points tracked" with a real-time counting animation
- **Before/After slider** — "Deploying AI without InferraAI vs with InferraAI" showing the old way (spreadsheets, guesswork) vs the new way (the dashboard)

### 4B: Dashboard Visual Upgrades

- **Dark mode toggle** — the dashboard should support both light and dark themes
- **Animated transitions** — page transitions between dashboard views using framer-motion `layoutId` and shared element transitions
- **Skeleton loading states** — when data loads, show beautiful shimmer skeletons, not blank space
- **Micro-interactions everywhere** — hover states that reveal additional data, smooth number transitions, progress indicators
- **Custom cursor** — subtle cursor change when hovering over interactive map elements
- **Sound design** (optional) — subtle click/hover sounds for a premium feel

### 4C: Mobile App Feel

- **Bottom navigation bar** on mobile dashboard (not hamburger menu)
- **Pull-to-refresh** gesture on the dashboard
- **Swipe between countries** in the deep-dive view
- **Progressive Web App (PWA)** — add to home screen, offline support for cached data

---

## Phase 5: Data Depth (Priority: MEDIUM-HIGH)

### Expand Beyond 7 Markets

- Add 5-10 more African markets (Tanzania, Ethiopia, Senegal, Ivory Coast, Tunisia, Mauritius, etc.)
- Historical data — show how metrics changed over the last 12 months
- Predictive scoring — "This market is likely to become Viable within 18 months based on current pipeline"

### Real-Time Data Feeds (Stretch)

- Latency monitoring — ping tests from cloud regions to African markets, updated hourly
- News aggregation — scrape AI policy announcements, data center openings, funding rounds
- Submarine cable tracker — map undersea cable landing points and their impact on latency

---

## Recommended Build Order

| Priority | Focus | Status |
|----------|-------|--------|
| ~~Auth + route split~~ | ~~Login works, dashboard protected~~ | 🔴 UI done, backend pending |
| ~~Dashboard home~~ | ~~Overview, Markets, Insights, Compare~~ | ✅ All 5 tabs live |
| ~~Country comparison~~ | ~~Radar charts, side-by-side metrics~~ | ✅ Shipped |
| ~~Data visualizations~~ | ~~Animated arcs on map, radar profiles~~ | ✅ Shipped |
| ~~30-country data~~ | ~~Full sourced dataset~~ | ✅ Shipped |
| **Next: Wire Supabase auth** | Login/signup → real sessions, protect `/dashboard` | 🔴 Urgent before GITEX |
| **Then: Deep Learning Indaba** | Application due March 20 | 🔴 4 days |
| **Then: Country deep-dive pages** | `/dashboard/country/[slug]` with full profile | 🟠 Medium |
| **Polish: "Can I Run This Here?"** | Deployment recommendation tool in country panel | 🟡 Future |

---

## Tech Stack Additions Needed

| Need | Recommended |
|------|-------------|
| Auth | NextAuth.js v5 (Auth.js) |
| Database | Supabase (Postgres + auth + realtime) or Neon |
| Charts | Recharts (simple) + D3.js (complex) |
| 3D Map Arcs | ~~Deck.gl or custom Three.js~~ Mapbox `line-dasharray` animation (No Three.js — thermal issues on MacBook Air) |
| AI Chat | Claude API via Anthropic SDK |
| PDF Export | jsPDF + html2canvas |
| Command Palette | cmdk (by Rauno) |
| Animations | framer-motion (already have) + GSAP for scroll |
| Icons | Lucide React (consistent icon set) |

---

## What Will Make This Stand Out in a Presentation

1. **The globe + map combination** — nobody else has this. The COBE globe on landing transitioning to the full Mapbox dashboard is visually unique.

2. **Animated data flows** — particle/arc animations showing inference routing across the continent. This is the "wow" moment.

3. **AI-powered Q&A** — "Ask InferraAI about any market" in a sleek chat sidebar. Even with simple RAG over the JSON data, this looks incredibly impressive.

4. **Country comparison mode** — side-by-side radar charts with smooth morph animations between countries.

5. **The depth of real data** — this isn't a toy. 7 real markets, real metrics, real policy data. The specificity makes it credible.

6. **Scroll-driven storytelling** on the landing page — Apple-style progressive reveal that educates and impresses simultaneously.

The projects that win presentations aren't necessarily the most complex — they're the ones with **one unforgettable visual moment** backed by **real depth underneath**. For InferraAI, that moment is the animated inference routing visualization. Build that, and everything else is supporting material.

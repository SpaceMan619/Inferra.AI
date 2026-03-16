# InferraAI Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build InferraAI — a visually stunning single-page Next.js app that maps AI inference readiness across African markets, with rich earth-tone aesthetics, liquid glass effects, and smooth animations.

**Architecture:** Single-route Next.js 14 App Router page. Server Component loads CSV data at build time, passes it to client components. Hero section (full viewport, animated Africa silhouette) scrolls into an interactive deck.gl map with a country detail panel. Founder/Policy mode toggle switches the data layer.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, deck.gl, react-map-gl (Mapbox GL), Framer Motion

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`, `postcss.config.mjs`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`, `src/app/globals.css`
- Create: `public/data/countries.json`
- Create: `.env.local` (Mapbox token placeholder)
- Create: `.gitignore`

**Step 1: Initialize Next.js project**

Run from `/Users/pegasus/dev/inferraai`:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias --skip-install
```
If the directory already has files, say yes to proceed.

**Step 2: Install dependencies**

```bash
npm install framer-motion deck.gl @deck.gl/core @deck.gl/layers @deck.gl/react react-map-gl mapbox-gl @types/mapbox-gl
```

**Step 3: Convert CSV data to JSON**

Create `public/data/countries.json` from the original CSV. Structure:

```json
[
  {
    "country": "South Africa",
    "region": "Southern Africa",
    "latitude": -30.5595,
    "longitude": 22.9375,
    "ai_inference_readiness": "Viable",
    "active_data_centers": "15-25",
    "dc_pipeline": "Under construction",
    "ai_compute_availability": "GPU available",
    "cloud_maturity": "Region",
    "connectivity_role": "Continental hub",
    "power_reliability": "Medium (High Cost)",
    "ops_friction": "Low",
    "data_residency_constraint": "No / Sector-specific",
    "primary_inference_route": "Local-Native",
    "est_rtt_to_europe_ms": "~160",
    "founder_insight": "Africa's most reliable location for true local AI inference...",
    "ai_policy_signal": "Strong",
    "ai_data_governance_posture": "Restricted",
    "ai_compute_policy_commitment": "Explicit",
    "cross_border_ai_alignment": "Conditional"
  }
]
```

**Step 4: Set up Tailwind with earth-tone CSS custom properties**

In `src/app/globals.css`, define the design tokens:

```css
@import "tailwindcss";

:root {
  --bg-deep: #0f0b07;
  --bg-surface: #1a1208;
  --bg-elevated: #241c10;
  --primary: #c8843a;
  --primary-light: #daa05d;
  --secondary: #3d6b4f;
  --danger: #c05a2e;
  --warning: #d4a34a;
  --text-primary: #f0e6d3;
  --text-secondary: #a89478;
  --text-muted: #6b5a45;
  --glass-bg: rgba(200, 132, 58, 0.06);
  --glass-border: rgba(200, 132, 58, 0.15);
  --glass-bg-hover: rgba(200, 132, 58, 0.1);
}

body {
  background-color: var(--bg-deep);
  color: var(--text-primary);
  font-family: var(--font-sans);
}
```

**Step 5: Set up layout with fonts**

`src/app/layout.tsx`:
- Import Inter (body) and Playfair Display (headings) from `next/font/google`
- Set metadata: title "InferraAI", description about AI inference readiness
- Apply font CSS variables to `<html>`

**Step 6: Create minimal page.tsx**

`src/app/page.tsx`:
- Server Component that reads `public/data/countries.json` using `fs`
- Renders a placeholder `<main>` with "InferraAI" text
- Passes parsed country data as props to a `<ClientApp />` (to be built)

**Step 7: Verify dev server starts**

```bash
npm run dev
```
Expected: App loads at localhost:3000 with dark background and "InferraAI" text.

**Step 8: Initialize git and commit**

```bash
cd /Users/pegasus/dev/inferraai
git init
git add -A
git commit -m "feat: scaffold InferraAI Next.js project with earth-tone design tokens"
```

---

### Task 2: Hero Section

**Files:**
- Create: `src/components/Hero.tsx`
- Create: `src/components/AfricaSilhouette.tsx`
- Create: `src/components/ScrollIndicator.tsx`
- Modify: `src/app/page.tsx` (add Hero to page)

**Step 1: Create the Africa SVG silhouette component**

`src/components/AfricaSilhouette.tsx`:
- Client component (`"use client"`)
- Renders an SVG of the Africa continent outline (simplified polygon path)
- 7 animated dots positioned at the lat/lng-mapped locations of the 7 countries
- Each dot pulses with CSS `@keyframes` — scale 1 → 1.3 → 1, opacity 0.6 → 1 → 0.6
- Dot colors match readiness: Viable = `var(--secondary)`, Emerging = `var(--warning)`, Early = `var(--danger)`
- Staggered animation delay per dot (0s, 0.3s, 0.6s, etc.)
- SVG is absolutely positioned, centered, ~60% viewport height, opacity 0.15 so it's a subtle background

**Step 2: Create the scroll indicator**

`src/components/ScrollIndicator.tsx`:
- Client component
- Chevron-down icon + "Explore" text
- CSS bounce animation: `translateY(0) → translateY(8px) → translateY(0)` every 2s
- Positioned at bottom of hero

**Step 3: Create the Hero component**

`src/components/Hero.tsx`:
- Client component with Framer Motion
- Full viewport height (`min-h-screen`), flex column, centered content
- Background: `AfricaSilhouette` absolutely positioned behind
- Headline: "Where AI runs on the continent." — Playfair Display, ~4xl/5xl
  - Framer Motion: each word staggers in with `y: 30 → 0, opacity: 0 → 1`, 0.15s delay between
- Subheadline: "InferraAI maps inference readiness across African markets — so you deploy with confidence, not guesswork."
  - Fades in after headline completes, `var(--text-secondary)` color
- `ScrollIndicator` at bottom

**Step 4: Add Hero to page.tsx**

Import and render `<Hero />` as the first section in `<main>`.

**Step 5: Verify**

```bash
npm run dev
```
Expected: Full-viewport hero with animated headline, pulsing Africa map dots in background, bouncing scroll indicator.

**Step 6: Commit**

```bash
git add src/components/Hero.tsx src/components/AfricaSilhouette.tsx src/components/ScrollIndicator.tsx src/app/page.tsx
git commit -m "feat: add animated hero section with Africa silhouette background"
```

---

### Task 3: Stats Bar

**Files:**
- Create: `src/components/StatsBar.tsx`
- Create: `src/hooks/useCountUp.ts`
- Modify: `src/app/page.tsx` (add StatsBar)

**Step 1: Create the count-up animation hook**

`src/hooks/useCountUp.ts`:
- Custom hook: `useCountUp(target: number, duration?: number)`
- Uses `useInView` from Framer Motion to trigger
- Animates from 0 to `target` over `duration` ms (default 1500)
- Returns `{ ref, count }` — ref for the element, count is the animated number
- Uses `requestAnimationFrame` with easing (`easeOutCubic`)

**Step 2: Create StatsBar component**

`src/components/StatsBar.tsx`:
- Client component
- Props: `countries: CountryData[]`
- Computes: total markets (7), viable hubs (2), GPU markets (count where ai_compute_availability contains "GPU"), strong policy signals (count where ai_policy_signal === "Strong")
- Horizontal strip with liquid glass background
- 4 stat items, each with:
  - Animated count (useCountUp)
  - Label below in `var(--text-secondary)`
  - Separator dots between items
- Framer Motion: whole bar fades in on scroll with `whileInView`

**Step 3: Add to page.tsx**

Render `<StatsBar countries={data} />` between Hero and Tool sections.

**Step 4: Verify**

Expected: Glass bar appears on scroll, numbers count up smoothly.

**Step 5: Commit**

```bash
git add src/components/StatsBar.tsx src/hooks/useCountUp.ts src/app/page.tsx
git commit -m "feat: add animated stats bar with count-up effect"
```

---

### Task 4: Mode Toggle

**Files:**
- Create: `src/components/ModeToggle.tsx`
- Create: `src/types/index.ts`

**Step 1: Define shared types**

`src/types/index.ts`:

```typescript
export interface CountryData {
  country: string;
  region: string;
  latitude: number;
  longitude: number;
  ai_inference_readiness: "Viable" | "Emerging" | "Emerging (Early)";
  active_data_centers: string;
  dc_pipeline: string;
  ai_compute_availability: string;
  cloud_maturity: string;
  connectivity_role: string;
  power_reliability: string;
  ops_friction: string;
  data_residency_constraint: string;
  primary_inference_route: string;
  est_rtt_to_europe_ms: string;
  founder_insight: string;
  ai_policy_signal: "Strong" | "Emerging" | "Unclear";
  ai_data_governance_posture: string;
  ai_compute_policy_commitment: string;
  cross_border_ai_alignment: string;
}

export type ViewMode = "founder" | "policy";
```

**Step 2: Create ModeToggle component**

`src/components/ModeToggle.tsx`:
- Client component
- Props: `mode: ViewMode`, `onModeChange: (mode: ViewMode) => void`
- Pill-shaped container with two options: "Founder Mode" / "Policy Mode"
- Active pill has a sliding background indicator using Framer Motion `layoutId="mode-indicator"`
- Active text: `var(--text-primary)`, inactive: `var(--text-muted)`
- Container has glass styling
- Smooth slide animation when switching

**Step 3: Commit**

```bash
git add src/components/ModeToggle.tsx src/types/index.ts
git commit -m "feat: add mode toggle with animated sliding pill indicator"
```

---

### Task 5: Interactive Map

**Files:**
- Create: `src/components/MapView.tsx`
- Create: `src/lib/mapConfig.ts`
- Modify: `.env.local` (add Mapbox token)

**Step 1: Set up map configuration**

`src/lib/mapConfig.ts`:
- Export color maps for readiness tiers and policy signals
- Export radius maps
- Export regional hub coordinates (East, West, Southern, North, EU)
- Export the Mapbox style URL (use a warm/earth-tone style like `mapbox://styles/mapbox/dark-v11` or a custom one)

Color maps:
```typescript
export const FOUNDER_COLORS: Record<string, [number, number, number]> = {
  "Viable": [61, 107, 79],       // --secondary green
  "Emerging": [212, 163, 74],    // --warning amber
  "Emerging (Early)": [192, 90, 46], // --danger terracotta
};

export const POLICY_COLORS: Record<string, [number, number, number]> = {
  "Strong": [200, 132, 58],   // --primary ochre
  "Emerging": [168, 148, 120], // muted
  "Unclear": [107, 90, 69],   // --text-muted
};
```

**Step 2: Create the MapView component**

`src/components/MapView.tsx`:
- Client component (`"use client"`)
- Props: `countries: CountryData[]`, `mode: ViewMode`, `selectedCountry: string`, `onSelectCountry: (name: string) => void`
- Uses `@deck.gl/react` `DeckGL` component with `react-map-gl` `Map` as child
- Initial view state centered on Africa (~lat 5, lng 20, zoom 3.2, pitch 45)
- **ScatterplotLayer**: dots colored by mode (founder → readiness colors, policy → signal colors)
  - `getFillColor` switches based on `mode` prop
  - `getRadius` based on readiness tier
  - `pickable: true`, `onClick` → calls `onSelectCountry`
  - `autoHighlight: true`, highlight color = warm amber glow
- **PathLayer**: inference routing lines (Regional-Tethered → regional hub, Hybrid-Edge → EU hub)
  - Warm amber semi-transparent lines
- **ScatterplotLayer (highlight)**: selected country gets an outer ring
  - Filtered to just the selected country
  - Stroked, no fill, line color = `var(--primary)` amber
- Tooltip on hover: shows country name + readiness/policy status
- Map container has `border-radius: 16px` and `overflow: hidden` for rounded corners

**Step 3: Add Mapbox token to .env.local**

```
NEXT_PUBLIC_MAPBOX_TOKEN=pk.your_token_here
```

Note: The implementer will need to get the actual token from the original project's `.streamlit/secrets.toml` or their Mapbox account.

**Step 4: Verify map renders**

```bash
npm run dev
```
Expected: 3D tilted map of Africa with colored dots, clickable.

**Step 5: Commit**

```bash
git add src/components/MapView.tsx src/lib/mapConfig.ts .env.local
git commit -m "feat: add interactive deck.gl map with mode-aware country dots"
```

---

### Task 6: Country Detail Panel

**Files:**
- Create: `src/components/CountryPanel.tsx`
- Create: `src/components/MetricCard.tsx`
- Create: `src/components/ReadinessBadge.tsx`

**Step 1: Create ReadinessBadge component**

`src/components/ReadinessBadge.tsx`:
- Props: `label: string`, `tier: string`
- Colored pill badge
- Viable → green bg/text, Emerging → amber, Early → terracotta, Strong → ochre, Unclear → muted
- Rounded full, small text, bold

**Step 2: Create MetricCard component**

`src/components/MetricCard.tsx`:
- Props: `label: string`, `value: string`, `subtitle?: string`
- Small liquid glass card
- Label in `var(--text-secondary)`, value in `var(--text-primary)` bold
- Optional subtitle in muted text below
- Hover: slight background brighten (`var(--glass-bg-hover)`)

**Step 3: Create CountryPanel component**

`src/components/CountryPanel.tsx`:
- Client component with Framer Motion
- Props: `country: CountryData | null`, `mode: ViewMode`
- If no country selected, show placeholder text
- Liquid glass container, full height of the tool section
- **Header**: Country name (large, serif) + ReadinessBadge
- **Divider**: thin line in `var(--glass-border)`
- **Metrics Grid**: 2x2 grid of MetricCards
  - Founder mode: Inference Route, Latency, Compute Availability, Readiness
  - Policy mode: Policy Signal, Data Governance, Compute Commitment, Cross-Border Alignment
- **Second Row**: 2x2 grid
  - Both modes: Data Centers, Power Reliability, Cloud Maturity, Ops Friction
- **Insight Block**: Bordered quote block with founder_insight text
  - Left border in `var(--primary)`, italic text, glass background
- **Animations**:
  - Panel content uses `AnimatePresence` + `motion.div` with `key={country.country + mode}`
  - Fade + slight slide on country/mode change

**Step 4: Commit**

```bash
git add src/components/CountryPanel.tsx src/components/MetricCard.tsx src/components/ReadinessBadge.tsx
git commit -m "feat: add country detail panel with liquid glass metric cards"
```

---

### Task 7: Tool Section Assembly

**Files:**
- Create: `src/components/ToolSection.tsx`
- Modify: `src/app/page.tsx` (add ToolSection)

**Step 1: Create ToolSection component**

`src/components/ToolSection.tsx`:
- Client component
- Props: `countries: CountryData[]`
- Manages state: `selectedCountry` (string, default first country), `mode` (ViewMode, default "founder")
- Layout:
  - `ModeToggle` centered above
  - Flex row below: `MapView` (flex-[3]) + `CountryPanel` (flex-[2])
  - Gap between map and panel
  - Minimum height: ~80vh
- Framer Motion: whole section fades in with `whileInView`
- Section has a subtle heading: "Explore the Map" in serif, with a thin divider line

**Step 2: Update page.tsx**

Wire everything together:
```tsx
<main>
  <Hero />
  <StatsBar countries={data} />
  <ToolSection countries={data} />
  <Footer />
</main>
```

**Step 3: Verify full flow**

```bash
npm run dev
```
Expected: Hero → scroll → stats bar (numbers count up) → mode toggle + map + country panel. Click dots on map, panel updates. Toggle mode, colors switch.

**Step 4: Commit**

```bash
git add src/components/ToolSection.tsx src/app/page.tsx
git commit -m "feat: assemble tool section with map, panel, and mode toggle"
```

---

### Task 8: Footer

**Files:**
- Create: `src/components/Footer.tsx`
- Modify: `src/app/page.tsx` (add Footer)

**Step 1: Create Footer component**

`src/components/Footer.tsx`:
- "InferraAI" wordmark in serif font
- Tagline: "Mapping AI inference readiness across Africa."
- Disclaimer: "Data is directional and based on public sources."
- GitHub icon/link (SVG)
- Divider line at top
- Muted text colors, minimal padding
- Subtle glass background on the wordmark area

**Step 2: Add to page, verify, commit**

```bash
git add src/components/Footer.tsx src/app/page.tsx
git commit -m "feat: add minimal footer with wordmark and disclaimer"
```

---

### Task 9: Polish & Responsive Touches

**Files:**
- Modify: `src/app/globals.css` (add utility classes, scrollbar styling)
- Modify: various components (responsive adjustments)

**Step 1: Custom scrollbar**

Dark, thin scrollbar matching the earth tone palette:
```css
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--bg-deep); }
::-webkit-scrollbar-thumb { background: var(--text-muted); border-radius: 3px; }
```

**Step 2: Smooth scroll behavior**

```css
html { scroll-behavior: smooth; }
```

**Step 3: Selection color**

```css
::selection { background: rgba(200, 132, 58, 0.3); color: var(--text-primary); }
```

**Step 4: Add subtle gradient overlays**

- Hero bottom: gradient from transparent → `var(--bg-deep)` to blend into stats bar
- Tool section top: subtle warm glow behind the mode toggle

**Step 5: Basic tablet responsiveness**

- Hero: reduce headline size on `md` breakpoint
- Tool section: stack map and panel vertically on screens < 1024px
- Stats bar: 2x2 grid on mobile instead of 4-across

**Step 6: Verify and commit**

```bash
git add -A
git commit -m "feat: add polish — scrollbar, smooth scroll, selection, gradient overlays, responsive"
```

---

### Task 10: Vercel Deployment Setup

**Files:**
- Modify: `next.config.ts` (if any config needed)
- Create: `vercel.json` (if custom config needed)

**Step 1: Ensure build passes**

```bash
npm run build
```
Expected: No errors. Static export should work since data is bundled at build time.

**Step 2: Set up GitHub repo**

```bash
cd /Users/pegasus/dev/inferraai
gh repo create inferraai --public --source=. --push
```

**Step 3: Connect to Vercel**

The user will connect the GitHub repo to Vercel via their dashboard. Ensure:
- Framework preset: Next.js
- Environment variable: `NEXT_PUBLIC_MAPBOX_TOKEN` set in Vercel project settings

**Step 4: Final commit**

```bash
git add -A
git commit -m "chore: prepare for Vercel deployment"
git push
```

---

## Summary

| Task | Description | Key Components |
|------|-------------|---------------|
| 1 | Project scaffolding | Next.js, Tailwind, design tokens, data JSON |
| 2 | Hero section | AfricaSilhouette, animated headline, scroll indicator |
| 3 | Stats bar | Count-up animation hook, glass strip |
| 4 | Mode toggle | Pill switcher with layoutId animation |
| 5 | Interactive map | deck.gl, ScatterplotLayer, PathLayer |
| 6 | Country detail panel | Glass cards, metric grid, insight block |
| 7 | Tool section assembly | Wire map + panel + toggle together |
| 8 | Footer | Wordmark, disclaimer, GitHub link |
| 9 | Polish | Scrollbar, gradients, responsive |
| 10 | Vercel deployment | Build, GitHub, Vercel setup |

# The Inferra AI Project Bible

### A complete technical study guide for the builder who built it

---

> **How to read this.** This document assumes you have basic coding knowledge but haven't been
> deep in the codebase for a while. Every concept is explained from first principles before
> going technical. Read it top to bottom once, then use the section headers to jump back to
> specific things when you're working. By the end, you should be able to open any file in this
> project and understand exactly what it does and why.

---

## Table of Contents

1. [The Big Picture](#1-the-big-picture)
2. [The Directory — Every File Explained](#2-the-directory)
3. [The Foundation — Next.js, TypeScript, Tailwind](#3-the-foundation)
4. [How Pages Are Born — App Router](#4-how-pages-are-born)
5. [The Data Layer — countries.json and types.ts](#5-the-data-layer)
6. [The Landing Page — Section by Section](#6-the-landing-page)
7. [Animations — GSAP, SplitText, Framer Motion](#7-animations)
8. [The Dashboard — The Brain of the App](#8-the-dashboard)
9. [The Design System — Colors, Typography, Glass](#9-the-design-system)
10. [Mobile — How Responsiveness Works](#10-mobile)
11. [Security — The Headers in next.config.ts](#11-security)
12. [The Auth Pages — Login and Signup](#12-the-auth-pages)
13. [Vocabulary Reference — Terms You'll Encounter](#13-vocabulary-reference)

---

## 1. The Big Picture

### What Inferra AI actually is

Inferra AI is a **data-driven intelligence platform** that answers one question: *where in Africa
can you realistically run AI inference workloads today?*

Inference means running an AI model — asking ChatGPT a question, generating an image, running a
recommendation engine. It requires compute (GPUs), reliable power, fast internet connectivity, and
a regulatory environment that allows it. Most of Africa has some but not all of these. Inferra maps
which markets have which pieces and how close they are to being "ready."

The users are:
- **Founders** building AI products who need to know where their backend can run
- **Investors** deciding which African markets to bet on for AI infrastructure
- **Policymakers** benchmarking their country against peers

### The two surfaces

The app has exactly two main surfaces:

```
localhost:3000        →  Landing page  (marketing, credibility, report gate)
localhost:3000/dashboard  →  Dashboard  (the actual product)
```

Plus two auth pages:
```
localhost:3000/login
localhost:3000/signup
```

### The data flow in one sentence

A JSON file on the server (`public/data/countries.json`) contains all the research data for
16 African markets. The dashboard reads this file and renders it as interactive visualisations.
The landing page is static marketing content.

---

## 2. The Directory

> **Mental model:** Think of `src/` as the workshop. Everything you build lives here.
> `public/` is the shelf where assets (images, videos, data) are stored.

```
inferraai/
├── src/
│   ├── app/                    ← Next.js pages (one folder = one URL)
│   │   ├── layout.tsx          ← The HTML shell that wraps EVERY page
│   │   ├── page.tsx            ← The landing page (localhost:3000)
│   │   ├── globals.css         ← Global styles (fonts, resets, variables)
│   │   ├── dashboard/
│   │   │   └── page.tsx        ← Dashboard page (reads JSON, passes to client)
│   │   ├── login/
│   │   │   └── page.tsx        ← Login page
│   │   └── signup/
│   │       └── page.tsx        ← Signup page
│   │
│   ├── components/
│   │   ├── landing/            ← Components only used on the landing page
│   │   │   ├── Navbar.tsx      ← Fixed top nav + mobile slide-up sheet
│   │   │   ├── Hero.tsx        ← Full-screen video hero + scroll scroller
│   │   │   ├── WhatWeDo.tsx    ← "The integrated platform" section
│   │   │   ├── Pillars.tsx     ← Infrastructure / Intelligence / Policy cards
│   │   │   ├── Marquee.tsx     ← Scrolling text ticker
│   │   │   ├── About.tsx       ← Kigali photo section
│   │   │   ├── FounderNote.tsx ← Founder photo + quote
│   │   │   ├── Newsroom.tsx    ← Article cards
│   │   │   ├── Footer.tsx      ← Site footer
│   │   │   ├── Reveal.tsx      ← Reusable animation wrappers (Inview, TextReveal)
│   │   │   └── SmoothScroll.tsx ← Lenis smooth scroll initialiser
│   │   │
│   │   ├── DashboardClient.tsx ← THE BRAIN — orchestrates the entire dashboard
│   │   ├── DashboardSidebar.tsx ← Left nav (desktop) + floating pill (mobile)
│   │   ├── CountryPanel.tsx    ← Right panel showing selected country details
│   │   ├── CountryList.tsx     ← Searchable scrollable country picker
│   │   ├── InsightsDashboard.tsx ← Insights tab — charts and rankings
│   │   ├── MapView.tsx         ← Mapbox interactive map
│   │   ├── ParticleGlobe.tsx   ← Animated 3D globe (Overview tab)
│   │   ├── ModeToggle.tsx      ← "Infrastructure / Policy" toggle switch
│   │   └── ReadinessBadge.tsx  ← Coloured pill badge (Viable / Emerging / etc)
│   │
│   └── types/
│       └── index.ts            ← TypeScript definitions for all data shapes
│
├── public/
│   ├── data/
│   │   └── countries.json      ← ALL the research data. The heart of the product.
│   ├── hero-bg.mp4             ← Video behind the landing hero
│   ├── auth-bg.mp4             ← Video behind login/signup
│   ├── about-africa.jpg        ← Kigali Convention Centre aerial
│   └── newsroom/               ← Article thumbnail images
│
├── next.config.ts              ← Security headers, Next.js configuration
└── package.json                ← Dependencies list
```

**The most important files to know:**
1. `public/data/countries.json` — the data. Change this and the whole dashboard updates.
2. `src/app/dashboard/page.tsx` — reads the data, passes it down
3. `src/components/DashboardClient.tsx` — renders the data
4. `src/types/index.ts` — the contract that defines what data looks like

---

## 3. The Foundation

### Next.js — what it is and why it matters

Next.js is a **framework built on top of React**. React lets you build UI components. Next.js
adds the infrastructure around them: routing (URLs), server-side rendering, file-based pages,
and a build system.

Think of it like this:
- **React** is the engine
- **Next.js** is the car

The version here is **16 with App Router**. "App Router" is Next.js's newer way of organising
pages. Every folder inside `src/app/` becomes a URL route. A file called `page.tsx` inside that
folder is what renders at that URL.

```
src/app/page.tsx              →  localhost:3000
src/app/dashboard/page.tsx    →  localhost:3000/dashboard
src/app/login/page.tsx        →  localhost:3000/login
```

That's it. The folder structure IS the URL structure.

---

### TypeScript — what the .tsx extension means

You'll notice all files end in `.tsx` not `.js`. TypeScript is JavaScript with types added.

A type is a contract that says: *"this variable will always be a number"* or *"this object will
always have these specific fields."* If you break that contract, TypeScript tells you before the
app even runs.

Example from this codebase:

```typescript
// In types/index.ts — this defines what a CountryData object must look like
interface CountryData {
  country: string;      // must be text
  readiness_score: number;  // must be a number
  scores: CountryScores;    // must have this nested object
}
```

If you tried to access `country.made_up_field` anywhere in the app, TypeScript would immediately
underline it in red and say "that field doesn't exist." This prevents entire categories of bugs.

The `.tsx` extension means "TypeScript file that also contains JSX (HTML-like syntax)."

---

### Tailwind CSS — utility-first styling

Traditional CSS: you write a class name, then write CSS for it somewhere else.

```css
/* traditional */
.my-button { padding: 16px; background-color: blue; border-radius: 9999px; }
```

Tailwind: you put tiny pre-built utility classes directly on the element.

```html
<!-- tailwind -->
<button class="px-4 bg-blue-500 rounded-full">Click me</button>
```

Every class does exactly one thing. `px-4` means `padding-left: 1rem; padding-right: 1rem`.
`rounded-full` means `border-radius: 9999px`. You build styles by combining these.

**Why this matters for this project:** The dashboard uses a lot of inline `style={{}}` props for
precision control (exact hex colors, specific pixel values that Tailwind doesn't have presets for),
and Tailwind classes for layout and spacing. You'll see both patterns throughout the code.

---

### "use client" — the most important two words in the codebase

You'll see `"use client"` at the top of most component files. This needs a bit of explanation.

Next.js runs in two environments:
1. **The server** — Node.js, before the page reaches the browser. No browser APIs. No `window`.
2. **The browser** — After the page loads. Full JavaScript, DOM, events, animations.

By default, Next.js tries to run components on the server for speed. But components that use
animations, state (`useState`), event listeners, or browser APIs *must* run in the browser.

`"use client"` tells Next.js: *"render this component in the browser, not on the server."*

**The rule of thumb:** If a component has animations, click handlers, or `useState` — it needs
`"use client"` at the top. If it's pure display of static data, it can run on the server.

```typescript
// src/app/dashboard/page.tsx — NO "use client"
// This runs on the server. It reads the JSON file and passes the data down.
export default async function DashboardPage() {
  const raw = await readFile(filePath, "utf-8");
  const countries = JSON.parse(raw);
  return <DashboardClient countries={countries} />;
}

// src/components/DashboardClient.tsx — HAS "use client"
// This runs in the browser. It has useState, animations, click handlers.
"use client";
export default function DashboardClient({ countries }) {
  const [activeSection, setActiveSection] = useState("overview");
  ...
}
```

---

## 4. How Pages Are Born

### The HTML shell — layout.tsx

Before any page renders, `src/app/layout.tsx` runs. It's the outermost wrapper for every single
page on the site.

```typescript
// src/app/layout.tsx
import { Manrope } from "next/font/google";

const manrope = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${manrope.variable} font-sans antialiased`}>
        {children}   {/* ← every page's content goes here */}
      </body>
    </html>
  );
}
```

**What this does:**
1. Loads the Manrope font from Google Fonts and registers it as a CSS variable `--font-body`
2. Wraps every page in `<html>` and `<body>` tags
3. `antialiased` makes text look smoother on retina displays
4. `{children}` is a placeholder — whatever page you navigate to, its content gets inserted here

This is why you don't see `<html>` or `<body>` tags in individual page files — `layout.tsx`
handles that once, globally.

---

### The landing page — src/app/page.tsx

The simplest page in the entire codebase:

```typescript
// src/app/page.tsx
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
```

This file does nothing except **assemble** the landing page from its pieces. Each component
handles its own content and layout. The page is just a list of sections stacked vertically.

Think of it like a table of contents that says: *"first show the navbar, then the hero, then
what we do..."* — and each named component goes and does its job.

---

### The dashboard page — src/app/dashboard/page.tsx

```typescript
// src/app/dashboard/page.tsx
import { readFile } from "fs/promises";
import path from "path";
import type { CountryData } from "@/types";
import DashboardClient from "@/components/DashboardClient";

export default async function DashboardPage() {
  const filePath = path.join(process.cwd(), "public", "data", "countries.json");
  const raw = await readFile(filePath, "utf-8");
  const countries: CountryData[] = JSON.parse(raw);

  return <DashboardClient countries={countries} />;
}
```

This is more interesting. Notice `async function` — this component runs on the **server**.

**Step by step:**
1. `path.join(process.cwd(), "public", "data", "countries.json")` — builds the file path.
   `process.cwd()` is "current working directory" — the root of your project.
2. `readFile(filePath, "utf-8")` — reads the JSON file as a text string
3. `JSON.parse(raw)` — converts the text string into a JavaScript array of objects
4. `countries: CountryData[]` — TypeScript checks that each object matches the `CountryData` shape
5. `<DashboardClient countries={countries} />` — passes the data to the client component

This pattern is called **server-side data fetching**. The server reads the file, parses it, and
hands the ready-made data to the browser component. The browser never touches the file system.

**The `@/` prefix** — you'll see this everywhere. It's an alias for `src/`. So `@/types` means
`src/types/index.ts`. It's configured in `tsconfig.json` to avoid ugly relative paths like
`../../../types`.

---

## 5. The Data Layer

### countries.json — the heart of the product

`public/data/countries.json` is a JSON array. Each item is a country object with ~35 fields.
Here is what each field means and where it shows up in the UI:

#### Identity fields
```json
"country": "Kenya"          → displayed as the country name everywhere
"iso2": "KE"                → two-letter country code (used for future flag icons)
"region": "East Africa"     → shown as the small label above the country name in CountryPanel
"latitude": -0.0236         → used to place the marker on the MapView globe
"longitude": 37.9062        → same
```

#### Socioeconomic context
```json
"population_m": 56.4        → population in millions
"gdp_usd_bn": 120.34        → GDP in billions USD
"internet_penetration_pct": 34.98   → % of population online
"mobile_penetration_pct": 120.6     → mobile SIM cards per 100 people (can exceed 100%)
```

#### Infrastructure facts
```json
"dc_count": 19              → number of data centers
"it_load_mw": 40            → total installed capacity in megawatts
"ixp_count": 10             → Internet Exchange Points (where networks connect locally)
"submarine_cables": [...]   → array of cable names landing in this country
"cloud_providers": [...]    → cloud services present (Full Region vs Edge PoP is crucial)
"dc_operators": [...]       → named companies running data centers there
```

#### Policy
```json
"ai_strategy_status": "Adopted"     → has the country published a national AI strategy?
"key_regulations": [...]            → specific laws with year enacted
```

#### Readiness scores (0–100)
```json
"readiness_score": 55       → the overall composite score (shown in CountryList)
"scores": {
  "compute": 35,            → GPU/compute availability
  "connectivity": 66,       → internet speeds, IXPs, cable coverage
  "power": 60,              → grid reliability, renewable mix
  "policy": 65,             → regulatory clarity, AI strategy maturity
  "ecosystem": 62           → startup ecosystem, talent, investment
}
```
These 5 sub-scores drive the Insights tab dimension leaders chart.

#### Dashboard display fields
```json
"ai_inference_readiness": "Emerging"  → tier shown as coloured badge
"active_data_centers": "19"           → displayed in CountryPanel infrastructure section
"ai_compute_availability": "Limited GPU"  → shown in metrics grid
"cloud_maturity": "Edge PoPs only"    → shown in metrics grid
"connectivity_role": "East Africa hub" → subtitle under country name
"power_reliability": "Medium"         → shown in infrastructure metrics
"ops_friction": "Medium"              → operational complexity (Low/Medium/High)
"primary_inference_route": "Regional-Tethered"  → shown in founder mode metrics
"est_rtt_to_europe_ms": "~140"        → latency to Europe, founder mode
"founder_insight": "..."              → the green-bordered context block at bottom of panel
```

#### Policy mode fields
```json
"ai_policy_signal": "Emerging"        → shown in policy mode badge and metrics
"ai_data_governance_posture": "Restricted"  → policy metrics grid
"ai_compute_policy_commitment": "Implied"   → policy metrics grid
"cross_border_ai_alignment": "Supported"    → policy metrics grid
```

---

### types/index.ts — the contract

```typescript
export interface CountryData {
  country: string;
  iso2: string;
  // ... all fields
}

export type ViewMode = "founder" | "policy";
```

`interface` defines the shape of an object. `type` defines a value that can only be one of
specific options. `ViewMode` can only ever be the string `"founder"` or the string `"policy"`.
TypeScript will yell at you if you try to set it to anything else.

**How data flows through the app:**

```
countries.json (disk)
      ↓
dashboard/page.tsx (server reads file)
      ↓
DashboardClient (receives countries array as prop)
      ↓
CountryPanel, CountryList, InsightsDashboard, MapView, ParticleGlobe
(each receives countries or a single country as props)
```

Props are how React components talk to each other. A "prop" (short for property) is data passed
from a parent component to a child component. Like function arguments, but for UI components.

```typescript
// parent passes data down
<CountryPanel country={countryData} mode={mode} />

// child receives it
function CountryPanel({ country, mode }: CountryPanelProps) {
  // can now use country.country, country.readiness_score, etc.
}
```

---

## 6. The Landing Page

### How it's structured

The landing page is **purely presentational** — it has no interactive state beyond the navbar's
scroll behaviour and the mobile menu toggle. Every section is a standalone component that handles
its own content and layout.

### Navbar — src/components/landing/Navbar.tsx

The navbar has two distinct states and two distinct mobile/desktop layouts.

**Scroll state:**
```typescript
const [scrolled, setScrolled] = useState(false);

useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 50);
  window.addEventListener("scroll", onScroll, { passive: true });
}, []);
```

`useState` creates a piece of state — a variable that the component remembers between renders.
`scrolled` starts as `false`. When the user scrolls past 50px, it becomes `true`. When it becomes
`true`, the navbar pill appears with a white/glass background and dark text.

**Two layouts:**
- Desktop (`lg:` and above): logo left, "Dashboard / Log in / Sign up" links right
- Mobile (below `lg:`): logo left, hamburger button right, slide-up glass sheet

**The mobile glass sheet:**
When `mobileOpen` is `true`, a full-screen dark scrim fades in (with blur) and a glass panel
slides up from the bottom. The slide animation is CSS `transform: translateY()`:

```typescript
transform: mobileOpen ? "translateY(0)" : "translateY(calc(100% + 32px))"
```

When `mobileOpen` is `false`, the sheet is pushed down 100% of its own height + 32px — off
screen. When it becomes `true`, it snaps to its natural position with a spring easing curve.

---

### Hero — src/components/landing/Hero.tsx

The most complex component in the entire codebase. It has two parts:

**Part 1: The main hero (video background + headline)**

The background is a `<video>` tag that autoplays silently in a loop. It's wrapped in a div with
`inset-3 rounded-[20px]` which creates the rounded dark frame around the video. Then the entire
frame is wrapped in a clip-path animation that reveals it on page load:

```typescript
gsap.set(canvas, {
  clipPath: "inset(50% 50% 50% 50% round 200px)",  // completely hidden
});
gsap.to(canvas, {
  clipPath: "inset(0% 0% 0% 0% round 0px)",  // fully revealed
  duration: 2,
  ease: "expo.inOut",
});
```

`clip-path: inset()` defines a rectangular mask. `inset(50% 50% 50% 50%)` cuts equally from
all four sides until the rect has zero area — completely hidden. Animating it to `inset(0%)`
reveals the full frame. The `round 200px` value rounds the corners of the clip rectangle, which
creates the pill-like reveal shape.

After the reveal, the headline and subtext animate in using **SplitText** (covered in Section 7).

**Part 2: The scroll scroller**

This is the "01 / 03" section with the three text items that cycle as you scroll.

The whole section is "pinned" using GSAP ScrollTrigger:

```typescript
ScrollTrigger.create({
  trigger: scroller,
  start: "top top",
  end: () => `+=${totalItems * 100}%`,
  scrub: true,
  pin: true,
  ...
});
```

`pin: true` means the section sticks to the top of the viewport while you scroll through
`totalItems * 100%` of scroll distance (3 items × 100% viewport height = 300% of scroll). The
section doesn't move — instead, the scroll progress advances through the three text items.

Each item's characters are animated from opacity 0.4 to 1.0 as scroll progresses, giving the
"characters lighting up as you read" effect.

---

### WhatWeDo — the main descriptive section

Simple section with a large text reveal animation. Nothing complex here — uses the `TextReveal`
component from `Reveal.tsx` which wraps the headline in SplitText line masks.

### Pillars — Infrastructure / Intelligence / Policy

Three full-height cards (`grid-cols-1 lg:grid-cols-3`) with different background colors:
- Infrastructure: lime green `#cef79e`
- Intelligence: dark `#222f30`
- Policy: off-white `#e7e8e1`

Each card animates in when scrolled into view using GSAP (`opacity: 0 → 1, y: 20 → 0`).

### About and FounderNote — image sections

Both sections follow the same pattern:
- A full-bleed image behind a dark gradient scrim (so text is always readable regardless of photo)
- Overlay text positioned with `pb-10` so it never touches the bottom edge
- Attribution tag (location + photographer credit)

The gradient scrim is:
```css
background: linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.35) 55%, transparent 100%)
```

This makes the bottom 100% of the image dark (readable text) while the top fades to transparent
(photo visible).

---

### Reveal.tsx — the animation utility belt

`src/components/landing/Reveal.tsx` exports three reusable animation wrappers:

**`<Inview>`** — fades and slides in from below when scrolled into view:
```typescript
gsap.from(el, { opacity: 0, y: 20 });
// triggers when element hits "top 80%" of viewport
```

**`<TextReveal>`** — the "text rising from below a mask" effect used on all major headings:
```typescript
const split = new SplitText(el, { type: "lines", mask: "lines" });
gsap.from(split.lines, { y: "110%" });
```
SplitText splits the text into lines. Each line gets an `overflow: hidden` wrapper (the "mask").
The text starts at `y: 110%` — fully below the mask, invisible. Animating to `y: 0%` reveals
each line from beneath its own mask. The `paddingBottom: "0.12em"` on the wrapper prevents
descenders (the tails of g, p, y) from being clipped.

**`<InviewGroup>`** — staggered fade-in for multiple children at once.

---

## 7. Animations

> **The golden rule:** GSAP controls landing page animations. Framer Motion controls dashboard
> transitions. They don't overlap.

### GSAP — the animation engine

GSAP (GreenSock Animation Platform) is a professional JavaScript animation library. It's used
here for the landing page because it's extremely precise and handles complex sequencing well.

**Core concepts:**
- `gsap.set(element, { property: value })` — sets a value instantly, no animation
- `gsap.to(element, { property: value, duration: 1 })` — animates from current to target
- `gsap.from(element, { property: value })` — animates from given value to current
- `gsap.timeline()` — chains multiple animations in sequence

**ScrollTrigger** is a GSAP plugin that links animation progress to scroll position:
```typescript
ScrollTrigger.create({
  trigger: el,       // which element triggers it
  start: "top 80%",  // when does the trigger fire? (when element's top hits 80% down viewport)
  onEnter: () => { /* animate */ },
  once: true,        // only fire once, don't reverse
});
```

**SplitText** is a GSAP plugin that breaks text into pieces:
```typescript
new SplitText(el, { type: "chars,lines" })
// Creates individual <span> for each character and each line
// You can then animate chars or lines independently
```

All GSAP plugins must be registered before use:
```typescript
gsap.registerPlugin(ScrollTrigger, SplitText);
```

---

### Framer Motion — dashboard transitions

Framer Motion is a React animation library. Where GSAP works by directly manipulating DOM
elements, Framer Motion works by wrapping React components.

Used in `DashboardClient.tsx` for the tab transitions:

```typescript
import { motion, AnimatePresence } from "framer-motion";

<AnimatePresence mode="wait">
  {activeSection === "overview" && (
    <motion.div
      key="overview"
      initial={{ opacity: 0, y: 10 }}   // starts here
      animate={{ opacity: 1, y: 0 }}    // animates to here
      exit={{ opacity: 0, y: -6 }}      // when removed, animates to here
      transition={{ duration: 0.22 }}
    >
      {/* overview content */}
    </motion.div>
  )}
</AnimatePresence>
```

`AnimatePresence` watches for components entering and leaving the React tree. When you click
a different tab, the current section exits (fades up), then the new section enters (fades in
from below). The `mode="wait"` ensures the exit completes before the entrance starts.

---

### Lenis — smooth scrolling

`SmoothScroll.tsx` is a tiny component that initialises Lenis, a smooth scroll library.
It overrides the browser's default abrupt scroll with a spring-physics momentum scroll.
It also syncs with GSAP ScrollTrigger so animations still trigger at the right scroll positions.

---

## 8. The Dashboard

### DashboardClient — the brain

`src/components/DashboardClient.tsx` is the orchestrator for everything in the dashboard.
It holds all the shared state and passes pieces down to child components.

**State it manages:**
```typescript
const [activeSection, setActiveSection] = useState("overview");
// Which of the 4 tabs is active: "overview" | "map" | "markets" | "insights"

const [selectedCountry, setSelectedCountry] = useState("South Africa");
// Which country is currently selected (shown in CountryPanel)

const [mode, setMode] = useState<ViewMode>("founder");
// Which lens: "founder" (infrastructure data) or "policy" (policy signals)
```

**The layout:**
```
┌────────────────────────────────────────────────────────┐
│  DashboardSidebar (fixed left, 220px desktop)          │
│  ┌──────────────────────────────────────────────────┐  │
│  │  Header (sticky, with title + ModeToggle)        │  │
│  │  ────────────────────────────────────────────    │  │
│  │  Content (AnimatePresence switching between 4    │  │
│  │  sections based on activeSection state)          │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

On mobile:
- Sidebar disappears (`hidden lg:flex`)
- A floating glass pill nav appears at the bottom of the screen
- Main content has `ml-0` (no left offset) and `pb-28` (padding for the pill)

---

### The 4 sections

**Overview** — the most complex section:
```
┌─────────────────────┬──────────┬─────────────────────┐
│   ParticleGlobe     │ Country  │   CountryPanel       │
│   (interactive 3D)  │ List     │   (detail view)      │
│                     │ (search) │                      │
└─────────────────────┴──────────┴─────────────────────┘
   flex-1                200px     360px
   (fills remaining)    (fixed)   (fixed)
```

All three are in a `flex gap-5 flex-col xl:flex-row` container. On desktop (`xl:`), they're
side by side. On mobile, they stack vertically.

Clicking a marker on the globe fires `handleMarkerClick` which calls `setSelectedCountry()`.
Clicking a country in CountryList calls `setSelectedCountry()` directly.
Both cause CountryPanel to re-render with the new country's data.

**Map** — Mapbox interactive map:
- Requires `NEXT_PUBLIC_MAPBOX_TOKEN` environment variable
- Renders markers at each country's `latitude/longitude`
- Marker size varies by readiness tier (Viable = 32px, Emerging = 26px)
- Clicking a marker selects that country
- Without a token, shows a placeholder message

**Markets** — the card grid:
```typescript
className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
```
Every country gets a card. Clicking any card jumps to Overview with that country selected.
Cards animate in with staggered delay (`delay: i * 0.03`).

**Insights** — data aggregated from the full countries array:
- 4 stat cards (total markets, data centers, avg readiness, AI strategies adopted)
- Readiness ranking (all 17 countries sorted by score with horizontal bars)
- Dimension leaders (which country leads each of the 5 score dimensions)

---

### DashboardSidebar — nav + mobile pill

The sidebar has two independent UIs that never appear simultaneously:

**Desktop** (`hidden lg:flex`):
- Fixed left panel, 220px wide
- Logo linking back to landing
- 4 navigation buttons with active state (green left bar, green icon, tinted background)
- "A Project Future initiative" footer

**Mobile floating pill** (`flex lg:hidden`):
The pill is built with a gradient border wrapper technique:

```typescript
// Outer div — the "border" is actually a gradient background visible through 1px padding
<div style={{
  background: "linear-gradient(145deg, rgba(255,255,255,0.72), rgba(255,255,255,0.18), rgba(255,255,255,0.42))",
  borderRadius: "999px",
  padding: "1px",  // just 1px — makes the gradient visible as a border
}}>
  // Inner nav — actual glass surface
  <nav style={{
    background: "linear-gradient(145deg, rgba(255,255,255,0.28), rgba(247,247,245,0.10))",
    backdropFilter: "blur(40px) saturate(200%) brightness(1.08)",
    boxShadow: "inset 0 1.5px 0 rgba(255,255,255,0.95)..."
  }}>
```

The gradient on the outer div simulates light hitting a curved glass edge — bright at the
top-left (where light comes from), dim at the bottom-right. The inner nav is nearly transparent
so the blurred background shows through.

When a tab is active, its label slides open:
```typescript
maxWidth: isActive ? "80px" : "0px",  // from 0 to 80px width
opacity: isActive ? 1 : 0,
```

Both transitions are CSS, not JavaScript — fast and smooth.

---

### CountryPanel — the detail view

Receives two props: `country` (a `CountryData` object) and `mode` ("founder" | "policy").

```typescript
const primaryMetrics = mode === "founder" ? founderMetrics : policyMetrics;
```

`mode` switches which set of 4 metrics appears in the top grid. The infrastructure metrics
below always appear regardless of mode.

The layout:
```
Country name + region label        [Readiness badge]
Connectivity role (subtitle)
────────────────────────────────
[INFRASTRUCTURE / POLICY SIGNALS]
┌──────────┬──────────┐
│ Metric 1 │ Metric 2 │  2-column grid of metric tiles
│ Metric 3 │ Metric 4 │
└──────────┴──────────┘
[INFRASTRUCTURE]
┌──────────┬──────────┐
│ DC Count │ Power    │
│ Cloud    │ Friction │
└──────────┴──────────┘
┌──────────────────────────────────┐
│ ▏ Context (founder_insight text) │  ← green left border
└──────────────────────────────────┘
```

When no country is selected, it shows an empty state with a globe icon.

---

### CountryList — the searchable picker

```typescript
const [query, setQuery] = useState("");

const filtered = query.trim()
  ? countries.filter((c) =>
      c.country.toLowerCase().includes(query.toLowerCase()) ||
      c.region?.toLowerCase().includes(query.toLowerCase())
    )
  : countries;
```

As the user types in the search box, `query` state updates, the `filtered` array recomputes,
and React re-renders only the matching rows. This is a fundamental React pattern:
**derive display state from source state, never maintain two versions of truth.**

The coloured dot on each row is determined by:
```typescript
function tierDot(score: number) {
  if (score >= 60) return "#22c55e";  // green = Viable
  if (score >= 40) return "#d97706";  // amber = Emerging
  return "#dc2626";                   // red = Early
}
```

---

### ModeToggle — the Infrastructure / Policy switch

Simple toggle with two buttons. The active button gets `backgroundColor: "#222f30"` (dark fill).
On mobile the labels switch: "Infrastructure" → "Infra" (using `<span className="sm:hidden">`).

```typescript
<span className="sm:hidden">Infra</span>
<span className="hidden sm:inline">Infrastructure</span>
```

`sm:hidden` means "visible on all screens, hidden on sm and above."
`hidden sm:inline` means "hidden by default, visible on sm and above."
This lets the same button show different text based on screen width.

---

## 9. The Design System

### Colors

The entire design uses **4 colors**:

| Color | Value | Used for |
|-------|-------|---------|
| Background | `#f7f7f5` | Page background, sidebar background |
| Dark | `#222f30` | All text, dark buttons, active states |
| White | `#ffffff` | Cards, panels |
| Accent green | `#22c55e` | Active nav, stat card numbers, tier dots |

The `rgba(34, 47, 48, X)` values throughout the codebase are just `#222f30` with transparency.
`34` is the red channel, `47` is green, `48` is blue. So:
- `rgba(34, 47, 48, 0.08)` = dark color at 8% opacity (very subtle border)
- `rgba(34, 47, 48, 0.5)` = dark color at 50% opacity (muted text)
- `rgba(34, 47, 48, 0.75)` = dark color at 75% opacity (secondary text)

### Typography

One font family: **Manrope** (loaded from Google Fonts in `layout.tsx`).

Weights used:
- `300` (font-light) — subtitles, secondary text
- `400` (font-normal) — body text
- `500` (font-medium) — labels, headings

Font sizes are often written as `text-[13px]` (square bracket notation) for precise pixel values,
or as `clamp()` functions for fluid responsive sizing.

**`clamp()` — the responsive font formula:**
```css
font-size: clamp(1.25rem, calc(1.25rem + 0.038 * (100vw - 27.5rem)), 3.625rem)
```
- `1.25rem` = minimum size (on small screens)
- `3.625rem` = maximum size (on large screens)
- The middle formula interpolates between them based on viewport width
- Result: text that scales smoothly rather than jumping between fixed sizes

### Glassmorphism — the glass effect

The glass effect (used in the pill nav, the landing sheet, the hero overlay) requires:

```css
background: rgba(255, 255, 255, 0.20)  /* translucent, not opaque */
backdrop-filter: blur(40px)             /* blurs everything behind the element */
border: 1px solid rgba(255,255,255,0.55) /* subtle bright edge */
box-shadow: inset 0 1.5px 0 rgba(255,255,255,0.9) /* top specular highlight */
```

The key is `backdrop-filter: blur()`. This blurs the rendered content *behind* the element,
not the element itself. Combined with a semi-transparent background, the result looks like
frosted glass. This is a GPU-accelerated CSS property supported in all modern browsers.

The **specular highlight** (`inset 0 1.5px 0 rgba(255,255,255,0.9)`) simulates light hitting
the top edge of a glass surface — a bright white line along the top inside edge.

### The ReadinessBadge

`src/components/ReadinessBadge.tsx` renders the colored pill (Viable / Emerging / Early Stage).
The color is determined by the label string:
```typescript
const BADGE_CONFIG = {
  "Viable": { bg: "rgba(16,185,129,0.12)", color: "#047857" },
  "Emerging": { bg: "rgba(245,158,11,0.12)", color: "#b45309" },
  // ...
}
```

---

## 10. Mobile

### The responsive strategy

This project uses **Tailwind's breakpoint prefixes** for responsive design:

| Prefix | Screen width | Means |
|--------|-------------|-------|
| (none) | All screens | Default — mobile first |
| `sm:` | ≥ 640px | Small tablets |
| `md:` | ≥ 768px | Tablets |
| `lg:` | ≥ 1024px | Laptops |
| `xl:` | ≥ 1280px | Desktops |

The convention is **mobile-first**: write the default style for mobile, then override for larger
screens with `lg:` prefixes.

Example from the dashboard main content:
```
className="ml-0 lg:ml-[220px]"
```
On mobile: no left margin. On lg+: 220px left margin (to clear the sidebar).

### The floating pill nav

The pill exists in `DashboardSidebar.tsx` but is always absolutely positioned over page content.
`pointer-events-none` on the outer wrapper lets clicks pass through to the content beneath.
`pointer-events-auto` on the actual nav re-enables interaction just for the pill itself.

`env(safe-area-inset-bottom)` in the bottom offset ensures the pill sits above the iPhone home
indicator on notched devices — a critical detail for iOS devices.

### The landing mobile menu

The iOS 26-inspired slide-up sheet uses:
```typescript
transform: mobileOpen ? "translateY(0)" : "translateY(calc(100% + 32px))"
transition: "transform 0.42s cubic-bezier(0.32, 0.72, 0, 1)"
```

`cubic-bezier(0.32, 0.72, 0, 1)` is Apple's spring-like easing — fast at first, then
decelerating. The sheet slides up quickly and settles naturally.

The dark scrim uses `backdropFilter: blur(6px)` to softly blur the landing page content behind
the open menu, making the sheet feel like it's floating above the page.

---

## 11. Security

### next.config.ts — HTTP security headers

Every HTTP response from the server includes a set of security headers. These are set once in
`next.config.ts` and applied to all routes (`source: "/(.*)"` — matches everything).

| Header | What it does |
|--------|-------------|
| `X-Content-Type-Options: nosniff` | Stops browsers guessing file types (prevents MIME confusion attacks) |
| `X-Frame-Options: DENY` | Prevents the site from being loaded in an `<iframe>` (prevents clickjacking) |
| `Referrer-Policy: strict-origin-when-cross-origin` | Limits URL information sent to third parties when navigating away |
| `Permissions-Policy` | Turns off camera, microphone, geolocation, and payment APIs — this app uses none of them |
| `Strict-Transport-Security` | Forces HTTPS for 1 year — browsers won't try HTTP once they see this |
| `Content-Security-Policy` | The most important one. Whitelist of allowed resource origins. |

**The CSP (Content Security Policy) in detail:**

```typescript
"script-src 'self' 'unsafe-inline' 'unsafe-eval'"
// Only run scripts from our own domain
// unsafe-inline and unsafe-eval needed for Next.js dev mode

"connect-src 'self' https://api.mapbox.com https://*.supabase.co"
// Only allow API calls to Mapbox (for map tiles) and Supabase (for future auth)
// Any other domain would be blocked

"media-src 'self'"
// Only load videos from our own server (hero-bg.mp4, auth-bg.mp4)

"frame-ancestors 'none'"
// Belt-and-suspenders alongside X-Frame-Options — double clickjack protection
```

If a malicious script tried to load from an external domain, the CSP would block it and log
a console error.

---

## 12. The Auth Pages

`src/app/login/page.tsx` and `src/app/signup/page.tsx` are currently **UI only** — they look
like authentication pages but don't connect to any backend yet.

Both pages follow the same structure:
- Full-screen video background (`auth-bg.mp4`)
- Glassmorphism card centered over the video
- Form fields with `border-white/20` borders (white at 20% opacity)
- `text-white/80` labels (white at 80% opacity — readable on dark video)

The next major build task is wiring these to **Supabase** (a backend-as-a-service with built-in
authentication). When that's done:
1. The form submit handlers will call `supabase.auth.signIn()`
2. Supabase will handle JWT tokens, sessions, and redirects
3. The CSP `connect-src` in `next.config.ts` is already pre-wired to allow Supabase connections

---

## 13. Vocabulary Reference

A quick glossary for terms you'll encounter frequently:

**Component** — A function that returns UI (JSX). Can receive props, hold state.

**Props** — Data passed from a parent component to a child. Read-only in the child.

**State** — Data that a component owns and can change. Changing state triggers a re-render.

**Re-render** — React rebuilding and updating the UI after state changes. Fast and automatic.

**JSX** — The HTML-looking syntax inside JavaScript/TypeScript files. Compiled to `React.createElement()` calls under the hood.

**Hook** — A function starting with `use` that gives components special powers. `useState` for state, `useEffect` for side effects, `useRef` for DOM access.

**useEffect** — Runs code *after* the component renders. Used for animations, event listeners, timers.

**useRef** — Holds a reference to a DOM element without triggering re-renders. Used to target elements for GSAP animations.

**Async/Await** — Syntax for handling asynchronous operations (file reading, API calls) without blocking the rest of the code.

**Server component** — Runs on the server. Can read files, access databases. Cannot use browser APIs.

**Client component** — Runs in the browser. Can use state, events, animations. Has `"use client"` at top.

**Prop drilling** — Passing props through many levels of nested components. The dashboard avoids this by keeping all state in `DashboardClient` and passing only what each child needs.

**Tailwind class** — A single-purpose CSS utility class. `p-4` = `padding: 1rem`. `flex` = `display: flex`. `rounded-xl` = `border-radius: 0.75rem`.

**clamp()** — CSS function that sets a value between a minimum and maximum, scaling with viewport width.

**backdrop-filter** — CSS property that blurs/saturates content rendered *behind* an element.

**CSS variable** — A custom property defined with `--name: value` that can be reused: `var(--font-body)`.

**RTT** — Round-Trip Time. How long a data packet takes to travel from source to destination and back. Lower is better for latency-sensitive AI inference.

**IXP** — Internet Exchange Point. A physical location where different internet networks connect and exchange traffic locally. More IXPs = lower latency within a region.

---

> **Where to go from here.**
>
> The best way to make this project yours is to start small. Pick one thing you want to change —
> maybe the colour of the active tab in the sidebar, or the text in a country's `founder_insight`.
> Open the relevant file. Find the specific line. Change it. See what happens in the browser.
>
> You already understand the system well enough to know where everything is. The rest is just
> practice until the pattern recognition becomes instinct.

---

*Last updated: March 2026. Built with Next.js 16, TypeScript, Tailwind v4, GSAP, Framer Motion, Mapbox GL.*

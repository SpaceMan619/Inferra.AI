# Inferra AI — Strategy & Roadmap
> Last updated: 15 March 2026 (end of day). This is the working strategy document for taking Inferra AI from prototype to fundable, conference-ready product — and potentially a real company.

---

## The Honest Assessment: Is This a Real Startup?

**Yes.** Here's why, backed by research:

### The Market Is Real and Massive

- Africa's data center market is valued at **~$2B (2025)**, projected to reach **$4.4B by 2031** (14.5% CAGR) — Mordor Intelligence
- McKinsey (Nov 2025) projects capacity growing from **400 MW to 1.5–2.2 GW by 2030**, requiring **$10–20B in fresh investment** and generating **up to $30B in value chain revenue**
- The AfDB launched a **$10B AI initiative** at the Nairobi AI Forum (Feb 2026), projecting **$1T additional GDP by 2035** from AI adoption
- Cassava Technologies + NVIDIA signed a **$700M deal** to build AI factories across 5 African countries — 3,000 GPUs already deployed in SA, 12,000 more coming
- South Africa's AI data center market alone: **$70M (2025) → $572.6M by 2031** (41.95% CAGR)

### No Direct Competitor Exists

We researched every possible competitor. The specific product Inferra AI is building — a unified, interactive dashboard combining infrastructure + connectivity + policy + AI compute readiness for African markets — **does not exist yet**.

| Potential Competitor | What They Do | Why They're NOT Inferra |
|---------------------|-------------|----------------------|
| **BARI** (Baobab Future Group) | AI governance readiness benchmarking | Governance-focused, aimed at governments. Not infrastructure. Not for founders/investors. |
| **Cloudscene** | Global data center directory (4,700+ DCs) | Procurement tool, not Africa-focused, no AI readiness scoring |
| **Oxford Insights AI Readiness Index** | Annual country AI readiness rankings | PDF report, not live dashboard. Global, not Africa-deep. |
| **UNESCO RAM** | AI readiness assessments | Consulting engagement, not a product. Government-facing. |
| **TeleGeography** | Submarine cable maps + telecom research | Connectivity only. No compute, no policy, no AI focus. |
| **PeeringDB** | Network/IXP database | Raw data, no analysis, no dashboard, no readiness scoring |

**BARI is the closest** — but they measure governance readiness for institutions. We measure infrastructure readiness for builders. These are complementary, not competitive. A partnership with BARI could be powerful: "BARI + Inferra = the complete picture."

### The Timing Is Perfect

- **2Africa submarine cable** completed Nov 2025 — more capacity than ALL previous Africa cables combined (180 Tbit/s, 21 landings in 16 countries)
- **NVIDIA investing directly** in African AI compute for the first time
- **8+ African countries** have adopted national AI strategies, with 5+ more drafting
- **AU Continental AI Strategy** unanimously endorsed by African ICT Ministers (June 2024)
- **Smart Africa Alliance** (42 member states) established inaugural Africa AI Council
- **159 AI startups** across Africa have raised **$803.2M total**
- African startup funding rebounding: **$1.64B in 2025** (+50% YoY), **$575M in Jan–Feb 2026 alone** (+26.5% vs 2025)

---

## Where We Stand Today — 15 March 2026

### ✅ Shipped (This Sprint)

**Product:**
- Polished landing page — GSAP clip-path hero animation, scroll-pinned narrative, TextReveal animations, founder's note with Kigali Convention Centre image (real attribution), Newsroom with live article links
- Dashboard with 4 fully functional sections: Overview, Map (Mapbox), Markets, Insights
- **17 African markets** in the data layer, all with quantified scores across 5 dimensions (compute, connectivity, power, policy, ecosystem) plus full structured fields
- **Insights tab** — live-computed from data: key stats, readiness ranking with tier bars, dimension leaders per category. No hardcoded values.
- **Overview redesign** — 3-col layout (globe + searchable CountryList + detail panel), no more pill wall. Globe shows selected country overlay.
- **Markets tab** — staggered card entrance animations, tier colour badges
- **AnimatePresence** section transitions across all dashboard tabs
- **Dashboard sidebar** — green accent system (`#22c55e`) on active nav item, left bar indicator, icon tint, Insights stat card numbers + borders
- Login + signup pages — video background, glassmorphism card, readable labels (white/80), proper generic placeholders
- Security headers in `next.config.ts` — CSP, X-Frame-Options, HSTS, Referrer-Policy, Permissions-Policy
- All changes pushed to GitHub (`main`)

**Data layer:**
- 17 markets: South Africa, Nigeria, Kenya, Egypt, Morocco, Rwanda, Ghana, Ethiopia, Tanzania, Senegal, Ivory Coast, Tunisia, Uganda, Zambia, Cameroon, Angola + more
- All with: readiness_score (0-100), scores{compute, connectivity, power, policy, ecosystem}, dc_count, it_load_mw, ixp_count, submarine_cables[], cloud_providers[], dc_operators[], ai_strategy_status, key_regulations[], founder_insight, est_rtt_to_europe_ms, primary_inference_route, and all legacy display fields

### 🔶 Remaining — Not Built Yet

| Feature | Priority | Notes |
|---------|----------|-------|
| **Supabase auth** | High | UI is done, backend not wired. Login/signup are currently decorative. |
| **Country comparison page** (`/dashboard/compare`) | High | The killer feature for investors and researchers. |
| **Mobile responsiveness** | High | Entire app needs mobile audit — dashboard sidebar, overview layout, landing hero. Must be done before any public share. |
| **Animated inference routes** | Medium | Mapbox line layers showing Local-Native / Hybrid-Edge / Regional-Tethered routing arcs |
| **Q1 2026 report** | Medium | "State of AI Infrastructure in Africa" — free PDF gated by email. Big lead gen play. |
| **Deep-dive country pages** | Low | `/dashboard/country/south-africa` with full profile, trend history |
| **Real-time monitoring** | Future | Latency pings, uptime tracking — turns it from research tool to operational dashboard |

### The Gap in One Sentence
We have a credible, data-rich, well-designed product. The next phase turns it from a polished prototype into something users can **depend on** — starting with auth (so users can save preferences) and the comparison feature (so the data becomes actionable).

---

## The Infrastructure Reality (What We're Mapping)

### Hyperscaler Cloud Regions in Africa

| Provider | Location | Launched |
|----------|----------|----------|
| AWS | Cape Town (3 AZs) | April 2020 |
| Azure | Johannesburg | 2019 |
| Google Cloud | Johannesburg (3 AZs) | January 2024 |
| Oracle OCI | Johannesburg | January 2022 |
| Huawei Cloud | South Africa (2 AZs), Egypt (3 AZs), Nigeria (1 AZ) | 2025 |

**Critical insight:** Only South Africa has cloud regions from AWS, Azure, Google Cloud, and Oracle. No other African country has a hyperscaler cloud region. This is THE core "inference readiness gap" that Inferra visualizes.

### Data Center Capacity (Our Top 5 Markets)

| Country | # Data Centers | IT Load | Key Operators |
|---------|---------------|---------|---------------|
| South Africa | 56 | ~320 MW | Teraco (200 MW), ADC (120 MW), NTT, Equinix, Vantage |
| Nigeria | 17 | ~137 MW | Rack Centre, Equinix/MainOne, Galaxy Backbone |
| Kenya | 19 | ~40 MW | iXAfrica, ADC, Safaricom, Raxio Kenya |
| Egypt | Growing | ~60 MW | Telecom Egypt, Huawei Cloud |
| Morocco | Growing | ~30 MW | Emerging North Africa hub |

South Africa, Kenya, and Nigeria host **41% of Africa's DC infrastructure**.

### Submarine Cables

77 cable systems connected to Africa. The big ones:

| Cable | Capacity | Status | African Landings |
|-------|----------|--------|-----------------|
| **2Africa** (Meta) | 180 Tbit/s | Completed Nov 2025 | 21 landings, 16 countries |
| **Equiano** (Google) | 144 Tbit/s | Operational Sep 2022 | Togo, Nigeria, Namibia, SA |
| **PEACE** | 16 Tbit/s/pair | Operational Dec 2022 | Kenya, Egypt, Djibouti |

---

## Next Sprint — What to Build Now

### Priority 1: Mobile Responsiveness (Before Any Public Share)

Before sharing the URL with anyone — investor, journalist, conference — it must work on phone. Right now the dashboard sidebar and 3-col Overview will break on mobile.

**What needs doing:**
- Sidebar → collapsible bottom nav or hamburger on mobile
- Overview 3-col → stack to single column with bottom sheet for country list
- Landing hero → verify text scales and animation plays correctly on small viewports
- Auth pages → already mostly fine (max-width card pattern)

**Why first:** Every time you share a link, it gets opened on a phone. A broken mobile experience kills first impressions.

### Priority 2: Wire Up Supabase Auth

The login and signup forms are complete UI. Connecting Supabase takes ~2-3 hours:

1. Create Supabase project → get `NEXT_PUBLIC_SUPABASE_URL` + `NEXT_PUBLIC_SUPABASE_ANON_KEY`
2. Install `@supabase/supabase-js` + `@supabase/ssr`
3. Add auth actions to login/signup forms
4. Protect `/dashboard` with middleware redirect
5. Add signout button to dashboard sidebar

Once auth is live, the **role field on signup** becomes strategic gold — you'll know immediately whether your users are founders, investors, or policymakers.

**Route protection target:**
```
/dashboard          → Protected (redirect to /login if not authed)
/login + /signup    → Redirect to /dashboard if already authed
```

### Priority 3: Country Comparison Page (`/dashboard/compare`)

This is the killer feature for conference demos and investor pitches. The idea:

- Select 2-3 countries from a clean picker
- Side-by-side radar chart overlaying all 5 dimension scores
- Metric table with green (leader) / amber (second) / red (lagging) cell highlights
- "Why this matters" blurb auto-generated from the data

This feature alone justifies the product. "Which is better for my inference workload — Kenya or Nigeria?" is a question every African AI founder asks. We can answer it visually in 10 seconds.

### Priority 4: Animated Inference Routes (Map Tab)

Highest-impact visual for demos. Three arc types on the Mapbox map:
- 🟢 **Local-Native** (South Africa): short loop arc within the country
- 🟡 **Hybrid-Edge** (Nigeria → Frankfurt): animated dashed arc across the Mediterranean
- 🔴 **Regional-Tethered** (Ethiopia → Djibouti → elsewhere): multi-hop arc showing dependency

Tech: Mapbox `line-dasharray` animation. No Three.js (thermal issues on MacBook Air M-series).

### Priority 5: Q1 2026 Report

"State of AI Infrastructure in Africa — Q1 2026" — a free, well-designed PDF that:
- Summarises the 17-market dataset with charts
- Highlights the inference routing map
- Calls out the 3 markets to watch in 2026
- Is gated by email signup → instant waitlist/lead capture

This alone could generate 200-500 qualified leads. **Give this task to Pegasus** — it's pure research and writing, no code needed.

---

## Conference & Opportunity Calendar

| Event | Date | Location | Deadline / Action |
|-------|------|----------|-------------------|
| **GITEX Africa** | April 7-9, 2026 | Marrakech | Check startup showcase slots — this is weeks away |
| **Deep Learning Indaba 2026** | Aug 2026 | Nigeria | Applications close March 20 — apply immediately |
| **AI Everything Kenya** | May 19-21, 2026 | Nairobi | AI-focused, East Africa audience |
| **Africa Tech Summit** | May 29, 2026 | London | International investor exposure |
| **AI Expo Africa** | Oct 28-29, 2026 | Johannesburg | Africa's largest enterprise AI trade show |
| **AfricArena** | Nov 26-27, 2026 | Cape Town | Premier startup showcase |

**Minimum viable demo for GITEX (April 7):** Mobile-responsive, auth working, comparison page live. That's 3 weeks. Tight but doable if the next sprint focuses.

---

## Monetization Path

### Phase 1: Free (Now → 6 months)
Everything free. Goal: **1,000 signups, 50 weekly active users**. Collect emails via the Q1 report gating and auth signup.

### Phase 2: Freemium (6-12 months)

| Tier | Price | What |
|------|-------|------|
| **Free** | $0 | Dashboard, 17 markets, basic comparison |
| **Pro** | $49/mo | PDF exports, API access (1,000 calls/mo), email alerts on market changes |
| **Enterprise** | Custom ($500+/mo) | Custom reports, team workspace, white-label embeds, advisory calls |

### Phase 3: Revenue Diversification (12+ months)

| Revenue Stream | Potential | How |
|----------------|-----------|-----|
| **Sponsored reports** | $5K-20K per report | "2026 Nigeria AI Infrastructure Report — presented by AWS" |
| **API licensing** | $1K-10K/mo per client | Cloud providers, VCs, consulting firms |
| **Advisory/consulting** | $2K-10K per engagement | Market entry strategy for companies entering Africa |
| **Embedded analytics** | $500-2K/mo per embed | News sites, investment platforms embed the map |

---

## What Makes This Fundable

### The Story Investors Want to Hear

1. **Founder-market fit** — "I'm a young African entrepreneur who personally felt this gap."
2. **Timing** — "$10B is being invested in African AI infrastructure right now. The infrastructure is being built in real time — and nobody is mapping it."
3. **No competition** — "We are the only platform unifying infrastructure, connectivity, policy, and compute readiness in a single interactive dashboard for African AI markets."
4. **Traction** — Build this: X signups, Y weekly active users, featured at Z conference.
5. **Moat** — "Our data layer deepens every quarter. First-mover advantage in a niche about to explode."
6. **Expansion** — "AI infrastructure today. Any sector that needs to understand Africa's digital backbone tomorrow."

### The 30-Second Pitch

> "Africa is receiving $10 billion in AI infrastructure investment, but founders have no visibility into where they can actually deploy. Only one country has a hyperscaler cloud region. Inferra AI is the intelligence layer — we map compute, connectivity, power, and policy readiness across 17 African markets so founders, investors, and governments can make informed deployment decisions. Think Bloomberg Terminal for African AI infrastructure. We're the only platform doing this, and we're launching at a moment when the continent's infrastructure is being built in real time."

---

## Partnership Opportunities

| Partner Type | Who | Why | Approach |
|-------------|-----|-----|----------|
| **BARI** (Baobab Future Group) | Governance readiness platform | Complementary — they do policy, we do infra. Joint offering = complete picture. | Reach out for co-marketing, data sharing |
| **Smart Africa Alliance** | 42-member state body | Continental reach, policy data, credibility | Apply to their programs, offer to power their dashboards |
| **Cassava Technologies** | NVIDIA partner, ADC operator | They're building the infrastructure we're mapping | Offer to be their market intelligence layer |
| **AfDB / AI Hub** | $10B initiative | They need dashboards to track investment impact | Propose Inferra as their monitoring tool |
| **TeleGeography** | Submarine cable data | Their data is open, partnership could be formal | Embed their cable data, credit them, co-brand |

---

## Risk & Honest Challenges

1. **Data staleness** — Infrastructure changes fast. Need a disciplined quarterly refresh cadence. Eventually: automated monitoring.
2. **"Nice to have" problem** — Value is in aggregation and live comparison. Single data points aren't enough. The comparison feature is what converts "interesting" to "essential."
3. **Solo founder risk** — Investors want teams. A technical or data co-founder would materially de-risk the pitch.
4. **Mobile gap** — Currently desktop-only. Must fix before any public share.
5. **Funding environment** — African VC is recovering but still cautious. $250K seed raise is realistic; $2M is harder without revenue traction.

### What Would Make This 10x

1. **Real-time latency monitoring** — Hourly ping tests from cloud regions to African markets. Turns research tool into operational dashboard.
2. **Historical data** — Show metric changes over time. "Nigeria went from 10 to 17 data centers in 18 months."
3. **AI-powered Q&A** — Chat interface over the dataset using Claude API. "Which market has lowest latency to Frankfurt and allows cross-border data?"
4. **Predictive scoring** — "Based on current pipeline, Ghana is likely to become Viable within 12 months."
5. **Community contributions** — Wikipedia model. Users submit corrections, flag policy changes, add data points.

---

## Appendix: Key Sources

### Market Intelligence
- [McKinsey — Building Data Centers for Africa's Unique Market Dynamics (Nov 2025)](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/building-data-centers-for-africas-unique-market-dynamics)
- [AfDB — AI 10 Billion Initiative](https://www.afdb.org/en/news-and-events/press-releases/african-development-bank-undp-and-partners-launch-ai-10-billion-initiative-during-2026-nairobi-ai-forum-91104)
- [Mordor Intelligence — Africa Data Center Market](https://www.mordorintelligence.com/industry-reports/africa-data-center-market)
- [Disrupt Africa — 2025 Funding Report](https://disruptafrica.com/2026/02/03/african-tech-startup-funding-leaps-by-almost-50-as-sector-begins-to-recover-from-global-funding-winter/)

### Infrastructure
- [Cassava/NVIDIA $700M AI Factory Partnership](https://www.intelligentcio.com/africa/2025/11/27/nvidia-and-cassava-technologies-launch-700m-ai-data-centre-rollout-across-africa/)
- [2Africa Submarine Cable Completion](https://www.connectingafrica.com/connectivity/meta-backed-2africa-subsea-cable-completed)
- [Submarine Cable Map](https://www.submarinecablemap.com/region/africa)

### Policy
- [AI Policy Lab Africa — National Strategies](https://www.aipolicy.africa/national-strategies)
- [AU Continental AI Strategy](https://au.int/en/pressreleases/20240617/african-ministers-adopt-landmark-continental-artificial-intelligence-strategy)

### Conferences & Programs
- [Deep Learning Indaba 2026](https://deeplearningindaba.com/2026/)
- [GITEX Africa 2026](https://gitexafrica.com)
- [AfricArena](https://www.africarena.com/)

---

*Full infrastructure research in `docs/AFRICA_AI_INFRASTRUCTURE_RESEARCH.md`. This doc is updated at the end of each major work session.*

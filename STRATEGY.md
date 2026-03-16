# Inferra AI — Strategy, Startup Potential & Roadmap

> Written 15 March 2026. This is the working strategy document for taking Inferra AI from a well-designed prototype to a fundable, conference-ready product — and potentially a real company.

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

### The Audience Exists

1. **AI founders** (159+ funded AI startups, hundreds more unfunded) making deployment decisions daily
2. **VCs** actively shifting toward infrastructure-backed startups — infra overtaking fintech in deal volume
3. **Governments** building national AI strategies and needing benchmarking tools
4. **Hyperscalers & DC operators** expanding into Africa and needing market intelligence
5. **Development banks & multilaterals** (AfDB, UNDP, WEF) investing billions and needing dashboards to track progress

---

## Where We Stand Today

**Built & functional:**
- Polished landing page (GSAP animations, video hero, scroll narrative, founder's note, real newsroom)
- Interactive dashboard with Mapbox map, 4 sections, Infrastructure/Policy mode toggle
- 7 African markets with 22 data fields each
- Country selection panels with detailed metrics
- Login/signup page UI (not wired to auth)
- Cohesive design system matching top-tier startup sites

**What's placeholder:**
- Auth is UI-only (no backend)
- "Insights" section says "Coming soon"
- Overview globe is a placeholder
- No country deep-dive pages
- No data visualizations beyond map markers
- No API, no database, no user persistence
- Data is descriptive text, not quantified scores

**The gap:** We have a beautiful, credible shell. The next phase turns it into something people can *use* and *depend on*.

---

## The Infrastructure Reality (What We're Mapping)

This is the landscape Inferra AI needs to make legible:

### Hyperscaler Cloud Regions in Africa

| Provider | Location | Launched |
|----------|----------|----------|
| AWS | Cape Town (3 AZs) | April 2020 |
| Azure | Johannesburg | 2019 |
| Google Cloud | Johannesburg (3 AZs) | January 2024 |
| Oracle OCI | Johannesburg | January 2022 |
| Huawei Cloud | South Africa (2 AZs), Egypt (3 AZs), Nigeria (1 AZ) | 2025 |

**Critical insight:** Only South Africa has cloud regions from AWS, Azure, Google Cloud, and Oracle. No other African country has a hyperscaler cloud region. This is THE core "inference readiness gap" that Inferra visualizes.

### Data Center Capacity

| Country | # Data Centers | IT Load | Key Operators |
|---------|---------------|---------|---------------|
| South Africa | 56 | ~320 MW | Teraco (200 MW), ADC (120 MW), NTT, Equinix, Vantage |
| Nigeria | 17 | ~137 MW | Rack Centre, Equinix/MainOne, Galaxy Backbone, OADC |
| Kenya | 19 | ~40 MW | iXAfrica, ADC, Safaricom |
| Egypt | Growing | TBD | Telecom Egypt, Huawei Cloud |
| Morocco | Growing | TBD | Emerging hub |

South Africa, Kenya, and Nigeria host **41% of Africa's DC infrastructure**. Add Egypt and it's 46%.

### Submarine Cables

77 cable systems connected to Africa. The big ones:

| Cable | Capacity | Status | African Landings |
|-------|----------|--------|-----------------|
| **2Africa** (Meta) | 180 Tbit/s | Completed Nov 2025 | 21 landings, 16 countries |
| **Equiano** (Google) | 144 Tbit/s | Operational Sep 2022 | Togo, Nigeria, Namibia, SA |
| **PEACE** | 16 Tbit/s/pair | Operational Dec 2022 | Kenya, Egypt, Djibouti |

### Internet Exchange Points

63 operational IXPs in 38 African countries (up from 36 in 26 countries in 2016). Many countries still route local traffic internationally — a key latency and cost issue Inferra can quantify.

---

## Where the Data Comes From

This is critical for credibility. All of these sources are free and accessible:

### Infrastructure Data (Free)

| Source | URL | What You Get |
|--------|-----|-------------|
| **Cloudscene** | cloudscene.com | 4,700+ data centers, operator details, regional rankings |
| **Data Center Map** | datacentermap.com | Global DC directory with African listings |
| **PeeringDB** | peeringdb.com | Network interconnection, IXP details, facility info |
| **Submarine Cable Map** | submarinecablemap.com | All submarine cables + landing points (open data by TeleGeography) |
| **Internet Exchange Map** | internetexchangemap.com | All IXPs globally |
| **af-ix.org** | af-ix.org/ixps-list | Active African IXPs by country |
| **Africa DC Association** | africadca.org | Member operator list |

### Policy & Readiness Data (Free)

| Source | URL | What You Get |
|--------|-----|-------------|
| **AI Policy Lab Africa** | aipolicy.africa/national-strategies | Tracks national AI strategies across Africa |
| **African Union** | au.int | Continental AI Strategy, Digital Transformation Strategy |
| **Smart Africa Alliance** | smartafrica.org | Africa AI Council updates, policy frameworks |
| **Oxford Insights** | oxfordinsights.com | Annual AI readiness scores by country |
| **Network Readiness Index** | networkreadinessindex.org | Country-level digital readiness rankings |
| **UNESCO RAM** | unesco.org | AI readiness assessment reports |

### Market Intelligence

| Source | What You Get |
|--------|-------------|
| **McKinsey** (Nov 2025) | Africa DC dynamics, capacity projections, power analysis — the gold standard |
| **Mordor Intelligence** | Africa DC market size + forecasts |
| **Disrupt Africa** | Annual African tech startup funding reports |
| **TechCabal Insights** | Funding data, sector analysis |
| **Africa Hyperscalers News** | Hyperscaler activity tracking (africa.hyperscalers.news) |

### How to Operationalize Data Collection

1. **Manual research sprint** — spend 2-3 days pulling numbers from Cloudscene, PeeringDB, submarinecablemap.com for each of our 12 target markets. This is the foundation.
2. **Cite everything** — add a `data_sources` array to each country in the JSON. Credibility comes from showing your work.
3. **Quarterly refresh cadence** — set a calendar reminder to update numbers every 3 months. This is what turns a static dataset into a living product.
4. **Community contributions** — once live, add a "Suggest a correction" button on each country page. Let the ecosystem self-correct.

---

## Phase 1: Data Enrichment (This Week)

Before building more features, the data needs to be richer and quantified.

### 1A: Add Quantified Scores

For each country, compute composite scores (0–100) across 5 dimensions:

| Dimension | What It Measures | Data Sources |
|-----------|-----------------|-------------|
| **Compute** | GPU availability, DC count, cloud maturity | Cloudscene, hyperscaler docs, NVIDIA/Cassava updates |
| **Connectivity** | Submarine cables, IXPs, latency to EU/regional hubs | submarinecablemap.com, PeeringDB, af-ix.org |
| **Power** | Reliability, cost, renewable mix | McKinsey report, World Bank data |
| **Policy** | AI strategy maturity, data governance, cross-border alignment | AI Policy Lab Africa, national strategy docs |
| **Ecosystem** | AI startups, tech talent, VC activity | Disrupt Africa, StartupList Africa |

These scores enable radar charts, sorting, filtering, and the comparison features that make the dashboard a tool, not just a map.

### 1B: Add Structured Data Fields

| New Field | Type | Example |
|-----------|------|---------|
| `population_m` | number | 223 |
| `gdp_usd_bn` | number | 477 |
| `internet_penetration_pct` | number | 55.4 |
| `submarine_cables` | string[] | ["2Africa", "MainOne", "ACE"] |
| `cloud_providers` | string[] | ["AWS (Cape Town)", "Azure (JHB)", "Google Cloud (JHB)"] |
| `dc_operators` | string[] | ["Teraco", "ADC", "NTT", "Equinix"] |
| `dc_count` | number | 56 |
| `it_load_mw` | number | 320 |
| `ixp_count` | number | 7 |
| `ai_strategy_status` | string | "Adopted" / "Drafting" / "None" |
| `key_regulations` | string[] | ["POPIA", "National AI Strategy 2025-2030"] |
| `readiness_score` | number | 78 |
| `scores` | object | { compute: 82, connectivity: 75, power: 55, policy: 80, ecosystem: 70 } |
| `data_sources` | string[] | ["Cloudscene (Mar 2026)", "McKinsey (Nov 2025)"] |

### 1C: Expand to 12 Markets

Add 5 more countries:

| Country | Region | Why |
|---------|--------|-----|
| **Ethiopia** | East Africa | 126M population, Safaricom expansion, Raxio DC |
| **Tanzania** | East Africa | Google Equiano cable landing, growing hub |
| **Senegal** | West Africa | Francophone gateway, 2Africa landing, Smart Africa member |
| **Ivory Coast** | West Africa | Largest Francophone economy, Equinix/MainOne DC |
| **Tunisia** | North Africa | EU-adjacent (~15ms latency), strong engineering talent |

---

## Phase 2: Auth & Signup Flow

### Use Supabase

- Built-in email/password + OAuth (Google, GitHub)
- Postgres database for user data, bookmarks, watchlists
- Row Level Security for future team features
- Free tier: 50K monthly active users
- 5 minutes to set up, well-documented with Next.js

### Redesign Login/Signup

Current dark glassmorphic design doesn't match the landing aesthetic. Switch to:
- Light background (`#f7f7f5`) with clean card, subtle border
- Google + GitHub OAuth prominent at top
- Signup captures: Name, Email, Organization, Role (founder/investor/policy/other)
- The **role** field is strategic gold — it tells you who your users are before you even talk to them

### Route Protection

```
/                    → Public (landing, marketing)
/login               → Public (redirect if authenticated)
/signup              → Public (redirect if authenticated)
/dashboard           → Protected (redirect to login if not authenticated)
/dashboard/*         → Protected
```

---

## Phase 3: Dashboard 2.0

### 3A: Country Comparison (`/dashboard/compare`)

The killer feature. Users pick 2-3 countries, see them side by side:
- Radar chart overlaying all selected countries across 5 dimensions
- Metric-by-metric table with cells highlighted green (leader) or amber (trailer)
- "Export comparison" as PDF or shareable link

### 3B: Overview Revamp

Replace the placeholder globe with:
- **Continent stats bar**: "56+ data centers tracked · 77 submarine cables · 12 markets scored"
- **Quick-rank cards**: "Highest compute readiness: South Africa (82/100)", "Fastest growing: Nigeria", "Best policy environment: Rwanda"
- **Signals timeline**: compact feed of recent infrastructure events

### 3C: Insights Section (Data-Driven)

Replace "Coming soon" with programmatically generated insights:
- "Only 1 of 12 markets has hyperscaler cloud regions from all 4 major providers"
- "North Africa has 4x lower latency to Europe than East Africa"
- "3 markets rely entirely on offshore inference routing"
- Pull these from the data itself — they update as the data updates

### 3D: Animated Inference Routes

The single highest-impact visual for demos and conferences. On the Mapbox map:
- **Local-Native** (South Africa): Green arc loops within the country
- **Hybrid-Edge** (Nigeria → Frankfurt): Amber animated arc crossing the Mediterranean
- **Regional-Tethered** (Rwanda → Kenya → South Africa): Red multi-hop arc showing dependency

Tech: Mapbox's built-in line layer with `line-dasharray` animation. No Three.js (thermal issues on MacBook Air). Deck.gl's ArcLayer is an option if we need 3D.

---

## Phase 4: Growth & Credibility

### Conference Circuit

| Event | Date | Location | Action |
|-------|------|----------|--------|
| **Deep Learning Indaba** | Aug 2026 | Nigeria | **Applications close March 20 — APPLY NOW.** Theme: "Sovereign Intelligence." Perfect alignment. |
| **GITEX Africa** | April 7-9, 2026 | Marrakech | Check startup showcase slots immediately |
| **AI Everything Kenya** | May 19-21, 2026 | Nairobi | AI-focused, East Africa audience |
| **Africa Tech Summit** | May 29, 2026 | London | International investor exposure |
| **AI Expo Africa** | Oct 28-29, 2026 | Johannesburg | Africa's largest enterprise AI trade show |
| **AfricArena** | Nov 26-27, 2026 | Cape Town | Premier startup showcase, year-long tour selection |

### Accelerators & Programs

| Program | Deadline | Details |
|---------|----------|---------|
| **Google for Startups Accelerator: Africa** | **March 18, 2026 (3 DAYS AWAY)** | 12-week equity-free program, AI/ML focus. Part of Google's $1B Africa commitment. |
| **AfricArena Tour** | Rolling | Year-long program with regional stops. Mentorship, coaching, investment. |
| **AI Hub for Sustainable Development** | Open | G7 + AU initiative supporting builders of data centers, GPU clouds, sovereign networks |
| **Techstars (ARM Labs)** | Check timing | Pan-African, 12 investments per cohort |

### Content & Thought Leadership

- Publish a **"State of AI Infrastructure in Africa — Q1 2026"** report using the dashboard data. Free PDF, gated by email signup. This alone could generate 500+ leads.
- Write 2-3 blog posts for TechCabal, Disrupt Africa, or Rest of World — "Where Can You Actually Run AI Inference in Africa?" with data from the platform
- Post weekly insights on LinkedIn/X from the data: "Did you know Morocco has 35ms latency to Europe while Kenya has 140ms? Here's what that means for inference routing."

---

## Monetization Path

### Phase 1: Free (Now → 6 months)

Everything is free. Build the user base, collect emails, establish credibility. The goal is **1,000 signups** and **50 weekly active users**.

### Phase 2: Freemium (6-12 months)

| Tier | Price | What |
|------|-------|------|
| **Free** | $0 | Dashboard, 12 markets, basic comparison, community data |
| **Pro** | $49/mo | PDF exports, API access (1,000 calls/mo), email alerts on market changes, priority data updates |
| **Enterprise** | Custom ($500+/mo) | Custom reports, team workspace, white-label embeds, advisory calls, bulk API |

### Phase 3: Revenue Diversification (12+ months)

| Revenue Stream | Potential | How |
|----------------|-----------|-----|
| **Sponsored reports** | $5K-20K per report | "2026 Nigeria AI Infrastructure Report — presented by AWS" |
| **API licensing** | $1K-10K/mo per client | Cloud providers, VCs, consulting firms need this data programmatically |
| **Advisory/consulting** | $2K-10K per engagement | Companies entering African markets need guidance, not just data |
| **Embedded analytics** | $500-2K/mo per embed | News sites, investment platforms embed our map/widgets |
| **Conference speaking** | $1K-5K per appearance | Once established as the authority on African AI infrastructure |

### Comparable Pricing from Global Infrastructure Intelligence

- Enterprise research subscriptions (Structure Research, TeleGeography): **$5,000–$50,000/year**
- Individual reports: **$500–$5,000 per report**
- API access: **$1,000–$10,000/month**
- There is room for premium pricing because the alternative is hiring a consultant to manually research each market

---

## What Makes This Fundable

### The Numbers for a Pitch Deck

- **TAM:** $4.4B African data center market (2031) + $30B value chain opportunity (McKinsey)
- **SAM:** Infrastructure intelligence for the ~500+ organizations actively deploying or investing in African AI/cloud ($50M+ addressable)
- **SOM:** 1,000 Pro subscribers × $49/mo = $588K ARR within 18 months is realistic if product-market fit is achieved
- **Seed ask:** $250K-$500K for 12-18 months of runway (data team of 2, engineer, go-to-market)

### The Story Investors Want to Hear

1. **Founder-market fit** — "I'm a young African entrepreneur who personally felt this gap. I couldn't find a single tool that told me where AI inference was viable on the continent."

2. **Timing** — "$10B is being invested in African AI infrastructure (AfDB). NVIDIA is deploying GPUs across 5 countries. 2Africa cable just went live. The infrastructure is being built RIGHT NOW — and nobody is mapping it."

3. **No competition** — "We are the only platform that unifies infrastructure, connectivity, policy, and compute readiness in a single interactive dashboard for African AI markets."

4. **Traction** — "X signups, Y weekly active users, featured at Z conference, cited by A publication." (Build this over the next 6 months.)

5. **Moat** — "Our data layer gets deeper every quarter. We're adding historical tracking, real-time monitoring, and community contributions. First-mover advantage in a niche about to explode."

6. **Expansion** — "AI infrastructure today. Fintech infrastructure tomorrow. Healthtech infrastructure next year. Any vertical that needs to understand Africa's digital backbone."

### The 30-Second Pitch

> "Africa is receiving $10 billion in AI infrastructure investment, but founders have no visibility into where they can actually deploy. Only one country has a hyperscaler cloud region. Inferra AI is the intelligence layer — we map compute, connectivity, power, and policy readiness across 12+ African markets so founders, investors, and governments can make informed deployment decisions. Think Bloomberg Terminal for African AI infrastructure. We're the only platform doing this, and we're launching at a moment when the continent's infrastructure is being built in real time."

---

## Partnership Opportunities

| Partner Type | Who | Why | Approach |
|-------------|-----|-----|----------|
| **BARI** (Baobab Future Group) | Governance readiness platform | Complementary — they do policy, we do infra. Joint offering = complete picture. | Reach out for co-marketing, data sharing |
| **Smart Africa Alliance** | 42-member state body | Continental reach, policy data, credibility | Apply to their programs, offer to power their dashboards |
| **Cassava Technologies** | NVIDIA partner, ADC operator | They're building the infrastructure we're mapping | Offer to be their market intelligence layer |
| **AfDB / AI Hub** | $10B initiative | They need dashboards to track their investment impact | Propose Inferra as their monitoring tool |
| **TeleGeography** | Submarine cable data | Their data is open, partnership could be formal | Embed their cable data, credit them, co-brand |

---

## Risk & Honest Challenges

### What Could Go Wrong

1. **Data staleness** — Infrastructure changes fast. If the dashboard shows outdated numbers, credibility evaporates. Need a disciplined quarterly refresh cadence and eventually automated monitoring.

2. **"Nice to have" problem** — If founders can get this info by emailing a cloud provider or reading a McKinsey report, they won't pay for a dashboard. The value is in the *aggregation and live comparison*, not any single data point.

3. **South Africa dominance** — If 80% of users only care about SA (because it's the only viable market), the multi-country dashboard becomes less compelling. Counter this by showing WHY the other markets matter (growth trajectory, latency advantages, policy friendliness).

4. **Funding environment** — African VC is recovering but still cautious. A $250K seed raise is realistic; a $2M seed is harder without clear revenue.

5. **Solo founder risk** — Investors want teams. Finding a technical co-founder or a data/research co-founder would de-risk the story.

### What's Missing That Would Make This 10x

1. **Real-time latency monitoring** — Ping tests from cloud regions to African markets, updated hourly. This turns the platform from "research tool" to "operational dashboard."

2. **Historical data** — Show how metrics changed over time. "Nigeria went from 10 to 17 data centers in 18 months." Trends are more valuable than snapshots.

3. **AI-powered Q&A** — "Which market has the lowest latency to Frankfurt and allows cross-border data transfer?" A chat interface over the dataset. Claude API makes this straightforward.

4. **Predictive scoring** — "Based on current pipeline, Ghana is likely to become Viable within 12 months." This is the premium insight VCs would pay for.

5. **Community layer** — Let users submit corrections, add data points, flag policy changes. Wikipedia model for infrastructure intelligence.

---

## Immediate Action Items

### This Week (March 15-22, 2026)

| Priority | Action | Deadline |
|----------|--------|----------|
| **URGENT** | Apply to Google for Startups Accelerator: Africa | **March 18** (3 days) |
| **URGENT** | Apply to Deep Learning Indaba 2026 | **March 20** (5 days) |
| **HIGH** | Research GITEX Africa startup showcase slots | ASAP (event April 7-9) |
| **HIGH** | Enrich country data with quantified scores from Cloudscene + PeeringDB | This week |
| **MEDIUM** | Redesign login/signup to match landing aesthetic | This week |

### This Month (March 2026)

- Add 5 new countries (Ethiopia, Tanzania, Senegal, Ivory Coast, Tunisia)
- Wire up Supabase auth
- Build comparison page
- Replace all "coming soon" placeholders with real content
- Draft "State of AI Infrastructure in Africa — Q1 2026" report outline

### This Quarter (Q2 2026)

- Launch comparison feature
- Publish Q1 report (gated by email)
- Present at GITEX Africa (April) and/or AI Everything Kenya (May)
- Reach 500 signups
- Begin animated inference route visualization
- Reach out to BARI and Smart Africa Alliance for partnerships
- Write first TechCabal/Disrupt Africa guest post

---

## Appendix: Key Sources & References

### Market Intelligence
- [McKinsey — Building Data Centers for Africa's Unique Market Dynamics (Nov 2025)](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/building-data-centers-for-africas-unique-market-dynamics)
- [AfDB — AI 10 Billion Initiative](https://www.afdb.org/en/news-and-events/press-releases/african-development-bank-undp-and-partners-launch-ai-10-billion-initiative-during-2026-nairobi-ai-forum-91104)
- [AfDB — $1 Trillion GDP from AI by 2035](https://www.afdb.org/en/news-and-events/press-releases/africas-ai-revolution-african-development-bank-report-projects-1-trillion-additional-gdp-2035-use-ai-enhance-productivity-89619)
- [Mordor Intelligence — Africa Data Center Market](https://www.mordorintelligence.com/industry-reports/africa-data-center-market)
- [Disrupt Africa — 2025 Funding Report](https://disruptafrica.com/2026/02/03/african-tech-startup-funding-leaps-by-almost-50-as-sector-begins-to-recover-from-global-funding-winter/)
- [TechCabal — $575M Record Start to 2026](https://insights.techcabal.com/the-first-two-months-of-2026-have-already-outpaced-the-start-of-2025/)

### Infrastructure
- [Cassava/NVIDIA $700M AI Factory Partnership](https://www.intelligentcio.com/africa/2025/11/27/nvidia-and-cassava-technologies-launch-700m-ai-data-centre-rollout-across-africa/)
- [2Africa Submarine Cable Completion](https://www.connectingafrica.com/connectivity/meta-backed-2africa-subsea-cable-completed)
- [TeleGeography — 2025 Africa Telecommunications Map](https://blog.telegeography.com/2025-africa-telecommunications-map)
- [Submarine Cable Map](https://www.submarinecablemap.com/region/africa)

### Policy
- [AI Policy Lab Africa — National Strategies](https://www.aipolicy.africa/national-strategies)
- [AU Continental AI Strategy](https://au.int/en/pressreleases/20240617/african-ministers-adopt-landmark-continental-artificial-intelligence-strategy)
- [Smart Africa — Africa AI Council](https://smartafrica.org/the-smart-africas-board-unveils-the-inaugural-africa-ai-council-to-lead-the-continents-ai-transformation/)

### Competitors & Comparables
- [BARI by Baobab Future Group](https://baobabfuturegroup.com/)
- [Cloudscene](https://cloudscene.com/)
- [TeleGeography](https://www.telegeography.com/)
- [PeeringDB](https://www.peeringdb.com/)

### Conferences & Programs
- [Google for Startups Accelerator: Africa](https://startup.google.com/programs/accelerator/africa/)
- [Deep Learning Indaba 2026](https://deeplearningindaba.com/2026/)
- [GITEX Africa 2026](https://gitexafrica.com)
- [AI Expo Africa 2026](https://aiexpoafrica.com/)
- [AfricArena](https://www.africarena.com/)

---

*This document is a living strategy. Update as priorities shift, data arrives, and opportunities emerge. The research report with full details is in `docs/AFRICA_AI_INFRASTRUCTURE_RESEARCH.md`.*

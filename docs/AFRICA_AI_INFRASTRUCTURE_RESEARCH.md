# African AI Infrastructure Landscape — Deep Research Report

> Compiled 15 March 2026 for Inferra AI strategy & fundraising preparation.
> All data sourced from web research conducted on this date. Numbers are directional — verify critical figures before including in pitch decks.

---

## 1. Market Size & Opportunity

### Data Center Market Size

| Source               | 2025 Value | 2026 Value | 2030/2031 Projection    | CAGR   |
| -------------------- | ---------- | ---------- | ----------------------- | ------ |
| Mordor Intelligence  | $1.94B     | $2.22B     | $4.36B (2031)           | 14.46% |
| Arizton              | —          | —          | $5.28B (SA alone, 2031) | —      |
| Research and Markets | $8.43B     | —          | $12.40B (2030)          | 8.01%  |
| Market Data Forecast | $1.96B     | $2.13B     | —                       | 5.38%  |

The wide range in valuations ($1.9B to $8.4B) reflects different scoping — some track only colocation, others include enterprise and hyperscale. **For pitch purposes, the McKinsey numbers are the most credible.**

### McKinsey Report (November 2025) — The Key Source

McKinsey's "Building Data Centers for Africa's Unique Market Dynamics" is the definitive recent report:

- **Current capacity:** ~400 MW of IT load across the 5 largest African markets
- **2030 projection:** 1.5 to 2.2 GW (3-5x growth)
- **Investment required:** $10-20 billion in fresh investment
- **Revenue potential:** Up to $30 billion across the value chain by 2030
- **Africa's unique model:** Two-thirds of African data centers will be small (1-20 MW) and medium (20-50 MW), unlike the global trend toward large 50-500 MW campuses
- **Power remains the #1 constraint:** Some markets experience 30+ outages per month

### AI-Specific Market

- South Africa AI data center market: $70M (2025) growing to $572.6M by 2031 at 41.95% CAGR
- African hyperscale data center market: forecast to surge from ~$6.7B (2025) to over $28B by 2030

### Key Investment Flows

| Initiative                    | Amount             | Source               | Timeline    |
| ----------------------------- | ------------------ | -------------------- | ----------- |
| AI 10 Billion Initiative      | $10B target        | AfDB + UNDP + AI Hub | By 2035     |
| AfDB AI GDP impact            | $1T additional GDP | AfDB projection      | By 2035     |
| AWS Cape Town investment      | $1.7B              | Amazon               | Ongoing     |
| Microsoft SA expansion        | ZAR 5.4B (~$300M)  | Microsoft            | Ongoing     |
| Cassava/NVIDIA AI factories   | $700M              | Cassava + NVIDIA     | 2025-2029   |
| Huawei Africa DC + cybersec   | $300M+             | Huawei               | By end 2026 |
| Google digital transformation | $225M              | Google               | Committed   |
| Equinix Lagos DC              | $22M               | Equinix              | Planned     |
| WEF green compute estimate    | $1.5T unlockable   | WEF analysis         | Long-term   |

### AfDB Three-Phase AI Readiness Roadmap

1. **Ignition (2025-27):** Foundation laying — data, compute, skills, trust, capital
2. **Consolidation (2028-31):** Scaling and integration
3. **Scale (2032-35):** Full AI-driven economic transformation

---

## 2. Current Infrastructure Capacity

### Data Center Capacity by Country

| Country          | # Data Centers | IT Load Capacity                     | Key Operators                                             |
| ---------------- | -------------- | ------------------------------------ | --------------------------------------------------------- |
| **South Africa** | 56             | ~320 MW (Teraco 200 MW + ADC 120 MW) | Teraco, ADC, NTT, Equinix, Vantage, Digital Parks         |
| **Nigeria**      | 17             | ~137 MW (2025)                       | Rack Centre, Equinix/MainOne, Galaxy Backbone, OADC, ipNX |
| **Kenya**        | 19             | ~40 MW (30% CAGR to 2028)            | iXAfrica, ADC, Safaricom, IXAfrica                        |
| **Egypt**        | Growing hub    | Not specified                        | Telecom Egypt, Huawei Cloud (3 AZs)                       |
| **Morocco**      | Growing        | Not specified                        | Emerging hub, GITEX Africa host country                   |

**Key stat:** South Africa, Kenya, and Nigeria host 41% of Africa's data center infrastructure. Africa's "Big Four" (add Egypt) host 46%.

### Hyperscaler Cloud Regions in Africa

| Provider            | Region             | Location      | Launched     | AZs             |
| ------------------- | ------------------ | ------------- | ------------ | --------------- |
| **AWS**             | af-south-1         | Cape Town, SA | April 2020   | 3               |
| **Microsoft Azure** | South Africa North | Johannesburg  | 2019         | Active          |
| **Microsoft Azure** | South Africa West  | Cape Town     | 2019         | **Closed 2021** |
| **Google Cloud**    | africa-south1      | Johannesburg  | January 2024 | 3               |
| **Oracle OCI**      | af-johannesburg-1  | Johannesburg  | January 2022 | 1 AD, 3 FDs     |
| **Huawei Cloud**    | —                  | South Africa  | Existing     | 2 AZs           |
| **Huawei Cloud**    | —                  | Egypt         | 2025         | 3 AZs           |
| **Huawei Cloud**    | —                  | Nigeria       | 2025         | 1 AZ            |

**Critical gap:** Only South Africa has regions from AWS, Azure, Google Cloud, and Oracle. No other African country has a hyperscaler cloud region. This is a core data point for Inferra AI — the "inference readiness" gap.

### Submarine Cables

**Total:** 77 cable systems connected to Africa (active or under construction)

| Cable               | Owner/Consortium                                                                 | Length                          | Capacity                                | Status                     | African Landings                                        |
| ------------------- | -------------------------------------------------------------------------------- | ------------------------------- | --------------------------------------- | -------------------------- | ------------------------------------------------------- |
| **2Africa**         | Meta + Bayobab (MTN) + Orange + Telecom Egypt + Vodafone + WIOCC + CMI + center3 | 45,000 km                       | Up to 180 Tbit/s                        | Core completed Nov 2025    | 21 landings in 16 African countries, 33 countries total |
| **Equiano**         | Google                                                                           | 12,000 km                       | 144 Tbit/s (12 fiber pairs x 12 Tbit/s) | Operational Sep 2022       | Togo, Nigeria, Namibia, South Africa, St. Helena        |
| **PEACE**           | PCCW Global + Hengtong + others                                                  | 15,000 km (+6,500 km extension) | 16 Tbit/s per fiber pair                | Operational Dec 2022       | Kenya (Mombasa), Egypt, Djibouti, Seychelles, Somalia   |
| **AAE-2** (planned) | PCCW Global + Sparkle + Telecom Egypt + ZOI                                      | TBD                             | TBD                                     | Agreement signed June 2025 | Egypt + more TBD                                        |

**Key insight for Inferra:** 2Africa alone will deliver more capacity than ALL previous cables to Africa combined. This is a transformational infrastructure event.

### Internet Exchange Points (IXPs)

- **63 operational IXPs** in 38 African countries (up from 36 in 26 countries in 2016)
- South Africa has 7 IXPs, Nigeria has 5
- Many countries still route local traffic internationally — a key latency and cost issue

---

## 3. Key Players & Ecosystem

### Major Data Center Operators in Africa

| Operator                            | HQ/Focus                           | Notable Details                                                                                         |
| ----------------------------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Teraco**                          | South Africa                       | Largest single operator in Africa. Majority owned by Digital Realty. Campuses in JHB + CPT. ~200 MW     |
| **Africa Data Centres (ADC)**       | Pan-African (Cassava Technologies) | Continent's largest interconnected, carrier & cloud-neutral network. SA, Kenya, Nigeria, Ghana. ~120 MW |
| **Equinix (via MainOne)**           | Nigeria, Ghana, Ivory Coast        | Acquired MainOne for $320M in 2022. Lagos campus is key for fintech/enterprise                          |
| **Rack Centre**                     | Nigeria                            | Tier III certified, key Lagos operator                                                                  |
| **iXAfrica**                        | Kenya (Nairobi)                    | East Africa's largest. Expanding from 2.25 MW to 22.5 MW. AI-ready. Secured RMB financing               |
| **Raxio Group**                     | Uganda, Ethiopia, DRC, Mozambique  | Founded 2018. Tier III carrier-neutral. Focused on underserved markets                                  |
| **NTT**                             | South Africa                       | Global operator with African footprint                                                                  |
| **WIOCC**                           | Pan-African                        | Major connectivity provider, landed Equiano in Nigeria                                                  |
| **Liquid Intelligent Technologies** | Pan-African                        | Adding capacity in Uganda, Nigeria, SA                                                                  |
| **Digital Parks**                   | South Africa                       | New entrant in SA market                                                                                |
| **Vantage**                         | South Africa                       | Expanding in SA                                                                                         |

### AI-Specific Infrastructure

**Cassava Technologies + NVIDIA partnership** is the biggest AI infrastructure story:

- $700M deal — NVIDIA's first direct infrastructure investment on the continent
- Building Africa's first "AI factories" (GPU-dense data centers)
- 3,000 NVIDIA GPUs delivered to South Africa facility in June 2025
- 12,000 more GPUs to be deployed across Egypt, Nigeria, Kenya, and Morocco over 3-4 years
- Cassava is first NVIDIA Cloud Partner (NCP) in Africa
- Launched Cassava Autonomous Network powered by NVIDIA in March 2026
- GPU-as-a-Service offering now available

---

## 4. Competitive Landscape — Does Inferra AI Have Competition?

### Direct Competitors (AI Infrastructure Readiness Mapping for Africa)

**BARI by Baobab Future Group** — The closest competitor found.

- Described as "Africa's first digital AI Governance & Readiness Benchmarking Platform"
- SaaS platform enabling continuous measurement, regional comparison, systematic improvement
- Aligned with AU, OECD, EU AI frameworks
- Features: structured self-assessment across 5 governance pillars, automated scoring, interactive dashboards, heat maps, AI-generated improvement roadmaps
- **Key difference from Inferra:** BARI focuses on **governance readiness** (policy, regulation, institutional capacity). Inferra focuses on **infrastructure readiness** (data centers, connectivity, compute, power). These are complementary, not identical. BARI is institution-facing (governments). Inferra is market-facing (founders, investors).

**UNESCO AI Readiness Assessment (RAM)**

- Piloting across Southern Africa
- Government-facing assessment across 5 dimensions: legal/policy, social/cultural, scientific/educational, economic, technical/infrastructure
- Not a product/platform — it's a consulting engagement by UNESCO

**UNDP Digital Readiness Assessment (DRA)**

- Evaluates 5 dimensions: people, connectivity, government systems, regulatory, economic
- Country-level reports, not a live dashboard

**Oxford Insights AI Readiness Index**

- Global index ranking countries on AI readiness
- Published annually, not Africa-specific
- Mauritius leads Africa at score 53.27, followed by South Africa

### Adjacent/Global Infrastructure Intelligence Platforms

| Platform                                        | What It Does                                                                                  | Coverage                     | Business Model                                          |
| ----------------------------------------------- | --------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------- |
| **Cloudscene**                                  | Data center + cloud provider directory. 4,700+ DCs in 110 countries. Procurement marketplace. | Global, includes EMEA/Africa | Free directory + marketplace (providers bid on tenders) |
| **Data Center Map** (datacentermap.com)         | Directory of colocation data centers globally                                                 | Global                       | Free directory                                          |
| **Baxtel**                                      | Data center news, comparison, instant pricing, advisory                                       | Global                       | Advisory + sponsored                                    |
| **Dgtl Infra**                                  | Expert research on digital infrastructure (towers, DCs, fiber)                                | Global                       | Content/research                                        |
| **Structure Research**                          | Independent research/consulting on hosting, edge, cloud                                       | Global                       | Paid reports + consulting                               |
| **TeleGeography**                               | Submarine cable maps, telecom research                                                        | Global                       | Paid research + free cable map                          |
| **PeeringDB**                                   | Free database of networks, IXPs, data center facilities                                       | Global                       | Free, community-maintained                              |
| **Submarine Cable Map** (submarinecablemap.com) | Interactive map of global submarine cables                                                    | Global                       | Free (by TeleGeography)                                 |

### The Gap Inferra AI Fills

**None of the above provide:**

1. A unified, Africa-focused view combining infrastructure + connectivity + policy + AI compute readiness
2. Quantified, comparable "AI inference readiness" scores across African markets
3. A live, interactive dashboard purpose-built for AI deployment decisions in Africa
4. Real-time tracking of infrastructure changes (new cables, new cloud regions, policy changes) in one view

**Cloudscene** is the closest in terms of data center intelligence, but it's a global procurement tool, not an Africa-focused readiness platform. It doesn't score countries or map AI-specific infrastructure.

**BARI** is the closest in terms of Africa-focused AI readiness, but it's governance-focused and aimed at institutions/governments, not founders and investors.

**Bottom line: The specific product Inferra AI is building does not appear to exist yet.**

---

## 5. Policy & Regulatory Landscape

### Countries with National AI Strategies (as of early 2026)

At least 8 African countries have adopted national AI strategies, with 5 more in draft/development.

| Country           | AI Strategy                     | Key Details                                                                                                               |
| ----------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| **Mauritius**     | First in Africa                 | Pioneer of African AI policy                                                                                              |
| **Kenya**         | National AI Strategy 2025-2030  | Launched March 2025. KES 152B ($1.14B) allocated over 5 years. Draft AI Code of Practice + Robotics & AI Bill forthcoming |
| **South Africa**  | National AI Strategy 2025-2030  | Skills, infrastructure, ethics, safety mechanisms                                                                         |
| **Nigeria**       | NAIP under development          | Following 2022 white paper. NDPA (data protection) provides regulatory cover                                              |
| **Egypt**         | National AI Strategy            | Adopted, leveraging strategic position                                                                                    |
| **Rwanda**        | National AI Policy              | Smart Africa HQ, strong digital governance                                                                                |
| **Cote d'Ivoire** | AI & Data Governance Strategy   | Unveiled recently                                                                                                         |
| **Ghana**         | National AI Strategy (drafting) | Consultation sessions held in April 2025                                                                                  |

### Data Protection Frameworks

| Country          | Law                                            | Status                                                              |
| ---------------- | ---------------------------------------------- | ------------------------------------------------------------------- |
| **Nigeria**      | Nigeria Data Protection Act (NDPA) 2023        | Enforcement framework (GAID) introduced Sept 2025 by NDPC           |
| **South Africa** | POPIA (Protection of Personal Information Act) | Active enforcement, foundation for AI oversight                     |
| **Kenya**        | Data Protection Act 2019                       | ODPC fining organizations, 1,300+ compliance notices issued in 2025 |
| **Egypt**        | Data Protection Law 2020                       | Operational                                                         |
| **Rwanda**       | Data Protection Law                            | Active                                                              |

### Continental Frameworks

- **African Union Continental AI Strategy** — Unanimously endorsed by African ICT Ministers (June 2024). Calls for Africa-owned, people-centered, development-oriented approach. Seven focus areas: talent, data, infrastructure, market, investment, governance, institutional cooperation.
- **Smart Africa Alliance** — 42 member states. Established inaugural **Africa AI Council** to lead continental AI transformation. Vision: single digital market for Africa.
- **Digital Transformation Strategy for Africa 2020-2030** — AU framework for continental digital development.
- **AI Hub for Sustainable Development** — Co-designed with G7 and AU. Supports builders creating local data centers, GPU clouds, sovereign digital networks.

---

## 6. Conferences & Events — Updated Calendar

| Event                                 | Date                       | Location                       | Key Details                                                                                                                  |
| ------------------------------------- | -------------------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------------- |
| **Africa Tech Summit Nairobi**        | Feb 11-12, 2026            | Sarit Expo Centre, Nairobi     | 4 tracks: Money & DeFi, Climate Tech, Startup, AI & Digital. **Already happened.**                                           |
| **Deep Learning Indaba 2026**         | August 2026 (exact TBD)    | Nigeria                        | Theme: "Sovereign Intelligence: Africa's Path in a Frontier AI World." **Application deadline: March 20, 2026 — APPLY NOW.** |
| **GITEX Africa 2026**                 | April 7-9, 2026            | Marrakech, Morocco             | Major. Data centers are a key theme. Investor-heavy.                                                                         |
| **Africa Tech Summit London**         | May 29, 2026               | London                         | International investor audience                                                                                              |
| **AI Everything Kenya x GITEX Kenya** | May 19-21, 2026            | Nairobi                        | AI-focused                                                                                                                   |
| **AI Expo Africa 2026**               | Oct 28-29, 2026            | Sandton Convention Centre, JHB | Africa's largest enterprise AI trade show                                                                                    |
| **AfricArena Grand Summit 2026**      | Nov 26-27, 2026 (expected) | Cape Town                      | Premier startup showcase. Year-long tour culminates here. 100+ startups featured.                                            |
| **Nairobi AI Forum**                  | Held Feb 9-10, 2026        | Nairobi                        | Where AI 10 Billion Initiative was launched. **Already happened.**                                                           |

### Application Strategy Updates

- **Deep Learning Indaba** — Applications close March 20, 2026. Nigeria location is perfect for West Africa market credibility. Theme aligns perfectly with Inferra's mission. **Priority application.**
- **GITEX Africa** — April 7-9 in Marrakech. Very soon. Check if startup showcase applications are still open.
- **AfricArena Tour** — The year-long tour serves as selection mechanism for the Grand Summit. Look for regional tour stops to present at.
- **Google for Startups Accelerator: Africa** — Applications close March 18, 2026. 12-week hybrid program (April-June 2026). Equity-free. 10-15 startups per cohort. AI/ML focus required. **Apply immediately if not already done.**

---

## 7. Funding Landscape

### Overall African Startup Funding

| Period         | Total Funding | # Startups   | Notable Trend                             |
| -------------- | ------------- | ------------ | ----------------------------------------- |
| Full year 2025 | $1.64B        | 178 startups | +50% YoY recovery from "funding winter"   |
| Jan-Feb 2026   | $575M         | —            | +26.5% vs same period 2025. Record start. |

### Key Trends

- **Cleantech overtook fintech** as largest sector by total capital in 2025
- **Debt funding surging** — especially for infrastructure-heavy startups (climatetech, hardware)
- **Shift toward revenue-first, infrastructure-backed startups** across fintech, logistics, climate tech
- **Seed and pre-Series A** deal volumes rebounding quickly
- **159 AI startups** across Africa have raised $803.2M total (as of June 2025)

### VCs Active in African Infrastructure/Data/AI

The search identified these as key players shaping Africa's 2026 funding:

- MDR — invests in infrastructure, mining, AI, deep tech, manufacturing
- Multiple VCs are pivoting toward infrastructure-backed startups
- Non-equity instruments (debt, revenue-based financing) now account for over $1B of the total

### Accelerators & Grants

| Program                                     | Type                    | Details                                                                                           | Deadline                      |
| ------------------------------------------- | ----------------------- | ------------------------------------------------------------------------------------------------- | ----------------------------- |
| **Google for Startups Accelerator: Africa** | Equity-free accelerator | 12 weeks (Apr-Jun 2026). AI/ML startups. Part of Google's $1B Africa commitment                   | **March 18, 2026**            |
| **Techstars (ARM Labs partnership)**        | Accelerator             | Pan-African. 12 new investments per cohort.                                                       | Check current cohort timing   |
| **AfricArena**                              | Accelerator + showcase  | Year-long program: mentorship, webinars, coaching, investment support. Culminates in Grand Summit | Rolling via Tour stops        |
| **AI Hub for Sustainable Development**      | Builder program         | Supports data center builders, GPU clouds, sovereign networks. Co-designed with G7 + AU           | Check aihubfordevelopment.org |
| **Acceler8 Africa**                         | Accelerator             | Africa-focused startup accelerator                                                                | Check acceler8.africa         |

---

## 8. Real Data Sources for Inferra AI

### Infrastructure Data

| Source                              | URL                     | What You Get                                                  | Cost                       |
| ----------------------------------- | ----------------------- | ------------------------------------------------------------- | -------------------------- |
| **Cloudscene**                      | cloudscene.com          | 4,700+ data centers, operator details, leaderboards by region | Free directory             |
| **Data Center Map**                 | datacentermap.com       | Global DC directory with African listings                     | Free                       |
| **PeeringDB**                       | peeringdb.com           | Network interconnection data, IXP details, facility info      | Free, community-maintained |
| **Submarine Cable Map**             | submarinecablemap.com   | Interactive map of all submarine cables + landing points      | Free (by TeleGeography)    |
| **Internet Exchange Map**           | internetexchangemap.com | All IXPs globally                                             | Free                       |
| **Baxtel**                          | baxtel.com              | Data center news, operator profiles, pricing                  | Free + advisory            |
| **Africa Data Centres Association** | africadca.org           | Member operator list                                          | Free                       |
| **af-ix.org**                       | af-ix.org/ixps-list     | List of active African IXPs by country                        | Free                       |

### Policy & Readiness Data

| Source                                 | URL                                 | What You Get                                                       |
| -------------------------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| **AI Policy Lab Africa**               | aipolicy.africa/national-strategies | Tracks national AI strategies across Africa                        |
| **African Union**                      | au.int                              | Continental AI Strategy, Digital Transformation Strategy 2020-2030 |
| **Smart Africa Alliance**              | smartafrica.org                     | Africa AI Council updates, policy frameworks                       |
| **UNESCO RAM**                         | unesco.org                          | AI Readiness Assessment reports for pilot countries                |
| **Oxford Insights AI Readiness Index** | oxfordinsights.com                  | Annual country-level AI readiness scores                           |
| **Network Readiness Index**            | networkreadinessindex.org           | Country-level network/digital readiness rankings                   |
| **Carnegie Endowment**                 | carnegieendowment.org               | Africa AI governance research                                      |
| **Tech Hive Advisory**                 | techhiveadvisory.africa             | Privacy law updates across Africa                                  |

### Market Intelligence

| Source                                                  | What You Get                                                    |
| ------------------------------------------------------- | --------------------------------------------------------------- |
| **McKinsey** (Nov 2025 report)                          | Africa DC market dynamics, capacity projections, power analysis |
| **Mordor Intelligence**                                 | Africa DC market size + forecasts                               |
| **Arizton**                                             | Africa DC market investment analysis                            |
| **Disrupt Africa**                                      | Annual African tech startup funding reports                     |
| **TechCabal Insights**                                  | Funding data, sector analysis                                   |
| **Africa Hyperscalers News** (africa.hyperscalers.news) | Hyperscaler activity tracking                                   |

---

## 9. Global Infrastructure Intelligence Comparables

These are the business models Inferra AI should study:

| Company                    | What They Do                           | Business Model                               | Relevance                             |
| -------------------------- | -------------------------------------- | -------------------------------------------- | ------------------------------------- |
| **Cloudscene**             | DC directory + procurement marketplace | Freemium directory + marketplace fees        | Closest model. Global. Not AI-focused |
| **TeleGeography**          | Telecom + submarine cable research     | Paid research reports ($$$) + free cable map | Data-as-premium model                 |
| **Structure Research**     | Hosting/cloud infrastructure analysis  | Paid reports + consulting                    | Enterprise research model             |
| **Baxtel**                 | DC comparison + pricing + advisory     | Advisory fees + sponsored content            | Procurement advisory                  |
| **Dgtl Infra**             | Digital infrastructure analysis        | Content + research                           | Thought leadership model              |
| **Pitchbook / Crunchbase** | Startup/VC data                        | SaaS subscription ($5K-$50K/yr enterprise)   | Data platform model to emulate        |
| **Dealroom**               | Startup ecosystem intelligence         | SaaS subscription                            | Good UX model for data dashboards     |

**Pricing benchmarks for infrastructure intelligence:**

- Enterprise research subscriptions: $5,000-$50,000/year
- Individual reports: $500-$5,000 per report
- API access: $1,000-$10,000/month depending on call volume
- The shift toward usage-based and hybrid pricing in SaaS is relevant for Inferra's model

---

## 10. Honest Assessment & Strategic Implications

### What's Real

1. **The market is real and growing fast.** $10-20B in data center investment flowing into Africa over the next 5 years. Hyperscalers are expanding. NVIDIA is investing directly.

2. **The gap is real.** No single platform combines infrastructure, connectivity, policy, and AI compute readiness for African markets. BARI does governance. Cloudscene does procurement. TeleGeography does cables. Nobody does what Inferra is proposing.

3. **The timing is right.** 2Africa cable just completed (Nov 2025). Cassava/NVIDIA AI factories being built. Multiple national AI strategies launching. AfDB launched $10B initiative. This is the infrastructure inflection point.

4. **The audience exists.** 159 AI startups have raised $803M. VCs are shifting toward infrastructure-backed startups. Governments are building AI strategies and need benchmarking tools.

### What's Challenging

1. **Data acquisition is hard.** Most African DC operators don't publish capacity numbers. Exact MW figures for many countries are estimates. Building a reliable, up-to-date database will require partnerships, scraping, and manual research.

2. **The market is concentrated.** South Africa dominates everything — cloud regions, DC capacity, submarine cables. The value of an "African" platform depends on showing why Nigeria, Kenya, Egypt, and others matter too.

3. **Power reliability is the elephant in the room.** McKinsey notes 30+ outages/month in some markets. Any readiness score must weight power heavily, and this data is hard to get at a granular level.

4. **Monetization timeline is long.** Free tools build audience but not revenue. The path from "useful dashboard" to "paying customers" requires either premium data (reports), enterprise features (API, team workspaces), or advisory revenue.

5. **BARI exists.** While focused on governance rather than infrastructure, a well-funded competitor could expand scope. Inferra should consider whether to partner with or differentiate sharply from BARI.

### Recommendations for Strategy

1. **Apply to Google for Startups Accelerator immediately** (deadline March 18, 2026) and Deep Learning Indaba (deadline March 20, 2026). Both are days away.

2. **Position against BARI explicitly.** "BARI measures governance readiness. Inferra measures infrastructure readiness. Together they tell the full story." Consider reaching out for a partnership.

3. **The McKinsey report is your best friend.** Cite it heavily. Their framing of Africa's "unique market dynamics" validates everything Inferra is building.

4. **Cassava/NVIDIA is the biggest story.** Track their AI factory rollout closely. Their deployment across 5 countries maps directly to Inferra's coverage.

5. **Submarine cable data is free and compelling.** TeleGeography's data is open. The 2Africa completion story is powerful — visualize it.

6. **GITEX Africa (April 7-9) is the nearest conference.** If there's any way to get a startup showcase slot in Marrakech, prioritize it.

---

## Sources

### Market Size & Investment

- [Mordor Intelligence — Africa Data Center Market](https://www.mordorintelligence.com/industry-reports/africa-data-center-market)
- [Arizton — Africa Data Center Market](https://www.arizton.com/market-reports/africa-data-center-market-investment-analysis)
- [McKinsey — Building Data Centers for Africa's Unique Market Dynamics](https://www.mckinsey.com/industries/technology-media-and-telecommunications/our-insights/building-data-centers-for-africas-unique-market-dynamics)
- [AfDB — AI 10 Billion Initiative](https://www.afdb.org/en/news-and-events/press-releases/african-development-bank-undp-and-partners-launch-ai-10-billion-initiative-during-2026-nairobi-ai-forum-91104)
- [AfDB — $1 Trillion GDP Projection](https://www.afdb.org/en/news-and-events/press-releases/africas-ai-revolution-african-development-bank-report-projects-1-trillion-additional-gdp-2035-use-ai-enhance-productivity-89619)
- [WEF — $1.5T Green Compute in Africa](https://www.weforum.org/stories/2025/12/investing-in-green-compute-in-africa/)
- [South Africa DC Market 2026-2031](https://www.globenewswire.com/news-release/2026/03/11/3253598/0/en/South-Africa-Data-Center-Market-Investment-Growth-aNALYSIS-Report-2026-2031-Featuring-Key-DC-Investors-Africa-Data-Centres-Digital-Parks-Equinix-Microsoft-NTT-Open-Access-Teraco-Va.html)

### Infrastructure & Connectivity

- [TeleGeography — 2025 Africa Telecommunications Map](https://blog.telegeography.com/2025-africa-telecommunications-map)
- [Submarine Cable Map — Africa](https://www.submarinecablemap.com/region/africa)
- [2Africa Cable Official](https://www.2africacable.net/)
- [Meta — 2Africa Completion](https://www.connectingafrica.com/connectivity/meta-backed-2africa-subsea-cable-completed)
- [Google Equiano Cable](https://en.wikipedia.org/wiki/Equiano_(submarine_communications_cable))
- [PEACE Cable](https://www.submarinenetworks.com/en/systems/asia-europe-africa/peace)
- [Africa Hyperscalers News](https://africa.hyperscalers.news/analysis/africas-data-center-paradox-rising-demand-lagging-capacity/)

### Cloud Providers

- [AWS Africa Cape Town Region](https://aws.amazon.com/blogs/aws/now-open-aws-africa-cape-town-region/)
- [Google Cloud Johannesburg Launch](https://techcrunch.com/2024/01/31/googles-first-africa-cloud-region-now-operational/)
- [Microsoft Azure South Africa](https://azure.microsoft.com/en-us/blog/microsoft-opens-first-datacenters-in-africa-with-general-availability-of-microsoft-azure/)
- [Oracle Cloud Johannesburg](https://www.oracle.com/news/announcement/oracle-cloud-johannesburg-region-2022-01-19/)
- [Huawei Cloud Africa Expansion](https://techafricanews.com/2025/02/25/huawei-cloud-expands-in-africa-with-new-availability-zones/)

### AI Infrastructure

- [Cassava + NVIDIA $700M Partnership](https://www.intelligentcio.com/africa/2025/11/27/nvidia-and-cassava-technologies-launch-700m-ai-data-centre-rollout-across-africa/)
- [Cassava GPU-as-a-Service](https://www.cassavatechnologies.com/cassava-technologies-forges-ahead-with-rollout-of-its-gpu-as-a-service-offering-reinforcing-its-commitment-to-africas-digital-future/)
- [iXAfrica Nairobi Expansion](https://www.ecofinagency.com/news-digital/0909-48533-ixafrica-taps-rmb-to-scale-nairobi-data-hub-amid-cloud-and-ai-boom)
- [UNDP — Africa's AI Moment](https://www.undp.org/africa/blog/africas-ai-moment-build-infrastructure-own-future)

### Competitive Landscape

- [BARI — Baobab Future Group](https://baobabfuturegroup.com/)
- [Cloudscene](https://cloudscene.com/)
- [Baxtel](https://baxtel.com/)
- [Dgtl Infra](https://dgtlinfra.com/)
- [PeeringDB](https://www.peeringdb.com/)
- [Data Center Map](https://www.datacentermap.com/)

### Policy & Governance

- [AI Policy Lab Africa — National Strategies](https://www.aipolicy.africa/national-strategies)
- [African Union — Continental AI Strategy](https://au.int/en/pressreleases/20240617/african-ministers-adopt-landmark-continental-artificial-intelligence-strategy)
- [Smart Africa — Africa AI Council](https://smartafrica.org/the-smart-africas-board-unveils-the-inaugural-africa-ai-council-to-lead-the-continents-ai-transformation/)
- [AI Regulation in Africa 2026](https://www.techinafrica.com/ai-regulation-africa-2026-new-laws-compliance-startup-opportunities/)
- [UNESCO AI Readiness Assessment](https://www.unesco.org/en/articles/unesco-pilots-ai-readiness-assessments-across-southern-africa)
- [Carnegie — Africa AI Governance](https://carnegieendowment.org/posts/2025/09/understanding-africas-ai-governance-landscape-insights-from-policy-practice-and-dialogue)

### Funding & Ecosystem

- [Disrupt Africa — 2025 Funding Report](https://disruptafrica.com/2026/02/03/african-tech-startup-funding-leaps-by-almost-50-as-sector-begins-to-recover-from-global-funding-winter/)
- [TechCabal — 2026 Funding Surge](https://techcabal.com/2026/03/12/africas-2026-startup-funding/)
- [TechCabal Insights — $575M Record Start](https://insights.techcabal.com/the-first-two-months-of-2026-have-already-outpaced-the-start-of-2025/)
- [Africa VC Landscape 2026](https://techpoint.africa/insight/vcs-shape-africas-funding/)
- [Google for Startups Accelerator Africa](https://startup.google.com/programs/accelerator/africa/)
- [StartupList Africa — AI Startups](https://blog.startuplist.africa/articles/ai-revolution-in-africa-2025)

### Conferences

- [GITEX Africa 2026](https://gitexafrica.com)
- [AI Expo Africa 2026](https://aiexpoafrica.com/)
- [Deep Learning Indaba 2026](https://deeplearningindaba.com/2026/)
- [Africa Tech Summit](https://www.africatechsummit.com/)
- [AfricArena](https://www.africarena.com/)
- [AI Everything Kenya x GITEX Kenya](https://www.aieverythingkenya.com/)

### Data Center Operators

- [Top 10 Data Centre Companies in Africa](https://datacentremagazine.com/top10/top-10-data-centre-companies-in-africa)
- [Teraco Data Environments](https://techcentral.co.za/south-africas-biggest-data-centres/253343/)
- [Raxio Group](https://datacentremagazine.com/top10/top-10-data-centre-companies-in-africa)
- [Africa Data Centres Association](https://africadca.org/en/members)
- [iXAfrica](https://ixafrica.co.ke/)

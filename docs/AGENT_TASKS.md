# Inferra AI — Agent Research Tasks

These are fully self-contained research tasks for an online agent with no access to the codebase
or local machine. Each prompt includes all the context needed to produce accurate, usable output.

---

## TASK 1 — Data Gap Audit & Enrichment (Existing 16 Markets)

### Context

Inferra AI is a platform mapping AI infrastructure readiness across African markets for founders,
investors, and policymakers. Each country entry lives in a JSON file with the schema below. You
have been given the current data for all 16 markets. Your job is to identify weak or missing
values and research accurate replacements.

### The Schema (every field that must be populated)

```
country             string    — Country name
iso2                string    — ISO 3166-1 alpha-2 code
region              string    — One of: North Africa / West Africa / East Africa / Central Africa / Southern Africa
latitude            float     — Decimal degrees
longitude           float     — Decimal degrees
population_m        float     — Population in millions (2024 estimate)
gdp_usd_bn          float     — Nominal GDP in USD billions (2023/24)
internet_penetration_pct  float  — % of population with internet access (ITU/Datareportal 2024)
mobile_penetration_pct    float  — Mobile connections per 100 people (GSMA 2024)
dc_count            int       — Number of data centers (carrier-neutral + hyperscaler + telco)
it_load_mw          float     — Total installed IT load capacity in megawatts
ixp_count           int       — Number of Internet Exchange Points
submarine_cables    string[]  — Named cables with active landing stations in that country
cloud_providers     string[]  — Cloud presence: distinguish between full Region, Local Zone, Edge PoP, peering PoP
dc_operators        string[]  — Named data center operators present in country
ai_strategy_status  string    — One of: Adopted / Drafting / None
key_regulations     string[]  — Specific laws with year enacted
readiness_score     int       — Overall 0–100 score
scores              object    — Five sub-scores 0–100: compute, connectivity, power, policy, ecosystem
ai_inference_readiness    string  — One of: Viable / Emerging / Emerging (Early) / Early Stage
active_data_centers string    — Human-readable summary (e.g. "17 facilities")
dc_pipeline         string    — Pipeline status: "Under construction" / "Planned" / "None known"
ai_compute_availability   string  — One of: GPU available / Limited GPU / CPU-focused
cloud_maturity      string    — Short description of highest-tier cloud presence
connectivity_role   string    — 1-line role description for this market
power_reliability   string    — Short description with grid stability signal
ops_friction        string    — One of: Low / Medium / High
data_residency_constraint string  — One of: Yes / No / Sector-specific / Unclear
primary_inference_route   string  — One of: Local-Native / Hybrid-Edge / Regional-Tethered
est_rtt_to_europe_ms      string  — Estimated round-trip time to nearest European PoP (e.g. "~90")
founder_insight     string    — 3–5 sentence paragraph for founders. Specific, actionable, no fluff.
ai_policy_signal    string    — One of: Strong / Emerging / Weak / None
ai_data_governance_posture  string  — One of: Restricted / Flexible / Unclear
ai_compute_policy_commitment  string  — One of: Explicit / Implied / Absent
cross_border_ai_alignment   string  — One of: Supported / Conditional / Opposed
```

### Current Data (all 16 markets — use this as your baseline)

**Weak fields to prioritise** (most frequently "Unclear", vague, or likely outdated):

| Country        | Weak/Missing Fields |
|---------------|---------------------|
| Nigeria        | `data_residency_constraint` = "Unclear" — NDPA 2023 has specific provisions, research these |
| Kenya          | `data_residency_constraint` = "Unclear" — Data Protection Act 2019 has provisions |
| Morocco        | `data_residency_constraint` = "Unclear" |
| Ghana          | `data_residency_constraint` = "Unclear", `ai_strategy_status` = "Drafting" — has draft been published? |
| Rwanda         | `submarine_cables` = [] — confirm this is accurate (landlocked), note terrestrial fibre links |
| Ethiopia       | `submarine_cables` = [] — confirm, note Djibouti gateway |
| Ethiopia       | `est_rtt_to_europe_ms` = "~354" — verify this, seems very high |
| Tanzania       | `it_load_mw` = 3.2 — very low, verify against Microsoft/G42 $1B DC announcement |
| Tanzania       | `ai_strategy_status` = "Drafting" — has Tanzania published a formal AI strategy? |
| Uganda         | `submarine_cables` = [] — confirm landlocked, note terrestrial links through Kenya/Tanzania |
| Uganda         | `ai_strategy_status` = "Drafting" — has AI Task Force 2024 released a formal draft? |
| Zambia         | `submarine_cables` = [] — confirm, note terrestrial backhaul |
| Zambia         | `ai_strategy_status` = "Drafting" |
| Tunisia        | `data_residency_constraint` = "Unclear" — research Council of Europe 108+ implications |
| Senegal        | `data_residency_constraint` = "Unclear" — first African data protection law 2008, what are requirements? |
| Angola         | `it_load_mw` = 35 — verify against Angola Cables / AngoNAP capacity |
| All countries  | `dc_pipeline` fields are generic — add specific named project if known (e.g. "Raxio 10MW Phase 2") |

### What to Research Per Country

For each country above, research:
1. **Data residency / localisation laws** — does the country require data to be stored locally? Cite the specific law and article if yes.
2. **AI strategy status** — has a formal national AI strategy been published and adopted? Link to source.
3. **Data center pipeline** — are there any named, announced DC projects under construction or planned? Name the operator and capacity in MW.
4. **RTT to Europe** — what is a realistic round-trip latency estimate to London or Frankfurt from that country's capital? Use submarine cable routing data or traceroute benchmarks if available.

### Output Format Required

Return a JSON array of country update objects. For each country that has changes, include ONLY the fields that are being updated:

```json
[
  {
    "country": "Nigeria",
    "data_residency_constraint": "Yes — NDPA 2023 Section X requires...",
    "dc_pipeline": "Equinix LG3 (12 MW, under construction, 2025 target)",
    "_research_notes": "Source: [URL]. NDPA Section 44 requires data controllers to store personal data of Nigerian residents in Nigeria or a country with adequate data protection."
  }
]
```

Include a `_research_notes` field for each country with your sources. This is important — unsourced updates will not be accepted.

---

## TASK 2 — New Market Research: 4 Countries to Add

### Context

Inferra AI currently covers 16 African markets. The target is 20+. Your task is to research
4 candidate markets and produce a complete JSON entry for each, matching the exact schema above.

The 4 markets to research:

### Market A: Mozambique

**Why it matters:** Raxio opened East Africa's newest Tier III DC there in 2024. SEACOM and EASSy
land there. Massive LNG economy driving B2B demand. Microsoft and Liquid Telecom both active.

**Key things to find:**
- How many data centers? Who operates them? What is total IT load MW?
- What submarine cables land in Mozambique?
- Is there a national AI or digital strategy?
- Data protection law: does Law 3/2022 include data localisation requirements?
- What is the RTT to Europe from Maputo?
- Cloud provider presence: any direct AWS/Azure/GCP PoPs in Maputo?

### Market B: Botswana

**Why it matters:** One of Africa's most stable economies (GDP per capita ~$8,000), landlocked but
well-connected through South Africa. Government pushing digital economy agenda. BOCRA regulates.
Small market but extremely low ops friction.

**Key things to find:**
- Data center count and operators (Botswana Fibre Networks, BTC, others)
- National AI/data strategy status
- Data Protection Act 2018 — does it include localisation requirements?
- Connectivity: primarily terrestrial through South Africa. What is RTT to Europe?
- Cloud: does AWS/Azure/GCP have any PoP in Gaborone or does everything route through Johannesburg?

### Market C: Djibouti

**Why it matters:** Djibouti is the most important submarine cable hub in Africa — over 13 cables
land there, making it the gateway for all of East Africa's international traffic. Tiny country
(1M population) but critical infrastructure. Home to CDA (Djibouti Data Center) and the upcoming
Djibouti AI Hub.

**Key things to find:**
- Exact cables landing in Djibouti (should include SEA-ME-WE 3, AAE-1, EIG, DARE1, PEACE, and others)
- Data center operators: CDA, Djibouti Telecom DC, any others?
- Total IT load capacity estimate
- Djibouti AI Hub — what is it? Who is behind it? When does it launch?
- Data protection and AI regulatory environment
- RTT to Europe: with direct Mediterranean cables this should be very low (~30-40ms?)

### Market D: Mauritius

**Why it matters:** Mauritius is Africa's most mature digital economy per capita. It's an OECD-comparable
regulatory environment, GDPR-adequate data protection, and acts as a financial/legal gateway for
investment into mainland Africa. Home to a CyberCity DC campus and Africa's first IXP.

**Key things to find:**
- Data center operators (CyberCity, Rogers Capital, Orange Mauritius, others)
- Submarine cables: SAFE, LION, LION2, 2Africa — confirm which ones land
- Total IT load MW estimate
- Cloud presence: any hyperscaler regions or PoPs?
- GDPR adequacy / data protection status
- RTT to Europe (should be moderate, ~100ms via SAFE cable)
- Mauritius AI strategy or digital economy plan

### Output Format

For each market, produce a complete JSON object matching the full schema above. Use the existing
16-country dataset as a reference for how to score and phrase fields consistently. Be conservative
with scores — do not inflate. Where data is uncertain, note it in `founder_insight`.

```json
[
  {
    "country": "Mozambique",
    "iso2": "MZ",
    "region": "Southern Africa",
    ... all fields ...
    "_research_notes": {
      "sources": ["URL1", "URL2"],
      "confidence": "medium — dc_count based on Raxio press release + carrier DC listings, may miss smaller facilities",
      "last_verified": "March 2026"
    }
  }
]
```

---

## TASK 3 — Competitor & Positioning Research

### Context

Inferra AI needs to understand its competitive landscape clearly before GITEX Africa (April 7–9, 2026).
The pitch is: *"The first founder-facing, real-time readiness index for AI deployment in Africa."*

### Research Brief

Find and profile every existing tool, report, index, or platform that attempts to map AI or tech
readiness in Africa. For each, produce:

1. **Name & URL**
2. **Who built it** (org, country)
3. **What it measures** (methodology if public)
4. **Who it's for** (researchers? governments? investors? founders?)
5. **How current is the data** (updated yearly? monthly? static?)
6. **What it misses** that Inferra covers (or vice versa)
7. **Is it interactive/visual or a static PDF/report?**

### Specific Tools to Include (research each of these)

- Oxford Insights AI Readiness Index (annual report)
- GSMA Mobile Economy Africa (connectivity data)
- Partech Africa Tech Report (investment data)
- IFC / World Bank AI for Development reports
- ITU ICT Development Index
- Mozilla Foundation AI Readiness in Africa
- AfricaNLP / Masakhane (research community, different angle but relevant)
- Google's Internet Inclusion initiative data
- Any Kauffman / startup ecosystem maps of Africa

### Output Format

Markdown table with one row per competitor, then a 2-3 paragraph positioning summary explaining
exactly how Inferra AI is different and what the whitespace is.

---

## TASK 4 — GITEX Africa 2026 Startup Intelligence

### Context

GITEX Africa 2026 is in Marrakech, Morocco, April 7–9. This is one of the biggest tech events
on the continent and a key platform for Inferra AI's first public exposure.

### Research Brief

1. **Startup programme details**
   - Is there a formal startup showcase / competition at GITEX Africa 2026?
   - What is the application process, deadline, and cost?
   - What is the pitch format (stage time, jury, prizes)?
   - Link to application page if it exists

2. **Previous winners / notable startups from GITEX Africa 2024 and 2025**
   - Which African AI or infrastructure startups presented?
   - What industries were most represented?
   - Any startups from this category (AI infrastructure, developer tools, data platforms)?

3. **Key investors / VCs attending GITEX Africa 2026**
   - Which African-focused VCs have exhibited or attended historically?
   - Any announced investors for 2026?

4. **Session/panel topics relevant to Inferra**
   - Any announced sessions on AI infrastructure, data sovereignty, African cloud, compute access?

5. **Practical logistics**
   - Best way to get a booth or speaking slot as an early-stage startup?
   - Cost estimates for participation (booth, tickets, side events)

### Output Format

Structured markdown with a section per bullet above. End with a concrete **Action Plan** section:
what Rajveer should do this week to maximise Inferra's presence at GITEX Africa, in priority order.

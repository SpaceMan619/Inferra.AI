# InferraAI Data Methodology

**Version:** 2.0
**Last updated:** March 2026
**Scope:** 30 African markets

---

## Purpose

InferraAI is a directional tool for AI founders, operators, and investors assessing where AI inference infrastructure is viable across Africa. This document defines how every data point is sourced, how scores are calculated, and what confidence level to assign each metric.

The tool does not claim to be exhaustive. It provides directional signals based on the best available public data. Where data is estimated or inferred, it is noted in the companion `sources.json` file.

---

## Guiding Principles

1. **Primary sources over aggregators.** Hyperscaler region data comes from AWS/Azure/GCP official documentation. Cable data comes from TeleGeography. IXP data comes from PeeringDB. Aggregators (Cloudscene, datacentermap.com) are used to cross-reference, not as sole sources.

2. **AI-capable infrastructure, not raw headcount.** A server room in an office building is not equivalent to a carrier-neutral colocation facility with 30kW+/rack density and GPU cooling. We distinguish `dc_count_total` (all known facilities) from `dc_ai_capable` (facilities meeting the inference-readiness threshold below).

3. **Directional honesty.** Where data is genuinely uncertain — particularly in smaller markets — we use conservative estimates and flag the uncertainty. We do not present estimates as facts.

4. **Recency.** All metrics are reviewed against 2024–2025 data where available. Older data is flagged.

---

## The AI-Capable Data Center Standard

A facility counts as `dc_ai_capable` only if it meets **all** of the following:

| Criterion | Threshold |
|---|---|
| Power density | 30 kW/rack or higher (or marketed as HPC/GPU-ready) |
| Power redundancy | N+1 minimum (ideally 2N) |
| Fiber diversity | 2+ independent carrier paths |
| Cooling | Modern high-density air or liquid cooling |
| Colocation offering | Active marketing to enterprise/GPU tenants OR known GPU deployment |

Sources used to assess this: facility spec sheets, operator websites (Teraco, Raxio, Africa Data Centres, iXAfrica, Equinix, etc.), Cloudscene listings, Xalam Analytics Africa Data Center Market report, and the McKinsey "Building AI Data Centers" framework (2024) which defines 30kW+/rack as the baseline for AI workload suitability.

Standard enterprise server rooms, university computing facilities, government data centers with unknown specs, and basic shared colocation below 10kW/rack are counted in `dc_count_total` only.

---

## Scoring Rubric

All five dimension scores are integers 0–100. The overall `readiness_score` is a weighted composite.

### Compute Score (weight: 25%)

Reflects the availability of AI-grade compute infrastructure — primarily `dc_ai_capable` count, hyperscaler cloud region depth, and GPU accessibility.

| Score | Criteria |
|---|---|
| 80–100 | 5+ AI-capable DCs; multiple full hyperscaler regions (≥2); active GPU colocation |
| 60–79 | 2–4 AI-capable DCs; ≥1 full hyperscaler region or AWS Local Zone; GPU colocatable |
| 40–59 | 1–2 AI-capable DCs; edge PoPs only; GPU possible but scarce or expensive |
| 20–39 | 0–1 AI-capable DCs; edge PoPs only; no practical GPU access |
| 0–19 | No AI-capable infrastructure |

### Connectivity Score (weight: 25%)

Calculated from three components:

```
connectivity = cable_score + ixp_score + latency_score

cable_score  = min(distinct_submarine_cables × 10, 50)
ixp_score    = min(ixp_count × 5, 25)
latency_score:
  < 60ms  → 25
  60–100ms → 20
  100–150ms → 15
  150–200ms → 10
  > 200ms  → 5
```

For landlocked countries, cable score is based on cables accessible via the primary terrestrial corridor. Latency is estimated to London or Marseille as the nearest European PoP.

### Power Score (weight: 20%)

Reflects grid reliability for sustained inference workloads. Major carrier-neutral DCs operate with generator backup, which partially mitigates grid issues — but increases OPEX and reduces viability for smaller operators.

| Score | Criteria |
|---|---|
| 80–100 | Grid generally reliable (<30 min outage/day avg); good renewable penetration (>20%); strong DC power infrastructure |
| 60–79 | <2 hours outage/day; major DCs have reliable independent power; renewables growing |
| 40–59 | 2–6 hours outage/day; large DCs workable with generators; grid improving |
| 20–39 | 6–12 hours outage/day; severe reliability issues; high OPEX for any deployment |
| 0–19 | >12 hours outage/day or effectively no national grid |

Sources: World Bank Electricity Access database, USAID Power Africa reports, local utility reports, DC operator statements.

### Policy Score (weight: 15%)

Reflects the regulatory environment for AI and data infrastructure.

| Score | Criteria |
|---|---|
| 80–100 | Data protection law implemented + active national AI strategy + international data flow alignment |
| 60–79 | Data protection law in force + national AI strategy published |
| 40–59 | Either a data protection law OR an AI strategy, not both |
| 20–39 | Basic telecoms regulation; no formal data protection or AI frameworks |
| 0–19 | No relevant regulatory frameworks |

Sources: ITU AI Policy Observatory, individual government sources, UNCTAD data protection law tracker.

### Ecosystem Score (weight: 15%)

Reflects the tech founder and developer ecosystem that determines local talent, tooling, and demand for AI products.

| Score | Criteria |
|---|---|
| 80–100 | Mature ecosystem; significant international VC; multiple notable exits or unicorns |
| 60–79 | Active ecosystem; multiple accelerators/hubs; notable VC deals |
| 40–59 | Growing ecosystem; some hubs; limited but present VC activity |
| 20–39 | Early stage; minimal hubs; pre-VC ecosystem |
| 0–19 | Minimal tech ecosystem |

Sources: Briter Bridges Africa Investment Landscape reports, Partech Africa reports, Google/IFC e-Conomy Africa study, AfriLabs network.

### Composite Readiness Score

```
readiness_score = round(
  compute      × 0.25 +
  connectivity × 0.25 +
  power        × 0.20 +
  policy       × 0.15 +
  ecosystem    × 0.15
)
```

### AI Inference Readiness Tier

| Tier | Score |
|---|---|
| **Viable** | ≥ 60 — meaningful local or near-local inference is operationally feasible today |
| **Emerging** | 40–59 — infrastructure exists but significant gaps in compute, power, or policy |
| **Emerging (Early)** | < 40 — early-stage; offshore inference is the only practical option |

---

## Inference Route Classification

| Route Type | Definition |
|---|---|
| **Local-Native** | Hyperscaler cloud region in-country, or sufficient AI-capable DC infrastructure to host models locally. Latency to EU is high enough that local is preferable. |
| **Hybrid-Edge** | No full in-country cloud region, but direct submarine cable to European PoP with <120ms latency. Inference can viably run in EU with acceptable UX. |
| **Regional-Tethered** | No direct submarine cable or high latency; inference routes through a regional hub (e.g. Johannesburg, Nairobi, Lagos) before onward to Europe. |

---

## Key Reference Sources

| Source | Used For |
|---|---|
| TeleGeography Submarine Cable Map | Submarine cable landings, cable names |
| PeeringDB / IX.org Africa | IXP count and locations |
| AWS/Azure/GCP/Oracle official docs | Cloud region and PoP classification |
| Cloudscene / datacentermap.com | DC operator listings and cross-reference |
| Xalam Analytics Africa DC Market Report | AI-capable DC classification cross-reference |
| **McKinsey "Building AI Data Centers" (2024)** | AI-capable DC power density framework (30kW+/rack threshold) |
| World Bank Electricity Access Database | Power reliability baselines |
| USAID Power Africa | Grid reliability by country |
| ITU AI Policy Observatory | AI strategy status |
| UNCTAD Data Protection & Privacy Legislation | Data law status |
| Briter Bridges / Partech Africa | Ecosystem and VC funding data |
| IMF World Economic Outlook (2024) | GDP and population figures |
| World Bank World Development Indicators | Internet and mobile penetration |

---

## Data Confidence Levels

Each field in `sources.json` carries a confidence indicator:

| Level | Meaning |
|---|---|
| **verified** | Confirmed from primary source (official doc, operator spec, hyperscaler page) |
| **estimated** | Derived from multiple secondary sources with reasonable confidence |
| **inferred** | Calculated from known data (e.g. latency estimated from cable distance and PoP location) |

The UI does not surface confidence levels to end users — InferraAI is a directional tool and surfacing uncertainty labels would distract from the primary use case. Confidence data is maintained internally for data quality auditing.

---

## Update Protocol

This dataset should be reviewed on the following triggers:

1. **Quarterly**: Cloud provider region announcements, major DC openings (Raxio, ADC, iXAfrica expansions)
2. **On event**: New submarine cable landing, national AI strategy adoption or revision, major power infrastructure change
3. **Annually**: Full recalibration of all scores against updated World Bank, GSMA, and Briter Bridges reports

For each update, the `sources.json` file must be updated with the new source and date before the country data is changed.

---

## Country Coverage

**Version 2.0 includes 30 markets:**

### Existing Markets (20)
South Africa, Nigeria, Kenya, Egypt, Morocco, Ghana, Ethiopia, Tanzania, Rwanda, Senegal, Côte d'Ivoire, Angola, Uganda, Cameroon, Zambia, Botswana, Mauritius, Tunisia, Mozambique, Djibouti

### New Markets Added v2.0 (10)
Democratic Republic of Congo, Zimbabwe, Namibia, Algeria, Madagascar, Gabon, Benin, Mali, Togo, Sudan

---

*This document is maintained by the InferraAI team. For corrections or updates to sourced data, open an issue on the project repository.*

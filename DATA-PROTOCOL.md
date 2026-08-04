# Inferra AI — Data Refresh Protocol

**Status:** canonical. This document supersedes `docs/quarterly-update-protocol.md`
and the per-pass research brief kept alongside the evidence in `data-refresh/`
as the authority on how the dataset is produced. Where any older document
disagrees with this one, this one wins — see §6, "Source tier hierarchy,"
below for the one place that needed an explicit decision rather than a silent
overwrite.

This document is self-contained. It assumes no memory of any prior
conversation, session, or tool. It names no AI product, model, or vendor,
because the tool used to run a pass will change over the life of this
project and the protocol must not. Wherever a capability is needed — "fetch
a web page," "search the web," "read a PDF" — it is described as a
capability, not a product.

---

## 1. Purpose and scope

Inferra AI is a public web application that scores AI infrastructure
readiness for African countries across five dimensions (compute,
connectivity, power, policy, ecosystem) and publishes a composite
`readiness_score` and tier for each. The dataset backing it lives at
`public/data/countries.json` in this repository and is the thing this
protocol exists to keep honest.

**Coverage grows over time.** The intended end state is every country in
Africa. Coverage at any moment is whatever `public/data/countries.json`
contains — that file is the authority, not this document and not any
number written down elsewhere. Never hardcode a country count into
tooling, copy, or a pass plan; read the dataset. Adding a country is
routine: write its baseline, add it to the pass queue, and run it through
the same gates as everything else. Nothing in this protocol changes with
scale.

A **pass** is one complete cycle of re-deriving every tracked field for
every country then in coverage, from live cited sources, verifying those
citations by two independent gates, and promoting the result to become the
new live dataset. A pass has a name (a year-month, e.g. `2026-08`) and a
directory under `data-refresh/` holding its working files.

**Provenance is mandatory, not optional documentation.** Every number in
this dataset is a claim about the world, and a claim that cannot be checked
by someone who did not make it is worthless to a reader deciding whether to
trust the tool. This protocol's entire structure — the schema, the two
verification gates, the promotion rules — exists to make every value
falsifiable by a stranger with a browser.

## 2. The core principle: a value is claimed, not researched

Do not think of data collection as "finding the right number." Think of it
as making a claim and attaching the exact evidence someone would need to
prove the claim wrong. A field entry without a working source URL and a
verbatim quote from that source is not data — it is an assertion with no
way to check it, and it must not enter the dataset.

The single most important distinction in this whole protocol, because
getting it wrong is the dataset's one historical failure:

| Date field | Meaning |
|---|---|
| `reporting_period` | The period the number actually **describes**. This is the accuracy claim itself. |
| `retrieved_at` | The date the operator or agent read the source page. |
| `refreshed_at` | The date this country's file was written during the current pass. |

These three are routinely conflated, and conflating them is the specific
defect this protocol exists to prevent. A dataset that says "as of today"
because `retrieved_at` is today, while the underlying `reporting_period` is
two years old, is not current — it is stale data wearing a current
timestamp.

This is not a hypothetical risk. It already happened. A March-2026
collection pass (dataset version 1.5, frozen at `public/data/snapshots/2026-08.json`)
carried South Africa's population as 60.7 million. That figure is
Statistics South Africa's **2022** mid-year estimate — roughly four years
behind the collection pass's own stated date, and it was published with no
`reporting_period` field to reveal the gap. The August 2026 refresh replaced
it with 63.5 million, sourced to Stats SA's 2026 Mid-Year Population
Estimates, and — critically — recorded `"reporting_period": "2026 mid-year"`
so the next reader, human or automated, can tell at a glance how current
the number actually is without re-deriving it.

The rule that follows: **every field entry carries its own
`reporting_period`, independent of when the pass ran.** A number describing
2023 is a 2023 number forever, no matter when it was retrieved or published.
Never write "current" or "as of [today]" into a field's meaning unless the
source itself states the reporting period is the present period.

## 3. Directory layout and file naming

```
data-refresh/                          # working files for in-progress and past passes
├── VERIFICATION.md                    # the two-gate verification protocol (still valid; this file's §9 is a supersets summary of it)
├── verify.mjs                         # the mechanical gate-1 verifier
└── <PASS-ID>/                         # one directory per pass, named YYYY-MM of when the pass started, e.g. 2026-08
    ├── QUEUE.md                       # live progress tracker for this pass — see §11
    ├── baseline-<ISO2>.json           # the PRE-pass value for each country, for comparison only. Never edit these.
    ├── <ISO2>.json                    # this pass's finished, verified output for one country, e.g. KE.json
    └── SIGNOFF.md                     # written once gate 2 completes for the whole pass — see §9

public/data/
├── countries.json                     # THE LIVE DATASET. Only touched by promotion (§10), never by a working pass.
├── sources.json                       # per-country provenance summary shown alongside the live dataset
└── snapshots/
    ├── index.json                     # manifest of every snapshot, with its own date semantics (frozen_at / data_collected / reporting_period)
    └── <PASS-ID>.json                 # a frozen, read-only copy of countries.json taken immediately before a promotion overwrites it
```

Rules:

- `<ISO2>` is the two-letter uppercase ISO 3166-1 country code (`ZA`, `NG`,
  `KE`, …). Every working file in a pass directory uses it.
- A new pass creates a new directory named for the month it starts,
  `data-refresh/YYYY-MM/`. Do not reuse or append to a previous pass's
  directory even if the previous pass is incomplete — copy forward any
  still-pending countries' baselines instead.
- `baseline-<ISO2>.json` in a pass directory is a snapshot of the
  **pre-pass** value for that country (usually copied from the previous
  live `countries.json`, filtered to one country, at the moment the pass
  begins). It exists purely so an agent working on that country can see
  what changed and by how much. It is never edited during the pass and
  never becomes the pass's output.
- `<ISO2>.json` (no `baseline-` prefix) is a pass's finished output for
  that country. It does not exist until the country is fully researched
  and passes gate 1 (§9). A country with no such file is not done, no
  matter what a progress tracker claims elsewhere.
- The `data-refresh/` directory is **tracked in the public repository.**
  It is not scratch space and it is not disposable: the per-country files
  in it (`<ISO2>.json`, one per pass) are the public provenance record for
  every value that ends up in the live dataset. Anyone who clones this
  repository can open a country's evidence file, read the `source_url` and
  `evidence` for any field, and run the mechanical verifier (§9) against it
  themselves without asking anyone's permission or trusting anyone's word.
  That is the strongest available answer to "this number says who?", and it
  is the reason the evidence schema in §5 is as strict as it is — every
  field entry has to survive being checked by a stranger who has never
  spoken to whoever collected it. The only excluded paths are transient
  scratch (`data-refresh/**/*.tmp`) and an internal self-test fixture
  (`data-refresh/_selftest/`); everything else, including every pass's
  `<ISO2>.json` files and `baseline-<ISO2>.json` files, is committed and
  stays in the repository's history permanently. This document,
  `DATA-PROTOCOL.md`, is the durable record of *how* that provenance record
  is produced, kept alongside the provenance record itself.

## 4. The fields

Fourteen fields are re-derived, independently, for every country, every
pass. "Independently" means: read the baseline value to know what changed,
but re-derive the current value from a live source rather than assuming the
baseline unless it's re-confirmed. Anchoring on the old number and only
checking whether it "seems still right" reproduces exactly the kind of
silent staleness this protocol exists to catch.

| Field | Unit / shape | The specific trap |
|---|---|---|
| `population_m` | number, millions | Prefer the national statistics office's own mid-year/most-recent estimate over any aggregator. Aggregators sometimes carry a figure that matches no year in any primary series — that is a sign it was copied from an undated secondary source, not that the country's population is unusual. |
| `gdp_usd_bn` | number, USD billions | State nominal vs. purchasing-power-parity basis explicitly in `change_note`. Watch for currency redenominations (a currency that was replaced or rebased mid-period makes naive year-over-year comparison meaningless). |
| `internet_penetration_pct` | number, percent | **Check the denominator.** A national regulator may compute penetration against its own population estimate, which can differ by tens of millions from the population figure used elsewhere in the same dataset (a real historical case: one country's regulator used a ~217 million base while the dataset's own `population_m` used a ~237 million World Bank figure). When this happens, keep the regulator's published percentage as the value, and document the mismatch and the recomputed alternative figure in `change_note` — do not silently pick one and hide the other. |
| `mobile_penetration_pct` | number, percent | Subscriptions routinely exceed 100% of population where people hold multiple SIM cards. That is a real feature of the market, not a data error — do not "correct" it. |
| `dc_count_total` | integer | Define exactly what is being counted in `change_note` — third-party commercial colocation only? Does it include enterprise, bank, or telco switch sites? No single number is comparable across sources unless the scope is stated, because independent estimates for the same market can differ by a factor of two purely from scope differences. |
| `dc_ai_capable` | integer | Usually **not verifiable**, and that is the correct conclusion, not a failure to research harder. No registry publishes this and there is no industry-agreed definition (installed GPU fleet? liquid-cooling-ready halls? a minimum power-density-per-rack threshold?). Every number in circulation traces back to a vendor press release or a paywalled model. Put this field in `unverified` with a substantive `best_available` list of the individually-verifiable AI-capable deployments you did find. Never invent a plausible integer. |
| `it_load_mw` | number, MW | **MW of IT load, MW of total facility power draw, and MVA of electrical supply capacity are three different quantities and must never be mixed.** IT load is the power actually delivered to compute equipment; total facility power includes cooling and overhead; MVA is an electrical-supply rating, not a delivered-power figure. State which one a source is reporting. Also: **announced ≠ under construction ≠ operational.** A facility's headline MW figure from a press release is frequently a future or planned capacity, not what is live today. If a source does not clearly state a facility is operational, treat its capacity as not yet delivered. |
| `ixp_count` | integer | PeeringDB and the national IXP operator(s) are the sources. PeeringDB's API returns a list of exchange-point records, not a count — counting the list yourself makes the field `estimated: true` even though every underlying record is verified; say so. Watch for a change in counting *definition* (e.g. counting every registered peering location vs. counting distinct exchange-operating organisations) masquerading as growth — the count can jump sharply between passes purely because the previous pass used a narrower definition, with zero new infrastructure built. |
| `submarine_cables` | array of strings | For landlocked countries, there is no landing to report — describe the terrestrial transit route to the nearest coastal landing country/cable system instead of leaving the array empty. An empty array reads as "no connectivity," which is almost never the true state of the world. |
| `cloud_providers` | array of strings | Distinguish a true hyperscaler **region** (a full, generally-available cloud region with its own infrastructure in-country) from an edge point-of-presence / content-delivery cache, and from a local reseller or "partner" offering that is not the hyperscaler's own infrastructure. These get conflated in marketing copy constantly. |
| `dc_operators` | array of strings | Watch for **double-counting after an acquisition** — the same physical facilities can legitimately appear under both the acquired brand and the acquiring operator's name for a transition period (especially in sale-and-leaseback deals, where the seller keeps operating client-facing services from a facility it no longer owns). Both names can be correct simultaneously; state the relationship rather than picking one. Include disclosed capacity per operator where available. |
| `ai_strategy_status` | string | Capture the named policy document, its exact status, and the date of that status. "Drafting" and "adopted" are not interchangeable, and a status can move backwards (a draft can be withdrawn) — a pass that only checks "has this improved" will miss a regression. |
| `key_regulations` | array of strings | Data protection acts, data-localisation rules, and sector licensing regimes, each with an enactment or effective date. A regulation that changed status (draft → gazetted → withdrawn, or amended) needs that whole sequence in `change_note`, not just the latest state. |
| `power_reliability` | string | Describe grid reliability specifically as it affects data-centre operations — outage frequency/duration, any formal load-shedding stage system, and whether large facilities' independent backup power meaningfully insulates them from grid conditions. A national "outages have improved" headline can still coexist with data-centre-specific risk (e.g. rising DC power demand becoming a new grid constraint even as overall reliability improves) — report both if both are true. |

## 5. The output schema

Each country's finished pass output is one JSON file,
`data-refresh/<PASS-ID>/<ISO2>.json`, with this exact shape:

```json
{
  "iso2": "KE",
  "country": "Kenya",
  "refreshed_at": "2026-08-04",
  "agent_notes": "Free text. State how many of the 14 fields were verified, which were not and why. Flag any methodological caveat a reviewer must know before trusting this file — denominator mismatches, definitional ambiguity, currency basis, mixed source quality. Be blunt about weaknesses; do not write marketing copy about your own output.",
  "fields": {
    "population_m": {
      "value": 63.5,
      "unit": "million",
      "reporting_period": "2026 mid-year",
      "source_url": "https://www.statssa.gov.za/?p=19764",
      "source_title": "Population Growth in SA Remains Steady as Fertility Declines",
      "source_publisher": "Statistics South Africa",
      "source_tier": 2,
      "evidence": "population increased from 42,9 million in 2002 to 63,5 million in 2026",
      "retrieved_at": "2026-08-04",
      "confidence": "high",
      "estimated": false,
      "baseline_value": 60.7,
      "changed": true,
      "change_note": "Why the value differs from the baseline, or why it is unchanged despite re-derivation. If estimated is true, show the full arithmetic and its inputs here so a reviewer can reproduce the number by hand."
    }
  },
  "unverified": [
    {
      "field": "dc_ai_capable",
      "reason": "Why no defensible current value exists. Name specifically what was searched for and why what was found did not qualify — do not just say 'could not verify'.",
      "best_available": "Everything that WAS found, individually sourced, that a future researcher could build on. This should be substantial and specific, never a shrug."
    }
  ]
}
```

Notes on the schema, all load-bearing:

- `fields` is a **JSON object keyed by field name** — not an array. Each of
  the 14 field names (§4) appears exactly once across `fields` and
  `unverified` combined, never in both, with one documented exception
  below.
- `evidence` must be a **verbatim substring** copied exactly from the
  source page, including its original number formatting. If a national
  statistics office writes "63,5 million" with a comma as its decimal
  separator, the `evidence` string uses a comma too — the mechanical
  verifier (§9) does an exact (whitespace/quote-normalised) substring match
  and a paraphrase will not pass.
- **`evidence` must be a short excerpt, and nothing more.** Because this
  file is committed to a public repository permanently (§3), whatever goes
  into `evidence` is published to the world forever, not held privately for
  internal review. Copy only the minimum span of text that contains and
  supports the value being claimed — typically one sentence or a short
  data fragment, never a full article, a full page, or a full paywalled
  document. Never paste: credentials or access tokens of any kind; private
  correspondence (emails, direct messages, anything not already public);
  the full text of a paywalled or subscription-gated report (a short
  excerpt sufficient to verify the specific figure is fine — reproducing
  the report is not); or any other content whose licence does not permit
  redistribution of that much of it. This is not just a legal precaution —
  a short, targeted excerpt is also the more useful evidence: it is exactly
  what a reader needs to check the claim, with nothing extraneous to wade
  through, and it keeps the provenance record itself lightweight enough to
  actually get read.
- For the four array-valued fields (`submarine_cables`, `cloud_providers`,
  `dc_operators`, `key_regulations`), replace `baseline_value` / `changed`
  with `changes_vs_baseline`: a small object or string describing exactly
  what was added, removed, renamed, or corrected relative to the baseline,
  so a reviewer can tell real change from mere re-labelling.
- **The one exception to "either `fields` or `unverified`, never both":** if
  a defensible *older* value exists for a field but no *current* one could
  be verified, put the older value in `fields` with its true (older)
  `reporting_period`, **and** add a matching entry in `unverified`
  explaining that no current figure exists and what a current figure would
  need to look like. This lets a reader use the old-but-real number while
  being told plainly not to mistake it for current.
- `source_tier` is an integer 1–4 — see §6.
- `confidence` is exactly one of `"high"`, `"medium"`, `"low"` — see §7.
- `estimated` is `true` when the value was derived by arithmetic or
  counting rather than read directly off a source (e.g. counting API list
  records to get `ixp_count`). When `true`, `change_note` must contain the
  full arithmetic so it is reproducible by hand.
- A field entry with no `source_url` or no `evidence` is malformed by
  construction and must not exist in a finished file — it will be rejected
  by gate 1 (§9).

## 6. Source tier hierarchy

**This section resolves a real conflict between two earlier documents.
Read this before trusting any prior tier number you find elsewhere in this
project.**

An older update protocol (`docs/quarterly-update-protocol.md`) defined a
three-tier hierarchy: tier 1 covers primary/official sources — government
strategy documents, regulatory publications, official operator and
hyperscaler announcements, and company press releases, all lumped together.
Tier 2 is strong secondary research (infrastructure research firms, policy
research organisations, major industry reports). Tier 3 is contextual
journalism and ecosystem summaries.

The actual country data files produced by the current pass (and the
operational brief that produced them) use a **different, four-tier**
scale, under the same field name `source_tier`:

1. The entity disclosing about **itself** — an operator's own site stating
   its own facility capacity, a company's own financial filing.
2. An official **national statistics office or sector regulator** —
   independent of the entity being described.
3. **Multilateral and specialist research bodies** — the World Bank, ITU,
   UN agencies, PeeringDB, TeleGeography, and specialist Africa-focused
   infrastructure research firms.
4. **Trade press and general news.**

These two scales genuinely disagree, not just in granularity: a national
regulator is tier 1 on the three-tier scale (bundled with all "official"
sources) but tier 2 on the four-tier scale (separated out from
self-disclosure). A number tagged tier 1 in a country file produced under
the four-tier scale would be miscategorised as tier 2 if read against the
older three-tier document, and vice versa.

**Canonical decision: use the four-tier scale.** The reason is
epistemological, not a matter of convention: an operator's claim about its
own capacity and an independent regulator's published statistic are
different kinds of evidence, and collapsing them into one "primary/
official" tier hides that difference. An operator has a commercial
incentive to describe its own capacity favourably (announced vs.
operational, IT load vs. total facility power, the traps in §4 are
precisely where this incentive bites); a national regulator publishing
sector-wide statistics does not share that specific incentive in the same
direction. Treating both as equally strong "tier 1" evidence would erase
exactly the distinction that catches announced-vs-operational and
denominator-mismatch errors. The four-tier scale is also the one actually
used to produce the dataset's highest-quality reference files to date, so
adopting it retroactively costs nothing; adopting the three-tier scale
would require re-tagging real, already-verified data.

**What this means operationally, stated plainly:**

- All new field entries, in every future pass, use the four-tier scale
  defined above.
- Three existing country files from the current in-progress pass — the
  ones already completed before this document was written — and the older
  quarterly-update document itself, were written under the three-tier
  reading, or without a documented scale at all. Do not silently
  re-interpret their `source_tier` values against the four-tier scale;
  the numbers were not chosen with that scale in mind and a `2` under the
  old reading is not reliably a `2` under the new one.
- A future pass that touches those pre-existing files (including the
  promotion step that reads them for the live dataset) should re-tier
  each `source_tier` value against the four-tier scale above using the
  same source URL and evidence already on file — this is a re-labelling
  exercise against existing evidence, not new research, and should be
  cheap. Until that re-tiering happens, treat any `source_tier` in a file
  predating this document as unreliable for cross-file comparison and rely
  on the field's own `evidence` and `source_publisher` instead of its
  tier number.
- Tiers 1 through 3 are the acceptance bar for a field to be published in
  `fields`. Tier 4 (trade press/general news) is usable only as
  corroboration alongside a tier 1–3 source, or inside a `best_available`
  write-up in `unverified`, and must be labelled as tier 4 wherever it
  appears so a reader knows its evidentiary weight is lower.

## 7. Confidence levels

Each field entry in `fields` carries `confidence`, one of:

- **`high`** — the value comes from a named primary or near-primary source
  (tier 1–2) that unambiguously states the figure, for the correct
  reporting period, with no material caveat about denominator, definition,
  or currency of the figure.
- **`medium`** — the value is sourced (tier 1–3) but carries some
  qualification: the reporting period lags the pass date by more than
  roughly a year and a half, or the value required combining/adapting
  something the source didn't state outright, or part of the field (e.g.
  one item in an array) is a baseline carry-forward not independently
  re-verified this pass.
- **`low`** — the value is the best available but rests on a source of
  weak standing for this purpose (typically tier 4), on an estimate with
  wide uncertainty, or on a count/definition known to disagree
  substantially with other credible counts for the same thing. A `low`
  confidence value should be treated by any downstream consumer as an
  order-of-magnitude indicator, not a precise figure.

Confidence describes trust in the **value as published**, not effort spent
finding it. A field that took an hour to run down and turned out to have
an unambiguous tier-2 source is `high`; a field found in five minutes with
the same source quality is still `high`.

## 8. Rules learned from failure

These are not theoretical cautions — each corresponds to a real defect
found and corrected in this dataset.

1. **Refusing to publish a value is a valid, often correct, outcome.** When
   the available inputs for a field mix incompatible qualities of evidence
   — for example, per-facility power figures that mix live, under-
   construction, and merely planned capacity, from sources of visibly
   different reliability — do not sum or average them into a plausible-
   looking national total. Explain in `change_note` or `unverified.reason`
   exactly why no defensible number could be constructed, and list the
   individual inputs in `best_available` so a future pass — potentially
   with better source access — can pick the work back up.
2. **A field that cannot be defensibly sourced belongs in `unverified` with
   a substantive `best_available`, never as a plausible invented number.**
   The clearest recurring example is `dc_ai_capable` (§4): there is no
   registry and no agreed definition, so every circulating figure is
   somebody's guess wearing a specific integer. Publishing that integer
   as a fact is worse than admitting it is unknown.
3. **The evidence quote must be literally, verbatim on the source page.**
   Paraphrasing — even an accurate paraphrase — fails the mechanical
   verifier (§9) and, more importantly, defeats the purpose of requiring
   evidence at all: a reader must be able to find your exact string on the
   page without inference.
4. **Check the denominator on every percentage field.** Two fields that
   both look like percentages of "the population" can silently use two
   different population bases (a regulator's own estimate vs. a
   multilateral body's estimate), producing an internally inconsistent
   dataset that looks fine at a glance. Document the mismatch, don't hide
   it by picking one silently.
5. **Announced, under-construction, and operational are three different
   states, and only "operational" counts toward a current capacity
   figure.** This is the most common way a data-centre capacity number
   becomes false: a widely-reported MW figure from a groundbreaking
   announcement gets treated, one refresh cycle later, as if it were
   already delivering that capacity.
6. **Watch for double-counting after acquisitions and sale-and-leaseback
   deals.** The same physical facilities can correctly appear under two
   different operator names simultaneously during a transition — the
   acquirer for infrastructure operations, the seller for client-facing
   services. Don't "clean up" the list by removing one name; describe the
   relationship instead.
7. **A blocked fetch is not evidence of a wrong value.** Many regulator and
   operator websites block automated/scripted requests with a bot-
   detection challenge that still returns an HTTP 200 status. This must be
   detected and reported distinctly from "the quote wasn't found" (§9's
   `net?` status) — it is a fact about the website's defenses, not about
   whether the underlying claim is true. Keep the source and the claimed
   value; flag it for a manual/browser-based check rather than discarding
   it or treating it as failed.
8. **Never present pre-disruption figures as if they describe the present.**
   In any country experiencing an active conflict, severe economic crisis,
   or similar disruption, the most recent *credible* figure may predate
   the disruption by years. State that plainly in `reporting_period` and
   `change_note` — do not let a retrieval date of "today" imply the
   underlying number reflects today's reality. In such countries, a
   country file with many `unverified` entries is the correct, honest
   outcome, not a sign the research was done poorly.
9. **A field's date of retrieval says nothing about the field's
   currency.** Repeating §2 deliberately: this is the single defect this
   whole protocol exists to prevent, and it is worth restating at the
   point where an agent is about to write a field entry and might be
   tempted to skip `reporting_period` or set it equal to `retrieved_at`
   out of convenience.

## 9. Verification

A field is accepted into the live dataset only after clearing both gates
below, in order.

### Gate 1 — mechanical (no judgement required)

Run, from the repository root:

```bash
node data-refresh/verify.mjs <PASS-ID>/<ISO2>.json    # one country
node data-refresh/verify.mjs <PASS-ID>                 # every *.json in that pass directory (baseline-* files are skipped automatically)
```

The script fetches every `source_url` in the file's `fields` object (HTML
pages and PDFs are both supported; PDFs are converted to text before
matching) and checks, with normalised whitespace/quote comparison, that the
`evidence` string is a literal substring of the fetched page's text.

| Status shown | Meaning | What it means for the run |
|---|---|---|
| `ok` | The evidence quote was found on the live page. | Passes gate 1 for that field. |
| `FAIL` | The page loaded successfully but the evidence quote is not on it. | **Reject the field.** The quote was paraphrased, hallucinated, or the source page has changed since retrieval — go back to the source and either find the correct verbatim quote or drop the value. |
| `net?` | The page could not be fetched (HTTP error, timeout, or a bot-detection wall was identified). | Not a failure by itself. Send it to gate 2 for a manual or browser-based check before final sign-off. |
| `????` | The field has no `source_url` or no `evidence` at all. | **Reject the field.** It is unsourced by construction and cannot be fixed by re-running the checker — the file itself needs a value added. |

The script exits with status code `0` only when there are zero `FAIL`
results across the run (an all-`net?`/`ok` run still exits `0`; a run
containing any `????` for a field that should have evidence should be
treated as failing even though the script's exit code does not currently
distinguish `????` from a clean run — check the printed tally, not just the
exit code, before calling a country done).

**Gate 1 cannot tell that a quote is real but irrelevant.** A page can
genuinely contain the exact string being searched for while describing a
different operator, a different country, a different year, or a merely
planned/announced figure being misread as delivered. A clean, all-`ok` gate
1 run is necessary but never sufficient. That is exactly what gate 2 exists
to catch.

### Gate 2 — independent agent audit

Hand the country file, plus the prompt below, to a **capable agentic
research tool that did not produce the file being audited** — ideally one
built differently enough from the collecting tool that it does not share
the same blind spots (a different underlying system, from a different
maker, is the strongest version of this; at minimum, a distinct tool
instance with no memory of collecting the data). The reason this matters is
symmetry of failure modes, not brand loyalty to any tool: an agent auditing
its own prior output is prone to the exact same misreadings, omissions, and
plausible-sounding fabrications it made the first time, because those
errors come from patterns in how it reasons, not from a random one-off
mistake. A structurally different tool is more likely to catch a
"confident but wrong" claim precisely because it does not find the same
things intuitively obvious.

**Prompt to hand to the auditing tool, verbatim:**

> You are auditing a dataset you did not create. Assume it may contain
> errors, including confident-sounding fabrications. Your job is to find
> them, not to confirm the work.
>
> Read the country file at the path you were given. For **each entry** in
> `fields`:
>
> 1. Open `source_url`. Confirm the page exists and is the page the entry
>    claims (matching `source_title`, `source_publisher`).
> 2. Locate the `evidence` quote. Confirm it is verbatim on the page, not
>    paraphrased.
> 3. **Confirm the quote actually supports `value`.** This is the step
>    that matters most. Check specifically that the quote is not about:
>    - a different operator, facility, or country than the one this file
>      is for
>    - a *planned, announced, or under-construction* figure being read as
>      an operational one
>    - a different unit than the field claims (for power figures
>      specifically: MW of IT load vs. MW of total facility power vs. MVA
>      of electrical supply capacity are three different things)
>    - a different reporting period than `reporting_period` claims
> 4. Confirm `reporting_period` describes when the underlying data
>    applies — not when it was retrieved. Conflating those two is the
>    specific defect this whole exercise exists to catch.
> 5. Where `estimated: true`, re-perform the arithmetic given in
>    `change_note` from its stated inputs and confirm it reproduces `value`.
> 6. Independently search for a more recent or more authoritative source
>    that contradicts the value. Absence of a contradiction you can find is
>    itself part of the audit record — say so explicitly rather than
>    silently passing over the check.
>
> Then review the `unverified` array and judge, for each entry, whether the
> field is genuinely unverifiable given what is publicly available, or
> merely under-researched.
>
> Output a verdict per field — `CONFIRMED`, `DISPUTED`, or `UNSUPPORTED` —
> with a one-line reason for each. For anything not `CONFIRMED`, give the
> corrected value and its source. Finish with an overall sign-off
> recommendation for this country file and your confidence in that
> recommendation.
>
> Do not accept a figure because it is plausible. Plausible fabrications
> are the specific failure mode being tested for.

### Sign-off

A country file is confirmed accurate as of its `refreshed_at` date only
when all of the following hold:

- Gate 1 reports zero `FAIL` and zero `????` for that file.
- Gate 2 returns `CONFIRMED` for every entry in `fields`.
- Every `net?` result from gate 1 was individually resolved during gate 2
  (i.e. a human or browser-capable check actually looked at the page and
  confirmed or refuted the claim — `net?` cannot be left permanently
  unresolved and still count as signed off).
- Any `DISPUTED` field from gate 2 was corrected in the file and both gates
  were re-run on the corrected entry.

Record the outcome for the whole pass in `data-refresh/<PASS-ID>/SIGNOFF.md`:
the date, which tool (described by capability/lineage, not named) ran gate
2, the verdict for each country, and any field carried forward into
`unverified` despite the pass's best effort.

## 10. Promotion — turning a verified pass into the live dataset

Promotion is the one step that touches `public/data/countries.json`. Do it
only after every country in the pass has completed sign-off (§9).

Promotion copies specific `value`s out of a pass's evidence files
(`data-refresh/<PASS-ID>/<ISO2>.json`) into the flat per-country objects in
`public/data/countries.json`. It does **not** delete, replace, or supersede
the evidence file it copied from — because `data-refresh/` is tracked and
public (§3), the evidence file stays exactly where it is, permanently
readable, after promotion. This is deliberate: a reader looking at the live
dataset should always be able to trace any field back to the exact evidence
file and the exact `source_url`/`evidence` pair that justified it, at any
point in the future, not just at the moment of promotion. `sources.json`
(step 4 below) is the map that makes that traceback easy without having to
know which pass directory to look in — but the evidence file itself, not
`sources.json`'s summary of it, is the authoritative record.

**Evidence files are append-only in spirit.** Once a country's file for a
given pass has passed sign-off and been promoted, do not go back and edit
its `value`, `evidence`, or any other field in place — even to fix a small
mistake discovered later. Someone may already have read that exact file,
cited a specific value from it, or run the verifier against it and recorded
the result; a silent edit would make their citation describe a file that no
longer says what they cited. Correct a mistake either by running the next
scheduled or out-of-band pass and letting its new `<ISO2>.json` supersede
the old one under its own pass directory (the normal path), or, if a
correction is urgent enough to need to happen outside a full pass, add a
clearly dated correction note to the existing file's `agent_notes` (append
to it, don't overwrite it) and only then change the specific field, leaving
a visible trail of what was wrong and when it was fixed. What must never
happen is a value quietly changing in a file that already exists, with no
trace that a change occurred at all.

Order matters:

1. **Freeze the current live state first, before changing anything.** Copy
   the current `public/data/countries.json` verbatim into
   `public/data/snapshots/<new-snapshot-id>.json`. Then add an entry for it
   to `public/data/snapshots/index.json`, filling in all three date fields
   honestly and distinctly:
   - `frozen_at` — today, the date you are doing this freeze.
   - `data_collected` — when the pass that produced the *values now being
     superseded* was actually run (not today's date — the date of the
     *previous* pass).
   - `reporting_period` — the period those outgoing values actually
     describe, which may be older still than `data_collected`.

   This ordering exists so that the dataset's history is always
   reconstructable: anyone can look at any snapshot and know exactly what
   was live, when it became live, and how current it actually was at the
   time.

2. **Recompute the composite score from the dimension weights**, do not
   carry forward any old `readiness_score` or dimension score. Using the
   rubric in `docs/data-methodology.md` (weights: compute 25%, connectivity
   25%, power 20%, policy 15%, ecosystem 15%):

   ```
   readiness_score = round(
     compute      × 0.25 +
     connectivity × 0.25 +
     power        × 0.20 +
     policy       × 0.15 +
     ecosystem    × 0.15
   )
   ```

   and re-derive each dimension score from the refreshed field values
   against the score bands in `docs/data-methodology.md` (compute score
   bands keyed to `dc_ai_capable` count and hyperscaler region depth;
   connectivity computed from `cable_score + ixp_score + latency_score`
   with the landlocked-country handling described there; power score bands
   keyed to outage hours/day; policy score bands keyed to data-protection-
   law-and-AI-strategy combinations; ecosystem score bands keyed to VC/hub
   maturity). Then re-derive the tier from the score:

   | Tier | Score |
   |---|---|
   | Viable | ≥ 60 |
   | Emerging | 40–59 |
   | Emerging (Early) | < 40 |

3. **Write the new values into `public/data/countries.json`**, one country
   object per the existing schema in that file (region, coordinates, the
   14 refreshed fields, the five dimension scores, `readiness_score`, tier,
   and the narrative fields — `dc_pipeline`, `ai_compute_availability`,
   `cloud_maturity`, `connectivity_role`, `ops_friction`,
   `data_residency_constraint`, `primary_inference_route`,
   `est_rtt_to_europe_ms`, `founder_insight`, and the policy-posture fields
   `ai_policy_signal`, `ai_data_governance_posture`,
   `ai_compute_policy_commitment`, `cross_border_ai_alignment`). Any
   narrative field not directly covered by the 14 tracked fields (e.g.
   `founder_insight`) should be rewritten only when the underlying facts
   that field describes actually changed — do not rewrite prose purely to
   sound fresher; a rewrite with no factual change reduces trust rather
   than adding it.

4. **Update `public/data/sources.json`** with the new primary sources and
   confidence notes for every country whose data changed, before or in the
   same commit as the `countries.json` change — a country's sources file
   must never describe a set of sources that don't match what's actually
   in the live dataset for that country.

5. **Update `public/data/snapshots/index.json`'s live-dataset pointer /
   metadata** if it tracks the current version, so that the manifest is
   never out of sync with what `countries.json` actually holds.

**What must never happen:**

- **Never edit a snapshot file in place.** A snapshot is a frozen,
  read-only historical record. If a mistake is discovered in a snapshot
  after the fact, add a note about the mistake somewhere visible (e.g. the
  snapshot's own entry in `index.json`, or a follow-up snapshot) — do not
  rewrite the frozen values, because the entire point of a snapshot is that
  it did not change after it was taken.
- **Never backfill history.** Do not create a snapshot dated in the past to
  fill a gap, and do not retroactively insert a `reporting_period` value
  into an already-published snapshot to make it look more current than it
  was. The record of what was known and published at each point in time is
  itself valuable and must stay accurate, including its gaps and mistakes.

## 11. Cadence and orchestration

**Cadence.** A full pass — re-deriving all 14 fields for all 30 countries —
should run at least quarterly, and immediately (as an out-of-band, single-
country patch, not a full pass) whenever a specific, named event makes a
country's data stale before the next scheduled pass: a new data-centre
opening, a hyperscaler region launch, a national AI strategy moving between
draft/adopted/withdrawn, a new submarine cable entering service, or a major
grid-reliability shift. A full annual pass should additionally recalibrate
the scoring bands themselves against updated reference sources (the
multilateral/statistical sources listed in `docs/data-methodology.md`),
since the bands, not just the field values, can go stale.

**Concurrency.** Countries share no state with each other during research —
one file each, no cross-country dependencies — so they can be worked in
parallel. A concurrency cap somewhere in the range of a handful to roughly
twenty simultaneous country tasks balances throughput against the practical
limits of supervising that many in-flight tasks at once; the appropriate
number depends on how much attention the orchestrating operator or agent
can actually give to catching stalls (see below) before it becomes the
bottleneck, not on any hard technical ceiling.

**The stall problem.** Any individual country task can stop making
progress without failing outright — it can sit fetching pages, retrying, or
reasoning indefinitely with no output. Treat a country task as stalled if
it has produced no observable progress (no new field entries, no updated
notes) for a fixed watchdog window (roughly ten minutes is a reasonable
default). When a task stalls: kill it and relaunch it with an explicit
instruction to write the file even if some fields end up unverified. **A
partial file beats no file.** A stalled task that is eventually killed
without ever having written anything loses all of its work, whereas a
partial file with some fields sourced and the rest honestly placed in
`unverified` is immediately useful and cheap to finish in a follow-up pass.

**A country is only "done" once its file exists on disk and passes gate 1.**
Not when a task reports itself finished, not when a supervising process
believes it launched successfully. File-on-disk is the only durable signal,
because any in-flight process — the research task, the orchestrating
session supervising it, or the machine running either — can be interrupted
or terminated at any moment with no warning and no chance to report status
on the way out. This actually happened during this dataset's own production:
one orchestrating session ended abruptly with nineteen country tasks
believed to be "in flight," and only one of those nineteen had actually
written a file; the other eighteen produced nothing recoverable, and the
progress tracker that had listed them as "running" turned out to have been
wrong from the moment the session dropped, not just at the moment someone
next looked at it.

**Update the queue tracker continuously, not in a batch at the end.** The
directory's `QUEUE.md` (or equivalent progress record) file is the
handoff document for whatever picks up the pass next — another orchestrating
session, another operator, or a human. Move a country from pending to done
the moment its file lands and passes gate 1, and record any incident
(a stall, a relaunch, a country deliberately left partially unverified)
as it happens. Because the orchestrating process itself can die at any
moment with no warning, any progress recorded only in memory or only at
the end of a batch is progress that can vanish entirely and unrecoverably.
Treat the tracker file as the single source of truth for "what is actually
done," ahead of any status any process reports about itself.

## 12. Open questions

These are genuinely unresolved. Do not guess an answer and proceed as if it
were settled — pick a defensible position, document the choice made, and
flag it here (or in the pass's own notes) for the next pass to revisit.

1. **The `source_tier` re-tiering described in §6 has not actually been
   performed.** As of this document's writing, the small number of country
   files completed under the three-tier-or-undocumented reading still carry
   their original tier numbers. Until someone re-tiers them against the
   four-tier scale using their existing evidence, any tooling or analysis
   that aggregates or filters on `source_tier` across the whole dataset
   will be comparing numbers on two different scales without knowing it.
2. **`dc_count_total`'s scope is not fixed dataset-wide.** §4 and §8 note
   that independent counts for the same market can differ by roughly a
   factor of two purely from differing scope (all colocation facilities?
   only ones above a size threshold? including enterprise/telco/bank
   sites?). No single scope definition has been chosen as the dataset's
   standard, so cross-country comparisons on this field are currently
   comparing differently-scoped numbers. A future pass should either fix
   one scope definition dataset-wide, or add a companion field recording
   which scope each country's number uses.
3. **Gate 1's exit code does not distinguish a `????` result from a clean
   run.** §9 notes this: the verifier script exits `0` whenever there are
   zero `FAIL` results, even if some fields have no `source_url`/`evidence`
   at all (`????`). Anyone automating sign-off purely on exit code, rather
   than reading the printed tally, could wrongly treat an unsourced field
   as passing. This is a real gap in the mechanical tooling, not just a
   documentation nuance, and would be worth fixing in the verifier itself.
4. **No fixed rule exists yet for how many past passes' worth of prior
   sources must be independently re-verified vs. carried forward.** Some
   array-valued fields in past passes carried a mix of "one item freshly
   re-verified this pass, the rest carried forward from an earlier pass
   without independent re-checking" (documented per-field via `confidence:
   medium` when this happens). Whether every array item must be
   independently re-verified every single pass, or whether carrying
   forward unchanged items with periodic (rather than every-pass)
   re-verification is acceptable, has not been decided as a standing rule.
5. **The relationship between this protocol's per-country `<PASS-ID>/`
   working files and any future automated CI check has not been designed.**
   Nothing currently runs gate 1 automatically on a schedule or on a pull
   request; a pass is presently an entirely manually-triggered effort.
   Whether that should change, and if so how, is open.

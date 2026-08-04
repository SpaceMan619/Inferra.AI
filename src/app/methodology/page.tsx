import Link from "next/link";
import type { Metadata } from "next";
import Reveal from "@/components/methodology/Reveal";
import {
  DIMENSION_ICONS,
  MeasureIcon,
  BandsIcon,
  TiersIcon,
  SourceIcon,
  VerifyIcon,
  LimitsIcon,
} from "@/components/methodology/icons";
import {
  DIMENSIONS,
  READINESS_TIERS,
  SOURCE_TIERS,
  CONFIDENCE_LEVELS,
  DATE_SEMANTICS,
} from "@/lib/methodology";

export const metadata: Metadata = {
  title: "Methodology — Inferra AI",
  description:
    "How Inferra AI scores AI infrastructure readiness across Africa: what we measure, where every number comes from, and how each one is verified.",
};

/* Tiers are a progression, so colour carries the meaning: full lime for a
   market you can deploy in today, a paler wash for one on its way, an outline
   for one that isn't there yet. */
const TIER_TONE: Record<string, { box: string; meta: string; body: string }> = {
  Viable: { box: "bg-[#cef79e]", meta: "text-[#3f5730]", body: "text-[#3f5730]" },
  Emerging: { box: "bg-[#e2ecdd]", meta: "text-[#4a6050]", body: "text-[#42574a]" },
  "Emerging (Early)": {
    box: "border border-[#222f30]/18 bg-transparent",
    meta: "text-[#445e5f]",
    body: "text-[#445e5f]",
  },
};

const GITHUB_PROTOCOL =
  "https://github.com/SpaceMan619/Inferra.AI/blob/main/DATA-PROTOCOL.md";

/* Sections are numbered because they are a sequence: this is the order a
   value actually travels: measured, banded, tiered, sourced, verified. */
function SectionHead({
  n,
  title,
  lead,
  icon,
}: {
  n: string;
  title: string;
  lead: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="max-w-[62ch]">
      <span className="flex items-center gap-3 font-mono text-[11px] tracking-[0.18em] text-[#445e5f]">
        <span className="text-[#222f30]">{icon}</span>
        {n}
      </span>
      <h2 className="mt-3 text-[clamp(26px,3.4vw,38px)] font-medium leading-[1.1] tracking-[-0.02em]">
        {title}
      </h2>
      <p className="mt-4 text-[16px] leading-[1.6] text-[#445e5f]">{lead}</p>
    </div>
  );
}

export default function MethodologyPage() {
  return (
    <main className="bg-[#f7f7f5] text-[#222f30]">
      {/* ── Masthead ─────────────────────────────── */}
      <header className="mx-auto max-w-[1100px] px-[clamp(20px,5vw,50px)] pt-[clamp(48px,8vw,96px)]">
        <Link
          href="/"
          className="font-mono text-[11px] tracking-[0.14em] text-[#445e5f] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4f46e5]"
        >
          ← INFERRA AI
        </Link>

        <h1 className="mt-10 max-w-[16ch] text-[clamp(40px,7vw,76px)] font-light leading-[1.02] tracking-[-0.035em]">
          How we know
          <br />
          what we publish.
        </h1>

        <p className="mt-8 max-w-[52ch] text-[clamp(17px,1.6vw,20px)] font-light leading-[1.55] text-[#445e5f]">
          Every number here carries its source, the wording that supports it,
          and the period it describes. This page is how to check us.
        </p>
      </header>

      {/* ── Signature: one receipt, one refusal ──── */}
      <section className="mx-auto mt-[clamp(56px,8vw,104px)] max-w-[1100px] px-[clamp(20px,5vw,50px)]">
        <div className="grid gap-4 lg:grid-cols-2">
          {/* The receipt */}
          <article className="flex flex-col bg-[#cef79e] p-8 sm:p-10">
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#3f5730]">
              A NUMBER, SHOWN IN FULL
            </span>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-[clamp(44px,6vw,64px)] font-light leading-none tracking-[-0.04em] tabular-nums">
                63.5
              </span>
              <span className="text-[15px] text-[#3f5730]">
                million · South Africa
              </span>
            </div>

            <blockquote className="mt-8 border-l border-[#222f30]/25 pl-4 text-[15px] leading-[1.6]">
              “population increased from 42,9 million in 2002 to 63,5 million in
              2026”
            </blockquote>

            <dl className="mt-8 space-y-2 font-mono text-[11.5px] leading-[1.5] text-[#3f5730]">
              <div className="flex gap-3">
                <dt className="w-[104px] shrink-0">source</dt>
                <dd>Statistics South Africa, Mid-Year Estimates</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-[104px] shrink-0">describes</dt>
                <dd>mid-2026</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-[104px] shrink-0">read on</dt>
                <dd>2026-08-04</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-[104px] shrink-0">replaced</dt>
                <dd>60.7, a 2022 figure we&rsquo;d been carrying as current</dd>
              </div>
            </dl>

            <p className="mt-auto pt-8 text-[14px] leading-[1.6] text-[#3f5730]">
              The period a number describes and the day we read it are two
              different dates. Confusing them is how a dataset goes quietly
              wrong.
            </p>
          </article>

          {/* The refusal */}
          <article className="flex flex-col bg-[#222f30] p-8 text-[#f7f7f5] sm:p-10">
            <span className="font-mono text-[10px] tracking-[0.16em] text-[#9aa7a7]">
              A NUMBER WE DIDN&rsquo;T PUBLISH
            </span>

            <div className="mt-8 flex items-baseline gap-3">
              <span className="text-[clamp(44px,6vw,64px)] font-light leading-none tracking-[-0.04em] text-[#9aa7a7]">
                —
              </span>
              <span className="text-[15px] text-[#9aa7a7]">
                AI-capable facilities · South Africa
              </span>
            </div>

            <p className="mt-8 text-[15px] leading-[1.6]">
              Nobody publishes this count, and there&rsquo;s no shared
              definition of what qualifies. We couldn&rsquo;t reproduce our own
              previous value of 8 from any source.
            </p>

            <p className="mt-5 text-[15px] leading-[1.6] text-[#9aa7a7]">
              So it ships as unverified, with the deployments we could confirm
              listed instead.
            </p>

            <p className="mt-auto pt-8 text-[14px] leading-[1.6] text-[#9aa7a7]">
              A gap you can see beats a number you can&rsquo;t check.
            </p>
          </article>
        </div>
      </section>

      {/* ── 01 What we measure ───────────────────── */}
      <section className="mx-auto mt-[clamp(72px,11vw,140px)] max-w-[1100px] px-[clamp(20px,5vw,50px)]">
        <Reveal>
          <SectionHead
          icon={<MeasureIcon size={20} />}
          n="01 / WHAT WE MEASURE"
          title="Five dimensions, weighted"
          lead="Compute and connectivity weigh most, because they decide whether inference can run at all; policy and ecosystem decide whether it's practical to operate there."
          />
        </Reveal>

        <Reveal stagger>
          <ul className="mt-12 border-t border-[#222f30]/12">
            {DIMENSIONS.map((d) => (
              <li
                key={d.key}
                className="grid grid-cols-[auto_1fr] items-start gap-x-6 gap-y-3 border-b border-[#222f30]/12 py-7 sm:grid-cols-[132px_1fr_auto] sm:gap-x-10"
              >
                <span className="flex items-center gap-3 text-[19px] font-medium tracking-[-0.01em]">
                  {DIMENSION_ICONS[d.key]({ size: 20 })}
                  {d.label}
                </span>
                <p className="col-span-2 max-w-[64ch] text-[15px] leading-[1.6] text-[#445e5f] sm:col-span-1">
                  {d.summary}
                </p>
                <div className="col-span-2 flex items-center gap-4 sm:col-span-1 sm:w-[168px]">
                  <span
                    aria-hidden
                    className="h-[6px] flex-1 bg-[#222f30]/10"
                  >
                    <span
                      className="block h-full bg-[#222f30]"
                      style={{ width: `${d.weight * 100 * 4}%`, maxWidth: "100%" }}
                    />
                  </span>
                  <span className="font-mono text-[13px] tabular-nums">
                    {Math.round(d.weight * 100)}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <p className="mt-8 max-w-[58ch] text-[14px] leading-[1.6] text-[#445e5f]">
          An analyst assigns the scores using the bands below. A test recomputes
          the composite for every country on every build, so the weighting shown
          here is the one the data follows.
        </p>
      </section>

      {/* ── 02 Bands ─────────────────────────────── */}
      <section className="mx-auto mt-[clamp(72px,11vw,140px)] max-w-[1100px] px-[clamp(20px,5vw,50px)]">
        <Reveal>
          <SectionHead
          icon={<BandsIcon size={20} />}
          n="02 / HOW A SCORE IS ASSIGNED"
          title="What each band means"
          lead="Every dimension runs 0–100 against fixed criteria, published in full so you can argue with a specific judgement rather than the number in general."
          />
        </Reveal>

        <Reveal stagger>
          <div className="mt-12 space-y-10">
            {DIMENSIONS.map((d) => (
              <div key={d.key}>
                <h3 className="flex items-center gap-3 text-[17px] font-medium">
                  <span className="text-[#445e5f]">
                    {DIMENSION_ICONS[d.key]({ size: 18 })}
                  </span>
                  {d.label}
                  <span className="font-mono text-[12px] font-normal text-[#445e5f]">
                    {Math.round(d.weight * 100)}% of composite
                  </span>
                </h3>
                <dl className="mt-4 border-t border-[#222f30]/12">
                  {d.bands.map((b) => (
                    <div
                      key={`${d.key}-${b.min}`}
                      className="flex flex-col gap-1 border-b border-[#222f30]/12 py-3 sm:flex-row sm:gap-8"
                    >
                      <dt className="w-[76px] shrink-0 font-mono text-[13px] tabular-nums text-[#445e5f]">
                        {b.min}–{b.max}
                      </dt>
                      <dd className="max-w-[70ch] text-[14.5px] leading-[1.55]">
                        {b.criteria}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 03 Tiers ─────────────────────────────── */}
      <section className="mx-auto mt-[clamp(72px,11vw,140px)] max-w-[1100px] px-[clamp(20px,5vw,50px)]">
        <Reveal>
          <SectionHead
          icon={<TiersIcon size={20} />}
          n="03 / TIERS"
          title="What the composite means in practice"
          lead="One question: can you run inference here today, or not yet."
          />
        </Reveal>

        <Reveal stagger>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {READINESS_TIERS.map((t) => (
              <div key={t.label} className={`p-7 ${TIER_TONE[t.label].box}`}>
                <span className={`font-mono text-[12px] tabular-nums ${TIER_TONE[t.label].meta}`}>
                  {t.min}–{t.max}
                </span>
                <h3 className="mt-3 text-[20px] font-medium tracking-[-0.01em]">
                  {t.label}
                </h3>
                <p className={`mt-3 text-[14.5px] leading-[1.6] ${TIER_TONE[t.label].body}`}>
                  {t.meaning}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── 04 Sources ───────────────────────────── */}
      <section className="mx-auto mt-[clamp(72px,11vw,140px)] max-w-[1100px] px-[clamp(20px,5vw,50px)]">
        <Reveal>
          <SectionHead
          icon={<SourceIcon size={20} />}
          n="04 / WHERE THE NUMBERS COME FROM"
          title="Not all sources are equal"
          lead="An operator describing its own capacity and a regulator publishing statistics are different kinds of evidence. Keeping them apart is what catches a planned facility reported as a running one."
          />
        </Reveal>

        <Reveal stagger>
          <ol className="mt-12 border-t border-[#222f30]/12">
            {SOURCE_TIERS.map((s) => (
              <li
                key={s.tier}
                className="grid gap-x-8 gap-y-2 border-b border-[#222f30]/12 py-6 sm:grid-cols-[40px_200px_1fr]"
              >
                <span className="font-mono text-[13px] tabular-nums text-[#445e5f]">
                  0{s.tier}
                </span>
                <span className="text-[16px] font-medium">{s.label}</span>
                <div className="max-w-[62ch]">
                  <p className="text-[14.5px] leading-[1.6]">{s.description}</p>
                  <p className="mt-1.5 text-[13px] leading-[1.5] text-[#445e5f]">
                    {s.examples}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="text-[16px] font-medium">Confidence</h3>
            <dl className="mt-4 space-y-3">
              {CONFIDENCE_LEVELS.map((c) => (
                <div key={c.level}>
                  <dt className="font-mono text-[12px] uppercase tracking-[0.1em] text-[#445e5f]">
                    {c.level}
                  </dt>
                  <dd className="mt-1 max-w-[46ch] text-[14.5px] leading-[1.55]">
                    {c.meaning}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          <div>
            <h3 className="text-[16px] font-medium">Three dates, kept apart</h3>
            <dl className="mt-4 space-y-3">
              {DATE_SEMANTICS.map((d) => (
                <div key={d.field}>
                  <dt className="font-mono text-[12px] text-[#445e5f]">
                    {d.field}
                  </dt>
                  <dd className="mt-1 max-w-[46ch] text-[14.5px] leading-[1.55]">
                    {d.meaning}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── 05 Verification ──────────────────────── */}
      <section className="mx-auto mt-[clamp(72px,11vw,140px)] max-w-[1100px] px-[clamp(20px,5vw,50px)]">
        <Reveal>
          <SectionHead
          icon={<VerifyIcon size={20} />}
          n="05 / HOW WE CHECK"
          title="Two gates, and neither is us saying so"
          lead="Collecting a number and confirming it are separate jobs, done separately on purpose."
          />
        </Reveal>

        <Reveal stagger>
          <div className="mt-12 grid gap-4 lg:grid-cols-2">
            <div className="bg-[#445e5f] p-8 text-[#f7f7f5] sm:p-10">
              <span className="font-mono text-[11px] tracking-[0.14em] text-[#cef79e]">
                GATE ONE / MECHANICAL
              </span>
              <h3 className="mt-4 text-[20px] font-medium tracking-[-0.01em]">
                The quote has to be on the page
              </h3>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.6]">
                A script re-fetches every source and checks the quote is really
                there. Paraphrased or invented citations fail automatically. You
                can run it yourself; the evidence files are public.
              </p>
            </div>
  
            <div className="bg-[#445e5f] p-8 text-[#f7f7f5] sm:p-10">
              <span className="font-mono text-[11px] tracking-[0.14em] text-[#cef79e]">
                GATE TWO / INDEPENDENT REVIEW
              </span>
              <h3 className="mt-4 text-[20px] font-medium tracking-[-0.01em]">
                Someone else has to agree it supports the claim
              </h3>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-[1.6]">
                A quote can be real and still not support the number: wrong
                operator, wrong year, a projection read as fact. A second
                reviewer, never the one who collected it, checks each value
                against its evidence.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ── Limits ───────────────────────────────── */}
      <section className="mx-auto mt-[clamp(72px,11vw,140px)] max-w-[1100px] px-[clamp(20px,5vw,50px)] pb-[clamp(64px,10vw,128px)]">
        <Reveal>
          <SectionHead
          icon={<LimitsIcon size={20} />}
          n="06 / LIMITS"
          title="What this dataset is not"
          lead="Stated here rather than discovered later."
          />
        </Reveal>

        <ul className="mt-10 max-w-[62ch] space-y-5 text-[15px] leading-[1.65]">
          <li className="border-l-2 border-[#222f30]/15 pl-5">
            Coverage is expanding toward the whole continent. The live dataset
            is always the authority on which markets are in.
          </li>
          <li className="border-l-2 border-[#222f30]/15 pl-5">
            Scores are analyst judgements. Two careful people could differ by a
            few points, which is why the criteria and the evidence are both public.
          </li>
          <li className="border-l-2 border-[#222f30]/15 pl-5">
            Some fields can&rsquo;t be sourced to our standard. Those ship
            marked unverified, with the reasoning attached.
          </li>
          <li className="border-l-2 border-[#222f30]/15 pl-5">
            None of this is investment advice.
          </li>
        </ul>

        <div className="mt-16 border-t border-[#222f30]/12 pt-8">
          <p className="max-w-[52ch] text-[15px] leading-[1.6] text-[#445e5f]">
            The whole protocol is public: schema, source rules, both gates, and
            how a pass becomes the live dataset.
          </p>
          <a
            href={GITHUB_PROTOCOL}
            className="mt-5 inline-block border-b border-[#222f30] pb-0.5 text-[16px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4f46e5]"
          >
            Read the data protocol
          </a>
        </div>
      </section>
    </main>
  );
}

"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type {
  BriefInputs,
  Constraint,
  Persona,
  Priority,
  Region,
  RouteTolerance,
  SovereigntySlider,
  Workload,
} from "./advisorTypes";
import { BLANK_INPUTS } from "./advisorTypes";

const ACCENT = "#22c55e";
const TOTAL_STEPS = 8;

interface Props {
  onComplete: (inputs: BriefInputs) => void;
  onCancel: () => void;
}

// ── Step data ──────────────────────────────────────────────────────────────

const PERSONAS: { id: Persona; label: string; desc: string; icon: string }[] = [
  { id: "founder", label: "Founder / Builder", desc: "Building a product or SaaS on top of AI infrastructure", icon: "◎" },
  { id: "operator", label: "Operator / Infrastructure", desc: "Running or architecting AI compute and networking systems", icon: "◇" },
  { id: "policy", label: "Policy / Public Sector", desc: "Advising on or deploying government or regulatory AI systems", icon: "◈" },
  { id: "research", label: "Research / Strategy", desc: "Evaluating markets for investment, academic, or advisory work", icon: "◉" },
];

const WORKLOADS: { id: Workload; label: string; desc: string }[] = [
  { id: "startup", label: "Startup product / SaaS", desc: "Moving fast, lean infra, product-market fit" },
  { id: "enterprise", label: "Enterprise AI system", desc: "Compliance, scale, procurement cycles" },
  { id: "government", label: "Government deployment", desc: "Public sector, sovereign requirements" },
  { id: "research", label: "Research deployment", desc: "Academic, R&D, experimental workloads" },
  { id: "sovereign", label: "Sovereign AI initiative", desc: "National AI strategy, state infrastructure" },
  { id: "exploration", label: "General exploration", desc: "Evaluating options, no fixed workload yet" },
];

const REGIONS: { id: Region; label: string }[] = [
  { id: "East Africa", label: "East Africa" },
  { id: "West Africa", label: "West Africa" },
  { id: "North Africa", label: "North Africa" },
  { id: "Southern Africa", label: "Southern Africa" },
  { id: "Central Africa", label: "Central Africa" },
  { id: "Pan-African", label: "Pan-African" },
  { id: "Global but Africa-focused", label: "Global / Africa-focused" },
];

const PRIORITIES: Priority[] = [
  "Low latency",
  "Local data residency",
  "Strong policy clarity",
  "Access to compute",
  "Low ops friction",
  "Fastest path to launch",
  "Regional scalability",
  "Ecosystem strength",
  "Institutional trust",
];

const CONSTRAINTS: { id: Constraint; label: string }[] = [
  { id: "Data must stay in-country", label: "Data must stay in-country" },
  { id: "Sensitive or regulated data", label: "Sensitive or regulated data" },
  { id: "Need enterprise or government trust", label: "Need enterprise / government trust" },
  { id: "Low budget", label: "Low budget" },
  { id: "No in-house infra team", label: "No in-house infra team" },
  { id: "Need local partners", label: "Need local partners" },
  { id: "Need GPU access soon", label: "Need GPU access soon" },
  { id: "Need cross-border scalability", label: "Need cross-border scalability" },
];

const ROUTE_OPTIONS: { id: RouteTolerance; label: string; desc: string }[] = [
  { id: "Yes, that is fine", label: "Yes, fine", desc: "Data can route through cloud or regional PoPs" },
  { id: "Only temporarily", label: "Only temporarily", desc: "Acceptable short-term but needs local infra eventually" },
  { id: "No, it needs to be local", label: "No — must be local", desc: "All inference must happen in-country" },
  { id: "Not sure", label: "Not sure yet", desc: "Still evaluating requirements" },
];

const STEP_META = [
  { title: "Who are you?", sub: "Choose the role that best describes your perspective." },
  { title: "What are you deploying?", sub: "Select the workload type closest to your use case." },
  { title: "Which regions matter?", sub: "Select all target regions. Leave blank for pan-African." },
  { title: "Describe your project", sub: "Optional — helps personalise the strategy summary." },
  { title: "Your top priorities", sub: "Click to rank up to 3 priorities in order of importance." },
  { title: "Hard constraints", sub: "Select any dealbreakers or must-haves for your deployment." },
  { title: "Data routing preference", sub: "Is it acceptable for inference to happen outside your target country?" },
  { title: "Speed vs. sovereignty", sub: "Where do you sit on the deployment philosophy spectrum?" },
];

// ── Sub-components ─────────────────────────────────────────────────────────

function OptionCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left rounded-2xl p-4 transition-all duration-200 border"
      style={{
        backgroundColor: selected ? `${ACCENT}10` : "#fff",
        borderColor: selected ? ACCENT : "rgba(34,47,48,0.1)",
        boxShadow: selected ? `0 0 0 1.5px ${ACCENT}` : "none",
      }}
    >
      {children}
    </button>
  );
}

function Chip({
  selected,
  onClick,
  label,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 border"
      style={{
        backgroundColor: selected ? `${ACCENT}12` : "#fff",
        borderColor: selected ? ACCENT : "rgba(34,47,48,0.12)",
        color: selected ? "#166534" : "rgba(34,47,48,0.7)",
        boxShadow: selected ? `0 0 0 1px ${ACCENT}` : "none",
      }}
    >
      {label}
    </button>
  );
}

// ── Step renderers ─────────────────────────────────────────────────────────

function Step1({ inputs, setInputs }: { inputs: BriefInputs; setInputs: React.Dispatch<React.SetStateAction<BriefInputs>> }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {PERSONAS.map((p) => (
        <OptionCard
          key={p.id}
          selected={inputs.persona === p.id}
          onClick={() => setInputs((prev) => ({ ...prev, persona: p.id }))}
        >
          <span className="text-[18px] block mb-2">{p.icon}</span>
          <p className="text-[13px] font-semibold mb-0.5" style={{ color: "#222f30" }}>{p.label}</p>
          <p className="text-[12px] font-light leading-relaxed" style={{ color: "rgba(34,47,48,0.55)" }}>{p.desc}</p>
        </OptionCard>
      ))}
    </div>
  );
}

function Step2({ inputs, setInputs }: { inputs: BriefInputs; setInputs: React.Dispatch<React.SetStateAction<BriefInputs>> }) {
  return (
    <div className="flex flex-col gap-2">
      {WORKLOADS.map((w) => (
        <OptionCard
          key={w.id}
          selected={inputs.workload === w.id}
          onClick={() => setInputs((prev) => ({ ...prev, workload: w.id }))}
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[13px] font-semibold" style={{ color: "#222f30" }}>{w.label}</p>
              <p className="text-[12px] font-light mt-0.5" style={{ color: "rgba(34,47,48,0.55)" }}>{w.desc}</p>
            </div>
            {inputs.workload === w.id && (
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            )}
          </div>
        </OptionCard>
      ))}
    </div>
  );
}

function Step3({ inputs, setInputs }: { inputs: BriefInputs; setInputs: React.Dispatch<React.SetStateAction<BriefInputs>> }) {
  function toggle(r: Region) {
    setInputs((prev) => {
      const has = prev.regions.includes(r);
      return { ...prev, regions: has ? prev.regions.filter((x) => x !== r) : [...prev.regions, r] };
    });
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {REGIONS.map((r) => (
          <Chip
            key={r.id}
            selected={inputs.regions.includes(r.id)}
            onClick={() => toggle(r.id)}
            label={r.label}
          />
        ))}
      </div>
      <p className="text-[11px] mt-3 font-light" style={{ color: "rgba(34,47,48,0.4)" }}>
        Leave blank to include all markets across Africa.
      </p>
    </div>
  );
}

function Step4({ inputs, setInputs }: { inputs: BriefInputs; setInputs: React.Dispatch<React.SetStateAction<BriefInputs>> }) {
  return (
    <div>
      <textarea
        value={inputs.projectDescription}
        onChange={(e) => setInputs((prev) => ({ ...prev, projectDescription: e.target.value }))}
        placeholder="e.g. An AI-powered medical records platform targeting Kenyan and Nigerian hospitals…"
        rows={4}
        className="w-full rounded-2xl px-4 py-3 text-[13px] resize-none outline-none transition-all duration-200"
        style={{
          backgroundColor: "#fff",
          border: "1px solid rgba(34,47,48,0.12)",
          color: "#222f30",
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = ACCENT; e.currentTarget.style.boxShadow = `0 0 0 1.5px ${ACCENT}`; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(34,47,48,0.12)"; e.currentTarget.style.boxShadow = "none"; }}
      />
      <p className="text-[11px] mt-2 font-light" style={{ color: "rgba(34,47,48,0.4)" }}>
        This is optional. If provided, it personalises the strategy summary in your brief.
      </p>
    </div>
  );
}

function Step5({ inputs, setInputs }: { inputs: BriefInputs; setInputs: React.Dispatch<React.SetStateAction<BriefInputs>> }) {
  const ranked = inputs.rankedPriorities;

  function handleClick(p: Priority) {
    const existing = ranked.find((r) => r.priority === p);
    if (existing) {
      // Deselect — remove and re-rank remaining
      const filtered = ranked.filter((r) => r.priority !== p);
      setInputs((prev) => ({
        ...prev,
        rankedPriorities: filtered.map((r, i) => ({ ...r, rank: (i + 1) as 1 | 2 | 3 })),
      }));
    } else if (ranked.length < 3) {
      const nextRank = (ranked.length + 1) as 1 | 2 | 3;
      setInputs((prev) => ({
        ...prev,
        rankedPriorities: [...prev.rankedPriorities, { priority: p, rank: nextRank }],
      }));
    }
  }

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-4">
        {PRIORITIES.map((p) => {
          const entry = ranked.find((r) => r.priority === p);
          const isSelected = !!entry;
          const isDisabled = !isSelected && ranked.length >= 3;
          return (
            <button
              key={p}
              onClick={() => !isDisabled && handleClick(p)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12px] font-medium transition-all duration-150 border"
              style={{
                backgroundColor: isSelected ? `${ACCENT}12` : "#fff",
                borderColor: isSelected ? ACCENT : "rgba(34,47,48,0.12)",
                color: isDisabled ? "rgba(34,47,48,0.3)" : isSelected ? "#166534" : "rgba(34,47,48,0.7)",
                boxShadow: isSelected ? `0 0 0 1px ${ACCENT}` : "none",
                cursor: isDisabled ? "not-allowed" : "pointer",
                opacity: isDisabled ? 0.5 : 1,
              }}
            >
              {isSelected && (
                <span
                  className="w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0"
                  style={{ backgroundColor: ACCENT, color: "#fff" }}
                >
                  {entry.rank}
                </span>
              )}
              {p}
            </button>
          );
        })}
      </div>

      {ranked.length > 0 && (
        <div className="rounded-2xl p-3 flex flex-col gap-1.5" style={{ backgroundColor: "#f0fdf4", border: `1px solid ${ACCENT}30` }}>
          {ranked.map((r) => (
            <div key={r.priority} className="flex items-center gap-2 text-[12px]">
              <span
                className="w-5 h-5 rounded-full flex items-center justify-center font-bold flex-shrink-0 text-[10px]"
                style={{ backgroundColor: ACCENT, color: "#fff" }}
              >
                {r.rank}
              </span>
              <span style={{ color: "#166534" }}>{r.priority}</span>
            </div>
          ))}
          <p className="text-[11px] mt-1" style={{ color: "rgba(34,47,48,0.4)" }}>
            Click a selected priority to remove it. Select up to 3.
          </p>
        </div>
      )}

      {ranked.length === 0 && (
        <p className="text-[11px]" style={{ color: "rgba(34,47,48,0.4)" }}>
          Click up to 3 priorities in order of importance (1st click = top priority).
        </p>
      )}
    </div>
  );
}

function Step6({ inputs, setInputs }: { inputs: BriefInputs; setInputs: React.Dispatch<React.SetStateAction<BriefInputs>> }) {
  function toggle(c: Constraint) {
    setInputs((prev) => {
      const has = prev.constraints.includes(c);
      return { ...prev, constraints: has ? prev.constraints.filter((x) => x !== c) : [...prev.constraints, c] };
    });
  }
  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {CONSTRAINTS.map((c) => (
          <Chip
            key={c.id}
            selected={inputs.constraints.includes(c.id)}
            onClick={() => toggle(c.id)}
            label={c.label}
          />
        ))}
      </div>
      <p className="text-[11px] mt-3 font-light" style={{ color: "rgba(34,47,48,0.4)" }}>
        Select any that apply. These act as hard filters or penalties in the scoring engine.
      </p>
    </div>
  );
}

function Step7({ inputs, setInputs }: { inputs: BriefInputs; setInputs: React.Dispatch<React.SetStateAction<BriefInputs>> }) {
  return (
    <div className="flex flex-col gap-3">
      {ROUTE_OPTIONS.map((r) => (
        <OptionCard
          key={r.id}
          selected={inputs.routeTolerance === r.id}
          onClick={() => setInputs((prev) => ({ ...prev, routeTolerance: r.id }))}
        >
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[13px] font-semibold" style={{ color: "#222f30" }}>{r.label}</p>
              <p className="text-[12px] font-light mt-0.5" style={{ color: "rgba(34,47,48,0.55)" }}>{r.desc}</p>
            </div>
            {inputs.routeTolerance === r.id && (
              <span className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center" style={{ backgroundColor: ACCENT }}>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </span>
            )}
          </div>
        </OptionCard>
      ))}
    </div>
  );
}

const SLIDER_LABELS = ["Launch fast", "Speed-leaning", "Balanced", "Sovereignty-leaning", "Max sovereignty"];

function Step8({ inputs, setInputs }: { inputs: BriefInputs; setInputs: React.Dispatch<React.SetStateAction<BriefInputs>> }) {
  return (
    <div>
      <div
        className="rounded-2xl p-5 mb-4"
        style={{ backgroundColor: "#fff", border: "1px solid rgba(34,47,48,0.1)" }}
      >
        <div className="flex justify-between text-[11px] mb-3 font-medium" style={{ color: "rgba(34,47,48,0.5)" }}>
          <span>Launch fast</span>
          <span>Max sovereignty</span>
        </div>
        <input
          type="range"
          min={0}
          max={4}
          step={1}
          value={inputs.sovereigntySlider}
          onChange={(e) =>
            setInputs((prev) => ({ ...prev, sovereigntySlider: Number(e.target.value) as SovereigntySlider }))
          }
          className="w-full accent-green-500"
          style={{ accentColor: ACCENT }}
        />
        <p
          className="text-[13px] font-semibold text-center mt-3"
          style={{ color: "#222f30" }}
        >
          {SLIDER_LABELS[inputs.sovereigntySlider]}
        </p>
      </div>
      <div className="text-[12px] font-light leading-relaxed" style={{ color: "rgba(34,47,48,0.55)" }}>
        {inputs.sovereigntySlider <= 1 && "You'll get a cloud-first, fastest-path-to-market route recommendation."}
        {inputs.sovereigntySlider === 2 && "The engine will balance speed and sovereignty — recommending a hybrid approach."}
        {inputs.sovereigntySlider >= 3 && "The engine will prioritise in-country infrastructure and data residency, even if it means slower deployment."}
      </div>
    </div>
  );
}

// ── Review screen (step 8 → review before generate) ───────────────────────

const PERSONA_LABELS: Record<string, string> = {
  founder: "Founder / Builder",
  operator: "Operator / Infrastructure",
  policy: "Policy / Public Sector",
  research: "Research / Strategy",
};

const WORKLOAD_LABELS: Record<string, string> = {
  startup: "Startup product / SaaS",
  enterprise: "Enterprise AI system",
  government: "Government deployment",
  research: "Research deployment",
  sovereign: "Sovereign AI initiative",
  exploration: "General exploration",
};

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2.5" style={{ borderBottom: "1px solid rgba(34,47,48,0.07)" }}>
      <span className="text-[11px] uppercase tracking-widest font-medium flex-shrink-0" style={{ color: "rgba(34,47,48,0.4)" }}>{label}</span>
      <span className="text-[13px] font-medium text-right" style={{ color: "#222f30" }}>{value || "—"}</span>
    </div>
  );
}

function ReviewStep({ inputs }: { inputs: BriefInputs }) {
  const slider = SLIDER_LABELS[inputs.sovereigntySlider];
  const priorities = inputs.rankedPriorities.map((r) => `${r.rank}. ${r.priority}`).join(" · ") || "None";
  const constraints = inputs.constraints.length > 0 ? inputs.constraints.join(", ") : "None";
  const regions = inputs.regions.length > 0 ? inputs.regions.join(", ") : "All regions";

  return (
    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(34,47,48,0.1)" }}>
      <div className="px-4" style={{ backgroundColor: "#fff" }}>
        <ReviewRow label="Persona" value={PERSONA_LABELS[inputs.persona ?? ""] ?? "—"} />
        <ReviewRow label="Workload" value={WORKLOAD_LABELS[inputs.workload ?? ""] ?? "—"} />
        <ReviewRow label="Regions" value={regions} />
        {inputs.projectDescription && <ReviewRow label="Project" value={inputs.projectDescription.slice(0, 80) + (inputs.projectDescription.length > 80 ? "…" : "")} />}
        <ReviewRow label="Priorities" value={priorities} />
        <ReviewRow label="Constraints" value={constraints} />
        <ReviewRow label="Route tolerance" value={inputs.routeTolerance ?? "—"} />
        <ReviewRow label="Speed vs. sovereignty" value={slider} />
      </div>
    </div>
  );
}

// ── Validation ─────────────────────────────────────────────────────────────

function canProceed(step: number, inputs: BriefInputs): boolean {
  if (step === 0) return !!inputs.persona;
  if (step === 1) return !!inputs.workload;
  if (step === 6) return !!inputs.routeTolerance;
  return true; // all other steps are optional
}

// ── Main component ─────────────────────────────────────────────────────────

export default function AdvisorFlow({ onComplete, onCancel }: Props) {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1=forward, -1=back
  const [inputs, setInputs] = useState<BriefInputs>(BLANK_INPUTS);

  function goNext() {
    if (step < TOTAL_STEPS - 1) {
      setDirection(1);
      setStep((s) => s + 1);
    } else {
      onComplete(inputs);
    }
  }

  function goBack() {
    if (step === 0) {
      onCancel();
    } else {
      setDirection(-1);
      setStep((s) => s - 1);
    }
  }

  const meta = STEP_META[step];
  const isLast = step === TOTAL_STEPS - 1;
  const canGo = canProceed(step, inputs);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 28 : -28 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -28 : 28 }),
  };

  return (
    <div className="max-w-[640px] mx-auto">
      {/* Progress bar */}
      <div className="mb-7">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-medium uppercase tracking-widest" style={{ color: "rgba(34,47,48,0.4)" }}>
            Step {step + 1} of {TOTAL_STEPS}
          </span>
          <button
            onClick={onCancel}
            className="text-[11px] transition-colors"
            style={{ color: "rgba(34,47,48,0.35)" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#222f30"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(34,47,48,0.35)"; }}
          >
            Cancel
          </button>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: "rgba(34,47,48,0.08)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{ backgroundColor: ACCENT }}
            animate={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      </div>

      {/* Step heading */}
      <div className="mb-5">
        <h2 className="text-[22px] font-bold tracking-[-0.03em] mb-1" style={{ color: "#222f30" }}>
          {meta.title}
        </h2>
        <p className="text-[13px] font-light" style={{ color: "rgba(34,47,48,0.55)" }}>
          {meta.sub}
        </p>
      </div>

      {/* Step content */}
      <div className="mb-6 overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 0 && <Step1 inputs={inputs} setInputs={setInputs} />}
            {step === 1 && <Step2 inputs={inputs} setInputs={setInputs} />}
            {step === 2 && <Step3 inputs={inputs} setInputs={setInputs} />}
            {step === 3 && <Step4 inputs={inputs} setInputs={setInputs} />}
            {step === 4 && <Step5 inputs={inputs} setInputs={setInputs} />}
            {step === 5 && <Step6 inputs={inputs} setInputs={setInputs} />}
            {step === 6 && <Step7 inputs={inputs} setInputs={setInputs} />}
            {step === 7 && <ReviewStep inputs={inputs} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between gap-3">
        <button
          onClick={goBack}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200"
          style={{
            backgroundColor: "rgba(34,47,48,0.06)",
            color: "rgba(34,47,48,0.7)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.1)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "rgba(34,47,48,0.06)"; }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {step === 0 ? "Cancel" : "Back"}
        </button>

        <button
          onClick={goNext}
          disabled={!canGo}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl text-[13px] font-medium text-white transition-all duration-200"
          style={{
            backgroundColor: canGo ? "#222f30" : "rgba(34,47,48,0.2)",
            cursor: canGo ? "pointer" : "not-allowed",
          }}
          onMouseEnter={(e) => { if (canGo) e.currentTarget.style.backgroundColor = "#2d3f40"; }}
          onMouseLeave={(e) => { if (canGo) e.currentTarget.style.backgroundColor = "#222f30"; }}
        >
          {isLast ? (
            <>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Generate Brief
            </>
          ) : (
            <>
              Continue
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </>
          )}
        </button>
      </div>

      <div className="h-16" />
    </div>
  );
}

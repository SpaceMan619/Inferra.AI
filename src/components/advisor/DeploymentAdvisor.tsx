"use client";

import { useState } from "react";
import type { CountryData } from "@/types";
import type { BriefInputs, BriefResult, SavedBrief } from "./advisorTypes";
import { BLANK_INPUTS } from "./advisorTypes";
import { generateBrief } from "./advisorEngine";
import { loadSavedBriefs, saveBrief, deleteBrief } from "./advisorStorage";
import AdvisorLanding from "./AdvisorLanding";
import AdvisorFlow from "./AdvisorFlow";
import AdvisorResults from "./AdvisorResults";

type AdvisorState = "landing" | "flow" | "results";

interface Props {
  countries: CountryData[];
  onGoToOverview: (country: string) => void;
  onGoToCompare: () => void;
}

export default function DeploymentAdvisor({ countries, onGoToOverview, onGoToCompare }: Props) {
  const [state, setState] = useState<AdvisorState>("landing");
  const [inputs, setInputs] = useState<BriefInputs>(BLANK_INPUTS);
  const [result, setResult] = useState<BriefResult | null>(null);
  const [savedBriefs, setSavedBriefs] = useState<SavedBrief[]>(() => loadSavedBriefs());

  function handleStart() {
    setInputs(BLANK_INPUTS);
    setResult(null);
    setState("flow");
  }

  function handleGenerate(finalInputs: BriefInputs) {
    setInputs(finalInputs);
    const brief = generateBrief(finalInputs, countries);
    setResult(brief);
    setState("results");
  }

  function handleSave() {
    if (!result || !inputs.persona || !inputs.workload) return;
    const brief: SavedBrief = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      savedAt: new Date().toISOString(),
      strategyLabel: result.strategyLabel,
      persona: inputs.persona,
      workload: inputs.workload,
      topMarket: result.primaryMarket,
      route: result.recommendedRoute,
      confidenceTier: result.confidenceTier,
      inputs,
      result,
    };
    saveBrief(brief);
    setSavedBriefs(loadSavedBriefs());
  }

  function handleDeleteBrief(id: string) {
    deleteBrief(id);
    setSavedBriefs(loadSavedBriefs());
  }

  function handleViewBrief(brief: SavedBrief) {
    setInputs(brief.inputs);
    setResult(brief.result);
    setState("results");
  }

  return (
    <div className="min-h-0">
      {state === "landing" && (
        <AdvisorLanding
          savedBriefs={savedBriefs}
          onStart={handleStart}
          onDeleteBrief={handleDeleteBrief}
          onViewBrief={handleViewBrief}
        />
      )}
      {state === "flow" && (
        <AdvisorFlow
          onComplete={handleGenerate}
          onCancel={() => setState("landing")}
        />
      )}
      {state === "results" && result && (
        <AdvisorResults
          inputs={inputs}
          result={result}
          onSave={handleSave}
          onNewBrief={handleStart}
          onBackToLanding={() => setState("landing")}
          onGoToOverview={onGoToOverview}
          onGoToCompare={onGoToCompare}
        />
      )}
    </div>
  );
}

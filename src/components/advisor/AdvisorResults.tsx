"use client";

import type { BriefInputs, BriefResult } from "./advisorTypes";

interface Props {
  inputs: BriefInputs;
  result: BriefResult;
  onSave: () => void;
  onNewBrief: () => void;
  onBackToLanding: () => void;
  onGoToOverview: (country: string) => void;
  onGoToCompare: () => void;
}

export default function AdvisorResults(_props: Props) {
  return <div>Results — coming in Batch 4</div>;
}

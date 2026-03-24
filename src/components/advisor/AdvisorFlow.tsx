"use client";

import type { BriefInputs } from "./advisorTypes";

interface Props {
  onComplete: (inputs: BriefInputs) => void;
  onCancel: () => void;
}

export default function AdvisorFlow(_props: Props) {
  return <div>Flow — coming in Batch 3</div>;
}

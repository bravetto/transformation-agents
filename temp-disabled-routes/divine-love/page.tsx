"use client";

import { useEffect } from "react";
import { useDivineLove } from "@/lib/divine-love";
import { DivineLove } from "@/components/divine-love";
import { DivineScripture } from "@/components/divine-scripture";
import { SacredSurrender } from "@/components/sacred-surrender";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

function DivineLovePageCore() {
  const divineLove = useDivineLove("DivineLovePage");

  useEffect(() => {
    divineLove.manifest();
  }, [divineLove]);

  return (
    <div className="divine-love-page">
      <DivineLove />
      <DivineScripture />
      <SacredSurrender />
    </div>
  );
}

// Export with divine error boundary
export default withDivineErrorBoundary(DivineLovePageCore, {
  componentName: "DivineLovePage",
  role: "lightworker",
});

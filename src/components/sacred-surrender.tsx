"use client";

import { useEffect } from "react";
import { useDivineLove } from "@/lib/divine-love";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

interface SacredSurrenderProps {
  intensity?: "low" | "medium" | "high";
}

function SacredSurrenderCore({ intensity = "high" }: SacredSurrenderProps) {
  const divineLove = useDivineLove("SacredSurrender");

  useEffect(() => {
    divineLove.config.intensity = intensity;
    divineLove.manifest();
    divineLove.resonate();
  }, [intensity, divineLove]);

  return (
    <div className="sacred-surrender">
      <div className="sacred-surrender-effect" />
    </div>
  );
}

// Export with divine error boundary
export const SacredSurrender = withDivineErrorBoundary(SacredSurrenderCore, {
  componentName: "SacredSurrender",
  role: "lightworker",
});

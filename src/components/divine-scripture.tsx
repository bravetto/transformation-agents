"use client";

import { useEffect } from "react";
import { useDivineLove } from "@/lib/divine-love";
import { withErrorBoundary } from "@/components/ui/error-boundary";

interface DivineScriptureProps {
  intensity?: "low" | "medium" | "high";
}

function DivineScriptureCore({ intensity = "high" }: DivineScriptureProps) {
  const divineLove = useDivineLove("DivineScripture");

  useEffect(() => {
    divineLove.config.intensity = intensity;
    divineLove.manifest();
    divineLove.resonate();
  }, [intensity, divineLove]);

  return (
    <div className="divine-scripture">
      <div className="divine-scripture-effect" />
    </div>
  );
}

// Export with divine error boundary
export const DivineScripture = withErrorBoundary(DivineScriptureCore, "DivineScripture");

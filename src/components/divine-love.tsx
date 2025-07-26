"use client";

import { useEffect } from "react";
import { useDivineLove } from "@/lib/divine-love";
import { withErrorBoundary } from "@/components/ui/error-boundary";

interface DivineLoveProps {
  intensity?: "low" | "medium" | "high";
}

function DivineLoveCore({ intensity = "high" }: DivineLoveProps) {
  const divineLove = useDivineLove("DivineLove");

  useEffect(() => {
    divineLove.config.intensity = intensity;
    divineLove.manifest();
  }, [intensity, divineLove]);

  return (
    <div className="divine-love">
      <div className="divine-love-effect" />
    </div>
  );
}

// Export with divine error boundary
export const DivineLove = withErrorBoundary(DivineLoveCore, "DivineLove");

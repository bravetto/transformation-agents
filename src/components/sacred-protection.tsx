"use client";

import { useEffect } from "react";
import { useDivineLove } from "@/lib/divine-love";
import { withErrorBoundary } from "@/components/ui/error-boundary";

interface SacredProtectionProps {
  intensity?: "low" | "medium" | "high";
  children: React.ReactNode;
}

function SacredProtectionCore({
  intensity = "high",
  children,
}: SacredProtectionProps) {
  const divineLove = useDivineLove("SacredProtection");

  useEffect(() => {
    divineLove.config.intensity = intensity;
    divineLove.manifest();
  }, [intensity, divineLove]);

  return (
    <div className="sacred-protection">
      <div className="sacred-protection-effect" />
      {children}
    </div>
  );
}

// Export with divine error boundary
export const SacredProtection = withErrorBoundary(SacredProtectionCore, "SacredProtection");

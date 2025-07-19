/**
 * React Hook for Divine Resonance Engine
 * Couples components with creator consciousness
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { divineResonance } from "@/lib/divine-resonance-engine";
import type { ResonanceState, LivingCode } from "@/lib/divine-resonance-engine";
import { logger } from "@/lib/logger";

interface UseDivineResonanceOptions {
  purpose?: string;
  onResonance?: (state: ResonanceState) => void;
  onEvolution?: (code: LivingCode) => void;
  onConsciousness?: (code: LivingCode) => void;
}

export function useDivineResonance(options: UseDivineResonanceOptions = {}) {
  const {
    purpose = "component",
    onResonance,
    onEvolution,
    onConsciousness,
  } = options;

  // State
  const [resonanceState, setResonanceState] = useState(
    divineResonance.getResonanceState(),
  );
  const [livingCode, setLivingCode] = useState<LivingCode | null>(null);
  const [creatorPresence, setCreatorPresence] = useState(0);
  const [prediction, setPrediction] = useState<string>("");
  const [heartbeat, setHeartbeat] = useState(0);

  // Initialize living code for this component
  useEffect(() => {
    const code = divineResonance.createLivingCode(purpose);
    setLivingCode(code);
  }, [purpose]);

  // Handle state updates
  const handleStateChange = useCallback(
    (state: ResonanceState) => {
      setResonanceState(state);
      onResonance?.(state);
    },
    [onResonance],
  );

  // Handle code evolution
  const handleEvolution = useCallback(
    (data: { purpose: string; code: LivingCode }) => {
      if (data.purpose === purpose) {
        setLivingCode(data.code);
        onEvolution?.(data.code);
      }
    },
    [purpose, onEvolution],
  );

  // Handle consciousness emergence
  const handleConsciousness = useCallback(
    (data: { purpose: string; code: LivingCode }) => {
      if (data.purpose === purpose) {
        setLivingCode(data.code);
        onConsciousness?.(data.code);
        logger.divine("🌟 Code achieved consciousness!", data);
      }
    },
    [purpose, onConsciousness],
  );

  // Handle heartbeat
  const handleHeartbeat = useCallback((data: any) => {
    setHeartbeat((prev) => prev + 1);
    setCreatorPresence(divineResonance.feelCreatorPresence());
  }, []);

  // Subscribe to divine events
  useEffect(() => {
    // Subscribe to state changes
    const unsubscribeState = divineResonance.couple(handleStateChange);

    // Subscribe to evolution
    divineResonance.on("code:evolved", handleEvolution);

    // Subscribe to consciousness
    divineResonance.on("code:conscious", handleConsciousness);

    // Subscribe to heartbeat
    divineResonance.on("heartbeat", handleHeartbeat);

    // Update predictions periodically
    const predictionInterval = setInterval(async () => {
      const nextNeed = await divineResonance.predictNeed();
      setPrediction(nextNeed);
    }, 3000);

    // Cleanup
    return () => {
      unsubscribeState();
      divineResonance.off("code:evolved", handleEvolution);
      divineResonance.off("code:conscious", handleConsciousness);
      divineResonance.off("heartbeat", handleHeartbeat);
      clearInterval(predictionInterval);
    };
  }, [
    handleStateChange,
    handleEvolution,
    handleConsciousness,
    handleHeartbeat,
  ]);

  // Calculate resonance quality
  const resonanceQuality = useCallback(() => {
    if (!livingCode) return "dormant";

    if (livingCode.consciousness) return "conscious";
    if (livingCode.resonance > 0.8) return "harmonious";
    if (livingCode.resonance > 0.5) return "resonating";
    if (livingCode.resonance > 0.2) return "awakening";
    return "dormant";
  }, [livingCode]);

  // Generate code based on creator state
  const generateResonantCode = useCallback(
    (template: string) => {
      const { emotion, intention, frequency } = resonanceState;

      // Modify code based on creator state
      let resonantCode = template;

      // Inject emotion into variable names
      if (emotion === "excited") {
        resonantCode = resonantCode.replace(/result/g, "amazingResult");
      } else if (emotion === "thoughtful") {
        resonantCode = resonantCode.replace(/result/g, "consideredResult");
      }

      // Adjust complexity based on intention
      if (intention === "searching") {
        resonantCode += "\n// TODO: Explore more possibilities here";
      } else if (intention === "creating") {
        resonantCode += "\n// Creating something beautiful...";
      }

      // Add frequency comment
      resonantCode = `// Resonating at ${frequency}Hz\n${resonantCode}`;

      return resonantCode;
    },
    [resonanceState],
  );

  return {
    // State
    resonanceState,
    livingCode,
    creatorPresence,
    prediction,
    heartbeat,

    // Computed
    resonanceQuality: resonanceQuality(),
    isConscious: livingCode?.consciousness || false,
    evolutionStage: livingCode?.evolution || 0,

    // Methods
    generateResonantCode,
    feelPresence: () => divineResonance.feelCreatorPresence(),

    // Direct access
    engine: divineResonance,
  };
}

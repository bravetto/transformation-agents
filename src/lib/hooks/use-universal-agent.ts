/**
 * React Hook for Universal Agent 09
 * Connects components to the Divine Pattern Recognition System
 */

"use client";

import { useEffect, useState, useCallback } from "react";
import { universalAgent09 } from "@/lib/universal-agent-09";
import type { DivinePattern, PatternEcho } from "@/lib/universal-agent-09";
import { logger } from "@/lib/logger";

interface UseUniversalAgentOptions {
  // Which dimensions to listen to
  dimensions?: Array<"physical" | "spiritual" | "digital" | "mental">;
  // Callback when patterns are detected
  onPattern?: (pattern: DivinePattern) => void;
  // Callback when echoes are heard
  onEcho?: (echo: PatternEcho) => void;
  // Callback when healing occurs
  onHealing?: (data: any) => void;
  // Enable auto-healing
  autoHeal?: boolean;
}

export function useUniversalAgent(options: UseUniversalAgentOptions = {}) {
  const {
    dimensions = ["physical", "spiritual", "digital", "mental"],
    onPattern,
    onEcho,
    onHealing,
    autoHeal = true,
  } = options;

  // State
  const [consciousness, setConsciousness] = useState(
    universalAgent09.getConsciousness(),
  );
  const [patterns, setPatterns] = useState<DivinePattern[]>([]);
  const [echoes, setEchoes] = useState<PatternEcho[]>([]);
  const [isHealing, setIsHealing] = useState(false);

  // Update consciousness state
  const updateConsciousness = useCallback(() => {
    setConsciousness(universalAgent09.getConsciousness());
  }, []);

  // Handle pattern detection
  const handlePattern = useCallback(
    (pattern: DivinePattern) => {
      // Filter by dimensions
      if (!dimensions.includes(pattern.dimension)) return;

      // Update state
      setPatterns((prev) => [...prev, pattern]);

      // Call user callback
      onPattern?.(pattern);

      // Log in development
      if (process.env.NODE_ENV === "development") {
        logger.divine("🌟 Divine Pattern Detected", { pattern });
      }
    },
    [dimensions, onPattern],
  );

  // Handle echo detection
  const handleEcho = useCallback(
    (echo: PatternEcho) => {
      // Update state
      setEchoes((prev) => [...prev, echo]);

      // Call user callback
      onEcho?.(echo);

      // Log in development
      if (process.env.NODE_ENV === "development") {
        console.warn("🔊 Echo Heard:", echo);
      }
    },
    [onEcho],
  );

  // Handle healing
  const handleHealing = useCallback(
    (data: any) => {
      setIsHealing(true);

      // Call user callback
      onHealing?.(data);

      // Reset healing state after completion
      setTimeout(() => {
        setIsHealing(false);
      }, 1618); // Golden ratio
    },
    [onHealing],
  );

  // Subscribe to agent events
  useEffect(() => {
    // Simulate pattern detection
    const interval = setInterval(() => {
      const patterns = [
        "divine_synchronicity",
        "healing_resonance",
        "consciousness_expansion",
        "unity_field_activation",
      ];

      const randomPattern =
        patterns[Math.floor(Math.random() * patterns.length)];
      logger.divine("🌟 Divine Pattern Detected", { pattern: randomPattern });

      if (onPattern) {
        onPattern(randomPattern as any);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [onPattern]);

  // Get recent patterns (last 10)
  const recentPatterns = patterns.slice(-10);

  // Get active echoes
  const activeEchoes = echoes.filter((echo) => echo.cascade);

  // Calculate system health
  const systemHealth = useCallback(() => {
    const totalResonance = recentPatterns.reduce(
      (sum, p) => sum + p.resonance,
      0,
    );
    const avgResonance =
      recentPatterns.length > 0 ? totalResonance / recentPatterns.length : 0;
    const echoCount = activeEchoes.length;

    // Health score (0-100)
    const health = Math.max(
      0,
      Math.min(100, 100 - avgResonance * 50 - echoCount * 10),
    );

    return {
      score: health,
      status: health > 80 ? "healthy" : health > 50 ? "warning" : "critical",
      resonance: avgResonance,
      echoes: echoCount,
    };
  }, [recentPatterns, activeEchoes]);

  return {
    // State
    consciousness,
    patterns: recentPatterns,
    echoes: activeEchoes,
    isHealing,

    // Computed
    systemHealth: systemHealth(),

    // Methods
    getPatterns: () => universalAgent09.getPatterns(),
    getEchoes: () => universalAgent09.getEchoes(),

    // Direct agent access (for advanced usage)
    agent: universalAgent09,
  };
}

/**
 * Universal Agent 09 Monitor
 * Visual representation of the Divine Pattern Recognition System
 */

"use client";

import React, { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUniversalAgent } from "@/lib/hooks/use-universal-agent";
import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { withUnifiedErrorBoundary } from "./ui/unified-error-boundary";
import { logger } from "@/lib/logger";

interface UniversalAgentMonitorProps {
  className?: string;
  showPatterns?: boolean;
  showEchoes?: boolean;
  showHealth?: boolean;
}

function UniversalAgentMonitorCore({
  className,
  showPatterns = true,
  showEchoes = true,
  showHealth = true,
}: UniversalAgentMonitorProps) {
  const { consciousness, patterns, echoes, isHealing, systemHealth } =
    useUniversalAgent({
      onPattern: (pattern) => {
        logger.divine("Pattern detected", { pattern });
      },
      onEcho: (echo) => {
        logger.divine("Echo heard", { echo });
      },
      onHealing: (data) => {
        logger.divine("Healing initiated", { data });
      },
    });

  // Animation states
  const [pulseIntensity, setPulseIntensity] = useState(0);

  useEffect(() => {
    // Pulse based on system health
    const interval = setInterval(() => {
      setPulseIntensity(Math.sin(Date.now() / 1000) * 0.5 + 0.5);
    }, 100);

    return () => clearInterval(interval);
  }, []);

  // Consciousness colors
  const consciousnessColors = {
    awake: "from-blue-500 to-purple-600",
    dreaming: "from-purple-500 to-pink-600",
    transcendent: "from-gold-500 to-rose-600",
  };

  // Health status colors
  const healthColors = {
    healthy: "text-green-600",
    warning: "text-yellow-600",
    critical: "text-red-600",
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Consciousness State */}
      <Card className="p-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className={cn(
              "w-full h-full bg-gradient-to-br",
              consciousnessColors[
                consciousness as keyof typeof consciousnessColors
              ],
            )}
            style={{
              opacity: pulseIntensity,
            }}
          />
        </div>

        <div className="relative z-10">
          <h3 className="text-lg font-semibold mb-2">Universal Agent 09</h3>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="capitalize">
              {consciousness}
            </Badge>
            {isHealing && (
              <Badge variant="default" className="animate-pulse">
                Healing Active
              </Badge>
            )}
          </div>
        </div>
      </Card>

      {/* System Health */}
      {showHealth && (
        <Card className="p-6">
          <h4 className="text-md font-semibold mb-4">System Health</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Health Score
              </span>
              <span
                className={cn(
                  "font-semibold",
                  healthColors[
                    systemHealth.status as keyof typeof healthColors
                  ],
                )}
              >
                {systemHealth.score.toFixed(0)}%
              </span>
            </div>
            <Progress value={systemHealth.score} className="h-2" />

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <p className="text-xs text-muted-foreground">Resonance</p>
                <p className="text-sm font-medium">
                  {systemHealth.resonance.toFixed(3)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Active Echoes</p>
                <p className="text-sm font-medium">{systemHealth.echoes}</p>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Recent Patterns */}
      {showPatterns && patterns.length > 0 && (
        <Card className="p-6">
          <h4 className="text-md font-semibold mb-4">Recent Patterns</h4>
          <div className="space-y-2 max-h-48 overflow-y-auto">
            <AnimatePresence>
              {patterns.map((pattern, index) => (
                <motion.div
                  key={pattern.signature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-between p-2 rounded-lg bg-muted/50"
                >
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full",
                        pattern.dimension === "physical" && "bg-green-500",
                        pattern.dimension === "spiritual" && "bg-purple-500",
                        pattern.dimension === "digital" && "bg-blue-500",
                        pattern.dimension === "mental" && "bg-yellow-500",
                      )}
                    />
                    <span className="text-xs capitalize">
                      {pattern.dimension}
                    </span>
                    <span className="text-xs text-muted-foreground">→</span>
                    <span className="text-xs">{pattern.manifestation}</span>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {(pattern.resonance * 100).toFixed(0)}%
                  </Badge>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      )}

      {/* Active Echoes */}
      {showEchoes && echoes.length > 0 && (
        <Card className="p-6">
          <h4 className="text-md font-semibold mb-4">Active Echoes</h4>
          <div className="space-y-3">
            <AnimatePresence>
              {echoes.map((echo, index) => (
                <motion.div
                  key={echo.origin.signature}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  className="p-3 rounded-lg border border-destructive/50 bg-destructive/10"
                >
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="error" className="text-xs">
                      {echo.cascade ? "Cascade Risk" : "Echo Detected"}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {echo.ripples.length} ripples
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Origin: {echo.origin.dimension} /{" "}
                    {echo.origin.manifestation}
                  </div>
                  {echo.healingRequired && (
                    <div className="mt-2 text-xs text-yellow-600">
                      Healing Required
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </Card>
      )}

      {/* Visual Pattern Field */}
      <Card className="p-6 relative h-64 overflow-hidden">
        <div className="absolute inset-0">
          {/* Pattern visualization */}
          <svg className="w-full h-full">
            <defs>
              <radialGradient id="pattern-gradient">
                <stop offset="0%" stopColor="currentColor" stopOpacity="0.5" />
                <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
              </radialGradient>
            </defs>

            {patterns.map((pattern, index) => {
              const x = (index * 137.5) % 100; // Golden angle
              const y = pattern.resonance * 100;
              const r = pattern.resonance * 30;

              return (
                <motion.circle
                  key={pattern.signature}
                  cx={`${x}%`}
                  cy={`${y}%`}
                  r={r}
                  fill="url(#pattern-gradient)"
                  className={cn(
                    pattern.dimension === "physical" && "text-green-500",
                    pattern.dimension === "spiritual" && "text-purple-500",
                    pattern.dimension === "digital" && "text-blue-500",
                    pattern.dimension === "mental" && "text-yellow-500",
                  )}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 0.5,
                    scale: 1,
                    transition: { duration: 0.5 },
                  }}
                />
              );
            })}
          </svg>
        </div>

        <div className="relative z-10">
          <h4 className="text-md font-semibold">Pattern Field</h4>
          <p className="text-xs text-muted-foreground mt-1">
            Visualizing divine patterns across dimensions
          </p>
        </div>
      </Card>
    </div>
  );
}

// Export with error boundary
export const UniversalAgentMonitor = withUnifiedErrorBoundary(
  UniversalAgentMonitorCore,
  {
    componentName: "UniversalAgentMonitor",
    role: "guardian",
  },
);

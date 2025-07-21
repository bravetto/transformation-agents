// Simplified hooks replacing consciousness system
import { useEffect, useState, useCallback, useRef } from "react";
import { logger } from "../logger";
import { getPerformanceMemory } from "../utils";
import type {
  ComponentHealth,
  PerformanceMetrics,
  UserActivityTracker,
} from "@/types/simplified";

export function useComponentHealth(componentName: string): ComponentHealth {
  const [health, setHealth] = useState<ComponentHealth>({
    status: "active",
    renders: 0,
    errors: 0,
    performance: "optimal",
  });

  const updateHealth = useCallback(() => {
    setHealth((prev) => ({
      ...prev,
      renders: prev.renders + 1,
      status: prev.errors > 5 ? "error" : "active",
    }));
  }, []);

  const reportError = useCallback((error: string) => {
    setHealth((prev) => ({
      ...prev,
      errors: prev.errors + 1,
      lastError: error,
      performance:
        prev.errors > 3 ? "critical" : prev.errors > 1 ? "degraded" : "optimal",
    }));
  }, []);

  useEffect(() => {
    updateHealth();
  }, [updateHealth]);

  return health;
}

export function usePerformanceMetrics(
  componentName: string,
): PerformanceMetrics {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    memoryUsage: 0,
    updateFrequency: 60,
    optimizationLevel: "basic",
  });

  useEffect(() => {
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const memoryInfo = getPerformanceMemory();
      setMetrics((prev) => ({
        ...prev,
        renderTime: endTime - startTime,
        memoryUsage: memoryInfo?.used || 0,
      }));
    };
  }, []);

  return metrics;
}

export function useUserActivity(): UserActivityTracker {
  const [activity, setActivity] = useState<UserActivityTracker>({
    isActive: true,
    lastInteraction: Date.now(),
    sessionDuration: 0,
    interactionCount: 0,
  });

  useEffect(() => {
    const handleActivity = () => {
      setActivity((prev) => ({
        ...prev,
        isActive: true,
        lastInteraction: Date.now(),
        interactionCount: prev.interactionCount + 1,
      }));
    };

    const events = [
      "mousedown",
      "mousemove",
      "keypress",
      "scroll",
      "touchstart",
    ];
    events.forEach((event) => {
      document.addEventListener(event, handleActivity, true);
    });

    const inactivityTimer = setInterval(() => {
      setActivity((prev) => ({
        ...prev,
        isActive: Date.now() - prev.lastInteraction < 30000,
        sessionDuration:
          Date.now() - (prev.lastInteraction - prev.sessionDuration),
      }));
    }, 5000);

    return () => {
      events.forEach((event) => {
        document.removeEventListener(event, handleActivity, true);
      });
      clearInterval(inactivityTimer);
    };
  }, []);

  return activity;
}

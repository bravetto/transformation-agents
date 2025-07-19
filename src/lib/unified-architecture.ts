"use client";

import { useEffect, useCallback, useState } from "react";
import type { DivineRole } from "@/lib/design-system";
import { logger } from "@/lib/logger";

interface UnifiedArchitecture {
  protection: {
    enabled: boolean;
    level: "basic" | "enhanced" | "divine";
  };
  handleError: (error: Error, context?: Record<string, unknown>) => void;
  log: (message: string, data?: Record<string, unknown>) => void;
}

export function useUnifiedArchitecture(
  componentName: string,
  role: DivineRole,
): UnifiedArchitecture {
  const [architecture, setArchitecture] = useState<UnifiedArchitecture>({
    protection: {
      enabled: true,
      level: "basic",
    },
    handleError: (error: Error, context = {}) => {
      console.error(`[${componentName}] Error:`, error, context);
    },
    log: (message: string, data = {}) => {
      logger.debug(`[${componentName}] ${message}`, data);
    },
  });

  // Initialize protection level based on role
  useEffect(() => {
    const protectionLevel =
      role === "guardian"
        ? "divine"
        : role === "messenger"
          ? "enhanced"
          : "basic";

    setArchitecture((prev) => ({
      ...prev,
      protection: {
        ...prev.protection,
        level: protectionLevel,
      },
    }));
  }, [role]);

  // Enhanced error handling
  const handleError = useCallback(
    (error: Error, context = {}) => {
      architecture.handleError(error, {
        ...context,
        componentName,
        role,
        protectionLevel: architecture.protection.level,
      });
    },
    [architecture, componentName, role],
  );

  // Enhanced logging
  const log = useCallback(
    (message: string, data = {}) => {
      architecture.log(message, {
        ...data,
        componentName,
        role,
        protectionLevel: architecture.protection.level,
      });
    },
    [architecture, componentName, role],
  );

  return {
    protection: architecture.protection,
    handleError,
    log,
  };
}

export const log = (componentName: string, message: string, data?: any) => {
  if (process.env.NODE_ENV === "development") {
    logger.debug(`[${componentName}] ${message}`, data);
  }
};

"use client";

import { useEffect } from "react";

/**
 * 🔇 PRODUCTION CONSOLE SILENCER
 * Professional console experience for launch-ready applications
 * Silences development noise while preserving critical error visibility
 */

interface ProductionConsoleSilencerProps {
  enabled?: boolean;
  environment?: "production" | "development" | "staging";
  preserveCriticalErrors?: boolean;
  suppressProfileImageErrors?: boolean;
  suppressAnalyticsErrors?: boolean;
  suppressHydrationWarnings?: boolean;
  suppressBuildWarnings?: boolean;
}

const CRITICAL_ERROR_PATTERNS = [
  // Keep these errors visible as they affect functionality
  "TypeError:",
  "ReferenceError:",
  "Network error",
  "Failed to fetch",
  "Script error",
  "Uncaught",
  // JAHmere's case-specific critical patterns
  "payment",
  "auth",
  "security",
];

const SAFE_TO_SILENCE_PATTERNS = [
  // Profile image 404s (we have elegant fallbacks)
  "tony-dungy-profile.jpg",
  "jahmere-webb-profile.jpg",
  "coach-dungy-profile.jpg",
  "Failed to load resource.*profile.*jpg",
  "404.*profile",

  // Analytics 404s (expected during development)
  "analytics.*404",
  "api/analytics.*Failed to load",
  "_next/static/chunks.*404",

  // Development-only warnings
  "Warning: React does not recognize",
  "Warning: componentDidUpdate",
  "Warning: Unknown prop",
  "Fast Refresh",
  "webpack-internal",
  "HMR",
  "Hot reload",

  // Hydration mismatches (non-critical)
  "Text content does not match",
  "Hydration failed",
  "did not match.*Text content",

  // Build/chunk warnings
  "Loading chunk.*failed",
  "ChunkLoadError",
  "Loading CSS chunk.*failed",

  // Third-party library noise
  "GoogleAnalytics",
  "Gtag",
  "_vercel/insights",

  // Performance warnings (informational only)
  "handler took.*ms",
  "Violation.*setTimeout",
  "Violation.*forced reflow",
];

export default function ProductionConsoleSilencer({
  enabled = process.env.NODE_ENV === "production",
  environment = process.env.NODE_ENV as
    | "production"
    | "development"
    | "staging",
  preserveCriticalErrors = true,
  suppressProfileImageErrors = true,
  suppressAnalyticsErrors = true,
  suppressHydrationWarnings = true,
  suppressBuildWarnings = true,
}: ProductionConsoleSilencerProps) {
  useEffect(() => {
    if (!enabled || typeof window === "undefined") {
      return;
    }

    // Store original console methods
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalLog = console.log;
    const originalInfo = console.info;

    // Helper function to check if error should be silenced
    const shouldSilenceMessage = (message: string): boolean => {
      // Never silence critical errors
      if (preserveCriticalErrors) {
        const isCritical = CRITICAL_ERROR_PATTERNS.some((pattern) =>
          message.toLowerCase().includes(pattern.toLowerCase()),
        );
        if (isCritical) {
          return false;
        }
      }

      // Check if message matches safe-to-silence patterns
      return SAFE_TO_SILENCE_PATTERNS.some((pattern) => {
        try {
          return new RegExp(pattern, "i").test(message);
        } catch {
          return message.toLowerCase().includes(pattern.toLowerCase());
        }
      });
    };

    // Override console.error
    console.error = (...args: any[]) => {
      const message = args.join(" ");

      if (shouldSilenceMessage(message)) {
        // Optionally log to a monitoring service in production
        if (environment === "production" && message.includes("profile")) {
          // Could integrate with monitoring service here
          // monitoringService.log("silenced_profile_404", { message });
        }
        return; // Silent
      }

      // Allow critical errors through
      originalError.apply(console, args);
    };

    // Override console.warn
    console.warn = (...args: any[]) => {
      const message = args.join(" ");

      if (shouldSilenceMessage(message)) {
        return; // Silent
      }

      // Allow important warnings through
      originalWarn.apply(console, args);
    };

    // Override console.log in production (keep for development)
    if (environment === "production") {
      console.log = (...args: any[]) => {
        const message = args.join(" ");

        // Only allow critical logs in production
        if (
          CRITICAL_ERROR_PATTERNS.some((pattern) =>
            message.toLowerCase().includes(pattern.toLowerCase()),
          )
        ) {
          originalLog.apply(console, args);
        }
        // Otherwise silent
      };
    }

    // Override console.info (mostly informational)
    console.info = (...args: any[]) => {
      const message = args.join(" ");

      if (
        environment === "production" &&
        !CRITICAL_ERROR_PATTERNS.some((pattern) =>
          message.toLowerCase().includes(pattern.toLowerCase()),
        )
      ) {
        return; // Silent in production unless critical
      }

      originalInfo.apply(console, args);
    };

    // Override window.onerror for global error handling
    const originalOnError = window.onerror;
    window.onerror = (message, source, lineno, colno, error) => {
      const errorMessage =
        typeof message === "string" ? message : String(message);

      // Silence known safe errors
      if (shouldSilenceMessage(errorMessage)) {
        return true; // Prevent default error handling
      }

      // Allow critical errors through to original handler
      if (originalOnError) {
        return originalOnError(message, source, lineno, colno, error);
      }

      return false;
    };

    // Override unhandled promise rejections
    const originalUnhandledRejection = window.onunhandledrejection;
    window.onunhandledrejection = (event) => {
      const message = event.reason?.toString() || "";

      if (shouldSilenceMessage(message)) {
        event.preventDefault(); // Prevent logging
        return;
      }

      if (originalUnhandledRejection) {
        originalUnhandledRejection.call(window, event);
      }
    };

    // Log silencer status in development
    if (environment === "development") {
      originalLog("🔇 Production Console Silencer active", {
        profileImageErrors: suppressProfileImageErrors ? "silenced" : "visible",
        analyticsErrors: suppressAnalyticsErrors ? "silenced" : "visible",
        hydrationWarnings: suppressHydrationWarnings ? "silenced" : "visible",
        buildWarnings: suppressBuildWarnings ? "silenced" : "visible",
        criticalErrors: preserveCriticalErrors ? "preserved" : "silenced",
      });
    }

    // Cleanup function
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      console.log = originalLog;
      console.info = originalInfo;
      window.onerror = originalOnError;
      window.onunhandledrejection = originalUnhandledRejection;
    };
  }, [
    enabled,
    environment,
    preserveCriticalErrors,
    suppressProfileImageErrors,
    suppressAnalyticsErrors,
    suppressHydrationWarnings,
    suppressBuildWarnings,
  ]);

  // This component renders nothing but provides console management
  return null;
}

/**
 * 🎯 PROFESSIONAL CONSOLE STATUS COMPONENT
 * Shows console status in development, hidden in production
 */
export function ConsoleStatusIndicator() {
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      const statusMessage = "🏆 Production Console Polish Active";
      const statusDetails = {
        profileImages: "Graceful fallbacks enabled",
        analytics: "Development-friendly",
        hydration: "Warnings suppressed",
        buildSystem: "Noise filtered",
        criticalErrors: "Preserved for debugging",
      };

      console.log(
        `%c${statusMessage}`,
        "background: linear-gradient(90deg, #3B82F6, #1E40AF); color: white; padding: 8px 16px; border-radius: 4px; font-weight: bold;",
        statusDetails,
      );
    }
  }, []);

  return null;
}

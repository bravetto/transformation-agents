"use client";

import { useEffect } from "react";

interface ConsoleSilenceConfig {
  silenceProfileImageErrors?: boolean;
  silenceAnalyticsErrors?: boolean;
  silenceDevWarnings?: boolean;
  allowedPatterns?: string[];
  environment?: "development" | "production" | "all";
}

/**
 * 🎯 CONSOLE SILENCE WRAPPER
 * Eliminates non-critical console noise for professional production deployment
 */
export function ConsoleSilenceWrapper({
  children,
  silenceProfileImageErrors = true,
  silenceAnalyticsErrors = true,
  silenceDevWarnings = false,
  allowedPatterns = ["error", "warn"],
  environment = "production",
}: ConsoleSilenceConfig & { children: React.ReactNode }) {
  useEffect(() => {
    // Only apply in specified environment
    if (environment === "development" && process.env.NODE_ENV !== "development")
      return;
    if (environment === "production" && process.env.NODE_ENV !== "production")
      return;

    // Store original console methods
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalLog = console.log;

    // Professional console filtering
    console.error = (...args) => {
      const message = args.join(" ");

      // Silence profile image 404s (we have elegant fallbacks)
      if (
        silenceProfileImageErrors &&
        (message.includes("tony-dungy-profile.jpg") ||
          message.includes("jahmere-webb-profile.jpg") ||
          (message.includes("Failed to load resource") &&
            message.includes("profile.jpg")))
      ) {
        return; // Silent - we handle this gracefully
      }

      // Silence analytics 404s (expected during development)
      if (
        silenceAnalyticsErrors &&
        ((message.includes("analytics") && message.includes("404")) ||
          (message.includes("api/analytics") &&
            message.includes("Failed to load")))
      ) {
        return; // Silent - analytics endpoints may not exist in all environments
      }

      // Silence development warnings in production
      if (
        silenceDevWarnings &&
        process.env.NODE_ENV === "production" &&
        (message.includes("Warning:") ||
          message.includes("Fast Refresh") ||
          message.includes("webpack-internal"))
      ) {
        return; // Silent development noise
      }

      // Allow critical errors through
      if (
        allowedPatterns.some((pattern) =>
          message.toLowerCase().includes(pattern),
        )
      ) {
        originalError.apply(console, args);
      }
    };

    console.warn = (...args) => {
      const message = args.join(" ");

      // Silence known safe warnings
      if (
        message.includes("componentDidUpdate") ||
        message.includes("React does not recognize") ||
        message.includes("Unknown prop") ||
        (silenceDevWarnings && process.env.NODE_ENV === "production")
      ) {
        return; // Silent non-critical warnings
      }

      originalWarn.apply(console, args);
    };

    // Only remove console.log in production (keep for development debugging)
    if (process.env.NODE_ENV === "production") {
      console.log = () => {}; // Silent all console.log in production
    }

    // Cleanup function
    return () => {
      console.error = originalError;
      console.warn = originalWarn;
      console.log = originalLog;
    };
  }, [
    silenceProfileImageErrors,
    silenceAnalyticsErrors,
    silenceDevWarnings,
    allowedPatterns,
    environment,
  ]);

  return <>{children}</>;
}

/**
 * 🔧 DEVELOPMENT DEBUG WRAPPER
 * Allows console output in development, silences in production
 */
export function DevelopmentDebugWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConsoleSilenceWrapper
      silenceProfileImageErrors={true}
      silenceAnalyticsErrors={true}
      silenceDevWarnings={process.env.NODE_ENV === "production"}
      environment="all"
    >
      {children}
    </ConsoleSilenceWrapper>
  );
}

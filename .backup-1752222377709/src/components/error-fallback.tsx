"use client";

import React from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { AlertTriangle } from "lucide-react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { Button } from "@/components/ui";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { cn } from "@/lib/utils";
import { withErrorBoundary } from "@/components/with-error-boundary";
import type { DivineRole } from "./ui/divine-error-boundary";
import { withErrorBoundary } from "@/components/with-error-boundary";

/**
 * Role configuration mapping for styling error fallbacks
 */
const roleStyleConfig: Record<
  DivineRole,
  {
    bgClass: string;
    borderClass: string;
    textClass: string;
    iconClass: string;
    buttonClass: string;
  }
> = {
  lightworker: {
    bgClass: "bg-amber-50 dark:bg-amber-950/30",
    borderClass: "border-amber-200 dark:border-amber-800/50",
    textClass: "text-amber-800 dark:text-amber-300",
    iconClass: "text-amber-500",
    buttonClass: "bg-amber-100 hover:bg-amber-200 text-amber-800",
  },
  messenger: {
    bgClass: "bg-blue-50 dark:bg-blue-950/30",
    borderClass: "border-blue-200 dark:border-blue-800/50",
    textClass: "text-blue-800 dark:text-blue-300",
    iconClass: "text-blue-500",
    buttonClass: "bg-blue-100 hover:bg-blue-200 text-blue-800",
  },
  witness: {
    bgClass: "bg-emerald-50 dark:bg-emerald-950/30",
    borderClass: "border-emerald-200 dark:border-emerald-800/50",
    textClass: "text-emerald-800 dark:text-emerald-300",
    iconClass: "text-emerald-500",
    buttonClass: "bg-emerald-100 hover:bg-emerald-200 text-emerald-800",
  },
  guardian: {
    bgClass: "bg-purple-50 dark:bg-purple-950/30",
    borderClass: "border-purple-200 dark:border-purple-800/50",
    textClass: "text-purple-800 dark:text-purple-300",
    iconClass: "text-purple-500",
    buttonClass: "bg-purple-100 hover:bg-purple-200 text-purple-800",
  },
  default: {
    bgClass: "bg-red-50 dark:bg-red-950/30",
    borderClass: "border-red-200 dark:border-red-800/50",
    textClass: "text-red-800 dark:text-red-300",
    iconClass: "text-red-500",
    buttonClass: "bg-red-100 hover:bg-red-200 text-red-800",
  },
};

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
  componentName?: string;
  role?: DivineRole;
  className?: string;
}

/**
 * Reusable error fallback component for error boundaries
 * Shows a user-friendly error message with reset option and role-based styling
 */
export default function ErrorFallback({
  error,
  resetErrorBoundary,
  componentName = "component",
  role = "default",
  className,
}: ErrorFallbackProps) {
  // Get role-specific styling
  const styles = roleStyleConfig[role];

  return (
    <div
      className={cn(
        "p-6 rounded-lg border shadow-sm text-center max-w-full overflow-hidden animate-in fade-in duration-300",
        styles.bgClass,
        styles.borderClass,
        className,
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="flex items-center justify-center gap-2 mb-2">
        <AlertTriangle
          className={cn("h-5 w-5", styles.iconClass)}
          aria-hidden="true"
        />
        <h2 className={cn("text-xl font-bold", styles.textClass)}>
          Something went wrong
        </h2>
      </div>

      {componentName && (
        <p className={cn("text-sm mb-2", styles.textClass)}>
          The {componentName} failed to load
        </p>
      )}

      {error?.message && (
        <div className="my-3 p-3 bg-white/80 dark:bg-black/20 rounded border border-gray-100 dark:border-gray-800 overflow-auto max-h-32">
          <p className={cn("text-sm font-mono break-words", styles.textClass)}>
            {error.message}
          </p>
        </div>
      )}

      {resetErrorBoundary && (
        <div className="mt-4">
          <button
            onClick={resetErrorBoundary}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors mx-auto",
              styles.buttonClass,
            )}
            aria-label="Try again"
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
}

// Export with error boundary
export default withErrorBoundary(ErrorFallbackExported, {
  componentName: "error-fallback",
  id: "error-fallback",
});

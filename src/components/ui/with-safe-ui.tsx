"use client";

import React from "react";
import { withErrorBoundary } from "@/components/ui/error-boundary";

/**
 * Higher-order component that wraps UI components with error boundaries
 * Designed specifically for UI components with consistent error handling
 *
 * @param Component The UI component to wrap
 * @param options Optional configuration options
 * @returns A component wrapped with error boundary
 */
export function withSafeUI<P extends object>(
  Component: React.ComponentType<P>,
  options?: {
    componentName?: string;
    id?: string;
    fallback?: React.ReactNode;
  },
): React.ComponentType<P> {
  const displayName =
    options?.componentName ||
    Component.displayName ||
    Component.name ||
    "UIComponent";
  const id = options?.id || displayName.toLowerCase();

  // Use the withErrorBoundary HOC with UI-specific settings
  return withErrorBoundary(
    Component,
    displayName,
    options?.fallback || (
      <div className="p-2 text-sm text-red-500 border border-red-200 rounded bg-red-50">
        UI component failed to render. Please try again.
      </div>
    )
  );
}

export default withSafeUI;

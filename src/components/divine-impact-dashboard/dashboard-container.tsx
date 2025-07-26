"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { withErrorBoundary } from "@/components/ui/error-boundary";

interface DashboardContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Dashboard Container Component
 * Provides the outer container for the dashboard
 */
function DashboardContainer({
  children,
  className = "",
}: DashboardContainerProps) {
  return (
    <div
      className={cn(
        "bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6",
        "border border-gray-100 dark:border-gray-800",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default withErrorBoundary(DashboardContainer, "DashboardContainer");

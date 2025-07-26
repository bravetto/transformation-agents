"use client";

import React from "react";
import { RefreshCw } from "lucide-react";
import useDashboard from "./context";
import { withErrorBoundary } from "@/components/ui/error-boundary";

/**
 * Dashboard Header Component
 * Displays the dashboard title and refresh controls
 */
function DashboardHeader() {
  const { refreshData, lastUpdated, loading } = useDashboard();

  // Format the last updated time
  const formattedTime = lastUpdated
    ? new Intl.DateTimeFormat("en-US", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).format(lastUpdated)
    : "Never";

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Divine Impact Dashboard
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Real-time metrics tracking the impact of The Bridge Project
        </p>
      </div>

      <div className="flex items-center mt-4 sm:mt-0">
        <div className="text-xs text-gray-500 dark:text-gray-400 mr-3">
          Last updated: {formattedTime}
        </div>
        <button
          onClick={() => refreshData()}
          disabled={loading}
          className={`p-2 rounded-full ${
            loading
              ? "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
              : "bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
          } transition-colors`}
          aria-label="Refresh data"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
        </button>
      </div>
    </div>
  );
}

export default withErrorBoundary(DashboardHeader, "DashboardHeader");

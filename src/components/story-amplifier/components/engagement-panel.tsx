"use client";

import React from "react";
import { Eye, Share2, Clock, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { EngagementPanelProps } from "../types";

/**
 * EngagementPanel Component
 * 
 * Displays engagement metrics for the story
 */
const EngagementPanel = ({ metrics, className }: EngagementPanelProps) => {
  return (
    <div className={cn("fixed bottom-4 left-4 z-40 hidden lg:block", className)}>
      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
        <div className="flex items-center space-x-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center">
            <Eye size={14} className="mr-1" />
            <span>{metrics.views.toLocaleString()} views</span>
          </div>

          <div className="flex items-center">
            <Share2 size={14} className="mr-1" />
            <span>{metrics.shares.toLocaleString()} shares</span>
          </div>

          <div className="flex items-center">
            <Clock size={14} className="mr-1" />
            <span>
              {Math.floor(metrics.readingTime / 60)} min avg. read
            </span>
          </div>

          <div className="flex items-center">
            <Users size={14} className="mr-1" />
            <span>12 reading now</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withSafeUI(EngagementPanel, {
  componentName: "EngagementPanel",
}); 
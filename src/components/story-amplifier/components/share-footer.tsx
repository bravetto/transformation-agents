"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import ShareButton from "./share-button";

/**
 * ShareFooter Component
 *
 * Displays a footer section with sharing options
 */
const ShareFooter = ({ className }: { className?: string }) => {
  return (
    <div className={cn("border-t dark:border-gray-800 pt-8 pb-16", className)}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="mb-6 md:mb-0">
          <h3 className="text-lg font-bold mb-2">Share This Story</h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm max-w-md">
            Did you find this story valuable? Help others discover it by
            sharing!
          </p>
        </div>

        <div className="flex space-x-3">
          <ShareButton platform="twitter" />
          <ShareButton platform="facebook" />
          <ShareButton platform="linkedin" />
          <ShareButton platform="email" />
          <ShareButton platform="copy" />
        </div>
      </div>
    </div>
  );
};

export default withSafeUI(ShareFooter, {
  componentName: "ShareFooter",
});

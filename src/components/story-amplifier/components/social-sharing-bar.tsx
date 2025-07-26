"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import ShareButton from "./share-button";

/**
 * SocialSharingBar Component
 *
 * Displays a fixed sidebar with social sharing buttons
 */
const SocialSharingBar = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "fixed left-4 top-1/2 transform -translate-y-1/2 z-40 hidden md:block",
        className,
      )}
    >
      <div className="flex flex-col space-y-3 bg-white/10 backdrop-blur-sm p-2 rounded-full">
        <ShareButton platform="twitter" />
        <ShareButton platform="facebook" />
        <ShareButton platform="linkedin" />
        <ShareButton platform="email" />
        <ShareButton platform="copy" />
      </div>
    </div>
  );
};

export default withSafeUI(SocialSharingBar, {
  componentName: "SocialSharingBar",
});

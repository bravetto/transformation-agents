"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "./with-safe-ui";

interface ResponsiveContainerProps {
  children: React.ReactNode;
  size?: "tight" | "default" | "wide" | "full";
  centered?: boolean;
  className?: string;
  padding?: boolean;
}

function ResponsiveContainer({
  children,
  size = "default",
  centered = true,
  className = "",
  padding = true,
}: ResponsiveContainerProps) {
  const sizeClasses = {
    tight: "max-w-3xl", // 768px - Good for text content
    default: "max-w-5xl", // 1024px - Standard sections
    wide: "max-w-7xl", // 1280px - Hero sections
    full: "max-w-full", // Full width
  };

  return (
    <div
      className={cn(
        "w-full mx-auto",
        padding && "px-4 sm:px-6 lg:px-8",
        sizeClasses[size],
        centered && "text-center",
        className,
      )}
    >
      {children}
    </div>
  );
}

export default withSafeUI(ResponsiveContainer, {
  componentName: "ResponsiveContainer",
});

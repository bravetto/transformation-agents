"use client";

import React from "react";
import { Twitter, Facebook, Linkedin, Mail, Link, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { ShareButtonProps } from "../types";
import { useStory } from "../context";

/**
 * ShareButton Component
 * 
 * A flexible button for sharing content on various social platforms
 */
const ShareButton = ({
  platform,
  size = "md",
  variant = "icon",
  label,
  className,
}: ShareButtonProps) => {
  const { handleShare, copiedToClipboard } = useStory();
  
  // Get icon based on platform
  const getIcon = () => {
    const iconSize = size === "sm" ? 14 : size === "md" ? 18 : 24;
    
    switch (platform) {
      case "twitter":
        return <Twitter size={iconSize} />;
      case "facebook":
        return <Facebook size={iconSize} />;
      case "linkedin":
        return <Linkedin size={iconSize} />;
      case "email":
        return <Mail size={iconSize} />;
      case "copy":
        return copiedToClipboard ? <Check size={iconSize} /> : <Link size={iconSize} />;
      default:
        return <Twitter size={iconSize} />;
    }
  };
  
  // Get color classes based on platform
  const getColorClasses = () => {
    switch (platform) {
      case "twitter":
        return "hover:bg-blue-500 hover:text-white";
      case "facebook":
        return "hover:bg-blue-700 hover:text-white";
      case "linkedin":
        return "hover:bg-blue-600 hover:text-white";
      case "email":
        return "hover:bg-green-600 hover:text-white";
      case "copy":
        return "hover:bg-purple-600 hover:text-white";
      default:
        return "hover:bg-gray-600 hover:text-white";
    }
  };
  
  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case "sm":
        return variant === "icon" ? "p-2" : "px-2 py-1 text-xs";
      case "md":
        return variant === "icon" ? "p-3" : "px-3 py-2 text-sm";
      case "lg":
        return variant === "icon" ? "p-4" : "px-4 py-3";
      default:
        return variant === "icon" ? "p-3" : "px-3 py-2 text-sm";
    }
  };
  
  // Get variant classes
  const getVariantClasses = () => {
    switch (variant) {
      case "icon":
        return "rounded-full";
      case "button":
        return "rounded-md font-medium";
      case "icon-label":
        return "rounded-md font-medium flex items-center";
      default:
        return "rounded-full";
    }
  };
  
  // Get background classes
  const getBackgroundClasses = () => {
    return variant === "button" 
      ? "bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm" 
      : "bg-white/20 dark:bg-gray-800/20 backdrop-blur-sm";
  };
  
  // Get the label to display
  const getDisplayLabel = () => {
    if (variant === "icon") return null;
    
    if (label) return label;
    
    switch (platform) {
      case "twitter":
        return "Twitter";
      case "facebook":
        return "Facebook";
      case "linkedin":
        return "LinkedIn";
      case "email":
        return "Email";
      case "copy":
        return copiedToClipboard ? "Copied!" : "Copy Link";
      default:
        return "Share";
    }
  };
  
  return (
    <button
      onClick={() => handleShare(platform)}
      className={cn(
        getBackgroundClasses(),
        getColorClasses(),
        getSizeClasses(),
        getVariantClasses(),
        "transition-colors",
        className
      )}
      aria-label={`Share on ${platform}`}
    >
      {variant === "icon-label" && (
        <>
          {getIcon()}
          <span className={size === "sm" ? "ml-1" : "ml-2"}>{getDisplayLabel()}</span>
        </>
      )}
      
      {variant === "button" && getDisplayLabel()}
      
      {variant === "icon" && getIcon()}
    </button>
  );
};

export default withSafeUI(ShareButton, {
  componentName: "ShareButton",
}); 
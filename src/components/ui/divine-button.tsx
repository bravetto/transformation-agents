"use client";

import React, { useState, useEffect } from "react";
import { Button, ButtonProps } from "./button";
import {
  trackConversion,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";

interface DivineButtonProps extends ButtonProps {
  href?: string;
  trackingData?: {
    eventType?:
      | "cta_clicked"
      | "form_submitted"
      | "social_shared"
      | "goal_achieved";
    source?: string;
    metadata?: Record<string, any>;
  };
  enableHydrationFix?: boolean;
}

export function DivineButton({
  children,
  onClick,
  href,
  trackingData,
  enableHydrationFix = true,
  ...props
}: DivineButtonProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Ensure component is hydrated before enabling interactions
    setIsHydrated(true);
  }, []);

  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!isHydrated && enableHydrationFix) {
      event.preventDefault();
      return;
    }

    setIsLoading(true);

    try {
      // Track analytics if provided
      if (trackingData) {
        trackConversion({
          eventType: trackingData.eventType || "cta_clicked",
          userType: getCurrentUserType(),
          conversionType: "primary",
          metadata: {
            source: trackingData.source || "divine_button",
            ...trackingData.metadata,
          },
        });
      }

      // Handle navigation
      if (href) {
        if (href.startsWith("http") || href.startsWith("//")) {
          // External link
          window.open(href, "_blank", "noopener,noreferrer");
        } else {
          // Internal navigation
          window.location.href = href;
        }
      }

      // Call original onClick handler
      if (onClick) {
        await onClick(event);
      }
    } catch (error) {
      console.error("Divine Button Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Prevent rendering until hydrated if hydration fix is enabled
  if (enableHydrationFix && !isHydrated) {
    return (
      <Button {...props} disabled>
        {children}
      </Button>
    );
  }

  return (
    <Button
      {...props}
      onClick={handleClick}
      disabled={props.disabled || isLoading}
    >
      {isLoading ? "Loading..." : children}
    </Button>
  );
}

export default DivineButton;

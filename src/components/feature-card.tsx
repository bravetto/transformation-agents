"use client";

import React from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { Card, Text, Heading } from "@/components/ui";
import { RevealOnScroll } from "@/components/ui/page-transition";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  variant?:
    | "default"
    | "outline"
    | "light"
    | "primary"
    | "secondary"
    | "ghost"
    | "divine"
    | "glow"
    | "accent"
    | "subtle";
  className?: string;
  delay?: number;
  size?: "small" | "medium" | "large" | "featured";
  emphasis?: "standard" | "primary" | "secondary";
  actionLabel?: string;
  actionHref?: string;
  minHeight?: boolean; // Add minimum height to ensure card height consistency
}

function FeatureCardExported({
  title,
  description,
  icon,
  variant = "default",
  className,
  delay = 0,
  size = "medium",
  emphasis = "standard",
  actionLabel,
  actionHref,
  minHeight = true,
}: FeatureCardProps) {
  // Size variants with standardized padding and spacing
  const sizeMap = {
    small: {
      padding: "medium" as const, // maps to Card padding variants
      headingSize: "h5" as const, // maps to Heading size variants
      textSize: "sm" as const, // maps to Text size variants
      iconSize: "text-2xl mb-4",
    },
    medium: {
      padding: "large" as const,
      headingSize: "h4" as const,
      textSize: "base" as const, // Changed from 'md' to 'base'
      iconSize: "text-3xl mb-5",
    },
    large: {
      padding: "large" as const,
      headingSize: "h3" as const,
      textSize: "lg" as const,
      iconSize: "text-4xl mb-6",
    },
    featured: {
      padding: "xl" as const,
      headingSize: "h2" as const,
      textSize: "xl" as const,
      iconSize: "text-5xl mb-6",
    },
  };

  // Emphasis variants to highlight important cards
  const emphasisMap = {
    standard: {
      cardVariant: variant,
      headingColor: "default" as const,
      scale: "hover:scale-[1.02]",
      shadow: "md" as const,
      border: "",
    },
    primary: {
      cardVariant: "primary" as const,
      headingColor: "primary" as const,
      scale: "hover:scale-[1.03]",
      shadow: "lg" as const,
      border: "border-2 border-hope-gold/20",
    },
    secondary: {
      cardVariant: "secondary" as const,
      headingColor: "secondary" as const,
      scale: "hover:scale-[1.02]",
      shadow: "md" as const,
      border: "border border-courage-blue/20",
    },
  };

  const currentSize = sizeMap[size];
  const currentEmphasis = emphasisMap[emphasis];

  // Define minimum height based on size
  const minHeightClasses = minHeight
    ? {
        small: "min-h-[200px]",
        medium: "min-h-[240px]",
        large: "min-h-[280px]",
        featured: "min-h-[320px]",
      }
    : {
        small: "",
        medium: "",
        large: "",
        featured: "",
      };

  return (
    <RevealOnScroll delay={delay}>
      <Card
        variant={currentEmphasis.cardVariant}
        padding={currentSize.padding}
        shadow={currentEmphasis.shadow}
        className={cn(
          "h-full transition-all duration-300 flex flex-col",
          currentEmphasis.scale,
          currentEmphasis.border,
          minHeight ? minHeightClasses[size] : "",
          className,
        )}
      >
        {icon && <div className={cn("mb-4", currentSize.iconSize)}>{icon}</div>}

        <Heading
          as="h3"
          size={currentSize.headingSize}
          textColor={currentEmphasis.headingColor}
          className="mb-3"
        >
          {title}
        </Heading>

        <Text size={currentSize.textSize} textColor="muted" className="mb-4">
          {description}
        </Text>

        {actionLabel && actionHref && (
          <div className="mt-auto pt-4">
            <a
              href={actionHref}
              className={cn(
                "inline-flex items-center text-sm font-medium",
                emphasis === "primary" ? "text-hope-gold" : "text-courage-blue",
                "hover:underline",
              )}
            >
              {actionLabel}
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </div>
        )}
      </Card>
    </RevealOnScroll>
  );
}

// Export with error boundary
export default withErrorBoundary(FeatureCardExported, {
  componentName: "feature-card",
  id: "feature-card",
});

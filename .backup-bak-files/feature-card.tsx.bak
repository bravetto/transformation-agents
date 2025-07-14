"use client";

import React, { memo } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { BaseCard } from "./base-card";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

/**
 * Props for the FeatureCard component
 */
interface FeatureCardProps {
  /** Icon to display */
  icon: LucideIcon;
  /** Feature title */
  title: string;
  /** Feature description */
  description: string;
  /** Optional metrics to display */
  metrics?: {
    value: string;
    label: string;
  }[];
  /** Card variant */
  variant?: "default" | "elevated" | "outlined" | "divine";
  /** Spacing preset */
  spacing?: "compact" | "comfortable" | "spacious";
  /** Click handler */
  onClick?: () => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * FeatureCard - Displays a feature with icon, title, description, and optional metrics
 *
 * @example
 * ```tsx
 * <FeatureCard
 *   icon={Shield}
 *   title="Real-time Monitoring"
 *   description="Track every interaction with complete transparency"
 *   metrics={[
 *     { value: "24/7", label: "Monitoring" },
 *     { value: "100%", label: "Transparency" }
 *   ]}
 *   variant="elevated"
 * />
 * ```
 */
const FeatureCardComponent = memo<FeatureCardProps>(
  ({
    icon: Icon,
    title,
    description,
    metrics,
    variant = "elevated",
    spacing = "comfortable",
    onClick,
    className,
  }) => {
    return (
      <BaseCard
        variant={variant}
        spacing={spacing}
        onClick={onClick}
        className={cn("flex flex-col", className)}
        ariaLabel={`Feature: ${title}`}
      >
        {/* Icon with animated background */}
        <div className="mb-4 relative">
          <div className="w-12 h-12 rounded-lg bg-hope-gold/10 flex items-center justify-center group-hover:bg-hope-gold/20 transition-colors duration-200">
            <Icon className="w-6 h-6 text-hope-gold" aria-hidden="true" />
          </div>
          {/* Pulse effect for interactive cards */}
          {onClick && (
            <div className="absolute inset-0 rounded-lg bg-hope-gold/20 animate-ping" />
          )}
        </div>

        {/* Content */}
        <h3 className="text-lg font-semibold text-gentle-charcoal mb-2">
          {title}
        </h3>

        <p className="text-soft-shadow flex-grow mb-4">{description}</p>

        {/* Metrics Grid */}
        {metrics && metrics.length > 0 && (
          <div
            className={cn(
              "grid gap-3 pt-4 border-t border-quiet-stone/20",
              metrics.length === 2 && "grid-cols-2",
              metrics.length === 3 && "grid-cols-3",
              metrics.length > 3 && "grid-cols-2",
            )}
          >
            {metrics.map((metric, index) => (
              <div key={index} className="text-center">
                <div className="text-xl font-bold text-hope-gold">
                  {metric.value}
                </div>
                <div className="text-xs text-soft-shadow">{metric.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* Interactive indicator */}
        {onClick && (
          <div className="mt-4 flex items-center justify-end text-hope-gold">
            <span className="text-sm font-medium">Learn more</span>
            <svg
              className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
        )}
      </BaseCard>
    );
  },
);

FeatureCardComponent.displayName = "FeatureCard";

export const FeatureCard = withDivineErrorBoundary(FeatureCardComponent, {
  componentName: "FeatureCard",
  fallback: (
    <div className="p-6 bg-red-50 text-red-600 rounded-lg">
      Feature card failed to load
    </div>
  ),
});

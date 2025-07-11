"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

/**
 * Props for the BaseCard component
 */
interface BaseCardProps {
  /** Spacing preset for the card */
  spacing?: "compact" | "comfortable" | "spacious";
  /** Visual variant of the card */
  variant?: "default" | "elevated" | "outlined" | "divine";
  /** Additional CSS classes */
  className?: string;
  /** Child elements */
  children: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Whether the card is interactive */
  interactive?: boolean;
  /** Accessibility role */
  role?: string;
  /** Accessibility label */
  ariaLabel?: string;
}

/**
 * BaseCard - Foundation card component using unified spacing system
 *
 * @example
 * ```tsx
 * <BaseCard spacing="comfortable" variant="elevated">
 *   Card content
 * </BaseCard>
 * ```
 */
const BaseCardComponent = memo<BaseCardProps>(
  ({
    spacing = "comfortable",
    variant = "default",
    className,
    children,
    onClick,
    interactive = false,
    role,
    ariaLabel,
  }) => {
    const isClickable = onClick || interactive;

    const Component = isClickable ? "button" : "div";

    return (
      <Component
        className={cn(
          // Base styles
          "rounded-lg transition-all duration-200",

          // Spacing variants using CSS custom properties
          spacing === "compact" && "p-4 gap-3",
          spacing === "comfortable" && "p-6 gap-4",
          spacing === "spacious" && "p-8 gap-6",

          // Visual variants
          variant === "default" && "bg-white",
          variant === "elevated" && "bg-white shadow-lg hover:shadow-xl",
          variant === "outlined" &&
            "bg-transparent border-2 border-quiet-stone",
          variant === "divine" &&
            "bg-gradient-to-br from-hope-gold/10 to-courage-blue/10 border border-hope-gold/20",

          // Interactive states
          isClickable && [
            "cursor-pointer",
            "hover:scale-[1.02]",
            "active:scale-[0.98]",
            "focus:outline-none focus:ring-2 focus:ring-hope-gold focus:ring-offset-2",
          ],

          // Custom classes
          className,
        )}
        onClick={onClick}
        role={role || (isClickable ? "button" : undefined)}
        aria-label={ariaLabel}
        tabIndex={isClickable ? 0 : undefined}
        onKeyDown={
          isClickable
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
      >
        {children}
      </Component>
    );
  },
);

BaseCardComponent.displayName = "BaseCard";

export const BaseCard = withDivineErrorBoundary(BaseCardComponent, {
  componentName: "BaseCard",
  fallback: (
    <div className="p-6 bg-red-50 text-red-600 rounded-lg">
      Card failed to load
    </div>
  ),
});

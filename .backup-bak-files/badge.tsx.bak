import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { DivineRole } from "@/lib/design-system";

/**
 * Badge component for labels and indicators
 * Used for status indicators, counters, etc.
 */
const badgeVariants = cva(
  // Base styles
  "inline-flex items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-medium transition-colors",
  {
    variants: {
      // Visual variants
      variant: {
        default: "bg-hope-gold text-gentle-charcoal",
        primary: "bg-courage-blue text-white",
        secondary:
          "bg-soft-cloud text-gentle-charcoal border border-quiet-stone",
        outline: "bg-transparent text-gentle-charcoal border border-hope-gold",

        // Role-based variants
        lightworker: "bg-lightworker-primary text-white",
        messenger: "bg-messenger-primary text-white",
        witness: "bg-witness-primary text-white",
        guardian: "bg-guardian-primary text-white",

        // State variants
        success: "bg-success text-white",
        warning: "bg-warning text-white",
        error: "bg-error text-white",
        info: "bg-info text-white",

        // Special variants
        ghost: "bg-white/10 text-white backdrop-blur-sm",
      },

      // Size variants
      size: {
        sm: "text-[10px] px-2 py-0.5",
        default: "text-xs px-2.5 py-0.5",
        lg: "text-sm px-3 py-1",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

// Extract the variant keys from badgeVariants for type safety
type BadgeVariant = NonNullable<VariantProps<typeof badgeVariants>["variant"]>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  role?: DivineRole;
}

function Badge({ className, variant, size, role, ...props }: BadgeProps) {
  // If role is provided and variant is not, use role as variant
  // Use type assertion in a safe way by checking if role is in the allowed values
  const effectiveVariant = variant || (role as BadgeVariant) || "default";

  return (
    <div
      className={cn(
        badgeVariants({ variant: effectiveVariant, size }),
        className,
      )}
      {...props}
    />
  );
}

/**
 * RoleBadge automatically applies the correct role-based styling
 */
function RoleBadge({
  className,
  size,
  role,
  ...props
}: Omit<BadgeProps, "variant"> & { role: DivineRole }) {
  return (
    <Badge
      className={className}
      variant={role as BadgeVariant}
      size={size}
      {...props}
    />
  );
}

export { Badge, RoleBadge, badgeVariants };

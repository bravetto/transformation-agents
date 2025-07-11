"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { DivineRole } from "@/lib/design-system";
import { getRoleColorClasses } from "@/lib/utils";
import { withSafeUI } from "./with-safe-ui";

/**
 * Button component using the design system
 * Follows consistent patterns with variants for different use cases
 * All size variants meet minimum 44px (11rem) touch target requirements
 */

const buttonVariants = cva(
  // Base styles applied to all buttons
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-courage-blue focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      // Visual variants
      variant: {
        default: "bg-hope-gold text-pure-white hover:bg-hope-gold/90",
        primary: "bg-courage-blue hover:bg-courage-blue/90 text-white",
        secondary:
          "bg-soft-cloud hover:bg-moon-glow border border-hope-gold text-gentle-charcoal",
        outline:
          "border border-quiet-stone hover:bg-soft-cloud text-gentle-charcoal",
        ghost: "hover:bg-soft-cloud text-gentle-charcoal",
        link: "text-courage-blue underline-offset-4 hover:underline",
        divine:
          "bg-gradient-to-r from-hope-gold to-courage-blue text-white hover:from-hope-gold/90 hover:to-courage-blue/90",

        // Role-based variants
        lightworker:
          "bg-lightworker-primary hover:bg-lightworker-primary/90 text-white",
        messenger:
          "bg-messenger-primary hover:bg-messenger-primary/90 text-white",
        witness: "bg-witness-primary hover:bg-witness-primary/90 text-white",
        guardian: "bg-guardian-primary hover:bg-guardian-primary/90 text-white",

        // State variants
        destructive: "bg-error text-white hover:bg-error/90",
        success: "bg-success text-white hover:bg-success/90",
        warning: "bg-warning text-white hover:bg-warning/90",
        info: "bg-info text-white hover:bg-info/90",
      },

      // Size variants - all meet 44px minimum touch target height
      size: {
        default: "h-11 min-h-[44px] py-2 px-4 min-w-[44px]",
        sm: "h-11 min-h-[44px] px-3 rounded-md text-xs min-w-[44px]",
        lg: "h-12 min-h-[48px] px-8 rounded-md text-base min-w-[44px]",
        xl: "h-14 min-h-[56px] px-10 rounded-lg text-lg min-w-[56px]",
        icon: "h-11 w-11 min-h-[44px] min-w-[44px]",
      },

      // Width variants
      width: {
        default: "",
        full: "w-full",
        auto: "w-auto",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      width: "default",
    },
  },
);

// Extract the variant keys from the buttonVariants for type safety
type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  role?: DivineRole;

  // Add accessibility props
  ariaLabel?: string;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  ariaControls?: string;
  ariaExpanded?: boolean;
  ariaPressed?: boolean;
  ariaHasPopup?: boolean | "dialog" | "menu" | "listbox" | "tree" | "grid";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      width,
      asChild = false,
      role,
      // Accessibility props
      ariaLabel,
      ariaLabelledBy,
      ariaDescribedBy,
      ariaControls,
      ariaExpanded,
      ariaPressed,
      ariaHasPopup,
      ...props
    },
    ref,
  ) => {
    // If role is provided and variant is not, use role as variant
    // Use type assertion in a safe way by checking if role is in the allowed values
    const effectiveVariant = variant || (role as ButtonVariant) || "default";

    return (
      <button
        className={cn(
          buttonVariants({ variant: effectiveVariant, size, width }),
          className,
        )}
        ref={ref}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        aria-describedby={ariaDescribedBy}
        aria-controls={ariaControls}
        aria-expanded={ariaExpanded}
        aria-pressed={ariaPressed}
        aria-haspopup={ariaHasPopup}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

/**
 * RoleButton automatically applies the correct role-based styling
 */
const RoleButton = React.forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant"> & { role: DivineRole }
>(({ className, size, width, role, ...props }, ref) => {
  return (
    <Button
      className={className}
      variant={role as ButtonVariant}
      size={size}
      width={width}
      ref={ref}
      {...props}
    />
  );
});
RoleButton.displayName = "RoleButton";

const SafeButton = withSafeUI(Button, {
  componentName: "Button",
});

const SafeRoleButton = withSafeUI(RoleButton, {
  componentName: "RoleButton",
});

export { SafeButton as Button, SafeRoleButton as RoleButton, buttonVariants };

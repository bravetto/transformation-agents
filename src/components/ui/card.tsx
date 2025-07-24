import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Card component using the design system
 * A flexible container with different variants
 */

const cardVariants = cva(
  // Base styles applied to all cards
  "rounded-lg overflow-hidden",
  {
    variants: {
      // Visual variants
      variant: {
        default: "bg-pure-white border border-quiet-stone",
        primary: "bg-soft-cloud border border-quiet-stone",
        secondary: "bg-moon-glow border border-quiet-stone",
        outline: "border-2 border-hope-gold bg-transparent",
        ghost: "bg-transparent",
        // Updated divine and glow for better contrast
        divine: "bg-comfort-cream border border-hope-gold/30",
        glow: "bg-pure-white border border-hope-gold shadow-md shadow-gray-200",
        light: "bg-soft-cloud border border-quiet-stone",
        // Add accent as an alias for primary
        accent: "bg-soft-cloud border border-quiet-stone",
        // Add subtle as an alias for ghost
        subtle: "bg-transparent",
      },

      // Padding variants
      padding: {
        none: "",
        sm: "p-4",
        md: "p-6",
        lg: "p-8",
        xl: "p-10",
        // Add aliases for semantic names
        small: "p-4",
        medium: "p-6",
        large: "p-8",
      },

      // Shadow variants
      shadow: {
        none: "",
        sm: "shadow-sm",
        md: "shadow-md",
        lg: "shadow-lg",
        xl: "shadow-xl",
      },
    },
    defaultVariants: {
      variant: "default",
      padding: "md",
      shadow: "none",
    },
  },
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Card component
 */
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, shadow, ...props }, ref) => {
    return (
      <div
        className={cn(cardVariants({ variant, padding, shadow, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Card.displayName = "Card";

/**
 * Card Header component
 */
const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

/**
 * Card Title component
 */
const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight text-gentle-charcoal",
      className,
    )}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

/**
 * Card Description component
 */
const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-soft-shadow", className)}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

/**
 * Card Content component
 */
const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
CardContent.displayName = "CardContent";

/**
 * Card Footer component
 */
const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center pt-4 border-t border-quiet-stone",
      className,
    )}
    {...props}
  />
));
CardFooter.displayName = "CardFooter";

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  cardVariants,
};

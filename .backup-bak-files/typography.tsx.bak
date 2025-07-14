import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Typography components using the design system
 * Consistent text styling throughout the application
 * Improved for scannability and information hierarchy
 */

// Heading component with enhanced visual hierarchy
const headingVariants = cva("font-bold tracking-tight", {
  variants: {
    size: {
      // Enhanced scale for better hierarchy and scannability
      h1: "text-5xl md:text-6xl lg:text-7xl leading-[1.1]", // Largest, for page titles
      h2: "text-4xl md:text-5xl lg:text-6xl leading-[1.15]", // Section titles
      h3: "text-3xl md:text-4xl lg:text-5xl leading-[1.2]", // Major subsections
      h4: "text-2xl md:text-3xl lg:text-4xl leading-[1.25]", // Minor subsections
      h5: "text-xl md:text-2xl lg:text-3xl leading-[1.3]", // Component titles
      h6: "text-lg md:text-xl lg:text-2xl leading-[1.35]", // Small titles
    },
    textColor: {
      default: "text-gentle-charcoal",
      primary: "text-gentle-charcoal",
      secondary: "text-soft-shadow",
      accent: "text-hope-gold",
      muted: "text-whisper-gray",
      red: "text-red-600",
      gradient:
        "bg-gradient-to-r from-hope-gold to-courage-blue bg-clip-text text-transparent",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
      extrabold: "font-extrabold",
    },
    alignment: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
  },
  defaultVariants: {
    size: "h1",
    textColor: "default",
    weight: "bold",
    alignment: "left",
  },
});

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
}

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>(
  (
    { className, size, textColor, weight, alignment, as = "h1", ...props },
    ref,
  ) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(
          headingVariants({ size, textColor, weight, alignment, className }),
        )}
        {...props}
      />
    );
  },
);
Heading.displayName = "Heading";

// Text component with improved readability and scanning options
const textVariants = cva("", {
  variants: {
    size: {
      xs: "text-xs leading-5",
      sm: "text-sm leading-6",
      base: "text-base leading-7",
      lg: "text-lg leading-8",
      xl: "text-xl leading-9",
      "2xl": "text-2xl leading-10",
      "3xl": "text-3xl leading-[1.3]",
      "4xl": "text-4xl leading-[1.2]",
    },
    textColor: {
      default: "text-gentle-charcoal",
      primary: "text-gentle-charcoal",
      secondary: "text-soft-shadow",
      accent: "text-hope-gold",
      muted: "text-whisper-gray",
      error: "text-error",
      success: "text-growth-green",
      red: "text-red-600",
      gradient:
        "bg-gradient-to-r from-hope-gold to-courage-blue bg-clip-text text-transparent",
    },
    weight: {
      normal: "font-normal",
      medium: "font-medium",
      semibold: "font-semibold",
      bold: "font-bold",
    },
    alignment: {
      left: "text-left",
      center: "text-center",
      right: "text-right",
    },
    emphasis: {
      none: "",
      underline: "underline underline-offset-4",
      italic: "italic",
      highlight: "bg-hope-gold/10 px-1 rounded",
    },
    truncate: {
      none: "",
      single: "truncate",
      multi: "line-clamp-2",
      triple: "line-clamp-3",
    },
  },
  defaultVariants: {
    size: "base",
    textColor: "default",
    weight: "normal",
    alignment: "left",
    emphasis: "none",
    truncate: "none",
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: "p" | "span" | "div";
}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  (
    {
      className,
      size,
      textColor,
      weight,
      alignment,
      emphasis,
      truncate,
      as = "p",
      ...props
    },
    ref,
  ) => {
    const Component = as;
    return (
      <Component
        ref={ref}
        className={cn(
          textVariants({
            size,
            textColor,
            weight,
            alignment,
            emphasis,
            truncate,
            className,
          }),
        )}
        {...props}
      />
    );
  },
);
Text.displayName = "Text";

// Quote component with enhanced styling
export interface QuoteProps extends React.HTMLAttributes<HTMLQuoteElement> {
  size?: "sm" | "base" | "lg" | "md";
  attribution?: string;
  variant?: "default" | "accent" | "subtle";
}

const Quote = React.forwardRef<HTMLQuoteElement, QuoteProps>(
  (
    { className, size = "base", attribution, variant = "default", ...props },
    ref,
  ) => {
    const sizeClasses = {
      sm: "text-sm",
      base: "text-base",
      md: "text-base", // 'md' as alias for 'base'
      lg: "text-lg md:text-xl",
    };

    const variantClasses = {
      default: "border-l-4 border-hope-gold pl-6 italic text-soft-shadow",
      accent:
        "border-l-4 border-hope-gold pl-6 italic text-hope-gold bg-hope-gold/5 py-2 pr-4 rounded-r",
      subtle: "border-l-2 border-hope-gold/50 pl-4 italic text-soft-shadow",
    };

    return (
      <figure className="my-6">
        <blockquote
          ref={ref}
          className={cn(variantClasses[variant], sizeClasses[size], className)}
          {...props}
        />
        {attribution && (
          <figcaption className="mt-2 text-sm text-soft-shadow pl-6">
            — {attribution}
          </figcaption>
        )}
      </figure>
    );
  },
);
Quote.displayName = "Quote";

export { Heading, Text, Quote, headingVariants, textVariants };

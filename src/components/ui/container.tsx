import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

/**
 * Container component variant definition
 * Used to create responsive, centered containers with appropriate padding
 */
const containerVariants = cva(
  // Base styles that apply to all containers
  "mx-auto px-4",
  {
    variants: {
      // Size variants
      size: {
        sm: "max-w-screen-sm", // 640px
        md: "max-w-screen-md", // 768px
        lg: "max-w-screen-lg", // 1024px
        xl: "max-w-screen-xl", // 1280px
        "2xl": "max-w-screen-2xl", // 1400px
        full: "max-w-full", // No max width
        hero: "max-w-7xl", // Optimized for hero sections (1280px)
        content: "max-w-5xl", // Optimized for content (960px)
        prose: "max-w-prose", // Optimized for readable text (65ch)
      },

      // Padding variants - allowing responsive customization
      padding: {
        none: "px-0",
        small: "px-4",
        medium: "px-4 sm:px-6",
        large: "px-4 sm:px-6 lg:px-8",
        hero: "px-4 sm:px-6 lg:px-8",
      },

      // Vertical padding variants
      py: {
        none: "py-0",
        small: "py-4",
        medium: "py-6 md:py-8",
        large: "py-8 md:py-12",
        hero: "py-12 md:py-16 lg:py-20",
      },
    },

    // Default values
    defaultVariants: {
      size: "xl",
      padding: "medium",
      py: "none",
    },
  },
);

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: React.ElementType;
  children: React.ReactNode;
}

/**
 * Container component
 * Used for consistent horizontal spacing and max-width
 */
export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  (
    { className, size, padding, py, as: Component = "div", children, ...props },
    ref,
  ) => {
    return (
      <Component
        className={cn(containerVariants({ size, padding, py, className }))}
        ref={ref}
        {...props}
      >
        {children}
      </Component>
    );
  },
);

Container.displayName = "Container";

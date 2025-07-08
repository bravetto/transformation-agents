"use client";

import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SectionProps {
  variant?:
    | "default"
    | "hero"
    | "feature"
    | "cta"
    | "subtle"
    | "light"
    | "divine"
    | "gradient";
  className?: string;
  children: ReactNode;
  container?: boolean;
  title?: string;
  subtitle?: string;
  centered?: boolean;
  padding?: "small" | "medium" | "large";
  id?: string;
}

function Section({
  variant = "default",
  className,
  children,
  container = true,
  title,
  subtitle,
  centered = false,
  padding = "medium",
  id,
}: SectionProps) {
  const baseStyles = "relative w-full";

  const variantStyles = {
    default: "bg-white",
    hero: "bg-soft-cloud",
    feature: "bg-comfort-cream",
    cta: "bg-gradient-to-r from-hope-gold to-courage-blue text-white",
    subtle: "bg-soft-cloud",
    light: "bg-comfort-cream",
    divine: "bg-gradient-to-br from-hope-gold/10 to-courage-blue/10",
    gradient: "bg-gradient-to-r from-courage-blue to-hope-gold text-white",
  };

  const paddingStyles = {
    small: "py-8 md:py-12",
    medium: "py-16 md:py-24",
    large: "py-20 md:py-28 lg:py-32",
  };

  return (
    <section
      id={id}
      className={cn(
        baseStyles,
        variantStyles[variant],
        paddingStyles[padding],
        className,
      )}
    >
      {container ? (
        <div className="container mx-auto px-4">
          {(title || subtitle) && (
            <div className={cn("mb-12", centered && "text-center")}>
              {title && (
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
              )}
              {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
            </div>
          )}
          {children}
        </div>
      ) : (
        <>
          {(title || subtitle) && (
            <div className={cn("mb-12 px-4", centered && "text-center")}>
              {title && (
                <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
              )}
              {subtitle && <p className="text-lg text-gray-600">{subtitle}</p>}
            </div>
          )}
          {children}
        </>
      )}
    </section>
  );
}

Section.displayName = "Section";

// Single export at the end
export default Section;

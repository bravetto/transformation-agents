"use client";

import React from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { Card } from "@/components/ui/card";
import { Text, Quote } from "@/components/ui/typography";
import { RevealOnScroll } from "@/components/ui/page-transition";
import { cn } from "@/lib/utils";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
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
  minHeight?: boolean;
}

function TestimonialCardExported({
  quote,
  author,
  role,
  variant = "default",
  className,
  delay = 0,
  minHeight = true,
}: TestimonialCardProps) {
  return (
    <RevealOnScroll delay={delay}>
      <Card
        variant={variant}
        padding="large"
        className={cn(
          "h-full flex flex-col",
          minHeight && "min-h-[240px]",
          className,
        )}
      >
        <Quote size="lg" className="mb-6 flex-grow">
          {quote}
        </Quote>

        <div className="mt-auto pt-4 flex items-center">
          <div>
            <Text weight="bold" textColor="accent" className="text-sm mb-1">
              {author}
            </Text>

            {role && (
              <Text size="sm" textColor="muted">
                {role}
              </Text>
            )}
          </div>
        </div>
      </Card>
    </RevealOnScroll>
  );
}

// Export with error boundary
export default withErrorBoundary(TestimonialCardExported, {
  componentName: "testimonial-card",
  id: "testimonial-card",
});

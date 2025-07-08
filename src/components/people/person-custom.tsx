"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { withErrorBoundary } from "@/components/with-error-boundary";
import React from "react";

// Import custom components dynamically
const TimelineComponent = dynamic(
  () => import("@/components/people/sections/timeline"),
  {
    ssr: true,
    loading: () => (
      <div className="h-80 flex items-center justify-center">
        Loading timeline...
      </div>
    ),
  },
);

const SynchronicityMap = dynamic(
  () => import("@/components/people/synchronicity-map"),
  {
    ssr: true,
    loading: () => (
      <div className="h-80 flex items-center justify-center">
        Loading synchronicity map...
      </div>
    ),
  },
);

const AssessmentAlignment = dynamic(
  () => import("@/components/people/assessment-alignment"),
  {
    ssr: true,
    loading: () => (
      <div className="h-80 flex items-center justify-center">
        Loading assessment alignment...
      </div>
    ),
  },
);

const JayForteTestimony = dynamic(
  () =>
    import("@/components/people/jay-forte-testimony").then((mod) => ({
      default: mod.JayForteTestimony,
    })),
  {
    ssr: true,
    loading: () => (
      <div className="h-80 flex items-center justify-center">
        Loading testimony...
      </div>
    ),
  },
);

// Define a type for the dynamic components
type DynamicComponent = React.ComponentType<any>;

// Map of component names to their dynamic imports with proper typing
const COMPONENT_MAP: Record<string, DynamicComponent> = {
  TimelineComponent: TimelineComponent as DynamicComponent,
  SynchronicityMap: SynchronicityMap as DynamicComponent,
  AssessmentAlignment: AssessmentAlignment as DynamicComponent,
  JayForteTestimony: JayForteTestimony as DynamicComponent,
  // Add more custom components as needed
};

// Define allowed component names for better type safety
export type CustomComponentName = keyof typeof COMPONENT_MAP;

export interface PersonCustomProps {
  title: string;
  description?: string;
  component: CustomComponentName;
  props?: Record<string, unknown>;
  className?: string;
}

function PersonCustom({
  title,
  description,
  component,
  props = {},
  className = "",
}: PersonCustomProps) {
  // Get the requested component with proper typing
  const CustomComponent = COMPONENT_MAP[component];

  // If component not found, show a warning
  if (!CustomComponent) {
    console.warn(`Custom component "${component}" not found in COMPONENT_MAP`);
    return null;
  }

  return (
    <section className={`py-16 md:py-24 bg-comfort-cream w-full ${className}`}>
      <div className="container-wide">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gentle-charcoal">
            {title}
          </h2>

          {description && (
            <p className="text-lg text-soft-shadow">{description}</p>
          )}
        </div>

        {/* Dynamic component */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <CustomComponent {...props} />
        </motion.div>
      </div>
    </section>
  );
}

export default withErrorBoundary(PersonCustom, {
  componentName: "PersonCustom",
  id: "person-custom",
});

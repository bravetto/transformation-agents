"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import React, { Suspense } from "react";

// Improved loading component
const LoadingComponent = () => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="animate-pulse bg-gray-100/10 rounded-md w-full h-48 flex items-center justify-center">
      <div className="text-gray-500">Loading sacred component...</div>
    </div>
  </div>
);

// Error fallback component
const ErrorFallback = ({ componentName }: { componentName: string }) => (
  <div className="min-h-[200px] flex items-center justify-center">
    <div className="bg-red-50 border border-red-200 rounded-md p-6 text-center">
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        Component Error
      </h3>
      <p className="text-sm text-red-600">
        The {componentName} component could not be loaded.
      </p>
    </div>
  </div>
);

// 🔧 SIMPLIFIED DYNAMIC IMPORTS - Fix for webpack module loading errors
// Removed complex .then() chains that were causing circular dependencies

const TimelineComponent = dynamic(
  () => import("@/components/people/sections/timeline"),
  {
    ssr: false,
    loading: LoadingComponent,
  },
);

const SynchronicityMap = dynamic(
  () => import("@/components/people/synchronicity-map"),
  {
    ssr: false,
    loading: LoadingComponent,
  },
);

const AssessmentAlignment = dynamic(
  () => import("@/components/people/assessment-alignment"),
  {
    ssr: false,
    loading: LoadingComponent,
  },
);

const JayForteTestimony = dynamic(
  () => import("@/components/people/jay-forte-testimony"),
  {
    ssr: false,
    loading: LoadingComponent,
  },
);

const HealingCircle = dynamic(
  () => import("@/components/people/HealingCircle"),
  {
    ssr: false,
    loading: LoadingComponent,
  },
);

const PatternWeaver = dynamic(
  () => import("@/components/people/PatternWeaver"),
  {
    ssr: false,
    loading: LoadingComponent,
  },
);

const ArchitecturePrinciples = dynamic(
  () => import("@/components/people/ArchitecturePrinciples"),
  {
    ssr: false,
    loading: LoadingComponent,
  },
);

const ClarityPrinciples = dynamic(
  () => import("@/components/people/ClarityPrinciples"),
  {
    ssr: false,
    loading: LoadingComponent,
  },
);

const MischiefPrinciples = dynamic(
  () => import("@/components/people/MischiefPrinciples"),
  {
    ssr: false,
    loading: LoadingComponent,
  },
);

const WisdomPrinciples = dynamic(
  () => import("@/components/people/WisdomPrinciples"),
  {
    ssr: false,
    loading: LoadingComponent,
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
  HealingCircle: HealingCircle as DynamicComponent,
  PatternWeaver: PatternWeaver as DynamicComponent,
  ArchitecturePrinciples: ArchitecturePrinciples as DynamicComponent,
  ClarityPrinciples: ClarityPrinciples as DynamicComponent,
  MischiefPrinciples: MischiefPrinciples as DynamicComponent,
  WisdomPrinciples: WisdomPrinciples as DynamicComponent,
};

// Define allowed component names for better type safety
export type CustomComponentName = keyof typeof COMPONENT_MAP;

interface PersonCustomProps {
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
  // Get the requested component with proper typing and validation
  const CustomComponent = COMPONENT_MAP[component];

  // If component not found, show a warning and fallback
  if (!CustomComponent) {
    console.warn(`Custom component "${component}" not found in COMPONENT_MAP`);
    return (
      <section
        className={`py-16 md:py-24 bg-comfort-cream w-full ${className}`}
      >
        <div className="container-wide">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gentle-charcoal">
              {title}
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-md p-6">
              <h3 className="text-lg font-semibold text-yellow-800 mb-2">
                Component Not Available
              </h3>
              <p className="text-sm text-yellow-600">
                The requested component "{component}" is not available.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
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

        {/* Dynamic component with Suspense wrapper */}
        <Suspense fallback={<LoadingComponent />}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <CustomComponent {...props} />
          </motion.div>
        </Suspense>
      </div>
    </section>
  );
}

export default withErrorBoundary(PersonCustom, "PersonCustom", (
    <section className="py-16 md:py-24 bg-comfort-cream w-full">
      <div className="container-wide">
        <div className="max-w-3xl mx-auto text-center">
          <div className="bg-red-50 border border-red-200 rounded-md p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">
              Custom Section Error
            </h3>
            <p className="text-sm text-red-600">
              This custom section could not be loaded. Please try refreshing the
              page.
            </p>
          </div>
        </div>
      </div>
    </section>
  ));

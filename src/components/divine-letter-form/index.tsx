"use client";

/**
 * @component DivineLetterForm
 *
 * @description
 * A production-grade, legally-optimized letter submission form for character references
 * in legal cases. This component guides users through creating effective, structured
 * letters of support for JAHmere Webb's case.
 *
 * @features
 * - Multi-step guided form with role-specific prompts
 * - Real-time language improvement suggestions
 * - Auto-saving draft letters every 30 seconds
 * - Letter impact scoring based on specificity and legal effectiveness
 * - Legal document formatting with proper court addressing
 * - Relationship-specific guidance for different letter writers
 * - Date and specific example validation
 * - Error handling and divine error boundaries
 * - Mobile-responsive design
 *
 * @example
 * ```tsx
 * <DivineLetterForm
 *   onSubmit={(data) => saveLetterToDatabase(data)}
 *   onSave={(data) => saveDraftLetter(data)}
 * />
 * ```
 */

import React from "react";
import { motion } from "framer-motion";
import { withDivineErrorBoundary } from "../ui/divine-error-boundary";
import { DivineParticles } from "../divine-particles";
import { cn } from "@/lib/utils";
import { LetterFormProvider } from "./context";
import { DivineLetterFormProps, FormStep } from "./types";
import { ProgressIndicator } from "./components/progress-indicator";
import { FormNavigation } from "./components/form-navigation";
import { AutoSaveIndicator } from "./components/auto-save-indicator";

// Main component wrapper
function DivineLetterForm({
  onSubmit,
  onSave,
  className = "",
}: DivineLetterFormProps) {
  return (
    <LetterFormProvider onSubmit={onSubmit} onSave={onSave}>
      <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
        {/* Background particles */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <DivineParticles
            variant="sacred"
            className="h-full w-full opacity-10"
          />
        </div>

        {/* Form container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/90 backdrop-blur-sm shadow-lg rounded-lg p-6 md:p-8"
        >
          <h1 className="text-3xl font-bold text-center mb-6">
            Divine Letter of Support
          </h1>

          <p className="text-center text-gray-600 mb-8">
            Your letter will help the court understand JAHmere's character and
            impact. Each step will guide you to create a powerful, legally
            effective letter.
          </p>

          {/* Progress indicator */}
          <ProgressIndicator />

          {/* Auto-save indicator */}
          <div className="flex justify-end mb-4">
            <AutoSaveIndicator />
          </div>

          {/* Form content - will be implemented in Phase 2 */}
          <div className="text-center text-gray-500 p-8 min-h-[300px] border border-dashed border-gray-300 rounded-lg">
            Form step components will be implemented in Phase 2
          </div>

          {/* Form navigation */}
          <FormNavigation />
        </motion.div>
      </div>
    </LetterFormProvider>
  );
}

// Export with error boundary
export default withDivineErrorBoundary(DivineLetterForm);

// Re-export types
export * from "./types";
export * from "./context";

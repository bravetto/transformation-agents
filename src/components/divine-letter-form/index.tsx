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
import { motion, AnimatePresence } from "framer-motion";
import { withErrorBoundary } from "@/components/ui/error-boundary";
// DivineParticles removed for hydration stability
import { cn } from "@/lib/utils";
import { LetterFormProvider, useLetterForm } from "./context";
import { DivineLetterFormProps, FormStep } from "./types";
import { ProgressIndicator } from "./components/progress-indicator";
import { FormNavigation } from "./components/form-navigation";
import { AutoSaveIndicator } from "./components/auto-save-indicator";
import LetterPreview from "./components/letter-preview";
import PersonalInfo from "./components/form-steps/personal-info";
import Relationship from "./components/form-steps/relationship";
import Examples from "./components/form-steps/examples";
import LetterContent from "./components/form-steps/letter-content";
import Review from "./components/form-steps/review";

// Main component wrapper
function DivineLetterForm({
  onSubmit,
  onSave,
  className = "",
}: DivineLetterFormProps) {
  return (
    <LetterFormProvider onSubmit={onSubmit} onSave={onSave}>
      <div className={cn("relative w-full max-w-4xl mx-auto", className)}>
        {/* Static Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden bg-gradient-to-br from-purple-100/20 via-transparent to-blue-100/15 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.1),transparent)] animate-pulse"></div>
          <div
            className="absolute inset-0 bg-[radial-gradient(circle_at_25%_75%,rgba(59,130,246,0.1),transparent)] animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
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

          {/* Form content */}
          <FormContent />

          {/* Form navigation */}
          <FormNavigation />
        </motion.div>
      </div>
    </LetterFormProvider>
  );
}

/**
 * FormContent component
 * Renders the appropriate form step based on the current step
 */
function FormContent() {
  const { currentStep, isPreviewMode } = useLetterForm();

  // If in preview mode, show the letter preview
  if (isPreviewMode) {
    return <LetterPreview />;
  }

  // Otherwise show the current step
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentStep}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-[400px]"
      >
        {currentStep === FormStep.PersonalInfo && <PersonalInfo />}
        {currentStep === FormStep.Relationship && <Relationship />}
        {currentStep === FormStep.Examples && <Examples />}
        {currentStep === FormStep.LetterContent && <LetterContent />}
        {currentStep === FormStep.Review && <Review />}
      </motion.div>
    </AnimatePresence>
  );
}

// Export with error boundary
export default withErrorBoundary(DivineLetterForm, "DivineLetterForm");

// Re-export types
export * from "./types";
export * from "./context";

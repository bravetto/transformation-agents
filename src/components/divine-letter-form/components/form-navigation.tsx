"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Save, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FormStep } from "../types";
import { useLetterForm } from "../context";

interface FormNavigationProps {
  className?: string;
}

/**
 * Form navigation component with next/previous buttons
 * Handles form step navigation and submission
 */
export function FormNavigation({ className }: FormNavigationProps) {
  const {
    currentStep,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
    isPreviewMode,
    setIsPreviewMode,
  } = useLetterForm();

  // Handle next button click
  const onNextClick = async () => {
    if (currentStep === FormStep.Review) {
      await handleSubmit();
    } else {
      await handleNextStep();
    }
  };

  // Handle preview toggle
  const onPreviewClick = () => {
    setIsPreviewMode(!isPreviewMode);
  };

  return (
    <motion.div
      className={cn("flex justify-between items-center mt-8", className)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 }}
    >
      {/* Back button */}
      {currentStep > FormStep.PersonalInfo ? (
        <Button
          onClick={handlePreviousStep}
          variant="outline"
          className="flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </Button>
      ) : (
        <div /> /* Empty div to maintain flex layout */
      )}

      {/* Middle buttons */}
      <div className="flex gap-3">
        {/* Preview toggle button - only show on certain steps */}
        {currentStep >= FormStep.LetterContent && (
          <Button
            onClick={onPreviewClick}
            variant="secondary"
            className="flex items-center gap-2"
          >
            {isPreviewMode ? "Edit" : "Preview"}
          </Button>
        )}

        {/* Save button - only show on later steps */}
        {currentStep >= FormStep.Examples && (
          <Button
            onClick={() => {}} // Will be implemented in Phase 3
            variant="outline"
            className="flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Draft
          </Button>
        )}
      </div>

      {/* Next/Submit button */}
      <Button
        onClick={onNextClick}
        variant="primary"
        className="flex items-center gap-2"
      >
        {currentStep === FormStep.Review ? (
          <>
            Submit <Send className="w-4 h-4" />
          </>
        ) : (
          <>
            Next <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>
    </motion.div>
  );
}

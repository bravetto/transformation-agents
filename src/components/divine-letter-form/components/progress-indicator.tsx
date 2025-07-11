"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { FormStep } from "../types";
import { useLetterForm } from "../context";

interface ProgressIndicatorProps {
  className?: string;
}

/**
 * Progress indicator component for the multi-step form
 * Shows the current step and allows navigation between completed steps
 */
export function ProgressIndicator({ className }: ProgressIndicatorProps) {
  const { currentStep, setCurrentStep } = useLetterForm();

  // Step definitions
  const steps = [
    { id: FormStep.PersonalInfo, label: "Personal Info" },
    { id: FormStep.Relationship, label: "Relationship" },
    { id: FormStep.Examples, label: "Examples" },
    { id: FormStep.LetterContent, label: "Letter" },
    { id: FormStep.Review, label: "Review" },
  ];

  // Handle step click
  const handleStepClick = (step: FormStep) => {
    // Only allow navigating to completed steps
    if (step < currentStep) {
      setCurrentStep(step);
    }
  };

  return (
    <div className={cn("w-full mb-8", className)}>
      <div className="flex items-center justify-center w-full">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step indicator */}
            <div className="flex flex-col items-center">
              <button
                onClick={() => handleStepClick(step.id)}
                disabled={step.id > currentStep}
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center transition-colors",
                  step.id === currentStep
                    ? "bg-courage-blue text-white"
                    : step.id < currentStep
                      ? "bg-green-500 text-white cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed",
                )}
                aria-current={step.id === currentStep ? "step" : undefined}
              >
                {step.id < currentStep ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <span>{step.id + 1}</span>
                )}
              </button>

              {/* Step label */}
              <span
                className={cn(
                  "text-xs mt-2",
                  step.id === currentStep
                    ? "text-courage-blue font-medium"
                    : step.id < currentStep
                      ? "text-green-600"
                      : "text-gray-400",
                )}
              >
                {step.label}
              </span>
            </div>

            {/* Connector line between steps */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "h-0.5 w-full max-w-[3rem] mx-2",
                  index < currentStep ? "bg-green-500" : "bg-gray-200",
                )}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Progress bar animation */}
      <div className="w-full bg-gray-100 h-1 mt-6 rounded-full overflow-hidden">
        <motion.div
          className="bg-courage-blue h-full"
          initial={{ width: "0%" }}
          animate={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

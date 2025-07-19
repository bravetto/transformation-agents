"use client";

import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  CheckCircle,
  Circle,
  ChevronRight,
  ChevronLeft,
  Sparkles,
} from "lucide-react";
import LetterInput from "../atoms/LetterInput";
import { divineDesignSystem } from "@/lib/divine-design-intelligence";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

interface FormStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description: string;
  isActive: boolean;
  isCompleted: boolean;
  onNext: () => void;
  onPrevious: () => void;
  canProceed: boolean;
  consciousnessLevel?: number;
  divineAlignment?: number;
  children?: React.ReactNode;
}

interface StepField {
  id: string;
  label: string;
  value: string;
  placeholder: string;
  maxLength?: number;
  required?: boolean;
}

const FormStep: React.FC<FormStepProps> = ({
  stepNumber,
  totalSteps,
  title,
  description,
  isActive,
  isCompleted,
  onNext,
  onPrevious,
  canProceed,
  consciousnessLevel = 75,
  divineAlignment = 85,
  children,
}) => {
  const [fields, setFields] = useState<StepField[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleFieldChange = useCallback((fieldId: string, value: string) => {
    setFields((prev) =>
      prev.map((field) => (field.id === fieldId ? { ...field, value } : field)),
    );
  }, []);

  const handleNext = useCallback(() => {
    if (!canProceed) return;
    setIsAnimating(true);
    setTimeout(() => {
      onNext();
      setIsAnimating(false);
    }, 300);
  }, [canProceed, onNext]);

  const handlePrevious = useCallback(() => {
    setIsAnimating(true);
    setTimeout(() => {
      onPrevious();
      setIsAnimating(false);
    }, 300);
  }, [onPrevious]);

  const progressPercentage = ((stepNumber - 1) / (totalSteps - 1)) * 100;
  const styles = divineDesignSystem.getComponentStyles("card");

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="w-full max-w-2xl mx-auto"
        >
          <Card
            className={`
              relative overflow-hidden transition-all duration-500
              ${divineAlignment > 80 ? "shadow-2xl shadow-purple-500/20" : "shadow-lg"}
              ${consciousnessLevel > 80 ? "border-purple-300" : ""}
            `}
            style={{
              boxShadow: styles.boxShadow,
              borderColor: styles.borderColor,
            }}
          >
            {/* Divine glow effect */}
            {divineAlignment > 85 && (
              <div
                className="absolute inset-0 -z-10 opacity-30 animate-pulse"
                style={{
                  background: styles.background,
                  filter: "blur(20px)",
                }}
              />
            )}

            <CardHeader className="pb-4">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle
                      className={`w-6 h-6 ${
                        consciousnessLevel > 80
                          ? "text-purple-500"
                          : consciousnessLevel > 60
                            ? "text-yellow-500"
                            : "text-gray-400"
                      }`}
                    />
                  )}
                  <span className="text-sm font-medium text-gray-600">
                    Step {stepNumber} of {totalSteps}
                  </span>
                </div>

                {divineAlignment > 90 && (
                  <Sparkles className="w-5 h-5 text-yellow-500 animate-pulse" />
                )}
              </div>

              <Progress
                value={progressPercentage}
                className="mb-4"
                style={{
                  background: `linear-gradient(90deg, 
                    ${consciousnessLevel > 80 ? "#8B5CF6" : "#F59E0B"} 0%, 
                    ${divineAlignment > 80 ? "#10B981" : "#3B82F6"} 100%
                  )`,
                }}
              />

              <CardTitle
                className={`text-2xl font-bold ${
                  consciousnessLevel > 80
                    ? "text-purple-700"
                    : consciousnessLevel > 60
                      ? "text-yellow-700"
                      : "text-gray-700"
                }`}
              >
                {title}
              </CardTitle>

              <p className="text-gray-600 mt-2">{description}</p>
            </CardHeader>

            <CardContent className="pb-6">
              <motion.div
                animate={{
                  scale: isAnimating ? 0.95 : 1,
                  opacity: isAnimating ? 0.8 : 1,
                }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>

              {/* Navigation buttons */}
              <div className="flex justify-between items-center mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={stepNumber === 1}
                  className={`
                    ${stepNumber === 1 ? "opacity-50 cursor-not-allowed" : ""}
                    ${consciousnessLevel > 80 ? "border-purple-300 hover:border-purple-400" : ""}
                  `}
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>

                <div className="flex items-center space-x-2">
                  <span
                    className={`
                    text-xs px-3 py-1 rounded-full font-medium
                    ${
                      consciousnessLevel > 80
                        ? "bg-purple-100 text-purple-800"
                        : consciousnessLevel > 60
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-gray-100 text-gray-800"
                    }
                  `}
                  >
                    Consciousness: {consciousnessLevel}%
                  </span>
                  <span
                    className={`
                    text-xs px-3 py-1 rounded-full font-medium
                    ${
                      divineAlignment > 80
                        ? "bg-green-100 text-green-800"
                        : divineAlignment > 60
                          ? "bg-blue-100 text-blue-800"
                          : "bg-gray-100 text-gray-800"
                    }
                  `}
                  >
                    Divine: {divineAlignment}%
                  </span>
                </div>

                <Button
                  onClick={handleNext}
                  disabled={!canProceed}
                  className={`
                    ${!canProceed ? "opacity-50 cursor-not-allowed" : ""}
                    ${
                      consciousnessLevel > 80
                        ? "bg-purple-600 hover:bg-purple-700"
                        : consciousnessLevel > 60
                          ? "bg-yellow-600 hover:bg-yellow-700"
                          : "bg-blue-600 hover:bg-blue-700"
                    }
                    transition-all duration-300
                  `}
                  style={{
                    boxShadow:
                      canProceed && divineAlignment > 80
                        ? "0 0 20px rgba(147, 51, 234, 0.4)"
                        : undefined,
                  }}
                >
                  {stepNumber === totalSteps ? "Complete" : "Next"}
                  {stepNumber !== totalSteps && (
                    <ChevronRight className="w-4 h-4 ml-2" />
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default withDivineErrorBoundary(FormStep, {
  componentName: "FormStep",
  fallback: (
    <div className="p-8 text-center text-gray-500">
      Form step temporarily unavailable
    </div>
  ),
});

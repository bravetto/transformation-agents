"use client";
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Commitment {
  id: string;
  statement: string;
  percentage: number;
  description: string;
}

const commitments: Commitment[] = [
  {
    id: "second-chances",
    statement: "People deserve second chances",
    percentage: 93,
    description:
      "Everyone makes mistakes, and rehabilitation is more effective than punishment alone.",
  },
  {
    id: "smart-justice",
    statement: "Smart justice saves money",
    percentage: 87,
    description:
      "Rehabilitation costs $45K/year while incarceration costs $175K/year.",
  },
  {
    id: "youth-help",
    statement: "JAHmere can help youth",
    percentage: 79,
    description:
      "With proper support, JAHmere can mentor 500+ at-risk youth and break cycles.",
  },
  {
    id: "write-letter",
    statement: "I'll write to Judge Ferrero",
    percentage: 0,
    description:
      "Your voice matters. Join 1,247+ supporters making a difference.",
  },
];

interface MicroCommitmentsProps {
  onComplete?: () => void;
}

export function MicroCommitments({ onComplete }: MicroCommitmentsProps) {
  const [completed, setCompleted] = useState<string[]>([]);
  const [currentStep, setCurrentStep] = useState(0);

  const handleAgree = (commitmentId: string, index: number) => {
    setCompleted([...completed, commitmentId]);

    if (index === commitments.length - 1) {
      // Final commitment - trigger action
      onComplete?.();
    } else {
      // Move to next step after a short delay
      setTimeout(() => {
        setCurrentStep(index + 1);
      }, 500);
    }
  };

  const progressPercentage = (completed.length / commitments.length) * 100;

  return (
    <Card className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 border-gray-700 p-8">
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">
            Your Journey to Justice
          </h3>
          <p className="text-gray-300">
            Each step brings us closer to transformation over incarceration
          </p>
        </div>

        {/* Progress Bar */}
        <div className="relative">
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-hope-gold to-courage-blue"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercentage}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
          <p className="text-sm text-gray-400 mt-2">
            {completed.length} of {commitments.length} steps completed
          </p>
        </div>

        {/* Commitments */}
        <div className="space-y-4">
          <AnimatePresence mode="sync">
            {commitments.map((commitment, index) => {
              const isCompleted = completed.includes(commitment.id);
              const isCurrent = index === currentStep;
              const isLocked = index > currentStep;

              return (
                <motion.div
                  key={commitment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{
                    opacity: isLocked ? 0.4 : 1,
                    x: 0,
                    scale: isCurrent ? 1.02 : 1,
                  }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.3 }}
                  className={cn("relative", isLocked && "pointer-events-none")}
                >
                  <div
                    className={cn(
                      "p-6 rounded-xl border-2 transition-all duration-300",
                      isCompleted && "bg-green-900/20 border-green-600",
                      isCurrent &&
                        !isCompleted &&
                        "bg-gray-800/50 border-hope-gold shadow-lg shadow-hope-gold/20",
                      !isCompleted &&
                        !isCurrent &&
                        "bg-gray-800/30 border-gray-700",
                    )}
                  >
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className="flex-shrink-0 mt-1">
                        {isCompleted ? (
                          <CheckCircle2 className="w-6 h-6 text-green-500" />
                        ) : (
                          <Circle
                            className={cn(
                              "w-6 h-6",
                              isCurrent ? "text-hope-gold" : "text-gray-500",
                            )}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <h4
                          className={cn(
                            "text-lg font-semibold mb-1",
                            isCompleted ? "text-green-400" : "text-white",
                          )}
                        >
                          {commitment.statement}
                        </h4>
                        <p className="text-gray-300 text-sm mb-3">
                          {commitment.description}
                        </p>

                        {/* Stats & Action */}
                        <div className="flex items-center justify-between">
                          {commitment.percentage > 0 && (
                            <span className="text-sm text-gray-400">
                              {commitment.percentage}% of people agree
                            </span>
                          )}

                          {isCurrent && !isCompleted && (
                            <Button
                              size="sm"
                              className={cn(
                                "ml-auto",
                                index === commitments.length - 1
                                  ? "bg-hope-gold text-justice-black hover:bg-hope-gold/90"
                                  : "bg-courage-blue text-white hover:bg-courage-blue/90",
                              )}
                              onClick={() => handleAgree(commitment.id, index)}
                            >
                              {index === commitments.length - 1 ? (
                                <>
                                  Take Action
                                  <ArrowRight className="w-4 h-4 ml-1" />
                                </>
                              ) : (
                                "I Agree"
                              )}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connection Line */}
                  {index < commitments.length - 1 && (
                    <div
                      className={cn(
                        "absolute left-11 top-full h-4 w-0.5",
                        isCompleted ? "bg-green-600" : "bg-gray-700",
                      )}
                    />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Completion Message */}
        {completed.length === commitments.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 p-4 bg-green-900/20 border border-green-600 rounded-lg text-center"
          >
            <p className="text-green-400 font-semibold">
              Thank you for taking a stand for justice and transformation! 🎉
            </p>
          </motion.div>
        )}
      </div>
    </Card>
  );
}

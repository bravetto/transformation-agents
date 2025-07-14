"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Clock, Target, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface CaseStatusProps {
  className?: string;
  variant?: "inline" | "detailed" | "timeline";
}

export function CaseStatus({ className, variant = "inline" }: CaseStatusProps) {
  const steps = [
    {
      status: "complete",
      label: "Tony Dungy endorsement secured",
      icon: Check,
      date: "December 2024",
    },
    {
      status: "complete",
      label: "Program details submitted to court",
      icon: Check,
      date: "January 2025",
    },
    {
      status: "pending",
      label: "Awaiting Judge Ferrero's decision",
      icon: Clock,
      date: "Decision pending",
    },
    {
      status: "future",
      label: "Goal: Rehabilitation instead of incarceration",
      icon: Target,
      date: "Future",
    },
  ];

  if (variant === "inline") {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-full",
          className,
        )}
      >
        <Clock className="h-4 w-4 text-amber-600 animate-pulse" />
        <span className="text-sm font-medium text-amber-900">
          Case Status: Awaiting Judge Ferrero's Decision
        </span>
      </div>
    );
  }

  if (variant === "timeline") {
    return (
      <div className={cn("space-y-4", className)}>
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isActive = step.status === "pending";
          const isComplete = step.status === "complete";

          return (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex items-start gap-4 p-4 rounded-lg transition-all",
                isActive && "bg-amber-50 border-2 border-amber-200",
                isComplete && "bg-green-50 border border-green-200",
                step.status === "future" &&
                  "bg-gray-50 border border-gray-200 opacity-75",
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center",
                  isActive && "bg-amber-200 text-amber-700",
                  isComplete && "bg-green-200 text-green-700",
                  step.status === "future" && "bg-gray-200 text-gray-500",
                )}
              >
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1">
                <h4
                  className={cn(
                    "font-semibold",
                    isActive && "text-amber-900",
                    isComplete && "text-green-900",
                    step.status === "future" && "text-gray-700",
                  )}
                >
                  {step.label}
                </h4>
                <p
                  className={cn(
                    "text-sm mt-1",
                    isActive && "text-amber-700",
                    isComplete && "text-green-700",
                    step.status === "future" && "text-gray-500",
                  )}
                >
                  {step.date}
                </p>
              </div>

              {isActive && (
                <div className="flex-shrink-0">
                  <div className="animate-pulse">
                    <AlertCircle className="h-5 w-5 text-amber-600" />
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    );
  }

  // Detailed variant
  return (
    <div
      className={cn(
        "bg-gradient-to-r from-amber-50 to-orange-50 p-6 rounded-xl border border-amber-200",
        className,
      )}
    >
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <div className="w-12 h-12 bg-amber-200 rounded-full flex items-center justify-center">
            <Clock className="h-6 w-6 text-amber-700" />
          </div>
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-amber-900 mb-2">
            Case Status Update
          </h3>
          <p className="text-amber-800 mb-4">
            JAHmere's case is currently under review by Judge Ferrero. The
            Bridge Project proposal has been submitted with full endorsement
            from NFL Hall of Famer Tony Dungy.
          </p>

          <div className="flex flex-wrap gap-3">
            {steps.slice(0, 3).map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.label}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1 rounded-full text-sm",
                    step.status === "complete" && "bg-green-100 text-green-700",
                    step.status === "pending" &&
                      "bg-amber-100 text-amber-700 font-medium",
                  )}
                >
                  <Icon className="h-3 w-3" />
                  {step.label.split(" ").slice(0, 3).join(" ")}...
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-amber-200">
        <p className="text-sm text-amber-700 text-center font-medium">
          Your support could make the difference in Judge Ferrero's decision
        </p>
      </div>
    </div>
  );
}

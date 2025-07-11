"use client";

import React from "react";
import { motion } from "framer-motion";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { Award, AlertCircle, CheckCircle, Info } from "lucide-react";
import { ImpactScore as ImpactScoreType } from "../types";

interface ImpactScoreProps {
  className?: string;
}

/**
 * ImpactScore component
 * Displays the letter impact score with feedback
 */
function ImpactScore({ className = "" }: ImpactScoreProps) {
  const { impactScore } = useLetterForm();

  if (!impactScore) return null;

  // Get icon based on score category
  const getIcon = () => {
    switch (impactScore.category) {
      case "exceptional":
        return <Award className="h-6 w-6 text-green-500" />;
      case "high":
        return <CheckCircle className="h-6 w-6 text-blue-500" />;
      case "medium":
        return <Info className="h-6 w-6 text-yellow-500" />;
      case "low":
        return <AlertCircle className="h-6 w-6 text-red-500" />;
      default:
        return <Info className="h-6 w-6 text-gray-500" />;
    }
  };

  // Get title based on score category
  const getTitle = () => {
    switch (impactScore.category) {
      case "exceptional":
        return "Exceptional Impact";
      case "high":
        return "High Impact";
      case "medium":
        return "Medium Impact";
      case "low":
        return "Low Impact";
      default:
        return "Impact Score";
    }
  };

  // Get color based on score category
  const getColor = () => {
    switch (impactScore.category) {
      case "exceptional":
        return "bg-green-50 border-green-200";
      case "high":
        return "bg-blue-50 border-blue-200";
      case "medium":
        return "bg-yellow-50 border-yellow-200";
      case "low":
        return "bg-red-50 border-red-200";
      default:
        return "bg-gray-50 border-gray-200";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-md border p-4 ${getColor()} ${className}`}
    >
      <div className="flex items-center mb-3">
        {getIcon()}
        <h3 className="text-lg font-medium ml-2">{getTitle()}</h3>
        <div className="ml-auto flex items-center">
          <span className="text-2xl font-bold mr-1">{impactScore.score}</span>
          <span className="text-sm text-gray-500">/100</span>
        </div>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
        <div
          className={`h-2.5 rounded-full ${
            impactScore.category === "exceptional"
              ? "bg-green-600"
              : impactScore.category === "high"
              ? "bg-blue-600"
              : impactScore.category === "medium"
              ? "bg-yellow-500"
              : "bg-red-500"
          }`}
          style={{ width: `${impactScore.score}%` }}
        ></div>
      </div>

      <div className="space-y-2">
        <h4 className="text-sm font-medium">Feedback:</h4>
        <ul className="space-y-1">
          {impactScore.feedback.map((item, index) => (
            <li key={index} className="text-sm flex items-start">
              <span className="mr-2">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// Import at the top to avoid reference error
import { useLetterForm } from "../context";

export default withSafeUI(ImpactScore, {
  componentName: "ImpactScore",
}); 
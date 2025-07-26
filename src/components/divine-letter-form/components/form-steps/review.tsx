"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { Button } from "@/components/ui/button";
import { Check, Edit, AlertTriangle } from "lucide-react";
import { useLetterForm } from "../../context";
import { FormStep } from "../../types";
import { letterImpactSchema } from "../../schema";

/**
 * Review component
 * Final step of the letter form for reviewing and submitting
 */
function Review() {
  const { formData, setCurrentStep, impactScore, calculateImpactScore } =
    useLetterForm();

  // Calculate impact score on component mount
  useEffect(() => {
    calculateImpactScore();
  }, [calculateImpactScore]);

  // Function to navigate to a specific step
  const goToStep = (step: FormStep) => {
    setCurrentStep(step);
  };

  // Format the letter with proper styling
  const formattedLetter = () => {
    let signature = "";

    switch (formData.signatureStyle) {
      case "formal":
        signature = `Sincerely,\n${formData.name}`;
        break;
      case "personal":
        signature = `With deep concern for JAHmere's future,\n${formData.name}`;
        break;
      case "spiritual":
        signature = `With faith in JAHmere's transformation,\n${formData.name}`;
        break;
      default:
        signature = `Sincerely,\n${formData.name}`;
    }

    return `Dear Judge Ferrero,

I am writing to express my strong support for JAHmere Webb. ${formData.relationship === "other" ? "" : `As ${formData.relationship?.replace("_", " ")}, `}I have known JAHmere for ${formData.timeKnown || "[time period]"} and have observed his character, growth, and positive impact.

${formData.letterContent || ""}

${signature}
${formData.address || ""}
${formData.email || ""}
${formData.phone || ""}`;
  };

  // Validate all fields
  const validateForm = () => {
    try {
      letterImpactSchema.parse(formData);
      return true;
    } catch (error) {
      return false;
    }
  };

  const isFormValid = validateForm();

  // Get impact score color based on category
  const getImpactScoreColor = () => {
    if (!impactScore) return "text-gray-400";

    switch (impactScore.category) {
      case "exceptional":
        return "text-green-600";
      case "high":
        return "text-blue-600";
      case "medium":
        return "text-yellow-600";
      case "low":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Review Your Letter</h2>
        <p className="text-gray-600 mt-2">
          Please review your letter before final submission
        </p>
      </div>

      {/* Form validation status */}
      <div
        className={`p-4 rounded-md ${isFormValid ? "bg-green-50" : "bg-yellow-50"}`}
      >
        <div className="flex items-center">
          {isFormValid ? (
            <Check className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2" />
          )}
          <p
            className={`text-sm font-medium ${isFormValid ? "text-green-800" : "text-yellow-800"}`}
          >
            {isFormValid
              ? "Your letter is ready for submission!"
              : "Please complete all required fields before submitting."}
          </p>
        </div>
      </div>

      {/* Impact score */}
      {impactScore && (
        <div className="bg-gray-50 p-4 rounded-md">
          <h3 className="text-lg font-medium mb-2">Letter Impact Score</h3>
          <div className="flex items-center mb-3">
            <div className="w-full bg-gray-200 rounded-full h-2.5">
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
            <span className={`ml-3 font-bold ${getImpactScoreColor()}`}>
              {impactScore.score}%
            </span>
          </div>
          <div className="space-y-1">
            {impactScore.feedback.map((item, index) => (
              <p key={index} className="text-sm text-gray-600">
                • {item}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Letter preview */}
      <div className="border rounded-md p-4 bg-white">
        <h3 className="text-lg font-medium mb-3">Letter Preview</h3>
        <div className="whitespace-pre-wrap font-serif text-gray-800 bg-gray-50 p-4 rounded border">
          {formattedLetter()}
        </div>
      </div>

      {/* Section reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Review Sections</h3>

        {/* Personal Info */}
        <div className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
          <div>
            <h4 className="font-medium">Personal Information</h4>
            <p className="text-sm text-gray-600">
              {formData.name
                ? `${formData.name}, ${formData.email}`
                : "Incomplete"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToStep(FormStep.PersonalInfo)}
            className="flex items-center"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>

        {/* Relationship */}
        <div className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
          <div>
            <h4 className="font-medium">Relationship</h4>
            <p className="text-sm text-gray-600">
              {formData.relationship
                ? `${formData.relationship.replace("_", " ")}, ${formData.timeKnown || "time not specified"}`
                : "Incomplete"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToStep(FormStep.Relationship)}
            className="flex items-center"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>

        {/* Examples */}
        <div className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
          <div>
            <h4 className="font-medium">Specific Examples</h4>
            <p className="text-sm text-gray-600">
              {formData.specificExample1 && formData.specificExample2
                ? `${formData.specificExample1.substring(0, 50)}...`
                : "Incomplete"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToStep(FormStep.Examples)}
            className="flex items-center"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>

        {/* Letter Content */}
        <div className="flex justify-between items-center p-3 border rounded-md bg-gray-50">
          <div>
            <h4 className="font-medium">Letter Content</h4>
            <p className="text-sm text-gray-600">
              {formData.letterContent
                ? `${formData.letterContent.split(/\s+/).length} words`
                : "Incomplete"}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => goToStep(FormStep.LetterContent)}
            className="flex items-center"
          >
            <Edit className="h-4 w-4 mr-1" /> Edit
          </Button>
        </div>
      </div>

      {/* Legal notice */}
      <div className="bg-blue-50 p-4 rounded-md mt-6">
        <p className="text-sm text-blue-800">
          <strong>Final Submission:</strong> By submitting this letter, you
          confirm that all information provided is truthful and accurate to the
          best of your knowledge. This letter will be submitted as a formal
          document to the court.
        </p>
      </div>
    </motion.div>
  );
}

export default withSafeUI(Review, {
  componentName: "Review",
});

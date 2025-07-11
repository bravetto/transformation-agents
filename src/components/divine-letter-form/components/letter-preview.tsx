"use client";

import React from "react";
import { motion } from "framer-motion";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { useLetterForm } from "../context";
import { LetterFormData, SignatureStyle } from "../types";

interface LetterPreviewProps {
  className?: string;
}

/**
 * LetterPreview component
 * Displays a formatted preview of the letter
 */
function LetterPreview({ className = "" }: LetterPreviewProps) {
  const { formData, isPreviewMode } = useLetterForm();

  if (!isPreviewMode) return null;

  // Format the letter with proper styling
  const formatLetter = (data: Partial<LetterFormData>) => {
    const {
      name,
      email,
      phone,
      address,
      relationship,
      timeKnown,
      letterContent,
      signatureStyle = "formal",
    } = data;

    let signature = "";
    
    switch (signatureStyle as SignatureStyle) {
      case "formal":
        signature = `Sincerely,\n\n${name}`;
        break;
      case "personal":
        signature = `With deep concern for JAHmere's future,\n\n${name}`;
        break;
      case "spiritual":
        signature = `With faith in JAHmere's transformation,\n\n${name}`;
        break;
      default:
        signature = `Sincerely,\n\n${name}`;
    }

    const contactInfo = [
      address,
      email,
      phone,
    ].filter(Boolean).join("\n");

    const relationshipText = relationship === "other" 
      ? "" 
      : `As ${relationship?.replace("_", " ")}, `;

    return `Dear Judge Ferrero,

I am writing to express my strong support for JAHmere Webb. ${relationshipText}I have known JAHmere for ${timeKnown || "[time period]"} and have observed his character, growth, and positive impact.

${letterContent || ""}

${signature}

${contactInfo}`;
  };

  const formattedLetter = formatLetter(formData);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`bg-white border rounded-md shadow-sm ${className}`}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Letter Preview</h3>
          <div className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
            Court Document
          </div>
        </div>
        
        <div className="whitespace-pre-wrap font-serif text-gray-800 bg-gray-50 p-6 rounded border">
          {formattedLetter}
        </div>
      </div>
    </motion.div>
  );
}

export default withSafeUI(LetterPreview, {
  componentName: "LetterPreview",
}); 
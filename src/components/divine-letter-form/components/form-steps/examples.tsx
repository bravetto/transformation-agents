"use client";

import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLetterForm } from "../../context";
import { RelationshipType } from "../../types";
import { getGuidanceForRelationship } from "../../utils/relationship-guidance";

/**
 * Examples component
 * Third step of the letter form for collecting specific examples
 */
function Examples() {
  const { formData, updateFormData, errors } = useLetterForm();
  
  // Get relationship-specific guidance
  const relationshipType = formData.relationship as RelationshipType || "other";
  const guidance = useMemo(() => getGuidanceForRelationship(relationshipType), [relationshipType]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  // Check if text contains a date pattern
  const hasDatePattern = (text: string): boolean => {
    const datePattern = /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b|\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/i;
    return datePattern.test(text);
  };

  // Check if examples have dates
  const example1HasDate = hasDatePattern(formData.specificExample1 || "");
  const example2HasDate = hasDatePattern(formData.specificExample2 || "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Specific Examples</h2>
        <p className="text-gray-600 mt-2">
          Provide specific examples that demonstrate JAHmere's character and impact
        </p>
      </div>

      {/* First example */}
      <div className="space-y-2">
        <Label htmlFor="specificExample1" className="flex items-center">
          Example 1: Specific Situation
          {example1HasDate && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Date detected ✓
            </span>
          )}
        </Label>
        <Textarea
          id="specificExample1"
          name="specificExample1"
          value={formData.specificExample1 || ""}
          onChange={handleChange}
          placeholder={guidance.prompts.specificExample1}
          rows={5}
          className={errors.specificExample1 ? "border-red-500" : ""}
        />
        {errors.specificExample1 ? (
          <p className="text-red-500 text-sm mt-1">{errors.specificExample1}</p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">
            Include a specific date (e.g., January 15, 2023) and concrete details
          </p>
        )}
      </div>

      {/* Second example */}
      <div className="space-y-2">
        <Label htmlFor="specificExample2" className="flex items-center">
          Example 2: Another Specific Situation
          {example2HasDate && (
            <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
              Date detected ✓
            </span>
          )}
        </Label>
        <Textarea
          id="specificExample2"
          name="specificExample2"
          value={formData.specificExample2 || ""}
          onChange={handleChange}
          placeholder={guidance.prompts.specificExample2}
          rows={5}
          className={errors.specificExample2 ? "border-red-500" : ""}
        />
        {errors.specificExample2 ? (
          <p className="text-red-500 text-sm mt-1">{errors.specificExample2}</p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">
            Include a specific date (e.g., March 3, 2023) and concrete details
          </p>
        )}
      </div>

      {/* Third example (optional) */}
      <div className="space-y-2">
        <Label htmlFor="specificExample3">
          Example 3: Additional Example <span className="text-gray-400">(Optional)</span>
        </Label>
        <Textarea
          id="specificExample3"
          name="specificExample3"
          value={formData.specificExample3 || ""}
          onChange={handleChange}
          placeholder={guidance.prompts.specificExample3}
          rows={5}
        />
        <p className="text-xs text-gray-500 mt-1">
          Additional examples strengthen your letter's impact
        </p>
      </div>

      {/* Ongoing support */}
      <div className="space-y-2">
        <Label htmlFor="ongoingSupport">Your Ongoing Support</Label>
        <Textarea
          id="ongoingSupport"
          name="ongoingSupport"
          value={formData.ongoingSupport || ""}
          onChange={handleChange}
          placeholder={guidance.prompts.ongoingSupport}
          rows={4}
          className={errors.ongoingSupport ? "border-red-500" : ""}
        />
        {errors.ongoingSupport ? (
          <p className="text-red-500 text-sm mt-1">{errors.ongoingSupport}</p>
        ) : (
          <p className="text-xs text-gray-500 mt-1">
            Describe how you plan to support JAHmere in the future
          </p>
        )}
      </div>

      {/* Legal notice */}
      <div className="bg-yellow-50 p-4 rounded-md mt-6">
        <p className="text-sm text-yellow-800">
          <strong>Legal Impact Tip:</strong> Specific examples with exact dates 
          carry significantly more weight with the court than general statements.
        </p>
      </div>
    </motion.div>
  );
}

export default Examples; 
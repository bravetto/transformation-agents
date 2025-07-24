"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useLetterForm } from "../../context";
import { RelationshipType } from "../../types";
import { getGuidanceForRelationship } from "../../utils/relationship-guidance";

/**
 * Relationship component
 * Second step of the letter form for collecting relationship information
 */
function Relationship() {
  const { formData, updateFormData, errors } = useLetterForm();

  // Get relationship-specific guidance
  const relationshipType =
    (formData.relationship as RelationshipType) || "other";
  const guidance = getGuidanceForRelationship(relationshipType);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleRelationshipChange = (value: string) => {
    updateFormData({ relationship: value as RelationshipType });
  };

  // Update howYouMet placeholder when relationship changes
  useEffect(() => {
    // This is intentionally left empty as we're just using the guidance object
    // which is derived from the relationship type
  }, [relationshipType]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Your Relationship with JAHmere
        </h2>
        <p className="text-gray-600 mt-2">
          Please describe your relationship and how you know JAHmere
        </p>
      </div>

      {/* Relationship type selection */}
      <div className="space-y-3">
        <Label>What is your relationship to JAHmere?</Label>
        <RadioGroup
          value={relationshipType}
          onValueChange={handleRelationshipChange}
          className="grid grid-cols-2 gap-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="youth_helped" id="youth_helped" />
            <Label htmlFor="youth_helped" className="cursor-pointer">
              Youth JAHmere Helped
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="employer" id="employer" />
            <Label htmlFor="employer" className="cursor-pointer">
              Employer
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="colleague" id="colleague" />
            <Label htmlFor="colleague" className="cursor-pointer">
              Colleague
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="mentor" id="mentor" />
            <Label htmlFor="mentor" className="cursor-pointer">
              Mentor
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="community_leader" id="community_leader" />
            <Label htmlFor="community_leader" className="cursor-pointer">
              Community Leader
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="friend" id="friend" />
            <Label htmlFor="friend" className="cursor-pointer">
              Friend
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="family" id="family" />
            <Label htmlFor="family" className="cursor-pointer">
              Family Member
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="cursor-pointer">
              Other
            </Label>
          </div>
        </RadioGroup>
        {errors.relationship && (
          <p className="text-red-500 text-sm mt-1">{errors.relationship}</p>
        )}
      </div>

      {/* Relationship guidance */}
      {guidance && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue-50 p-4 rounded-md"
        >
          <h3 className="font-semibold text-blue-800">{guidance.title}</h3>
          <p className="text-sm text-blue-700 mt-1">{guidance.description}</p>
        </motion.div>
      )}

      {/* How you met */}
      <div className="space-y-2">
        <Label htmlFor="howYouMet">How did you meet JAHmere?</Label>
        <Textarea
          id="howYouMet"
          name="howYouMet"
          value={formData.howYouMet || ""}
          onChange={handleChange}
          placeholder={
            guidance?.prompts.howYouMet ||
            "Describe how you met JAHmere and the circumstances of your relationship"
          }
          rows={4}
          className={errors.howYouMet ? "border-red-500" : ""}
        />
        {errors.howYouMet && (
          <p className="text-red-500 text-sm mt-1">{errors.howYouMet}</p>
        )}
      </div>

      {/* Time known */}
      <div className="space-y-2">
        <Label htmlFor="timeKnown">How long have you known JAHmere?</Label>
        <Input
          id="timeKnown"
          name="timeKnown"
          value={formData.timeKnown || ""}
          onChange={handleChange}
          placeholder="e.g., 3 years, since January 2020"
          className={errors.timeKnown ? "border-red-500" : ""}
        />
        {errors.timeKnown && (
          <p className="text-red-500 text-sm mt-1">{errors.timeKnown}</p>
        )}
      </div>

      {/* Legal notice */}
      <div className="bg-yellow-50 p-4 rounded-md mt-6">
        <p className="text-sm text-yellow-800">
          <strong>Important:</strong> Being specific about your relationship
          with JAHmere significantly increases the impact of your letter with
          the court.
        </p>
      </div>
    </motion.div>
  );
}

export default withSafeUI(Relationship, {
  componentName: "Relationship",
});

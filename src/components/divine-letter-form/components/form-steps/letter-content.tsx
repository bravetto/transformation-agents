"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { useLetterForm } from "../../context";
import { SignatureStyle } from "../../types";

/**
 * LetterContent component
 * Fourth step of the letter form for composing the letter content
 */
function LetterContent() {
  const { formData, updateFormData, errors, calculateImpactScore } = useLetterForm();
  const [wordCount, setWordCount] = useState(0);
  
  // Calculate word count when letter content changes
  useEffect(() => {
    const content = formData.letterContent || "";
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    setWordCount(words);
    
    // Calculate impact score when content changes
    if (content.length > 100) {
      calculateImpactScore();
    }
  }, [formData.letterContent, calculateImpactScore]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  const handleSignatureStyleChange = (value: string) => {
    updateFormData({ signatureStyle: value as SignatureStyle });
  };

  const handleAllowContactChange = (checked: boolean) => {
    updateFormData({ allowContact: checked });
  };

  // Get word count class based on minimum requirements
  const getWordCountClass = () => {
    if (wordCount < 100) return "text-red-500";
    if (wordCount < 300) return "text-yellow-500";
    return "text-green-600";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Letter Content</h2>
        <p className="text-gray-600 mt-2">
          Compose your letter of support for JAHmere
        </p>
      </div>

      {/* Letter content */}
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <Label htmlFor="letterContent">Your Letter</Label>
          <span className={`text-sm font-medium ${getWordCountClass()}`}>
            {wordCount} words {wordCount < 300 ? `(minimum 300)` : "✓"}
          </span>
        </div>
        <Textarea
          id="letterContent"
          name="letterContent"
          value={formData.letterContent || ""}
          onChange={handleChange}
          placeholder="Dear Judge Ferrero,

I am writing to express my strong support for JAHmere Webb. As [your relationship], I have known JAHmere for [time period] and have observed his character, growth, and positive impact.

[Include your specific examples and observations here]

I believe JAHmere has demonstrated significant growth and deserves the opportunity to continue his positive trajectory through The Bridge Project. I am committed to supporting him by [describe your ongoing support].

Thank you for your consideration.

Sincerely,"
          rows={15}
          className={errors.letterContent ? "border-red-500" : ""}
        />
        {errors.letterContent && (
          <p className="text-red-500 text-sm mt-1">{errors.letterContent}</p>
        )}
      </div>

      {/* Signature style */}
      <div className="space-y-3">
        <Label>Signature Style</Label>
        <RadioGroup
          value={formData.signatureStyle || "formal"}
          onValueChange={handleSignatureStyleChange}
          className="flex flex-col space-y-2"
        >
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="formal" id="formal" className="mt-1" />
            <div>
              <Label htmlFor="formal" className="cursor-pointer font-medium">Formal</Label>
              <p className="text-sm text-gray-500">
                "Sincerely, [Your Full Name]"
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="personal" id="personal" className="mt-1" />
            <div>
              <Label htmlFor="personal" className="cursor-pointer font-medium">Personal</Label>
              <p className="text-sm text-gray-500">
                "With deep concern for JAHmere's future, [Your Full Name]"
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-2">
            <RadioGroupItem value="spiritual" id="spiritual" className="mt-1" />
            <div>
              <Label htmlFor="spiritual" className="cursor-pointer font-medium">Spiritual</Label>
              <p className="text-sm text-gray-500">
                "With faith in JAHmere's transformation, [Your Full Name]"
              </p>
            </div>
          </div>
        </RadioGroup>
        {errors.signatureStyle && (
          <p className="text-red-500 text-sm mt-1">{errors.signatureStyle}</p>
        )}
      </div>

      {/* Contact permission */}
      <div className="flex items-start space-x-2 pt-2">
        <Checkbox
          id="allowContact"
          checked={formData.allowContact !== false}
          onCheckedChange={handleAllowContactChange}
        />
        <div className="space-y-1">
          <Label htmlFor="allowContact" className="cursor-pointer">
            Allow Contact
          </Label>
          <p className="text-sm text-gray-500">
            I am willing to be contacted by the court or legal representatives if they have questions about my letter.
          </p>
        </div>
      </div>

      {/* Legal notice */}
      <div className="bg-blue-50 p-4 rounded-md mt-6">
        <p className="text-sm text-blue-800">
          <strong>Legal Note:</strong> Your letter will be submitted as a formal document to the court. 
          It should be truthful, specific, and reflect your genuine assessment of JAHmere's character.
        </p>
      </div>
    </motion.div>
  );
}

export default withSafeUI(LetterContent, {
  componentName: "LetterContent",
}); 
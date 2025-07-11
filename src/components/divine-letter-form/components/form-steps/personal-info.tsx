"use client";

import React from "react";
import { motion } from "framer-motion";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLetterForm } from "../../context";

/**
 * PersonalInfo component
 * First step of the letter form for collecting personal information
 */
function PersonalInfo() {
  const { formData, updateFormData, errors } = useLetterForm();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateFormData({ [name]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Information</h2>
        <p className="text-gray-600 mt-2">
          Please provide your contact information for the letter
        </p>
      </div>

      <div className="space-y-4">
        {/* Name field */}
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Your full legal name"
            className={errors.name ? "border-red-500" : ""}
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
          )}
        </div>

        {/* Email field */}
        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="your.email@example.com"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone field (optional) */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number <span className="text-gray-400">(Optional)</span>
          </Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone || ""}
            onChange={handleChange}
            placeholder="(123) 456-7890"
          />
        </div>

        {/* Address field */}
        <div className="space-y-2">
          <Label htmlFor="address">Full Address</Label>
          <Input
            id="address"
            name="address"
            value={formData.address || ""}
            onChange={handleChange}
            placeholder="Your full address for legal correspondence"
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">{errors.address}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">
            Your address is required for legal documentation and will be included
            in your letter
          </p>
        </div>
      </div>

      {/* Legal notice */}
      <div className="bg-blue-50 p-4 rounded-md mt-6">
        <p className="text-sm text-blue-800">
          Your information will be included in your letter to the court. Please
          ensure all details are accurate and match your legal identification.
        </p>
      </div>
    </motion.div>
  );
}

export default withSafeUI(PersonalInfo, {
  componentName: "PersonalInfo",
}); 
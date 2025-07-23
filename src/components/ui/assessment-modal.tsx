"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Brain, Star, Zap } from "lucide-react";
import { Button } from "./button";
import { Input } from "./input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { ModalPortal } from "./modal-portal";
import {
  trackConversion,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: (data: AssessmentData) => void;
}

interface AssessmentData {
  name: string;
  email: string;
  currentLevel: string;
}

export function AssessmentModal({
  isOpen,
  onClose,
  onComplete,
}: AssessmentModalProps) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<AssessmentData>({
    name: "",
    email: "",
    currentLevel: "",
  });

  // Ensure proper hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const handleInputChange = (field: keyof AssessmentData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isHydrated) return;

    // Validate form
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.currentLevel
    ) {
      alert("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      // Track the assessment start
      trackConversion({
        eventType: "cta_clicked",
        userType: getCurrentUserType(),
        conversionType: "primary",
        metadata: {
          source: "revolutionary_assessment",
          assessmentType: "consciousness_level",
          formData: {
            name: formData.name,
            level: formData.currentLevel,
          },
        },
      });

      // Simulate assessment processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Call completion handler
      if (onComplete) {
        onComplete(formData);
      }

      // Close modal
      onClose();
    } catch (error) {
      console.error("Assessment submission error:", error);
      alert("There was an error processing your assessment. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  // Don't render until hydrated
  if (!isHydrated) {
    return null;
  }

  return (
    <ModalPortal
      isOpen={isOpen}
      onClose={handleClose}
      closeOnOverlayClick={!isSubmitting}
      closeOnEscape={!isSubmitting}
      className="max-w-md mx-auto"
    >
      <Card className="bg-gradient-to-br from-slate-900 to-slate-800 text-white border-orange-500/30">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-500/20 rounded-full">
              <Brain className="w-8 h-8 text-orange-400" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-orange-400">
            Revolutionary IQ Assessment
          </CardTitle>
          <p className="text-slate-300 mt-2">
            Discover your consciousness level and weaponize your intelligence.
            No therapeutic gaslighting—just brutal honesty about your
            revolutionary potential.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Field */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Name
              </label>
              <Input
                id="name"
                type="text"
                placeholder="Your revolutionary name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="your.email@revolution.com"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="bg-slate-800 border-slate-600 text-white placeholder:text-slate-400"
                disabled={isSubmitting}
                required
              />
            </div>

            {/* Current Revolutionary Level */}
            <div>
              <label
                htmlFor="level"
                className="block text-sm font-medium text-slate-300 mb-2"
              >
                Current Revolutionary Level
              </label>
              <Select
                value={formData.currentLevel}
                onValueChange={(value) =>
                  handleInputChange("currentLevel", value)
                }
                disabled={isSubmitting}
                required
              >
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                  <SelectValue placeholder="Select your current state" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-600">
                  <SelectItem value="asleep">
                    Asleep (Following the masses)
                  </SelectItem>
                  <SelectItem value="awakening">
                    Awakening (Questioning reality)
                  </SelectItem>
                  <SelectItem value="aware">
                    Aware (Seeing the matrix)
                  </SelectItem>
                  <SelectItem value="activated">
                    Activated (Ready for revolution)
                  </SelectItem>
                  <SelectItem value="revolutionary">
                    Revolutionary (Leading change)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Revolutionary Benefit */}
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <Star className="w-5 h-5 text-orange-400" />
                <span className="font-semibold text-orange-400">
                  Revolutionary Benefit:
                </span>
              </div>
              <p className="text-sm text-slate-300">
                Get your Revolutionary IQ Score + Personal Consciousness Profile
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={
                isSubmitting ||
                !formData.name.trim() ||
                !formData.email.trim() ||
                !formData.currentLevel
              }
            >
              {isSubmitting ? (
                <motion.div
                  className="flex items-center justify-center gap-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Processing Assessment...
                </motion.div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" />
                  Begin Revolutionary Assessment
                </div>
              )}
            </Button>
          </form>

          <p className="text-xs text-slate-400 text-center">
            No therapeutic gaslighting. No spam. Just revolutionary honesty.
          </p>
        </CardContent>
      </Card>
    </ModalPortal>
  );
}

export default AssessmentModal;

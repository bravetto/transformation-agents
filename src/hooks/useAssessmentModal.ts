"use client";

import { useState, useCallback, useEffect } from "react";
import {
  trackConversion,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";

interface AssessmentData {
  name: string;
  email: string;
  currentLevel: string;
}

interface UseAssessmentModalReturn {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  handleComplete: (data: AssessmentData) => void;
  isTriggered: boolean;
}

export function useAssessmentModal(): UseAssessmentModalReturn {
  const [isOpen, setIsOpen] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);

  // Open modal with analytics tracking
  const openModal = useCallback(() => {
    setIsOpen(true);
    setIsTriggered(true);

    // Track modal open event
    trackConversion({
      eventType: "cta_clicked",
      userType: getCurrentUserType(),
      conversionType: "primary",
      metadata: {
        source: "assessment_modal_trigger",
        action: "open_modal",
      },
    });
  }, []);

  // Close modal
  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Handle assessment completion
  const handleComplete = useCallback((data: AssessmentData) => {
    // Track completion
    trackConversion({
      eventType: "form_submitted",
      userType: getCurrentUserType(),
      conversionType: "primary",
      metadata: {
        source: "revolutionary_assessment",
        assessmentData: {
          name: data.name,
          level: data.currentLevel,
        },
      },
    });

    // Close modal
    setIsOpen(false);

    // Here you could also:
    // - Save to database
    // - Send email
    // - Redirect to results page
    // - Show success message

    console.log("Assessment completed:", data);
  }, []);

  // Auto-trigger modal based on user behavior (optional)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      // Trigger modal when user scrolls 60% down the page (only once)
      if (scrollPercentage > 60 && !isTriggered) {
        // Add a small delay to make it feel more natural
        setTimeout(() => {
          openModal();
        }, 1000);
      }
    };

    // Only add scroll listener if modal hasn't been triggered yet
    if (!isTriggered) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, [isTriggered, openModal]);

  return {
    isOpen,
    openModal,
    closeModal,
    handleComplete,
    isTriggered,
  };
}

export default useAssessmentModal;

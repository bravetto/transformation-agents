"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  LetterFormContextState,
  LetterFormData,
  FormStep,
  ImpactScore,
  AutoSaveStatus,
} from "./types";
import { letterImpactSchema } from "./schema";

// Create context with default values
const LetterFormContext = createContext<LetterFormContextState>({
  formData: {},
  updateFormData: () => {},
  currentStep: FormStep.PersonalInfo,
  setCurrentStep: () => {},
  isPreviewMode: false,
  setIsPreviewMode: () => {},
  autoSaveStatus: "idle",
  impactScore: null,
  calculateImpactScore: () => {},
  handleNextStep: async () => false,
  handlePreviousStep: () => {},
  handleSubmit: async () => false,
  errors: {},
});

// Hook to use the context
export const useLetterForm = () => useContext(LetterFormContext);

interface LetterFormProviderProps {
  children: React.ReactNode;
  onSubmit?: (data: LetterFormData) => void;
  onSave?: (data: LetterFormData) => void;
}

export const LetterFormProvider: React.FC<LetterFormProviderProps> = ({
  children,
  onSubmit,
  onSave,
}) => {
  // Form state
  const [currentStep, setCurrentStep] = useState<FormStep>(
    FormStep.PersonalInfo,
  );
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<AutoSaveStatus>("idle");
  const [impactScore, setImpactScore] = useState<ImpactScore | null>(null);

  // Set up form with React Hook Form
  const {
    handleSubmit: rhfHandleSubmit,
    formState: { errors, isValid },
    getValues,
    setValue,
    trigger,
    watch,
  } = useForm<LetterFormData>({
    resolver: zodResolver(letterImpactSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      relationship: "other",
      howYouMet: "",
      timeKnown: "",
      specificExample1: "",
      specificExample2: "",
      specificExample3: "",
      ongoingSupport: "",
      letterContent: "",
      signatureStyle: "formal",
      allowContact: true,
    },
  });

  // Get current form data
  const formData = getValues();
  const watchedData = watch();

  // Update form data
  const updateFormData = useCallback(
    (data: Partial<LetterFormData>) => {
      Object.entries(data).forEach(([key, value]) => {
        setValue(key as keyof LetterFormData, value as any, {
          shouldValidate: true,
        });
      });
    },
    [setValue],
  );

  // Auto-save functionality
  useEffect(() => {
    const autoSaveTimer = setTimeout(() => {
      if (onSave && Object.keys(watchedData).length > 0) {
        setAutoSaveStatus("saving");
        try {
          onSave(watchedData);
          setAutoSaveStatus("saved");
        } catch (error) {
          console.error("Auto-save error:", error);
          setAutoSaveStatus("error");
        }
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearTimeout(autoSaveTimer);
  }, [watchedData, onSave]);

  // Calculate impact score
  const calculateImpactScore = useCallback(() => {
    const data = getValues();
    let score = 0;
    const feedback: string[] = [];

    // Score based on letter length
    const letterWords = data.letterContent?.split(/\s+/).length || 0;
    if (letterWords >= 500) {
      score += 25;
      feedback.push("Excellent letter length with comprehensive details");
    } else if (letterWords >= 300) {
      score += 15;
      feedback.push("Good letter length with sufficient details");
    } else {
      feedback.push("Consider adding more details to strengthen your letter");
    }

    // Score based on specific examples
    const hasSpecificDates =
      /\b(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/i.test(
        data.specificExample1 +
          data.specificExample2 +
          (data.specificExample3 || ""),
      );

    if (hasSpecificDates) {
      score += 20;
      feedback.push("Excellent use of specific dates in examples");
    } else {
      feedback.push("Adding specific dates would strengthen your examples");
    }

    // Score based on relationship details
    if (data.howYouMet && data.howYouMet.length > 100) {
      score += 15;
      feedback.push("Strong relationship context provided");
    }

    // Score based on ongoing support
    if (data.ongoingSupport && data.ongoingSupport.length > 100) {
      score += 15;
      feedback.push("Clear commitment to ongoing support demonstrated");
    }

    // Score based on example quality
    const example1Words = data.specificExample1?.split(/\s+/).length || 0;
    const example2Words = data.specificExample2?.split(/\s+/).length || 0;

    if (example1Words > 150 && example2Words > 150) {
      score += 25;
      feedback.push("Detailed, specific examples provided");
    } else if (example1Words > 100 && example2Words > 100) {
      score += 15;
      feedback.push("Good examples with room for more specific details");
    }

    // Determine category
    let category: "low" | "medium" | "high" | "exceptional";
    if (score >= 80) {
      category = "exceptional";
    } else if (score >= 60) {
      category = "high";
    } else if (score >= 40) {
      category = "medium";
    } else {
      category = "low";
    }

    setImpactScore({ score, feedback, category });
  }, [getValues]);

  // Handle next step
  const handleNextStep = async () => {
    let fieldsToValidate: (keyof LetterFormData)[] = [];

    // Determine which fields to validate based on current step
    switch (currentStep) {
      case FormStep.PersonalInfo:
        fieldsToValidate = ["name", "email", "address"];
        break;
      case FormStep.Relationship:
        fieldsToValidate = ["relationship", "howYouMet", "timeKnown"];
        break;
      case FormStep.Examples:
        fieldsToValidate = [
          "specificExample1",
          "specificExample2",
          "ongoingSupport",
        ];
        break;
      case FormStep.LetterContent:
        fieldsToValidate = ["letterContent", "signatureStyle"];
        break;
      case FormStep.Review:
        // On review step, validate all fields
        const result = await rhfHandleSubmit(async (data) => {
          calculateImpactScore();
          if (onSubmit) {
            onSubmit(data);
          }
          return true;
        })();
        return Boolean(result);
    }

    // Validate fields for current step
    const isStepValid = await trigger(fieldsToValidate);

    if (isStepValid) {
      // If not on last step, move to next step
      if (currentStep < FormStep.Review) {
        setCurrentStep(currentStep + 1);
        return true;
      }
    }

    return false;
  };

  // Handle previous step
  const handlePreviousStep = () => {
    if (currentStep > FormStep.PersonalInfo) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async (): Promise<boolean> => {
    const result = await rhfHandleSubmit(async (data) => {
      if (onSubmit) {
        onSubmit(data);
      }
      return true;
    })();
    return Boolean(result);
  };

  // Format errors for easier access
  const formattedErrors: Record<string, string> = {};
  Object.entries(errors).forEach(([key, value]) => {
    formattedErrors[key] = value.message as string;
  });

  // Context value
  const contextValue: LetterFormContextState = {
    formData,
    updateFormData,
    currentStep,
    setCurrentStep,
    isPreviewMode,
    setIsPreviewMode,
    autoSaveStatus,
    impactScore,
    calculateImpactScore,
    handleNextStep,
    handlePreviousStep,
    handleSubmit,
    errors: formattedErrors,
  };

  return (
    <LetterFormContext.Provider value={contextValue}>
      {children}
    </LetterFormContext.Provider>
  );
};

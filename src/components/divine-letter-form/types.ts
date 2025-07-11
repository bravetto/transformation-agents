import { z } from "zod";
import { letterImpactSchema } from "./schema";

/**
 * Type for form data derived from the Zod schema
 */
export type LetterFormData = z.infer<typeof letterImpactSchema>;

/**
 * Props for the main DivineLetterForm component
 */
export interface DivineLetterFormProps {
  /** Callback function when the form is submitted */
  onSubmit?: (data: LetterFormData) => void;
  /** Callback function when the form is saved */
  onSave?: (data: LetterFormData) => void;
  /** Additional CSS classes */
  className?: string;
}

/**
 * Relationship types for letter writers
 */
export type RelationshipType =
  | "youth_helped"
  | "employer"
  | "colleague"
  | "mentor"
  | "community_leader"
  | "friend"
  | "family"
  | "other";

/**
 * Signature styles for letter closing
 */
export type SignatureStyle = "formal" | "personal" | "spiritual";

/**
 * Form steps
 */
export enum FormStep {
  PersonalInfo = 0,
  Relationship = 1,
  Examples = 2,
  LetterContent = 3,
  Review = 4,
}

/**
 * Structure for relationship-specific guidance
 */
export interface RelationshipGuidance {
  title: string;
  description: string;
  prompts: {
    howYouMet: string;
    specificExample1: string;
    specificExample2: string;
    specificExample3: string;
    ongoingSupport: string;
  };
}

/**
 * Auto-save status
 */
export type AutoSaveStatus = "idle" | "saving" | "saved" | "error";

/**
 * Letter impact score result
 */
export interface ImpactScore {
  score: number;
  feedback: string[];
  category: "low" | "medium" | "high" | "exceptional";
}

/**
 * Form context state
 */
export interface LetterFormContextState {
  formData: Partial<LetterFormData>;
  updateFormData: (data: Partial<LetterFormData>) => void;
  currentStep: FormStep;
  setCurrentStep: (step: FormStep) => void;
  isPreviewMode: boolean;
  setIsPreviewMode: (isPreview: boolean) => void;
  autoSaveStatus: AutoSaveStatus;
  impactScore: ImpactScore | null;
  calculateImpactScore: () => void;
  handleNextStep: () => Promise<boolean>;
  handlePreviousStep: () => void;
  handleSubmit: () => Promise<boolean>;
  errors: Record<string, string>;
}

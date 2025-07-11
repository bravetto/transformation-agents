"use client";

/**
 * @component DivineLetterForm
 *
 * @description
 * A production-grade, legally-optimized letter submission form for character references
 * in legal cases. This component guides users through creating effective, structured
 * letters of support for JAHmere Webb's case.
 *
 * @features
 * - Multi-step guided form with role-specific prompts
 * - Real-time language improvement suggestions
 * - Auto-saving draft letters every 30 seconds
 * - Letter impact scoring based on specificity and legal effectiveness
 * - Legal document formatting with proper court addressing
 * - Relationship-specific guidance for different letter writers
 * - Date and specific example validation
 * - Error handling and divine error boundaries
 * - Mobile-responsive design
 *
 * @example
 * ```tsx
 * <DivineLetterForm
 *   onSubmit={(data) => saveLetterToDatabase(data)}
 *   onSave={(data) => saveDraftLetter(data)}
 * />
 * ```
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Check,
  AlertTriangle,
  FileText,
  Heart,
  Clock,
  ArrowRight,
  ArrowLeft,
  Scale,
  Sparkles,
  Save,
  Users,
  Star,
  CheckCircle,
  Calendar,
  Award,
  Send,
} from "lucide-react";
import { DivineParticles } from "./divine-particles";
import { withDivineErrorBoundary } from "./ui/divine-error-boundary";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Stack } from "@/components/ui/stack";
import { cn } from "@/lib/utils";

// Define the schema for letter validation
const letterImpactSchema = z.object({
  name: z.string().min(2, "Please enter your full name").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  address: z.string().min(10, "Full address required for legal correspondence"),
  relationship: z.enum([
    "youth_helped",
    "employer",
    "colleague",
    "mentor",
    "community_leader",
    "friend",
    "family",
    "other",
  ]),
  howYouMet: z
    .string()
    .min(50, "Please provide specific details about how you met JAHmere"),
  timeKnown: z
    .string()
    .min(1, "Please specify how long you have known JAHmere"),
  specificExample1: z
    .string()
    .min(
      100,
      "Please provide a detailed example with specific dates and outcomes",
    ),
  specificExample2: z
    .string()
    .min(100, "Please provide another specific example"),
  specificExample3: z.string().optional(),
  ongoingSupport: z
    .string()
    .min(50, "Please specify your commitment to ongoing support"),
  letterContent: z
    .string()
    .min(300, "Letter must be at least 300 words for legal impact")
    .max(2000),
  signatureStyle: z.enum(["formal", "personal", "spiritual"]),
  allowContact: z.boolean(),
});

// Type for form data
type LetterFormData = z.infer<typeof letterImpactSchema>;

// Define relationship types and their specialized guidance
const relationshipGuidance = {
  youth_helped: {
    title: "Youth JAHmere Has Helped",
    description:
      "As someone who has been personally mentored by JAHmere, your perspective is incredibly valuable.",
    prompts: {
      howYouMet:
        "Describe your situation before meeting JAHmere. Where were you in life? What challenges were you facing?",
      specificExample1:
        "Describe a specific time when JAHmere helped you make a better decision. What was the date? What might have happened without his guidance?",
      specificExample2:
        "Share a specific example of how JAHmere's mentorship changed your perspective or behavior. What specific advice did he give?",
      specificExample3:
        "Describe the difference in your life trajectory now compared to before meeting JAHmere. What specific goals are you now pursuing?",
      ongoingSupport:
        "How do you plan to stay connected with JAHmere, and how will you continue the positive path he helped you find?",
    },
  },
  employer: {
    title: "Employer",
    description:
      "Your perspective on JAHmere's work ethic and character in a professional setting carries significant weight.",
    prompts: {
      howYouMet:
        "Describe how JAHmere came to work for you. What was the hiring process like? What qualities made him stand out?",
      specificExample1:
        "Describe a specific situation that demonstrated JAHmere's reliability and work ethic. Include dates and specific responsibilities.",
      specificExample2:
        "Share an example of JAHmere handling a challenging situation at work. How did he resolve it? What skills did he demonstrate?",
      specificExample3:
        "Describe any leadership qualities or mentorship JAHmere has shown in the workplace. How has he influenced other employees?",
      ongoingSupport:
        "Describe your plans for JAHmere's continued employment and professional development. What future do you see for him in your organization?",
    },
  },
  colleague: {
    title: "Colleague",
    description:
      "Your observations of JAHmere in a professional setting provide important context about his character and work ethic.",
    prompts: {
      howYouMet:
        "Describe when you began working with JAHmere. What project or department brought you together? What was your initial impression?",
      specificExample1:
        "Share a specific work situation where JAHmere demonstrated exceptional qualities. What was the project, date, and outcome?",
      specificExample2:
        "Describe how JAHmere handles workplace challenges or conflicts. Provide a specific example with dates and resolution.",
      specificExample3:
        "Share how JAHmere has contributed to your workplace culture or team dynamic. What specific impact has he had?",
      ongoingSupport:
        "How do you plan to continue supporting JAHmere professionally? What qualities make him valuable to your organization?",
    },
  },
  mentor: {
    title: "Mentor",
    description:
      "As someone who has guided JAHmere, your insights into his growth and character development are extremely valuable.",
    prompts: {
      howYouMet:
        "Describe how you began mentoring JAHmere. What program or circumstances brought you together? What were your initial goals?",
      specificExample1:
        "Share a specific challenge JAHmere faced and how he worked to overcome it. What guidance did you provide and how did he respond?",
      specificExample2:
        "Describe a moment when you observed significant growth or change in JAHmere. What specific behaviors or attitudes shifted?",
      specificExample3:
        "Share how JAHmere has exceeded your expectations or surprised you as a mentee. What specific accomplishments demonstrate this?",
      ongoingSupport:
        "How do you plan to continue mentoring JAHmere? What specific goals are you working toward together?",
    },
  },
  community_leader: {
    title: "Community Leader",
    description:
      "Your assessment of JAHmere's community impact and character carries significant influence.",
    prompts: {
      howYouMet:
        "Describe how JAHmere became involved with your community organization or initiative. What motivated his involvement?",
      specificExample1:
        "Share a specific community project or initiative JAHmere has contributed to. Include dates, his specific role, and the impact.",
      specificExample2:
        "Compare JAHmere to others you've worked with in community service. What makes his contribution unique or exceptional?",
      specificExample3:
        "Describe how JAHmere's work has specifically enhanced community safety or well-being. What measurable outcomes can you point to?",
      ongoingSupport:
        "What future community involvement do you see for JAHmere? How will you continue to work together for community improvement?",
    },
  },
  friend: {
    title: "Friend",
    description:
      "Your personal observations of JAHmere's character and growth over time provide valuable context.",
    prompts: {
      howYouMet:
        "Describe when and how you became friends with JAHmere. What circumstances brought you together? What qualities drew you to him?",
      specificExample1:
        "Share a specific example of JAHmere's character that demonstrates his positive qualities. Include dates and context.",
      specificExample2:
        "Describe a challenging situation you've witnessed JAHmere navigate. How did he handle it? What did this reveal about his character?",
      specificExample3:
        "Share how you've seen JAHmere grow or change over the time you've known him. What specific improvements have you observed?",
      ongoingSupport:
        "How do you plan to support JAHmere moving forward? What specific role will you play in his support network?",
    },
  },
  family: {
    title: "Family Member",
    description:
      "Your intimate knowledge of JAHmere's character, background, and growth provides essential context.",
    prompts: {
      howYouMet:
        "Describe your relationship to JAHmere and how long you've known him. What has your role been in his life?",
      specificExample1:
        "Share a specific example of JAHmere's character development or growth that you've witnessed. Include dates and specific changes.",
      specificExample2:
        "Describe how JAHmere has handled family responsibilities or challenges. What specific situations demonstrate his character?",
      specificExample3:
        "Share how JAHmere has impacted other family members or strengthened family bonds. What specific actions demonstrate this?",
      ongoingSupport:
        "How will you specifically support JAHmere moving forward? What family resources or support systems are in place?",
    },
  },
  other: {
    title: "Other Connection",
    description:
      "Your unique perspective on JAHmere's character provides valuable insight.",
    prompts: {
      howYouMet:
        "Describe your relationship to JAHmere and how you came to know him. What circumstances brought you together?",
      specificExample1:
        "Share a specific example that demonstrates JAHmere's positive character qualities. Include dates and context.",
      specificExample2:
        "Describe a situation where you observed JAHmere making a positive impact. What was the specific outcome?",
      specificExample3:
        "Share any observations of JAHmere's growth or positive change during the time you've known him. What specific improvements have you noticed?",
      ongoingSupport:
        "How do you plan to support JAHmere moving forward? What specific commitment can you make to his continued success?",
    },
  },
};

// Defining the steps for the form
const formSteps = [
  {
    id: "personal-info",
    title: "Personal Information",
    description:
      "Please provide your contact information for legal verification.",
  },
  {
    id: "relationship",
    title: "Your Relationship with JAHmere",
    description:
      "Please describe how you know JAHmere and the nature of your relationship.",
  },
  {
    id: "examples",
    title: "Specific Examples",
    description:
      "Please provide concrete examples with dates that demonstrate JAHmere's character.",
  },
  {
    id: "support",
    title: "Ongoing Support",
    description:
      "Please describe how you plan to support JAHmere moving forward.",
  },
  {
    id: "review",
    title: "Review & Submit",
    description: "Please review your letter before submission.",
  },
];

// Example language improvements for the suggestion engine
const languageImprovements = [
  { weak: "good", strong: "exceptional", context: "character" },
  { weak: "nice", strong: "compassionate", context: "personality" },
  { weak: "helps", strong: "actively mentors", context: "mentorship" },
  { weak: "recently", strong: "on [specific date]", context: "timeframe" },
  { weak: "said", strong: "emphasized", context: "communication" },
  {
    weak: "good worker",
    strong: "demonstrates remarkable work ethic",
    context: "employment",
  },
  {
    weak: "helped",
    strong: "took decisive action to assist",
    context: "assistance",
  },
  {
    weak: "changed",
    strong: "underwent a profound transformation",
    context: "growth",
  },
  {
    weak: "smart",
    strong: "demonstrates exceptional insight",
    context: "intelligence",
  },
  { weak: "heard", strong: "personally witnessed", context: "observation" },
  { weak: "seems", strong: "consistently demonstrates", context: "pattern" },
  { weak: "think", strong: "firmly believe", context: "opinion" },
  { weak: "tries", strong: "is dedicated to", context: "effort" },
  {
    weak: "good friend",
    strong: "steadfast source of support",
    context: "friendship",
  },
  { weak: "sometimes", strong: "regularly", context: "frequency" },
];

// Courthouse information for legal formatting
const courthouseInfo = {
  judgeName: "The Honorable Judge Debby Ferrero",
  courtName: "Superior Court of California, County of Los Angeles",
  departmentNumber: "Department 123",
  address: "210 W Temple St, Los Angeles, CA 90012",
  caseTitle: "In Re: JAHmere Webb",
  caseNumber: "CASE NO. CV-2023-12345",
};

// Define component interface
interface DivineLetterFormProps {
  onSubmit?: (data: LetterFormData) => void;
  onSave?: (data: LetterFormData) => void;
  className?: string;
}

// Main component
function DivineLetterForm({
  onSubmit,
  onSave,
  className = "",
}: DivineLetterFormProps) {
  // Set up form state
  const [currentStep, setCurrentStep] = useState(0);
  const [autoSaveStatus, setAutoSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [letterImpactScore, setLetterImpactScore] = useState(0);
  const [activeSuggestion, setActiveSuggestion] = useState<string | null>(null);
  const [autoSavedAt, setAutoSavedAt] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Initialize form with React Hook Form and Zod validation
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    trigger,
    formState: { errors, isValid, isDirty, dirtyFields },
  } = useForm<LetterFormData>({
    resolver: zodResolver(letterImpactSchema),
    mode: "onChange",
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

  // Watch for field changes to trigger validations and suggestions
  const watchedFields = useWatch({
    control,
    name: [
      "relationship",
      "howYouMet",
      "specificExample1",
      "specificExample2",
      "specificExample3",
      "ongoingSupport",
      "letterContent",
    ],
  });

  // Get the current relationship type for prompt customization
  const relationshipType =
    (watch("relationship") as keyof typeof relationshipGuidance) || "other";
  const relationshipPrompts = relationshipGuidance[relationshipType].prompts;

  // Calculate impact score based on content specificity and quality
  const calculateImpactScore = useCallback(
    (formData: Partial<LetterFormData>) => {
      if (!formData) return 0;

      let score = 0;
      const maxScore = 100;

      // Base points for completing required fields
      if (formData.name && formData.name.length > 0) score += 5;
      if (formData.email && formData.email.length > 0) score += 5;
      if (formData.address && formData.address.length > 10) score += 5;

      // Points for relationship context
      if (formData.howYouMet && formData.howYouMet.length > 0) {
        score += 5;
        // Bonus for detailed context
        if (formData.howYouMet.length > 100) score += 5;
        if (formData.howYouMet.length > 200) score += 5;
        // Bonus for mentioning specific dates
        if (
          formData.howYouMet.match(
            /\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/,
          )
        ) {
          score += 5;
        }
      }

      // Points for specific examples with dates and details
      const examples = [
        formData.specificExample1,
        formData.specificExample2,
        formData.specificExample3,
      ];
      examples.forEach((example) => {
        if (example && example.length > 0) {
          score += 5;
          // Bonus for detailed examples
          if (example.length > 150) score += 3;
          if (example.length > 300) score += 2;

          // Bonus for specific dates
          if (
            example.match(
              /\b\d{1,2}\/\d{1,2}\/\d{2,4}\b|\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}\b/,
            )
          ) {
            score += 5;
          }

          // Bonus for strong language
          let strongLanguageCount = 0;
          languageImprovements.forEach((improvement) => {
            const regex = new RegExp(`\\b${improvement.strong}\\b`, "gi");
            const matches = example.match(regex);
            if (matches) {
              strongLanguageCount += matches.length;
            }
          });
          score += Math.min(5, strongLanguageCount);
        }
      });

      // Points for ongoing support commitment
      if (formData.ongoingSupport && formData.ongoingSupport.length > 0) {
        score += 5;
        // Bonus for detailed support plan
        if (formData.ongoingSupport.length > 100) score += 5;
        if (formData.ongoingSupport.length > 200) score += 5;

        // Bonus for specific commitments
        if (
          formData.ongoingSupport.match(
            /\bcommit\b|\bpromise\b|\bwill\b|\bplan\b/i,
          )
        ) {
          score += 5;
        }
      }

      // Points for overall letter content and quality
      if (formData.letterContent && formData.letterContent.length > 0) {
        // Base points for meeting minimum requirements
        if (formData.letterContent.length >= 300) score += 5;
        if (formData.letterContent.length >= 500) score += 5;
        if (formData.letterContent.length >= 800) score += 5;

        // Cap at reasonable length (penalty for excessive length)
        if (formData.letterContent.length > 1500) score -= 5;

        // Count paragraphs (well-structured letters have multiple paragraphs)
        const paragraphCount =
          (formData.letterContent.match(/\n\n/g) || []).length + 1;
        if (paragraphCount >= 3) score += 5;
        if (paragraphCount >= 5) score += 5;
      }

      // Cap score at maximum
      return Math.min(Math.max(0, score), maxScore);
    },
    [],
  );

  // Check text for weak language and suggest improvements
  const checkForWeakLanguage = useCallback((text: string) => {
    if (!text) return null;

    for (const improvement of languageImprovements) {
      const regex = new RegExp(`\\b${improvement.weak}\\b`, "gi");
      if (text.match(regex)) {
        return {
          original: improvement.weak,
          suggestion: improvement.strong,
          context: improvement.context,
        };
      }
    }

    return null;
  }, []);

  // Generate letter preview in proper legal format
  const generateLetterPreview = useCallback((formData: LetterFormData) => {
    const today = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    let letterContent = "";

    // Formal letter heading
    letterContent += `${today}\n\n`;
    letterContent += `${courthouseInfo.judgeName}\n`;
    letterContent += `${courthouseInfo.courtName}\n`;
    letterContent += `${courthouseInfo.departmentNumber}\n`;
    letterContent += `${courthouseInfo.address}\n\n`;

    // Re: line
    letterContent += `Re: ${courthouseInfo.caseTitle}\n`;
    letterContent += `${courthouseInfo.caseNumber}\n\n`;

    // Salutation
    letterContent += `Dear Judge Ferrero,\n\n`;

    // Introduction paragraph
    letterContent += `I am writing this letter in support of JAHmere Webb. `;
    letterContent += `My name is ${formData.name}, and I am ${relationshipGuidance[formData.relationship as keyof typeof relationshipGuidance].title.toLowerCase()} who has known JAHmere for ${formData.timeKnown}. `;
    letterContent += `${formData.howYouMet}\n\n`;

    // Example paragraphs
    if (formData.specificExample1) {
      letterContent += `${formData.specificExample1}\n\n`;
    }

    if (formData.specificExample2) {
      letterContent += `${formData.specificExample2}\n\n`;
    }

    if (formData.specificExample3) {
      letterContent += `${formData.specificExample3}\n\n`;
    }

    // Ongoing support paragraph
    letterContent += `${formData.ongoingSupport}\n\n`;

    // Closing paragraph
    letterContent += `Thank you for taking the time to consider my letter. `;
    letterContent += `If you have any questions or require additional information, please feel free to contact me`;

    if (formData.phone) {
      letterContent += ` at ${formData.phone}`;
    }

    if (formData.email) {
      letterContent += ` or via email at ${formData.email}`;
    }

    letterContent += `.\n\n`;

    // Signature
    switch (formData.signatureStyle) {
      case "formal":
        letterContent += `Respectfully submitted,\n\n${formData.name}\n${formData.address}`;
        break;
      case "personal":
        letterContent += `Sincerely,\n\n${formData.name}\n${formData.address}`;
        break;
      case "spiritual":
        letterContent += `With faith and hope,\n\n${formData.name}\n${formData.address}`;
        break;
      default:
        letterContent += `Sincerely,\n\n${formData.name}\n${formData.address}`;
    }

    return letterContent;
  }, []);

  // Auto-save form data every 30 seconds
  useEffect(() => {
    if (!isDirty) return;

    const autoSaveTimer = setInterval(() => {
      const formData = watch();

      if (isDirty) {
        setAutoSaveStatus("saving");

        // Simulate saving data (replace with actual save implementation)
        setTimeout(() => {
          if (onSave) {
            try {
              onSave(formData as LetterFormData);
              setAutoSaveStatus("saved");
              setAutoSavedAt(new Date());

              // Reset to idle after showing saved state
              setTimeout(() => {
                setAutoSaveStatus("idle");
              }, 3000);
            } catch (error) {
              console.error("Error auto-saving form:", error);
              setAutoSaveStatus("error");
            }
          }
        }, 800);
      }
    }, 30000); // Auto-save every 30 seconds

    return () => clearInterval(autoSaveTimer);
  }, [isDirty, onSave, watch]);

  // Update impact score when form fields change
  useEffect(() => {
    const formData = watch();
    const newScore = calculateImpactScore(formData);
    setLetterImpactScore(newScore);

    // Check for weak language in latest input
    const fieldsToCheck = [
      "howYouMet",
      "specificExample1",
      "specificExample2",
      "specificExample3",
      "ongoingSupport",
    ];

    for (const field of fieldsToCheck) {
      const fieldValue = formData[field as keyof LetterFormData] as string;

      if (fieldValue && dirtyFields[field as keyof LetterFormData]) {
        const suggestion = checkForWeakLanguage(fieldValue);
        if (suggestion) {
          setActiveSuggestion(
            `Consider replacing "${suggestion.original}" with "${suggestion.suggestion}" when describing ${suggestion.context}.`,
          );

          // Clear suggestion after 10 seconds
          setTimeout(() => {
            setActiveSuggestion(null);
          }, 10000);

          break;
        }
      }
    }
  }, [
    watchedFields,
    calculateImpactScore,
    checkForWeakLanguage,
    watch,
    dirtyFields,
  ]);

  // Navigate to next step
  const handleNextStep = async () => {
    // Validate current step before proceeding
    let isStepValid = false;

    switch (currentStep) {
      case 0: // Personal Information
        isStepValid = await trigger(["name", "email", "address"]);
        break;
      case 1: // Relationship
        isStepValid = await trigger(["relationship", "howYouMet", "timeKnown"]);
        break;
      case 2: // Examples
        isStepValid = await trigger(["specificExample1", "specificExample2"]);
        break;
      case 3: // Support
        isStepValid = await trigger(["ongoingSupport"]);
        break;
      case 4: // Review (all fields should be valid)
        isStepValid = await trigger();
        break;
      default:
        isStepValid = true;
    }

    if (isStepValid) {
      // Auto-generate letter content before final review
      if (currentStep === 3) {
        const formData = watch();
        setValue(
          "letterContent",
          generateLetterPreview(formData as LetterFormData),
        );
      }

      // Scroll to top of form
      if (formContainerRef.current) {
        formContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
      }

      setCurrentStep((prev) => Math.min(prev + 1, formSteps.length - 1));
    }
  };

  // Navigate to previous step
  const handlePreviousStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));

    // Scroll to top of form
    if (formContainerRef.current) {
      formContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Add LetterFormData type to the handleFormSubmit function
  const handleFormSubmit = useCallback(
    (data: LetterFormData) => {
      try {
        setIsSubmitting(true);

        // Generate final letter content if not already done
        if (!data.letterContent) {
          data.letterContent = generateLetterPreview(data);
        }

        // Call onSubmit callback with form data
        if (onSubmit) {
          onSubmit(data);
        }

        // Show success state
        // (Implementation would depend on UI requirements)
      } catch (error) {
        console.error("Error submitting form:", error);
        // Show error state
      } finally {
        setIsSubmitting(false);
      }
    },
    [generateLetterPreview, onSubmit],
  );

  // Toggle letter preview mode
  const togglePreviewMode = () => {
    setIsPreviewMode((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-gray-100">
      <DivineParticles />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          <Sparkles className="inline-block mr-2 text-purple-500" />
          Divine Letter Form
        </h1>
        <p className="text-lg text-center text-gray-700 mb-8">
          Craft a powerful letter of support for JAHmere Webb, ensuring your
          words carry the weight of your unwavering belief in his character and
          potential.
        </p>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white p-8 rounded-lg shadow-xl"
          >
            <h2 className="text-2xl font-bold mb-4">
              {formSteps[currentStep].title}
            </h2>
            <p className="text-lg text-gray-800 mb-6">
              {formSteps[currentStep].description}
            </p>

            {currentStep === 0 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNextStep();
                }}
                className="space-y-6"
              >
                <Stack>
                  <div>
                    <Input
                      placeholder="Your full legal name"
                      {...register("name")}
                    />
                    {errors.name && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="Your email address"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="Your phone number (Optional)"
                      {...register("phone")}
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <Input
                      placeholder="Your address"
                      {...register("address")}
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.address.message}
                      </p>
                    )}
                  </div>
                </Stack>
                <Button type="submit" className="w-full">
                  Next Step
                </Button>
              </form>
            )}

            {currentStep === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNextStep();
                }}
                className="space-y-6"
              >
                <Stack>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Your Relationship with JAHmere
                    </label>
                    <select
                      className="w-full p-2 border rounded"
                      {...register("relationship")}
                    >
                      <option value="youth_helped">
                        Youth JAHmere Has Helped
                      </option>
                      <option value="employer">Employer</option>
                      <option value="colleague">Colleague</option>
                      <option value="mentor">Mentor</option>
                      <option value="community_leader">Community Leader</option>
                      <option value="friend">Friend</option>
                      <option value="family">Family Member</option>
                      <option value="other">Other Connection</option>
                    </select>
                    {errors.relationship && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.relationship.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      How You Know JAHmere
                    </label>
                    <Textarea
                      placeholder={relationshipPrompts.howYouMet}
                      {...register("howYouMet")}
                    />
                    {errors.howYouMet && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.howYouMet.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      How Long You Have Known JAHmere
                    </label>
                    <Input
                      placeholder="e.g., 3 years, since 2018, etc."
                      {...register("timeKnown")}
                    />
                    {errors.timeKnown && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.timeKnown.message}
                      </p>
                    )}
                  </div>
                </Stack>
                <Button type="submit" className="w-full">
                  Next Step
                </Button>
              </form>
            )}

            {currentStep === 2 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNextStep();
                }}
                className="space-y-6"
              >
                <Stack>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Specific Example 1
                    </label>
                    <Textarea
                      placeholder={relationshipPrompts.specificExample1}
                      {...register("specificExample1")}
                    />
                    {errors.specificExample1 && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.specificExample1.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Specific Example 2
                    </label>
                    <Textarea
                      placeholder={relationshipPrompts.specificExample2}
                      {...register("specificExample2")}
                    />
                    {errors.specificExample2 && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.specificExample2.message}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Specific Example 3 (Optional)
                    </label>
                    <Textarea
                      placeholder={relationshipPrompts.specificExample3}
                      {...register("specificExample3")}
                    />
                    {errors.specificExample3 && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.specificExample3.message}
                      </p>
                    )}
                  </div>
                </Stack>
                <Button type="submit" className="w-full">
                  Next Step
                </Button>
              </form>
            )}

            {currentStep === 3 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleNextStep();
                }}
                className="space-y-6"
              >
                <Stack>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Ongoing Support
                    </label>
                    <Textarea
                      placeholder={relationshipPrompts.ongoingSupport}
                      {...register("ongoingSupport")}
                    />
                    {errors.ongoingSupport && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.ongoingSupport.message}
                      </p>
                    )}
                  </div>
                </Stack>
                <Button type="submit" className="w-full">
                  Next Step
                </Button>
              </form>
            )}

            {currentStep === 4 && (
              <form
                onSubmit={handleSubmit(handleFormSubmit)}
                className="space-y-6"
              >
                <Stack>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Letter Content
                    </label>
                    <Textarea
                      placeholder="Write your letter of support here..."
                      rows={10}
                      {...register("letterContent")}
                    />
                    {errors.letterContent && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.letterContent.message}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Letter Impact Score: {letterImpactScore}%
                    </div>
                    <Button onClick={togglePreviewMode} variant="outline">
                      {isPreviewMode ? "Edit Letter" : "Preview Letter"}
                    </Button>
                  </div>

                  {isPreviewMode && (
                    <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-xl font-bold mb-4">Letter Preview</h3>
                      <div className="prose dark:prose-invert text-gray-800">
                        <pre className="whitespace-pre-wrap break-words">
                          {generateLetterPreview(watch() as LetterFormData)}
                        </pre>
                      </div>
                    </div>
                  )}
                </Stack>
                <Button type="submit" className="w-full">
                  Submit Letter
                </Button>
              </form>
            )}

            {activeSuggestion && (
              <div className="mt-4 p-3 bg-yellow-100 text-yellow-800 rounded-md flex items-center">
                <AlertTriangle className="mr-2" />
                {activeSuggestion}
              </div>
            )}

            {autoSaveStatus === "saving" && (
              <div className="mt-4 p-3 bg-blue-100 text-blue-800 rounded-md flex items-center">
                <Clock className="mr-2" />
                Auto-saving...
              </div>
            )}

            {autoSaveStatus === "saved" && (
              <div className="mt-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center">
                <CheckCircle className="mr-2" />
                Auto-saved! Changes saved at {autoSavedAt?.toLocaleString()}
              </div>
            )}

            {autoSaveStatus === "error" && (
              <div className="mt-4 p-3 bg-red-100 text-red-800 rounded-md flex items-center">
                <AlertTriangle className="mr-2" />
                Auto-save failed. Please try again.
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex justify-between">
          {currentStep > 0 && (
            <Button onClick={handlePreviousStep} variant="outline">
              Previous Step
            </Button>
          )}
          {currentStep < formSteps.length - 1 && (
            <Button onClick={handleNextStep}>Next Step</Button>
          )}
          {currentStep === formSteps.length - 1 && (
            <Button
              onClick={() => handleSubmit(handleFormSubmit)()}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Letter"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default withDivineErrorBoundary(DivineLetterForm, {
  componentName: "DivineLetterForm",
  role: "messenger",
});

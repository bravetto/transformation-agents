import { z } from "zod";

// Ensure zod is installed: npm install zod

// Common validation patterns
export const emailSchema = z
  .string()
  .email("Please enter a valid email address");
export const phoneSchema = z
  .string()
  .regex(/^\+?[\d\s-()]+$/, "Please enter a valid phone number")
  .optional();

// Prayer submission schema
export const prayerSubmissionSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: emailSchema,
  message: z.string().min(10, "Prayer message must be at least 10 characters"),
  isPublic: z.boolean().default(true),
  category: z.enum([
    "support",
    "justice",
    "transformation",
    "healing",
    "gratitude",
  ]),
});

// Character witness schema
export const characterWitnessSchema = z.object({
  // Personal information
  fullName: z.string().min(3, "Please enter your full name"),
  email: emailSchema,
  phone: phoneSchema,

  // Relationship details
  relationship: z.string().min(3, "Please describe your relationship"),
  yearsKnown: z.number().min(0).max(100),

  // Testimony
  testimony: z
    .string()
    .min(100, "Please provide at least 100 characters for your testimony")
    .max(5000, "Testimony should not exceed 5000 characters"),

  // Legal willingness
  willTestifyInCourt: z.boolean(),
  canBeContacted: z.boolean().default(true),

  // Consent
  consent: z.boolean().refine((val) => val === true, {
    message: "You must consent to share your testimony",
  }),
});

// Contact form schema
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: emailSchema,
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
  category: z.enum(["legal", "media", "support", "general"]).default("general"),
});

// Type inference helpers
export type PrayerSubmission = z.infer<typeof prayerSubmissionSchema>;
export type CharacterWitness = z.infer<typeof characterWitnessSchema>;
export type ContactForm = z.infer<typeof contactFormSchema>;

import { z } from "zod";
import { RelationshipType, SignatureStyle } from "./types";

/**
 * Zod schema for letter validation
 * Defines the structure and validation rules for the letter form
 */
export const letterImpactSchema = z.object({
  // Personal information
  name: z.string().min(2, "Please enter your full name").max(100),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  address: z.string().min(10, "Full address required for legal correspondence"),

  // Relationship information
  relationship: z.enum([
    "youth_helped",
    "employer",
    "colleague",
    "mentor",
    "community_leader",
    "friend",
    "family",
    "other",
  ] as const),
  howYouMet: z
    .string()
    .min(50, "Please provide specific details about how you met JAHmere"),
  timeKnown: z
    .string()
    .min(1, "Please specify how long you have known JAHmere"),

  // Specific examples
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

  // Support information
  ongoingSupport: z
    .string()
    .min(50, "Please specify your commitment to ongoing support"),

  // Letter content
  letterContent: z
    .string()
    .min(300, "Letter must be at least 300 words for legal impact")
    .max(2000),

  // Signature style
  signatureStyle: z.enum(["formal", "personal", "spiritual"] as const),

  // Contact permission
  allowContact: z.boolean(),
});

/**
 * Schema for step 1: Personal Information
 */
export const personalInfoSchema = letterImpactSchema.pick({
  name: true,
  email: true,
  phone: true,
  address: true,
});

/**
 * Schema for step 2: Relationship
 */
export const relationshipSchema = letterImpactSchema.pick({
  relationship: true,
  howYouMet: true,
  timeKnown: true,
});

/**
 * Schema for step 3: Examples
 */
export const examplesSchema = letterImpactSchema.pick({
  specificExample1: true,
  specificExample2: true,
  specificExample3: true,
  ongoingSupport: true,
});

/**
 * Schema for step 4: Letter Content
 */
export const letterContentSchema = letterImpactSchema.pick({
  letterContent: true,
  signatureStyle: true,
  allowContact: true,
});

"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { logger } from "@/lib/logger";

// Prayer submission schema with divine validation
const prayerSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name too long"),
  location: z.string().optional(),
  message: z
    .string()
    .min(10, "Prayer message too short")
    .max(1000, "Prayer message too long"),
  intention: z.enum([
    "HEALING",
    "GUIDANCE",
    "PROTECTION",
    "FREEDOM",
    "PEACE",
    "OTHER",
  ]),
  isAnonymous: z.boolean().default(false),
});

// Letter submission schema
const letterSchema = z.object({
  authorName: z.string().min(1, "Author name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  content: z.string().min(100, "Letter must be at least 100 characters"),
  email: z.string().email("Valid email required").optional(),
  phone: z.string().optional(),
});

export async function submitPrayer(formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      location: formData.get("location"),
      message: formData.get("message"),
      intention: formData.get("intention"),
      isAnonymous: formData.get("isAnonymous") === "on",
    };

    const validatedData = prayerSchema.parse(rawData);

    // Simulate database save with divine processing
    const prayerId = `prayer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    logger.divine("🙏 Prayer submitted", {
      prayerId,
      intention: validatedData.intention,
      isAnonymous: validatedData.isAnonymous,
      messageLength: validatedData.message.length,
    });

    // Revalidate relevant pages
    revalidatePath("/prayer-room");
    revalidatePath("/");

    return {
      success: true,
      message:
        "Your prayer has been received and will be lifted up for JAHmere's freedom.",
      prayerId,
    };
  } catch (error) {
    logger.error("Prayer submission failed", { error });

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Please check your prayer details",
        errors: error.errors,
      };
    }

    return {
      success: false,
      message: "Unable to submit prayer. Please try again.",
    };
  }
}

export async function submitCharacterLetter(formData: FormData) {
  try {
    const rawData = {
      authorName: formData.get("authorName"),
      relationship: formData.get("relationship"),
      content: formData.get("content"),
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    const validatedData = letterSchema.parse(rawData);

    // Simulate character letter processing
    const letterId = `letter_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    logger.divine("📝 Character letter submitted", {
      letterId,
      relationship: validatedData.relationship,
      contentLength: validatedData.content.length,
      hasContact: !!(validatedData.email || validatedData.phone),
    });

    // Revalidate character witness pages
    revalidatePath("/people/jahmere-webb");
    revalidatePath("/letter-portal");

    return {
      success: true,
      message:
        "Thank you! Your character letter has been submitted and will be included in JAHmere's court presentation.",
      letterId,
    };
  } catch (error) {
    logger.error("Character letter submission failed", { error });

    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: "Please review your letter details",
        errors: error.errors,
      };
    }

    return {
      success: false,
      message: "Unable to submit letter. Please try again.",
    };
  }
}

// July 28th Campaign Action with urgency tracking
export async function joinJuly28Campaign(formData: FormData) {
  try {
    const email = formData.get("email") as string;
    const role = formData.get("role") as string; // coach, judge, activist, prayer-warrior

    if (!email || !email.includes("@")) {
      return { success: false, message: "Valid email required" };
    }

    // Simulate campaign signup processing
    const campaignId = `campaign_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    logger.divine("🎯 July 28th Campaign signup", {
      campaignId,
      role,
      timestamp: new Date().toISOString(),
      daysUntilCourt: Math.ceil(
        (new Date("2025-07-28").getTime() - Date.now()) / (1000 * 60 * 60 * 24),
      ),
    });

    // Revalidate campaign pages
    revalidatePath("/july-28-strategy");
    revalidatePath("/");

    // Redirect based on role
    if (role === "judge") {
      redirect("/dashboard/judge");
    }

    return {
      success: true,
      message: `Welcome to the July 28th Freedom Campaign! Check your email for next steps.`,
      campaignId,
      role,
    };
  } catch (error) {
    logger.error("Campaign signup failed", { error });
    return {
      success: false,
      message: "Unable to join campaign. Please try again.",
    };
  }
}

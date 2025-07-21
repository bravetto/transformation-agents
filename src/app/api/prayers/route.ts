import { NextRequest } from "next/server";
import { z } from "zod";
import { createAPIHandler, rateLimits } from "@/lib/production/api-middleware";
import {
  PrayerService,
  AnalyticsService,
  checkDatabaseHealth,
} from "@/lib/database/prisma";
import { logger } from "@/lib/logger";

// Input validation schemas
const prayerRequestSchema = z.object({
  name: z.string().min(1).max(100).optional(),
  location: z.string().min(1).max(100).optional(),
  message: z.string().min(1).max(1000).optional(),
  intention: z
    .enum(["healing", "guidance", "protection", "freedom", "peace", "other"])
    .optional(),
  isAnonymous: z.boolean().default(false),
});

const prayerQuerySchema = z.object({
  limit: z
    .union([z.string().transform(Number), z.number()])
    .pipe(z.number().min(1).max(100))
    .default(10),
  offset: z
    .union([z.string().transform(Number), z.number()])
    .pipe(z.number().min(0))
    .default(0),
  intention: z
    .enum(["healing", "guidance", "protection", "freedom", "peace", "other"])
    .optional(),
});

interface PrayerResponse {
  id: string;
  status: "received" | "blessed" | "answered";
  message: string;
  timestamp: string;
  divineNumber: number;
  intention?: string;
}

// Helper functions for divine calculations
function getSpiritualImpact(intention: string): string {
  const impactMap: Record<string, string> = {
    FREEDOM: "miraculous",
    HEALING: "high",
    PROTECTION: "high",
    GUIDANCE: "medium",
    PEACE: "medium",
    OTHER: "low",
  };
  return impactMap[intention] || "low";
}

function calculateDivineAlignment(divineNumber: number): number {
  // Calculate alignment based on sacred numerology
  const sacred = [7, 28, 77, 777, 1337];
  if (sacred.includes(divineNumber)) return 100;
  if (divineNumber % 7 === 0) return 85;
  if (divineNumber % 3 === 0) return 70;
  return Math.min(50 + (divineNumber % 50), 95);
}

/**
 * 🌟 DIVINE NUMBER GENERATION
 * Sacred numerology for spiritual significance
 */
async function getNextDivineNumber(): Promise<number> {
  try {
    // Get current count and generate divine number
    const totalPrayers = await PrayerService.getTotalPrayerCount();

    // Sacred numbers for special significance
    const sacredNumbers = [7, 28, 77, 777, 1337];
    const nextNumber = totalPrayers + 1;

    // Check if we're hitting a sacred number
    if (sacredNumbers.includes(nextNumber)) {
      logger.divine("🌟 Sacred Divine Number Generated", {
        divineNumber: nextNumber,
        significance: "Sacred numerology alignment",
      });
    }

    return nextNumber;
  } catch (error) {
    // Fallback to timestamp-based number
    return Math.floor(Date.now() / 1000) % 10000;
  }
}

/**
 * 📿 DIVINE RESPONSE GENERATION
 * Personalized spiritual responses based on intention
 */
function getDivineResponse(divineNumber: number, intention: string): string {
  const intentionResponses: Record<string, string[]> = {
    FREEDOM: [
      `Prayer #${divineNumber} for JAHmere's freedom received! Divine justice accelerates - July 28th victory approaches!`,
      `Freedom warrior #${divineNumber} joins the battle! Chains of injustice crumble before our prayers!`,
      `Divine prayer #${divineNumber} for freedom heard! Angels of justice mobilize for July 28th liberation!`,
    ],
    HEALING: [
      `Healing prayer #${divineNumber} ascending! Divine restoration flows through every fiber of your being!`,
      `Prayer warrior #${divineNumber} calls for healing! Miraculous recovery manifests in perfect timing!`,
      `Divine healing activated through prayer #${divineNumber}! Body, mind, and spirit renewed completely!`,
    ],
    PROTECTION: [
      `Protection prayer #${divineNumber} received! Divine shields activate around you and your loved ones!`,
      `Guardian prayer #${divineNumber} answered! Angels of protection surround you with impenetrable light!`,
      `Prayer #${divineNumber} for protection heard! Divine fortress of faith established around you now!`,
    ],
    GUIDANCE: [
      `Guidance prayer #${divineNumber} received! Divine wisdom illuminates your path forward!`,
      `Prayer #${divineNumber} for direction heard! Angels of wisdom guide every step you take!`,
      `Divine guidance flows through prayer #${divineNumber}! Perfect clarity manifests in all decisions!`,
    ],
    PEACE: [
      `Peace prayer #${divineNumber} ascending! Divine serenity fills every corner of your heart!`,
      `Prayer #${divineNumber} for peace received! Heavenly calm settles over all your concerns!`,
      `Divine peace flows through prayer #${divineNumber}! All anxiety dissolves in God's presence!`,
    ],
    OTHER: [
      `Divine prayer #${divineNumber} received with love! God hears your heart's deepest desires!`,
      `Prayer warrior #${divineNumber} joins the divine network! Your requests ascend on wings of faith!`,
      `Sacred prayer #${divineNumber} acknowledged! Divine intervention activates for your needs!`,
    ],
  };

  const responses = intentionResponses[intention] || intentionResponses.OTHER;
  const selectedResponse =
    responses[Math.floor(Math.random() * responses.length)];

  // Add special messages for sacred numbers
  const sacredNumbers = [7, 28, 77, 777, 1337];
  if (sacredNumbers.includes(divineNumber)) {
    return `🌟 SACRED DIVINE NUMBER ${divineNumber}! ${selectedResponse} This prayer carries extraordinary spiritual power!`;
  }

  return selectedResponse;
}

/**
 * Submit a new prayer request
 * Rate limited to 10 submissions per 5 minutes per IP
 */
export const POST = createAPIHandler({
  method: "POST",
  schema: prayerRequestSchema,
  rateLimit: rateLimits.prayer,
  handler: async (input, req) => {
    try {
      // Get client information for analytics
      const ipAddress =
        req.headers.get("x-forwarded-for")?.split(",")[0] ||
        req.headers.get("x-real-ip") ||
        "unknown";
      const userAgent = req.headers.get("user-agent") || "unknown";

      // Generate divine number for spiritual significance
      const divineNumber = await getNextDivineNumber();

      // Create prayer record using database service
      const prayerRecord = await PrayerService.createPrayer({
        name: input.name,
        location: input.location,
        message: input.message,
        intention: (input.intention?.toUpperCase() as any) || "OTHER",
        isAnonymous: input.isAnonymous ?? false,
        divineNumber,
        ipAddress,
        userAgent,
        sessionId: req.headers.get("x-session-id") || undefined,
      });

      // Track analytics event
      await AnalyticsService.trackEvent({
        eventType: "PRAYER_SUBMITTED",
        userType: "DIVINE_WARRIOR",
        sessionId:
          req.headers.get("x-session-id") || `prayer_${prayerRecord.id}`,
        path: "/api/prayers",
        userAgent,
        metadata: {
          intention: prayerRecord.intention,
          isAnonymous: prayerRecord.isAnonymous,
          divineNumber: prayerRecord.divineNumber,
        },
        spiritualImpact: getSpiritualImpact(prayerRecord.intention),
        divineAlignment: calculateDivineAlignment(divineNumber),
      });

      // Generate divine response
      const response: PrayerResponse = {
        id: prayerRecord.id,
        status: "received",
        message: getDivineResponse(divineNumber, prayerRecord.intention),
        timestamp: prayerRecord.createdAt.toISOString(),
        divineNumber,
        intention: prayerRecord.intention.toLowerCase(),
      };

      return response;
    } catch (error) {
      logger.error("Prayer submission error:", error);
      throw new Error("Failed to process prayer request");
    }
  },
});

/**
 * Get prayer statistics and recent prayers
 * Standard rate limiting applies
 */
export const GET = createAPIHandler({
  method: "GET",
  schema: prayerQuerySchema,
  rateLimit: rateLimits.standard,
  handler: async (input) => {
    try {
      // Get data from database services
      const [totalPrayers, recentPrayers, stats] = await Promise.all([
        PrayerService.getTotalPrayerCount(),
        PrayerService.getRecentPrayers(
          typeof input.limit === "string"
            ? parseInt(input.limit, 10) || 10
            : (input.limit ?? 10),
          typeof input.offset === "string"
            ? parseInt(input.offset, 10) || 0
            : input.offset || 0,
          input.intention,
        ),
        PrayerService.getPrayerStatistics(),
      ]);

      return {
        success: true,
        data: {
          totalPrayers,
          recentPrayers,
          stats,
          lastUpdated: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      logger.error("Prayer data retrieval error:", error);
      throw new Error("Failed to retrieve prayer data");
    }
  },
});

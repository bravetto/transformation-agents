import { NextRequest } from "next/server";
import { z } from "zod";
import { createAPIHandler, rateLimits } from "@/lib/production/api-middleware";
import {
  createDatabase,
  defaultDatabaseConfig,
} from "@/lib/production/database-singleton";

// Initialize database connection
const db = createDatabase(defaultDatabaseConfig);

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

interface PrayerRecord {
  id: string;
  name?: string;
  location?: string;
  message?: string;
  intention?: string;
  isAnonymous: boolean;
  timestamp: string;
  ipAddress: string;
  userAgent: string;
  status: "received" | "blessed" | "answered";
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

      // Generate prayer ID and divine number
      const prayerId = `prayer_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const divineNumber = await getNextDivineNumber();

      // Create prayer record
      const prayerRecord: PrayerRecord = {
        id: prayerId,
        name: input.isAnonymous ? undefined : input.name,
        location: input.isAnonymous ? undefined : input.location,
        message: input.message,
        intention: input.intention || "other",
        isAnonymous: input.isAnonymous ?? false,
        timestamp: new Date().toISOString(),
        ipAddress,
        userAgent,
        status: "received",
      };

      // Store prayer in database
      await savePrayerToDatabase(prayerRecord);

      // Update prayer counter
      await updatePrayerCounter();

      // Generate divine response
      const response: PrayerResponse = {
        id: prayerId,
        status: "received",
        message: getDivineResponse(divineNumber, input.intention),
        timestamp: prayerRecord.timestamp,
        divineNumber,
        intention: input.intention,
      };

      // Track analytics event
      await trackPrayerEvent(prayerRecord);

      return response;
    } catch (error) {
      console.error("Prayer submission error:", error);
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
      // Get total prayer count
      const totalPrayers = await getTotalPrayerCount();

      // Get recent prayers (non-anonymous ones only)
      const recentPrayers = await getRecentPrayers(
        typeof input.limit === "string"
          ? parseInt(input.limit, 10) || 10
          : (input.limit ?? 10),
        typeof input.offset === "string"
          ? parseInt(input.offset, 10) || 0
          : input.offset || 0,
        input.intention,
      );

      // Get prayer statistics
      const stats = await getPrayerStatistics();

      return {
        totalPrayers,
        recentPrayers,
        statistics: stats,
        status: "active",
        lastUpdated: new Date().toISOString(),
        nextMilestone: getNextMilestone(totalPrayers),
        divineMessage: getDivineResponse(totalPrayers),
      };
    } catch (error) {
      console.error("Prayer retrieval error:", error);
      throw new Error("Failed to retrieve prayer data");
    }
  },
});

// Database operations with proper error handling and caching
async function savePrayerToDatabase(prayer: PrayerRecord): Promise<void> {
  const query = `
    INSERT INTO prayers (id, name, location, message, intention, is_anonymous, timestamp, ip_address, user_agent, status)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
  `;

  const params = [
    prayer.id,
    prayer.name,
    prayer.location,
    prayer.message,
    prayer.intention,
    prayer.isAnonymous,
    prayer.timestamp,
    prayer.ipAddress,
    prayer.userAgent,
    prayer.status,
  ];

  await db.executeQuery(query, params, { timeout: 5000 });
}

async function getTotalPrayerCount(): Promise<number> {
  const query = "SELECT COUNT(*) as count FROM prayers";
  const result = await db.executeQuery<{ count: number }[]>(query, [], {
    cache: true,
    cacheKey: "prayer_count",
    cacheTtl: 60000,
  });

  return parseInt(result[0]?.count?.toString() || "1337");
}

async function getRecentPrayers(
  limit: number,
  offset: number,
  intention?: string,
): Promise<PrayerRecord[]> {
  let query = `
    SELECT id, name, location, intention, timestamp, status
    FROM prayers
    WHERE is_anonymous = false
  `;

  const params: any[] = [];

  if (intention) {
    query += " AND intention = $1";
    params.push(intention);
    query += ` ORDER BY timestamp DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);
  } else {
    query += ` ORDER BY timestamp DESC LIMIT $1 OFFSET $2`;
    params.push(limit, offset);
  }

  return db.executeQuery<PrayerRecord[]>(query, params, {
    cache: true,
    cacheKey: `recent_prayers_${limit}_${offset}_${intention || "all"}`,
    cacheTtl: 30000,
  });
}

async function getPrayerStatistics(): Promise<any> {
  const query = `
    SELECT 
      intention,
      COUNT(*) as count,
      DATE_TRUNC('day', timestamp::timestamp) as day
    FROM prayers
    WHERE timestamp > NOW() - INTERVAL '30 days'
    GROUP BY intention, day
    ORDER BY day DESC
  `;

  return db.executeQuery(query, [], {
    cache: true,
    cacheKey: "prayer_statistics",
    cacheTtl: 300000, // 5 minutes
  });
}

async function getNextDivineNumber(): Promise<number> {
  const query =
    "SELECT COALESCE(MAX(divine_number), 1336) + 1 as next_number FROM prayers";
  const result = await db.executeQuery<{ next_number: number }[]>(query, []);
  return result[0]?.next_number || 1337;
}

async function updatePrayerCounter(): Promise<void> {
  // Update cached counter
  db.clearCache();

  // Could also update a separate counters table for better performance
  const query = `
    INSERT INTO prayer_counters (date, count) 
    VALUES (CURRENT_DATE, 1)
    ON CONFLICT (date) 
    DO UPDATE SET count = prayer_counters.count + 1
  `;

  await db.executeQuery(query, [], { timeout: 3000 });
}

async function trackPrayerEvent(prayer: PrayerRecord): Promise<void> {
  // Track prayer submission for analytics
  try {
    const eventData = {
      eventType: "prayer_submitted",
      timestamp: prayer.timestamp,
      metadata: {
        intention: prayer.intention,
        isAnonymous: prayer.isAnonymous,
        hasMessage: !!prayer.message,
        location: prayer.isAnonymous ? undefined : prayer.location,
      },
    };

    // This could be sent to an analytics service
    console.log("Prayer event tracked:", eventData);
  } catch (error) {
    // Don't fail prayer submission if analytics fails
    console.warn("Failed to track prayer event:", error);
  }
}

// Divine response generation with enhanced personalization
function getDivineResponse(count: number, intention?: string): string {
  const intentionResponses = {
    healing: [
      `Prayer #${count} for healing received - Divine restoration flows to you now!`,
      `${count} healing prayers ascending - Miracles manifest in perfect timing!`,
      `Divine healing activated for prayer #${count} - Your body, mind, and spirit are renewed!`,
    ],
    freedom: [
      `Prayer #${count} for freedom received - JAHmere's chains are breaking!`,
      `${count} freedom prayers unite - July 28th liberation draws near!`,
      `Prayer warrior #${count} joins the freedom battle - Victory is assured!`,
    ],
    guidance: [
      `Prayer #${count} for divine guidance received - Your path illuminates before you!`,
      `${count} seekers request wisdom - Divine direction flows to all!`,
      `Guidance prayer #${count} heard - Angels dispatch with perfect timing!`,
    ],
    protection: [
      `Prayer #${count} for protection activated - Divine shields surround you now!`,
      `${count} protection prayers create an impenetrable fortress of faith!`,
      `Guardian angels assigned to prayer #${count} - You are divinely covered!`,
    ],
    peace: [
      `Prayer #${count} for peace received - Serenity flows into every situation!`,
      `${count} peace prayers create ripples of harmony across the earth!`,
      `Divine peace settles upon prayer #${count} - All anxiety melts away!`,
    ],
  };

  const responses = intentionResponses[
    intention as keyof typeof intentionResponses
  ] || [
    `Prayer #${count} received - Divine intervention activated!`,
    `${count} prayers ascending - Heaven's attention focused on your need!`,
    `Prayer warrior #${count} enlisted - Miracles are manifesting now!`,
    `${count} voices crying out - The divine hears and responds!`,
    `Prayer #${count} recorded in Heaven - Your breakthrough approaches!`,
  ];

  return responses[count % responses.length];
}

function getNextMilestone(count: number): { number: number; message: string } {
  const milestones = [2000, 5000, 10000, 25000, 50000, 100000];
  const nextMilestone = milestones.find((m) => m > count) || count + 10000;

  return {
    number: nextMilestone,
    message: `${nextMilestone - count} prayers until next milestone!`,
  };
}

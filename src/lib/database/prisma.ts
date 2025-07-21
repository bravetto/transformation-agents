// 🛡️ PRODUCTION DATABASE CLIENT - Serverless Optimized
// Divine Database Connection for JAHmere Webb Freedom Portal

import { PrismaClient } from "@prisma/client";
import { logger } from "@/lib/logger";

/**
 * Production-grade Prisma client configuration for Vercel serverless functions
 * Implements connection pooling, error handling, and divine logging
 */

// Global variable to store the Prisma client instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

// 🌟 DIVINE DATABASE CONFIGURATION
const prismaConfig = {
  // Connection pooling optimized for serverless
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },

  // Logging configuration
  log:
    process.env.NODE_ENV === "development"
      ? (["query", "info", "warn", "error"] as const)
      : (["warn", "error"] as const),

  // Connection management for serverless environments
  ...(process.env.NODE_ENV === "production" && {
    // Optimize for Vercel serverless functions
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  }),
};

/**
 * Create or get existing Prisma client instance
 * Implements singleton pattern to prevent connection exhaustion in serverless
 */
export const prisma = globalForPrisma.prisma ?? new PrismaClient(prismaConfig);

// Store client globally in development to prevent re-instantiation
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * 🔄 DIVINE CONNECTION HEALTH CHECK
 * Validates database connectivity with spiritual logging
 */
export async function checkDatabaseHealth(): Promise<{
  status: "healthy" | "degraded" | "unhealthy";
  latency: number;
  message: string;
}> {
  const startTime = performance.now();

  try {
    // Test connection with simple query
    await prisma.$queryRaw`SELECT 1 as health_check`;

    const latency = Math.round((performance.now() - startTime) * 100) / 100;

    logger.divine("🛡️ Database Health Check", {
      status: "healthy",
      latency: `${latency}ms`,
      timestamp: new Date().toISOString(),
    });

    return {
      status: "healthy",
      latency,
      message: `Database connection healthy (${latency}ms)`,
    };
  } catch (error) {
    const latency = Math.round((performance.now() - startTime) * 100) / 100;

    logger.error("💥 Database Health Check Failed", {
      error: error instanceof Error ? error.message : "Unknown error",
      latency: `${latency}ms`,
      timestamp: new Date().toISOString(),
    });

    return {
      status: "unhealthy",
      latency,
      message: `Database connection failed: ${error instanceof Error ? error.message : "Unknown error"}`,
    };
  }
}

/**
 * 🙏 PRAYER DATABASE OPERATIONS
 * Production-ready prayer persistence with divine error handling
 */
export class PrayerService {
  /**
   * Submit a prayer to the divine database
   */
  static async createPrayer(data: {
    name?: string;
    location?: string;
    message?: string;
    intention:
      | "HEALING"
      | "GUIDANCE"
      | "PROTECTION"
      | "FREEDOM"
      | "PEACE"
      | "OTHER";
    isAnonymous: boolean;
    divineNumber: number;
    ipAddress: string;
    userAgent: string;
    sessionId?: string;
  }) {
    try {
      const prayer = await prisma.prayer.create({
        data: {
          name: data.isAnonymous ? null : data.name,
          location: data.isAnonymous ? null : data.location,
          message: data.message,
          intention: data.intention,
          isAnonymous: data.isAnonymous,
          divineNumber: data.divineNumber,
          status: "RECEIVED",
          ipAddress: data.ipAddress,
          userAgent: data.userAgent,
          sessionId: data.sessionId,
        },
      });

      logger.divine("🙏 Prayer Submitted to Divine Database", {
        prayerId: prayer.id,
        intention: prayer.intention,
        divineNumber: prayer.divineNumber,
        isAnonymous: prayer.isAnonymous,
      });

      return prayer;
    } catch (error) {
      logger.error("💥 Prayer Creation Failed", {
        error: error instanceof Error ? error.message : "Unknown error",
        intention: data.intention,
      });
      throw new Error("Failed to submit prayer to divine database");
    }
  }

  /**
   * Get total prayer count for the campaign
   */
  static async getTotalPrayerCount(): Promise<number> {
    try {
      const count = await prisma.prayer.count();

      // Add divine starting number (1337) for spiritual significance
      const totalCount = count + 1337;

      logger.debug("📊 Prayer Count Retrieved", {
        databaseCount: count,
        totalCount,
        divineBaseline: 1337,
      });

      return totalCount;
    } catch (error) {
      logger.error("💥 Prayer Count Retrieval Failed", {
        error: error instanceof Error ? error.message : "Unknown error",
      });

      // Fallback to divine baseline if database fails
      return 1337;
    }
  }

  /**
   * Get recent prayers for display
   */
  static async getRecentPrayers(
    limit: number = 10,
    offset: number = 0,
    intention?: string,
  ) {
    try {
      const prayers = await prisma.prayer.findMany({
        where: {
          isAnonymous: false, // Only show non-anonymous prayers
          ...(intention && {
            intention: intention as any,
          }),
        },
        orderBy: {
          createdAt: "desc",
        },
        skip: offset,
        take: limit,
        select: {
          id: true,
          name: true,
          location: true,
          intention: true,
          divineNumber: true,
          status: true,
          createdAt: true,
        },
      });

      logger.debug("📋 Recent Prayers Retrieved", {
        count: prayers.length,
        limit,
        offset,
        intention: intention || "all",
      });

      return prayers;
    } catch (error) {
      logger.error("💥 Recent Prayers Retrieval Failed", {
        error: error instanceof Error ? error.message : "Unknown error",
      });

      // Return empty array on failure
      return [];
    }
  }

  /**
   * Get prayer statistics for analytics
   */
  static async getPrayerStatistics() {
    try {
      const [totalCount, intentionStats, recentCount, answeredCount] =
        await Promise.all([
          prisma.prayer.count(),
          prisma.prayer.groupBy({
            by: ["intention"],
            _count: true,
          }),
          prisma.prayer.count({
            where: {
              createdAt: {
                gte: new Date(Date.now() - 24 * 60 * 60 * 1000), // Last 24 hours
              },
            },
          }),
          prisma.prayer.count({
            where: {
              status: "ANSWERED",
            },
          }),
        ]);

      const stats = {
        total: totalCount + 1337, // Add divine baseline
        byIntention: intentionStats.reduce(
          (acc, stat) => {
            acc[stat.intention] = stat._count;
            return acc;
          },
          {} as Record<string, number>,
        ),
        recent24h: recentCount,
        answered: answeredCount,
        answerRate: totalCount > 0 ? (answeredCount / totalCount) * 100 : 0,
      };

      logger.debug("📈 Prayer Statistics Generated", {
        total: stats.total,
        recent: stats.recent24h,
        answered: stats.answered,
        answerRate: `${stats.answerRate.toFixed(1)}%`,
      });

      return stats;
    } catch (error) {
      logger.error("💥 Prayer Statistics Generation Failed", {
        error: error instanceof Error ? error.message : "Unknown error",
      });

      // Return fallback statistics
      return {
        total: 1337,
        byIntention: {},
        recent24h: 0,
        answered: 0,
        answerRate: 0,
      };
    }
  }
}

/**
 * 📊 ANALYTICS DATABASE OPERATIONS
 * Production-ready analytics persistence
 */
export class AnalyticsService {
  /**
   * Track user journey event
   */
  static async trackEvent(data: {
    eventType: string;
    userType: string;
    sessionId: string;
    userId?: string;
    path?: string;
    userAgent?: string;
    referrer?: string;
    metadata?: any;
    responseTime?: number;
    loadTime?: number;
    divineAlignment?: number;
    spiritualImpact?: string;
  }) {
    try {
      const event = await prisma.analyticsEvent.create({
        data: {
          eventType: data.eventType as any,
          userType: data.userType as any,
          sessionId: data.sessionId,
          userId: data.userId,
          path: data.path,
          userAgent: data.userAgent,
          referrer: data.referrer,
          metadata: data.metadata,
          responseTime: data.responseTime,
          loadTime: data.loadTime,
          divineAlignment: data.divineAlignment,
          spiritualImpact: data.spiritualImpact,
        },
      });

      logger.analytics("📊 Analytics Event Tracked", {
        eventId: event.id,
        eventType: event.eventType,
        userType: event.userType,
        sessionId: event.sessionId,
      });

      return event;
    } catch (error) {
      logger.error("💥 Analytics Event Tracking Failed", {
        error: error instanceof Error ? error.message : "Unknown error",
        eventType: data.eventType,
      });

      // Don't throw error for analytics - fail silently
      return null;
    }
  }

  /**
   * Get session metrics for dashboard
   */
  static async getSessionMetrics(
    timeRange: "1h" | "24h" | "7d" | "30d" = "24h",
  ) {
    try {
      const timeThresholds = {
        "1h": new Date(Date.now() - 60 * 60 * 1000),
        "24h": new Date(Date.now() - 24 * 60 * 60 * 1000),
        "7d": new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        "30d": new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      };

      const since = timeThresholds[timeRange];

      const [totalSessions, pathSelection, avgResponseTime, userTypes] =
        await Promise.all([
          prisma.analyticsEvent
            .findMany({
              where: {
                timestamp: { gte: since },
              },
              distinct: ["sessionId"],
            })
            .then((sessions) => sessions.length),

          prisma.analyticsEvent.count({
            where: {
              eventType: "PATH_SELECTION",
              timestamp: { gte: since },
            },
          }),

          prisma.analyticsEvent.aggregate({
            where: {
              responseTime: { not: null },
              timestamp: { gte: since },
            },
            _avg: {
              responseTime: true,
            },
          }),

          prisma.analyticsEvent.groupBy({
            by: ["userType"],
            where: {
              timestamp: { gte: since },
            },
            _count: true,
          }),
        ]);

      const metrics = {
        totalSessions,
        pathSelection,
        avgResponseTime: avgResponseTime._avg.responseTime || 0,
        userTypeDistribution: userTypes.reduce(
          (acc, type) => {
            acc[type.userType] = type._count;
            return acc;
          },
          {} as Record<string, number>,
        ),
        conversionRate:
          totalSessions > 0 ? (pathSelection / totalSessions) * 100 : 0,
        timeRange,
      };

      logger.debug("📈 Session Metrics Generated", {
        totalSessions: metrics.totalSessions,
        pathSelection: metrics.pathSelection,
        avgResponseTime: `${metrics.avgResponseTime.toFixed(1)}ms`,
        conversionRate: `${metrics.conversionRate.toFixed(1)}%`,
        timeRange,
      });

      return metrics;
    } catch (error) {
      logger.error("💥 Session Metrics Generation Failed", {
        error: error instanceof Error ? error.message : "Unknown error",
        timeRange,
      });

      return {
        totalSessions: 0,
        pathSelection: 0,
        avgResponseTime: 0,
        userTypeDistribution: {},
        conversionRate: 0,
        timeRange,
      };
    }
  }
}

/**
 * 🧹 DATABASE CLEANUP & MAINTENANCE
 * Production housekeeping functions
 */
export class DatabaseMaintenance {
  /**
   * Clean up old analytics events (keep last 90 days)
   */
  static async cleanupOldAnalytics() {
    try {
      const cutoff = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);

      const deleted = await prisma.analyticsEvent.deleteMany({
        where: {
          timestamp: {
            lt: cutoff,
          },
        },
      });

      logger.info("🧹 Analytics Cleanup Complete", {
        deletedCount: deleted.count,
        cutoffDate: cutoff.toISOString(),
      });

      return deleted.count;
    } catch (error) {
      logger.error("💥 Analytics Cleanup Failed", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      return 0;
    }
  }

  /**
   * Database connection cleanup for serverless
   */
  static async disconnect() {
    try {
      await prisma.$disconnect();
      logger.debug("🔌 Database Connection Closed");
    } catch (error) {
      logger.error("💥 Database Disconnect Failed", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }
}

// Export singleton instance and services
export { prisma as db };
export { PrayerService, AnalyticsService, DatabaseMaintenance };

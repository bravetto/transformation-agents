/**
 * 🏆 PRODUCTION LOGGER SYSTEM
 * Enterprise-grade logging with structured data, performance tracking, and alerting
 */

import { cn } from "./utils";
import { getPerformanceMemory } from "./utils";

interface LogLevel {
  DEBUG: 0;
  INFO: 1;
  WARN: 2;
  ERROR: 3;
  CRITICAL: 4;
}

interface LogContext {
  userId?: string;
  sessionId?: string;
  requestId?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, any>;
  timestamp?: string;
  environment?: string;
  version?: string;
  // 🔄 BACKWARD COMPATIBILITY: Allow arbitrary properties
  userAgent?: string;
  method?: string;
  url?: string;
  ip?: string;
  pathType?: string;
  expected?: string;
  key?: string;
  listId?: string;
  backoffDelay?: number;
  retryCount?: number;
  maxRetries?: number;
  dataLength?: number;
  errorCode?: string;
  [key: string]: any; // Allow any additional properties for flexibility
}

interface PerformanceMetrics {
  duration?: number;
  memoryUsage?: number;
  cpuUsage?: number;
  responseSize?: number;
  statusCode?: number;
  endpoint?: string;
}

interface ErrorDetails {
  stack?: string;
  cause?: string;
  code?: string;
  statusCode?: number;
  userAgent?: string;
  url?: string;
  method?: string;
  headers?: Record<string, string>;
}

export class ProductionLogger {
  private static instance: ProductionLogger;
  private logLevel: keyof LogLevel;
  private isProduction: boolean;
  private logBuffer: Array<any> = [];
  private flushInterval?: NodeJS.Timeout;

  private readonly LOG_LEVELS: LogLevel = {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3,
    CRITICAL: 4,
  };

  private constructor() {
    // 🛡️ ENVIRONMENT-SAFE: Access environment variables safely
    this.logLevel = (process.env.LOG_LEVEL as keyof LogLevel) || "INFO";
    this.isProduction = process.env.NODE_ENV === "production";

    // 🛡️ SERVER-ONLY: Only setup buffered logging on server
    if (typeof window === "undefined") {
      this.setupBufferedLogging();
    }
  }

  static getInstance(): ProductionLogger {
    if (!ProductionLogger.instance) {
      ProductionLogger.instance = new ProductionLogger();
    }
    return ProductionLogger.instance;
  }

  private setupBufferedLogging() {
    if (this.isProduction) {
      // Buffer logs in production and flush periodically
      this.flushInterval = setInterval(() => {
        this.flushLogs();
      }, 5000); // Flush every 5 seconds
    }
  }

  private shouldLog(level: keyof LogLevel): boolean {
    return this.LOG_LEVELS[level] >= this.LOG_LEVELS[this.logLevel];
  }

  private createLogEntry(
    level: keyof LogLevel,
    message: string,
    context?: LogContext,
    error?: Error | ErrorDetails,
    performance?: PerformanceMetrics,
  ) {
    const timestamp = new Date().toISOString();
    const environment = process.env.NODE_ENV || "development";
    const version = process.env.APP_VERSION || "1.0.0";

    const logEntry = {
      timestamp,
      level,
      message,
      environment,
      version,
      ...(context && { context }),
      ...(error && {
        error:
          error instanceof Error
            ? {
                name: error.name,
                message: error.message,
                stack: error.stack,
                ...((error as any).cause && { cause: (error as any).cause }),
              }
            : error,
      }),
      ...(performance && { performance }),
      // Add helpful metadata - environment-aware
      metadata: {
        // 🛡️ SERVER-SIDE ONLY: Node.js APIs
        ...(typeof window === "undefined" && typeof process !== "undefined"
          ? {
              pid: process.pid,
              platform: process.platform,
              nodeVersion: process.version,
              memoryUsage: process.memoryUsage(),
            }
          : {}),

        // 🌐 CLIENT-SIDE SAFE: Browser APIs
        ...(typeof window !== "undefined"
          ? {
              userAgent: navigator.userAgent,
              viewport: `${window.innerWidth}x${window.innerHeight}`,
              timestamp: Date.now(),
              // Safe memory info from Performance API if available
              // 🛡️ CROSS-BROWSER SAFE: Use utility function for memory access
              ...(() => {
                const memoryInfo = getPerformanceMemory();
                return memoryInfo
                  ? {
                      heapUsed: memoryInfo.used,
                      heapTotal: memoryInfo.total,
                      heapLimit: memoryInfo.limit,
                    }
                  : {};
              })(),
            }
          : {}),

        // 🔧 UNIVERSAL: Safe metadata
        environment: typeof window === "undefined" ? "server" : "client",

        ...context?.metadata,
      },
    };

    return logEntry;
  }

  private formatForConsole(logEntry: any): string {
    const { timestamp, level, message, context, error, performance } = logEntry;
    const time = new Date(timestamp).toLocaleTimeString();

    let formatted = `[${time}] ${level.padEnd(8)} ${message}`;

    if (context?.component) {
      formatted += ` [${context.component}]`;
    }

    if (context?.action) {
      formatted += ` (${context.action})`;
    }

    if (performance?.duration) {
      formatted += ` ${performance.duration}ms`;
    }

    if (error) {
      formatted += `\n  Error: ${error.message || error}`;
      if (error.stack && !this.isProduction) {
        formatted += `\n${error.stack}`;
      }
    }

    return formatted;
  }

  private writeLog(logEntry: any) {
    if (this.isProduction) {
      // In production, buffer logs for external services
      this.logBuffer.push(logEntry);
    } else {
      // In development, log to console with colors
      const colored = this.addColors(
        this.formatForConsole(logEntry),
        logEntry.level,
      );
      console.log(colored);
    }
  }

  private addColors(message: string, level: keyof LogLevel): string {
    // 🛡️ SERVER-SAFE: Only apply colors in Node.js TTY environment
    if (
      typeof window !== "undefined" ||
      (typeof process !== "undefined" &&
        process.stdout &&
        !process.stdout.isTTY)
    ) {
      return message;
    }

    const colors = {
      DEBUG: "\x1b[36m", // Cyan
      INFO: "\x1b[32m", // Green
      WARN: "\x1b[33m", // Yellow
      ERROR: "\x1b[31m", // Red
      CRITICAL: "\x1b[35m", // Magenta
      reset: "\x1b[0m",
    };

    return `${colors[level] || ""}${message}${colors.reset}`;
  }

  // 🔧 UTILITY: Normalize context to LogContext format
  private normalizeContext(
    context?: LogContext | string | any,
  ): LogContext | undefined {
    if (!context) return undefined;

    if (typeof context === "string") {
      return { data: context };
    }

    if (typeof context === "object" && context !== null) {
      return context as LogContext;
    }

    return { data: String(context) };
  }

  private async flushLogs() {
    if (this.logBuffer.length === 0) return;

    const logsToFlush = [...this.logBuffer];
    this.logBuffer = [];

    try {
      // In a real application, you would send these to:
      // - Sentry, DataDog, LogDNA, CloudWatch, etc.

      if (process.env.SENTRY_DSN) {
        await this.sendToSentry(logsToFlush);
      }

      if (process.env.WEBHOOK_URL) {
        await this.sendToWebhook(logsToFlush);
      }

      // For now, just batch log to console in production
      logsToFlush.forEach((log) => {
        console.log(JSON.stringify(log));
      });
    } catch (error) {
      console.error("Failed to flush logs:", error);
      // Put logs back in buffer to retry
      this.logBuffer.unshift(...logsToFlush);
    }
  }

  private async sendToSentry(logs: any[]) {
    // Placeholder for Sentry integration
    // Implementation would use @sentry/node
  }

  private async sendToWebhook(logs: any[]) {
    try {
      const response = await fetch(process.env.WEBHOOK_URL!, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ logs }),
      });

      if (!response.ok) {
        throw new Error(`Webhook failed: ${response.status}`);
      }
    } catch (error) {
      console.error("Webhook logging failed:", error);
    }
  }

  // Public API
  debug(message: string, context?: LogContext | string | any) {
    if (!this.shouldLog("DEBUG")) return;

    const normalizedContext = this.normalizeContext(context);
    const logEntry = this.createLogEntry("DEBUG", message, normalizedContext);
    this.writeLog(logEntry);
  }

  info(
    message: string,
    context?: LogContext | string | any,
    performance?: PerformanceMetrics,
  ) {
    if (!this.shouldLog("INFO")) return;

    const normalizedContext = this.normalizeContext(context);
    const logEntry = this.createLogEntry(
      "INFO",
      message,
      normalizedContext,
      undefined,
      performance,
    );
    this.writeLog(logEntry);
  }

  warn(
    message: string,
    context?: LogContext | string | any,
    error?: Error | ErrorDetails | any,
  ) {
    if (!this.shouldLog("WARN")) return;

    const normalizedContext = this.normalizeContext(context);
    const logEntry = this.createLogEntry(
      "WARN",
      message,
      normalizedContext,
      error,
    );
    this.writeLog(logEntry);
  }

  error(
    message: string,
    error?: Error | ErrorDetails | any,
    context?: LogContext | string | any,
  ) {
    if (!this.shouldLog("ERROR")) return;

    const normalizedContext = this.normalizeContext(context);
    const logEntry = this.createLogEntry(
      "ERROR",
      message,
      normalizedContext,
      error,
    );
    this.writeLog(logEntry);

    // Immediate flush for errors
    if (this.isProduction) {
      this.flushLogs();
    }
  }

  critical(
    message: string,
    error?: Error | ErrorDetails | any,
    context?: LogContext | string | any,
  ) {
    // Critical logs always get logged regardless of level
    const normalizedContext = this.normalizeContext(context);
    const logEntry = this.createLogEntry(
      "CRITICAL",
      message,
      normalizedContext,
      error,
    );
    this.writeLog(logEntry);

    // Immediate flush and alert for critical errors
    if (this.isProduction) {
      this.flushLogs();
      this.sendAlert(logEntry);
    }
  }

  // API Performance Logging
  apiCall(
    method: string,
    endpoint: string,
    duration: number,
    statusCode: number,
    context?: LogContext,
  ) {
    const performance: PerformanceMetrics = {
      duration,
      statusCode,
      endpoint,
    };

    const level =
      statusCode >= 500 ? "ERROR" : statusCode >= 400 ? "WARN" : "INFO";
    const message = `${method} ${endpoint} ${statusCode} ${duration}ms`;

    this[level.toLowerCase() as "info" | "warn" | "error"](
      message,
      context,
      performance,
    );
  }

  // Component Performance Logging
  componentRender(
    component: string,
    duration: number,
    renderCount: number,
    context?: LogContext,
  ) {
    if (renderCount % 10 === 0 || duration > 16) {
      // Log every 10th render or slow renders
      this.info(
        `${component} rendered in ${duration}ms (render #${renderCount})`,
        {
          component,
          action: "render",
          ...context,
        },
        {
          duration,
        },
      );
    }
  }

  // Memory monitoring
  memoryUsage(component?: string, context?: LogContext) {
    const usage = process.memoryUsage();
    const used = Math.round((usage.heapUsed / 1024 / 1024) * 100) / 100;
    const total = Math.round((usage.heapTotal / 1024 / 1024) * 100) / 100;

    if (used > 100) {
      // Log if memory usage over 100MB
      this.warn(`High memory usage: ${used}MB used / ${total}MB total`, {
        component,
        action: "memory_check",
        ...context,
      });
    }
  }

  private async sendAlert(logEntry: any) {
    // In production, send alerts for critical errors
    // Could integrate with PagerDuty, Slack, SMS, etc.
    console.error("🚨 CRITICAL ALERT:", JSON.stringify(logEntry, null, 2));
  }

  // Cleanup method
  destroy() {
    if (this.flushInterval) {
      clearInterval(this.flushInterval);
    }
    this.flushLogs(); // Final flush
  }

  // 🔄 BACKWARD COMPATIBILITY: Legacy methods from old logger
  divine(message: string, data?: any, context?: LogContext) {
    // Map divine logs to info level with special formatting
    this.info(`✨ DIVINE: ${message}`, {
      component: "divine-system",
      action: "divine_event",
      ...context,
      metadata: {
        divineData: data,
        ...context?.metadata,
      },
    });
  }

  analytics(event: string, data?: any, context?: LogContext) {
    // Map analytics to info level with structured data
    this.info(`📊 ANALYTICS: ${event}`, {
      component: "analytics-system",
      action: "track_event",
      ...context,
      metadata: {
        event,
        eventData: data,
        ...context?.metadata,
      },
    });
  }

  journey(step: string, userType?: string, data?: any, context?: LogContext) {
    // Map journey tracking to info level
    this.info(`🛤️ JOURNEY: ${userType || "user"} → ${step}`, {
      component: "user-journey",
      action: "journey_step",
      ...context,
      metadata: {
        step,
        userType: userType || "user",
        journeyData: data,
        ...context?.metadata,
      },
    });
  }

  // Legacy time methods for backward compatibility
  time(label: string) {
    if (process.env.NODE_ENV === "development") {
      console.time(`⏱️ ${label}`);
    }
  }

  timeEnd(label: string) {
    if (process.env.NODE_ENV === "development") {
      console.timeEnd(`⏱️ ${label}`);
    }
  }
}

// Export singleton instance
export const logger = ProductionLogger.getInstance();

// Utility functions for common patterns
export const logApiCall = (
  method: string,
  endpoint: string,
  duration: number,
  statusCode: number,
  context?: LogContext,
) => {
  logger.apiCall(method, endpoint, duration, statusCode, context);
};

export const logError = (
  message: string,
  error: Error,
  context?: LogContext,
) => {
  logger.error(message, error, context);
};

export const logPerformance = (
  component: string,
  duration: number,
  context?: LogContext,
) => {
  if (duration > 16) {
    // Log slow operations
    logger.warn(
      `Slow operation: ${component} took ${duration}ms`,
      context,
      undefined,
    );
  }
};

// Helper for API error logging
export const createErrorContext = (req: any): LogContext => ({
  requestId: req.headers?.["x-request-id"],
  userAgent: req.headers?.["user-agent"],
  method: req.method,
  url: req.url,
  metadata: {
    ip: req.headers?.["x-forwarded-for"] || req.connection?.remoteAddress,
    referrer: req.headers?.referrer,
  },
});

// Graceful shutdown
if (typeof process !== "undefined") {
  process.on("SIGTERM", () => {
    logger.info("Received SIGTERM, flushing logs...");
    logger.destroy();
  });

  process.on("SIGINT", () => {
    logger.info("Received SIGINT, flushing logs...");
    logger.destroy();
  });
}

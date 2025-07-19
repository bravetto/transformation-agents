/**
 * 🔍 DIVINE LOGGING SYSTEM
 * Environment-aware logging for The Bridge Project
 *
 * Replaces scattered console.log statements with structured,
 * conditional logging that respects production environments.
 */

export type LogLevel = "debug" | "info" | "warn" | "error";

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: any;
  context?: string;
}

class DivineLogger {
  private isDevelopment = process.env.NODE_ENV === "development";
  private isTest = process.env.NODE_ENV === "test";
  private enabledLevels: LogLevel[] = this.isDevelopment
    ? ["debug", "info", "warn", "error"]
    : ["warn", "error"];

  private formatMessage(
    level: LogLevel,
    message: string,
    data?: any,
    context?: string,
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      context,
    };
  }

  private shouldLog(level: LogLevel): boolean {
    return this.enabledLevels.includes(level) && !this.isTest;
  }

  /**
   * Debug logging - only in development
   */
  debug(message: string, data?: any, context?: string) {
    if (this.shouldLog("debug")) {
      const entry = this.formatMessage("debug", message, data, context);
      console.log(`🔍 [DEBUG] ${entry.message}`, entry.data || "");
    }
  }

  /**
   * Info logging - development and staging
   */
  info(message: string, data?: any, context?: string) {
    if (this.shouldLog("info")) {
      const entry = this.formatMessage("info", message, data, context);
      console.log(`ℹ️ [INFO] ${entry.message}`, entry.data || "");
    }
  }

  /**
   * Warning logging - all environments
   */
  warn(message: string, data?: any, context?: string) {
    if (this.shouldLog("warn")) {
      const entry = this.formatMessage("warn", message, data, context);
      console.warn(`⚠️ [WARN] ${entry.message}`, entry.data || "");
    }
  }

  /**
   * Error logging - all environments
   */
  error(message: string, error?: any, context?: string) {
    if (this.shouldLog("error")) {
      const entry = this.formatMessage("error", message, error, context);
      console.error(`🚨 [ERROR] ${entry.message}`, entry.data || "");

      // In production, could send to error tracking service
      if (!this.isDevelopment && typeof window !== "undefined") {
        // Could integrate with Sentry, LogRocket, etc.
        // window.errorTracker?.captureException(error);
      }
    }
  }

  /**
   * Divine milestone logging - special events
   */
  divine(message: string, data?: any) {
    if (this.shouldLog("info")) {
      console.log(`✨ [DIVINE] ${message}`, data || "");
    }
  }

  /**
   * Performance timing
   */
  time(label: string) {
    if (this.isDevelopment) {
      console.time(`⏱️ ${label}`);
    }
  }

  timeEnd(label: string) {
    if (this.isDevelopment) {
      console.timeEnd(`⏱️ ${label}`);
    }
  }

  /**
   * Analytics event logging
   */
  analytics(event: string, data?: any) {
    if (this.shouldLog("info")) {
      console.log(`📊 [ANALYTICS] ${event}`, data || "");
    }

    // Could integrate with analytics service
    // analytics.track(event, data);
  }

  /**
   * User journey tracking
   */
  journey(step: string, userType?: string, data?: any) {
    if (this.shouldLog("info")) {
      console.log(`🛤️ [JOURNEY] ${userType || "user"} → ${step}`, data || "");
    }
  }
}

// Create singleton instance
export const logger = new DivineLogger();

// Convenience exports
export const {
  debug,
  info,
  warn,
  error,
  divine,
  time,
  timeEnd,
  analytics,
  journey,
} = logger;

// Default export
export default logger;

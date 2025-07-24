/**
 * 🛡️ PRODUCTION CONSOLE LOG SANITIZER
 * Removes all console logging from production builds to prevent information leakage
 */

import { logger } from "@/lib/logger";

// Store original console methods for development
const originalConsole = {
  log: console.log,
  error: console.error,
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};

// Production-safe console methods
export class ProductionConsole {
  private static isProduction = process.env.NODE_ENV === "production";

  static log(...args: any[]) {
    if (!ProductionConsole.isProduction) {
      originalConsole.log(...args);
    }
    // In production, optionally log to secure logger
    // logger.debug('Console Log', { args: JSON.stringify(args) });
  }

  static error(...args: any[]) {
    if (!ProductionConsole.isProduction) {
      originalConsole.error(...args);
    } else {
      // In production, log errors securely without exposing sensitive data
      logger.error(
        "Console Error",
        args[0] instanceof Error ? args[0] : new Error(String(args[0])),
      );
    }
  }

  static warn(...args: any[]) {
    if (!ProductionConsole.isProduction) {
      originalConsole.warn(...args);
    }
    // In production, warnings go to secure logger
    // logger.warn('Console Warning', { args: JSON.stringify(args) });
  }

  static info(...args: any[]) {
    if (!ProductionConsole.isProduction) {
      originalConsole.info(...args);
    }
    // Production info logs can be safely ignored or sent to analytics
  }

  static debug(...args: any[]) {
    if (!ProductionConsole.isProduction) {
      originalConsole.debug(...args);
    }
    // Debug logs never appear in production
  }
}

/**
 * 🔧 AUTOMATICALLY REPLACE CONSOLE METHODS IN PRODUCTION
 */
export function initializeProductionLogging() {
  if (typeof window !== "undefined" && process.env.NODE_ENV === "production") {
    // Replace console methods in production
    console.log = ProductionConsole.log;
    console.error = ProductionConsole.error;
    console.warn = ProductionConsole.warn;
    console.info = ProductionConsole.info;
    console.debug = ProductionConsole.debug;
  }
}

/**
 * 🧹 SANITIZE CONSOLE LOGS FROM API RESPONSES
 */
export function sanitizeApiLogs() {
  if (process.env.NODE_ENV === "production") {
    // Override console methods specifically for API routes
    const apiConsole = {
      log: () => {}, // Completely silent in production
      error: (error: any) => {
        // Only log actual errors, not sensitive data
        if (error instanceof Error) {
          logger.error("API Error", error);
        }
      },
      warn: () => {}, // Silent warnings in production APIs
      info: () => {}, // Silent info in production APIs
      debug: () => {}, // Silent debug in production APIs
    };

    // Apply to global console for API context
    Object.assign(console, apiConsole);
  }
}

// Development-only logging utilities
export const devLog = {
  log: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      originalConsole.log("🔧 DEV:", ...args);
    }
  },

  error: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      originalConsole.error("🚨 DEV ERROR:", ...args);
    }
  },

  analytics: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      originalConsole.log("📊 ANALYTICS:", ...args);
    }
  },

  divine: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      originalConsole.log("✨ DIVINE:", ...args);
    }
  },

  security: (...args: any[]) => {
    if (process.env.NODE_ENV === "development") {
      originalConsole.log("🛡️ SECURITY:", ...args);
    }
  },
};

// Export for manual initialization if needed
export { originalConsole };

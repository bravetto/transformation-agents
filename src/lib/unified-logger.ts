/**
 * UNIFIED LOGGER - Single Source of Truth
 * Replaces all console management systems with battle-tested logging
 */

type LogLevel = 'debug' | 'info' | 'warn' | 'error' | 'critical';

interface LogContext {
  component?: string;
  action?: string;
  userId?: string;
  metadata?: Record<string, any>;
}

class UnifiedLogger {
  private static instance: UnifiedLogger;
  private isDevelopment = process.env.NODE_ENV === 'development';
  private isTest = process.env.NODE_ENV === 'test';

  private constructor() {}

  static getInstance(): UnifiedLogger {
    if (!UnifiedLogger.instance) {
      UnifiedLogger.instance = new UnifiedLogger();
    }
    return UnifiedLogger.instance;
  }

  debug(message: string, context?: LogContext) {
    if (this.isDevelopment && !this.isTest) {
      console.debug(`[DEBUG] ${message}`, context || '');
    }
  }

  info(message: string, context?: LogContext) {
    if (this.isDevelopment && !this.isTest) {
      console.info(`[INFO] ${message}`, context || '');
    }
  }

  warn(message: string, context?: LogContext) {
    if (this.isDevelopment || this.isCritical(message)) {
      console.warn(`[WARN] ${message}`, context || '');
    }
  }

  error(message: string, context?: LogContext) {
    // Always log errors, but filter noise in production
    if (this.isDevelopment || this.isCritical(message)) {
      console.error(`[ERROR] ${message}`, context || '');
    }
  }

  critical(message: string, context?: LogContext) {
    // Critical errors always logged
    console.error(`[CRITICAL] ${message}`, context || '');
  }

  private isCritical(message: string): boolean {
    const criticalPatterns = [
      'network error',
      'api failure',
      'auth error',
      'database error',
      'payment error',
      'security violation'
    ];
    
    return criticalPatterns.some(pattern => 
      message.toLowerCase().includes(pattern)
    );
  }
}

// Export singleton instance
export const logger = UnifiedLogger.getInstance();
export default logger; 
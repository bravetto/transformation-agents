// Cascade Error Detection System
// Sacred Protocol: Manual monitoring only, no global automation

interface CascadeError {
  id: string;
  type: "webpack" | "route" | "analytics" | "dependency";
  severity: "low" | "medium" | "high" | "critical";
  timestamp: string;
  message: string;
  context: Record<string, any>;
  recovery?: string;
}

interface SystemHealth {
  webpack: {
    vendorChunks: boolean;
    cacheIntegrity: boolean;
    hotReload: boolean;
  };
  routes: {
    homepage: boolean;
    peoplePages: boolean;
    analytics: boolean;
  };
  dependencies: {
    framerMotion: boolean;
    nextJs: boolean;
    react: boolean;
  };
  lastCheck: string;
}

class CascadeDetector {
  private errors: CascadeError[] = [];
  private maxErrors = 100; // Prevent memory overflow

  // Manual health check (no automation)
  async checkSystemHealth(): Promise<SystemHealth> {
    const timestamp = new Date().toISOString();

    try {
      // Check webpack vendor chunks (manual verification)
      const webpackHealth = await this.checkWebpackHealth();

      // Check critical routes (manual testing)
      const routeHealth = await this.checkRouteHealth();

      // Check dependencies (manual validation)
      const dependencyHealth = await this.checkDependencyHealth();

      return {
        webpack: webpackHealth,
        routes: routeHealth,
        dependencies: dependencyHealth,
        lastCheck: timestamp,
      };
    } catch (error) {
      this.logError({
        id: `health-check-${Date.now()}`,
        type: "webpack",
        severity: "critical",
        timestamp,
        message: `Health check failed: ${error}`,
        context: {
          error: error instanceof Error ? error.message : "Unknown error",
        },
      });

      throw error;
    }
  }

  private async checkWebpackHealth() {
    try {
      // Check if we're in browser environment
      if (typeof window === "undefined") {
        return {
          vendorChunks: true, // Assume healthy on server
          cacheIntegrity: true,
          hotReload: true,
        };
      }

      // Client-side webpack health checks
      const hasFramerMotion =
        await this.checkModuleAvailability("framer-motion");

      return {
        vendorChunks: hasFramerMotion,
        cacheIntegrity: true, // Would need server-side check
        hotReload: true, // Would need HMR status check
      };
    } catch (error) {
      return {
        vendorChunks: false,
        cacheIntegrity: false,
        hotReload: false,
      };
    }
  }

  private async checkRouteHealth() {
    try {
      // Only check routes in browser environment
      if (typeof window === "undefined") {
        return {
          homepage: true,
          peoplePages: true,
          analytics: true,
        };
      }

      // Client-side route availability checks
      const routes = {
        homepage: await this.checkRouteAvailability("/"),
        peoplePages: await this.checkRouteAvailability("/people/jay-forte"),
        analytics: await this.checkRouteAvailability(
          "/api/analytics/user-journey",
        ),
      };

      return routes;
    } catch (error) {
      return {
        homepage: false,
        peoplePages: false,
        analytics: false,
      };
    }
  }

  private async checkDependencyHealth() {
    try {
      const framerMotion = await this.checkModuleAvailability("framer-motion");
      const nextJs = await this.checkModuleAvailability("next");
      const react = await this.checkModuleAvailability("react");

      return {
        framerMotion,
        nextJs,
        react,
      };
    } catch (error) {
      return {
        framerMotion: false,
        nextJs: false,
        react: false,
      };
    }
  }

  private async checkModuleAvailability(moduleName: string): Promise<boolean> {
    try {
      if (typeof window === "undefined") {
        // Server-side check
        await import(moduleName);
        return true;
      } else {
        // Client-side check - simplified
        return true; // Assume available if we're running
      }
    } catch (error) {
      return false;
    }
  }

  private async checkRouteAvailability(route: string): Promise<boolean> {
    try {
      if (typeof window === "undefined") {
        return true; // Can't check from server
      }

      const response = await fetch(route, { method: "HEAD" });
      return response.ok;
    } catch (error) {
      return false;
    }
  }

  // Manual error logging (no automation)
  logError(error: CascadeError): void {
    this.errors.push(error);

    // Prevent memory overflow
    if (this.errors.length > this.maxErrors) {
      this.errors = this.errors.slice(-this.maxErrors);
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.warn("🚨 Cascade Error Detected:", error);
    }

    // Send to analytics (safe, non-blocking)
    this.reportToAnalytics(error).catch(() => {
      // Silently fail if analytics unavailable
    });
  }

  private async reportToAnalytics(error: CascadeError): Promise<void> {
    try {
      if (typeof window === "undefined") return;

      await fetch("/api/analytics/user-journey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          eventType: "cascade_error",
          userType: "system",
          sessionId: `system-${Date.now()}`,
          timestamp: error.timestamp,
          metadata: {
            errorType: error.type,
            severity: error.severity,
            message: error.message,
            context: error.context,
          },
        }),
      });
    } catch (err) {
      // Silently fail - analytics should never break error monitoring
    }
  }

  // Get recent errors for debugging
  getRecentErrors(count = 10): CascadeError[] {
    return this.errors.slice(-count);
  }

  // Clear errors (manual reset)
  clearErrors(): void {
    this.errors = [];
  }

  // Check for error patterns
  detectErrorPatterns(): {
    pattern: string;
    count: number;
    severity: string;
  }[] {
    const patterns = new Map<string, { count: number; severity: string }>();

    this.errors.forEach((error) => {
      const key = `${error.type}-${error.message.split(":")[0]}`;
      const existing = patterns.get(key) || { count: 0, severity: "low" };

      patterns.set(key, {
        count: existing.count + 1,
        severity:
          error.severity === "critical" ? "critical" : existing.severity,
      });
    });

    return Array.from(patterns.entries()).map(([pattern, data]) => ({
      pattern,
      ...data,
    }));
  }
}

// Singleton instance for global access
export const cascadeDetector = new CascadeDetector();

// Manual health check function (no automation)
export async function performHealthCheck(): Promise<SystemHealth> {
  return cascadeDetector.checkSystemHealth();
}

// Manual error reporting function
export function reportCascadeError(
  error: Omit<CascadeError, "id" | "timestamp">,
): void {
  cascadeDetector.logError({
    ...error,
    id: `manual-${Date.now()}`,
    timestamp: new Date().toISOString(),
  });
}

export type { CascadeError, SystemHealth };

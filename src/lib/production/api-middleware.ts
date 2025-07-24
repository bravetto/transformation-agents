/**
 * Production API Middleware Stack
 * Includes rate limiting, validation, error handling, and security
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logger } from "@/lib/logger";

// Rate limiting storage (use Redis in production)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

interface RateLimitConfig {
  windowMs: number;
  maxRequests: number;
  message?: string;
  skipSuccessfulRequests?: boolean;
}

interface SecurityHeaders {
  [key: string]: string;
}

interface APIError {
  code: string;
  message: string;
  details?: any;
  statusCode: number;
}

// Custom error types for better error handling
export class ValidationError extends Error {
  constructor(
    public details: any,
    public statusCode = 400,
  ) {
    super("Validation failed");
    this.name = "ValidationError";
  }
}

export class RateLimitError extends Error {
  constructor(public retryAfter: number) {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
  }
}

export class AuthenticationError extends Error {
  constructor(message = "Authentication required") {
    super(message);
    this.name = "AuthenticationError";
  }
}

/**
 * Rate Limiting Middleware
 */
export function createRateLimit(config: RateLimitConfig) {
  return (req: NextRequest): NextResponse | null => {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0] ||
      req.headers.get("x-real-ip") ||
      "unknown";
    const key = `rate_limit:${ip}`;
    const now = Date.now();

    // Clean up expired entries
    const cleanup = () => {
      for (const [k, v] of rateLimitStore.entries()) {
        if (now > v.resetTime) {
          rateLimitStore.delete(k);
        }
      }
    };

    cleanup();

    const current = rateLimitStore.get(key);

    if (!current) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      });
      return null; // Allow request
    }

    if (now > current.resetTime) {
      rateLimitStore.set(key, {
        count: 1,
        resetTime: now + config.windowMs,
      });
      return null; // Allow request
    }

    if (current.count >= config.maxRequests) {
      const retryAfter = Math.ceil((current.resetTime - now) / 1000);

      logger.warn("Rate limit exceeded", {
        ip,
        count: current.count,
        retryAfter,
      });

      return NextResponse.json(
        {
          error: "Rate limit exceeded",
          message: config.message || "Too many requests",
          retryAfter,
        },
        {
          status: 429,
          headers: {
            "Retry-After": retryAfter.toString(),
            "X-RateLimit-Limit": config.maxRequests.toString(),
            "X-RateLimit-Remaining": "0",
            "X-RateLimit-Reset": Math.ceil(current.resetTime / 1000).toString(),
          },
        },
      );
    }

    // Increment counter
    current.count++;

    return null; // Allow request
  };
}

/**
 * Security Headers Middleware
 */
export function addSecurityHeaders(): SecurityHeaders {
  return {
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "X-XSS-Protection": "1; mode=block",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "Permissions-Policy": "geolocation=(), microphone=(), camera=()",
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
    "Content-Security-Policy":
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-ancestors 'none';",
  };
}

/**
 * Input Validation Middleware
 */
export function createValidator<T>(schema: z.ZodSchema<T>) {
  return async (req: NextRequest): Promise<T> => {
    try {
      let data: any;

      if (req.method === "GET") {
        const searchParams = Object.fromEntries(req.nextUrl.searchParams);
        data = searchParams;
      } else {
        const contentType = req.headers.get("content-type");

        if (contentType?.includes("application/json")) {
          data = await req.json();
        } else if (contentType?.includes("application/x-www-form-urlencoded")) {
          const formData = await req.formData();
          data = Object.fromEntries(formData);
        } else {
          throw new ValidationError("Unsupported content type");
        }
      }

      return schema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new ValidationError(error.errors);
      }
      throw error;
    }
  };
}

/**
 * Error Response Formatter
 */
export function formatErrorResponse(error: any): NextResponse {
  let statusCode = 500;
  let errorCode = "INTERNAL_ERROR";
  let message = "Internal server error";
  let details = undefined;

  if (error instanceof ValidationError) {
    statusCode = error.statusCode;
    errorCode = "VALIDATION_ERROR";
    message = error.message;
    details = error.details;
  } else if (error instanceof RateLimitError) {
    statusCode = 429;
    errorCode = "RATE_LIMIT_ERROR";
    message = error.message;
  } else if (error instanceof AuthenticationError) {
    statusCode = 401;
    errorCode = "AUTHENTICATION_ERROR";
    message = error.message;
  } else if (error?.name === "AbortError") {
    statusCode = 408;
    errorCode = "TIMEOUT_ERROR";
    message = "Request timeout";
  }

  // Log error for monitoring
  logger.error("API Error", error, {
    component: "api-middleware",
    action: "error_handling",
    errorCode,
    message,
    details,
    stack: error?.stack,
  });

  const response = NextResponse.json(
    {
      success: false,
      error: {
        code: errorCode,
        message,
        ...(details && { details }),
        timestamp: new Date().toISOString(),
      },
    },
    { status: statusCode },
  );

  // Add security headers
  const securityHeaders = addSecurityHeaders();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

/**
 * Success Response Formatter
 */
export function formatSuccessResponse<T>(
  data: T,
  meta?: {
    message?: string;
    pagination?: {
      page: number;
      limit: number;
      total: number;
      pages: number;
    };
    timing?: {
      requestId: string;
      duration: number;
    };
  },
): NextResponse {
  const response = NextResponse.json({
    success: true,
    data,
    ...(meta && {
      meta: {
        ...meta,
        timestamp: new Date().toISOString(),
      },
    }),
  });

  // Add security headers
  const securityHeaders = addSecurityHeaders();
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // Add cache headers for GET requests
  response.headers.set(
    "Cache-Control",
    "public, max-age=60, s-maxage=300, stale-while-revalidate=60",
  );

  return response;
}

/**
 * Request ID Middleware
 */
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Performance Monitoring Middleware
 */
export class PerformanceMonitor {
  private startTime: number;
  private requestId: string;

  constructor() {
    this.startTime = performance.now();
    this.requestId = generateRequestId();
  }

  getMetrics() {
    const duration = performance.now() - this.startTime;
    return {
      requestId: this.requestId,
      duration: Math.round(duration * 100) / 100, // Round to 2 decimal places
    };
  }

  logSlowRequest(threshold = 1000) {
    const metrics = this.getMetrics();
    if (metrics.duration > threshold) {
      logger.warn("Slow API request detected", metrics);
    }
  }
}

/**
 * Complete API Handler Wrapper
 */
export function createAPIHandler<TInput, TOutput>(config: {
  method: string | string[];
  schema?: z.ZodSchema<TInput>;
  rateLimit?: RateLimitConfig;
  requireAuth?: boolean;
  handler: (input: TInput, req: NextRequest) => Promise<TOutput>;
}) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const monitor = new PerformanceMonitor();

    try {
      // Method validation
      const allowedMethods = Array.isArray(config.method)
        ? config.method
        : [config.method];
      if (!allowedMethods.includes(req.method || "")) {
        return NextResponse.json(
          { error: "Method not allowed" },
          { status: 405 },
        );
      }

      // Rate limiting
      if (config.rateLimit) {
        const rateLimitResult = createRateLimit(config.rateLimit)(req);
        if (rateLimitResult) {
          return rateLimitResult;
        }
      }

      // Authentication (placeholder - implement based on your auth system)
      if (config.requireAuth) {
        const authHeader = req.headers.get("authorization");
        if (!authHeader?.startsWith("Bearer ")) {
          throw new AuthenticationError();
        }
        // Add your JWT validation logic here
      }

      // Input validation
      let validatedInput: TInput;
      if (config.schema) {
        const validator = createValidator(config.schema);
        validatedInput = await validator(req);
      } else {
        validatedInput = {} as TInput;
      }

      // Execute handler
      const result = await config.handler(validatedInput, req);

      // Log performance
      monitor.logSlowRequest();

      // Return success response
      return formatSuccessResponse(result, {
        timing: monitor.getMetrics(),
      });
    } catch (error) {
      monitor.logSlowRequest(500); // Log even faster for errors
      return formatErrorResponse(error);
    }
  };
}

// Common rate limit configurations
export const rateLimits = {
  strict: { windowMs: 60000, maxRequests: 10 }, // 10 requests per minute
  standard: { windowMs: 60000, maxRequests: 100 }, // 100 requests per minute
  relaxed: { windowMs: 60000, maxRequests: 500 }, // 500 requests per minute
  prayer: { windowMs: 300000, maxRequests: 10 }, // 10 prayer submissions per 5 minutes
  analytics: { windowMs: 60000, maxRequests: 30 }, // 30 analytics events per minute
};

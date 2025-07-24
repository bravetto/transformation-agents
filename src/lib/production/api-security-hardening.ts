/**
 * 🛡️ PRODUCTION API SECURITY HARDENING SYSTEM
 * Comprehensive security layer for JAHmere Bridge Freedom Portal
 * Implements zero-trust security architecture with defense in depth
 */

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { logger } from "@/lib/logger";
import { DivineInputSanitizer } from "@/lib/security/input-sanitizer";
import {
  createRateLimit,
  addSecurityHeaders,
  formatErrorResponse,
} from "./api-middleware";

// Security configuration constants
const SECURITY_CONFIG = {
  MAX_REQUEST_SIZE: 10 * 1024 * 1024, // 10MB
  MAX_JSON_DEPTH: 10,
  MAX_ARRAY_LENGTH: 1000,
  SUSPICIOUS_PATTERNS: [
    /(<script[^>]*>.*?<\/script>)/gi,
    /(javascript:|data:|vbscript:)/gi,
    /(\bon\w+\s*=)/gi,
    /(union\s+(all\s+)?select)/gi,
    /((\%27)|(\'))\s*((\%6F)|o|(\%4F))((\%72)|r|(\%52))/gi,
  ],
  RATE_LIMITS: {
    PUBLIC: { windowMs: 60000, maxRequests: 100 }, // 100/min
    AUTHENTICATED: { windowMs: 60000, maxRequests: 200 }, // 200/min
    SENSITIVE: { windowMs: 300000, maxRequests: 10 }, // 10/5min
    ANALYTICS: { windowMs: 60000, maxRequests: 50 }, // 50/min
    HEALTH: { windowMs: 60000, maxRequests: 30 }, // 30/min
  },
};

// Input validation schemas for all endpoints
export const API_SCHEMAS = {
  analytics: z.object({
    eventType: z
      .string()
      .max(100)
      .regex(/^[a-zA-Z0-9_-]+$/),
    userType: z.string().max(50).optional(),
    sessionId: z.string().max(100).optional(),
    timestamp: z.string().datetime().optional(),
    metadata: z.record(z.any()).optional(),
  }),

  socialShare: z.object({
    platform: z.enum(["twitter", "facebook", "instagram", "linkedin"]),
    contentType: z.enum(["profile", "letter", "testimony", "prayer"]),
    contentId: z.string().max(100),
    sessionId: z.string().max(100).optional(),
  }),

  performance: z.object({
    url: z.string().url().max(500),
    timestamp: z.number().positive(),
    lcp: z.number().positive().optional(),
    fcp: z.number().positive().optional(),
    cls: z.number().min(0).max(1).optional(),
    deviceType: z.enum(["mobile", "tablet", "desktop"]).optional(),
  }),

  testimony: z.object({
    name: z.string().min(1).max(100),
    role: z.string().min(1).max(100),
    message: z.string().min(10).max(2000),
    contact: z.string().email().optional(),
  }),

  divineEvent: z.object({
    eventType: z.string().max(100),
    spiritualImpact: z.enum(["minor", "significant", "miraculous"]),
    userType: z.literal("divine-warrior"),
    metadata: z.record(z.any()).optional(),
  }),
};

export class APISecurityHardening {
  private static instance: APISecurityHardening;
  private sanitizer: DivineInputSanitizer;
  private securityMetrics: {
    blockedRequests: number;
    suspiciousActivity: number;
    validationErrors: number;
  };

  private constructor() {
    this.sanitizer = DivineInputSanitizer.getInstance();
    this.securityMetrics = {
      blockedRequests: 0,
      suspiciousActivity: 0,
      validationErrors: 0,
    };
  }

  public static getInstance(): APISecurityHardening {
    if (!APISecurityHardening.instance) {
      APISecurityHardening.instance = new APISecurityHardening();
    }
    return APISecurityHardening.instance;
  }

  /**
   * 🛡️ COMPREHENSIVE REQUEST SECURITY VALIDATION
   */
  public async validateRequest(
    request: NextRequest,
    options: {
      schema?: z.ZodSchema<any>;
      rateLimitType?: keyof typeof SECURITY_CONFIG.RATE_LIMITS;
      requireAuth?: boolean;
      allowedMethods?: string[];
    } = {},
  ): Promise<{
    isValid: boolean;
    data?: any;
    error?: {
      code: string;
      message: string;
      statusCode: number;
    };
  }> {
    try {
      // 1. Method validation
      const method = request.method;
      const allowedMethods = options.allowedMethods || [
        "GET",
        "POST",
        "PUT",
        "DELETE",
      ];

      if (!allowedMethods.includes(method)) {
        return {
          isValid: false,
          error: {
            code: "METHOD_NOT_ALLOWED",
            message: "HTTP method not allowed",
            statusCode: 405,
          },
        };
      }

      // 2. Rate limiting
      const rateLimitType = options.rateLimitType || "PUBLIC";
      const rateLimitConfig = SECURITY_CONFIG.RATE_LIMITS[rateLimitType];
      const rateLimitResult = createRateLimit(rateLimitConfig)(request);

      if (rateLimitResult) {
        this.securityMetrics.blockedRequests++;
        return {
          isValid: false,
          error: {
            code: "RATE_LIMIT_EXCEEDED",
            message: "Rate limit exceeded",
            statusCode: 429,
          },
        };
      }

      // 3. Request size validation
      const contentLength = request.headers.get("content-length");
      if (
        contentLength &&
        parseInt(contentLength) > SECURITY_CONFIG.MAX_REQUEST_SIZE
      ) {
        return {
          isValid: false,
          error: {
            code: "REQUEST_TOO_LARGE",
            message: "Request payload too large",
            statusCode: 413,
          },
        };
      }

      // 4. Content type validation for non-GET requests
      if (method !== "GET") {
        const contentType = request.headers.get("content-type");
        if (
          !contentType ||
          (!contentType.includes("application/json") &&
            !contentType.includes("application/x-www-form-urlencoded") &&
            !contentType.includes("multipart/form-data"))
        ) {
          return {
            isValid: false,
            error: {
              code: "INVALID_CONTENT_TYPE",
              message: "Invalid or missing content type",
              statusCode: 400,
            },
          };
        }
      }

      // 5. Input validation and sanitization
      let validatedData: any = {};

      if (options.schema) {
        const rawData = await this.extractRequestData(request);
        const sanitizedData = await this.sanitizeInput(rawData);

        try {
          validatedData = options.schema.parse(sanitizedData);
        } catch (error) {
          this.securityMetrics.validationErrors++;

          if (error instanceof z.ZodError) {
            return {
              isValid: false,
              error: {
                code: "VALIDATION_ERROR",
                message: "Invalid input data",
                statusCode: 400,
              },
            };
          }

          throw error;
        }
      }

      // 6. Suspicious activity detection
      const suspiciousScore = await this.calculateSuspiciousScore(
        request,
        validatedData,
      );
      if (suspiciousScore > 0.8) {
        this.securityMetrics.suspiciousActivity++;

        // Log but don't block (for now)
        logger.warn("🚨 Suspicious activity detected", {
          ip: this.getClientIP(request),
          userAgent: request.headers.get("user-agent"),
          score: suspiciousScore,
          endpoint: request.nextUrl.pathname,
        });
      }

      return {
        isValid: true,
        data: validatedData,
      };
    } catch (error) {
      logger.error("Security validation error", error);
      return {
        isValid: false,
        error: {
          code: "SECURITY_ERROR",
          message: "Security validation failed",
          statusCode: 500,
        },
      };
    }
  }

  /**
   * 🧹 SANITIZE INPUT DATA
   */
  private async sanitizeInput(data: any): Promise<any> {
    if (typeof data === "string") {
      const result = this.sanitizer.sanitize(data, {
        maxLength: 10000,
        stripTags: true,
        allowHtml: false,
      });

      if (!result.isValid) {
        throw new Error(
          `Input sanitization failed: ${result.errors.join(", ")}`,
        );
      }

      return result.sanitized;
    }

    if (Array.isArray(data)) {
      if (data.length > SECURITY_CONFIG.MAX_ARRAY_LENGTH) {
        throw new Error("Array too large");
      }

      return Promise.all(data.map((item) => this.sanitizeInput(item)));
    }

    if (typeof data === "object" && data !== null) {
      const sanitized: any = {};
      let depth = 0;

      const sanitizeObject = async (
        obj: any,
        currentDepth: number,
      ): Promise<any> => {
        if (currentDepth > SECURITY_CONFIG.MAX_JSON_DEPTH) {
          throw new Error("Object nesting too deep");
        }

        const result: any = {};
        for (const [key, value] of Object.entries(obj)) {
          const sanitizedKey = await this.sanitizeInput(key);
          result[sanitizedKey] = await this.sanitizeInput(value);
        }
        return result;
      };

      return sanitizeObject(data, 0);
    }

    return data;
  }

  /**
   * 🔍 CALCULATE SUSPICIOUS ACTIVITY SCORE
   */
  private async calculateSuspiciousScore(
    request: NextRequest,
    data: any,
  ): Promise<number> {
    let score = 0;

    // Check for suspicious patterns in data
    const dataString = JSON.stringify(data);
    for (const pattern of SECURITY_CONFIG.SUSPICIOUS_PATTERNS) {
      if (pattern.test(dataString)) {
        score += 0.3;
      }
    }

    // Check user agent
    const userAgent = request.headers.get("user-agent") || "";
    if (!userAgent || userAgent.length < 10) {
      score += 0.2;
    }

    // Check for rapid requests from same IP
    const ip = this.getClientIP(request);
    // Implementation would check recent request history

    // Check for unusual request patterns
    const referer = request.headers.get("referer");
    if (!referer && request.method === "POST") {
      score += 0.1;
    }

    return Math.min(score, 1.0);
  }

  /**
   * 📤 EXTRACT REQUEST DATA SAFELY
   */
  private async extractRequestData(request: NextRequest): Promise<any> {
    const method = request.method;

    if (method === "GET") {
      const params = Object.fromEntries(request.nextUrl.searchParams);
      return params;
    }

    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      try {
        return await request.json();
      } catch (error) {
        throw new Error("Invalid JSON payload");
      }
    }

    if (contentType.includes("application/x-www-form-urlencoded")) {
      const formData = await request.formData();
      return Object.fromEntries(formData);
    }

    return {};
  }

  /**
   * 🌐 GET CLIENT IP SAFELY
   */
  public getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get("x-forwarded-for");
    const realIP = request.headers.get("x-real-ip");
    const cfIP = request.headers.get("cf-connecting-ip");

    if (forwarded) {
      return forwarded.split(",")[0].trim();
    }

    if (realIP) {
      return realIP;
    }

    if (cfIP) {
      return cfIP;
    }

    return "unknown";
  }

  /**
   * 📊 GET SECURITY METRICS
   */
  public getSecurityMetrics() {
    return { ...this.securityMetrics };
  }

  /**
   * 🚨 SANITIZE ERROR RESPONSES FOR PRODUCTION
   */
  public sanitizeErrorResponse(
    error: any,
    includeStack = false,
  ): {
    code: string;
    message: string;
    timestamp: string;
    details?: any;
  } {
    // Never expose sensitive information in production
    const isProduction = process.env.NODE_ENV === "production";

    let code = "INTERNAL_ERROR";
    let message = "An internal error occurred";

    if (error.code && typeof error.code === "string") {
      code = error.code;
    }

    if (error.message && typeof error.message === "string") {
      // Only include safe error messages in production
      if (!isProduction || this.isSafeErrorMessage(error.message)) {
        message = error.message;
      }
    }

    const response: any = {
      code,
      message,
      timestamp: new Date().toISOString(),
    };

    // Only include stack trace in development
    if (!isProduction && includeStack && error.stack) {
      response.details = {
        stack: error.stack,
      };
    }

    return response;
  }

  /**
   * ✅ CHECK IF ERROR MESSAGE IS SAFE TO EXPOSE
   */
  private isSafeErrorMessage(message: string): boolean {
    const dangerousPatterns = [
      /path/i,
      /file/i,
      /directory/i,
      /database/i,
      /connection/i,
      /password/i,
      /secret/i,
      /token/i,
      /key/i,
    ];

    return !dangerousPatterns.some((pattern) => pattern.test(message));
  }
}

/**
 * 🛡️ SECURE API WRAPPER - USE THIS FOR ALL API ROUTES
 */
export function createSecureAPIHandler<TInput, TOutput>(config: {
  method: string | string[];
  schema?: z.ZodSchema<TInput>;
  rateLimitType?: keyof typeof SECURITY_CONFIG.RATE_LIMITS;
  requireAuth?: boolean;
  handler: (input: TInput, request: NextRequest) => Promise<TOutput>;
}) {
  return async (request: NextRequest): Promise<NextResponse> => {
    const security = APISecurityHardening.getInstance();

    try {
      // Comprehensive security validation
      const validation = await security.validateRequest(request, {
        schema: config.schema,
        rateLimitType: config.rateLimitType,
        requireAuth: config.requireAuth,
        allowedMethods: Array.isArray(config.method)
          ? config.method
          : [config.method],
      });

      if (!validation.isValid) {
        const errorResponse = NextResponse.json(
          security.sanitizeErrorResponse(validation.error),
          { status: validation.error?.statusCode || 400 },
        );

        // Add security headers
        const securityHeaders = addSecurityHeaders();
        Object.entries(securityHeaders).forEach(([key, value]) => {
          errorResponse.headers.set(key, value);
        });

        return errorResponse;
      }

      // Execute handler with validated data
      const result = await config.handler(validation.data, request);

      // Create success response
      const response = NextResponse.json({
        success: true,
        data: result,
        timestamp: new Date().toISOString(),
      });

      // Add security headers
      const securityHeaders = addSecurityHeaders();
      Object.entries(securityHeaders).forEach(([key, value]) => {
        response.headers.set(key, value);
      });

      return response;
    } catch (error) {
      // Log error securely
      logger.error("API Handler Error", error, {
        endpoint: request.nextUrl.pathname,
        method: request.method,
        ip: security.getClientIP(request),
      });

      // Return sanitized error response
      const errorResponse = NextResponse.json(
        security.sanitizeErrorResponse(error),
        { status: 500 },
      );

      // Add security headers
      const securityHeaders = addSecurityHeaders();
      Object.entries(securityHeaders).forEach(([key, value]) => {
        errorResponse.headers.set(key, value);
      });

      return errorResponse;
    }
  };
}

// Export singleton instance
export const apiSecurity = APISecurityHardening.getInstance();

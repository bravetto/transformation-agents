import { randomBytes, createHash } from "crypto";
import { NextRequest, NextResponse } from "next/server";

/**
 * 🛡️ DIVINE CSRF PROTECTION SYSTEM
 * Comprehensive Cross-Site Request Forgery protection
 */

export interface CSRFConfig {
  tokenLength: number;
  sessionKey: string;
  headerName: string;
  cookieName: string;
  secure: boolean;
  sameSite: "strict" | "lax" | "none";
  maxAge: number; // in seconds
}

export interface CSRFValidationResult {
  isValid: boolean;
  token?: string;
  error?: string;
  timestamp: number;
}

const DEFAULT_CONFIG: CSRFConfig = {
  tokenLength: 32,
  sessionKey: "csrf_token",
  headerName: "X-CSRF-Token",
  cookieName: "csrf_token",
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 3600, // 1 hour
};

/**
 * Divine CSRF Protection Manager
 */
export class DivineCSRFProtection {
  private static instance: DivineCSRFProtection;
  private config: CSRFConfig;
  private tokenStore: Map<string, { token: string; timestamp: number }>;

  private constructor(config: Partial<CSRFConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.tokenStore = new Map();

    // Clean up expired tokens every 5 minutes
    setInterval(() => this.cleanupExpiredTokens(), 5 * 60 * 1000);
  }

  public static getInstance(
    config?: Partial<CSRFConfig>,
  ): DivineCSRFProtection {
    if (!DivineCSRFProtection.instance) {
      DivineCSRFProtection.instance = new DivineCSRFProtection(config);
    }
    return DivineCSRFProtection.instance;
  }

  /**
   * Generate a new CSRF token
   */
  public generateToken(sessionId?: string): string {
    const token = randomBytes(this.config.tokenLength).toString("hex");
    const timestamp = Date.now();

    if (sessionId) {
      this.tokenStore.set(sessionId, { token, timestamp });
    }

    return token;
  }

  /**
   * Validate CSRF token from request
   */
  public validateToken(
    request: NextRequest,
    sessionId?: string,
  ): CSRFValidationResult {
    const timestamp = Date.now();

    try {
      // Get token from header or body
      const headerToken = request.headers.get(this.config.headerName);
      const bodyToken = this.extractTokenFromBody(request);
      const cookieToken = this.extractTokenFromCookies(request);

      const providedToken = headerToken || bodyToken || cookieToken;

      if (!providedToken) {
        return {
          isValid: false,
          error: "CSRF token not provided",
          timestamp,
        };
      }

      // Validate against session store if session ID provided
      if (sessionId) {
        const storedData = this.tokenStore.get(sessionId);

        if (!storedData) {
          return {
            isValid: false,
            error: "No CSRF token found for session",
            timestamp,
          };
        }

        // Check token expiry
        if (timestamp - storedData.timestamp > this.config.maxAge * 1000) {
          this.tokenStore.delete(sessionId);
          return {
            isValid: false,
            error: "CSRF token expired",
            timestamp,
          };
        }

        // Validate token
        if (storedData.token !== providedToken) {
          return {
            isValid: false,
            error: "Invalid CSRF token",
            timestamp,
          };
        }

        return {
          isValid: true,
          token: providedToken,
          timestamp,
        };
      }

      // Basic token validation without session
      if (this.isValidTokenFormat(providedToken)) {
        return {
          isValid: true,
          token: providedToken,
          timestamp,
        };
      }

      return {
        isValid: false,
        error: "Invalid CSRF token format",
        timestamp,
      };
    } catch (error) {
      return {
        isValid: false,
        error: `CSRF validation error: ${error instanceof Error ? error.message : "Unknown error"}`,
        timestamp,
      };
    }
  }

  /**
   * Create CSRF protection middleware
   */
  public createMiddleware() {
    return async (request: NextRequest) => {
      // Skip CSRF for GET, HEAD, OPTIONS requests
      if (["GET", "HEAD", "OPTIONS"].includes(request.method)) {
        return NextResponse.next();
      }

      // Skip CSRF for API health checks
      if (request.nextUrl.pathname.includes("/api/health")) {
        return NextResponse.next();
      }

      const sessionId = this.extractSessionId(request);
      const validation = this.validateToken(request, sessionId);

      if (!validation.isValid) {
        return NextResponse.json(
          {
            error: "CSRF Protection Violation",
            message: validation.error,
            timestamp: validation.timestamp,
          },
          { status: 403 },
        );
      }

      return NextResponse.next();
    };
  }

  /**
   * Add CSRF token to response headers and cookies
   */
  public addTokenToResponse(
    response: NextResponse,
    token: string,
    sessionId?: string,
  ): NextResponse {
    // Add to cookie
    response.cookies.set(this.config.cookieName, token, {
      httpOnly: true,
      secure: this.config.secure,
      sameSite: this.config.sameSite,
      maxAge: this.config.maxAge,
      path: "/",
    });

    // Add to header for JavaScript access
    response.headers.set(this.config.headerName, token);

    // Store in session if session ID provided
    if (sessionId) {
      this.tokenStore.set(sessionId, {
        token,
        timestamp: Date.now(),
      });
    }

    return response;
  }

  /**
   * Generate token for form inclusion
   */
  public generateFormToken(sessionId?: string): {
    token: string;
    fieldName: string;
    headerName: string;
  } {
    const token = this.generateToken(sessionId);

    return {
      token,
      fieldName: this.config.sessionKey,
      headerName: this.config.headerName,
    };
  }

  /**
   * Validate double-submit cookie pattern
   */
  public validateDoubleSubmit(request: NextRequest): CSRFValidationResult {
    const timestamp = Date.now();

    try {
      const cookieToken = this.extractTokenFromCookies(request);
      const headerToken = request.headers.get(this.config.headerName);

      if (!cookieToken || !headerToken) {
        return {
          isValid: false,
          error: "Double-submit tokens missing",
          timestamp,
        };
      }

      if (cookieToken !== headerToken) {
        return {
          isValid: false,
          error: "Double-submit tokens do not match",
          timestamp,
        };
      }

      return {
        isValid: true,
        token: cookieToken,
        timestamp,
      };
    } catch (error) {
      return {
        isValid: false,
        error: `Double-submit validation error: ${error instanceof Error ? error.message : "Unknown error"}`,
        timestamp,
      };
    }
  }

  private extractTokenFromBody(request: NextRequest): string | null {
    // This would need to be implemented based on your body parsing strategy
    // For now, return null as we'll primarily use headers and cookies
    return null;
  }

  private extractTokenFromCookies(request: NextRequest): string | null {
    return request.cookies.get(this.config.cookieName)?.value || null;
  }

  private extractSessionId(request: NextRequest): string | undefined {
    // Extract session ID from cookies or headers
    return (
      request.cookies.get("session_id")?.value ||
      request.headers.get("X-Session-ID") ||
      undefined
    );
  }

  private isValidTokenFormat(token: string): boolean {
    // Check if token is hex string of expected length
    const expectedLength = this.config.tokenLength * 2; // hex is 2 chars per byte
    return /^[a-f0-9]+$/i.test(token) && token.length === expectedLength;
  }

  private cleanupExpiredTokens(): void {
    const now = Date.now();
    const maxAge = this.config.maxAge * 1000;

    for (const [sessionId, data] of this.tokenStore.entries()) {
      if (now - data.timestamp > maxAge) {
        this.tokenStore.delete(sessionId);
      }
    }
  }

  /**
   * Create CSRF token hash for additional security
   */
  public createTokenHash(token: string, secret: string): string {
    return createHash("sha256")
      .update(token + secret)
      .digest("hex");
  }

  /**
   * Verify CSRF token hash
   */
  public verifyTokenHash(token: string, hash: string, secret: string): boolean {
    const expectedHash = this.createTokenHash(token, secret);
    return expectedHash === hash;
  }
}

// Export singleton instance
export const divineCSRFProtection = DivineCSRFProtection.getInstance();

// Convenience functions
export const generateCSRFToken = (sessionId?: string) =>
  divineCSRFProtection.generateToken(sessionId);

export const validateCSRFToken = (request: NextRequest, sessionId?: string) =>
  divineCSRFProtection.validateToken(request, sessionId);

export const createCSRFMiddleware = () =>
  divineCSRFProtection.createMiddleware();

export const addCSRFTokenToResponse = (
  response: NextResponse,
  token: string,
  sessionId?: string,
) => divineCSRFProtection.addTokenToResponse(response, token, sessionId);

// React hook for CSRF token management
export const useCSRFToken = () => {
  if (typeof window === "undefined") {
    return null;
  }

  // Get token from meta tag or cookie
  const metaToken = document
    .querySelector('meta[name="csrf-token"]')
    ?.getAttribute("content");
  const cookieToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrf_token="))
    ?.split("=")[1];

  return metaToken || cookieToken || null;
};

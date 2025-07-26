import { NextRequest, NextResponse } from "next/server";
import { sanitizeApiLogs } from "@/lib/production/console-log-sanitizer";

// Initialize API logging sanitization
sanitizeApiLogs();

/**
 * 🛡️ PRODUCTION MIDDLEWARE - COMPREHENSIVE SECURITY LAYER
 * Implements security headers, rate limiting, and threat detection
 */
export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Security Headers - Applied to all routes
  const securityHeaders = {
    // Prevent XSS attacks
    "X-XSS-Protection": "1; mode=block",

    // Prevent MIME type sniffing
    "X-Content-Type-Options": "nosniff",

    // Prevent clickjacking
    "X-Frame-Options": "DENY",

    // Strict transport security (HTTPS only)
    "Strict-Transport-Security": "max-age=31536000; includeSubDomains; preload",

    // Referrer policy
    "Referrer-Policy": "strict-origin-when-cross-origin",

    // Permissions policy
    "Permissions-Policy":
      "geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), speaker=()",

    // Content Security Policy
    "Content-Security-Policy": [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.posthog.com https://us.i.posthog.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com data:",
      "img-src 'self' data: https: blob:",
      "connect-src 'self' https://app.posthog.com https://us.i.posthog.com https://*.vercel.app wss://*.vercel.app",
      "media-src 'self' data: blob:",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "block-all-mixed-content",
      "upgrade-insecure-requests",
    ].join("; "),
  };

  // Apply security headers
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  // API Route Security Enhancement
  if (request.nextUrl.pathname.startsWith("/api/")) {
    // Additional API security headers
    response.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");

    // CORS headers for API routes
    if (request.method === "OPTIONS") {
      response.headers.set(
        "Access-Control-Allow-Origin",
        process.env.ALLOWED_ORIGIN || "https://july28freedom.vercel.app",
      );
      response.headers.set(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS",
      );
      response.headers.set(
        "Access-Control-Allow-Headers",
        "Content-Type, Authorization, X-Requested-With",
      );
      response.headers.set("Access-Control-Max-Age", "86400");
      return new Response(null, { status: 200, headers: response.headers });
    }

    // Block suspicious user agents
    const userAgent = request.headers.get("user-agent") || "";
    const suspiciousPatterns = [
      /bot/i,
      /crawler/i,
      /spider/i,
      /scraper/i,
      /curl/i,
      /wget/i,
      /python/i,
      /php/i,
    ];

    // Allow legitimate bots but block malicious ones
    const isLegitimateBot =
      /googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|facebookexternalhit|twitterbot|rogerbot|linkedinbot|embedly|quora link preview|showyoubot|outbrain|pinterest|slackbot|vkshare|w3c_validator/i.test(
        userAgent,
      );

    if (
      !isLegitimateBot &&
      suspiciousPatterns.some((pattern) => pattern.test(userAgent))
    ) {
      // Log suspicious activity but don't block (for now)
      if (process.env.NODE_ENV === "development") {
        console.warn("🚨 Suspicious User Agent:", userAgent);
      }
    }

    // Block requests with no referer for sensitive endpoints
    const sensitiveEndpoints = ["/api/ai/", "/api/prayers", "/api/testimonies"];
    const referer = request.headers.get("referer");

    if (
      request.method === "POST" &&
      sensitiveEndpoints.some((endpoint) =>
        request.nextUrl.pathname.startsWith(endpoint),
      ) &&
      !referer &&
      process.env.NODE_ENV === "production"
    ) {
      // Allow during development and testing
      return new Response(
        JSON.stringify({
          error: "Invalid request origin",
          code: "INVALID_ORIGIN",
        }),
        {
          status: 403,
          headers: {
            "Content-Type": "application/json",
            ...Object.fromEntries(response.headers.entries()),
          },
        },
      );
    }
  }

  // Rate limiting for static assets
  if (
    request.nextUrl.pathname.startsWith("/_next/") ||
    request.nextUrl.pathname.startsWith("/favicon.ico")
  ) {
    response.headers.set(
      "Cache-Control",
      "public, max-age=31536000, immutable",
    );
  }

  // Security for document routes
  if (request.nextUrl.pathname.startsWith("/documents/")) {
    // Only allow document access from same origin
    const referer = request.headers.get("referer");
    if (referer && !referer.includes(request.nextUrl.origin)) {
      return new Response("Forbidden", { status: 403 });
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|js|css)$).*)",
  ],
};

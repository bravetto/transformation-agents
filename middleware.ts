import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // CRITICAL: Block CVE-2025-29927 exploit attempts (defense-in-depth)
  const subrequestHeader = request.headers.get('x-middleware-subrequest');
  if (subrequestHeader && subrequestHeader.includes('middleware:middleware:')) {
    return new NextResponse('Forbidden', { status: 403 });
  }
  
  // Fix MIME type issues for static files
  const response = NextResponse.next();

  // Add security headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // Fix MIME types for JavaScript files
  if (request.nextUrl.pathname.endsWith(".js")) {
    response.headers.set("Content-Type", "application/javascript");
  }

  // Add divine design metrics headers
  if (request.nextUrl.pathname.startsWith("/divine-design-metrics")) {
    response.headers.set(
      "Cache-Control",
      "no-cache, no-store, must-revalidate",
    );
    response.headers.set("Pragma", "no-cache");
    response.headers.set("Expires", "0");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

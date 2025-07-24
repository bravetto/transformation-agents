// instrumentation.js - Critical fix for Next.js 15.4.3 + PostHog integration
// This resolves the 500 errors and implements proper error capture

export function register() {
  // Initialize instrumentation for Next.js 15.4.3
  if (process.env.NODE_ENV === "production") {
    console.log("🔥 Divine instrumentation initialized for production");
  }
}

export const onRequestError = async (err, request, context) => {
  // Critical: Only run in Node.js runtime to prevent PostHog errors
  if (process.env.NEXT_RUNTIME === "nodejs") {
    try {
      // Dynamic import to prevent build-time issues
      const { PostHog } = await import("posthog-node");

      // Initialize PostHog server instance
      const posthog = new PostHog(process.env.NEXT_PUBLIC_POSTHOG_KEY || "", {
        host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com",
        flushAt: 1,
        flushInterval: 0,
      });

      // Extract user ID from PostHog cookie for user association
      let distinctId = "anonymous";
      if (request.headers.cookie) {
        const cookieString = request.headers.cookie;
        const postHogCookieMatch = cookieString.match(
          /ph_phc_.*?_posthog=([^;]+)/,
        );

        if (postHogCookieMatch && postHogCookieMatch[1]) {
          try {
            const decodedCookie = decodeURIComponent(postHogCookieMatch[1]);
            const postHogData = JSON.parse(decodedCookie);
            distinctId = postHogData.distinct_id || "anonymous";
          } catch (e) {
            console.warn("PostHog cookie parsing failed:", e.message);
          }
        }
      }

      // Capture the error with enhanced context
      await posthog.captureException(err, {
        distinctId,
        properties: {
          $current_url: request.url,
          $pathname: new URL(request.url).pathname,
          $host: request.headers.host,
          $user_agent: request.headers["user-agent"],
          error_boundary: "server_instrumentation",
          deployment_environment: process.env.VERCEL_ENV || "development",
          mission_context: "jahmere_webb_freedom_portal",
          court_date: "2025-07-28",
        },
      });

      // Ensure the event is sent
      await posthog.shutdown();

      console.error("Server error captured and sent to PostHog:", {
        error: err.message,
        url: request.url,
        distinctId,
      });
    } catch (instrumentationError) {
      // Fallback: Don't let instrumentation errors break the app
      console.error(
        "Instrumentation error (non-blocking):",
        instrumentationError.message,
      );
    }
  }
};

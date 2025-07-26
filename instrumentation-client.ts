import posthog from "posthog-js";

// Only initialize PostHog on the client side to prevent hydration mismatches
if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: "https://us.posthog.com",
    defaults: "2025-05-24",
    capture_exceptions: true, // This enables capturing exceptions using Error Tracking, set to false if you don't want this
    debug: process.env.NODE_ENV === "development",
    // Prevent automatic script injection that causes hydration issues
    autocapture: false,
    disable_session_recording: true,
    loaded: (posthog) => {
      // PostHog is fully loaded and ready
      console.log("PostHog loaded successfully");
    },
  });
}

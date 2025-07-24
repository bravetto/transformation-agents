"use client";

import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import posthog from "posthog-js";

export function PostHogProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Only initialize on client side
    if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host:
          process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://app.posthog.com",
        person_profiles: "identified_only",
        // Prevent server-side rendering issues
        loaded: (posthog) => {
          if (process.env.NODE_ENV === "development") {
            posthog.debug();
            console.log(
              "🔥 PostHog initialized for JAHmere Webb Freedom Portal",
            );
          }
        },
        // Critical: Prevent server-side errors
        disable_session_recording: process.env.NODE_ENV === "development",
        capture_pageview: false, // We'll handle this manually
        capture_pageleave: true,
        // Advanced settings for Next.js 15.4.3
        persistence: "localStorage+cookie",
        cross_subdomain_cookie: false,
        respect_dnt: true,
      });
    }
  }, []);

  // Don't render PostHogProvider on server
  if (typeof window === "undefined") {
    return <>{children}</>;
  }

  return <PostHogProvider client={posthog}>{children}</PostHogProvider>;
}

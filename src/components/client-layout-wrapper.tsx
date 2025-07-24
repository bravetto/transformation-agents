"use client";

import React, { Suspense } from "react";
import { AnimationProvider } from "@/components/animation-context";
import ErrorBoundaryWrapper from "@/components/error-boundary-wrapper";
import { DevPortalProvider } from "@/components/dev-portal";
import CacheBusterClient from "@/components/cache-buster-client";
import { DevelopmentDebugWrapper } from "@/components/console-silence-wrapper";
import DivineAnalytics from "@/components/divine-analytics";
import { TrinityPathProvider } from "@/features/trinity-paths/context";
import { ConsoleSilenceWrapper } from "@/components/console-silence-wrapper";
import { Analytics } from "@/components/analytics";

interface ClientLayoutWrapperProps {
  children: React.ReactNode;
}

/**
 * Client Layout Wrapper
 * Consolidates all client-side providers and error boundaries into a single component
 * to prevent SSR bailout issues with complex server/client boundaries
 */
export default function ClientLayoutWrapper({
  children,
}: ClientLayoutWrapperProps) {
  return (
    <ConsoleSilenceWrapper
      silenceProfileImageErrors={true}
      silenceAnalyticsErrors={true}
      silenceDevWarnings={process.env.NODE_ENV === "production"}
      environment={
        process.env.NODE_ENV === "production" ? "production" : "development"
      }
    >
      <TrinityPathProvider>
        <AnimationProvider>
          <DevPortalProvider>
            <ErrorBoundaryWrapper id="root-layout">
              <DevelopmentDebugWrapper>{children}</DevelopmentDebugWrapper>
            </ErrorBoundaryWrapper>

            {/* Analytics components - outside main content but inside providers */}
            <Suspense fallback={null}>
              <Analytics />
            </Suspense>

            {/* Divine Analytics for Freedom Portal */}
            <DivineAnalytics />

            {/* Cache Buster for July 28th Update - Divine Protection */}
            <CacheBusterClient />
          </DevPortalProvider>
        </AnimationProvider>
      </TrinityPathProvider>
    </ConsoleSilenceWrapper>
  );
}

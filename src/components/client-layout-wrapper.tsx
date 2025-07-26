"use client";

import React, { Suspense } from "react";
import { AnimationProvider } from "@/components/animation-context";
import ErrorBoundary from "@/components/ui/error-boundary";
import { DevPortalProvider } from "@/components/dev-portal";
import CacheBusterClient from "@/components/cache-buster-client";
import DivineAnalytics from "@/components/divine-analytics";
import { TrinityPathProvider } from "@/features/trinity-paths/context";
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
    <TrinityPathProvider>
      <AnimationProvider>
        <DevPortalProvider>
          <ErrorBoundary componentName="root-layout">
            {children}
          </ErrorBoundary>

          {/* Analytics components - outside main content but inside providers */}
          <Suspense fallback={null}>
            <Analytics />
          </Suspense>

          {/* Divine Analytics for Freedom Portal */}
          <DivineAnalytics />

          {/* Cache Buster for July 28th Update - System Protection */}
          <CacheBusterClient />
        </DevPortalProvider>
      </AnimationProvider>
    </TrinityPathProvider>
  );
}

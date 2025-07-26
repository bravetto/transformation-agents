"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { DivineErrorBoundary } from "@/components/ui/divine-error-boundary";

interface PersonPageClientProps {
  children: ReactNode;
  personName: string;
}

/**
 * Person Page Client Wrapper
 *
 * This component handles all client-side functionality for individual person pages.
 * It's a Client Component that can safely import and render other Client Components
 * used throughout the person pages.
 *
 * Benefits:
 * - Proper hydration boundaries
 * - No SSR/Client mismatches
 * - Event handlers work consistently
 * - Follows Next.js 15.4+ composition patterns
 */
export default function PersonPageClient({
  children,
  personName,
}: PersonPageClientProps) {
  return (
    <DivineErrorBoundary
      componentName={`${personName}PageClient`}
      role="guardian"
      fallback={
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-600 mb-4">
            We encountered an issue loading {personName}'s profile.
          </p>
          <Link href="/people" className="text-blue-500 hover:underline">
            Return to People Directory
          </Link>
        </div>
      }
    >
      <main className="min-h-screen">{children}</main>
    </DivineErrorBoundary>
  );
}

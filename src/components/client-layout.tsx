"use client";

import { ReactNode, Suspense } from "react";
import { usePathname } from "next/navigation";
import Navigation from "@/components/navigation";

interface ClientLayoutProps {
  children: ReactNode;
}

/**
 * Client Layout Wrapper
 *
 * This component handles all client-side navigation and interactivity.
 * It's a Client Component that can safely import and render other Client Components.
 *
 * Benefits:
 * - Proper hydration boundaries
 * - No SSR/Client mismatches
 * - Event handlers work consistently
 * - Follows Next.js 15.4+ composition patterns
 * - Stable navigation state across route changes
 */
// Navigation Skeleton for Suspense fallback
function NavigationSkeleton() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 h-16">
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        <div className="w-32 h-6 bg-gray-200 rounded animate-pulse" />
        <div className="hidden md:flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="w-20 h-8 bg-gray-200 rounded animate-pulse"
            />
          ))}
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded animate-pulse md:hidden" />
      </div>
    </nav>
  );
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <Suspense fallback={<NavigationSkeleton />}>
        <Navigation />
      </Suspense>
      <main className="min-h-screen">{children}</main>
    </>
  );
}

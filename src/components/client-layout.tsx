"use client";

import { ReactNode } from "react";
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
 */
export default function ClientLayout({ children }: ClientLayoutProps) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">{children}</main>
    </>
  );
}

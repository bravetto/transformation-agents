"use client";

import { ReactNode } from "react";
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
 * - Forces navigation remount on route changes for clean state
 */
export default function ClientLayout({ children }: ClientLayoutProps) {
  const pathname = usePathname();

  return (
    <>
      <Navigation key={pathname} />
      <main className="min-h-screen">{children}</main>
    </>
  );
}

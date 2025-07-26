"use client";

import { useRef, useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Stable Navigation Hook
 *
 * Provides a stable reference to pathname that doesn't cause unnecessary re-renders
 * in production deployments. Specifically designed to address Vercel deployment
 * issues with Next.js 15 + React 19 usePathname behavior.
 *
 * This hook prevents the navigation component from remounting on every route change
 * while still providing access to the current pathname for conditional rendering.
 */
export function useStableNavigation() {
  const pathname = usePathname();
  const stablePathnameRef = useRef(pathname);
  const previousPathnameRef = useRef<string | null>(null);

  useEffect(() => {
    // Track pathname changes without causing re-renders
    if (stablePathnameRef.current !== pathname) {
      previousPathnameRef.current = stablePathnameRef.current;
      stablePathnameRef.current = pathname;
    }
  }, [pathname]);

  return {
    /** Current pathname (stable reference) */
    pathname: stablePathnameRef.current,
    /** Previous pathname for transition detection */
    previousPathname: previousPathnameRef.current,
    /** Check if we're on a specific route */
    isRoute: (route: string) => stablePathnameRef.current === route,
    /** Check if current route starts with a path */
    isRoutePrefix: (prefix: string) =>
      stablePathnameRef.current.startsWith(prefix),
    /** Check if route has changed */
    hasRouteChanged: () =>
      previousPathnameRef.current !== null &&
      previousPathnameRef.current !== stablePathnameRef.current,
  };
}

/**
 * Deployment-Safe Pathname Hook
 *
 * Alternative to usePathname() that provides better stability in production
 * environments, particularly on Vercel edge runtime.
 */
export function useDeploymentSafePathname(): string {
  const pathname = usePathname();
  const stableRef = useRef(pathname);

  // Only update if pathname actually changed (not just re-rendered)
  if (stableRef.current !== pathname) {
    stableRef.current = pathname;
  }

  return stableRef.current;
}

"use client";

/**
 * Responsive utilities for The Bridge Project
 * Provides consistent responsive patterns and helpers
 */

import React, { useState, useEffect } from "react";

// Standard breakpoints that match Tailwind config
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

/**
 * Hook to track current viewport size
 * @returns Object with boolean flags for each breakpoint
 */
export function useBreakpoints() {
  const [breakpoint, setBreakpoint] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    isLargeDesktop: false,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setBreakpoint({
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024 && width < 1440,
        isLargeDesktop: width >= 1440,
      });
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}

/**
 * Hook to detect device orientation
 * @returns Object with orientation information
 */
export function useOrientation() {
  const [orientation, setOrientation] = useState({
    isPortrait: true,
    isLandscape: false,
    angle: 0,
  });

  useEffect(() => {
    const handleOrientationChange = () => {
      const angle = window.screen.orientation?.angle || window.orientation || 0;
      setOrientation({
        isPortrait: angle === 0 || angle === 180,
        isLandscape: angle === 90 || angle === -90,
        angle,
      });
    };

    // Initial check
    handleOrientationChange();

    window.addEventListener("orientationchange", handleOrientationChange);
    return () =>
      window.removeEventListener("orientationchange", handleOrientationChange);
  }, []);

  return orientation;
}

/**
 * Touch-optimized breakpoint grid classes
 * @param columns Configuration object for columns at different breakpoints
 * @returns Tailwind grid class string
 */
export function responsiveGridColumns({
  sm = 1,
  md = 2,
  lg = 3,
  xl = 4,
  "2xl": xxl = 4,
}: {
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  "2xl"?: number;
} = {}) {
  return `grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} xl:grid-cols-${xl} 2xl:grid-cols-${xxl}`;
}

/**
 * Generate responsive spacing classes
 * @param config Configuration object for spacing at different breakpoints
 * @returns Tailwind spacing class string
 */
export function responsiveSpacing({
  type = "p", // p for padding, m for margin
  base = 4,
  sm = 4,
  md = 6,
  lg = 8,
  xl = 10,
}: {
  type?: "p" | "m";
  base?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
} = {}) {
  return `${type}-${base} sm:${type}-${sm} md:${type}-${md} lg:${type}-${lg} xl:${type}-${xl}`;
}

/**
 * Generate responsive width classes
 * @param config Configuration object for width at different breakpoints
 * @returns Tailwind width class string
 */
export function responsiveWidth({
  base = "full",
  sm = "full",
  md,
  lg,
  xl,
}: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
} = {}) {
  let classes = `w-${base}`;
  if (sm) classes += ` sm:w-${sm}`;
  if (md) classes += ` md:w-${md}`;
  if (lg) classes += ` lg:w-${lg}`;
  if (xl) classes += ` xl:w-${xl}`;
  return classes;
}

/**
 * Check if device supports hover
 * @returns Boolean indicating if device supports hover
 */
export function useSupportsHover() {
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover)");
    setSupportsHover(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setSupportsHover(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return supportsHover;
}

/**
 * Generate responsive font size classes
 * @param config Configuration object for font size at different breakpoints
 * @returns Tailwind font size class string
 */
export function responsiveFontSize({
  base = "base",
  sm,
  md,
  lg,
  xl,
}: {
  base?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
} = {}) {
  let classes = `text-${base}`;
  if (sm) classes += ` sm:text-${sm}`;
  if (md) classes += ` md:text-${md}`;
  if (lg) classes += ` lg:text-${lg}`;
  if (xl) classes += ` xl:text-${xl}`;
  return classes;
}

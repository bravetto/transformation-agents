"use client";

import React, { useMemo } from "react";
import {
  motion,
  Variant,
  AnimationProps,
  MotionProps,
  Transition,
  useReducedMotion,
} from "framer-motion";
import { animations } from "@/lib/design-system";
import { useAnimation } from "@/components/animation-context";
import {
  getPageTransitionVariants,
  getDivineAnimationPreset,
} from "@/lib/animation-utils";

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: keyof typeof animations.presets;
  className?: string;
}

// Type for motion props based on the animation preset structure
type MotionAnimationProps = {
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  exit?: MotionProps["exit"];
  transition?: MotionProps["transition"];
};

// Type guard to check if animation has certain properties
const hasProperty = <T extends object, K extends string>(
  obj: T,
  key: K,
): obj is T & Record<K, unknown> => {
  return key in obj;
};

/**
 * PageTransition component
 * Wraps page content in consistent animations with performance optimization
 */
export const PageTransition: React.FC<PageTransitionProps> = React.memo(
  ({ children, variant = "fadeIn", className }) => {
    // Get animation preferences from context
    const { shouldSimplifyAnimations, reducedMotion, isPaused } =
      useAnimation();

    // Fallback reduced motion check (for extra safety)
    const prefersReducedMotion = useReducedMotion();

    // Get appropriate animation preset based on accessibility needs
    const shouldReduce =
      reducedMotion ||
      Boolean(prefersReducedMotion) ||
      shouldSimplifyAnimations;

    // Memoize animation configuration to prevent recalculation on every render
    const animation = useMemo(() => {
      return getDivineAnimationPreset(variant, shouldReduce);
    }, [variant, shouldReduce]);

    // Memoize motion props to prevent unnecessary re-renders
    const motionProps = useMemo(() => {
      const props: MotionAnimationProps = {
        animate: isPaused ? "initial" : animation.animate,
        transition: animation.transition as Transition,
      };

      // Only add these props if they exist in the animation
      if (hasProperty(animation, "initial")) {
        props.initial = animation.initial as MotionProps["initial"];
      }

      if (hasProperty(animation, "exit")) {
        props.exit = animation.exit as MotionProps["exit"];
      }

      return props;
    }, [animation, isPaused]);

    return (
      <motion.div {...motionProps} className={className}>
        {children}
      </motion.div>
    );
  },
);

PageTransition.displayName = "PageTransition";

/**
 * RevealOnScroll component
 * Animates elements as they scroll into view with performance optimization
 */
interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  variant?: keyof typeof animations.presets;
  className?: string;
}

// Type for scroll-based motion props
type ScrollMotionProps = {
  initial?: MotionProps["initial"];
  whileInView?: MotionProps["whileInView"];
  viewport?: MotionProps["viewport"];
  transition?: MotionProps["transition"];
};

export const RevealOnScroll: React.FC<RevealOnScrollProps> = React.memo(
  ({
    children,
    delay = 0,
    threshold = 0.1,
    variant = "slideUp",
    className,
  }) => {
    // Get animation preferences from context
    const { shouldSimplifyAnimations, reducedMotion, isPaused } =
      useAnimation();

    // Fallback reduced motion check
    const prefersReducedMotion = useReducedMotion();

    // Get appropriate animation preset based on accessibility needs
    const shouldReduce =
      reducedMotion ||
      Boolean(prefersReducedMotion) ||
      shouldSimplifyAnimations;

    // Memoize animation configuration to prevent recalculation on every render
    const animation = useMemo(() => {
      return getDivineAnimationPreset(variant, shouldReduce);
    }, [variant, shouldReduce]);

    // If animations are paused, adjust behavior
    const effectiveDelay = isPaused ? 0 : delay;

    // Memoize motion props to prevent unnecessary re-renders
    const motionProps = useMemo(() => {
      // Create transition with proper typing
      const transition: Transition = {
        ...(animation.transition || {}),
        delay: effectiveDelay,
      } as Transition;

      const props: ScrollMotionProps = {
        whileInView: isPaused ? undefined : animation.animate,
        viewport: {
          once: true,
          amount: threshold,
          // Disable margin when reducing motion to avoid jarring changes
          margin: shouldReduce ? "0px" : "-100px 0px",
        },
        transition,
      };

      // Only add initial if it exists in the animation
      if (hasProperty(animation, "initial")) {
        props.initial = animation.initial as MotionProps["initial"];
      }

      return props;
    }, [animation, isPaused, effectiveDelay, threshold, shouldReduce]);

    return (
      <motion.div {...motionProps} className={className}>
        {children}
      </motion.div>
    );
  },
);

RevealOnScroll.displayName = "RevealOnScroll";

export default PageTransition;

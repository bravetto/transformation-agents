'use client';

import React from 'react';
import { motion, Variant, AnimationProps, MotionProps, Transition } from 'framer-motion';
import { animations } from '@/lib/design-system';

interface PageTransitionProps {
  children: React.ReactNode;
  variant?: keyof typeof animations.presets;
}

// Type for motion props based on the animation preset structure
type MotionAnimationProps = {
  initial?: MotionProps['initial'];
  animate?: MotionProps['animate'];
  exit?: MotionProps['exit'];
  transition?: MotionProps['transition'];
};

// Type guard to check if animation has certain properties
const hasProperty = <T extends object, K extends string>(obj: T, key: K): obj is T & Record<K, unknown> => {
  return key in obj;
};

/**
 * PageTransition component
 * Wraps page content in consistent animations
 */
export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  variant = 'fadeIn' 
}) => {
  // Get the animation preset from the design system
  const animation = animations.presets[variant];

  // Determine which properties to pass based on what's available
  const motionProps: MotionAnimationProps = {
    animate: animation.animate,
    transition: animation.transition as Transition
  };

  // Only add these props if they exist in the animation
  if (hasProperty(animation, 'initial')) {
    motionProps.initial = animation.initial as MotionProps['initial'];
  }
  
  if (hasProperty(animation, 'exit')) {
    motionProps.exit = animation.exit as MotionProps['exit'];
  }

  return (
    <motion.div {...motionProps}>
      {children}
    </motion.div>
  );
};

/**
 * RevealOnScroll component
 * Animates elements as they scroll into view
 */
interface RevealOnScrollProps {
  children: React.ReactNode;
  delay?: number;
  threshold?: number;
  variant?: keyof typeof animations.presets;
}

// Type for scroll-based motion props
type ScrollMotionProps = {
  initial?: MotionProps['initial'];
  whileInView?: MotionProps['whileInView'];
  viewport?: MotionProps['viewport'];
  transition?: MotionProps['transition'];
};

export const RevealOnScroll: React.FC<RevealOnScrollProps> = ({
  children,
  delay = 0,
  threshold = 0.1,
  variant = 'slideUp'
}) => {
  const animation = animations.presets[variant];
  
  // Create transition with proper typing
  const transition: Transition = {
    ...(animation.transition || {}),
    delay
  } as Transition;
  
  // Determine which properties to pass based on what's available
  const motionProps: ScrollMotionProps = {
    whileInView: animation.animate,
    viewport: { once: true, amount: threshold },
    transition
  };

  // Only add initial if it exists in the animation
  if (hasProperty(animation, 'initial')) {
    motionProps.initial = animation.initial as MotionProps['initial'];
  }
  
  return (
    <motion.div {...motionProps}>
      {children}
    </motion.div>
  );
};

export default PageTransition; 
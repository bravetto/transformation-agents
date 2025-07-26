"use client";

import React, { useRef, useState, useEffect } from "react";
import {
  motion,
  useAnimation,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { withErrorBoundary } from "@/components/ui/error-boundary";

// 🚀 OPTIMIZED: All animations now use Framer Motion instead of react-spring
// This eliminates the dependency on @react-spring/web (200KB+ savings)

interface SacredRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
  trigger?: boolean;
}

function SacredReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  trigger = true,
}: SacredRevealProps) {
  const getInitialVariant = () => {
    switch (direction) {
      case "up":
        return { y: 50, opacity: 0 };
      case "down":
        return { y: -50, opacity: 0 };
      case "left":
        return { x: 50, opacity: 0 };
      case "right":
        return { x: -50, opacity: 0 };
      case "scale":
        return { scale: 0.8, opacity: 0 };
      default:
        return { y: 50, opacity: 0 };
    }
  };

  return (
    <motion.div
      initial={getInitialVariant()}
      animate={
        trigger ? { x: 0, y: 0, scale: 1, opacity: 1 } : getInitialVariant()
      }
      transition={{ delay, duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Export the SacredReveal component
export { SacredReveal };

interface FloatingElementProps {
  children: React.ReactNode;
  intensity?: "gentle" | "medium" | "strong";
  className?: string;
}

export function FloatingElement({
  children,
  intensity = "gentle",
  className = "",
}: FloatingElementProps) {
  const intensitySettings = {
    gentle: { range: 5, duration: 4 },
    medium: { range: 10, duration: 3 },
    strong: { range: 15, duration: 2 },
  };

  const settings = intensitySettings[intensity];

  return (
    <motion.div
      animate={{
        y: [-settings.range, settings.range, -settings.range],
        rotate: [-2, 2, -2],
      }}
      transition={{
        duration: settings.duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

interface DraggableTestimonyProps {
  children: React.ReactNode;
  onDragEnd?: (info: { offset: number; velocity: number }) => void;
  className?: string;
}

export function DraggableTestimony({
  children,
  onDragEnd,
  className = "",
}: DraggableTestimonyProps) {
  return (
    <motion.div
      drag
      dragConstraints={{ left: -100, right: 100, top: -100, bottom: 100 }}
      dragElastic={0.3}
      whileDrag={{ scale: 1.05, rotate: 5 }}
      onDragEnd={(event, info) => {
        if (onDragEnd) {
          onDragEnd({
            offset: Math.abs(info.offset.x),
            velocity: Math.abs(info.velocity.x),
          });
        }
      }}
      className={`cursor-grab ${className}`}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxScroll({
  children,
  speed = 0.5,
  className = "",
}: ParallaxScrollProps) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 1000 * speed]);

  return (
    <motion.div style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

interface StaggeredRevealProps {
  children: React.ReactNode[];
  delay?: number;
  stagger?: number;
  className?: string;
  trigger?: boolean;
}

export function StaggeredReveal({
  children,
  delay = 0,
  stagger = 0.1,
  className = "",
  trigger = true,
}: StaggeredRevealProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 30 }}
          animate={trigger ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{
            delay: delay + index * stagger,
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface PulsingHeartProps {
  size?: number;
  intensity?: "gentle" | "strong";
  color?: string;
  onClick?: () => void;
  className?: string;
}

export function PulsingHeart({
  size = 24,
  intensity = "gentle",
  color = "#FCD34D",
  onClick,
  className = "",
}: PulsingHeartProps) {
  const [isClicked, setIsClicked] = useState(false);

  const scaleRange = intensity === "gentle" ? [1, 1.1] : [1, 1.3];
  const duration = intensity === "gentle" ? 2 : 1;

  return (
    <motion.div
      animate={isClicked ? { scale: 1.5 } : { scale: scaleRange }}
      transition={{
        duration: isClicked ? 0.3 : duration,
        repeat: isClicked ? 0 : Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
      }}
      onClick={() => {
        setIsClicked(true);
        onClick?.();
        setTimeout(() => setIsClicked(false), 300);
      }}
      className={`cursor-pointer ${className}`}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </motion.div>
  );
}

interface ChainedAnimationProps {
  children: React.ReactNode[];
  className?: string;
  trigger?: boolean;
}

export function ChainedAnimation({
  children,
  className = "",
  trigger = true,
}: ChainedAnimationProps) {
  return (
    <div className={className}>
      {children.map((child, index) => (
        <motion.div
          key={index}
          initial={
            index === 0
              ? { opacity: 0 }
              : index === 1
                ? { y: 50 }
                : { scale: 0.8 }
          }
          animate={
            trigger
              ? index === 0
                ? { opacity: 1 }
                : index === 1
                  ? { y: 0 }
                  : { scale: 1 }
              : index === 0
                ? { opacity: 0 }
                : index === 1
                  ? { y: 50 }
                  : { scale: 0.8 }
          }
          transition={{
            delay: trigger ? index * 0.3 : (2 - index) * 0.3,
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          {child}
        </motion.div>
      ))}
    </div>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  strength = 0.3,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    setMousePosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    });
  };

  return (
    <motion.div
      animate={isHovered ? mousePosition : { x: 0, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePosition({ x: 0, y: 0 });
      }}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default withErrorBoundary(SacredReveal, "SacredReveal");

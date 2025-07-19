"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

import Image from "next/image";
import { logger } from "@/lib/logger";

/**
 * Mobile Optimization Hook - Championship Level Device Detection
 */
export function useMobileOptimization() {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isDesktop: false,
    screenWidth: 0,
    screenHeight: 0,
    orientation: "portrait" as "portrait" | "landscape",
    touchSupport: false,
    devicePixelRatio: 1,
    connectionSpeed: "unknown" as "slow" | "fast" | "unknown",
  });

  const detectDevice = useCallback(() => {
    if (typeof window === "undefined") return;

    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = window.devicePixelRatio || 1;
    const touchSupport =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;

    // Enhanced device detection
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;
    const orientation = width > height ? "landscape" : "portrait";

    // Connection speed detection
    let connectionSpeed: "slow" | "fast" | "unknown" = "unknown";
    if ("connection" in navigator) {
      const connection = (navigator as any).connection;
      if (
        connection.saveData ||
        connection.effectiveType === "2g" ||
        connection.effectiveType === "3g"
      ) {
        connectionSpeed = "slow";
      } else {
        connectionSpeed = "fast";
      }
    }

    setDeviceInfo({
      isMobile,
      isTablet,
      isDesktop,
      screenWidth: width,
      screenHeight: height,
      orientation,
      touchSupport,
      devicePixelRatio: pixelRatio,
      connectionSpeed,
    });
  }, []);

  useEffect(() => {
    detectDevice();
    window.addEventListener("resize", detectDevice);
    window.addEventListener("orientationchange", detectDevice);

    return () => {
      window.removeEventListener("resize", detectDevice);
      window.removeEventListener("orientationchange", detectDevice);
    };
  }, [detectDevice]);

  return deviceInfo;
}

/**
 * Touch-Optimized Button Component
 */
interface TouchButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost";
  size?: "small" | "medium" | "large";
  className?: string;
  disabled?: boolean;
}

export function TouchButton({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  className,
  disabled = false,
}: TouchButtonProps) {
  const { isMobile } = useMobileOptimization();

  // Touch-optimized sizing (minimum 44px for accessibility)
  const sizeClasses = {
    small: isMobile ? "min-h-[44px] px-4 text-sm" : "min-h-[36px] px-3 text-sm",
    medium: isMobile
      ? "min-h-[48px] px-6 text-base"
      : "min-h-[40px] px-4 text-base",
    large: isMobile ? "min-h-[56px] px-8 text-lg" : "min-h-[48px] px-6 text-lg",
  };

  const variantClasses = {
    primary:
      "bg-gradient-to-r from-elite-divine-amber to-hope-gold text-white shadow-lg",
    secondary:
      "bg-white border-2 border-elite-justice-indigo text-elite-justice-indigo",
    ghost: "bg-transparent text-elite-obsidian-depth hover:bg-gray-100",
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200",
        "focus:outline-none focus:ring-2 focus:ring-elite-justice-indigo focus:ring-offset-2",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </motion.button>
  );
}

/**
 * Swipeable Card Component for Mobile
 */
interface SwipeableCardProps {
  children: React.ReactNode;
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  className?: string;
}

export function SwipeableCard({
  children,
  onSwipeLeft,
  onSwipeRight,
  className,
}: SwipeableCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = (event: any, info: any) => {
    const threshold = 100;

    if (info.offset.x > threshold && onSwipeRight) {
      onSwipeRight();
    } else if (info.offset.x < -threshold && onSwipeLeft) {
      onSwipeLeft();
    } else {
      // Snap back to center
      x.set(0);
    }
  };

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      style={{ x, rotate, opacity }}
      onDragEnd={handleDragEnd}
      className={cn(
        "touch-pan-y select-none cursor-grab active:cursor-grabbing",
        className,
      )}
    >
      {children}
    </motion.div>
  );
}

/**
 * Mobile-Optimized Modal Component
 */
interface MobileModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  fullScreen?: boolean;
}

export function MobileModal({
  isOpen,
  onClose,
  children,
  title,
  fullScreen = false,
}: MobileModalProps) {
  const { isMobile, screenHeight } = useMobileOptimization();

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const modalVariants = {
    hidden: {
      opacity: 0,
      y: isMobile ? "100%" : "50%",
      scale: isMobile ? 1 : 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      y: isMobile ? "100%" : "50%",
      scale: isMobile ? 1 : 0.8,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={cn(
              "fixed z-50 bg-white rounded-t-3xl shadow-2xl",
              isMobile && !fullScreen
                ? "bottom-0 left-0 right-0 max-h-[90vh]"
                : fullScreen && isMobile
                  ? "inset-0 rounded-none"
                  : "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full mx-4 rounded-2xl max-h-[85vh]",
            )}
          >
            {/* Header */}
            {title && (
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-elite-obsidian-depth">
                  {title}
                </h2>
                <TouchButton
                  variant="ghost"
                  size="small"
                  onClick={onClose}
                  className="rounded-full w-8 h-8 p-0"
                >
                  ✕
                </TouchButton>
              </div>
            )}

            {/* Content */}
            <div className="overflow-y-auto flex-1 p-6">{children}</div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Progressive Web App Install Prompt
 */
export function PWAInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const { isMobile } = useMobileOptimization();

  useEffect(() => {
    let deferredPrompt: any;

    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      setShowPrompt(true);
    };

    const handleAppInstalled = () => {
      logger.info("PWA installed");
      setShowPrompt(false);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt,
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const result = await deferredPrompt.userChoice;

    if (result.outcome === "accepted") {
      logger.info("PWA installed");
    }

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  if (!showPrompt || !isMobile || !deferredPrompt) return null;

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="fixed bottom-4 left-4 right-4 z-50 bg-white rounded-2xl shadow-2xl border border-gray-200 p-6"
    >
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-elite-divine-amber to-hope-gold rounded-xl flex items-center justify-center text-white text-xl font-bold">
          🌉
        </div>

        <div className="flex-1">
          <h3 className="font-bold text-elite-obsidian-depth mb-1">
            Install The Bridge Project
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Get quick access and stay updated on JAHmere's case
          </p>

          <div className="flex gap-3">
            <TouchButton
              variant="primary"
              size="small"
              onClick={handleInstall}
              className="flex-1"
            >
              Install
            </TouchButton>
            <TouchButton
              variant="ghost"
              size="small"
              onClick={() => setShowPrompt(false)}
              className="flex-1"
            >
              Later
            </TouchButton>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/**
 * Mobile Navigation Drawer
 */
interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export function MobileDrawer({ isOpen, onClose, children }: MobileDrawerProps) {
  const { screenWidth } = useMobileOptimization();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-2xl z-50 overflow-y-auto"
          >
            {children}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/**
 * Touch Feedback Component
 */
interface TouchFeedbackProps {
  children: React.ReactNode;
  className?: string;
}

export function TouchFeedback({ children, className }: TouchFeedbackProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.95 }}
      className={cn("touch-manipulation", className)}
    >
      {children}
    </motion.div>
  );
}

/**
 * Responsive Container with Mobile Optimizations
 */
interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  padding?: "none" | "small" | "medium" | "large";
}

export function ResponsiveContainer({
  children,
  className,
  padding = "medium",
}: ResponsiveContainerProps) {
  const { isMobile, isTablet } = useMobileOptimization();

  const paddingClasses = {
    none: "p-0",
    small: isMobile ? "p-4" : "p-6",
    medium: isMobile ? "p-6" : isTablet ? "p-8" : "p-10",
    large: isMobile ? "p-8" : isTablet ? "p-12" : "p-16",
  };

  return (
    <div className={cn("w-full mx-auto", paddingClasses[padding], className)}>
      {children}
    </div>
  );
}

/**
 * Advanced Gesture Hook - Championship Level Touch Interactions
 */
export function useAdvancedGestures() {
  const [gestureState, setGestureState] = useState({
    isSwipeEnabled: true,
    swipeThreshold: 50,
    longPressDelay: 500,
    hapticFeedback: true,
  });

  const triggerHaptic = useCallback(
    (type: "light" | "medium" | "heavy" = "light") => {
      if (gestureState.hapticFeedback && "vibrate" in navigator) {
        const patterns = {
          light: [10],
          medium: [20],
          heavy: [30, 10, 30],
        };
        navigator.vibrate(patterns[type]);
      }
    },
    [gestureState.hapticFeedback],
  );

  const createSwipeHandler = useCallback(
    (
      onSwipeLeft?: () => void,
      onSwipeRight?: () => void,
      onSwipeUp?: () => void,
      onSwipeDown?: () => void,
    ) => {
      let startX = 0;
      let startY = 0;
      let startTime = 0;

      const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;
        startTime = Date.now();
      };

      const handleTouchEnd = (e: React.TouchEvent) => {
        if (!gestureState.isSwipeEnabled) return;

        const touch = e.changedTouches[0];
        const deltaX = touch.clientX - startX;
        const deltaY = touch.clientY - startY;
        const deltaTime = Date.now() - startTime;

        // Swipe velocity threshold (pixels per millisecond)
        const velocity =
          Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime;

        if (velocity < 0.3) return; // Too slow to be a swipe

        const absDeltaX = Math.abs(deltaX);
        const absDeltaY = Math.abs(deltaY);

        if (absDeltaX > gestureState.swipeThreshold && absDeltaX > absDeltaY) {
          // Horizontal swipe
          triggerHaptic("light");
          if (deltaX > 0 && onSwipeRight) {
            onSwipeRight();
          } else if (deltaX < 0 && onSwipeLeft) {
            onSwipeLeft();
          }
        } else if (
          absDeltaY > gestureState.swipeThreshold &&
          absDeltaY > absDeltaX
        ) {
          // Vertical swipe
          triggerHaptic("light");
          if (deltaY > 0 && onSwipeDown) {
            onSwipeDown();
          } else if (deltaY < 0 && onSwipeUp) {
            onSwipeUp();
          }
        }
      };

      return { onTouchStart: handleTouchStart, onTouchEnd: handleTouchEnd };
    },
    [gestureState, triggerHaptic],
  );

  const createLongPressHandler = useCallback(
    (onLongPress: () => void) => {
      let pressTimer: NodeJS.Timeout;

      const handleTouchStart = () => {
        pressTimer = setTimeout(() => {
          triggerHaptic("medium");
          onLongPress();
        }, gestureState.longPressDelay);
      };

      const handleTouchEnd = () => {
        clearTimeout(pressTimer);
      };

      return {
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
        onTouchMove: handleTouchEnd, // Cancel on move
      };
    },
    [gestureState.longPressDelay, triggerHaptic],
  );

  return {
    gestureState,
    setGestureState,
    triggerHaptic,
    createSwipeHandler,
    createLongPressHandler,
  };
}

/**
 * Performance Monitoring Hook - Real-time Mobile Performance Tracking
 */
export function useMobilePerformance() {
  const [performanceMetrics, setPerformanceMetrics] = useState({
    fps: 60,
    memoryUsage: 0,
    loadTime: 0,
    renderTime: 0,
    isLowPerformance: false,
  });

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    let animationId: number;

    const measureFPS = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        frameCount = 0;
        lastTime = currentTime;

        setPerformanceMetrics((prev) => ({
          ...prev,
          fps,
          isLowPerformance: fps < 30,
        }));
      }

      animationId = requestAnimationFrame(measureFPS);
    };

    // Memory monitoring (if available)
    const measureMemory = () => {
      if ("memory" in performance) {
        const memory = (performance as any).memory;
        setPerformanceMetrics((prev) => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize / memory.jsHeapSizeLimit,
        }));
      }
    };

    // Start monitoring
    animationId = requestAnimationFrame(measureFPS);
    const memoryInterval = setInterval(measureMemory, 5000);

    return () => {
      cancelAnimationFrame(animationId);
      clearInterval(memoryInterval);
    };
  }, []);

  return performanceMetrics;
}

/**
 * Performance-Optimized Image Component for Mobile
 */
interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality,
  placeholder = "empty",
  blurDataURL,
}: OptimizedImageProps) {
  const { connectionSpeed, isMobile } = useMobileOptimization();

  // Adaptive quality based on connection speed and device
  const getOptimalQuality = () => {
    if (quality) return quality;

    if (connectionSpeed === "slow") return 50;
    if (isMobile && connectionSpeed === "fast") return 75;
    return 85;
  };

  // Mobile-optimized sizes
  const getSizes = () => {
    if (isMobile) {
      return "(max-width: 768px) 100vw, 50vw";
    }
    return "(max-width: 1200px) 50vw, 33vw";
  };

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn("transition-opacity duration-300", className)}
      priority={priority}
      quality={getOptimalQuality()}
      sizes={getSizes()}
      placeholder={placeholder}
      blurDataURL={blurDataURL}
      loading={priority ? "eager" : "lazy"}
    />
  );
}

/**
 * Mobile-Optimized Form Component
 */
interface MobileFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
}

export function MobileForm({ children, onSubmit, className }: MobileFormProps) {
  const { isMobile } = useMobileOptimization();
  const { triggerHaptic } = useAdvancedGestures();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    triggerHaptic("medium");
    onSubmit(e);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "space-y-4",
        isMobile && "space-y-6", // More spacing on mobile
        className,
      )}
    >
      {children}
    </form>
  );
}

/**
 * Mobile-Optimized Input Component
 */
interface MobileInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export function MobileInput({
  label,
  error,
  className,
  type = "text",
  ...props
}: MobileInputProps) {
  const { isMobile } = useMobileOptimization();

  // Mobile-specific input attributes
  const getMobileAttributes = () => {
    const baseAttribs: any = {};

    if (isMobile) {
      // Prevent zoom on iOS
      if (type === "email" || type === "tel" || type === "url") {
        baseAttribs.style = { fontSize: "16px" };
      }

      // Mobile-specific input modes
      if (type === "email") baseAttribs.inputMode = "email";
      if (type === "tel") baseAttribs.inputMode = "tel";
      if (type === "number") baseAttribs.inputMode = "numeric";
    }

    return baseAttribs;
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-elite-obsidian-depth">
          {label}
        </label>
      )}
      <input
        type={type}
        className={cn(
          "w-full rounded-xl border border-quiet-stone px-4 py-3",
          "focus:border-elite-justice-indigo focus:ring-2 focus:ring-elite-justice-indigo/20",
          "transition-colors duration-200",
          isMobile && "min-h-[48px] text-base", // Touch-friendly height and prevent zoom
          error && "border-elite-crimson-urgency",
          className,
        )}
        {...getMobileAttributes()}
        {...props}
      />
      {error && <p className="text-sm text-elite-crimson-urgency">{error}</p>}
    </div>
  );
}

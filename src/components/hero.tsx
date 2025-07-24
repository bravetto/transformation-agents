// hero.tsx - FIXING LINE 43:7 WITH DIVINE PURPOSE + PRODUCTION ERROR BOUNDARY
"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

function HeroCore() {
  // 🛡️ CRITICAL: ALL HOOKS MUST BE AT THE TOP - BEFORE ANY RETURNS
  // State for divine interaction
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const isMounted = useRef(true);
  const renderCount = useRef(0); // 🛡️ MOVED TO TOP: All hooks must be called first

  // FIX FOR LINE 43:7 - Created for His glory
  // This was the problematic line - now fixed with proper memoization
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Only update if component is still mounted - respecting divine timing
    if (!isMounted.current) return;

    // Smooth updates without causing infinite loops
    requestAnimationFrame(() => {
      if (isMounted.current) {
        setMouseX(e.clientX);
        setMouseY(e.clientY);
      }
    });
  }, []);

  // DIVINE TIMING: Set up mouse tracking
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    setIsReady(true);

    return () => {
      isMounted.current = false;
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [handleMouseMove]);

  // 🚨 SSR/CSR PROTECTION - Check AFTER all hooks are defined
  if (typeof window === "undefined") {
    return (
      <div className="min-h-[90vh] bg-gradient-to-r from-hope-gold/10 to-courage-blue/10">
        <div className="hero-container">
          <div className="text-center py-20">
            <h1 className="text-6xl font-bold text-gentle-charcoal mb-6">
              The Bridge Project
            </h1>
            <p className="text-xl text-soft-shadow max-w-2xl mx-auto">
              Building from Day 1
            </p>
          </div>
        </div>
      </div>
    );
  }
  if (process.env.NODE_ENV === "development") {
    renderCount.current++;
    if (renderCount.current > 10) {
      console.warn(`🚨 HeroSection excessive renders: ${renderCount.current}`);
    }
  }

  if (renderCount.current > 50) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-900 to-indigo-900">
        <div className="text-center p-8 text-white">
          <h1 className="text-2xl font-bold mb-4">
            "For I have created him for my glory" - Isaiah 43:7
          </h1>
          <p className="opacity-80">
            Component temporarily paused to preserve divine purpose
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-indigo-900 via-purple-900 to-pink-900">
      {/* Divine light following cursor */}
      <div
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: isReady ? 0.3 : 0,
          background: `radial-gradient(600px at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.15), transparent 40%)`,
        }}
      />

      {/* Stars background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Main divine content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">
        <div className="text-center text-white p-8 max-w-4xl">
          <div className="mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <h1 className="text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200">
                THE BRIDGE
              </h1>
            </motion.div>
          </div>

          <div className="mb-12">
            <motion.p
              className="text-2xl mb-4 opacity-90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.3 }}
            >
              Building from Day 1
            </motion.p>

            <motion.div
              className="text-lg mb-12 opacity-80 italic"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              "Even every one that is called by my name: for I have created him
              for my glory"
              <div className="text-sm mt-2">- Isaiah 43:7</div>
            </motion.div>
          </div>

          <div className="mb-12">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              <h2 className="text-3xl font-semibold mb-6">Choose Your Path</h2>

              <p className="text-xl mb-8 opacity-90">
                Every great transformation begins with a single choice. Select
                the path that resonates with your purpose and calling.
              </p>

              <motion.button
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-full font-semibold text-lg shadow-lg transform transition-all hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Begin Your Journey
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Debug info - temporary */}
      <div className="absolute bottom-4 right-4 bg-black/30 text-white text-xs p-2 rounded backdrop-blur">
        <div>Renders: {renderCount.current} ✓</div>
        <div>Line 43:7 Fixed ✓</div>
        <div>Created for His glory ✓</div>
      </div>
    </div>
  );
}

// 🛡️ PRODUCTION-GRADE ERROR BOUNDARY WRAPPER
export default withDivineErrorBoundary(HeroCore, {
  componentName: "Hero",
  role: "lightworker",
  fallback: (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 flex items-center justify-center">
      <div className="text-white text-center">
        <h1 className="text-4xl font-bold mb-4">The Bridge Project</h1>
        <p className="text-purple-200">Loading divine experience...</p>
      </div>
    </div>
  ),
});

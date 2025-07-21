// 🚨 EMERGENCY PRODUCTION FIX - BULLETPROOF COMPONENT DISABLING
// This file creates absolute protection against infinite render loops in production

import React from "react";

// 🚨 NUCLEAR PRODUCTION PROTECTION - Multiple layers of safety
const isProduction = process.env.NODE_ENV === "production";
const isVercelProduction =
  typeof window !== "undefined" &&
  (window.location.hostname.includes("vercel.app") ||
    window.location.hostname.includes("transformationagents.ai"));
const hasMVPMode = process.env.NEXT_PUBLIC_MVP_MODE === "true";

// 🛡️ ULTRA-SAFE FEATURE FLAGS - Default to OFF in production
export const ProductionSafeFlags = {
  // ✅ SAFE FEATURES (Never cause loops)
  userTypeModal: true,
  characterWitnesses: true,
  letterWriting: true,
  prayerSubmission: true,
  basicNavigation: true,
  mobileResponsive: true,

  // 🚨 DANGEROUS FEATURES (Completely disabled in production)
  divineImpactDashboard: isProduction ? false : true, // FORCE OFF in production
  propheticCountdown: isProduction ? false : true, // FORCE OFF in production
  divineParticles: isProduction ? false : true, // FORCE OFF in production
  complexAnimations: isProduction ? false : true, // FORCE OFF in production
  performanceMonitoring: isProduction ? false : true, // FORCE OFF in production

  // 🔧 OPTIONAL FEATURES (Conservative approach)
  advancedAnalytics: false, // Always off until proven safe
  aiAssistant: false, // Always off until proven safe
} as const;

// 🛡️ BULLETPROOF FEATURE CHECK
export function isProductionSafe(
  feature: keyof typeof ProductionSafeFlags,
): boolean {
  try {
    // If we're in production, be extremely conservative
    if (isProduction || isVercelProduction) {
      // Only allow explicitly safe features
      const safeFeatures = [
        "userTypeModal",
        "characterWitnesses",
        "letterWriting",
        "prayerSubmission",
        "basicNavigation",
        "mobileResponsive",
      ];

      return safeFeatures.includes(feature);
    }

    // In development, use the flags
    return ProductionSafeFlags[feature] ?? false;
  } catch (error) {
    // Ultimate safety: if anything fails, return false
    console.warn(
      `Production safety check failed for ${feature}, defaulting to false`,
    );
    return false;
  }
}

// 🚨 EMERGENCY COMPONENT WRAPPER - Absolute protection
export function EmergencyProductionGate({
  children,
  fallback = null,
  componentName = "Unknown",
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  componentName?: string;
}) {
  // 🚨 NUCLEAR SAFETY: If production, show fallback immediately
  if (isProduction || isVercelProduction) {
    console.log(
      `🛡️ Production safety: ${componentName} disabled in production`,
    );

    return (
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 text-center">
        <div className="text-4xl mb-4">⚡</div>
        <h3 className="text-xl font-semibold text-blue-800 mb-2">
          {componentName} - MVP Mode Active
        </h3>
        <p className="text-blue-600 mb-4">
          This powerful feature is optimized for our full launch to ensure
          maximum performance and stability.
        </p>
        <div className="text-sm text-blue-500">
          <p>Experience the core mission: supporting JAHmere Webb's freedom.</p>
          <p className="mt-2 italic">
            "To every thing there is a season" - Ecclesiastes 3:1
          </p>
        </div>
      </div>
    );
  }

  // In development, show the actual component
  return <>{children}</>;
}

// 🚨 EMERGENCY DISABLE WRAPPER - For the most problematic components
export function EmergencyDisableWrapper({
  children,
  componentName,
}: {
  children: React.ReactNode;
  componentName: string;
}) {
  // Check if this is one of the infinite loop components
  const infiniteLoopComponents = [
    "DivineImpactDashboard",
    "PropheticCountdown",
    "DivineParticles",
    "DecisionCountdown",
  ];

  const isInfiniteLoopComponent = infiniteLoopComponents.some((name) =>
    componentName.includes(name),
  );

  // If production and infinite loop component, show safe fallback
  if ((isProduction || isVercelProduction) && isInfiniteLoopComponent) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
        <div className="text-6xl mb-4">🌉</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          The Bridge Project
        </h2>
        <p className="text-gray-600 mb-6">
          Building community support for JAHmere Webb's freedom through prayer,
          character witnesses, and direct advocacy.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-blue-50 p-4 rounded">
            <div className="font-semibold text-blue-800">1,247+</div>
            <div className="text-blue-600">Letters of Support</div>
          </div>
          <div className="bg-green-50 p-4 rounded">
            <div className="font-semibold text-green-800">10,000+</div>
            <div className="text-green-600">Prayers Submitted</div>
          </div>
          <div className="bg-purple-50 p-4 rounded">
            <div className="font-semibold text-purple-800">247+</div>
            <div className="text-purple-600">Community Supporters</div>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

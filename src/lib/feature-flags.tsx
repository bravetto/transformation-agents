// 🚀 MVP Feature Flag System - Surgical Extraction
// This allows us to hide complex features causing console noise
// while preserving all functionality for enterprise development

import React from "react";

export interface FeatureFlags {
  // 🎯 MVP CORE FEATURES (Always On)
  userTypeModal: boolean;
  characterWitnesses: boolean;
  letterWriting: boolean;
  prayerSubmission: boolean;
  basicNavigation: boolean;
  mobileResponsive: boolean;

  // 🔧 ENTERPRISE FEATURES (MVP Hidden)
  divineImpactDashboard: boolean;
  propheticCountdown: boolean;
  divineParticles: boolean;
  analyticsTracking: boolean;
  performanceMonitoring: boolean;
  complexAnimations: boolean;

  // 🚀 PROGRESSIVE ROLLOUT
  aiAssistant: boolean;
  advancedAnalytics: boolean;
  enterpriseIntegrations: boolean;
}

// 🎯 MVP Configuration - Clean, Simple, Functional
const MVP_MODE =
  process.env.NEXT_PUBLIC_MVP_MODE === "true" ||
  (typeof window !== "undefined" && window.location.hostname.includes("mvp"));

export const featureFlags: FeatureFlags = {
  // 🎯 MVP ESSENTIALS (Always work, zero console noise)
  userTypeModal: true,
  characterWitnesses: true,
  letterWriting: true,
  prayerSubmission: true,
  basicNavigation: true,
  mobileResponsive: true,

  // 🔧 ENTERPRISE FEATURES (Hidden in MVP mode to eliminate console noise)
  divineImpactDashboard: !MVP_MODE, // Major source of hydration errors
  propheticCountdown: !MVP_MODE, // Render loop issues
  divineParticles: !MVP_MODE, // WebGL complexity
  analyticsTracking: !MVP_MODE, // 404 errors from endpoints
  performanceMonitoring: !MVP_MODE, // Memory API browser compat
  complexAnimations: !MVP_MODE, // React animation issues

  // 🚀 PROGRESSIVE FEATURES (Controlled rollout)
  aiAssistant: process.env.NEXT_PUBLIC_AI_ENABLED === "true",
  advancedAnalytics: process.env.NEXT_PUBLIC_ADVANCED_ANALYTICS === "true",
  enterpriseIntegrations: process.env.NEXT_PUBLIC_ENTERPRISE === "true",
};

// 🛡️ Safe Feature Check Function
export function isFeatureEnabled(feature: keyof FeatureFlags): boolean {
  try {
    return featureFlags[feature] || false;
  } catch (error) {
    // Fail safe - if feature flag system breaks, default to false
    console.warn(
      `Feature flag check failed for ${feature}, defaulting to false`,
    );
    return false;
  }
}

// 🎯 MVP Mode Detection
export function isMVPMode(): boolean {
  return MVP_MODE;
}

// 🚀 Feature Flag Wrapper Components
export function FeatureGate({
  feature,
  children,
  fallback = null,
}: {
  feature: keyof FeatureFlags;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  if (!isFeatureEnabled(feature)) {
    return fallback;
  }

  return children;
}

// 🎯 MVP-Specific Coming Soon Component
export function ComingSoonCard({
  feature,
  title,
  description,
}: {
  feature: string;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 text-center">
      <div className="text-4xl mb-4">✨</div>
      <h3 className="text-xl font-semibold text-blue-800 mb-2">{title}</h3>
      <p className="text-blue-600 mb-4">{description}</p>
      <div className="text-sm text-blue-500">
        <p>This powerful feature is being refined for our full launch.</p>
        <p className="mt-2 italic">
          "To every thing there is a season" - Ecclesiastes 3:1
        </p>
      </div>
    </div>
  );
}

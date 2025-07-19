import dynamic from "next/dynamic";

/**
 * 🚀 OPTIMIZED COMPONENT LOADING SYSTEM
 * Intelligent preloading and priority-based loading
 */

// Optimized component definitions for The Bridge Project
export const OptimizedComponents = {
  // Critical path components (above the fold)
  Hero: dynamic(() => import("@/components/hero"), {
    ssr: true,
    loading: () => (
      <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-pure-white">
        <div className="hero-container flex flex-col items-center justify-center">
          <div className="w-full h-16 bg-soft-cloud/30 rounded-lg animate-pulse mb-6"></div>
          <div className="w-3/4 h-12 bg-soft-cloud/30 rounded-lg animate-pulse mb-4"></div>
          <div className="w-1/2 h-8 bg-soft-cloud/30 rounded-lg animate-pulse mb-8"></div>
        </div>
      </div>
    ),
  }),

  UserTypeModal: dynamic(() => import("@/components/user-type-modal"), {
    ssr: false,
    loading: () => null,
  }),

  Navigation: dynamic(() => import("@/components/navigation"), {
    ssr: true,
    loading: () => (
      <div className="min-h-[60px] animate-pulse bg-gray-100/10 rounded-md"></div>
    ),
  }),

  // High priority components (important for user journey)
  DivineImpactDashboard: dynamic(
    () => import("@/components/divine-impact-dashboard"),
    {
      ssr: false,
      loading: () => (
        <div className="w-full h-96 bg-soft-cloud/30 rounded-lg animate-pulse flex items-center justify-center">
          <div className="text-gentle-charcoal">
            Loading Impact Dashboard...
          </div>
        </div>
      ),
    },
  ),

  DivineLetterForm: dynamic(() => import("@/components/divine-letter-form"), {
    ssr: false,
    loading: () => (
      <div className="max-w-5xl mx-auto">
        <div className="p-12 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-elite-divine-amber/20 rounded w-1/3 mx-auto"></div>
            <div className="h-32 bg-elite-platinum-truth rounded"></div>
          </div>
        </div>
      </div>
    ),
  }),

  // Medium priority components (below the fold)
  DecisionCountdown: dynamic(() => import("@/components/decision-countdown"), {
    ssr: false,
    loading: () => (
      <div className="w-full h-32 bg-soft-cloud/30 rounded-lg animate-pulse"></div>
    ),
  }),

  // Low priority components (non-critical features)
  SocialAmplification: dynamic(
    () => import("@/components/social-amplification"),
    {
      ssr: false,
      loading: () => (
        <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
      ),
    },
  ),

  // Idle priority components (load when browser is idle)
  AnalyticsDashboard: dynamic(() => import("@/app/analytics-dashboard/page"), {
    ssr: false,
    loading: () => (
      <div className="min-h-[300px] animate-pulse bg-gray-100/10 rounded-md"></div>
    ),
  }),
};

// Intelligent preloading system
export function initializePreloading(): void {
  if (typeof window === "undefined") return;

  // Preload critical components on user interaction
  const preloadOnInteraction = (
    componentName: string,
    importFn: () => Promise<any>,
  ) => {
    const handleInteraction = () => {
      importFn().catch((error) => {
        console.warn(`Failed to preload: ${componentName}`, error);
      });
      // Remove listeners after first interaction
      document.removeEventListener("mouseover", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("mouseover", handleInteraction, { once: true });
    document.addEventListener("touchstart", handleInteraction, { once: true });
  };

  const preloadOnIdle = (
    componentName: string,
    importFn: () => Promise<any>,
  ) => {
    if ("requestIdleCallback" in window) {
      requestIdleCallback(() => {
        importFn().catch((error) => {
          console.warn(`Failed to preload: ${componentName}`, error);
        });
      });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        importFn().catch((error) => {
          console.warn(`Failed to preload: ${componentName}`, error);
        });
      }, 100);
    }
  };

  // Preload high priority components on interaction
  preloadOnInteraction(
    "DivineLetterForm",
    () => import("@/components/divine-letter-form"),
  );

  preloadOnInteraction(
    "DivineImpactDashboard",
    () => import("@/components/divine-impact-dashboard"),
  );

  // Preload non-critical components when browser is idle
  preloadOnIdle(
    "SocialAmplification",
    () => import("@/components/social-amplification"),
  );
}

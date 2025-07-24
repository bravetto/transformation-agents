/**
 * 🚀 SPECULATION RULES API IMPLEMENTATION
 * Predictive preloading for optimal Core Web Vitals
 */

import { useEffect, useMemo } from "react";

interface SpeculationRule {
  source: "list" | "document";
  where?: { href_matches?: string; selector_matches?: string };
  urls?: string[];
  eagerness?: "conservative" | "moderate" | "eager";
}

interface SpeculationRulesConfig {
  enablePrefetch: boolean;
  enablePrerender: boolean;
  preloadCriticalPaths: string[];
  prerenderPaths: string[];
  eagerness: "conservative" | "moderate" | "eager";
}

const DEFAULT_CONFIG: SpeculationRulesConfig = {
  enablePrefetch: true,
  enablePrerender: true,
  preloadCriticalPaths: [
    "/people/jahmere-webb",
    "/letter-portal",
    "/analytics-dashboard",
  ],
  prerenderPaths: [
    "/people/jahmere-webb", // Most important page
  ],
  eagerness: "moderate",
};

/**
 * Speculation Rules Component for The Bridge Project
 */
export function SpeculationRules({
  config = DEFAULT_CONFIG,
}: {
  config?: Partial<SpeculationRulesConfig>;
}) {
  useEffect(() => {
    const finalConfig = { ...DEFAULT_CONFIG, ...config };
    // Check if Speculation Rules API is supported
    if (!("HTMLScriptElement" in window) || !HTMLScriptElement.supports) {
      console.log(
        "Speculation Rules API not supported, using fallback prefetching",
      );
      fallbackPrefetch(finalConfig.preloadCriticalPaths);
      return;
    }

    // Check specific support for speculation rules
    if (!HTMLScriptElement.supports("speculationrules")) {
      console.log(
        "Speculation Rules not supported, using fallback prefetching",
      );
      fallbackPrefetch(finalConfig.preloadCriticalPaths);
      return;
    }

    try {
      // Create prefetch rules
      if (
        finalConfig.enablePrefetch &&
        finalConfig.preloadCriticalPaths.length > 0
      ) {
        const prefetchScript = createSpeculationScript({
          prefetch: [
            {
              source: "list",
              urls: finalConfig.preloadCriticalPaths,
              eagerness: finalConfig.eagerness,
            },
          ],
        });
        document.head.appendChild(prefetchScript);
      }

      // Create prerender rules
      if (
        finalConfig.enablePrerender &&
        finalConfig.prerenderPaths.length > 0
      ) {
        const prerenderScript = createSpeculationScript({
          prerender: [
            {
              source: "list",
              urls: finalConfig.prerenderPaths,
              eagerness: "conservative", // Prerender is more expensive
            },
          ],
        });
        document.head.appendChild(prerenderScript);
      }

      // Dynamic rules based on user behavior
      if (finalConfig.enablePrefetch) {
        addDynamicRules();
      }

      console.log("🚀 Speculation Rules configured successfully");
    } catch (error) {
      console.warn("Error setting up Speculation Rules:", error);
      fallbackPrefetch(finalConfig.preloadCriticalPaths);
    }
  }, [config]);

  return null; // This component doesn't render anything
}

function createSpeculationScript(
  rules: Record<string, SpeculationRule[]>,
): HTMLScriptElement {
  const script = document.createElement("script");
  script.type = "speculationrules";
  script.textContent = JSON.stringify(rules, null, 2);
  return script;
}

function addDynamicRules(): void {
  // Prefetch people pages on hover
  const peopleLinks = document.querySelectorAll('a[href^="/people/"]');
  peopleLinks.forEach((link) => {
    link.addEventListener(
      "mouseenter",
      () => {
        const href = (link as HTMLAnchorElement).href;
        if (href && !document.querySelector(`link[href="${href}"]`)) {
          const prefetchLink = document.createElement("link");
          prefetchLink.rel = "prefetch";
          prefetchLink.href = href;
          document.head.appendChild(prefetchLink);
        }
      },
      { once: true },
    );
  });

  // Aggressive prefetch for letter portal on interaction
  const letterPortalTriggers = document.querySelectorAll(
    "[data-letter-trigger]",
  );
  letterPortalTriggers.forEach((trigger) => {
    trigger.addEventListener(
      "mouseenter",
      () => {
        const prerenderScript = createSpeculationScript({
          prerender: [
            {
              source: "list",
              urls: ["/letter-portal"],
              eagerness: "eager",
            },
          ],
        });
        document.head.appendChild(prerenderScript);
      },
      { once: true },
    );
  });
}

function fallbackPrefetch(urls: string[]): void {
  urls.forEach((url) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = url;
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });
}

/**
 * Hook for dynamic speculation rules
 */
export function useSpeculationRules() {
  const usePrefetchOnHover = (selector: string) => {
    useEffect(() => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        element.addEventListener(
          "mouseenter",
          () => {
            const href = (element as HTMLAnchorElement).href;
            if (href) {
              const link = document.createElement("link");
              link.rel = "prefetch";
              link.href = href;
              document.head.appendChild(link);
            }
          },
          { once: true },
        );
      });
    }, [selector]);
  };

  const prerenderOnIntent = (url: string) => {
    if (!HTMLScriptElement.supports?.("speculationrules")) {
      return;
    }

    const script = createSpeculationScript({
      prerender: [
        {
          source: "list",
          urls: [url],
          eagerness: "eager",
        },
      ],
    });
    document.head.appendChild(script);
  };

  return { usePrefetchOnHover, prerenderOnIntent };
}

/**
 * Optimized Speculation Rules for Bridge Project
 */
export const BRIDGE_SPECULATION_CONFIG: SpeculationRulesConfig = {
  enablePrefetch: true,
  enablePrerender: true,
  preloadCriticalPaths: [
    "/people/jahmere-webb",
    "/people/coach-dungy",
    "/people/michael-mataluni",
    "/letter-portal",
    "/analytics-dashboard",
    "/impact-dashboard-test",
  ],
  prerenderPaths: [
    "/people/jahmere-webb", // Most critical path
  ],
  eagerness: "moderate",
};

export default SpeculationRules;

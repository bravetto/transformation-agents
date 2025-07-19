"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { RefreshCw, AlertTriangle, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const CacheBuster = () => {
  const [showCacheBuster, setShowCacheBuster] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [cleared, setCleared] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Divine hydration protection - ensure client-side only
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return; // Divine protection against SSR

    // Check if user might be seeing cached content
    const checkForOldContent = () => {
      try {
        // Divine safety checks
        if (typeof document === "undefined" || !document.body) return;

        // Look for July 9 references that should now be July 28
        const july9References =
          document.querySelectorAll("*").length > 0 &&
          document.body.innerText.includes("July 9") &&
          !window.location.pathname.includes("july-9-strategy");

        if (july9References) {
          setShowCacheBuster(true);
        }
      } catch (error) {
        console.warn("Divine cache check protection:", error);
      }
    };

    // Check after a short delay to allow page to load
    const timeoutId = setTimeout(checkForOldContent, 2000);

    // Divine cleanup
    return () => clearTimeout(timeoutId);
  }, [isClient]);

  const clearAllCaches = async () => {
    if (!isClient) return; // Divine protection

    setIsClearing(true);

    try {
      // 🚨 CRITICAL SSR FIX: Only run in browser environment
      if (typeof window === "undefined" || typeof navigator === "undefined") {
        console.warn(
          "Divine protection: Cache clearing only available in browser",
        );
        return;
      }

      // Clear localStorage with divine protection
      if (typeof localStorage !== "undefined") {
        localStorage.clear();
      }

      // Clear sessionStorage with divine protection
      if (typeof sessionStorage !== "undefined") {
        sessionStorage.clear();
      }

      // 🚨 CRITICAL SSR FIX: Check caches API availability
      if (typeof window !== "undefined" && "caches" in window) {
        const cacheNames = await caches.keys();
        await Promise.all(
          cacheNames.map((cacheName) => caches.delete(cacheName)),
        );
      }

      // 🚨 CRITICAL SSR FIX: Check navigator and serviceWorker availability
      if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(
          registrations.map((registration) => registration.unregister()),
        );
      }

      setCleared(true);

      // Reload page after clearing with divine timing
      setTimeout(() => {
        if (typeof window !== "undefined") {
          window.location.reload();
        }
      }, 1500);
    } catch (error) {
      console.error("Divine cache clearing protection:", error);
      // Force reload anyway with divine protection
      if (typeof window !== "undefined") {
        window.location.reload();
      }
    }
  };

  // Divine protection - only render on client side
  if (!isClient || !showCacheBuster) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 50 }}
        className="fixed bottom-4 right-4 z-50 max-w-sm"
      >
        <Card className="p-4 bg-amber-50 border-amber-200 shadow-lg">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="font-semibold text-amber-800 mb-2">
                Seeing old content?
              </h3>
              <p className="text-sm text-amber-700 mb-3">
                Court date updated to July 28th. Clear cache to see latest
                strategy.
              </p>

              {!cleared ? (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={clearAllCaches}
                    disabled={isClearing}
                    className="bg-amber-600 hover:bg-amber-700 text-white"
                  >
                    {isClearing ? (
                      <>
                        <RefreshCw className="w-3 h-3 mr-1 animate-spin" />
                        Clearing...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-3 h-3 mr-1" />
                        Clear Cache
                      </>
                    )}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setShowCacheBuster(false)}
                    className="text-amber-700 border-amber-300"
                  >
                    Dismiss
                  </Button>
                </div>
              ) : (
                <div className="flex items-center gap-2 text-green-700">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    Cache cleared! Reloading...
                  </span>
                </div>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    </AnimatePresence>
  );
};

export default CacheBuster;

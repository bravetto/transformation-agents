"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Terminal,
  Lock,
  Unlock,
  Code2,
  Bug,
  Sparkles,
  Settings,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import { logger } from "@/lib/logger";

// Developer routes registry
const DEV_ROUTES = {
  test: {
    label: "Test Suite",
    icon: Code2,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    routes: [
      {
        path: "/test-logo-assets",
        name: "Logo & Assets Test",
        description: "Test logo and asset loading",
      },
      {
        path: "/test-animations",
        name: "Animation Test Suite",
        description: "Test all animations",
      },
      {
        path: "/test-components",
        name: "Component Library",
        description: "Browse component examples",
      },
      {
        path: "/component-showcase",
        name: "Component Showcase",
        description: "Interactive component demo",
      },
      {
        path: "/particles-test",
        name: "Particles Test",
        description: "Test particle effects",
      },
      {
        path: "/countdown-test",
        name: "Countdown Test",
        description: "Test countdown component",
      },
    ],
  },
  admin: {
    label: "Admin",
    icon: Settings,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    routes: [
      {
        path: "/admin/analytics",
        name: "Analytics Dashboard",
        description: "View site analytics",
      },
      {
        path: "/admin/settings",
        name: "System Settings",
        description: "Configure system settings",
      },
      {
        path: "/dashboard/judge",
        name: "Judge Dashboard",
        description: "Divine impact dashboard",
      },
      {
        path: "/impact-dashboard-test",
        name: "Impact Dashboard Test",
        description: "Test impact metrics",
      },
      {
        path: "/clickup-crm-demo",
        name: "ClickUp CRM Demo",
        description: "CRM integration demo",
      },
    ],
  },
  debug: {
    label: "Debug",
    icon: Bug,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    routes: [
      {
        path: "/debug/performance",
        name: "Performance Monitor",
        description: "Monitor app performance",
      },
      {
        path: "/debug/errors",
        name: "Error Log Viewer",
        description: "View error logs",
      },
      {
        path: "/test-recovery",
        name: "Error Recovery Test",
        description: "Test error boundaries",
      },
      {
        path: "/reset",
        name: "Reset Page",
        description: "Reset application state",
      },
    ],
  },
  experimental: {
    label: "Experimental",
    icon: Sparkles,
    color: "text-green-400",
    bgColor: "bg-green-500/10",
    borderColor: "border-green-500/20",
    routes: [
      {
        path: "/experimental/ai-chat",
        name: "AI Chat Interface",
        description: "Experimental AI features",
      },
      {
        path: "/story-amplifier-demo",
        name: "Story Amplifier",
        description: "Story amplification demo",
      },
      {
        path: "/prompt-demo",
        name: "Prompt Generator",
        description: "AI prompt generation",
      },
      {
        path: "/letter-form-test",
        name: "Letter Form Test",
        description: "Test letter submission",
      },
      {
        path: "/people/jahmere-webb",
        name: "JAHmere Profile",
        description: "JAHmere Webb profile page",
      },
      {
        path: "/people/coach-dungy",
        name: "Coach Dungy Profile",
        description: "Coach Dungy profile page",
      },
      {
        path: "/people/jordan-dungy",
        name: "Jordan Dungy Profile",
        description: "Jordan Dungy profile page",
      },
      {
        path: "/letter-to-dungy",
        name: "Letter to Dungy",
        description: "Letter to Coach Dungy",
      },
    ],
  },
};

// Konami Code sequence
const KONAMI_CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

interface DevPortalContextType {
  isUnlocked: boolean;
  isOpen: boolean;
  togglePortal: () => void;
  lockPortal: () => void;
}

const DevPortalContext = createContext<DevPortalContextType>({
  isUnlocked: false,
  isOpen: false,
  togglePortal: () => {},
  lockPortal: () => {},
});

export const useDevPortal = () => useContext(DevPortalContext);

interface DevPortalProviderProps {
  children: React.ReactNode;
}

function DevPortalProviderComponent({ children }: DevPortalProviderProps) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [konamiIndex, setKonamiIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isFirstUnlock, setIsFirstUnlock] = useState(false);

  // Load unlock state from localStorage
  useEffect(() => {
    const unlocked = localStorage.getItem("dev-portal-unlocked") === "true";
    const hasSeenPortal = localStorage.getItem("dev-portal-seen") === "true";

    if (unlocked) {
      setIsUnlocked(true);
      if (!hasSeenPortal) {
        setIsFirstUnlock(true);
      }
      logger.divine("🔓 Developer Mode Unlocked");
    } else {
      logger.info("🎮 Developer Mode Available");
      logger.info("Enter the Konami Code to unlock: ↑ ↑ ↓ ↓ ← → ← → B A");
    }
  }, []);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      // Only process if dev portal is active
      if (!isUnlocked) return;

      const key = e.key.toLowerCase();

      logger.debug("DevPortal key pressed", {
        key,
        currentSequence: konamiIndex,
      });

      if (konamiIndex === 0) {
        logger.debug("Starting new sequence with key", key);
        setKonamiIndex(1);
        return;
      }

      logger.debug("Current sequence", konamiIndex);

      const currentIndex = konamiIndex;
      const expectedKey = KONAMI_CODE[currentIndex];

      if (key === expectedKey) {
        const newSequence = currentIndex + 1;
        setKonamiIndex(newSequence);

        logger.debug("Correct key pressed", {
          expected: expectedKey,
          got: key,
        });

        if (newSequence === KONAMI_CODE.length) {
          logger.divine("🎉 Developer Mode Unlocked!");
          setIsUnlocked(true);
          setShowCelebration(true);
          localStorage.setItem("dev-portal-unlocked", "true");
          setKonamiIndex(0);

          // Auto-open portal after celebration
          setTimeout(() => {
            setShowCelebration(false);
            setIsOpen(true);
            localStorage.setItem("dev-portal-seen", "true");
          }, 2000);

          logger.divine("Press Ctrl+Shift+D to open portal");
        }
      } else {
        logger.debug("Wrong key, resetting sequence", {
          expected: expectedKey,
          got: key,
        });
        setKonamiIndex(0);
      }
    },
    [isUnlocked, konamiIndex],
  );

  useEffect(() => {
    logger.debug("DevPortal: Event listener attached");

    window.addEventListener("keydown", handleKeyPress);

    return () => {
      logger.debug("DevPortal: Event listener removed");
      window.removeEventListener("keydown", handleKeyPress);
    };
  }, [handleKeyPress]);

  const togglePortal = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (!localStorage.getItem("dev-portal-seen")) {
      localStorage.setItem("dev-portal-seen", "true");
    }
  }, []);

  const lockPortal = useCallback(() => {
    setIsUnlocked(false);
    setIsOpen(false);
    localStorage.removeItem("dev-portal-unlocked");
    localStorage.removeItem("dev-portal-seen");
    logger.info("🔒 Developer Mode Locked");
  }, []);

  return (
    <DevPortalContext.Provider
      value={{ isUnlocked, isOpen, togglePortal, lockPortal }}
    >
      {children}
      {isUnlocked && <DevPortalUI isFirstUnlock={isFirstUnlock} />}

      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", duration: 0.6 }}
              className="bg-gray-900 border-4 border-green-400 rounded-2xl p-8 shadow-2xl"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: 3, duration: 0.5 }}
              >
                <Terminal className="w-24 h-24 text-green-400 mx-auto mb-4" />
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl font-bold text-green-400 text-center"
              >
                Developer Mode Unlocked!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-gray-400 text-center mt-2"
              >
                Welcome to the Matrix...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DevPortalContext.Provider>
  );
}

export const DevPortalProvider = withErrorBoundary(
  DevPortalProviderComponent,
  "DevPortalProvider",
  <div>Loading DevPortal...</div>
);

interface DevPortalUIProps {
  isFirstUnlock?: boolean;
}

function DevPortalUI({ isFirstUnlock }: DevPortalUIProps) {
  const { isOpen, togglePortal, lockPortal } = useDevPortal();
  const router = useRouter();
  const [showNewBadge, setShowNewBadge] = useState(isFirstUnlock);

  useEffect(() => {
    if (showNewBadge) {
      const timer = setTimeout(() => setShowNewBadge(false), 10000);
      return () => clearTimeout(timer);
    }
  }, [showNewBadge]);

  const handleNavigate = (path: string) => {
    router.push(path);
    togglePortal();
  };

  return (
    <>
      {/* Floating Terminal Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={togglePortal}
            className="fixed bottom-6 right-6 z-[9998] p-4 bg-gray-900 border border-gray-700 rounded-full shadow-2xl hover:bg-gray-800 transition-colors group"
          >
            <Terminal className="w-6 h-6 text-green-400" />

            {/* Pulsing glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full bg-green-400/20"
              animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
            />

            {/* NEW badge */}
            {showNewBadge && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold"
              >
                NEW
              </motion.span>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Developer Portal Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={togglePortal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden bg-gray-900 border border-gray-700 rounded-2xl shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between p-6 bg-gray-900/95 backdrop-blur border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <Terminal className="w-8 h-8 text-green-400" />
                  <h2 className="text-2xl font-bold text-white">
                    Developer Portal
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={lockPortal}
                    className="p-2 text-gray-400 hover:text-red-400 transition-colors"
                    title="Lock Developer Mode"
                  >
                    <Lock className="w-5 h-5" />
                  </button>
                  <button
                    onClick={togglePortal}
                    className="p-2 text-gray-400 hover:text-white transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Route Categories */}
              <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-88px)]">
                {Object.entries(DEV_ROUTES).map(
                  ([
                    category,
                    { label, icon: Icon, color, bgColor, borderColor, routes },
                  ]) => (
                    <div key={category} className="space-y-3">
                      <div className="flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${color}`} />
                        <h3 className={`text-lg font-semibold ${color}`}>
                          {label}
                        </h3>
                      </div>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {routes.map((route) => (
                          <motion.button
                            key={route.path}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleNavigate(route.path)}
                            className={`p-4 text-left ${bgColor} border ${borderColor} rounded-lg hover:bg-gray-800/50 transition-all`}
                          >
                            <div className="space-y-1">
                              <h4 className="font-medium text-white">
                                {route.name}
                              </h4>
                              <p className="text-sm text-gray-400">
                                {route.path}
                              </p>
                              <p className="text-xs text-gray-500">
                                {route.description}
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* Footer */}
              <div className="sticky bottom-0 p-4 bg-gray-900/95 backdrop-blur border-t border-gray-800">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span>Press Ctrl+Shift+D to toggle</span>
                  <span className="flex items-center gap-1">
                    <Unlock className="w-3 h-3" />
                    Developer Mode Active
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Crown, Heart, Star, Sparkles, Zap, Gift } from "lucide-react";

/**
 * 🥚 DIVINE EASTER EGG SYSTEM
 * "God is Risen" - Hidden Treasures Throughout the Bridge Project
 *
 * This system creates an incredible engagement experience by hiding
 * divine easter eggs throughout the website. Each discovery is a
 * divine remembrance and opportunity for deeper connection.
 */

// Define the Easter Egg interface
interface EasterEgg {
  id: string;
  type: "text" | "image" | "interaction" | "sequence" | "konami" | "console";
  location: string;
  trigger:
    | "click"
    | "hover"
    | "scroll"
    | "time"
    | "keysequence"
    | "console-error"
    | "service-worker";
  message: string;
  biblicalReference?: string;
  discoveryReward: string;
  isFound: boolean;
  difficulty: "easy" | "medium" | "hard" | "divine";
}

// Context interface
interface EasterEggContextType {
  eggs: EasterEgg[];
  foundEggs: string[];
  totalEggs: number;
  discoveryProgress: number;
  discoverEgg: (eggId: string) => void;
  resetProgress: () => void;
  isAllFound: boolean;
}

// Default easter eggs configuration
const defaultEggs: EasterEgg[] = [
  // Easy (3)
  {
    id: "logo-hover",
    type: "interaction",
    location: "Navigation logo",
    trigger: "hover",
    message: "He is Risen indeed! 🌅",
    biblicalReference: "Luke 24:6",
    discoveryReward: "The stone has been rolled away!",
    isFound: false,
    difficulty: "easy",
  },
  {
    id: "footer-cross",
    type: "interaction",
    location: "Footer cross symbol",
    trigger: "click",
    message: "By His stripes we are healed! ✝️",
    biblicalReference: "Isaiah 53:5",
    discoveryReward: "The cross leads to resurrection!",
    isFound: false,
    difficulty: "easy",
  },
  {
    id: "hero-scroll",
    type: "interaction",
    location: "Hero section scroll",
    trigger: "scroll",
    message: "God makes all things new! ✨",
    biblicalReference: "Revelation 21:5",
    discoveryReward: "New beginnings await!",
    isFound: false,
    difficulty: "easy",
  },

  // Medium (3)
  {
    id: "jahmere-triple-click",
    type: "interaction",
    location: "JAHmere photo",
    trigger: "click",
    message: "Freedom comes to those who wait on the Lord! 🕊️",
    biblicalReference: "Isaiah 40:31",
    discoveryReward: "Wings like eagles!",
    isFound: false,
    difficulty: "medium",
  },
  {
    id: "countdown-hover",
    type: "interaction",
    location: "Countdown timer",
    trigger: "hover",
    message: "His timing is perfect! ⏰",
    biblicalReference: "Ecclesiastes 3:1",
    discoveryReward: "Divine timing revealed!",
    isFound: false,
    difficulty: "medium",
  },
  {
    id: "bridge-scroll",
    type: "interaction",
    location: "Bridge metaphor section",
    trigger: "scroll",
    message: "Jesus is the bridge to freedom! 🌉",
    biblicalReference: "John 14:6",
    discoveryReward: "The way, truth, and life!",
    isFound: false,
    difficulty: "medium",
  },

  // Hard (3)
  {
    id: "konami-code",
    type: "sequence",
    location: "Global keyboard",
    trigger: "keysequence",
    message: "God's love is the ultimate cheat code! 🎮",
    biblicalReference: "Romans 8:28",
    discoveryReward: "All things work for good!",
    isFound: false,
    difficulty: "hard",
  },
  {
    id: "trinity-click",
    type: "sequence",
    location: "Three sacred elements",
    trigger: "click",
    message: "Father, Son, Holy Spirit - perfect unity! 🙏",
    biblicalReference: "Matthew 28:19",
    discoveryReward: "Trinity blessing activated!",
    isFound: false,
    difficulty: "hard",
  },
  {
    id: "scripture-cipher",
    type: "interaction",
    location: "Hidden scripture elements",
    trigger: "click",
    message: "The Word is hidden in our hearts! 📖",
    biblicalReference: "Psalm 119:11",
    discoveryReward: "Scripture treasure unlocked!",
    isFound: false,
    difficulty: "hard",
  },

  // Divine (3)
  {
    id: "resurrection-time",
    type: "interaction",
    location: "Time-based trigger",
    trigger: "time",
    message: "He rose at dawn, bringing eternal hope! 🌅",
    biblicalReference: "Mark 16:2",
    discoveryReward: "Resurrection power activated!",
    isFound: false,
    difficulty: "divine",
  },
  {
    id: "prayer-activation",
    type: "interaction",
    location: "Prayer elements",
    trigger: "click",
    message: "Prayer moves mountains and opens prison doors! ⛰️",
    biblicalReference: "Acts 16:26",
    discoveryReward: "Chains broken by prayer!",
    isFound: false,
    difficulty: "divine",
  },
  {
    id: "synchronicity-complete",
    type: "console",
    location: "Divine synchronicity",
    trigger: "console-error",
    message: "Even errors proclaim His glory! 🎯",
    biblicalReference: "Romans 8:28",
    discoveryReward: "Divine synchronicity revealed!",
    isFound: false,
    difficulty: "divine",
  },
];

// Create the context
const EasterEggContext = createContext<EasterEggContextType | undefined>(
  undefined,
);

// Provider component
export function EasterEggProvider({ children }: { children: React.ReactNode }) {
  const [eggs, setEggs] = useState<EasterEgg[]>(defaultEggs);
  const [foundEggs, setFoundEggs] = useState<string[]>([]);

  // Load found eggs from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("bridge-project-easter-eggs");
    if (saved) {
      try {
        const savedEggs = JSON.parse(saved);
        setFoundEggs(savedEggs);
        setEggs((prev) =>
          prev.map((egg) => ({
            ...egg,
            isFound: savedEggs.includes(egg.id),
          })),
        );
      } catch (error) {
        console.error("Error loading saved easter eggs:", error);
      }
    }
  }, []);

  // Save found eggs to localStorage
  useEffect(() => {
    localStorage.setItem(
      "bridge-project-easter-eggs",
      JSON.stringify(foundEggs),
    );
  }, [foundEggs]);

  const discoverEgg = useCallback(
    (eggId: string) => {
      if (!foundEggs.includes(eggId)) {
        setFoundEggs((prev) => [...prev, eggId]);
        setEggs((prev) =>
          prev.map((egg) =>
            egg.id === eggId ? { ...egg, isFound: true } : egg,
          ),
        );

        // Track analytics if available
        if (typeof window !== "undefined" && "gtag" in window) {
          (window as any).gtag("event", "easter_egg_discovered", {
            event_category: "engagement",
            event_label: eggId,
            value: 1,
          });
        }
      }
    },
    [foundEggs],
  );

  const resetProgress = useCallback(() => {
    setFoundEggs([]);
    setEggs((prev) => prev.map((egg) => ({ ...egg, isFound: false })));
    localStorage.removeItem("bridge-project-easter-eggs");
  }, []);

  const totalEggs = eggs.length;
  const discoveryProgress = foundEggs.length / totalEggs;
  const isAllFound = foundEggs.length === totalEggs;

  return (
    <EasterEggContext.Provider
      value={{
        eggs,
        foundEggs,
        totalEggs,
        discoveryProgress,
        discoverEgg,
        resetProgress,
        isAllFound,
      }}
    >
      {children}
      <July28thCountdown />
      <EasterEggTracker />
      <KonamiCodeEgg />
      <ResurrectionCelebration />
      <TimeBasedEgg />
      <SynchronicityEgg>
        <div></div>
      </SynchronicityEgg>
    </EasterEggContext.Provider>
  );
}

// Hook to use the context
export function useEasterEggs() {
  const context = useContext(EasterEggContext);
  if (context === undefined) {
    throw new Error("useEasterEggs must be used within an EasterEggProvider");
  }
  return context;
}

// Individual Easter Egg wrapper component
interface EasterEggProps {
  eggId: string;
  children: React.ReactNode;
  className?: string;
}

export function EasterEgg({ eggId, children, className = "" }: EasterEggProps) {
  const { eggs, discoverEgg } = useEasterEggs();
  const egg = eggs.find((e) => e.id === eggId);

  if (!egg) return <>{children}</>;

  const handleDiscovery = () => {
    if (!egg.isFound) {
      discoverEgg(eggId);

      // Show discovery animation/notification
      const notification = document.createElement("div");
      notification.textContent = `🥚 ${egg.discoveryReward}`;
      notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #ffd700, #ffed4e);
        color: #8b4513;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: bold;
        z-index: 10000;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        animation: slideIn 0.5s ease-out;
      `;

      document.body.appendChild(notification);
      setTimeout(() => {
        notification.remove();
      }, 3000);
    }
  };

  return (
    <div
      className={`easter-egg-wrapper ${className}`}
      onClick={egg.trigger === "click" ? handleDiscovery : undefined}
      onMouseEnter={egg.trigger === "hover" ? handleDiscovery : undefined}
      data-egg-id={eggId}
    >
      {children}
    </div>
  );
}

// Progress tracker component
export function EasterEggTracker() {
  const { foundEggs, totalEggs, discoveryProgress } = useEasterEggs();

  // Check if it's July 28th or later
  const now = new Date();
  const july28th = new Date(2025, 6, 28); // July 28, 2025
  const isJuly28thOrLater = now >= july28th;

  // Special July 28th messaging
  const getDisplayMessage = () => {
    if (!isJuly28thOrLater) {
      return {
        title: "Divine Treasures: LOCKED",
        subtitle: `${foundEggs.length}/${totalEggs} - Awaiting July 28th`,
        description: "Treasures protected until JAHmere's freedom",
        bgColor: "bg-purple-900/90",
        borderColor: "border-purple-400/50",
        textColor: "text-purple-100",
        icon: "🔒",
      };
    } else {
      return {
        title: "Divine Treasures: UNLOCKED",
        subtitle: `${foundEggs.length}/${totalEggs} Found`,
        description: "Freedom day has arrived!",
        bgColor: "bg-gold-900/90",
        borderColor: "border-gold-400/50",
        textColor: "text-gold-100",
        icon: "🔓",
      };
    }
  };

  const display = getDisplayMessage();

  return (
    <div
      className={`fixed bottom-4 right-4 z-50 ${display.bgColor} backdrop-blur-sm rounded-lg p-3 shadow-lg ${display.borderColor} border`}
    >
      <div className="flex items-center gap-2 text-sm">
        <span className="text-lg">{display.icon}</span>
        <div>
          <div className={`font-medium ${display.textColor}`}>
            {display.title}
          </div>
          <div className={`text-xs ${display.textColor}/80`}>
            {display.subtitle}
          </div>
          {!isJuly28thOrLater && (
            <div className="text-xs text-purple-300 mt-1">
              {display.description}
            </div>
          )}
        </div>
      </div>
      <div className="w-32 h-2 bg-gray-600 rounded-full mt-2">
        <div
          className={`h-full ${isJuly28thOrLater ? "bg-gradient-to-r from-gold-400 to-gold-600" : "bg-gradient-to-r from-purple-400 to-purple-600"} rounded-full transition-all duration-500`}
          style={{
            width: isJuly28thOrLater ? `${discoveryProgress * 100}%` : "0%",
          }}
        />
      </div>
      {!isJuly28thOrLater && (
        <div className="text-center mt-2">
          <div className="text-xs text-purple-200 font-bold animate-pulse">
            🙏 JULY 28TH = UNLOCK DAY 🙏
          </div>
        </div>
      )}
    </div>
  );
}

// Konami Code detector
export function KonamiCodeEgg() {
  const { discoverEgg } = useEasterEggs();
  const sequence = useRef<string[]>([]);
  const konamiCode = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "KeyB",
    "KeyA",
  ];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      sequence.current.push(e.code);
      if (sequence.current.length > konamiCode.length) {
        sequence.current.shift();
      }

      if (sequence.current.join(",") === konamiCode.join(",")) {
        discoverEgg("konami-code");
        sequence.current = [];
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [discoverEgg]);

  return null;
}

// Resurrection celebration modal
export function ResurrectionCelebration() {
  const { isAllFound, resetProgress } = useEasterEggs();
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    if (isAllFound) {
      setShowCelebration(true);
    }
  }, [isAllFound]);

  if (!showCelebration) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999] p-4"
        onClick={() => setShowCelebration(false)}
      >
        <motion.div
          initial={{ scale: 0.8, y: 50 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.8, y: 50 }}
          className="bg-gradient-to-br from-gold-100 to-amber-100 p-8 rounded-2xl max-w-md w-full text-center border-2 border-gold-300"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gold-800 mb-4">
            All Divine Treasures Found!
          </h2>
          <p className="text-gold-700 mb-6">
            "He is risen! He is risen indeed!"
            <br />
            You've discovered all the hidden treasures of faith.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={resetProgress}
              className="px-4 py-2 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
            >
              Start New Hunt
            </button>
            <button
              onClick={() => setShowCelebration(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

// Time-based easter egg (appears at specific times like 6 AM or 3 PM)
export function TimeBasedEgg() {
  const { discoverEgg } = useEasterEggs();

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const hour = now.getHours();

      // Trigger at 6 AM (resurrection time) or 3 PM (crucifixion time)
      if (hour === 6 || hour === 15) {
        const minute = now.getMinutes();
        if (minute === 0) {
          // Exactly on the hour
          discoverEgg("resurrection-time");
        }
      }
    };

    // Check immediately
    checkTime();

    // Check every minute
    const interval = setInterval(checkTime, 60000);

    return () => clearInterval(interval);
  }, [discoverEgg]);

  return null;
}

// Synchronicity Easter Egg - triggered by console errors
interface SynchronicityEggProps {
  children: React.ReactNode;
  trigger?: "console" | "service-worker" | "july-28";
}

export function SynchronicityEgg({
  children,
  trigger = "console",
}: SynchronicityEggProps) {
  const { foundEggs, discoverEgg } = useEasterEggs();
  const [showSynchronicity, setShowSynchronicity] = useState(false);

  const handleSynchronicityClick = () => {
    if (!foundEggs.includes("synchronicity-complete")) {
      setShowSynchronicity(true);
      discoverEgg("synchronicity-complete");
    }
  };

  return (
    <>
      <div onClick={handleSynchronicityClick} className="cursor-pointer">
        {children}
      </div>

      <AnimatePresence>
        {showSynchronicity && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[9999] p-4"
            onClick={() => setShowSynchronicity(false)}
          >
            <motion.div
              initial={{ y: 50 }}
              animate={{ y: 0 }}
              className="bg-gradient-to-br from-purple-900 via-gold-900 to-blue-900 p-8 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-gold-400/30"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🎯</div>
                <h2 className="text-3xl font-bold text-gold-300 mb-2">
                  Divine Synchronicity Revealed!
                </h2>
                <p className="text-gold-200 text-lg">
                  "Even errors proclaim His glory!"
                </p>
              </div>

              <div className="bg-black/50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-gold-300 mb-4">
                  🔮 The Prophetic Console Error Message
                </h3>
                <div className="text-gold-200 space-y-3">
                  <p>
                    <strong>Error:</strong> "Only the active worker can claim
                    clients"
                  </p>
                  <p>
                    <strong>Spiritual Translation:</strong>
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-gold-100">
                    <li>
                      <strong>ACTIVE WORKER</strong> = JAHmere actively serving
                      God's Kingdom
                    </li>
                    <li>
                      <strong>CAN CLAIM</strong> = His divine right to freedom
                      and purpose
                    </li>
                    <li>
                      <strong>CLIENTS</strong> = The souls he'll serve through
                      The Bridge Project
                    </li>
                    <li>
                      <strong>INVALID STATE ERROR</strong> = The state's case is
                      INVALID
                    </li>
                  </ul>
                </div>
              </div>

              <div className="text-center">
                <p className="text-gold-200 mb-4">
                  "And we know that in all things God works for the good of
                  those who love him" - Romans 8:28
                </p>
                <button
                  onClick={() => setShowSynchronicity(false)}
                  className="px-6 py-3 bg-gold-600 text-white rounded-lg hover:bg-gold-700 transition-colors"
                >
                  Amen! 🙏
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// July 28th Countdown to Divine Treasure Unlock
export function July28thCountdown() {
  const [timeRemaining, setTimeRemaining] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const july28th = new Date(2025, 6, 28, 0, 0, 0); // July 28, 2025 at midnight
      const timeDiff = july28th.getTime() - now.getTime();

      if (timeDiff <= 0) {
        setIsUnlocked(true);
        return null;
      }

      const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDiff % (1000 * 60)) / 1000);

      return { days, hours, minutes, seconds };
    };

    // Update immediately
    const remaining = calculateTimeRemaining();
    setTimeRemaining(remaining);

    // Update every second
    const interval = setInterval(() => {
      const remaining = calculateTimeRemaining();
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-gold-600 to-amber-600 text-white p-4 rounded-xl shadow-2xl border-2 border-gold-300"
      >
        <div className="text-center">
          <div className="text-3xl mb-2">🎉✨🔓</div>
          <div className="font-bold text-lg">DIVINE TREASURES UNLOCKED!</div>
          <div className="text-sm">JAHmere's Freedom Day Has Arrived!</div>
        </div>
      </motion.div>
    );
  }

  if (!timeRemaining) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-gradient-to-r from-purple-900 to-indigo-900 text-white p-4 rounded-xl shadow-2xl border-2 border-purple-400"
    >
      <div className="text-center">
        <div className="text-2xl mb-2">🔒💎⏰</div>
        <div className="font-bold text-lg mb-2">Divine Treasures Countdown</div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div className="bg-purple-800/50 p-2 rounded">
            <div className="text-xl font-bold">{timeRemaining.days}</div>
            <div className="text-xs">Days</div>
          </div>
          <div className="bg-purple-800/50 p-2 rounded">
            <div className="text-xl font-bold">{timeRemaining.hours}</div>
            <div className="text-xs">Hours</div>
          </div>
          <div className="bg-purple-800/50 p-2 rounded">
            <div className="text-xl font-bold">{timeRemaining.minutes}</div>
            <div className="text-xs">Minutes</div>
          </div>
          <div className="bg-purple-800/50 p-2 rounded">
            <div className="text-xl font-bold">{timeRemaining.seconds}</div>
            <div className="text-xs">Seconds</div>
          </div>
        </div>
        <div className="text-xs mt-2 text-purple-200">
          Until July 28th - JAHmere's Freedom & Treasure Unlock
        </div>
      </div>
    </motion.div>
  );
}

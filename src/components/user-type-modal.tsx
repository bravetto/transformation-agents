"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Trophy,
  Scale,
  Users,
  ArrowRight,
  Sparkles,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { useModalAnalytics } from "@/components/analytics-wrapper";
import { trackModalInteraction } from "@/lib/analytics/user-journey";
import ModalPortal from "@/components/ui/modal-portal";

export type UserType = "champion" | "justice-seeker" | "movement-builder";

interface UserTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUserTypeSelect: (type: UserType) => void;
  className?: string;
}

interface PathCard {
  id: UserType;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  image: string;
  trigger: string;
  features: string[];
  callToAction: string;
}

const pathCards: PathCard[] = [
  {
    id: "champion",
    title: "Champion Builder",
    subtitle: "I Am... a Champion Builder",
    description:
      "Legacy-driven leaders who build champions and transform lives through mentorship.",
    icon: <Trophy className="w-8 h-8" />,
    gradient: "from-yellow-400 via-orange-500 to-red-500",
    image: "/images/profiles/coach-dungy.svg",
    trigger: "Build Champions",
    features: [
      "Leadership Development",
      "Mentorship Programs",
      "Team Building",
      "Legacy Creation",
    ],
    callToAction: "Start Building Champions",
  },
  {
    id: "justice-seeker",
    title: "Justice Seeker",
    subtitle: "I Am... seeking JAHmere & Justice",
    description:
      "Evidence-based decision makers who seek truth and transformative justice.",
    icon: <Scale className="w-8 h-8" />,
    gradient: "from-blue-500 via-indigo-600 to-purple-600",
    image: "/images/profiles/jahmere-webb.svg",
    trigger: "Seek Justice",
    features: [
      "Case Analysis",
      "Evidence Review",
      "Legal Insights",
      "Justice Advocacy",
    ],
    callToAction: "Explore the Case",
  },
  {
    id: "movement-builder",
    title: "Movement Builder",
    subtitle: "I Am... building Mataluni & Movement",
    description:
      "Community organizers who amplify voices and create systemic change.",
    icon: <Users className="w-8 h-8" />,
    gradient: "from-green-500 via-teal-600 to-blue-600",
    image: "/images/profiles/jay-forte.svg",
    trigger: "Build Movement",
    features: [
      "Community Organizing",
      "Voice Amplification",
      "Systemic Change",
      "Grassroots Mobilization",
    ],
    callToAction: "Join the Movement",
  },
];

function UserTypeModal({
  isOpen,
  onClose,
  onUserTypeSelect,
  className = "",
}: UserTypeModalProps) {
  // 🛡️ CRITICAL DEBUG: Track render cycles to prevent infinite loops
  const renderCount = useRef(0);
  const componentName = "UserTypeModal";

  // Increment render count and log if excessive (development only)
  if (process.env.NODE_ENV === "development") {
    renderCount.current++;
    if (renderCount.current > 10) {
      console.warn(
        `🚨 ${componentName} excessive renders: ${renderCount.current}`,
      );
    }
  }

  // State management with proper initialization
  const [selectedPath, setSelectedPath] = useState<UserType | null>(null);
  const [hoveredPath, setHoveredPath] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const isMounted = useRef(true);

  // 🛡️ CRITICAL FIX: Reset render count on mount
  useEffect(() => {
    renderCount.current = 0;
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  // 🛡️ CRITICAL FIX: Track modal view only once when opened
  useEffect(() => {
    if (isOpen && isMounted.current) {
      // Use direct call instead of the memoized function to avoid dependency issues
      trackModalInteraction({
        eventType: "modal_viewed",
        timestamp: Date.now(),
      });
    }
  }, [isOpen]); // 🔥 FIXED: Remove trackModalView from dependencies

  // 🛡️ CRITICAL FIX: Stabilize path selection handler with divine loading
  const handlePathSelect = useCallback(
    (pathId: UserType) => {
      if (!isMounted.current) return;

      setSelectedPath(pathId);
      setIsLoading(true);

      trackModalInteraction({
        eventType: "path_selected",
        userType: pathId as any,
        timestamp: Date.now(),
      });

      // Divine loading experience with delayed execution
      setTimeout(() => {
        if (isMounted.current) {
          onUserTypeSelect(pathId);
          onClose();
          setIsLoading(false);
          setSelectedPath(null);
        }
      }, 1200); // Extended for divine experience
    },
    [onUserTypeSelect, onClose],
  );

  // 🛡️ CRITICAL FIX: Stabilize hover handler with proper state checks
  const handleCardHover = useCallback(
    (pathId: UserType, isHovering: boolean) => {
      if (!isMounted.current || isLoading) return;

      // Throttle hover state changes to prevent excessive updates
      if (isHovering && hoveredPath !== pathId) {
        setHoveredPath(pathId);
        // Use direct call instead of memoized function
        trackModalInteraction({
          eventType: "card_hovered",
          userType: pathId as any,
          timestamp: Date.now(),
        });
      } else if (!isHovering && hoveredPath === pathId) {
        setHoveredPath(null);
      }
    },
    [hoveredPath, isLoading],
  ); // 🔥 FIXED: Remove trackCardHover from dependencies

  const loadingText = selectedPath
    ? `Entering ${pathCards.find((p) => p.id === selectedPath)?.title} path...`
    : "Loading divine experience...";

  return (
    <ModalPortal
      isOpen={isOpen}
      onClose={onClose}
      className="overflow-y-auto"
      showCloseButton={true}
      closeOnOverlayClick={!isLoading}
      closeOnEscape={!isLoading}
      animationVariant="scale"
      isLoading={isLoading}
      loadingText={loadingText}
    >
      {/* Header */}
      <div className="relative p-8 pb-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-t-2xl">
        <div className="text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", damping: 20 }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <Sparkles className="w-8 h-8 text-purple-600" />
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Choose Your Path
            </h2>
            <Sparkles className="w-8 h-8 text-purple-600" />
          </motion.div>

          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Every great transformation begins with a single choice. Select the
            path that resonates with your purpose and calling.
          </p>
        </div>
      </div>

      {/* Path Cards */}
      <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {pathCards.map((path, index) => (
          <motion.div
            key={path.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * index, duration: 0.5 }}
            className="group relative"
            onMouseEnter={() => handleCardHover(path.id, true)}
            onMouseLeave={() => handleCardHover(path.id, false)}
          >
            <div
              className={`relative overflow-hidden rounded-xl bg-gradient-to-br ${path.gradient} p-1 cursor-pointer transition-all duration-300 ${
                hoveredPath === path.id
                  ? "scale-105 shadow-2xl"
                  : "hover:scale-102 shadow-lg"
              } ${selectedPath === path.id ? "ring-4 ring-white shadow-2xl" : ""} ${
                isLoading && selectedPath !== path.id
                  ? "opacity-50 pointer-events-none"
                  : ""
              }`}
              onClick={() => handlePathSelect(path.id)}
            >
              <div className="bg-white rounded-lg p-6 h-full">
                {/* Icon and Image */}
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${path.gradient} text-white`}
                  >
                    {path.icon}
                  </div>
                  <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100">
                    <img
                      src={path.image}
                      alt={path.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Title and Subtitle */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-slate-800 mb-1">
                    {path.title}
                  </h3>
                  <p
                    className={`text-sm font-medium bg-gradient-to-r ${path.gradient} bg-clip-text text-transparent`}
                  >
                    {path.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">
                  {path.description}
                </p>

                {/* Features */}
                <div className="mb-6">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    What You'll Get
                  </h4>
                  <ul className="space-y-1">
                    {path.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="text-xs text-slate-600 flex items-center gap-2"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${path.gradient}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call to Action */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${path.gradient} text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all duration-200 ${
                    selectedPath === path.id ? "animate-pulse" : ""
                  }`}
                  disabled={isLoading}
                >
                  {selectedPath === path.id ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                      />
                      Entering...
                    </>
                  ) : (
                    <>
                      {path.callToAction}
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Hover Effect */}
            <AnimatePresence>
              {hoveredPath === path.id && !isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 pointer-events-none"
                >
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${path.gradient} opacity-10 rounded-xl`}
                  />
                  <div className="absolute inset-0 border-2 border-white/50 rounded-xl" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-8 pb-8">
        <div className="text-center text-sm text-slate-500">
          <p>
            Your choice shapes the journey. Every path leads to transformation.
          </p>
        </div>
      </div>
    </ModalPortal>
  );
}

// Export with error boundary
export default withDivineErrorBoundary(UserTypeModal, {
  componentName: "UserTypeModal",
  fallback: (
    <ModalPortal
      isOpen={true}
      onClose={() => window.location.reload()}
      className="max-w-md"
    >
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold mb-4">
          Unable to Load Path Selection
        </h2>
        <p className="text-gray-600 mb-6">
          The user type selection modal encountered an error. Please refresh the
          page to try again.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="bg-gradient-divine text-white px-6 py-2 rounded-lg hover:bg-gradient-divine-hover transition-all"
        >
          Refresh Page
        </button>
      </div>
    </ModalPortal>
  ),
});

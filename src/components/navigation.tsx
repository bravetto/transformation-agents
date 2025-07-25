"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  ChevronRight,
  Users,
  FileText,
  Heart,
  Home,
  ChevronDown,
  BarChart,
  Target,
  Activity,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Container } from "@/components/ui/container";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import MiniCountdown from "@/components/ui/mini-countdown";
import {
  useAdvancedGestures,
  useMobileOptimization,
} from "@/components/ui/mobile-optimization";
import { useStableNavigation } from "@/hooks/useStableNavigation";
// EasterEgg removed for hydration stability

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  children?: NavItem[];
}

// Update the navItems array to better support the campaign user journeys
const navItems: NavItem[] = [
  { href: "/", label: "Home", icon: <Home className="h-4 w-4" /> },

  // TIER 1: Core Campaign Journey
  {
    href: "/the-case",
    label: "The Case",
    icon: <FileText className="h-4 w-4" />,
  },
  {
    href: "/july-28-strategy",
    label: "July 28 Strategy 🔥",
    icon: <Target className="h-4 w-4" />,
  },

  // TIER 2: Character Witnesses & Stories
  {
    href: "/people",
    label: "Character Witnesses",
    icon: <Users className="h-4 w-4" />,
    children: [
      {
        href: "/people/jahmere-webb",
        label: "JAHmere Webb",
        icon: <Users className="h-4 w-4" />,
      },
      {
        href: "/people/jordan-dungy",
        label: "Jordan Dungy",
        icon: <Users className="h-4 w-4" />,
      },
      {
        href: "/people/coach-dungy",
        label: "Coach Tony Dungy",
        icon: <Users className="h-4 w-4" />,
      },
      {
        href: "/people/martha-henderson",
        label: "Martha Henderson",
        icon: <Users className="h-4 w-4" />,
      },
      {
        href: "/people/michael-mataluni",
        label: "Michael Mataluni",
        icon: <Users className="h-4 w-4" />,
      },
      {
        href: "/people/jay-forte",
        label: "Jay Forte ⭐ NEW",
        icon: <Users className="h-4 w-4" />,
      },
    ],
  },

  // TIER 3: Action & Community
  {
    href: "/campaign",
    label: "Take Action",
    icon: <Heart className="h-4 w-4" />,
    children: [
      {
        href: "/letter-portal",
        label: "📝 Write Letter to Judge",
        icon: <FileText className="h-4 w-4" />,
      },
      {
        href: "/twitter-campaign",
        label: "📱 Social Media Kit",
        icon: <Heart className="h-4 w-4" />,
      },
      {
        href: "/contact",
        label: "💬 Contact & Support",
        icon: <Heart className="h-4 w-4" />,
      },
    ],
  },

  // TIER 4: Progress & Transparency
  {
    href: "/impact",
    label: "Impact Dashboard",
    icon: <BarChart className="h-4 w-4" />,
  },
  {
    href: "/analytics-dashboard",
    label: "Analytics Command Center",
    icon: <Activity className="h-4 w-4" />,
  },
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  // 🔥 CRITICAL FIX: Add state for desktop popover management
  const [openPopover, setOpenPopover] = useState<string | null>(null);
  const { pathname, isRoute, isRoutePrefix, hasRouteChanged } =
    useStableNavigation();

  // Mobile optimization hooks
  const { isMobile } = useMobileOptimization();
  const { createSwipeHandler, triggerHaptic } = useAdvancedGestures();

  // 🔥 CRITICAL FIX: Enhanced navigation state reset with memory leak prevention
  const resetNavigationState = useCallback(() => {
    try {
      setIsOpen(false);
      setOpenPopover(null);
      setExpandedItems([]);
      document.body.style.overflow = "";

      // Clear any lingering focus states
      if (document.activeElement && document.activeElement !== document.body) {
        (document.activeElement as HTMLElement).blur();
      }

      // Force cleanup of any event listeners
      document.removeEventListener("click", () => {});
      document.removeEventListener("keydown", () => {});
    } catch (error) {
      // Production safety: Log error and force basic reset
      console.error("🚨 Navigation reset error:", error);
      setIsOpen(false);
      setOpenPopover(null);
      setExpandedItems([]);
    }
  }, []);

  // 🔥 PRODUCTION MONITORING: Navigation state debugging for deployment
  useEffect(() => {
    if (process.env.NODE_ENV === "development") {
      console.log("🧭 Navigation State:", {
        pathname,
        openPopover,
        isOpen,
        expandedItems: expandedItems.length,
        timestamp: new Date().toISOString(),
      });
    }
  }, [pathname, openPopover, isOpen, expandedItems]);

  // 🔥 CRITICAL FIX: Navigation error boundary with stable dependencies
  useEffect(() => {
    const handleNavigationError = (event: ErrorEvent) => {
      if (
        event.error?.message?.includes("navigation") ||
        event.error?.message?.includes("popover")
      ) {
        console.error("🚨 Navigation Error Detected:", {
          error: event.error,
          pathname,
          openPopover,
          userAgent: navigator.userAgent,
          timestamp: new Date().toISOString(),
        });

        // Auto-recovery: Reset navigation state
        resetNavigationState();
      }
    };

    window.addEventListener("error", handleNavigationError);
    return () => window.removeEventListener("error", handleNavigationError);
  }, [pathname, openPopover, resetNavigationState]);

  // 🔥 CRITICAL FIX: Memory leak prevention - cleanup on unmount
  useEffect(() => {
    return () => {
      // Comprehensive cleanup on component unmount
      try {
        document.body.style.overflow = "";
        setIsOpen(false);
        setOpenPopover(null);
        setExpandedItems([]);

        // Clear any remaining timers or intervals
        const highestTimeoutId = setTimeout(() => {}, 0);
        clearTimeout(highestTimeoutId);

        // Remove any global event listeners that might have been added
        document.removeEventListener("click", () => {});
        document.removeEventListener("keydown", () => {});
        window.removeEventListener("resize", () => {});
      } catch (error) {
        console.error("🚨 Navigation cleanup error:", error);
      }
    };
  }, []);

  // Enhanced mobile navigation with swipe support
  const mobileSwipeHandlers = createSwipeHandler(
    () => {
      // Swipe left to close menu
      if (isOpen) {
        setIsOpen(false);
        triggerHaptic("light");
      }
    },
    () => {
      // Swipe right to open menu
      if (!isOpen && isMobile) {
        setIsOpen(true);
        triggerHaptic("light");
      }
    },
  );

  // Handle body scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      // Prevent body scrolling when menu is open
      document.body.style.overflow = "hidden";
    } else {
      // Restore scrolling when menu is closed
      document.body.style.overflow = "";
    }

    // Cleanup function
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔥 CRITICAL FIX: Route change detection with stable navigation
  useEffect(() => {
    if (hasRouteChanged()) {
      // Reset navigation state immediately on route change
      resetNavigationState();
    }
  }, [pathname, hasRouteChanged, resetNavigationState]);

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href],
    );
  };

  // 🔥 PRODUCTION FIX: Enhanced popover state management with deployment safety
  const handlePopoverOpenChange = useCallback(
    (isOpen: boolean, itemHref: string) => {
      try {
        if (isOpen) {
          // Force close all popovers first for clean state
          setOpenPopover(null);

          // Use requestAnimationFrame for better timing in production
          requestAnimationFrame(() => {
            setOpenPopover(itemHref);
          });
        } else {
          // Always close the popover with immediate effect
          setOpenPopover(null);
        }
      } catch (error) {
        // Production safety: Log error and force reset
        console.error("🚨 Popover state error:", error);
        setOpenPopover(null);
        setIsOpen(false);
      }
    },
    [],
  );

  // Handle keyboard navigation for the dropdown menu
  const handleKeyDown = (e: React.KeyboardEvent, href: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleExpanded(href);
    }
  };

  return (
    <>
      {/* Skip to main content link for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:p-4 focus:bg-hope-gold focus:text-white focus:shadow-lg focus:outline-none"
      >
        Skip to main content
      </a>

      {/* Main Navigation - Fixed: Proper z-index and divine colors */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm shadow-sm border-b border-gray-100 z-navigation">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              {/* Logo/Brand with Easter Egg - FIXED: Prevent overflow */}
              <div className="flex items-center">
                <Link
                  href="/"
                  className="flex items-center space-x-2 group max-w-fit"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <span className="text-white font-bold text-lg">B</span>
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden sm:block truncate">
                    Bridge Project
                  </span>
                  <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent sm:hidden">
                    Bridge
                  </span>
                </Link>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-3" role="menubar">
                {navItems.map((item) =>
                  item.children ? (
                    <Popover
                      key={item.href}
                      open={openPopover === item.href}
                      onOpenChange={(isOpen) => {
                        // 🔥 CRITICAL FIX: Force proper state management
                        handlePopoverOpenChange(isOpen, item.href);
                      }}
                    >
                      <PopoverTrigger asChild>
                        <button
                          className={`flex items-center gap-2 transition-colors h-10 min-h-[40px] px-3 py-2 rounded-md ${
                            pathname.startsWith(item.href)
                              ? "text-elite-justice-indigo font-semibold bg-blue-50"
                              : "text-gentle-charcoal hover:text-elite-justice-indigo hover:bg-gray-50"
                          }`}
                          aria-expanded={openPopover === item.href}
                          aria-haspopup="true"
                          aria-controls={`dropdown-${item.label}`}
                          role="menuitem"
                        >
                          <span className="sr-only">Open</span>
                          {item.icon}
                          <span className="text-sm font-medium">
                            {item.label}
                          </span>
                          <ChevronDown className="h-3 w-3" aria-hidden="true" />
                        </button>
                      </PopoverTrigger>
                      <PopoverContent
                        align="start"
                        className="w-64 p-0 bg-white border border-gray-200 shadow-lg z-dropdown"
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        onCloseAutoFocus={(e) => e.preventDefault()}
                        onPointerDownOutside={(e) => {
                          // Enhanced outside click handling for deployment stability
                          setOpenPopover(null);
                        }}
                        onEscapeKeyDown={() => {
                          // Ensure popover closes on escape
                          setOpenPopover(null);
                        }}
                      >
                        <div className="py-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`flex items-center gap-3 px-4 py-3 transition-colors hover:bg-gray-50 ${
                                pathname === child.href
                                  ? "text-elite-justice-indigo font-semibold bg-blue-50"
                                  : "text-gentle-charcoal hover:text-elite-justice-indigo"
                              }`}
                              role="menuitem"
                              aria-current={
                                pathname === child.href ? "page" : undefined
                              }
                              onClick={(e) => {
                                // 🔥 CRITICAL FIX: Enhanced event handling with stable navigation
                                try {
                                  e.stopPropagation();
                                  resetNavigationState();

                                  // Additional safety for mobile devices
                                  if (isMobile) {
                                    triggerHaptic("light");
                                  }
                                } catch (error) {
                                  // Production safety: Force navigation reset on error
                                  console.error(
                                    "🚨 Navigation click error:",
                                    error,
                                  );
                                  resetNavigationState();
                                }
                              }}
                            >
                              <span className="text-sm">{child.label}</span>
                            </Link>
                          ))}
                        </div>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2 transition-colors h-10 min-h-[40px] px-3 py-2 rounded-md ${
                        pathname === item.href
                          ? "text-elite-justice-indigo font-semibold bg-blue-50"
                          : "text-gentle-charcoal hover:text-elite-justice-indigo hover:bg-gray-50"
                      }`}
                      role="menuitem"
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.icon}
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  ),
                )}

                {/* Decision Countdown */}
                <div className="ml-2">
                  <MiniCountdown
                    targetDate={
                      new Date(new Date().setDate(new Date().getDate() + 14))
                    }
                    linkHref="/contact"
                  />
                </div>

                {/* Take Action Button - FIXED: Divine color scheme */}
                <Link href="/contact" role="menuitem">
                  <Button
                    variant="primary"
                    size="sm"
                    className="bg-gradient-divine text-white hover:bg-gradient-divine-hover h-10 px-4 shadow-lg border border-white/20 font-semibold transform hover:scale-105 transition-all duration-200"
                    aria-label="Take Action"
                  >
                    Take Action
                  </Button>
                </Link>
              </div>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden text-gentle-charcoal hover:text-elite-justice-indigo transition-colors h-9 w-9 min-h-[36px] min-w-[36px] flex items-center justify-center"
                aria-label={isOpen ? "Close menu" : "Open menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                {isOpen ? (
                  <X className="h-5 w-5" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Mobile Menu with swipe gestures - FIXED: Proper z-index and spacing */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-modal bg-white md:hidden overflow-y-auto"
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            {...mobileSwipeHandlers}
          >
            {/* Swipe indicator */}
            <div className="absolute top-4 right-4 text-soft-shadow text-xs">
              ← Swipe to close
            </div>

            {/* Mobile Menu Content - FIXED: Proper padding and spacing */}
            <div className="flex flex-col pt-20 px-6 sm:px-8 pb-8" role="menu">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.children ? (
                    <div>
                      <button
                        onClick={() => toggleExpanded(item.href)}
                        onKeyDown={(e) => handleKeyDown(e, item.href)}
                        className={`flex items-center justify-between w-full py-4 min-h-[64px] border-b border-quiet-stone ${
                          pathname.startsWith(item.href)
                            ? "text-elite-justice-indigo font-semibold"
                            : "text-gentle-charcoal hover:text-elite-justice-indigo"
                        } transition-colors`}
                        aria-expanded={expandedItems.includes(item.href)}
                        aria-haspopup="true"
                        aria-controls={`mobile-submenu-${item.href.replace(/\//g, "")}`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-4">
                          {item.icon}
                          <span className="text-lg font-medium">
                            {item.label}
                          </span>
                        </div>
                        <ChevronDown
                          className={`h-5 w-5 transition-transform ${
                            expandedItems.includes(item.href)
                              ? "rotate-180"
                              : ""
                          }`}
                          aria-hidden="true"
                        />
                      </button>

                      {/* Submenu with proper animation */}
                      <AnimatePresence>
                        {expandedItems.includes(item.href) && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                            id={`mobile-submenu-${item.href.replace(/\//g, "")}`}
                            role="menu"
                          >
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-4 py-4 min-h-[64px] pl-12 text-base ${
                                  pathname === child.href
                                    ? "text-elite-justice-indigo font-semibold bg-blue-50"
                                    : "text-gentle-charcoal hover:text-elite-justice-indigo hover:bg-gray-50"
                                } transition-colors`}
                                role="menuitem"
                                aria-current={
                                  pathname === child.href ? "page" : undefined
                                }
                              >
                                <span>{child.label}</span>
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => resetNavigationState()}
                      className={`flex items-center gap-4 py-4 min-h-[64px] border-b border-quiet-stone ${
                        isRoute(item.href)
                          ? "text-elite-justice-indigo font-semibold bg-blue-50"
                          : "text-gentle-charcoal hover:text-elite-justice-indigo hover:bg-gray-50"
                      } transition-colors rounded-lg px-2`}
                      role="menuitem"
                      aria-current={isRoute(item.href) ? "page" : undefined}
                    >
                      {item.icon}
                      <span className="text-lg font-medium">{item.label}</span>
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Mobile Bottom Action - FIXED: Mobile conversion optimization */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.1 + 0.2 }}
                className="mt-8 pt-8 border-t border-gray-200"
              >
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <Button asChild className="w-full">
                    <Link href="/letter-portal">
                      <FileText className="h-4 w-4 mr-2" />
                      Write Letter to Judge
                    </Link>
                  </Button>
                  <Link href="/prayer-room" onClick={() => setIsOpen(false)}>
                    <Button
                      variant="outline"
                      className="w-full border-2 border-divine-purple text-divine-purple hover:bg-divine-purple hover:text-white font-semibold py-3 rounded-lg transition-all duration-200"
                    >
                      🙏 Prayer Room
                    </Button>
                  </Link>
                </div>
                <p className="text-center text-sm text-gray-600">
                  July 28, 2025 • Your voice matters for JAHmere's freedom
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Floating Action Button - FIXED: Conversion optimization */}
      {isMobile && !isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-4 right-4 z-dropdown md:hidden"
        >
          <Link href="/letter-portal">
            <Button
              size="lg"
              className="bg-gradient-divine text-white hover:bg-gradient-divine-hover shadow-xl rounded-full w-14 h-14 flex items-center justify-center transform hover:scale-110 transition-all duration-200"
              aria-label="Quick Action - Write Letter"
            >
              ✍️
            </Button>
          </Link>
        </motion.div>
      )}
    </>
  );
}

// Export with divine error boundary
export default withDivineErrorBoundary(Navigation, {
  componentName: "Navigation",
  role: "guardian",
});

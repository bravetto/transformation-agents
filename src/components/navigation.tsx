"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
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
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui";
import { Container } from "@/components/ui/container";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import MiniCountdown from "@/components/ui/mini-countdown";
import {
  useAdvancedGestures,
  useMobileOptimization,
} from "@/components/ui/mobile-optimization";

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
        href: "/letter-form-test",
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
    description: "View real-time impact metrics and community growth",
  },
  {
    href: "/analytics-dashboard",
    label: "Analytics Command Center",
    icon: <Activity className="h-4 w-4" />,
    description: "Championship-level analytics and system monitoring",
  },
];

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const pathname = usePathname();

  // Mobile optimization hooks
  const { isMobile } = useMobileOptimization();
  const { createSwipeHandler, triggerHaptic } = useAdvancedGestures();

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

  // Close mobile menu when pathname changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const toggleExpanded = (href: string) => {
    setExpandedItems((prev) =>
      prev.includes(href)
        ? prev.filter((item) => item !== href)
        : [...prev, href],
    );
  };

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

      {/* Navigation Bar - Enhanced for mobile */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: 0 }}
        className={`layout-navigation sticky top-0 z-navigation transition-all duration-300 ${
          scrolled ? "bg-pure-white shadow-md" : "bg-comfort-cream"
        }`}
        role="navigation"
        aria-label="Main navigation"
        {...(isMobile ? mobileSwipeHandlers : {})}
      >
        <Container py="none">
          <div className="flex items-center justify-between h-header">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative"
              >
                <div className="h-8 w-8 bg-gradient-to-br from-elite-divine-amber to-elite-justice-indigo rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-pure-white font-bold text-lg">B</span>
                </div>
              </motion.div>
              <div>
                <span className="text-gentle-charcoal font-bold text-base">
                  THE BRIDGE
                </span>
                <div className="text-[10px] text-soft-shadow">
                  Building from Day 1
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4" role="menubar">
              {navItems.map((item) =>
                item.children ? (
                  <Popover key={item.href}>
                    <PopoverTrigger asChild>
                      <button
                        className={`flex items-center gap-2 transition-colors h-9 min-h-[36px] px-2 ${
                          pathname.startsWith(item.href)
                            ? "text-elite-justice-indigo font-semibold"
                            : "text-gentle-charcoal hover:text-elite-justice-indigo"
                        }`}
                        aria-expanded={expandedItems.includes(item.href)}
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
                      className="bg-pure-white border-quiet-stone shadow-lg p-2 min-w-[200px]"
                      align="start"
                      role="menu"
                      id={`dropdown-${item.label}`}
                    >
                      <Link
                        href={item.href}
                        className="block px-3 py-2 min-h-[36px] flex items-center text-sm text-gentle-charcoal hover:bg-soft-cloud hover:text-elite-justice-indigo rounded-md transition-colors mb-1"
                        role="menuitem"
                      >
                        View All {item.label}
                      </Link>
                      <div
                        className="h-px bg-quiet-stone my-1"
                        role="separator"
                        aria-orientation="horizontal"
                      />
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-3 py-2 min-h-[36px] flex items-center text-sm text-gentle-charcoal hover:bg-soft-cloud hover:text-elite-justice-indigo rounded-md transition-colors"
                          role="menuitem"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </PopoverContent>
                  </Popover>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-2 transition-colors h-9 min-h-[36px] px-2 ${
                      pathname === item.href
                        ? "text-elite-justice-indigo font-semibold"
                        : "text-gentle-charcoal hover:text-elite-justice-indigo"
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

              {/* Take Action Button */}
              <Link href="/contact" role="menuitem">
                <Button
                  variant="primary"
                  size="sm"
                  className="bg-elite-divine-amber text-pure-white hover:bg-elite-divine-amber/90 h-9 px-4 shadow-lg"
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
        </Container>
      </motion.nav>

      {/* Enhanced Mobile Menu with swipe gestures */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-modal bg-pure-white md:hidden overflow-y-auto"
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

            <div className="flex flex-col pt-20 px-4 sm:px-8 pb-8" role="menu">
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
                        className={`flex items-center justify-between w-full py-4 min-h-[56px] border-b border-quiet-stone ${
                          pathname.startsWith(item.href)
                            ? "text-elite-justice-indigo font-semibold"
                            : "text-gentle-charcoal hover:text-elite-justice-indigo"
                        } transition-colors`}
                        aria-expanded={expandedItems.includes(item.href)}
                        aria-haspopup="true"
                        aria-controls={`mobile-submenu-${item.href.replace(/\//g, "")}`}
                        role="menuitem"
                      >
                        <div className="flex items-center gap-3">
                          {item.icon}
                          <span className="text-lg">{item.label}</span>
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
                      <AnimatePresence>
                        {expandedItems.includes(item.href) && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden bg-soft-cloud rounded-lg mt-2 mb-2"
                            role="menu"
                            id={`mobile-submenu-${item.href.replace(/\//g, "")}`}
                          >
                            <Link
                              href={item.href}
                              onClick={() => setIsOpen(false)}
                              className="flex items-center gap-3 py-4 min-h-[56px] pl-10 text-sm text-gentle-charcoal hover:text-elite-justice-indigo transition-colors"
                              role="menuitem"
                            >
                              View All {item.label}
                            </Link>
                            {item.children.map((child) => (
                              <Link
                                key={child.href}
                                href={child.href}
                                onClick={() => setIsOpen(false)}
                                className={`flex items-center gap-3 py-4 min-h-[56px] pl-10 text-sm ${
                                  pathname === child.href
                                    ? "text-elite-justice-indigo font-semibold"
                                    : "text-gentle-charcoal hover:text-elite-justice-indigo"
                                } transition-colors`}
                                role="menuitem"
                                aria-current={
                                  pathname === child.href ? "page" : undefined
                                }
                              >
                                {child.label}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center gap-3 py-4 min-h-[56px] border-b border-quiet-stone ${
                        pathname === item.href
                          ? "text-elite-justice-indigo font-semibold"
                          : "text-gentle-charcoal hover:text-elite-justice-indigo"
                      } transition-colors`}
                      role="menuitem"
                      aria-current={pathname === item.href ? "page" : undefined}
                    >
                      {item.icon}
                      <span className="text-lg">{item.label}</span>
                    </Link>
                  )}
                </motion.div>
              ))}

              {/* Action Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-8"
              >
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button
                    variant="primary"
                    width="full"
                    size="lg"
                    className="bg-elite-divine-amber text-pure-white hover:bg-elite-divine-amber/90 shadow-lg"
                  >
                    Take Action Now
                  </Button>
                </Link>
              </motion.div>

              {/* Mobile Menu Footer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mt-12 text-center"
              >
                <p className="text-elite-justice-indigo font-bold text-lg mb-2">
                  Zero Graduates. Infinite Possibility.
                </p>
                <p className="text-soft-shadow text-sm">Building from Day 1</p>
              </motion.div>

              {/* Footer Links */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-8 pt-8 border-t border-quiet-stone"
              >
                <div className="flex flex-col gap-4 text-sm">
                  <Link
                    href="/check-in"
                    className="text-soft-shadow hover:text-elite-justice-indigo min-h-[44px] flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Daily Check-In
                  </Link>
                  <Link
                    href="/dashboard/judge"
                    className="text-soft-shadow hover:text-elite-justice-indigo min-h-[44px] flex items-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Judge Dashboard
                  </Link>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// Export with divine error boundary
export default withDivineErrorBoundary(Navigation, {
  componentName: "Navigation",
  role: "guardian",
});

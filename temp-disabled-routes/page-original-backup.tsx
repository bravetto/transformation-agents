"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";
import { impactEvents } from "@/components/impact-dashboard";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Check,
  Shield,
  Crown,
  BarChart3,
  Zap,
} from "lucide-react";

// 🚀 OPTIMIZED COMPONENT LOADING SYSTEM
import {
  OptimizedComponents,
  initializePreloading,
} from "@/lib/performance/component-loader";
// 🚀 Advanced Performance Monitoring with RUM capabilities
import {
  usePerformanceMonitoring,
  PerformanceDashboard,
} from "@/lib/performance/performance-monitor-client";

// Import existing components with correct default imports
import { FloatingCTA, MobileStickyBar } from "@/components/ui/floating-cta";
import TrustBar from "@/components/ui/trust-bar";
import UrgencyBanner from "@/components/ui/urgency-banner";
import QuickNav from "@/components/ui/quick-nav";
import ExploreNav from "@/components/ui/explore-nav";
import MicroCommitments from "@/components/micro-commitments";
import LossAversion from "@/components/loss-aversion";

// 🔥 NEW: Phil's Miracle GoFundMe Component
import { PhilsGoFundMeCompact } from "@/components/phils-miracle-gofundme";

// 🚀 MVP Feature Flags - Surgical Component Control
import {
  FeatureGate,
  ComingSoonCard,
  isFeatureEnabled,
} from "@/lib/feature-flags";

// Critical above-the-fold components (immediate load)
const Hero = OptimizedComponents.Hero;
const UserTypeModal = OptimizedComponents.UserTypeModal;

// High priority components (preloaded on interaction)
const DivineImpactDashboard = OptimizedComponents.DivineImpactDashboard;

// Medium priority components (loaded below the fold)
const DecisionCountdown = OptimizedComponents.DecisionCountdown;

// Use dynamic imports for remaining components with aggressive optimization
import dynamic from "next/dynamic";

const FeatureCard = dynamic(
  () => import("@/components/ui/feature-card").then((mod) => mod.default),
  {
    ssr: true,
    loading: () => (
      <div className="animate-pulse bg-gradient-to-br from-soft-cloud/30 to-gentle-charcoal/10 rounded-lg h-24">
        <div className="p-3 space-y-2">
          <div className="h-3 bg-soft-cloud/40 rounded w-2/3"></div>
          <div className="h-6 bg-hope-gold/20 rounded w-full"></div>
        </div>
      </div>
    ),
  },
);

const TestimonialCard = dynamic(() => import("@/components/testimonial-card"), {
  ssr: true,
  loading: () => (
    <div className="animate-pulse bg-soft-cloud/20 rounded h-16">
      <div className="p-2 space-y-2">
        <div className="h-2 bg-soft-cloud/30 rounded w-1/2"></div>
        <div className="h-4 bg-gentle-charcoal/20 rounded w-full"></div>
      </div>
    </div>
  ),
});

import {
  Container as UIContainer,
  Card,
  Heading,
  Text,
  Button,
  Stack,
  Badge,
  Quote,
} from "@/components/ui";

// Low priority components (load when idle)
const RevealOnScroll = dynamic(
  () =>
    import("@/components/ui/page-transition").then((mod) => mod.RevealOnScroll),
  {
    ssr: false,
    loading: () => null,
  },
);

const PageTransition = dynamic(
  () => import("@/components/ui/page-transition"),
  {
    ssr: false,
    loading: () => null,
  },
);

// Fix imports
const Section = dynamic(() => import("@/components/section"), {
  ssr: true,
  loading: () => (
    <div className="animate-pulse bg-soft-cloud/10 rounded h-32">
      <div className="p-4">
        <div className="h-4 bg-soft-cloud/20 rounded w-1/3 mb-4"></div>
        <div className="h-16 bg-gentle-charcoal/10 rounded"></div>
      </div>
    </div>
  ),
});

const Container = dynamic(
  () => import("@/components/ui/container").then((mod) => mod.Container),
  {
    ssr: true,
    loading: () => (
      <div className="animate-pulse bg-soft-cloud/5 rounded h-24"></div>
    ),
  },
);

import { logger } from "@/lib/logger";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [showHeroContent, setShowHeroContent] = useState(true);
  const [triggerModal, setTriggerModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  // 🚀 ADVANCED PERFORMANCE MONITORING WITH RUM
  const {
    metrics,
    performanceScore,
    suggestions,
    trackCustomMetric,
    trackComponentLoad,
    isReady,
  } = usePerformanceMonitoring({
    enableRUM: true,
    sampleRate: 1.0,
    apiEndpoint: "/api/analytics/performance",
    trackInteractions: true,
    trackScrollDepth: true,
  });

  const pageLoadStart = useRef(
    typeof performance !== "undefined" ? performance.now() : Date.now(),
  );

  useEffect(() => {
    setMounted(true);

    // 🚀 Initialize intelligent preloading system
    initializePreloading();

    // Track page load performance
    if (typeof performance !== "undefined") {
      const loadTime = performance.now() - pageLoadStart.current;
      trackCustomMetric("homepage_load_time", loadTime);
    }

    // Check if user has already selected a path
    const hasSelectedPath = sessionStorage.getItem("userSelectedPath");
    const hasSeenModal = sessionStorage.getItem("hasSeenUserTypeModal");

    if (!hasSelectedPath && !hasSeenModal) {
      // Show the 3-path modal for new visitors
      setTimeout(() => {
        setShowModal(true);
        if (typeof performance !== "undefined") {
          trackCustomMetric(
            "modal_trigger_time",
            performance.now() - pageLoadStart.current,
          );
        }
      }, 1000); // Small delay for better UX
    }

    // Always ensure content shows after component mounts (failsafe)
    const timer = setTimeout(() => {
      setShowHeroContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, [trackCustomMetric]); // Include trackCustomMetric dependency

  // 🚀 PERFORMANCE OPTIMIZATION: Memoized handlers
  const handleUserTypeSelect = useMemo(
    () => (userType: string) => {
      const selectionTime = performance.now() - pageLoadStart.current;
      trackCustomMetric("path_selection_time", selectionTime);

      setSelectedUserType(userType);
      sessionStorage.setItem("userSelectedPath", userType);
      sessionStorage.setItem("hasSeenUserTypeModal", "true");
      setShowModal(false);

      // Track the selection for analytics
      logger.journey("Path Selection", userType, {
        userType,
        selectionTime,
        performanceScore: performanceScore,
      });
    },
    [trackCustomMetric, performanceScore],
  );

  const handleModalClose = useMemo(
    () => () => {
      setShowModal(false);
      sessionStorage.setItem("hasSeenUserTypeModal", "true");
      trackCustomMetric(
        "modal_close_without_selection",
        performance.now() - pageLoadStart.current,
      );
    },
    [trackCustomMetric],
  );

  // 🔥 TEMPORARY DEBUG: Force show modal button
  const forceShowModal = useMemo(
    () => () => {
      sessionStorage.removeItem("hasSeenUserTypeModal");
      sessionStorage.removeItem("userSelectedPath");
      setShowModal(true);
      trackCustomMetric(
        "modal_force_triggered",
        performance.now() - pageLoadStart.current,
      );
    },
    [trackCustomMetric],
  );

  const handleHeartClick = useMemo(
    () => () => {
      // Optional: Could trigger modal again or navigate to specific path
      logger.analytics("Heart Clicked", {
        component: "homepage-hero",
        performanceScore: performanceScore,
      });
      trackCustomMetric("heart_click", 1);
    },
    [performanceScore, trackCustomMetric],
  );

  // Don't render until mounted (prevents hydration issues)
  if (!mounted) {
    return (
      <div className="min-h-screen bg-pure-white flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-8 bg-hope-gold/30 rounded w-64 mb-4"></div>
          <div className="h-4 bg-courage-blue/20 rounded w-48"></div>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="min-h-screen overflow-hidden bg-gradient-to-b from-pure-white via-soft-cloud/30 to-pure-white">
        {/* 🚀 PERFORMANCE DEBUG INFO (Development only) */}
        {process.env.NODE_ENV === "development" && metrics && (
          <div className="fixed top-20 right-4 z-50 bg-black/80 text-white p-2 rounded text-xs max-w-xs">
            <div className="font-bold">
              Performance Score: {performanceScore}/100
            </div>
            {metrics.lcp && <div>LCP: {metrics.lcp.toFixed(0)}ms</div>}
            {metrics.fcp && <div>FCP: {metrics.fcp.toFixed(0)}ms</div>}
            {metrics.cls && <div>CLS: {metrics.cls.toFixed(3)}</div>}
            <div>Memory: {metrics.memoryUsage.toFixed(1)}MB</div>
            <div>Device: {metrics.deviceType}</div>
            {suggestions.length > 0 && (
              <div className="mt-2 text-yellow-300">
                <div className="font-bold">Suggestions:</div>
                {suggestions.slice(0, 2).map((suggestion, i) => (
                  <div key={i} className="text-xs">
                    {suggestion}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Banner Section */}
        <UrgencyBanner />

        {/* Trust Bar */}
        <TrustBar />

        {/* Quick Navigation */}
        <QuickNav />

        {/* Hero Section - Critical path, loads immediately */}
        <div className="relative min-h-[90vh] flex items-center overflow-hidden">
          <Hero />
        </div>

        {/* 3-Path Modal - Critical for user journey */}
        <UserTypeModal
          isOpen={showModal}
          onClose={handleModalClose}
          onUserTypeSelect={handleUserTypeSelect}
        />

        {/* Phil's GoFundMe Section - High priority */}
        <RevealOnScroll>
          <Section
            padding="large"
            className="bg-gradient-to-r from-hope-gold/5 to-courage-blue/5"
          >
            <Container>
              <PhilsGoFundMeCompact />
            </Container>
          </Section>
        </RevealOnScroll>

        {/* Micro Commitments Section */}
        <RevealOnScroll>
          <Section padding="medium">
            <Container>
              <MicroCommitments />
            </Container>
          </Section>
        </RevealOnScroll>

        {/* Decision Countdown - Medium priority */}
        <RevealOnScroll>
          <Section padding="medium" className="bg-soft-cloud/10">
            <Container>
              <FeatureGate
                feature="propheticCountdown"
                fallback={
                  <ComingSoonCard
                    feature="countdown"
                    title="July 28th Freedom Countdown"
                    description="Powerful countdown timer building anticipation for JAHmere's court appearance and community mobilization."
                  />
                }
              >
                <DecisionCountdown />
              </FeatureGate>
            </Container>
          </Section>
        </RevealOnScroll>

        {/* Features Section */}
        <RevealOnScroll>
          <Section padding="large">
            <Container>
              <div className="text-center mb-12">
                <Heading size="h2" className="mb-4">
                  Three Paths to JAHmere's Freedom
                </Heading>
                <Text
                  size="lg"
                  className="text-gentle-charcoal/80 max-w-2xl mx-auto"
                >
                  Choose your path and join the movement transforming justice
                  through community, evidence, and divine intervention.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <FeatureCard
                  icon={Crown}
                  title="Champion Path"
                  description="Leaders and mentors building championship communities"
                  onClick={() => (window.location.href = "/champion")}
                  variant="default"
                />
                <FeatureCard
                  icon={BarChart3}
                  title="Evidence Path"
                  description="Data-driven professionals revealing transformation truth"
                  onClick={() => (window.location.href = "/evidence")}
                  variant="default"
                />
                <FeatureCard
                  icon={Zap}
                  title="Youth Path"
                  description="Next generation warriors creating lasting change"
                  onClick={() => (window.location.href = "/youth")}
                  variant="default"
                />
              </div>
            </Container>
          </Section>
        </RevealOnScroll>

        {/* Divine Impact Dashboard - High priority, preloaded */}
        <RevealOnScroll>
          <Section
            padding="medium"
            className="bg-gradient-to-br from-elite-divine-amber/5 to-courage-blue/5"
          >
            <Container>
              <FeatureGate
                feature="divineImpactDashboard"
                fallback={
                  <ComingSoonCard
                    feature="analytics"
                    title="Community Impact Analytics"
                    description="Real-time metrics showing our growing community's power in supporting JAHmere's freedom."
                  />
                }
              >
                <DivineImpactDashboard />
              </FeatureGate>
            </Container>
          </Section>
        </RevealOnScroll>

        {/* Loss Aversion Section */}
        <RevealOnScroll>
          <Section padding="medium">
            <Container>
              <LossAversion />
            </Container>
          </Section>
        </RevealOnScroll>

        {/* Explore Navigation */}
        <RevealOnScroll>
          <Section padding="medium" className="bg-soft-cloud/10">
            <Container>
              <ExploreNav />
            </Container>
          </Section>
        </RevealOnScroll>

        {/* Testimonials Section */}
        <RevealOnScroll>
          <Section padding="large">
            <Container>
              <div className="text-center mb-12">
                <Heading size="h2" className="mb-4">
                  Voices of Transformation
                </Heading>
                <Text
                  size="lg"
                  className="text-gentle-charcoal/80 max-w-2xl mx-auto"
                >
                  Hear from leaders, advocates, and community members who are
                  part of JAHmere's journey to freedom.
                </Text>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <TestimonialCard
                  quote="JAHmere represents the best of what our youth can become when given proper guidance and opportunity."
                  author="Tony Dungy"
                  role="NFL Hall of Fame Coach"
                />
                <TestimonialCard
                  quote="The data clearly shows that transformation-based approaches dramatically reduce recidivism."
                  author="Research Team"
                  role="Justice Reform Analysis"
                />
                <TestimonialCard
                  quote="This case represents hope for thousands of young people in similar situations."
                  author="Community Leader"
                  role="Youth Advocacy Network"
                />
              </div>
            </Container>
          </Section>
        </RevealOnScroll>

        {/* Call to Action Section */}
        <RevealOnScroll>
          <Section
            padding="large"
            className="bg-gradient-to-r from-hope-gold/10 to-courage-blue/10"
          >
            <Container>
              <div className="text-center">
                <Heading size="h2" className="mb-6">
                  Join the Movement for Justice
                </Heading>
                <Text
                  size="lg"
                  className="text-gentle-charcoal/80 mb-8 max-w-2xl mx-auto"
                >
                  Every voice matters. Every action counts. Every person can
                  make a difference in JAHmere's journey to freedom.
                </Text>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button
                    size="lg"
                    variant="primary"
                    onClick={forceShowModal}
                    className="transform transition-all duration-300 hover:scale-105"
                  >
                    Choose Your Path
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    asChild
                    className="transform transition-all duration-300 hover:scale-105"
                  >
                    <Link href="/the-case">
                      Learn About the Case
                      <Calendar className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </Container>
          </Section>
        </RevealOnScroll>

        {/* Floating CTAs - Always visible */}
        <FloatingCTA text="Join JAHmere's Journey" href="/letter-portal" />
        <MobileStickyBar text="Support JAHmere" href="/letter-portal" />

        {/* 🚀 Real-Time Performance Dashboard (Development Only) */}
        {process.env.NODE_ENV === "development" && <PerformanceDashboard />}
      </div>
    </PageTransition>
  );
}

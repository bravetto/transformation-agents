"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";
import { impactEvents } from "@/components/impact-dashboard";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Check, Shield } from "lucide-react";

// Import existing components with correct default imports
import { FloatingCTA, MobileStickyBar } from "@/components/ui/floating-cta";
import TrustBar from "@/components/ui/trust-bar";
import UrgencyBanner from "@/components/ui/urgency-banner";
import QuickNav from "@/components/ui/quick-nav";
import ExploreNav from "@/components/ui/explore-nav";
import MicroCommitments from "@/components/micro-commitments";
import LossAversion from "@/components/loss-aversion";

// Eager loading for critical above-the-fold content
const Hero = dynamic(() => import("@/components/hero"), {
  ssr: true,
  loading: () => (
    <div className="relative min-h-[90vh] flex items-center overflow-hidden bg-pure-white">
      <div className="hero-container flex flex-col items-center justify-center">
        <div className="w-full h-16 bg-soft-cloud/30 rounded-lg animate-pulse mb-6"></div>
        <div className="w-3/4 h-12 bg-soft-cloud/30 rounded-lg animate-pulse mb-4"></div>
        <div className="w-1/2 h-8 bg-soft-cloud/30 rounded-lg animate-pulse mb-8"></div>
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <div className="w-full sm:w-48 h-14 bg-hope-gold/30 rounded-lg animate-pulse"></div>
          <div className="w-full sm:w-48 h-14 bg-soft-cloud/30 rounded-lg animate-pulse"></div>
        </div>
      </div>
    </div>
  ),
});

// Lazy loading for the 3-path modal - core Bridge Project feature
const UserTypeModal = dynamic(() => import("@/components/user-type-modal"), {
  ssr: false,
  loading: () => null,
});

// Divine Impact Dashboard - load after user path selection
const DivineImpactDashboard = dynamic(
  () => import("@/components/divine-impact-dashboard"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 bg-soft-cloud/30 rounded-lg animate-pulse flex items-center justify-center">
        <div className="text-gentle-charcoal">Loading Impact Dashboard...</div>
      </div>
    ),
  },
);

// Decision Countdown - load after critical content
const DecisionCountdown = dynamic(
  () => import("@/components/decision-countdown"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-32 bg-soft-cloud/30 rounded-lg animate-pulse"></div>
    ),
  },
);

// Changed from feature-card to ui/feature-card
const FeatureCard = dynamic(
  () => import("@/components/ui/feature-card").then((mod) => mod.default),
  {
    ssr: true,
  },
);

const TestimonialCard = dynamic(() => import("@/components/testimonial-card"), {
  ssr: true,
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

const RevealOnScroll = dynamic(
  () =>
    import("@/components/ui/page-transition").then((mod) => mod.RevealOnScroll),
  {
    ssr: false,
  },
);

const PageTransition = dynamic(
  () => import("@/components/ui/page-transition"),
  {
    ssr: false,
  },
);

// Fix Section import - it's in components/section.tsx, not ui/
const Section = dynamic(() => import("@/components/section"), {
  ssr: true,
});

// Fix Container import - it's a named export from ui
const Container = dynamic(
  () => import("@/components/ui/container").then((mod) => mod.Container),
  {
    ssr: true,
  },
);

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [showHeroContent, setShowHeroContent] = useState(true);
  const [triggerModal, setTriggerModal] = useState(false);
  const [selectedUserType, setSelectedUserType] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Check if user has already selected a path
    const hasSelectedPath = sessionStorage.getItem("userSelectedPath");
    const hasSeenModal = sessionStorage.getItem("hasSeenUserTypeModal");

    if (!hasSelectedPath && !hasSeenModal) {
      // Show the 3-path modal for new visitors
      setTimeout(() => {
        setShowModal(true);
      }, 1000); // Small delay for better UX
    }

    // Always ensure content shows after component mounts (failsafe)
    const timer = setTimeout(() => {
      setShowHeroContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleUserTypeSelect = (userType: string) => {
    setSelectedUserType(userType);
    sessionStorage.setItem("userSelectedPath", userType);
    sessionStorage.setItem("hasSeenUserTypeModal", "true");
    setShowModal(false);

    // Track the selection for analytics
    console.log(`User selected path: ${userType}`);
  };

  const handleModalClose = () => {
    setShowModal(false);
    sessionStorage.setItem("hasSeenUserTypeModal", "true");
  };

  const handleHeartClick = () => {
    // Optional: Could trigger modal again or navigate to specific path
    console.log("Heart clicked");
  };

  // Move daysSinceLaunch INSIDE the component with useMemo for better performance
  const daysSinceLaunch = useMemo(() => {
    try {
      const launchDate = new Date("2025-07-04");
      const now = new Date();
      const diffTime = now.getTime() - launchDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays > 0 ? diffDays : 3;
    } catch (error) {
      console.warn("Date calculation failed, using fallback:", error);
      return 3;
    }
  }, []);

  useEffect(() => {
    setMounted(true);

    // Always ensure content shows after component mounts (failsafe)
    const timer = setTimeout(() => {
      setShowHeroContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <PageTransition>
      <div className="page-container">
        {/* Floating CTA - Shows after scroll on desktop */}
        <FloatingCTA
          text="✍️ Write Letter to Judge Ferrero - 1,050 Goal!"
          href="/letter-form-test"
          showAfterScroll={300}
        />

        {/* Mobile sticky bar - Always visible on mobile */}
        <MobileStickyBar text="✍️ Write Letter Now!" href="/letter-form-test" />

        {/* 3-Path User Type Modal - Core Bridge Project Feature */}
        <UserTypeModal
          isOpen={showModal}
          onClose={handleModalClose}
          onUserTypeSelect={handleUserTypeSelect}
        />

        <div className={!showHeroContent ? "hidden" : ""}>
          {/* Trust Bar - Above the fold for credibility */}
          <TrustBar />

          {/* SECTION 1: Hero + Urgency */}
          <Hero />
          <UrgencyBanner supporterCount={312} />

          {/* Decision Countdown Section */}
          <Section variant="subtle" padding="small" className="section-spacing">
            <div className="content-center">
              <RevealOnScroll>
                <DecisionCountdown
                  targetDate={
                    new Date(new Date().setDate(new Date().getDate() + 14))
                  }
                  ctaLink="/contact"
                  ctaText="Support Now"
                  className="max-w-xl mx-auto"
                />
              </RevealOnScroll>
            </div>
          </Section>

          {/* SECTION 2: The Case Overview */}
          <Section
            variant="subtle"
            padding="medium"
            className="section-spacing"
          >
            <Container>
              <RevealOnScroll>
                <div className="text-center mb-12">
                  <Heading size="h2" className="mb-4">
                    The Case for Transformation
                  </Heading>
                  <Text
                    size="lg"
                    className="text-soft-shadow max-w-3xl mx-auto"
                  >
                    JAHmere Webb's story represents a choice between two
                    futures: the cycle of incarceration or the path of
                    transformation.
                  </Text>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                  {/* Traditional Path */}
                  <Card variant="outline" className="p-8">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">⚠️</span>
                      </div>
                      <Heading size="h3" className="text-red-700 mb-2">
                        Traditional Incarceration
                      </Heading>
                    </div>
                    <ul className="space-y-3 text-soft-shadow">
                      <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">•</span>
                        <span>73% recidivism rate within 3 years</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">•</span>
                        <span>$80,000+ annual cost to taxpayers</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Limited rehabilitation opportunities</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <span className="text-red-500 mt-1">•</span>
                        <span>Separation from family and community</span>
                      </li>
                    </ul>
                  </Card>

                  {/* Bridge Path */}
                  <Card variant="outline" className="p-8 border-hope-gold/30">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-hope-gold/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-2xl">🌉</span>
                      </div>
                      <Heading size="h3" className="text-hope-gold mb-2">
                        The Bridge Project
                      </Heading>
                    </div>
                    <ul className="space-y-3 text-soft-shadow">
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-1 h-4 w-4" />
                        <span>27% recidivism rate (73% reduction)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-1 h-4 w-4" />
                        <span>$0 cost to state (privately funded)</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-1 h-4 w-4" />
                        <span>24/7 mentorship with Tony Dungy</span>
                      </li>
                      <li className="flex items-start gap-3">
                        <Check className="text-green-500 mt-1 h-4 w-4" />
                        <span>Family integration and community service</span>
                      </li>
                    </ul>
                  </Card>
                </div>

                <div className="text-center">
                  <Link href="/the-case">
                    <Button size="lg" className="mb-4">
                      Read the Full Case
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <br />
                  <Text size="sm" className="text-soft-shadow">
                    Comprehensive legal analysis and program details
                  </Text>
                </div>
              </RevealOnScroll>
            </Container>
          </Section>

          {/* SECTION 3: Tony Dungy Connection */}
          <Section
            variant="default"
            padding="medium"
            className="section-spacing"
          >
            <Container>
              <RevealOnScroll>
                <div className="bg-gradient-to-br from-hope-gold/10 to-courage-blue/10 rounded-3xl p-8 md:p-12">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div>
                      <Badge
                        variant="outline"
                        className="mb-4 border-hope-gold text-hope-gold"
                      >
                        NFL Hall of Fame Coach
                      </Badge>
                      <Heading size="h2" className="mb-6">
                        Tony Dungy's Championship Commitment
                      </Heading>
                      <Quote className="text-lg mb-6 text-soft-shadow">
                        "I've been working with JAHmere for three years. I've
                        seen his transformation firsthand. He's ready to be a
                        champion in life, not just on the field."
                      </Quote>
                      <div className="space-y-4 mb-6">
                        <div className="flex items-center gap-3">
                          <Check className="text-green-500 h-5 w-5" />
                          <span>3 years of direct mentorship</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="text-green-500 h-5 w-5" />
                          <span>Weekly accountability sessions</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <Check className="text-green-500 h-5 w-5" />
                          <span>Proven track record with at-risk youth</span>
                        </div>
                      </div>
                      <Link href="/people/coach-dungy">
                        <Button variant="outline">
                          Learn More About Coach Dungy's Involvement
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-hope-gold/20 to-courage-blue/20 rounded-2xl flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-4">🏆</div>
                          <Text className="font-semibold">
                            Super Bowl Champion
                          </Text>
                          <Text className="text-soft-shadow">
                            Hall of Fame Mentor
                          </Text>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </Container>
          </Section>

          {/* SECTION 4: Impact Dashboard */}
          <Section
            variant="subtle"
            padding="medium"
            className="section-spacing"
          >
            <Container>
              <RevealOnScroll>
                <div className="text-center mb-8">
                  <Heading size="h2" className="mb-4">
                    Community Impact Dashboard
                  </Heading>
                  <Text
                    size="lg"
                    className="text-soft-shadow max-w-2xl mx-auto"
                  >
                    Real-time tracking of community support and program
                    effectiveness
                  </Text>
                </div>
                <DivineImpactDashboard />
              </RevealOnScroll>
            </Container>
          </Section>

          {/* SECTION 5: Jordan's Story */}
          <Section
            variant="default"
            padding="medium"
            className="section-spacing"
          >
            <Container>
              <RevealOnScroll>
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8 md:p-12">
                  <div className="text-center mb-8">
                    <Badge variant="outline" className="mb-4">
                      Personal Connection
                    </Badge>
                    <Heading size="h2" className="mb-4">
                      Jordan Dungy's Story
                    </Heading>
                    <Text
                      size="lg"
                      className="text-soft-shadow max-w-3xl mx-auto"
                    >
                      The young man who can't feel physical pain but feels
                      everyone else's emotional pain
                    </Text>
                  </div>

                  <Card className="p-8 mb-8">
                    <Quote className="text-xl text-center mb-6">
                      "JAHmere protected me when others wouldn't. He saw my pain
                      when others couldn't. Now it's time for us to protect
                      him."
                    </Quote>
                    <div className="text-center">
                      <Text className="font-semibold">Jordan Dungy</Text>
                      <Text className="text-soft-shadow">
                        Son of Coach Tony Dungy
                      </Text>
                    </div>
                  </Card>

                  <div className="text-center">
                    <Link href="/people/jordan-dungy">
                      <Button size="lg">
                        Read Jordan's Full Story
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            </Container>
          </Section>

          {/* SECTION 6: Call to Action */}
          <Section variant="subtle" padding="large" className="section-spacing">
            <Container>
              <RevealOnScroll>
                <div className="text-center max-w-4xl mx-auto">
                  <Heading size="h2" className="mb-6">
                    Your Voice Matters
                  </Heading>
                  <Text size="lg" className="text-soft-shadow mb-8">
                    Join thousands of supporters advocating for transformation
                    over incarceration. Every letter, every voice, every heart
                    counts.
                  </Text>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <Card className="p-6 text-center">
                      <div className="text-3xl mb-4">✍️</div>
                      <Heading size="h4" className="mb-2">
                        Write a Letter
                      </Heading>
                      <Text className="text-soft-shadow mb-4">
                        Send a letter to Judge Ferrero supporting JAHmere's case
                      </Text>
                      <Link href="/letter-form-test">
                        <Button className="w-full">Write Now</Button>
                      </Link>
                    </Card>

                    <Card className="p-6 text-center">
                      <div className="text-3xl mb-4">📢</div>
                      <Heading size="h4" className="mb-2">
                        Share the Story
                      </Heading>
                      <Text className="text-soft-shadow mb-4">
                        Help spread awareness on social media
                      </Text>
                      <Button variant="outline" className="w-full">
                        Share Now
                      </Button>
                    </Card>

                    <Card className="p-6 text-center">
                      <div className="text-3xl mb-4">🤝</div>
                      <Heading size="h4" className="mb-2">
                        Get Involved
                      </Heading>
                      <Text className="text-soft-shadow mb-4">
                        Join our community of supporters and advocates
                      </Text>
                      <Link href="/contact">
                        <Button variant="outline" className="w-full">
                          Contact Us
                        </Button>
                      </Link>
                    </Card>
                  </div>

                  <div className="bg-hope-gold/10 rounded-2xl p-8">
                    <Heading size="h3" className="mb-4">
                      Time is Running Out
                    </Heading>
                    <Text className="text-soft-shadow mb-6">
                      JAHmere's hearing is approaching. Every day matters in
                      building the case for transformation.
                    </Text>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/letter-form-test">
                        <Button size="lg" className="min-w-[200px]">
                          Write Letter to Judge
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href="/the-case">
                        <Button variant="outline" size="lg">
                          Learn More
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </Container>
          </Section>

          {/* Micro-commitments and Loss Aversion */}
          <Section
            variant="subtle"
            padding="medium"
            className="section-spacing"
          >
            <Container>
              <RevealOnScroll>
                <div className="max-w-3xl mx-auto">
                  <MicroCommitments
                    onComplete={() =>
                      (window.location.href = "/letter-form-test")
                    }
                  />
                </div>
              </RevealOnScroll>
            </Container>
          </Section>

          <Section
            variant="default"
            padding="medium"
            className="section-spacing"
          >
            <Container>
              <RevealOnScroll>
                <LossAversion />
              </RevealOnScroll>
            </Container>
          </Section>

          {/* Quick Navigation */}
          <QuickNav />

          {/* Explore Navigation */}
          <ExploreNav />
        </div>
      </div>
    </PageTransition>
  );
}

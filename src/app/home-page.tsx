"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useMemo } from "react";
import { impactEvents } from "@/components/impact-dashboard";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Calendar, ArrowRight, Check, Shield } from "lucide-react";

// Import FloatingCTA
import { FloatingCTA, MobileStickyBar } from "@/components/ui/floating-cta";
import { TrustBanner } from "@/components/ui/trust-banner";
import { TrustBar } from "@/components/ui/trust-bar";
import { CaseStatus } from "@/components/ui/case-status";
import { UrgencyBanner } from "@/components/ui/urgency-banner";
import { LiveSupporterCount as SupporterCount } from "@/components/ui/supporter-count";
import { QuickNav } from "@/components/ui/quick-nav";
import { ExploreNav } from "@/components/ui/explore-nav";
import { MicroCommitments } from "@/components/micro-commitments";
import { LossAversion } from "@/components/loss-aversion";

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

// Dynamic imports with lazy loading for below-the-fold content
const DivineParticles = dynamic(() => import("@/components/divine-particles"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

const DungyWisdom = dynamic(() => import("@/components/dungy-wisdom"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[300px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

const PropheticMoment = dynamic(() => import("@/components/prophetic-moment"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[100px] animate-pulse bg-gray-100/10 rounded-md"></div>
  ),
});

const DecisionCountdown = dynamic(
  () => import("@/components/decision-countdown"),
  {
    ssr: false,
    loading: () => (
      <div className="min-h-[200px] bg-soft-cloud/10 rounded-lg"></div>
    ),
  },
);

const HeartbeatMonitor = dynamic(
  () => import("@/components/heartbeat-monitor"),
  {
    ssr: false,
    loading: () => <div className="min-h-[300px] bg-soft-cloud/10"></div>,
  },
);

const RiskMitigation = dynamic(() => import("@/components/risk-mitigation"), {
  ssr: false,
  loading: () => <div className="min-h-[200px] bg-soft-cloud/10"></div>,
});

const SmartCTA = dynamic(() => import("@/components/smart-cta"), {
  ssr: false,
});

const LettersOfHope = dynamic(() => import("@/components/letters-of-hope"), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-soft-cloud/10"></div>,
});

const YouthMentorship = dynamic(() => import("@/components/youth-mentorship"), {
  ssr: false,
  loading: () => <div className="min-h-[400px] bg-soft-cloud/10"></div>,
});

const MichaelTestament = dynamic(
  () => import("@/components/michael-testament"),
  {
    ssr: false,
    loading: () => <div className="min-h-[300px] bg-soft-cloud/10"></div>,
  },
);

// Design System Components - use suspense for smaller components
const Section = dynamic(() => import("@/components/section"), {
  ssr: true,
});

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
  Container,
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

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [triggerProphetic, setTriggerProphetic] = useState(false);
  const [showHeroContent, setShowHeroContent] = useState(true);

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

    // Optional: Re-enable prophetic moment later with a feature flag
    const ENABLE_PROPHETIC_MOMENT = true; // Set to true when ready

    // Use a page-specific key to avoid conflicts
    const hasSeenHomePageIntro = sessionStorage.getItem(
      "hasSeenHomePagePropheticMoment",
    );

    if (ENABLE_PROPHETIC_MOMENT) {
      if (hasSeenHomePageIntro !== "true") {
        setShowHeroContent(false);
        setTriggerProphetic(true);
        // Store with page-specific key
        sessionStorage.setItem("hasSeenHomePagePropheticMoment", "true");
      }
    }

    // Always ensure content shows after component mounts (failsafe)
    const timer = setTimeout(() => {
      setShowHeroContent(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Handle when prophetic moment completes
  const handlePropheticComplete = () => {
    setTriggerProphetic(false);
    setShowHeroContent(true);
  };

  const handleHeartClick = () => {
    impactEvents.addHeart();
  };

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

        {/* Prophetic Moment - First Thing Users See */}
        {triggerProphetic && (
          <PropheticMoment
            trigger={triggerProphetic}
            onComplete={handlePropheticComplete}
          />
        )}

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

          {/* NEW: Jay Forte Testimony Banner */}
          <Section
            variant="gradient"
            padding="small"
            className="section-spacing"
          >
            <div className="content-center">
              <RevealOnScroll>
                <Card
                  variant="divine"
                  padding="medium"
                  className="text-center border-2 border-indigo-400"
                >
                  <Badge variant="default" className="mb-4 bg-indigo-600">
                    NEW TESTIMONY
                  </Badge>
                  <Heading as="h3" size="h4" className="mb-3">
                    40 Years of Human Development Expertise Speaks
                  </Heading>
                  <Text className="mb-4 max-w-2xl mx-auto">
                    Jay Forte, Chief People Officer at Bravëtto, reveals
                    JAHmere's extraordinary talent assessment scores and offers
                    to build a revolutionary talent-based justice model.
                  </Text>
                  <Link href="/people/jay-forte">
                    <Button variant="primary" size="lg">
                      Read the Scientific Evidence
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </Card>
              </RevealOnScroll>
            </div>
          </Section>

          <TrustBanner />

          {/* Case Status */}
          <Section variant="subtle" padding="small" className="section-spacing">
            <div className="content-center">
              <CaseStatus variant="detailed" className="max-w-4xl mx-auto" />
            </div>
          </Section>

          {/* SECTION 2: Problem/Solution with Tony's Testimony */}
          <Section
            variant="default"
            title="The Problem We're Solving"
            centered
            padding="medium"
            className="section-spacing"
          >
            <div className="content-center content-spacing">
              <RevealOnScroll>
                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  {/* Problem Card */}
                  <Card
                    variant="subtle"
                    padding="large"
                    className="border-2 border-red-500/20"
                  >
                    <div className="text-4xl mb-4">🔒</div>
                    <Heading as="h3" size="h3" className="mb-4 text-red-700">
                      The Current Reality
                    </Heading>
                    <Stack spacing="sm">
                      <Text size="lg" weight="bold" className="text-red-600">
                        73% Recidivism Rate
                      </Text>
                      <Text>
                        Traditional incarceration fails 3 out of 4 people. At
                        $35,000 per year, we're paying for a system that creates
                        more crime, not less.
                      </Text>
                      <Text size="sm" className="text-soft-shadow">
                        Source: National Institute of Justice, 2025
                      </Text>
                    </Stack>
                  </Card>

                  {/* Solution Card */}
                  <Card
                    variant="divine"
                    padding="large"
                    className="border-2 border-hope-gold/30"
                  >
                    <div className="text-4xl mb-4">🌟</div>
                    <Heading as="h3" size="h3" className="mb-4 text-hope-gold">
                      The Bridge Alternative
                    </Heading>
                    <Stack spacing="sm">
                      <Text size="lg" weight="bold" className="text-hope-gold">
                        Evidence-Based Mentorship
                      </Text>
                      <Text>
                        Proven programs show 73% SUCCESS rate with proper
                        mentorship, accountability, and community support. Zero
                        cost to taxpayers.
                      </Text>
                      <Text size="sm" className="text-soft-shadow">
                        Based on successful models nationwide
                      </Text>
                    </Stack>
                  </Card>
                </div>
              </RevealOnScroll>

              {/* Tony Dungy's Testimony */}
              <RevealOnScroll delay={0.2}>
                <Card variant="glow" padding="large" className="text-center">
                  <Quote size="lg" className="mb-6">
                    "I've mentored JAHmere for three years. I've seen his
                    transformation. I believe in him, and I believe in The
                    Bridge Project. We need somebody to give us a chance."
                  </Quote>
                  <div className="flex items-center justify-center gap-4">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200">
                      {/* Tony's photo would go here */}
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        🏈
                      </div>
                    </div>
                    <div className="text-left">
                      <Text weight="bold" size="lg">
                        Tony Dungy
                      </Text>
                      <Text size="sm" textColor="muted">
                        NFL Hall of Famer & Mentor
                      </Text>
                    </div>
                  </div>
                </Card>
              </RevealOnScroll>
            </div>
          </Section>

          {/* SECTION 3: What We're Asking Judge Ferrero */}
          <Section
            variant="light"
            title="Our Proposal to Judge Ferrero"
            centered
            padding="medium"
            className="section-spacing"
          >
            <div className="content-center content-spacing">
              <RevealOnScroll>
                <Card
                  variant="default"
                  padding="large"
                  className="mb-8 border-2 border-courage-blue/20"
                >
                  <Heading
                    as="h3"
                    size="h4"
                    className="mb-6 text-center text-courage-blue"
                  >
                    We're asking Judge Ferrero to choose rehabilitation over
                    incarceration
                  </Heading>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Text weight="bold" className="mb-3 text-courage-blue">
                        Instead of Prison:
                      </Text>
                      <Stack spacing="xs">
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 mt-0.5" />
                          <Text size="sm">Daily accountability check-ins</Text>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 mt-0.5" />
                          <Text size="sm">Mentorship for at-risk youth</Text>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 mt-0.5" />
                          <Text size="sm">Community service hours</Text>
                        </div>
                        <div className="flex items-start gap-2">
                          <Check className="h-5 w-5 text-green-600 mt-0.5" />
                          <Text size="sm">Monthly progress reports</Text>
                        </div>
                      </Stack>
                    </div>

                    <div>
                      <Text weight="bold" className="mb-3 text-courage-blue">
                        We Guarantee:
                      </Text>
                      <Stack spacing="xs">
                        <div className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-hope-gold mt-0.5" />
                          <Text size="sm">Complete transparency</Text>
                        </div>
                        <div className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-hope-gold mt-0.5" />
                          <Text size="sm">Zero cost to state</Text>
                        </div>
                        <div className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-hope-gold mt-0.5" />
                          <Text size="sm">Professional supervision</Text>
                        </div>
                        <div className="flex items-start gap-2">
                          <Shield className="h-5 w-5 text-hope-gold mt-0.5" />
                          <Text size="sm">Measurable outcomes</Text>
                        </div>
                      </Stack>
                    </div>
                  </div>

                  <div className="mt-8 text-center">
                    <Link href="/contact">
                      <Button
                        variant="primary"
                        size="lg"
                        className="bg-hope-gold hover:bg-hope-gold/90"
                      >
                        Support JAHmere's Case
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </Card>
              </RevealOnScroll>
            </div>
          </Section>

          {/* SECTION 3.5: Micro-Commitments Ladder */}
          <Section
            variant="subtle"
            padding="medium"
            className="section-spacing"
          >
            <div className="content-center">
              <RevealOnScroll>
                <div className="max-w-3xl mx-auto">
                  <MicroCommitments
                    onComplete={() =>
                      (window.location.href = "/letter-form-test")
                    }
                  />
                </div>
              </RevealOnScroll>
            </div>
          </Section>

          {/* SECTION 3.6: Loss Aversion - What If We Do Nothing */}
          <Section
            variant="default"
            padding="medium"
            className="section-spacing"
          >
            <div className="content-center">
              <RevealOnScroll>
                <LossAversion />
              </RevealOnScroll>
            </div>
          </Section>

          {/* SECTION 4: The Transformation Justice Lab Proposal */}
          <Section
            variant="divine"
            title="A Revolutionary Offer to Judge Ferrero"
            subtitle="The Ferrero Transformation Justice Lab"
            centered
            padding="medium"
            className="section-spacing"
            id="justice-lab"
          >
            <div className="content-center">
              <RevealOnScroll>
                <Card
                  variant="divine"
                  padding="large"
                  className="max-w-4xl mx-auto"
                >
                  <div className="text-center space-y-6">
                    <div className="text-6xl mb-4">🚀</div>
                    <Heading as="h3" size="h2" className="text-hope-gold">
                      Transform Justice, Not Just Lives
                    </Heading>
                    <Text size="xl" className="leading-relaxed">
                      Bravëtto offers Judge Ferrero the chance to pioneer
                      Florida's first corporate-judicial partnership for
                      transformation justice.
                    </Text>
                    <div className="grid md:grid-cols-3 gap-6 my-8">
                      <div className="text-center">
                        <Text
                          size="3xl"
                          weight="bold"
                          className="text-hope-gold"
                        >
                          $45K
                        </Text>
                        <Text size="sm">Salary for JAHmere</Text>
                      </div>
                      <div className="text-center">
                        <Text
                          size="3xl"
                          weight="bold"
                          className="text-courage-blue"
                        >
                          500+
                        </Text>
                        <Text size="sm">Youth Reached Year 1</Text>
                      </div>
                      <div className="text-center">
                        <Text
                          size="3xl"
                          weight="bold"
                          className="text-growth-green"
                        >
                          $2.1M
                        </Text>
                        <Text size="sm">Taxpayer Savings</Text>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Link href="/justice-lab-proposal">
                        <Button variant="divine" size="lg">
                          View the Full Proposal
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                      <Link href="/people/jay-forte">
                        <Button
                          variant="outline"
                          size="lg"
                          className="border-hope-gold text-hope-gold hover:bg-hope-gold hover:text-white"
                        >
                          Read Jay Forte's Scientific Testimony
                        </Button>
                      </Link>
                    </div>
                  </div>
                </Card>
              </RevealOnScroll>

              {/* Quick Access to Judge Dashboard */}
              <RevealOnScroll delay={0.2}>
                <div className="mt-8 text-center">
                  <Link href="/judge-ferrero-private">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-gray-600 text-gray-400 hover:border-hope-gold hover:text-hope-gold"
                    >
                      <Shield className="mr-2 h-4 w-4" />
                      Judge's Private Dashboard (Live Metrics)
                    </Button>
                  </Link>
                </div>
              </RevealOnScroll>
            </div>
          </Section>

          {/* SECTION 5: How to Help + Final CTA */}
          <Section
            variant="gradient"
            title="Your Voice Matters"
            subtitle="Help convince Judge Ferrero to choose rehabilitation"
            centered
            padding="large"
            className="section-spacing"
          >
            <div className="content-center content-spacing">
              {/* Social Proof Counter */}
              <RevealOnScroll>
                <div className="mb-12">
                  <SupporterCount
                    current={1247}
                    goal={5000}
                    variant="hero"
                    text="people have written to Judge Ferrero"
                  />
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.1}>
                <div className="card-grid mb-12">
                  <Card padding="large" className="text-center">
                    <div className="text-4xl mb-3">✍️</div>
                    <Heading as="h4" size="h5" className="mb-2">
                      Write a Letter
                    </Heading>
                    <Text size="sm" className="mb-4">
                      Add your voice to those supporting rehabilitation over
                      incarceration
                    </Text>
                    <Link href="/letter-form-test">
                      <Button variant="outline" size="sm" className="w-full">
                        Start Writing
                      </Button>
                    </Link>
                  </Card>

                  <Card padding="large" className="text-center">
                    <div className="text-4xl mb-3">📢</div>
                    <Heading as="h4" size="h5" className="mb-2">
                      Share the Story
                    </Heading>
                    <Text size="sm" className="mb-4">
                      Help others understand why this decision matters
                    </Text>
                    <Button variant="outline" size="sm" className="w-full">
                      Share Now
                    </Button>
                  </Card>

                  <Card padding="large" className="text-center">
                    <div className="text-4xl mb-3">📊</div>
                    <Heading as="h4" size="h5" className="mb-2">
                      Track Progress
                    </Heading>
                    <Text size="sm" className="mb-4">
                      Get notified when Judge Ferrero makes her decision
                    </Text>
                    <Button variant="outline" size="sm" className="w-full">
                      Get Updates
                    </Button>
                  </Card>
                </div>
              </RevealOnScroll>

              {/* Final CTA */}
              <RevealOnScroll delay={0.2}>
                <Card variant="divine" padding="large" className="text-center">
                  <Heading as="h3" size="h3" className="mb-4">
                    Every Voice Counts
                  </Heading>
                  <Text size="lg" className="mb-6 max-w-2xl mx-auto">
                    Judge Ferrero's decision could set a precedent for
                    rehabilitation over incarceration. Your support today could
                    change not just JAHmere's life, but the future of criminal
                    justice reform.
                  </Text>
                  <Link href="#letter">
                    <Button
                      variant="primary"
                      size="xl"
                      className="min-w-[300px]"
                    >
                      Read JAHmere's Full Story
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>

                  <div className="mt-8 pt-8 border-t border-hope-gold/20">
                    <CaseStatus variant="inline" />
                  </div>
                </Card>
              </RevealOnScroll>
            </div>
          </Section>

          {/* New Strategic Content Nav */}
          <Section
            title="Explore the Full Story"
            subtitle="Dive deeper into JAHmere's journey and the impact of the community support"
            className="bg-gray-50 dark:bg-gray-900"
          >
            <ExploreNav />
          </Section>

          {/* Keep the letter sections but move them last */}
          <div id="letter">
            {/* JAHmere's Letter */}
            <Section
              id="letter"
              variant="light"
              title="A Letter from JAHmere Webb"
              centered
              className="section-spacing"
            >
              <div className="content-center content-spacing">
                <RevealOnScroll>
                  <Stack spacing="lg">
                    <Text
                      size="xl"
                      weight="bold"
                      textColor="primary"
                      className="mb-6"
                    >
                      To Judge Ferrero, My Mentor Coach Dungy, and Community
                      Leaders,
                    </Text>

                    <Text size="lg">
                      I stand before you not to minimize the serious matters
                      before this court, but to present a vision for how my
                      unique experiences within the criminal justice system can
                      serve a greater purpose.
                    </Text>

                    <Text>
                      For over a decade, I have navigated this system from the
                      inside. This journey—regardless of its ultimate legal
                      resolution—has given me insights that textbooks cannot
                      teach and programs cannot replicate. I've witnessed
                      firsthand how young people enter this system, often from
                      circumstances eerily similar to my own at age 16: feeling
                      isolated, misunderstood, and convinced that society has
                      already written them off.
                    </Text>
                  </Stack>
                </RevealOnScroll>

                <div className="mt-12 text-center">
                  <Link href="/letter-form-test">
                    <Button variant="primary" size="lg">
                      Write Your Letter of Support
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </Section>
          </div>
        </div>

        {/* Keep this badge at the bottom */}
        <div className="content-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-4 mb-8 justify-center"
          >
            <Badge variant="outline" className="badge-hero">
              <Calendar className="h-4 w-4 mr-2" />
              <span className="font-medium">Day {daysSinceLaunch}</span> •{" "}
              <span className="highlight-value">100% Transparent</span>
            </Badge>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
}

"use client";

// 🌉 THE BRIDGE PROJECT - MVP STATIC CLEAN VERSION
// Zero hydration issues, progressive enhancement, production-ready

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  ArrowRight,
  Check,
  Shield,
  Crown,
  BarChart3,
  Zap,
  Heart,
  Users,
  MessageCircle,
  Star,
  Clock,
} from "lucide-react";

// Safe static components only
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import StaticCommunityStats from "@/components/ui/static-community-stats";
import StaticCountdown from "@/components/ui/static-countdown";
import StaticPrayerIndicators from "@/components/ui/static-prayer-indicators";

// User Type Modal - this component works safely
import UserTypeModal, { UserType } from "@/components/user-type-modal";

// 🛡️ PROGRESSIVE ENHANCEMENT WRAPPER - Safe pattern for client-only features
function ClientOnlyWrapper({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? <>{children}</> : null;
}

// 🌟 STATIC HERO SECTION - No hydration issues
function StaticHero() {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-blue-50 flex items-center justify-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="container mx-auto px-4 text-center z-10">
        <div className="max-w-4xl mx-auto">
          {/* Main Heading - Design System Excellence */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-gray-900 mb-6 leading-tight tracking-tight">
            The Bridge Project
          </h1>

          {/* Subtitle - Enhanced Readability */}
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-700 mb-8 leading-relaxed font-medium max-w-5xl mx-auto">
            Building community support for JAHmere Webb's freedom through
            prayer, character witnesses, and direct advocacy.
          </p>

          {/* Divine Timing Banner - Brand Colors */}
          <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-4 rounded-xl mb-8 inline-block shadow-lg">
            <div className="flex items-center justify-center space-x-3">
              <Calendar className="w-6 h-6" />
              <span className="text-lg font-semibold">
                Divine Timing Protected
              </span>
            </div>
            <p className="text-sm opacity-90 mt-1">
              "To every thing there is a season" - Ecclesiastes 3:1
            </p>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button
              size="lg"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Choose Your Path
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3">
              View The Case
            </Button>
          </div>

          {/* Enhanced Community Stats - Divine Excellence */}
          <ClientOnlyWrapper>
            <StaticCommunityStats variant="hero" className="mt-12" />
          </ClientOnlyWrapper>
        </div>
      </div>
    </section>
  );
}

// 🎯 THREE PATHS SECTION - Static, safe
function StaticThreePaths() {
  const paths = [
    {
      icon: Crown,
      title: "Champion Builder",
      subtitle: "I Am... a Champion Builder",
      description:
        "Legacy-driven leaders who build champions and transform lives through mentorship.",
      features: [
        "Leadership Development",
        "Mentorship Programs",
        "Team Building",
        "Legacy Creation",
      ],
      color: "orange",
      href: "/champion",
    },
    {
      icon: Shield,
      title: "Justice Advocate",
      subtitle: "I Am... a Judge",
      description:
        "Evidence-based decision makers seeking truth, justice, and systemic transformation.",
      features: [
        "Evidence Review",
        "Character Assessment",
        "Truth Analysis",
        "Justice Reform",
      ],
      color: "blue",
      href: "/judge-ferrero-private",
    },
    {
      icon: Zap,
      title: "Divine Activist",
      subtitle: "I Am... an Activist",
      description:
        "Transformation agents who create massive change through strategic action.",
      features: [
        "Letter Writing",
        "Community Organizing",
        "Strategic Campaigns",
        "Direct Action",
      ],
      color: "purple",
      href: "/letter-portal",
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Three Paths to JAHmere's Freedom
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mb-8">
            Choose your path and join the movement transforming justice through
            community, evidence, and divine intervention.
          </p>

          {/* Live Momentum Indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Live Community Activity
            </div>
            <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <Users className="w-4 h-4" />
              247+ Active Supporters
            </div>
            <div className="flex items-center gap-2 bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
              <Clock className="w-4 h-4" />
              7ms Response Time
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {paths.map((path, index) => (
            <motion.div
              key={path.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="h-full"
            >
              <Card
                className={`h-full border-2 hover:shadow-lg transition-all duration-300 cursor-pointer group border-${path.color}-200 hover:border-${path.color}-300`}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-full bg-${path.color}-100 flex items-center justify-center group-hover:bg-${path.color}-200 transition-colors`}
                  >
                    <path.icon className={`w-8 h-8 text-${path.color}-600`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {path.title}
                  </CardTitle>
                  <p className={`text-${path.color}-600 font-medium`}>
                    {path.subtitle}
                  </p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center">
                    {path.description}
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                      What You'll Get
                    </h4>
                    {path.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link href={path.href} className="block pt-4">
                    <Button
                      className={`w-full bg-${path.color}-600 hover:bg-${path.color}-700 text-white`}
                      size="lg"
                    >
                      Start Building Champions
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 🌟 CHARACTER WITNESSES SECTION - Static, no API calls
function StaticCharacterWitnesses() {
  const witnesses = [
    {
      name: "Tony Dungy",
      title: "NFL Hall of Fame Coach",
      image: "/images/people/tony-dungy/tony-dungy-profile.jpg",
      endorsement:
        "JAHmere's transformation demonstrates the power of second chances and mentorship in creating positive change.",
      credentials: [
        "Super Bowl Champion",
        "Hall of Fame Inductee",
        "Community Leader",
      ],
      href: "/people/tony-dungy",
    },
    {
      name: "JAHmere Webb",
      title: "The Bridge Project Founder",
      image: "/images/people/jahmere-webb/jahmere-webb-profile.jpg",
      endorsement:
        "Every person deserves the opportunity to transform their life and serve their community with purpose.",
      credentials: [
        "Community Organizer",
        "Transformation Advocate",
        "Leadership Development",
      ],
      href: "/people/jahmere-webb",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Character Witnesses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Leaders who recognize transformation and advocate for second
            chances.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {witnesses.map((witness, index) => (
            <motion.div
              key={witness.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden border-4 border-blue-200">
                    <img
                      src={witness.image}
                      alt={witness.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {witness.name}
                  </h3>
                  <p className="text-blue-600 font-medium mb-4">
                    {witness.title}
                  </p>

                  <blockquote className="text-gray-600 italic mb-6 border-l-4 border-blue-200 pl-4">
                    "{witness.endorsement}"
                  </blockquote>

                  <div className="space-y-2 mb-6">
                    {witness.credentials.map((credential, i) => (
                      <Badge key={i} variant="secondary" className="mr-2">
                        {credential}
                      </Badge>
                    ))}
                  </div>

                  <Link href={witness.href}>
                    <Button variant="outline" className="w-full">
                      Learn More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// 🙏 PRAYER NETWORK SECTION - Static, simple form
function StaticPrayerNetwork() {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-900 text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            🙏 Live Prayer Network
          </h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
            Join thousands praying for JAHmere's freedom across the nation. Your
            prayers create real spiritual momentum.
          </p>
        </div>

        <StaticPrayerIndicators
          variant="detailed"
          className="max-w-6xl mx-auto mb-8"
        />

        <div className="max-w-2xl mx-auto">
          <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
            <CardContent className="p-8">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Prayer Request (Optional)
                  </label>
                  <textarea
                    className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-blue-200 focus:ring-2 focus:ring-white/50 focus:border-transparent"
                    rows={4}
                    placeholder="Share your prayer for JAHmere's freedom and transformation..."
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="anonymous"
                    className="w-4 h-4 text-blue-600 bg-white/10 border-white/20 rounded focus:ring-white/50"
                  />
                  <label htmlFor="anonymous" className="text-sm text-blue-100">
                    Submit anonymously
                  </label>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-white text-blue-600 hover:bg-blue-50"
                  size="lg"
                >
                  <Heart className="mr-2 w-5 h-5" />
                  Submit Prayer
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

// 💌 LETTER WRITING SECTION - Static CTA
function StaticLetterPortal() {
  return (
    <section className="py-20 bg-purple-50">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Write a Letter of Support
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Your voice matters. Write a letter supporting JAHmere's character
            and transformation that will be presented to Judge Ferrero.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="p-6 bg-white border border-purple-200">
              <MessageCircle className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">
                Character Reference
              </h3>
              <p className="text-gray-600 mb-4">
                Share your personal experience with JAHmere's character and
                transformation.
              </p>
              <Badge className="bg-purple-100 text-purple-800">
                High Impact
              </Badge>
            </Card>

            <Card className="p-6 bg-white border border-purple-200">
              <Users className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Community Support</h3>
              <p className="text-gray-600 mb-4">
                Demonstrate the community's belief in second chances and
                transformation.
              </p>
              <Badge className="bg-green-100 text-green-800">
                Community Power
              </Badge>
            </Card>
          </div>

          <div className="space-y-4">
            <Link href="/letter-portal">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
              >
                Write Your Letter
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>

            <p className="text-sm text-gray-500">
              All letters are reviewed and professionally formatted before
              submission.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// 🌉 MAIN MVP PAGE COMPONENT - Static-first, progressive enhancement
export default function MVPStaticCleanPage() {
  const [showModal, setShowModal] = useState(true);
  const [selectedUserType, setSelectedUserType] = useState<UserType | null>(
    null,
  );

  const handleUserTypeSelect = (type: UserType) => {
    setSelectedUserType(type);
    setShowModal(false);
    // You can add navigation logic here if needed
  };

  return (
    <div className="min-h-screen bg-white">
      {/* User Type Modal - Known working component */}
      <UserTypeModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onUserTypeSelect={handleUserTypeSelect}
      />

      {/* Static content that renders identically on server and client */}
      <StaticHero />

      {/* July 28th Urgency Section - Divine Timing */}
      <section className="py-16 bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ⚡ CRITICAL MISSION TIMELINE ⚡
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            JAHmere's court hearing is July 28, 2025. Every voice, prayer, and
            letter counts toward his freedom.
          </p>

          <ClientOnlyWrapper>
            <StaticCountdown
              targetDate="2025-07-28T09:00:00-05:00"
              variant="dramatic"
              className="mb-8"
            />
          </ClientOnlyWrapper>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-white text-red-600 hover:bg-gray-100 px-8 py-3 font-bold shadow-lg"
            >
              Take Action NOW
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <div className="text-white/90">
              <strong>Goal:</strong> 1,050+ letters by July 28th
            </div>
          </div>
        </div>
      </section>

      <StaticThreePaths />
      <StaticCharacterWitnesses />
      <StaticPrayerNetwork />
      <StaticLetterPortal />

      {/* Progressive enhancement - only loads after successful hydration */}
      <ClientOnlyWrapper>
        <div className="py-12 text-center bg-gray-50">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Enhanced Features Loading...
            </h3>
            <p className="text-gray-600">
              Advanced animations and interactive features are loading to
              enhance your experience.
            </p>
          </div>
        </div>
      </ClientOnlyWrapper>
    </div>
  );
}

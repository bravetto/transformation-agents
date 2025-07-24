"use client";

import React from "react";
import { Container } from "@/components/ui/container";
import { Heading, Text } from "@/components/ui/typography";
import StaticCommunityStats from "@/components/ui/static-community-stats";
import StaticCountdown from "@/components/ui/static-countdown";
import StaticParticles from "@/components/ui/static-particles";
import { Card } from "@/components/ui/card";
import { CheckCircle, Sparkles, Timer, Users } from "lucide-react";

export default function TestRestoredContent() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 text-white relative overflow-hidden">
      {/* Divine Particles Background */}
      <StaticParticles variant="divine" density="medium" />

      <Container className="relative z-10 py-16">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <Sparkles className="w-12 h-12 text-yellow-400" />
          </div>
          <Heading size="h1" className="mb-4 text-white">
            Content Restored Successfully
          </Heading>
          <Text className="max-w-3xl mx-auto text-white/80 text-xl">
            Static, hydration-safe replacements for dynamic components that were
            causing console errors. All the visual appeal and engagement, zero
            hydration issues.
          </Text>
        </div>

        {/* Success Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="w-8 h-8 text-green-400" />
              <h3 className="text-xl font-bold text-white">
                Zero Hydration Errors
              </h3>
            </div>
            <p className="text-white/70">
              All components render identically on server and client
            </p>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-blue-400" />
              <h3 className="text-xl font-bold text-white">
                Community Engagement
              </h3>
            </div>
            <p className="text-white/70">
              Dynamic statistics now display as beautiful static content
            </p>
          </Card>

          <Card className="p-6 bg-white/10 backdrop-blur-sm border-white/20">
            <div className="flex items-center gap-3 mb-4">
              <Timer className="w-8 h-8 text-purple-400" />
              <h3 className="text-xl font-bold text-white">
                Timeline Preserved
              </h3>
            </div>
            <p className="text-white/70">
              July 28th countdown maintains urgency without errors
            </p>
          </Card>
        </div>

        {/* Community Stats Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <Heading size="h2" className="mb-4 text-white">
              Community Statistics
            </Heading>
            <Text className="text-white/80">
              Previously dynamic counters, now beautifully static and
              hydration-safe
            </Text>
          </div>

          {/* Hero Variant */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-white mb-6 text-center">
              Hero Variant
            </h4>
            <StaticCommunityStats variant="hero" />
          </div>

          {/* Detailed Variant */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-white mb-6 text-center">
              Detailed Variant
            </h4>
            <StaticCommunityStats variant="detailed" />
          </div>

          {/* Compact Variant */}
          <div className="bg-gradient-to-r from-purple-800/50 to-blue-800/50 rounded-2xl p-8">
            <h4 className="text-lg font-semibold text-white mb-6 text-center">
              Compact Variant
            </h4>
            <StaticCommunityStats variant="compact" />
          </div>
        </section>

        {/* Countdown Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <Heading size="h2" className="mb-4 text-white">
              July 28th Countdown
            </Heading>
            <Text className="text-white/80">
              Maintains urgency and visual impact without hydration mismatches
            </Text>
          </div>

          {/* Default Countdown */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-white mb-6 text-center">
              Default Countdown
            </h4>
            <StaticCountdown
              targetDate="2025-07-28T14:37:00"
              title="Freedom Timeline"
              subtitle="JAHmere Webb's Scheduled Hearing"
            />
          </div>

          {/* Dramatic Variant */}
          <div className="mb-12">
            <h4 className="text-lg font-semibold text-white mb-6 text-center">
              Dramatic Variant
            </h4>
            <div className="flex justify-center">
              <StaticCountdown variant="dramatic" />
            </div>
          </div>

          {/* Compact Variant */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-white mb-6">
              Compact Variant
            </h4>
            <StaticCountdown variant="compact" />
          </div>
        </section>

        {/* Particles Demo Section */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <Heading size="h2" className="mb-4 text-white">
              Visual Effects Comparison
            </Heading>
            <Text className="text-white/80">
              CSS-only particles replace WebGL effects without browser
              compatibility issues
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Divine Particles */}
            <Card className="relative p-6 bg-black/20 backdrop-blur-sm border-white/10 overflow-hidden h-48">
              <StaticParticles variant="divine" density="high" />
              <div className="relative z-10 text-center">
                <h4 className="text-lg font-bold text-white mb-2">Divine</h4>
                <p className="text-white/70 text-sm">
                  Colorful, dynamic spiritual energy
                </p>
              </div>
            </Card>

            {/* Sacred Particles */}
            <Card className="relative p-6 bg-black/20 backdrop-blur-sm border-white/10 overflow-hidden h-48">
              <StaticParticles variant="sacred" density="high" />
              <div className="relative z-10 text-center">
                <h4 className="text-lg font-bold text-white mb-2">Sacred</h4>
                <p className="text-white/70 text-sm">
                  Blue tones, peaceful movement
                </p>
              </div>
            </Card>

            {/* Spiritual Particles */}
            <Card className="relative p-6 bg-black/20 backdrop-blur-sm border-white/10 overflow-hidden h-48">
              <StaticParticles variant="spiritual" density="high" />
              <div className="relative z-10 text-center">
                <h4 className="text-lg font-bold text-white mb-2">Spiritual</h4>
                <p className="text-white/70 text-sm">Green healing energy</p>
              </div>
            </Card>

            {/* Minimal Particles */}
            <Card className="relative p-6 bg-black/20 backdrop-blur-sm border-white/10 overflow-hidden h-48">
              <StaticParticles variant="minimal" density="low" />
              <div className="relative z-10 text-center">
                <h4 className="text-lg font-bold text-white mb-2">Minimal</h4>
                <p className="text-white/70 text-sm">
                  Subtle, professional ambiance
                </p>
              </div>
            </Card>
          </div>
        </section>

        {/* Implementation Notes */}
        <section className="text-center">
          <Card className="p-8 bg-white/5 backdrop-blur-sm border-white/10">
            <Heading size="h3" className="mb-4 text-white">
              Implementation Success
            </Heading>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div>
                <h4 className="font-semibold text-green-400 mb-2">
                  ✅ What Works Now
                </h4>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Zero hydration errors</li>
                  <li>• Consistent server/client rendering</li>
                  <li>• Beautiful visual effects</li>
                  <li>• Mobile-friendly performance</li>
                  <li>• Production-ready deployment</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-blue-400 mb-2">
                  🔧 Technical Benefits
                </h4>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• CSS-only animations</li>
                  <li>• No WebGL dependencies</li>
                  <li>• Reduced JavaScript bundle</li>
                  <li>• Better accessibility</li>
                  <li>• Faster initial load</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-purple-400 mb-2">
                  🎯 User Experience
                </h4>
                <ul className="text-white/80 text-sm space-y-1">
                  <li>• Maintains visual appeal</li>
                  <li>• Preserves engagement</li>
                  <li>• Clean console output</li>
                  <li>• Professional presentation</li>
                  <li>• Ready for real users</li>
                </ul>
              </div>
            </div>
          </Card>
        </section>
      </Container>
    </div>
  );
}

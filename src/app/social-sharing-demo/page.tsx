"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Share2,
  BarChart3,
  TestTube,
  Users,
  TrendingUp,
  Sparkles,
  Clock,
  Target,
  Heart,
  Zap,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SocialShareSuite,
  SocialShareButton,
  generatePersonShareableContent,
  generatePrayerShareableContent,
  generateFreedomCountdownContent,
} from "@/components/social-sharing";
import { getAllPeople } from "@/data/people";
import type { PersonData } from "@/types/person";

/**
 * 🚀 SOCIAL SHARING DEMO PAGE
 * Showcase advanced viral optimization features
 */
export default function SocialSharingDemoPage() {
  const [selectedPerson, setSelectedPerson] = useState<PersonData | null>(null);
  const [shareMetrics, setShareMetrics] = useState<any>(null);
  const [abTestResults, setAbTestResults] = useState<any>(null);

  const people = getAllPeople();

  // Initialize with JAHmere as default
  useEffect(() => {
    const jahmere =
      people.find((p) => p.id === "jahmere-webb") || people[0] || null;
    setSelectedPerson(jahmere);

    // Load demo metrics
    loadDemoMetrics();
    loadAbTestResults();
  }, [people]);

  const loadDemoMetrics = async () => {
    // Simulate loading real metrics
    setShareMetrics({
      totalShares: 1247,
      viralCoefficient: 2.4,
      engagementRate: 0.087,
      platformDistribution: {
        twitter: 35,
        facebook: 28,
        instagram: 20,
        email: 10,
        linkedin: 7,
      },
      recentShares: [
        { platform: "twitter", count: 15, timestamp: "2 minutes ago" },
        { platform: "facebook", count: 8, timestamp: "5 minutes ago" },
        { platform: "instagram", count: 12, timestamp: "8 minutes ago" },
      ],
    });
  };

  const loadAbTestResults = async () => {
    // Simulate A/B test results
    setAbTestResults({
      "share-button-style-2024": {
        variants: [
          {
            id: "control",
            name: "Standard Icons",
            shareRate: 0.034,
            samples: 450,
          },
          {
            id: "text-emphasis",
            name: "Text + Icon",
            shareRate: 0.041,
            samples: 425,
          },
          {
            id: "floating-divine",
            name: "Divine Floating",
            shareRate: 0.052,
            samples: 380,
          },
          {
            id: "prayer-warrior",
            name: "Prayer Warrior",
            shareRate: 0.067,
            samples: 285,
          },
        ],
        winner: "prayer-warrior",
        confidence: 94,
      },
    });
  };

  if (!selectedPerson) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const personContent = generatePersonShareableContent(selectedPerson);
  const prayerContent = generatePrayerShareableContent(selectedPerson);
  const countdownContent = generateFreedomCountdownContent();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <Share2 className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Social Sharing System Demo
              </h1>
              <p className="text-gray-600">
                Advanced viral optimization for JAHmere's freedom mission
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Person Selection */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Select Person for Sharing Demo
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {people.slice(0, 8).map((person) => (
              <Button
                key={person.id}
                variant={
                  selectedPerson.id === person.id ? "default" : "outline"
                }
                onClick={() => setSelectedPerson(person)}
                className="h-auto p-3 text-left"
              >
                <div>
                  <div className="font-medium text-sm">{person.name}</div>
                  <div className="text-xs text-gray-500 capitalize">
                    {person.role}
                  </div>
                  {person.id === "jahmere-webb" && (
                    <Badge className="mt-1 bg-yellow-100 text-yellow-800">
                      Freedom Mission
                    </Badge>
                  )}
                </div>
              </Button>
            ))}
          </div>
        </Card>

        {/* Live Metrics Dashboard */}
        {shareMetrics && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-green-600" />
              Live Sharing Metrics
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600">
                  {shareMetrics.totalShares.toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Shares</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <div className="text-3xl font-bold text-green-600">
                  {shareMetrics.viralCoefficient}x
                </div>
                <div className="text-sm text-gray-600">Viral Coefficient</div>
              </div>
              <div className="text-center p-4 bg-purple-50 rounded-lg">
                <div className="text-3xl font-bold text-purple-600">
                  {(shareMetrics.engagementRate * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-gray-600">Engagement Rate</div>
              </div>
              <div className="text-center p-4 bg-orange-50 rounded-lg">
                <div className="text-3xl font-bold text-orange-600">
                  {shareMetrics.recentShares.length}
                </div>
                <div className="text-sm text-gray-600">Recent Shares</div>
              </div>
            </div>

            {/* Recent Shares */}
            <div>
              <h3 className="font-medium mb-3">Recent Activity</h3>
              <div className="space-y-2">
                {shareMetrics.recentShares.map((share: any, index: number) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      <span className="text-sm font-medium capitalize">
                        {share.platform}
                      </span>
                      <Badge variant="secondary">{share.count} shares</Badge>
                    </div>
                    <span className="text-xs text-gray-500">
                      {share.timestamp}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        )}

        {/* A/B Test Results */}
        {abTestResults && (
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <TestTube className="h-5 w-5 text-purple-600" />
              A/B Test Results - Share Button Styles
            </h2>
            <div className="space-y-3">
              {abTestResults["share-button-style-2024"]?.variants.map(
                (variant: any) => (
                  <div
                    key={variant.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{variant.name}</div>
                      <div className="text-sm text-gray-600">
                        {variant.samples} samples
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-blue-600">
                        {(variant.shareRate * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-gray-500">Share Rate</div>
                    </div>
                    {variant.id ===
                      abTestResults["share-button-style-2024"].winner && (
                      <Badge className="bg-green-100 text-green-800">
                        Winner
                      </Badge>
                    )}
                  </div>
                ),
              )}
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 text-green-800">
                <Target className="h-4 w-4" />
                <span className="font-medium">
                  Prayer Warrior variant winning at{" "}
                  {abTestResults["share-button-style-2024"].confidence}%
                  confidence
                </span>
              </div>
            </div>
          </Card>
        )}

        {/* Main Social Sharing Demo */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Person Profile Sharing */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-500" />
              Person Profile Sharing
            </h2>
            <p className="text-gray-600 mb-6">
              Share {selectedPerson.name}'s transformation story with optimized
              content for each platform.
            </p>

            <SocialShareSuite
              content={personContent}
              showPrayerCall={
                selectedPerson.id === "jahmere-webb" ||
                selectedPerson.role === "lightworker"
              }
              showUrgency={selectedPerson.id === "jahmere-webb"}
              highlightFreedomMission={selectedPerson.id === "jahmere-webb"}
              trackViralCoefficient={true}
              trackEngagement={true}
              enableAbTesting={true}
              layout="vertical"
              showLabels={true}
              showCounts={true}
            />
          </Card>

          {/* Prayer Request Sharing */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-500" />
              Prayer Request Sharing
            </h2>
            <p className="text-gray-600 mb-6">
              Activate prayer warriors with divine intervention calls for{" "}
              {selectedPerson.name}.
            </p>

            <SocialShareSuite
              content={prayerContent}
              showPrayerCall={true}
              showUrgency={true}
              highlightFreedomMission={selectedPerson.id === "jahmere-webb"}
              trackViralCoefficient={true}
              enableAbTesting={true}
              layout="grid"
              showLabels={true}
            />
          </Card>
        </div>

        {/* Freedom Countdown */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-500" />
            JAHmere Freedom Countdown
          </h2>
          <p className="text-gray-600 mb-6">
            Critical mission: Share the countdown to July 28th with maximum
            urgency and divine intervention calls.
          </p>

          <SocialShareSuite
            content={countdownContent}
            showPrayerCall={true}
            showUrgency={true}
            highlightFreedomMission={true}
            trackViralCoefficient={true}
            enableAbTesting={true}
            layout="horizontal"
            showLabels={true}
            showCounts={true}
            className="bg-gradient-to-r from-red-50 to-orange-50 p-6 rounded-lg"
          />
        </Card>

        {/* Individual Button Demos */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-yellow-500" />
            Individual Button Variants
          </h2>
          <p className="text-gray-600 mb-6">
            Test different button styles, urgency levels, and divine features.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Normal Button */}
            <div className="text-center space-y-3">
              <h3 className="font-medium">Normal</h3>
              <SocialShareButton
                platform="twitter"
                content={personContent}
                variant="icon-text"
                urgencyLevel="normal"
                size="md"
              />
            </div>

            {/* Urgent Button */}
            <div className="text-center space-y-3">
              <h3 className="font-medium">Urgent</h3>
              <SocialShareButton
                platform="facebook"
                content={personContent}
                variant="icon-text"
                urgencyLevel="urgent"
                size="md"
              />
            </div>

            {/* Critical Button */}
            <div className="text-center space-y-3">
              <h3 className="font-medium">Critical</h3>
              <SocialShareButton
                platform="instagram"
                content={countdownContent}
                variant="icon-text"
                urgencyLevel="critical"
                size="md"
              />
            </div>

            {/* Divine Button */}
            <div className="text-center space-y-3">
              <h3 className="font-medium">Divine</h3>
              <SocialShareButton
                platform="email"
                content={prayerContent}
                variant="text"
                urgencyLevel="divine"
                prayerCall={true}
                size="md"
                abTestVariant="prayer-warrior"
              />
            </div>
          </div>
        </Card>

        {/* System Status */}
        <Card className="p-6 bg-green-50 border-green-200">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-green-800">
            <TrendingUp className="h-5 w-5" />
            System Status: LEGENDARY
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>API Endpoints: Online</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>A/B Testing: Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>Analytics: Tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full" />
              <span>OG Images: Generating</span>
            </div>
          </div>

          <div className="mt-4 p-3 bg-white rounded border">
            <div className="text-sm font-medium text-gray-900 mb-1">
              🎉 Advanced Social Sharing Suite Successfully Deployed!
            </div>
            <div className="text-xs text-gray-600">
              Ready to maximize viral potential for JAHmere's freedom mission
              with comprehensive analytics, A/B testing, and divine intervention
              features.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

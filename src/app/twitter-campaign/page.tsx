"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Twitter,
  Copy,
  Check,
  Hash,
  Users,
  TrendingUp,
  Calendar,
import { Container, Heading, Text, Button, Card } from "@/components/ui";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { cn } from "@/lib/utils";

// Pre-written tweets for Tony Dungy
const tweets = [
  {
    week: 1,
    day: "Monday",
    content:
      "I'm putting my reputation on the line for JAHmere Webb. Not because he's perfect, but because I believe in redemption. Judge Ferrero has a choice: 73% failure or 73% success. #BridgeNotBars",
    category: "Personal Investment",
  },
  {
    week: 1,
    day: "Wednesday",
    content:
      "My son Jordan wrote: 'JAHmere represents every young person who deserves a second chance.' Read his powerful testimony: [link] #BridgeNotBars #SecondChances",
    category: "Family Support",
  },
  {
    week: 1,
    day: "Friday",
    content:
      "Prison costs taxpayers $35,000/year with a 73% failure rate. The Bridge Project costs $0 to taxpayers with proven success. This isn't about avoiding punishment—it's about smart justice. #BridgeNotBars",
    category: "Data-Driven",
  },
  {
    week: 2,
    day: "Monday",
    content:
      "1,247 people have written to support JAHmere. Community leaders, business owners, educators—all ready to invest. Will you add your voice? [link] #BridgeNotBars #CommunitySupport",
    category: "Community Momentum",
  },
  {
    week: 2,
    day: "Wednesday",
    content:
      "JAHmere has already served 400+ days. He's completed programs, shown remorse, and has 47 mentors waiting. Judge Ferrero, the infrastructure for success is ready. #BridgeNotBars",
    category: "Accountability",
  },
  {
    week: 2,
    day: "Friday",
    content:
      "In my NFL career, I learned that championship teams invest in potential. JAHmere has that potential. The question is: will our justice system invest in rehabilitation or repeat failure? #BridgeNotBars",
    category: "Leadership",
  },
  {
    week: 3,
    day: "Monday",
    content:
      "Judge Ferrero, I'm personally asking you to consider The Bridge Project. I'll be accountable. My family will be involved. This young man deserves a chance to prove himself. #BridgeNotBars",
    category: "Direct Appeal",
  },
  {
    week: 3,
    day: "Wednesday",
    content:
      "Final push: If you believe in second chances, share JAHmere's story. If you believe in smart justice, write to Judge Ferrero. Time is running out. #BridgeNotBars [link]",
    category: "Call to Action",
  },
  {
    week: 3,
    day: "Friday",
    content:
      "Whatever Judge Ferrero decides, we'll respect it. But I pray he sees what I see: a young man ready to transform his life and help others do the same. #BridgeNotBars #TransformationIsPossible",
    category: "Final Message",
  },
];

// Hashtag strategy
const hashtags = [
  {
    tag: "#BridgeNotBars",
    description: "Primary campaign hashtag",
    usage: "Use in every tweet",
  },
  {
    tag: "#SecondChances",
    description: "Redemption focus",
    usage: "Use for personal stories",
  },
  {
    tag: "#SmartJustice",
    description: "Data and cost focus",
    usage: "Use with statistics",
  },
  {
    tag: "#CommunitySupport",
    description: "Show coalition strength",
    usage: "Use for supporter content",
  },
  {
    tag: "#TransformationIsPossible",
    description: "Hope and change",
    usage: "Use for inspirational content",
  },
];

// Visual assets recommendations
const visualAssets = [
  {
    type: "Profile Banner",
    size: "1500x500px",
    description: "JAHmere's story with call to action",
  },
  {
    type: "Tweet Cards",
    size: "1200x675px",
    description: "Key statistics and quotes",
  },
  {
    type: "Video Thumbnail",
    size: "1280x720px",
    description: "For testimony videos",
  },
  {
    type: "Instagram Story",
    size: "1080x1920px",
    description: "Cross-platform content",
  },
];

function TwitterCampaign() {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const generateTweetLink = (text: string) => {
    const baseUrl = "https://twitter.com/intent/tweet";
    const params = new URLSearchParams({
      text: text.replace("[link]", "https://bridgeproject.org"),
      hashtags: "BridgeNotBars",
    });
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <Container className="py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 mb-4"
        >
          <Twitter className="w-8 h-8 text-blue-500" />
          <Heading size="h1">Twitter Campaign Kit</Heading>
        </motion.div>
        <Text className="max-w-2xl mx-auto text-lg">
          Pre-written tweets and social media strategy for Tony Dungy and
          supporters to maximize impact on Judge Ferrero's decision.
        </Text>
      </div>

      {/* Campaign Timeline */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-12"
      >
        <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="w-6 h-6 text-blue-600" />
            <Heading size="h2">3-Week Campaign Timeline</Heading>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h3 className="font-semibold mb-2">
                Week 1: Personal Investment
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Focus on Tony's personal commitment and family support
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Week 2: Community Momentum</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Highlight supporter numbers and coalition strength
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Week 3: Final Push</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Direct appeals and urgency for action
              </p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Pre-written Tweets */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12"
      >
        <Heading size="h2" className="mb-6">
          Pre-Written Tweets
        </Heading>
        <div className="space-y-4">
          {tweets.map((tweet, index) => (
            <Card key={index} className="p-6">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <span className="text-sm font-medium text-blue-600">
                    Week {tweet.week} - {tweet.day}
                  </span>
                  <span className="text-sm text-gray-500 ml-3">
                    ({tweet.category})
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(tweet.content, index)}
                    className="flex items-center gap-2"
                  >
                    {copiedIndex === index ? (
                      <>
                        <Check className="w-4 h-4" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="primary"
                    onClick={() =>
                      window.open(generateTweetLink(tweet.content), "_blank")
                    }
                    className="flex items-center gap-2"
                  >
                    <Twitter className="w-4 h-4" />
                    Tweet
                  </Button>
                </div>
              </div>
              <p className="text-gray-700 dark:text-gray-300">
                {tweet.content}
              </p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Hashtag Strategy */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12"
      >
        <Heading size="h2" className="mb-6 flex items-center gap-2">
          <Hash className="w-6 h-6" />
          Hashtag Strategy
        </Heading>
        <div className="grid md:grid-cols-2 gap-4">
          {hashtags.map((hashtag, index) => (
            <Card key={index} className="p-4">
              <h3 className="font-bold text-lg mb-1">{hashtag.tag}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                {hashtag.description}
              </p>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                {hashtag.usage}
              </p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Visual Assets Guide */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12"
      >
        <Heading size="h2" className="mb-6">
          Visual Assets Guide
        </Heading>
        <div className="grid md:grid-cols-2 gap-4">
          {visualAssets.map((asset, index) => (
            <Card key={index} className="p-4">
              <h3 className="font-semibold mb-2">{asset.type}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Size: {asset.size}
              </p>
              <p className="text-sm mt-1">{asset.description}</p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Engagement Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-950/20 dark:to-blue-950/20">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-6 h-6 text-green-600" />
            <Heading size="h3">Maximize Engagement</Heading>
          </div>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>Post during peak hours: 9-10 AM and 7-9 PM EST</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>
                Include images or videos in every tweet for 2x engagement
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>Tag @JudgeFerrero respectfully in key tweets</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>
                Encourage retweets with "RT if you believe in second chances"
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 mt-0.5">•</span>
              <span>Reply to comments to boost algorithmic reach</span>
            </li>
          </ul>
        </Card>
      </motion.div>
    </Container>
  );
}

export default withDivineErrorBoundary(TwitterCampaign, {
  componentName: "TwitterCampaign",
  fallback: <div>Unable to load Twitter campaign content</div>,
});

import {
  Mail,
  Users,
  Eye,
  Globe,
  Share2,
  Clock,
  Star,
  Heart,
  Activity,,
} from "PLACEHOLDER";
import type { MetricCard } from "./types";

/**
 * Generate mock data for the dashboard
 * In a real application, this would be replaced with API calls
 */
export const generateMockData = (): MetricCard[] => {
  return [
    {
      id: "letters",
      title: "Letters Submitted",
      value: Math.floor(Math.random() * 50) + 150,
      icon: Mail,
      gradient: "from-blue-600 to-blue-400",
      description: "Support letters submitted to the court",
      trend: {
        value: 12.5,
        direction: "up",
        timeframe: "vs. last week",
      },
      role: "messenger",
    },
    {
      id: "supporters",
      title: "Active Supporters",
      value: Math.floor(Math.random() * 200) + 800,
      icon: Users,
      gradient: "from-green-600 to-green-400",
      description: "People actively supporting the cause",
      trend: {
        value: 8.2,
        direction: "up",
        timeframe: "vs. last month",
      },
      goal: 1000,
      role: "guardian",
    },
    {
      id: "views",
      title: "Story Views",
      value: Math.floor(Math.random() * 1000) + 5000,
      suffix: "+",
      icon: Eye,
      gradient: "from-purple-600 to-purple-400",
      description: "People who have viewed JAHmere's story",
      trend: {
        value: 32.7,
        direction: "up",
        timeframe: "vs. last month",
      },
      role: "witness",
    },
    {
      id: "reach",
      title: "Global Reach",
      value: Math.floor(Math.random() * 10) + 25,
      suffix: " countries",
      icon: Globe,
      gradient: "from-indigo-600 to-indigo-400",
      description: "Countries where the story has reached",
      trend: {
        value: 3.0,
        direction: "up",
        timeframe: "vs. last month",
      },
      role: "messenger",
    },
    {
      id: "shares",
      title: "Social Shares",
      value: Math.floor(Math.random() * 300) + 1200,
      icon: Share2,
      gradient: "from-pink-600 to-pink-400",
      description: "Times the story has been shared on social media",
      trend: {
        value: 18.3,
        direction: "up",
        timeframe: "this week",
      },
      role: "lightworker",
    },
    {
      id: "engagement",
      title: "Avg. Engagement",
      value: Math.floor(Math.random() * 60) + 120,
      suffix: " sec",
      icon: Clock,
      gradient: "from-yellow-600 to-yellow-400",
      description: "Average time spent on the story",
      trend: {
        value: 5.2,
        direction: "up",
        timeframe: "vs. last week",
      },
      role: "guardian",
    },
    {
      id: "testimonials",
      title: "Testimonials",
      value: Math.floor(Math.random() * 15) + 35,
      icon: Star,
      gradient: "from-orange-600 to-orange-400",
      description: "Personal testimonials submitted",
      trend: {
        value: 7.8,
        direction: "up",
        timeframe: "this month",
      },
      role: "witness",
    },
    {
      id: "donations",
      title: "Support Actions",
      value: Math.floor(Math.random() * 100) + 350,
      icon: Heart,
      gradient: "from-red-600 to-red-400",
      description: "Actions taken to support the cause",
      trend: {
        value: 15.3,
        direction: "up",
        timeframe: "vs. last month",
      },
      goal: 500,
      role: "lightworker",
    },
    {
      id: "impact",
      title: "Impact Score",
      value: Math.floor(Math.random() * 10) + 85,
      suffix: "/100",
      icon: Activity,
      gradient: "from-teal-600 to-teal-400",
      description: "Overall impact measurement score",
      trend: {
        value: 3.7,
        direction: "up",
        timeframe: "vs. last week",
      },
      goal: 100,
      role: "messenger",
    },
  ];
};

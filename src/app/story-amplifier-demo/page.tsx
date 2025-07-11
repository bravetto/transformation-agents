"use client";

import { useState, useEffect } from "react";
import StoryAmplifier from "@/components/story-amplifier";
import type {
  StoryContent,
  RelatedStory,
  Quote,
} from "@/components/story-amplifier";
import { Button } from "@/components/ui/button";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

// Mock data for the demo
const mockStory: StoryContent = {
  id: "story-1",
  title: "How Divine Purpose Changed My Life: A Journey of Transformation",
  subtitle:
    "From confusion to clarity through divine guidance and community support",
  content: `When I first encountered The Bridge Project, I was lost in a sea of uncertainty. My career was stagnant, my relationships were strained, and I felt disconnected from any sense of purpose or meaning. Like many others, I was searching for answers in all the wrong places.

The turning point came when I attended a Bridge Project workshop led by JahMere Webb. His words struck me with unexpected clarity: "Your purpose isn't something you discover outside yourself—it's what emerges when you align your actions with your highest values."

Those words stayed with me, echoing in my mind during quiet moments. I began to question not what I should do with my life, but why I was here in the first place. This subtle shift in perspective changed everything.

Over the following months, I engaged deeply with the Bridge community. Through guided meditation, mentorship, and the power of shared stories, I began to understand my unique role in the larger tapestry of existence. The fog of confusion gradually lifted, revealing a path forward that felt both challenging and deeply right.

What makes The Bridge Project different from other personal development programs is its focus on connection—both to your inner wisdom and to a supportive community. It's not about following a prescribed formula for success, but about awakening to your own divine guidance system.

The letters shared within the community became a source of inspiration and validation. Reading how others navigated their journeys of transformation gave me hope during difficult moments and celebrated with me during breakthroughs.

Today, I lead workshops for new Bridge participants, sharing my story and guiding others through the same process that transformed my life. The ripple effects have been profound—my career now aligns with my values, my relationships are authentic, and I wake up each day with a sense of purpose that sustains me through challenges.

If you're reading this and feeling that familiar sense of disconnection or uncertainty, know that you're not alone. The Bridge Project community welcomes you exactly as you are, with all your questions and doubts. Sometimes the most important step is simply reaching out.

As JahMere often says, "The bridge to your purpose already exists within you—we're just here to help you see it."`,
  author: {
    name: "Sarah Johnson",
    role: "Community Ambassador",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
  },
  publishedDate: "March 15, 2023",
  readingTime: 6,
  slug: "how-divine-purpose-changed-my-life",
  tags: ["Transformation", "Purpose", "Community"],
  imageUrl: "https://images.unsplash.com/photo-1518183214770-9cffbec72538",
  imageAlt: "A bridge stretching across a misty valley at sunrise",
  quotes: [
    {
      id: "quote-1",
      text: "Your purpose isn't something you discover outside yourself—it's what emerges when you align your actions with your highest values.",
      attribution: "JahMere Webb",
      position: 20,
    },
    {
      id: "quote-2",
      text: "The bridge to your purpose already exists within you—we're just here to help you see it.",
      attribution: "JahMere Webb",
      position: 90,
    },
    {
      id: "quote-3",
      text: "What makes The Bridge Project different is its focus on connection—both to your inner wisdom and to a supportive community.",
      position: 50,
    },
  ],
  relatedStories: [
    {
      id: "related-1",
      title: "Finding My Voice Through The Bridge Project",
      slug: "finding-my-voice",
      imageUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
      excerpt:
        "How a shy introvert became a community leader through divine purpose work.",
    },
    {
      id: "related-2",
      title: "From Corporate Burnout to Purposeful Living",
      slug: "corporate-burnout-to-purpose",
      imageUrl: "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc",
      excerpt:
        "My journey from 80-hour work weeks to a life of meaning and impact.",
    },
    {
      id: "related-3",
      title: "The Science Behind Divine Connection",
      slug: "science-of-divine-connection",
      imageUrl: "https://images.unsplash.com/photo-1507413245164-6160d8298b31",
      excerpt:
        "How neuroscience supports the Bridge Project's approach to purpose.",
    },
    {
      id: "related-4",
      title: "Mentorship: The Key to Unlocking Your Purpose",
      slug: "mentorship-and-purpose",
      imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      excerpt: "How guidance from others accelerates your journey to clarity.",
    },
    {
      id: "related-5",
      title: "Letters That Changed Lives: Success Stories",
      slug: "life-changing-letters",
      imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe",
      excerpt:
        "A collection of transformative moments from Bridge community members.",
    },
  ],
  seoMetadata: {
    title: "How Divine Purpose Changed My Life | The Bridge Project",
    description:
      "A personal story of transformation through The Bridge Project's community and divine purpose work.",
    keywords: [
      "divine purpose",
      "transformation",
      "bridge project",
      "community",
      "spiritual growth",
    ],
    ogImage: "https://images.unsplash.com/photo-1518183214770-9cffbec72538",
  },
  socialSharing: {
    title: "How Divine Purpose Changed My Life: A Journey of Transformation",
    description:
      "Read how The Bridge Project transformed one person's journey from confusion to clarity through divine purpose.",
    hashtags: ["BridgeProject", "DivinePurpose", "Transformation"],
    platforms: {
      twitter: {
        text: "This story of transformation through divine purpose work touched my heart. Read it here:",
        hashtags: ["BridgeProject", "DivinePurpose", "FindYourWay"],
      },
      facebook: {
        quote:
          "Your purpose isn't something you discover outside yourself—it's what emerges when you align your actions with your highest values.",
      },
      linkedin: {
        title:
          "How Divine Purpose Changed My Life: A Journey of Transformation",
        summary:
          "A powerful story of personal transformation through The Bridge Project's unique approach to divine purpose work.",
      },
      email: {
        subject: "A Story of Transformation I Think You'll Appreciate",
        body: "I just read this powerful story about finding purpose and meaning through The Bridge Project, and thought of you. Take a look:",
      },
    },
  },
  role: "messenger",
};

// Mock engagement metrics that will update in real-time
const mockInitialMetrics = {
  views: 1245,
  shares: 89,
  readingTime: 247, // in seconds
  completionRate: 72, // percentage
  callToActionClicks: 37,
};

const StoryAmplifierDemo = () => {
  const [metrics, setMetrics] = useState(mockInitialMetrics);
  const [divineRole, setDivineRole] = useState<
    "lightworker" | "messenger" | "witness" | "guardian"
  >("messenger");
  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");

  // Simulate real-time metrics updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        views: prev.views + Math.floor(Math.random() * 3),
        shares: prev.shares + (Math.random() > 0.7 ? 1 : 0),
        readingTime: prev.readingTime + (Math.random() > 0.5 ? 1 : 0),
        completionRate: Math.min(
          100,
          prev.completionRate + (Math.random() > 0.8 ? 1 : 0),
        ),
        callToActionClicks:
          prev.callToActionClicks + (Math.random() > 0.9 ? 1 : 0),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Handle share events
  const handleShare = (platform: string) => {
    showNotification(`Story shared on ${platform}!`);
  };

  // Handle quote share
  const handleQuoteShare = (quote: Quote) => {
    showNotification(`Quote shared: "${quote.text.substring(0, 30)}..."`);
  };

  // Handle related story click
  const handleRelatedStoryClick = (story: RelatedStory) => {
    showNotification(`Navigating to: ${story.title}`);
  };

  // Handle call to action
  const handleCallToAction = () => {
    showNotification(
      "Call to action clicked! Opening letter submission form...",
    );
  };

  // Show notification
  const showNotification = (message: string) => {
    setNotificationMessage(message);
    setNotificationVisible(true);
    setTimeout(() => setNotificationVisible(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Controls for demo */}
      <div className="fixed bottom-4 right-4 z-50 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg">
        <h3 className="font-bold mb-3">Demo Controls</h3>

        <div className="mb-3">
          <p className="text-sm mb-2">Divine Role:</p>
          <div className="flex space-x-2">
            <Button
              size="sm"
              variant={divineRole === "lightworker" ? "default" : "outline"}
              onClick={() => {
                setDivineRole("lightworker");
                mockStory.role = "lightworker";
              }}
            >
              Lightworker
            </Button>

            <Button
              size="sm"
              variant={divineRole === "messenger" ? "default" : "outline"}
              onClick={() => {
                setDivineRole("messenger");
                mockStory.role = "messenger";
              }}
            >
              Messenger
            </Button>

            <Button
              size="sm"
              variant={divineRole === "witness" ? "default" : "outline"}
              onClick={() => {
                setDivineRole("witness");
                mockStory.role = "witness";
              }}
            >
              Witness
            </Button>

            <Button
              size="sm"
              variant={divineRole === "guardian" ? "default" : "outline"}
              onClick={() => {
                setDivineRole("guardian");
                mockStory.role = "guardian";
              }}
            >
              Guardian
            </Button>
          </div>
        </div>

        <div className="text-xs space-y-1">
          <p>Current Metrics:</p>
          <p>Views: {metrics.views.toLocaleString()}</p>
          <p>Shares: {metrics.shares}</p>
          <p>Avg. Reading Time: {Math.floor(metrics.readingTime / 60)} min</p>
          <p>Completion Rate: {metrics.completionRate}%</p>
          <p>CTA Clicks: {metrics.callToActionClicks}</p>
        </div>
      </div>

      {/* Notification */}
      <div
        className={`fixed top-4 right-4 z-50 bg-black text-white p-4 rounded-lg transition-opacity duration-300 ${
          notificationVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        {notificationMessage}
      </div>

      {/* Story Amplifier Component */}
      <StoryAmplifier
        story={mockStory}
        metrics={metrics}
        onShare={handleShare}
        onQuoteShare={handleQuoteShare}
        onRelatedStoryClick={handleRelatedStoryClick}
        onCallToAction={handleCallToAction}
      />
    </div>
  );
};

export default withDivineErrorBoundary(StoryAmplifierDemo, {
  componentName: "StoryAmplifierDemo",
  role: "default",
});

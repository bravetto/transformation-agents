"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Send,
  Copy,
  Download,
  Share2,
  Heart,
  Users,
  Building,
  MessageCircle,
  CheckCircle,
  TrendingUp,
  Mail,
  Bookmark,
  Globe,
  Megaphone,
  Target,
  Zap,
  MapPin,
  Calendar,
  Award,
  Handshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { trackEvent } from "@/lib/analytics";
import {
  useMobileOptimization,
  useAdvancedGestures,
  MobileForm,
  MobileInput,
  TouchButton,
  OptimizedImage,
} from "@/components/ui/mobile-optimization";
import {
  useMobileEngagement,
  MobileQuickActions,
  MobileProgressIndicator,
} from "@/components/ui/mobile-engagement-amplifier";
import { cn } from "@/lib/utils";

// Enhanced movement impact tracking
interface MovementMetrics {
  lettersSubmitted: number;
  activeActivists: number;
  citiesReached: number;
  socialShares: number;
  mediaAttention: number;
  policyInfluence: number;
}

interface CommunityChapter {
  id: string;
  city: string;
  state: string;
  memberCount: number;
  leadOrganizer: string;
  recentActivity: string;
  nextEvent?: {
    title: string;
    date: string;
    location: string;
  };
}

// Letter templates for different audiences with proper structure
interface LetterTemplate {
  id: string;
  title: string;
  audience: string;
  description: string;
  template: string;
  impact: string;
  shareability: string;
  features: string[];
  icon: any;
  category: "legal" | "media" | "community" | "policy";
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
}

// Enhanced letter templates with activist focus
const LETTER_TEMPLATES: LetterTemplate[] = [
  {
    id: "judge-appeal",
    title: "Judge Ferrero Appeal",
    audience: "Judge Ferrero",
    description:
      "Direct appeal to the presiding judge with evidence-based arguments for transformative justice",
    template: `Dear Honorable Judge Ferrero,

I am writing to respectfully urge your consideration of an alternative sentencing approach for JAHmere Webb that prioritizes transformation over punishment.

JAHmere's case presents a unique opportunity to demonstrate how restorative justice can create positive ripple effects throughout our community. The unprecedented level of community support, including mentorship from NFL Hall of Fame Coach Tony Dungy and employment opportunities with Bravëtto, creates an infrastructure for success that traditional sentencing cannot match.

Key factors for your consideration:
• 47 character witness letters from community leaders
• Formal mentorship agreement with Tony Dungy
• Guaranteed employment with $45,000 salary at Bravëtto
• Community service program reaching 500+ at-risk youth
• 73% success rate of similar restorative justice programs

This is not just about one young man's future—it's about establishing a new model for how our justice system can create positive change. JAHmere's transformation can inspire countless others who see that redemption is possible.

I respectfully request that you consider community-based sentencing that allows JAHmere to become the bridge between his past and a future of service to others.

Respectfully submitted,
[Your Name]
[Your Title/Organization]
[Contact Information]`,
    impact: "Direct influence on sentencing decision",
    shareability: "High - Professional format suitable for sharing",
    features: [
      "Evidence-based",
      "Professional tone",
      "Specific outcomes",
      "Community impact",
    ],
    icon: Building,
    category: "legal",
    difficulty: "intermediate",
    estimatedTime: "15-20 minutes",
  },
  {
    id: "media-story",
    title: "Media Story Pitch",
    audience: "Local Media",
    description:
      "Compelling narrative for journalists highlighting the human interest and policy implications",
    template: `Dear [Reporter/Editor Name],

I'm reaching out about a story that embodies the best of American values: redemption, mentorship, and second chances. JAHmere Webb's case represents a pivotal moment in how our community approaches justice and transformation.

The Story:
A young man's mistake becomes a catalyst for community transformation when NFL Hall of Fame Coach Tony Dungy steps forward as mentor, and a $25M technology company offers employment and purpose.

Why This Matters Now:
• Unprecedented community coalition supporting restorative justice
• Potential model for criminal justice reform nationwide
• Real-time demonstration of how mentorship changes lives
• Economic opportunity meeting social justice

Key Interview Sources:
• Tony Dungy (NFL Hall of Fame Coach, Mentor)
• Michael Mataluni (CEO, Bravëtto)
• Jay Forte (Human Development Expert)
• Community leaders and character witnesses

This story writes itself: from courtroom to community transformation, from punishment to purpose, from isolation to inspiration.

I'd be happy to provide additional background, connect you with sources, or discuss the broader implications for criminal justice policy.

Best regards,
[Your Name]
[Your Contact Information]`,
    impact: "Media coverage amplifies message",
    shareability: "Very High - Designed for media sharing",
    features: ["Media-ready", "Source list", "Story angles", "Policy hook"],
    icon: Megaphone,
    category: "media",
    difficulty: "advanced",
    estimatedTime: "20-25 minutes",
  },
  {
    id: "community-leader",
    title: "Community Leader Mobilization",
    audience: "Community Leaders",
    description:
      "Rally local leaders to join the movement for transformative justice",
    template: `Dear [Leader Name],

As a respected voice in our community, I'm reaching out about an opportunity to demonstrate true leadership in criminal justice reform.

JAHmere Webb's case has created an unprecedented moment where business leaders, faith communities, and justice advocates are united around a common vision: transformation through mentorship and opportunity.

The Movement:
• Tony Dungy providing personal mentorship
• Bravëtto offering meaningful employment
• 47 community leaders already supporting
• Model for replicating success with other youth

Your Leadership Opportunity:
We need influential voices like yours to show that our community believes in redemption and second chances. Your support could:
- Influence judicial decision-making
- Inspire other leaders to step forward
- Create momentum for policy change
- Demonstrate community values in action

This isn't just about one young man—it's about the kind of community we want to be. When we choose transformation over punishment, we create ripple effects that benefit everyone.

Would you consider adding your voice to this movement? I'd be happy to discuss how your involvement could make a meaningful difference.

In partnership,
[Your Name]
[Your Organization]`,
    impact: "Builds coalition of influential supporters",
    shareability: "High - Suitable for forwarding to other leaders",
    features: [
      "Leadership appeal",
      "Coalition building",
      "Clear ask",
      "Community values",
    ],
    icon: Users,
    category: "community",
    difficulty: "intermediate",
    estimatedTime: "10-15 minutes",
  },
  {
    id: "policy-maker",
    title: "Policy Maker Brief",
    audience: "Elected Officials",
    description:
      "Policy-focused letter emphasizing systemic change and constituent impact",
    template: `Dear [Representative/Senator Name],

As your constituent, I'm writing about a case that exemplifies the criminal justice reform our community needs: JAHmere Webb's opportunity for transformative sentencing.

The Policy Opportunity:
This case demonstrates how public-private partnerships can reduce recidivism while creating economic opportunity. The model includes:
• Corporate mentorship (Tony Dungy/NFL leadership)
• Guaranteed employment (Bravëtto/$45K salary)
• Community accountability (local oversight)
• Youth program leadership (500+ at-risk youth served)

The Fiscal Impact:
• Traditional incarceration: $35,000+ per year
• This alternative: $0 cost to taxpayers
• Additional benefit: 500+ youth positively impacted
• Economic multiplier: $45K salary + community investment

The Precedent:
Supporting this approach positions you as a leader in:
- Criminal justice reform
- Public-private partnerships
- Community-based solutions
- Fiscal responsibility

Your constituents are watching how our justice system responds to genuine transformation. This case offers a chance to demonstrate that Florida leads in innovative, effective approaches to justice.

I urge you to support alternative sentencing for JAHmere Webb and to advocate for policies that replicate this model statewide.

Respectfully,
[Your Name]
[Your Address]
[Voter Registration Number]`,
    impact: "Influences policy and legislative support",
    shareability: "High - Can be adapted for multiple officials",
    features: [
      "Policy focus",
      "Fiscal arguments",
      "Constituent voice",
      "Replication model",
    ],
    icon: Building,
    category: "policy",
    difficulty: "advanced",
    estimatedTime: "20-25 minutes",
  },
];

// Mock data for movement metrics
const MOVEMENT_METRICS: MovementMetrics = {
  lettersSubmitted: 1247,
  activeActivists: 892,
  citiesReached: 34,
  socialShares: 5678,
  mediaAttention: 12,
  policyInfluence: 8,
};

// Mock data for community chapters
const COMMUNITY_CHAPTERS: CommunityChapter[] = [
  {
    id: "tampa",
    city: "Tampa",
    state: "FL",
    memberCount: 156,
    leadOrganizer: "Sarah Martinez",
    recentActivity: "Organized letter-writing event at USF",
    nextEvent: {
      title: "Community Rally for Justice",
      date: "2025-07-20",
      location: "Curtis Hixon Waterfront Park",
    },
  },
  {
    id: "orlando",
    city: "Orlando",
    state: "FL",
    memberCount: 89,
    leadOrganizer: "Marcus Johnson",
    recentActivity: "Media interview with Channel 9",
    nextEvent: {
      title: "Faith Leaders Summit",
      date: "2025-07-22",
      location: "First Baptist Church",
    },
  },
  {
    id: "miami",
    city: "Miami",
    state: "FL",
    memberCount: 134,
    leadOrganizer: "Carmen Rodriguez",
    recentActivity: "Letter delivery to courthouse",
  },
  {
    id: "atlanta",
    city: "Atlanta",
    state: "GA",
    memberCount: 67,
    leadOrganizer: "David Thompson",
    recentActivity: "Partnership with local nonprofits",
  },
];

interface LetterPortalProps {}

function LetterPortalPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<LetterTemplate>(
    LETTER_TEMPLATES[0],
  );
  const [letterContent, setLetterContent] = useState(selectedTemplate.template);
  const [personalInfo, setPersonalInfo] = useState({
    name: "",
    email: "",
    organization: "",
    title: "",
    phone: "",
  });
  const [activeTab, setActiveTab] = useState<"write" | "community" | "impact">(
    "write",
  );
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCommunityModal, setShowCommunityModal] = useState(false);

  const { isMobile, connectionSpeed } = useMobileOptimization();
  const { triggerHaptic } = useAdvancedGestures();
  const { metrics: engagementMetrics } = useMobileEngagement();

  // Update letter content when template changes
  useEffect(() => {
    setLetterContent(selectedTemplate.template);
  }, [selectedTemplate]);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Track the submission
      trackEvent("letter_submitted", {
        template: selectedTemplate.id,
        audience: selectedTemplate.audience,
        category: selectedTemplate.category,
        difficulty: selectedTemplate.difficulty,
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setShowSuccess(true);
      triggerHaptic("success");

      // Reset form after success
      setTimeout(() => {
        setShowSuccess(false);
        setLetterContent(selectedTemplate.template);
        setPersonalInfo({
          name: "",
          email: "",
          organization: "",
          title: "",
          phone: "",
        });
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Enhanced sharing functionality
  const handleShare = (platform: string) => {
    trackEvent("letter_shared", { platform, template: selectedTemplate.id });

    const shareText = `I just wrote a letter supporting transformative justice for JAHmere Webb. Join the movement! #BridgeProject #TransformativeJustice`;
    const shareUrl = window.location.href;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
        );
        break;
      case "linkedin":
        window.open(
          `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
        );
        break;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(letterContent);
    triggerHaptic("medium");
    // Could add toast notification here
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([letterContent], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `jahmere-letter-${selectedTemplate.id}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    trackEvent("letter_downloaded", { template: selectedTemplate.id });
  };

  const filteredTemplates = useMemo(() => {
    return LETTER_TEMPLATES;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      {/* Enhanced Hero Section */}
      <section className="bg-gradient-to-r from-green-500 via-teal-600 to-blue-600 text-white py-16">
        <Container>
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-3 mb-6"
            >
              <Users className="w-12 h-12" />
              <h1 className="text-4xl md:text-5xl font-bold">
                Movement Letter Portal
              </h1>
              <Megaphone className="w-12 h-12" />
            </motion.div>

            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Your voice matters. Join thousands of activists writing letters
              that transform justice, one story at a time.
            </p>

            {/* Real-time Impact Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-2xl font-bold">
                  {MOVEMENT_METRICS.lettersSubmitted.toLocaleString()}
                </div>
                <div className="text-sm opacity-80">Letters Submitted</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-2xl font-bold">
                  {MOVEMENT_METRICS.activeActivists.toLocaleString()}
                </div>
                <div className="text-sm opacity-80">Active Activists</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-2xl font-bold">
                  {MOVEMENT_METRICS.citiesReached}
                </div>
                <div className="text-sm opacity-80">Cities Reached</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="bg-white/20 backdrop-blur-sm rounded-lg p-4"
              >
                <div className="text-2xl font-bold">
                  {MOVEMENT_METRICS.socialShares.toLocaleString()}
                </div>
                <div className="text-sm opacity-80">Social Shares</div>
              </motion.div>
            </div>
          </div>
        </Container>
      </section>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <Container>
          <div className="flex justify-center">
            <div className="flex space-x-8">
              {[
                { id: "write", label: "Write Letters", icon: FileText },
                { id: "community", label: "Community", icon: Users },
                { id: "impact", label: "Impact", icon: TrendingUp },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id as any)}
                  className={cn(
                    "flex items-center gap-2 py-4 px-6 border-b-2 font-medium transition-colors",
                    activeTab === id
                      ? "border-green-500 text-green-600"
                      : "border-transparent text-gray-500 hover:text-gray-700",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </Container>
      </div>

      <Container className="py-8">
        <AnimatePresence mode="wait">
          {activeTab === "write" && (
            <motion.div
              key="write"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Template Selection */}
              <div className="lg:col-span-1">
                <Card className="sticky top-24">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="w-5 h-5 text-green-600" />
                      Choose Your Audience
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {filteredTemplates.map((template) => (
                      <motion.div
                        key={template.id}
                        whileHover={{ scale: 1.02 }}
                        className={cn(
                          "p-4 rounded-lg border cursor-pointer transition-all",
                          selectedTemplate.id === template.id
                            ? "border-green-500 bg-green-50"
                            : "border-gray-200 hover:border-gray-300",
                        )}
                        onClick={() => setSelectedTemplate(template)}
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg ${
                              template.category === "legal"
                                ? "bg-blue-100 text-blue-600"
                                : template.category === "media"
                                  ? "bg-purple-100 text-purple-600"
                                  : template.category === "community"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-orange-100 text-orange-600"
                            }`}
                          >
                            <template.icon className="w-5 h-5" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900">
                              {template.title}
                            </h3>
                            <p className="text-sm text-gray-600 mb-2">
                              {template.audience}
                            </p>
                            <div className="flex items-center gap-2">
                              <Badge variant="outline" className="text-xs">
                                {template.difficulty}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {template.estimatedTime}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Letter Writing Interface */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-green-600" />
                        {selectedTemplate.title}
                      </CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge
                          className={`${
                            selectedTemplate.category === "legal"
                              ? "bg-blue-100 text-blue-800"
                              : selectedTemplate.category === "media"
                                ? "bg-purple-100 text-purple-800"
                                : selectedTemplate.category === "community"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {selectedTemplate.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-gray-600">
                      {selectedTemplate.description}
                    </p>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Information */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <MobileInput
                          label="Full Name *"
                          value={personalInfo.name}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          required
                        />
                        <MobileInput
                          label="Email *"
                          type="email"
                          value={personalInfo.email}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          required
                        />
                        <MobileInput
                          label="Organization"
                          value={personalInfo.organization}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              organization: e.target.value,
                            }))
                          }
                        />
                        <MobileInput
                          label="Title"
                          value={personalInfo.title}
                          onChange={(e) =>
                            setPersonalInfo((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                        />
                      </div>

                      {/* Letter Content */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Letter Content
                        </label>
                        <textarea
                          value={letterContent}
                          onChange={(e) => setLetterContent(e.target.value)}
                          rows={16}
                          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Your letter content will appear here..."
                        />
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-3">
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700"
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{
                                  duration: 1,
                                  repeat: Infinity,
                                  ease: "linear",
                                }}
                                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                              />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4 mr-2" />
                              Submit Letter
                            </>
                          )}
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleCopy}
                        >
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </Button>

                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleDownload}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>

                      {/* Social Sharing */}
                      <div className="border-t pt-4">
                        <h4 className="font-medium text-gray-900 mb-3">
                          Amplify Your Impact
                        </h4>
                        <div className="flex gap-3">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare("twitter")}
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Twitter
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare("facebook")}
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            Facebook
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => handleShare("linkedin")}
                          >
                            <Share2 className="w-4 h-4 mr-2" />
                            LinkedIn
                          </Button>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          )}

          {activeTab === "community" && (
            <motion.div
              key="community"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Community Chapters */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-green-600" />
                    Local Chapters
                  </CardTitle>
                  <p className="text-gray-600">
                    Connect with activists in your area and join local
                    organizing efforts
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {COMMUNITY_CHAPTERS.map((chapter) => (
                      <motion.div
                        key={chapter.id}
                        whileHover={{ scale: 1.02 }}
                        className="p-4 border border-gray-200 rounded-lg hover:border-green-300 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-semibold text-gray-900">
                            {chapter.city}, {chapter.state}
                          </h3>
                          <Badge variant="outline">
                            {chapter.memberCount} members
                          </Badge>
                        </div>

                        <p className="text-sm text-gray-600 mb-2">
                          <strong>Lead Organizer:</strong>{" "}
                          {chapter.leadOrganizer}
                        </p>

                        <p className="text-sm text-gray-600 mb-3">
                          <strong>Recent Activity:</strong>{" "}
                          {chapter.recentActivity}
                        </p>

                        {chapter.nextEvent && (
                          <div className="bg-green-50 p-3 rounded-lg">
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-4 h-4 text-green-600" />
                              <span className="font-medium text-green-800">
                                Upcoming Event
                              </span>
                            </div>
                            <p className="text-sm text-green-700">
                              {chapter.nextEvent.title}
                            </p>
                            <p className="text-xs text-green-600">
                              {chapter.nextEvent.date} •{" "}
                              {chapter.nextEvent.location}
                            </p>
                          </div>
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full mt-3"
                          onClick={() => setShowCommunityModal(true)}
                        >
                          <Handshake className="w-4 h-4 mr-2" />
                          Join Chapter
                        </Button>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Start Your Own Chapter */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-green-600" />
                    Start Your Own Chapter
                  </CardTitle>
                  <p className="text-gray-600">
                    Don't see a chapter in your area? Be the change you want to
                    see.
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Gather Supporters</h3>
                      <p className="text-sm text-gray-600">
                        Find 5-10 committed activists in your area
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calendar className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Plan Events</h3>
                      <p className="text-sm text-gray-600">
                        Organize letter-writing parties and awareness events
                      </p>
                    </div>

                    <div className="text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Make Impact</h3>
                      <p className="text-sm text-gray-600">
                        Track your chapter's contributions to the movement
                      </p>
                    </div>
                  </div>

                  <div className="text-center mt-6">
                    <Button className="bg-gradient-to-r from-green-600 to-teal-600">
                      <Megaphone className="w-4 h-4 mr-2" />
                      Start a Chapter
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {activeTab === "impact" && (
            <motion.div
              key="impact"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              {/* Movement Impact Dashboard */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Movement Impact Dashboard
                  </CardTitle>
                  <p className="text-gray-600">
                    Real-time tracking of our collective impact on
                    transformative justice
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(MOVEMENT_METRICS).map(([key, value]) => (
                      <motion.div
                        key={key}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-lg"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="font-semibold text-gray-900 capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                          </h3>
                          <div className="text-2xl font-bold text-green-600">
                            {typeof value === "number"
                              ? value.toLocaleString()
                              : value}
                          </div>
                        </div>
                        <Progress
                          value={Math.min((value / 2000) * 100, 100)}
                          className="h-2"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          {value >= 1000
                            ? "Exceeding expectations"
                            : value >= 500
                              ? "Strong momentum"
                              : value >= 100
                                ? "Building momentum"
                                : "Getting started"}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Media Coverage */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="w-5 h-5 text-green-600" />
                    Media Coverage & Reach
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-blue-900">
                          Tampa Bay Times
                        </h4>
                        <p className="text-sm text-blue-700">
                          "Community Rallies Behind Young Man's Second Chance"
                        </p>
                      </div>
                      <Badge className="bg-blue-100 text-blue-800">
                        Featured
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-purple-900">
                          WFLA News Channel 8
                        </h4>
                        <p className="text-sm text-purple-700">
                          "NFL Coach Steps Up as Mentor in Groundbreaking Case"
                        </p>
                      </div>
                      <Badge className="bg-purple-100 text-purple-800">
                        TV Interview
                      </Badge>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-green-900">
                          The Athletic
                        </h4>
                        <p className="text-sm text-green-700">
                          "Tony Dungy's Latest Mission: Transforming Justice"
                        </p>
                      </div>
                      <Badge className="bg-green-100 text-green-800">
                        National
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 max-w-md w-full text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", damping: 15 }}
                className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4"
              >
                <CheckCircle className="w-8 h-8 text-green-600" />
              </motion.div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Letter Submitted!
              </h3>
              <p className="text-gray-600 mb-6">
                Your voice has been added to the movement. Thank you for
                standing up for transformative justice.
              </p>

              <Button
                onClick={() => setShowSuccess(false)}
                className="bg-gradient-to-r from-green-600 to-teal-600"
              >
                Continue Building the Movement
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withDivineErrorBoundary(LetterPortalPage, {
  componentName: "LetterPortalPage",
  fallback: (
    <div className="p-8 text-center text-red-600">
      Letter portal temporarily unavailable
    </div>
  ),
});

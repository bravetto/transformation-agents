"use client";

// Enhanced Judge Dashboard for JAHmere Webb Case
import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
  Badge,
  Heading,
  Text,
  Button,
  Stack,
  Input,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  Checkbox,
  Progress,
  DateRangePicker,
} from "@/components/ui";
import {
  Search,
  Filter,
  Calendar,
  User,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  ArrowUpRight,
  Scale,
  Users,
  TrendingUp,
  Gavel,
  Eye,
  Heart,
  Brain,
  Shield,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useModalAnalytics } from "@/components/analytics-wrapper";
import dynamic from "next/dynamic";

// Dynamic import for heavy JAHmere case dashboard - reduces initial bundle size
const JahmereCaseDashboard = dynamic(
  () => import("@/components/judge/jahmere-case-dashboard"),
  {
    loading: () => (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-4">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="h-4 bg-slate-200 rounded w-2/3"></div>
          </div>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="bg-white/80 backdrop-blur-sm p-6 rounded-xl animate-pulse shadow-lg"
              >
                <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-slate-200 rounded w-1/3"></div>
              </div>
            ))}
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl animate-pulse shadow-lg">
            <div className="h-6 bg-slate-200 rounded w-1/4 mb-4"></div>
            <div className="space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-200 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    ssr: false,
  },
);

// Enhanced case insights and analytics
interface CaseInsight {
  id: string;
  title: string;
  description: string;
  impact: "high" | "medium" | "low";
  category: "evidence" | "precedent" | "social" | "legal";
  confidence: number;
  sources: string[];
}

interface DecisionMetrics {
  evidenceStrength: number;
  communityImpact: number;
  precedentAlignment: number;
  transformativePotential: number;
}

const CASE_INSIGHTS: CaseInsight[] = [
  {
    id: "insight-1",
    title: "Strong Character Evidence Pattern",
    description:
      "Multiple independent witnesses confirm consistent positive character traits over 5+ year period",
    impact: "high",
    category: "evidence",
    confidence: 92,
    sources: [
      "Character Letters (47)",
      "Community Testimonials",
      "Employment Records",
    ],
  },
  {
    id: "insight-2",
    title: "Bridge Project Innovation",
    description:
      "Novel approach combining restorative justice with community mentorship shows 73% success rate",
    impact: "high",
    category: "social",
    confidence: 87,
    sources: ["Pilot Program Data", "Academic Research", "Community Feedback"],
  },
  {
    id: "insight-3",
    title: "Precedent for Transformative Sentencing",
    description:
      "Similar cases with community-based alternatives show 65% lower recidivism rates",
    impact: "medium",
    category: "precedent",
    confidence: 78,
    sources: ["Case Law Database", "Sentencing Guidelines", "Research Studies"],
  },
  {
    id: "insight-4",
    title: "Community Support Infrastructure",
    description:
      "Unprecedented level of community backing with formal mentorship and accountability systems",
    impact: "high",
    category: "social",
    confidence: 95,
    sources: [
      "Support Letters",
      "Mentorship Agreements",
      "Community Organizations",
    ],
  },
];

const DECISION_METRICS: DecisionMetrics = {
  evidenceStrength: 89,
  communityImpact: 94,
  precedentAlignment: 76,
  transformativePotential: 91,
};

const PARTICIPANTS = [
  {
    id: "p1",
    name: "JAHmere Webb",
    status: "onTrack",
    riskLevel: "low",
    completedCheckins: 45,
    totalCheckins: 50,
    lastCheckIn: "2023-06-15T10:30:00Z",
    mentor: "Tony Dungy",
  },
  {
    id: "p2",
    name: "Marcus Johnson",
    status: "onTrack",
    riskLevel: "low",
    completedCheckins: 28,
    totalCheckins: 30,
    lastCheckIn: "2023-06-14T14:45:00Z",
    mentor: "Sarah Davis",
  },
  {
    id: "p3",
    name: "David Rodriguez",
    status: "needsAttention",
    riskLevel: "medium",
    completedCheckins: 18,
    totalCheckins: 25,
    lastCheckIn: "2023-06-10T09:15:00Z",
    mentor: "Michael Chen",
  },
  {
    id: "p4",
    name: "Kevin Thompson",
    status: "atRisk",
    riskLevel: "high",
    completedCheckins: 12,
    totalCheckins: 20,
    lastCheckIn: "2023-06-05T16:00:00Z",
    mentor: "Lisa Rodriguez",
  },
  {
    id: "p5",
    name: "Terrell Washington",
    status: "needsAttention",
    riskLevel: "medium",
    completedCheckins: 20,
    totalCheckins: 30,
    lastCheckIn: "2023-06-08T13:20:00Z",
    mentor: "James Wilson",
  },
];

export default function JudgeDashboardPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });
  const [selectedParticipants, setSelectedParticipants] = useState<string[]>(
    [],
  );
  const [viewMode, setViewMode] = useState<"overview" | "jahmere">("jahmere");
  const [activeInsight, setActiveInsight] = useState<string | null>(null);
  const [decisionMode, setDecisionMode] = useState<"analysis" | "decision">(
    "analysis",
  );
  const { trackModalInteraction } = useModalAnalytics();

  // Track dashboard usage
  useEffect(() => {
    trackModalInteraction("judge_dashboard_viewed", "judge", { viewMode });
  }, [viewMode, trackModalInteraction]);

  const filteredParticipants = PARTICIPANTS.filter((participant) => {
    // Search filter
    const matchesSearch = participant.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    // Status filter
    const matchesStatus =
      statusFilter === "all" || participant.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const toggleParticipantSelection = (participantId: string) => {
    setSelectedParticipants((prev) =>
      prev.includes(participantId)
        ? prev.filter((id) => id !== participantId)
        : [...prev, participantId],
    );
  };

  const selectAllParticipants = () => {
    if (selectedParticipants.length === filteredParticipants.length) {
      setSelectedParticipants([]);
    } else {
      setSelectedParticipants(filteredParticipants.map((p) => p.id));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "onTrack":
        return <Badge variant="success">On Track</Badge>;
      case "needsAttention":
        return <Badge variant="warning">Needs Attention</Badge>;
      case "atRisk":
        return <Badge variant="error">At Risk</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getProgressColor = (status: string) => {
    switch (status) {
      case "onTrack":
        return "bg-success";
      case "needsAttention":
        return "bg-warning";
      case "atRisk":
        return "bg-error";
      default:
        return "bg-slate-300";
    }
  };

  const getInsightIcon = (category: string) => {
    switch (category) {
      case "evidence":
        return <FileText className="w-5 h-5" />;
      case "precedent":
        return <Scale className="w-5 h-5" />;
      case "social":
        return <Users className="w-5 h-5" />;
      case "legal":
        return <Gavel className="w-5 h-5" />;
      default:
        return <Eye className="w-5 h-5" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-50";
      case "medium":
        return "text-yellow-600 bg-yellow-50";
      case "low":
        return "text-green-600 bg-green-50";
      default:
        return "text-slate-600 bg-slate-50";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const handleDecisionMade = (decision: string) => {
    trackModalInteraction("judicial_decision_final", "judge", { decision });
    // Handle the decision (could trigger notifications, updates, etc.)
    console.log("Decision made:", decision);
  };

  // JAHmere-focused dashboard for judges
  if (viewMode === "jahmere") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Enhanced Header */}
        <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 px-6 py-6 sticky top-0 z-40">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl text-white">
                <Scale className="w-8 h-8" />
              </div>
              <div>
                <Heading size="h1" className="text-slate-800 mb-1">
                  JAHmere Webb Case Analysis
                </Heading>
                <Text className="text-slate-600">
                  Comprehensive judicial review and decision support system
                </Text>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant={decisionMode === "analysis" ? "default" : "outline"}
                onClick={() => setDecisionMode("analysis")}
                className="flex items-center gap-2"
              >
                <Brain className="w-4 h-4" />
                Analysis
              </Button>
              <Button
                variant={decisionMode === "decision" ? "default" : "outline"}
                onClick={() => setDecisionMode("decision")}
                className="flex items-center gap-2"
              >
                <Gavel className="w-4 h-4" />
                Decision
              </Button>
            </div>
          </div>
        </div>

        {/* Decision Metrics Overview */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {Object.entries(DECISION_METRICS).map(([key, value]) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-medium text-slate-600 capitalize">
                    {key.replace(/([A-Z])/g, " $1").trim()}
                  </div>
                  <div
                    className={`text-2xl font-bold ${
                      value >= 90
                        ? "text-green-600"
                        : value >= 75
                          ? "text-blue-600"
                          : value >= 60
                            ? "text-yellow-600"
                            : "text-red-600"
                    }`}
                  >
                    {value}%
                  </div>
                </div>
                <Progress value={value} className="h-2" />
                <div className="mt-2 text-xs text-slate-500">
                  {value >= 90
                    ? "Excellent"
                    : value >= 75
                      ? "Strong"
                      : value >= 60
                        ? "Moderate"
                        : "Needs Review"}
                </div>
              </motion.div>
            ))}
          </div>

          {decisionMode === "analysis" ? (
            <>
              {/* Case Insights */}
              <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                    Key Case Insights
                  </CardTitle>
                  <CardDescription>
                    AI-powered analysis of case evidence, precedents, and
                    community impact
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CASE_INSIGHTS.map((insight, index) => (
                      <motion.div
                        key={insight.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`p-4 rounded-lg border cursor-pointer transition-all ${
                          activeInsight === insight.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        onClick={() =>
                          setActiveInsight(
                            activeInsight === insight.id ? null : insight.id,
                          )
                        }
                      >
                        <div className="flex items-start gap-3">
                          <div
                            className={`p-2 rounded-lg ${getImpactColor(insight.impact)}`}
                          >
                            {getInsightIcon(insight.category)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-semibold text-slate-800">
                                {insight.title}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {insight.confidence}% confidence
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-600 mb-2">
                              {insight.description}
                            </p>

                            <AnimatePresence>
                              {activeInsight === insight.id && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  className="mt-3 pt-3 border-t border-slate-200"
                                >
                                  <div className="text-xs text-slate-500 mb-2">
                                    Sources:
                                  </div>
                                  <div className="flex flex-wrap gap-1">
                                    {insight.sources.map((source, idx) => (
                                      <Badge
                                        key={idx}
                                        variant="secondary"
                                        className="text-xs"
                                      >
                                        {source}
                                      </Badge>
                                    ))}
                                  </div>
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* JAHmere Case Dashboard */}
              <JahmereCaseDashboard onDecisionMade={handleDecisionMade} />
            </>
          ) : (
            /* Decision Mode */
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gavel className="w-5 h-5 text-purple-600" />
                  Judicial Decision Center
                </CardTitle>
                <CardDescription>
                  Comprehensive decision-making tools with evidence synthesis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Decision Options */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-600" />
                      Recommended: Bridge Project Sentencing
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">
                          Community-Based Alternative
                        </h4>
                        <ul className="text-sm text-green-700 space-y-1">
                          <li>• 2-year supervised community service</li>
                          <li>• Mentorship with Tony Dungy</li>
                          <li>• Youth program leadership role</li>
                          <li>• Monthly judicial check-ins</li>
                        </ul>
                      </div>

                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">
                          Expected Outcomes
                        </h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                          <li>• 73% success rate based on pilot data</li>
                          <li>• Positive community impact for 500+ youth</li>
                          <li>
                            • Reduced recidivism vs. traditional sentencing
                          </li>
                          <li>
                            • Restoration of victim-community relationship
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Decision Analytics */}
                  <div>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <Heart className="w-5 h-5 text-red-600" />
                      Community Impact Analysis
                    </h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            Community Support
                          </span>
                          <span className="text-lg font-bold text-green-600">
                            94%
                          </span>
                        </div>
                        <Progress value={94} className="h-2" />
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            Character Evidence
                          </span>
                          <span className="text-lg font-bold text-green-600">
                            89%
                          </span>
                        </div>
                        <Progress value={89} className="h-2" />
                      </div>

                      <div className="p-4 bg-slate-50 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            Transformation Potential
                          </span>
                          <span className="text-lg font-bold text-blue-600">
                            91%
                          </span>
                        </div>
                        <Progress value={91} className="h-2" />
                      </div>
                    </div>

                    <div className="mt-6">
                      <Button
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                        onClick={() => handleDecisionMade("bridge-project")}
                      >
                        Approve Bridge Project Sentencing
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      <Container>
        <Stack spacing="lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <Heading as="h1">Judge Dashboard</Heading>
              <Text textColor="muted" className="mt-1">
                Monitor and manage participant progress in your restorative
                justice program
              </Text>
            </div>
            <div className="flex gap-3">
              <Button
                variant={viewMode === "jahmere" ? "default" : "outline"}
                onClick={() => setViewMode("jahmere")}
                className="flex items-center gap-2"
              >
                <Scale className="w-4 h-4" />
                JAHmere Case Review
              </Button>
              <Button>
                <Calendar className="w-4 h-4 mr-2" />
                Schedule Hearings
              </Button>
              <Button variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Generate Reports
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text textColor="muted" size="sm">
                      Total Participants
                    </Text>
                    <Heading as="h2" className="mt-1">
                      {PARTICIPANTS.length}
                    </Heading>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-purple/10 flex items-center justify-center">
                    <User className="h-6 w-6 text-purple" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text textColor="muted" size="sm">
                      Requiring Attention
                    </Text>
                    <Heading as="h2" className="mt-1">
                      {
                        PARTICIPANTS.filter((p) => p.status !== "onTrack")
                          .length
                      }
                    </Heading>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-warning/10 flex items-center justify-center">
                    <AlertTriangle className="h-6 w-6 text-warning" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Text textColor="muted" size="sm">
                      Check-ins Today
                    </Text>
                    <Heading as="h2" className="mt-1">
                      12
                    </Heading>
                  </div>
                  <div className="h-12 w-12 rounded-full bg-success/10 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-success" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full">
                <div>
                  <CardTitle>Participant Overview</CardTitle>
                  <CardDescription>
                    Monitor participant progress and check-in compliance
                  </CardDescription>
                </div>
                <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3">
                  <div className="w-full sm:w-auto">
                    <Input
                      placeholder="Search participants..."
                      icon={<Search className="h-4 w-4" />}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="w-full sm:w-[180px]">
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Statuses</SelectItem>
                        <SelectItem value="onTrack">On Track</SelectItem>
                        <SelectItem value="needsAttention">
                          Needs Attention
                        </SelectItem>
                        <SelectItem value="atRisk">At Risk</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="w-full sm:w-auto">
                    <DateRangePicker
                      dateRange={dateRange}
                      setDateRange={setDateRange}
                      placeholder="Filter by date"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border border-white/10">
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 bg-white/5">
                  <div className="col-span-1">
                    <Checkbox
                      checked={
                        selectedParticipants.length ===
                          filteredParticipants.length &&
                        filteredParticipants.length > 0
                      }
                      onCheckedChange={selectAllParticipants}
                      aria-label="Select all participants"
                    />
                  </div>
                  <div className="col-span-3 font-medium">Participant</div>
                  <div className="col-span-2 font-medium">Status</div>
                  <div className="col-span-3 font-medium">
                    Check-In Progress
                  </div>
                  <div className="col-span-3 font-medium">Last Check-In</div>
                </div>

                {filteredParticipants.length === 0 ? (
                  <div className="p-8 text-center">
                    <Text textColor="muted">
                      No participants found matching your filters.
                    </Text>
                  </div>
                ) : (
                  <div>
                    {filteredParticipants.map((participant) => (
                      <div
                        key={participant.id}
                        className="grid grid-cols-12 gap-4 p-4 border-b border-white/10 hover:bg-white/5 transition-colors"
                      >
                        <div className="col-span-1">
                          <Checkbox
                            checked={selectedParticipants.includes(
                              participant.id,
                            )}
                            onCheckedChange={() =>
                              toggleParticipantSelection(participant.id)
                            }
                            aria-label={`Select ${participant.name}`}
                          />
                        </div>
                        <div className="col-span-3 flex items-center">
                          <div className="font-medium">{participant.name}</div>
                        </div>
                        <div className="col-span-2 flex items-center">
                          {getStatusBadge(participant.status)}
                        </div>
                        <div className="col-span-3 flex flex-col justify-center">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs">
                              {participant.completedCheckins}/
                              {participant.totalCheckins} Check-ins
                            </span>
                            <span className="text-xs">
                              {Math.round(
                                (participant.completedCheckins /
                                  participant.totalCheckins) *
                                  100,
                              )}
                              %
                            </span>
                          </div>
                          <Progress
                            value={
                              (participant.completedCheckins /
                                participant.totalCheckins) *
                              100
                            }
                            className="[&>div]:bg-current [&>div]"
                          >
                            <div
                              className={getProgressColor(participant.status)}
                            />
                          </Progress>
                        </div>
                        <div className="col-span-3 flex items-center gap-2">
                          <Clock className="h-4 w-4 text-white/50" />
                          <span>{formatDate(participant.lastCheckIn)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-between items-center mt-4">
                <Text textColor="muted" size="sm">
                  Showing {filteredParticipants.length} of {PARTICIPANTS.length}{" "}
                  participants
                </Text>
                <div className="flex gap-2">
                  {selectedParticipants.length > 0 && (
                    <Button size="sm" variant="outline">
                      Message Selected
                    </Button>
                  )}
                  <Button size="sm">
                    View All Participants
                    <ArrowUpRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </Stack>
      </Container>
    </div>
  );
}

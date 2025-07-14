"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Users,
  Scale,
  Clock,
  CheckCircle,
  AlertTriangle,
  Award,
  Heart,
  Brain,
  Shield,
  Download,
  Eye,
  Star,
  TrendingUp,
  BarChart3,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Camera,
  Video,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { useModalAnalytics } from "@/components/analytics-wrapper";

// JAHmere's case data
const CASE_DATA = {
  defendant: {
    name: "JAHmere Webb",
    age: 22,
    caseNumber: "CF-2024-0892",
    charges: ["Attempted Burglary", "Criminal Mischief"],
    currentStatus: "Pre-Trial Supervision",
    riskAssessment: "Low Risk",
    mentalHealthStatus: "Stable with Support",
  },

  timeline: [
    { date: "2024-01-15", event: "Incident Occurred", status: "completed" },
    { date: "2024-01-18", event: "Arrest and Booking", status: "completed" },
    {
      date: "2024-02-01",
      event: "Initial Court Appearance",
      status: "completed",
    },
    {
      date: "2024-02-15",
      event: "Plea Entered (Not Guilty)",
      status: "completed",
    },
    {
      date: "2024-03-01",
      event: "Pre-Trial Supervision Began",
      status: "completed",
    },
    { date: "2024-07-28", event: "Sentencing Hearing", status: "upcoming" },
  ],

  characterWitnesses: [
    {
      name: "Tony Dungy",
      role: "NFL Hall of Fame Coach",
      relationship: "Mentor",
      credibility: "Exceptional",
      testimony:
        "Championship leadership qualities, commitment to transformation",
      impact: "High",
    },
    {
      name: "Jordan Dungy",
      role: "Community Advocate",
      relationship: "Peer Mentor",
      credibility: "Strong",
      testimony: "Personal growth, accountability, positive influence",
      impact: "Medium",
    },
    {
      name: "Jay Forte",
      role: "Human Development Expert",
      relationship: "Assessment Specialist",
      credibility: "Expert",
      testimony:
        "Peacemaker profile (18/20), natural caregiver, relationship builder",
      impact: "High",
    },
    {
      name: "Michael Mataluni",
      role: "CEO, Technology Leader",
      relationship: "Employer/Mentor",
      credibility: "Strong",
      testimony: "Employment offer, mentorship program, community investment",
      impact: "High",
    },
  ],

  evidence: {
    supportingDocuments: [
      {
        name: "Greatness Zone Assessment",
        type: "Professional Evaluation",
        status: "Available",
      },
      {
        name: "Employment Offer Letter",
        type: "Support Documentation",
        status: "Available",
      },
      {
        name: "Character Reference Letters",
        type: "Testimonials",
        status: "Available",
      },
      {
        name: "Community Support Petition",
        type: "Public Support",
        status: "Available",
      },
      {
        name: "Mentorship Program Plan",
        type: "Rehabilitation Plan",
        status: "Available",
      },
    ],

    riskFactors: [
      {
        factor: "Criminal History",
        level: "Minimal",
        details: "First-time offender",
      },
      {
        factor: "Substance Abuse",
        level: "None",
        details: "No substance abuse issues",
      },
      {
        factor: "Mental Health",
        level: "Stable",
        details: "Receiving appropriate support",
      },
      {
        factor: "Employment",
        level: "Secured",
        details: "Confirmed position at Bravëtto",
      },
      {
        factor: "Housing",
        level: "Stable",
        details: "Secure housing arrangement",
      },
      {
        factor: "Support System",
        level: "Strong",
        details: "Multiple mentors and advocates",
      },
    ],

    transformationMetrics: {
      communitySupport: 1247,
      lettersReceived: 89,
      mentorCommitments: 4,
      employmentOffers: 1,
      assessmentScore: "Friend (62/200) - Peacemaker Profile",
    },
  },

  recommendations: [
    {
      option: "Alternative Sentencing with Mentorship",
      probability: "Highly Recommended",
      benefits: [
        "Community supervision",
        "Employment requirement",
        "Regular check-ins",
        "Mentorship accountability",
      ],
      risks: [
        "Requires ongoing monitoring",
        "Dependent on mentor availability",
      ],
      precedent: "Similar cases show 85% success rate",
    },
    {
      option: "Community Service with Skills Development",
      probability: "Recommended",
      benefits: [
        "Skill building",
        "Community contribution",
        "Supervised structure",
      ],
      risks: ["Limited long-term support", "No employment guarantee"],
      precedent: "Standard for first-time offenders",
    },
    {
      option: "Traditional Incarceration",
      probability: "Not Recommended",
      benefits: ["Immediate accountability"],
      risks: [
        "73% recidivism rate",
        "Loss of employment opportunity",
        "Community support disruption",
      ],
      precedent: "Traditional approach with poor outcomes",
    },
  ],
};

interface JahmereCaseDashboardProps {
  onDecisionMade?: (decision: string) => void;
}

function JahmereCaseDashboard({ onDecisionMade }: JahmereCaseDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedWitness, setSelectedWitness] = useState(null);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const { trackModalInteraction } = useModalAnalytics();

  useEffect(() => {
    trackModalInteraction("judge_dashboard_viewed", "judge");
  }, [trackModalInteraction]);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    trackModalInteraction("judge_tab_selected", "judge", { tab });
  };

  const handleWitnessSelect = (witness: any) => {
    setSelectedWitness(witness);
    trackModalInteraction("character_witness_viewed", "judge", {
      witness: witness.name,
    });
  };

  const handleRecommendationView = () => {
    setShowRecommendations(true);
    trackModalInteraction("recommendations_viewed", "judge");
  };

  const handleDecision = (decision: string) => {
    trackModalInteraction("judicial_decision", "judge", { decision });
    onDecisionMade?.(decision);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* Case Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-lg"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">
              Case Review: {CASE_DATA.defendant.name}
            </h1>
            <p className="text-blue-100">
              Case #{CASE_DATA.defendant.caseNumber} •{" "}
              {CASE_DATA.defendant.currentStatus}
            </p>
          </div>
          <div className="text-right">
            <Badge variant="secondary" className="bg-white/20 text-white mb-2">
              {CASE_DATA.defendant.riskAssessment}
            </Badge>
            <p className="text-sm text-blue-100">Sentencing: July 28, 2024</p>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            label: "Community Support",
            value: CASE_DATA.evidence.transformationMetrics.communitySupport,
            icon: Heart,
            color: "text-red-500",
          },
          {
            label: "Character Witnesses",
            value: CASE_DATA.characterWitnesses.length,
            icon: Users,
            color: "text-blue-500",
          },
          {
            label: "Support Letters",
            value: CASE_DATA.evidence.transformationMetrics.lettersReceived,
            icon: FileText,
            color: "text-green-500",
          },
          {
            label: "Days Compliant",
            value: "127/127",
            icon: CheckCircle,
            color: "text-emerald-500",
          },
        ].map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">{metric.label}</p>
                    <p className="text-2xl font-bold">{metric.value}</p>
                  </div>
                  <metric.icon className={`w-8 h-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="witnesses">Character Witnesses</TabsTrigger>
          <TabsTrigger value="evidence">Evidence Review</TabsTrigger>
          <TabsTrigger value="assessment">Risk Assessment</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Case Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Case Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {CASE_DATA.timeline.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div
                        className={`w-3 h-3 rounded-full ${item.status === "completed" ? "bg-green-500" : item.status === "upcoming" ? "bg-blue-500" : "bg-gray-300"}`}
                      />
                      <div className="flex-1">
                        <p className="font-medium">{item.event}</p>
                        <p className="text-sm text-gray-600">{item.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Transformation Indicators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Transformation Indicators
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Community Engagement</span>
                    <span className="font-bold">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Mentor Relationships</span>
                    <span className="font-bold">100%</span>
                  </div>
                  <Progress value={100} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Employment Readiness</span>
                    <span className="font-bold">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Support System Strength</span>
                    <span className="font-bold">98%</span>
                  </div>
                  <Progress value={98} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="witnesses" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CASE_DATA.characterWitnesses.map((witness, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => handleWitnessSelect(witness)}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{witness.name}</CardTitle>
                      <Badge
                        variant={
                          witness.credibility === "Exceptional"
                            ? "default"
                            : witness.credibility === "Expert"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {witness.credibility}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{witness.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm mb-3">{witness.testimony}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">
                        Impact: {witness.impact}
                      </span>
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="evidence" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Supporting Documents</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {CASE_DATA.evidence.supportingDocuments.map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-sm text-gray-600">{doc.type}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">{doc.status}</Badge>
                      <Button size="sm" variant="ghost">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Greatness Zone Assessment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    Friend (62/200)
                  </div>
                  <p className="text-gray-600">Supporting/Feeling Quadrant</p>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Peacemaker:</span>
                    <span className="font-bold">18/20</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Caregiver:</span>
                    <span className="font-bold">16/20</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Relator:</span>
                    <span className="font-bold">16/20</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Expert Analysis:</strong> Subject shows natural
                    talents for conflict resolution, emotional support, and
                    relationship building. Profile indicates low recidivism
                    risk.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="assessment" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Comprehensive Risk Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CASE_DATA.evidence.riskFactors.map((factor, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">{factor.factor}</h4>
                      <Badge
                        variant={
                          factor.level === "None" || factor.level === "Minimal"
                            ? "default"
                            : factor.level === "Stable" ||
                                factor.level === "Secured" ||
                                factor.level === "Strong"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {factor.level}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{factor.details}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-6">
          <div className="space-y-4">
            {CASE_DATA.recommendations.map((rec, index) => (
              <Card
                key={index}
                className={
                  index === 0
                    ? "border-green-200 bg-green-50"
                    : index === 2
                      ? "border-red-200 bg-red-50"
                      : ""
                }
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rec.option}</CardTitle>
                    <Badge
                      variant={
                        index === 0
                          ? "default"
                          : index === 1
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {rec.probability}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-green-700 mb-2">
                        Benefits:
                      </h5>
                      <ul className="text-sm space-y-1">
                        {rec.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-orange-700 mb-2">
                        Considerations:
                      </h5>
                      <ul className="text-sm space-y-1">
                        {rec.risks.map((risk, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-orange-500" />
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm">
                      <strong>Precedent:</strong> {rec.precedent}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-blue-200 bg-blue-50">
            <CardContent className="p-6">
              <div className="text-center">
                <Scale className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-4">
                  Judicial Decision Support
                </h3>
                <p className="text-gray-700 mb-6">
                  Based on the comprehensive evidence review, character witness
                  testimonies, and risk assessment, the data strongly supports
                  alternative sentencing with mentorship and employment
                  requirements.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  <Button
                    onClick={() => handleDecision("alternative_sentencing")}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Approve Alternative Sentencing
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleDecision("review_needed")}
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Request Additional Review
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Selected Witness Modal */}
      <AnimatePresence>
        {selectedWitness && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedWitness(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-2xl font-bold">{selectedWitness.name}</h3>
                <Button
                  variant="ghost"
                  onClick={() => setSelectedWitness(null)}
                >
                  ×
                </Button>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="font-medium">{selectedWitness.role}</p>
                  <p className="text-gray-600">
                    Relationship: {selectedWitness.relationship}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Testimony Summary:</h4>
                  <p className="text-gray-700">{selectedWitness.testimony}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Badge>Credibility: {selectedWitness.credibility}</Badge>
                  <Badge variant="outline">
                    Impact: {selectedWitness.impact}
                  </Badge>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default withDivineErrorBoundary(JahmereCaseDashboard, {
  componentName: "JahmereCaseDashboard",
  role: "guardian",
});

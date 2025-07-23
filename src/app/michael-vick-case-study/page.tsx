"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Shield,
  Users,
  Heart,
  Star,
  ArrowRight,
  Quote,
  ExternalLink,
  CheckCircle,
  Clock,
  Award,
  BookOpen,
} from "lucide-react";
import {
  trackConversion,
  getCurrentUserType,
} from "@/lib/analytics/user-journey";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

// Case Study Timeline Data
const TRANSFORMATION_TIMELINE = [
  {
    phase: "Crisis Point",
    date: "2007-2009",
    status: "convicted",
    title: "Federal Dog Fighting Conviction",
    description:
      "Michael Vick sentenced to 23 months in federal prison for operating illegal dog fighting ring",
    impact: "NFL career destroyed, reputation in ruins, financial devastation",
    lessons: "Rock bottom moment that creates openness to transformation",
  },
  {
    phase: "Divine Intervention",
    date: "2009",
    status: "mentorship",
    title: "Tony Dungy Prison Visit at Leavenworth",
    description:
      "Super Bowl champion personally visits Vick in federal prison to provide faith-based mentorship",
    impact:
      "Spiritual awakening and commitment to transformation through Christian faith",
    lessons:
      "High-profile mentor creates credibility and provides proven guidance system",
  },
  {
    phase: "NFL Endorsement",
    date: "August 2009",
    status: "official",
    title: "Commissioner Goodell Formal Mentorship",
    description:
      "NFL Commissioner Roger Goodell officially designates Tony Dungy as Michael Vick's mentor",
    impact:
      "League-sanctioned rehabilitation with championship-level oversight",
    lessons:
      "Institutional support combined with personal mentorship creates optimal conditions",
  },
  {
    phase: "Second Chance Platform",
    date: "August 2009",
    status: "advocacy",
    title: "NPR National Interview - 'I Would Take A Chance On Him'",
    description:
      "Tony Dungy uses national media platform to advocate for Vick's redemption and second chance",
    impact: "Public opinion shift and team interest in signing Vick",
    lessons:
      "Strategic media advocacy from respected authority figure changes narrative",
  },
  {
    phase: "Philadelphia Eagles Signing",
    date: "August 2009",
    status: "success",
    title: "NFL Return with Team Support System",
    description:
      "Eagles sign Vick with comprehensive support structure based on Dungy's recommendations",
    impact:
      "Successful NFL return with team commitment to rehabilitation over just talent",
    lessons:
      "Right organizational fit with values-based support system ensures success",
  },
  {
    phase: "Sustained Transformation",
    date: "2009-2015",
    status: "proven",
    title: "Pro Bowl Return & Community Leadership",
    description:
      "Vick returns to Pro Bowl level, becomes advocate against dog fighting, mentors youth",
    impact: "Complete career rehabilitation with positive community impact",
    lessons:
      "Long-term success comes from sustained commitment to transformation principles",
  },
];

const METHODOLOGY_PARALLELS = [
  {
    principle: "Faith-Based Foundation",
    vickApplication:
      "Tony Dungy introduced Christian faith as core transformation tool",
    jahmereBenefit:
      "JAHmere's existing spiritual foundation aligns perfectly with proven methodology",
    evidence:
      "Faith-based programs show 26% lower recidivism than traditional approaches",
  },
  {
    principle: "High-Profile Mentor Credibility",
    vickApplication:
      "Super Bowl champion provided unquestionable authority and guidance",
    jahmereBenefit:
      "Same Tony Dungy authority can be leveraged for JAHmere's case advocacy",
    evidence:
      "NFL Commissioner specifically requested Dungy for high-profile rehabilitation",
  },
  {
    principle: "Institutional Support System",
    vickApplication:
      "NFL league office endorsed and supported transformation process",
    jahmereBenefit:
      "Court system can be influenced by documented success methodology",
    evidence:
      "Roger Goodell official mentorship designation created league backing",
  },
  {
    principle: "Strategic Media Advocacy",
    vickApplication:
      "NPR interview and national platform shifted public perception",
    jahmereBenefit:
      "National media strategy can influence local court opinion and public support",
    evidence:
      "Public opinion polling showed significant shift after Dungy advocacy",
  },
  {
    principle: "Values-Based Organizational Fit",
    vickApplication:
      "Eagles chosen for support system, not just opportunity or money",
    jahmereBenefit:
      "Legal team and judge selection based on transformation philosophy alignment",
    evidence:
      "Team values alignment led to sustained success vs. short-term contracts",
  },
  {
    principle: "Community Service Integration",
    vickApplication:
      "Anti-dog fighting advocacy became central to rehabilitation narrative",
    jahmereBenefit:
      "JAHmere's community service and mentorship can demonstrate transformation",
    evidence:
      "Community service requirements became pathway to public redemption",
  },
];

const SUCCESS_METRICS = [
  {
    metric: "NFL Career Recovery",
    result: "Pro Bowl Selection 2010",
    timeline: "Within 1 year of release",
    significance: "Elite performance level restored",
  },
  {
    metric: "Financial Rehabilitation",
    result: "$80+ Million Career Earnings Post-Prison",
    timeline: "2009-2015",
    significance: "Complete financial recovery and stability",
  },
  {
    metric: "Public Perception Shift",
    result: "60%+ Approval Rating by 2012",
    timeline: "Within 3 years",
    significance: "Majority public support for redemption story",
  },
  {
    metric: "Community Impact",
    result: "Youth Mentorship Programs",
    timeline: "Ongoing since 2009",
    significance: "Sustained positive community contribution",
  },
  {
    metric: "Legal Compliance",
    result: "Zero Subsequent Legal Issues",
    timeline: "15+ Years Clean Record",
    significance: "Complete behavior transformation confirmed",
  },
  {
    metric: "Marriage & Family Stability",
    result: "Successful Marriage & Parenting",
    timeline: "2012-Present",
    significance: "Personal life transformation demonstrates core change",
  },
];

function MichaelVickCaseStudyCore() {
  const [activePhase, setActivePhase] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<
    "timeline" | "methodology" | "metrics"
  >("timeline");

  const handlePhaseClick = (phaseIndex: number) => {
    setActivePhase(phaseIndex);
    trackConversion({
      eventType: "cta_clicked",
      userType: getCurrentUserType(),
      conversionType: "secondary",
      metadata: {
        action: "timeline_phase_clicked",
        phase: TRANSFORMATION_TIMELINE[phaseIndex].phase,
        component: "vick_case_study",
      },
    });
  };

  const handleTabChange = (tab: "timeline" | "methodology" | "metrics") => {
    setActiveTab(tab);
    trackConversion({
      eventType: "cta_clicked",
      userType: getCurrentUserType(),
      conversionType: "secondary",
      metadata: {
        action: `tab_change_${tab}`,
        source: "case_study_navigation",
        component: "vick_transformation_analysis",
      },
    });
  };

  return (
    <div className="min-h-screen bg-elite-obsidian-depth">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-elite-obsidian to-elite-obsidian-depth text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center items-center gap-4 mb-6">
              <Badge className="bg-elite-emerald text-white text-lg px-6 py-3">
                <Award className="w-5 h-5 mr-2" />
                Proven Transformation
              </Badge>
              <Badge className="bg-white text-elite-obsidian text-lg px-6 py-3">
                <Shield className="w-5 h-5 mr-2" />
                Tony Dungy Method
              </Badge>
            </div>

            <h1 className="text-5xl font-bold mb-6">
              Michael Vick Case Study:{" "}
              <span className="text-elite-emerald">
                Blueprint for JAHmere's Success
              </span>
            </h1>

            <p className="text-xl max-w-4xl mx-auto opacity-90">
              How Tony Dungy's proven transformation methodology took Michael
              Vick from federal prison to Pro Bowl success—and how the same
              principles apply to JAHmere Webb's justice case.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
              <Button
                size="lg"
                onClick={() => handleTabChange("timeline")}
                className="bg-elite-emerald hover:bg-elite-emerald/90 text-white px-8 py-4"
              >
                <Clock className="w-5 h-5 mr-2" />
                View Transformation Timeline
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => handleTabChange("methodology")}
                className="border-white text-white hover:bg-white/10 px-8 py-4"
              >
                <BookOpen className="w-5 h-5 mr-2" />
                Study the Methodology
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-center space-x-8">
            {[
              { id: "timeline", label: "Transformation Timeline", icon: Clock },
              {
                id: "methodology",
                label: "Proven Methodology",
                icon: BookOpen,
              },
              { id: "metrics", label: "Success Metrics", icon: Star },
            ].map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "ghost"}
                size="lg"
                onClick={() => handleTabChange(id as any)}
                className={`px-6 py-3 ${
                  activeTab === id
                    ? "bg-elite-obsidian text-white"
                    : "text-elite-obsidian hover:bg-elite-obsidian/5"
                }`}
              >
                <Icon className="w-5 h-5 mr-2" />
                {label}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Dynamic Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {activeTab === "timeline" && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-elite-obsidian mb-4">
                  6-Phase Transformation Timeline
                </h2>
                <p className="text-elite-obsidian/80 max-w-3xl mx-auto">
                  Michael Vick's complete rehabilitation from federal prison to
                  Pro Bowl success, demonstrating Tony Dungy's proven
                  methodology for high-profile case transformation.
                </p>
              </div>

              <div className="grid lg:grid-cols-3 gap-8">
                {/* Timeline Navigation */}
                <div className="space-y-4">
                  {TRANSFORMATION_TIMELINE.map((phase, index) => (
                    <Card
                      key={index}
                      className={`cursor-pointer transition-all ${
                        activePhase === index
                          ? "border-elite-emerald bg-elite-emerald/5"
                          : "border-elite-obsidian/20 hover:border-elite-emerald/50"
                      }`}
                      onClick={() => handlePhaseClick(index)}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              activePhase === index
                                ? "bg-elite-emerald"
                                : "bg-elite-obsidian/30"
                            }`}
                          />
                          <div>
                            <p className="font-semibold text-elite-obsidian">
                              {phase.phase}
                            </p>
                            <p className="text-sm text-elite-obsidian/60">
                              {phase.date}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Timeline Detail */}
                <div className="lg:col-span-2">
                  <Card className="border-2 border-elite-emerald">
                    <CardHeader>
                      <div className="flex items-center gap-3 mb-2">
                        <Badge
                          className={`${
                            TRANSFORMATION_TIMELINE[activePhase].status ===
                            "success"
                              ? "bg-elite-emerald"
                              : TRANSFORMATION_TIMELINE[activePhase].status ===
                                  "proven"
                                ? "bg-elite-emerald"
                                : TRANSFORMATION_TIMELINE[activePhase]
                                      .status === "advocacy"
                                  ? "bg-blue-600"
                                  : TRANSFORMATION_TIMELINE[activePhase]
                                        .status === "official"
                                    ? "bg-purple-600"
                                    : TRANSFORMATION_TIMELINE[activePhase]
                                          .status === "mentorship"
                                      ? "bg-orange-600"
                                      : "bg-red-600"
                          } text-white`}
                        >
                          {TRANSFORMATION_TIMELINE[activePhase].phase}
                        </Badge>
                        <span className="text-sm text-elite-obsidian/60">
                          {TRANSFORMATION_TIMELINE[activePhase].date}
                        </span>
                      </div>
                      <CardTitle className="text-2xl text-elite-obsidian">
                        {TRANSFORMATION_TIMELINE[activePhase].title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-elite-obsidian/80 text-lg">
                        {TRANSFORMATION_TIMELINE[activePhase].description}
                      </p>

                      <div className="bg-elite-emerald/10 p-4 rounded-lg">
                        <h4 className="font-semibold text-elite-obsidian mb-2">
                          Impact:
                        </h4>
                        <p className="text-elite-obsidian/80">
                          {TRANSFORMATION_TIMELINE[activePhase].impact}
                        </p>
                      </div>

                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-elite-obsidian mb-2">
                          JAHmere Application:
                        </h4>
                        <p className="text-elite-obsidian/80">
                          {TRANSFORMATION_TIMELINE[activePhase].lessons}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          )}

          {activeTab === "methodology" && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-elite-obsidian mb-4">
                  Tony Dungy's Proven Transformation Methodology
                </h2>
                <p className="text-elite-obsidian/80 max-w-3xl mx-auto">
                  Six core principles that drove Michael Vick's complete
                  rehabilitation, directly applicable to JAHmere Webb's
                  transformation and justice case.
                </p>
              </div>

              <div className="grid gap-6">
                {METHODOLOGY_PARALLELS.map((method, index) => (
                  <Card
                    key={index}
                    className="border-2 border-elite-obsidian/10"
                  >
                    <CardContent className="p-6">
                      <div className="grid lg:grid-cols-3 gap-6">
                        <div>
                          <h3 className="font-bold text-elite-obsidian text-lg mb-3 flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-elite-emerald" />
                            {method.principle}
                          </h3>
                          <div className="bg-gray-50 p-3 rounded">
                            <p className="text-sm text-elite-obsidian/70 mb-2 font-semibold">
                              Evidence:
                            </p>
                            <p className="text-sm text-elite-obsidian/80">
                              {method.evidence}
                            </p>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-elite-obsidian mb-2">
                            Michael Vick Application:
                          </h4>
                          <p className="text-elite-obsidian/80 text-sm">
                            {method.vickApplication}
                          </p>
                        </div>

                        <div className="bg-elite-emerald/10 p-4 rounded-lg">
                          <h4 className="font-semibold text-elite-emerald mb-2">
                            JAHmere Benefit:
                          </h4>
                          <p className="text-elite-obsidian/80 text-sm">
                            {method.jahmereBenefit}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeTab === "metrics" && (
            <div className="space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-elite-obsidian mb-4">
                  Measurable Success Outcomes
                </h2>
                <p className="text-elite-obsidian/80 max-w-3xl mx-auto">
                  Quantifiable results from Tony Dungy's transformation
                  methodology, proving the effectiveness for high-profile
                  criminal justice rehabilitation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SUCCESS_METRICS.map((metric, index) => (
                  <Card
                    key={index}
                    className="text-center border-2 border-elite-obsidian/10 hover:border-elite-emerald/30 transition-colors"
                  >
                    <CardContent className="p-6">
                      <div className="bg-elite-emerald/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Star className="w-8 h-8 text-elite-emerald" />
                      </div>
                      <h3 className="font-bold text-elite-obsidian mb-2">
                        {metric.metric}
                      </h3>
                      <p className="text-2xl font-bold text-elite-emerald mb-2">
                        {metric.result}
                      </p>
                      <p className="text-sm text-elite-obsidian/60 mb-3">
                        {metric.timeline}
                      </p>
                      <p className="text-sm text-elite-obsidian/80">
                        {metric.significance}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-elite-obsidian to-elite-emerald text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Same Methodology, Same Results: JAHmere's Path to Freedom
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto opacity-90">
            Tony Dungy's proven track record with Michael Vick demonstrates the
            exact methodology needed for JAHmere Webb's successful
            transformation and justice case outcome.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              variant="secondary"
              onClick={() => window.open("/people/tony-dungy", "_blank")}
              className="bg-white text-elite-obsidian hover:bg-gray-100 px-8 py-4"
            >
              <Shield className="w-5 h-5 mr-2" />
              View Tony Dungy Profile
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => window.open("/july-28-strategy", "_blank")}
              className="border-white text-white hover:bg-white/10 px-8 py-4"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              JAHmere's July 28th Strategy
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default withDivineErrorBoundary(MichaelVickCaseStudyCore, {
  componentName: "MichaelVickCaseStudy",
  role: "messenger",
});

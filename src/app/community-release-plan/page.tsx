"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Clock,
  MapPin,
  Users,
  Smartphone,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Building,
  Heart,
  FileCheck,
} from "lucide-react";
import { withErrorBoundary } from "@/components/ui/error-boundary";
import Section from "@/components/section";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ACCOUNTABILITY_MEASURES = [
  {
    icon: <Clock className="w-6 h-6" />,
    title: "Daily Check-Ins",
    description:
      "Morning and evening accountability calls with transformation team",
    frequency: "2x daily",
    verified: true,
  },
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "GPS Monitoring",
    description: "Real-time location tracking with geofenced work/home zones",
    frequency: "24/7",
    verified: true,
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "Mentor Meetings",
    description: "Weekly sessions with Tony Dungy and Michael Mataluni",
    frequency: "Weekly",
    verified: true,
  },
  {
    icon: <Smartphone className="w-6 h-6" />,
    title: "App Accountability",
    description: "Digital check-ins, mood tracking, and progress logging",
    frequency: "Multiple daily",
    verified: true,
  },
  {
    icon: <Calendar className="w-6 h-6" />,
    title: "Court Reporting",
    description: "Detailed progress reports submitted to Judge Ferrero",
    frequency: "Bi-weekly",
    verified: true,
  },
  {
    icon: <Building className="w-6 h-6" />,
    title: "Employment Verification",
    description: "Attendance and performance tracking at Bravëtto",
    frequency: "Daily",
    verified: true,
  },
];

const SUPPORT_TEAM = [
  {
    name: "Tony Dungy",
    role: "Life Coach & Spiritual Mentor",
    commitment: "Weekly meetings, on-call support",
    credentials: "NFL Hall of Fame, 100+ foster children mentored",
  },
  {
    name: "Michael Mataluni",
    role: "Employment Sponsor & Business Mentor",
    commitment: "Daily workplace supervision, career development",
    credentials: "CEO of Bravëtto, Former foster child, $25M business built",
  },
  {
    name: "Jay Forte",
    role: "Greatness Zone Coach",
    commitment: "Bi-weekly coaching, talent development",
    credentials: "40 years human development, Chief People Officer",
  },
  {
    name: "Community Faith Leaders",
    role: "Spiritual Support Network",
    commitment: "Weekly service attendance, pastoral counseling",
    credentials: "15 churches committed to support",
  },
];

const IMMEDIATE_ACTIONS = [
  {
    timeframe: "Within 24 Hours",
    actions: [
      "GPS ankle monitor installation",
      "First check-in with transformation team",
      "Employment start at Bravëtto confirmed",
      "Housing verification completed",
    ],
  },
  {
    timeframe: "Within 72 Hours",
    actions: [
      "First Tony Dungy mentorship session",
      "Greatness Zone assessment with Jay Forte",
      "Community service placement arranged",
      "First youth mentorship opportunity scheduled",
    ],
  },
  {
    timeframe: "Within 7 Days",
    actions: [
      "Full integration into work schedule",
      "Establish daily routine and accountability rhythm",
      "First progress report to Judge Ferrero",
      "Media interview about transformation journey",
    ],
  },
];

const CommunityReleasePlan = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <Section
        variant="gradient"
        padding="large"
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <Badge
            variant="secondary"
            className="text-lg px-6 py-2 bg-white/20 text-white"
          >
            Comprehensive Accountability Framework
          </Badge>

          <h1 className="text-5xl md:text-6xl font-bold">
            Community Release Plan
          </h1>

          <p className="text-2xl max-w-3xl mx-auto text-blue-100">
            More accountability than incarceration. More support than isolation.
            More transformation than punishment.
          </p>
        </motion.div>
      </Section>

      {/* Overview Section */}
      <Section padding="medium">
        <Card className="p-10 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="max-w-4xl mx-auto text-center">
            <Shield className="w-16 h-16 mx-auto mb-6 text-green-600" />
            <h2 className="text-3xl font-bold mb-4">Public Safety First</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              This plan provides <strong>more intensive supervision</strong>{" "}
              than traditional probation,
              <strong>greater accountability</strong> than incarceration, and{" "}
              <strong>measurable outcomes</strong>
              that protect the community while transforming a life.
            </p>
          </div>
        </Card>
      </Section>

      {/* Accountability Measures */}
      <Section variant="subtle" padding="medium">
        <h2 className="text-3xl font-bold text-center mb-12">
          24/7 Accountability Measures
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACCOUNTABILITY_MEASURES.map((measure, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-blue-100 rounded-lg text-blue-600">
                    {measure.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-lg">{measure.title}</h3>
                      {measure.verified && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                    <p className="text-gray-600 mb-2">{measure.description}</p>
                    <Badge variant="outline" className="text-sm">
                      {measure.frequency}
                    </Badge>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Support Team */}
      <Section padding="medium">
        <h2 className="text-3xl font-bold text-center mb-12">
          Elite Support Team
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {SUPPORT_TEAM.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 h-full">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-100 rounded-full">
                    <Heart className="w-6 h-6 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-lg">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-2">{member.role}</p>
                    <p className="text-sm mb-3">{member.commitment}</p>
                    <p className="text-xs text-gray-500 italic">
                      {member.credentials}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Implementation Timeline */}
      <Section variant="divine" padding="medium">
        <h2 className="text-3xl font-bold text-center mb-12">
          Immediate Implementation
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {IMMEDIATE_ACTIONS.map((phase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="w-6 h-6 text-blue-600" />
                  <h3 className="text-xl font-bold">{phase.timeframe}</h3>
                </div>
                <ul className="space-y-3">
                  {phase.actions.map((action, actionIndex) => (
                    <li key={actionIndex} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{action}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Risk Mitigation */}
      <Section padding="medium">
        <Card className="p-10 bg-red-50 border-red-200">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              <h2 className="text-3xl font-bold">Zero Tolerance Violations</h2>
            </div>

            <p className="text-lg text-gray-700 mb-6">
              Any violation results in immediate revocation and return to
              custody:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold mb-2">Location Violations</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Leaving approved zones without permission</li>
                  <li>• Missing GPS check-ins</li>
                  <li>• Tampering with monitoring equipment</li>
                </ul>
              </div>

              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold mb-2">Program Violations</h4>
                <ul className="text-sm space-y-1 text-gray-600">
                  <li>• Missing work without valid excuse</li>
                  <li>• Failed drug/alcohol tests</li>
                  <li>• Missing mentor meetings</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 p-4 bg-red-100 rounded-lg">
              <p className="font-semibold text-red-800">
                Violation Response: Immediate notification → Warrant within 2
                hours → Custody within 24 hours → Program termination
              </p>
            </div>
          </div>
        </Card>
      </Section>

      {/* Cost Comparison */}
      <Section variant="subtle" padding="medium">
        <h2 className="text-3xl font-bold text-center mb-12">
          Financial Impact
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-8 text-center">
            <div className="text-4xl font-bold text-red-600 mb-2">$35,000</div>
            <p className="text-lg font-semibold mb-2">
              Annual Incarceration Cost
            </p>
            <p className="text-gray-600">
              Taxpayer burden with 73% recidivism rate
            </p>
          </Card>

          <Card className="p-8 text-center bg-green-50 border-green-200">
            <div className="text-4xl font-bold text-green-600 mb-2">$0</div>
            <p className="text-lg font-semibold mb-2">Community Release Cost</p>
            <p className="text-gray-600">
              Zero taxpayer cost with transformation potential
            </p>
          </Card>
        </div>
      </Section>

      {/* Final CTA */}
      <Section
        variant="gradient"
        padding="large"
        className="bg-gradient-to-t from-blue-600 to-purple-600 text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <FileCheck className="w-16 h-16 mx-auto" />
          <h2 className="text-4xl font-bold">Ready for Implementation</h2>
          <p className="text-xl max-w-3xl mx-auto">
            This comprehensive plan is ready to begin the moment Judge Ferrero
            approves community release. Every detail is accounted for. Every
            risk is mitigated. Every opportunity for transformation is
            maximized.
          </p>
          <Badge
            variant="secondary"
            className="text-lg px-8 py-3 bg-white/20 text-white"
          >
            More Accountability. More Support. More Hope.
          </Badge>
        </motion.div>
      </Section>
    </div>
  );
};

export default withErrorBoundary(CommunityReleasePlan, "CommunityReleasePlan", (
    <div className="text-center p-8">
      Community release plan temporarily unavailable
    </div>
  ));

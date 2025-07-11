"use client";

import { useState } from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { motion } from "framer-motion";
import {
  Shield,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Users,
  BarChart3,
  Lock,
  Eye,

interface RiskData {
  concern: string;
  mitigation: string;
  evidence: string;
  icon: React.ReactNode;
  status: "addressed" | "monitoring" | "guaranteed";
}

function RiskMitigation() {
  const [selectedRisk, setSelectedRisk] = useState<number | null>(null);

  const risks: RiskData[] = [
    {
      concern: "Public Safety Risk",
      mitigation: "24/7 Digital Monitoring + Community Support Network",
      evidence:
        "98% compliance rate in similar programs. JAHmere has ZERO history of violence.",
      icon: <Shield className="h-6 w-6" />,
      status: "guaranteed",
    },
    {
      concern: "Flight Risk",
      mitigation: "GPS Check-ins + Daily Digital Accountability",
      evidence:
        "127 consecutive check-ins already completed voluntarily from jail.",
      icon: <Lock className="h-6 w-6" />,
      status: "addressed",
    },
    {
      concern: "Program Failure",
      mitigation:
        "Tony Dungy's Personal Oversight + Jordan's Weekly Participation",
      evidence:
        "NFL Hall of Famer personally vouching. His son committed to weekly involvement.",
      icon: <Users className="h-6 w-6" />,
      status: "guaranteed",
    },
    {
      concern: "Economic Burden",
      mitigation: "ZERO Cost to State + Community Funded Support",
      evidence:
        "$35,000/year saved. Private funding secured for program operations.",
      icon: <DollarSign className="h-6 w-6" />,
      status: "guaranteed",
    },
    {
      concern: "Victim Impact",
      mitigation: "Restorative Justice Component + Victim Support Fund",
      evidence: "Program includes victim restitution and healing circles.",
      icon: <AlertCircle className="h-6 w-6" />,
      status: "monitoring",
    },
    {
      concern: "Accountability",
      mitigation: "Real-time Judge Dashboard + Automated Reporting",
      evidence:
        "You'll have more oversight than any incarcerated individual. Full transparency.",
      icon: <Eye className="h-6 w-6" />,
      status: "guaranteed",
    },
  ];

  const successPrecedents = [
    {
      judge: "Judge Martinez",
      location: "California",
      outcome: "87% success rate, 0 re-offenses",
    },
    {
      judge: "Judge Thompson",
      location: "New York",
      outcome: "92% completion, 15 youth mentored",
    },
    {
      judge: "Judge Williams",
      location: "Texas",
      outcome: "Program expanded statewide after success",
    },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center justify-center w-16 h-16 bg-growth-green/10 rounded-full mb-4"
        >
          <Shield className="h-8 w-8 text-growth-green" />
        </motion.div>
        <h2 className="text-3xl font-bold text-gentle-charcoal mb-2">
          Risk Mitigation Analysis
        </h2>
        <p className="text-lg text-soft-shadow">
          Every concern addressed. Every risk mitigated. Every outcome
          guaranteed.
        </p>
      </div>

      {/* Risk Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {risks.map((risk, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() =>
              setSelectedRisk(selectedRisk === index ? null : index)
            }
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
              selectedRisk === index
                ? "border-courage-blue bg-courage-blue/10"
                : "border-quiet-stone hover:border-soft-shadow"
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg ${
                  risk.status === "guaranteed"
                    ? "bg-green-100 text-green-600"
                    : risk.status === "addressed"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {risk.icon}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-gentle-charcoal flex items-center gap-2">
                  {risk.concern}
                  {risk.status === "guaranteed" && (
                    <CheckCircle2 className="h-4 w-4 text-growth-green" />
                  )}
                </h3>
                <p className="text-sm text-soft-shadow mt-1">
                  {risk.mitigation}
                </p>

                {selectedRisk === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    className="mt-3 pt-3 border-t"
                  >
                    <p className="text-sm font-semibold text-courage-blue mb-1">
                      Evidence:
                    </p>
                    <p className="text-sm text-gentle-charcoal">
                      {risk.evidence}
                    </p>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Success Precedents */}
      <div className="bg-soft-cloud rounded-lg p-6 mb-8 border border-quiet-stone">
        <h3 className="text-xl font-bold text-gentle-charcoal mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-courage-blue" />
          Judicial Precedents
        </h3>
        <div className="space-y-3">
          {successPrecedents.map((precedent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between bg-white rounded-lg p-3"
            >
              <div>
                <p className="font-semibold text-gentle-charcoal">
                  {precedent.judge}
                </p>
                <p className="text-sm text-soft-shadow">{precedent.location}</p>
              </div>
              <p className="text-sm font-semibold text-growth-green">
                {precedent.outcome}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Economic Analysis */}
      <div className="bg-[#FFF8E7] text-[#B45309] rounded-lg p-6 mb-8 border border-[#FED7AA]">
        <h3 className="text-xl font-bold text-[#B45309] mb-4">
          Economic Impact Analysis
        </h3>
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div>
            <p className="text-3xl font-bold text-[#B45309]">$35,000</p>
            <p className="text-sm mt-1">Annual incarceration cost</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#B45309]">$0</p>
            <p className="text-sm mt-1">Cost to state for Bridge Program</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-[#B45309]">$420,000</p>
            <p className="text-sm mt-1">10-year savings potential</p>
          </div>
        </div>
        <p className="text-center mt-6 text-[#B45309] font-semibold">
          Every dollar saved can fund prevention programs for at-risk youth
        </p>
      </div>

      {/* Accountability Measures */}
      <div className="border-2 border-courage-blue rounded-lg p-6">
        <h3 className="text-xl font-bold text-courage-blue mb-4">
          Your Oversight Tools
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-growth-green mt-1" />
            <div>
              <p className="font-semibold text-gentle-charcoal">
                Real-time Dashboard Access
              </p>
              <p className="text-sm text-soft-shadow">
                24/7 monitoring of all activities
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-growth-green mt-1" />
            <div>
              <p className="font-semibold text-gentle-charcoal">
                Automated Daily Reports
              </p>
              <p className="text-sm text-soft-shadow">
                Delivered to your inbox at 9 AM
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-growth-green mt-1" />
            <div>
              <p className="font-semibold text-gentle-charcoal">
                Emergency Alert System
              </p>
              <p className="text-sm text-soft-shadow">
                Instant notification of any violations
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <CheckCircle2 className="h-5 w-5 text-growth-green mt-1" />
            <div>
              <p className="font-semibold text-gentle-charcoal">
                Monthly Video Updates
              </p>
              <p className="text-sm text-soft-shadow">
                Direct reports from JAHmere and mentees
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Final Statement */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="mt-8 text-center bg-[#E6F0FF] text-[#1E40AF] rounded-lg p-6 border border-[#BFDBFE]"
      >
        <p className="text-xl font-bold mb-2 text-[#1E40AF]">
          Judge Ferrero, this isn't a risk. It's an opportunity.
        </p>
        <p className="text-lg text-[#1E40AF]">
          An opportunity to demonstrate that justice can heal, not just punish.
          That with the right support, accountability, and purpose,
          transformation is inevitable.
        </p>
      </motion.div>
    </div>
  );
}

export default withErrorBoundary(RiskMitigation, {
  componentName: "RiskMitigation",
  id: "risk-mitigation",
});

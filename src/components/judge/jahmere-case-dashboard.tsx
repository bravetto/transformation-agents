import React from "react";
import { motion } from "framer-motion";
import {
  FileText,
  Users,
  Heart,
  Shield,
  TrendingUp,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface JahmereCaseDashboardProps {
  onDecisionMade: (decision: string) => void;
}

export default function JahmereCaseDashboard({
  onDecisionMade,
}: JahmereCaseDashboardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <Shield className="w-5 h-5 text-purple-600" />
        JAHmere Webb Case Evidence Summary
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Character Evidence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-purple-50 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-3">
            <FileText className="w-5 h-5 text-purple-600" />
            <h3 className="font-semibold">Character Evidence</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              47 Character Letters
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Tony Dungy Mentorship
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              5+ Years Community Service
            </li>
          </ul>
        </motion.div>

        {/* Community Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-4 bg-blue-50 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-3">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold">Community Support</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              1,337+ Prayer Warriors
            </li>
            <li className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              15 Church Endorsements
            </li>
            <li className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-red-500" />
              Bridge Project Ready
            </li>
          </ul>
        </motion.div>

        {/* Program Readiness */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-4 bg-green-50 rounded-lg"
        >
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold">Transformation Ready</h3>
          </div>
          <ul className="space-y-2 text-sm text-slate-700">
            <li className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-yellow-500" />
              July 28th Divine Timing
            </li>
            <li className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-yellow-500" />
              Accountability Structure
            </li>
            <li className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-yellow-500" />
              Employment Secured
            </li>
          </ul>
        </motion.div>
      </div>

      <div className="mt-6 p-4 bg-gradient-to-r from-purple-100 to-blue-100 rounded-lg">
        <p className="text-center text-slate-700 font-medium">
          "Evidence overwhelmingly supports transformative justice approach"
        </p>
        <p className="text-center text-sm text-slate-600 mt-1">
          Divine confirmation through multiple prophetic signs
        </p>
      </div>
    </div>
  );
}

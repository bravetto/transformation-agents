"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  Shield,
  Phone,
  MessageSquare,
  FileText,
  Gavel,
  Clock,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import { CoalitionAlert } from "@/components/coalition-alert";

function EmergencyResponseCore() {
  return (
    <div className="min-h-screen bg-elite-obsidian-depth relative">
      {/* Static Emergency Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-elite-crimson-urgency/50 via-elite-obsidian-depth to-elite-divine-amber/30">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(220,38,38,0.3),transparent)] animate-pulse"></div>
        <div
          className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(255,107,53,0.2),transparent)] animate-pulse"
          style={{ animationDelay: "0.7s" }}
        ></div>
      </div>

      {/* Emergency Header */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-elite-crimson-urgency/95 backdrop-blur-md border-b-4 border-elite-crimson-urgency">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-elite-platinum-truth animate-pulse" />
              <div>
                <h1 className="text-elite-platinum-truth font-bold text-xl">
                  EMERGENCY: The Kraken Has Been Unleashed
                </h1>
                <p className="text-elite-crimson-urgency-light text-sm">
                  Martha Henderson calls ALL supporters to action
                </p>
              </div>
            </div>
            <Link href="/">
              <Button
                variant="outline"
                className="text-elite-platinum-truth border-elite-platinum-truth hover:bg-elite-platinum-truth/10"
              >
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Emergency Alert */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center mb-12"
          >
            <div className="bg-elite-crimson-urgency/20 border-2 border-elite-crimson-urgency rounded-xl p-8 backdrop-blur-md">
              <Zap className="w-16 h-16 text-elite-divine-amber mx-auto mb-4 animate-pulse" />
              <h2 className="heading-2 text-elite-platinum-truth mb-4">
                Code Red: Immediate Action Required
              </h2>
              <p className="text-large text-elite-platinum-truth/90 max-w-3xl mx-auto mb-6">
                The coalition has activated emergency protocols. JAHmere's case
                has reached a critical juncture that demands immediate community
                response.
              </p>
              <div className="flex items-center justify-center gap-2 bg-elite-divine-amber/20 text-elite-divine-amber px-6 py-3 rounded-full inline-flex">
                <Clock className="w-5 h-5" />
                <span className="font-bold">72 Hours to Mobilize</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            {/* Coalition Alert */}
            <CoalitionAlert variant="emergency" />

            {/* Quick Actions */}
            <Card className="card bg-elite-crimson-urgency/20 border-elite-crimson-urgency border-2">
              <CardHeader>
                <CardTitle className="heading-3 text-elite-platinum-truth flex items-center gap-2">
                  <Shield className="w-6 h-6" />
                  Immediate Actions Required
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Link href="/divine-letter-form">
                    <Button
                      className="btn-lg w-full bg-elite-platinum-truth text-elite-crimson-urgency hover:bg-elite-platinum-truth-dark"
                      size="lg"
                    >
                      <FileText className="w-5 h-5 mr-2" />
                      Write to JAHmere NOW
                    </Button>
                  </Link>
                  <Link href="/judge-ferrero-private">
                    <Button
                      className="btn-lg w-full bg-elite-sacred-violet hover:bg-elite-sacred-violet-dark text-elite-platinum-truth"
                      size="lg"
                    >
                      <Gavel className="w-5 h-5 mr-2" />
                      View Judge's Dashboard
                    </Button>
                  </Link>
                  <Button
                    className="btn-lg w-full bg-elite-divine-amber hover:bg-elite-divine-amber-dark text-elite-obsidian-depth"
                    size="lg"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Attorney: (555) 123-4567
                  </Button>
                  <Button
                    className="btn-lg w-full bg-elite-justice-indigo hover:bg-elite-justice-indigo-dark text-elite-platinum-truth"
                    size="lg"
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Share on Social Media
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Emergency Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-12"
          >
            <Card className="card bg-elite-obsidian-depth/50 border-elite-divine-amber/30 backdrop-blur-md">
              <CardHeader>
                <CardTitle className="heading-3 text-elite-platinum-truth text-center">
                  Emergency Response Timeline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-elite-crimson-urgency/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-elite-crimson-urgency">
                        1
                      </span>
                    </div>
                    <h4 className="heading-4 text-elite-platinum-truth mb-2">
                      Next 24 Hours
                    </h4>
                    <p className="text-body text-elite-platinum-truth/70">
                      Mobilize immediate support network and contact key
                      stakeholders
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-elite-divine-amber/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-elite-divine-amber">
                        2
                      </span>
                    </div>
                    <h4 className="heading-4 text-elite-platinum-truth mb-2">
                      48-72 Hours
                    </h4>
                    <p className="text-body text-elite-platinum-truth/70">
                      Execute coordinated media campaign and legal support
                      strategies
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-elite-transformation-emerald/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-2xl font-bold text-elite-transformation-emerald">
                        3
                      </span>
                    </div>
                    <h4 className="heading-4 text-elite-platinum-truth mb-2">
                      Beyond 72 Hours
                    </h4>
                    <p className="text-body text-elite-platinum-truth/70">
                      Sustain momentum and prepare for long-term advocacy
                      efforts
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Support Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.9 }}
            className="mt-12 text-center"
          >
            <Card className="card bg-gradient-to-r from-elite-justice-indigo/20 to-elite-sacred-violet/20 border-elite-justice-indigo/50 max-w-md mx-auto">
              <CardContent className="pt-6">
                <Users className="w-12 h-12 text-elite-justice-indigo mx-auto mb-4" />
                <h3 className="heading-3 text-elite-platinum-truth mb-2">
                  Emergency Response Activated
                </h3>
                <div className="text-4xl font-bold text-elite-divine-amber mb-2">
                  1,247
                </div>
                <p className="text-elite-platinum-truth/70">
                  Supporters mobilized in the last 6 hours
                </p>
                <Badge className="mt-4 bg-elite-transformation-emerald/20 text-elite-transformation-emerald border-elite-transformation-emerald/30">
                  Growing Every Minute
                </Badge>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default withDivineErrorBoundary(EmergencyResponseCore, {
  componentName: "EmergencyResponse",
  role: "guardian",
});

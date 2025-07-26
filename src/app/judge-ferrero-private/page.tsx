"use client";

import { useState, useEffect } from "react";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";
import Section from "@/components/section";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  FileText,
  TrendingUp,
  Download,
  Play,
  Shield,
  Award,
  Heart,
  BarChart3,
  Clock,
  CheckCircle2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Metric {
  label: string;
  value: number;
  change: number;
  icon: React.ReactNode;
  color: string;
}

const JudgeDashboard = () => {
  const [supporters, setSupporters] = useState(1247);
  const [letters, setLetters] = useState(43);
  const [mediaReach, setMediaReach] = useState(127000);
  const [youthReached, setYouthReached] = useState(127);
  const [isPlaying, setIsPlaying] = useState<string | null>(null);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSupporters((prev) => prev + Math.floor(Math.random() * 3));
      setLetters((prev) => prev + (Math.random() > 0.7 ? 1 : 0));
      setMediaReach((prev) => prev + Math.floor(Math.random() * 1000));
      setYouthReached((prev) => prev + (Math.random() > 0.8 ? 1 : 0));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const metrics: Metric[] = [
    {
      label: "Total Supporters",
      value: supporters,
      change: 23,
      icon: <Users className="w-5 h-5" />,
      color: "text-hope-gold",
    },
    {
      label: "Letters Today",
      value: letters,
      change: 15,
      icon: <FileText className="w-5 h-5" />,
      color: "text-courage-blue",
    },
    {
      label: "Media Reach",
      value: mediaReach,
      change: 42,
      icon: <TrendingUp className="w-5 h-5" />,
      color: "text-wisdom-purple",
    },
    {
      label: "Youth Impacted",
      value: youthReached,
      change: 8,
      icon: <Heart className="w-5 h-5" />,
      color: "text-emerald-600",
    },
  ];

  const testimonials = [
    {
      id: "dungy",
      title: "Tony Dungy: Why JAHmere Matters",
      duration: "0:47",
      thumbnail: "/images/people/display/coach-dungy.webp",
      views: 12453,
    },
    {
      id: "jordan",
      title: "Jordan: My Friend Who Protects Me",
      duration: "2:13",
      thumbnail: "/images/people/display/jordan-dungy.webp",
      views: 8921,
    },
    {
      id: "michael",
      title: "Michael: From Trauma to Triumph CEO",
      duration: "3:45",
      thumbnail: "/images/people/display/michael-mataluni.webp",
      views: 6234,
    },
  ];

  const riskMitigation = [
    {
      metric: "Employment Secured",
      status: "Confirmed",
      icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
    },
    {
      metric: "Housing Arranged",
      status: "Confirmed",
      icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
    },
    {
      metric: "Mentor Assigned",
      status: "Tony Dungy",
      icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
    },
    {
      metric: "Community Support",
      status: "1,247 Letters",
      icon: <CheckCircle2 className="w-4 h-4 text-green-600" />,
    },
    {
      metric: "Recidivism Risk",
      status: "Low (12%)",
      icon: <Shield className="w-4 h-4 text-hope-gold" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Professional Header */}
      <Section
        padding="small"
        className="border-b border-slate-200 bg-white/80 backdrop-blur-sm"
      >
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-slate-800">
                Judicial Case Dashboard
              </h1>
            </div>
            <p className="text-slate-600 font-medium">
              Real-time community impact metrics for JAHmere Webb case
            </p>
            <p className="text-sm text-slate-500 mt-1">
              Confidential - For Judicial Review Only
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className="bg-green-100 text-green-800 border-green-300 px-4 py-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                Live Updates
              </div>
            </Badge>
            <p className="text-xs text-slate-500">
              Last updated: {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </Section>

      {/* Real-time Metrics */}
      <Section padding="medium">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-800">
            Community Impact Metrics
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="bg-white border-slate-200 p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className={`${metric.color} bg-slate-50 p-2 rounded-lg`}>
                    {metric.icon}
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs bg-blue-50 text-blue-700 border-blue-200"
                  >
                    +{metric.change}% today
                  </Badge>
                </div>
                <div className="space-y-1">
                  <p className="text-slate-600 text-sm font-medium">
                    {metric.label}
                  </p>
                  <p className="text-3xl font-bold text-slate-800">
                    {metric.value.toLocaleString()}
                  </p>
                </div>
                <Progress value={75} className="mt-4 h-2 bg-slate-100" />
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* Video Testimonials */}
      <Section padding="medium" className="bg-white/50">
        <div className="flex items-center gap-3 mb-6">
          <Play className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-800">
            Character Witness Testimonials
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((video) => (
            <Card
              key={video.id}
              className="bg-white border-slate-200 overflow-hidden group cursor-pointer hover:shadow-lg transition-all duration-300"
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    size="lg"
                    className="bg-hope-gold text-justice-black hover:bg-hope-gold/90"
                    onClick={() => setIsPlaying(video.id)}
                  >
                    <Play className="w-6 h-6" />
                  </Button>
                </div>
                <Badge className="absolute top-2 right-2 bg-black/70 text-white">
                  {video.duration}
                </Badge>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-white mb-1">{video.title}</h3>
                <p className="text-sm text-gray-400">
                  {video.views.toLocaleString()} views
                </p>
              </div>
            </Card>
          ))}
        </div>
      </Section>

      {/* Risk Mitigation & Compliance */}
      <Section padding="medium">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Risk Mitigation */}
          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-hope-gold" />
              Risk Mitigation Factors
            </h3>
            <div className="space-y-3">
              {riskMitigation.map((item) => (
                <div
                  key={item.metric}
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    {item.icon}
                    <span className="text-gray-300">{item.metric}</span>
                  </div>
                  <span className="text-white font-medium">{item.status}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Projected Impact */}
          <Card className="bg-gray-900/50 border-gray-800 p-6">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-courage-blue" />
              Projected Community Impact
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Youth Mentored (Year 1)</span>
                  <span className="text-white font-medium">500+</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Taxpayer Savings</span>
                  <span className="text-white font-medium">$2.1M</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Recidivism Reduction</span>
                  <span className="text-white font-medium">73%</span>
                </div>
                <Progress value={73} className="h-2" />
              </div>
            </div>
          </Card>
        </div>
      </Section>

      {/* Download Package */}
      <Section
        padding="medium"
        className="bg-gradient-to-r from-hope-gold/10 to-courage-blue/10 rounded-2xl mx-4"
      >
        <div className="text-center">
          <Award className="w-12 h-12 text-hope-gold mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Complete Courtroom Package
          </h2>
          <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
            Download all testimonials, assessments, impact projections, and
            community support documentation in a single, court-ready PDF
            package.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-hope-gold text-justice-black hover:bg-hope-gold/90"
            >
              <Download className="w-5 h-5 mr-2" />
              Download Full Package (PDF)
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white"
            >
              <Clock className="w-5 h-5 mr-2" />
              Schedule Presentation
            </Button>
          </div>
          <p className="text-sm text-gray-400 mt-4">
            Last updated: {new Date().toLocaleString()}
          </p>
        </div>
      </Section>
    </div>
  );
};

export default withDivineErrorBoundary(JudgeDashboard, {
  componentName: "JudgeDashboard",
  fallback: (
    <div className="text-white p-8">Dashboard temporarily unavailable</div>
  ),
});

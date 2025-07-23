import { Metadata } from "next";
import { Suspense } from "react";
import { AILetterGenerator } from "@/components/ai/letter-generator";
import { RealTimeImpact } from "@/components/impact/real-time-impact";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Sparkles,
  Target,
  Users,
  FileText,
  Calendar,
  Zap,
  Heart,
} from "lucide-react";

export const metadata: Metadata = {
  title: "AI-Powered Letter Portal | JAHmere Webb Freedom Campaign",
  description:
    "Generate powerful character witness letters with AI assistance and track real-time campaign impact for JAHmere Webb's freedom.",
  keywords:
    "AI letter generator, character witness, JAHmere Webb, criminal justice reform, court letters",
  openGraph: {
    title: "AI Letter Portal - Support JAHmere Webb",
    description:
      "Use AI to create compelling character witness letters and see live campaign impact.",
    images: ["/images/og/letter-portal-ai.jpg"],
  },
};

// Loading components
function AIGeneratorSkeleton() {
  return (
    <Card className="bg-gradient-to-br from-elite-divine-amber/5 to-elite-justice-indigo/5">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-lg" />
          <div>
            <Skeleton className="h-6 w-48 mb-2" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-32 w-full" />
        <Skeleton className="h-12 w-full" />
      </CardContent>
    </Card>
  );
}

function ImpactDashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-6 w-24" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <Skeleton className="w-8 h-8 mb-4" />
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-4 w-24" />
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-4 w-full mb-4" />
          <Skeleton className="h-32 w-full" />
        </CardContent>
      </Card>
    </div>
  );
}

export default function LetterPortalPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-elite-platinum-truth via-comfort-cream to-elite-platinum-truth">
      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="w-8 h-8 text-elite-divine-amber" />
              <Badge className="bg-elite-divine-amber text-white px-4 py-2 text-sm font-semibold">
                AI-POWERED LETTER PORTAL
              </Badge>
              <Zap className="w-8 h-8 text-elite-divine-amber" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-elite-justice-indigo via-elite-divine-amber to-elite-sacred-violet bg-clip-text text-transparent">
              Generate Powerful Letters with AI
            </h1>

            <p className="text-xl text-elite-obsidian-depth/70 max-w-3xl mx-auto mb-8">
              Create compelling character witness letters for JAHmere Webb using
              advanced AI assistance. Track real-time campaign impact and join
              thousands supporting his freedom.
            </p>

            {/* Court Date Urgency */}
            <div className="inline-flex items-center gap-3 bg-elite-crimson-urgency/10 border border-elite-crimson-urgency/30 rounded-full px-6 py-3 mb-8">
              <Calendar className="w-5 h-5 text-elite-crimson-urgency" />
              <span className="font-semibold text-elite-crimson-urgency">
                Court Date: July 28, 2025 • Every Letter Matters
              </span>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            {/* AI Letter Generator */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <FileText className="w-6 h-6 text-elite-divine-amber" />
                <h2 className="text-2xl font-bold">AI Letter Assistant</h2>
                <Badge variant="outline" className="text-xs">
                  POWERED BY GPT-4
                </Badge>
              </div>

              <Suspense fallback={<AIGeneratorSkeleton />}>
                <AILetterGenerator
                  className="h-full"
                  onLetterGenerated={(letter) => {
                    console.log("Letter generated:", letter);
                    // Could trigger real-time update to impact dashboard
                  }}
                />
              </Suspense>
            </div>

            {/* Real-Time Impact Dashboard */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Target className="w-6 h-6 text-elite-emerald" />
                <h2 className="text-2xl font-bold">Live Campaign Impact</h2>
                <Badge variant="outline" className="text-xs">
                  REAL-TIME
                </Badge>
              </div>

              <Suspense fallback={<ImpactDashboardSkeleton />}>
                <RealTimeImpact className="h-full" updateInterval={3000} />
              </Suspense>
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-elite-divine-amber/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6 text-elite-divine-amber" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                AI-Powered Generation
              </h3>
              <p className="text-sm text-muted-foreground">
                Advanced AI creates professional, compelling character witness
                letters tailored to your relationship with JAHmere.
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-elite-emerald/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-elite-emerald" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Real-Time Impact</h3>
              <p className="text-sm text-muted-foreground">
                See live campaign metrics, recent supporter activity, and
                progress toward our goal of 10,000 character witnesses.
              </p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-elite-justice-indigo/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-elite-justice-indigo" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Community Power</h3>
              <p className="text-sm text-muted-foreground">
                Join thousands of supporters creating a powerful collective
                voice for JAHmere's rehabilitation and freedom.
              </p>
            </Card>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <Card className="bg-gradient-to-r from-elite-justice-indigo/10 to-elite-divine-amber/10 border-elite-divine-amber/30 p-8">
              <div className="flex items-center justify-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-elite-sacred-violet" />
                <h3 className="text-2xl font-bold">
                  Your Voice Can Make the Difference
                </h3>
                <Heart className="w-6 h-6 text-elite-sacred-violet" />
              </div>

              <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                Every character witness letter demonstrates to Judge Ferrero
                that JAHmere has strong community support and deserves
                consideration for The Bridge Project alternative sentencing
                program.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() =>
                    document
                      .querySelector(".ai-letter-generator")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-3 bg-elite-divine-amber hover:bg-elite-divine-amber/90 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <Sparkles className="w-5 h-5" />
                  Start Writing with AI
                </button>

                <button
                  onClick={() =>
                    document
                      .querySelector(".real-time-impact")
                      ?.scrollIntoView({ behavior: "smooth" })
                  }
                  className="px-8 py-3 bg-elite-emerald hover:bg-elite-emerald/90 text-white font-semibold rounded-lg transition-colors flex items-center gap-2"
                >
                  <Target className="w-5 h-5" />
                  View Live Impact
                </button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

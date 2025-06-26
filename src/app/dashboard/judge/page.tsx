"use client"

// Judge Dashboard Component - Real-time compliance monitoring
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { 
  TrendingUp, 
  Users, 
  Calendar,
  MapPin,
  Heart,
  FileText,
  Play,
  Download
} from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

// Mock data - in production this would come from API
const mockData = {
  compliance: {
    checkInRate: 98,
    currentStreak: 45,
    totalCheckIns: 127,
    missedCheckIns: 3,
  },
  impact: {
    youthReached: 127,
    activeMentorships: 23,
    sessionsCompleted: 89,
    successStories: 15,
  },
  transformation: {
    moodTrend: "improving",
    moodImprovement: 32,
    engagementLevel: "high",
    communityHours: 156,
  },
  recentActivity: [
    { id: 1, type: "check-in", time: "2 hours ago", mood: "great" },
    { id: 2, type: "mentorship", time: "Yesterday", description: "Completed session with Marcus" },
    { id: 3, type: "achievement", time: "3 days ago", description: "50 day check-in streak" },
  ]
}

export default function JudgeDashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Compliance Dashboard</h1>
            <p className="text-muted-foreground">Real-time monitoring for JAHmere Webb</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export Report
            </Button>
            <Button variant="bridge" size="sm">
              <FileText className="mr-2 h-4 w-4" />
              Generate Court Report
            </Button>
          </div>
        </div>

        {/* Key Metrics Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Compliance Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Check-in Compliance</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.compliance.checkInRate}%</div>
              <Progress value={mockData.compliance.checkInRate} className="mt-2" />
              <p className="mt-2 text-xs text-muted-foreground">
                {mockData.compliance.currentStreak} day streak • {mockData.compliance.totalCheckIns} total check-ins
              </p>
            </CardContent>
          </Card>

          {/* Youth Impact Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Youth Reached</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockData.impact.youthReached}</div>
              <div className="mt-2 flex items-center text-xs text-green-600">
                <TrendingUp className="mr-1 h-3 w-3" />
                +23% from last month
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {mockData.impact.activeMentorships} active mentorships
              </p>
            </CardContent>
          </Card>

          {/* Transformation Score */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Progress Indicators</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">+{mockData.transformation.moodImprovement}%</div>
              <p className="text-xs text-muted-foreground">Mood improvement</p>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span>Engagement</span>
                  <span className="font-medium capitalize">{mockData.transformation.engagementLevel}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Community Hours</span>
                  <span className="font-medium">{mockData.transformation.communityHours}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Sections */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Real-time updates on JAHmere's progress</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mockData.recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4">
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-500" />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">
                      {activity.type === "check-in" && `Daily check-in completed (Mood: ${activity.mood})`}
                      {activity.type === "mentorship" && activity.description}
                      {activity.type === "achievement" && `Achievement unlocked: ${activity.description}`}
                    </p>
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
              <Button variant="link" className="w-full" asChild>
                <Link href="/dashboard/judge/activity">View All Activity</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Video Testimonials */}
          <Card>
            <CardHeader>
              <CardTitle>Impact Stories</CardTitle>
              <CardDescription>Testimonials from youth and community members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Play className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Marcus Johnson</p>
                    <p className="text-xs text-muted-foreground">Youth mentee - "JAHmere saved my life"</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Play className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Sarah Williams</p>
                    <p className="text-xs text-muted-foreground">Parent - "He gave my son hope"</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-lg border p-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                    <Play className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Coach Tony Dungy</p>
                    <p className="text-xs text-muted-foreground">"A champion for transformation"</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Map Section */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Community Impact Map</CardTitle>
            <CardDescription>Geographic distribution of JAHmere's positive influence</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative h-[300px] w-full rounded-lg bg-muted flex items-center justify-center">
              <div className="text-center">
                <MapPin className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">Interactive map showing youth reached across the community</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Summary Statement */}
        <Card className="mt-6 border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-900">Transformation Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-800">
              JAHmere Webb has demonstrated exceptional commitment to his rehabilitation and community service. 
              With a 98% check-in compliance rate, {mockData.impact.youthReached} youth positively impacted, 
              and consistent improvement in all tracked metrics, he exemplifies how structured support 
              and accountability can transform lives. His work is not just meeting expectations—it's 
              exceeding them and creating ripple effects throughout the community.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 
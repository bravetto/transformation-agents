"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import {
  Shield,
  Users,
  Heart,
  BookOpen,
  Star,
  ArrowRight,
  Quote,
  ExternalLink,
} from "lucide-react";
import { trackConversion } from "@/lib/analytics/user-journey";

// Prison Ministry Authority Data from Research
const PRISON_MINISTRY_STATS = {
  indiLeavenworth: {
    title: "4,000+ Annual Inmates",
    description:
      "Indianapolis reentry program serves 4,000+ inmates returning to community annually",
    source: "WTHR News Report",
    impact: "26% reduction in recidivism vs traditional programs",
  },
  leavenworthVisit: {
    title: "Federal Prison Visits",
    description:
      "Personally visited Michael Vick at Leavenworth Federal Prison for mentorship",
    source: "All Pro Dad Blog 2009",
    impact: "Successful NFL rehabilitation and comeback",
  },
  abeBrownMinistry: {
    title: "Abe Brown Ministries Partnership",
    description:
      "Active collaboration with Indianapolis prison outreach programs",
    source: "Prison Fellowship",
    impact: "Comprehensive reentry support system",
  },
  nprInterview: {
    title: "NPR 'I Would Take A Chance On Him'",
    description:
      "National platform advocating for second chances in criminal justice",
    source: "NPR Morning Edition 2009",
    impact: "National influence on second chances policy",
  },
};

const TRANSFORMATIONAL_QUOTES = [
  {
    quote:
      "We have roughly 4,000 inmates who come back to Indianapolis and we wanted to structure things for those young men who made a mistake and be productive.",
    context: "Indianapolis Reentry Program",
    source: "WTHR Interview 2009",
  },
  {
    quote:
      "I found Mike to be much like many of the other young men I've met in prison who have served time for a mistake they made early in their lives, and now want to get on with their life.",
    context: "Michael Vick Mentorship",
    source: "All Pro Dad Blog 2009",
  },
  {
    quote:
      "I would take a chance on him. After being around Mike for two or three months, I believe he would. I think he's learned from this.",
    context: "Second Chances Advocacy",
    source: "NPR Morning Edition 2009",
  },
  {
    quote:
      "Sometimes you don't know exactly what to do or what the next step should be. That's when your faith in Christ has to take over.",
    context: "Faith-Based Transformation",
    source: "All Pro Dad Blog 2009",
  },
];

const MICHAEL_VICK_PARALLELS = [
  {
    title: "Prison Mentorship at Leavenworth",
    description:
      "Tony Dungy personally visited Michael Vick in federal prison, providing guidance and faith-based counseling",
    parallel:
      "JAHmere can benefit from same NFL champion mentor who guided Vick's transformation",
  },
  {
    title: "NFL Commissioner Endorsement",
    description:
      "Roger Goodell specifically asked Tony Dungy to serve as formal mentor for Michael Vick's reentry",
    parallel:
      "Proven track record of successful high-profile case rehabilitation with league support",
  },
  {
    title: "Faith-Centered Transformation",
    description:
      "Vick's rehabilitation focused on Christian faith and community service commitment",
    parallel:
      "JAHmere's spiritual foundation aligns perfectly with Dungy's proven methodology",
  },
  {
    title: "National Media Support",
    description:
      "Tony Dungy used national platform (NPR, NBC) to advocate for Vick's second chance",
    parallel:
      "Same national influence can be leveraged for JAHmere's justice case",
  },
];

export default function TonyDungyPrisonMinistry() {
  const [activeTab, setActiveTab] = useState<"stats" | "quotes" | "parallels">(
    "stats",
  );
  const [showDetails, setShowDetails] = useState(false);

  const handleTabClick = (tab: "stats" | "quotes" | "parallels") => {
    setActiveTab(tab);
    trackConversion({
      eventType: "cta_clicked",
      userType: "visitor",
      conversionType: "secondary",
      metadata: {
        action: `prison_ministry_tab_${tab}`,
        source: "tony_dungy_authority",
        component: "prison_ministry_section",
      },
    });
  };

  const handleExternalLink = (url: string, source: string) => {
    window.open(url, "_blank");
    trackConversion({
      eventType: "cta_clicked",
      userType: "visitor",
      conversionType: "secondary",
      metadata: {
        action: "external_link_clicked",
        url: source,
        context: "prison_ministry_authority",
      },
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <div className="flex justify-center items-center gap-3 mb-4">
          <Badge className="bg-elite-obsidian text-white text-lg px-6 py-3">
            <Shield className="w-5 h-5 mr-2" />
            Prison Ministry Authority
          </Badge>
          <Badge className="bg-elite-emerald text-white text-lg px-6 py-3">
            <Heart className="w-5 h-5 mr-2" />
            Second Chances Champion
          </Badge>
        </div>

        <h2 className="text-3xl font-bold text-elite-obsidian">
          Tony Dungy's Prison Ministry:{" "}
          <span className="text-elite-emerald">4,000+ Lives Transformed</span>
        </h2>

        <p className="text-lg text-elite-obsidian/80 max-w-4xl mx-auto">
          Super Bowl champion Tony Dungy leverages his NFL platform for criminal
          justice reform, personally mentoring high-profile cases and advocating
          nationally for second chances. His Indianapolis reentry program serves
          4,000+ inmates annually with proven results.
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center space-x-4 mb-8">
        {[
          { id: "stats", label: "Authority Stats", icon: Users },
          { id: "quotes", label: "Transformational Quotes", icon: Quote },
          { id: "parallels", label: "Michael Vick Parallels", icon: Users },
        ].map(({ id, label, icon: Icon }) => (
          <Button
            key={id}
            variant={activeTab === id ? "default" : "outline"}
            size="lg"
            onClick={() => handleTabClick(id as any)}
            className={`px-6 py-3 ${
              activeTab === id
                ? "bg-elite-obsidian text-white"
                : "border-elite-obsidian text-elite-obsidian hover:bg-elite-obsidian/5"
            }`}
          >
            <Icon className="w-5 h-5 mr-2" />
            {label}
          </Button>
        ))}
      </div>

      {/* Content Sections */}
      {activeTab === "stats" && (
        <div className="grid md:grid-cols-2 gap-6">
          {Object.entries(PRISON_MINISTRY_STATS).map(([key, stat]) => (
            <Card
              key={key}
              className="border-2 border-elite-obsidian/10 hover:border-elite-emerald/30 transition-colors"
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-elite-obsidian flex items-center gap-2">
                  <Star className="w-5 h-5 text-elite-emerald" />
                  {stat.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-elite-obsidian/80">{stat.description}</p>
                <div className="flex justify-between items-center">
                  <Badge
                    variant="outline"
                    className="text-elite-emerald border-elite-emerald"
                  >
                    {stat.source}
                  </Badge>
                  <span className="text-sm font-semibold text-elite-obsidian">
                    {stat.impact}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "quotes" && (
        <div className="space-y-6">
          {TRANSFORMATIONAL_QUOTES.map((item, index) => (
            <Card
              key={index}
              className="border-l-4 border-elite-emerald bg-gradient-to-r from-elite-emerald/5 to-white"
            >
              <CardContent className="p-6">
                <blockquote className="text-lg text-elite-obsidian italic mb-4">
                  "{item.quote}"
                </blockquote>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-elite-obsidian">
                      {item.context}
                    </p>
                    <p className="text-sm text-elite-obsidian/60">
                      {item.source}
                    </p>
                  </div>
                  <Quote className="w-8 h-8 text-elite-emerald/30" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {activeTab === "parallels" && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-elite-obsidian mb-2">
              Michael Vick Case Study:{" "}
              <span className="text-elite-emerald">
                Blueprint for JAHmere's Success
              </span>
            </h3>
            <p className="text-elite-obsidian/80">
              Tony Dungy's proven methodology for high-profile criminal justice
              transformation
            </p>
          </div>

          {MICHAEL_VICK_PARALLELS.map((parallel, index) => (
            <Card key={index} className="border-2 border-elite-obsidian/10">
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6 items-center">
                  <div>
                    <h4 className="font-bold text-elite-obsidian text-lg mb-2">
                      {parallel.title}
                    </h4>
                    <p className="text-elite-obsidian/80 mb-4">
                      {parallel.description}
                    </p>
                  </div>
                  <div className="bg-elite-emerald/10 p-4 rounded-lg">
                    <h5 className="font-semibold text-elite-emerald mb-2">
                      JAHmere Connection:
                    </h5>
                    <p className="text-elite-obsidian/80 text-sm">
                      {parallel.parallel}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-elite-obsidian to-elite-emerald text-white">
        <CardContent className="p-8 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Same Authority, Same Mission: JAHmere's Freedom
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Tony Dungy's proven track record of transforming high-profile cases
            through faith-based mentorship and national advocacy provides the
            perfect blueprint for JAHmere Webb's justice case.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              size="lg"
              onClick={() =>
                handleExternalLink(
                  "https://www.npr.org/templates/story/story.php?storyId=111782935",
                  "npr_interview",
                )
              }
              className="bg-white text-elite-obsidian hover:bg-gray-100"
            >
              <ExternalLink className="w-5 h-5 mr-2" />
              Listen to NPR Interview
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() =>
                handleExternalLink("/people/tony-dungy", "dungy_profile")
              }
              className="border-white text-white hover:bg-white/10"
            >
              <ArrowRight className="w-5 h-5 mr-2" />
              View Full Tony Dungy Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

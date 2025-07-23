"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Crown,
  Shield,
  Zap,
  ArrowRight,
  Users,
  Star,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ThreePathsSectionProps {
  className?: string;
}

export function ThreePathsSection({ className }: ThreePathsSectionProps) {
  const [hoveredPath, setHoveredPath] = useState<number | null>(null);

  const paths = [
    {
      icon: Crown,
      title: "Champion Builder",
      subtitle: "I Am... a Champion Builder",
      description:
        "Legacy-driven leaders who build champions and transform lives through mentorship.",
      features: [
        "Leadership Development",
        "Mentorship Programs",
        "Team Building",
        "Legacy Creation",
      ],
      socialProof: {
        testimonial:
          "JAHmere's transformation shows the power of mentorship in creating positive change.",
        author: "Tony Dungy",
        title: "NFL Hall of Fame Coach",
      },
      stats: "47+ Champions Built",
      color: "orange",
      href: "/champion",
    },
    {
      icon: Shield,
      title: "Justice Advocate",
      subtitle: "I Am... a Judge",
      description:
        "Evidence-based decision makers seeking truth, justice, and systemic transformation.",
      features: [
        "Evidence Review",
        "Character Assessment",
        "Truth Analysis",
        "Justice Reform",
      ],
      socialProof: {
        testimonial:
          "The evidence clearly demonstrates remarkable character transformation and community impact.",
        author: "Michael Mataluni",
        title: "Community Advocate",
      },
      stats: "13 Character Letters",
      color: "blue",
      href: "/judge-ferrero-private",
    },
    {
      icon: Zap,
      title: "Divine Activist",
      subtitle: "I Am... an Activist",
      description:
        "Transformation agents who create massive change through strategic action.",
      features: [
        "Letter Writing",
        "Community Organizing",
        "Strategic Campaigns",
        "Direct Action",
      ],
      socialProof: {
        testimonial:
          "JAHmere embodies the spirit of transformation that our community needs to see.",
        author: "Jordan Dungy",
        title: "Community Leader",
      },
      stats: "247+ Active Supporters",
      color: "purple",
      href: "/letter-portal",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section className={cn("py-16 md:py-24", className)}>
      <div className="container mx-auto px-4">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Three Paths to JAHmere's Freedom
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed font-medium mb-8">
            Choose your path and join the movement transforming justice through
            community, evidence, and divine intervention.
          </p>

          {/* Live momentum indicators */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <div className="flex items-center gap-2 bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              Live Community Activity
            </div>
            <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
              <Users className="w-4 h-4" />
              247+ Active Supporters
            </div>
            <div className="flex items-center gap-2 bg-purple-100 text-purple-800 px-3 py-1 rounded-full">
              <Star className="w-4 h-4" />
              13 Character Letters Filed
            </div>
          </div>
        </motion.div>

        {/* Paths grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {paths.map((path, index) => (
            <motion.div
              key={path.title}
              variants={itemVariants}
              className="h-full"
              onMouseEnter={() => setHoveredPath(index)}
              onMouseLeave={() => setHoveredPath(null)}
            >
              <Card
                className={cn(
                  "h-full border-2 hover:shadow-xl transition-all duration-300 cursor-pointer group relative",
                  `border-${path.color}-200 hover:border-${path.color}-300`,
                  hoveredPath === index && "scale-105",
                )}
              >
                <CardHeader className="text-center pb-4">
                  <div
                    className={cn(
                      "w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors",
                      `bg-${path.color}-100 group-hover:bg-${path.color}-200`,
                    )}
                  >
                    <path.icon className={`w-8 h-8 text-${path.color}-600`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {path.title}
                  </CardTitle>
                  <p className={`text-${path.color}-600 font-medium`}>
                    {path.subtitle}
                  </p>

                  {/* Social proof stats */}
                  <div
                    className={cn(
                      "px-3 py-1 rounded-full text-sm font-medium mt-2",
                      `bg-${path.color}-50 text-${path.color}-700`,
                    )}
                  >
                    {path.stats}
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-center">
                    {path.description}
                  </p>

                  {/* Character witness social proof */}
                  <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-blue-200">
                    <blockquote className="text-sm text-gray-600 italic mb-2">
                      "{path.socialProof.testimonial}"
                    </blockquote>
                    <cite className="text-xs font-medium text-gray-500 not-italic">
                      — {path.socialProof.author}, {path.socialProof.title}
                    </cite>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2">
                    <h4 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
                      What You'll Get
                    </h4>
                    {path.features.map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-center text-sm text-gray-600"
                      >
                        <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <Link href={path.href} className="block pt-4">
                    <Button
                      className={cn(
                        "w-full text-white shadow-lg hover:shadow-xl transition-all duration-200",
                        `bg-${path.color}-600 hover:bg-${path.color}-700`,
                      )}
                      size="lg"
                    >
                      Start Your Mission
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center mt-16"
        >
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-gray-200 max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Can't decide? Start with what feels right.
            </h3>
            <p className="text-gray-600 mb-6">
              Every path leads to JAHmere's freedom. The most important step is
              the first one.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-divine text-white px-8 py-3"
              >
                Take the Quiz
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Learn More About JAHmere
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

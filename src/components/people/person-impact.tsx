"use client";
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { Card } from "@/components/ui";

export interface ImpactStat {
  id: string;
  value: string;
  label: string;
  description?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date?: string;
  icon?: React.ReactNode;
}

export interface PersonImpactProps {
  title: string;
  description?: string;
  stats: ImpactStat[];
  achievements: Achievement[];
}

function PersonImpact({
  title,
  description,
  stats,
  achievements,
}: PersonImpactProps) {
  const [expandedAchievement, setExpandedAchievement] = useState<string | null>(
    null,
  );

  // Animation variants for staggered children
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 md:py-24 bg-gentle-charcoal text-white w-full">
      <div className="container-wide">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>

          {description && (
            <p className="text-lg md:text-xl text-white/80">{description}</p>
          )}
        </div>

        {/* Impact Stats */}
        {stats.length > 0 && (
          <div className="mb-16">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-100px" }}
            >
              {stats.map((stat) => (
                <motion.div key={stat.id} variants={item}>
                  <Card className="h-full bg-white/10 backdrop-blur-sm border-white/20 text-center p-6">
                    <div className="flex flex-col h-full justify-center">
                      <div className="text-hope-gold text-4xl md:text-5xl font-bold mb-2">
                        {stat.value}
                      </div>
                      <div className="text-lg font-medium mb-2">
                        {stat.label}
                      </div>
                      {stat.description && (
                        <div className="text-sm text-white/70">
                          {stat.description}
                        </div>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold mb-8 text-center">
              Key Achievements
            </h3>

            <div className="space-y-4">
              {achievements.map((achievement) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5 }}
                >
                  <Card className="bg-white/10 backdrop-blur-sm border-white/20 overflow-hidden">
                    <button
                      className="w-full text-left p-6"
                      onClick={() =>
                        setExpandedAchievement(
                          expandedAchievement === achievement.id
                            ? null
                            : achievement.id,
                        )
                      }
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xl font-medium">
                          {achievement.title}
                        </h4>
                        {achievement.date && (
                          <span className="text-sm text-white/70">
                            {achievement.date}
                          </span>
                        )}
                      </div>

                      <motion.div
                        initial={false}
                        animate={{
                          height:
                            expandedAchievement === achievement.id ? "auto" : 0,
                          opacity:
                            expandedAchievement === achievement.id ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-white/80">
                          {achievement.description}
                        </p>
                      </motion.div>
                    </button>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default withErrorBoundary(PersonImpact, {
  componentName: "PersonImpact",
  id: "person-impact",
});

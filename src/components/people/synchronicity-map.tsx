"use client";

import { motion } from "framer-motion";
import { withDivineErrorBoundary } from "@/components/ui/divine-error-boundary";

interface TimelineEvent {
  year: string;
  event: string;
}

interface SynchronicityMapProps {
  title?: string;
  description?: string;
  timeline?: TimelineEvent[] | null;
  formula?: string | null;
}

function SynchronicityMap({
  title = "Timeline",
  description = "",
  timeline,
  formula,
}: SynchronicityMapProps) {
  // Robust null/undefined checking with multiple fallbacks
  const safeTimeline = Array.isArray(timeline)
    ? timeline.filter((item) => item && typeof item === "object")
    : [];

  const hasTimelineData = safeTimeline.length > 0;

  // Validate each timeline event has required properties
  const validatedTimeline = safeTimeline.map((item, index) => ({
    year: item?.year || `Year ${index + 1}`,
    event: item?.event || "No description available",
    originalIndex: index,
  }));

  return (
    <div className="py-16">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
        {title}
      </h2>
      <p className="text-lg text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
        {description}
      </p>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line - only show if timeline has data */}
        {hasTimelineData && (
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary/20 via-primary to-primary/20" />
        )}

        {/* Timeline events */}
        <div className="space-y-12">
          {hasTimelineData ? (
            validatedTimeline.map((item, index) => (
              <motion.div
                key={`timeline-${item.originalIndex}-${item.year}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 1) }}
                viewport={{ once: true }}
                className={`flex ${index % 2 === 0 ? "justify-start" : "justify-end"} relative`}
              >
                <div
                  className={`w-5/12 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8"}`}
                >
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold text-primary mb-2">
                      {item.year}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {item.event}
                    </p>
                  </div>
                </div>

                {/* Center dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full" />
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="inline-flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-muted-foreground/10 flex items-center justify-center">
                  <svg
                    className="w-8 h-8 text-muted-foreground/50"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                    role="img"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground text-lg">
                  No timeline events to display
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Formula - only show if formula exists and is non-empty */}
        {formula && formula.trim() && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <div className="bg-primary/10 dark:bg-primary/20 p-8 rounded-lg inline-block">
              <p className="text-xl font-bold text-primary">{formula}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default withDivineErrorBoundary(SynchronicityMap, {
  componentName: "SynchronicityMap",
  fallback: (
    <div className="py-16 text-center">
      <p className="text-muted-foreground">Unable to load timeline</p>
    </div>
  ),
});

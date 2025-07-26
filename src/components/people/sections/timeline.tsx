"use client";

import { motion } from "framer-motion";
import { withErrorBoundary } from "@/components/ui/error-boundary";

interface TimelineEvent {
  year: number;
  title: string;
  description: string;
}

interface TimelineProps {
  events: TimelineEvent[];
}

function Timeline({ events }: TimelineProps) {
  // Sort events by year (most recent first)
  const sortedEvents = [...events].sort((a, b) => b.year - a.year);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-[19px] top-0 bottom-0 w-1 bg-hope-gold/30 ml-0.5" />

        {/* Timeline events */}
        <div className="space-y-12">
          {sortedEvents.map((event, index) => (
            <motion.div
              key={`${event.year}-${index}`}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative pl-12"
            >
              {/* Year marker */}
              <div className="absolute left-0 top-0 flex items-center justify-center">
                <div className="h-10 w-10 bg-hope-gold rounded-full shadow-lg flex items-center justify-center text-white font-bold">
                  {event.year}
                </div>
              </div>

              {/* Event content */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-gentle-charcoal mb-2">
                  {event.title}
                </h3>
                <p className="text-soft-shadow">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default withErrorBoundary(Timeline, "Timeline");

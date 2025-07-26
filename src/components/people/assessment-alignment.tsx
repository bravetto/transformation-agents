"use client";

import { motion } from "framer-motion";
import { withErrorBoundary } from "@/components/ui/error-boundary";

interface AlignmentData {
  trait: string;
  person1Score: string;
  person2Score: string;
  meaning: string;
}

interface AssessmentAlignmentProps {
  title?: string;
  description?: string;
  alignments?: AlignmentData[] | null;
  message?: string | null;
  person1Name?: string;
  person2Name?: string;
}

function AssessmentAlignment({
  title = "Assessment Alignment",
  description = "",
  alignments,
  message,
  person1Name = "Person 1",
  person2Name = "Person 2",
}: AssessmentAlignmentProps) {
  // Robust null/undefined checking with validation
  const safeAlignments = Array.isArray(alignments)
    ? alignments.filter(
        (item) => item && typeof item === "object" && "trait" in item,
      )
    : [];

  const hasAlignmentData = safeAlignments.length > 0;

  // Validate and normalize alignment data
  const validatedAlignments = safeAlignments.map((alignment, index) => ({
    trait: alignment?.trait || `Trait ${index + 1}`,
    person1Score: alignment?.person1Score || "0",
    person2Score: alignment?.person2Score || "0",
    meaning: alignment?.meaning || "No description available",
    originalIndex: index,
  }));

  return (
    <div className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          {title}
        </h2>
        {description && (
          <p className="text-lg text-center text-muted-foreground mb-12">
            {description}
          </p>
        )}

        <div className="space-y-6">
          {hasAlignmentData ? (
            validatedAlignments.map((alignment, index) => (
              <motion.div
                key={`alignment-${alignment.originalIndex}-${alignment.trait}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: Math.min(index * 0.1, 1) }}
                viewport={{ once: true, margin: "-50px" }}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold mb-4">{alignment.trait}</h3>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {person1Name}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {alignment.person1Score}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">
                      {person2Name}
                    </p>
                    <p className="text-2xl font-bold text-primary">
                      {alignment.person2Score}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                  {alignment.meaning}
                </p>
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
                   
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                    />
                  </svg>
                </div>
                <p className="text-muted-foreground text-lg">
                  No assessment data available
                </p>
                <p className="text-sm text-muted-foreground/70">
                  Check back later for alignment information
                </p>
              </div>
            </motion.div>
          )}
        </div>

        {/* Only render message section if a message exists and is non-empty */}
        {message && message.trim() && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <div className="bg-primary/10 dark:bg-primary/20 p-6 rounded-lg max-w-2xl mx-auto">
              <p className="text-lg font-medium text-primary">{message}</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default withErrorBoundary(AssessmentAlignment, "AssessmentAlignment", (
    <div className="py-16 text-center">
      <p className="text-muted-foreground">Unable to load assessment data</p>
    </div>
  ));

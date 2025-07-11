"use client";

import React from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { motion } from "framer-motion";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { cn } from "@/lib/utils";
import { withErrorBoundary } from "@/components/with-error-boundary";

interface VennDiagramProps {
  className?: string;
  passions?: string[];
  talents?: string[];
  values?: string[];
  intersectionItems?: string[];
}

export const VennDiagram: React.FC<VennDiagramProps> = ({
  className,
  passions = [],
  talents = [],
  values = [],
  intersectionItems = [],
}) => {
  return (
    <div
      className={cn(
        "relative w-full aspect-square max-w-3xl mx-auto",
        className,
      )}
    >
      {/* Container for the Venn diagram */}
      <div className="absolute inset-0 flex items-center justify-center">
        {/* Passions Circle */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="absolute w-2/3 h-2/3 rounded-full bg-blue-500/30 flex items-center justify-center"
          style={{ left: "10%", top: "10%" }}
        >
          <div className="text-blue-800 font-bold">Passions</div>
          <ul className="text-sm">
            {passions.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </motion.div>

        {/* Talents Circle */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute w-2/3 h-2/3 rounded-full bg-green-500/30 flex items-center justify-center"
          style={{ right: "10%", top: "10%" }}
        >
          <div className="text-green-800 font-bold">Talents</div>
          <ul className="text-sm">
            {talents.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </motion.div>

        {/* Values Circle */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="absolute w-2/3 h-2/3 rounded-full bg-purple-500/30 flex items-center justify-center"
          style={{ bottom: "10%", left: "30%" }}
        >
          <div className="text-purple-800 font-bold">Values</div>
          <ul className="text-sm">
            {values.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </motion.div>

        {/* Intersection - The Greatness Zone */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="absolute w-1/3 h-1/3 rounded-full bg-white/90 shadow-lg flex flex-col items-center justify-center z-10"
          style={{ left: "35%", top: "35%" }}
        >
          <div className="text-gray-900 font-bold text-center mb-2">
            The Greatness Zone
          </div>
          <ul className="text-xs text-gray-700">
            {intersectionItems.map((item, index) => (
              <li key={index} className="text-center">
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Title */}
      <div className="absolute top-0 left-0 w-full text-center text-xl font-bold text-gray-900 mb-4">
        Your Greatness Zone
      </div>

      {/* Description */}
      <div className="absolute bottom-0 left-0 w-full text-center text-sm text-gray-600">
        Where your greatest joy meets the world's greatest needs
      </div>
    </div>
  );
};

const VennDiagramExported = VennDiagram;

// Export with error boundary
export default withErrorBoundary(VennDiagramExported, {
  componentName: "Venn Diagram",
  id: "VennDiagram",
});

"use client";

import React from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";
import { motion } from "framer-motion";

import DivineTransformation from "./divine-transformation";

import SacredContainer from "./sacred-container";

import { DivineParticles } from "./divine-particles";

import { cn } from "@/lib/utils";

import type { DivineRole } from "@/lib/design-system";

interface DivineAlignmentProps {
  role?: DivineRole;
  className?: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
}

const alignmentVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

function DivineAlignment({
  role = "default",
  className,
  title,
  subtitle,
  children,
}: DivineAlignmentProps) {
  return (
    <SacredContainer
      role={role}
      title={title}
      subtitle={subtitle}
      className={className}
    >
      <motion.div
        variants={alignmentVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* The Heart Team */}
        <DivineTransformation role="lightworker" particleVariant="sacred">
          <h3 className="text-2xl font-bold mb-4">The Heart Team</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Jay Forte (71/200)</h4>
              <p>The Mentor - Peacemaker, Caregiver, Relator</p>
            </div>
            <div>
              <h4 className="font-semibold">JAHmere Webb (62/200)</h4>
              <p>The Mentee - Peacemaker, Caregiver, Relator</p>
            </div>
          </div>
        </DivineTransformation>

        {/* The Drive Force */}
        <DivineTransformation role="messenger" particleVariant="flame">
          <h3 className="text-2xl font-bold mb-4">The Drive Force</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Michael Mataluni (66/200)</h4>
              <p>The Engine - Winner, Adapter, Inventor</p>
            </div>
          </div>
        </DivineTransformation>

        {/* The Spiritual Covering */}
        <DivineTransformation role="guardian" particleVariant="starfield">
          <h3 className="text-2xl font-bold mb-4">The Spiritual Covering</h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold">Tony & Lauren Dungy</h4>
              <p>The Parents - Wisdom, Credibility, Blessing</p>
            </div>
          </div>
        </DivineTransformation>

        {children}
      </motion.div>

      {/* Divine particles background */}
      <div className="fixed inset-0 pointer-events-none">
        <DivineParticles
          variant="divine"
          className="h-full w-full opacity-20"
        />
      </div>
    </SacredContainer>
  );
}

export default withErrorBoundary(DivineAlignment, {
  componentName: "DivineAlignment",
  id: "divinealignment",
});

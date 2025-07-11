"use client";

import React from "react";
import { motion } from "framer-motion";
import { Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { CallToActionProps } from "../types";

/**
 * CallToAction Component
 * 
 * Displays a call to action section with buttons for user engagement
 */
const CallToAction = ({ onAction, onShare, className }: CallToActionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className={cn(
        "mt-16 mb-12 bg-gradient-to-r from-blue-600 to-indigo-800 text-white p-8 rounded-xl shadow-lg",
        className
      )}
    >
      <h2 className="text-2xl font-bold mb-4">
        Be Part of The Bridge Project
      </h2>
      <p className="mb-6">
        Share your own story, submit a letter, or volunteer to help others
        connect with their divine purpose.
      </p>

      <div className="flex flex-wrap gap-4">
        <Button
          onClick={onAction}
          className="bg-white text-blue-700 hover:bg-blue-50"
        >
          Submit Your Letter
        </Button>

        <Button
          variant="outline"
          className="border-white text-white hover:bg-white/10"
          onClick={() => onShare("twitter")}
        >
          <Share2 size={16} className="mr-2" />
          Share This Story
        </Button>
      </div>
    </motion.div>
  );
};

export default withSafeUI(CallToAction, {
  componentName: "CallToAction",
}); 
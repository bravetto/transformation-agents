"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { withSafeUI } from "./with-safe-ui";

interface FloatingCTAProps {
  text: string;
  href: string;
  className?: string;
  showAfterScroll?: number;
}

function FloatingCTA({
  text,
  href,
  className,
  showAfterScroll = 100,
}: FloatingCTAProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY;
      setIsVisible(scrolled > showAfterScroll);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 260,
            damping: 20,
          }}
          className={cn(
            "fixed bottom-6 right-6 z-50",
            "hidden md:block", // Hide on mobile to prevent blocking content
            className,
          )}
        >
          <Link href={href}>
            <Button
              variant="primary"
              size="lg"
              className="shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-200 group"
            >
              <span className="mr-2">{text}</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              >
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </motion.div>
            </Button>
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Mobile-optimized sticky CTA for small screens
export function MobileStickyBar({
  text,
  href,
}: {
  text: string;
  href: string;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 p-4">
      <Link href={href} className="block">
        <Button variant="primary" size="lg" className="w-full">
          {text}
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </Link>
    </div>
  );
}

export default withSafeUI(FloatingCTA, {
  componentName: "FloatingCTA",
});

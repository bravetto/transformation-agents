"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { withErrorBoundary } from "@/components/ui/error-boundary";

/**
 * Banner component that displays promotional messages below the navigation
 * Uses unified spacing system for consistent layout
 */
function Banner() {
  return (
    <div className="layout-banner bg-black sticky top-header z-banner">
      <Container py="none">
        <div className="flex justify-center items-center h-full py-2">
          <Link
            href="/people"
            className="inline-flex items-center gap-2 text-white font-semibold hover:text-hope-gold transition-colors text-sm md:text-base"
          >
            <span className="text-hope-gold">✨</span>
            <span>Meet Our Transformation Agents</span>
            <svg
              className="w-4 h-4 md:w-5 md:h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </Container>
    </div>
  );
}

export default withErrorBoundary(Banner, "Banner");

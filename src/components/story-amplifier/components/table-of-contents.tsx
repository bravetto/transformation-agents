"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { withSafeUI } from "@/components/ui/with-safe-ui";
import { TableOfContentsProps } from "../types";

/**
 * TableOfContents Component
 *
 * Displays a navigation sidebar with sections of the story
 */
const TableOfContents = ({
  sections,
  activeSection,
  contentRef,
}: TableOfContentsProps) => {
  return (
    <div className="fixed right-4 top-1/3 transform -translate-y-1/3 z-40 hidden lg:block">
      <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
        <h3 className="text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          In This Story
        </h3>
        <div className="space-y-2">
          {sections.map((section, index) => (
            <button
              key={index}
              onClick={() => {
                if (contentRef.current) {
                  const targetScroll =
                    contentRef.current.scrollHeight * (section.percent / 100);
                  window.scrollTo({
                    top: targetScroll + contentRef.current.offsetTop,
                    behavior: "smooth",
                  });
                }
              }}
              className={cn(
                "text-xs block w-full text-left px-2 py-1 rounded transition-colors",
                activeSection === index
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800/30",
              )}
            >
              {section.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default withSafeUI(TableOfContents, {
  componentName: "TableOfContents",
});

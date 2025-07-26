"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence, type MotionStyle } from "framer-motion";
import { withErrorBoundary } from "@/components/with-error-boundary";

// 🚀 OPTIMIZED: Replaced @formkit/auto-animate with Framer Motion
// This eliminates the dependency and provides more control

interface AutoAnimateProps {
  children: React.ReactNode;
  duration?: number;
  easing?: "ease" | "easeIn" | "easeOut" | "easeInOut" | "linear";
  className?: string;
  style?: MotionStyle;
}

function AutoAnimateContainer({
  children,
  duration = 200,
  easing = "easeInOut",
  className = "",
  style = {},
}: AutoAnimateProps) {
  return (
    <motion.div
      layout
      transition={{
        duration: duration / 1000,
        ease: easing,
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

interface AutoAnimateListProps<T = unknown> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  duration?: number;
  className?: string;
  style?: MotionStyle;
}

export function AutoAnimateList<T = unknown>({
  items,
  renderItem,
  keyExtractor,
  duration = 200,
  className = "",
  style = {},
}: AutoAnimateListProps<T>) {
  return (
    <motion.div layout className={className} style={style}>
      <AnimatePresence mode="sync">
        {items.map((item, index) => (
          <motion.div
            key={keyExtractor(item, index)}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: duration / 1000,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

interface AutoAnimateGridProps<T = unknown> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string | number;
  columns?: number;
  duration?: number;
  className?: string;
  style?: MotionStyle;
}

export function AutoAnimateGrid<T = unknown>({
  items,
  renderItem,
  keyExtractor,
  columns = 3,
  duration = 200,
  className = "",
  style = {},
}: AutoAnimateGridProps<T>) {
  return (
    <motion.div
      layout
      className={`grid grid-cols-${columns} ${className}`}
      style={style}
    >
      <AnimatePresence mode="sync">
        {items.map((item, index) => (
          <motion.div
            key={keyExtractor(item, index)}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: duration / 1000,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {renderItem(item, index)}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

interface AutoAnimateStackProps {
  children: React.ReactNode;
  direction?: "horizontal" | "vertical";
  duration?: number;
  className?: string;
  style?: MotionStyle;
}

export function AutoAnimateStack({
  children,
  direction = "vertical",
  duration = 200,
  className = "",
  style = {},
}: AutoAnimateStackProps) {
  return (
    <motion.div
      layout
      className={`flex ${direction === "vertical" ? "flex-col" : "flex-row"} ${className}`}
      style={style}
    >
      <AnimatePresence mode="sync">
        {React.Children.map(children, (child, index) => (
          <motion.div
            key={index}
            layout
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: duration / 1000,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {child}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  );
}

interface AutoAnimateModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  duration?: number;
  className?: string;
  overlayClassName?: string;
}

export function AutoAnimateModal({
  children,
  isOpen,
  onClose,
  duration = 200,
  className = "",
  overlayClassName = "",
}: AutoAnimateModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: duration / 1000 }}
          className={`fixed inset-0 z-50 flex items-center justify-center ${overlayClassName}`}
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: duration / 1000,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className={className}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface AutoAnimateTabsProps {
  tabs: Array<{
    id: string;
    label: string;
    content: React.ReactNode;
  }>;
  activeTab: string;
  onTabChange: (tabId: string) => void;
  duration?: number;
  className?: string;
  tabsClassName?: string;
  contentClassName?: string;
}

export function AutoAnimateTabs({
  tabs,
  activeTab,
  onTabChange,
  duration = 200,
  className = "",
  tabsClassName = "",
  contentClassName = "",
}: AutoAnimateTabsProps) {
  return (
    <div className={className}>
      <div className={`flex border-b ${tabsClassName}`}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-4 py-2 ${
              activeTab === tab.id
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tabs.map(
          (tab) =>
            tab.id === activeTab && (
              <motion.div
                key={tab.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: duration / 1000 }}
                className={contentClassName}
              >
                {tab.content}
              </motion.div>
            ),
        )}
      </AnimatePresence>
    </div>
  );
}

interface AutoAnimateAccordionProps {
  items: Array<{
    id: string;
    title: string;
    content: React.ReactNode;
  }>;
  openItems: string[];
  onToggle: (itemId: string) => void;
  duration?: number;
  className?: string;
}

export function AutoAnimateAccordion({
  items,
  openItems,
  onToggle,
  duration = 200,
  className = "",
}: AutoAnimateAccordionProps) {
  return (
    <div className={className}>
      {items.map((item) => (
        <div key={item.id} className="border-b">
          <button
            onClick={() => onToggle(item.id)}
            className="w-full px-4 py-3 text-left hover:bg-gray-50 flex justify-between items-center"
          >
            <span>{item.title}</span>
            <motion.span
              animate={{ rotate: openItems.includes(item.id) ? 180 : 0 }}
              transition={{ duration: duration / 1000 }}
            >
              ▼
            </motion.span>
          </button>

          <AnimatePresence>
            {openItems.includes(item.id) && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: duration / 1000 }}
                className="overflow-hidden"
              >
                <div className="px-4 py-3 border-t">{item.content}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}

export default withErrorBoundary(AutoAnimateContainer, {
  componentName: "AutoAnimateContainer",
  id: "autoanimatecontainer",
});

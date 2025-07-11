"use client";

import { useRef, useEffect } from "react";
import autoAnimate from "@formkit/auto-animate";
import { cn } from "@/lib/utils";

interface AutoAnimateProps {
  children: React.ReactNode;
  className?: string;
  duration?: number;
  easing?: string;
  disrespectUserMotionPreference?: boolean;
}

export function AutoAnimateContainer({
  children,
  className = "",
  duration = 250,
  easing = "ease-in-out",
  disrespectUserMotionPreference = false,
}: AutoAnimateProps) {
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current, {
        duration,
        easing,
        disrespectUserMotionPreference,
      });
    }
  }, [duration, easing, disrespectUserMotionPreference]);

  return (
    <div ref={parent} className={className}>
      {children}
    </div>
  );
}

interface AutoAnimateListProps<T = unknown> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  className?: string;
  itemClassName?: string;
  duration?: number;
  keyExtractor?: (item: T, index: number) => string | number;
}

export function AutoAnimateList<T = unknown>({
  items,
  renderItem,
  className = "",
  itemClassName = "",
  duration = 300,
  keyExtractor = (item, index) => index,
}: AutoAnimateListProps<T>) {
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current, {
        duration,
        easing: "ease-out",
      });
    }
  }, [duration]);

  return (
    <div ref={parent} className={className}>
      {items.map((item, index) => (
        <div key={keyExtractor(item, index)} className={itemClassName}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

interface AutoAnimateGridProps<T = unknown> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  columns?: number;
  className?: string;
  itemClassName?: string;
  duration?: number;
  keyExtractor?: (item: T, index: number) => string | number;
}

export function AutoAnimateGrid<T = unknown>({
  items,
  renderItem,
  columns = 2,
  className = "",
  itemClassName = "",
  duration = 350,
  keyExtractor = (item, index) => index,
}: AutoAnimateGridProps<T>) {
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current, {
        duration,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      });
    }
  }, [duration]);

  const gridClass = `grid grid-cols-1 md:grid-cols-${columns} gap-4 ${className}`;

  return (
    <div ref={parent} className={gridClass}>
      {items.map((item, index) => (
        <div key={keyExtractor(item, index)} className={itemClassName}>
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}

interface AutoAnimateStackProps {
  children: React.ReactNode;
  className?: string;
  spacing?: "none" | "sm" | "md" | "lg" | "xl";
  duration?: number;
}

export function AutoAnimateStack({
  children,
  className = "",
  spacing = "md",
  duration = 300,
}: AutoAnimateStackProps) {
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current, {
        duration,
        easing: "ease-in-out",
      });
    }
  }, [duration]);

  const spacingClasses = {
    none: "space-y-0",
    sm: "space-y-2",
    md: "space-y-4",
    lg: "space-y-6",
    xl: "space-y-8",
  };

  return (
    <div
      ref={parent}
      className={`flex flex-col ${spacingClasses[spacing]} ${className}`}
    >
      {children}
    </div>
  );
}

interface AutoAnimateModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  duration?: number;
}

export function AutoAnimateModal({
  isOpen,
  onClose,
  children,
  className = "",
  overlayClassName = "",
  duration = 250,
}: AutoAnimateModalProps) {
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current, {
        duration,
        easing: "cubic-bezier(0.16, 1, 0.3, 1)",
      });
    }
  }, [duration]);

  return (
    <div ref={parent}>
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center ${overlayClassName}`}
          onClick={onClose}
        >
          <div
            className={`bg-white rounded-lg shadow-xl max-w-lg w-full m-4 ${className}`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>
      )}
    </div>
  );
}

interface AutoAnimateTabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
    id?: string | number;
  }[];
  activeTab: number;
  onTabChange: (index: number) => void;
  className?: string;
  tabClassName?: string;
  contentClassName?: string;
  duration?: number;
}

export function AutoAnimateTabs({
  tabs,
  activeTab,
  onTabChange,
  className = "",
  tabClassName = "",
  contentClassName = "",
  duration = 200,
}: AutoAnimateTabsProps) {
  const contentParent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentParent.current) {
      autoAnimate(contentParent.current, {
        duration,
        easing: "ease-out",
      });
    }
  }, [duration]);

  return (
    <div className={className}>
      {/* Tab Headers */}
      <div className="flex border-b border-gray-200">
        {tabs.map((tab, index) => (
          <button
            key={tab.id || index}
            onClick={() => onTabChange(index)}
            className={cn(
              "relative px-4 py-2 font-medium transition-all duration-300",
              activeTab === index
                ? "text-hope-gold border-b-2 border-hope-gold"
                : "text-soft-shadow hover:text-gentle-charcoal",
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div ref={contentParent} className={`mt-4 ${contentClassName}`}>
        {tabs[activeTab] && (
          <div key={activeTab}>{tabs[activeTab].content}</div>
        )}
      </div>
    </div>
  );
}

interface AutoAnimateAccordionProps {
  items: { title: string; content: React.ReactNode }[];
  openItems: number[];
  onToggle: (index: number) => void;
  className?: string;
  itemClassName?: string;
  duration?: number;
  allowMultiple?: boolean;
}

export function AutoAnimateAccordion({
  items,
  openItems,
  onToggle,
  className = "",
  itemClassName = "",
  duration = 300,
  allowMultiple = true,
}: AutoAnimateAccordionProps) {
  const parent = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (parent.current) {
      autoAnimate(parent.current, {
        duration,
        easing: "cubic-bezier(0.4, 0, 0.2, 1)",
      });
    }
  }, [duration]);

  const handleToggle = (index: number) => {
    if (!allowMultiple) {
      // Close all others if not allowing multiple
      onToggle(openItems.includes(index) ? -1 : index);
    } else {
      onToggle(index);
    }
  };

  return (
    <div ref={parent} className={`space-y-2 ${className}`}>
      {items.map((item, index) => (
        <div
          key={index}
          className={`border border-gray-200 rounded-lg ${itemClassName}`}
        >
          <button
            onClick={() => handleToggle(index)}
            className="w-full px-4 py-3 text-left font-medium hover:bg-gray-50 transition-colors"
          >
            {item.title}
          </button>
          {openItems.includes(index) && (
            <div className="px-4 pb-4">{item.content}</div>
          )}
        </div>
      ))}
    </div>
  );
}

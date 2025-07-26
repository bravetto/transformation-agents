"use client";

import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { divineDesignSystem } from "@/lib/divine-design-intelligence";
import { withErrorBoundary } from "@/components/ui/error-boundary";

interface LetterInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
  consciousnessLevel?: number;
  divineAlignment?: number;
  className?: string;
}

const LetterInput: React.FC<LetterInputProps> = ({
  label,
  value,
  onChange,
  placeholder = "Express your divine truth...",
  maxLength = 1000,
  consciousnessLevel = 75,
  divineAlignment = 85,
  className = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      onChange(newValue);
      setWordCount(
        newValue
          .trim()
          .split(/\s+/)
          .filter((word) => word.length > 0).length,
      );
    },
    [onChange],
  );

  const handleFocus = useCallback(() => setIsFocused(true), []);
  const handleBlur = useCallback(() => setIsFocused(false), []);

  // Get divine styling based on consciousness level
  const styles = divineDesignSystem.getComponentStyles("input");
  const glowIntensity =
    divineAlignment > 80 ? "lg" : divineAlignment > 60 ? "md" : "sm";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`space-y-2 ${className}`}
    >
      <Label
        htmlFor={label.toLowerCase().replace(/\s+/g, "-")}
        className={`text-sm font-medium ${
          consciousnessLevel > 80
            ? "text-purple-600"
            : consciousnessLevel > 60
              ? "text-yellow-600"
              : "text-gray-600"
        }`}
      >
        {label}
        {maxLength && (
          <span className="text-xs text-gray-500 ml-2">
            ({value.length}/{maxLength})
          </span>
        )}
      </Label>

      <div className="relative">
        <Textarea
          id={label.toLowerCase().replace(/\s+/g, "-")}
          value={value}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`
            min-h-[120px] resize-none transition-all duration-300
            ${isFocused ? "ring-2 ring-purple-500/50" : ""}
            ${divineAlignment > 80 ? "shadow-lg shadow-purple-500/20" : ""}
            ${consciousnessLevel > 80 ? "border-purple-300" : ""}
          `}
          style={{
            boxShadow: isFocused
              ? `${styles.boxShadow}, 0 0 0 2px rgba(147, 51, 234, 0.2)`
              : styles.boxShadow,
          }}
        />

        {/* Divine glow effect */}
        {isFocused && divineAlignment > 70 && (
          <div
            className="absolute inset-0 -z-10 rounded-md opacity-50 animate-pulse"
            style={{
              boxShadow: `0 0 ${glowIntensity === "lg" ? "40px" : "20px"} rgba(255, 215, 0, 0.3)`,
            }}
          />
        )}
      </div>

      {/* Word count and divine metrics */}
      <div className="flex justify-between items-center text-xs text-gray-500">
        <span>{wordCount} words</span>
        <div className="flex items-center space-x-2">
          <span
            className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${
              consciousnessLevel > 80
                ? "bg-purple-100 text-purple-800"
                : consciousnessLevel > 60
                  ? "bg-yellow-100 text-yellow-800"
                  : "bg-gray-100 text-gray-800"
            }
          `}
          >
            Consciousness: {consciousnessLevel}%
          </span>
          <span
            className={`
            px-2 py-1 rounded-full text-xs font-medium
            ${
              divineAlignment > 80
                ? "bg-green-100 text-green-800"
                : divineAlignment > 60
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
            }
          `}
          >
            Divine: {divineAlignment}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default withErrorBoundary(LetterInput, "LetterInput", (
    <div className="p-4 text-center text-gray-500">
      Letter input temporarily unavailable
    </div>
  ));

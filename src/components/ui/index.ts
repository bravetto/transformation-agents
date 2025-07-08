/**
 * UI Component Library Exports
 *
 * This file serves as the central export point for all UI components.
 * Import from '@/components/ui' to access any component.
 *
 * @example
 * import { Button, Card, Container } from '@/components/ui';
 */

// Central export file for all UI components
export * from "./badge";
export * from "./base-card";
export * from "./button";
export * from "./calendar";
export * from "./card";
export * from "./case-status";
export * from "./checkbox";
export * from "./container";
export * from "./date-picker";
export * from "./divine-error-boundary";
export * from "./divine-image";
export * from "./feature-card"; // This exports the FeatureCard as a named export, not default
export * from "./file-upload";
export * from "./floating-cta";
export * from "./form";
export * from "./input";
export * from "./label";
export * from "./page-transition";
export * from "./person-card";
export * from "./popover";
export * from "./progress";
export * from "./radio-group";
export * from "./responsive-container";
export * from "./select";
export * from "./stack";
export * from "./supporter-count";
export * from "./switch";
export * from "./tabs";
export * from "./textarea";
export * from "./trust-banner";
export * from "./typography";
export * from "./urgency-banner";

// Re-export commonly used together
export const UIComponents = {
  // Layout
  Container: "./container",
  Stack: "./stack",

  // Typography
  Typography: "./typography",

  // Form Elements
  Button: "./button",
  Input: "./input",
  Select: "./select",

  // Display
  Card: "./card",
  Badge: "./badge",
  Progress: "./progress",
} as const;

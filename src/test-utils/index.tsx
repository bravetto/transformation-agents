"use client";

import "@testing-library/jest-dom";
import React, { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AnimationProvider } from "@/components/animation-context";
// EasterEggProvider removed for MVP hydration stability

interface AllProvidersProps {
  children: React.ReactNode;
}

const AllProviders = ({ children }: AllProvidersProps) => {
  return <AnimationProvider>{children}</AnimationProvider>;
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper">,
) => render(ui, { wrapper: AllProviders, ...options });

export * from "@testing-library/react";
export { customRender as render };

// Mock IntersectionObserver
global.IntersectionObserver = class IntersectionObserver {
  constructor() {}
  disconnect() {}
  observe() {}
  unobserve() {}
} as any;

// Mock matchMedia (non-Jest version for compatibility)
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {}, // deprecated
    removeListener: () => {}, // deprecated
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Common test utilities
export const mockComponent = (name: string) => {
  return function MockComponent() {
    return <div data-testid={`mock-${name.toLowerCase()}`}>{name}</div>;
  };
};

export const waitForElement = async (selector: string, timeout = 5000) => {
  const { waitFor } = await import("@testing-library/react");
  const { screen } = await import("@testing-library/react");

  return waitFor(() => screen.getByTestId(selector), { timeout });
};

import {
  useDeviceCapabilities,
  getOptimizedVariants,
  getPageTransitionVariants,
  getStaggerConfig,
  usePageVisibility,
  useInViewAnimation,
  getDivineAnimationPreset,
  divineEase,
} from "../animation-utils";
import { renderHook, act } from "@testing-library/react";

// Mock framer-motion
jest.mock("framer-motion", () => ({
  useReducedMotion: jest.fn(() => false),
}));

describe("Animation Utilities", () => {
  describe("getOptimizedVariants", () => {
    it("returns full variants when not simplified", () => {
      const variants = getOptimizedVariants({
        simplify: false,
        distance: 20,
        duration: 0.5,
      });

      expect(variants.hidden).toEqual({ opacity: 0, y: 20 });
      expect(variants.visible).toEqual({
        opacity: 1,
        y: 0,
        transition: expect.objectContaining({
          duration: 0.5,
          staggerChildren: 0.1,
          delayChildren: 0,
        }),
      });
    });

    it("returns simplified variants when simplified", () => {
      const variants = getOptimizedVariants({
        simplify: true,
        duration: 0.5,
      });

      expect(variants.hidden).toEqual({ opacity: 0 });
      expect(variants.visible).toEqual({
        opacity: 1,
        transition: expect.objectContaining({
          duration: 0.5,
        }),
      });
      expect(variants.visible.y).toBeUndefined();
    });
  });

  describe("getPageTransitionVariants", () => {
    it("returns simplified variants for reduced motion", () => {
      const variants = getPageTransitionVariants(true);

      expect(variants.initial).toEqual({ opacity: 0 });
      expect(variants.animate).toEqual({ opacity: 1 });
      expect(variants.exit).toEqual({ opacity: 0 });
      expect(variants.transition.duration).toBe(0.3);
    });

    it("returns full variants when motion is enabled", () => {
      const variants = getPageTransitionVariants(false);

      expect(variants.initial).toEqual({ opacity: 0, y: 10 });
      expect(variants.animate).toEqual({ opacity: 1, y: 0 });
      expect(variants.exit).toEqual({ opacity: 0, y: -10 });
      expect(variants.transition.duration).toBe(0.5);
    });
  });

  describe("getStaggerConfig", () => {
    it("returns normal stagger config when not simplified", () => {
      const config = getStaggerConfig({
        simplify: false,
        staggerChildren: 0.1,
        delayChildren: 0.2,
        itemCount: 5,
      });

      expect(config.staggerChildren).toBe(0.1);
      expect(config.delayChildren).toBe(0.2);
    });

    it("reduces stagger for simplified animations", () => {
      const config = getStaggerConfig({
        simplify: true,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      });

      expect(config.staggerChildren).toBeLessThan(0.1);
      expect(config.delayChildren).toBe(0);
    });

    it("adjusts stagger for many items", () => {
      const config = getStaggerConfig({
        simplify: false,
        staggerChildren: 0.1,
        itemCount: 25,
      });

      expect(config.staggerChildren).toBeLessThan(0.1);
    });
  });

  describe("usePageVisibility", () => {
    it("tracks page visibility", () => {
      const { result } = renderHook(() => usePageVisibility());

      expect(result.current.isVisible).toBe(true);

      // Simulate visibility change
      act(() => {
        Object.defineProperty(document, "visibilityState", {
          value: "hidden",
          writable: true,
        });
        document.dispatchEvent(new Event("visibilitychange"));
      });

      expect(result.current.isVisible).toBe(false);
    });
  });

  describe("getDivineAnimationPreset", () => {
    it("returns simplified animation for reduced motion", () => {
      const animation = getDivineAnimationPreset("fadeIn", true);

      // Type assertion since we know reduced motion returns simplified version
      const simplifiedAnimation = animation as {
        initial: { opacity: number };
        animate: { opacity: number };
        exit: { opacity: number };
        transition: { duration: number; ease: number[] };
      };

      expect(simplifiedAnimation.initial).toEqual({ opacity: 0 });
      expect(simplifiedAnimation.animate).toEqual({ opacity: 1 });
      expect(simplifiedAnimation.transition.duration).toBe(0.3);
    });

    it("returns full animation when motion is enabled", () => {
      const animation = getDivineAnimationPreset("fadeIn", false);

      expect(animation).toBeDefined();
      // Check for properties that exist on fadeIn preset
      expect(animation).toHaveProperty("animate");
      expect(animation).toHaveProperty("transition");
    });
  });

  describe("divineEase", () => {
    it("exports divine ease curve", () => {
      expect(divineEase).toBeDefined();
      expect(Array.isArray(divineEase)).toBe(true);
      expect(divineEase).toHaveLength(4);
    });
  });
});

import { cn, getRoleColorClasses } from "../utils";

describe("Utility Functions", () => {
  describe("cn (className utility)", () => {
    it("merges class names correctly", () => {
      expect(cn("class1", "class2")).toBe("class1 class2");
      expect(cn("base", "override")).toBe("base override");
    });

    it("handles conditional classes", () => {
      expect(cn("base", true && "active", false && "inactive")).toBe(
        "base active",
      );
      expect(cn("base", undefined, null, "")).toBe("base");
    });

    it("handles arrays of classes", () => {
      expect(cn(["class1", "class2"], "class3")).toBe("class1 class2 class3");
    });

    it("handles objects with boolean values", () => {
      expect(cn({ active: true, disabled: false, "text-lg": true })).toBe(
        "active text-lg",
      );
    });

    it("merges Tailwind classes correctly", () => {
      expect(cn("px-2 py-1", "px-4")).toBe("py-1 px-4");
      expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
    });
  });

  // Removed getMoodScore tests since it's not exported from utils.ts

  // Removed getMoodEmoji tests since it's not exported from utils.ts

  describe("getRoleColorClasses", () => {
    it("returns correct colors for lightworker role", () => {
      const colors = getRoleColorClasses("lightworker");
      expect(colors.primary).toBe("text-amber-500");
      expect(colors.bg).toBe("bg-amber-500");
      expect(colors.border).toBe("border-amber-500");
      expect(colors.hover).toBe("hover:bg-amber-600");
      expect(colors.ring).toBe("ring-amber-400");
      expect(colors.gradient).toBe(
        "from-amber-500 via-orange-400 to-yellow-500",
      );
    });

    it("returns correct colors for messenger role", () => {
      const colors = getRoleColorClasses("messenger");
      expect(colors.primary).toBe("text-blue-500");
      expect(colors.bg).toBe("bg-blue-500");
      expect(colors.border).toBe("border-blue-500");
      expect(colors.hover).toBe("hover:bg-blue-600");
      expect(colors.ring).toBe("ring-blue-400");
      expect(colors.gradient).toBe(
        "from-blue-500 via-indigo-500 to-purple-500",
      );
    });

    it("returns correct colors for witness role", () => {
      const colors = getRoleColorClasses("witness");
      expect(colors.primary).toBe("text-emerald-500");
      expect(colors.bg).toBe("bg-emerald-500");
      expect(colors.border).toBe("border-emerald-500");
      expect(colors.hover).toBe("hover:bg-emerald-600");
      expect(colors.ring).toBe("ring-emerald-400");
      expect(colors.gradient).toBe("from-emerald-500 via-teal-500 to-cyan-500");
    });

    it("returns correct colors for guardian role", () => {
      const colors = getRoleColorClasses("guardian");
      expect(colors.primary).toBe("text-purple-500");
      expect(colors.bg).toBe("bg-purple-500");
      expect(colors.border).toBe("border-purple-500");
      expect(colors.hover).toBe("hover:bg-purple-600");
      expect(colors.ring).toBe("ring-purple-400");
      expect(colors.gradient).toBe("from-purple-500 via-pink-500 to-rose-500");
    });

    it("returns default colors when no role specified", () => {
      const colors = getRoleColorClasses("default");
      expect(colors.primary).toBe("text-blue-500");
      expect(colors.bg).toBe("bg-blue-500");
      expect(colors.border).toBe("border-blue-500");
      expect(colors.hover).toBe("hover:bg-blue-600");
      expect(colors.ring).toBe("ring-blue-400");
      expect(colors.gradient).toBe(
        "from-blue-500 via-indigo-500 to-purple-500",
      );
    });
  });

  // Removed getRoleGradient tests since it's not exported from utils.ts

  // Removed getRoleTextColor tests since it's not exported from utils.ts

  // Removed getRoleBorderColor tests since it's not exported from utils.ts
});

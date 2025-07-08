import {
  cn,
  getMoodScore,
  getMoodEmoji,
  getRoleColorClasses,
  getRoleGradient,
  getRoleTextColor,
  getRoleBorderColor,
} from "../utils";

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

  describe("getMoodScore", () => {
    it("returns correct scores for moods", () => {
      expect(getMoodScore("amazing")).toBe(10);
      expect(getMoodScore("great")).toBe(8);
      expect(getMoodScore("good")).toBe(6);
      expect(getMoodScore("okay")).toBe(4);
      expect(getMoodScore("struggling")).toBe(2);
      expect(getMoodScore("difficult")).toBe(1);
    });

    it("returns default score for unknown mood", () => {
      expect(getMoodScore("unknown")).toBe(5);
      expect(getMoodScore("")).toBe(5);
    });
  });

  describe("getMoodEmoji", () => {
    it("returns correct emojis for moods", () => {
      expect(getMoodEmoji("amazing")).toBe("🤩");
      expect(getMoodEmoji("great")).toBe("😊");
      expect(getMoodEmoji("good")).toBe("🙂");
      expect(getMoodEmoji("okay")).toBe("😐");
      expect(getMoodEmoji("struggling")).toBe("😔");
      expect(getMoodEmoji("difficult")).toBe("😢");
    });

    it("returns default emoji for unknown mood", () => {
      expect(getMoodEmoji("unknown")).toBe("😐");
      expect(getMoodEmoji("")).toBe("😐");
    });
  });

  describe("getRoleColorClasses", () => {
    it("returns correct colors for lightworker role", () => {
      const colors = getRoleColorClasses("lightworker");
      expect(colors.primary).toBe("bg-lightworker-primary");
      expect(colors.text).toBe("text-amber-500");
      expect(colors.border).toBe("border-amber-500");
      expect(colors.gradient).toContain("from-amber-500");
    });

    it("returns correct colors for messenger role", () => {
      const colors = getRoleColorClasses("messenger");
      expect(colors.primary).toBe("bg-messenger-primary");
      expect(colors.text).toBe("text-blue-500");
      expect(colors.border).toBe("border-blue-500");
      expect(colors.gradient).toContain("from-blue-500");
    });

    it("returns correct colors for witness role", () => {
      const colors = getRoleColorClasses("witness");
      expect(colors.primary).toBe("bg-witness-primary");
      expect(colors.text).toBe("text-emerald-500");
      expect(colors.border).toBe("border-emerald-500");
      expect(colors.gradient).toContain("from-emerald-500");
    });

    it("returns correct colors for guardian role", () => {
      const colors = getRoleColorClasses("guardian");
      expect(colors.primary).toBe("bg-guardian-primary");
      expect(colors.text).toBe("text-purple-500");
      expect(colors.border).toBe("border-purple-500");
      expect(colors.gradient).toContain("from-purple-500");
    });

    it("returns default colors when no role specified", () => {
      const colors = getRoleColorClasses();
      expect(colors.primary).toBe("bg-courage-blue");
      expect(colors.text).toBe("text-blue-500");
    });
  });

  describe("getRoleGradient", () => {
    it("returns correct gradient for each role", () => {
      expect(getRoleGradient("lightworker")).toContain("from-amber-500");
      expect(getRoleGradient("messenger")).toContain("from-blue-500");
      expect(getRoleGradient("witness")).toContain("from-emerald-500");
      expect(getRoleGradient("guardian")).toContain("from-purple-500");
    });

    it("returns default gradient when no role specified", () => {
      expect(getRoleGradient()).toContain("from-blue-500");
    });
  });

  describe("getRoleTextColor", () => {
    it("returns correct text color for each role", () => {
      expect(getRoleTextColor("lightworker")).toBe("text-amber-500");
      expect(getRoleTextColor("messenger")).toBe("text-blue-500");
      expect(getRoleTextColor("witness")).toBe("text-emerald-500");
      expect(getRoleTextColor("guardian")).toBe("text-purple-500");
    });

    it("returns default text color when no role specified", () => {
      expect(getRoleTextColor()).toBe("text-blue-500");
    });
  });

  describe("getRoleBorderColor", () => {
    it("returns correct border color for each role", () => {
      expect(getRoleBorderColor("lightworker")).toBe("border-amber-500");
      expect(getRoleBorderColor("messenger")).toBe("border-blue-500");
      expect(getRoleBorderColor("witness")).toBe("border-emerald-500");
      expect(getRoleBorderColor("guardian")).toBe("border-purple-500");
    });

    it("returns default border color when no role specified", () => {
      expect(getRoleBorderColor()).toBe("border-blue-500");
    });
  });
});

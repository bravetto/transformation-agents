#!/usr/bin/env node

import * as fs from "fs/promises";
import { glob } from "glob";

interface HookViolation {
  file: string;
  line: number;
  column: number;
  message: string;
  severity: "error" | "warning";
  fix?: string;
  pattern: string;
}

class ReactHooksSafetyChecker {
  async checkHooksSafety(): Promise<HookViolation[]> {
    console.log("🔍 Checking React Hooks safety...\n");

    const violations: HookViolation[] = [];
    const files = await this.getComponentFiles();

    for (const file of files) {
      const content = await this.safeReadFile(file);
      if (!content) continue;

      const fileViolations = this.analyzeFile(file, content);
      violations.push(...fileViolations);
    }

    return violations;
  }

  private analyzeFile(filePath: string, content: string): HookViolation[] {
    const violations: HookViolation[] = [];
    const lines = content.split("\n");

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;

      // Check for callback dependency pattern (PropheticCountdown issue)
      if (this.hasCallbackDependencyPattern(line)) {
        violations.push({
          file: filePath,
          line: lineNumber,
          column: 0,
          message: "useEffect depends on callback that changes every render",
          severity: "error",
          fix: "Remove callback from dependencies, use only stable values",
          pattern: "callback-dependency",
        });
      }

      // Check for missing dependencies
      if (this.hasMissingDependenciesPattern(line)) {
        violations.push({
          file: filePath,
          line: lineNumber,
          column: 0,
          message:
            "ESLint exhaustive-deps disabled - potential missing dependencies",
          severity: "warning",
          fix: "Review dependencies and remove eslint-disable if possible",
          pattern: "missing-deps",
        });
      }

      // Check for conditional hooks
      if (this.hasConditionalHooksPattern(line)) {
        violations.push({
          file: filePath,
          line: lineNumber,
          column: 0,
          message: "Hook called conditionally - violates Rules of Hooks",
          severity: "error",
          fix: "Move hook to top level of component",
          pattern: "conditional-hook",
        });
      }

      // Check for setState in render
      if (this.hasSetStateInRenderPattern(line)) {
        violations.push({
          file: filePath,
          line: lineNumber,
          column: 0,
          message: "setState called directly in render - causes infinite loops",
          severity: "error",
          fix: "Move setState to useEffect or event handler",
          pattern: "setState-in-render",
        });
      }

      // Check for unthrottled event handlers
      if (this.hasUnthrottledEventPattern(line)) {
        violations.push({
          file: filePath,
          line: lineNumber,
          column: 0,
          message: "Unthrottled event handler can cause performance issues",
          severity: "warning",
          fix: "Use throttle, debounce, or requestAnimationFrame",
          pattern: "unthrottled-event",
        });
      }
    }

    return violations;
  }

  private hasCallbackDependencyPattern(line: string): boolean {
    // Detect useEffect with callback dependency (the PropheticCountdown pattern)
    return /useEffect\([^,]+,\s*\[[^}]*[a-zA-Z]+Callback[^}]*\]/.test(line);
  }

  private hasMissingDependenciesPattern(line: string): boolean {
    return line.includes("eslint-disable") && line.includes("exhaustive-deps");
  }

  private hasConditionalHooksPattern(line: string): boolean {
    return /if\s*\([^)]+\)\s*{[^}]*use[A-Z]/.test(line);
  }

  private hasSetStateInRenderPattern(line: string): boolean {
    // Check for setState without being in useEffect or event handler
    return (
      /set[A-Z]\w*\(/.test(line) &&
      !line.includes("useEffect") &&
      !line.includes("onClick") &&
      !line.includes("onChange") &&
      !line.includes("onSubmit") &&
      !line.includes("=>")
    );
  }

  private hasUnthrottledEventPattern(line: string): boolean {
    return (
      (/onMouseMove\s*=/.test(line) || /onScroll\s*=/.test(line)) &&
      !line.includes("throttle") &&
      !line.includes("debounce")
    );
  }

  private suggestFix(message: any): string {
    if (message.message.includes("missing dependency")) {
      return "Add the missing dependency to the array";
    }
    if (message.message.includes("conditional")) {
      return "Move hook to top level of component";
    }
    if (message.message.includes("exhaustive-deps")) {
      return "Include all dependencies or use useCallback";
    }
    return "Review React Hooks rules";
  }

  private async getComponentFiles(): Promise<string[]> {
    return glob("src/components/**/*.tsx");
  }

  private async safeReadFile(filePath: string): Promise<string | null> {
    try {
      return await fs.readFile(filePath, "utf-8");
    } catch (error) {
      console.warn(`Failed to read file ${filePath}:`, error);
      return null;
    }
  }

  async generateReport(violations: HookViolation[]): Promise<void> {
    console.log("\n📊 React Hooks Safety Report\n");

    if (violations.length === 0) {
      console.log(
        "✅ No hooks violations found! Your 7ms performance is safe.\n",
      );
      return;
    }

    console.log(`⚠️  Found ${violations.length} hooks violations:\n`);

    // Group by severity
    const errors = violations.filter((v) => v.severity === "error");
    const warnings = violations.filter((v) => v.severity === "warning");

    if (errors.length > 0) {
      console.log("🚨 CRITICAL ERRORS:");
      for (const violation of errors) {
        console.log(`📍 ${violation.file}:${violation.line}`);
        console.log(`   ERROR: ${violation.message}`);
        console.log(`   💡 Fix: ${violation.fix}\n`);
      }
    }

    if (warnings.length > 0) {
      console.log("⚠️  WARNINGS:");
      for (const violation of warnings) {
        console.log(`📍 ${violation.file}:${violation.line}`);
        console.log(`   WARNING: ${violation.message}`);
        console.log(`   💡 Fix: ${violation.fix}\n`);
      }
    }

    // Performance impact assessment
    const criticalCount = errors.length;
    if (criticalCount > 0) {
      console.log(
        "🚨 PERFORMANCE RISK: These violations can degrade your 7ms response time!",
      );
      console.log("   Fix immediately to maintain championship performance.\n");
    }

    // Pattern summary
    console.log("📈 VIOLATION PATTERNS:");
    const patterns = violations.reduce(
      (acc, v) => {
        acc[v.pattern] = (acc[v.pattern] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>,
    );

    Object.entries(patterns).forEach(([pattern, count]) => {
      console.log(`   ${pattern}: ${count} occurrences`);
    });

    console.log("\n🛡️ RECOMMENDATIONS:");
    if (errors.some((e) => e.pattern === "callback-dependency")) {
      console.log(
        "   • Install ESLint react-hooks plugin for automatic detection",
      );
      console.log(
        "   • Review useEffect dependencies - avoid callback dependencies",
      );
    }
    if (errors.some((e) => e.pattern === "setState-in-render")) {
      console.log("   • Move setState calls to useEffect or event handlers");
      console.log(
        "   • Use React.StrictMode to catch these issues in development",
      );
    }
    if (warnings.some((w) => w.pattern === "unthrottled-event")) {
      console.log("   • Implement throttling for mouse/scroll events");
      console.log(
        "   • Consider using requestAnimationFrame for smooth animations",
      );
    }
  }
}

// Run the checker
async function main() {
  const checker = new ReactHooksSafetyChecker();
  const violations = await checker.checkHooksSafety();
  await checker.generateReport(violations);

  // Exit with error code if critical violations found
  const criticalCount = violations.filter((v) => v.severity === "error").length;
  process.exit(criticalCount > 0 ? 1 : 0);
}

if (require.main === module) {
  main().catch(console.error);
}

export { ReactHooksSafetyChecker };

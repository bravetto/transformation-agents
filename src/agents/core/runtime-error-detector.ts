import { BaseDivineAgent } from "./base-agent";
import { CascadeRiskAssessment } from "../types";
import * as fs from "fs/promises";
import * as path from "path";
import { glob } from "glob";

interface RuntimeError {
  type:
    | "hooks-violation"
    | "infinite-loop"
    | "memory-leak"
    | "performance-degradation";
  component: string;
  location: string;
  pattern: string;
  severity: "critical" | "high" | "medium" | "low";
  impact: string;
  fix: string;
  lineNumber?: number;
}

export class RuntimeErrorDetector extends BaseDivineAgent {
  constructor() {
    super("RuntimeErrorDetector");
    this.role = "guardian";
  }

  async scan() {
    console.log(`🚨 [${this.name}] Scanning for runtime error patterns...`);

    const hooksViolations = await this.detectHooksViolations();
    const infiniteLoops = await this.detectInfiniteLoopPatterns();
    const performanceIssues = await this.detectPerformanceAntiPatterns();
    const unusedImports = await this.detectUnusedComponentImports();

    const findings = [
      ...hooksViolations,
      ...infiniteLoops,
      ...performanceIssues,
      ...unusedImports,
    ];

    const recommendations = this.generateRuntimeRecommendations(findings);

    return this.createReport(findings, recommendations);
  }

  private async detectHooksViolations(): Promise<RuntimeError[]> {
    const errors: RuntimeError[] = [];
    const files = await this.getComponentFiles();

    for (const file of files) {
      const content = await this.safeReadFile(file);
      if (!content) continue;

      // Pattern 1: setState in useEffect without dependencies
      if (this.hasUnconditionalSetState(content)) {
        errors.push({
          type: "hooks-violation",
          component: this.getComponentName(file),
          location: file,
          pattern: "setState in useEffect without dependencies",
          severity: "critical",
          impact: "Causes infinite render loops, degrades performance to 0",
          fix: "Add proper dependencies array or move setState outside effect",
          lineNumber: this.findLineNumber(
            content,
            /useEffect\s*\(\s*\(\s*\)\s*=>\s*{[^}]*set[A-Z]/,
          ),
        });
      }

      // Pattern 2: Missing dependencies in hooks
      if (this.hasMissingDependencies(content)) {
        errors.push({
          type: "hooks-violation",
          component: this.getComponentName(file),
          location: file,
          pattern: "Missing dependencies in useEffect/useCallback",
          severity: "high",
          impact: "Stale closures, incorrect behavior, potential memory leaks",
          fix: "Add all referenced variables to dependency array",
          lineNumber: this.findLineNumber(
            content,
            /eslint-disable.*exhaustive-deps/,
          ),
        });
      }

      // Pattern 3: Conditional hooks
      if (this.hasConditionalHooks(content)) {
        errors.push({
          type: "hooks-violation",
          component: this.getComponentName(file),
          location: file,
          pattern: "Hooks called conditionally",
          severity: "critical",
          impact: "React hooks rules violation, app will crash",
          fix: "Move hooks to top level of component, use conditions inside hooks",
          lineNumber: this.findLineNumber(
            content,
            /if\s*\([^)]+\)\s*{[^}]*use[A-Z]/,
          ),
        });
      }
    }

    return errors;
  }

  private async detectInfiniteLoopPatterns(): Promise<RuntimeError[]> {
    const errors: RuntimeError[] = [];
    const files = await this.getComponentFiles();

    for (const file of files) {
      const content = await this.safeReadFile(file);
      if (!content) continue;

      // Pattern: useEffect with function dependency (like PropheticCountdown had)
      if (this.hasCallbackDependency(content)) {
        errors.push({
          type: "infinite-loop",
          component: this.getComponentName(file),
          location: file,
          pattern: "useEffect depends on useCallback that changes every render",
          severity: "critical",
          impact: "Infinite re-render loop, maximum update depth exceeded",
          fix: "Remove callback from dependencies, use only stable values",
          lineNumber: this.findLineNumber(
            content,
            /useEffect\([^,]+,\s*\[[^}]*[a-zA-Z]+Callback[^}]*\]/,
          ),
        });
      }

      // Pattern: Mouse/scroll events without throttling
      if (this.hasUnthrottledEvents(content)) {
        errors.push({
          type: "infinite-loop",
          component: this.getComponentName(file),
          location: file,
          pattern: "Unthrottled mouse/scroll event handlers",
          severity: "high",
          impact: "Can trigger thousands of updates per second",
          fix: "Use throttle/debounce or requestAnimationFrame",
        });
      }

      // Pattern: Recursive state updates
      if (this.hasRecursiveStatePattern(content)) {
        errors.push({
          type: "infinite-loop",
          component: this.getComponentName(file),
          location: file,
          pattern: "Recursive state update pattern detected",
          severity: "critical",
          impact: "Maximum update depth exceeded errors",
          fix: "Break recursion with proper conditions or refs",
        });
      }
    }

    return errors;
  }

  private async detectPerformanceAntiPatterns(): Promise<RuntimeError[]> {
    const errors: RuntimeError[] = [];
    const files = await this.getComponentFiles();

    for (const file of files) {
      const content = await this.safeReadFile(file);
      if (!content) continue;

      // Pattern: Large operations in render
      if (this.hasExpensiveRenderOperations(content)) {
        errors.push({
          type: "performance-degradation",
          component: this.getComponentName(file),
          location: file,
          pattern: "Expensive operations in render method",
          severity: "medium",
          impact: "Degrades 7ms response time to 100ms+",
          fix: "Use useMemo for expensive calculations",
        });
      }

      // Pattern: Missing React.memo
      if (this.shouldHaveReactMemo(content)) {
        errors.push({
          type: "performance-degradation",
          component: this.getComponentName(file),
          location: file,
          pattern: "Component rerenders unnecessarily",
          severity: "low",
          impact: "Unnecessary rerenders affect child components",
          fix: "Wrap with React.memo if props rarely change",
        });
      }
    }

    return errors;
  }

  private async detectUnusedComponentImports(): Promise<RuntimeError[]> {
    const errors: RuntimeError[] = [];
    const files = await this.getComponentFiles();

    for (const file of files) {
      const content = await this.safeReadFile(file);
      if (!content) continue;

      const imports = this.extractComponentImports(content);

      for (const imp of imports) {
        if (!this.isComponentUsed(content, imp.name)) {
          errors.push({
            type: "performance-degradation",
            component: this.getComponentName(file),
            location: file,
            pattern: `Unused import: ${imp.name}`,
            severity: "medium",
            impact: "Component code executes even when not rendered",
            fix: `Remove unused import of ${imp.name}`,
          });
        }
      }
    }

    return errors;
  }

  // Pattern detection helpers
  private hasUnconditionalSetState(content: string): boolean {
    // Detect setState inside useEffect without proper deps
    const effectPattern =
      /useEffect\s*\(\s*\(\s*\)\s*=>\s*{[^}]*set[A-Z]\w*\([^}]*\)\s*[^}]*}\s*,\s*\[\s*\]\s*\)/;
    return effectPattern.test(content);
  }

  private hasCallbackDependency(content: string): boolean {
    // Detect useEffect with callback dependency (the PropheticCountdown pattern)
    const pattern = /useEffect\([^,]+,\s*\[[^}]*[a-zA-Z]+Callback[^}]*\]/;
    return pattern.test(content);
  }

  private hasMissingDependencies(content: string): boolean {
    // This is simplified - in production you'd use ESLint AST
    const pattern = /useEffect|useCallback|useMemo/;
    return pattern.test(content) && content.includes("eslint-disable-line");
  }

  private hasConditionalHooks(content: string): boolean {
    // Detect if/else before hooks
    const pattern = /if\s*\([^)]+\)\s*{[^}]*use[A-Z]/;
    return pattern.test(content);
  }

  private hasUnthrottledEvents(content: string): boolean {
    const mousePattern = /onMouseMove\s*=\s*{[^}]*set[A-Z]/;
    const scrollPattern = /onScroll\s*=\s*{[^}]*set[A-Z]/;
    return mousePattern.test(content) || scrollPattern.test(content);
  }

  private hasRecursiveStatePattern(content: string): boolean {
    // Simplified check for recursive patterns
    return content.includes("Maximum update depth exceeded");
  }

  private hasExpensiveRenderOperations(content: string): boolean {
    // Check for array operations in render
    const patterns = [
      /return\s*\([^)]*\.map\([^)]*\.filter/,
      /return\s*\([^)]*\.sort\(/,
      /return\s*\([^)]*\.reduce\(/,
    ];
    return patterns.some((p) => p.test(content));
  }

  private shouldHaveReactMemo(content: string): boolean {
    // Check if component receives props but isn't memoized
    const hasProps = /function\s+\w+\s*\(\s*{\s*\w+/;
    const hasMemo = /React\.memo|memo\(/;
    return hasProps.test(content) && !hasMemo.test(content);
  }

  private findLineNumber(content: string, pattern: RegExp): number {
    const lines = content.split("\n");
    for (let i = 0; i < lines.length; i++) {
      if (pattern.test(lines[i])) {
        return i + 1;
      }
    }
    return 0;
  }

  protected assessCascadeRisk(findings: RuntimeError[]): CascadeRiskAssessment {
    const criticalCount = findings.filter(
      (f) => f.severity === "critical",
    ).length;
    const highCount = findings.filter((f) => f.severity === "high").length;

    let overallRisk: "low" | "medium" | "high" | "critical" = "low";

    if (criticalCount > 0) {
      overallRisk = "critical";
    } else if (highCount > 2) {
      overallRisk = "high";
    } else if (highCount > 0) {
      overallRisk = "medium";
    }

    const factors = [
      `${criticalCount} infinite loop risks`,
      `${highCount} performance degradation patterns`,
      `${findings.filter((f) => f.type === "hooks-violation").length} React hooks violations`,
    ];

    const mitigations = [
      "Fix all critical issues immediately",
      "Add React.StrictMode for development",
      "Use ESLint react-hooks plugin",
      "Implement performance monitoring",
    ];

    return { overallRisk, factors, mitigations };
  }

  private generateRuntimeRecommendations(findings: RuntimeError[]): string[] {
    const recommendations: string[] = [];

    const criticalFindings = findings.filter((f) => f.severity === "critical");
    if (criticalFindings.length > 0) {
      recommendations.push(
        `🚨 URGENT: Fix ${criticalFindings.length} critical runtime errors to prevent app crashes`,
      );
    }

    const hooksViolations = findings.filter(
      (f) => f.type === "hooks-violation",
    );
    if (hooksViolations.length > 0) {
      recommendations.push(
        "Install ESLint react-hooks plugin: npm install eslint-plugin-react-hooks --save-dev",
        "Add exhaustive-deps rule to catch missing dependencies",
      );
    }

    const performanceIssues = findings.filter(
      (f) => f.type === "performance-degradation",
    );
    if (performanceIssues.length > 0) {
      recommendations.push(
        `Performance at risk: ${performanceIssues.length} patterns threatening 7ms target`,
        "Consider implementing React DevTools Profiler monitoring",
      );
    }

    return recommendations;
  }

  private async getComponentFiles(): Promise<string[]> {
    return glob("src/components/**/*.tsx");
  }

  private getComponentName(filePath: string): string {
    return filePath.split("/").pop()?.replace(".tsx", "") || "Unknown";
  }

  private extractComponentImports(
    content: string,
  ): Array<{ name: string; path: string }> {
    const imports: Array<{ name: string; path: string }> = [];
    const importRegex =
      /import\s+(?:{([^}]+)}|(\w+))\s+from\s+['"]([^'"]+)['"]/g;
    let match;

    while ((match = importRegex.exec(content)) !== null) {
      const name = match[1] || match[2];
      const path = match[3];
      if (path.includes("components")) {
        imports.push({ name: name.trim(), path });
      }
    }

    return imports;
  }

  private isComponentUsed(content: string, componentName: string): boolean {
    // Check if component is used in JSX
    const jsxPattern = new RegExp(`<${componentName}[\\s/>]`);
    return jsxPattern.test(content);
  }

  private async safeReadFile(filePath: string): Promise<string | null> {
    try {
      return await fs.readFile(filePath, "utf-8");
    } catch (error) {
      console.warn(`Failed to read file ${filePath}:`, error);
      return null;
    }
  }
}

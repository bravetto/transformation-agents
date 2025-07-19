#!/usr/bin/env node

/**
 * 🔥 DIVINE ANALYZER - NUCLEAR DEPLOYMENT VALIDATION 🔥
 *
 * Comprehensive analysis and testing system to ensure proper deployment
 * and results every fucking step of the way!
 *
 * DIVINE COMMAND EXECUTION PROTOCOL
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class DivineAnalyzer {
  constructor() {
    this.issues = [];
    this.warnings = [];
    this.successes = [];
    this.criticalErrors = [];
  }

  log(type, message, details = "") {
    const timestamp = new Date().toISOString();
    const entry = { timestamp, type, message, details };

    switch (type) {
      case "CRITICAL":
        this.criticalErrors.push(entry);
        console.error(`🚨 [CRITICAL] ${message}`, details);
        break;
      case "ERROR":
        this.issues.push(entry);
        console.error(`❌ [ERROR] ${message}`, details);
        break;
      case "WARNING":
        this.warnings.push(entry);
        console.warn(`⚠️  [WARNING] ${message}`, details);
        break;
      case "SUCCESS":
        this.successes.push(entry);
        console.log(`✅ [SUCCESS] ${message}`, details);
        break;
      case "INFO":
        console.log(`ℹ️  [INFO] ${message}`, details);
        break;
    }
  }

  // 1. DUPLICATE EXPORT DETECTION
  async checkDuplicateExports() {
    this.log("INFO", "🔍 Scanning for duplicate exports...");

    try {
      // Look specifically for duplicate const/function exports, not interfaces or defaults
      const result = execSync(
        'grep -r "export const DivineParticles" src/ --include="*.tsx" --include="*.ts"',
        { encoding: "utf8" },
      );
      const lines = result.split("\n").filter((line) => line.trim());

      if (lines.length > 1) {
        // More than one const export
        this.log(
          "CRITICAL",
          "Duplicate DivineParticles const exports detected!",
          lines,
        );
        return false;
      }

      this.log("SUCCESS", "No duplicate const exports found");
      return true;
    } catch (error) {
      this.log("SUCCESS", "No DivineParticles const exports found (clean)");
      return true;
    }
  }

  // 2. SSR NAVIGATOR USAGE DETECTION
  async checkSSRNavigatorUsage() {
    this.log("INFO", "🔍 Scanning for unsafe navigator usage...");

    try {
      const result = execSync(
        'grep -r "navigator\\." src/ --include="*.tsx" --include="*.ts" -n -B2 -A1',
        { encoding: "utf8" },
      );
      const lines = result.split("\n").filter((line) => line.trim());

      let hasUnsafeUsage = false;

      for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Skip if this is a context line (starts with --)
        if (line.startsWith("--")) continue;

        // Check if this line contains navigator usage
        if (line.includes("navigator.") && line.includes(":")) {
          const [file, lineNum, content] = line.split(":");

          // Check if navigator usage is properly guarded
          // Look at current line and previous 3 lines for guards
          let isGuarded = false;

          // Check current line
          if (
            content.includes("typeof window") ||
            content.includes("typeof navigator")
          ) {
            isGuarded = true;
          }

          // Check previous lines in the context
          for (let j = Math.max(0, i - 3); j < i; j++) {
            const prevLine = lines[j];
            if (
              prevLine.includes("typeof window") ||
              prevLine.includes("typeof navigator")
            ) {
              isGuarded = true;
              break;
            }
          }

          if (!isGuarded) {
            this.log(
              "CRITICAL",
              `Unsafe navigator usage in ${file}:${lineNum}`,
              content.trim(),
            );
            hasUnsafeUsage = true;
          }
        }
      }

      if (!hasUnsafeUsage) {
        this.log("SUCCESS", "All navigator usage is SSR-safe");
      }

      return !hasUnsafeUsage;
    } catch (error) {
      this.log("SUCCESS", "No navigator usage found (or all safe)");
      return true;
    }
  }

  // 3. INFINITE LOOP PATTERN DETECTION
  async checkInfiniteLoopPatterns() {
    this.log("INFO", "🔍 Scanning for infinite loop patterns...");

    const patterns = [
      {
        pattern: "useEffect.*calculateTimeRemaining.*calculateTimeRemaining",
        desc: "useEffect dependency loop",
      },
      { pattern: "useMemo.*\\[.*useMemo", desc: "useMemo circular dependency" },
      {
        pattern: "useState.*useEffect.*useState",
        desc: "useState-useEffect loop",
      },
    ];

    let hasIssues = false;

    for (const { pattern, desc } of patterns) {
      try {
        const result = execSync(
          `grep -r "${pattern}" src/ --include="*.tsx" --include="*.ts" -n`,
          { encoding: "utf8" },
        );
        if (result.trim()) {
          this.log("ERROR", `Potential infinite loop: ${desc}`, result.trim());
          hasIssues = true;
        }
      } catch (error) {
        // No matches found - good!
      }
    }

    if (!hasIssues) {
      this.log("SUCCESS", "No infinite loop patterns detected");
    }

    return !hasIssues;
  }

  // 4. PERFORMANCE MONITORING
  async checkPerformanceMetrics() {
    this.log("INFO", "🔍 Checking performance monitoring setup...");

    try {
      // Check if render count tracking exists
      const renderTrackingResult = execSync(
        'grep -r "renderCount" src/ --include="*.tsx" -c',
        { encoding: "utf8" },
      );
      const files = renderTrackingResult
        .split("\n")
        .filter((line) => line.includes(":")).length;

      if (files < 2) {
        this.log(
          "WARNING",
          "Insufficient render count tracking",
          `Only ${files} files have tracking`,
        );
      } else {
        this.log("SUCCESS", `Render tracking active in ${files} files`);
      }

      // Check for console.warn usage for excessive renders
      const warningResult = execSync(
        'grep -r "excessive renders" src/ --include="*.tsx" -c',
        { encoding: "utf8" },
      );
      const warningFiles = warningResult
        .split("\n")
        .filter((line) => line.includes(":")).length;

      if (warningFiles < 2) {
        this.log(
          "WARNING",
          "Insufficient render warnings",
          `Only ${warningFiles} files have warnings`,
        );
      } else {
        this.log("SUCCESS", `Render warnings active in ${warningFiles} files`);
      }

      return true;
    } catch (error) {
      this.log("ERROR", "Could not check performance metrics", error.message);
      return false;
    }
  }

  // 5. BUILD VALIDATION
  async validateBuild() {
    this.log("INFO", "🔍 Validating build configuration...");

    try {
      // Check if TypeScript compiles for our critical components
      const result = execSync("npx tsc --noEmit 2>&1", { encoding: "utf8" });

      // Check for critical errors in our main components
      const criticalErrors = result
        .split("\n")
        .filter(
          (line) =>
            line.includes("prophetic-countdown") ||
            line.includes("divine-particles") ||
            line.includes("circuit-breaker") ||
            line.includes("divine-impact-dashboard"),
        );

      if (criticalErrors.length > 0) {
        this.log(
          "CRITICAL",
          "Critical component TypeScript errors found",
          criticalErrors.join("\n"),
        );
        return false;
      }

      // Count total errors but don't fail for non-critical ones
      const totalErrors = result
        .split("\n")
        .filter((line) => line.includes("error TS")).length;

      if (totalErrors > 0) {
        this.log(
          "WARNING",
          `${totalErrors} TypeScript errors found in non-critical files`,
          "Build will still work",
        );
      } else {
        this.log("SUCCESS", "TypeScript compilation successful");
      }

      return true;
    } catch (error) {
      this.log("ERROR", "TypeScript check failed", error.message);
      return false;
    }
  }

  // 6. RUNTIME VALIDATION
  async validateRuntime(port = 4012) {
    this.log("INFO", `🔍 Validating runtime on port ${port}...`);

    try {
      // Start server and test
      const testUrl = `http://localhost:${port}`;

      // Test if server responds
      const curlResult = execSync(
        `curl -s -o /dev/null -w "%{http_code}" ${testUrl}`,
        { encoding: "utf8" },
      );

      if (curlResult.trim() === "200") {
        this.log("SUCCESS", `Server responding on port ${port}`);
        return true;
      } else {
        this.log("ERROR", `Server not responding properly: ${curlResult}`);
        return false;
      }
    } catch (error) {
      this.log("ERROR", "Runtime validation failed", error.message);
      return false;
    }
  }

  // 7. COMPREHENSIVE REPORT
  generateReport() {
    console.log("\n🔥 DIVINE ANALYZER REPORT 🔥\n");

    console.log(`✅ Successes: ${this.successes.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    console.log(`❌ Errors: ${this.issues.length}`);
    console.log(`🚨 Critical: ${this.criticalErrors.length}\n`);

    if (this.criticalErrors.length > 0) {
      console.log("🚨 CRITICAL ISSUES REQUIRING IMMEDIATE ATTENTION:");
      this.criticalErrors.forEach((issue) => {
        console.log(`   ${issue.message}`);
        if (issue.details) console.log(`   Details: ${issue.details}`);
      });
      console.log("");
    }

    if (this.issues.length > 0) {
      console.log("❌ ERRORS TO FIX:");
      this.issues.forEach((issue) => {
        console.log(`   ${issue.message}`);
      });
      console.log("");
    }

    if (this.warnings.length > 0) {
      console.log("⚠️  WARNINGS TO MONITOR:");
      this.warnings.forEach((warning) => {
        console.log(`   ${warning.message}`);
      });
      console.log("");
    }

    const overallStatus =
      this.criticalErrors.length === 0 && this.issues.length === 0;

    if (overallStatus) {
      console.log("🎉 DIVINE ANALYZER: ALL SYSTEMS OPERATIONAL! 🎉");
    } else {
      console.log(
        "🔥 DIVINE ANALYZER: ISSUES DETECTED - REQUIRES INTERVENTION! 🔥",
      );
    }

    return overallStatus;
  }

  // MAIN EXECUTION
  async runFullAnalysis(includeRuntime = false, port = 4012) {
    console.log(
      "🚀 DIVINE ANALYZER - NUCLEAR DEPLOYMENT VALIDATION STARTING 🚀\n",
    );

    const checks = [
      { name: "Duplicate Exports", fn: () => this.checkDuplicateExports() },
      { name: "SSR Navigator Usage", fn: () => this.checkSSRNavigatorUsage() },
      {
        name: "Infinite Loop Patterns",
        fn: () => this.checkInfiniteLoopPatterns(),
      },
      {
        name: "Performance Monitoring",
        fn: () => this.checkPerformanceMetrics(),
      },
      { name: "Build Validation", fn: () => this.validateBuild() },
    ];

    if (includeRuntime) {
      checks.push({
        name: "Runtime Validation",
        fn: () => this.validateRuntime(port),
      });
    }

    let allPassed = true;

    for (const check of checks) {
      this.log("INFO", `Running ${check.name}...`);
      const result = await check.fn();
      if (!result) allPassed = false;
      console.log(""); // Spacing
    }

    const reportStatus = this.generateReport();

    return allPassed && reportStatus;
  }
}

// CLI EXECUTION
if (require.main === module) {
  const args = process.argv.slice(2);
  const includeRuntime = args.includes("--runtime");
  const port = args.includes("--port")
    ? args[args.indexOf("--port") + 1]
    : 4012;

  const analyzer = new DivineAnalyzer();

  analyzer
    .runFullAnalysis(includeRuntime, port)
    .then((success) => {
      process.exit(success ? 0 : 1);
    })
    .catch((error) => {
      console.error("🚨 DIVINE ANALYZER CRASHED:", error);
      process.exit(1);
    });
}

module.exports = DivineAnalyzer;

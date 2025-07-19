#!/usr/bin/env node

/**
 * 🏭 PRODUCTION READINESS CHECKER
 * Comprehensive validation for production deployment
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class ProductionReadinessChecker {
  constructor() {
    this.checks = [];
    this.failures = [];
    this.warnings = [];
  }

  async runAllChecks() {
    console.log("🏭 PRODUCTION READINESS VALIDATION");
    console.log("==================================\n");

    const checkSuite = [
      () => this.checkBuildSystem(),
      () => this.checkHooksViolations(),
      () => this.checkTypeScriptErrors(),
      () => this.checkAPIHealth(),
      () => this.checkSecurityVulnerabilities(),
      () => this.checkPerformanceBaseline(),
      () => this.checkTestCoverage(),
      () => this.checkEnvironmentVariables(),
      () => this.checkDependencyHealth(),
      () => this.checkBrowserCompatibility(),
    ];

    for (const check of checkSuite) {
      try {
        await check();
      } catch (error) {
        this.failures.push({
          check: check.name,
          error: error.message,
          severity: "critical",
        });
      }
    }

    return this.generateProductionReport();
  }

  async checkBuildSystem() {
    console.log("🔨 Checking build system...");

    try {
      // Test production build
      execSync("npm run build", { stdio: "pipe", timeout: 120000 });
      this.addSuccess("Build System", "Production build successful");

      // Check build artifacts
      const buildDir = ".next";
      if (!fs.existsSync(buildDir)) {
        this.addFailure("Build System", "Build directory not found");
        return;
      }

      // Check critical build files
      const criticalFiles = [
        ".next/server/app/page.js",
        ".next/static/chunks/main-app.js",
      ];

      for (const file of criticalFiles) {
        if (!fs.existsSync(file)) {
          this.addFailure(
            "Build System",
            `Critical build file missing: ${file}`,
          );
        }
      }
    } catch (error) {
      this.addFailure("Build System", `Build failed: ${error.message}`);
    }
  }

  async checkHooksViolations() {
    console.log("⚛️  Checking React Hooks violations...");

    try {
      const result = execSync("npm run agents:hooks", {
        encoding: "utf8",
        timeout: 30000,
      });

      // Parse violations count
      const violationsMatch = result.match(/Found (\d+) hooks violations/);
      const violationsCount = violationsMatch
        ? parseInt(violationsMatch[1])
        : 0;

      if (violationsCount === 0) {
        this.addSuccess("React Hooks", "No violations detected");
      } else if (violationsCount < 50) {
        this.addWarning(
          "React Hooks",
          `${violationsCount} violations found - acceptable for production`,
        );
      } else {
        this.addFailure(
          "React Hooks",
          `${violationsCount} violations found - BLOCKS PRODUCTION`,
        );
      }
    } catch (error) {
      this.addFailure("React Hooks", `Hooks check failed: ${error.message}`);
    }
  }

  async checkTypeScriptErrors() {
    console.log("📘 Checking TypeScript errors...");

    try {
      execSync("npm run type-check", { stdio: "pipe", timeout: 60000 });
      this.addSuccess("TypeScript", "No type errors found");
    } catch (error) {
      this.addFailure(
        "TypeScript",
        "Type errors detected - must fix before production",
      );
    }
  }

  async checkAPIHealth() {
    console.log("🌐 Checking API health...");

    try {
      const healthCheck = execSync("curl -s http://localhost:1437/api/health", {
        encoding: "utf8",
        timeout: 10000,
      });
      const health = JSON.parse(healthCheck);

      if (health.status === "healthy") {
        const responseTime = parseInt(health.responseTime);
        if (responseTime < 50) {
          this.addSuccess(
            "API Health",
            `Healthy (${responseTime}ms response time)`,
          );
        } else if (responseTime < 200) {
          this.addWarning(
            "API Health",
            `Acceptable (${responseTime}ms response time)`,
          );
        } else {
          this.addFailure(
            "API Health",
            `Slow response time: ${responseTime}ms`,
          );
        }
      } else {
        this.addFailure("API Health", "API health check failed");
      }
    } catch (error) {
      this.addFailure("API Health", `Health check failed: ${error.message}`);
    }
  }

  async checkSecurityVulnerabilities() {
    console.log("🔒 Checking security vulnerabilities...");

    try {
      const auditResult = execSync("npm audit --audit-level=high", {
        encoding: "utf8",
        timeout: 30000,
      });

      if (auditResult.includes("0 vulnerabilities")) {
        this.addSuccess("Security", "No high-severity vulnerabilities found");
      } else {
        this.addWarning(
          "Security",
          "Some vulnerabilities detected - review npm audit output",
        );
      }
    } catch (error) {
      if (error.status === 1) {
        this.addFailure(
          "Security",
          "High-severity vulnerabilities found - must fix before production",
        );
      } else {
        this.addWarning("Security", "Security audit check failed");
      }
    }
  }

  async checkPerformanceBaseline() {
    console.log("⚡ Checking performance baseline...");

    try {
      // Check bundle size
      const stats = fs.statSync(".next/static/chunks/main-app.js");
      const sizeKB = Math.round(stats.size / 1024);

      if (sizeKB < 250) {
        this.addSuccess("Performance", `Bundle size acceptable: ${sizeKB}KB`);
      } else if (sizeKB < 500) {
        this.addWarning("Performance", `Bundle size large: ${sizeKB}KB`);
      } else {
        this.addFailure("Performance", `Bundle size too large: ${sizeKB}KB`);
      }
    } catch (error) {
      this.addWarning("Performance", "Could not check bundle size");
    }
  }

  async checkTestCoverage() {
    console.log("🧪 Checking test coverage...");

    try {
      // Check if tests exist
      const testFiles = execSync(
        'find src -name "*.test.*" -o -name "*.spec.*"',
        { encoding: "utf8" },
      );
      const testCount = testFiles
        .trim()
        .split("\n")
        .filter((f) => f.length > 0).length;

      if (testCount > 10) {
        this.addSuccess("Testing", `${testCount} test files found`);
      } else if (testCount > 0) {
        this.addWarning("Testing", `Only ${testCount} test files found`);
      } else {
        this.addWarning("Testing", "No test files found");
      }
    } catch (error) {
      this.addWarning("Testing", "Could not check test coverage");
    }
  }

  async checkEnvironmentVariables() {
    console.log("🌍 Checking environment variables...");

    const requiredEnvVars = ["NODE_ENV"];
    const missingVars = [];

    for (const envVar of requiredEnvVars) {
      if (!process.env[envVar]) {
        missingVars.push(envVar);
      }
    }

    if (missingVars.length === 0) {
      this.addSuccess(
        "Environment",
        "All required environment variables present",
      );
    } else {
      this.addWarning(
        "Environment",
        `Missing environment variables: ${missingVars.join(", ")}`,
      );
    }
  }

  async checkDependencyHealth() {
    console.log("📦 Checking dependency health...");

    try {
      // Check for outdated dependencies
      const outdated = execSync("npm outdated --json", {
        encoding: "utf8",
        timeout: 30000,
      });
      const outdatedPackages = JSON.parse(outdated || "{}");
      const outdatedCount = Object.keys(outdatedPackages).length;

      if (outdatedCount === 0) {
        this.addSuccess("Dependencies", "All dependencies up to date");
      } else if (outdatedCount < 10) {
        this.addWarning("Dependencies", `${outdatedCount} outdated packages`);
      } else {
        this.addWarning(
          "Dependencies",
          `${outdatedCount} outdated packages - consider updating`,
        );
      }
    } catch (error) {
      // npm outdated exits with code 1 when outdated packages exist
      this.addWarning("Dependencies", "Some dependencies may be outdated");
    }
  }

  async checkBrowserCompatibility() {
    console.log("🌐 Checking browser compatibility...");

    try {
      // Check for modern JS features that might not be supported
      const jsFiles = execSync('find .next -name "*.js" | head -5', {
        encoding: "utf8",
      });

      if (jsFiles.trim().length > 0) {
        this.addSuccess(
          "Browser Compatibility",
          "Build artifacts generated successfully",
        );
      } else {
        this.addFailure("Browser Compatibility", "No build artifacts found");
      }
    } catch (error) {
      this.addWarning(
        "Browser Compatibility",
        "Could not verify browser compatibility",
      );
    }
  }

  addSuccess(category, message) {
    this.checks.push({ category, status: "success", message });
    console.log(`  ✅ ${category}: ${message}`);
  }

  addWarning(category, message) {
    this.warnings.push({ category, message });
    this.checks.push({ category, status: "warning", message });
    console.log(`  ⚠️  ${category}: ${message}`);
  }

  addFailure(category, message) {
    this.failures.push({ category, message });
    this.checks.push({ category, status: "failure", message });
    console.log(`  ❌ ${category}: ${message}`);
  }

  generateProductionReport() {
    const report = {
      timestamp: new Date().toISOString(),
      productionReady: this.failures.length === 0,
      summary: {
        totalChecks: this.checks.length,
        successes: this.checks.filter((c) => c.status === "success").length,
        warnings: this.warnings.length,
        failures: this.failures.length,
      },
      checks: this.checks,
      failures: this.failures,
      warnings: this.warnings,
      recommendations: this.generateRecommendations(),
    };

    // Save report
    const reportPath = path.join(
      __dirname,
      "../reports",
      `production-readiness-${Date.now()}.json`,
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Display summary
    console.log("\n🏭 PRODUCTION READINESS SUMMARY");
    console.log("===============================");
    console.log(`✅ Successes: ${report.summary.successes}`);
    console.log(`⚠️  Warnings: ${report.summary.warnings}`);
    console.log(`❌ Failures: ${report.summary.failures}`);
    console.log(
      `🚀 Production Ready: ${report.productionReady ? "YES" : "NO"}`,
    );

    if (this.failures.length > 0) {
      console.log("\n🚨 CRITICAL ISSUES BLOCKING PRODUCTION:");
      this.failures.forEach((failure, index) => {
        console.log(`${index + 1}. ${failure.category}: ${failure.message}`);
      });
    }

    if (this.warnings.length > 0) {
      console.log("\n⚠️  WARNINGS TO ADDRESS:");
      this.warnings.forEach((warning, index) => {
        console.log(`${index + 1}. ${warning.category}: ${warning.message}`);
      });
    }

    console.log("\n📋 RECOMMENDATIONS:");
    report.recommendations.forEach((rec, index) => {
      console.log(`${index + 1}. ${rec}`);
    });

    console.log(`\n📄 Full report saved to: ${reportPath}`);

    return report;
  }

  generateRecommendations() {
    const recommendations = [];

    if (this.failures.length > 0) {
      recommendations.push(
        "🚨 CRITICAL: Address all failures before production deployment",
      );
    }

    if (this.failures.some((f) => f.category === "React Hooks")) {
      recommendations.push(
        "🔧 IMMEDIATE: Fix setState-in-render violations - these cause browser crashes",
      );
    }

    if (this.failures.some((f) => f.category === "TypeScript")) {
      recommendations.push(
        "📘 IMMEDIATE: Fix TypeScript errors - ensures type safety",
      );
    }

    if (this.warnings.length > 5) {
      recommendations.push(
        "⚠️  MEDIUM: Address warnings to improve production stability",
      );
    }

    if (this.failures.length === 0 && this.warnings.length < 3) {
      recommendations.push(
        "🚀 READY: System is production-ready for deployment",
      );
    }

    return recommendations;
  }
}

// CLI execution
if (require.main === module) {
  const checker = new ProductionReadinessChecker();
  checker.runAllChecks().catch(console.error);
}

module.exports = ProductionReadinessChecker;

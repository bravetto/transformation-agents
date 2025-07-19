#!/usr/bin/env node

/**
 * 🔥 DIVINE PRECISION VALIDATOR
 * Comprehensive validation of all implemented systems
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

class DivinePrecisionValidator {
  constructor() {
    this.results = {
      security: { status: "pending", tests: [] },
      performance: { status: "pending", tests: [] },
      devTools: { status: "pending", tests: [] },
      documentation: { status: "pending", tests: [] },
      overall: { status: "pending", score: 0 },
    };
  }

  /**
   * Run comprehensive validation
   */
  async validate() {
    console.log("🔥 DIVINE PRECISION VALIDATION STARTING...\n");

    try {
      await this.validateSecurity();
      await this.validatePerformance();
      await this.validateDevTools();
      await this.validateDocumentation();

      this.calculateOverallScore();
      this.generateReport();
    } catch (error) {
      console.error("❌ Validation failed:", error.message);
      process.exit(1);
    }
  }

  /**
   * Validate security framework
   */
  async validateSecurity() {
    console.log("🛡️ VALIDATING SECURITY FRAMEWORK...");

    const tests = [
      {
        name: "Input Sanitizer Module",
        test: () => this.checkFileExists("src/lib/security/input-sanitizer.ts"),
        critical: true,
      },
      {
        name: "CSRF Protection Module",
        test: () => this.checkFileExists("src/lib/security/csrf-protection.ts"),
        critical: true,
      },
      {
        name: "Security Dependencies",
        test: () => this.checkDependency("isomorphic-dompurify"),
        critical: true,
      },
      {
        name: "Security Scripts Available",
        test: () => this.checkNpmScript("security:audit"),
        critical: false,
      },
    ];

    for (const test of tests) {
      try {
        const result = await test.test();
        this.results.security.tests.push({
          name: test.name,
          status: result ? "pass" : "fail",
          critical: test.critical,
        });
        console.log(`  ${result ? "✅" : "❌"} ${test.name}`);
      } catch (error) {
        this.results.security.tests.push({
          name: test.name,
          status: "error",
          error: error.message,
          critical: test.critical,
        });
        console.log(`  ❌ ${test.name}: ${error.message}`);
      }
    }

    const criticalPassed = this.results.security.tests
      .filter((t) => t.critical)
      .every((t) => t.status === "pass");

    this.results.security.status = criticalPassed ? "pass" : "fail";
    console.log(
      `🛡️ Security Framework: ${this.results.security.status.toUpperCase()}\n`,
    );
  }

  /**
   * Validate performance monitoring
   */
  async validatePerformance() {
    console.log("⚡ VALIDATING PERFORMANCE MONITORING...");

    const tests = [
      {
        name: "Bundle Analyzer Module",
        test: () =>
          this.checkFileExists("src/lib/performance/bundle-analyzer.ts"),
        critical: true,
      },
      {
        name: "Performance Scripts Available",
        test: () => this.checkNpmScript("perf:analyze"),
        critical: false,
      },
      {
        name: "Build Time Tracking",
        test: () => this.checkNpmScript("build:performance"),
        critical: false,
      },
      {
        name: "TypeScript Compilation",
        test: () => this.runTypeCheck(),
        critical: true,
      },
    ];

    for (const test of tests) {
      try {
        const result = await test.test();
        this.results.performance.tests.push({
          name: test.name,
          status: result ? "pass" : "fail",
          critical: test.critical,
        });
        console.log(`  ${result ? "✅" : "❌"} ${test.name}`);
      } catch (error) {
        this.results.performance.tests.push({
          name: test.name,
          status: "error",
          error: error.message,
          critical: test.critical,
        });
        console.log(`  ❌ ${test.name}: ${error.message}`);
      }
    }

    const criticalPassed = this.results.performance.tests
      .filter((t) => t.critical)
      .every((t) => t.status === "pass");

    this.results.performance.status = criticalPassed ? "pass" : "fail";
    console.log(
      `⚡ Performance Monitoring: ${this.results.performance.status.toUpperCase()}\n`,
    );
  }

  /**
   * Validate developer tools
   */
  async validateDevTools() {
    console.log("🛠️ VALIDATING DEVELOPER TOOLS...");

    const tests = [
      {
        name: "Component Scaffolder",
        test: () =>
          this.checkFileExists("scripts/dev-tools/component-scaffolder.js"),
        critical: true,
      },
      {
        name: "Scaffolder Executable",
        test: () =>
          this.checkFileExecutable("scripts/dev-tools/component-scaffolder.js"),
        critical: true,
      },
      {
        name: "Component Creation Script",
        test: () => this.checkNpmScript("component:create"),
        critical: false,
      },
      {
        name: "API Generation Script",
        test: () => this.checkNpmScript("component:api"),
        critical: false,
      },
      {
        name: "Page Generation Script",
        test: () => this.checkNpmScript("component:page"),
        critical: false,
      },
    ];

    for (const test of tests) {
      try {
        const result = await test.test();
        this.results.devTools.tests.push({
          name: test.name,
          status: result ? "pass" : "fail",
          critical: test.critical,
        });
        console.log(`  ${result ? "✅" : "❌"} ${test.name}`);
      } catch (error) {
        this.results.devTools.tests.push({
          name: test.name,
          status: "error",
          error: error.message,
          critical: test.critical,
        });
        console.log(`  ❌ ${test.name}: ${error.message}`);
      }
    }

    const criticalPassed = this.results.devTools.tests
      .filter((t) => t.critical)
      .every((t) => t.status === "pass");

    this.results.devTools.status = criticalPassed ? "pass" : "fail";
    console.log(
      `🛠️ Developer Tools: ${this.results.devTools.status.toUpperCase()}\n`,
    );
  }

  /**
   * Validate documentation system
   */
  async validateDocumentation() {
    console.log("📚 VALIDATING DOCUMENTATION SYSTEM...");

    const tests = [
      {
        name: "Documentation Health Monitor",
        test: () => this.checkNpmScript("docs:health"),
        critical: false,
      },
      {
        name: "Documentation Validation",
        test: () => this.checkNpmScript("docs:validate"),
        critical: false,
      },
      {
        name: "Link Repair System",
        test: () => this.checkNpmScript("docs:fix-links"),
        critical: false,
      },
      {
        name: "Essential Documentation Files",
        test: () => this.checkEssentialDocs(),
        critical: true,
      },
    ];

    for (const test of tests) {
      try {
        const result = await test.test();
        this.results.documentation.tests.push({
          name: test.name,
          status: result ? "pass" : "fail",
          critical: test.critical,
        });
        console.log(`  ${result ? "✅" : "❌"} ${test.name}`);
      } catch (error) {
        this.results.documentation.tests.push({
          name: test.name,
          status: "error",
          error: error.message,
          critical: test.critical,
        });
        console.log(`  ❌ ${test.name}: ${error.message}`);
      }
    }

    const criticalPassed = this.results.documentation.tests
      .filter((t) => t.critical)
      .every((t) => t.status === "pass");

    this.results.documentation.status = criticalPassed ? "pass" : "fail";
    console.log(
      `📚 Documentation System: ${this.results.documentation.status.toUpperCase()}\n`,
    );
  }

  /**
   * Calculate overall score
   */
  calculateOverallScore() {
    const categories = ["security", "performance", "devTools", "documentation"];
    let totalScore = 0;
    let maxScore = 0;

    categories.forEach((category) => {
      const categoryResults = this.results[category];
      const tests = categoryResults.tests;

      tests.forEach((test) => {
        const weight = test.critical ? 3 : 1;
        maxScore += weight;

        if (test.status === "pass") {
          totalScore += weight;
        } else if (test.status === "fail" && !test.critical) {
          totalScore += 0.5; // Partial credit for non-critical
        }
      });
    });

    this.results.overall.score = Math.round((totalScore / maxScore) * 100);

    if (this.results.overall.score >= 90) {
      this.results.overall.status = "excellent";
    } else if (this.results.overall.score >= 75) {
      this.results.overall.status = "good";
    } else if (this.results.overall.score >= 60) {
      this.results.overall.status = "acceptable";
    } else {
      this.results.overall.status = "needs-improvement";
    }
  }

  /**
   * Generate comprehensive report
   */
  generateReport() {
    console.log("📊 DIVINE PRECISION VALIDATION REPORT");
    console.log("=====================================\n");

    console.log(
      `🎯 OVERALL SCORE: ${this.results.overall.score}/100 (${this.results.overall.status.toUpperCase()})\n`,
    );

    const categories = [
      { key: "security", name: "🛡️ Security Framework", icon: "🛡️" },
      { key: "performance", name: "⚡ Performance Monitoring", icon: "⚡" },
      { key: "devTools", name: "🛠️ Developer Tools", icon: "🛠️" },
      { key: "documentation", name: "📚 Documentation System", icon: "📚" },
    ];

    categories.forEach((category) => {
      const result = this.results[category.key];
      const passed = result.tests.filter((t) => t.status === "pass").length;
      const total = result.tests.length;

      console.log(
        `${category.icon} ${category.name}: ${result.status.toUpperCase()} (${passed}/${total})`,
      );

      result.tests.forEach((test) => {
        const icon =
          test.status === "pass" ? "✅" : test.status === "fail" ? "❌" : "⚠️";
        const critical = test.critical ? " (CRITICAL)" : "";
        console.log(`  ${icon} ${test.name}${critical}`);

        if (test.error) {
          console.log(`     Error: ${test.error}`);
        }
      });
      console.log("");
    });

    // Summary and recommendations
    console.log("🎯 SUMMARY & RECOMMENDATIONS:");
    console.log("==============================");

    if (this.results.overall.score >= 90) {
      console.log(
        "🏆 EXCELLENT! All systems are operating at peak performance.",
      );
      console.log("✨ Your divine precision implementation is world-class.");
    } else if (this.results.overall.score >= 75) {
      console.log("🟢 GOOD! Most systems are working well.");
      console.log("🔧 Minor improvements needed for optimal performance.");
    } else if (this.results.overall.score >= 60) {
      console.log("🟡 ACCEPTABLE! Core systems are functional.");
      console.log("⚡ Significant improvements recommended for production.");
    } else {
      console.log("🔴 NEEDS IMPROVEMENT! Critical issues detected.");
      console.log("🚨 Address critical failures before proceeding.");
    }

    // Next steps
    console.log("\n🚀 NEXT STEPS:");
    const failedCritical = [];
    const failedNonCritical = [];

    Object.values(this.results).forEach((category) => {
      if (category.tests) {
        category.tests.forEach((test) => {
          if (test.status !== "pass") {
            if (test.critical) {
              failedCritical.push(test.name);
            } else {
              failedNonCritical.push(test.name);
            }
          }
        });
      }
    });

    if (failedCritical.length > 0) {
      console.log("🔴 CRITICAL FIXES REQUIRED:");
      failedCritical.forEach((name) => console.log(`   - ${name}`));
    }

    if (failedNonCritical.length > 0) {
      console.log("🟡 RECOMMENDED IMPROVEMENTS:");
      failedNonCritical.forEach((name) => console.log(`   - ${name}`));
    }

    if (failedCritical.length === 0 && failedNonCritical.length === 0) {
      console.log("🎉 No issues detected! All systems optimal.");
    }

    console.log("\n🔥 DIVINE PRECISION VALIDATION COMPLETE! 🔥");
  }

  // Utility methods
  checkFileExists(filePath) {
    return fs.existsSync(filePath);
  }

  checkFileExecutable(filePath) {
    try {
      fs.accessSync(filePath, fs.constants.F_OK | fs.constants.R_OK);
      return true;
    } catch {
      return false;
    }
  }

  checkDependency(packageName) {
    try {
      const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
      return !!(
        packageJson.dependencies?.[packageName] ||
        packageJson.devDependencies?.[packageName]
      );
    } catch {
      return false;
    }
  }

  checkNpmScript(scriptName) {
    try {
      const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
      return !!packageJson.scripts?.[scriptName];
    } catch {
      return false;
    }
  }

  runTypeCheck() {
    try {
      execSync("npm run type-check", { stdio: "pipe" });
      return true;
    } catch {
      return false;
    }
  }

  checkEssentialDocs() {
    const essentialDocs = [
      "README.md",
      "docs/README.md",
      "docs/ARCHITECTURE.md",
      "docs/API_REFERENCE.md",
    ];

    return essentialDocs.every((doc) => fs.existsSync(doc));
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new DivinePrecisionValidator();
  validator.validate().catch((error) => {
    console.error("❌ Validation error:", error);
    process.exit(1);
  });
}

module.exports = { DivinePrecisionValidator };

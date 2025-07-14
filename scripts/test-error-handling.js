#!/usr/bin/env node

/**
 * ERROR HANDLING TEST PROTOCOL - QUANTUM PRODUCTION ARCHITECT v2
 * Validates all error boundaries, cascade prevention, and recovery systems
 */

const fs = require("fs");
const path = require("path");
const { spawn, exec } = require("child_process");

class ErrorHandlingTestProtocol {
  constructor() {
    this.testResults = {
      errorBoundaries: [],
      cascadePrevention: [],
      recoveryMechanisms: [],
      apiErrorHandling: [],
      componentResilience: [],
    };

    this.criticalPaths = [
      "/",
      "/greatness-zone",
      "/dashboard/judge",
      "/letter-portal",
      "/people/jay-forte",
      "/analytics-dashboard",
    ];

    this.errorBoundaryComponents = [
      "divine-error-boundary",
      "with-error-boundary",
      "cascade-monitor",
      "health-monitor",
    ];
  }

  /**
   * Run complete error handling validation
   */
  async runCompleteValidation() {
    console.log("🧪 ERROR HANDLING TEST PROTOCOL INITIATED");
    console.log(
      "🎯 QUANTUM PRODUCTION ARCHITECT v2 - Complete Validation Suite",
    );

    try {
      await this.validateErrorBoundaries();
      await this.validateCascadePrevention();
      await this.validateRecoveryMechanisms();
      await this.validateApiErrorHandling();
      await this.validateComponentResilience();

      this.generateReport();
    } catch (error) {
      console.error("❌ VALIDATION FAILED:", error.message);
      process.exit(1);
    }
  }

  /**
   * Validate error boundary implementation
   */
  async validateErrorBoundaries() {
    console.log("\n🛡️ VALIDATING ERROR BOUNDARIES");

    // Check for error boundary files
    const errorBoundaryFiles = [
      "src/components/ui/divine-error-boundary.tsx",
      "src/components/with-error-boundary.tsx",
      "src/components/debug/cascade-monitor.tsx",
    ];

    for (const file of errorBoundaryFiles) {
      const exists = fs.existsSync(file);
      this.testResults.errorBoundaries.push({
        test: `Error boundary file exists: ${file}`,
        status: exists ? "PASS" : "FAIL",
        details: exists ? "File found" : "File missing",
      });

      if (exists) {
        await this.validateErrorBoundaryImplementation(file);
      }
    }

    // Check for error pages in app routes
    await this.validateErrorPages();
  }

  /**
   * Validate specific error boundary implementation
   */
  async validateErrorBoundaryImplementation(filePath) {
    try {
      const content = fs.readFileSync(filePath, "utf8");

      // Check for required error boundary patterns
      const requiredPatterns = [
        /componentDidCatch|getDerivedStateFromError/,
        /error.*boundary/i,
        /fallback/i,
        /reset/i,
      ];

      for (const pattern of requiredPatterns) {
        const hasPattern = pattern.test(content);
        this.testResults.errorBoundaries.push({
          test: `${path.basename(filePath)} has ${pattern.toString()}`,
          status: hasPattern ? "PASS" : "FAIL",
          details: hasPattern ? "Pattern found" : "Pattern missing",
        });
      }

      // Check for TypeScript errors
      if (content.includes("withDivineErrorBoundary")) {
        const hasProperTypes =
          content.includes("interface") || content.includes("type");
        this.testResults.errorBoundaries.push({
          test: `${path.basename(filePath)} has proper TypeScript types`,
          status: hasProperTypes ? "PASS" : "WARN",
          details: hasProperTypes
            ? "Types defined"
            : "No type definitions found",
        });
      }
    } catch (error) {
      this.testResults.errorBoundaries.push({
        test: `Read ${filePath}`,
        status: "FAIL",
        details: error.message,
      });
    }
  }

  /**
   * Validate error pages in app routes
   */
  async validateErrorPages() {
    const appDir = "src/app";
    const routeDirs = this.findRouteDirectories(appDir);

    for (const routeDir of routeDirs) {
      const errorPagePath = path.join(routeDir, "error.tsx");
      const exists = fs.existsSync(errorPagePath);

      this.testResults.errorBoundaries.push({
        test: `Error page exists for ${routeDir.replace("src/app/", "")}`,
        status: exists ? "PASS" : "WARN",
        details: exists ? "error.tsx found" : "No error.tsx (using default)",
      });
    }
  }

  /**
   * Find all route directories in app directory
   */
  findRouteDirectories(dir) {
    const routeDirs = [];

    function traverse(currentDir) {
      try {
        const items = fs.readdirSync(currentDir);

        for (const item of items) {
          const itemPath = path.join(currentDir, item);
          const stat = fs.statSync(itemPath);

          if (
            stat.isDirectory() &&
            !item.startsWith("_") &&
            !item.startsWith(".")
          ) {
            // Check if this directory has a page.tsx
            const pagePath = path.join(itemPath, "page.tsx");
            if (fs.existsSync(pagePath)) {
              routeDirs.push(itemPath);
            }

            // Recursively check subdirectories
            traverse(itemPath);
          }
        }
      } catch (error) {
        // Directory might not be accessible
      }
    }

    traverse(dir);
    return routeDirs;
  }

  /**
   * Validate cascade prevention mechanisms
   */
  async validateCascadePrevention() {
    console.log("\n🌊 VALIDATING CASCADE PREVENTION");

    // Check for cascade prevention scripts
    const cascadeFiles = [
      "scripts/cascade-prevention.js",
      ".webpack-monitor.js",
      "src/components/debug/cascade-monitor.tsx",
    ];

    for (const file of cascadeFiles) {
      const exists = fs.existsSync(file);
      this.testResults.cascadePrevention.push({
        test: `Cascade prevention file: ${file}`,
        status: exists ? "PASS" : "WARN",
        details: exists ? "File found" : "File missing",
      });
    }

    // Test webpack configuration for chunk splitting
    await this.validateWebpackConfig();

    // Test for memory leak patterns
    await this.validateMemoryLeakPrevention();
  }

  /**
   * Validate webpack configuration
   */
  async validateWebpackConfig() {
    try {
      const nextConfigPath = "next.config.js";
      if (fs.existsSync(nextConfigPath)) {
        const content = fs.readFileSync(nextConfigPath, "utf8");

        const hasChunkSplitting =
          content.includes("splitChunks") || content.includes("cacheGroups");
        this.testResults.cascadePrevention.push({
          test: "Webpack chunk splitting configured",
          status: hasChunkSplitting ? "PASS" : "WARN",
          details: hasChunkSplitting
            ? "Chunk splitting found"
            : "No chunk splitting configuration",
        });

        const hasFramerMotionOptimization = content.includes("framer-motion");
        this.testResults.cascadePrevention.push({
          test: "Framer Motion optimization configured",
          status: hasFramerMotionOptimization ? "PASS" : "WARN",
          details: hasFramerMotionOptimization
            ? "Framer Motion optimization found"
            : "No Framer Motion optimization",
        });
      }
    } catch (error) {
      this.testResults.cascadePrevention.push({
        test: "Read next.config.js",
        status: "FAIL",
        details: error.message,
      });
    }
  }

  /**
   * Validate memory leak prevention
   */
  async validateMemoryLeakPrevention() {
    // Check for proper cleanup patterns in components
    const componentFiles = await this.findComponentFiles("src/components");

    for (const file of componentFiles.slice(0, 10)) {
      // Sample first 10 files
      try {
        const content = fs.readFileSync(file, "utf8");

        // Check for useEffect cleanup
        const hasUseEffect = content.includes("useEffect");
        const hasCleanup =
          content.includes("return () =>") || content.includes("cleanup");

        if (hasUseEffect) {
          this.testResults.cascadePrevention.push({
            test: `${path.basename(file)} has useEffect cleanup`,
            status: hasCleanup ? "PASS" : "WARN",
            details: hasCleanup
              ? "Cleanup function found"
              : "No cleanup function detected",
          });
        }

        // Check for event listener cleanup
        const hasEventListeners = content.includes("addEventListener");
        const hasRemoveEventListener = content.includes("removeEventListener");

        if (hasEventListeners) {
          this.testResults.cascadePrevention.push({
            test: `${path.basename(file)} cleans up event listeners`,
            status: hasRemoveEventListener ? "PASS" : "WARN",
            details: hasRemoveEventListener
              ? "removeEventListener found"
              : "No removeEventListener detected",
          });
        }
      } catch (error) {
        // Skip files that can't be read
      }
    }
  }

  /**
   * Find all component files
   */
  async findComponentFiles(dir) {
    const componentFiles = [];

    function traverse(currentDir) {
      try {
        const items = fs.readdirSync(currentDir);

        for (const item of items) {
          const itemPath = path.join(currentDir, item);
          const stat = fs.statSync(itemPath);

          if (
            stat.isFile() &&
            (item.endsWith(".tsx") || item.endsWith(".ts"))
          ) {
            componentFiles.push(itemPath);
          } else if (stat.isDirectory() && !item.startsWith(".")) {
            traverse(itemPath);
          }
        }
      } catch (error) {
        // Directory might not be accessible
      }
    }

    traverse(dir);
    return componentFiles;
  }

  /**
   * Validate recovery mechanisms
   */
  async validateRecoveryMechanisms() {
    console.log("\n🔄 VALIDATING RECOVERY MECHANISMS");

    // Test build recovery
    try {
      console.log("Testing build recovery...");
      const buildResult = await this.executeCommand("npm run build", 30000);

      this.testResults.recoveryMechanisms.push({
        test: "Build process completes successfully",
        status: buildResult.includes("Compiled successfully") ? "PASS" : "FAIL",
        details: buildResult.includes("error")
          ? "Build has errors"
          : "Build successful",
      });
    } catch (error) {
      this.testResults.recoveryMechanisms.push({
        test: "Build process completes successfully",
        status: "FAIL",
        details: error.message,
      });
    }

    // Test cache clearing mechanisms
    const cacheCommands = [
      "rm -rf .next",
      "npm cache clean --force",
      "rm -rf node_modules/.cache",
    ];

    for (const command of cacheCommands) {
      try {
        await this.executeCommand(command, 10000);
        this.testResults.recoveryMechanisms.push({
          test: `Cache clearing: ${command}`,
          status: "PASS",
          details: "Command executed successfully",
        });
      } catch (error) {
        this.testResults.recoveryMechanisms.push({
          test: `Cache clearing: ${command}`,
          status: "FAIL",
          details: error.message,
        });
      }
    }
  }

  /**
   * Validate API error handling
   */
  async validateApiErrorHandling() {
    console.log("\n🔌 VALIDATING API ERROR HANDLING");

    // Find all API route files
    const apiDir = "src/app/api";
    if (fs.existsSync(apiDir)) {
      const apiFiles = await this.findApiRoutes(apiDir);

      for (const file of apiFiles) {
        await this.validateApiRoute(file);
      }
    } else {
      this.testResults.apiErrorHandling.push({
        test: "API directory exists",
        status: "WARN",
        details: "No API directory found",
      });
    }
  }

  /**
   * Find all API route files
   */
  async findApiRoutes(dir) {
    const apiFiles = [];

    function traverse(currentDir) {
      try {
        const items = fs.readdirSync(currentDir);

        for (const item of items) {
          const itemPath = path.join(currentDir, item);
          const stat = fs.statSync(itemPath);

          if (stat.isFile() && item === "route.ts") {
            apiFiles.push(itemPath);
          } else if (stat.isDirectory()) {
            traverse(itemPath);
          }
        }
      } catch (error) {
        // Directory might not be accessible
      }
    }

    traverse(dir);
    return apiFiles;
  }

  /**
   * Validate individual API route
   */
  async validateApiRoute(filePath) {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const routeName = filePath
        .replace("src/app/api/", "")
        .replace("/route.ts", "");

      // Check for error handling patterns
      const hasTryCatch = content.includes("try") && content.includes("catch");
      this.testResults.apiErrorHandling.push({
        test: `${routeName} has try-catch error handling`,
        status: hasTryCatch ? "PASS" : "WARN",
        details: hasTryCatch
          ? "Try-catch found"
          : "No try-catch error handling",
      });

      // Check for proper HTTP status codes
      const hasStatusCodes =
        content.includes("status:") || content.includes(".status(");
      this.testResults.apiErrorHandling.push({
        test: `${routeName} uses proper HTTP status codes`,
        status: hasStatusCodes ? "PASS" : "WARN",
        details: hasStatusCodes
          ? "Status codes found"
          : "No explicit status codes",
      });

      // Check for input validation
      const hasValidation =
        content.includes("validate") ||
        content.includes("schema") ||
        content.includes("zod");
      this.testResults.apiErrorHandling.push({
        test: `${routeName} has input validation`,
        status: hasValidation ? "PASS" : "WARN",
        details: hasValidation
          ? "Validation found"
          : "No input validation detected",
      });
    } catch (error) {
      this.testResults.apiErrorHandling.push({
        test: `Read API route: ${filePath}`,
        status: "FAIL",
        details: error.message,
      });
    }
  }

  /**
   * Validate component resilience
   */
  async validateComponentResilience() {
    console.log("\n🧱 VALIDATING COMPONENT RESILIENCE");

    // Check critical components for error boundaries
    const criticalComponents = [
      "src/components/navigation.tsx",
      "src/components/hero.tsx",
      "src/app/page.tsx",
      "src/components/ui/mobile-optimization.tsx",
    ];

    for (const component of criticalComponents) {
      if (fs.existsSync(component)) {
        await this.validateComponentErrorHandling(component);
      }
    }
  }

  /**
   * Validate component error handling
   */
  async validateComponentErrorHandling(filePath) {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const componentName = path.basename(filePath, ".tsx");

      // Check for error boundary wrapping
      const hasErrorBoundary =
        content.includes("ErrorBoundary") ||
        content.includes("withDivineErrorBoundary");
      this.testResults.componentResilience.push({
        test: `${componentName} is wrapped with error boundary`,
        status: hasErrorBoundary ? "PASS" : "WARN",
        details: hasErrorBoundary
          ? "Error boundary found"
          : "No error boundary detected",
      });

      // Check for null checks
      const hasNullChecks =
        content.includes("?.") ||
        content.includes("if (") ||
        content.includes("&&");
      this.testResults.componentResilience.push({
        test: `${componentName} has defensive programming patterns`,
        status: hasNullChecks ? "PASS" : "WARN",
        details: hasNullChecks
          ? "Defensive patterns found"
          : "No defensive programming detected",
      });

      // Check for loading states
      const hasLoadingStates =
        content.includes("loading") ||
        content.includes("Loading") ||
        content.includes("Suspense");
      this.testResults.componentResilience.push({
        test: `${componentName} handles loading states`,
        status: hasLoadingStates ? "PASS" : "WARN",
        details: hasLoadingStates
          ? "Loading states found"
          : "No loading states detected",
      });
    } catch (error) {
      this.testResults.componentResilience.push({
        test: `Read component: ${filePath}`,
        status: "FAIL",
        details: error.message,
      });
    }
  }

  /**
   * Execute command with timeout
   */
  executeCommand(command, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const process = exec(command, (error, stdout, stderr) => {
        if (error && !command.includes("rm ") && !command.includes("clean")) {
          reject(error);
          return;
        }
        resolve(stdout + stderr);
      });

      setTimeout(() => {
        process.kill();
        reject(new Error(`Command timeout: ${command}`));
      }, timeout);
    });
  }

  /**
   * Generate comprehensive test report
   */
  generateReport() {
    console.log("\n📊 ERROR HANDLING TEST REPORT");
    console.log("=".repeat(50));

    const categories = [
      { name: "Error Boundaries", results: this.testResults.errorBoundaries },
      {
        name: "Cascade Prevention",
        results: this.testResults.cascadePrevention,
      },
      {
        name: "Recovery Mechanisms",
        results: this.testResults.recoveryMechanisms,
      },
      {
        name: "API Error Handling",
        results: this.testResults.apiErrorHandling,
      },
      {
        name: "Component Resilience",
        results: this.testResults.componentResilience,
      },
    ];

    let totalTests = 0;
    let totalPassed = 0;
    let totalFailed = 0;
    let totalWarnings = 0;

    for (const category of categories) {
      console.log(`\n🔍 ${category.name.toUpperCase()}`);
      console.log("-".repeat(30));

      const passed = category.results.filter((r) => r.status === "PASS").length;
      const failed = category.results.filter((r) => r.status === "FAIL").length;
      const warnings = category.results.filter(
        (r) => r.status === "WARN",
      ).length;

      totalTests += category.results.length;
      totalPassed += passed;
      totalFailed += failed;
      totalWarnings += warnings;

      console.log(`✅ Passed: ${passed}`);
      console.log(`❌ Failed: ${failed}`);
      console.log(`⚠️  Warnings: ${warnings}`);

      // Show failed tests
      const failedTests = category.results.filter((r) => r.status === "FAIL");
      if (failedTests.length > 0) {
        console.log("\nFailed Tests:");
        failedTests.forEach((test) => {
          console.log(`  ❌ ${test.test}: ${test.details}`);
        });
      }

      // Show critical warnings
      const criticalWarnings = category.results.filter(
        (r) => r.status === "WARN" && r.test.includes("critical"),
      );
      if (criticalWarnings.length > 0) {
        console.log("\nCritical Warnings:");
        criticalWarnings.forEach((test) => {
          console.log(`  ⚠️  ${test.test}: ${test.details}`);
        });
      }
    }

    console.log("\n📈 OVERALL SUMMARY");
    console.log("=".repeat(50));
    console.log(`Total Tests: ${totalTests}`);
    console.log(
      `✅ Passed: ${totalPassed} (${Math.round((totalPassed / totalTests) * 100)}%)`,
    );
    console.log(
      `❌ Failed: ${totalFailed} (${Math.round((totalFailed / totalTests) * 100)}%)`,
    );
    console.log(
      `⚠️  Warnings: ${totalWarnings} (${Math.round((totalWarnings / totalTests) * 100)}%)`,
    );

    // Determine overall status
    const overallStatus =
      totalFailed === 0
        ? totalWarnings < totalTests * 0.2
          ? "EXCELLENT"
          : "GOOD"
        : totalFailed < totalTests * 0.1
          ? "ACCEPTABLE"
          : "NEEDS_ATTENTION";

    console.log(`\n🎯 OVERALL STATUS: ${overallStatus}`);

    if (overallStatus === "NEEDS_ATTENTION") {
      console.log("\n🚨 CRITICAL ISSUES DETECTED - IMMEDIATE ACTION REQUIRED");
      process.exit(1);
    } else if (overallStatus === "ACCEPTABLE") {
      console.log("\n⚠️  SOME ISSUES DETECTED - REVIEW RECOMMENDED");
    } else {
      console.log("\n🏆 ERROR HANDLING SYSTEM IS ROBUST");
    }

    // Save detailed report to file
    this.saveReportToFile();
  }

  /**
   * Save detailed report to file
   */
  saveReportToFile() {
    const reportData = {
      timestamp: new Date().toISOString(),
      summary: {
        totalTests: Object.values(this.testResults).flat().length,
        passed: Object.values(this.testResults)
          .flat()
          .filter((r) => r.status === "PASS").length,
        failed: Object.values(this.testResults)
          .flat()
          .filter((r) => r.status === "FAIL").length,
        warnings: Object.values(this.testResults)
          .flat()
          .filter((r) => r.status === "WARN").length,
      },
      results: this.testResults,
    };

    const reportPath = "error-handling-test-report.json";
    fs.writeFileSync(reportPath, JSON.stringify(reportData, null, 2));
    console.log(`\n📄 Detailed report saved to: ${reportPath}`);
  }
}

// Start the test protocol if called directly
if (require.main === module) {
  const testProtocol = new ErrorHandlingTestProtocol();
  testProtocol.runCompleteValidation().catch(console.error);
}

module.exports = ErrorHandlingTestProtocol;

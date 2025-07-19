#!/usr/bin/env node

/**
 * 🔍 REAL BROWSER CONSOLE MONITOR
 * Captures actual React runtime errors including setState-in-render violations
 *
 * This script opens a real browser and monitors console errors in real-time
 */

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

class RealBrowserConsoleMonitor {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.reactErrors = [];
    this.setStateViolations = [];
    this.startTime = Date.now();
    this.isMonitoring = false;
  }

  async monitor(url = "http://localhost:1437", duration = 60000) {
    console.log("🔍 REAL BROWSER CONSOLE MONITOR STARTING...");
    console.log(`📍 URL: ${url}`);
    console.log(`⏱️  Duration: ${duration / 1000}s`);
    console.log("🚨 Monitoring for setState-in-render violations...\n");

    const browser = await puppeteer.launch({
      headless: false, // Show browser so we can see what's happening
      devtools: true, // Open DevTools automatically
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-web-security",
        "--disable-features=VizDisplayCompositor",
      ],
    });

    try {
      const page = await browser.newPage();
      this.isMonitoring = true;

      // Set up comprehensive console monitoring
      page.on("console", (msg) => {
        const type = msg.type();
        const text = msg.text();
        const timestamp = new Date().toISOString();

        const logEntry = {
          type,
          text,
          timestamp,
          url: page.url(),
          location: msg.location(),
        };

        // Categorize errors
        if (type === "error") {
          this.errors.push(logEntry);

          // Detect React-specific errors
          if (this.isReactError(text)) {
            this.reactErrors.push(logEntry);
            console.log(`🔴 REACT ERROR: ${text}`);
          }

          // Detect setState violations specifically
          if (this.isSetStateViolation(text)) {
            this.setStateViolations.push(logEntry);
            console.log(`💥 setState VIOLATION: ${text}`);
            console.log(`   📍 Location: ${JSON.stringify(msg.location())}`);
          }

          console.log(`❌ ERROR: ${text}`);
        } else if (type === "warning") {
          this.warnings.push(logEntry);

          if (this.isReactWarning(text)) {
            console.log(`⚠️  REACT WARNING: ${text}`);
          } else {
            console.log(`⚠️  WARNING: ${text}`);
          }
        }
      });

      // Listen to page errors (unhandled exceptions)
      page.on("pageerror", (error) => {
        const errorEntry = {
          type: "pageerror",
          text: error.message,
          stack: error.stack,
          timestamp: new Date().toISOString(),
          url: page.url(),
        };

        this.errors.push(errorEntry);
        console.log(`💥 PAGE ERROR: ${error.message}`);

        if (this.isReactError(error.message)) {
          this.reactErrors.push(errorEntry);
        }
      });

      // Listen to failed requests
      page.on("requestfailed", (request) => {
        console.log(`🌐 REQUEST FAILED: ${request.method()} ${request.url()}`);
      });

      // Navigate to the page
      console.log("🚀 Navigating to homepage...");
      await page.goto(url, {
        waitUntil: "networkidle0",
        timeout: 30000,
      });

      console.log("✅ Page loaded. Monitoring console output...\n");

      // Interact with the page to trigger potential errors
      await this.simulateUserInteractions(page);

      // Wait for the specified duration while monitoring
      console.log(`⏳ Monitoring for ${duration / 1000} seconds...`);
      await this.monitorWithProgress(duration);
    } finally {
      this.isMonitoring = false;
      await browser.close();
    }

    return this.generateReport();
  }

  async simulateUserInteractions(page) {
    try {
      console.log("🧪 Simulating user interactions...");

      // Wait a bit for the page to fully load
      await page.waitForTimeout(2000);

      // Try to hover over cards to trigger events
      const selectors = [
        '[data-testid="coach-card"]',
        '[data-testid="judge-card"]',
        '[data-testid="activist-card"]',
        ".card", // fallback
        "button", // any buttons
        "a", // any links
      ];

      for (const selector of selectors) {
        try {
          const element = await page.$(selector);
          if (element) {
            console.log(`   🎯 Hovering over: ${selector}`);
            await page.hover(selector);
            await page.waitForTimeout(500);

            // Try clicking if it's interactive
            if (selector.includes("button") || selector.includes("card")) {
              await page.click(selector);
              await page.waitForTimeout(500);
            }
          }
        } catch (error) {
          // Continue with other selectors if one fails
        }
      }

      // Scroll the page to trigger any scroll-based effects
      await page.evaluate(() => {
        window.scrollTo(0, document.body.scrollHeight / 2);
      });
      await page.waitForTimeout(1000);

      await page.evaluate(() => {
        window.scrollTo(0, 0);
      });

      console.log("✅ User interactions completed");
    } catch (error) {
      console.log(`⚠️  Interaction simulation failed: ${error.message}`);
    }
  }

  async monitorWithProgress(duration) {
    const interval = 5000; // Update every 5 seconds
    const steps = Math.ceil(duration / interval);

    for (let i = 0; i < steps; i++) {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.min(interval, duration - i * interval)),
      );

      if (this.isMonitoring) {
        const elapsed = ((i + 1) * interval) / 1000;
        const total = duration / 1000;
        console.log(
          `📊 Progress: ${elapsed}s/${total}s | Errors: ${this.errors.length} | React Errors: ${this.reactErrors.length} | setState Violations: ${this.setStateViolations.length}`,
        );
      }
    }
  }

  isReactError(text) {
    const reactErrorPatterns = [
      "Maximum update depth exceeded",
      "Cannot update a component",
      "setState",
      "useEffect",
      "React",
      "Hook",
      "render",
      "component",
    ];

    return reactErrorPatterns.some((pattern) =>
      text.toLowerCase().includes(pattern.toLowerCase()),
    );
  }

  isSetStateViolation(text) {
    const setStatePatterns = [
      "Maximum update depth exceeded",
      "setState inside useEffect",
      "useEffect either doesn't have a dependency array",
      "dependencies changes on every render",
    ];

    return setStatePatterns.some((pattern) => text.includes(pattern));
  }

  isReactWarning(text) {
    const reactWarningPatterns = [
      "React",
      "Hook",
      "useEffect",
      "useState",
      "dependency",
      "render",
    ];

    return reactWarningPatterns.some((pattern) => text.includes(pattern));
  }

  generateReport() {
    const endTime = Date.now();
    const duration = endTime - this.startTime;

    const report = {
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      summary: {
        totalErrors: this.errors.length,
        reactErrors: this.reactErrors.length,
        setStateViolations: this.setStateViolations.length,
        warnings: this.warnings.length,
        status:
          this.setStateViolations.length === 0 ? "HEALTHY" : "CRITICAL_ERRORS",
      },
      details: {
        allErrors: this.errors,
        reactSpecificErrors: this.reactErrors,
        setStateViolations: this.setStateViolations,
        warnings: this.warnings,
      },
      analysis: {
        mostCommonError: this.getMostCommonError(),
        affectedComponents: this.getAffectedComponents(),
        errorFrequency: this.getErrorFrequency(),
      },
    };

    // Save detailed report
    const reportPath = path.join(
      __dirname,
      "..",
      "reports",
      "real-browser-console-report.json",
    );
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Print summary
    console.log("\n🔍 REAL BROWSER CONSOLE MONITOR REPORT");
    console.log("==========================================");
    console.log(`🕐 Duration: ${duration}ms`);
    console.log(`❌ Total Errors: ${this.errors.length}`);
    console.log(`⚛️  React Errors: ${this.reactErrors.length}`);
    console.log(`💥 setState Violations: ${this.setStateViolations.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    console.log(`🏥 Status: ${report.summary.status}`);

    if (this.setStateViolations.length > 0) {
      console.log("\n🚨 CRITICAL setState VIOLATIONS DETECTED:");
      this.setStateViolations.slice(0, 5).forEach((violation, i) => {
        console.log(`  ${i + 1}. ${violation.text}`);
        if (violation.location) {
          console.log(
            `     📍 ${violation.location.url}:${violation.location.lineNumber}`,
          );
        }
      });

      if (this.setStateViolations.length > 5) {
        console.log(
          `  ... and ${this.setStateViolations.length - 5} more violations`,
        );
      }
    }

    if (this.reactErrors.length > 0) {
      console.log("\n⚛️  REACT ERRORS:");
      this.reactErrors.slice(0, 3).forEach((error, i) => {
        console.log(`  ${i + 1}. ${error.text}`);
      });
    }

    console.log(`\n📄 Full report saved: ${reportPath}`);

    return report;
  }

  getMostCommonError() {
    const errorCounts = {};
    this.errors.forEach((error) => {
      const key = error.text.substring(0, 100); // First 100 chars
      errorCounts[key] = (errorCounts[key] || 0) + 1;
    });

    return Object.entries(errorCounts).sort(([, a], [, b]) => b - a)[0] || null;
  }

  getAffectedComponents() {
    const components = new Set();
    this.errors.forEach((error) => {
      if (error.location && error.location.url) {
        const match = error.location.url.match(/\/([^\/]+\.tsx?):/);
        if (match) {
          components.add(match[1]);
        }
      }
    });
    return Array.from(components);
  }

  getErrorFrequency() {
    const frequency = {};
    this.errors.forEach((error) => {
      const minute = new Date(error.timestamp).toISOString().substring(0, 16);
      frequency[minute] = (frequency[minute] || 0) + 1;
    });
    return frequency;
  }
}

// Run if called directly
if (require.main === module) {
  const monitor = new RealBrowserConsoleMonitor();
  const url = process.argv[2] || "http://localhost:1437";
  const duration = parseInt(process.argv[3]) || 60000;

  monitor
    .monitor(url, duration)
    .then((report) => {
      process.exit(report.summary.setStateViolations === 0 ? 0 : 1);
    })
    .catch((error) => {
      console.error("❌ Monitor failed:", error);
      process.exit(1);
    });
}

module.exports = RealBrowserConsoleMonitor;

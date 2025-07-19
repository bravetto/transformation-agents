#!/usr/bin/env node

/**
 * 🔍 BROWSER CONSOLE MONITOR
 * Real-time browser error detection for defensive architecture
 *
 * Usage: node defensive-architecture/scripts/browser-console-monitor.js
 */

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

class BrowserConsoleMonitor {
  constructor() {
    this.errors = [];
    this.warnings = [];
    this.logs = [];
    this.networkFailures = [];
    this.startTime = Date.now();
  }

  async monitor(url = "http://localhost:1437", duration = 30000) {
    console.log("🔍 Starting Browser Console Monitor...");
    console.log(`📍 URL: ${url}`);
    console.log(`⏱️  Duration: ${duration / 1000}s`);

    const browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    try {
      const page = await browser.newPage();

      // Listen to console events
      page.on("console", (msg) => {
        const type = msg.type();
        const text = msg.text();
        const timestamp = new Date().toISOString();

        const logEntry = {
          type,
          text,
          timestamp,
          url: page.url(),
        };

        switch (type) {
          case "error":
            this.errors.push(logEntry);
            console.log(`❌ ERROR: ${text}`);
            break;
          case "warning":
            this.warnings.push(logEntry);
            console.log(`⚠️  WARNING: ${text}`);
            break;
          default:
            this.logs.push(logEntry);
            break;
        }
      });

      // Listen to page errors
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
      });

      // Listen to failed requests
      page.on("requestfailed", (request) => {
        const failureEntry = {
          url: request.url(),
          method: request.method(),
          failure: request.failure()?.errorText || "Unknown",
          timestamp: new Date().toISOString(),
        };

        this.networkFailures.push(failureEntry);
        console.log(
          `🌐 NETWORK FAILURE: ${request.method()} ${request.url()} - ${failureEntry.failure}`,
        );
      });

      // Navigate to the page
      console.log("🚀 Navigating to homepage...");
      await page.goto(url, {
        waitUntil: "networkidle2",
        timeout: 30000,
      });

      // Test critical paths
      console.log("🧪 Testing critical user interactions...");

      // Test modal interactions
      try {
        await page.waitForSelector('[data-testid="coach-card"]', {
          timeout: 5000,
        });
        await page.hover('[data-testid="coach-card"]');
        await page.waitForTimeout(1000);

        await page.waitForSelector('[data-testid="judge-card"]', {
          timeout: 5000,
        });
        await page.hover('[data-testid="judge-card"]');
        await page.waitForTimeout(1000);

        await page.waitForSelector('[data-testid="activist-card"]', {
          timeout: 5000,
        });
        await page.hover('[data-testid="activist-card"]');
        await page.waitForTimeout(1000);

        console.log("✅ User interaction tests completed");
      } catch (error) {
        console.log(`⚠️  User interaction test failed: ${error.message}`);
      }

      // Test analytics endpoint
      console.log("📊 Testing analytics endpoint...");
      try {
        const response = await page.evaluate(async () => {
          const res = await fetch("/api/analytics/user-journey", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventType: "health_check",
              userType: "system",
              sessionId: "monitor-test",
            }),
          });
          return res.status;
        });

        if (response === 200) {
          console.log("✅ Analytics endpoint healthy");
        } else {
          console.log(`❌ Analytics endpoint returned: ${response}`);
        }
      } catch (error) {
        console.log(`❌ Analytics test failed: ${error.message}`);
      }

      // Wait for the specified duration
      console.log(`⏳ Monitoring for ${duration / 1000} seconds...`);
      await page.waitForTimeout(duration);
    } finally {
      await browser.close();
    }

    return this.generateReport();
  }

  generateReport() {
    const endTime = Date.now();
    const duration = endTime - this.startTime;

    const report = {
      timestamp: new Date().toISOString(),
      duration: `${duration}ms`,
      summary: {
        errors: this.errors.length,
        warnings: this.warnings.length,
        networkFailures: this.networkFailures.length,
        status: this.errors.length === 0 ? "HEALTHY" : "ISSUES_DETECTED",
      },
      details: {
        errors: this.errors,
        warnings: this.warnings,
        networkFailures: this.networkFailures,
      },
      healthCheck: {
        criticalErrors: this.errors.filter(
          (e) =>
            e.text.includes("Cannot find module") ||
            e.text.includes("Failed to fetch") ||
            e.text.includes("TypeError") ||
            e.text.includes("ReferenceError"),
        ),
        webpackErrors: this.errors.filter(
          (e) =>
            e.text.includes("webpack") ||
            e.text.includes("chunk") ||
            e.text.includes(".js"),
        ),
        reactErrors: this.errors.filter(
          (e) =>
            e.text.includes("React") ||
            e.text.includes("useState") ||
            e.text.includes("useEffect"),
        ),
      },
    };

    // Save report
    const reportPath = path.join(
      __dirname,
      "..",
      "reports",
      "browser-console-report.json",
    );
    fs.mkdirSync(path.dirname(reportPath), { recursive: true });
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Print summary
    console.log("\n📋 BROWSER CONSOLE MONITOR REPORT");
    console.log("=====================================");
    console.log(`🕐 Duration: ${duration}ms`);
    console.log(`❌ Errors: ${this.errors.length}`);
    console.log(`⚠️  Warnings: ${this.warnings.length}`);
    console.log(`🌐 Network Failures: ${this.networkFailures.length}`);
    console.log(`🏥 Status: ${report.summary.status}`);

    if (this.errors.length > 0) {
      console.log("\n🔍 CRITICAL ERRORS:");
      this.errors.slice(0, 5).forEach((error, i) => {
        console.log(`  ${i + 1}. ${error.text}`);
      });

      if (this.errors.length > 5) {
        console.log(`  ... and ${this.errors.length - 5} more errors`);
      }
    }

    console.log(`\n📄 Full report saved: ${reportPath}`);

    return report;
  }
}

// Run if called directly
if (require.main === module) {
  const monitor = new BrowserConsoleMonitor();
  const url = process.argv[2] || "http://localhost:1437";
  const duration = parseInt(process.argv[3]) || 30000;

  monitor
    .monitor(url, duration)
    .then((report) => {
      process.exit(report.summary.errors === 0 ? 0 : 1);
    })
    .catch((error) => {
      console.error("❌ Monitor failed:", error);
      process.exit(1);
    });
}

module.exports = BrowserConsoleMonitor;

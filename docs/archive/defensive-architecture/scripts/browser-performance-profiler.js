#!/usr/bin/env node

/**
 * 🔍 BROWSER PERFORMANCE PROFILER
 * Advanced tool for detecting production-blocking issues
 */

const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

class BrowserPerformanceProfiler {
  constructor(url = "http://localhost:1437", duration = 30000) {
    this.url = url;
    this.duration = duration;
    this.violations = [];
    this.performanceMetrics = {};
  }

  async profile() {
    console.log("🔍 Starting Browser Performance Profile...\n");

    const browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });

    const page = await browser.newPage();

    // Enable console monitoring
    page.on("console", (msg) => {
      if (msg.text().includes("Maximum update depth exceeded")) {
        this.violations.push({
          type: "setState-infinite-loop",
          timestamp: new Date().toISOString(),
          message: msg.text(),
          severity: "critical",
        });
      }
    });

    // Enable performance monitoring
    await page.evaluateOnNewDocument(() => {
      window.performanceObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (
            entry.entryType === "measure" ||
            entry.entryType === "navigation"
          ) {
            window.performanceData = window.performanceData || [];
            window.performanceData.push({
              name: entry.name,
              duration: entry.duration,
              startTime: entry.startTime,
              type: entry.entryType,
            });
          }
        }
      });
      window.performanceObserver.observe({
        entryTypes: ["measure", "navigation", "paint"],
      });
    });

    try {
      console.log(`📍 Navigating to ${this.url}...`);
      await page.goto(this.url, { waitUntil: "networkidle0", timeout: 30000 });

      console.log("🎯 Simulating user interactions...");
      await this.simulateUserJourney(page);

      console.log("📊 Collecting performance metrics...");
      this.performanceMetrics = await this.collectMetrics(page);

      console.log("🧠 Analyzing memory usage...");
      await this.analyzeMemoryUsage(page);
    } catch (error) {
      console.error("❌ Profiling error:", error.message);
    }

    await browser.close();
    await this.generateReport();
  }

  async simulateUserJourney(page) {
    // Simulate 3-path modal interactions (the main user flow)
    const interactions = [
      () => page.hover('[data-testid="coach-card"]'),
      () => page.hover('[data-testid="judge-card"]'),
      () => page.hover('[data-testid="activist-card"]'),
      () => page.click('[data-testid="coach-card"]'),
      () => page.waitForTimeout(2000),
      () => page.click('[data-testid="modal-close"]'),
      () => page.click('[data-testid="judge-card"]'),
      () => page.waitForTimeout(2000),
    ];

    for (const interaction of interactions) {
      try {
        await interaction();
        await page.waitForTimeout(1000);
      } catch (error) {
        console.log(`⚠️  Interaction failed: ${error.message}`);
      }
    }
  }

  async collectMetrics(page) {
    return await page.evaluate(() => {
      const metrics = {};

      // Core Web Vitals
      const navigation = performance.getEntriesByType("navigation")[0];
      metrics.loadTime = navigation
        ? navigation.loadEventEnd - navigation.loadEventStart
        : 0;
      metrics.domContentLoaded = navigation
        ? navigation.domContentLoadedEventEnd -
          navigation.domContentLoadedEventStart
        : 0;

      // React render metrics
      metrics.reactRenders = window.performanceData
        ? window.performanceData.filter((entry) => entry.name.includes("React"))
            .length
        : 0;

      // Memory usage
      if (performance.memory) {
        metrics.memoryUsage = {
          used: performance.memory.usedJSHeapSize,
          total: performance.memory.totalJSHeapSize,
          limit: performance.memory.jsHeapSizeLimit,
        };
      }

      // Error count
      metrics.consoleErrors = window.consoleErrorCount || 0;

      return metrics;
    });
  }

  async analyzeMemoryUsage(page) {
    const memoryInfo = await page.evaluate(() => {
      if (performance.memory) {
        return {
          usedJSHeapSize: performance.memory.usedJSHeapSize,
          totalJSHeapSize: performance.memory.totalJSHeapSize,
          jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
          memoryPressure:
            (performance.memory.usedJSHeapSize /
              performance.memory.jsHeapSizeLimit) *
            100,
        };
      }
      return null;
    });

    if (memoryInfo) {
      this.performanceMetrics.memory = memoryInfo;

      if (memoryInfo.memoryPressure > 80) {
        this.violations.push({
          type: "memory-pressure",
          severity: "critical",
          message: `Memory usage at ${memoryInfo.memoryPressure.toFixed(2)}% of limit`,
          timestamp: new Date().toISOString(),
        });
      }
    }
  }

  async generateReport() {
    const report = {
      timestamp: new Date().toISOString(),
      url: this.url,
      violations: this.violations,
      performanceMetrics: this.performanceMetrics,
      summary: {
        totalViolations: this.violations.length,
        criticalIssues: this.violations.filter((v) => v.severity === "critical")
          .length,
        productionReady: this.violations.length === 0,
        recommendations: this.generateRecommendations(),
      },
    };

    const reportPath = path.join(
      __dirname,
      "../reports",
      `performance-profile-${Date.now()}.json`,
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    console.log("\n📋 BROWSER PERFORMANCE PROFILE REPORT");
    console.log("=====================================");
    console.log(`🕒 Timestamp: ${report.timestamp}`);
    console.log(`🌐 URL: ${report.url}`);
    console.log(`⚠️  Total Violations: ${report.summary.totalViolations}`);
    console.log(`🚨 Critical Issues: ${report.summary.criticalIssues}`);
    console.log(
      `✅ Production Ready: ${report.summary.productionReady ? "YES" : "NO"}`,
    );

    if (this.violations.length > 0) {
      console.log("\n🚨 CRITICAL VIOLATIONS DETECTED:");
      this.violations.forEach((violation, index) => {
        console.log(
          `${index + 1}. [${violation.severity.toUpperCase()}] ${violation.type}`,
        );
        console.log(`   Message: ${violation.message}`);
        console.log(`   Time: ${violation.timestamp}\n`);
      });
    }

    console.log("\n📊 PERFORMANCE METRICS:");
    console.log(`Load Time: ${this.performanceMetrics.loadTime}ms`);
    console.log(
      `DOM Content Loaded: ${this.performanceMetrics.domContentLoaded}ms`,
    );
    if (this.performanceMetrics.memory) {
      console.log(
        `Memory Usage: ${(this.performanceMetrics.memory.usedJSHeapSize / 1024 / 1024).toFixed(2)}MB`,
      );
      console.log(
        `Memory Pressure: ${this.performanceMetrics.memory.memoryPressure.toFixed(2)}%`,
      );
    }

    console.log(`\n📄 Full report saved to: ${reportPath}`);

    return report;
  }

  generateRecommendations() {
    const recommendations = [];

    if (this.violations.some((v) => v.type === "setState-infinite-loop")) {
      recommendations.push(
        "CRITICAL: Fix setState-in-render violations immediately - these cause infinite loops",
      );
    }

    if (this.violations.some((v) => v.type === "memory-pressure")) {
      recommendations.push(
        "HIGH: Memory usage is critical - investigate memory leaks",
      );
    }

    if (this.performanceMetrics.loadTime > 3000) {
      recommendations.push(
        "MEDIUM: Page load time exceeds 3 seconds - optimize bundle size",
      );
    }

    return recommendations;
  }
}

// CLI execution
if (require.main === module) {
  const url = process.argv[2] || "http://localhost:1437";
  const duration = parseInt(process.argv[3]) || 30000;

  const profiler = new BrowserPerformanceProfiler(url, duration);
  profiler.profile().catch(console.error);
}

module.exports = BrowserPerformanceProfiler;

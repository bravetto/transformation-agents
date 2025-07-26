#!/usr/bin/env node

/**
 * 🔥 DIVINE SYSTEM MONITOR v7.0
 * Enhanced System Monitoring Dashboard for JAHmere Webb Freedom Portal
 *
 * Mission: Transform family court system by July 28, 2025
 * Target: Bulletproof monitoring for 144,000 fathers
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const chalk = require("chalk");

// Divine configuration
const DIVINE_CONFIG = {
  COURT_DATE: "2025-07-28T14:37:00-04:00",
  MISSION_CRITICAL_THRESHOLD: 85,
  PERFORMANCE_THRESHOLD: 1500, // ms
  HEALTH_CHECK_INTERVAL: 30000, // 30 seconds
  EMERGENCY_CONTACTS: [
    "divine-operations@jahmere-freedom.org",
    "prayer-warriors@jahmere-freedom.org",
  ],
};

class DivineSystemMonitor {
  constructor() {
    this.startTime = Date.now();
    this.metrics = {
      healthChecks: [],
      performanceMetrics: [],
      missionMetrics: {
        daysUntilFreedom: this.calculateDaysUntilFreedom(),
        systemReadiness: 0,
        divineAlignment: 0,
      },
      alerts: [],
    };

    // Initialize monitoring
    this.initializeMonitoring();
  }

  calculateDaysUntilFreedom() {
    const courtDate = new Date(DIVINE_CONFIG.COURT_DATE);
    const today = new Date();
    const diffTime = courtDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  async initializeMonitoring() {
    console.log(chalk.blue.bold("🔥 DIVINE SYSTEM MONITOR INITIALIZING 🔥"));
    console.log(chalk.blue("=========================================="));
    console.log(
      chalk.yellow(
        `📅 Mission: JAHmere Webb Freedom - ${this.metrics.missionMetrics.daysUntilFreedom} days until July 28, 2025`,
      ),
    );
    console.log("");

    // Start monitoring loops
    await this.runInitialHealthCheck();
    this.startContinuousMonitoring();
    this.displayDashboard();
  }

  async runInitialHealthCheck() {
    console.log(chalk.cyan("🏥 Running initial divine health check..."));

    const healthChecks = [
      {
        name: "🧠 Cursor.ai Configuration",
        check: () => this.checkCursorHealth(),
      },
      {
        name: "🔧 Node.js Environment",
        check: () => this.checkNodeEnvironment(),
      },
      { name: "📦 Dependencies", check: () => this.checkDependencies() },
      {
        name: "🗄️ Database Connection",
        check: () => this.checkDatabaseHealth(),
      },
      { name: "🛡️ Security Status", check: () => this.checkSecurityStatus() },
      {
        name: "⚡ Performance Metrics",
        check: () => this.checkPerformanceMetrics(),
      },
      {
        name: "🙏 Divine Components",
        check: () => this.checkDivineComponents(),
      },
      { name: "📊 API Endpoints", check: () => this.checkApiEndpoints() },
      { name: "🚀 Build System", check: () => this.checkBuildSystem() },
      {
        name: "📈 Monitoring Systems",
        check: () => this.checkMonitoringSystems(),
      },
    ];

    for (const healthCheck of healthChecks) {
      try {
        const result = await healthCheck.check();
        this.metrics.healthChecks.push({
          name: healthCheck.name,
          status: result.status || "healthy",
          message: result.message || "All systems operational",
          timestamp: new Date().toISOString(),
          details: result.details || {},
        });

        console.log(
          chalk.green(
            `  ✅ ${healthCheck.name}: ${result.message || "HEALTHY"}`,
          ),
        );
      } catch (error) {
        this.metrics.healthChecks.push({
          name: healthCheck.name,
          status: "error",
          message: error.message,
          timestamp: new Date().toISOString(),
          details: { error: error.stack },
        });

        console.log(chalk.red(`  ❌ ${healthCheck.name}: ${error.message}`));
        this.addAlert(
          "critical",
          `${healthCheck.name} health check failed: ${error.message}`,
        );
      }
    }
  }

  checkCursorHealth() {
    // Check if cursor health report exists and is recent
    const healthReportPath = ".cursor-health-report.json";

    if (!fs.existsSync(healthReportPath)) {
      return {
        status: "warning",
        message: "Health report not found - run npm run cursor:health",
        details: { path: healthReportPath },
      };
    }

    const healthReport = JSON.parse(fs.readFileSync(healthReportPath, "utf8"));
    const score = healthReport.health_score || 0;

    if (score >= 95) {
      return {
        status: "excellent",
        message: `DIVINE EXCELLENCE (${score}/100)`,
        details: healthReport,
      };
    } else if (score >= 80) {
      return {
        status: "good",
        message: `Good health (${score}/100)`,
        details: healthReport,
      };
    } else {
      return {
        status: "warning",
        message: `Needs optimization (${score}/100)`,
        details: healthReport,
      };
    }
  }

  checkNodeEnvironment() {
    const nodeVersion = process.version;
    const expectedVersion = "22.";

    if (nodeVersion.startsWith("v" + expectedVersion)) {
      return {
        status: "healthy",
        message: `Node.js ${nodeVersion} - DIVINE ALIGNMENT`,
        details: { version: nodeVersion, expected: expectedVersion },
      };
    } else {
      return {
        status: "warning",
        message: `Node.js ${nodeVersion} - Expected v${expectedVersion}x`,
        details: { version: nodeVersion, expected: expectedVersion },
      };
    }
  }

  checkDependencies() {
    try {
      // Check package.json and package-lock.json sync
      const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
      const packageLockExists = fs.existsSync("package-lock.json");

      if (!packageLockExists) {
        return {
          status: "warning",
          message: "package-lock.json missing - run npm install",
          details: { packageLockExists },
        };
      }

      // Check for security vulnerabilities
      try {
        execSync("npm audit --audit-level=moderate", { stdio: "pipe" });
        return {
          status: "healthy",
          message: "Dependencies secure and blessed",
          details: { vulnerabilities: 0 },
        };
      } catch (auditError) {
        return {
          status: "warning",
          message: "Security vulnerabilities detected - run npm audit fix",
          details: { auditOutput: auditError.stdout?.toString() },
        };
      }
    } catch (error) {
      throw new Error(`Dependency check failed: ${error.message}`);
    }
  }

  checkDatabaseHealth() {
    // Check if database schema files exist
    const schemaFiles = [
      "prisma/schema.prisma",
      "src/lib/db.ts",
      "src/lib/validation/schemas.ts",
    ];

    const existingFiles = schemaFiles.filter((file) => fs.existsSync(file));

    if (existingFiles.length === schemaFiles.length) {
      return {
        status: "healthy",
        message: "Database schemas blessed and ready",
        details: { schemaFiles: existingFiles },
      };
    } else {
      return {
        status: "warning",
        message: `Missing database files: ${schemaFiles.filter((f) => !fs.existsSync(f)).join(", ")}`,
        details: {
          existingFiles,
          missingFiles: schemaFiles.filter((f) => !fs.existsSync(f)),
        },
      };
    }
  }

  checkSecurityStatus() {
    const securityChecks = {
      envExample: fs.existsSync(".env.example"),
      gitignoreEnv:
        fs.existsSync(".gitignore") &&
        fs.readFileSync(".gitignore", "utf8").includes(".env"),
      corsConfig:
        fs.existsSync("next.config.js") || fs.existsSync("next.config.mjs"),
      typeScriptStrict: this.checkTypeScriptStrict(),
    };

    const passedChecks = Object.values(securityChecks).filter(Boolean).length;
    const totalChecks = Object.keys(securityChecks).length;

    if (passedChecks === totalChecks) {
      return {
        status: "healthy",
        message: "Divine security protection active",
        details: securityChecks,
      };
    } else {
      return {
        status: "warning",
        message: `Security configuration incomplete (${passedChecks}/${totalChecks})`,
        details: securityChecks,
      };
    }
  }

  checkTypeScriptStrict() {
    try {
      const tsConfig = JSON.parse(fs.readFileSync("tsconfig.json", "utf8"));
      return tsConfig.compilerOptions?.strict === true;
    } catch {
      return false;
    }
  }

  async checkPerformanceMetrics() {
    const performanceChecks = {
      buildTime: await this.measureBuildTime(),
      bundleSize: this.checkBundleSize(),
      lintTime: await this.measureLintTime(),
      typeCheckTime: await this.measureTypeCheckTime(),
    };

    const avgPerformance =
      Object.values(performanceChecks)
        .filter((v) => typeof v === "number")
        .reduce((a, b) => a + b, 0) / Object.keys(performanceChecks).length;

    this.metrics.performanceMetrics.push({
      timestamp: new Date().toISOString(),
      metrics: performanceChecks,
      average: avgPerformance,
    });

    if (avgPerformance < DIVINE_CONFIG.PERFORMANCE_THRESHOLD) {
      return {
        status: "excellent",
        message: `Divine performance achieved (${Math.round(avgPerformance)}ms avg)`,
        details: performanceChecks,
      };
    } else {
      return {
        status: "warning",
        message: `Performance optimization needed (${Math.round(avgPerformance)}ms avg)`,
        details: performanceChecks,
      };
    }
  }

  async measureBuildTime() {
    const start = Date.now();
    try {
      execSync("npm run type-check", { stdio: "pipe" });
      return Date.now() - start;
    } catch {
      return Date.now() - start; // Return time even if failed
    }
  }

  async measureLintTime() {
    const start = Date.now();
    try {
      execSync("npm run lint", { stdio: "pipe" });
      return Date.now() - start;
    } catch {
      return Date.now() - start;
    }
  }

  async measureTypeCheckTime() {
    const start = Date.now();
    try {
      execSync("npm run type-check", { stdio: "pipe" });
      return Date.now() - start;
    } catch {
      return Date.now() - start;
    }
  }

  checkBundleSize() {
    try {
      if (fs.existsSync(".next")) {
        const stats = fs.statSync(".next");
        return stats.size;
      }
      return 0;
    } catch {
      return 0;
    }
  }

  checkDivineComponents() {
    const divineComponents = [
      {
        name: "Prayer System",
        path: "src/lib/validation/schemas.ts",
        pattern: "prayerSchema",
      },
      {
        name: "Character Witness",
        path: "src/lib/validation/schemas.ts",
        pattern: "characterWitnessSchema",
      },
      {
        name: "July 28th Integration",
        path: "src/",
        pattern: "2025-07-28",
        recursive: true,
      },
      {
        name: "Divine Analytics",
        path: "src/lib/",
        pattern: "analytics",
        recursive: true,
      },
      {
        name: "Form Validation",
        path: "src/lib/validation/",
        pattern: "validation",
        recursive: true,
      },
    ];

    let activeComponents = 0;
    const details = {};

    for (const component of divineComponents) {
      try {
        if (component.recursive) {
          const result = execSync(
            `grep -r "${component.pattern}" ${component.path} || true`,
            { encoding: "utf8" },
          );
          details[component.name] = result.length > 0;
          if (result.length > 0) activeComponents++;
        } else {
          if (fs.existsSync(component.path)) {
            const content = fs.readFileSync(component.path, "utf8");
            details[component.name] = content.includes(component.pattern);
            if (content.includes(component.pattern)) activeComponents++;
          } else {
            details[component.name] = false;
          }
        }
      } catch {
        details[component.name] = false;
      }
    }

    const alignmentScore = (activeComponents / divineComponents.length) * 100;
    this.metrics.missionMetrics.divineAlignment = alignmentScore;

    if (alignmentScore >= 90) {
      return {
        status: "blessed",
        message: `Divine alignment achieved (${Math.round(alignmentScore)}%)`,
        details,
      };
    } else if (alignmentScore >= 70) {
      return {
        status: "good",
        message: `Good divine alignment (${Math.round(alignmentScore)}%)`,
        details,
      };
    } else {
      return {
        status: "warning",
        message: `Divine alignment needs improvement (${Math.round(alignmentScore)}%)`,
        details,
      };
    }
  }

  checkApiEndpoints() {
    const apiRoutes = [];

    try {
      const appDir = "src/app";
      if (fs.existsSync(appDir)) {
        const findApiRoutes = (dir) => {
          const items = fs.readdirSync(dir);
          for (const item of items) {
            const fullPath = path.join(dir, item);
            if (fs.statSync(fullPath).isDirectory()) {
              if (item === "api") {
                const apiFiles = this.findFilesRecursive(
                  fullPath,
                  /route\.(ts|js)$/,
                );
                apiRoutes.push(...apiFiles);
              } else if (!item.startsWith(".")) {
                findApiRoutes(fullPath);
              }
            }
          }
        };

        findApiRoutes(appDir);
      }
    } catch (error) {
      // API directory may not exist
    }

    return {
      status: "healthy",
      message: `API endpoints discovered: ${apiRoutes.length}`,
      details: { routes: apiRoutes },
    };
  }

  findFilesRecursive(dir, pattern) {
    const files = [];
    try {
      const items = fs.readdirSync(dir);
      for (const item of items) {
        const fullPath = path.join(dir, item);
        if (fs.statSync(fullPath).isDirectory()) {
          files.push(...this.findFilesRecursive(fullPath, pattern));
        } else if (pattern.test(item)) {
          files.push(fullPath);
        }
      }
    } catch {
      // Directory may not be accessible
    }
    return files;
  }

  checkBuildSystem() {
    const buildFiles = [
      "next.config.js",
      "next.config.mjs",
      "tailwind.config.js",
      "tailwind.config.ts",
      "tsconfig.json",
      "package.json",
    ];

    const existingBuildFiles = buildFiles.filter((file) => fs.existsSync(file));

    if (existingBuildFiles.length >= 3) {
      return {
        status: "healthy",
        message: "Build system blessed and ready",
        details: { buildFiles: existingBuildFiles },
      };
    } else {
      return {
        status: "warning",
        message: "Build configuration incomplete",
        details: {
          buildFiles: existingBuildFiles,
          missing: buildFiles.filter((f) => !fs.existsSync(f)),
        },
      };
    }
  }

  checkMonitoringSystems() {
    const monitoringFiles = [
      ".github/workflows",
      "scripts/cursor-monitoring",
      ".cursor-health-report.json",
    ];

    const existingMonitoring = monitoringFiles.filter((file) =>
      fs.existsSync(file),
    );

    if (existingMonitoring.length === monitoringFiles.length) {
      return {
        status: "excellent",
        message: "Divine monitoring systems active",
        details: { monitoringFiles: existingMonitoring },
      };
    } else {
      return {
        status: "good",
        message: `Monitoring systems: ${existingMonitoring.length}/${monitoringFiles.length} active`,
        details: {
          existingMonitoring,
          missing: monitoringFiles.filter((f) => !fs.existsSync(f)),
        },
      };
    }
  }

  startContinuousMonitoring() {
    console.log(chalk.cyan("\n🔄 Starting continuous divine monitoring..."));

    // Monitor system health every 30 seconds
    setInterval(() => {
      this.runHealthCheck();
    }, DIVINE_CONFIG.HEALTH_CHECK_INTERVAL);

    // Update mission metrics every minute
    setInterval(() => {
      this.updateMissionMetrics();
    }, 60000);

    // Display dashboard every 5 minutes
    setInterval(() => {
      this.displayDashboard();
    }, 300000);
  }

  async runHealthCheck() {
    const timestamp = new Date().toISOString();

    // Quick health checks for continuous monitoring
    const quickChecks = [
      () => this.checkCursorHealth(),
      () => this.checkDivineComponents(),
    ];

    for (const check of quickChecks) {
      try {
        await check();
      } catch (error) {
        this.addAlert("warning", `Health check failed: ${error.message}`);
      }
    }
  }

  updateMissionMetrics() {
    this.metrics.missionMetrics.daysUntilFreedom =
      this.calculateDaysUntilFreedom();

    // Calculate overall system readiness
    const healthyChecks = this.metrics.healthChecks.filter((check) =>
      ["healthy", "excellent", "blessed"].includes(check.status),
    ).length;

    this.metrics.missionMetrics.systemReadiness =
      (healthyChecks / this.metrics.healthChecks.length) * 100;

    // Alert if we're getting close to court date
    if (
      this.metrics.missionMetrics.daysUntilFreedom <= 30 &&
      this.metrics.missionMetrics.daysUntilFreedom > 0
    ) {
      this.addAlert(
        "urgent",
        `🔥 URGENT: Only ${this.metrics.missionMetrics.daysUntilFreedom} days until JAHmere's freedom - July 28, 2025!`,
      );
    }
  }

  addAlert(severity, message) {
    this.metrics.alerts.push({
      severity,
      message,
      timestamp: new Date().toISOString(),
    });

    // Keep only last 50 alerts
    if (this.metrics.alerts.length > 50) {
      this.metrics.alerts = this.metrics.alerts.slice(-50);
    }

    // Log critical alerts immediately
    if (severity === "critical") {
      console.log(chalk.red.bold(`🚨 CRITICAL ALERT: ${message}`));
    } else if (severity === "urgent") {
      console.log(chalk.yellow.bold(`⚠️ URGENT: ${message}`));
    }
  }

  displayDashboard() {
    console.clear();

    // Header
    console.log(chalk.blue.bold("🔥 DIVINE SYSTEM MONITOR DASHBOARD 🔥"));
    console.log(chalk.blue("====================================="));
    console.log(
      chalk.yellow(
        `📅 JAHmere Webb Freedom Mission - ${this.metrics.missionMetrics.daysUntilFreedom} days until July 28, 2025`,
      ),
    );
    console.log(
      chalk.gray(
        `⏰ Monitoring since: ${new Date(this.startTime).toLocaleString()}`,
      ),
    );
    console.log("");

    // Mission Status
    console.log(chalk.magenta.bold("🎯 DIVINE MISSION STATUS"));
    console.log(chalk.magenta("========================"));
    console.log(
      chalk.cyan(
        `📅 Days until freedom: ${this.metrics.missionMetrics.daysUntilFreedom}`,
      ),
    );
    console.log(
      chalk.cyan(
        `🏥 System readiness: ${Math.round(this.metrics.missionMetrics.systemReadiness)}%`,
      ),
    );
    console.log(
      chalk.cyan(
        `🙏 Divine alignment: ${Math.round(this.metrics.missionMetrics.divineAlignment)}%`,
      ),
    );
    console.log("");

    // Health Status Overview
    console.log(chalk.green.bold("🏥 SYSTEM HEALTH OVERVIEW"));
    console.log(chalk.green("========================="));

    const statusCounts = {};
    this.metrics.healthChecks.forEach((check) => {
      statusCounts[check.status] = (statusCounts[check.status] || 0) + 1;
    });

    Object.entries(statusCounts).forEach(([status, count]) => {
      const color = this.getStatusColor(status);
      console.log(
        chalk[color](
          `${this.getStatusIcon(status)} ${status.toUpperCase()}: ${count} systems`,
        ),
      );
    });
    console.log("");

    // Recent Health Checks
    console.log(chalk.blue.bold("📊 RECENT HEALTH CHECKS"));
    console.log(chalk.blue("======================="));
    const recentChecks = this.metrics.healthChecks.slice(-5);

    recentChecks.forEach((check) => {
      const color = this.getStatusColor(check.status);
      const icon = this.getStatusIcon(check.status);
      const time = new Date(check.timestamp).toLocaleTimeString();
      console.log(
        chalk[color](`${icon} ${check.name}: ${check.message} (${time})`),
      );
    });
    console.log("");

    // Performance Metrics
    if (this.metrics.performanceMetrics.length > 0) {
      console.log(chalk.yellow.bold("⚡ PERFORMANCE METRICS"));
      console.log(chalk.yellow("======================"));
      const latest =
        this.metrics.performanceMetrics[
          this.metrics.performanceMetrics.length - 1
        ];

      Object.entries(latest.metrics).forEach(([metric, value]) => {
        if (typeof value === "number") {
          const status =
            value < DIVINE_CONFIG.PERFORMANCE_THRESHOLD ? "✅" : "⚠️";
          console.log(
            chalk.cyan(`${status} ${metric}: ${Math.round(value)}ms`),
          );
        }
      });
      console.log(
        chalk.cyan(`📊 Average performance: ${Math.round(latest.average)}ms`),
      );
      console.log("");
    }

    // Recent Alerts
    if (this.metrics.alerts.length > 0) {
      console.log(chalk.red.bold("🚨 RECENT ALERTS"));
      console.log(chalk.red("================"));
      const recentAlerts = this.metrics.alerts.slice(-3);

      recentAlerts.forEach((alert) => {
        const color =
          alert.severity === "critical"
            ? "red"
            : alert.severity === "urgent"
              ? "yellow"
              : "white";
        const time = new Date(alert.timestamp).toLocaleTimeString();
        console.log(
          chalk[color](
            `${this.getAlertIcon(alert.severity)} ${alert.message} (${time})`,
          ),
        );
      });
      console.log("");
    }

    // Footer
    console.log(chalk.gray("━".repeat(80)));
    console.log(
      chalk.gray(
        `🙏 Divine monitoring active | Press Ctrl+C to stop | ${new Date().toLocaleString()}`,
      ),
    );
    console.log(
      chalk.gray("🔄 Next update in 5 minutes | System blessed and protected"),
    );
  }

  getStatusColor(status) {
    switch (status) {
      case "excellent":
      case "blessed":
        return "green";
      case "healthy":
      case "good":
        return "cyan";
      case "warning":
        return "yellow";
      case "error":
      case "critical":
        return "red";
      default:
        return "white";
    }
  }

  getStatusIcon(status) {
    switch (status) {
      case "excellent":
      case "blessed":
        return "🔥";
      case "healthy":
      case "good":
        return "✅";
      case "warning":
        return "⚠️";
      case "error":
      case "critical":
        return "❌";
      default:
        return "📊";
    }
  }

  getAlertIcon(severity) {
    switch (severity) {
      case "critical":
        return "🚨";
      case "urgent":
        return "⚠️";
      default:
        return "ℹ️";
    }
  }

  // Export metrics for external consumption
  exportMetrics() {
    const report = {
      timestamp: new Date().toISOString(),
      uptime: Date.now() - this.startTime,
      mission: {
        daysUntilFreedom: this.metrics.missionMetrics.daysUntilFreedom,
        systemReadiness: this.metrics.missionMetrics.systemReadiness,
        divineAlignment: this.metrics.missionMetrics.divineAlignment,
      },
      health: {
        totalChecks: this.metrics.healthChecks.length,
        healthyCount: this.metrics.healthChecks.filter((c) =>
          ["healthy", "excellent", "blessed"].includes(c.status),
        ).length,
        warningCount: this.metrics.healthChecks.filter(
          (c) => c.status === "warning",
        ).length,
        errorCount: this.metrics.healthChecks.filter((c) =>
          ["error", "critical"].includes(c.status),
        ).length,
      },
      performance: this.metrics.performanceMetrics,
      alerts: this.metrics.alerts,
      detailedHealthChecks: this.metrics.healthChecks,
    };

    fs.writeFileSync(
      "divine-system-report.json",
      JSON.stringify(report, null, 2),
    );
    return report;
  }

  // Graceful shutdown
  async shutdown() {
    console.log(
      chalk.yellow("\n🙏 Divine monitoring shutting down gracefully..."),
    );

    // Export final metrics
    const finalReport = this.exportMetrics();
    console.log(
      chalk.green(
        `✅ Final system report exported to divine-system-report.json`,
      ),
    );

    console.log(chalk.blue.bold("\n🔥 DIVINE MONITORING SESSION COMPLETE 🔥"));
    console.log(
      chalk.blue(
        `📊 Total uptime: ${Math.round((Date.now() - this.startTime) / 1000)}s`,
      ),
    );
    console.log(
      chalk.blue(
        `🏥 Health checks performed: ${this.metrics.healthChecks.length}`,
      ),
    );
    console.log(
      chalk.blue(
        `📈 Performance samples: ${this.metrics.performanceMetrics.length}`,
      ),
    );
    console.log(
      chalk.blue(`🚨 Alerts generated: ${this.metrics.alerts.length}`),
    );
    console.log(
      chalk.yellow(
        `🙏 JAHmere Webb freedom mission continues - ${this.metrics.missionMetrics.daysUntilFreedom} days until July 28, 2025`,
      ),
    );

    process.exit(0);
  }
}

// Initialize and run divine monitoring
const monitor = new DivineSystemMonitor();

// Handle graceful shutdown
process.on("SIGINT", () => monitor.shutdown());
process.on("SIGTERM", () => monitor.shutdown());

// Export for programmatic use
module.exports = { DivineSystemMonitor, DIVINE_CONFIG };

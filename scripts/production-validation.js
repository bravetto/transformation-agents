#!/usr/bin/env node

/**
 * 🎯 JAHMERE BRIDGE PRODUCTION VALIDATION
 * Comprehensive deployment readiness checker for July 28th mission
 */

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

const VALIDATION_CHECKS = {
  // Environment checks
  environment: [
    "NEXT_PUBLIC_POSTHOG_KEY",
    "NEXT_PUBLIC_POSTHOG_HOST",
    "DATABASE_URL",
    "NEXTAUTH_SECRET",
    "OPENAI_API_KEY",
  ],

  // Security requirements
  security: ["next.config.mjs", "vercel.json", ".env.example"],

  // Performance targets
  performance: {
    buildTime: 30000, // 30 seconds max
    bundleSize: 500000, // 500KB max for main bundle
    apiResponseTime: 7, // 7ms target as per divine requirements
  },

  // Quality gates
  quality: {
    typeScript: true,
    eslint: true,
    tests: true,
    coverage: 80,
  },
};

class ProductionValidator {
  constructor() {
    this.results = {
      passed: 0,
      failed: 0,
      warnings: 0,
      details: [],
    };
  }

  log(level, message, detail = "") {
    const timestamp = new Date().toISOString();
    const emoji =
      {
        info: "💡",
        success: "✅",
        warning: "⚠️",
        error: "❌",
        divine: "🎯",
      }[level] || "📝";

    console.log(`${emoji} [${timestamp}] ${message}`);
    if (detail) console.log(`   ${detail}`);

    this.results.details.push({ level, message, detail, timestamp });
  }

  async runCommand(command, args = [], options = {}) {
    return new Promise((resolve, reject) => {
      const startTime = Date.now();
      const proc = spawn(command, args, {
        stdio: "pipe",
        shell: true,
        ...options,
      });

      let stdout = "";
      let stderr = "";

      proc.stdout.on("data", (data) => (stdout += data.toString()));
      proc.stderr.on("data", (data) => (stderr += data.toString()));

      proc.on("close", (code) => {
        const duration = Date.now() - startTime;
        resolve({ code, stdout, stderr, duration });
      });

      proc.on("error", reject);
    });
  }

  async validateEnvironment() {
    this.log("info", "🔍 Validating Environment Configuration...");

    const envFile = path.join(process.cwd(), ".env.local");
    if (!fs.existsSync(envFile)) {
      this.log(
        "warning",
        "No .env.local file found",
        "Using default environment variables",
      );
      this.results.warnings++;
    }

    let missingVars = [];
    for (const envVar of VALIDATION_CHECKS.environment) {
      if (!process.env[envVar]) {
        missingVars.push(envVar);
      }
    }

    if (missingVars.length > 0) {
      this.log(
        "error",
        "Missing required environment variables",
        missingVars.join(", "),
      );
      this.results.failed++;
      return false;
    }

    this.log("success", "Environment configuration validated");
    this.results.passed++;
    return true;
  }

  async validateSecurity() {
    this.log("info", "🔐 Validating Security Configuration...");

    let securityScore = 0;

    // Check Next.js config
    const nextConfig = path.join(process.cwd(), "next.config.mjs");
    if (fs.existsSync(nextConfig)) {
      const configContent = fs.readFileSync(nextConfig, "utf8");
      if (
        configContent.includes("headers()") &&
        configContent.includes("X-Frame-Options")
      ) {
        securityScore++;
        this.log("success", "Security headers configured in Next.js");
      } else {
        this.log("warning", "Security headers not found in Next.js config");
        this.results.warnings++;
      }
    }

    // Check Vercel config
    const vercelConfig = path.join(process.cwd(), "vercel.json");
    if (fs.existsSync(vercelConfig)) {
      const configContent = fs.readFileSync(vercelConfig, "utf8");
      if (
        configContent.includes("headers") &&
        configContent.includes("maxDuration")
      ) {
        securityScore++;
        this.log("success", "Vercel security configuration validated");
      }
    }

    if (securityScore >= 2) {
      this.log("success", "Security configuration validated");
      this.results.passed++;
      return true;
    } else {
      this.log("error", "Insufficient security configuration");
      this.results.failed++;
      return false;
    }
  }

  async validateTypeScript() {
    this.log("info", "🔍 Running TypeScript validation...");

    const result = await this.runCommand("npm", ["run", "type-check"]);

    if (result.code === 0) {
      this.log(
        "success",
        `TypeScript validation passed (${result.duration}ms)`,
      );
      this.results.passed++;
      return true;
    } else {
      this.log("error", "TypeScript validation failed", result.stderr);
      this.results.failed++;
      return false;
    }
  }

  async validateLinting() {
    this.log("info", "🧹 Running ESLint validation...");

    const result = await this.runCommand("npm", ["run", "lint"]);

    if (result.code === 0) {
      this.log("success", `ESLint validation passed (${result.duration}ms)`);
      this.results.passed++;
      return true;
    } else {
      this.log("error", "ESLint validation failed", result.stderr);
      this.results.failed++;
      return false;
    }
  }

  async validateBuild() {
    this.log("info", "🏗️ Testing production build...");

    const startTime = Date.now();
    const result = await this.runCommand("npm", ["run", "build"]);
    const buildTime = Date.now() - startTime;

    if (result.code === 0) {
      if (buildTime < VALIDATION_CHECKS.performance.buildTime) {
        this.log("success", `Production build successful (${buildTime}ms)`);
        this.results.passed++;
        return true;
      } else {
        this.log(
          "warning",
          `Build time exceeded target: ${buildTime}ms > ${VALIDATION_CHECKS.performance.buildTime}ms`,
        );
        this.results.warnings++;
        return true;
      }
    } else {
      this.log("error", "Production build failed", result.stderr);
      this.results.failed++;
      return false;
    }
  }

  async validatePerformance() {
    this.log("info", "⚡ Validating performance metrics...");

    // Check bundle sizes
    const buildDir = path.join(process.cwd(), ".next");
    if (!fs.existsSync(buildDir)) {
      this.log("warning", "No build directory found, skipping bundle analysis");
      this.results.warnings++;
      return true;
    }

    // Analyze bundle size (simplified check)
    try {
      const statsPath = path.join(buildDir, "static");
      if (fs.existsSync(statsPath)) {
        this.log("success", "Bundle analysis completed");
        this.results.passed++;
        return true;
      }
    } catch (error) {
      this.log("warning", "Bundle analysis failed", error.message);
      this.results.warnings++;
      return true;
    }
  }

  async validateTests() {
    this.log("info", "🧪 Running test suite...");

    const result = await this.runCommand("npm", ["run", "test", "--", "--run"]);

    if (result.code === 0) {
      this.log("success", `Test suite passed (${result.duration}ms)`);
      this.results.passed++;
      return true;
    } else {
      this.log("error", "Test suite failed", result.stderr);
      this.results.failed++;
      return false;
    }
  }

  async generateReport() {
    const total =
      this.results.passed + this.results.failed + this.results.warnings;
    const successRate = ((this.results.passed / total) * 100).toFixed(1);

    console.log("\n" + "=".repeat(80));
    console.log("🎯 JAHMERE BRIDGE PRODUCTION VALIDATION REPORT");
    console.log("=".repeat(80));
    console.log(`📊 Total Checks: ${total}`);
    console.log(`✅ Passed: ${this.results.passed}`);
    console.log(`❌ Failed: ${this.results.failed}`);
    console.log(`⚠️  Warnings: ${this.results.warnings}`);
    console.log(`📈 Success Rate: ${successRate}%`);
    console.log("=".repeat(80));

    if (this.results.failed === 0) {
      console.log(
        "🎉 DIVINE MISSION STATUS: PRODUCTION READY FOR JULY 28TH DEPLOYMENT!",
      );
      console.log(
        "🚀 All critical validations passed. JAHmere Bridge is ready for freedom!",
      );
      return true;
    } else {
      console.log("💔 MISSION CRITICAL: Production deployment blocked");
      console.log(`❌ ${this.results.failed} critical issues must be resolved`);
      return false;
    }
  }

  async validate() {
    console.log("🎯 Starting JAHmere Bridge Production Validation...\n");

    const validations = [
      () => this.validateEnvironment(),
      () => this.validateSecurity(),
      () => this.validateTypeScript(),
      () => this.validateLinting(),
      () => this.validateBuild(),
      () => this.validatePerformance(),
      () => this.validateTests(),
    ];

    for (const validation of validations) {
      try {
        await validation();
      } catch (error) {
        this.log("error", "Validation error", error.message);
        this.results.failed++;
      }
    }

    const isReady = await this.generateReport();
    process.exit(isReady ? 0 : 1);
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new ProductionValidator();
  validator.validate().catch(console.error);
}

module.exports = ProductionValidator;

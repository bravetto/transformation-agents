#!/usr/bin/env node

/**
 * 🔍 OPTIMIZATION VERIFICATION SCRIPT
 * Comprehensive verification of all implemented optimizations
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🚀 VERIFYING DIVINE ENGINEERING OPTIMIZATIONS...\n");

const checks = {
  passed: 0,
  failed: 0,
  warnings: 0,
};

function checkFile(filePath, description, callback) {
  try {
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, "utf8");
      const result = callback(content);

      if (result.status === "pass") {
        console.log(`✅ ${description}`);
        checks.passed++;
      } else if (result.status === "warn") {
        console.log(`⚠️  ${description} - ${result.message}`);
        checks.warnings++;
      } else {
        console.log(`❌ ${description} - ${result.message}`);
        checks.failed++;
      }
    } else {
      console.log(`❌ ${description} - File not found`);
      checks.failed++;
    }
  } catch (error) {
    console.log(`❌ ${description} - Error: ${error.message}`);
    checks.failed++;
  }
}

function runCommand(command, description) {
  try {
    execSync(command, { stdio: "pipe" });
    console.log(`✅ ${description}`);
    checks.passed++;
  } catch (error) {
    console.log(`❌ ${description} - Failed`);
    checks.failed++;
  }
}

// 📋 CURSOR AI OPTIMIZATION VERIFICATION
console.log("📋 CURSOR AI CONFIGURATION:");

checkFile(".cursor/rules/main.mdc", "Main MDC frontmatter", (content) => {
  if (
    content.includes("description:") &&
    content.includes("alwaysApply: true")
  ) {
    return { status: "pass" };
  }
  return { status: "fail", message: "Missing proper frontmatter" };
});

checkFile(
  ".cursor/rules/frontend.mdc",
  "Frontend MDC configuration",
  (content) => {
    if (content.includes("globs:") && content.includes("src/app/**/*.tsx")) {
      return { status: "pass" };
    }
    return { status: "warn", message: "Could optimize globs pattern" };
  },
);

checkFile(".vscode/settings.json", "VS Code MDC associations", (content) => {
  if (
    content.includes("workbench.editorAssociations") &&
    content.includes("*.mdc")
  ) {
    return { status: "pass" };
  }
  return { status: "fail", message: "Missing MDC file associations" };
});

console.log("");

// 🚀 TYPESCRIPT OPTIMIZATION VERIFICATION
console.log("🚀 TYPESCRIPT OPTIMIZATION:");

checkFile("tsconfig.json", "TypeScript incremental compilation", (content) => {
  const config = JSON.parse(content);
  if (
    config.compilerOptions?.incremental &&
    config.compilerOptions?.moduleResolution === "bundler"
  ) {
    return { status: "pass" };
  }
  return {
    status: "fail",
    message: "Missing incremental or bundler moduleResolution",
  };
});

checkFile("tsconfig.json", "TypeScript performance diagnostics", (content) => {
  if (
    content.includes("extendedDiagnostics") &&
    content.includes("generateCpuProfile")
  ) {
    return { status: "pass" };
  }
  return {
    status: "warn",
    message: "Performance diagnostics could be enhanced",
  };
});

console.log("");

// 🛡️ NEXT.JS CONFIGURATION VERIFICATION
console.log("🛡️ NEXT.JS OPTIMIZATION:");

checkFile("next.config.js", "Advanced caching configuration", (content) => {
  if (
    content.includes("cacheHandler") &&
    content.includes("cacheMaxMemorySize")
  ) {
    return { status: "pass" };
  }
  return { status: "fail", message: "Missing cache handler configuration" };
});

checkFile("next.config.js", "Bundle analyzer setup", (content) => {
  if (
    content.includes("withBundleAnalyzer") &&
    content.includes("@next/bundle-analyzer")
  ) {
    return { status: "pass" };
  }
  return { status: "fail", message: "Bundle analyzer not configured" };
});

checkFile("next.config.js", "Security headers", (content) => {
  if (
    content.includes("X-Content-Type-Options") &&
    content.includes("X-Frame-Options")
  ) {
    return { status: "pass" };
  }
  return { status: "fail", message: "Security headers missing" };
});

console.log("");

// 📊 PERFORMANCE MONITORING VERIFICATION
console.log("📊 PERFORMANCE MONITORING:");

checkFile("package.json", "Performance scripts", (content) => {
  if (
    content.includes("analyze") &&
    content.includes("performance:audit") &&
    content.includes("build:trace")
  ) {
    return { status: "pass" };
  }
  return { status: "fail", message: "Performance monitoring scripts missing" };
});

checkFile("lighthouserc.js", "Lighthouse CI configuration", (content) => {
  if (
    content.includes("categories:performance") &&
    content.includes("minScore")
  ) {
    return { status: "pass" };
  }
  return { status: "fail", message: "Lighthouse CI not properly configured" };
});

checkFile(
  ".github/workflows/performance-monitoring.yml",
  "CI/CD pipeline",
  (content) => {
    if (
      content.includes("performance-audit") &&
      content.includes("bundle-analysis")
    ) {
      return { status: "pass" };
    }
    return { status: "fail", message: "CI/CD performance monitoring missing" };
  },
);

console.log("");

// 🧪 BUILD VERIFICATION
console.log("🧪 BUILD VERIFICATION:");

console.log("Checking TypeScript compilation...");
runCommand("npm run type-check", "TypeScript compilation");

console.log("Checking Next.js build...");
try {
  execSync("npm run build", { stdio: "pipe", timeout: 120000 });
  console.log("✅ Next.js build successful");
  checks.passed++;
} catch (error) {
  console.log("❌ Next.js build failed");
  checks.failed++;
}

console.log("");

// 📈 RESULTS SUMMARY
console.log("📈 OPTIMIZATION VERIFICATION RESULTS:");
console.log(`✅ Passed: ${checks.passed}`);
console.log(`⚠️  Warnings: ${checks.warnings}`);
console.log(`❌ Failed: ${checks.failed}`);

const totalChecks = checks.passed + checks.warnings + checks.failed;
const successRate = Math.round((checks.passed / totalChecks) * 100);

console.log(`\n🎯 Success Rate: ${successRate}%`);

if (successRate >= 90) {
  console.log(
    "🏆 EXCELLENT! Divine Engineering optimizations are working perfectly!",
  );
} else if (successRate >= 75) {
  console.log(
    "🚀 GOOD! Most optimizations are working. Review warnings for improvements.",
  );
} else {
  console.log("⚠️  NEEDS ATTENTION! Several optimizations require fixes.");
}

console.log("\n🔧 To run individual checks:");
console.log("- npm run analyze (Bundle analysis)");
console.log("- npm run performance:audit (Lighthouse audit)");
console.log("- npm run build:trace (Turbopack tracing)");
console.log("- npm run type-check (TypeScript diagnostics)");

process.exit(checks.failed > 0 ? 1 : 0);

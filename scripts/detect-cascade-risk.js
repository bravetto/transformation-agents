#!/usr/bin/env node
/**
 * 🔍 CASCADE RISK DETECTION SYSTEM
 * ABSOLUTE AUTHORITY SCANNER - Detects patterns that could cause cascading failures
 *
 * This system has ZERO TOLERANCE for cascade-causing patterns.
 * Any detection results in IMMEDIATE ALERT and MANDATORY ACTION.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔍 INITIATING CASCADE RISK SCAN...");
console.log("🛡️ ABSOLUTE AUTHORITY PROTECTION ACTIVE\n");

let CRITICAL_RISK_DETECTED = false;
let HIGH_RISK_DETECTED = false;
let MEDIUM_RISK_DETECTED = false;

// ====================================
// PHASE 1: DANGEROUS SCRIPT DETECTION
// ====================================

console.log("📋 PHASE 1: SCANNING FOR DANGEROUS SCRIPTS...");

const FORBIDDEN_SCRIPT_PATTERNS = [
  "fix-all-",
  "batch-",
  "bulk-",
  "mass-",
  "fix-imports",
  "fix-build",
  "migrate-",
  "update-error-boundaries",
  "fix-duplicate",
];

const scriptsDir = path.join(__dirname);
if (fs.existsSync(scriptsDir)) {
  const scripts = fs.readdirSync(scriptsDir);

  scripts.forEach((script) => {
    if (FORBIDDEN_SCRIPT_PATTERNS.some((pattern) => script.includes(pattern))) {
      console.log(`🚨 CRITICAL RISK: Dangerous script detected: ${script}`);
      console.log(`   ⚡ ACTION REQUIRED: Delete immediately`);
      CRITICAL_RISK_DETECTED = true;
    }
  });
}

if (!CRITICAL_RISK_DETECTED) {
  console.log("✅ No dangerous scripts detected");
}

// ====================================
// PHASE 2: DANGEROUS OPERATION SCAN
// ====================================

console.log("\n📋 PHASE 2: SCANNING FOR DANGEROUS OPERATIONS...");

try {
  // Check for sed operations on TypeScript files (excluding this detection script)
  const sedOperations = execSync(
    'find scripts -name "*.js" ! -name "detect-cascade-risk.js" -exec grep -l "sed.*\\.tsx\\?" {} \\; 2>/dev/null || true',
  )
    .toString()
    .trim();
  if (sedOperations) {
    console.log("🚨 CRITICAL RISK: Sed operations on TypeScript detected");
    sedOperations.split("\n").forEach((file) => {
      if (file) console.log(`   📄 File: ${file}`);
    });
    CRITICAL_RISK_DETECTED = true;
  }

  // Check for bulk import operations (excluding this detection script)
  const bulkImports = execSync(
    'find scripts -name "*.js" ! -name "detect-cascade-risk.js" -exec grep -l "grep.*import.*-r" {} \\; 2>/dev/null || true',
  )
    .toString()
    .trim();
  if (bulkImports) {
    console.log("🚨 CRITICAL RISK: Bulk import operations detected");
    bulkImports.split("\n").forEach((file) => {
      if (file) console.log(`   📄 File: ${file}`);
    });
    CRITICAL_RISK_DETECTED = true;
  }

  // Check for global regex patterns (excluding this detection script)
  const globalRegex = execSync(
    'find scripts -name "*.js" ! -name "detect-cascade-risk.js" -exec grep -l "replace.*import.*g" {} \\; 2>/dev/null || true',
  )
    .toString()
    .trim();
  if (globalRegex) {
    console.log("🚨 CRITICAL RISK: Global regex on imports detected");
    globalRegex.split("\n").forEach((file) => {
      if (file) console.log(`   📄 File: ${file}`);
    });
    CRITICAL_RISK_DETECTED = true;
  }
} catch (error) {
  console.log("⚠️  Warning: Could not complete operation scan");
}

// ====================================
// PHASE 3: DANGEROUS DOCUMENTATION SCAN
// ====================================

console.log("\n📋 PHASE 3: SCANNING FOR DANGEROUS DOCUMENTATION...");

const FORBIDDEN_DOCS = [
  "EXECUTE_NOW.sh",
  "DAY1_IMMEDIATE_FIXES.md",
  "IMPLEMENTATION_SUMMARY.md",
  "TYPESCRIPT_FIX_SUMMARY.md",
  "ERROR_BOUNDARY_IMPLEMENTATION.md",
  "MISSION_ACCOMPLISHED.md",
];

FORBIDDEN_DOCS.forEach((doc) => {
  if (fs.existsSync(doc)) {
    console.log(`🚨 CRITICAL RISK: Dangerous documentation detected: ${doc}`);
    console.log(`   ⚡ ACTION REQUIRED: Delete immediately`);
    CRITICAL_RISK_DETECTED = true;
  }
});

// ====================================
// PHASE 4: BUILD HEALTH ASSESSMENT
// ====================================

console.log("\n📋 PHASE 4: ASSESSING BUILD HEALTH...");

try {
  const buildResult = execSync("npm run build 2>&1", { stdio: "pipe" });
  console.log("✅ Build Status: HEALTHY");
} catch (error) {
  const errorOutput = error.stdout.toString();

  // Check for import-related errors
  if (errorOutput.includes("Expected ',', got")) {
    console.log("🚨 CRITICAL RISK: Import syntax errors detected");
    console.log("   ⚡ MANUAL INTERVENTION REQUIRED");
    CRITICAL_RISK_DETECTED = true;
  } else if (errorOutput.includes("Cannot find module")) {
    console.log("⚠️  HIGH RISK: Missing module imports detected");
    HIGH_RISK_DETECTED = true;
  } else {
    console.log("⚠️  MEDIUM RISK: Build failing for other reasons");
    MEDIUM_RISK_DETECTED = true;
  }
}

// ====================================
// PHASE 5: PROTECTION SYSTEM INTEGRITY
// ====================================

console.log("\n📋 PHASE 5: VERIFYING PROTECTION SYSTEM INTEGRITY...");

const REQUIRED_PROTECTION_FILES = [
  "docs/CASCADE_PREVENTION_SYSTEM.md",
  "scripts/detect-cascade-risk.js",
];

let protectionIntact = true;
REQUIRED_PROTECTION_FILES.forEach((file) => {
  if (!fs.existsSync(file)) {
    console.log(`🚨 CRITICAL RISK: Protection system missing: ${file}`);
    protectionIntact = false;
    CRITICAL_RISK_DETECTED = true;
  }
});

if (protectionIntact) {
  console.log("✅ Protection Systems: INTACT");
}

// ====================================
// PHASE 6: PACKAGE.JSON SAFETY CHECK
// ====================================

console.log("\n📋 PHASE 6: CHECKING PACKAGE.JSON SAFETY...");

try {
  const packageJson = JSON.parse(fs.readFileSync("package.json", "utf8"));
  const scripts = packageJson.scripts || {};

  const dangerousScripts = Object.keys(scripts).filter(
    (script) =>
      script.includes("clean:cache") ||
      script.includes("fix-") ||
      script.includes("batch-") ||
      scripts[script].includes("sed"),
  );

  if (dangerousScripts.length > 0) {
    console.log("🚨 CRITICAL RISK: Dangerous npm scripts detected:");
    dangerousScripts.forEach((script) => {
      console.log(`   📄 Script: ${script} -> ${scripts[script]}`);
    });
    CRITICAL_RISK_DETECTED = true;
  } else {
    console.log("✅ Package.json scripts: SAFE");
  }
} catch (error) {
  console.log("⚠️  Warning: Could not check package.json");
}

// ====================================
// FINAL RISK ASSESSMENT
// ====================================

console.log("\n" + "=".repeat(60));
console.log("🎯 FINAL RISK ASSESSMENT");
console.log("=".repeat(60));

if (CRITICAL_RISK_DETECTED) {
  console.log("🚨 CRITICAL RISK DETECTED - IMMEDIATE ACTION REQUIRED");
  console.log("");
  console.log("⚡ MANDATORY ACTIONS:");
  console.log("1. Delete all dangerous scripts immediately");
  console.log("2. Remove dangerous documentation");
  console.log("3. Fix any import syntax errors manually");
  console.log("4. Validate build passes");
  console.log("5. Report incident to senior developer");
  console.log("");
  console.log("🛡️ REMEMBER: Manual fixes only, no bulk operations");
  process.exit(1);
} else if (HIGH_RISK_DETECTED) {
  console.log("⚠️  HIGH RISK DETECTED - ACTION REQUIRED");
  console.log("");
  console.log("📋 RECOMMENDED ACTIONS:");
  console.log("1. Fix build errors manually, one file at a time");
  console.log("2. Validate each fix with npm run build");
  console.log("3. Monitor for cascade patterns");
  process.exit(1);
} else if (MEDIUM_RISK_DETECTED) {
  console.log("⚠️  MEDIUM RISK DETECTED - MONITORING REQUIRED");
  console.log("");
  console.log("📋 RECOMMENDED ACTIONS:");
  console.log("1. Investigate build failures");
  console.log("2. Apply manual fixes as needed");
  console.log("3. Continue monitoring");
  process.exit(0);
} else {
  console.log("✅ NO CASCADE RISK DETECTED");
  console.log("");
  console.log("🛡️ PROTECTION STATUS: ACTIVE");
  console.log("🔒 CODEBASE STATUS: SECURE");
  console.log("✨ READY FOR DEVELOPMENT");
  process.exit(0);
}

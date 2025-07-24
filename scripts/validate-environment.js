#!/usr/bin/env node

/**
 * 🔍 ENVIRONMENT VARIABLES VALIDATION SCRIPT
 * Validates environment configuration for deployment readiness
 */

const fs = require("fs").promises;
const path = require("path");
const { ENV_VARS } = require("./environment-setup.js");

// Color codes for console output
const colors = {
  reset: "\x1b[0m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

function colorize(text, color) {
  return `${colors[color]}${text}${colors.reset}`;
}

async function loadEnvFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    const env = {};

    content.split("\n").forEach((line) => {
      line = line.trim();
      if (line && !line.startsWith("#") && line.includes("=")) {
        const [key, ...valueParts] = line.split("=");
        const value = valueParts
          .join("=")
          .trim()
          .replace(/^["']|["']$/g, "");
        env[key.trim()] = value;
      }
    });

    return env;
  } catch (error) {
    return null;
  }
}

function validateValue(name, value, config) {
  const issues = [];

  // Check if value is empty
  if (!value || value.trim() === "") {
    if (config.type === "required") {
      issues.push({ level: "error", message: "Required variable is empty" });
    } else {
      issues.push({
        level: "info",
        message: `Using default: ${config.defaultValue || "none"}`,
      });
    }
    return issues;
  }

  // Check for placeholder values
  if (
    value.includes("your_") ||
    value.includes("_here") ||
    value === "your_value_here"
  ) {
    issues.push({
      level: "error",
      message: "Contains placeholder value - replace with actual value",
    });
  }

  // Specific validations based on variable name
  if (name === "DATABASE_URL") {
    if (
      !value.startsWith("postgresql://") &&
      !value.startsWith("postgres://")
    ) {
      issues.push({
        level: "warning",
        message: "Should be a valid PostgreSQL connection string",
      });
    }
    if (value.includes("localhost") || value.includes("127.0.0.1")) {
      issues.push({
        level: "info",
        message: "Using local database (OK for development)",
      });
    }
  }

  if (name.includes("API_KEY") || name.includes("TOKEN")) {
    if (value.length < 10) {
      issues.push({ level: "warning", message: "API key seems too short" });
    }
    if (value.includes(" ")) {
      issues.push({
        level: "error",
        message: "API key should not contain spaces",
      });
    }
  }

  if (name.startsWith("NEXT_PUBLIC_")) {
    issues.push({
      level: "info",
      message: "Public variable - will be exposed to client-side",
    });
  }

  if (name.includes("URL")) {
    try {
      new URL(value);
    } catch {
      if (
        !value.startsWith("postgresql://") &&
        !value.startsWith("postgres://")
      ) {
        issues.push({ level: "warning", message: "Should be a valid URL" });
      }
    }
  }

  return issues;
}

async function validateEnvironment() {
  console.log(colorize("🔍 ENVIRONMENT VARIABLES VALIDATION", "cyan"));
  console.log(colorize("=========================================", "cyan"));
  console.log("");

  // Check if .env.local exists
  const envLocal = await loadEnvFile(".env.local");
  const envExample = await loadEnvFile(".env.example");

  if (!envLocal) {
    console.log(colorize("❌ .env.local file not found!", "red"));
    console.log(
      colorize('💡 Run "npm run env:setup" to generate template', "yellow"),
    );
    return false;
  }

  console.log(colorize("✅ Found .env.local file", "green"));
  console.log("");

  let hasErrors = false;
  let hasWarnings = false;

  const results = {
    required: { found: 0, missing: 0, invalid: 0 },
    optional: { found: 0, missing: 0, invalid: 0 },
    public: { found: 0, missing: 0, invalid: 0 },
    unknown: { found: 0 },
  };

  // Validate known variables
  for (const [name, config] of Object.entries(ENV_VARS)) {
    const value = envLocal[name];
    const issues = validateValue(name, value, config);

    const category = config.type;
    if (value && value.trim() !== "") {
      results[category].found++;
    } else {
      results[category].missing++;
    }

    if (issues.length > 0) {
      const hasError = issues.some((i) => i.level === "error");
      const hasWarning = issues.some((i) => i.level === "warning");

      if (hasError) {
        results[category].invalid++;
        hasErrors = true;
      }
      if (hasWarning) {
        hasWarnings = true;
      }

      const statusIcon = hasError ? "❌" : hasWarning ? "⚠️" : "ℹ️";
      const statusColor = hasError ? "red" : hasWarning ? "yellow" : "blue";

      console.log(colorize(`${statusIcon} ${name}`, statusColor));
      issues.forEach((issue) => {
        const icon =
          issue.level === "error"
            ? "  ❌"
            : issue.level === "warning"
              ? "  ⚠️"
              : "  ℹ️";
        const color =
          issue.level === "error"
            ? "red"
            : issue.level === "warning"
              ? "yellow"
              : "blue";
        console.log(colorize(`${icon} ${issue.message}`, color));
      });
      console.log("");
    }
  }

  // Check for unknown variables
  for (const name of Object.keys(envLocal)) {
    if (!ENV_VARS[name] && !name.startsWith("VERCEL_") && name !== "NODE_ENV") {
      results.unknown.found++;
      console.log(colorize(`ℹ️  ${name}`, "blue"));
      console.log(
        colorize("  ℹ️  Unknown variable (not in configuration)", "blue"),
      );
      console.log("");
    }
  }

  // Summary
  console.log(colorize("📊 VALIDATION SUMMARY", "cyan"));
  console.log(colorize("===================", "cyan"));
  console.log("");

  const totalRequired = Object.values(ENV_VARS).filter(
    (v) => v.type === "required",
  ).length;
  const totalOptional = Object.values(ENV_VARS).filter(
    (v) => v.type === "optional",
  ).length;
  const totalPublic = Object.values(ENV_VARS).filter(
    (v) => v.type === "public",
  ).length;

  console.log(
    colorize(
      `Required Variables: ${results.required.found}/${totalRequired} configured`,
      results.required.missing === 0 ? "green" : "red",
    ),
  );
  if (results.required.missing > 0) {
    console.log(
      colorize(
        `  ❌ ${results.required.missing} missing required variables`,
        "red",
      ),
    );
  }
  if (results.required.invalid > 0) {
    console.log(
      colorize(
        `  ❌ ${results.required.invalid} invalid required variables`,
        "red",
      ),
    );
  }

  console.log(
    colorize(
      `Optional Variables: ${results.optional.found}/${totalOptional} configured`,
      "blue",
    ),
  );
  console.log(
    colorize(
      `Public Variables: ${results.public.found}/${totalPublic} configured`,
      "blue",
    ),
  );

  if (results.unknown.found > 0) {
    console.log(
      colorize(`Unknown Variables: ${results.unknown.found} found`, "yellow"),
    );
  }

  console.log("");

  // Deployment readiness
  const deploymentReady = !hasErrors && results.required.missing === 0;

  if (deploymentReady) {
    console.log(colorize("🚀 DEPLOYMENT READY!", "green"));
    console.log(
      colorize("All required variables are configured correctly.", "green"),
    );
  } else {
    console.log(colorize("❌ NOT DEPLOYMENT READY", "red"));
    console.log(colorize("Fix the errors above before deploying.", "red"));
  }

  console.log("");

  // Next steps
  console.log(colorize("📋 NEXT STEPS:", "cyan"));
  if (!deploymentReady) {
    console.log("1. Fix all error-level issues above");
    console.log("2. Replace placeholder values with actual credentials");
    console.log("3. Run validation again: npm run env:validate");
    console.log("4. Upload to Vercel: npm run env:upload");
  } else {
    console.log("1. Upload to Vercel: npm run env:upload");
    console.log("2. Verify in Vercel dashboard");
    console.log("3. Deploy your application");
    console.log(
      "4. Test deployment: curl https://your-domain.vercel.app/api/health",
    );
  }

  return deploymentReady;
}

async function checkVercelConfig() {
  console.log("");
  console.log(colorize("🔧 VERCEL CONFIGURATION CHECK", "cyan"));
  console.log(colorize("============================", "cyan"));
  console.log("");

  // Check if vercel.json exists
  try {
    const vercelConfig = JSON.parse(await fs.readFile("vercel.json", "utf-8"));
    console.log(colorize("✅ Found vercel.json configuration", "green"));

    if (vercelConfig.env) {
      console.log(
        colorize(
          `ℹ️  Environment variables defined in vercel.json: ${Object.keys(vercelConfig.env).length}`,
          "blue",
        ),
      );
    }

    if (vercelConfig.build && vercelConfig.build.env) {
      console.log(
        colorize(
          `ℹ️  Build environment variables: ${Object.keys(vercelConfig.build.env).length}`,
          "blue",
        ),
      );
    }
  } catch {
    console.log(colorize("ℹ️  No vercel.json found (using defaults)", "blue"));
  }

  // Check package.json for vercel-related scripts
  try {
    const pkg = JSON.parse(await fs.readFile("package.json", "utf-8"));
    const vercelScripts = Object.keys(pkg.scripts || {}).filter(
      (s) => s.includes("vercel") || s.includes("env:"),
    );

    if (vercelScripts.length > 0) {
      console.log(
        colorize(
          `✅ Found environment scripts: ${vercelScripts.join(", ")}`,
          "green",
        ),
      );
    }
  } catch {
    console.log(colorize("⚠️  Could not read package.json", "yellow"));
  }
}

async function main() {
  try {
    const isValid = await validateEnvironment();
    await checkVercelConfig();

    process.exit(isValid ? 0 : 1);
  } catch (error) {
    console.error(colorize("❌ Validation failed:", "red"), error.message);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { validateEnvironment, loadEnvFile, validateValue };

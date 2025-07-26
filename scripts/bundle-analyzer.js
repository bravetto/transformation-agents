#!/usr/bin/env node

/**
 * 🔥 JAHmere Webb Freedom Portal - Bundle Analyzer
 * Divine Engineering Excellence - Performance Optimization
 *
 * Comprehensive bundle analysis for optimal Vercel deployment
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const chalk = require("chalk");

// Divine constants
const PROJECT_ROOT = process.cwd();
const ANALYZE_DIR = path.join(PROJECT_ROOT, ".next/analyze");

console.log(
  chalk.cyan.bold("🔥 JAHmere Webb Freedom Portal - Bundle Analyzer"),
);
console.log(
  chalk.cyan("Divine Engineering Excellence - Performance Analysis\n"),
);

/**
 * Step 1: Build with analysis
 */
function buildWithAnalysis() {
  console.log(chalk.yellow("📦 Step 1: Building with bundle analysis..."));

  try {
    // Set environment variable for bundle analysis
    process.env.ANALYZE = "true";

    console.log(chalk.blue("   Running production build with analysis..."));
    execSync("npm run build:analyze", {
      stdio: "inherit",
      env: { ...process.env, ANALYZE: "true" },
    });

    console.log(chalk.green("✅ Build with analysis complete"));
  } catch (error) {
    console.error(chalk.red("❌ Build failed:"), error.message);
    process.exit(1);
  }
}

/**
 * Step 2: Analyze bundle composition
 */
function analyzeBundleComposition() {
  console.log(chalk.yellow("\n📊 Step 2: Analyzing bundle composition..."));

  // Check for bundle analysis files
  const clientBundlePath = path.join(ANALYZE_DIR, "client.json");
  const serverBundlePath = path.join(ANALYZE_DIR, "server.json");

  if (fs.existsSync(clientBundlePath)) {
    console.log(chalk.green("✅ Client bundle analysis available"));

    try {
      const clientData = JSON.parse(fs.readFileSync(clientBundlePath, "utf8"));
      console.log(
        chalk.blue(
          `   Client bundle size: ${formatBytes(clientData.totalSize || 0)}`,
        ),
      );

      // Analyze largest modules
      if (clientData.assets) {
        const largestAssets = clientData.assets
          .sort((a, b) => b.size - a.size)
          .slice(0, 5);

        console.log(chalk.yellow("   📈 Largest client assets:"));
        largestAssets.forEach((asset, index) => {
          console.log(
            chalk.white(
              `   ${index + 1}. ${asset.name}: ${formatBytes(asset.size)}`,
            ),
          );
        });
      }
    } catch (error) {
      console.log(chalk.yellow("⚠️  Could not parse client bundle data"));
    }
  } else {
    console.log(chalk.red("❌ Client bundle analysis not found"));
  }

  if (fs.existsSync(serverBundlePath)) {
    console.log(chalk.green("✅ Server bundle analysis available"));
  } else {
    console.log(chalk.red("❌ Server bundle analysis not found"));
  }
}

/**
 * Step 3: Performance recommendations
 */
function generateRecommendations() {
  console.log(
    chalk.yellow("\n🎯 Step 3: Generating performance recommendations..."),
  );

  const recommendations = {
    timestamp: new Date().toISOString(),
    mission_context: "JAHmere Webb Freedom Portal - July 28, 2025",
    performance_targets: {
      main_bundle: "< 250KB gzipped",
      first_load_js: "< 128KB",
      lcp: "< 2.5s",
      cls: "< 0.1",
      inp: "< 200ms",
    },
    optimization_opportunities: [
      {
        category: "Code Splitting",
        priority: "high",
        description: "Implement dynamic imports for large components",
        implementation:
          "Use Next.js dynamic() for heavy components like charts, editors",
        impact: "Reduce initial bundle size by 20-30%",
      },
      {
        category: "Image Optimization",
        priority: "high",
        description: "Ensure all images use Next.js Image component",
        implementation: "Convert <img> tags to <Image> with proper sizing",
        impact: "Improve LCP by 40-60%",
      },
      {
        category: "Font Optimization",
        priority: "medium",
        description: "Optimize font loading strategy",
        implementation: "Use font-display: swap and preload critical fonts",
        impact: "Reduce CLS and improve perceived performance",
      },
      {
        category: "Third-party Scripts",
        priority: "medium",
        description: "Optimize PostHog and analytics loading",
        implementation: "Load analytics scripts after critical content",
        impact: "Improve initial page load time",
      },
      {
        category: "Tree Shaking",
        priority: "low",
        description: "Ensure unused code is eliminated",
        implementation: "Review imports and use barrel exports carefully",
        impact: "Reduce bundle size by 5-10%",
      },
    ],
    divine_optimizations: [
      {
        feature: "JAHmere Freedom Countdown",
        optimization: "Lazy load countdown component after page render",
        divine_impact: "Maintains mission focus while optimizing performance",
      },
      {
        feature: "Prayer Room Live Features",
        optimization: "Use dynamic imports for real-time components",
        divine_impact:
          "Spiritual features load when needed, not blocking initial render",
      },
      {
        feature: "Character Witness Forms",
        optimization: "Progressive enhancement for form validation",
        divine_impact:
          "Critical legal features remain accessible even with JS disabled",
      },
    ],
  };

  // Generate Core Web Vitals optimization checklist
  const coreWebVitalsChecklist = {
    lcp_optimizations: [
      "Preload critical images and fonts",
      "Optimize server response times (< 200ms)",
      "Use CDN for static assets",
      "Implement ISR for semi-static content",
    ],
    cls_optimizations: [
      "Set explicit dimensions for images and embeds",
      "Reserve space for dynamic content",
      "Use CSS aspect-ratio for responsive media",
      "Avoid inserting content above existing elements",
    ],
    inp_optimizations: [
      "Minimize JavaScript execution time",
      "Use passive event listeners",
      "Implement virtual scrolling for long lists",
      "Optimize third-party scripts",
    ],
  };

  const reportPath = path.join(PROJECT_ROOT, "BUNDLE_ANALYSIS.json");
  fs.writeFileSync(
    reportPath,
    JSON.stringify(
      {
        ...recommendations,
        core_web_vitals_checklist: coreWebVitalsChecklist,
      },
      null,
      2,
    ),
  );

  console.log(chalk.green("✅ Performance recommendations generated"));
  console.log(chalk.blue(`   Report saved to: ${path.basename(reportPath)}`));
}

/**
 * Step 4: Generate optimization commands
 */
function generateOptimizationCommands() {
  console.log(chalk.yellow("\n⚡ Step 4: Generating optimization commands..."));

  const commands = {
    immediate_actions: [
      "npm run optimize:bundle",
      "npm run build:analyze",
      "npm run test:coverage",
    ],
    development_optimizations: [
      "npm run fix:development",
      "npm run clean",
      "npm run dev:turbo",
    ],
    production_preparation: [
      "npm run build",
      "npm run start",
      "npm run agents:certify",
    ],
  };

  console.log(chalk.cyan("\n📋 Optimization Commands:"));
  console.log(chalk.white("\n🔧 Immediate Actions:"));
  commands.immediate_actions.forEach((cmd) => {
    console.log(chalk.green(`   ${cmd}`));
  });

  console.log(chalk.white("\n🛠️  Development Optimizations:"));
  commands.development_optimizations.forEach((cmd) => {
    console.log(chalk.blue(`   ${cmd}`));
  });

  console.log(chalk.white("\n🚀 Production Preparation:"));
  commands.production_preparation.forEach((cmd) => {
    console.log(chalk.magenta(`   ${cmd}`));
  });
}

/**
 * Helper function to format bytes
 */
function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

/**
 * Main execution
 */
async function main() {
  try {
    console.log(chalk.blue("Starting comprehensive bundle analysis...\n"));

    buildWithAnalysis();
    analyzeBundleComposition();
    generateRecommendations();
    generateOptimizationCommands();

    console.log(chalk.green.bold("\n🎉 Bundle analysis complete!"));
    console.log(chalk.cyan("\n📊 Key Insights:"));
    console.log(chalk.white("• Bundle composition analyzed"));
    console.log(chalk.white("• Performance recommendations generated"));
    console.log(chalk.white("• Optimization commands prepared"));
    console.log(chalk.white("• Core Web Vitals checklist created"));

    console.log(chalk.yellow("\n⚡ Next Steps:"));
    console.log(chalk.white("1. Review BUNDLE_ANALYSIS.json"));
    console.log(chalk.white("2. Implement high-priority optimizations"));
    console.log(chalk.white("3. Test Core Web Vitals improvements"));
    console.log(chalk.white("4. Deploy with confidence to Vercel!"));
  } catch (error) {
    console.error(chalk.red("\n❌ Bundle analysis failed:"), error.message);
    process.exit(1);
  }
}

// Run the script
if (require.main === module) {
  main();
}

module.exports = { main };

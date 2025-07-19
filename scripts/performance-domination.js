#!/usr/bin/env node

/**
 * 🚀 PERFORMANCE DOMINATION SCRIPT
 * Total optimization and supremacy for The Bridge Project
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Color utilities for beautiful output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
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

function log(message, color = "white") {
  console.log(colorize(message, color));
}

function logHeader(title) {
  const border = "═".repeat(60);
  console.log();
  log(border, "cyan");
  log(`🚀 ${title.toUpperCase()}`, "bright");
  log(border, "cyan");
  console.log();
}

function logSuccess(message) {
  log(`✅ ${message}`, "green");
}

function logWarning(message) {
  log(`⚠️  ${message}`, "yellow");
}

function logError(message) {
  log(`❌ ${message}`, "red");
}

function logInfo(message) {
  log(`ℹ️  ${message}`, "blue");
}

class PerformanceDominator {
  constructor() {
    this.startTime = Date.now();
    this.results = {
      bundleOptimization: {},
      assetOptimization: {},
      cacheOptimization: {},
      performanceScore: 0,
      recommendations: [],
    };
  }

  async execute() {
    logHeader("Performance Domination - Total Optimization");

    try {
      // Phase 1: Bundle Analysis and Optimization
      await this.analyzeBundleSize();
      await this.optimizeBundle();

      // Phase 2: Asset Optimization
      await this.optimizeImages();
      await this.optimizeFonts();

      // Phase 3: Code Optimization
      await this.analyzeCodeSplitting();
      await this.optimizeComponents();

      // Phase 4: Performance Analysis
      await this.analyzeDependencies();
      await this.optimizeCaching();

      // Phase 5: Generate Report
      await this.generateOptimizationReport();

      logHeader("Performance Domination Complete");
      const duration = ((Date.now() - this.startTime) / 1000).toFixed(2);
      logSuccess(`Total optimization completed in ${duration}s`);
    } catch (error) {
      logError(`Performance optimization failed: ${error.message}`);
      process.exit(1);
    }
  }

  async analyzeBundleSize() {
    logHeader("Bundle Size Analysis");

    try {
      // Run build with bundle analysis
      logInfo("Building production bundle...");
      execSync("npm run build", { stdio: "pipe" });

      // Analyze .next directory
      const nextDir = path.join(process.cwd(), ".next");
      const staticDir = path.join(nextDir, "static");

      if (!fs.existsSync(staticDir)) {
        logWarning("Static build directory not found - build may have failed");
        return;
      }

      const bundleInfo = this.analyzeBundleDirectory(staticDir);
      this.results.bundleOptimization = bundleInfo;

      logSuccess(`Total bundle size: ${this.formatSize(bundleInfo.totalSize)}`);
      logInfo(
        `JavaScript: ${this.formatSize(bundleInfo.jsSize)} (${bundleInfo.jsFiles} files)`,
      );
      logInfo(
        `CSS: ${this.formatSize(bundleInfo.cssSize)} (${bundleInfo.cssFiles} files)`,
      );
      logInfo(
        `Images: ${this.formatSize(bundleInfo.imageSize)} (${bundleInfo.imageFiles} files)`,
      );

      // Bundle size recommendations
      if (bundleInfo.totalSize > 500 * 1024) {
        // 500KB
        logWarning(
          `Bundle size exceeds 500KB - consider aggressive optimization`,
        );
        this.results.recommendations.push(
          "Reduce bundle size through code splitting and tree shaking",
        );
      } else {
        logSuccess("Bundle size is within optimal range");
      }
    } catch (error) {
      logError(`Bundle analysis failed: ${error.message}`);
    }
  }

  analyzeBundleDirectory(dir) {
    const info = {
      totalSize: 0,
      jsSize: 0,
      cssSize: 0,
      imageSize: 0,
      jsFiles: 0,
      cssFiles: 0,
      imageFiles: 0,
      largestFiles: [],
    };

    const analyzeDir = (currentDir) => {
      if (!fs.existsSync(currentDir)) return;

      const items = fs.readdirSync(currentDir);

      for (const item of items) {
        const itemPath = path.join(currentDir, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory()) {
          analyzeDir(itemPath);
        } else {
          const size = stats.size;
          info.totalSize += size;

          const ext = path.extname(item).toLowerCase();
          const fileInfo = { name: item, size, path: itemPath };

          if (ext === ".js" || ext === ".mjs") {
            info.jsSize += size;
            info.jsFiles++;
          } else if (ext === ".css") {
            info.cssSize += size;
            info.cssFiles++;
          } else if (
            [
              ".png",
              ".jpg",
              ".jpeg",
              ".gif",
              ".webp",
              ".avif",
              ".svg",
            ].includes(ext)
          ) {
            info.imageSize += size;
            info.imageFiles++;
          }

          // Track largest files
          info.largestFiles.push(fileInfo);
        }
      }
    };

    analyzeDir(dir);

    // Sort largest files
    info.largestFiles.sort((a, b) => b.size - a.size);
    info.largestFiles = info.largestFiles.slice(0, 10); // Top 10

    return info;
  }

  formatSize(bytes) {
    if (bytes === 0) return "0 B";
    const k = 1024;
    const sizes = ["B", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  }

  async optimizeBundle() {
    logHeader("Bundle Optimization");

    try {
      // Analyze import statements for optimization opportunities
      const srcDir = path.join(process.cwd(), "src");
      const importAnalysis = this.analyzeImports(srcDir);

      logInfo(`Found ${importAnalysis.totalImports} import statements`);
      logInfo(
        `Potential optimizations: ${importAnalysis.optimizations.length}`,
      );

      // Report optimization opportunities
      importAnalysis.optimizations.forEach((opt) => {
        logWarning(`${opt.file}: ${opt.suggestion}`);
        this.results.recommendations.push(`${opt.file}: ${opt.suggestion}`);
      });

      // Check for duplicate dependencies
      const duplicates = this.findDuplicateDependencies();
      if (duplicates.length > 0) {
        logWarning(
          `Found ${duplicates.length} potential duplicate dependencies`,
        );
        duplicates.forEach((dup) => logWarning(`  - ${dup}`));
      }
    } catch (error) {
      logError(`Bundle optimization failed: ${error.message}`);
    }
  }

  analyzeImports(dir) {
    const analysis = {
      totalImports: 0,
      optimizations: [],
      heavyImports: [],
    };

    const analyzeFile = (filePath) => {
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        const lines = content.split("\n");

        lines.forEach((line, index) => {
          const trimmed = line.trim();

          // Count import statements
          if (trimmed.startsWith("import ")) {
            analysis.totalImports++;

            // Check for optimization opportunities
            if (
              trimmed.includes("framer-motion") &&
              !trimmed.includes("dynamic")
            ) {
              analysis.optimizations.push({
                file: path.relative(process.cwd(), filePath),
                line: index + 1,
                suggestion:
                  "Consider lazy loading framer-motion for better performance",
              });
            }

            if (trimmed.includes("lucide-react") && trimmed.includes("*")) {
              analysis.optimizations.push({
                file: path.relative(process.cwd(), filePath),
                line: index + 1,
                suggestion:
                  "Import specific icons instead of entire lucide-react package",
              });
            }

            if (
              trimmed.includes("@tsparticles") &&
              !trimmed.includes("dynamic")
            ) {
              analysis.optimizations.push({
                file: path.relative(process.cwd(), filePath),
                line: index + 1,
                suggestion: "tsParticles is heavy - ensure dynamic loading",
              });
            }
          }
        });
      } catch (error) {
        // Ignore read errors for non-text files
      }
    };

    const walkDir = (currentDir) => {
      if (!fs.existsSync(currentDir)) return;

      const items = fs.readdirSync(currentDir);

      for (const item of items) {
        const itemPath = path.join(currentDir, item);
        const stats = fs.statSync(itemPath);

        if (
          stats.isDirectory() &&
          !item.startsWith(".") &&
          item !== "node_modules"
        ) {
          walkDir(itemPath);
        } else if (
          stats.isFile() &&
          (item.endsWith(".ts") || item.endsWith(".tsx"))
        ) {
          analyzeFile(itemPath);
        }
      }
    };

    walkDir(dir);
    return analysis;
  }

  findDuplicateDependencies() {
    const duplicates = [];

    try {
      const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
      const dependencies = {
        ...packageJson.dependencies,
        ...packageJson.devDependencies,
      };

      // Check for common duplicate patterns
      const packages = Object.keys(dependencies);

      // Check for React duplicates
      const reactPackages = packages.filter((pkg) => pkg.includes("react"));
      if (reactPackages.length > 5) {
        duplicates.push("Multiple React-related packages detected");
      }

      // Check for animation duplicates
      const animationPackages = packages.filter(
        (pkg) =>
          pkg.includes("motion") ||
          pkg.includes("animate") ||
          pkg.includes("transition"),
      );
      if (animationPackages.length > 2) {
        duplicates.push("Multiple animation libraries detected");
      }
    } catch (error) {
      logWarning("Could not analyze package.json for duplicates");
    }

    return duplicates;
  }

  async optimizeImages() {
    logHeader("Image Optimization");

    try {
      const publicDir = path.join(process.cwd(), "public");
      const imageAnalysis = this.analyzeImages(publicDir);

      logInfo(`Found ${imageAnalysis.totalImages} images`);
      logInfo(`Total image size: ${this.formatSize(imageAnalysis.totalSize)}`);

      // Check for optimization opportunities
      if (imageAnalysis.unoptimized.length > 0) {
        logWarning(
          `${imageAnalysis.unoptimized.length} images could be optimized:`,
        );
        imageAnalysis.unoptimized.slice(0, 5).forEach((img) => {
          logWarning(`  - ${img.name} (${this.formatSize(img.size)})`);
        });

        this.results.recommendations.push(
          "Convert images to WebP/AVIF format for better compression",
        );
      }

      if (imageAnalysis.largeImages.length > 0) {
        logWarning(
          `${imageAnalysis.largeImages.length} large images detected (>100KB):`,
        );
        imageAnalysis.largeImages.slice(0, 3).forEach((img) => {
          logWarning(`  - ${img.name} (${this.formatSize(img.size)})`);
        });

        this.results.recommendations.push(
          "Resize large images and implement responsive images",
        );
      }

      this.results.assetOptimization.images = imageAnalysis;
    } catch (error) {
      logError(`Image optimization analysis failed: ${error.message}`);
    }
  }

  analyzeImages(dir) {
    const analysis = {
      totalImages: 0,
      totalSize: 0,
      unoptimized: [],
      largeImages: [],
      formats: {},
    };

    const walkDir = (currentDir) => {
      if (!fs.existsSync(currentDir)) return;

      const items = fs.readdirSync(currentDir);

      for (const item of items) {
        const itemPath = path.join(currentDir, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory() && !item.startsWith(".")) {
          walkDir(itemPath);
        } else if (stats.isFile()) {
          const ext = path.extname(item).toLowerCase();

          if (
            [
              ".png",
              ".jpg",
              ".jpeg",
              ".gif",
              ".webp",
              ".avif",
              ".svg",
            ].includes(ext)
          ) {
            analysis.totalImages++;
            analysis.totalSize += stats.size;

            // Track formats
            analysis.formats[ext] = (analysis.formats[ext] || 0) + 1;

            // Check for unoptimized formats
            if ([".png", ".jpg", ".jpeg"].includes(ext)) {
              analysis.unoptimized.push({
                name: item,
                size: stats.size,
                path: itemPath,
              });
            }

            // Check for large images
            if (stats.size > 100 * 1024) {
              // 100KB
              analysis.largeImages.push({
                name: item,
                size: stats.size,
                path: itemPath,
              });
            }
          }
        }
      }
    };

    walkDir(dir);
    return analysis;
  }

  async optimizeFonts() {
    logHeader("Font Optimization");

    try {
      // Check for font usage in CSS and components
      const fontUsage = this.analyzeFontUsage();

      logInfo(`Font families detected: ${fontUsage.families.length}`);

      if (fontUsage.families.length > 3) {
        logWarning(
          "Multiple font families detected - consider reducing for better performance",
        );
        this.results.recommendations.push("Limit to 2-3 font families maximum");
      }

      // Check for font loading optimization
      if (!fontUsage.hasPreload) {
        logWarning("Font preloading not detected");
        this.results.recommendations.push(
          "Implement font preloading for critical fonts",
        );
      }

      if (!fontUsage.hasDisplaySwap) {
        logWarning("font-display: swap not detected");
        this.results.recommendations.push(
          "Add font-display: swap for better perceived performance",
        );
      }
    } catch (error) {
      logError(`Font optimization analysis failed: ${error.message}`);
    }
  }

  analyzeFontUsage() {
    const analysis = {
      families: [],
      hasPreload: false,
      hasDisplaySwap: false,
    };

    // Check globals.css
    const globalsPath = path.join(process.cwd(), "src/app/globals.css");
    if (fs.existsSync(globalsPath)) {
      const content = fs.readFileSync(globalsPath, "utf-8");

      // Look for font families
      const fontFamilyMatches = content.match(/font-family[^;]+;/g) || [];
      fontFamilyMatches.forEach((match) => {
        if (!analysis.families.includes(match)) {
          analysis.families.push(match);
        }
      });

      // Check for font-display
      if (content.includes("font-display: swap")) {
        analysis.hasDisplaySwap = true;
      }
    }

    // Check for font preloading in layout
    const layoutPath = path.join(process.cwd(), "src/app/layout.tsx");
    if (fs.existsSync(layoutPath)) {
      const content = fs.readFileSync(layoutPath, "utf-8");
      if (content.includes('rel="preload"') && content.includes('as="font"')) {
        analysis.hasPreload = true;
      }
    }

    return analysis;
  }

  async analyzeCodeSplitting() {
    logHeader("Code Splitting Analysis");

    try {
      const srcDir = path.join(process.cwd(), "src");
      const splittingAnalysis = this.analyzeCodeSplittingUsage(srcDir);

      logInfo(`Dynamic imports found: ${splittingAnalysis.dynamicImports}`);
      logInfo(
        `Components with dynamic loading: ${splittingAnalysis.dynamicComponents}`,
      );

      if (splittingAnalysis.heavyComponents.length > 0) {
        logWarning("Heavy components without dynamic loading detected:");
        splittingAnalysis.heavyComponents.forEach((comp) => {
          logWarning(`  - ${comp.file}: ${comp.reason}`);
          this.results.recommendations.push(
            `Consider dynamic loading for ${comp.file}: ${comp.reason}`,
          );
        });
      }

      if (splittingAnalysis.dynamicImports < 5) {
        logWarning(
          "Low usage of dynamic imports - consider more aggressive code splitting",
        );
        this.results.recommendations.push(
          "Implement more dynamic imports for better code splitting",
        );
      } else {
        logSuccess("Good code splitting implementation detected");
      }
    } catch (error) {
      logError(`Code splitting analysis failed: ${error.message}`);
    }
  }

  analyzeCodeSplittingUsage(dir) {
    const analysis = {
      dynamicImports: 0,
      dynamicComponents: 0,
      heavyComponents: [],
    };

    const analyzeFile = (filePath) => {
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        const fileName = path.basename(filePath);

        // Count dynamic imports
        const dynamicMatches = content.match(/dynamic\s*\(/g) || [];
        analysis.dynamicImports += dynamicMatches.length;

        // Check for components that should be dynamic
        if (content.includes("framer-motion") && !content.includes("dynamic")) {
          analysis.heavyComponents.push({
            file: fileName,
            reason: "Uses framer-motion without dynamic loading",
          });
        }

        if (content.includes("@tsparticles") && !content.includes("dynamic")) {
          analysis.heavyComponents.push({
            file: fileName,
            reason: "Uses tsParticles without dynamic loading",
          });
        }

        if (content.includes("react-spring") && !content.includes("dynamic")) {
          analysis.heavyComponents.push({
            file: fileName,
            reason: "Uses react-spring without dynamic loading",
          });
        }

        // Count components with dynamic loading
        if (content.includes("dynamic") && fileName.includes("component")) {
          analysis.dynamicComponents++;
        }
      } catch (error) {
        // Ignore read errors
      }
    };

    const walkDir = (currentDir) => {
      if (!fs.existsSync(currentDir)) return;

      const items = fs.readdirSync(currentDir);

      for (const item of items) {
        const itemPath = path.join(currentDir, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory() && !item.startsWith(".")) {
          walkDir(itemPath);
        } else if (
          stats.isFile() &&
          (item.endsWith(".tsx") || item.endsWith(".ts"))
        ) {
          analyzeFile(itemPath);
        }
      }
    };

    walkDir(dir);
    return analysis;
  }

  async optimizeComponents() {
    logHeader("Component Optimization");

    try {
      const srcDir = path.join(process.cwd(), "src/components");
      const componentAnalysis = this.analyzeComponents(srcDir);

      logInfo(`Total components: ${componentAnalysis.totalComponents}`);
      logInfo(
        `Large components (>500 lines): ${componentAnalysis.largeComponents.length}`,
      );
      logInfo(
        `Components with error boundaries: ${componentAnalysis.withErrorBoundaries}`,
      );

      // Report large components
      if (componentAnalysis.largeComponents.length > 0) {
        logWarning("Large components detected (consider splitting):");
        componentAnalysis.largeComponents.forEach((comp) => {
          logWarning(`  - ${comp.name} (${comp.lines} lines)`);
        });
        this.results.recommendations.push(
          "Split large components for better maintainability",
        );
      }

      // Report missing error boundaries
      const withoutBoundaries =
        componentAnalysis.totalComponents -
        componentAnalysis.withErrorBoundaries;
      if (withoutBoundaries > 0) {
        logWarning(`${withoutBoundaries} components without error boundaries`);
        this.results.recommendations.push(
          "Add error boundaries to all client components",
        );
      }
    } catch (error) {
      logError(`Component optimization analysis failed: ${error.message}`);
    }
  }

  analyzeComponents(dir) {
    const analysis = {
      totalComponents: 0,
      largeComponents: [],
      withErrorBoundaries: 0,
    };

    const analyzeFile = (filePath) => {
      try {
        const content = fs.readFileSync(filePath, "utf-8");
        const fileName = path.basename(filePath);
        const lines = content.split("\n").length;

        // Count as component if it exports a React component
        if (
          (content.includes("export default") ||
            content.includes("export const")) &&
          (content.includes("React.FC") ||
            content.includes("function") ||
            content.includes("=>"))
        ) {
          analysis.totalComponents++;

          // Check for large components
          if (lines > 500) {
            analysis.largeComponents.push({
              name: fileName,
              lines: lines,
              path: filePath,
            });
          }

          // Check for error boundaries
          if (
            content.includes("ErrorBoundary") ||
            content.includes("withErrorBoundary")
          ) {
            analysis.withErrorBoundaries++;
          }
        }
      } catch (error) {
        // Ignore read errors
      }
    };

    const walkDir = (currentDir) => {
      if (!fs.existsSync(currentDir)) return;

      const items = fs.readdirSync(currentDir);

      for (const item of items) {
        const itemPath = path.join(currentDir, item);
        const stats = fs.statSync(itemPath);

        if (stats.isDirectory() && !item.startsWith(".")) {
          walkDir(itemPath);
        } else if (stats.isFile() && item.endsWith(".tsx")) {
          analyzeFile(itemPath);
        }
      }
    };

    walkDir(dir);
    return analysis;
  }

  async analyzeDependencies() {
    logHeader("Dependency Analysis");

    try {
      const packageJson = JSON.parse(fs.readFileSync("package.json", "utf-8"));
      const deps = Object.keys(packageJson.dependencies || {});
      const devDeps = Object.keys(packageJson.devDependencies || {});

      logInfo(`Production dependencies: ${deps.length}`);
      logInfo(`Development dependencies: ${devDeps.length}`);

      // Check for heavy dependencies
      const heavyDeps = [
        "lodash",
        "moment",
        "axios",
        "jquery",
        "bootstrap",
        "material-ui",
        "antd",
        "semantic-ui",
      ];

      const foundHeavy = deps.filter((dep) =>
        heavyDeps.some((heavy) => dep.includes(heavy)),
      );
      if (foundHeavy.length > 0) {
        logWarning("Heavy dependencies detected:");
        foundHeavy.forEach((dep) => logWarning(`  - ${dep}`));
        this.results.recommendations.push(
          "Consider lighter alternatives for heavy dependencies",
        );
      }

      // Check for outdated patterns
      if (deps.includes("react-router-dom")) {
        logWarning(
          "Using react-router-dom - consider Next.js built-in routing",
        );
      }

      if (deps.includes("redux")) {
        logWarning(
          "Using Redux - consider React Context or Zustand for simpler state management",
        );
      }
    } catch (error) {
      logError(`Dependency analysis failed: ${error.message}`);
    }
  }

  async optimizeCaching() {
    logHeader("Cache Optimization");

    try {
      // Check Next.js configuration
      const nextConfigPath = path.join(process.cwd(), "next.config.js");
      if (fs.existsSync(nextConfigPath)) {
        const configContent = fs.readFileSync(nextConfigPath, "utf-8");

        let cacheOptimizations = 0;

        if (configContent.includes("Cache-Control")) {
          cacheOptimizations++;
          logSuccess("Cache-Control headers configured");
        } else {
          logWarning("Cache-Control headers not configured");
          this.results.recommendations.push(
            "Add aggressive caching headers for static assets",
          );
        }

        if (configContent.includes("splitChunks")) {
          cacheOptimizations++;
          logSuccess("Code splitting configuration found");
        } else {
          logWarning("Advanced code splitting not configured");
          this.results.recommendations.push(
            "Configure webpack splitChunks for better caching",
          );
        }

        if (configContent.includes("minimumCacheTTL")) {
          cacheOptimizations++;
          logSuccess("Image caching optimized");
        } else {
          logWarning("Image caching not optimized");
          this.results.recommendations.push(
            "Configure image caching with long TTL",
          );
        }

        this.results.cacheOptimization.score = (cacheOptimizations / 3) * 100;
      } else {
        logWarning("next.config.js not found");
        this.results.recommendations.push(
          "Create next.config.js with performance optimizations",
        );
      }
    } catch (error) {
      logError(`Cache optimization analysis failed: ${error.message}`);
    }
  }

  async generateOptimizationReport() {
    logHeader("Performance Optimization Report");

    const report = {
      timestamp: new Date().toISOString(),
      duration: ((Date.now() - this.startTime) / 1000).toFixed(2),
      results: this.results,
      score: this.calculateOverallScore(),
      grade: "",
      summary: {
        critical: [],
        warnings: [],
        successes: [],
      },
    };

    // Calculate grade
    if (report.score >= 90) report.grade = "A";
    else if (report.score >= 80) report.grade = "B";
    else if (report.score >= 70) report.grade = "C";
    else if (report.score >= 60) report.grade = "D";
    else report.grade = "F";

    // Bundle analysis
    const bundle = this.results.bundleOptimization;
    if (bundle.totalSize) {
      if (bundle.totalSize > 1024 * 1024) {
        // 1MB
        report.summary.critical.push("Bundle size exceeds 1MB");
      } else if (bundle.totalSize > 500 * 1024) {
        // 500KB
        report.summary.warnings.push(
          `Bundle size: ${this.formatSize(bundle.totalSize)}`,
        );
      } else {
        report.summary.successes.push(
          `Optimal bundle size: ${this.formatSize(bundle.totalSize)}`,
        );
      }
    }

    // Recommendations summary
    if (this.results.recommendations.length > 10) {
      report.summary.critical.push(
        `${this.results.recommendations.length} optimization opportunities`,
      );
    } else if (this.results.recommendations.length > 5) {
      report.summary.warnings.push(
        `${this.results.recommendations.length} recommendations`,
      );
    } else {
      report.summary.successes.push(
        "Few optimization recommendations - good performance",
      );
    }

    // Display report
    log(
      `\n🎯 OVERALL PERFORMANCE SCORE: ${report.score}/100 (Grade: ${report.grade})`,
      report.grade === "A" ? "green" : report.grade === "B" ? "yellow" : "red",
    );

    if (report.summary.critical.length > 0) {
      log("\n🚨 CRITICAL ISSUES:", "red");
      report.summary.critical.forEach((issue) => log(`  • ${issue}`, "red"));
    }

    if (report.summary.warnings.length > 0) {
      log("\n⚠️  WARNINGS:", "yellow");
      report.summary.warnings.forEach((warning) =>
        log(`  • ${warning}`, "yellow"),
      );
    }

    if (report.summary.successes.length > 0) {
      log("\n✅ SUCCESSES:", "green");
      report.summary.successes.forEach((success) =>
        log(`  • ${success}`, "green"),
      );
    }

    if (this.results.recommendations.length > 0) {
      log("\n💡 TOP RECOMMENDATIONS:", "cyan");
      this.results.recommendations
        .slice(0, 5)
        .forEach((rec) => log(`  • ${rec}`, "cyan"));
    }

    // Save detailed report
    const reportPath = path.join(process.cwd(), "performance-report.json");
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    logSuccess(`Detailed report saved to: ${reportPath}`);
  }

  calculateOverallScore() {
    let score = 100;
    const recommendations = this.results.recommendations.length;

    // Deduct based on number of recommendations
    score -= Math.min(recommendations * 5, 50); // Max 50 point deduction

    // Bundle size impact
    const bundle = this.results.bundleOptimization;
    if (bundle.totalSize > 1024 * 1024)
      score -= 30; // 1MB+
    else if (bundle.totalSize > 500 * 1024) score -= 15; // 500KB+

    // Cache optimization impact
    if (this.results.cacheOptimization.score) {
      score = (score + this.results.cacheOptimization.score) / 2;
    }

    return Math.max(0, Math.round(score));
  }
}

// Execute performance domination
if (require.main === module) {
  const dominator = new PerformanceDominator();
  dominator.execute().catch((error) => {
    console.error("Performance domination failed:", error);
    process.exit(1);
  });
}

module.exports = PerformanceDominator;

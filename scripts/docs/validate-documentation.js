#!/usr/bin/env node

/**
 * 🔍 DOCUMENTATION VALIDATION SYSTEM
 * Automated maintenance and validation for The Bridge Project documentation
 *
 * Features:
 * - Link integrity validation
 * - Cross-reference checking
 * - Content completeness verification
 * - File structure validation
 * - Performance monitoring
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Configuration
const CONFIG = {
  rootDir: process.cwd(),
  docsDir: path.join(process.cwd(), "docs"),
  archiveDir: path.join(process.cwd(), "docs", "archive"),
  maxFileCount: 25, // Alert if we exceed our optimized count
  requiredMasterDocs: [
    "README.md",
    "ARCHITECTURE.md",
    "API_REFERENCE.md",
    "DESIGN_SYSTEM_DOCUMENTATION.md",
    "DEVELOPER_ONBOARDING_GUIDE.md",
    "TESTING_STRATEGY.md",
    "AI_INTERFACE_DOCUMENTATION.md",
    "CASCADE_PREVENTION_SYSTEM.md",
    "MASTER_STATUS.md",
    "DEPLOYMENT_STRUGGLES_DOCUMENTATION.md",
    "COMPONENT_LIBRARY.md",
    "UX_DOCUMENTATION.md",
  ],
};

class DocumentationValidator {
  constructor() {
    this.results = {
      totalFiles: 0,
      brokenLinks: [],
      missingFiles: [],
      duplicateContent: [],
      outdatedReferences: [],
      performanceIssues: [],
      validationErrors: [],
      suggestions: [],
    };

    this.allMarkdownFiles = [];
    this.linkPattern = /\[([^\]]+)\]\(([^)]+)\)/g;
    this.refPattern = /\[([^\]]+)\]\[([^\]]+)\]/g;
  }

  /**
   * 🎯 Main validation entry point
   */
  async validate() {
    console.log("🔍 Starting Documentation Validation...\n");

    try {
      await this.scanFiles();
      await this.validateFileStructure();
      await this.validateLinks();
      await this.validateCrossReferences();
      await this.checkContentQuality();
      await this.validatePerformance();
      await this.generateReport();

      console.log("✅ Documentation validation complete!\n");
      return this.results;
    } catch (error) {
      console.error("❌ Validation failed:", error.message);
      process.exit(1);
    }
  }

  /**
   * 📁 Scan all markdown files
   */
  async scanFiles() {
    console.log("📁 Scanning documentation files...");

    // Get all markdown files (excluding node_modules and .git)
    const getAllMdFiles = (dir, fileList = []) => {
      const files = fs.readdirSync(dir);

      files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          // Skip certain directories
          if (!["node_modules", ".git", ".next", "coverage"].includes(file)) {
            getAllMdFiles(filePath, fileList);
          }
        } else if (file.endsWith(".md")) {
          fileList.push(filePath);
        }
      });

      return fileList;
    };

    this.allMarkdownFiles = getAllMdFiles(CONFIG.rootDir);
    this.results.totalFiles = this.allMarkdownFiles.length;

    console.log(`   Found ${this.results.totalFiles} markdown files`);
  }

  /**
   * 🏗️ Validate file structure integrity
   */
  async validateFileStructure() {
    console.log("🏗️ Validating file structure...");

    // Check if we have too many files (regression detection)
    const activeFiles = this.allMarkdownFiles.filter(
      (file) =>
        !file.includes("archive/") &&
        !file.includes("node_modules/") &&
        !file.includes(".documentation-backup/"),
    );

    if (activeFiles.length > CONFIG.maxFileCount) {
      this.results.performanceIssues.push({
        type: "file_count_regression",
        message: `Active file count (${activeFiles.length}) exceeds optimized limit (${CONFIG.maxFileCount})`,
        severity: "warning",
      });
    }

    // Check for required master documents
    CONFIG.requiredMasterDocs.forEach((requiredDoc) => {
      const docPath = path.join(CONFIG.docsDir, requiredDoc);
      if (!fs.existsSync(docPath)) {
        this.results.missingFiles.push({
          file: requiredDoc,
          type: "master_document",
          severity: "critical",
        });
      }
    });

    // Check for duplicate filenames
    const filenames = this.allMarkdownFiles.map((file) => path.basename(file));
    const duplicates = filenames.filter(
      (name, index) => filenames.indexOf(name) !== index,
    );

    duplicates.forEach((duplicate) => {
      this.results.duplicateContent.push({
        type: "duplicate_filename",
        file: duplicate,
        severity: "warning",
      });
    });

    console.log(`   ✅ Structure validation complete`);
  }

  /**
   * 🔗 Validate all internal links
   */
  async validateLinks() {
    console.log("🔗 Validating internal links...");

    for (const filePath of this.allMarkdownFiles) {
      const content = fs.readFileSync(filePath, "utf-8");
      const relativePath = path.relative(CONFIG.rootDir, filePath);

      let match;
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

      while ((match = linkRegex.exec(content)) !== null) {
        const [fullMatch, linkText, linkUrl] = match;

        // Skip external links
        if (linkUrl.startsWith("http") || linkUrl.startsWith("mailto:")) {
          continue;
        }

        // Resolve relative path
        const linkPath = path.resolve(path.dirname(filePath), linkUrl);

        // Check if file exists
        if (!fs.existsSync(linkPath)) {
          this.results.brokenLinks.push({
            sourceFile: relativePath,
            linkText,
            linkUrl,
            resolvedPath: path.relative(CONFIG.rootDir, linkPath),
            severity: "error",
          });
        }
      }
    }

    console.log(`   Found ${this.results.brokenLinks.length} broken links`);
  }

  /**
   * 📚 Validate cross-references and content quality
   */
  async validateCrossReferences() {
    console.log("📚 Validating cross-references...");

    // Check for outdated references to deleted files
    const deletedFilePatterns = [
      "COMPONENT_PATTERNS.md",
      "technical.md",
      "scope.md",
      "QUICK_START_GUIDE.md",
      "BUILD_.*\\.md",
      "PHASE_2_.*\\.md",
      "PROJECT_RECOVERY.md",
    ];

    for (const filePath of this.allMarkdownFiles) {
      const content = fs.readFileSync(filePath, "utf-8");
      const relativePath = path.relative(CONFIG.rootDir, filePath);

      deletedFilePatterns.forEach((pattern) => {
        const regex = new RegExp(pattern, "gi");
        if (regex.test(content)) {
          this.results.outdatedReferences.push({
            sourceFile: relativePath,
            outdatedReference: pattern,
            severity: "warning",
          });
        }
      });
    }

    console.log(
      `   Found ${this.results.outdatedReferences.length} outdated references`,
    );
  }

  /**
   * 📊 Check content quality and completeness
   */
  async checkContentQuality() {
    console.log("📊 Checking content quality...");

    for (const filePath of this.allMarkdownFiles) {
      const content = fs.readFileSync(filePath, "utf-8");
      const relativePath = path.relative(CONFIG.rootDir, filePath);

      // Check for empty files
      if (content.trim().length < 100) {
        this.results.validationErrors.push({
          file: relativePath,
          type: "empty_or_minimal_content",
          severity: "warning",
        });
      }

      // Check for TODO markers
      if (content.includes("TODO") || content.includes("FIXME")) {
        this.results.suggestions.push({
          file: relativePath,
          type: "pending_todos",
          severity: "info",
        });
      }

      // Check for proper headings structure
      const headings = content.match(/^#+\s+.+$/gm);
      if (headings && headings.length > 0) {
        const firstHeading = headings[0];
        if (!firstHeading.startsWith("# ")) {
          this.results.suggestions.push({
            file: relativePath,
            type: "heading_structure",
            message: "Consider starting with H1 heading",
            severity: "info",
          });
        }
      }
    }

    console.log(`   Quality check complete`);
  }

  /**
   * ⚡ Validate performance metrics
   */
  async validatePerformance() {
    console.log("⚡ Validating performance metrics...");

    // Calculate total documentation size
    let totalSize = 0;
    const activeFiles = this.allMarkdownFiles.filter(
      (file) => !file.includes("archive/") && !file.includes("node_modules/"),
    );

    activeFiles.forEach((file) => {
      const stats = fs.statSync(file);
      totalSize += stats.size;
    });

    const totalSizeMB = (totalSize / (1024 * 1024)).toFixed(2);

    // Performance thresholds
    const MAX_SIZE_MB = 10; // 10MB limit for active docs
    const MAX_ACTIVE_FILES = 25;

    if (totalSizeMB > MAX_SIZE_MB) {
      this.results.performanceIssues.push({
        type: "size_limit_exceeded",
        message: `Total documentation size (${totalSizeMB}MB) exceeds limit (${MAX_SIZE_MB}MB)`,
        severity: "warning",
      });
    }

    if (activeFiles.length > MAX_ACTIVE_FILES) {
      this.results.performanceIssues.push({
        type: "file_count_limit_exceeded",
        message: `Active file count (${activeFiles.length}) exceeds optimized limit (${MAX_ACTIVE_FILES})`,
        severity: "warning",
      });
    }

    console.log(
      `   📊 Total size: ${totalSizeMB}MB across ${activeFiles.length} active files`,
    );
  }

  /**
   * 📋 Generate comprehensive validation report
   */
  async generateReport() {
    console.log("📋 Generating validation report...");

    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        totalFiles: this.results.totalFiles,
        brokenLinks: this.results.brokenLinks.length,
        missingFiles: this.results.missingFiles.length,
        outdatedReferences: this.results.outdatedReferences.length,
        performanceIssues: this.results.performanceIssues.length,
        overallHealth: this.calculateHealthScore(),
      },
      details: this.results,
    };

    // Save detailed report
    const reportPath = path.join(
      CONFIG.rootDir,
      "docs",
      "validation-report.json",
    );
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));

    // Generate markdown summary
    await this.generateMarkdownReport(report);

    // Console output
    this.displayResults(report);

    console.log(`   📄 Detailed report saved to: ${reportPath}`);
  }

  /**
   * 📊 Calculate overall health score
   */
  calculateHealthScore() {
    const issues =
      this.results.brokenLinks.length +
      this.results.missingFiles.length +
      this.results.performanceIssues.length;

    if (issues === 0) return "excellent";
    if (issues <= 2) return "good";
    if (issues <= 5) return "fair";
    return "needs_attention";
  }

  /**
   * 📝 Generate markdown report
   */
  async generateMarkdownReport(report) {
    const reportMd = `# 📊 Documentation Validation Report
**Generated**: ${new Date().toLocaleString()}  
**Overall Health**: ${report.summary.overallHealth.toUpperCase()}  

## 📈 Summary
- **Total Files**: ${report.summary.totalFiles}
- **Broken Links**: ${report.summary.brokenLinks}
- **Missing Files**: ${report.summary.missingFiles}
- **Outdated References**: ${report.summary.outdatedReferences}
- **Performance Issues**: ${report.summary.performanceIssues}

${
  report.summary.brokenLinks > 0
    ? `
## 🔗 Broken Links
${this.results.brokenLinks
  .map(
    (link) =>
      `- **${link.sourceFile}**: [${link.linkText}](${link.linkUrl}) → ${link.resolvedPath}`,
  )
  .join("\n")}
`
    : ""
}

${
  report.summary.missingFiles > 0
    ? `
## 📁 Missing Files
${this.results.missingFiles
  .map((file) => `- **${file.file}** (${file.type})`)
  .join("\n")}
`
    : ""
}

${
  report.summary.outdatedReferences > 0
    ? `
## ⚠️ Outdated References
${this.results.outdatedReferences
  .map(
    (ref) =>
      `- **${ref.sourceFile}**: References deleted file pattern "${ref.outdatedReference}"`,
  )
  .join("\n")}
`
    : ""
}

## ✅ Recommendations
${this.generateRecommendations()}

---
*Automated validation by The Bridge Project Documentation System*
`;

    const reportPath = path.join(
      CONFIG.rootDir,
      "docs",
      "VALIDATION_REPORT.md",
    );
    fs.writeFileSync(reportPath, reportMd);
  }

  /**
   * 💡 Generate recommendations
   */
  generateRecommendations() {
    const recommendations = [];

    if (this.results.brokenLinks.length > 0) {
      recommendations.push(
        "🔗 Fix broken internal links to restore navigation integrity",
      );
    }

    if (this.results.missingFiles.length > 0) {
      recommendations.push(
        "📁 Create missing master documents to complete documentation structure",
      );
    }

    if (this.results.outdatedReferences.length > 0) {
      recommendations.push(
        "📚 Update references to deleted files with current documentation links",
      );
    }

    if (this.results.performanceIssues.length > 0) {
      recommendations.push(
        "⚡ Address performance issues to maintain optimization benefits",
      );
    }

    if (recommendations.length === 0) {
      recommendations.push(
        "🏆 Documentation is in excellent condition! No issues found.",
      );
    }

    return recommendations.map((rec) => `- ${rec}`).join("\n");
  }

  /**
   * 🖥️ Display results in console
   */
  displayResults(report) {
    console.log("\n" + "=".repeat(60));
    console.log("📊 DOCUMENTATION VALIDATION RESULTS");
    console.log("=".repeat(60));

    // Health indicator
    const healthEmoji = {
      excellent: "🟢",
      good: "🟡",
      fair: "🟠",
      needs_attention: "🔴",
    };

    console.log(
      `\n${healthEmoji[report.summary.overallHealth]} Overall Health: ${report.summary.overallHealth.toUpperCase()}`,
    );
    console.log(`📁 Total Files: ${report.summary.totalFiles}`);

    if (report.summary.brokenLinks > 0) {
      console.log(`🔗 Broken Links: ${report.summary.brokenLinks}`);
    }

    if (report.summary.missingFiles > 0) {
      console.log(`📁 Missing Files: ${report.summary.missingFiles}`);
    }

    if (report.summary.outdatedReferences > 0) {
      console.log(
        `📚 Outdated References: ${report.summary.outdatedReferences}`,
      );
    }

    if (report.summary.performanceIssues > 0) {
      console.log(`⚡ Performance Issues: ${report.summary.performanceIssues}`);
    }

    console.log("\n" + "=".repeat(60));

    if (report.summary.overallHealth === "excellent") {
      console.log(
        "🏆 Congratulations! Your documentation is in perfect condition.",
      );
    } else {
      console.log("💡 See validation report for detailed recommendations.");
    }
  }
}

// CLI execution
if (require.main === module) {
  const validator = new DocumentationValidator();
  validator.validate().catch(console.error);
}

module.exports = DocumentationValidator;

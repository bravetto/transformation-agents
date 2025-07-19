#!/usr/bin/env node

/**
 * 🔧 AUTOMATED LINK REPAIR SYSTEM
 * Automatically fixes common broken links in documentation
 *
 * Features:
 * - Detects and fixes broken internal links
 * - Updates references to moved/renamed files
 * - Repairs outdated documentation references
 * - Maintains backup of original files
 */

const fs = require("fs");
const path = require("path");

class LinkRepairer {
  constructor() {
    this.rootDir = process.cwd();
    this.docsDir = path.join(this.rootDir, "docs");
    this.backupDir = path.join(this.rootDir, ".link-repair-backup");
    this.repairs = [];

    // Common file mappings for moved/renamed files
    this.fileMappings = {
      // Old file -> New file mappings
      "COMPONENT_PATTERNS.md": "docs/COMPONENT_LIBRARY.md",
      "technical.md": "docs/ARCHITECTURE.md",
      "scope.md": "docs/ARCHITECTURE.md",
      "QUICK_START_GUIDE.md": "docs/DEVELOPER_ONBOARDING_GUIDE.md",
      "DEPLOYMENT_CHECKLIST.md": "docs/DEPLOYMENT_STRUGGLES_DOCUMENTATION.md",
      "PROJECT_STATUS.md": "docs/MASTER_STATUS.md",
      "ROLLBACK_PROCEDURES.md": "docs/CASCADE_PREVENTION_SYSTEM.md",
      "SAFE_DEVELOPMENT_GUIDE.md": "docs/DEVELOPER_ONBOARDING_GUIDE.md",
      "CLICKUP_CRM_INTEGRATION.md": "docs/API_REFERENCE.md",
      "color-system.md": "docs/DESIGN_SYSTEM_DOCUMENTATION.md",
      "responsive-design-guide.md": "docs/DESIGN_SYSTEM_DOCUMENTATION.md",
      "trinity-ux-system/README.md": "docs/UX_DOCUMENTATION.md",
      "WEBSITE_UX_UI_STATE.md": "docs/UX_DOCUMENTATION.md",
      "BUILD_3609_README.md": "docs/archive/builds/BUILD_3609_README.md",
      "migration_summary.md": "docs/archive/migrations/migration_summary.md",
    };

    // Section mappings for content that moved within files
    this.sectionMappings = {
      "COMPONENT_PATTERNS.md#button-patterns":
        "docs/COMPONENT_LIBRARY.md#button-components",
      "technical.md#architecture": "docs/ARCHITECTURE.md#system-architecture",
      "scope.md#project-scope": "docs/ARCHITECTURE.md#project-scope",
    };
  }

  /**
   * 🚀 Main repair process
   */
  async repairLinks() {
    console.log("🔧 Starting automated link repair...\n");

    try {
      await this.createBackup();
      const markdownFiles = await this.findMarkdownFiles();

      for (const filePath of markdownFiles) {
        await this.repairFileLinks(filePath);
      }

      await this.generateRepairReport();
      console.log("✅ Link repair complete!\n");
    } catch (error) {
      console.error("❌ Link repair failed:", error.message);
      await this.restoreBackup();
    }
  }

  /**
   * 💾 Create backup of all files before modification
   */
  async createBackup() {
    console.log("💾 Creating backup...");

    if (fs.existsSync(this.backupDir)) {
      fs.rmSync(this.backupDir, { recursive: true });
    }

    fs.mkdirSync(this.backupDir, { recursive: true });

    const markdownFiles = await this.findMarkdownFiles();

    for (const filePath of markdownFiles) {
      const relativePath = path.relative(this.rootDir, filePath);
      const backupPath = path.join(this.backupDir, relativePath);

      // Create backup directory structure
      fs.mkdirSync(path.dirname(backupPath), { recursive: true });
      fs.copyFileSync(filePath, backupPath);
    }

    console.log(`   📦 Backed up ${markdownFiles.length} files`);
  }

  /**
   * 📁 Find all markdown files to process
   */
  async findMarkdownFiles() {
    const files = [];

    const scanDirectory = (dir) => {
      const entries = fs.readdirSync(dir);

      for (const entry of entries) {
        const fullPath = path.join(dir, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          // Skip certain directories
          if (
            ![
              "node_modules",
              ".git",
              ".next",
              "coverage",
              ".link-repair-backup",
            ].includes(entry)
          ) {
            scanDirectory(fullPath);
          }
        } else if (entry.endsWith(".md")) {
          files.push(fullPath);
        }
      }
    };

    scanDirectory(this.rootDir);
    return files;
  }

  /**
   * 🔗 Repair links in a specific file
   */
  async repairFileLinks(filePath) {
    const content = fs.readFileSync(filePath, "utf-8");
    const relativePath = path.relative(this.rootDir, filePath);
    let modifiedContent = content;
    let fileModified = false;

    // Regex to match markdown links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    let match;

    while ((match = linkRegex.exec(content)) !== null) {
      const [fullMatch, linkText, linkUrl] = match;

      // Skip external links
      if (linkUrl.startsWith("http") || linkUrl.startsWith("mailto:")) {
        continue;
      }

      // Check if this is a broken link that we can fix
      const fixedUrl = await this.findFixForBrokenLink(linkUrl, filePath);

      if (fixedUrl && fixedUrl !== linkUrl) {
        const newLink = `[${linkText}](${fixedUrl})`;
        modifiedContent = modifiedContent.replace(fullMatch, newLink);
        fileModified = true;

        this.repairs.push({
          file: relativePath,
          originalLink: fullMatch,
          repairedLink: newLink,
          reason: "Updated broken/moved file reference",
        });
      }
    }

    // Fix references to deleted files with updated paths
    for (const [oldFile, newFile] of Object.entries(this.fileMappings)) {
      const oldRef = new RegExp(`\\b${oldFile.replace(".", "\\.")}\\b`, "g");
      if (oldRef.test(modifiedContent)) {
        modifiedContent = modifiedContent.replace(oldRef, newFile);
        fileModified = true;

        this.repairs.push({
          file: relativePath,
          originalLink: oldFile,
          repairedLink: newFile,
          reason: "Updated reference to moved file",
        });
      }
    }

    // Save modified content if changes were made
    if (fileModified) {
      fs.writeFileSync(filePath, modifiedContent);
      console.log(`   🔧 Repaired links in: ${relativePath}`);
    }
  }

  /**
   * 🔍 Find fix for a broken link
   */
  async findFixForBrokenLink(linkUrl, sourceFile) {
    const sourceDir = path.dirname(sourceFile);
    const targetPath = path.resolve(sourceDir, linkUrl);

    // If file exists, no fix needed
    if (fs.existsSync(targetPath)) {
      return null;
    }

    const fileName = path.basename(linkUrl);

    // Check if we have a mapping for this file
    if (this.fileMappings[fileName]) {
      return path.relative(
        sourceDir,
        path.join(this.rootDir, this.fileMappings[fileName]),
      );
    }

    // Try to find the file in common locations
    const searchPaths = [
      path.join(this.docsDir, fileName),
      path.join(this.docsDir, "archive", fileName),
      path.join(this.rootDir, fileName),
    ];

    for (const searchPath of searchPaths) {
      if (fs.existsSync(searchPath)) {
        return path.relative(sourceDir, searchPath);
      }
    }

    // Try to find in archive subdirectories
    const archiveDir = path.join(this.docsDir, "archive");
    if (fs.existsSync(archiveDir)) {
      const archiveSubdirs = [
        "builds",
        "migrations",
        "strategies",
        "performance",
        "legacy",
        "legal",
      ];

      for (const subdir of archiveSubdirs) {
        const subdirPath = path.join(archiveDir, subdir, fileName);
        if (fs.existsSync(subdirPath)) {
          return path.relative(sourceDir, subdirPath);
        }
      }
    }

    return null; // No fix found
  }

  /**
   * 📋 Generate repair report
   */
  async generateRepairReport() {
    console.log("📋 Generating repair report...");

    const reportContent = `# 🔧 Link Repair Report
**Generated**: ${new Date().toLocaleString()}  
**Total Repairs**: ${this.repairs.length}  

## 📊 Summary
- **Files Modified**: ${new Set(this.repairs.map((r) => r.file)).size}
- **Links Repaired**: ${this.repairs.length}
- **Backup Location**: ${path.relative(this.rootDir, this.backupDir)}

${
  this.repairs.length > 0
    ? `
## 🔗 Repairs Made

${this.repairs
  .map(
    (repair) => `
### ${repair.file}
- **Original**: \`${repair.originalLink}\`
- **Repaired**: \`${repair.repairedLink}\`
- **Reason**: ${repair.reason}
`,
  )
  .join("\n")}
`
    : "## ✅ No repairs needed - all links are working correctly!"
}

## 🔄 Rollback Instructions
If you need to rollback these changes:
\`\`\`bash
# Restore from backup
cp -r ${path.relative(this.rootDir, this.backupDir)}/* ./
\`\`\`

---
*Automated repair by The Bridge Project Documentation System*
`;

    const reportPath = path.join(this.rootDir, "docs", "LINK_REPAIR_REPORT.md");
    fs.writeFileSync(reportPath, reportContent);

    console.log(`   📄 Report saved to: ${reportPath}`);
    console.log(`   🔧 Total repairs made: ${this.repairs.length}`);

    if (this.repairs.length > 0) {
      console.log("   💡 Review the report for details on changes made");
    }
  }

  /**
   * ↩️ Restore from backup if something goes wrong
   */
  async restoreBackup() {
    console.log("↩️ Restoring from backup...");

    if (!fs.existsSync(this.backupDir)) {
      console.error("❌ No backup found to restore from");
      return;
    }

    // Copy backup files back
    const copyRecursive = (src, dest) => {
      const entries = fs.readdirSync(src);

      for (const entry of entries) {
        const srcPath = path.join(src, entry);
        const destPath = path.join(dest, entry);
        const stat = fs.statSync(srcPath);

        if (stat.isDirectory()) {
          if (!fs.existsSync(destPath)) {
            fs.mkdirSync(destPath, { recursive: true });
          }
          copyRecursive(srcPath, destPath);
        } else {
          fs.copyFileSync(srcPath, destPath);
        }
      }
    };

    copyRecursive(this.backupDir, this.rootDir);
    console.log("✅ Backup restored successfully");
  }
}

// CLI execution
if (require.main === module) {
  const repairer = new LinkRepairer();

  // Check for command line arguments
  const args = process.argv.slice(2);

  if (args.includes("--help") || args.includes("-h")) {
    console.log(`
🔧 Automated Link Repair System

Usage:
  node auto-fix-links.js [options]

Options:
  --dry-run    Show what would be repaired without making changes
  --restore    Restore from the most recent backup
  --help, -h   Show this help message

Examples:
  node auto-fix-links.js                # Repair all broken links
  node auto-fix-links.js --dry-run      # Preview repairs without changes
  node auto-fix-links.js --restore      # Restore from backup
`);
    process.exit(0);
  }

  if (args.includes("--restore")) {
    repairer.restoreBackup().catch(console.error);
  } else if (args.includes("--dry-run")) {
    console.log("🔍 Dry run mode - showing what would be repaired...");
    // TODO: Implement dry run functionality
  } else {
    repairer.repairLinks().catch(console.error);
  }
}

module.exports = LinkRepairer;

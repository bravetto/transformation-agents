#!/usr/bin/env node

/**
 * Error Boundary Migration Script
 * This script will scan the codebase for components using old error boundary implementations
 * and update them to use the new consolidated system
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

const componentsDir = path.join(process.cwd(), "src/components");
const srcDir = path.join(process.cwd(), "src");

// Patterns to search for old error boundary implementations
const oldPatterns = [
  // Old imports
  /import\s+\{\s*ErrorBoundary\s*\}\s+from\s+['"]@\/components\/error-boundary['"]/g,
  /import\s+\{\s*withErrorBoundary\s*\}\s+from\s+['"]@\/components\/error-boundary['"]/g,
  /import\s+ErrorBoundaryWrapper\s+from\s+['"]@\/components\/error-boundary-wrapper['"]/g,
  /import\s+\{\s*withErrorBoundary\s*\}\s+from\s+['"]@\/components\/with-error-boundary['"]/g,
  /import\s+\{\s*withSafeErrorHandling\s*\}\s+from\s+['"]@\/components\/with-error-boundary['"]/g,

  // Old exports
  /export\s+default\s+withErrorBoundary\(/g,
  /export\s+default\s+withSafeErrorHandling\(/g,
];

// Replacements for the old patterns
const newPatterns = [
  // New imports
  `import { DivineErrorBoundary } from '@/components/error-boundary-migration'`,
  `import { withDivineErrorBoundary } from '@/components/error-boundary-migration'`,
  `import ErrorBoundaryWrapper from '@/components/error-boundary-migration'`,
  `import { withDivineErrorBoundary } from '@/components/error-boundary-migration'`,
  `import { withSafeErrorHandling } from '@/components/error-boundary-migration'`,

  // New exports
  `export default withDivineErrorBoundary(`,
  `export default withSafeErrorHandling(`,
];

/**
 * Find files that need updating
 */
function findFilesToUpdate() {
  try {
    const grepOutput = execSync(
      `grep -r --include="*.tsx" --include="*.ts" -l "ErrorBoundary\\|withErrorBoundary\\|withSafeErrorHandling" src/`,
      { encoding: "utf8" },
    );

    return grepOutput
      .split("\n")
      .filter(Boolean)
      .filter(
        (file) =>
          // Exclude our new files
          !file.includes("divine-error-boundary.tsx") &&
          !file.includes("error-boundary-migration.tsx"),
      );
  } catch (error) {
    console.error("Error finding files:", error.message);
    return [];
  }
}

/**
 * Update a file with the new error boundary patterns
 */
function updateFile(filePath) {
  try {
    console.log(`Checking ${filePath}...`);
    let content = fs.readFileSync(filePath, "utf8");
    let wasUpdated = false;

    // Check if we need to update this file
    const needsUpdate = oldPatterns.some((pattern) => pattern.test(content));

    if (!needsUpdate) {
      console.log(`  No updates needed for ${filePath}`);
      return false;
    }

    // Update imports
    oldPatterns.forEach((pattern, index) => {
      if (pattern.test(content)) {
        content = content.replace(pattern, (match) => {
          wasUpdated = true;
          console.log(`  Updating pattern: ${match} -> ${newPatterns[index]}`);
          return newPatterns[index];
        });
      }
    });

    // Special case: Update withErrorBoundary to withDivineErrorBoundary
    if (content.includes("withErrorBoundary(")) {
      content = content.replace(/withErrorBoundary\(/g, (match) => {
        wasUpdated = true;
        console.log(`  Updating withErrorBoundary to withDivineErrorBoundary`);
        return "withDivineErrorBoundary(";
      });
    }

    // Special case: Update ErrorBoundary to DivineErrorBoundary
    if (content.includes("<ErrorBoundary")) {
      content = content.replace(/<ErrorBoundary/g, (match) => {
        wasUpdated = true;
        console.log(`  Updating ErrorBoundary to DivineErrorBoundary`);
        return "<DivineErrorBoundary";
      });

      content = content.replace(/<\/ErrorBoundary>/g, (match) => {
        wasUpdated = true;
        return "</DivineErrorBoundary>";
      });
    }

    if (wasUpdated) {
      // Create a backup of the original file
      fs.writeFileSync(`${filePath}.bak`, fs.readFileSync(filePath));

      // Write the updated content
      fs.writeFileSync(filePath, content);
      console.log(`✅ Updated ${filePath}`);
      return true;
    }

    console.log(`  No updates needed for ${filePath}`);
    return false;
  } catch (error) {
    console.error(`❌ Error updating ${filePath}:`, error.message);
    return false;
  }
}

/**
 * Run the migration script
 */
function runMigration() {
  console.log("🔍 Finding files that need updating...");
  const filesToUpdate = findFilesToUpdate();

  console.log(`\n📋 Found ${filesToUpdate.length} files to check for updates`);

  if (filesToUpdate.length === 0) {
    console.log(
      "✅ No files need updating. Your codebase is already using the new error boundary system!",
    );
    return;
  }

  console.log("\n🔧 Updating files...\n");

  const updatedFiles = filesToUpdate.filter((file) => updateFile(file));

  console.log(`\n🎉 Migration complete!`);
  console.log(
    `📊 Updated ${updatedFiles.length} of ${filesToUpdate.length} files.`,
  );

  if (updatedFiles.length > 0) {
    console.log(
      "\n⚠️  Please review the changes manually to ensure they are correct.",
    );
    console.log(
      "💡 Backup files with .bak extension have been created for all updated files.",
    );
    console.log(
      "\n🧪 Don't forget to test your application after these changes!",
    );
  }
}

// Run the script
runMigration();

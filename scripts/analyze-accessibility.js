#!/usr/bin/env node

/**
 * Accessibility Analysis Script
 *
 * This script analyzes React components for common accessibility issues
 * and provides recommendations for improvements.
 *
 * Usage: node scripts/analyze-accessibility.js [filepath]
 * Example: node scripts/analyze-accessibility.js src/components/navigation.tsx
 */

const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);
const chalk = require("chalk");

// Patterns to look for in components
const ACCESSIBILITY_PATTERNS = {
  // Missing ARIA attributes
  missingAriaLabel: {
    pattern:
      /<(button|a|input|select|textarea)[^>]*(?!aria-label|aria-labelledby)[^>]*>/g,
    message: "Interactive element without aria-label or aria-labelledby",
    wcagCriteria: "2.4.6 (AAA), 4.1.2 (A)",
  },

  // Image alt text
  missingAltText: {
    pattern: /<(img|Image)[^>]*(?!alt=)[^>]*>/g,
    message: "Image without alt text",
    wcagCriteria: "1.1.1 (A)",
  },

  // Focus management issues
  tabIndexGreaterThanZero: {
    pattern: /tabIndex=["']{1}[1-9][0-9]*["']{1}/g,
    message: "tabIndex greater than 0 can cause focus order issues",
    wcagCriteria: "2.4.3 (A)",
  },

  // Keyboard event handlers
  clickWithoutKeyboard: {
    pattern: /onClick=\{[^}]*\}(?!.*onKeyDown|.*onKeyPress)/g,
    message: "onClick without keyboard event handler",
    wcagCriteria: "2.1.1 (A)",
  },

  // Color contrast indicators (look for potentially problematic color combinations)
  lowContrastCombination: {
    pattern: /(text-whisper-gray|text-soft-shadow).*?(bg-soft-cloud|bg-white)/g,
    message: "Potential low contrast text combination",
    wcagCriteria: "1.4.6 (AAA)",
  },

  // Role usage
  divWithRoleButton: {
    pattern: /<div[^>]*role=["']button["'][^>]*>/g,
    message: 'Consider using <button> instead of div with role="button"',
    wcagCriteria: "4.1.2 (A)",
  },

  // ARIA expanded for dropdown toggles
  missingAriaExpanded: {
    pattern:
      /(?:dropdown|menu|popover).*?\{.*?isOpen.*?\}(?!.*aria-expanded)/gi,
    message: "Toggle button without aria-expanded attribute",
    wcagCriteria: "4.1.2 (A)",
  },

  // Missing dialog attributes
  incompleteDialogRole: {
    pattern: /role=["']dialog["'](?!.*aria-modal|.*aria-labelledby)/g,
    message:
      "Dialog missing required attributes (aria-modal or aria-labelledby)",
    wcagCriteria: "4.1.2 (A)",
  },

  // Missing form labels
  inputWithoutLabel: {
    pattern:
      /<(input|select|textarea)[^>]*(?!id=|aria-labelledby|aria-label)[^>]*>/g,
    message: "Form control without associated label",
    wcagCriteria: "3.3.2 (A)",
  },

  // Animation without reduced motion
  animationWithoutReducedMotion: {
    pattern: /(animation:|@keyframes|animate=|transition:)/g,
    message: "Animation without reduced motion alternative",
    wcagCriteria: "2.3.3 (AAA)",
  },
};

// WCAG levels and their meaning
const WCAG_LEVELS = {
  A: "Essential - Must be fixed for minimal accessibility",
  AA: "Strong - Should be fixed for good accessibility",
  AAA: "Optimal - Consider fixing for excellent accessibility",
};

async function analyzeFile(filePath) {
  try {
    const content = await readFile(filePath, "utf8");
    const issues = [];

    // Check for each pattern
    Object.entries(ACCESSIBILITY_PATTERNS).forEach(
      ([key, { pattern, message, wcagCriteria }]) => {
        const matches = content.match(pattern);
        if (matches) {
          const wcagLevel = wcagCriteria.match(/\((.*?)\)/)[1];
          issues.push({
            type: key,
            count: matches.length,
            message,
            wcagCriteria,
            level: wcagLevel,
          });
        }
      },
    );

    // Sort issues by WCAG level priority (A first, then AA, then AAA)
    issues.sort((a, b) => {
      const levelOrder = { A: 1, AA: 2, AAA: 3 };
      return levelOrder[a.level] - levelOrder[b.level];
    });

    return {
      filePath,
      issues,
      totalIssues: issues.reduce((sum, issue) => sum + issue.count, 0),
    };
  } catch (error) {
    console.error(chalk.red(`Error analyzing ${filePath}:`), error);
    return { filePath, issues: [], totalIssues: 0, error: error.message };
  }
}

function printResults(results) {
  const { filePath, issues, totalIssues, error } = results;

  console.log(
    chalk.bold(`\nAccessibility Analysis for ${path.basename(filePath)}`),
  );
  console.log("=".repeat(50));

  if (error) {
    console.log(chalk.red(`Error: ${error}`));
    return;
  }

  if (totalIssues === 0) {
    console.log(chalk.green("✓ No accessibility issues detected!\n"));
    return;
  }

  console.log(
    chalk.yellow(`Found ${totalIssues} potential accessibility issues:\n`),
  );

  issues.forEach((issue) => {
    const levelColor =
      issue.level === "A" ? "red" : issue.level === "AA" ? "yellow" : "blue";

    console.log(chalk[levelColor](`[${issue.level}] ${issue.message}`));
    console.log(`  Count: ${issue.count}`);
    console.log(`  WCAG: ${issue.wcagCriteria}`);
    console.log(`  Severity: ${WCAG_LEVELS[issue.level]}`);
    console.log();
  });

  console.log(chalk.bold("Recommendations:"));
  if (issues.some((i) => i.level === "A")) {
    console.log(
      chalk.red(
        "• Fix all Level A issues immediately - these are critical barriers",
      ),
    );
  }
  if (issues.some((i) => i.level === "AA")) {
    console.log(chalk.yellow("• Address Level AA issues as soon as possible"));
  }
  if (issues.some((i) => i.level === "AAA")) {
    console.log(
      chalk.blue("• Consider Level AAA improvements for optimal accessibility"),
    );
  }

  console.log(
    "\nSee our accessibility guidelines at: docs/accessibility-guidelines.md",
  );
}

async function main() {
  const filePath = process.argv[2];

  if (!filePath) {
    console.log(`
Usage: node scripts/analyze-accessibility.js [filepath]
Example: node scripts/analyze-accessibility.js src/components/navigation.tsx
    `);
    process.exit(1);
  }

  const resolvedPath = path.resolve(process.cwd(), filePath);

  if (!fs.existsSync(resolvedPath)) {
    console.error(chalk.red(`File not found: ${resolvedPath}`));
    process.exit(1);
  }

  const results = await analyzeFile(resolvedPath);
  printResults(results);
}

main().catch((error) => {
  console.error(chalk.red("Unexpected error:"), error);
  process.exit(1);
});

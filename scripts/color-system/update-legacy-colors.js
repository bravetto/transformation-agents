#!/usr/bin/env node

/**
 * Color System Migration Script
 * This script identifies and helps update legacy color usage in the codebase
 * to use the new standardized color system.
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Directory to search in
const srcDir = path.join(process.cwd(), "src");

// Color mappings from old to new
const colorMappings = {
  // Legacy direct color values
  "#F59E0B": "var(--hope-gold)",
  "#2563EB": "var(--courage-blue)",
  "#10B981": "var(--growth-green)",
  "#374151": "var(--gentle-charcoal)",
  "#6B7280": "var(--soft-shadow)",
  "#9CA3AF": "var(--whisper-gray)",
  "#FFFFFF": "var(--pure-white)",
  "#FEFDF8": "var(--comfort-cream)",
  "#F9FAFB": "var(--soft-cloud)",
  "#F3F4F6": "var(--moon-glow)",
  "#E5E7EB": "var(--quiet-stone)",

  // Legacy class names to standardized classes
  "text-gold": "text-hope-gold",
  "bg-gold": "bg-hope-gold",
  "border-gold": "border-hope-gold",
  "text-purple": "text-courage-blue",
  "bg-purple": "bg-courage-blue",
  "border-purple": "border-courage-blue",
  "text-royal-purple": "text-courage-blue",
  "bg-royal-purple": "bg-courage-blue",
  "border-royal-purple": "border-courage-blue",
  "text-midnight": "text-gentle-charcoal",
  "bg-midnight": "bg-gentle-charcoal",
  "border-midnight": "border-gentle-charcoal",
  "text-sacred-midnight": "text-gentle-charcoal",
  "bg-sacred-midnight": "bg-gentle-charcoal",
  "border-sacred-midnight": "border-gentle-charcoal",
  "text-holy-gold": "text-hope-gold",
  "bg-holy-gold": "bg-hope-gold",
  "border-holy-gold": "border-hope-gold",
  "text-divine-white": "text-comfort-cream",
  "bg-divine-white": "bg-comfort-cream",
  "border-divine-white": "border-comfort-cream",
  "text-deep-shadow": "text-soft-shadow",
  "bg-deep-shadow": "bg-soft-shadow",
  "border-deep-shadow": "border-soft-shadow",
  "text-light-whisper": "text-soft-cloud",
  "bg-light-whisper": "bg-soft-cloud",
  "border-light-whisper": "border-soft-cloud",
  "text-bridge-blue": "text-courage-blue",
  "bg-bridge-blue": "bg-courage-blue",
  "border-bridge-blue": "border-courage-blue",

  // Legacy gradient patterns
  "from-amber-500 via-orange-500 to-yellow-500": "bg-gradient-lightworker",
  "from-blue-500 via-indigo-500 to-purple-500": "bg-gradient-messenger",
  "from-emerald-500 via-teal-500 to-cyan-500": "bg-gradient-witness",
  "from-purple-500 via-pink-500 to-rose-500": "bg-gradient-guardian",
};

// Patterns to look for in the code
const patterns = [
  // Look for className with color values
  /className=["|']([^"|']*)(text|bg|border|from|via|to)-(gold|purple|royal-purple|midnight|sacred-midnight|holy-gold|divine-white|deep-shadow|light-whisper|bridge-blue|amber-500|blue-500|emerald-500|purple-500)([^"|']*)["|']/g,

  // Look for hardcoded hex colors
  /['|"](#F59E0B|#2563EB|#10B981|#374151|#6B7280|#9CA3AF|#FFFFFF|#FEFDF8|#F9FAFB|#F3F4F6|#E5E7EB)['|"]/gi,
];

// Function to find color usage in files
async function findColorUsage() {
  console.log("Scanning for legacy color usage...\n");

  // Find all .tsx and .ts files
  const files = execSync(`find ${srcDir} -type f -name "*.tsx" -o -name "*.ts"`)
    .toString()
    .split("\n")
    .filter(Boolean);

  const results = [];

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8");
    let hasMatch = false;
    let matches = [];

    // Check each pattern
    for (const pattern of patterns) {
      const patternMatches = content.match(pattern);
      if (patternMatches) {
        hasMatch = true;
        matches = [...matches, ...patternMatches];
      }
    }

    if (hasMatch) {
      results.push({
        file,
        matches: [...new Set(matches)], // Remove duplicates
      });
    }
  }

  return results;
}

// Function to suggest changes
function suggestChanges(results) {
  console.log(`Found ${results.length} files with legacy color usage:\n`);

  results.forEach((result) => {
    console.log(`\n${result.file}:`);

    result.matches.forEach((match) => {
      console.log(`  - ${match}`);

      // Try to find replacement
      let replacement = match;

      for (const [oldPattern, newPattern] of Object.entries(colorMappings)) {
        if (match.includes(oldPattern)) {
          replacement = replacement.replace(oldPattern, newPattern);
        }
      }

      if (replacement !== match) {
        console.log(`    Suggestion: ${replacement}`);
      }
    });
  });
}

// Main function
async function main() {
  console.log("=".repeat(80));
  console.log("COLOR SYSTEM MIGRATION TOOL");
  console.log("=".repeat(80));
  console.log(
    "\nThis tool helps identify legacy color usage and suggests updates to the new standardized color system.\n",
  );

  const results = await findColorUsage();

  if (results.length === 0) {
    console.log("✅ No legacy color usage found!");
  } else {
    suggestChanges(results);

    console.log("\n\nRecommended actions:");
    console.log(
      "1. For components, use the role prop instead of direct color classes:",
    );
    console.log('   <Button role="lightworker">Button</Button>');
    console.log('   <Badge role="messenger">Badge</Badge>');

    console.log("\n2. For gradients, use the new gradient classes:");
    console.log('   <div className="bg-gradient-lightworker">Gradient</div>');

    console.log("\n3. For direct color usage, use the new color tokens:");
    console.log(
      '   <div className="text-hope-gold bg-gentle-charcoal">Content</div>',
    );

    console.log("\nSee docs/color-system.md for complete documentation.");
  }

  console.log("\n=".repeat(80));
}

main().catch((err) => {
  console.error("Error:", err);
  process.exit(1);
});

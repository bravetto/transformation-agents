#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Patterns to replace
const patterns = [
  // Import patterns
  {
    find: /import\s*{\s*withUnifiedErrorBoundary\s*}\s*from\s*['"]@\/components\/with-error-boundary['"]/g,
    replace: `import { withDivineErrorBoundary } from '@/components/ui/divine-error-boundary'`,
  },
  {
    find: /import\s*{\s*withUnifiedErrorBoundary\s*}\s*from\s*['"]@\/components\/ui\/unified-error-boundary['"]/g,
    replace: `import { withDivineErrorBoundary } from '@/components/ui/divine-error-boundary'`,
  },
  {
    find: /import\s*{\s*withErrorBoundary\s*}\s*from\s*['"]@\/components\/with-error-boundary['"]/g,
    replace: `import { withDivineErrorBoundary } from '@/components/ui/divine-error-boundary'`,
  },
  {
    find: /import\s*{\s*withErrorBoundary\s*}\s*from\s*['"]\.\/(with-error-boundary|error-boundary)['"]/g,
    replace: `import { withDivineErrorBoundary } from '@/components/ui/divine-error-boundary'`,
  },
  {
    find: /import\s*{\s*ErrorBoundary\s*}\s*from\s*['"]@\/components\/error-boundary['"]/g,
    replace: `import { DivineErrorBoundary } from '@/components/ui/divine-error-boundary'`,
  },

  // Usage patterns
  {
    find: /withUnifiedErrorBoundary\(\s*(\w+)\s*,\s*{([^}]+)}\)/g,
    replace: (match, component, options) => {
      // Convert options to new format
      const newOptions = options
        .split(",")
        .map((opt) => opt.trim())
        .filter((opt) => opt)
        .reduce((acc, curr) => {
          const [key, value] = curr.split(":").map((s) => s.trim());
          acc[key] = value;
          return acc;
        }, {});

      return `withDivineErrorBoundary(${component}, {
        ${Object.entries(newOptions)
          .map(([key, value]) => `${key}: ${value}`)
          .join(",\n        ")}
      })`;
    },
  },
  {
    find: /withErrorBoundary\(\s*(\w+)\s*,\s*{([^}]+)}\)/g,
    replace: (match, component, options) => {
      // Convert options to new format
      const newOptions = options
        .split(",")
        .map((opt) => opt.trim())
        .filter((opt) => opt)
        .reduce((acc, curr) => {
          const [key, value] = curr.split(":").map((s) => s.trim());
          acc[key] = value;
          return acc;
        }, {});

      return `withDivineErrorBoundary(${component}, {
        ${Object.entries(newOptions)
          .map(([key, value]) => `${key}: ${value}`)
          .join(",\n        ")}
      })`;
    },
  },
  {
    find: /withErrorBoundary\(\s*(\w+)\s*\)/g,
    replace: 'withDivineErrorBoundary($1, { componentName: "$1" })',
  },
  {
    find: /<ErrorBoundary([^>]*)>/g,
    replace: "<DivineErrorBoundary$1>",
  },
  {
    find: /<\/ErrorBoundary>/g,
    replace: "</DivineErrorBoundary>",
  },
];

// Find all TypeScript/JavaScript files in src directory
const files = glob.sync("src/**/*.{ts,tsx,js,jsx}", {
  ignore: ["**/node_modules/**", "**/dist/**", "**/build/**"],
});

// Process each file
files.forEach((file) => {
  const filePath = path.join(process.cwd(), file);
  let content = fs.readFileSync(filePath, "utf8");
  let hasChanges = false;

  patterns.forEach(({ find, replace }) => {
    const newContent = content.replace(find, replace);
    if (newContent !== content) {
      content = newContent;
      hasChanges = true;
      console.log(`Updated ${file}`);
    }
  });

  if (hasChanges) {
    fs.writeFileSync(filePath, content);
  }
});

console.log("Migration complete!");

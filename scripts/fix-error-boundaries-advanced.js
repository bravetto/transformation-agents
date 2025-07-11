const fs = require("fs");
const path = require("path");

// Colors for output
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const BLUE = "\x1b[34m";
const RESET = "\x1b[0m";

// Check if a file path was provided
if (process.argv.length < 3) {
  console.error(`${RED}Error: No file path provided${RESET}`);
  console.log(`Usage: node ${path.basename(__filename)} path/to/component.tsx`);
  process.exit(1);
}

const filePath = process.argv[2];

// Check if file exists
if (!fs.existsSync(filePath)) {
  console.error(`${RED}Error: File not found: ${filePath}${RESET}`);
  process.exit(1);
}

// Read the file content
let content = fs.readFileSync(filePath, "utf8");

// Create a backup
const backupPath = `${filePath}.bak`;
fs.writeFileSync(backupPath, content);
console.log(`${BLUE}Created backup: ${backupPath}${RESET}`);

// Check if it's a client component
if (!content.includes('"use client"')) {
  console.log(
    `${YELLOW}Warning: This doesn't appear to be a client component${RESET}`,
  );
  process.exit(0);
}

// Fix duplicate imports
const importPattern =
  /import\s+\{\s*withErrorBoundary\s*\}\s+from\s+["']@\/components\/with-error-boundary["'];/g;
const importMatches = content.match(importPattern);

if (importMatches && importMatches.length > 1) {
  console.log(
    `${YELLOW}Found ${importMatches.length} duplicate withErrorBoundary imports. Fixing...${RESET}`,
  );
  content = content.replace(importPattern, (match, index, fullContent) => {
    // Keep only the first occurrence
    if (fullContent.indexOf(match) === index) {
      return match;
    }
    return "";
  });
}

// Check for export pattern
const namedExportPattern = /export\s+function\s+(\w+)/;
const namedExportMatch = content.match(namedExportPattern);

// If there's a named export function
if (namedExportMatch) {
  const componentName = namedExportMatch[1];
  console.log(`${BLUE}Found named export function: ${componentName}${RESET}`);

  // Check if the component is already wrapped
  if (content.includes(`export default withErrorBoundary(${componentName}`)) {
    console.log(
      `${GREEN}Component ${componentName} is already wrapped with withErrorBoundary${RESET}`,
    );
  } else {
    // Add withErrorBoundary wrapper
    const exportPattern = new RegExp(`export\\s+function\\s+${componentName}`);
    content = content.replace(exportPattern, `function ${componentName}`);

    // Add export at the end of the file
    content += `\n\nexport default withErrorBoundary(${componentName}, {
  componentName: "${componentName}",
  id: "${componentName.toLowerCase()}"
});\n`;

    console.log(
      `${GREEN}Added withErrorBoundary wrapper to ${componentName}${RESET}`,
    );
  }
} else {
  console.log(
    `${RED}Could not find a named export function in the file${RESET}`,
  );
  process.exit(1);
}

// Write the updated content back to the file
fs.writeFileSync(filePath, content);
console.log(`${GREEN}Successfully updated ${filePath}${RESET}`);

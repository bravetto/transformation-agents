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

// Add withErrorBoundary import if it doesn't exist
if (!content.includes("withErrorBoundary")) {
  const importLine =
    'import { withErrorBoundary } from "@/components/with-error-boundary";\n';
  // Add after the last import statement
  const lastImportIndex = content.lastIndexOf("import ");
  if (lastImportIndex !== -1) {
    const lastImportLineEnd = content.indexOf("\n", lastImportIndex);
    if (lastImportLineEnd !== -1) {
      content =
        content.substring(0, lastImportLineEnd + 1) +
        importLine +
        content.substring(lastImportLineEnd + 1);
      console.log(`${BLUE}Added withErrorBoundary import${RESET}`);
    }
  }
}

// Try to find the component name using different patterns
let componentName = null;

// Pattern 1: export function ComponentName
const namedExportPattern = /export\s+function\s+(\w+)/;
const namedExportMatch = content.match(namedExportPattern);
if (namedExportMatch) {
  componentName = namedExportMatch[1];
  console.log(`${BLUE}Found named export function: ${componentName}${RESET}`);

  // Check if the component is already wrapped
  if (content.includes(`export default withErrorBoundary(${componentName}`)) {
    console.log(
      `${GREEN}Component ${componentName} is already wrapped with withErrorBoundary${RESET}`,
    );
    process.exit(0);
  }

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
// Pattern 2: export const ComponentName =
else {
  const constExportPattern = /export\s+const\s+(\w+)\s*=/;
  const constExportMatch = content.match(constExportPattern);
  if (constExportMatch) {
    componentName = constExportMatch[1];
    console.log(`${BLUE}Found const export: ${componentName}${RESET}`);

    // Check if the component is already wrapped
    if (content.includes(`export default withErrorBoundary(${componentName}`)) {
      console.log(
        `${GREEN}Component ${componentName} is already wrapped with withErrorBoundary${RESET}`,
      );
      process.exit(0);
    }

    // Change export const to const
    const exportPattern = new RegExp(
      `export\\s+const\\s+${componentName}\\s*=`,
    );
    content = content.replace(exportPattern, `const ${componentName} =`);

    // Add export at the end of the file
    content += `\n\nexport default withErrorBoundary(${componentName}, {
  componentName: "${componentName}",
  id: "${componentName.toLowerCase()}"
});\n`;

    console.log(
      `${GREEN}Added withErrorBoundary wrapper to ${componentName}${RESET}`,
    );
  }
  // Pattern 3: export default function ComponentName
  else {
    const defaultExportPattern = /export\s+default\s+function\s+(\w+)/;
    const defaultExportMatch = content.match(defaultExportPattern);
    if (defaultExportMatch) {
      componentName = defaultExportMatch[1];
      console.log(
        `${BLUE}Found default export function: ${componentName}${RESET}`,
      );

      // Check if the component is already wrapped
      if (
        content.includes(`export default withErrorBoundary(${componentName}`)
      ) {
        console.log(
          `${GREEN}Component ${componentName} is already wrapped with withErrorBoundary${RESET}`,
        );
        process.exit(0);
      }

      // Change export default function to function
      const exportPattern = new RegExp(
        `export\\s+default\\s+function\\s+${componentName}`,
      );
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
    // Pattern 4: export default anonymous function
    else {
      const anonymousFunctionPattern = /export\s+default\s+function\s*\(/;
      const anonymousFunctionMatch = content.match(anonymousFunctionPattern);
      if (anonymousFunctionMatch) {
        // Extract component name from file name
        componentName = path.basename(filePath, ".tsx");
        console.log(
          `${BLUE}Found anonymous default export function, using filename: ${componentName}${RESET}`,
        );

        // Change export default function to named function
        const exportPattern = /export\s+default\s+function\s*\(/;
        content = content.replace(exportPattern, `function ${componentName}(`);

        // Add export at the end of the file
        content += `\n\nexport default withErrorBoundary(${componentName}, {
  componentName: "${componentName}",
  id: "${componentName.toLowerCase()}"
});\n`;

        console.log(
          `${GREEN}Added withErrorBoundary wrapper to ${componentName}${RESET}`,
        );
      }
      // Pattern 5: export default ComponentName
      else {
        const directDefaultExportPattern = /export\s+default\s+(\w+);/;
        const directDefaultExportMatch = content.match(
          directDefaultExportPattern,
        );
        if (directDefaultExportMatch) {
          componentName = directDefaultExportMatch[1];
          console.log(
            `${BLUE}Found direct default export: ${componentName}${RESET}`,
          );

          // Replace with withErrorBoundary
          const exportPattern = new RegExp(
            `export\\s+default\\s+${componentName};`,
          );
          content = content.replace(
            exportPattern,
            `export default withErrorBoundary(${componentName}, {
  componentName: "${componentName}",
  id: "${componentName.toLowerCase()}"
});`,
          );

          console.log(
            `${GREEN}Added withErrorBoundary wrapper to ${componentName}${RESET}`,
          );
        } else {
          console.log(
            `${RED}Could not identify component export pattern${RESET}`,
          );
          process.exit(1);
        }
      }
    }
  }
}

// Write the updated content back to the file
fs.writeFileSync(filePath, content);
console.log(`${GREEN}Successfully updated ${filePath}${RESET}`);

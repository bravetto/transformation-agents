const fs = require("fs");
const path = require("path");

// Colors for output
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const BLUE = "\x1b[34m";
const RESET = "\x1b[0m";

// UI components directory
const UI_COMPONENTS_DIR = path.join(process.cwd(), "src", "components", "ui");

// Skip these files
const SKIP_FILES = ["with-safe-ui.tsx", "index.ts", "README.md", "__tests__"];

// Check if directory exists
if (!fs.existsSync(UI_COMPONENTS_DIR)) {
  console.error(
    `${RED}Error: UI components directory not found: ${UI_COMPONENTS_DIR}${RESET}`,
  );
  process.exit(1);
}

// Get all .tsx files in the UI components directory
const files = fs
  .readdirSync(UI_COMPONENTS_DIR)
  .filter((file) => file.endsWith(".tsx") && !SKIP_FILES.includes(file));

console.log(`${BLUE}Found ${files.length} UI components to process${RESET}`);

let successful = 0;
let failed = 0;

// Process each file
files.forEach((file) => {
  const filePath = path.join(UI_COMPONENTS_DIR, file);
  const componentName = path.basename(file, ".tsx");

  console.log(`${YELLOW}Processing: ${componentName}${RESET}`);

  try {
    // Read the file content
    let content = fs.readFileSync(filePath, "utf8");

    // Create a backup
    const backupPath = `${filePath}.bak`;
    fs.writeFileSync(backupPath, content);

    // Check if it's a client component
    if (!content.includes('"use client"')) {
      console.log(
        `${YELLOW}Warning: ${componentName} is not a client component, skipping${RESET}`,
      );
      return;
    }

    // Check if already using withSafeUI
    if (content.includes("withSafeUI")) {
      console.log(
        `${BLUE}${componentName} is already using withSafeUI${RESET}`,
      );
      return;
    }

    // Add withSafeUI import
    if (
      !content.includes("import { withSafeUI }") &&
      !content.includes("import withSafeUI")
    ) {
      const importLine = 'import { withSafeUI } from "./with-safe-ui";\n';
      // Add after the last import statement
      const lastImportIndex = content.lastIndexOf("import ");
      if (lastImportIndex !== -1) {
        const lastImportLineEnd = content.indexOf("\n", lastImportIndex);
        if (lastImportLineEnd !== -1) {
          content =
            content.substring(0, lastImportLineEnd + 1) +
            importLine +
            content.substring(lastImportLineEnd + 1);
          console.log(
            `${BLUE}Added withSafeUI import to ${componentName}${RESET}`,
          );
        }
      }
    }

    // Check for export patterns
    let modified = false;

    // Pattern 1: export function ComponentName
    const namedExportPattern = /export\s+function\s+(\w+)/;
    const namedExportMatch = content.match(namedExportPattern);

    if (namedExportMatch) {
      const compName = namedExportMatch[1];

      // Change export function to function
      const exportPattern = new RegExp(`export\\s+function\\s+${compName}`);
      content = content.replace(exportPattern, `function ${compName}`);

      // Add export at the end of the file
      content += `\n\nexport default withSafeUI(${compName}, {
  componentName: "${compName}"
});\n`;

      modified = true;
    }
    // Pattern 2: export const ComponentName =
    else {
      const constExportPattern = /export\s+const\s+(\w+)\s*=/;
      const constExportMatch = content.match(constExportPattern);

      if (constExportMatch) {
        const compName = constExportMatch[1];

        // Change export const to const
        const exportPattern = new RegExp(`export\\s+const\\s+${compName}\\s*=`);
        content = content.replace(exportPattern, `const ${compName} =`);

        // Add export at the end of the file
        content += `\n\nexport default withSafeUI(${compName}, {
  componentName: "${compName}"
});\n`;

        modified = true;
      }
      // Pattern 3: export default function ComponentName
      else {
        const defaultExportPattern = /export\s+default\s+function\s+(\w+)/;
        const defaultExportMatch = content.match(defaultExportPattern);

        if (defaultExportMatch) {
          const compName = defaultExportMatch[1];

          // Change export default function to function
          const exportPattern = new RegExp(
            `export\\s+default\\s+function\\s+${compName}`,
          );
          content = content.replace(exportPattern, `function ${compName}`);

          // Add export at the end of the file
          content += `\n\nexport default withSafeUI(${compName}, {
  componentName: "${compName}"
});\n`;

          modified = true;
        }
        // Pattern 4: export default anonymous function
        else {
          const anonymousFunctionPattern = /export\s+default\s+function\s*\(/;
          const anonymousFunctionMatch = content.match(
            anonymousFunctionPattern,
          );

          if (anonymousFunctionMatch) {
            // Use the file name as the component name
            const compName = componentName;

            // Change export default function to named function
            const exportPattern = /export\s+default\s+function\s*\(/;
            content = content.replace(exportPattern, `function ${compName}(`);

            // Add export at the end of the file
            content += `\n\nexport default withSafeUI(${compName}, {
  componentName: "${compName}"
});\n`;

            modified = true;
          }
          // Pattern 5: export default ComponentName
          else {
            const directDefaultExportPattern = /export\s+default\s+(\w+);/;
            const directDefaultExportMatch = content.match(
              directDefaultExportPattern,
            );

            if (directDefaultExportMatch) {
              const compName = directDefaultExportMatch[1];

              // Replace with withSafeUI
              const exportPattern = new RegExp(
                `export\\s+default\\s+${compName};`,
              );
              content = content.replace(
                exportPattern,
                `export default withSafeUI(${compName}, {
  componentName: "${compName}"
});`,
              );

              modified = true;
            }
          }
        }
      }
    }

    if (modified) {
      // Write the updated content back to the file
      fs.writeFileSync(filePath, content);
      console.log(
        `${GREEN}Successfully added withSafeUI to ${componentName}${RESET}`,
      );
      successful++;
    } else {
      console.log(
        `${RED}Could not identify export pattern for ${componentName}${RESET}`,
      );
      failed++;
    }
  } catch (error) {
    console.error(
      `${RED}Error processing ${componentName}: ${error.message}${RESET}`,
    );
    failed++;
  }

  console.log();
});

// Print summary
console.log(`${GREEN}=== Processing Complete ===${RESET}`);
console.log(`Total UI components: ${files.length}`);
console.log(`Successfully processed: ${successful}`);
console.log(`Failed: ${failed}`);

// Run the identify script to see progress
console.log(
  `\n${BLUE}Running identification script to check progress...${RESET}`,
);
const { execSync } = require("child_process");
try {
  execSync("node scripts/identify-missing-error-boundaries.js", {
    stdio: "inherit",
  });
} catch (error) {
  console.error(
    `${RED}Error running identification script: ${error.message}${RESET}`,
  );
}

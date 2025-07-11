const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Colors for output
const GREEN = "\x1b[32m";
const YELLOW = "\x1b[33m";
const RED = "\x1b[31m";
const RESET = "\x1b[0m";

// Directory to scan
const componentsDir = path.join(__dirname, "../src/components");
const appDir = path.join(__dirname, "../src/app");

// Patterns to identify client components and error boundaries
const clientDirectivePattern = /"use client"/;
const errorBoundaryPatterns = [
  /withErrorBoundary/,
  /withDivineErrorBoundary/,
  /<ErrorBoundary/,
  /<DivineErrorBoundary/,
  /<ErrorBoundaryWrapper/,
  /withUnifiedErrorBoundary/,
];

// Count variables
let totalClientComponents = 0;
let componentsWithErrorBoundaries = 0;
let componentsWithoutErrorBoundaries = [];

// Function to check if a file is a client component
function isClientComponent(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return clientDirectivePattern.test(content);
  } catch (error) {
    return false;
  }
}

// Function to check if a component has error boundary
function hasErrorBoundary(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    return errorBoundaryPatterns.some((pattern) => pattern.test(content));
  } catch (error) {
    return false;
  }
}

// Function to scan directory recursively
function scanDirectory(dir) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (
      stat.isDirectory() &&
      !file.startsWith("__") &&
      file !== "node_modules"
    ) {
      // Skip test directories and node_modules
      scanDirectory(filePath);
    } else if (
      stat.isFile() &&
      (file.endsWith(".tsx") || file.endsWith(".jsx"))
    ) {
      // Check if it's a client component
      if (isClientComponent(filePath)) {
        totalClientComponents++;

        // Check if it has error boundary
        if (hasErrorBoundary(filePath)) {
          componentsWithErrorBoundaries++;
        } else {
          componentsWithoutErrorBoundaries.push(filePath);
        }
      }
    }
  }
}

// Scan components directory
console.log(
  `${YELLOW}Scanning for client components without error boundaries...${RESET}`,
);
scanDirectory(componentsDir);
scanDirectory(appDir);

// Print results
console.log(`\n${GREEN}=== Error Boundary Coverage Report ===${RESET}`);
console.log(`Total client components: ${totalClientComponents}`);
console.log(
  `Components with error boundaries: ${componentsWithErrorBoundaries}`,
);
console.log(
  `Components without error boundaries: ${componentsWithoutErrorBoundaries.length}`,
);
console.log(
  `Coverage: ${Math.round((componentsWithErrorBoundaries / totalClientComponents) * 100)}%`,
);

// Print components without error boundaries
if (componentsWithoutErrorBoundaries.length > 0) {
  console.log(`\n${RED}Client components without error boundaries:${RESET}`);
  componentsWithoutErrorBoundaries.forEach((filePath, index) => {
    const relativePath = path.relative(path.join(__dirname, ".."), filePath);
    console.log(`${index + 1}. ${relativePath}`);
  });
}

// Save the list to a file
const outputFile = path.join(__dirname, "../missing-error-boundaries.txt");
fs.writeFileSync(
  outputFile,
  componentsWithoutErrorBoundaries
    .map((filePath) => path.relative(path.join(__dirname, ".."), filePath))
    .join("\n"),
);

console.log(`\n${GREEN}List saved to ${outputFile}${RESET}`);

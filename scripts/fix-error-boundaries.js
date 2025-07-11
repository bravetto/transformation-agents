/**
 * Script to fix components using string literals with withDivineErrorBoundary
 *
 * This script will:
 * 1. Find all files using withDivineErrorBoundary with string literals
 * 2. Replace them with proper object syntax
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Find all files using withDivineErrorBoundary with string literals
const findErrorBoundaryUsage = () => {
  try {
    // Use grep to find all instances of withDivineErrorBoundary with string literals
    const grepCommand = `grep -r "withDivineErrorBoundary.*," --include="*.tsx" src`;
    const result = execSync(grepCommand, { encoding: "utf-8" });

    // Parse the results
    const lines = result.split("\n").filter((line) => line.trim() !== "");

    // Filter for string literal usage
    const stringLiteralUsage = lines.filter((line) => {
      // Match withDivineErrorBoundary followed by Component name, comma, then string in quotes
      return line.match(
        /withDivineErrorBoundary\s*\(\s*\w+\s*,\s*["'][\w-]+["']\s*\)/,
      );
    });

    return stringLiteralUsage;
  } catch (error) {
    console.error("Error finding error boundary usage:", error);
    return [];
  }
};

// Fix a file with string literal usage
const fixFile = (filePath, line) => {
  try {
    // Read the file
    const content = fs.readFileSync(filePath, "utf-8");

    // Extract the component name and role from the line
    const match = line.match(
      /withDivineErrorBoundary\s*\(\s*(\w+)\s*,\s*["']([\w-]+)["']\s*\)/,
    );
    if (!match) return false;

    const componentName = match[1];
    const role = match[2];

    // Create the replacement
    const searchPattern = `withDivineErrorBoundary(${componentName}, '${role}')`;
    const searchPattern2 = `withDivineErrorBoundary(${componentName}, "${role}")`;

    const replacement = `withDivineErrorBoundary(${componentName}, {
  componentName: "${componentName}",
  role: "${role}"
})`;

    // Replace in content
    let newContent = content;
    if (content.includes(searchPattern)) {
      newContent = content.replace(searchPattern, replacement);
    } else if (content.includes(searchPattern2)) {
      newContent = content.replace(searchPattern2, replacement);
    } else {
      // Try a more flexible regex-based replacement
      const regex = new RegExp(
        `withDivineErrorBoundary\\s*\\(\\s*${componentName}\\s*,\\s*["']${role}["']\\s*\\)`,
        "g",
      );
      newContent = content.replace(regex, replacement);
    }

    // Write the file
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, "utf-8");
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error fixing file ${filePath}:`, error);
    return false;
  }
};

// Find components missing the second parameter
const findMissingParameters = () => {
  try {
    // Use grep to find all instances of withDivineErrorBoundary without a second parameter
    const grepCommand = `grep -r "withDivineErrorBoundary(" --include="*.tsx" src`;
    const result = execSync(grepCommand, { encoding: "utf-8" });

    // Parse the results
    const lines = result.split("\n").filter((line) => line.trim() !== "");

    // Filter for missing parameter usage
    const missingParamUsage = lines.filter((line) => {
      // Match withDivineErrorBoundary followed by Component name and closing parenthesis
      return line.match(/withDivineErrorBoundary\s*\(\s*\w+\s*\)/);
    });

    return missingParamUsage;
  } catch (error) {
    console.error("Error finding missing parameters:", error);
    return [];
  }
};

// Fix a file with missing parameters
const fixMissingParams = (filePath, line) => {
  try {
    // Read the file
    const content = fs.readFileSync(filePath, "utf-8");

    // Extract the component name from the line
    const match = line.match(/withDivineErrorBoundary\s*\(\s*(\w+)\s*\)/);
    if (!match) return false;

    const componentName = match[1];

    // Create the replacement
    const searchPattern = `withDivineErrorBoundary(${componentName})`;

    const replacement = `withDivineErrorBoundary(${componentName}, {
  componentName: "${componentName}",
  role: "default"
})`;

    // Replace in content
    let newContent = content;
    if (content.includes(searchPattern)) {
      newContent = content.replace(searchPattern, replacement);
    } else {
      // Try a more flexible regex-based replacement
      const regex = new RegExp(
        `withDivineErrorBoundary\\s*\\(\\s*${componentName}\\s*\\)`,
        "g",
      );
      newContent = content.replace(regex, replacement);
    }

    // Write the file
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, "utf-8");
      return true;
    }

    return false;
  } catch (error) {
    console.error(`Error fixing file ${filePath}:`, error);
    return false;
  }
};

// Fix direct usage of DivineErrorBoundary without componentName
const fixDirectUsage = () => {
  try {
    // Use grep to find all instances of DivineErrorBoundary without componentName
    const grepCommand = `grep -r "<DivineErrorBoundary" --include="*.tsx" src`;
    const result = execSync(grepCommand, { encoding: "utf-8" });

    // Parse the results
    const lines = result.split("\n").filter((line) => line.trim() !== "");

    // Filter for direct usage without componentName
    const directUsage = lines.filter((line) => {
      // Match DivineErrorBoundary without componentName
      return line.match(/<DivineErrorBoundary/) && !line.match(/componentName/);
    });

    // Process each file
    let fixedCount = 0;
    for (const line of directUsage) {
      const filePath = line.split(":")[0];
      try {
        const content = fs.readFileSync(filePath, "utf-8");

        // Extract the role from the line
        const roleMatch = line.match(/role=["']([\w-]+)["']/);
        const role = roleMatch ? roleMatch[1] : "default";

        // Get the component name from the file path
        const fileName = path.basename(filePath, ".tsx");
        const componentName =
          fileName.charAt(0).toUpperCase() + fileName.slice(1) + "Page";

        // Create a regex to match the DivineErrorBoundary without componentName
        const regex = new RegExp(
          `<DivineErrorBoundary\\s+role=["']${role}["'][^>]*>`,
          "g",
        );

        // Create the replacement
        const replacement = `<DivineErrorBoundary
      componentName="${componentName}"
      role="${role}"
    >`;

        // Replace in content
        const newContent = content.replace(regex, replacement);

        // Write the file if changed
        if (newContent !== content) {
          fs.writeFileSync(filePath, newContent, "utf-8");
          fixedCount++;
          console.log(`✅ Fixed direct usage in ${filePath}`);
        }
      } catch (error) {
        console.error(`Error fixing direct usage in ${filePath}:`, error);
      }
    }

    return fixedCount;
  } catch (error) {
    console.error("Error fixing direct usage:", error);
    return 0;
  }
};

// Main function
const main = () => {
  console.log(
    "🔍 Finding components using string literals with withDivineErrorBoundary...",
  );
  const stringLiteralUsage = findErrorBoundaryUsage();
  console.log(
    `Found ${stringLiteralUsage.length} components using string literals.`,
  );

  // Fix string literal usage
  let fixedCount = 0;
  for (const line of stringLiteralUsage) {
    const filePath = line.split(":")[0];
    const fixed = fixFile(filePath, line);
    if (fixed) {
      fixedCount++;
      console.log(`✅ Fixed ${filePath}`);
    }
  }
  console.log(`✨ Fixed ${fixedCount} components using string literals.`);

  console.log(
    "🔍 Finding components missing parameters with withDivineErrorBoundary...",
  );
  const missingParamUsage = findMissingParameters();
  console.log(
    `Found ${missingParamUsage.length} components missing parameters.`,
  );

  // Fix missing parameters
  let missingFixedCount = 0;
  for (const line of missingParamUsage) {
    const filePath = line.split(":")[0];
    const fixed = fixMissingParams(filePath, line);
    if (fixed) {
      missingFixedCount++;
      console.log(`✅ Fixed ${filePath}`);
    }
  }
  console.log(`✨ Fixed ${missingFixedCount} components missing parameters.`);

  console.log(
    "🔍 Finding direct usage of DivineErrorBoundary without componentName...",
  );
  const directFixedCount = fixDirectUsage();
  console.log(`✨ Fixed ${directFixedCount} instances of direct usage.`);

  console.log("✅ All done!");
};

// Run the script
main();

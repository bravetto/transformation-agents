#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

// Files that need 'use client' directive
const filesToFix = [
  "src/lib/unified-architecture.ts",
  "src/lib/responsive.ts",
  "src/lib/animation-utils.ts",
];

console.log('🔍 Checking files that need "use client" directive...');

filesToFix.forEach((filePath) => {
  const fullPath = path.join(process.cwd(), filePath);

  if (!fs.existsSync(fullPath)) {
    console.log(`⚠️  File not found: ${filePath}`);
    return;
  }

  const content = fs.readFileSync(fullPath, "utf8");

  if (!content.trim().startsWith("'use client'")) {
    console.log(`📝 Adding 'use client' to ${filePath}`);
    const newContent = "'use client';\n\n" + content;
    fs.writeFileSync(fullPath, newContent);
    console.log(`✅ Fixed ${filePath}`);
  } else {
    console.log(`✓ ${filePath} already has 'use client' directive`);
  }
});

console.log("\n🎉 All files processed!");
console.log("🔄 Rebuilding project...");

try {
  execSync("npm run build", { stdio: "inherit" });
  console.log("✨ Build successful!");
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}

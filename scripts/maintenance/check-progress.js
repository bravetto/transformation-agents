#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🔍 Checking Project Health...\n");

// Check build status
try {
  execSync("npm run build", { stdio: "pipe" });
  console.log("✅ Build: PASSING");
} catch (e) {
  console.log("❌ Build: FAILING");
}

// Count error.tsx files
const errorFiles = execSync('find src -name "error.tsx" | wc -l')
  .toString()
  .trim();
console.log(`📁 Error Boundaries: ${errorFiles} files`);

// Count "use client" directives
const clientComponents = execSync(
  'grep -r "^\'use client\'" src --include="*.tsx" | wc -l',
)
  .toString()
  .trim();
console.log(`🔧 Client Components: ${clientComponents} files`);

// List routes missing error.tsx
console.log("\n📋 Routes missing error.tsx:");
const appDir = "./src/app";
if (fs.existsSync(appDir)) {
  const routes = fs
    .readdirSync(appDir, { withFileTypes: true })
    .filter(
      (file) =>
        file.isDirectory() &&
        !file.name.startsWith("(") &&
        !file.name.startsWith("_"),
    )
    .filter((dir) => !fs.existsSync(path.join(appDir, dir.name, "error.tsx")));

  routes.forEach((route) => {
    console.log(`   - ${route.name}/`);
  });
}

console.log("\n📊 Progress Summary:");
console.log("- Day 1: Fix build ✓");
console.log("- Day 2: Add error boundaries ⏳");
console.log("- Day 3: Write tests ⏳");
console.log("- Day 4: Improve coverage ⏳");
console.log("- Day 5: Production ready ⏳");

#!/usr/bin/env node

/**
 * Clean Build Cache Script
 * Fixes ENOENT errors by cleaning Next.js build cache and creating necessary directories
 */

const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");

console.log("🧹 Cleaning build cache...\n");

// Directories to clean
const dirsToClean = [".next", "node_modules/.cache", ".swc"];

// Clean each directory
dirsToClean.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (fs.existsSync(fullPath)) {
    console.log(`Removing ${dir}...`);
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`✅ Removed ${dir}`);
    } catch (error) {
      console.error(`❌ Error removing ${dir}:`, error.message);
    }
  } else {
    console.log(`⏭️  ${dir} doesn't exist, skipping...`);
  }
});

console.log("\n📁 Creating necessary directories...\n");

// Create .next directory structure
const nextDirs = [
  ".next",
  ".next/cache",
  ".next/server",
  ".next/static",
  ".next/static/chunks",
  ".next/static/chunks/pages",
  ".next/static/css",
  ".next/static/media",
];

nextDirs.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created ${dir}`);
  }
});

// Create placeholder vendor chunks to prevent ENOENT errors
console.log("\n🔧 Creating placeholder vendor chunks...\n");

const vendorChunks = ["framework", "framer-motion", "commons", "shared"];

vendorChunks.forEach((chunk) => {
  const chunkPath = path.join(
    process.cwd(),
    ".next/static/chunks",
    `${chunk}.js`,
  );
  fs.writeFileSync(chunkPath, `/* Placeholder for ${chunk} chunk */`, "utf8");
  console.log(`✅ Created placeholder ${chunk}.js`);
});

console.log("\n🎯 Running additional cleanup...\n");

// Clear npm cache
try {
  console.log("Clearing npm cache...");
  execSync("npm cache clean --force", { stdio: "inherit" });
  console.log("✅ npm cache cleared");
} catch (error) {
  console.error("❌ Error clearing npm cache:", error.message);
}

// Clear TypeScript cache
const tsCacheDirs = ["tsconfig.tsbuildinfo", "src/**/*.tsbuildinfo"];

tsCacheDirs.forEach((pattern) => {
  try {
    const files = require("glob").sync(pattern);
    files.forEach((file) => {
      fs.unlinkSync(file);
      console.log(`✅ Removed ${file}`);
    });
  } catch (error) {
    // Ignore if glob is not installed or files don't exist
  }
});

console.log("\n✨ Build cache cleaned successfully!\n");
console.log("Next steps:");
console.log('1. Run "npm install" to ensure all dependencies are installed');
console.log('2. Run "npm run build" to create a fresh build');
console.log('3. If issues persist, try "rm -rf node_modules && npm install"\n');

const fs = require("fs");
const path = require("path");

console.log("📦 Starting static asset copy...");

// Copy static files to standalone build
const sourceStatic = path.join(process.cwd(), ".next/static");
const destStatic = path.join(process.cwd(), ".next/standalone/.next/static");

if (fs.existsSync(sourceStatic)) {
  fs.cpSync(sourceStatic, destStatic, { recursive: true });
  console.log("✅ Static assets copied successfully");
} else {
  console.log(
    "⚠️  Source static directory not found - this is normal for first build",
  );
}

// Copy public files
const sourcePublic = path.join(process.cwd(), "public");
const destPublic = path.join(process.cwd(), ".next/standalone/public");

if (fs.existsSync(sourcePublic)) {
  fs.cpSync(sourcePublic, destPublic, { recursive: true });
  console.log("✅ Public assets copied successfully");
} else {
  console.log("❌ Source public directory not found");
  process.exit(1);
}

console.log("✅ Asset copy complete!");

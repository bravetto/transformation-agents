#!/usr/bin/env node

const UXDocumentationUpdater = require("./update-ux-documentation");

console.log("🔍 Starting UX Documentation Watch Mode...");

const updater = new UXDocumentationUpdater();

// Handle process termination
process.on("SIGINT", () => {
  console.log("\n👋 Stopping UX Documentation Watch Mode...");
  process.exit(0);
});

// Start the updater
updater.init().catch((error) => {
  console.error("❌ Error initializing UX Documentation Updater:", error);
  process.exit(1);
});

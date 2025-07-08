#!/usr/bin/env node

const { spawn } = require("child_process");
const path = require("path");

console.log("🔐 Starting HTTPS server on https://localhost:1437");
console.log("📦 Using production build from .next/standalone\n");

// Start the Next.js production server on port 3000
const nextServer = spawn("node", [".next/standalone/server.js"], {
  env: { ...process.env, PORT: "3000" },
  stdio: "inherit",
});

// Give the server a moment to start
setTimeout(() => {
  console.log("\n🔒 Starting SSL proxy...");
  console.log("🌐 Access your site at: https://localhost:1437\n");

  // Start the SSL proxy
  const sslProxy = spawn(
    "npx",
    ["local-ssl-proxy", "--source", "1437", "--target", "3000"],
    {
      stdio: "inherit",
    },
  );

  // Handle cleanup
  process.on("SIGINT", () => {
    console.log("\n🛑 Shutting down servers...");
    nextServer.kill();
    sslProxy.kill();
    process.exit();
  });
}, 2000);

// Handle errors
nextServer.on("error", (err) => {
  console.error("❌ Failed to start Next.js server:", err);
  process.exit(1);
});

console.log("⏳ Starting servers...");

#!/usr/bin/env node

/**
 * 🔍 JAHmere Bridge MCP Server - Connection Debugger
 * Tests MCP protocol compliance and identifies connection issues
 */

const { spawn } = require("child_process");
const path = require("path");

console.log("🔍 MCP CONNECTION DEBUGGER");
console.log("==========================\n");

async function testMCPServer() {
  const serverPath = path.join(__dirname, "jahmere-bridge-minimal.js");
  console.log(`📍 Testing server: ${serverPath}`);

  // Test 1: Check if server file exists
  const fs = require("fs");
  if (!fs.existsSync(serverPath)) {
    console.log("❌ Server file not found!");
    return;
  }
  console.log("✅ Server file exists");

  // Test 2: Start server and test handshake
  console.log("\n🚀 Starting MCP server...");

  const server = spawn("node", [serverPath], {
    stdio: ["pipe", "pipe", "pipe"],
    cwd: process.cwd(),
  });

  let responseReceived = false;
  let serverOutput = "";
  let serverError = "";

  // Set up timeout
  const timeout = setTimeout(() => {
    console.log("⏰ Server timeout - no response in 5 seconds");
    server.kill();
  }, 5000);

  // Capture server output
  server.stdout.on("data", (data) => {
    const output = data.toString();
    serverOutput += output;
    console.log("📤 Server stdout:", output.trim());

    // Check if it's a valid JSON-RPC response
    try {
      const response = JSON.parse(output);
      if (response.jsonrpc === "2.0" && response.id === 1) {
        console.log("✅ Valid JSON-RPC response received!");
        responseReceived = true;
        clearTimeout(timeout);
        server.kill();
      }
    } catch (e) {
      // Not JSON, that's okay for debugging output
    }
  });

  server.stderr.on("data", (data) => {
    serverError += data.toString();
    console.log("❌ Server stderr:", data.toString().trim());
  });

  server.on("close", (code) => {
    console.log(`\n🏁 Server exited with code: ${code}`);

    if (responseReceived) {
      console.log("✅ MCP HANDSHAKE SUCCESSFUL!");
      console.log("🎯 Server appears to be working correctly");
      console.log("\n📋 RECOMMENDATIONS:");
      console.log("1. Disable some MCP servers to reduce tool count");
      console.log("2. Try restarting Cursor completely");
      console.log(
        "3. Check if filesystem server has too many tools (12 tools)",
      );
    } else {
      console.log("❌ MCP HANDSHAKE FAILED!");
      console.log("\n📊 DEBUG INFO:");
      console.log("Server output:", serverOutput || "None");
      console.log("Server errors:", serverError || "None");
      console.log("\n🔧 POSSIBLE FIXES:");
      console.log("1. Server not responding to stdio properly");
      console.log("2. JSON-RPC protocol implementation issue");
      console.log("3. Node.js environment or SDK version problem");
    }
  });

  // Test 3: Send initialize request
  console.log("📨 Sending initialize request...");

  const initRequest = {
    jsonrpc: "2.0",
    id: 1,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {
        roots: {
          listChanged: false,
        },
        sampling: {},
      },
      clientInfo: {
        name: "debug-client",
        version: "1.0.0",
      },
    },
  };

  server.stdin.write(JSON.stringify(initRequest) + "\n");

  // Wait for response or error
  await new Promise((resolve) => {
    server.on("close", resolve);
    setTimeout(resolve, 6000);
  });
}

async function checkSystemRequirements() {
  console.log("🔧 SYSTEM REQUIREMENTS CHECK");
  console.log("============================\n");

  // Check Node.js version
  console.log("Node.js version:", process.version);

  // Check if MCP SDK is installed
  try {
    const sdk = require("@modelcontextprotocol/sdk/package.json");
    console.log("✅ MCP SDK version:", sdk.version);
  } catch (e) {
    console.log("❌ MCP SDK not found:", e.message);
  }

  // Check current MCP config
  const os = require("os");
  const configPath = path.join(os.homedir(), ".cursor", "mcp.json");

  try {
    const config = JSON.parse(fs.readFileSync(configPath, "utf8"));
    console.log("✅ MCP config found");
    console.log("📊 Configured servers:", Object.keys(config.mcpServers || {}));

    // Count total tools
    let totalTools = 0;
    Object.entries(config.mcpServers || {}).forEach(([name, server]) => {
      console.log(`  - ${name}:`, server.command || server.url || "Unknown");
    });
  } catch (e) {
    console.log("❌ MCP config error:", e.message);
  }

  console.log("\n");
}

async function main() {
  await checkSystemRequirements();
  await testMCPServer();

  console.log("\n🎯 NEXT STEPS:");
  console.log(
    "1. If handshake successful: Disable filesystem server temporarily",
  );
  console.log("2. If handshake failed: Fix server implementation");
  console.log("3. Restart Cursor completely after any changes");
  console.log("4. Try with minimal MCP servers (only jahmere-bridge)");
}

main().catch(console.error);

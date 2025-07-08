#!/usr/bin/env node

/**
 * Verify ClickUp connection and environment variables
 * Run: node scripts/verify-clickup-connection.js
 */

require("dotenv").config({ path: ".env.local" });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;
const CLICKUP_SPACE_ID = process.env.CLICKUP_SPACE_ID;
const CLICKUP_TEAM_ID = process.env.CLICKUP_TEAM_ID;

console.log("🔍 Checking ClickUp Environment Variables...\n");

// Check if variables exist
const checks = {
  CLICKUP_API_KEY: CLICKUP_API_KEY ? "✅" : "❌",
  CLICKUP_LIST_ID: CLICKUP_LIST_ID ? "✅" : "❌",
  CLICKUP_SPACE_ID: CLICKUP_SPACE_ID ? "✅" : "❌",
  CLICKUP_TEAM_ID: CLICKUP_TEAM_ID ? "✅" : "❌",
};

console.log("Environment Variables Status:");
Object.entries(checks).forEach(([key, status]) => {
  console.log(`${status} ${key}: ${process.env[key] ? "Set" : "Missing"}`);
});

if (!CLICKUP_API_KEY || !CLICKUP_LIST_ID) {
  console.error("\n❌ Missing required environment variables!");
  process.exit(1);
}

console.log("\n🔗 Testing ClickUp API Connection...\n");

// Test API connection
async function testConnection() {
  try {
    // Test 1: Get authenticated user
    console.log("1️⃣ Testing authentication...");
    const userResponse = await fetch("https://api.clickup.com/api/v2/user", {
      headers: {
        Authorization: CLICKUP_API_KEY,
        "Content-Type": "application/json",
      },
    });

    if (!userResponse.ok) {
      throw new Error(
        `Authentication failed: ${userResponse.status} ${userResponse.statusText}`,
      );
    }

    const userData = await userResponse.json();
    console.log(
      `✅ Authenticated as: ${userData.user.username} (${userData.user.email})`,
    );

    // Test 2: Get list details
    console.log("\n2️⃣ Testing list access...");
    const listResponse = await fetch(
      `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}`,
      {
        headers: {
          Authorization: CLICKUP_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    if (!listResponse.ok) {
      throw new Error(
        `List access failed: ${listResponse.status} ${listResponse.statusText}`,
      );
    }

    const listData = await listResponse.json();
    console.log(`✅ List found: "${listData.name}"`);
    console.log(`   Status: ${listData.status ? "Active" : "Inactive"}`);
    console.log(`   Tasks: ${listData.task_count || 0}`);

    // Test 3: Get custom fields
    console.log("\n3️⃣ Fetching custom fields...");
    const fieldsResponse = await fetch(
      `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/field`,
      {
        headers: {
          Authorization: CLICKUP_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    if (!fieldsResponse.ok) {
      throw new Error(
        `Fields fetch failed: ${fieldsResponse.status} ${fieldsResponse.statusText}`,
      );
    }

    const fieldsData = await fieldsResponse.json();
    const fields = fieldsData.fields || [];

    console.log(`✅ Found ${fields.length} custom fields:`);
    console.log("\n📋 Your Custom Fields:");
    console.log("─".repeat(80));

    fields.forEach((field, index) => {
      console.log(`${index + 1}. ${field.name}`);
      console.log(`   ID: ${field.id}`);
      console.log(`   Type: ${field.type}`);
      if (field.type === "labels" && field.type_config?.options) {
        console.log(
          `   Options: ${field.type_config.options.map((o) => o.name).join(", ")}`,
        );
      }
      console.log("");
    });

    // Test 4: Verify space access
    if (CLICKUP_SPACE_ID) {
      console.log("4️⃣ Testing space access...");
      const spaceResponse = await fetch(
        `https://api.clickup.com/api/v2/space/${CLICKUP_SPACE_ID}`,
        {
          headers: {
            Authorization: CLICKUP_API_KEY,
            "Content-Type": "application/json",
          },
        },
      );

      if (spaceResponse.ok) {
        const spaceData = await spaceResponse.json();
        console.log(`✅ Space found: "${spaceData.name}"`);
      } else {
        console.log(
          `⚠️  Space access failed (this might be normal due to permissions)`,
        );
      }
    }

    console.log(
      "\n🎉 SUCCESS! Your ClickUp integration is properly configured!\n",
    );

    console.log("⚠️  IMPORTANT: You still need to update the field IDs!");
    console.log("   Run: npm run clickup:fetch-fields");
    console.log(
      "   Then update src/lib/crm/clickup-field-mapping.ts with the IDs shown above.",
    );
  } catch (error) {
    console.error("\n❌ Connection test failed:", error.message);
    console.error("\nTroubleshooting:");
    console.error("1. Check your API key is correct");
    console.error("2. Ensure you have access to the list");
    console.error("3. Verify your internet connection");
    process.exit(1);
  }
}

testConnection();

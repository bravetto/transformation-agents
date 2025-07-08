#!/usr/bin/env node

/**
 * ClickUp CRM Integration Test Suite
 * Tests all CRM functionality including CRUD operations
 */

require("dotenv").config();

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;
const BASE_URL = "http://localhost:3000";

// Test data
const testContact = {
  firstName: "Test",
  lastName: "User",
  email: `test${Date.now()}@bridge.com`,
  phone: "555-0123",
  relationship: "Supporter",
  connectionStrength: "High",
  engagementLevel: "high",
  pagesVisited: 5,
  timeOnSite: 300,
  storiesRead: 3,
  letterSubmitted: true,
  volunteerSignup: false,
  leadScore: 85,
};

async function testCreateContact() {
  console.log("🧪 Testing: Create Contact");

  try {
    const response = await fetch(`${BASE_URL}/api/crm/contacts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(testContact),
    });

    const result = await response.json();

    if (result.success) {
      console.log("✅ Contact created successfully!");
      console.log(`   ClickUp URL: ${result.data.url}`);
      console.log(`   Task ID: ${result.data.id}`);
      return result.data.id;
    } else {
      console.log("❌ Failed to create contact:", result.error);
      return null;
    }
  } catch (error) {
    console.log("❌ Error:", error.message);
    return null;
  }
}

async function testGetContact(contactId) {
  console.log("\n🧪 Testing: Get Contact");

  try {
    const response = await fetch(
      `${BASE_URL}/api/crm/contacts?id=${contactId}`,
    );
    const result = await response.json();

    if (result.success) {
      console.log("✅ Contact retrieved successfully!");
      console.log(`   Name: ${result.data.name}`);
      console.log(
        `   Email: ${result.data.custom_fields.find((f) => f.name === "Email")?.value || "N/A"}`,
      );
    } else {
      console.log("❌ Failed to get contact:", result.error);
    }
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

async function testUpdateContact(contactId) {
  console.log("\n🧪 Testing: Update Contact");

  try {
    const updateData = {
      leadScore: 95,
      engagementLevel: "high",
      lastEngagement: new Date().toISOString(),
    };

    const response = await fetch(`${BASE_URL}/api/crm/contacts`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: contactId, ...updateData }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("✅ Contact updated successfully!");
      console.log(`   Lead Score: ${updateData.leadScore}`);
    } else {
      console.log("❌ Failed to update contact:", result.error);
    }
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

async function testBulkSync() {
  console.log("\n🧪 Testing: Bulk Sync");

  const contacts = [
    {
      firstName: "Bulk",
      lastName: "Test1",
      email: "bulk1@bridge.com",
      relationship: "Volunteer",
    },
    {
      firstName: "Bulk",
      lastName: "Test2",
      email: "bulk2@bridge.com",
      relationship: "Donor",
    },
  ];

  try {
    const response = await fetch(`${BASE_URL}/api/crm/sync`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ contacts }),
    });

    const result = await response.json();

    if (result.success) {
      console.log("✅ Bulk sync successful!");
      console.log(`   Created: ${result.created}`);
      console.log(`   Updated: ${result.updated}`);
      console.log(`   Failed: ${result.failed}`);
    } else {
      console.log("❌ Bulk sync failed:", result.error);
    }
  } catch (error) {
    console.log("❌ Error:", error.message);
  }
}

async function verifyInClickUp() {
  console.log("\n🔍 Verifying in ClickUp...");

  try {
    const response = await fetch(
      `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/task`,
      {
        headers: {
          Authorization: CLICKUP_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();

    console.log(`✅ Found ${data.tasks.length} contacts in ClickUp`);

    // Show recent contacts
    const recent = data.tasks.slice(0, 3);
    recent.forEach((task) => {
      console.log(`   - ${task.name} (${task.status.status})`);
    });
  } catch (error) {
    console.log("❌ Failed to verify in ClickUp:", error.message);
  }
}

async function runAllTests() {
  console.log("🚀 Starting ClickUp CRM Test Suite\n");

  // Check environment
  if (!CLICKUP_API_KEY || !CLICKUP_LIST_ID) {
    console.log("❌ Missing environment variables!");
    console.log("   Please set CLICKUP_API_KEY and CLICKUP_LIST_ID");
    return;
  }

  // Run tests
  const contactId = await testCreateContact();

  if (contactId) {
    await testGetContact(contactId);
    await testUpdateContact(contactId);
  }

  await testBulkSync();
  await verifyInClickUp();

  console.log("\n✨ Test suite complete!");
}

// Run tests
runAllTests();

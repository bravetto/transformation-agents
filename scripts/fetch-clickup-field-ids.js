#!/usr/bin/env node

/**
 * Utility script to fetch ClickUp custom field IDs
 * Run this to get the actual field IDs from your ClickUp workspace
 *
 * Usage: node scripts/fetch-clickup-field-ids.js
 */

require("dotenv").config({ path: ".env.local" });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

if (!CLICKUP_API_KEY || !CLICKUP_LIST_ID) {
  console.error("❌ Missing required environment variables:");
  if (!CLICKUP_API_KEY) console.error("   - CLICKUP_API_KEY");
  if (!CLICKUP_LIST_ID) console.error("   - CLICKUP_LIST_ID");
  console.error("\nPlease set these in your .env.local file");
  process.exit(1);
}

async function fetchFields() {
  console.log("🔍 Fetching ClickUp custom fields...");
  console.log(`   List ID: ${CLICKUP_LIST_ID}`);
  console.log("");

  try {
    const response = await fetch(
      `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/field`,
      {
        headers: {
          Authorization: CLICKUP_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`ClickUp API Error (${response.status}): ${error}`);
    }

    const data = await response.json();
    const fields = data.fields || [];

    console.log(`✅ Found ${fields.length} custom fields:\n`);

    // Display fields in a table format
    console.log("Field Name                    | Field ID         | Type");
    console.log(
      "------------------------------|------------------|------------------",
    );

    fields.forEach((field) => {
      const name = field.name.padEnd(28);
      const id = field.id.padEnd(16);
      const type = field.type;
      console.log(`${name} | ${id} | ${type}`);
    });

    // Generate the code to update the field mapping
    console.log("\n\n📝 Update src/lib/crm/clickup-field-mapping.ts with:\n");
    console.log("export const CLICKUP_FIELD_IDS: ClickUpCustomFieldIds = {");

    fields.forEach((field) => {
      const fieldName = field.name
        .toLowerCase()
        .replace(/[\/\s]+/g, "_")
        .replace(/[^\w_]/g, "");
      console.log(
        `  ${fieldName}: '${field.id}', // ${field.name} (${field.type})`,
      );
    });

    console.log("};\n");

    // Also show any labels/options for dropdown fields
    const labelFields = fields.filter(
      (f) => f.type === "labels" || f.type === "drop_down",
    );
    if (labelFields.length > 0) {
      console.log("📋 Label/Dropdown Options:\n");
      labelFields.forEach((field) => {
        console.log(`${field.name}:`);
        if (field.type_config?.options) {
          field.type_config.options.forEach((option) => {
            console.log(
              `  - ${option.name} (id: ${option.id}, color: ${option.color})`,
            );
          });
        }
        console.log("");
      });
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

// Run the script
fetchFields();

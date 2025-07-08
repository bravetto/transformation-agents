#!/usr/bin/env node

/**
 * Script to add missing Bridge Project custom fields to ClickUp CRM
 * Run with: node scripts/add-missing-clickup-fields.js
 */

require("dotenv").config({ path: ".env.local" });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_LIST_ID = process.env.CLICKUP_LIST_ID;

if (!CLICKUP_API_KEY || !CLICKUP_LIST_ID) {
  console.error("❌ Missing CLICKUP_API_KEY or CLICKUP_LIST_ID in environment");
  process.exit(1);
}

// Fields to add for complete Bridge Project support
const FIELDS_TO_ADD = [
  // Behavior Tracking
  {
    name: "Pages Visited",
    type: "text",
    description: "Pages the contact has visited on the site",
  },
  {
    name: "Time on Site (minutes)",
    type: "number",
    description: "Total time spent on site in minutes",
  },
  {
    name: "Stories Read",
    type: "text",
    description: "List of stories/content the contact has read",
  },

  // Conversion Data
  {
    name: "Letter Submitted",
    type: "checkbox",
    description: "Has the contact submitted a letter?",
  },
  {
    name: "Volunteer Signup",
    type: "checkbox",
    description: "Has the contact signed up to volunteer?",
  },
  {
    name: "Willing to Testify",
    type: "checkbox",
    description: "Is the contact willing to testify?",
  },

  // Lifecycle Data
  {
    name: "Lead Score",
    type: "number",
    description: "Engagement score for the contact (0-100)",
  },
  {
    name: "Last Engagement",
    type: "date",
    description: "Date of last meaningful interaction",
  },

  // Additional Bridge Project Fields
  {
    name: "Relationship Type",
    type: "drop_down",
    description: "Type of relationship with Bridge Project",
    type_config: {
      options: [
        { name: "Founder", color: "#FF7FAB" },
        { name: "Core Team", color: "#0231E8" },
        { name: "Supporter", color: "#2ecd6f" },
        { name: "Community Leader", color: "#f900ea" },
        { name: "Technology Partner", color: "#1bbc9c" },
        { name: "Volunteer", color: "#ff7800" },
        { name: "Testimony Provider", color: "#7C4DFF" },
        { name: "Donor", color: "#E65100" },
        { name: "Advocate", color: "#04A9F4" },
      ],
    },
  },
  {
    name: "Connection Strength",
    type: "drop_down",
    description: "Strength of connection to Bridge Project",
    type_config: {
      options: [
        { name: "Core", color: "#e50000" },
        { name: "Strong", color: "#FF7FAB" },
        { name: "Medium", color: "#0231E8" },
        { name: "Developing", color: "#2ecd6f" },
        { name: "New", color: "#f9d900" },
      ],
    },
  },
];

async function addCustomField(field) {
  try {
    const response = await fetch(
      `https://api.clickup.com/api/v2/list/${CLICKUP_LIST_ID}/field`,
      {
        method: "POST",
        headers: {
          Authorization: CLICKUP_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(field),
      },
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to add field: ${error}`);
    }

    const result = await response.json();
    console.log(
      `✅ Added field: ${field.name} (ID: ${result.field?.id || result.id})`,
    );
    return {
      name: field.name,
      id: result.field?.id || result.id,
      type: field.type,
    };
  } catch (error) {
    console.error(`❌ Error adding field ${field.name}:`, error.message);
    return null;
  }
}

async function main() {
  console.log("🚀 Adding missing Bridge Project fields to ClickUp CRM...\n");

  const results = [];

  for (const field of FIELDS_TO_ADD) {
    console.log(`Adding field: ${field.name} (${field.type})...`);
    const result = await addCustomField(field);
    if (result && result.id) {
      results.push(result);
    }

    // Add delay to respect rate limits
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log("\n📋 Summary of added fields:\n");
  console.log("Field Name | Field ID | Type");
  console.log("-----------|----------|------");

  results.forEach((field) => {
    console.log(`${field.name} | ${field.id} | ${field.type}`);
  });

  if (results.length > 0) {
    console.log("\n💡 Next steps:");
    console.log(
      "1. Update src/lib/crm/clickup-field-mapping.ts with the new field IDs",
    );
    console.log("2. Update the mapping functions to use these new fields");
    console.log("3. Test the integration with the complete field set");
  }
}

// Dry run option
if (process.argv.includes("--dry-run")) {
  console.log("🔍 DRY RUN - These fields would be added:\n");
  FIELDS_TO_ADD.forEach((field) => {
    console.log(`- ${field.name} (${field.type}): ${field.description}`);
  });
  console.log("\nRun without --dry-run to actually add the fields.");
} else {
  main().catch(console.error);
}

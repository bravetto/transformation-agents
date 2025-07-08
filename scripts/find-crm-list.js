#!/usr/bin/env node

/**
 * Find the Bridge Project CRM list by searching all accessible lists
 */

require("dotenv").config({ path: ".env.local" });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_TEAM_ID = process.env.CLICKUP_TEAM_ID;

if (!CLICKUP_API_KEY || !CLICKUP_TEAM_ID) {
  console.error("❌ Missing required environment variables!");
  process.exit(1);
}

async function findCRMList() {
  console.log("🔍 Searching for The Bridge Project CRM list...\n");

  try {
    // Get all spaces in the team
    const spacesResponse = await fetch(
      `https://api.clickup.com/api/v2/team/${CLICKUP_TEAM_ID}/space?archived=false`,
      {
        headers: {
          Authorization: CLICKUP_API_KEY,
          "Content-Type": "application/json",
        },
      },
    );

    if (!spacesResponse.ok) {
      throw new Error(`Failed to fetch spaces: ${spacesResponse.status}`);
    }

    const { spaces } = await spacesResponse.json();
    console.log(`Found ${spaces.length} spaces. Searching for CRM list...\n`);

    let crmListFound = false;

    // Search through all spaces
    for (const space of spaces) {
      console.log(`📁 Searching in space: ${space.name} (ID: ${space.id})`);

      // Get folders in this space
      const foldersResponse = await fetch(
        `https://api.clickup.com/api/v2/space/${space.id}/folder?archived=false`,
        {
          headers: {
            Authorization: CLICKUP_API_KEY,
            "Content-Type": "application/json",
          },
        },
      );

      if (foldersResponse.ok) {
        const { folders } = await foldersResponse.json();

        // Check lists in folders
        for (const folder of folders) {
          for (const list of folder.lists || []) {
            console.log(`   📂 ${folder.name} → 📋 ${list.name}`);

            if (
              list.name.includes("The Bridge Project CRM") ||
              list.name.includes("🌈 The Bridge Project CRM") ||
              list.name.toLowerCase().includes("bridge project crm")
            ) {
              console.log(`\n✅ FOUND IT! The Bridge Project CRM`);
              console.log(`   List ID: ${list.id}`);
              console.log(`   List Name: ${list.name}`);
              console.log(`   In Folder: ${folder.name}`);
              console.log(`   In Space: ${space.name}`);
              console.log(`\n📝 Update your .env.local with:`);
              console.log(`   CLICKUP_LIST_ID=${list.id}\n`);
              crmListFound = true;

              // Try to get custom fields for this list
              console.log("📋 Fetching custom fields for this list...\n");
              const fieldsResponse = await fetch(
                `https://api.clickup.com/api/v2/list/${list.id}/field`,
                {
                  headers: {
                    Authorization: CLICKUP_API_KEY,
                    "Content-Type": "application/json",
                  },
                },
              );

              if (fieldsResponse.ok) {
                const { fields } = await fieldsResponse.json();
                console.log(`Found ${fields.length} custom fields:\n`);
                console.log(
                  "Field Name                              | Field ID",
                );
                console.log(
                  "----------------------------------------|------------------",
                );

                fields.forEach((field) => {
                  const name = field.name.padEnd(38);
                  console.log(`${name} | ${field.id}`);
                });
              }
            }
          }
        }

        // Check folderless lists
        const listsResponse = await fetch(
          `https://api.clickup.com/api/v2/space/${space.id}/list?archived=false`,
          {
            headers: {
              Authorization: CLICKUP_API_KEY,
              "Content-Type": "application/json",
            },
          },
        );

        if (listsResponse.ok) {
          const { lists } = await listsResponse.json();
          for (const list of lists || []) {
            console.log(`   📋 ${list.name} (no folder)`);

            if (
              list.name.includes("The Bridge Project CRM") ||
              list.name.includes("🌈 The Bridge Project CRM")
            ) {
              console.log(`\n✅ FOUND IT! The Bridge Project CRM`);
              console.log(`   List ID: ${list.id}`);
              console.log(`   List Name: ${list.name}`);
              console.log(`   Location: Folderless in ${space.name}`);
              console.log(`\n📝 Update your .env.local with:`);
              console.log(`   CLICKUP_LIST_ID=${list.id}\n`);
              crmListFound = true;
            }
          }
        }
      }
    }

    if (!crmListFound) {
      console.log('\n❌ Could not find "The Bridge Project CRM" list.');
      console.log("Make sure:");
      console.log("1. The list exists and is not archived");
      console.log("2. Your API key has access to the workspace");
      console.log('3. The list name contains "The Bridge Project CRM"');
    }
  } catch (error) {
    console.error("\n❌ Error:", error.message);
  }
}

findCRMList();

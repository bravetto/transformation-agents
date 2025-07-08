#!/usr/bin/env node

/**
 * Find all accessible ClickUp lists
 * This helps identify the correct list ID for your CRM
 */

require("dotenv").config({ path: ".env.local" });

const CLICKUP_API_KEY = process.env.CLICKUP_API_KEY;
const CLICKUP_TEAM_ID = process.env.CLICKUP_TEAM_ID;
const CLICKUP_SPACE_ID = process.env.CLICKUP_SPACE_ID;

if (!CLICKUP_API_KEY) {
  console.error("❌ Missing CLICKUP_API_KEY!");
  process.exit(1);
}

async function findLists() {
  console.log("🔍 Finding all accessible ClickUp lists...\n");

  try {
    // First, get all spaces if no space ID is provided
    if (!CLICKUP_SPACE_ID && CLICKUP_TEAM_ID) {
      console.log("1️⃣ Fetching spaces in team...");
      const spacesResponse = await fetch(
        `https://api.clickup.com/api/v2/team/${CLICKUP_TEAM_ID}/space?archived=false`,
        {
          headers: {
            Authorization: CLICKUP_API_KEY,
            "Content-Type": "application/json",
          },
        },
      );

      if (spacesResponse.ok) {
        const spacesData = await spacesResponse.json();
        console.log(`Found ${spacesData.spaces.length} spaces:\n`);

        for (const space of spacesData.spaces) {
          console.log(`📁 Space: ${space.name} (ID: ${space.id})`);

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
            const foldersData = await foldersResponse.json();

            // Get folderless lists
            for (const list of space.lists || []) {
              console.log(`   📋 List: ${list.name} (ID: ${list.id})`);
            }

            // Get lists in folders
            for (const folder of foldersData.folders) {
              console.log(`   📂 Folder: ${folder.name}`);
              for (const list of folder.lists) {
                console.log(`      📋 List: ${list.name} (ID: ${list.id})`);

                // Check if this is the CRM list
                if (
                  list.name.toLowerCase().includes("crm") ||
                  list.name.toLowerCase().includes("bridge") ||
                  list.name.toLowerCase().includes("contact")
                ) {
                  console.log(`         ⭐ POSSIBLE CRM LIST!`);
                }
              }
            }
          }
          console.log("");
        }
      }
    } else if (CLICKUP_SPACE_ID) {
      // If we have a space ID, just get lists from that space
      console.log(`1️⃣ Fetching lists in space ${CLICKUP_SPACE_ID}...`);

      // Get folders
      const foldersResponse = await fetch(
        `https://api.clickup.com/api/v2/space/${CLICKUP_SPACE_ID}/folder?archived=false`,
        {
          headers: {
            Authorization: CLICKUP_API_KEY,
            "Content-Type": "application/json",
          },
        },
      );

      if (foldersResponse.ok) {
        const foldersData = await foldersResponse.json();
        console.log(`Found ${foldersData.folders.length} folders:\n`);

        for (const folder of foldersData.folders) {
          console.log(`📂 Folder: ${folder.name}`);
          for (const list of folder.lists) {
            console.log(`   📋 List: ${list.name} (ID: ${list.id})`);

            if (
              list.name.toLowerCase().includes("crm") ||
              list.name.toLowerCase().includes("bridge") ||
              list.name.toLowerCase().includes("contact")
            ) {
              console.log(`      ⭐ POSSIBLE CRM LIST!`);
            }
          }
        }
      }

      // Get folderless lists
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
        if (spaceData.lists && spaceData.lists.length > 0) {
          console.log(`\n📁 Folderless lists:`);
          for (const list of spaceData.lists) {
            console.log(`   📋 List: ${list.name} (ID: ${list.id})`);
          }
        }
      }
    }

    console.log("\n💡 Tips:");
    console.log("1. Find your CRM list above and note its ID");
    console.log("2. Update CLICKUP_LIST_ID in your .env.local");
    console.log("3. The list ID is the number shown in parentheses");
    console.log(
      '\nIf you see "POSSIBLE CRM LIST" above, that\'s likely the one you want!',
    );
  } catch (error) {
    console.error("\n❌ Error:", error.message);
  }
}

findLists();

import { reminderSystem } from "./reminder-system";

async function initializeBacklogSystem() {
  try {
    console.log("🔄 Initializing Backlog Reminder System...");

    // Load backlog items
    await reminderSystem.loadBacklog();
    console.log("✅ Backlog items loaded successfully");

    // The system will automatically start watching for file changes
    console.log("👀 Watching for file changes...");
    console.log(
      "\nThe reminder system will display relevant backlog items when:",
    );
    console.log("1. Files are created, modified, or deleted");
    console.log("2. Content matches backlog contexts");
    console.log("3. File paths match backlog contexts");

    // Keep the process running
    process.stdin.resume();

    // Handle graceful shutdown
    process.on("SIGINT", () => {
      console.log("\n\n🛑 Shutting down Backlog Reminder System...");
      process.exit(0);
    });
  } catch (error) {
    console.error("Error initializing backlog system:", error);
    process.exit(1);
  }
}

// Run the initialization
initializeBacklogSystem();

import { z } from "zod";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import chokidar from "chokidar";

// Type Definitions
const ContextualTrigger = z.object({
  contexts: z.array(z.string()),
  conditions: z.array(z.string()),
  priority: z.number().min(1).max(5),
  message: z.string(),
  relatedItems: z.array(z.string()),
});

const BacklogItem = z.object({
  title: z.string(),
  priority: z.enum(["🔥", "⭐", "💡", "🔄"]),
  tags: z.array(z.string()),
  description: z.string(),
  surfaceConditions: z.array(z.string()),
});

type ContextualTriggerType = z.infer<typeof ContextualTrigger>;
type BacklogItemType = z.infer<typeof BacklogItem>;

class BacklogReminderSystem {
  private triggers: ContextualTriggerType[] = [];
  private backlogItems: BacklogItemType[] = [];
  private activeContexts: Set<string> = new Set();

  constructor() {
    this.initializeWatchers();
  }

  private async initializeWatchers() {
    // Watch for file changes
    const watcher = chokidar.watch(["src/**/*", "docs/**/*", "scripts/**/*"], {
      ignored: /(^|[\/\\])\../,
      persistent: true,
    });

    watcher
      .on("add", (path) => this.handleFileChange("add", path))
      .on("change", (path) => this.handleFileChange("change", path))
      .on("unlink", (path) => this.handleFileChange("delete", path));
  }

  private async handleFileChange(
    event: "add" | "change" | "delete",
    filePath: string,
  ) {
    // Extract contexts from file path and content
    const contexts = await this.extractContexts(filePath);

    // Update active contexts
    contexts.forEach((context) => this.activeContexts.add(context));

    // Check for relevant reminders
    const reminders = this.findRelevantReminders();

    if (reminders.length > 0) {
      this.displayReminders(reminders);
    }
  }

  private async extractContexts(filePath: string): Promise<string[]> {
    const contexts: Set<string> = new Set();

    // Add contexts based on file path
    if (filePath.includes("assessment")) contexts.add("#assessment");
    if (filePath.includes("visualization")) contexts.add("#visualization");
    if (filePath.includes("analysis")) contexts.add("#analysis");
    if (filePath.includes("automation")) contexts.add("#automation");
    if (filePath.includes("docs")) contexts.add("#documentation");
    if (filePath.includes("team")) contexts.add("#team");
    if (filePath.includes("strategy")) contexts.add("#strategy");
    if (filePath.includes("integration")) contexts.add("#integration");

    // Read file content and extract additional contexts
    try {
      const content = await fs.readFile(filePath, "utf-8");

      // Check for context indicators in content
      if (content.includes("assessment")) contexts.add("#assessment");
      if (content.includes("visualization")) contexts.add("#visualization");
      if (content.includes("analysis")) contexts.add("#analysis");
      // ... add more content-based context extraction
    } catch (error) {
      console.error(`Error reading file ${filePath}:`, error);
    }

    return Array.from(contexts);
  }

  private findRelevantReminders(): BacklogItemType[] {
    const relevantItems: BacklogItemType[] = [];

    for (const item of this.backlogItems) {
      // Check if any of the item's tags match active contexts
      const hasRelevantContext = item.tags.some((tag) =>
        this.activeContexts.has(tag),
      );

      if (hasRelevantContext) {
        relevantItems.push(item);
      }
    }

    // Sort by priority
    return relevantItems.sort((a, b) => {
      const priorityOrder = { "🔥": 0, "⭐": 1, "💡": 2, "🔄": 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });
  }

  private displayReminders(items: BacklogItemType[]) {
    console.log("\n🔔 Related Backlog Items:");

    items.forEach((item) => {
      console.log(`\n${item.priority} ${item.title}`);
      console.log(`Tags: ${item.tags.join(" ")}`);
      console.log(`Description: ${item.description}`);
      console.log("Surface Conditions:");
      item.surfaceConditions.forEach((condition) =>
        console.log(`  - ${condition}`),
      );
    });
  }

  // Public API
  async loadBacklog() {
    try {
      const backlogPath = path.join(process.cwd(), "docs", "BACKLOG.md");
      const content = await fs.readFile(backlogPath, "utf-8");
      const { data } = matter(content);

      // Parse backlog items
      this.backlogItems = this.parseBacklogItems(content);
    } catch (error) {
      console.error("Error loading backlog:", error);
    }
  }

  private parseBacklogItems(content: string): BacklogItemType[] {
    const items: BacklogItemType[] = [];
    const sections = content.split("### ").slice(1); // Skip first empty section

    for (const section of sections) {
      try {
        const lines = section.split("\n");
        const titleLine = lines[0];
        const title = titleLine.replace(/\[.*\]/, "").trim();
        const priority = titleLine.match(
          /\[(.*?)\]/,
        )?.[1] as BacklogItemType["priority"];

        const tagsLine = lines.find((line) => line.startsWith("**Tags**:"));
        const tags = tagsLine
          ? tagsLine.match(/`#\w+`/g)?.map((tag) => tag.replace(/`/g, "")) || []
          : [];

        const descriptionStart = lines.findIndex(
          (line) => !line.startsWith("**") && line.trim() !== "",
        );
        const descriptionEnd = lines.findIndex((line) =>
          line.startsWith("**Surfaces When**:"),
        );
        const description = lines
          .slice(descriptionStart, descriptionEnd)
          .filter((line) => line.trim() !== "")
          .join("\n");

        const surfaceConditions = lines
          .slice(descriptionEnd + 1)
          .filter((line) => line.startsWith("- "))
          .map((line) => line.replace("- ", "").trim());

        items.push({
          title,
          priority,
          tags,
          description,
          surfaceConditions,
        });
      } catch (error) {
        console.error("Error parsing backlog item:", error);
      }
    }

    return items;
  }

  addContext(context: string) {
    this.activeContexts.add(context);
    const reminders = this.findRelevantReminders();
    if (reminders.length > 0) {
      this.displayReminders(reminders);
    }
  }

  removeContext(context: string) {
    this.activeContexts.delete(context);
  }

  clearContexts() {
    this.activeContexts.clear();
  }

  async getBacklogItems(): Promise<BacklogItemType[]> {
    if (this.backlogItems.length === 0) {
      await this.loadBacklog();
    }
    return this.backlogItems;
  }
}

export const reminderSystem = new BacklogReminderSystem();
export default reminderSystem;

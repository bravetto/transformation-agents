#!/usr/bin/env node

/**
 * 🔐 ENVIRONMENT VARIABLES MASTER SETUP SCRIPT
 * Generates complete environment configuration for The Bridge Project
 */

const fs = require("fs").promises;
const path = require("path");

// Environment variables configuration
const ENV_VARS = {
  // Core Application
  APP_VERSION: {
    description: "Application version for tracking and logging",
    type: "optional",
    category: "Core Application",
    defaultValue: "1.0.0",
    exampleValue: "1.0.0",
  },
  LOG_LEVEL: {
    description: "Logging level: DEBUG, INFO, WARN, ERROR, CRITICAL",
    type: "optional",
    category: "Core Application",
    defaultValue: "INFO",
    exampleValue: "INFO",
  },
  ANALYZE: {
    description:
      'Bundle analyzer for build optimization (set to "true" to enable)',
    type: "optional",
    category: "Core Application",
    defaultValue: "false",
    exampleValue: "false",
  },

  // Database
  DATABASE_URL: {
    description: "PostgreSQL connection string for Prisma ORM",
    type: "required",
    category: "Database",
    link: "https://vercel.com/docs/storage/vercel-postgres/quickstart",
    exampleValue:
      "postgresql://user:password@host:5432/bridge_project?sslmode=require",
    setupSteps: [
      "Go to Vercel Dashboard > Storage",
      'Click "Create Database" > "Postgres"',
      "Copy the connection string from the dashboard",
      "For local dev, you can use a local PostgreSQL instance",
    ],
  },
  DB_MAX_CONNECTIONS: {
    description: "Maximum number of database connections in pool",
    type: "optional",
    category: "Database",
    defaultValue: "20",
    exampleValue: "20",
  },
  DB_IDLE_TIMEOUT: {
    description: "Database connection idle timeout in milliseconds",
    type: "optional",
    category: "Database",
    defaultValue: "30000",
    exampleValue: "30000",
  },
  DB_CONNECTION_TIMEOUT: {
    description: "Database connection timeout in milliseconds",
    type: "optional",
    category: "Database",
    defaultValue: "5000",
    exampleValue: "5000",
  },

  // ClickUp CRM Integration
  CLICKUP_API_KEY: {
    description: "ClickUp API key for CRM functionality",
    type: "required",
    category: "ClickUp CRM Integration",
    link: "https://clickup.com/api",
    exampleValue: "pk_your_clickup_api_key_here",
    setupSteps: [
      "Sign up for ClickUp account",
      "Go to Settings > Apps",
      'Click "Generate" next to API Token',
      "Copy the generated token",
    ],
  },
  CLICKUP_LIST_ID: {
    description: "ClickUp List ID for storing contacts",
    type: "required",
    category: "ClickUp CRM Integration",
    link: "https://clickup.com/api",
    exampleValue: "your_clickup_list_id_here",
    setupSteps: [
      "Create a new List in your ClickUp workspace",
      "Copy the List ID from the URL or API",
    ],
  },
  CLICKUP_TEAM_ID: {
    description: "ClickUp Team/Workspace ID",
    type: "required",
    category: "ClickUp CRM Integration",
    link: "https://clickup.com/api",
    exampleValue: "your_clickup_team_id_here",
    setupSteps: [
      "Go to your ClickUp workspace",
      "Find the Team ID in workspace settings",
      "Or get it from the API response",
    ],
  },

  // ClickUp Custom Fields (all optional with defaults)
  CLICKUP_EMAIL_FIELD_ID: {
    description: "ClickUp custom field ID for email",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "email",
    exampleValue: "custom_field_email",
  },
  CLICKUP_RELATIONSHIP_FIELD_ID: {
    description: "ClickUp custom field ID for relationship type",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "relationship",
    exampleValue: "custom_field_relationship",
  },
  CLICKUP_CONNECTION_STRENGTH_FIELD_ID: {
    description: "ClickUp custom field ID for connection strength",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "connection_strength",
    exampleValue: "custom_field_connection_strength",
  },
  CLICKUP_ENGAGEMENT_LEVEL_FIELD_ID: {
    description: "ClickUp custom field ID for engagement level",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "engagement_level",
    exampleValue: "custom_field_engagement_level",
  },
  CLICKUP_PAGES_VISITED_FIELD_ID: {
    description: "ClickUp custom field ID for pages visited",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "pages_visited",
    exampleValue: "custom_field_pages_visited",
  },
  CLICKUP_TIME_ON_SITE_FIELD_ID: {
    description: "ClickUp custom field ID for time on site",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "time_on_site",
    exampleValue: "custom_field_time_on_site",
  },
  CLICKUP_STORIES_READ_FIELD_ID: {
    description: "ClickUp custom field ID for stories read",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "stories_read",
    exampleValue: "custom_field_stories_read",
  },
  CLICKUP_LETTER_SUBMITTED_FIELD_ID: {
    description: "ClickUp custom field ID for letter submitted",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "letter_submitted",
    exampleValue: "custom_field_letter_submitted",
  },
  CLICKUP_VOLUNTEER_SIGNUP_FIELD_ID: {
    description: "ClickUp custom field ID for volunteer signup",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "volunteer_signup",
    exampleValue: "custom_field_volunteer_signup",
  },
  CLICKUP_WILLING_TO_TESTIFY_FIELD_ID: {
    description: "ClickUp custom field ID for willing to testify",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "willing_to_testify",
    exampleValue: "custom_field_willing_to_testify",
  },
  CLICKUP_LEAD_SCORE_FIELD_ID: {
    description: "ClickUp custom field ID for lead score",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "lead_score",
    exampleValue: "custom_field_lead_score",
  },
  CLICKUP_LAST_ENGAGEMENT_FIELD_ID: {
    description: "ClickUp custom field ID for last engagement",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "last_engagement",
    exampleValue: "custom_field_last_engagement",
  },
  CLICKUP_CONTACTS_LIST_ID: {
    description: "ClickUp contacts list ID",
    type: "optional",
    category: "ClickUp CRM Integration",
    defaultValue: "",
    exampleValue: "your_contacts_list_id_here",
  },

  // Public Client Variables
  NEXT_PUBLIC_ANALYTICS_URL: {
    description: "Analytics tracking URL for client-side analytics",
    type: "public",
    category: "Public Client Variables",
    exampleValue: "https://your-analytics-endpoint.com",
    setupSteps: [
      "Set up your analytics service (Google Analytics, Mixpanel, etc.)",
      "Get the tracking endpoint URL",
      "Add the URL here for client-side tracking",
    ],
  },
  NEXT_PUBLIC_SITE_URL: {
    description: "Site URL for absolute URL generation",
    type: "public",
    category: "Public Client Variables",
    exampleValue: "http://localhost:1437",
    setupSteps: [
      "For local development: http://localhost:1437",
      "For production: https://yourdomain.vercel.app",
      "Used for absolute URLs in APIs and social sharing",
    ],
  },
  NEXT_PUBLIC_CLICKUP_CONFIGURED: {
    description: "ClickUp configuration status indicator",
    type: "public",
    category: "Public Client Variables",
    defaultValue: "false",
    exampleValue: "false",
  },

  // Monitoring & Alerting
  SENTRY_DSN: {
    description: "Sentry DSN for error tracking and monitoring",
    type: "optional",
    category: "Monitoring & Alerting",
    link: "https://sentry.io/settings/projects/",
    exampleValue: "https://your-sentry-dsn@sentry.io/project-id",
    setupSteps: [
      "Sign up for Sentry account",
      "Create a new project",
      "Copy the DSN from project settings",
      "Add to environment variables for error tracking",
    ],
  },
  WEBHOOK_URL: {
    description: "Webhook URL for error notifications and alerts",
    type: "optional",
    category: "Monitoring & Alerting",
    exampleValue: "https://hooks.slack.com/services/your/webhook/url",
    setupSteps: [
      "Set up webhook in Slack, Discord, or custom service",
      "Copy the webhook URL",
      "Used for system alerts and error notifications",
    ],
  },
};

async function generateEnvExample() {
  console.log("📝 Generating .env.example file...");

  const categories = {};
  Object.entries(ENV_VARS).forEach(([name, info]) => {
    if (!categories[info.category]) {
      categories[info.category] = [];
    }
    categories[info.category].push([name, info]);
  });

  let content = `# 🔐 Environment Variables for The Bridge Project - JAHmere Webb Freedom Portal
# Generated on: ${new Date().toISOString()}
# Total variables: ${Object.keys(ENV_VARS).length}

# ⚠️  Copy this file to .env.local and fill in your actual values
# Never commit .env.local to Git!

`;

  Object.entries(categories).forEach(([category, vars]) => {
    content += `# ==================== ${category} ====================\n\n`;

    vars.forEach(([name, info]) => {
      content += `# ${info.description}\n`;
      content += `# Type: ${info.type}\n`;
      if (info.link) {
        content += `# Get from: ${info.link}\n`;
      }
      if (info.setupSteps) {
        content += `# Setup: ${info.setupSteps[0]}\n`;
      }
      content += `${name}=\n\n`;
    });
  });

  content += `# ==================== Notes ====================
#
# 1. Copy this file to .env.local and fill in actual values
# 2. For production deployment, add these to Vercel Dashboard:
#    Project Settings > Environment Variables
# 3. Use different values for Production, Preview, and Development
# 4. Run 'npm run env:upload' to automatically upload to Vercel
#
# System variables provided by Vercel (don't add these):
# - VERCEL_URL, VERCEL_ENV, VERCEL_REGION, etc.
# - NODE_ENV (automatically set by Next.js)
`;

  await fs.writeFile(".env.example", content);
  console.log("✅ Created .env.example");
}

async function generateEnvLocal() {
  console.log("📝 Generating .env.local template...");

  const categories = {};
  Object.entries(ENV_VARS).forEach(([name, info]) => {
    if (!categories[info.category]) {
      categories[info.category] = [];
    }
    categories[info.category].push([name, info]);
  });

  let content = `# 🔐 Environment Variables for The Bridge Project - JAHmere Webb Freedom Portal
# Generated on: ${new Date().toISOString()}
# Total variables: ${Object.keys(ENV_VARS).length}

# ⚠️  NEVER commit this file to Git!
# Add .env.local to your .gitignore

`;

  Object.entries(categories).forEach(([category, vars]) => {
    content += `# ==================== ${category} ====================\n\n`;

    vars.forEach(([name, info]) => {
      content += `# ${info.description}\n`;
      content += `# Type: ${info.type}\n`;
      if (info.link) {
        content += `# Get from: ${info.link}\n`;
      }
      const locations = getVariableLocations(name);
      if (locations.length > 0) {
        content += `# Used in: ${locations.length} location(s)\n`;
      }
      const value = info.exampleValue || info.defaultValue || "your_value_here";
      content += `${name}=${value}\n\n`;
    });
  });

  content += `# ==================== Notes ====================
#
# 1. Replace all placeholder values with your actual credentials
# 2. For production deployment, add these to Vercel Dashboard:
#    Project Settings > Environment Variables
# 3. Use different values for Production, Preview, and Development
# 4. Run 'npm run env:upload' to automatically upload to Vercel
#
# System variables provided by Vercel (don't add these):
# - VERCEL_URL, VERCEL_ENV, VERCEL_REGION, etc.
# - NODE_ENV (automatically set by Next.js)
`;

  await fs.writeFile(".env.local.template", content);
  console.log(
    "✅ Created .env.local.template (rename to .env.local and customize)",
  );
}

function getVariableLocations(varName) {
  // This would be populated from the actual scan results
  // For now, return estimated locations based on known usage
  const locationMap = {
    DATABASE_URL: [
      "src/lib/database/schema.prisma",
      "src/lib/production/database-singleton.ts",
    ],
    CLICKUP_API_KEY: [
      "src/lib/crm/clickup-api.ts",
      "src/lib/crm/clickup-service.ts",
    ],
    LOG_LEVEL: ["src/lib/logger.ts"],
    APP_VERSION: ["src/lib/logger.ts"],
    SENTRY_DSN: ["src/lib/logger.ts"],
    WEBHOOK_URL: ["src/lib/logger.ts"],
    NEXT_PUBLIC_ANALYTICS_URL: ["src/lib/analytics.ts"],
    NEXT_PUBLIC_SITE_URL: ["src/app/api/monitoring/health/route.ts"],
    NEXT_PUBLIC_CLICKUP_CONFIGURED: [
      "src/components/examples/clickup-crm-demo.tsx",
    ],
  };

  return locationMap[varName] || [];
}

async function generateDocumentation() {
  console.log("📊 Generating environment variables documentation...");

  const requiredVars = Object.entries(ENV_VARS).filter(
    ([, info]) => info.type === "required",
  );
  const optionalVars = Object.entries(ENV_VARS).filter(
    ([, info]) => info.type === "optional",
  );
  const publicVars = Object.entries(ENV_VARS).filter(
    ([, info]) => info.type === "public",
  );

  let markdown = `# 🔐 Environment Variables Documentation

Generated on: ${new Date().toISOString()}

## 📋 Summary

- **Total Variables**: ${Object.keys(ENV_VARS).length}
- **Required**: ${requiredVars.length}
- **Optional**: ${optionalVars.length}
- **Public (Client-side)**: ${publicVars.length}

## 🚀 Quick Setup

1. Copy \`.env.example\` to \`.env.local\`
2. Fill in all required values (see Required Variables section below)
3. Run \`npm run env:upload\` to upload to Vercel
4. Redeploy your application

## ⚠️ Required Variables

These variables MUST be set for the application to work properly:

`;

  requiredVars.forEach(([name, info]) => {
    markdown += `### \`${name}\`\n\n`;
    markdown += `- **Description**: ${info.description}\n`;
    if (info.link) {
      markdown += `- **Get from**: [${info.link}](${info.link})\n`;
    }
    if (info.setupSteps) {
      markdown += `\n**Setup Steps**:\n`;
      info.setupSteps.forEach((step, i) => {
        markdown += `${i + 1}. ${step}\n`;
      });
    }
    markdown += `\n`;
  });

  markdown += `## ⚙️ Optional Variables

These variables have default values but can be customized:

`;

  optionalVars.forEach(([name, info]) => {
    markdown += `### \`${name}\`\n\n`;
    markdown += `- **Description**: ${info.description}\n`;
    markdown += `- **Default**: \`${info.defaultValue || "none"}\`\n`;
    if (info.link) {
      markdown += `- **Get from**: [${info.link}](${info.link})\n`;
    }
    markdown += `\n`;
  });

  markdown += `## 🌐 Public Variables

These variables are exposed to the client-side:

`;

  publicVars.forEach(([name, info]) => {
    markdown += `### \`${name}\`\n\n`;
    markdown += `- **Description**: ${info.description}\n`;
    markdown += `- **Note**: This variable is accessible in the browser\n`;
    if (info.setupSteps) {
      markdown += `\n**Setup Steps**:\n`;
      info.setupSteps.forEach((step, i) => {
        markdown += `${i + 1}. ${step}\n`;
      });
    }
    markdown += `\n`;
  });

  markdown += `## 🔧 Vercel Configuration

### Automatic System Variables

Vercel provides these automatically (don't add to .env):

- \`VERCEL\` - Always true when deployed on Vercel
- \`VERCEL_ENV\` - Environment name (production, preview, development)
- \`VERCEL_URL\` - Deployment URL (use for NEXTAUTH_URL fallback)
- \`VERCEL_REGION\` - Deployment region
- \`VERCEL_GIT_*\` - Git metadata variables

### Environment-Specific Variables

You can set different values for:
- **Production**: Your main branch deployments
- **Preview**: Pull request deployments
- **Development**: Local development with \`vercel dev\`

### Using Vercel CLI

\`\`\`bash
# Pull environment variables from Vercel
vercel env pull

# Add a variable to specific environments
vercel env add MY_VAR production preview

# Remove a variable
vercel env rm MY_VAR

# List all variables
vercel env ls
\`\`\`

## 🔒 Security Best Practices

1. **Never commit .env.local to Git** - Add to .gitignore
2. **Use different values per environment** - Don't use production keys in development
3. **Rotate secrets regularly** - Especially if exposed
4. **Use least privilege** - Only grant necessary permissions
5. **Audit access** - Review who has access to environment variables

## 🚨 Common Issues

### Variable not defined in production
- Ensure variable is added to Vercel dashboard
- Check it's enabled for "Production" environment
- Redeploy after adding variables

### NEXT_PUBLIC_ variables not working
- Must start with \`NEXT_PUBLIC_\` to be exposed to browser
- Rebuild application after changing
- Clear Next.js cache: \`rm -rf .next\`

### Different behavior locally vs deployed
- Use \`vercel env pull\` to sync local with remote
- Check for hardcoded values in code
- Verify environment detection logic
`;

  await fs.writeFile("docs/ENVIRONMENT_VARIABLES.md", markdown);
  console.log("✅ Created environment variables documentation");
}

async function main() {
  console.log("🔐 ENVIRONMENT VARIABLES MASTER SETUP\n");
  console.log("=====================================\n");

  try {
    // Ensure docs directory exists
    await fs.mkdir("docs", { recursive: true });

    // Generate all files
    await generateEnvExample();
    await generateEnvLocal();
    await generateDocumentation();

    console.log("\n✅ ENVIRONMENT SETUP COMPLETE!\n");
    console.log("📋 Next Steps:");
    console.log("1. Rename .env.local.template to .env.local");
    console.log("2. Edit .env.local and add your actual values");
    console.log(
      "3. Review docs/ENVIRONMENT_VARIABLES.md for setup instructions",
    );
    console.log('4. Run "npm run env:upload" to upload to Vercel');
    console.log("5. Go to Vercel Dashboard to verify variables");
    console.log("6. Redeploy your application\n");

    // Show critical variables
    const criticalVars = Object.entries(ENV_VARS)
      .filter(([, info]) => info.type === "required")
      .map(([name]) => name);

    if (criticalVars.length > 0) {
      console.log("⚠️  CRITICAL VARIABLES THAT MUST BE SET:");
      criticalVars.forEach((v) => console.log(`   - ${v}`));
      console.log("");
    }
  } catch (error) {
    console.error("❌ Error during environment setup:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = {
  ENV_VARS,
  generateEnvExample,
  generateEnvLocal,
  generateDocumentation,
};

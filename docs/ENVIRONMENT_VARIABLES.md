# 🔐 Environment Variables Documentation

Generated on: 2025-07-21T03:44:13.673Z

## 📋 Summary

- **Total Variables**: 28
- **Required**: 4
- **Optional**: 21
- **Public (Client-side)**: 3

## 🚀 Quick Setup

1. Copy `.env.example` to `.env.local`
2. Fill in all required values (see Required Variables section below)
3. Run `npm run env:upload` to upload to Vercel
4. Redeploy your application

## ⚠️ Required Variables

These variables MUST be set for the application to work properly:

### `DATABASE_URL`

- **Description**: PostgreSQL connection string for Prisma ORM
- **Get from**: [https://vercel.com/docs/storage/vercel-postgres/quickstart](https://vercel.com/docs/storage/vercel-postgres/quickstart)

**Setup Steps**:
1. Go to Vercel Dashboard > Storage
2. Click "Create Database" > "Postgres"
3. Copy the connection string from the dashboard
4. For local dev, you can use a local PostgreSQL instance

### `CLICKUP_API_KEY`

- **Description**: ClickUp API key for CRM functionality
- **Get from**: [https://clickup.com/api](https://clickup.com/api)

**Setup Steps**:
1. Sign up for ClickUp account
2. Go to Settings > Apps
3. Click "Generate" next to API Token
4. Copy the generated token

### `CLICKUP_LIST_ID`

- **Description**: ClickUp List ID for storing contacts
- **Get from**: [https://clickup.com/api](https://clickup.com/api)

**Setup Steps**:
1. Create a new List in your ClickUp workspace
2. Copy the List ID from the URL or API

### `CLICKUP_TEAM_ID`

- **Description**: ClickUp Team/Workspace ID
- **Get from**: [https://clickup.com/api](https://clickup.com/api)

**Setup Steps**:
1. Go to your ClickUp workspace
2. Find the Team ID in workspace settings
3. Or get it from the API response

## ⚙️ Optional Variables

These variables have default values but can be customized:

### `APP_VERSION`

- **Description**: Application version for tracking and logging
- **Default**: `1.0.0`

### `LOG_LEVEL`

- **Description**: Logging level: DEBUG, INFO, WARN, ERROR, CRITICAL
- **Default**: `INFO`

### `ANALYZE`

- **Description**: Bundle analyzer for build optimization (set to "true" to enable)
- **Default**: `false`

### `DB_MAX_CONNECTIONS`

- **Description**: Maximum number of database connections in pool
- **Default**: `20`

### `DB_IDLE_TIMEOUT`

- **Description**: Database connection idle timeout in milliseconds
- **Default**: `30000`

### `DB_CONNECTION_TIMEOUT`

- **Description**: Database connection timeout in milliseconds
- **Default**: `5000`

### `CLICKUP_EMAIL_FIELD_ID`

- **Description**: ClickUp custom field ID for email
- **Default**: `email`

### `CLICKUP_RELATIONSHIP_FIELD_ID`

- **Description**: ClickUp custom field ID for relationship type
- **Default**: `relationship`

### `CLICKUP_CONNECTION_STRENGTH_FIELD_ID`

- **Description**: ClickUp custom field ID for connection strength
- **Default**: `connection_strength`

### `CLICKUP_ENGAGEMENT_LEVEL_FIELD_ID`

- **Description**: ClickUp custom field ID for engagement level
- **Default**: `engagement_level`

### `CLICKUP_PAGES_VISITED_FIELD_ID`

- **Description**: ClickUp custom field ID for pages visited
- **Default**: `pages_visited`

### `CLICKUP_TIME_ON_SITE_FIELD_ID`

- **Description**: ClickUp custom field ID for time on site
- **Default**: `time_on_site`

### `CLICKUP_STORIES_READ_FIELD_ID`

- **Description**: ClickUp custom field ID for stories read
- **Default**: `stories_read`

### `CLICKUP_LETTER_SUBMITTED_FIELD_ID`

- **Description**: ClickUp custom field ID for letter submitted
- **Default**: `letter_submitted`

### `CLICKUP_VOLUNTEER_SIGNUP_FIELD_ID`

- **Description**: ClickUp custom field ID for volunteer signup
- **Default**: `volunteer_signup`

### `CLICKUP_WILLING_TO_TESTIFY_FIELD_ID`

- **Description**: ClickUp custom field ID for willing to testify
- **Default**: `willing_to_testify`

### `CLICKUP_LEAD_SCORE_FIELD_ID`

- **Description**: ClickUp custom field ID for lead score
- **Default**: `lead_score`

### `CLICKUP_LAST_ENGAGEMENT_FIELD_ID`

- **Description**: ClickUp custom field ID for last engagement
- **Default**: `last_engagement`

### `CLICKUP_CONTACTS_LIST_ID`

- **Description**: ClickUp contacts list ID
- **Default**: `none`

### `SENTRY_DSN`

- **Description**: Sentry DSN for error tracking and monitoring
- **Default**: `none`
- **Get from**: [https://sentry.io/settings/projects/](https://sentry.io/settings/projects/)

### `WEBHOOK_URL`

- **Description**: Webhook URL for error notifications and alerts
- **Default**: `none`

## 🌐 Public Variables

These variables are exposed to the client-side:

### `NEXT_PUBLIC_ANALYTICS_URL`

- **Description**: Analytics tracking URL for client-side analytics
- **Note**: This variable is accessible in the browser

**Setup Steps**:
1. Set up your analytics service (Google Analytics, Mixpanel, etc.)
2. Get the tracking endpoint URL
3. Add the URL here for client-side tracking

### `NEXT_PUBLIC_SITE_URL`

- **Description**: Site URL for absolute URL generation
- **Note**: This variable is accessible in the browser

**Setup Steps**:
1. For local development: http://localhost:1437
2. For production: https://yourdomain.vercel.app
3. Used for absolute URLs in APIs and social sharing

### `NEXT_PUBLIC_CLICKUP_CONFIGURED`

- **Description**: ClickUp configuration status indicator
- **Note**: This variable is accessible in the browser

## 🔧 Vercel Configuration

### Automatic System Variables

Vercel provides these automatically (don't add to .env):

- `VERCEL` - Always true when deployed on Vercel
- `VERCEL_ENV` - Environment name (production, preview, development)
- `VERCEL_URL` - Deployment URL (use for NEXTAUTH_URL fallback)
- `VERCEL_REGION` - Deployment region
- `VERCEL_GIT_*` - Git metadata variables

### Environment-Specific Variables

You can set different values for:
- **Production**: Your main branch deployments
- **Preview**: Pull request deployments
- **Development**: Local development with `vercel dev`

### Using Vercel CLI

```bash
# Pull environment variables from Vercel
vercel env pull

# Add a variable to specific environments
vercel env add MY_VAR production preview

# Remove a variable
vercel env rm MY_VAR

# List all variables
vercel env ls
```

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
- Must start with `NEXT_PUBLIC_` to be exposed to browser
- Rebuild application after changing
- Clear Next.js cache: `rm -rf .next`

### Different behavior locally vs deployed
- Use `vercel env pull` to sync local with remote
- Check for hardcoded values in code
- Verify environment detection logic

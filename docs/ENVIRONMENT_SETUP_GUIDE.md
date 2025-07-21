# 🔐 **ENVIRONMENT VARIABLES COMPLETE SETUP GUIDE**
**The Bridge Project - JAHmere Webb Freedom Portal**

*Generated on: 2025-07-21T03:20:00Z*

---

## 📋 **QUICK START (5 Minutes)**

```bash
# 1. Generate environment template
npm run env:setup

# 2. Create your local environment file
cp .env.local.template .env.local

# 3. Edit .env.local with your actual values
# (Use your favorite editor)

# 4. Validate configuration
npm run env:validate

# 5. Upload to Vercel
npm run env:upload

# 6. Deploy!
vercel --prod
```

---

## 🎯 **COMPREHENSIVE SETUP PROCESS**

### **Step 1: Environment Template Generation**

Run the environment setup script to generate all necessary files:

```bash
npm run env:setup
```

This creates:
- `.env.example` - Template for version control
- `.env.local.template` - Local development template
- `docs/ENVIRONMENT_VARIABLES.md` - Complete documentation

### **Step 2: Create Local Environment File**

```bash
# Copy template to your local file
cp .env.local.template .env.local

# Or manually rename
mv .env.local.template .env.local
```

### **Step 3: Configure Required Variables**

Edit `.env.local` and set these **CRITICAL** variables:

#### **🗄️ Database (REQUIRED)**
```bash
DATABASE_URL=postgresql://user:password@host:5432/bridge_project?sslmode=require
```
**Get from:** [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres/quickstart)

#### **🔗 ClickUp CRM (REQUIRED for CRM features)**
```bash
CLICKUP_API_KEY=pk_your_clickup_api_key_here
CLICKUP_LIST_ID=your_clickup_list_id_here
CLICKUP_TEAM_ID=your_clickup_team_id_here
```
**Get from:** [ClickUp API Settings](https://clickup.com/api)

### **Step 4: Configure Optional Variables**

#### **📊 Analytics & Monitoring**
```bash
NEXT_PUBLIC_ANALYTICS_URL=https://your-analytics-endpoint.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.vercel.app
SENTRY_DSN=https://your-sentry-dsn@sentry.io/project-id
WEBHOOK_URL=https://hooks.slack.com/services/your/webhook/url
```

#### **⚙️ Application Settings**
```bash
APP_VERSION=1.0.0
LOG_LEVEL=INFO
ANALYZE=false
```

### **Step 5: Validate Configuration**

```bash
npm run env:validate
```

This checks for:
- ✅ Missing required variables
- ✅ Invalid values and placeholders
- ✅ Security issues
- ✅ Deployment readiness

### **Step 6: Upload to Vercel**

**Unix/Mac/Linux:**
```bash
npm run env:upload
```

**Windows:**
```bash
npm run env:upload:windows
```

The script will:
- Check Vercel CLI installation
- Authenticate with Vercel
- Smart environment targeting based on variable types
- Upload with proper security considerations

### **Step 7: Verify & Deploy**

```bash
# Check Vercel dashboard
vercel env ls

# Deploy to production
vercel --prod

# Verify deployment
curl https://yourdomain.vercel.app/api/health
```

---

## 🔑 **DETAILED API KEY SETUP**

### **Vercel Postgres Database**

1. **Go to Vercel Dashboard** → Storage
2. **Create Database** → Postgres
3. **Copy Connection String** from dashboard
4. **Add to .env.local** as `DATABASE_URL`
5. **For local dev:** Use local PostgreSQL or keep Vercel connection

### **ClickUp CRM Integration**

1. **Sign up** at [ClickUp](https://clickup.com)
2. **Go to Settings** → Apps
3. **Generate API Token** (starts with `pk_`)
4. **Create Workspace** and note Team ID
5. **Create List** for contacts and note List ID
6. **Add to .env.local:**
   ```bash
   CLICKUP_API_KEY=pk_your_actual_token_here
   CLICKUP_LIST_ID=your_actual_list_id
   CLICKUP_TEAM_ID=your_actual_team_id
   ```

### **Sentry Error Monitoring (Optional)**

1. **Sign up** at [Sentry.io](https://sentry.io)
2. **Create Project** → Next.js
3. **Copy DSN** from project settings
4. **Add to .env.local:**
   ```bash
   SENTRY_DSN=https://your-actual-dsn@sentry.io/project-id
   ```

### **Webhook Notifications (Optional)**

**For Slack:**
1. **Go to** [Slack API](https://api.slack.com/apps)
2. **Create App** → Incoming Webhooks
3. **Copy Webhook URL**
4. **Add to .env.local:**
   ```bash
   WEBHOOK_URL=https://hooks.slack.com/services/your/actual/webhook
   ```

---

## 🌍 **ENVIRONMENT-SPECIFIC CONFIGURATION**

### **Development (.env.local)**
```bash
DATABASE_URL=postgresql://localhost:5432/bridge_project_dev
NEXT_PUBLIC_SITE_URL=http://localhost:1437
LOG_LEVEL=DEBUG
NEXT_PUBLIC_CLICKUP_CONFIGURED=false
```

### **Production (Vercel Dashboard)**
```bash
DATABASE_URL=postgresql://prod-host:5432/bridge_project_prod
NEXT_PUBLIC_SITE_URL=https://july28freedom.vercel.app
LOG_LEVEL=INFO
NEXT_PUBLIC_CLICKUP_CONFIGURED=true
```

### **Preview (Vercel Dashboard)**
```bash
DATABASE_URL=postgresql://preview-host:5432/bridge_project_preview
NEXT_PUBLIC_SITE_URL=https://preview-branch.vercel.app
LOG_LEVEL=WARN
NEXT_PUBLIC_CLICKUP_CONFIGURED=true
```

---

## 🛡️ **SECURITY BEST PRACTICES**

### **✅ DO:**
- ✅ Use different API keys for different environments
- ✅ Rotate secrets regularly
- ✅ Use read-only keys when possible
- ✅ Monitor access logs
- ✅ Use strong, unique passwords for databases
- ✅ Enable 2FA on all service accounts

### **❌ DON'T:**
- ❌ Commit .env.local to Git (already in .gitignore)
- ❌ Use production keys in development
- ❌ Share API keys in chat/email
- ❌ Use weak or default passwords
- ❌ Ignore security warnings from services

---

## 🚨 **TROUBLESHOOTING**

### **"Variable not found" in production**
```bash
# Check if variable is set in Vercel
vercel env ls

# Re-upload if missing
npm run env:upload

# Redeploy
vercel --prod
```

### **"NEXT_PUBLIC_ variables undefined"**
- Must start with `NEXT_PUBLIC_` exactly
- Rebuild after changing: `npm run build`
- Clear cache: `rm -rf .next`

### **Database connection fails**
- Check connection string format
- Verify database is accessible
- Check SSL settings (add `?sslmode=require` for production)

### **ClickUp API errors**
- Verify API key is valid
- Check workspace permissions
- Ensure List ID exists and is accessible

### **Validation errors**
```bash
# Run detailed validation
npm run env:validate

# Check specific issues
npm run env:check
```

---

## 📊 **ENVIRONMENT VARIABLES REFERENCE**

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `DATABASE_URL` | Required | ✅ | PostgreSQL connection string |
| `CLICKUP_API_KEY` | Required | ✅ | ClickUp API authentication |
| `CLICKUP_LIST_ID` | Required | ✅ | ClickUp contacts list |
| `CLICKUP_TEAM_ID` | Required | ✅ | ClickUp workspace ID |
| `APP_VERSION` | Optional | ⚪ | Application version tracking |
| `LOG_LEVEL` | Optional | ⚪ | Logging verbosity level |
| `NEXT_PUBLIC_ANALYTICS_URL` | Public | 🌐 | Client-side analytics endpoint |
| `NEXT_PUBLIC_SITE_URL` | Public | 🌐 | Site URL for absolute links |
| `SENTRY_DSN` | Optional | ⚪ | Error monitoring service |
| `WEBHOOK_URL` | Optional | ⚪ | Notification webhook endpoint |

---

## 🔧 **VERCEL CLI COMMANDS**

```bash
# Environment Management
vercel env add VAR_NAME production preview development
vercel env rm VAR_NAME
vercel env ls
vercel env pull

# Deployment
vercel --prod                    # Deploy to production
vercel --target preview         # Deploy to preview
vercel deploy                   # Deploy to preview (default)

# Project Management
vercel link                     # Link local project to Vercel
vercel domains                  # Manage custom domains
vercel logs                     # View deployment logs
```

---

## 🎯 **DEPLOYMENT CHECKLIST**

### **Before Deployment:**
- [ ] All required variables configured
- [ ] Validation passes: `npm run env:validate`
- [ ] Variables uploaded to Vercel: `npm run env:upload`
- [ ] Build succeeds locally: `npm run build`
- [ ] Tests pass: `npm test`

### **After Deployment:**
- [ ] Health check passes: `curl https://yourdomain.vercel.app/api/health`
- [ ] Database connectivity confirmed
- [ ] ClickUp integration working (if configured)
- [ ] Analytics tracking functional
- [ ] Error monitoring active (if configured)

---

## 📞 **SUPPORT & RESOURCES**

### **Documentation:**
- [Environment Variables Guide](./ENVIRONMENT_VARIABLES.md)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

### **API Documentation:**
- [ClickUp API](https://clickup.com/api)
- [Sentry Documentation](https://docs.sentry.io/)
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)

### **Quick Commands:**
```bash
# Generate everything
npm run env:setup

# Validate configuration
npm run env:validate

# Upload to Vercel
npm run env:upload

# Deploy
vercel --prod
```

---

**🌟 The Bridge Project is now ready for secure, scalable deployment with comprehensive environment variable management that ensures JAHmere Webb's July 28, 2025 freedom portal works flawlessly across all environments!** 
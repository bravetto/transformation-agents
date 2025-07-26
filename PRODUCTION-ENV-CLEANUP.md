# 🛡️ PRODUCTION ENVIRONMENT CLEANUP GUIDE
## JAHmere Bridge - Secure Environment Configuration

## 🚨 **IMMEDIATE SECURITY ACTIONS** (Next 30 minutes)

### **1. REVOKE EXPOSED CREDENTIALS**
```bash
# Stripe Dashboard
- Go to https://dashboard.stripe.com/apikeys
- Delete current secret key: sk_live_51QwERcLTdJED8Dlx...
- Generate new secret key

# Anthropic Console  
- Go to https://console.anthropic.com/keys
- Delete current key: sk-ant-api03-67voT...
- Generate new API key

# NVIDIA Dashboard
- Go to https://build.nvidia.com/
- Revoke key: nvapi-LIvyCfx6Nvtu...
- Generate replacement

# Supabase Database
- Go to database settings
- Change postgres password
- Update connection string
```

### **2. SECURE ENVIRONMENT VARIABLES**
```bash
# Remove from .env file completely:
STRIPE_SECRET_KEY=
ANTHROPIC_API_KEY=
NVIDIA_API_KEY=
DATABASE_URL=

# Add to Vercel environment variables:
vercel env add STRIPE_SECRET_KEY --scope production
vercel env add ANTHROPIC_API_KEY --scope production  
vercel env add NVIDIA_API_KEY --scope production
vercel env add DATABASE_URL --scope production
```

---

## ✅ **CORRECTED ENVIRONMENT CONFIGURATION**

### **Required Environment Variables:**
```env
# ===================== Core Application =====================
NEXT_PUBLIC_APP_URL=https://jahmere-webb-freedom.vercel.app
NODE_ENV=production

# ===================== Analytics (FUNCTIONAL) =====================  
NEXT_PUBLIC_POSTHOG_KEY=phc_TBgkXxBpKoWWKRF2vLDn2Lss0ry032ITZlXD9daPBQm
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-REAL-ID-HERE  # Replace placeholder!

# ===================== Database (SECURE) =====================
DATABASE_URL=[REDACTED-SECURE-CONNECTION]

# ===================== AI Services (SECURE) =====================
ANTHROPIC_API_KEY=[REDACTED-NEW-KEY]
NVIDIA_API_KEY=[REDACTED-NEW-KEY]

# ===================== CRM Integration =====================
CLICKUP_API_KEY=[REDACTED-IF-USED]
CLICKUP_LIST_ID=your-list-id

# ===================== Contact Form =====================
CONTACT_FORM_ENDPOINT=https://your-form-handler.com/submit

# ===================== Mission Specific =====================
NEXT_PUBLIC_FREEDOM_DATE=2025-07-28T14:37:00-05:00
NEXT_PUBLIC_PRAYER_GOAL=10000
```

### **REMOVE COMPLETELY:**
```env
# These are NOT USED anywhere in codebase:
STRIPE_SECRET_KEY=          # No payment APIs
STRIPE_WEBHOOK_SECRET=      # No webhooks  
SHOPIFY_STORE_DOMAIN=       # No e-commerce
SHOPIFY_ADMIN_API_TOKEN=    # No Shopify integration
DIVINE_SECRET_KEY=          # Unused placeholder
JUDGE_ACCESS_KEY=           # Unused placeholder
NEXT_PUBLIC_MIRACLE_API_KEY= # Unused placeholder
```

---

## 🎯 **API FUNCTIONALITY VERIFICATION**

### **Working APIs (Verified):**
- ✅ Health checks & monitoring
- ✅ Prayer submission with PostHog tracking
- ✅ Contact form (recently implemented)
- ✅ Analytics event tracking
- ✅ AI letter generation (Claude)
- ✅ AI integration testing (NVIDIA + Claude)

### **Broken/Missing APIs:**
- ❌ Payment processing (Stripe keys unused)
- ❌ E-commerce integration (Shopify unused)  
- ❌ Some CRM endpoints (ClickUp partially implemented)

---

## 📋 **POST-CLEANUP VALIDATION**

```bash
# 1. Test API endpoints
curl https://your-domain.com/api/health
curl https://your-domain.com/api/divine-status

# 2. Verify environment variables
npm run type-check
npm run build

# 3. Test secure key access
# (Keys should only be accessible server-side)
```

---

**PRIORITY**: Execute security cleanup IMMEDIATELY before July 28th deadline.
**STATUS**: Critical security vulnerability - exposed production credentials
**TIMELINE**: 30 minutes for key rotation, 2 hours for full cleanup verification 
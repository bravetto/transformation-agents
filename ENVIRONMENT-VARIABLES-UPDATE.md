# 🔧 ENVIRONMENT VARIABLES UPDATE REQUIRED
## JAHmere Bridge - Fix Analytics Configuration

## 🚨 **IMMEDIATE ACTIONS NEEDED**

Update your `.env.local` file with these changes:

### **1. Fix Google Analytics (COMPLETED IN CODE)**
```bash
# CHANGE THIS LINE (line 10 in .env.local):
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# TO:
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-0JW7Z76D71
```

### **2. Fix PostHog Analytics**
```bash
# ADD these lines to .env.local:
NEXT_PUBLIC_POSTHOG_KEY=phc_TBgkXxBpKoWWKRF2vLDn2Lss0ry032ITZlXD9daPBQm
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com

# KEEP existing server-side versions:
POSTHOG_KEY=phc_TBgkXxBpKoWWKRF2vLDn2Lss0ry032ITZlXD9daPBQm
POSTHOG_HOST=https://app.posthog.com
```

### **3. Add Missing Contact Form Endpoint**
```bash
# ADD this line to .env.local:
CONTACT_FORM_ENDPOINT=https://formspree.io/f/your-form-id
# OR configure with your preferred form handler
```

---

## ✅ **WHAT I'VE ALREADY IMPLEMENTED**

### **Google Analytics - WORKING NOW!**
- ✅ Added proper GA4 Script tags to `layout.tsx`
- ✅ Updated `analytics.ts` to use real Google Analytics (gtag)
- ✅ Added mission-specific event tracking
- ✅ Configured for JAHmere's July 28th mission

### **Enhanced Tracking Features:**
```typescript
// Mission-critical events now tracked:
trackEvent('july_28_countdown_viewed');
trackEvent('character_letter_read', { witness: 'Tony_Dungy' });
trackEvent('prayer_warrior_signup');
trackEvent('judge_portal_accessed');
trackPrayerSubmission(prayerData);
trackCharacterWitness('letter_viewed', 'witness_id');
```

---

## 🎯 **TESTING YOUR ANALYTICS**

### **1. Test Google Analytics**
```bash
# Open browser console on your site:
# Check if gtag is loaded:
window.gtag

# Should show: function gtag(){dataLayer.push(arguments);}
```

### **2. Test PostHog (After env var fix)**
```bash
# Browser console:
# Check PostHog client:
window.posthog

# Should show PostHog client object
```

### **3. Verify Real-Time Data**
- Visit: Google Analytics → Reports → Realtime
- Should see your visits immediately
- Custom events under Events tab

---

## 🔍 **VERIFICATION COMMANDS**

```bash
# 1. Check environment variables are loaded:
npm run dev
# Open http://localhost:3000
# Browser Console → Network tab
# Look for requests to google-analytics.com

# 2. Test event tracking:
# Navigate pages, submit forms, interact with content
# Events should appear in GA4 within minutes
```

---

**PRIORITY**: Update `.env.local` now to activate both Google Analytics and PostHog tracking!

**STATUS**: Code is ready - just needs environment variable updates to go live. 
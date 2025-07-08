# 🚀 ClickUp CRM Integration - Quick Start Guide

## ✅ What's Been Implemented

### 1. **Core Services**
- ✅ `src/lib/crm/clickup-service.ts` - Complete ClickUp API service
- ✅ `src/lib/crm/clickup-field-mapping.ts` - Field mapping configuration
- ✅ `src/lib/crm/contact-service.ts` - Updated to use ClickUp

### 2. **API Endpoints**
- ✅ `POST /api/crm/contacts` - Create contacts in ClickUp
- ✅ `GET /api/crm/contacts` - Fetch/search contacts
- ✅ `PUT /api/crm/contacts` - Update contacts
- ✅ `DELETE /api/crm/contacts` - Delete contacts
- ✅ `GET /api/crm/analytics` - CRM analytics
- ✅ `POST /api/crm/sync` - Bulk sync operations
- ✅ `POST /api/letters/support` - Creates CRM contact on submission

### 3. **Features**
- ✅ Full CRUD operations for contacts
- ✅ Bulk import/sync capabilities
- ✅ Analytics and reporting
- ✅ Rate limiting (10 req/min)
- ✅ Input validation with Zod
- ✅ Error handling and audit logging
- ✅ Field mapping between systems

## 🔧 Setup Instructions

### Step 1: Environment Configuration
```bash
# Add to .env.local
CLICKUP_API_KEY=pk_YOUR_API_KEY_HERE
CLICKUP_LIST_ID=9011549512
CLICKUP_SPACE_ID=YOUR_SPACE_ID
CLICKUP_TEAM_ID=YOUR_TEAM_ID
```

### Step 2: Get Field IDs
```bash
# Fetch your custom field IDs
npm run clickup:fetch-fields

# This will output the field IDs - copy them!
```

### Step 3: Update Field Mapping
Update `src/lib/crm/clickup-field-mapping.ts` with your actual field IDs from Step 2.

### Step 4: Test the Integration
```bash
# Test creating a contact
npm run crm:test-create

# Check sync status
npm run crm:sync
```

## 📊 Data Mapping

### Bridge Project → ClickUp
```
Contact Name → Task Name
Email → Company Email & Contact Email
Phone → Phone Number
Engagement Level → Business Category
  - high → CONSULTING
  - medium → MARKETING
  - low → SOFTWARE
Tags/Keywords → Keywords field
```

### ClickUp → Bridge Project
```
Task ID → Contact ID
Custom Fields → Contact Properties
Task Status → Contact Status
Labels → Business Categories
```

## 🔗 API Quick Reference

### Create Contact
```javascript
fetch('/api/crm/contacts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@example.com',
    relationship: 'Mentor',
    connectionStrength: 'Strong',
    engagementLevel: 'high'
  })
})
```

### Search Contacts
```javascript
fetch('/api/crm/contacts?query=john&engagementLevel=high')
```

### Bulk Import
```javascript
fetch('/api/crm/sync', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    mode: 'import',
    contacts: [/* array of contacts */]
  })
})
```

## 🎯 Use Cases Enabled

1. **Letter Submissions** → Automatically creates/updates CRM contact
2. **Volunteer Signups** → Tagged and tracked in ClickUp
3. **Engagement Tracking** → Monitor who's highly engaged
4. **Analytics Dashboard** → Real-time CRM metrics
5. **Bulk Operations** → Import/sync contact lists

## ⚠️ Important Notes

1. **Rate Limiting**: 10 requests per minute per IP
2. **Field IDs**: Must be fetched from your specific ClickUp workspace
3. **Business Categories**: Limited to predefined labels in ClickUp
4. **Attachments**: Company Logo field not yet implemented

## 🐛 Troubleshooting

### Common Issues:
1. **401 Error** → Check API key
2. **404 Error** → Verify LIST_ID
3. **Field errors** → Run `npm run clickup:fetch-fields`
4. **Rate limit** → Wait 60 seconds

### Debug Mode:
```bash
# Enable debug logging
CLICKUP_DEBUG=true npm run dev
```

## 📚 Full Documentation

See `docs/CLICKUP_CRM_INTEGRATION.md` for:
- Complete API documentation
- Security considerations
- Advanced features
- Webhook setup (future)

## 🚀 Next Steps

1. Configure your environment variables
2. Fetch and update field IDs
3. Test with a sample contact
4. Monitor analytics endpoint
5. Set up automated syncing (optional)

---

**Questions?** Check the full docs or reach out to the development team! 
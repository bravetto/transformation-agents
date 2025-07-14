# API Reference - Complete Endpoint Documentation
*Verified and Tested - Single Source of Truth*

## Base Configuration
- **Base URL**: `/api`
- **Authentication**: Bearer token (when required)
- **Rate Limiting**: 60 requests/minute per IP (varies by endpoint)
- **Response Format**: JSON
- **Environment**: Next.js 14.2 App Router

## Health & System Status

### System Health Check
```
GET /api/health
GET /api/health?deep=true
GET /api/health?format=html
```

**Description**: Comprehensive system health monitoring with service status checks.

**Response**:
```json
{
  "overall": "healthy" | "degraded" | "down",
  "services": [
    {
      "service": "ClickUp CRM",
      "status": "healthy",
      "latency": 150,
      "lastChecked": "2025-07-13T18:14:52Z"
    }
  ],
  "timestamp": "2025-07-13T18:14:52Z"
}
```

**Force Refresh**:
```
POST /api/health
```

## CRM Integration

### Create/Update Contact
```
POST /api/crm/contacts
```

**Request Body**:
```json
{
  "firstName": "string",
  "lastName": "string", 
  "email": "user@example.com",
  "zipCode": "12345",
  "relationship": "string",
  "connectionStrength": "string",
  "engagementLevel": "high" | "medium" | "low",
  "tags": ["tag1", "tag2"],
  "customFields": {}
}
```

**Response**:
```json
{
  "success": true,
  "message": "Contact created successfully",
  "data": {
    "id": "contact-id",
    "url": "clickup-task-url"
  }
}
```

### Search Contacts
```
GET /api/crm/contacts?email=user@example.com
GET /api/crm/contacts?query=search&limit=20&page=1
GET /api/crm/contacts?id=contact-id
```

**Query Parameters**:
- `query`: General search term
- `email`: Exact email match
- `engagementLevel`: Filter by engagement level
- `relationship`: Filter by relationship type
- `hasSubmittedLetter`: Boolean filter
- `isVolunteer`: Boolean filter
- `willingToTestify`: Boolean filter
- `tags`: Comma-separated tag list
- `minLeadScore`: Minimum lead score
- `lastEngagementAfter`: ISO date string
- `lastEngagementBefore`: ISO date string
- `limit`: Results per page (default: 20)
- `page`: Page number (default: 1)
- `sortBy`: Sort field
- `sortDirection`: "asc" | "desc"

**Response**:
```json
{
  "success": true,
  "data": [
    {
      "id": "contact-id",
      "firstName": "John",
      "lastName": "Doe",
      "email": "john@example.com",
      "leadScore": 85,
      "engagementLevel": "high",
      "createdAt": "2025-07-13T18:14:52Z",
      "updatedAt": "2025-07-13T18:14:52Z"
    }
  ],
  "total": 150,
  "page": 1,
  "pageSize": 20,
  "totalPages": 8,
  "hasMore": true
}
```

### Track Behavior
```
POST /api/crm/behavior
```

**Request Body**:
```json
{
  "contactId": "contact-id",
  "event": {
    "type": "pageView" | "storyRead" | "videoWatch" | "letterSubmitted",
    "data": {
      "page": "/people/jahmere-webb",
      "duration": 120,
      "source": "navigation"
    }
  },
  "timestamp": "2025-07-13T18:14:52Z"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Behavior event processed successfully",
  "data": {
    "leadScore": 95,
    "engagementLevel": "high",
    "pointsAwarded": 10
  }
}
```

### Get Behavior Summary
```
GET /api/crm/behavior?contactId=contact-id
```

**Response**:
```json
{
  "success": true,
  "data": {
    "contactId": "contact-id",
    "name": "John Doe",
    "email": "john@example.com",
    "pagesVisited": 12,
    "timeOnSite": 1800,
    "storiesRead": 3,
    "conversions": {
      "letterSubmitted": true,
      "volunteerSignup": false,
      "willingToTestify": true
    },
    "leadScore": 95,
    "lastEngagement": "2025-07-13T18:14:52Z",
    "engagementLevel": "high"
  }
}
```

### CRM Analytics
```
GET /api/crm/analytics?startDate=2025-01-01&endDate=2025-07-13
```

**Query Parameters**:
- `startDate`: ISO date string
- `endDate`: ISO date string
- `relationship`: Filter by relationship type
- `tags`: Comma-separated tag list
- `includeEngagementTrend`: Boolean
- `engagementTrendGranularity`: "day" | "week" | "month"

**Response**:
```json
{
  "success": true,
  "data": {
    "totalContacts": 1250,
    "letterSubmissions": 340,
    "volunteerSignups": 85,
    "conversionRate": 27.2,
    "averageLeadScore": 72.5,
    "engagementDistribution": {
      "high": 320,
      "medium": 580,
      "low": 350
    },
    "topRelationships": [
      {"type": "family", "count": 420},
      {"type": "friend", "count": 380}
    ],
    "engagementTrend": [
      {"date": "2025-07-06", "score": 68.2},
      {"date": "2025-07-13", "score": 72.5}
    ]
  }
}
```

### Sync Data
```
POST /api/crm/sync
```

**Request Body**:
```json
{
  "contacts": [
    {
      "firstName": "Jane",
      "lastName": "Smith", 
      "email": "jane@example.com",
      "phone": "+1234567890",
      "relationship": "family",
      "connectionStrength": "strong",
      "engagementLevel": "high",
      "tags": ["supporter", "local"]
    }
  ],
  "mode": "sync" | "import"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "synced": 15,
    "created": 8,
    "updated": 7,
    "errors": []
  }
}
```

**Get Sync Status**:
```
GET /api/crm/sync
GET /api/crm/sync?action=init-fields
```

## AI Integration

### Generate Doppelganger Response
```
POST /api/ai/doppelganger
```

**Request Body**:
```json
{
  "personSlug": "coach-dungy" | "jahmere-webb" | "michael-mataluni",
  "messages": [
    {
      "role": "user",
      "content": "What leadership principles do you find most important?",
      "timestamp": "2025-07-13T18:14:52Z"
    }
  ],
  "sessionId": "session-123",
  "userProfile": {
    "firstName": "John",
    "interests": ["leadership", "mentorship"],
    "previousInteractions": []
  },
  "model": "claude-3-opus-20240229"
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "message": {
      "role": "assistant", 
      "content": "Leadership starts with character and integrity...",
      "timestamp": "2025-07-13T18:14:52Z"
    },
    "sessionId": "session-123",
    "usage": {
      "promptTokens": 780,
      "completionTokens": 320,
      "totalTokens": 1100
    },
    "model": "claude-3-opus-20240229"
  }
}
```

### Get Available Personalities
```
GET /api/ai/doppelganger?listAll=true
```

**Response**:
```json
{
  "success": true,
  "data": {
    "personalities": [
      {
        "slug": "coach-dungy",
        "name": "Coach Tony Dungy",
        "role": "guardian",
        "background": "Former NFL coach and mentor"
      },
      {
        "slug": "jahmere-webb", 
        "name": "JAHmere Webb",
        "role": "lightworker",
        "background": "Founder of The Bridge Project"
      },
      {
        "slug": "michael-mataluni",
        "name": "Michael Mataluni",
        "role": "witness", 
        "background": "Technical architect and developer"
      }
    ],
    "availableModels": [
      "claude-3-opus-20240229",
      "claude-3-sonnet-20240229", 
      "claude-3-haiku-20240307"
    ],
    "defaultModel": "claude-3-opus-20240229"
  }
}
```

### Get Conversation Starters
```
GET /api/ai/doppelganger?personSlug=coach-dungy
```

**Response**:
```json
{
  "success": true,
  "data": {
    "personSlug": "coach-dungy",
    "conversationStarters": [
      "What leadership principles do you find most important?",
      "How do you balance professional success with personal values?",
      "What advice would you give to young people facing challenges?"
    ],
    "role": "guardian",
    "name": "Coach Tony Dungy"
  }
}
```

### Generate Prompt
```
POST /api/ai/generate-prompt
```

**Request Body**:
```json
{
  "templateId": "letter-support" | "testimony" | "mentorship",
  "personalityId": "coach-dungy" | "jahmere-webb" | "michael-mataluni",
  "context": {
    "goals": ["guidance", "support"],
    "stage": "initial" | "exploration" | "guidance" | "action" | "reflection",
    "userBackground": "string",
    "specificNeeds": ["leadership", "career"]
  },
  "userProfile": {
    "firstName": "John",
    "interests": ["leadership"],
    "previousInteractions": []
  }
}
```

**Response**:
```json
{
  "success": true,
  "data": {
    "prompt": "You are Coach Tony Dungy, speaking with John about leadership...",
    "templateUsed": "mentorship",
    "personalityContext": "guardian",
    "estimatedTokens": 450
  }
}
```

## Letter Management

### Submit Support Letter
```
POST /api/letters/support
```

**Request Body**:
```json
{
  "writerName": "John Doe",
  "writerEmail": "john@example.com",
  "relationship": "family" | "friend" | "colleague" | "community" | "other",
  "relationshipDetails": "Brother-in-law",
  "content": "Letter content here...",
  "examples": [
    "Specific example 1",
    "Specific example 2"
  ],
  "willingToTestify": true,
  "contactPermission": true,
  "additionalInfo": "Optional additional context"
}
```

**Response**:
```json
{
  "success": true,
  "message": "Letter submitted successfully",
  "data": {
    "taskId": "clickup-task-id",
    "impactScore": 85,
    "qualityStatus": "high" | "standard"
  }
}
```

## Analytics & Impact

### Get Impact Analytics
```
GET /api/analytics/impact?timeframe=month&metrics=letters_submitted,volunteer_signups
```

**Query Parameters**:
- `timeframe`: "day" | "week" | "month" | "quarter" | "year" | "all"
- `metrics`: Comma-separated list of metrics
- `aggregation`: "sum" | "average" | "min" | "max" | "count"
- `compareWithPrevious`: Boolean
- `filters[region]`: Regional filter
- `filters[demographic]`: Demographic filter
- `filters[source]`: Source filter
- `filters[campaign]`: Campaign filter

**Available Metrics**:
- `letters_submitted`
- `volunteer_signups`
- `mentor_connections`
- `program_completions`
- `community_events`
- `website_visits`
- `social_shares`
- `donation_amount`

**Response**:
```json
{
  "success": true,
  "data": {
    "letterSubmissions": {
      "current": 340,
      "previous": 280,
      "growth": 21.4,
      "trend": "increasing"
    },
    "volunteerSignups": {
      "current": 85,
      "previous": 72,
      "growth": 18.1,
      "trend": "increasing"
    },
    "websiteAnalytics": {
      "visits": 12500,
      "uniqueVisitors": 8900,
      "averageSessionDuration": 245,
      "bounceRate": 34.2
    },
    "socialImpact": {
      "shares": 1250,
      "mentions": 340,
      "reach": 45000,
      "engagement": 2800
    },
    "asOf": "2025-07-13T18:14:52Z"
  },
  "timeframe": "month",
  "filters": {}
}
```

## Error Responses

All endpoints return consistent error format:
```json
{
  "success": false,
  "error": "ERROR_CODE",
  "message": "Human readable message",
  "details": {}
}
```

### Common Error Codes
- `VALIDATION_ERROR`: Invalid request data
- `NOT_FOUND`: Resource not found
- `RATE_LIMITED`: Too many requests
- `UNAUTHORIZED`: Authentication required
- `FORBIDDEN`: Insufficient permissions
- `INTERNAL_ERROR`: Server error
- `SERVICE_UNAVAILABLE`: External service down

### HTTP Status Codes
- `200`: Success
- `400`: Bad Request (validation error)
- `401`: Unauthorized
- `403`: Forbidden
- `404`: Not Found
- `429`: Too Many Requests (rate limited)
- `500`: Internal Server Error
- `503`: Service Unavailable

## Rate Limiting

Rate limits vary by endpoint category:

- **Health endpoints**: 120 requests/minute
- **CRM endpoints**: 30 requests/minute
- **AI endpoints**: 10 requests/minute
- **Analytics endpoints**: 60 requests/minute
- **Letter endpoints**: 20 requests/minute

Exceeded limits return `429` with:
```json
{
  "success": false,
  "error": "RATE_LIMITED",
  "message": "Too many requests",
  "retryAfter": 60
}
```

## Authentication

Currently, most endpoints are public. Future authentication will use:
- **Bearer tokens** for API access
- **Admin keys** for administrative functions
- **Session tokens** for user-specific operations

## Field Mappings (ClickUp Integration)

### Contact Field Mappings
The CRM integration maps to 20 custom ClickUp fields:
- `firstName` → Custom Field ID: `cf_001`
- `lastName` → Custom Field ID: `cf_002`
- `email` → Custom Field ID: `cf_003`
- `zipCode` → Custom Field ID: `cf_004`
- `relationship` → Custom Field ID: `cf_005`
- `connectionStrength` → Custom Field ID: `cf_006`
- `engagementLevel` → Custom Field ID: `cf_007`
- `leadScore` → Custom Field ID: `cf_008`
- `letterSubmitted` → Custom Field ID: `cf_009`
- `volunteerSignup` → Custom Field ID: `cf_010`
- `willingToTestify` → Custom Field ID: `cf_011`
- `lastEngagement` → Custom Field ID: `cf_012`
- `pagesVisited` → Custom Field ID: `cf_013`
- `timeOnSite` → Custom Field ID: `cf_014`
- `storiesRead` → Custom Field ID: `cf_015`
- `tags` → Custom Field ID: `cf_016`
- `source` → Custom Field ID: `cf_017`
- `notes` → Custom Field ID: `cf_018`
- `createdAt` → Custom Field ID: `cf_019`
- `updatedAt` → Custom Field ID: `cf_020`

---

*This API reference is verified and tested. All endpoints are functional and actively used in production.* 
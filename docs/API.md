# API Reference - JAHmere Webb Freedom Portal

Complete API documentation for all endpoints.

## Base URL

- **Development**: `http://localhost:1437/api`
- **Production**: `https://july28freedom.vercel.app/api`

## Authentication

Most endpoints are public. No authentication required for current implementation.

## Response Format

All API responses follow this standard format:

```typescript
interface APIResponse<T = any> {
  success?: boolean
  data?: T
  error?: string
  message?: string
  timestamp?: string
}
```

## Core Endpoints

### Health Check

**GET** `/api/health`

System health and status check.

**Response:**
```json
{
  "status": "healthy",
  "message": "Divine Portal Operating at Full Capacity", 
  "timestamp": "2025-07-21T10:30:00.000Z",
  "environment": "production"
}
```

## Analytics Endpoints

### User Journey Tracking

**POST** `/api/analytics/user-journey`

Track user interactions and journey events.

**Request Body:**
```typescript
interface UserJourneyEvent {
  eventType: string           // Required: event identifier
  userType: string           // Required: user category  
  sessionId: string          // Required: session identifier
  userId?: string            // Optional: user ID
  path?: string             // Optional: current page path
  userAgent?: string        // Optional: browser info
  timestamp?: string        // Optional: event time (auto-generated)
  metadata?: Record<string, any> // Optional: additional data
}
```

**Example Request:**
```json
{
  "eventType": "page_view",
  "userType": "visitor", 
  "sessionId": "session_123",
  "path": "/letter-portal",
  "metadata": {
    "source": "navigation",
    "previousPage": "/"
  }
}
```

**Response:**
```json
{
  "success": true,
  "eventId": "session_123-1642781400000",
  "message": "Event tracked successfully"
}
```

**GET** `/api/analytics/user-journey`

Retrieve user journey analytics data.

**Response:**
```typescript
interface SessionMetrics {
  totalSessions: number
  totalEvents: number
  userTypes: Record<string, number>
  eventTypes: Record<string, number>
  averageSessionDuration: number
  topPaths: Array<{ path: string; count: number }>
}
```

### Analytics Dashboard

**GET** `/api/analytics/user-journey/dashboard`

Dashboard-specific analytics data with additional metrics.

**Response:**
```json
{
  "totalSessions": 150,
  "activeUsers": 45,
  "conversionRate": 12.5,
  "topPages": [
    { "path": "/", "views": 320 },
    { "path": "/letter-portal", "views": 180 }
  ],
  "userFlow": {
    "entryPoints": { "/": 65, "/letter-portal": 20 },
    "exitPoints": { "/": 30, "/the-case": 25 }
  }
}
```

## Monitoring Endpoints

### System Health

**GET** `/api/monitoring/health`

Detailed system health metrics.

**Response:**
```json
{
  "status": "healthy",
  "uptime": 3600000,
  "memory": {
    "used": 125.5,
    "total": 512.0,
    "percentage": 24.5
  },
  "responseTime": {
    "average": 45,
    "p95": 120,
    "p99": 250
  }
}
```

### Render Loop Monitoring

**GET** `/api/monitoring/render-loop`

Monitor for rendering performance issues.

**Response:**
```json
{
  "status": "normal",
  "renderCount": 1,
  "lastRender": "2025-07-21T10:30:00.000Z",
  "issues": []
}
```

## Content Endpoints

### Countdown

**GET** `/api/countdown`

Get countdown information for key dates.

**Response:**
```json
{
  "targetDate": "2025-07-28T00:00:00.000Z",
  "daysRemaining": 7,
  "message": "Days until court hearing"
}
```

### Testimonies

**GET** `/api/testimonies`

Retrieve community testimonies and support messages.

**POST** `/api/testimonies`

Submit new testimony (if enabled).

### Prayers

**GET** `/api/prayers`

Get prayer requests and spiritual support content.

**POST** `/api/prayers`

Submit prayer request (if enabled).

## Status Endpoints

### Divine Status

**GET** `/api/divine-status`

Application-specific status with custom messaging.

**Response:**
```json
{
  "status": "operational",
  "message": "All systems supporting the mission",
  "lastUpdated": "2025-07-21T10:30:00.000Z",
  "components": {
    "analytics": "operational",
    "content": "operational", 
    "performance": "optimal"
  }
}
```

## Error Handling

All endpoints return appropriate HTTP status codes:

- **200**: Success
- **400**: Bad Request (missing required fields)
- **404**: Not Found
- **500**: Internal Server Error

**Error Response Format:**
```json
{
  "error": "Error description",
  "status": 400,
  "timestamp": "2025-07-21T10:30:00.000Z"
}
```

## Rate Limiting

- No rate limiting currently implemented
- All endpoints are public and open
- Consider implementing for production scaling

## Data Types

### Common Types

```typescript
// User journey event types
type EventType = 
  | 'page_view'
  | 'button_click'
  | 'form_submit'
  | 'modal_open'
  | 'navigation'
  | 'scroll'
  | 'download'

// User categories  
type UserType =
  | 'visitor'
  | 'advocate'
  | 'supporter'
  | 'legal_professional'
  | 'community_member'

// System status
type SystemStatus = 'healthy' | 'degraded' | 'down'
```

## SDK Usage Examples

### JavaScript/TypeScript

```typescript
// Track user journey event
const trackEvent = async (event: UserJourneyEvent) => {
  const response = await fetch('/api/analytics/user-journey', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event)
  })
  
  return await response.json()
}

// Get health status
const getHealth = async () => {
  const response = await fetch('/api/health')
  return await response.json()
}

// Usage
await trackEvent({
  eventType: 'page_view',
  userType: 'visitor',
  sessionId: generateSessionId(),
  path: window.location.pathname
})
```

### cURL Examples

```bash
# Health check
curl https://july28freedom.vercel.app/api/health

# Track event
curl -X POST https://july28freedom.vercel.app/api/analytics/user-journey \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "page_view",
    "userType": "visitor", 
    "sessionId": "session_123",
    "path": "/letter-portal"
  }'

# Get analytics
curl https://july28freedom.vercel.app/api/analytics/user-journey
```

## Performance

- **Average Response Time**: 27-131ms
- **Availability**: 99.9%+ (Vercel Edge Network)
- **Caching**: No caching currently implemented
- **Monitoring**: Real-time health checks and analytics

---

**Mission**: Supporting JAHmere Webb's freedom through technology and community advocacy. 
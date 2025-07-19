# 🔌 API REFERENCE DOCUMENTATION
**The Bridge Project - Complete Backend API & Integration Guide**

**Version**: v2.1.0  
**Last Updated**: July 19, 2025  
**Status**: Production Ready

---

## 🎯 OVERVIEW

The Bridge Project backend API provides a comprehensive set of endpoints for managing user journeys, analytics, divine events, CRM integration, and spiritual tracking. Built with Next.js 15 App Router, it offers both RESTful APIs and real-time capabilities.

---

## 📚 TABLE OF CONTENTS

1. **[API Architecture](#-api-architecture)**
2. **[Authentication](#-authentication)**
3. **[Core Endpoints](#-core-endpoints)**
4. **[Analytics APIs](#-analytics-apis)**
5. **[CRM Integration](#-crm-integration)**
6. **[Divine Events System](#-divine-events-system)**
7. **[Data Models](#-data-models)**
8. **[Error Handling](#-error-handling)**
9. **[Rate Limiting](#-rate-limiting)**
10. **[Integration Examples](#-integration-examples)**

---

## 🏗️ API ARCHITECTURE

### **Base Configuration**

```typescript
const apiConfig = {
  baseUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:1437',
  version: 'v1',
  timeout: 10000,
  retryAttempts: 3,
  rateLimits: {
    default: '100 requests per minute',
    analytics: '500 requests per minute',
    divine: '50 requests per minute'
  }
};
```

### **API Structure**

```
/api/
├── health/                 # System health monitoring
├── analytics/             # User journey and performance tracking
│   ├── user-journey/      # User behavior tracking
│   ├── divine-events/     # Spiritual event tracking
│   └── dashboard/         # Analytics dashboard data
├── crm/                   # Customer relationship management
│   ├── contacts/          # Contact management
│   ├── behavior/          # Behavior tracking
│   └── analytics/         # CRM analytics
├── prayers/               # Prayer submission and tracking
├── testimonies/           # Testimony collection
├── countdown/             # Freedom countdown timer
└── divine-status/         # Spiritual system status
```

### **Response Standards**

```typescript
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  timestamp: string;
  requestId?: string;
}

interface PaginatedResponse<T> extends APIResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
```

---

## 🔐 AUTHENTICATION

### **Authentication Methods**

Currently, the API uses session-based authentication for analytics and tracking:

```typescript
interface SessionAuth {
  sessionId: string;
  userType?: 'coach' | 'judge' | 'activist' | 'divine-warrior';
  timestamp: string;
  fingerprint?: string;
}
```

### **API Key Authentication (Future)**

```typescript
// Future implementation
interface APIKeyAuth {
  apiKey: string;
  scope: string[];
  rateLimit: number;
  expiresAt: string;
}

// Usage
const headers = {
  'Authorization': 'Bearer YOUR_API_KEY',
  'Content-Type': 'application/json'
};
```

---

## 🔧 CORE ENDPOINTS

### **Health Check API**

Monitor system health and status.

#### `GET /api/health`

**Description**: Check system health and operational status.

**Response**:
```typescript
interface HealthResponse {
  status: 'healthy' | 'degraded' | 'unhealthy';
  message: string;
  timestamp: string;
  environment: string;
  divineMode: 'activated' | 'dormant';
  checks?: {
    database?: 'connected' | 'disconnected';
    cache?: 'active' | 'inactive';
    external?: 'available' | 'unavailable';
  };
}
```

**Example**:
```bash
curl -X GET http://localhost:1437/api/health
```

**Response**:
```json
{
  "status": "healthy",
  "message": "Divine Portal Operating at Full Capacity",
  "timestamp": "2025-07-19T10:30:00.000Z",
  "environment": "development",
  "divineMode": "activated"
}
```

### **Countdown API**

Track the countdown to JAHmere's freedom date.

#### `GET /api/countdown`

**Description**: Get time remaining until July 28th freedom moment.

**Response**:
```typescript
interface CountdownResponse {
  timeLeft?: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  };
  totalSeconds: number;
  freedomDate: string;
  message: string;
  urgency: 'active' | 'urgent' | 'critical';
  status?: 'freedom-achieved' | 'counting-down';
  celebration?: boolean;
}
```

**Example**:
```bash
curl -X GET http://localhost:1437/api/countdown
```

**Response**:
```json
{
  "timeLeft": {
    "days": 342,
    "hours": 14,
    "minutes": 37,
    "seconds": 23
  },
  "totalSeconds": 29563043,
  "freedomDate": "2024-07-28T14:37:00-05:00",
  "message": "342 days until JAHmere's freedom!",
  "urgency": "active"
}
```

### **Divine Status API**

Monitor spiritual and divine system metrics.

#### `GET /api/divine-status`

**Description**: Get current divine portal status and spiritual metrics.

**Response**:
```typescript
interface DivineStatusResponse {
  portalStatus: 'active' | 'dormant' | 'maintenance';
  divineProtection: 'maximum' | 'elevated' | 'standard';
  prayerPower: 'ascending' | 'stable' | 'growing';
  freedomCountdown: 'active' | 'paused';
  communityStrength: 'growing' | 'stable' | 'declining';
  judgeReach: 'expanding' | 'stable' | 'limited';
  miracleIndex: number;
  lastDivineIntervention: string;
  nextPropheticEvent: string;
  spiritualWarfare: {
    defensiveShields: 'activated' | 'standby';
    prayerWarriors: 'mobilized' | 'ready' | 'recruiting';
    divineIntercession: 'continuous' | 'periodic';
    enemyResistance: 'crumbling' | 'weakening' | 'strong';
  };
  metrics: {
    prayersAnswered: number;
    livesTransformed: number;
    communitiesHealed: number;
    justiceAdvanced: string;
  };
}
```

---

## 📊 ANALYTICS APIS

### **User Journey Tracking**

Track user behavior and journey progression through the three-path system.

#### `POST /api/analytics/user-journey`

**Description**: Record user journey events and interactions.

**Request Body**:
```typescript
interface UserJourneyEvent {
  eventType: 'page_view' | 'modal_viewed' | 'path_selected' | 'button_clicked' | 'form_submitted';
  userType: 'coach' | 'judge' | 'activist' | 'divine-warrior';
  sessionId: string;
  timestamp?: string;
  userId?: string;
  path?: string;
  userAgent?: string;
  metadata?: Record<string, any>;
  isDivine?: boolean;
}
```

**Response**:
```typescript
interface TrackingResponse {
  success: boolean;
  eventId: string;
  message: string;
}
```

**Example**:
```bash
curl -X POST http://localhost:1437/api/analytics/user-journey \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "path_selected",
    "userType": "coach",
    "sessionId": "session_123",
    "metadata": {
      "selectedPath": "coach",
      "timeToDecision": 3.2
    }
  }'
```

#### `GET /api/analytics/user-journey`

**Description**: Get user journey analytics summary.

**Query Parameters**:
- `startDate` (optional): ISO date string
- `endDate` (optional): ISO date string
- `userType` (optional): Filter by user type

**Response**:
```typescript
interface JourneyAnalytics {
  summary: {
    totalEvents: number;
    recentEvents: number;
    activeSessions: number;
    lastEventTime: string | null;
  };
  metrics: {
    eventTypes: Record<string, number>;
    userTypes: Record<string, number>;
    divineEvents: number;
    divineEventTypes: Record<string, number>;
  };
  recentEvents: UserJourneyEvent[];
}
```

### **Divine Events Tracking**

Track spiritual and divine intervention events.

#### `POST /api/analytics/divine-events`

**Description**: Record divine events and spiritual interventions.

**Request Body**:
```typescript
interface DivineEvent {
  eventType: 'prayer_submitted' | 'miracle_witnessed' | 'divine_guidance' | 'prophecy_fulfilled';
  userType: 'divine-warrior';
  spiritualImpact: 'low' | 'medium' | 'high' | 'miraculous';
  timestamp: number;
  sessionId: string;
  metadata?: Record<string, any>;
}
```

**Response**:
```typescript
interface DivineEventResponse {
  success: boolean;
  message: string;
  blessing: string;
  interventionNumber: number;
  spiritualStatus: string;
  prophecyProgress: number;
  nextMilestone: string;
}
```

**Example**:
```bash
curl -X POST http://localhost:1437/api/analytics/divine-events \
  -H "Content-Type: application/json" \
  -d '{
    "eventType": "prayer_submitted",
    "userType": "divine-warrior",
    "spiritualImpact": "high",
    "timestamp": 1642678800000,
    "sessionId": "divine_session_456",
    "metadata": {
      "prayerType": "intercession",
      "duration": 300
    }
  }'
```

#### `GET /api/analytics/divine-events`

**Description**: Get divine events analytics and spiritual metrics.

**Response**:
```typescript
interface DivineAnalytics {
  totalDivineInterventions: number;
  recentEvents: DivineEvent[];
  spiritualMetrics: {
    prayersReceived: number;
    miraclesWitnessed: number;
    propheciesFulfilled: number;
    divineGuidanceActivations: number;
  };
  prophecyProgress: number;
  divineAlignment: number;
  nextMilestone: string;
  lastUpdated: string;
}
```

### **Analytics Dashboard**

#### `GET /api/analytics/user-journey/dashboard`

**Description**: Get comprehensive dashboard analytics for admin interface.

**Response**:
```typescript
interface DashboardAnalytics {
  totalSessions: number;
  modalViewRate: number;
  pathSelectionRate: number;
  averageSessionDuration: number;
  pathDistribution: {
    coach: number;
    judge: number;
    activist: number;
  };
  conversionFunnel: {
    modalViewed: number;
    cardHovered: number;
    pathSelected: number;
    journeyCompleted: number;
  };
  deviceBreakdown: {
    desktop: number;
    mobile: number;
    tablet: number;
  };
  engagementMetrics: {
    averageHoverTime: number;
    selectionSpeed: number;
    returnVisitors: number;
  };
  realtimeEvents: Array<{
    timestamp: string;
    eventType: string;
    userType: string;
    metadata?: any;
  }>;
}
```

---

## 🤝 CRM INTEGRATION

### **Contact Management**

Manage contacts and community members through ClickUp integration.

#### `POST /api/crm/contacts`

**Description**: Create a new contact in the CRM system.

**Request Body**:
```typescript
interface ContactData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  relationship?: string;
  letterSubmitted?: boolean;
  volunteerSignup?: boolean;
  willingToTestify?: boolean;
  connectionStrength?: 'weak' | 'medium' | 'strong';
  tags?: string[];
}
```

**Response**:
```typescript
interface ContactResponse {
  success: boolean;
  contactId: string;
  message: string;
  leadScore?: number;
}
```

**Example**:
```bash
curl -X POST http://localhost:1437/api/crm/contacts \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Supporter",
    "email": "john@example.com",
    "relationship": "Community Member",
    "connectionStrength": "medium",
    "letterSubmitted": true,
    "tags": ["bridge-supporter", "newsletter-subscriber"]
  }'
```

#### `GET /api/crm/contacts`

**Description**: Search and retrieve contacts with filtering options.

**Query Parameters**:
- `id` (optional): Get specific contact by ID
- `email` (optional): Search by email
- `relationship` (optional): Filter by relationship type
- `connectionStrength` (optional): Filter by connection strength
- `limit` (optional): Number of results (default: 50)
- `offset` (optional): Pagination offset

**Response**:
```typescript
interface ContactsResponse {
  success: boolean;
  contacts: ContactData[];
  total: number;
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
}
```

#### `PUT /api/crm/contacts`

**Description**: Update existing contact information.

**Request Body**:
```typescript
interface ContactUpdateData extends Partial<ContactData> {
  contactId: string;
}
```

### **Behavior Tracking**

Track user behavior for CRM insights and lead scoring.

#### `POST /api/crm/behavior`

**Description**: Track user behavior events for CRM analysis.

**Request Body**:
```typescript
interface BehaviorEvent {
  contactId: string;
  eventType: 'page_view' | 'story_read' | 'video_watch' | 'resource_download' | 'letter_submitted' | 'volunteer_signup';
  eventData?: {
    pageUrl?: string;
    pageTitle?: string;
    timeSpent?: number;
    resourceType?: string;
    storyId?: string;
    videoId?: string;
  };
  timestamp?: string;
}
```

**Response**:
```typescript
interface BehaviorResponse {
  success: boolean;
  leadScore: number;
  engagementLevel: 'low' | 'medium' | 'high';
  message: string;
}
```

#### `GET /api/crm/behavior`

**Description**: Get behavior summary for a contact.

**Query Parameters**:
- `contactId` (required): Contact ID to get behavior for
- `startDate` (optional): Start date for behavior data
- `endDate` (optional): End date for behavior data

**Response**:
```typescript
interface BehaviorSummary {
  contactId: string;
  totalEvents: number;
  leadScore: number;
  engagementLevel: string;
  lastActivity: string;
  eventBreakdown: Record<string, number>;
  timeline: BehaviorEvent[];
}
```

### **CRM Analytics**

#### `GET /api/crm/analytics`

**Description**: Get CRM analytics and insights.

**Query Parameters**:
- `startDate` (optional): Start date for analytics
- `endDate` (optional): End date for analytics
- `groupBy` (optional): Group results by 'day', 'week', 'month'

**Response**:
```typescript
interface CRMAnalytics {
  summary: {
    totalContacts: number;
    newContactsThisPeriod: number;
    averageLeadScore: number;
    conversionRate: number;
  };
  contactsByEngagementLevel: {
    low: number;
    medium: number;
    high: number;
  };
  contactsByRelationship: Record<string, number>;
  leadScoreDistribution: {
    ranges: string[];
    counts: number[];
  };
  behaviorMetrics: {
    totalEvents: number;
    averageEventsPerContact: number;
    mostCommonEvents: Array<{
      eventType: string;
      count: number;
    }>;
  };
  conversionFunnel: {
    totalContacts: number;
    letterSubmitters: number;
    volunteers: number;
    willingToTestify: number;
  };
}
```

---

## ✨ DIVINE EVENTS SYSTEM

### **Prayer Management**

Handle prayer submissions and tracking.

#### `POST /api/prayers`

**Description**: Submit a prayer request.

**Request Body**:
```typescript
interface PrayerRequest {
  name?: string;
  email?: string;
  prayerType: 'intercession' | 'thanksgiving' | 'petition' | 'praise';
  content: string;
  isPublic?: boolean;
  urgent?: boolean;
}
```

**Response**:
```typescript
interface PrayerResponse {
  id: string;
  status: 'received' | 'praying' | 'answered';
  message: string;
  timestamp: string;
  divineNumber: number;
}
```

#### `GET /api/prayers`

**Description**: Get prayer statistics and status.

**Response**:
```typescript
interface PrayerStatus {
  totalPrayers: number;
  status: 'active' | 'maintenance';
  lastUpdated: string;
  nextMilestone: string;
  divineMessage: string;
}
```

### **Testimony Collection**

#### `POST /api/testimonies`

**Description**: Submit a testimony.

**Request Body**:
```typescript
interface TestimonySubmission {
  name?: string;
  role?: string;
  message: string;
  email?: string;
  phone?: string;
  willingToPublish?: boolean;
}
```

**Response**:
```typescript
interface TestimonyResponse {
  success: boolean;
  testimony: {
    id: string;
    name: string;
    role: string;
    message: string;
    timestamp: string;
    verified: boolean;
  };
  message: string;
}
```

#### `GET /api/testimonies`

**Description**: Get published testimonies.

**Response**:
```typescript
interface TestimoniesResponse {
  testimonies: Array<{
    id: string;
    name: string;
    role: string;
    message: string;
    timestamp: string;
    verified: boolean;
  }>;
  count: number;
  lastUpdated: string;
}
```

---

## 📋 DATA MODELS

### **User Journey Models**

```typescript
// Core user journey state
interface UserJourneyState {
  selectedPath: 'coach' | 'judge' | 'activist' | null;
  journeyProgress: JourneyProgress;
  userProfile: UserProfile;
  championData: ChampionData;
  evidenceData: EvidenceData;
  youthData: YouthData;
  analytics: AnalyticsData;
}

interface JourneyProgress {
  stepsCompleted: string[];
  lastInteraction: Date;
  engagementScore: number;
  currentMilestone: string;
  completionPercentage: number;
  pathStartedAt?: Date;
}

interface UserProfile {
  preferredName?: string;
  location?: string;
  interests?: string[];
  motivations?: string[];
  communicationPreference?: 'email' | 'sms' | 'phone';
}
```

### **Analytics Models**

```typescript
interface AnalyticsData {
  sessionStart: Date;
  totalTimeSpent: number;
  pagesVisited: string[];
  conversionsCompleted: string[];
  shareActions: number;
  impactScore: number;
}

interface PerformanceMetrics {
  responseTime: number;
  errorRate: number;
  throughput: number;
  availability: number;
  timestamp: string;
}
```

### **CRM Models**

```typescript
interface Contact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  relationship: string;
  connectionStrength: 'weak' | 'medium' | 'strong';
  engagementLevel: 'low' | 'medium' | 'high';
  leadScore: number;
  letterSubmitted: boolean;
  volunteerSignup: boolean;
  willingToTestify: boolean;
  pagesVisited: string[];
  storiesRead: string[];
  timeOnSite: number;
  lastEngagement: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}
```

### **Divine Events Models**

```typescript
interface SpiritualMetrics {
  consciousnessLevel: number;
  divineAlignment: number;
  prayerIntensity: number;
  miracleProximity: number;
  transformationProgress: number;
}

interface DivineIntervention {
  id: string;
  type: 'prayer_answered' | 'miracle_witnessed' | 'divine_guidance' | 'prophecy_fulfilled';
  intensity: 'low' | 'medium' | 'high' | 'miraculous';
  description: string;
  timestamp: string;
  witnesses: string[];
  verified: boolean;
}
```

---

## ❌ ERROR HANDLING

### **Error Response Format**

```typescript
interface ErrorResponse {
  success: false;
  error: string;
  message: string;
  code?: string;
  details?: any;
  timestamp: string;
  requestId?: string;
}
```

### **HTTP Status Codes**

```typescript
const statusCodes = {
  // Success
  200: 'OK - Request successful',
  201: 'Created - Resource created successfully',
  202: 'Accepted - Request accepted for processing',
  
  // Client Errors
  400: 'Bad Request - Invalid request data',
  401: 'Unauthorized - Authentication required',
  403: 'Forbidden - Insufficient permissions',
  404: 'Not Found - Resource not found',
  409: 'Conflict - Resource already exists',
  422: 'Unprocessable Entity - Validation failed',
  429: 'Too Many Requests - Rate limit exceeded',
  
  // Server Errors
  500: 'Internal Server Error - Server error occurred',
  502: 'Bad Gateway - Upstream server error',
  503: 'Service Unavailable - Service temporarily unavailable',
  504: 'Gateway Timeout - Upstream server timeout'
};
```

### **Error Examples**

```json
// Validation Error (422)
{
  "success": false,
  "error": "Validation failed",
  "message": "Required fields are missing",
  "code": "VALIDATION_ERROR",
  "details": {
    "fields": ["email", "name"],
    "errors": {
      "email": "Email is required",
      "name": "Name must be at least 2 characters"
    }
  },
  "timestamp": "2025-07-19T10:30:00.000Z",
  "requestId": "req_123456789"
}

// Rate Limit Error (429)
{
  "success": false,
  "error": "Rate limit exceeded",
  "message": "Too many requests. Please try again later.",
  "code": "RATE_LIMIT_EXCEEDED",
  "details": {
    "limit": 100,
    "remaining": 0,
    "resetTime": "2025-07-19T10:35:00.000Z"
  },
  "timestamp": "2025-07-19T10:30:00.000Z"
}
```

---

## ⚡ RATE LIMITING

### **Rate Limit Configuration**

```typescript
const rateLimits = {
  // General API endpoints
  default: {
    requests: 100,
    window: '1 minute',
    message: 'Too many requests. Please try again later.'
  },
  
  // Analytics endpoints (higher limit)
  analytics: {
    requests: 500,
    window: '1 minute',
    message: 'Analytics rate limit exceeded.'
  },
  
  // Divine events (lower limit for quality)
  divine: {
    requests: 50,
    window: '1 minute',
    message: 'Divine event rate limit exceeded. Quality over quantity.'
  },
  
  // CRM operations
  crm: {
    requests: 200,
    window: '1 minute',
    message: 'CRM operation rate limit exceeded.'
  }
};
```

### **Rate Limit Headers**

All API responses include rate limiting headers:

```http
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 87
X-RateLimit-Reset: 1642678860
X-RateLimit-Window: 60
```

---

## 🔧 INTEGRATION EXAMPLES

### **JavaScript/TypeScript Client**

```typescript
class BridgeProjectAPI {
  private baseUrl: string;
  private sessionId: string;
  
  constructor(baseUrl: string = 'http://localhost:1437') {
    this.baseUrl = baseUrl;
    this.sessionId = this.generateSessionId();
  }
  
  // User Journey Tracking
  async trackEvent(event: UserJourneyEvent): Promise<TrackingResponse> {
    const response = await fetch(`${this.baseUrl}/api/analytics/user-journey`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...event,
        sessionId: this.sessionId,
        timestamp: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }
    
    return response.json();
  }
  
  // Divine Events
  async submitDivineEvent(event: DivineEvent): Promise<DivineEventResponse> {
    const response = await fetch(`${this.baseUrl}/api/analytics/divine-events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...event,
        sessionId: this.sessionId
      })
    });
    
    return response.json();
  }
  
  // CRM Operations
  async createContact(contact: ContactData): Promise<ContactResponse> {
    const response = await fetch(`${this.baseUrl}/api/crm/contacts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact)
    });
    
    return response.json();
  }
  
  // Health Check
  async checkHealth(): Promise<HealthResponse> {
    const response = await fetch(`${this.baseUrl}/api/health`);
    return response.json();
  }
  
  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substring(2)}`;
  }
}

// Usage Example
const api = new BridgeProjectAPI();

// Track user path selection
await api.trackEvent({
  eventType: 'path_selected',
  userType: 'coach',
  metadata: {
    selectedPath: 'coach',
    timeToDecision: 3.2
  }
});

// Submit divine event
await api.submitDivineEvent({
  eventType: 'prayer_submitted',
  userType: 'divine-warrior',
  spiritualImpact: 'high',
  timestamp: Date.now(),
  metadata: {
    prayerType: 'intercession'
  }
});
```

### **React Hook Integration**

```typescript
// Custom hook for API integration
import { useState, useCallback } from 'react';

export const useBridgeAPI = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const api = new BridgeProjectAPI();
  
  const trackEvent = useCallback(async (event: UserJourneyEvent) => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await api.trackEvent(event);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  const submitPrayer = useCallback(async (prayer: PrayerRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/prayers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(prayer)
      });
      
      const result = await response.json();
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Prayer submission failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);
  
  return {
    trackEvent,
    submitPrayer,
    loading,
    error
  };
};

// Component usage
const PrayerForm = () => {
  const { submitPrayer, loading, error } = useBridgeAPI();
  
  const handleSubmit = async (prayerData: PrayerRequest) => {
    try {
      const result = await submitPrayer(prayerData);
      console.log('Prayer submitted:', result);
    } catch (err) {
      console.error('Prayer submission failed:', err);
    }
  };
  
  // Component JSX...
};
```

### **Python Client Example**

```python
import requests
import json
from datetime import datetime
from typing import Dict, Any, Optional

class BridgeProjectAPI:
    def __init__(self, base_url: str = "http://localhost:1437"):
        self.base_url = base_url
        self.session = requests.Session()
        self.session.headers.update({
            'Content-Type': 'application/json'
        })
    
    def track_event(self, event: Dict[str, Any]) -> Dict[str, Any]:
        """Track user journey event"""
        url = f"{self.base_url}/api/analytics/user-journey"
        
        # Add timestamp if not provided
        if 'timestamp' not in event:
            event['timestamp'] = datetime.utcnow().isoformat()
        
        response = self.session.post(url, json=event)
        response.raise_for_status()
        
        return response.json()
    
    def submit_divine_event(self, event: Dict[str, Any]) -> Dict[str, Any]:
        """Submit divine event"""
        url = f"{self.base_url}/api/analytics/divine-events"
        
        response = self.session.post(url, json=event)
        response.raise_for_status()
        
        return response.json()
    
    def create_contact(self, contact: Dict[str, Any]) -> Dict[str, Any]:
        """Create CRM contact"""
        url = f"{self.base_url}/api/crm/contacts"
        
        response = self.session.post(url, json=contact)
        response.raise_for_status()
        
        return response.json()
    
    def get_health(self) -> Dict[str, Any]:
        """Check system health"""
        url = f"{self.base_url}/api/health"
        
        response = self.session.get(url)
        response.raise_for_status()
        
        return response.json()

# Usage Example
api = BridgeProjectAPI()

# Track path selection
result = api.track_event({
    "eventType": "path_selected",
    "userType": "judge",
    "sessionId": "python_session_123",
    "metadata": {
        "selectedPath": "judge",
        "source": "python_client"
    }
})

print(f"Event tracked: {result}")

# Check system health
health = api.get_health()
print(f"System status: {health['status']}")
```

---

## 🔒 SECURITY CONSIDERATIONS

### **Data Protection**

```typescript
const securityMeasures = {
  // Input Validation
  validation: 'All inputs validated with Zod schemas',
  sanitization: 'HTML and SQL injection prevention',
  typeChecking: 'TypeScript strict mode enforcement',
  
  // Data Storage
  encryption: 'Sensitive data encrypted at rest',
  hashing: 'Passwords and sensitive fields hashed',
  masking: 'PII data masked in logs',
  
  // Network Security
  https: 'HTTPS enforced in production',
  cors: 'CORS properly configured',
  headers: 'Security headers implemented',
  
  // Authentication & Authorization
  sessionManagement: 'Secure session handling',
  rateLimit: 'Rate limiting on all endpoints',
  apiKeys: 'API key authentication for external access'
};
```

### **Privacy Compliance**

```typescript
const privacyCompliance = {
  // Data Collection
  consent: 'Explicit consent for data collection',
  minimization: 'Only collect necessary data',
  purpose: 'Clear purpose for data usage',
  
  // Data Rights
  access: 'Users can access their data',
  rectification: 'Users can correct their data',
  erasure: 'Users can request data deletion',
  portability: 'Users can export their data',
  
  // Data Retention
  retention: 'Data retention policies enforced',
  deletion: 'Automatic deletion of expired data',
  anonymization: 'Data anonymized when possible'
};
```

---

## 📊 MONITORING & OBSERVABILITY

### **API Metrics**

```typescript
interface APIMetrics {
  // Performance Metrics
  responseTime: {
    p50: number;
    p95: number;
    p99: number;
  };
  throughput: {
    requestsPerSecond: number;
    requestsPerMinute: number;
  };
  errorRates: {
    total: number;
    byStatusCode: Record<string, number>;
    byEndpoint: Record<string, number>;
  };
  
  // Business Metrics
  userJourneyEvents: number;
  divineEventsTracked: number;
  crmContactsCreated: number;
  prayersSubmitted: number;
  
  // System Health
  uptime: number;
  availability: number;
  lastHealthCheck: string;
}
```

### **Logging Standards**

```typescript
// Structured logging format
interface LogEntry {
  timestamp: string;
  level: 'debug' | 'info' | 'warn' | 'error';
  message: string;
  service: string;
  endpoint?: string;
  method?: string;
  statusCode?: number;
  responseTime?: number;
  userId?: string;
  sessionId?: string;
  requestId?: string;
  metadata?: Record<string, any>;
}

// Example log entries
const logExamples = {
  apiRequest: {
    timestamp: '2025-07-19T10:30:00.000Z',
    level: 'info',
    message: 'API request processed',
    service: 'bridge-api',
    endpoint: '/api/analytics/user-journey',
    method: 'POST',
    statusCode: 200,
    responseTime: 45,
    sessionId: 'session_123',
    requestId: 'req_456'
  },
  
  divineEvent: {
    timestamp: '2025-07-19T10:30:00.000Z',
    level: 'info',
    message: 'Divine event recorded',
    service: 'divine-events',
    metadata: {
      eventType: 'prayer_submitted',
      spiritualImpact: 'high',
      interventionNumber: 1337
    }
  }
};
```

---

**🔌 The Bridge Project API - Connecting technology with transformation through divine intervention.**

*"In endpoints we trust, in data we build, in integration we serve."* 
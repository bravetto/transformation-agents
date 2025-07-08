# The Bridge Project API Integration System

This document provides comprehensive documentation for The Bridge Project's API integration system, which connects our platform with ClickUp CRM and Anthropic AI.

## Overview

The API system consists of the following endpoints:

1. **Letter Submission API** (`/api/letters/support`) - Handles support letter submissions with CRM integration
2. **Contact Management API** (`/api/crm/contacts`) - Manages contacts in ClickUp CRM
3. **AI Conversation System** (`/api/ai/doppelganger`) - Powers AI conversations using Anthropic Claude
4. **Analytics API** (`/api/analytics/impact`) - Provides enhanced analytics with CRM data
5. **System Health API** (`/api/health`) - Monitors system health and integration status

## Setup Requirements

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```
# ClickUp Integration
CLICKUP_API_KEY=your_clickup_api_key
CLICKUP_LIST_ID=your_clickup_list_id
CLICKUP_SPACE_ID=your_clickup_space_id
CLICKUP_CONTACTS_LIST_ID=your_clickup_contacts_list_id
CLICKUP_IMPACT_SCORE_FIELD_ID=your_clickup_impact_score_field_id
CLICKUP_ROLE_FIELD_ID=your_clickup_role_field_id
CLICKUP_REGION_FIELD_ID=your_clickup_region_field_id
CLICKUP_RELATIONSHIP_FIELD_ID=your_clickup_relationship_field_id

# Anthropic Integration
ANTHROPIC_API_KEY=your_anthropic_api_key

# Base URL for API calls
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Required Dependencies

Make sure these dependencies are installed:

```bash
npm install zod
```

## API Documentation

### 1. Letter Submission API

**Endpoint**: `/api/letters/support`

#### POST Request

Submit a support letter that will be processed, scored, and stored in ClickUp CRM.

**Request Body**:

```typescript
{
  // PERSONAL INFO
  firstName: string // Required
  lastName: string // Required
  email: string // Required, valid email
  phone?: string // Optional
  zipCode: string // Required, min 5 characters
  
  // RELATIONSHIP & CONTEXT
  relationship: 'youth_helped' | 'employer' | 'mentor' | 'community_leader' | 'family' | 'friend' // Required
  connectionStrength: 'close' | 'moderate' | 'casual' // Required
  timeKnown: string // Required
  
  // ENGAGEMENT LEVEL
  volunteerInterest: boolean // Required
  willingToTestify: boolean // Required
  
  // LETTER CONTENT
  specificExamples: string[] // Required, min 1 example
  ongoingCommitment: string // Required, min 10 characters
  
  // TRACKING
  source: string // Optional, defaults to 'website'
  campaignId?: string // Optional
}
```

**Response**:

```typescript
{
  success: true,
  message: "Letter submitted successfully",
  data: {
    taskId: "abc123", // ClickUp task ID
    impactScore: 85, // Calculated impact score
    qualityStatus: "high" | "standard" // Based on threshold
  }
}
```

#### GET Request

Retrieve form options/metadata for the letter submission form.

**Response**:

```typescript
{
  success: true,
  data: {
    relationshipOptions: [
      { value: "youth_helped", label: "Youth I Helped" },
      // Additional options...
    ],
    connectionStrengthOptions: [
      { value: "close", label: "Close" },
      // Additional options...
    ]
  }
}
```

### 2. Contact Management API

**Endpoint**: `/api/crm/contacts`

#### POST Request

Create a new contact in the CRM system.

**Request Body**:

```typescript
{
  firstName: string // Required
  lastName: string // Required
  email: string // Required, valid email
  phone?: string // Optional
  zipCode: string // Required, min 5 characters
  role: 'supporter' | 'volunteer' | 'youth' | 'partner' | 'staff' | 'donor' // Required
  notes?: string // Optional
  tags?: string[] // Optional
  source?: string // Optional, defaults to 'manual_entry'
  customFields?: Record<string, any> // Optional, custom field values
}
```

**Response**:

```typescript
{
  success: true,
  message: "Contact created successfully",
  data: {
    id: "abc123", // Contact ID
    url: "https://app.clickup.com/..." // URL to contact in ClickUp
  }
}
```

#### PUT Request

Update an existing contact in the CRM system.

**Request Body**:

```typescript
{
  id: string // Required, contact ID
  firstName?: string // Optional
  lastName?: string // Optional
  email?: string // Optional, valid email if provided
  phone?: string // Optional
  zipCode?: string // Optional
  role?: 'supporter' | 'volunteer' | 'youth' | 'partner' | 'staff' | 'donor' // Optional
  notes?: string // Optional
  tags?: string[] // Optional
  customFields?: Record<string, any> // Optional, custom field values
}
```

**Response**:

```typescript
{
  success: true,
  message: "Contact updated successfully"
}
```

#### GET Request

Search for contacts with optional filtering.

**Query Parameters**:

- `id` - Get a specific contact by ID
- `query` - Search term for contact name or email
- `email` - Filter by exact email match
- `role` - Filter by role
- `tags` - Comma-separated list of tags to filter by
- `limit` - Maximum number of results (default: 20, max: 100)
- `page` - Page number for pagination (default: 1)

**Response**:

```typescript
{
  success: true,
  data: [
    {
      id: "abc123",
      name: "John Doe",
      email: "john.doe@example.com",
      role: "volunteer",
      tags: ["mentor", "willing-to-testify"],
      created: "2023-05-15T10:30:00Z",
      updated: "2023-05-16T14:20:00Z"
    },
    // Additional contacts...
  ],
  total: 45,
  page: 1,
  limit: 20,
  totalPages: 3
}
```

### 3. AI Conversation API

**Endpoint**: `/api/ai/doppelganger`

#### POST Request

Generate an AI response based on conversation history and selected persona.

**Request Body**:

```typescript
{
  model: string // Optional, defaults to 'claude-3-opus-20240229'
  persona?: 'coach_dungy' | 'jahmere_webb' | 'michael_mataluni' | 'martha_henderson' | 'jay_forte' // Optional
  messages: [
    {
      role: 'user' | 'assistant',
      content: string // Required
    },
    // Additional messages...
  ],
  customInstructions?: string // Optional
  contextData?: Record<string, any> // Optional
  maxTokens?: number // Optional, defaults to 4000
  temperature?: number // Optional, defaults to 0.7
  conversationId?: string // Optional
  metadata?: Record<string, any> // Optional
}
```

**Response**:

```typescript
{
  success: true,
  data: {
    response: "AI generated response text",
    conversationId: "conv_123456",
    usage: {
      promptTokens: 150,
      completionTokens: 250,
      totalTokens: 400
    },
    model: "claude-3-opus-20240229"
  }
}
```

#### GET Request

Retrieve available personas and models.

**Response**:

```typescript
{
  success: true,
  data: {
    availablePersonas: [
      {
        id: "coach_dungy",
        name: "Coach Dungy",
        description: "You are Coach Tony Dungy, former NFL coach and mentor with The Bridge Project."
      },
      // Additional personas...
    ],
    availableModels: [
      "claude-3-opus-20240229",
      "claude-3-sonnet-20240229",
      "claude-3-haiku-20240307"
    ],
    defaultModel: "claude-3-opus-20240229",
    defaultMaxTokens: 4000
  }
}
```

### 4. Analytics API

**Endpoint**: `/api/analytics/impact`

#### GET Request

Retrieve analytics data with optional filtering.

**Query Parameters**:

- `timeframe` - Time period for analytics (day, week, month, quarter, year, all)
- `region` - Filter by region
- `demographic` - Filter by demographic
- `source` - Filter by source
- `campaign` - Filter by campaign ID
- `metrics` - Comma-separated list of specific metrics to retrieve
- `aggregation` - How to aggregate data (sum, average, min, max, count)
- `compareWithPrevious` - Whether to include previous period comparison

**Response**:

```typescript
{
  success: true,
  data: {
    letterSubmissions: {
      total: 125,
      previousPeriodTotal: 95,
      percentageChange: 31.58,
      averageImpactScore: 78.5,
      highQualityCount: 87,
      byDay: {
        "2023-05-01": 12,
        // Additional days...
      },
      willTestifyCount: 45,
      volunteerInterestCount: 68
    },
    volunteerSignups: {
      // Volunteer analytics...
    },
    websiteAnalytics: {
      // Website analytics...
    },
    overallImpact: {
      // Overall impact metrics...
    }
  },
  timeframe: "month",
  filters: {
    region: "Northeast",
    // Additional filters...
  }
}
```

#### POST Request

Invalidate the analytics cache to force a refresh.

**Response**:

```typescript
{
  success: true,
  message: "Analytics cache invalidated"
}
```

### 5. System Health API

**Endpoint**: `/api/health`

#### GET Request

Check the health status of all integrated systems.

**Query Parameters**:

- `deep` - Whether to perform a deep health check (default: false)
- `format` - Response format (json or html)

**Response (JSON)**:

```typescript
{
  success: true,
  data: {
    overall: "healthy", // healthy, degraded, or down
    services: [
      {
        service: "ClickUp CRM",
        status: "healthy",
        latency: 256,
        lastChecked: "2023-05-20T15:30:45Z"
      },
      // Additional services...
    ],
    timestamp: "2023-05-20T15:30:45Z"
  }
}
```

#### POST Request

Force refresh the health check cache.

**Response**:

```typescript
{
  success: true,
  message: "Health check refreshed",
  data: {
    // Health status data...
  }
}
```

## Error Handling

All API endpoints follow a consistent error handling pattern:

```typescript
{
  success: false,
  error: "Error description",
  details: {} // Optional detailed error information
}
```

Common HTTP status codes:
- `400` - Bad Request (validation error)
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Security Considerations

1. **API Keys**: All API keys are stored as environment variables and never exposed to clients
2. **Rate Limiting**: Implemented at the infrastructure level to prevent abuse
3. **Input Validation**: All requests are validated using Zod schemas
4. **Error Handling**: Errors are logged server-side but don't expose sensitive information to clients

## Development Guidelines

### Adding New Endpoints

1. Create a new file at `src/app/api/[category]/[endpoint]/route.ts`
2. Import necessary dependencies and define validation schemas
3. Implement handler functions for HTTP methods (GET, POST, PUT, DELETE)
4. Add health check for the new endpoint in the health API
5. Update this documentation

### Testing Endpoints

Use a tool like Postman, Insomnia, or curl to test API endpoints:

```bash
# Example: Test the health endpoint
curl -X GET http://localhost:3000/api/health

# Example: Submit a letter
curl -X POST http://localhost:3000/api/letters/support \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe",...}'
```

## Monitoring and Debugging

1. **Logging**: All API calls are logged for debugging purposes
2. **Health Checks**: Use the `/api/health` endpoint to monitor system status
3. **Error Tracking**: Integration with error tracking services (to be implemented)

## Further Improvements

1. Implement authentication for API endpoints
2. Add more comprehensive analytics
3. Implement background processing for long-running tasks
4. Add WebSocket support for real-time updates 
# The Bridge Project CRM System

This directory contains the CRM (Customer Relationship Management) system for The Bridge Project, designed to track contacts, their engagement, and provide analytics for outreach efforts.

## Overview

The CRM system integrates with ClickUp for contact management, using ClickUp's task-based system to store and retrieve contact information. The system tracks:

- Basic contact information (name, email, zip code)
- Relationship context and engagement level
- User behavior on the website (pages visited, time on site, stories read)
- Conversion data (letter submissions, volunteer signups, willingness to testify)
- Lead scoring and lifecycle information

## Directory Structure

- `field-mapping.ts` - Maps CRM fields to ClickUp custom fields
- `clickup-api.ts` - Low-level utilities for ClickUp API integration
- `contact-service.ts` - Service layer for contact operations (create, update, search)

## API Endpoints

The CRM system exposes the following API endpoints:

- `POST /api/crm/contacts` - Create a new contact
- `PUT /api/crm/contacts` - Update an existing contact
- `GET /api/crm/contacts` - Search for contacts with filtering options
- `GET /api/crm/contacts?id=<id>` - Get a specific contact by ID
- `POST /api/crm/behavior` - Track user behavior events
- `GET /api/crm/behavior?contactId=<id>` - Get behavior summary for a contact
- `GET /api/crm/analytics` - Get analytics data with optional filtering

## Integration with ClickUp

The system uses ClickUp as its data store, with the following mapping:

- Each contact is stored as a task in a dedicated ClickUp list
- Contact properties are stored as custom fields on the task
- Tags are used for categorization and filtering
- Task description contains additional information

## Lead Scoring

The system includes automatic lead scoring based on user behavior:

- Page views: +1 point
- Story reads: +5 points
- Video watches: +10 points
- Resource downloads: +15 points
- Letter submissions: +50 points
- Volunteer signups: +75 points
- Willingness to testify: +100 points

## Usage Examples

### Creating a Contact

```typescript
import { createContact } from '@/lib/crm/contact-service';

await createContact({
  firstName: 'John',
  lastName: 'Doe',
  email: 'john.doe@example.com',
  zipCode: '12345',
  relationship: 'Supporter',
  connectionStrength: 'medium',
  engagementLevel: 'medium',
  tags: ['conference-attendee', 'newsletter-subscriber']
});
```

### Tracking User Behavior

```typescript
// Track a page view
fetch('/api/crm/behavior', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    contactId: '123456',
    eventType: 'page_view',
    eventData: {
      pageUrl: '/stories/transformation',
      pageTitle: 'Transformation Stories',
      timeSpent: 120 // seconds
    }
  })
});

// Track a letter submission
fetch('/api/crm/behavior', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    contactId: '123456',
    eventType: 'letter_submitted'
  })
});
```

### Getting Analytics Data

```typescript
// Get analytics for the last 30 days
const response = await fetch('/api/crm/analytics?startDate=2023-05-01&endDate=2023-05-30');
const data = await response.json();

// Access analytics data
const { 
  totalContacts, 
  contactsByEngagementLevel,
  letterConversionRate,
  averageLeadScore
} = data.data;
```

## Environment Variables

The following environment variables are required for the CRM system:

```
CLICKUP_API_KEY=your_clickup_api_key
CLICKUP_CONTACTS_LIST_ID=your_clickup_list_id
CLICKUP_EMAIL_FIELD_ID=custom_field_id_for_email
CLICKUP_RELATIONSHIP_FIELD_ID=custom_field_id_for_relationship
CLICKUP_CONNECTION_STRENGTH_FIELD_ID=custom_field_id_for_connection_strength
CLICKUP_ENGAGEMENT_LEVEL_FIELD_ID=custom_field_id_for_engagement_level
CLICKUP_PAGES_VISITED_FIELD_ID=custom_field_id_for_pages_visited
CLICKUP_TIME_ON_SITE_FIELD_ID=custom_field_id_for_time_on_site
CLICKUP_STORIES_READ_FIELD_ID=custom_field_id_for_stories_read
CLICKUP_LETTER_SUBMITTED_FIELD_ID=custom_field_id_for_letter_submitted
CLICKUP_VOLUNTEER_SIGNUP_FIELD_ID=custom_field_id_for_volunteer_signup
CLICKUP_WILLING_TO_TESTIFY_FIELD_ID=custom_field_id_for_willing_to_testify
CLICKUP_LEAD_SCORE_FIELD_ID=custom_field_id_for_lead_score
CLICKUP_LAST_ENGAGEMENT_FIELD_ID=custom_field_id_for_last_engagement
```

## Performance Considerations

- The system implements caching for contact searches to improve performance
- Cache invalidation occurs on contact creation and updates
- For large datasets, consider implementing pagination
- API rate limits should be respected when making multiple ClickUp API calls

## Security Considerations

- API keys should be stored securely in environment variables
- Input validation is performed using Zod schemas
- Error messages are sanitized to prevent information leakage
- Consider implementing authentication for API endpoints in production 
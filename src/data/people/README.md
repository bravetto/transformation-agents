# Person Data Architecture

This directory contains the data for all person profiles in The Bridge project. The data is structured to be flexible, allowing different types of content to be displayed for each person.

## Directory Structure

- `/people` - Root directory for all person data
  - `/people/index.ts` - Main registry for all person data
  - `/people/*.ts` - Individual person data files
  - `/people/adapters.ts` - Adapter functions for converting between data formats
  - `/people/new-format/` - Examples using the new format directly

## Data Structure

Each person data file exports a `PersonData` object that follows this structure:

```typescript
interface PersonData {
  id: string;            // Unique identifier (usually same as slug)
  slug: string;          // URL slug for the person
  name: string;          // Full name of the person
  title: string;         // Title or role
  heroImage: string;     // Path to hero image
  
  // Optional headline testimony (featured on profile)
  testimony?: {
    quote: string;
    context: string;     // Author and role
    date?: string;
  };
  
  // Optional impact stats summary (featured on profile)
  impact?: {
    title: string;
    description: string;
    stats: Array<{
      label: string;
      value: string;
    }>;
  };
  
  // Content sections for the person profile
  sections: Array<{
    type: 'testimony' | 'impact' | 'letter' | 'video' | 'custom';
    content: TestimonySection | ImpactSection | LetterSection | VideoSection | CustomSection;
  }>;
  
  // Metadata for SEO
  metadata: {
    title: string;
    description: string;
    ogImage?: string;
  };
}
```

## Section Types

### Testimony Section
Displays testimonials about or from the person.

```typescript
{
  type: 'testimony',
  content: {
    title: string;
    description?: string;
    testimonies: Array<{
      id: string;
      quote: string;
      author: string;
      role?: string;
      date?: string;
    }>;
  }
}
```

### Impact Section
Displays statistics and achievements.

```typescript
{
  type: 'impact',
  content: {
    title: string;
    description?: string;
    stats: Array<{
      id: string;
      value: string;
      label: string;
      description?: string;
    }>;
    achievements?: Array<{
      id: string;
      title: string;
      description: string;
      date: string;
    }>;
  }
}
```

### Letter Section
Displays a personal letter.

```typescript
{
  type: 'letter',
  content: {
    title: string;
    body: string;
    date?: string;
    signature?: string;  // Path to signature image
  }
}
```

### Video Section
Displays a video with optional description.

```typescript
{
  type: 'video',
  content: {
    title: string;
    description?: string;
    videoUrl: string;    // YouTube embed URL
    thumbnailUrl?: string;
  }
}
```

### Custom Section
Renders a custom component with props.

```typescript
{
  type: 'custom',
  content: {
    title: string;
    description?: string;
    component: string;   // Component name (must be registered)
    props: Record<string, any>;
  }
}
```

## Adding a New Person

1. Create a new file in `/people/` with the name matching the person's slug
2. Export a `PersonData` object with the required fields
3. Add the person to the registry in `index.ts`

Example:

```typescript
// src/data/people/new-person.ts
import { PersonData } from '@/types/person';

export const newPerson: PersonData = {
  id: 'new-person',
  slug: 'new-person',
  name: 'New Person',
  title: 'Role or Title',
  heroImage: '/images/profiles/new-person.jpg',
  
  // Add sections as needed...
  sections: [
    // Add section objects here
  ],
  
  metadata: {
    title: 'New Person | Role | The Bridge',
    description: 'Description for SEO purposes.',
    ogImage: '/images/profiles/new-person-og.jpg'
  }
};
```

Then in `index.ts`:

```typescript
// Add to imports
import { newPerson } from './new-person';

export const people: Record<string, PersonData> = {
  // Existing people...
  'new-person': newPerson,
};
```

## Using Adapters

The project supports both the new data format and a legacy format for backward compatibility. The `adapters.ts` file provides functions to convert between these formats:

- `adaptToNewFormat` - Converts from legacy format to new format
- `adaptToExistingFormat` - Converts from new format to legacy format

This allows gradual migration of the codebase while maintaining compatibility.

## Data Validation

The registry performs basic validation to ensure data consistency:
- Each person's `slug` should match their key in the registry
- IDs should be unique across all persons
- Required fields should be present 
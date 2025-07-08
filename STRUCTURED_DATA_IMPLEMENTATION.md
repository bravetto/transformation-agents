# Structured Data Implementation Guide

This document outlines how to implement schema.org structured data to improve SEO and enhance the website's appearance in search engine results.

## Why Structured Data Matters

Structured data helps search engines understand the content of your website more effectively, which can lead to:

- Rich results in search listings (knowledge panels, carousels, etc.)
- Better contextual understanding of your content
- Improved click-through rates from search results
- Enhanced voice search capabilities
- Potential ranking improvements

## Required Schema Types for The Bridge Project

Based on the nature of our website, we should implement the following schema types:

1. **Organization**
2. **WebSite**
3. **WebPage**
4. **BreadcrumbList**
5. **Person** (for team members)
6. **Event** (for mentorship events)
7. **Article** (for blog posts/articles)

## Implementation Plan

### 1. Base Organization Schema

Add this to the `layout.tsx` file to provide site-wide organization information:

```jsx
// Add to src/app/layout.tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Existing head content */}
        
        {/* Add Organization Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "The Bridge Project",
              "url": "https://thebridgeproject.org",
              "logo": "https://thebridgeproject.org/images/logo-blue.png",
              "sameAs": [
                "https://twitter.com/thebridgeproject",
                "https://facebook.com/thebridgeproject",
                "https://instagram.com/thebridgeproject"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+1-555-123-4567",
                "contactType": "customer service",
                "email": "info@thebridgeproject.org"
              },
              "description": "Building Justice from Day One - A Transparent Approach to Criminal Justice Reform"
            })
          }}
        />
      </head>
      <body>
        {/* Existing body content */}
      </body>
    </html>
  );
}
```

### 2. WebPage Schema

Create a reusable component for WebPage schema that can be used on each page:

```jsx
// Create a new file: src/components/structured-data/webpage-schema.tsx
"use client";

import { usePathname } from 'next/navigation';

interface WebPageSchemaProps {
  title: string;
  description: string;
  imageUrl?: string;
  datePublished?: string;
  dateModified?: string;
}

export default function WebPageSchema({
  title,
  description,
  imageUrl = "https://thebridgeproject.org/og-image.png",
  datePublished = new Date().toISOString(),
  dateModified = new Date().toISOString()
}: WebPageSchemaProps) {
  const pathname = usePathname();
  const url = `https://thebridgeproject.org${pathname}`;
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": description,
    "url": url,
    "image": imageUrl,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "isPartOf": {
      "@type": "WebSite",
      "name": "The Bridge Project",
      "url": "https://thebridgeproject.org"
    },
    "primaryImageOfPage": {
      "@type": "ImageObject",
      "url": imageUrl
    }
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 3. BreadcrumbList Schema

Create a reusable component for breadcrumb navigation:

```jsx
// Create a new file: src/components/structured-data/breadcrumb-schema.tsx
"use client";

import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items?: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const pathname = usePathname();
  
  // Generate breadcrumb items automatically if not provided
  const breadcrumbItems = items || generateBreadcrumbFromPath(pathname);
  
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbItems.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Helper function to generate breadcrumb items from path
function generateBreadcrumbFromPath(path: string): BreadcrumbItem[] {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', url: 'https://thebridgeproject.org' }
  ];
  
  let currentPath = '';
  
  segments.forEach(segment => {
    currentPath += `/${segment}`;
    
    // Convert slug to title case for display
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      name,
      url: `https://thebridgeproject.org${currentPath}`
    });
  });
  
  return breadcrumbs;
}
```

### 4. Person Schema

Create a component for team member pages:

```jsx
// Create a new file: src/components/structured-data/person-schema.tsx
interface PersonSchemaProps {
  name: string;
  jobTitle: string;
  image: string;
  description: string;
  sameAs?: string[];
}

export default function PersonSchema({
  name,
  jobTitle,
  image,
  description,
  sameAs = []
}: PersonSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": jobTitle,
    "image": image,
    "description": description,
    "sameAs": sameAs,
    "worksFor": {
      "@type": "Organization",
      "name": "The Bridge Project"
    }
  };
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

### 5. Implementation in Pages

Here's how to implement these schemas in your pages:

#### Home Page Example

```jsx
// src/app/page.tsx
import WebPageSchema from '@/components/structured-data/webpage-schema';

export default function HomePage() {
  return (
    <>
      <WebPageSchema
        title="The Bridge Project - Building Justice from Day One"
        description="Zero graduates. Infinite possibility. Join us in building a transparent approach to criminal justice reform."
      />
      
      {/* Rest of your page content */}
    </>
  );
}
```

#### Person Profile Page Example

```jsx
// src/app/people/[slug]/page.tsx
import WebPageSchema from '@/components/structured-data/webpage-schema';
import PersonSchema from '@/components/structured-data/person-schema';
import BreadcrumbSchema from '@/components/structured-data/breadcrumb-schema';

export default function PersonPage({ params }: { params: { slug: string } }) {
  // Get person data from your data source
  const person = getPerson(params.slug);
  
  return (
    <>
      <WebPageSchema
        title={`${person.name} - The Bridge Project`}
        description={person.bio}
        imageUrl={person.imageUrl}
      />
      
      <PersonSchema
        name={person.name}
        jobTitle={person.jobTitle}
        image={person.imageUrl}
        description={person.bio}
        sameAs={person.socialLinks}
      />
      
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://thebridgeproject.org' },
          { name: 'People', url: 'https://thebridgeproject.org/people' },
          { name: person.name, url: `https://thebridgeproject.org/people/${params.slug}` }
        ]}
      />
      
      {/* Rest of your page content */}
    </>
  );
}
```

## Validation and Testing

After implementing structured data, validate it using:

1. **Google's Rich Results Test**: https://search.google.com/test/rich-results
2. **Schema.org Validator**: https://validator.schema.org/
3. **Google Search Console**: Monitor for structured data errors

## Implementation Timeline

1. **Week 1**: Implement base Organization and WebSite schema
2. **Week 2**: Add WebPage and BreadcrumbList schema to all pages
3. **Week 3**: Implement Person schema for team member pages
4. **Week 4**: Add Event and Article schema for relevant pages
5. **Week 5**: Validate and test all implementations

## Expected Results

Proper implementation of structured data should lead to:

- Rich snippets in search results (including knowledge panels)
- Improved click-through rates from search results
- Better contextual understanding of content by search engines
- Enhanced visibility in voice search results
- Improved overall SEO performance

## Maintenance

Structured data should be reviewed and updated:

- When new content types are added to the website
- When organization information changes
- Quarterly to ensure compliance with schema.org standards
- When Google announces new structured data features 
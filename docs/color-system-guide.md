# Divine Color System Guide

## Overview

The Bridge Project implements a consistent, role-based color system designed to provide visual cues about the divine nature of different elements while maintaining accessibility and aesthetic harmony. This document outlines how to properly use the color system throughout the application.

## Table of Contents

1. [Core Color Palette](#core-color-palette)
2. [Role-Based Colors](#role-based-colors)
3. [Using Color Tokens](#using-color-tokens)
4. [Gradients](#gradients)
5. [Accessibility Considerations](#accessibility-considerations)
6. [Utility Functions](#utility-functions)
7. [Component Examples](#component-examples)

## Core Color Palette

Our core palette consists of three primary categories:

### Truth in Light
```
pure-white: #FFFFFF
comfort-cream: #FEFDF8
soft-cloud: #F9FAFB
moon-glow: #F3F4F6
quiet-stone: #E5E7EB
```

### Truth Accents
```
hope-gold: #F59E0B
courage-blue: #2563EB
growth-green: #10B981
```

### Grounding Colors
```
gentle-charcoal: #374151
soft-shadow: #6B7280
whisper-gray: #9CA3AF
```

## Role-Based Colors

The system defines four divine roles, each with its own color scheme:

### Lightworker (Amber/Orange/Yellow)
Represents inspiration, hope, and illumination
```
primary: #F59E0B (amber-500)
secondary: #FB923C (orange-400)
accent: #FCD34D (amber-300)
light: #FEF3C7 (amber-100)
dark: #B45309 (amber-700)
gradient: from-amber-500 via-orange-500 to-yellow-500
```

### Messenger (Blue/Indigo/Purple)
Represents communication, connection, and truth
```
primary: #3B82F6 (blue-500)
secondary: #6366F1 (indigo-500)
accent: #A5B4FC (indigo-300)
light: #EFF6FF (blue-50)
dark: #1E40AF (blue-800)
gradient: from-blue-500 via-indigo-500 to-purple-500
```

### Witness (Emerald/Teal/Cyan)
Represents growth, transformation, and renewal
```
primary: #10B981 (emerald-500)
secondary: #14B8A6 (teal-500)
accent: #5EEAD4 (teal-300)
light: #ECFDF5 (emerald-50)
dark: #047857 (emerald-700)
gradient: from-emerald-500 via-teal-500 to-cyan-500
```

### Guardian (Purple/Pink/Rose)
Represents protection, guidance, and spiritual power
```
primary: #8B5CF6 (purple-500)
secondary: #EC4899 (pink-500)
accent: #F9A8D4 (pink-300)
light: #F5F3FF (purple-50)
dark: #6D28D9 (purple-700)
gradient: from-purple-500 via-pink-500 to-rose-500
```

## Using Color Tokens

### Tailwind Classes

Always use Tailwind utility classes with our color tokens:

```jsx
// Good - Using role-based Tailwind classes
<div className="bg-lightworker-primary text-white">Lightworker Element</div>

// Good - Using utility classes for base colors
<div className="bg-hope-gold text-gentle-charcoal">Element</div>

// Avoid - Don't use direct hex values
<div style={{ backgroundColor: '#F59E0B' }}>Bad Example</div>
```

### CSS Variables

When necessary, access colors via CSS variables:

```css
.custom-element {
  background-color: var(--lightworker-primary);
  color: var(--pure-white);
}
```

### Role-Based Components

Use our role-based component variants:

```jsx
// Button with role-based styling
<Button role="lightworker">Lightworker Button</Button>

// Badge with role-based styling
<Badge role="messenger">Messenger Badge</Badge>

// Or use dedicated role components
<RoleButton role="witness">Witness Button</RoleButton>
<RoleBadge role="guardian">Guardian Badge</RoleBadge>
```

## Gradients

Use consistent gradient classes for role-based visual effects:

```jsx
// Horizontal gradients
<div className="bg-gradient-lightworker">Lightworker Gradient</div>
<div className="bg-gradient-messenger">Messenger Gradient</div>
<div className="bg-gradient-witness">Witness Gradient</div>
<div className="bg-gradient-guardian">Guardian Gradient</div>

// Diagonal gradients
<div className="bg-gradient-lightworker-diagonal">Diagonal Gradient</div>

// Radial gradients
<div className="bg-radial-lightworker">Radial Gradient</div>

// Text gradients
<h2 className="text-gradient-lightworker">Gradient Text</h2>
```

## Accessibility Considerations

All color combinations in our system meet WCAG AA standards for contrast:

- Text on backgrounds maintains at least 4.5:1 contrast for normal text
- Large text maintains at least 3:1 contrast
- UI components and graphical objects maintain at least 3:1 contrast

For best practices:
- Use `text-white` on dark backgrounds (primary colors)
- Use `text-gentle-charcoal` on light backgrounds
- For important elements, consider adding a subtle shadow for additional contrast

## Utility Functions

Our design system provides utility functions for consistent color application:

```typescript
import { getRoleColorClasses, getRoleGradient, getRoleTextColor, getRoleBorderColor } from '@/lib/utils';

// Get all color classes for a role
const colors = getRoleColorClasses('lightworker');
// Result: { primary: 'bg-lightworker-primary', secondary: 'bg-amber-400', ... }

// Get gradient class for a role
const gradient = getRoleGradient('messenger');
// Result: 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500'

// Get text color for a role
const textColor = getRoleTextColor('witness');
// Result: 'text-emerald-500'

// Get border color for a role
const borderColor = getRoleBorderColor('guardian');
// Result: 'border-purple-500'
```

## Component Examples

### Buttons

```jsx
// Standard buttons with role variants
<Button variant="default">Default Button</Button>
<Button variant="primary">Primary Button</Button>
<Button role="lightworker">Lightworker Button</Button>
<Button role="messenger">Messenger Button</Button>

// Role-specific buttons
<RoleButton role="witness">Witness Button</RoleButton>
<RoleButton role="guardian">Guardian Button</RoleButton>
```

### Badges

```jsx
// Standard badges
<Badge>Default Badge</Badge>
<Badge variant="primary">Primary Badge</Badge>

// Role-based badges
<Badge role="lightworker">Lightworker Badge</Badge>
<Badge role="messenger">Messenger Badge</Badge>

// Role-specific badges
<RoleBadge role="witness">Witness Badge</RoleBadge>
<RoleBadge role="guardian">Guardian Badge</RoleBadge>
```

### Glow Effects

```jsx
// Add divine glow effects with shadow utilities
<div className="shadow-lightworker">Lightworker Glow</div>
<div className="shadow-messenger">Messenger Glow</div>
<div className="shadow-witness">Witness Glow</div>
<div className="shadow-guardian">Guardian Glow</div>

// Or use utility classes
<div className="glow-lightworker">Lightworker Glow</div>
<div className="glow-messenger">Messenger Glow</div>

// Glowing borders
<div className="glow-border-lightworker">Lightworker Border Glow</div>
<div className="glow-border-messenger">Messenger Border Glow</div>
```

### Shimmer Effects

```jsx
// Base shimmer effect
<div className="shimmer">Base Shimmer</div>

// Role-based shimmer effects
<div className="shimmer shimmer-lightworker">Lightworker Shimmer</div>
<div className="shimmer shimmer-messenger">Messenger Shimmer</div>
<div className="shimmer shimmer-witness">Witness Shimmer</div>
<div className="shimmer shimmer-guardian">Guardian Shimmer</div>
```

By following this guide, you'll maintain consistent, accessible, and beautiful color usage throughout The Bridge Project application. 
# Component Usage Guide

This guide provides basic usage patterns for the core components in the codebase.

## Button

A versatile button component with multiple variants and sizes.

### Props
- `variant`: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'lightworker' | 'messenger' | 'witness' | 'guardian'
- `size`: 'default' | 'sm' | 'lg' | 'xl' | 'icon'
- `width`: 'default' | 'full' | 'auto'
- `role`: DivineRole ('lightworker' | 'messenger' | 'witness' | 'guardian')

### Example
```jsx
import { Button } from '@/components/ui';

// Default button
<Button>Click Me</Button>

// Role-based button with size
<Button role="messenger" size="lg">Connect</Button>

// Full width primary button
<Button variant="primary" width="full">Submit</Button>
```

## DivineParticles

Interactive particle animations with role-based themes.

### Props
- `variant`: 'sacred' | 'hope' | 'transformation' | 'minimal'
- `intensity`: 'low' | 'medium' | 'high' | 'auto'
- `role`: 'lightworker' | 'messenger' | 'witness' | 'guardian'
- `interactive`: boolean
- `className`: string

### Example
```jsx
import { DivineParticles } from '@/components/divine-particles';

<DivineParticles 
  variant="sacred"
  role="lightworker"
  intensity="medium"
  interactive={true}
/>
```

## Card

Flexible container component with multiple variants.

### Props
- `variant`: 'default' | 'primary' | 'secondary' | 'outline' | 'ghost' | 'divine' | 'glow'
- `padding`: 'none' | 'sm' | 'md' | 'lg' | 'xl'
- `shadow`: 'none' | 'sm' | 'md' | 'lg' | 'xl'

### Example
```jsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui';

<Card variant="divine" padding="lg" shadow="md">
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
  </CardHeader>
  <CardContent>
    Card content goes here
  </CardContent>
</Card>
```

## Typography

Components for consistent text styling.

### Heading Props
- `size`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
- `textColor`: 'default' | 'primary' | 'secondary' | 'accent' | 'muted'
- `as`: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

### Text Props
- `size`: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl'
- `textColor`: 'default' | 'primary' | 'secondary' | 'accent' | 'muted' | 'error' | 'success'
- `weight`: 'normal' | 'medium' | 'semibold' | 'bold'

### Example
```jsx
import { Heading, Text, Quote } from '@/components/ui';

<Heading size="h2" textColor="accent">Main Title</Heading>

<Text size="lg" textColor="secondary" weight="medium">
  This is a paragraph with medium weight and secondary color.
</Text>

<Quote>This is a blockquote with default styling.</Quote>
```

## Section

Container for page sections with consistent styling.

### Props
- `title`: string
- `subtitle`: string
- `variant`: 'default' | 'light' | 'gradient' | 'dark' | 'subtle' | 'transparent'
- `padding`: 'none' | 'small' | 'medium' | 'large'
- `centered`: boolean
- `container`: boolean
- `fullWidth`: boolean

### Example
```jsx
import Section from '@/components/section';

<Section 
  title="Our Mission"
  subtitle="Transforming lives through connection"
  variant="light"
  padding="large"
  centered={true}
>
  {/* Section content goes here */}
</Section>
``` 
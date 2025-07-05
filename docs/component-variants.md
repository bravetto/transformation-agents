# The Bridge Project: Component Variants

This document outlines the available variants and props for key UI components in the Bridge Project. Use this as a reference when developing new features.

## Button

```tsx
<Button variant="gold" size="md" fullWidth={false}>Click Me</Button>
```

### Variants
- **variant**
  - `gold` (default) - Gold background
  - `blue` - Blue background
  - `green` - Green background
  - `outline` - Transparent with border
  - `ghost` - No background or border, only hover effect

### Sizes
- **size**
  - `sm` - Small (h-9)
  - `md` (default) - Medium (h-11)
  - `lg` - Large (h-14)

### Other Props
- **fullWidth**: boolean - Takes full width of container
- **disabled**: boolean - Disables the button
- **className**: string - Additional CSS classes

## Card

```tsx
<Card variant="primary" padding="default">
  Card Content
</Card>
```

### Variants
- **variant**
  - `primary` (default) - White background with shadow
  - `secondary` - Light cream background
  - `outline` - White with border
  - `gold` - Gold background

### Padding
- **padding**
  - `default` (default) - p-6
  - `large` - p-8 md:p-12

### Other Props
- **className**: string - Additional CSS classes

## Typography

### Heading

```tsx
<Heading size="2xl" color="primary">Heading Text</Heading>
```

#### Sizes
- **size**
  - `xs` - 0.75rem
  - `sm` - 0.875rem
  - `base` - 1rem
  - `lg` - 1.125rem
  - `xl` - 1.25rem
  - `2xl` (default) - 1.5rem
  - `3xl` - 1.875rem
  - `4xl` - 2.25rem

#### Colors
- **color**
  - `primary` (default) - gentle-charcoal
  - `gold` - hope-gold
  - `blue` - courage-blue
  - `muted` - soft-shadow

### Text

```tsx
<Text size="base" color="primary">Paragraph text</Text>
```

#### Sizes
- **size**
  - `xs` - 0.75rem
  - `sm` - 0.875rem
  - `base` (default) - 1rem
  - `lg` - 1.125rem
  - `xl` - 1.25rem

#### Colors
- **color**
  - `primary` (default) - gentle-charcoal
  - `gold` - hope-gold
  - `blue` - courage-blue
  - `muted` - soft-shadow

### Quote

```tsx
<Quote size="md" color="gold">Inspirational quote</Quote>
```

#### Sizes
- **size**
  - `sm` - Small quote
  - `md` (default) - Medium quote
  - `lg` - Large quote

#### Colors
- **color**
  - `primary` - gentle-charcoal
  - `gold` (default) - hope-gold
  - `blue` - courage-blue

## Stack

```tsx
<Stack spacing="md" direction="vertical">
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>
```

### Props
- **spacing**
  - `xs` - 0.5rem (2px)
  - `sm` - 1rem (4px)
  - `md` (default) - 1.5rem (6px)
  - `lg` - 2rem (8px)
  - `xl` - 3rem (12px)

- **direction**
  - `vertical` (default) - Stack items vertically
  - `horizontal` - Stack items horizontally

- **className**: string - Additional CSS classes

## Container

```tsx
<Container size="md" centered>
  Content
</Container>
```

### Props
- **size**
  - `sm` - max-w-screen-sm (640px)
  - `md` (default) - max-w-screen-md (768px)
  - `lg` - max-w-screen-lg (1024px)
  - `xl` - max-w-screen-xl (1280px)
  - `full` - w-full (no max width)

- **centered**: boolean - Centers the container horizontally
- **className**: string - Additional CSS classes

## DivineParticles

```tsx
<DivineParticles 
  variant="sacred" 
  intensity="medium"
  interactive={true}
/>
```

### Props
- **variant**
  - `sacred` (default) - Gold particles with connections
  - `hope` - Rising particles with light effects
  - `transformation` - Interactive particles with color changes
  - `minimal` - Subtle background particles

- **intensity**
  - `low` - Fewer, slower particles
  - `medium` (default) - Balanced particle count and speed
  - `high` - More, faster particles

- **interactive**: boolean - Whether particles react to mouse movement
- **className**: string - Additional CSS classes

## SacredReveal

```tsx
<SacredReveal 
  direction="up" 
  delay={300} 
  trigger={inView}
>
  Content to animate
</SacredReveal>
```

### Props
- **direction**
  - `up` (default) - Content appears moving upward
  - `down` - Content appears moving downward
  - `left` - Content appears moving leftward
  - `right` - Content appears moving rightward
  - `scale` - Content appears scaling up

- **delay**: number - Delay in milliseconds before animation starts
- **trigger**: boolean - Whether to trigger the animation
- **className**: string - Additional CSS classes 
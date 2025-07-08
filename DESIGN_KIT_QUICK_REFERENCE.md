# 🎨 Design Kit Quick Reference Card

## Essential Colors
```scss
// Backgrounds
bg-comfort-cream    // #FEFDF8 - Primary background
bg-pure-white       // #FFFFFF - Cards, modals
bg-soft-cloud       // #F9FAFB - Secondary backgrounds

// Text
text-gentle-charcoal // #374151 - Primary text
text-soft-shadow     // #6B7280 - Secondary text
text-whisper-gray    // #9CA3AF - Muted text

// Accents
bg-hope-gold        // #F59E0B - Primary CTA
bg-courage-blue     // #2563EB - Links, info
bg-growth-green     // #10B981 - Success states
```

## Typography Quick Reference
```jsx
// Headings
<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
<h2 className="text-2xl md:text-3xl font-bold">
<h3 className="text-xl md:text-2xl font-semibold">

// Body Text
<p className="text-base md:text-lg leading-relaxed">
<p className="text-sm text-soft-shadow">

// Special
<a className="text-courage-blue hover:text-courage-blue/80 underline underline-offset-4">
```

## Common Components
```jsx
// Primary Button
<Button variant="default">Click Me</Button>

// Role Button
<Button role="lightworker">Lightworker Action</Button>

// Card
<BaseCard variant="elevated" spacing="comfortable">
  Content
</BaseCard>

// Input
<Input className="h-11 min-h-[44px]" placeholder="Enter text" />

// Badge
<Badge className="bg-hope-gold text-white">New</Badge>
```

## Layout Patterns
```jsx
// Page Container
<div className="min-h-screen bg-comfort-cream">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

// Section
<section className="py-12 md:py-16 lg:py-20">

// Grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

// Centered Content
<div className="text-center max-w-3xl mx-auto">
```

## Spacing Scale
```
space-1  = 4px    space-8  = 32px
space-2  = 8px    space-10 = 40px
space-3  = 12px   space-12 = 48px
space-4  = 16px   space-16 = 64px
space-5  = 20px   space-20 = 80px
space-6  = 24px   space-24 = 96px
```

## Animation Snippets
```jsx
// Fade In
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}

// Slide Up
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}

// Hover
whileHover={{ scale: 1.02 }}
whileTap={{ scale: 0.98 }}
```

## Responsive Helpers
```jsx
// Text sizing
className="text-base md:text-lg lg:text-xl"

// Padding
className="p-4 md:p-6 lg:p-8"

// Hide/Show
className="hidden md:block"  // Hide on mobile
className="block md:hidden"  // Show only on mobile
```

## Accessibility Must-Haves
```jsx
// Focus ring
className="focus:outline-none focus:ring-2 focus:ring-courage-blue"

// Screen reader only
className="sr-only"

// Touch target (44px minimum)
className="h-11 min-h-[44px] min-w-[44px]"
```

---
**Print this card for quick reference during development!** 
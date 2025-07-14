# Responsive Component Patterns

This guide provides specific responsive patterns for key components in The Bridge Project, focusing on mobile-first approach with proper touch targets and consistent layout shifts.

## Navigation Component

The main navigation uses these patterns:

```jsx
// Mobile-first approach with responsive menu toggle
<button
  onClick={() => setIsOpen(!isOpen)}
  className="md:hidden h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center"
  aria-label={isOpen ? "Close menu" : "Open menu"}
  aria-expanded={isOpen}
>
  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
</button>

// Responsive mobile menu
<motion.div
  className="fixed inset-0 z-40 bg-pure-white md:hidden overflow-y-auto"
>
  {/* Mobile menu content */}
</motion.div>

// Desktop navigation links with adequate touch targets
<Link
  href={item.href}
  className="flex items-center gap-2 h-11 min-h-[44px] px-3"
>
  {item.icon}
  <span className="text-sm font-medium">{item.label}</span>
</Link>
```

## Grid Layouts

For card grids, person grids, and other multi-item layouts:

```jsx
// Standard grid layout for cards
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
  {/* Grid items */}
</div>

// Grid layout with featured item
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
  <div className="col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-2">
    {/* Featured item spanning multiple columns */}
  </div>
  {/* Regular grid items */}
</div>

// Masonry-style grid using CSS columns
<div className="columns-1 sm:columns-2 lg:columns-3 gap-4 sm:gap-6 lg:gap-8">
  {/* Grid items will flow down in columns */}
  <div className="break-inside-avoid mb-4 sm:mb-6 lg:mb-8">
    {/* Grid item 1 */}
  </div>
  {/* More grid items */}
</div>
```

## Forms and Inputs

Forms follow these responsive patterns:

```jsx
// Responsive form layout with grid
<Form className="space-y-6">
  <FormGrid columns={2}>
    <FormField label="First Name">
      <input className="w-full h-11 min-h-[44px] px-3 rounded-md" />
    </FormField>
    <FormField label="Last Name">
      <input className="w-full h-11 min-h-[44px] px-3 rounded-md" />
    </FormField>
  </FormGrid>
  
  <FormField label="Email">
    <input className="w-full h-11 min-h-[44px] px-3 rounded-md" />
  </FormField>
  
  <FormActions>
    <Button className="order-2 sm:order-1">Cancel</Button>
    <Button className="order-1 sm:order-2">Submit</Button>
  </FormActions>
</Form>
```

## Interactive Elements

Buttons, links, and other interactive elements:

```jsx
// Standard buttons with appropriate touch targets
<button className="h-11 min-h-[44px] min-w-[44px] px-4 rounded-md">
  Button Text
</button>

// Icon buttons
<button className="h-11 w-11 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-md">
  <Icon className="h-5 w-5" />
</button>

// Links with appropriate touch areas
<Link className="py-2 px-3 min-h-[44px] inline-flex items-center">
  Link Text
</Link>
```

## Filter Components

Filter systems for collections:

```jsx
// Responsive filter layout
<div className="flex flex-col sm:flex-row flex-wrap gap-3 mb-6">
  <div className="w-full sm:w-auto">
    <select className="w-full h-11 min-h-[44px] rounded-md">
      <option>Filter 1</option>
    </select>
  </div>
  <div className="w-full sm:w-auto">
    <input 
      type="text" 
      placeholder="Search..." 
      className="w-full h-11 min-h-[44px] px-3 rounded-md"
    />
  </div>
  <div className="w-full sm:w-auto sm:ml-auto mt-3 sm:mt-0">
    <Button className="w-full sm:w-auto">
      Apply Filters
    </Button>
  </div>
</div>

// Filter pills
<div className="flex flex-wrap gap-2">
  <span className="inline-flex items-center px-3 py-2 min-h-[36px] rounded-full bg-white/10">
    Filter
    <button className="ml-2 h-6 w-6 min-h-[24px] min-w-[24px] inline-flex items-center justify-center">
      ×
    </button>
  </span>
</div>
```

## Media Components

Images and video elements:

```jsx
// Responsive images
<div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg">
  <Image
    src={src}
    alt={alt}
    fill
    className="object-cover"
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
    loading="lazy"
  />
</div>

// Responsive video embeds
<div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg">
  <iframe
    src={videoUrl}
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowFullScreen
    className="w-full h-full"
    loading="lazy"
  />
</div>
```

## Dashboard Layouts

```jsx
// Responsive dashboard layout
<div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
  {/* Sidebar - stacks on mobile */}
  <div className="w-full lg:w-64 xl:w-80">
    {/* Sidebar content */}
  </div>
  
  {/* Main content */}
  <div className="flex-1 min-w-0">
    {/* Dashboard metrics grid */}
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
      {/* Metric cards */}
    </div>
  </div>
</div>
```

## Modals and Dialogs

```jsx
// Responsive modal
<div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
  <div className="fixed inset-0 bg-black/50" onClick={onClose} />
  
  <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-auto max-h-[90vh] overflow-auto">
    {/* Close button - larger touch target */}
    <button 
      onClick={onClose}
      className="absolute top-2 right-2 h-11 w-11 flex items-center justify-center"
      aria-label="Close"
    >
      <XIcon className="h-5 w-5" />
    </button>
    
    <div className="p-4 sm:p-6">
      <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
      {/* Modal content */}
    </div>
  </div>
</div>
```

## Tabs and Accordions

```jsx
// Responsive tabs
<div className="border-b border-gray-200">
  <div className="flex flex-wrap -mb-px">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        onClick={() => setActiveTab(tab.id)}
        className={`h-11 min-h-[44px] px-4 py-2 text-sm font-medium border-b-2 ${
          activeTab === tab.id
            ? 'border-primary text-primary'
            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
        }`}
      >
        {tab.label}
      </button>
    ))}
  </div>
</div>

// Responsive accordion
<div className="space-y-2">
  {items.map((item) => (
    <div key={item.id} className="border border-gray-200 rounded-md">
      <button
        onClick={() => toggleItem(item.id)}
        className="flex items-center justify-between w-full p-4 min-h-[44px] text-left"
        aria-expanded={activeItem === item.id}
      >
        <span className="font-medium">{item.label}</span>
        <span className="ml-6 h-7 flex items-center">
          {activeItem === item.id ? (
            <MinusIcon className="h-5 w-5" />
          ) : (
            <PlusIcon className="h-5 w-5" />
          )}
        </span>
      </button>
      
      {activeItem === item.id && (
        <div className="p-4 pt-0">
          {item.content}
        </div>
      )}
    </div>
  ))}
</div>
```

## Best Practices

1. **Always use min-height and min-width**
   ```jsx
   <button className="h-11 min-h-[44px] min-w-[44px]">Button</button>
   ```

2. **Prefer flex-col to flex-row on mobile**
   ```jsx
   <div className="flex flex-col sm:flex-row gap-4">
     {/* Content */}
   </div>
   ```

3. **Use proper order for mobile/desktop reordering**
   ```jsx
   <div className="flex flex-col sm:flex-row">
     <div className="order-2 sm:order-1">First on desktop, second on mobile</div>
     <div className="order-1 sm:order-2">First on mobile, second on desktop</div>
   </div>
   ```

4. **Control line length for better readability**
   ```jsx
   <p className="max-w-prose mx-auto">Long-form text content</p>
   ```

5. **Use aspect-ratio for media containers**
   ```jsx
   <div className="aspect-w-16 aspect-h-9 w-full">
     <img src="..." alt="..." className="object-cover w-full h-full" />
   </div>
   ```

6. **Optimize for performance**
   - Use `loading="lazy"` for images and iframes
   - Add `will-change` only when needed
   - Use responsive image techniques with `srcset` and `sizes`
   - Consider conditional rendering for complex components on mobile 
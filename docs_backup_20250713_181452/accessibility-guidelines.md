# Accessibility Guidelines for The Bridge Project

This document provides comprehensive guidance for achieving WCAG AAA compliance across The Bridge Project's web platform.

## Table of Contents

1. [Core Principles](#core-principles)
2. [ARIA Attributes](#aria-attributes)
3. [Keyboard Navigation](#keyboard-navigation)
4. [Focus Management](#focus-management)
5. [Color Contrast](#color-contrast)
6. [Screen Reader Support](#screen-reader-support)
7. [Implementation Examples](#implementation-examples)
8. [Testing](#testing)

## Core Principles

The Bridge Project follows these core accessibility principles:

- **Perceivable**: All users can perceive information through one or more senses
- **Operable**: All users can operate the interface through multiple input methods
- **Understandable**: All users can understand the interface and its navigation
- **Robust**: All users can access the content using a wide range of assistive technologies

## ARIA Attributes

### Required ARIA Attributes for Common Components

#### Buttons
```tsx
<button 
  aria-label="Close dialog" // When visual text is not present
  aria-expanded={isOpen} // For toggle buttons
  aria-controls="element-id" // Controls another element
  aria-pressed={isActive} // For toggle buttons
  disabled={isDisabled} // Use actual disabled attribute
>
  Button Text
</button>
```

#### Links
```tsx
<Link 
  href="/path"
  aria-current={isActive ? "page" : undefined} // For current page
>
  Link Text
</Link>
```

#### Navigation
```tsx
<nav 
  role="navigation" 
  aria-label="Main navigation"
>
  Navigation content
</nav>
```

#### Dropdowns
```tsx
<button 
  aria-haspopup="true"
  aria-expanded={isOpen}
  aria-controls="dropdown-id"
>
  Open Dropdown
</button>
<div 
  id="dropdown-id"
  role="menu"
>
  Dropdown content
</div>
```

#### Form Elements
```tsx
<label htmlFor="input-id">Field Label</label>
<input 
  id="input-id"
  aria-describedby="help-id" // For help text
  aria-invalid={hasError} // For validation
/>
<div id="help-id">Help text for the field</div>
```

## Keyboard Navigation

### Skip Links

Add skip links at the top of each page:

```tsx
<a 
  href="#main-content" 
  className="sr-only focus:not-sr-only focus:absolute focus:top-0 focus:left-0 focus:z-[100] focus:p-4"
>
  Skip to main content
</a>
```

### Focus Order

- Ensure logical tab order (usually left-to-right, top-to-bottom)
- Don't use tabIndex values greater than 0
- Use tabIndex="0" for elements that need to be focusable but aren't by default
- Use tabIndex="-1" for programmatic focus without tab order inclusion

### Keyboard Handlers

```tsx
// Handle keyboard Enter and Space for interactive elements
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    // Trigger the action
    onClick();
  }
};

<div 
  role="button" 
  tabIndex={0}
  onClick={onClick}
  onKeyDown={handleKeyDown}
>
  Clickable Element
</div>
```

## Focus Management

### Focus Indicators

Every focusable element must have a visible focus indicator:

```css
/* Ensure all elements have a visible focus ring */
*:focus-visible {
  @apply outline-2 outline-offset-2 outline-courage-blue ring-2 ring-courage-blue ring-offset-2;
}
```

### Focus Trapping

For modals and dialogs, trap the focus within the container:

```tsx
import { useRef, useEffect } from 'react';

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  // Store the element that had focus when the modal opened
  useEffect(() => {
    if (isOpen) {
      previousFocusRef.current = document.activeElement as HTMLElement;
    }
  }, [isOpen]);

  // Handle focus trap in modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const focusableElements = modalRef.current.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    function handleTabKey(e: KeyboardEvent) {
      if (e.key === 'Tab') {
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    }

    // Focus the first element when the modal opens
    firstElement?.focus();

    // Add event listener
    document.addEventListener('keydown', handleTabKey);
    return () => {
      document.removeEventListener('keydown', handleTabKey);
      // Restore focus when the modal closes
      if (!isOpen) {
        previousFocusRef.current?.focus();
      }
    };
  }, [isOpen]);

  return (
    <div 
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal Title</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  );
}
```

## Color Contrast

### Contrast Requirements for AAA Compliance

- **Normal text**: 7:1 contrast ratio minimum
- **Large text**: 4.5:1 contrast ratio minimum
- **UI components and graphical objects**: 3:1 contrast ratio minimum

### Implementation

```tsx
// Example of high contrast button with AAA compliance
<button className="bg-courage-blue text-pure-white">
  High Contrast Button
</button>

// Avoid low contrast combinations
<button className="bg-soft-cloud text-whisper-gray"> // BAD - Low contrast
  Low Contrast Button
</button>
```

### Testing Contrast

Use tools like:
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Colour Contrast Analyzer](https://developer.paciellogroup.com/resources/contrastanalyser/)
- Browser DevTools Color Contrast Checkers

## Screen Reader Support

### Dynamic Content Updates

Use aria-live regions for dynamic content:

```tsx
<div 
  aria-live="polite" 
  aria-atomic="true"
>
  {message}
</div>
```

### Alternative Text for Images

```tsx
<Image 
  src="/image.jpg" 
  alt="Descriptive text about the image content and purpose"
  width={400}
  height={300}
/>

// For decorative images
<Image 
  src="/decorative.jpg" 
  alt=""
  role="presentation"
  width={400}
  height={300}
/>
```

### ARIA Roles

Use semantic HTML elements whenever possible, and add ARIA roles only when necessary:

```tsx
// GOOD - Use semantic HTML
<button>Click Me</button>

// If needed (e.g., when making a div act as a button)
<div 
  role="button" 
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={handleKeyDown}
>
  Click Me
</div>
```

## Implementation Examples

### Accessible Navigation

```tsx
<nav role="navigation" aria-label="Main navigation">
  <a href="#main-content" className="sr-only focus:not-sr-only">
    Skip to main content
  </a>
  
  <ul role="menubar">
    <li role="none">
      <a 
        href="/" 
        role="menuitem"
        aria-current={isHomePage ? "page" : undefined}
      >
        Home
      </a>
    </li>
    <!-- Other navigation items -->
  </ul>
</nav>
```

### Accessible Modal

```tsx
<div
  role="dialog"
  aria-labelledby="modal-title"
  aria-describedby="modal-description"
  aria-modal="true"
>
  <h2 id="modal-title">Modal Title</h2>
  <p id="modal-description">This is the modal description.</p>
  
  <button
    onClick={closeModal}
    aria-label="Close modal"
  >
    ×
  </button>
  
  <!-- Modal content -->
</div>
```

### Accessible Form

```tsx
<form aria-labelledby="form-title">
  <h2 id="form-title">Contact Form</h2>
  
  <div>
    <label htmlFor="name">Full Name</label>
    <input
      id="name"
      type="text"
      aria-required="true"
      aria-invalid={nameError ? "true" : "false"}
      aria-describedby="name-error"
    />
    {nameError && (
      <div id="name-error" role="alert">
        {nameError}
      </div>
    )}
  </div>
  
  <!-- Other form fields -->
  
  <button type="submit">Submit</button>
</form>
```

## Testing

### Manual Testing

- Test with keyboard only (no mouse)
- Test with screen readers (NVDA, VoiceOver, JAWS)
- Test with high contrast mode
- Test with zoomed content (up to 200%)
- Test with reduced motion settings

### Automated Testing

Use tools like:
- [axe DevTools](https://www.deque.com/axe/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WAVE](https://wave.webaim.org/)

### Integration into Development Workflow

- Add accessibility checks to the CI/CD pipeline
- Include accessibility in code reviews
- Conduct regular accessibility audits

---

By following these guidelines, The Bridge Project will achieve WCAG AAA compliance and provide an inclusive experience for all users, regardless of their abilities or disabilities. 
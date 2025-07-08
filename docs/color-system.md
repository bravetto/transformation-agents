# Divine Role Color System

## Role Colors

The application uses four divine role colors with consistent Tailwind classes:

| Role | Primary | Secondary | Accent | Example Usage |
|------|---------|-----------|--------|--------------|
| **Lightworker** | `lightworker-primary` <br> `bg-lightworker-primary` | `lightworker-secondary` | `lightworker-accent` | Inspiration, hope, warmth |
| **Messenger** | `messenger-primary` <br> `bg-messenger-primary` | `messenger-secondary` | `messenger-accent` | Communication, connection, trust |
| **Witness** | `witness-primary` <br> `bg-witness-primary` | `witness-secondary` | `witness-accent` | Growth, transformation, clarity |
| **Guardian** | `guardian-primary` <br> `bg-guardian-primary` | `guardian-secondary` | `guardian-accent` | Protection, guidance, strength |

## Role Gradients

Each role has consistent gradient classes for various visual effects:

```jsx
{/* Lightworker Gradient */}
<div className="bg-gradient-lightworker">Lightworker gradient (amber → orange → yellow)</div>

{/* Messenger Gradient */}
<div className="bg-gradient-messenger">Messenger gradient (blue → indigo → purple)</div>

{/* Witness Gradient */}
<div className="bg-gradient-witness">Witness gradient (emerald → teal → cyan)</div>

{/* Guardian Gradient */}
<div className="bg-gradient-guardian">Guardian gradient (purple → pink → rose)</div>
```

## Usage Guidelines

- Use role colors consistently based on the content's purpose
- Apply gradients for emphasis and visual hierarchy
- For interactive elements, pair with role-specific shadow: `shadow-lightworker`
- Maintain sufficient contrast for accessibility (WCAG AA minimum)
- When in doubt, default to `messenger` for general UI elements 
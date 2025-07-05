# People Pages Architecture

## Overview

The People Pages feature implements a dynamic route architecture with shared components for displaying person profiles. This approach offers several benefits:

1. **Code Reusability**: All person pages use the same components with different data
2. **Maintainability**: Updates to layouts or features only need to be made once
3. **Consistency**: All person profiles maintain consistent design and behavior
4. **Scalability**: Adding new person profiles requires only new data files, not new page components

## File Structure

```
src/
├── app/
│   └── people/
│       ├── page.tsx               # Main people listing page
│       └── [slug]/                # Dynamic route for individual people
│           ├── page.tsx           # Dynamic route handler
│           ├── loading.tsx        # Loading state UI
│           └── not-found.tsx      # 404 page for invalid person slugs
│
├── components/
│   └── people/                    # Shared components for person pages
│       ├── person-hero.tsx        # Hero section for person profiles
│       ├── person-testimony.tsx   # Testimonies section
│       └── person-impact.tsx      # Impact statistics and achievements
│
└── data/
    └── people/                    # Person data files
        ├── index.ts               # People data registry and helper functions
        ├── jahmere-webb.ts        # JAHmere's data
        ├── jordan-dungy.ts        # Jordan's data
        ├── michael-mataluni.ts    # Michael's data
        ├── coach-dungy.ts         # Coach Dungy's data
        └── jay-forte.ts           # Jay's data
```

## How It Works

1. **Data Layer**:
   - Each person has a dedicated data file containing their information
   - The `index.ts` file registers all people and provides helper functions

2. **Shared Components**:
   - Reusable components that render different sections of a person profile
   - All components accept standardized props defined by TypeScript interfaces

3. **Dynamic Routing**:
   - The `[slug]` directory creates dynamic routes based on person slugs
   - `page.tsx` loads the appropriate person data and renders components
   - Static paths are pre-generated for all people at build time

## Adding a New Person

To add a new person profile:

1. Create a new data file in `src/data/people/` (use existing files as templates)
2. Add profile image to `public/images/profiles/`
3. Import and register the person data in `src/data/people/index.ts`

No need to create any new pages or components!

## Future Enhancements

Potential improvements for this architecture:

- Add filtering and search functionality to the people listing page
- Implement related people suggestions
- Add social sharing functionality for profiles
- Create a content management system for easier updates 
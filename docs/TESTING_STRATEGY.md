# Testing Strategy - Comprehensive Quality Assurance
*Single Source of Truth for Testing Approach*

## Testing Philosophy
Every change must maintain or improve test coverage. No feature ships without tests. Quality is not negotiable.

## Coverage Requirements & Current Status

### Minimum Coverage by Type
- **New Features**: 90% coverage required
- **Bug Fixes**: Must include regression test
- **Refactoring**: Must maintain existing coverage
- **Overall Target**: 80% by Phase 3 completion

### Current Coverage (Phase 1 Complete)
- **Overall**: 62% (up from 0% at start)
- **E2E**: 11 tests covering 8 critical paths
- **Unit**: 45 component tests
- **Integration**: 15 API tests
- **Error Boundaries**: 68.18% statements, 54.54% branches

### Phase 0 Testing Foundation (COMPLETE)
✅ **E2E Test Suites Created**:
1. **Letter Submission Flow** (`letter-submission.cy.ts`)
   - Complete homepage → form → CRM → success flow
   - Form data preservation during navigation
   - Network error handling and validation
   - Success confirmation and user feedback

2. **Character Witness Display** (`character-witness.cy.ts`)
   - All people profiles (Tony Dungy, Michael Mataluni, JAHmere Webb)
   - Responsive layout and image loading
   - Error boundaries and accessibility
   - Performance and loading efficiency

3. **Judge Dashboard Access** (`judge-dashboard.cy.ts`)
   - Secure access to judge-specific content
   - Comprehensive case information display
   - Letter preview functionality and responsive design
   - Accessibility navigation and error state handling

4. **Mobile Navigation** (`mobile-navigation.cy.ts`)
   - Full navigation on mobile devices with touch interactions
   - 44x44 touch target accessibility standards
   - Orientation changes and various mobile viewport sizes
   - Offline/poor network condition handling

✅ **Unit Test Suites Created**:
1. **ClickUp API Integration** (`clickup-api.test.ts`)
   - 25+ test scenarios covering contact creation, updates, search
   - Field mapping validation for all 20 custom fields
   - Rate limiting, retry logic, and error handling
   - Security validation and data sanitization

2. **Divine Error Boundary** (`divine-error-boundary.test.tsx`)
   - 19 test scenarios covering error catching and recovery
   - Form data preservation during error conditions
   - Async error handling and component protection
   - Role-based error handling and accessibility compliance

## Testing Layers

### 1. Unit Tests (Vitest)
**Purpose**: Test components and functions in isolation

**Framework**: Vitest + React Testing Library + Jest DOM matchers

```typescript
// Example: Component test pattern
import { render, screen, userEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders with correct variant classes', () => {
    render(<Button variant="destructive">Delete</Button>);
    expect(screen.getByRole('button')).toHaveClass('bg-destructive');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    await userEvent.click(screen.getByRole('button'));
    expect(handleClick).toHaveBeenCalledOnce();
  });

  it('shows loading state correctly', () => {
    render(<Button loading>Loading</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText('Loading')).toBeInTheDocument();
  });
});
```

**What to Test**:
- Component rendering with all prop combinations
- Event handlers and user interactions
- Conditional rendering and state changes
- Accessibility attributes and keyboard navigation
- Error states and edge cases
- Hook behavior and side effects
- Utility functions and transformations

### 2. Integration Tests (Vitest + MSW)
**Purpose**: Test component interactions and API calls

```typescript
// Example: API integration test
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

const server = setupServer(
  rest.post('/api/crm/contacts', (req, res, ctx) => {
    return res(ctx.json({ success: true, data: { id: 'contact-123' } }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Contact Form Integration', () => {
  it('submits form and shows success message', async () => {
    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText('First Name'), 'John');
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    await waitFor(() => {
      expect(screen.getByText('Contact created successfully')).toBeInTheDocument();
    });
  });

  it('handles API errors gracefully', async () => {
    server.use(
      rest.post('/api/crm/contacts', (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ error: 'Server error' }));
      })
    );

    render(<ContactForm />);
    
    await userEvent.type(screen.getByLabelText('Email'), 'john@example.com');
    await userEvent.click(screen.getByRole('button', { name: 'Submit' }));
    
    await waitFor(() => {
      expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });
  });
});
```

### 3. E2E Tests (Cypress)
**Purpose**: Test complete user journeys

**Framework**: Cypress with custom commands and fixtures

```typescript
// Example: E2E test pattern
describe('Letter Submission Flow', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.intercept('POST', '/api/letters/support', { fixture: 'letter-success.json' }).as('submitLetter');
  });

  it('completes full letter submission journey', () => {
    // Navigate from homepage
    cy.get('[data-testid="write-letter-cta"]').click();
    cy.url().should('include', '/letter-form');

    // Fill out form
    cy.get('[data-testid="writer-name"]').type('John Doe');
    cy.get('[data-testid="writer-email"]').type('john@example.com');
    cy.get('[data-testid="relationship"]').select('family');
    cy.get('[data-testid="letter-content"]').type('This is my support letter...');

    // Submit form
    cy.get('[data-testid="submit-letter"]').click();

    // Verify success
    cy.wait('@submitLetter');
    cy.get('[data-testid="success-message"]').should('be.visible');
    cy.get('[data-testid="impact-score"]').should('contain', 'Impact Score:');
  });

  it('preserves form data during navigation errors', () => {
    cy.visit('/letter-form');
    
    // Fill form partially
    cy.get('[data-testid="writer-name"]').type('Jane Smith');
    cy.get('[data-testid="writer-email"]').type('jane@example.com');

    // Simulate navigation error
    cy.intercept('POST', '/api/letters/support', { statusCode: 500 }).as('submitError');
    cy.get('[data-testid="submit-letter"]').click();

    // Verify form data preserved
    cy.get('[data-testid="writer-name"]').should('have.value', 'Jane Smith');
    cy.get('[data-testid="writer-email"]').should('have.value', 'jane@example.com');
  });
});
```

**Critical Paths Tested**:
1. **Letter Submission Flow**: Homepage → Form → CRM → Success
2. **Character Witness Navigation**: People pages with responsive design
3. **Judge Dashboard Access**: Secure content with data visualization
4. **Mobile Navigation**: Touch interactions and accessibility
5. **Social Sharing**: Share functionality across platforms
6. **Error Recovery**: Graceful handling of failures

### 4. Performance Tests
**Purpose**: Ensure optimization targets are met

```bash
# Lighthouse CI for performance metrics
npm run lighthouse

# Bundle analysis for size optimization
npm run analyze

# Custom performance tests
npm run test:performance
```

**Performance Targets**:
- **Bundle Size**: <500KB (current: ~1MB)
- **First Contentful Paint**: <1.5s (current: 1.8s)
- **Lighthouse Score**: >90 (current: 85)
- **Build Time**: <90s (current: 3-5min)

## Testing Utilities & Setup

### Test Configuration
```typescript
// setupTests.ts
import '@testing-library/jest-dom';
import { expect } from 'vitest';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    back: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams(),
  usePathname: () => '/',
}));
```

### Custom Test Utilities
```typescript
// test-utils/index.tsx
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement, ReactNode } from 'react';
import { ErrorBoundary } from '@/components/ui/divine-error-boundary';

interface CustomRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  withErrorBoundary?: boolean;
}

const AllTheProviders = ({ children }: { children: ReactNode }) => {
  return (
    <ErrorBoundary componentName="TestWrapper" role="guardian">
      {children}
    </ErrorBoundary>
  );
};

export const renderWithProviders = (
  ui: ReactElement,
  options: CustomRenderOptions = {}
) => {
  const { withErrorBoundary = true, ...renderOptions } = options;
  
  const Wrapper = withErrorBoundary ? AllTheProviders : undefined;
  
  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

// Re-export everything
export * from '@testing-library/react';
export { renderWithProviders as render };
```

### Test Data Factories
```typescript
// test-utils/factories.ts
export const createMockContact = (overrides = {}) => ({
  id: 'contact-123',
  firstName: 'John',
  lastName: 'Doe',
  email: 'john@example.com',
  relationship: 'family',
  engagementLevel: 'high' as const,
  leadScore: 85,
  createdAt: '2025-07-13T18:14:52Z',
  updatedAt: '2025-07-13T18:14:52Z',
  ...overrides,
});

export const createMockLetterSubmission = (overrides = {}) => ({
  writerName: 'Jane Smith',
  writerEmail: 'jane@example.com',
  relationship: 'friend',
  content: 'This is a test letter...',
  examples: ['Example 1', 'Example 2'],
  willingToTestify: true,
  contactPermission: true,
  ...overrides,
});
```

## Error Boundary Testing Strategy

### Divine Error Boundary Pattern
```typescript
// Error boundary test pattern
describe('Divine Error Boundary', () => {
  it('catches and displays error gracefully', () => {
    const ThrowError = () => {
      throw new Error('Test error');
    };

    render(
      <DivineErrorBoundary componentName="TestComponent" role="guardian">
        <ThrowError />
      </DivineErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /try again/i })).toBeInTheDocument();
  });

  it('preserves user data during error recovery', async () => {
    const FormWithError = ({ shouldError }: { shouldError: boolean }) => {
      if (shouldError) throw new Error('Form error');
      return <input data-testid="preserved-input" defaultValue="preserved data" />;
    };

    const { rerender } = render(
      <DivineErrorBoundary componentName="FormComponent">
        <FormWithError shouldError={false} />
      </DivineErrorBoundary>
    );

    // Verify normal state
    expect(screen.getByTestId('preserved-input')).toHaveValue('preserved data');

    // Trigger error
    rerender(
      <DivineErrorBoundary componentName="FormComponent">
        <FormWithError shouldError={true} />
      </DivineErrorBoundary>
    );

    // Verify error boundary catches it
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // Verify recovery maintains data
    await userEvent.click(screen.getByRole('button', { name: /try again/i }));
    expect(screen.getByTestId('preserved-input')).toHaveValue('preserved data');
  });
});
```

## CI/CD Integration

### GitHub Actions Workflow
```yaml
name: Test Suite
on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: 'npm'
      
      - run: npm ci
      - run: npm run type-check
      - run: npm run test:unit
      - run: npm run test:integration
      - run: npm run build
      - run: npm run cypress:headless
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
```

### Pre-commit Hooks
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "npm run test:related",
      "npm run lint:fix",
      "git add"
    ]
  }
}
```

## Test Maintenance & Quality

### Weekly Tasks
- Review and fix flaky tests
- Update test data and fixtures
- Add tests for reported bugs
- Analyze coverage gaps

### Monthly Tasks
- Performance baseline updates
- Test speed optimization
- Dependency updates
- Coverage target review

### Quality Gates
- **Pre-commit**: Unit tests must pass
- **Pre-merge**: All tests + coverage check
- **Pre-deploy**: E2E tests + performance audit

## Coverage Targets by Phase

### Phase 1 (Current): Documentation Foundation
- ✅ E2E test suite established (11 tests)
- ✅ Unit test foundation (45 tests)
- ✅ Error boundary testing (68% coverage)
- **Target**: 62% overall coverage ✅ ACHIEVED

### Phase 2: Component Optimization
- **Target**: 70% overall coverage
- Focus: Component consolidation testing
- New: Bundle size testing
- Enhanced: Performance testing

### Phase 3: Production Readiness
- **Target**: 80% overall coverage
- Complete: All critical path coverage
- Enhanced: Load testing
- Final: Production monitoring

## Anti-Patterns to Avoid

### Testing Anti-Patterns ❌
- ❌ Testing implementation details
- ❌ Excessive mocking that hides real issues
- ❌ Brittle selectors that break easily
- ❌ Duplicate test coverage across layers
- ❌ Skipped tests without tracking tickets
- ❌ Tests that depend on external services
- ❌ Hardcoded test data without factories

### Good Testing Practices ✅
- ✅ Test user behavior, not implementation
- ✅ Use semantic queries (getByRole, getByLabelText)
- ✅ Mock at the network boundary
- ✅ Test error states and edge cases
- ✅ Use data-testid sparingly, prefer semantic selectors
- ✅ Keep tests focused and independent
- ✅ Use descriptive test names that explain the scenario

## Monitoring & Metrics

### Test Metrics Tracked
- **Coverage Percentage**: Overall and by component
- **Test Execution Time**: Performance of test suite
- **Flaky Test Rate**: Tests that fail intermittently
- **Bug Escape Rate**: Bugs that reach production
- **Test Maintenance Cost**: Time spent on test updates

### Quality Indicators
- **Green Build Rate**: >95% of builds should pass
- **Coverage Trend**: Should increase over time
- **Test Speed**: Unit tests <30s, E2E tests <5min
- **Bug Detection**: Tests should catch 90% of regressions

---

*This testing strategy ensures comprehensive quality assurance across all development phases while maintaining development velocity and preventing regressions.* 
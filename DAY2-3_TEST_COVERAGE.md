# 🧪 DAY 2-3: Critical Test Coverage (4 hours)

## 1. Divine Particles Test (Priority!)

```bash
# Create test file
mkdir -p src/components/__tests__
cat > src/components/__tests__/divine-particles.test.tsx << 'EOF'
import { render, screen, waitFor } from '@/test-utils'
import DivineParticles from '../divine-particles'

// Mock tsparticles
jest.mock('@tsparticles/react', () => ({
  __esModule: true,
  default: ({ id }: any) => <div data-testid={`particles-${id}`} />
}))

jest.mock('@tsparticles/slim', () => ({
  loadSlim: jest.fn().mockResolvedValue(undefined)
}))

describe('DivineParticles', () => {
  it('renders without crashing', () => {
    render(<DivineParticles />)
    expect(screen.getByTestId('particles-tsparticles')).toBeInTheDocument()
  })

  it('handles initialization errors gracefully', async () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation()
    const { loadSlim } = require('@tsparticles/slim')
    loadSlim.mockRejectedValueOnce(new Error('Init failed'))
    
    render(<DivineParticles />)
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        'Particles initialization failed:',
        expect.any(Error)
      )
    })
    
    // Component should still be in DOM
    expect(screen.getByTestId('particles-tsparticles')).toBeInTheDocument()
    consoleSpy.mockRestore()
  })

  it('cleans up on unmount', () => {
    const { unmount } = render(<DivineParticles />)
    expect(() => unmount()).not.toThrow()
  })
})
EOF

# Run the test
npm test divine-particles
```

## 2. Divine Letter Form Test

```bash
cat > src/components/__tests__/divine-letter-form.test.tsx << 'EOF'
import { render, screen, fireEvent, waitFor } from '@/test-utils'
import { DivineLetterForm } from '../divine-letter-form'

// Mock fetch
global.fetch = jest.fn()

describe('DivineLetterForm Error Handling', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear()
  })

  it('handles network failure gracefully', async () => {
    (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'))
    
    render(<DivineLetterForm />)
    
    // Fill form
    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: 'Test User' }
    })
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: 'Test message' }
    })
    
    // Submit
    fireEvent.click(screen.getByRole('button', { name: /send/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
    
    // Form data should be preserved
    expect(screen.getByLabelText(/name/i)).toHaveValue('Test User')
  })

  it('shows success message on successful submission', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    })
    
    render(<DivineLetterForm />)
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: 'test@example.com' }
    })
    fireEvent.click(screen.getByRole('button', { name: /send/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/success|thank you/i)).toBeInTheDocument()
    })
  })

  it('validates required fields', async () => {
    render(<DivineLetterForm />)
    
    // Submit without filling fields
    fireEvent.click(screen.getByRole('button', { name: /send/i }))
    
    await waitFor(() => {
      expect(screen.getByText(/required/i)).toBeInTheDocument()
    })
  })
})
EOF
```

## 3. ClickUp Integration Test

```bash
cat > src/lib/crm/__tests__/clickup-service.test.ts << 'EOF'
import { createContact, updateContact } from '../clickup-service'
import { resilientFetch } from '@/lib/resilient-fetch'

jest.mock('@/lib/resilient-fetch')

describe('ClickUp Service Error Handling', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('handles rate limiting with retry', async () => {
    const mockFetch = resilientFetch as jest.Mock
    
    // First call rate limited
    mockFetch.mockRejectedValueOnce({
      status: 429,
      message: 'Rate limited'
    })
    
    // Retry succeeds
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ id: '123' })
    })
    
    const result = await createContact({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com'
    })
    
    expect(result).toEqual({ id: '123' })
    expect(mockFetch).toHaveBeenCalledTimes(2)
  })

  it('handles API errors gracefully', async () => {
    const mockFetch = resilientFetch as jest.Mock
    mockFetch.mockRejectedValueOnce(new Error('API Error'))
    
    await expect(createContact({
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com'
    })).rejects.toThrow('API Error')
  })
})
EOF
```

## 4. People Page Loading Test

```bash
cat > src/app/people/__tests__/loading.test.tsx << 'EOF'
import { render, screen } from '@/test-utils'
import PeoplePage from '../page'
import { getAllPeople } from '@/data/people'

jest.mock('@/data/people')

describe('People Page Error States', () => {
  it('shows loading state', () => {
    (getAllPeople as jest.Mock).mockImplementation(() => {
      return new Promise(() => {}) // Never resolves
    })
    
    render(<PeoplePage />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('handles empty people list', async () => {
    (getAllPeople as jest.Mock).mockResolvedValueOnce([])
    
    render(<PeoplePage />)
    
    await waitFor(() => {
      expect(screen.getByText(/no people found/i)).toBeInTheDocument()
    })
  })

  it('recovers from error with retry', async () => {
    (getAllPeople as jest.Mock)
      .mockRejectedValueOnce(new Error('Failed to load'))
      .mockResolvedValueOnce([{ id: '1', name: 'Test Person' }])
    
    render(<PeoplePage />)
    
    await waitFor(() => {
      expect(screen.getByText(/error/i)).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByRole('button', { name: /retry/i }))
    
    await waitFor(() => {
      expect(screen.getByText('Test Person')).toBeInTheDocument()
    })
  })
})
EOF
```

## 5. Run Test Coverage Report

```bash
# Run all tests with coverage
npm run test:coverage

# Run specific test suites
npm test -- divine-particles --coverage
npm test -- divine-letter-form --coverage
npm test -- clickup --coverage

# Generate coverage report
npm run test:coverage -- --coverageReporters=html
open coverage/index.html
```

## 📊 Test Coverage Tracking

```bash
# Create coverage tracking script
cat > scripts/track-coverage.js << 'EOF'
const { execSync } = require('child_process')

try {
  const output = execSync('npm run test:coverage -- --json --outputFile=coverage.json', { 
    encoding: 'utf8',
    stdio: 'pipe' 
  })
  
  const coverage = require('./coverage.json')
  const summary = coverage.coverageMap?.total || {}
  
  console.log('📊 TEST COVERAGE REPORT')
  console.log('======================')
  console.log(`Lines:       ${summary.lines?.pct || 0}%`)
  console.log(`Statements:  ${summary.statements?.pct || 0}%`)
  console.log(`Functions:   ${summary.functions?.pct || 0}%`)
  console.log(`Branches:    ${summary.branches?.pct || 0}%`)
  console.log('\n🎯 TARGETS:')
  console.log('Divine Components: 70%')
  console.log('Forms: 80%')
  console.log('Overall: 65%')
} catch (error) {
  console.error('Failed to generate coverage report')
}
EOF

npm pkg set scripts.coverage:track="node scripts/track-coverage.js"
```

## ✅ Day 2-3 Success Metrics

- [ ] Divine particles test passes
- [ ] Form error handling test passes
- [ ] 20% → 50% coverage on divine components
- [ ] 10% → 60% coverage on forms
- [ ] All tests run without errors

## 🚀 Quick Test Commands

```bash
# Run all new tests
npm test -- --testNamePattern="divine|form|clickup" --coverage

# Watch mode for TDD
npm test -- --watch divine-particles

# Quick coverage check
npm test -- --coverage --collectCoverageFrom="src/components/divine-*.tsx"
``` 
# Quick Test for Divine Particles

Save this as `src/components/__tests__/divine-particles.test.tsx`:

```typescript
import { render, screen } from '@testing-library/react';
import DivineParticles from '../divine-particles';

// Mock the particles library
jest.mock('@tsparticles/react', () => ({
  __esModule: true,
  default: ({ id }: any) => <div data-testid={`particles-${id}`} />
}));

jest.mock('@tsparticles/slim', () => ({
  loadSlim: jest.fn().mockResolvedValue(undefined)
}));

// Mock the animation context
jest.mock('@/components/animation-context', () => ({
  useAnimation: () => ({
    shouldSimplifyAnimations: false,
    deviceTier: 'medium',
    isPaused: false
  })
}));

describe('DivineParticles', () => {
  beforeEach(() => {
    // Mock WebGL context
    HTMLCanvasElement.prototype.getContext = jest.fn((type) => {
      if (type === 'webgl' || type === 'experimental-webgl') {
        return { 
          createShader: jest.fn(),
          shaderSource: jest.fn(),
          compileShader: jest.fn()
        };
      }
      return null;
    });
  });

  it('renders without crashing', () => {
    const { container } = render(<DivineParticles />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('initializes particles', async () => {
    render(<DivineParticles />);
    
    // Should render the particles container
    await waitFor(() => {
      expect(screen.getByTestId('particles-tsparticles')).toBeInTheDocument();
    });
  });

  it('handles WebGL not supported', () => {
    // Mock no WebGL support
    HTMLCanvasElement.prototype.getContext = jest.fn(() => null);
    
    const { container } = render(<DivineParticles />);
    
    // Should show fallback
    expect(container.querySelector('.divine-particles-fallback')).toBeInTheDocument();
  });

  it('handles initialization errors gracefully', async () => {
    const { loadSlim } = require('@tsparticles/slim');
    loadSlim.mockRejectedValueOnce(new Error('Init failed'));
    
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    
    render(<DivineParticles />);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('Particles initialization failed'),
        expect.any(Error)
      );
    });
    
    consoleSpy.mockRestore();
  });

  it('reduces particles on low-end devices', () => {
    // Mock low-end device
    jest.spyOn(navigator, 'hardwareConcurrency', 'get').mockReturnValue(2);
    
    const { useAnimation } = require('@/components/animation-context');
    useAnimation.mockReturnValue({
      shouldSimplifyAnimations: false,
      deviceTier: 'low',
      isPaused: false
    });
    
    render(<DivineParticles />);
    
    // Component should still render
    expect(container.firstChild).toBeInTheDocument();
  });
});
```

Run with:
```bash
npm test divine-particles.test.tsx
``` 
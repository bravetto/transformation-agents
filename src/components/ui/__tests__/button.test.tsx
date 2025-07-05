import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { Button } from '../button';

describe('Button Component', () => {
  test('renders with default props', () => {
    render(<Button>Click me</Button>);
    
    const button = screen.getByRole('button', { name: /Click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-hope-gold');
  });

  test('renders with primary variant', () => {
    render(<Button variant="primary">Primary Button</Button>);
    
    const button = screen.getByRole('button', { name: /Primary Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-courage-blue');
  });

  test('renders with success variant', () => {
    render(<Button variant="success">Success Button</Button>);
    
    const button = screen.getByRole('button', { name: /Success Button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-growth-green');
  });

  test('renders with different sizes', () => {
    const { rerender } = render(<Button size="sm">Small Button</Button>);
    
    let button = screen.getByRole('button', { name: /Small Button/i });
    expect(button).toHaveClass('h-9');
    
    rerender(<Button size="lg">Large Button</Button>);
    button = screen.getByRole('button', { name: /Large Button/i });
    expect(button).toHaveClass('h-11');
    
    rerender(<Button size="xl">Extra Large Button</Button>);
    button = screen.getByRole('button', { name: /Extra Large Button/i });
    expect(button).toHaveClass('h-14');
  });

  test('applies full width when specified', () => {
    render(<Button width="full">Full Width Button</Button>);
    
    const button = screen.getByRole('button', { name: /Full Width Button/i });
    expect(button).toHaveClass('w-full');
  });

  test('handles click events', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable Button</Button>);
    
    const button = screen.getByRole('button', { name: /Clickable Button/i });
    await userEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  test('is disabled when disabled prop is true', async () => {
    const handleClick = jest.fn();
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    
    const button = screen.getByRole('button', { name: /Disabled Button/i });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:opacity-50');
    
    await userEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  test('combines className with variant styles', () => {
    render(<Button className="custom-class">Custom Class Button</Button>);
    
    const button = screen.getByRole('button', { name: /Custom Class Button/i });
    expect(button).toHaveClass('custom-class');
    expect(button).toHaveClass('bg-hope-gold'); // Default variant
  });
}); 
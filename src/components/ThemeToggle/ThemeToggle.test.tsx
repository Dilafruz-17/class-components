import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '../../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

function Wrapper() {
  return (
    <ThemeProvider>
      <ThemeToggle />
    </ThemeProvider>
  );
}

describe('ThemeToggle', () => {
  it('should render light mode button initially', () => {
    render(<Wrapper />);
    expect(screen.getByRole('button').textContent).toContain('Dark');
  });

  it('should toggle to light after click', () => {
    render(<Wrapper />);
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByRole('button').textContent).toContain('Light');
  });
});
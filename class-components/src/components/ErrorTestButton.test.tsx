import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ErrorTestButton } from './ErrorTestButton';

describe('ErrorTestButton Component', () => {
  it('Tugma to`g`ri render bo`lishi kerak', () => {
    render(<ErrorTestButton />);
    expect(screen.getByRole('button', { name: /trigger error/i })).toBeInTheDocument();
  });

  it('handleClick metodi chaqirilganda xato tashlashi kerak (Coverage uchun)', () => {
    // Bizga faqat shu test kerak, u 5-qatorni yopadi (coverage beradi)
    const instance = new ErrorTestButton({});
    expect(() => instance.handleClick()).toThrow('Test error');
  });
});
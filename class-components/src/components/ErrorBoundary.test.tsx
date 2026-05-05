import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ErrorBoundary } from './ErrorBoundary';

const ProblemChild = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error('Test xatosi!');
  }
  return <div>Hammasi yaxshi</div>;
};

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  it('Xato bo`lmaganda "children" komponentlarni ko`rsatishi kerak', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );
    expect(screen.getByText(/hammasi yaxshi/i)).toBeInTheDocument();
  });

  it('Xato yuz berganda xato xabarini va Reset tugmasini ko`rsatishi kerak', () => {
    render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /reset/i })).toBeInTheDocument();
  });

  it('Reset tugmasi bosilganda xato holati tiklanishi kerak', () => {
    // 1. Avval xato bilan render qilamiz
    const { rerender } = render(
      <ErrorBoundary>
        <ProblemChild shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();

    // 2. MUHIM: Reset bosishdan oldin bolani "tuzatib" olishimiz kerak (rerender orqali)
    rerender(
      <ErrorBoundary>
        <ProblemChild shouldThrow={false} />
      </ErrorBoundary>
    );

    // 3. Endi Reset tugmasini bosamiz
    const resetButton = screen.getByRole('button', { name: /reset/i });
    fireEvent.click(resetButton);

    // 4. Endi xato xabari yo'qolishi va matn chiqishi kerak
    expect(screen.queryByText(/something went wrong/i)).not.toBeInTheDocument();
    expect(screen.getByText(/hammasi yaxshi/i)).toBeInTheDocument();
  });
});
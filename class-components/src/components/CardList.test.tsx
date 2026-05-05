import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CardList } from './CardList';

describe('CardList Component', () => {
  const mockItems = [
    { name: 'Luke Skywalker', description: 'Jedi Knight' },
    { name: 'Darth Vader', description: 'Sith Lord' },
  ];

  it('Berilgan items ro`yxatidagi barcha kartochkalarni ko`rsatishi kerak', () => {
     
    render(<CardList items={mockItems as any} />);
    
     
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('Agar items bo`sh bo`lsa, hech narsa ko`rsatmasligi kerak (yoki bo`sh xabar)', () => {
    render(<CardList items={[]} />);
    
     
    expect(screen.queryByText('Luke Skywalker')).not.toBeInTheDocument();
  });
});
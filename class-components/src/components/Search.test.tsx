import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Search } from './Search';  

describe('Search Component', () => {
 
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('Inputga yozilganda state yangilanishi kerak', () => {
    render(<Search onSearch={() => {}} />);
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    
    fireEvent.change(input, { target: { value: 'Skywalker' } });
    
    expect(input.value).toBe('Skywalker');
  });

  it('Tugma bosilganda onSearch funksiyasi chaqirilishi va localStorage-ga saqlanishi kerak', () => {
    const mockOnSearch = vi.fn();
    render(<Search onSearch={mockOnSearch} />);
    
    const input = screen.getByPlaceholderText('Search...');
    const button = screen.getByRole('button', { name: /search/i });

    
    fireEvent.change(input, { target: { value: 'R2-D2' } });
    
    fireEvent.click(button);

     
    expect(mockOnSearch).toHaveBeenCalledWith('R2-D2');
    expect(localStorage.getItem('search')).toBe('R2-D2');
  });

  it('Component mount bo`lganda localStorage-dagi qiymatni inputga yuklashi kerak', () => {
    
    localStorage.setItem('search', 'Yoda');
    
    render(<Search onSearch={() => {}} />);
    
    const input = screen.getByPlaceholderText('Search...') as HTMLInputElement;
    
   
    expect(input.value).toBe('Yoda');
  });

  it('Agar inputdagi qiymat localStorage-dagi bilan bir xil bo`lsa, qayta qidirmasligi kerak', () => {
    const mockOnSearch = vi.fn();
    localStorage.setItem('search', 'Vader');
    
    render(<Search onSearch={mockOnSearch} />);
    
    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    
    expect(mockOnSearch).not.toHaveBeenCalled();
  });
});
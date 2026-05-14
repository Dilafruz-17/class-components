import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from './App';
import * as api from './api/api'; 

 
vi.mock('./api/api', () => ({
  fetchItems: vi.fn(),
}));

describe('App Component Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it('Dastlabki yuklanishda Loader ko`rsatishi va keyin ma`lumotlarni chiqarishi kerak', async () => {
    const mockData = [{ name: 'Luke', description: 'Jedi' }];
    (api.fetchItems as any).mockResolvedValue(mockData);

    render(<App />);

     
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    
    await waitFor(() => {
      expect(screen.getByText('Luke')).toBeInTheDocument();
    });
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument();
  });

  it('Qidiruv amalga oshirilganda yangi ma`lumotlarni yuklashi kerak', async () => {
    (api.fetchItems as any).mockResolvedValue([{ name: 'R2-D2', description: 'Droid' }]);
    
    render(<App />);
    
    const input = screen.getByPlaceholderText(/search/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'R2' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(api.fetchItems).toHaveBeenCalledWith('R2');
      expect(screen.getByText('R2-D2')).toBeInTheDocument();
    });
  });

  it('API xato berganda ErrorMessage ko`rsatishi kerak', async () => {
     
    (api.fetchItems as any).mockRejectedValue(new Error('Fetch failed'));

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/failed to load data/i)).toBeInTheDocument();
    });
  });

  it('Hech narsa topilmaganda "No results found" matni chiqishi kerak', async () => {
    (api.fetchItems as any).mockResolvedValue([]); 

    render(<App />);

    await waitFor(() => {
      expect(screen.getByText(/no results found/i)).toBeInTheDocument();
    });
  });
});
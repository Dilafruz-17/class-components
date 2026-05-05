import { describe, it, expect, vi, beforeEach } from 'vitest';
import { fetchItems } from './api';

describe('api.ts (fetchItems function)', () => {
  beforeEach(() => {
  
    vi.stubGlobal('fetch', vi.fn());
  });

  it('Qidiruv so`zi bo`lmaganda (default) asosiy URL-ga so`rov yuborishi kerak', async () => {
    const mockData = {
      results: [
        { name: 'Luke', height: '172', gender: 'male' }
      ]
    };

    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const data = await fetchItems();

    // URL to'g'ri chaqirilganini tekshiramiz
    expect(fetch).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/');
     
    expect(data[0]).toEqual({
      name: 'Luke',
      description: 'Height: 172, Gender: male'
    });
  });

  it('Qidiruv so`zi berilganda URL-ga ?search qo`shishi kerak', async () => {
    const mockData = { results: [] };
    (fetch as any).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    await fetchItems('vader');

    expect(fetch).toHaveBeenCalledWith('https://swapi.py4e.com/api/people/?search=vader');
  });

  it('Agar serverdan xatolik (res.ok emas) kelsa, Error tashlashi kerak', async () => {
    
    (fetch as any).mockResolvedValue({
      ok: false,
    });

    
    await expect(fetchItems('error')).rejects.toThrow('Failed to fetch data');
  });
});
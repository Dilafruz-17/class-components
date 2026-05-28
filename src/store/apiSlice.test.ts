import { describe, it, expect, vi, beforeEach } from 'vitest';
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from './apiSlice';

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  base_experience: 64,
  height: 7,
  weight: 69,
  types: [{ slot: 1, type: { name: 'grass', url: '' } }],
  sprites: { front_default: 'https://example.com/1.png' },
};

const mockListResponse = {
  results: [{ name: 'bulbasaur', url: '' }],
};

function makeMockResponse(data: unknown, ok = true) {
  const body = JSON.stringify(data);
  return new Response(body, {
    status: ok ? 200 : 404,
    headers: { 'Content-Type': 'application/json' },
  });
}

function makeStore() {
  return configureStore({
    reducer: {
      [pokemonApi.reducerPath]: pokemonApi.reducer,
    },
    middleware: (getDefault) => getDefault().concat(pokemonApi.middleware),
  });
}

describe('pokemonApi', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('should fetch pokemon list successfully', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce(makeMockResponse(mockListResponse))
      .mockResolvedValueOnce(makeMockResponse(mockPokemon));

    const store = makeStore();
    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemons.initiate({ query: '', page: 1 })
    );

    expect(result.data).toBeDefined();
    expect(Array.isArray(result.data)).toBe(true);
  });

  it('should fetch single pokemon by name', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce(makeMockResponse(mockPokemon));

    const store = makeStore();
    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemons.initiate({ query: 'bulbasaur', page: 1 })
    );

    expect(result.data).toBeDefined();
    expect(result.data?.[0].name).toBe('bulbasaur');
  });

  it('should fetch pokemon detail', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce(makeMockResponse(mockPokemon));

    const store = makeStore();
    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemonDetail.initiate('bulbasaur')
    );

    expect(result.data).toBeDefined();
    expect(result.data?.name).toBe('bulbasaur');
  });

  it('should handle loading state', () => {
    const store = makeStore();
    const state = store.getState();
    expect(state[pokemonApi.reducerPath]).toBeDefined();
  });

  it('should handle error state', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce(makeMockResponse({}, false));

    const store = makeStore();
    const result = await store.dispatch(
      pokemonApi.endpoints.getPokemonDetail.initiate('unknown-pokemon')
    );

    expect(result.error).toBeDefined();
  });
});
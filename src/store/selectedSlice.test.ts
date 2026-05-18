import { describe, it, expect } from 'vitest';
import reducer, { toggleItem, clearAll } from './selectedSlice';
import { PokemonDetail } from '../types';

const mockPokemon: PokemonDetail = {
  id: 1,
  name: 'bulbasaur',
  base_experience: 64,
  height: 7,
  weight: 69,
  types: [{ slot: 1, type: { name: 'grass', url: '' } }],
  sprites: { front_default: 'https://example.com/1.png' },
};

describe('selectedSlice', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, { type: '' })).toEqual({ items: [] });
  });

  it('should add item on toggleItem', () => {
    const state = reducer(undefined, toggleItem(mockPokemon));
    expect(state.items).toHaveLength(1);
    expect(state.items[0].id).toBe(1);
  });

  it('should remove item if already selected', () => {
    const state1 = reducer(undefined, toggleItem(mockPokemon));
    const state2 = reducer(state1, toggleItem(mockPokemon));
    expect(state2.items).toHaveLength(0);
  });

  it('should clear all items on clearAll', () => {
    const state1 = reducer(undefined, toggleItem(mockPokemon));
    const state2 = reducer(state1, clearAll());
    expect(state2.items).toHaveLength(0);
  });
});
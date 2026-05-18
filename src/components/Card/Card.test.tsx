import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer from '../../store/selectedSlice';
import Card from './Card';
import { PokemonDetail } from '../../types';

const mockPokemon: PokemonDetail = {
  id: 25,
  name: 'pikachu',
  base_experience: 112,
  height: 4,
  weight: 60,
  types: [{ slot: 1, type: { name: 'electric', url: '' } }],
  sprites: { front_default: 'https://example.com/25.png' },
};

function makeStore() {
  return configureStore({ reducer: { selected: selectedReducer } });
}

describe('Card', () => {
  it('should render pokemon name', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <Card pokemon={mockPokemon} onClick={() => {}} />
      </Provider>
    );
    expect(screen.getByText('pikachu')).toBeDefined();
  });

  it('should call onClick when card clicked', () => {
    const store = makeStore();
    const onClick = vi.fn();
    render(
      <Provider store={store}>
        <Card pokemon={mockPokemon} onClick={onClick} />
      </Provider>
    );
    fireEvent.click(screen.getByText('pikachu'));
    expect(onClick).toHaveBeenCalledWith('pikachu');
  });

  it('should select item on checkbox change', () => {
    const store = makeStore();
    render(
      <Provider store={store}>
        <Card pokemon={mockPokemon} onClick={() => {}} />
      </Provider>
    );
    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(store.getState().selected.items).toHaveLength(1);
  });

  it('should not call onClick when checkbox clicked', () => {
    const store = makeStore();
    const onClick = vi.fn();
    render(
      <Provider store={store}>
        <Card pokemon={mockPokemon} onClick={onClick} />
      </Provider>
    );
    fireEvent.click(screen.getByRole('checkbox'));
    expect(onClick).not.toHaveBeenCalled();
  });
});
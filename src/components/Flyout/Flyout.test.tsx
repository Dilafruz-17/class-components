import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import selectedReducer, { toggleItem } from '../../store/selectedSlice';
import Flyout from './Flyout';
import { PokemonDetail } from '../../types';

const mockPokemon: PokemonDetail = {
  id: 1,
  name: 'bulbasaur',
  base_experience: 64,
  height: 7,
  weight: 69,
  types: [{ slot: 1, type: { name: 'grass', url: '' } }],
  sprites: { front_default: 'https://example.com/1.png' },
};

function makeStore(withItem = false) {
  const store = configureStore({ reducer: { selected: selectedReducer } });
  if (withItem) store.dispatch(toggleItem(mockPokemon));
  return store;
}

describe('Flyout', () => {
  it('should not render when no items selected', () => {
    const { container } = render(
      <Provider store={makeStore()}>
        <Flyout />
      </Provider>
    );
    expect(container.firstChild).toBeNull();
  });

  it('should render when item is selected', () => {
    render(
      <Provider store={makeStore(true)}>
        <Flyout />
      </Provider>
    );
    expect(screen.getByText(/1 item/i)).toBeDefined();
  });

  it('should unselect all on button click', () => {
    const store = makeStore(true);
    render(
      <Provider store={store}>
        <Flyout />
      </Provider>
    );
    fireEvent.click(screen.getByText('Unselect all'));
    expect(store.getState().selected.items).toHaveLength(0);
  });

  it('should show correct item count', () => {
    render(
      <Provider store={makeStore(true)}>
        <Flyout />
      </Provider>
    );
    expect(screen.getByText(/1 item\(s\) selected/i)).toBeDefined();
  });

  it('should have download button', () => {
    render(
      <Provider store={makeStore(true)}>
        <Flyout />
      </Provider>
    );
    expect(screen.getByText('Download')).toBeDefined();
  });

  it('should trigger download on button click', () => {
    const createObjectURL = vi.fn(() => 'blob:mock');
    const revokeObjectURL = vi.fn();
    global.URL.createObjectURL = createObjectURL;
    global.URL.revokeObjectURL = revokeObjectURL;

    const clickMock = vi.fn();
    HTMLAnchorElement.prototype.click = clickMock;

    render(
      <Provider store={makeStore(true)}>
        <Flyout />
      </Provider>
    );

    fireEvent.click(screen.getByText('Download'));
    expect(createObjectURL).toHaveBeenCalled();
    expect(clickMock).toHaveBeenCalled();
  });
});
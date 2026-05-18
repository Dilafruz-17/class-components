import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PokemonDetail } from '../types';

interface SelectedState {
  items: PokemonDetail[];
}

const initialState: SelectedState = {
  items: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleItem(state, action: PayloadAction<PokemonDetail>) {
      const exists = state.items.find((i) => i.id === action.payload.id);
      if (exists) {
        state.items = state.items.filter((i) => i.id !== action.payload.id);
      } else {
        state.items.push(action.payload);
      }
    },
    clearAll(state) {
      state.items = [];
    },
  },
});

export const { toggleItem, clearAll } = selectedSlice.actions;
export default selectedSlice.reducer;
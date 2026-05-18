export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonDetail {
  name: string;
  id: number;
  base_experience: number;
  height: number;
  weight: number;
  types: PokemonType[];
  sprites: {
    front_default: string;
  };
}

export interface PokemonType {
  slot: number;
  type: {
    name: string;
    url: string;
  };
}

export interface ApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface SearchState {
  query: string;
  results: PokemonDetail[];
  loading: boolean;
  error: string | null;
}

export interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

export interface ThrowErrorState {
  shouldThrow: boolean;
}
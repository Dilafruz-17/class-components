import { ApiResponse, PokemonDetail } from '../types';

const BASE_URL = 'https://pokeapi.co/api/v2';

export async function fetchPokemons(query: string): Promise<PokemonDetail[]> {
  if (query.trim() === '') {
    const response = await fetch(`${BASE_URL}/pokemon?limit=20&offset=0`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}: Failed to fetch Pokémon list`);
    }
    const data: ApiResponse = await response.json();
    const details = await Promise.all(
      data.results.map((p) => fetchPokemonDetail(p.name))
    );
    return details;
  } else {
    const detail = await fetchPokemonDetail(query.trim().toLowerCase());
    return [detail];
  }
}

export async function fetchPokemonDetail(name: string): Promise<PokemonDetail> {
  const response = await fetch(`${BASE_URL}/pokemon/${name}`);
  if (!response.ok) {
    throw new Error(`Error ${response.status}: Pokémon "${name}" not found`);
  }
  const data: PokemonDetail = await response.json();
  return data;
}
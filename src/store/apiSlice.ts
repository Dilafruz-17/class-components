import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PokemonDetail, ApiResponse } from '../types';

const TTL = Number(import.meta.env.VITE_CACHE_TTL) || 60;

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://pokeapi.co/api/v2',
  }),
  keepUnusedDataFor: TTL,
  endpoints: (builder) => ({
    getPokemons: builder.query<PokemonDetail[], { query: string; page: number }>({
      async queryFn({ query, page }, _api, _extra, baseQuery) {
        if (query.trim() === '') {
          const limit = 20;
          const offset = (page - 1) * limit;
          const listResult = await baseQuery(
            `/pokemon?limit=${limit}&offset=${offset}`
          );
          if (listResult.error) return { error: listResult.error };
          const data = listResult.data as ApiResponse;
          const details = await Promise.all(
            data.results.map(async (p) => {
              const res = await baseQuery(`/pokemon/${p.name}`);
              return res.data as PokemonDetail;
            })
          );
          return { data: details };
        } else {
          const result = await baseQuery(
            `/pokemon/${query.trim().toLowerCase()}`
          );
          if (result.error) return { error: result.error };
          return { data: [result.data as PokemonDetail] };
        }
      },
    }),
    getPokemonDetail: builder.query<PokemonDetail, string>({
      query: (name) => `/pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonsQuery, useGetPokemonDetailQuery } = pokemonApi;
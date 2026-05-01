import type { Pokemon } from "@/core/entities/Pokemon";
import type {
  PokemonListResponseDTO,
  PokemonResponseDTO,
} from "@/data/dto/PokemonResponseDTO";
import { PokemonMapper } from "@/data/mappers/PokemonMapper";
import {
  getPokeApiResource,
  POKE_API_REVALIDATE_SECONDS,
} from "@/services/pokeApi";

const DEFAULT_POKEMON_LIMIT = 151;

export interface PokemonRepository {
  getPokemonList(limit?: number): Promise<Pokemon[]>;
  getPokemonByName(name: string): Promise<Pokemon>;
  getPokemonNames(limit?: number): Promise<string[]>;
}

export class PokeApiPokemonRepository implements PokemonRepository {
  async getPokemonList(limit = DEFAULT_POKEMON_LIMIT): Promise<Pokemon[]> {
    const { results } = await getPokeApiResource<PokemonListResponseDTO>(
      `/pokemon?limit=${limit}&offset=0`,
      {
        cache: "force-cache",
        next: {
          revalidate: POKE_API_REVALIDATE_SECONDS,
          tags: ["pokemon-list"],
        },
      },
    );

    const pokemons = await Promise.all(
      results.map(({ name }) => this.getPokemonByName(name)),
    );

    return pokemons.sort((left, right) => left.id - right.id);
  }

  async getPokemonByName(name: string): Promise<Pokemon> {
    const sanitizedName = name.trim().toLowerCase();

    const pokemon = await getPokeApiResource<PokemonResponseDTO>(
      `/pokemon/${encodeURIComponent(sanitizedName)}`,
      {
        cache: "force-cache",
        next: {
          revalidate: POKE_API_REVALIDATE_SECONDS,
          tags: [`pokemon-${sanitizedName}`],
        },
      },
    );

    return PokemonMapper.toDomain(pokemon);
  }

  async getPokemonNames(limit = DEFAULT_POKEMON_LIMIT): Promise<string[]> {
    const { results } = await getPokeApiResource<PokemonListResponseDTO>(
      `/pokemon?limit=${limit}&offset=0`,
      {
        cache: "force-cache",
        next: {
          revalidate: POKE_API_REVALIDATE_SECONDS,
          tags: ["pokemon-list"],
        },
      },
    );

    return results.map(({ name }) => name);
  }
}

export const pokemonRepository = new PokeApiPokemonRepository();

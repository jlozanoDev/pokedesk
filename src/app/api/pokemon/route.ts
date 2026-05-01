import { NextResponse } from "next/server";

import { pokemonRepository } from "@/data/repositories/PokemonRepository";

const KANTO_POKEMON_TOTAL = 151;
const DEFAULT_PAGE_SIZE = 24;

const parseBoundedNumber = (
  value: string | null,
  fallback: number,
  max: number,
) => {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 0) {
    return fallback;
  }

  return Math.min(parsedValue, max);
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const offset = parseBoundedNumber(
    searchParams.get("offset"),
    0,
    KANTO_POKEMON_TOTAL,
  );
  const requestedLimit = parseBoundedNumber(
    searchParams.get("limit"),
    DEFAULT_PAGE_SIZE,
    DEFAULT_PAGE_SIZE,
  );
  const limit = Math.min(requestedLimit, KANTO_POKEMON_TOTAL - offset);

  const pokemons =
    limit > 0
      ? await pokemonRepository.getPokemonList({
          limit,
          offset,
        })
      : [];
  const nextOffset = offset + pokemons.length;

  return NextResponse.json({
    hasMore: nextOffset < KANTO_POKEMON_TOTAL,
    nextOffset,
    pokemons,
  });
}

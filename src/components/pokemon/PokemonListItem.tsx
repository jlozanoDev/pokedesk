import Image from "next/image";
import Link from "next/link";

import type { Pokemon } from "@/core/entities/Pokemon";
import {
  formatPokemonHeight,
  formatPokemonId,
  formatPokemonName,
  formatPokemonWeight,
} from "@/utils/formatPokemon";
import { getPokemonTypeSurfaceClass } from "@/utils/pokemonTypeStyles";

import { TypeBadge } from "../ui/TypeBadge";

interface PokemonListItemProps {
  pokemon: Pokemon;
}

export const PokemonListItem = ({ pokemon }: PokemonListItemProps) => {
  const primaryType = pokemon.types[0] ?? "normal";

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className={`group relative grid min-h-20 cursor-pointer grid-cols-[4rem_1fr] items-center gap-3 rounded-lg border border-white/70 bg-gradient-to-r ${getPokemonTypeSurfaceClass(
        primaryType,
      )} px-3 py-2 pr-28 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md sm:grid-cols-[4.5rem_minmax(11rem,1fr)] sm:items-center sm:gap-4 sm:pr-48`}
    >
      <div className="relative flex aspect-square items-center justify-center rounded-md bg-white/55">
        <Image
          src={pokemon.image}
          alt={formatPokemonName(pokemon.name)}
          width={72}
          height={72}
          className="h-full w-full object-contain p-1.5 transition duration-200 group-hover:scale-105"
        />
      </div>

      <div className="min-w-0">
        <p className="font-mono text-xs font-medium text-muted">
          {formatPokemonId(pokemon.id)}
        </p>
        <h2 className="truncate text-lg font-bold text-foreground">
          {formatPokemonName(pokemon.name)}
        </h2>
        <dl className="mt-1 flex items-center gap-3 text-xs text-muted">
          <div className="flex items-baseline gap-1.5">
            <dt className="font-mono uppercase tracking-[0.12em]">H</dt>
            <dd className="font-semibold text-foreground/80">
              {formatPokemonHeight(pokemon.height)}
            </dd>
          </div>
          <div className="flex items-baseline gap-1.5">
            <dt className="font-mono uppercase tracking-[0.12em]">W</dt>
            <dd className="font-semibold text-foreground/80">
              {formatPokemonWeight(pokemon.weight)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="absolute right-3 top-2 flex max-w-24 flex-col items-end gap-1.5 sm:max-w-none sm:flex-row sm:gap-2">
        {pokemon.types.map((type) => (
          <TypeBadge key={type} type={type} />
        ))}
      </div>

    </Link>
  );
};

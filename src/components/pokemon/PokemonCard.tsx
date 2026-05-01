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

interface PokemonCardProps {
  pokemon: Pokemon;
}

export const PokemonCard = ({ pokemon }: PokemonCardProps) => {
  const primaryType = pokemon.types[0] ?? "normal";

  return (
    <Link
      href={`/pokemon/${pokemon.name}`}
      className={`group relative cursor-pointer overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br ${getPokemonTypeSurfaceClass(
        primaryType,
      )} p-5 shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-2xl`}
    >
      <div className="absolute right-0 top-0 h-28 w-28 translate-x-8 -translate-y-8 rounded-full bg-white/40 blur-2xl transition duration-300 group-hover:scale-125" />
      <div className="relative flex flex-col gap-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-sm font-medium text-muted">
              {formatPokemonId(pokemon.id)}
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              {formatPokemonName(pokemon.name)}
            </h2>
          </div>
          <div className="rounded-full border border-black/5 bg-white/70 px-3 py-1 font-mono text-xs font-semibold uppercase tracking-[0.22em] text-muted">
            Base
          </div>
        </div>

        <div className="relative mx-auto flex h-44 w-full max-w-[14rem] items-center justify-center">
          <div className="absolute inset-x-6 bottom-5 h-6 rounded-full bg-slate-900/10 blur-xl" />
          <Image
            src={pokemon.image}
            alt={formatPokemonName(pokemon.name)}
            width={240}
            height={240}
            className="relative h-full w-full object-contain drop-shadow-[0_18px_30px_rgba(15,23,42,0.25)] transition duration-300 group-hover:scale-[1.04]"
            priority={pokemon.id <= 12}
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <TypeBadge key={type} type={type} />
          ))}
        </div>

        <dl className="grid grid-cols-2 gap-3 text-sm text-muted">
          <div className="rounded-2xl border border-white/70 bg-white/60 p-3">
            <dt className="font-mono uppercase tracking-[0.2em]">Height</dt>
            <dd className="mt-2 text-lg font-semibold text-foreground">
              {formatPokemonHeight(pokemon.height)}
            </dd>
          </div>
          <div className="rounded-2xl border border-white/70 bg-white/60 p-3">
            <dt className="font-mono uppercase tracking-[0.2em]">Weight</dt>
            <dd className="mt-2 text-lg font-semibold text-foreground">
              {formatPokemonWeight(pokemon.weight)}
            </dd>
          </div>
        </dl>
      </div>
    </Link>
  );
};

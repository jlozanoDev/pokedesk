import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { TypeBadge } from "@/components/ui/TypeBadge";
import { pokemonRepository } from "@/data/repositories/PokemonRepository";
import { PokeApiNotFoundError } from "@/services/pokeApi";
import {
  formatPokemonHeight,
  formatPokemonId,
  formatPokemonName,
  formatPokemonWeight,
} from "@/utils/formatPokemon";
import { getPokemonTypeSurfaceClass } from "@/utils/pokemonTypeStyles";

export const revalidate = 60 * 60;
export const dynamicParams = true;

interface PokemonDetailPageProps {
  params: Promise<{
    name: string;
  }>;
}

const getPokemonOrNotFound = async (name: string) => {
  try {
    return await pokemonRepository.getPokemonByName(name);
  } catch (error) {
    if (error instanceof PokeApiNotFoundError) {
      notFound();
    }

    throw error;
  }
};

export async function generateStaticParams() {
  const names = await pokemonRepository.getPokemonNames(151);

  return names.map((name) => ({ name }));
}

export async function generateMetadata({
  params,
}: PokemonDetailPageProps): Promise<Metadata> {
  const { name } = await params;

  try {
    const pokemon = await pokemonRepository.getPokemonByName(name);

    return {
      title: formatPokemonName(pokemon.name),
      description: `Ficha de ${formatPokemonName(
        pokemon.name,
      )} con tipos, estadísticas base y artwork oficial.`,
    };
  } catch {
    return {
      title: "Pokémon no encontrado",
    };
  }
}

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { name } = await params;
  const pokemon = await getPokemonOrNotFound(name);
  const primaryType = pokemon.types[0] ?? "normal";
  const statEntries = [
    { label: "HP", value: pokemon.stats.hp },
    { label: "Attack", value: pokemon.stats.attack },
    { label: "Defense", value: pokemon.stats.defense },
    { label: "Speed", value: pokemon.stats.speed },
  ];

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="inline-flex w-fit items-center rounded-full border border-black/10 bg-white/70 px-4 py-2 text-sm font-medium text-muted transition hover:bg-white"
      >
        Volver a la Pokédex
      </Link>

      <section
        className={`mt-6 overflow-hidden rounded-[2rem] border border-white/70 bg-gradient-to-br ${getPokemonTypeSurfaceClass(
          primaryType,
        )} shadow-[var(--shadow-soft)]`}
      >
        <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
          <div>
            <p className="font-mono text-sm font-medium uppercase tracking-[0.32em] text-muted">
              {formatPokemonId(pokemon.id)}
            </p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              {formatPokemonName(pokemon.name)}
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-muted">
              Entidad de dominio ya normalizada desde PokéAPI, lista para ser
              consumida por la UI sin acoplarla a la estructura externa.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              {pokemon.types.map((type) => (
                <TypeBadge key={type} type={type} />
              ))}
            </div>

            <dl className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              <div className="rounded-[1.5rem] border border-white/70 bg-white/65 p-4">
                <dt className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                  Height
                </dt>
                <dd className="mt-2 text-xl font-semibold text-foreground">
                  {formatPokemonHeight(pokemon.height)}
                </dd>
              </div>
              <div className="rounded-[1.5rem] border border-white/70 bg-white/65 p-4">
                <dt className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                  Weight
                </dt>
                <dd className="mt-2 text-xl font-semibold text-foreground">
                  {formatPokemonWeight(pokemon.weight)}
                </dd>
              </div>
              <div className="rounded-[1.5rem] border border-white/70 bg-white/65 p-4">
                <dt className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                  Primary
                </dt>
                <dd className="mt-2 text-xl font-semibold text-foreground">
                  {formatPokemonName(primaryType)}
                </dd>
              </div>
              <div className="rounded-[1.5rem] border border-white/70 bg-white/65 p-4">
                <dt className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                  Total Core
                </dt>
                <dd className="mt-2 text-xl font-semibold text-foreground">
                  {statEntries.reduce((sum, stat) => sum + stat.value, 0)}
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative flex items-center justify-center rounded-[2rem] border border-white/60 bg-white/45 p-6">
            <div className="absolute inset-x-10 bottom-8 h-8 rounded-full bg-slate-900/10 blur-2xl" />
            <Image
              src={pokemon.image}
              alt={formatPokemonName(pokemon.name)}
              width={420}
              height={420}
              className="relative h-auto w-full max-w-sm object-contain drop-shadow-[0_24px_35px_rgba(15,23,42,0.24)]"
              priority
            />
          </div>
        </div>
      </section>

      <section className="mt-8 rounded-[2rem] border border-white/70 bg-surface/90 p-6 shadow-[var(--shadow-soft)] sm:p-8">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="font-mono text-sm uppercase tracking-[0.26em] text-muted">
              Base stats
            </p>
            <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">
              Indicadores principales
            </h2>
          </div>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {statEntries.map((stat) => (
            <div
              key={stat.label}
              className="rounded-[1.5rem] border border-black/5 bg-white/75 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-sm uppercase tracking-[0.24em] text-muted">
                  {stat.label}
                </span>
                <span className="text-lg font-semibold text-foreground">
                  {stat.value}
                </span>
              </div>
              <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${getPokemonTypeSurfaceClass(
                    primaryType,
                  )}`}
                  style={{ width: `${Math.min(stat.value, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

import { PokemonCard } from "@/components/pokemon/PokemonCard";
import { pokemonRepository } from "@/data/repositories/PokemonRepository";

export const revalidate = 60 * 60;

export default async function HomePage() {
  const pokemons = await pokemonRepository.getPokemonList(151);

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/70 bg-surface/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur sm:p-8">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.32em] text-muted">
          Kanto Index
        </p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Pokédex Pro con arquitectura limpia y datos desacoplados.
            </h1>
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              Los componentes solo consumen la entidad de dominio. Toda la
              traducción desde PokéAPI vive en la capa de datos y el
              repositorio.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-black/5 bg-white/70 px-5 py-4">
            <p className="font-mono text-sm uppercase tracking-[0.26em] text-muted">
              Static roster
            </p>
            <p className="mt-2 text-3xl font-bold text-foreground">151</p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      </section>
    </main>
  );
}

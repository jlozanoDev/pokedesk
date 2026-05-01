import { PokemonViewSwitcher } from "@/components/pokemon/PokemonViewSwitcher";
import { pokemonRepository } from "@/data/repositories/PokemonRepository";

export const revalidate = 60 * 60;

const KANTO_POKEMON_TOTAL = 151;
const POKEMON_PAGE_SIZE = 24;

export default async function HomePage() {
  const pokemons = await pokemonRepository.getPokemonList({
    limit: POKEMON_PAGE_SIZE,
    offset: 0,
  });

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-[2rem] border border-white/70 bg-surface/90 p-6 shadow-[var(--shadow-soft)] backdrop-blur sm:p-8">
        <p className="font-mono text-sm font-semibold uppercase tracking-[0.32em] text-muted">
          Base de Datos Global
        </p>
        <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="h-10 w-10 shrink-0 text-red-500 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] sm:h-12 sm:w-12" fill="currentColor">
                <path d="M50 0a50 50 0 1 0 0 100A50 50 0 0 0 50 0zm0 90a40 40 0 1 1 0-80 40 40 0 0 1 0 80z" />
                <path d="M50 35a15 15 0 1 0 0 30 15 15 0 0 0 0-30zm0 25a10 10 0 1 1 0-20 10 10 0 0 1 0 20z" />
                <path d="M10 54h30a10 10 0 0 0 20 0h30v-8H60a10 10 0 0 0-20 0H10v8z" />
              </svg>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:whitespace-nowrap">
                Enciclopedia Nacional de Pokémon
              </h1>
            </div>
            <p className="mt-4 text-base leading-7 text-muted sm:text-lg">
              Explora el mundo Pokémon, analiza sus tipos y descubre todas sus estadísticas. Una herramienta de consulta indispensable para cualquier Entrenador.
            </p>
          </div>
          <div className="rounded-[1.75rem] border border-border bg-surface px-5 py-4">
            <p className="font-mono text-sm uppercase tracking-[0.26em] text-muted">
              Región Kanto
            </p>
            <p className="mt-2 text-3xl font-bold text-foreground">
              {KANTO_POKEMON_TOTAL}
            </p>
          </div>
        </div>
      </section>

      <section className="mt-8">
        <PokemonViewSwitcher
          initialPokemons={pokemons}
          pageSize={POKEMON_PAGE_SIZE}
          totalCount={KANTO_POKEMON_TOTAL}
        />
      </section>
    </main>
  );
}

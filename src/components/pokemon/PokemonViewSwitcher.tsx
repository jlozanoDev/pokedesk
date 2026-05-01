"use client";

import {
  useDeferredValue,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";

import type { Pokemon } from "@/core/entities/Pokemon";

import { PokemonCard } from "./PokemonCard";
import { PokemonListItem } from "./PokemonListItem";

type PokemonViewMode = "cards" | "list";

interface PokemonViewSwitcherProps {
  initialPokemons: Pokemon[];
  pageSize: number;
  totalCount: number;
}

interface PokemonListApiResponse {
  hasMore: boolean;
  nextOffset: number;
  pokemons: Pokemon[];
}

const viewOptions: Array<{
  label: string;
  mode: PokemonViewMode;
}> = [
  { label: "Cards", mode: "cards" },
  { label: "Lista", mode: "list" },
];

export const PokemonViewSwitcher = ({
  initialPokemons,
  pageSize,
  totalCount,
}: PokemonViewSwitcherProps) => {
  const [viewMode, setViewMode] = useState<PokemonViewMode>("cards");
  const [pokemons, setPokemons] = useState<Pokemon[]>(initialPokemons);
  const [searchTerm, setSearchTerm] = useState("");
  const [nextOffset, setNextOffset] = useState(initialPokemons.length);
  const [hasMore, setHasMore] = useState(initialPokemons.length < totalCount);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isPending, startTransition] = useTransition();
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const isLoadingRef = useRef(false);
  const deferredSearchTerm = useDeferredValue(searchTerm);
  const normalizedSearchTerm = deferredSearchTerm.trim().toLowerCase();
  const visiblePokemons = normalizedSearchTerm
    ? pokemons.filter((pokemon) => {
        const formattedId = pokemon.id.toString().padStart(3, "0");

        return (
          pokemon.name.toLowerCase().includes(normalizedSearchTerm) ||
          formattedId.includes(normalizedSearchTerm) ||
          pokemon.types.some((type) =>
            type.toLowerCase().includes(normalizedSearchTerm),
          )
        );
      })
    : pokemons;

  useEffect(() => {
    const loadMoreTarget = loadMoreRef.current;

    if (!loadMoreTarget || !hasMore) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting || isLoadingRef.current) {
          return;
        }

        isLoadingRef.current = true;
        setIsLoadingMore(true);
        setErrorMessage(null);

        fetch(`/api/pokemon?limit=${pageSize}&offset=${nextOffset}`)
          .then((response) => {
            if (!response.ok) {
              throw new Error("No se pudo cargar el siguiente bloque.");
            }

            return response.json() as Promise<PokemonListApiResponse>;
          })
          .then((data) => {
            startTransition(() => {
              setPokemons((currentPokemons) => [
                ...currentPokemons,
                ...data.pokemons,
              ]);
              setNextOffset(data.nextOffset);
              setHasMore(data.hasMore);
            });
          })
          .catch(() => {
            setErrorMessage("No se pudo cargar mas Pokemon.");
          })
          .finally(() => {
            isLoadingRef.current = false;
            setIsLoadingMore(false);
          });
      },
      {
        rootMargin: "480px 0px",
      },
    );

    observer.observe(loadMoreTarget);

    return () => observer.disconnect();
  }, [hasMore, nextOffset, pageSize]);

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <label className="relative w-full sm:max-w-xs">
          <span className="sr-only">Buscar Pokemon</span>
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Buscar Pokemon"
            className="h-12 w-full rounded-lg border border-border bg-white/75 pl-10 pr-4 text-sm font-medium text-foreground shadow-sm outline-none transition placeholder:text-muted focus:border-foreground/30 focus:bg-white"
          />
        </label>

        <div
          className="inline-grid grid-cols-2 rounded-lg border border-border bg-white/75 p-1 shadow-sm"
          aria-label="Cambiar vista de Pokemon"
        >
          {viewOptions.map((option) => {
            const isActive = viewMode === option.mode;

            return (
              <button
                key={option.mode}
                type="button"
                className={`flex h-10 cursor-pointer items-center gap-2 rounded-md px-4 text-sm font-semibold transition ${
                  isActive
                    ? "bg-foreground text-white shadow-sm"
                    : "text-muted hover:bg-white"
                }`}
                aria-pressed={isActive}
                onClick={() => setViewMode(option.mode)}
              >
                <span
                  className={`grid h-4 w-4 gap-0.5 ${
                    option.mode === "cards" ? "grid-cols-2" : "grid-cols-1"
                  }`}
                  aria-hidden="true"
                >
                  <span className="rounded-sm bg-current" />
                  <span className="rounded-sm bg-current" />
                  {option.mode === "cards" ? (
                    <>
                      <span className="rounded-sm bg-current" />
                      <span className="rounded-sm bg-current" />
                    </>
                  ) : null}
                </span>
                {option.label}
              </button>
            );
          })}
        </div>
      </div>

      {viewMode === "cards" ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visiblePokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {visiblePokemons.map((pokemon) => (
            <PokemonListItem key={pokemon.id} pokemon={pokemon} />
          ))}
        </div>
      )}

      {visiblePokemons.length === 0 ? (
        <p className="rounded-lg border border-border bg-white/70 px-4 py-6 text-center text-sm font-medium text-muted">
          No hay Pokemon cargados que coincidan con la busqueda.
        </p>
      ) : null}

      <div ref={loadMoreRef} className="flex min-h-14 items-center justify-center">
        {hasMore ? (
          <p className="rounded-full border border-border bg-white/70 px-4 py-2 text-sm font-medium text-muted shadow-sm">
            {isPending || isLoadingMore
              ? "Cargando Pokemon..."
              : "Desplazate para cargar mas"}
          </p>
        ) : (
          <p className="text-sm font-medium text-muted">
            Se han cargado los {totalCount} Pokemon de Kanto.
          </p>
        )}
      </div>

      {errorMessage ? (
        <p className="text-center text-sm font-semibold text-red-600">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
};

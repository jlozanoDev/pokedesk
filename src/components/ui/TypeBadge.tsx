import { formatPokemonName } from "@/utils/formatPokemon";
import { getPokemonTypeBadgeClass } from "@/utils/pokemonTypeStyles";

interface TypeBadgeProps {
  type: string;
}

export const TypeBadge = ({ type }: TypeBadgeProps) => (
  <span
    className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] shadow-sm ${getPokemonTypeBadgeClass(
      type,
    )}`}
  >
    {formatPokemonName(type)}
  </span>
);

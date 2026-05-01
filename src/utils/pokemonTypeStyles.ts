const badgeTypeStyles: Record<string, string> = {
  bug: "bg-[var(--type-bug)] text-lime-950",
  dark: "bg-[var(--type-dark)] text-stone-50",
  dragon: "bg-[var(--type-dragon)] text-indigo-50",
  electric: "bg-[var(--type-electric)] text-amber-950",
  fairy: "bg-[var(--type-fairy)] text-rose-950",
  fighting: "bg-[var(--type-fighting)] text-red-50",
  fire: "bg-[var(--type-fire)] text-orange-950",
  flying: "bg-[var(--type-flying)] text-violet-950",
  ghost: "bg-[var(--type-ghost)] text-purple-50",
  grass: "bg-[var(--type-grass)] text-lime-950",
  ground: "bg-[var(--type-ground)] text-amber-950",
  ice: "bg-[var(--type-ice)] text-cyan-950",
  normal: "bg-[var(--type-normal)] text-stone-950",
  poison: "bg-[var(--type-poison)] text-fuchsia-50",
  psychic: "bg-[var(--type-psychic)] text-rose-50",
  rock: "bg-[var(--type-rock)] text-yellow-950",
  steel: "bg-[var(--type-steel)] text-slate-900",
  water: "bg-[var(--type-water)] text-blue-50",
};

const surfaceTypeStyles: Record<string, string> = {
  bug: "from-[color:var(--type-bug)]/30 to-white",
  dark: "from-[color:var(--type-dark)]/28 to-white",
  dragon: "from-[color:var(--type-dragon)]/28 to-white",
  electric: "from-[color:var(--type-electric)]/30 to-white",
  fairy: "from-[color:var(--type-fairy)]/28 to-white",
  fighting: "from-[color:var(--type-fighting)]/26 to-white",
  fire: "from-[color:var(--type-fire)]/28 to-white",
  flying: "from-[color:var(--type-flying)]/28 to-white",
  ghost: "from-[color:var(--type-ghost)]/28 to-white",
  grass: "from-[color:var(--type-grass)]/28 to-white",
  ground: "from-[color:var(--type-ground)]/28 to-white",
  ice: "from-[color:var(--type-ice)]/30 to-white",
  normal: "from-[color:var(--type-normal)]/28 to-white",
  poison: "from-[color:var(--type-poison)]/28 to-white",
  psychic: "from-[color:var(--type-psychic)]/28 to-white",
  rock: "from-[color:var(--type-rock)]/28 to-white",
  steel: "from-[color:var(--type-steel)]/30 to-white",
  water: "from-[color:var(--type-water)]/28 to-white",
};

export const getPokemonTypeBadgeClass = (type: string): string =>
  badgeTypeStyles[type.toLowerCase()] ?? "bg-slate-200 text-slate-900";

export const getPokemonTypeSurfaceClass = (type: string): string =>
  surfaceTypeStyles[type.toLowerCase()] ?? "from-slate-200/40 to-white";

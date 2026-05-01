export const formatPokemonId = (id: number): string =>
  `#${id.toString().padStart(3, "0")}`;

export const formatPokemonName = (name: string): string =>
  name
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");

export const formatPokemonHeight = (height: number): string =>
  `${height.toFixed(1)} m`;

export const formatPokemonWeight = (weight: number): string =>
  `${weight.toFixed(1)} kg`;

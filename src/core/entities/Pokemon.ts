export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  speed: number;
}

export interface Pokemon {
  id: number;
  name: string;
  image: string;
  types: string[];
  stats: PokemonStats;
  height: number;
  weight: number;
}

export interface NamedApiResourceDTO {
  name: string;
  url: string;
}

export interface PokemonListResponseDTO {
  results: NamedApiResourceDTO[];
}

export interface PokemonTypeSlotDTO {
  slot: number;
  type: NamedApiResourceDTO;
}

export interface PokemonStatDTO {
  base_stat: number;
  stat: NamedApiResourceDTO;
}

export interface PokemonSpritesDTO {
  other?: {
    "official-artwork"?: {
      front_default: string | null;
    };
  };
}

export interface PokemonResponseDTO {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: PokemonSpritesDTO;
  stats: PokemonStatDTO[];
  types: PokemonTypeSlotDTO[];
}

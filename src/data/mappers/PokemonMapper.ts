import type { Pokemon } from "@/core/entities/Pokemon";
import type {
  PokemonResponseDTO,
  PokemonStatDTO,
} from "@/data/dto/PokemonResponseDTO";

const OFFICIAL_ARTWORK_BASE_URL =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork";

const getStatValue = (stats: PokemonStatDTO[], statName: string): number =>
  stats.find(({ stat }) => stat.name === statName)?.base_stat ?? 0;

export class PokemonMapper {
  static toDomain(dto: PokemonResponseDTO): Pokemon {
    const image =
      dto.sprites.other?.["official-artwork"]?.front_default ??
      `${OFFICIAL_ARTWORK_BASE_URL}/${dto.id}.png`;

    return {
      id: dto.id,
      name: dto.name,
      image,
      types: [...dto.types]
        .sort((left, right) => left.slot - right.slot)
        .map(({ type }) => type.name),
      stats: {
        hp: getStatValue(dto.stats, "hp"),
        attack: getStatValue(dto.stats, "attack"),
        defense: getStatValue(dto.stats, "defense"),
        speed: getStatValue(dto.stats, "speed"),
      },
      height: dto.height / 10,
      weight: dto.weight / 10,
    };
  }
}

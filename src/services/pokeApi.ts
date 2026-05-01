const POKE_API_BASE_URL = "https://pokeapi.co/api/v2/";

export const POKE_API_REVALIDATE_SECONDS = 60 * 60;

export interface NextFetchOptions extends RequestInit {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

export class PokeApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "PokeApiError";
  }
}

export class PokeApiNotFoundError extends PokeApiError {
  constructor(message: string) {
    super(message, 404);
    this.name = "PokeApiNotFoundError";
  }
}

export const getPokeApiResource = async <T>(
  resourcePath: string,
  init?: NextFetchOptions,
): Promise<T> => {
  const normalizedPath = resourcePath.replace(/^\//, "");
  const resourceUrl = new URL(normalizedPath, POKE_API_BASE_URL);

  const response = await fetch(resourceUrl, init);

  if (!response.ok) {
    if (response.status === 404) {
      throw new PokeApiNotFoundError(
        `No se encontró el recurso solicitado en PokéAPI: ${resourcePath}`,
      );
    }

    throw new PokeApiError(
      `PokéAPI devolvió un error inesperado (${response.status}) para ${resourcePath}`,
      response.status,
    );
  }

  return (await response.json()) as T;
};

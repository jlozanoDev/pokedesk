# Implementación base de Pokédex

## Objetivo

Construir una base escalable para una Pokédex en Next.js separando dominio, datos y presentación, de modo que la UI nunca dependa de la forma cruda de la PokéAPI.

## Decisiones tomadas

1. Se migró el App Router desde `app/` a `src/app` para alinear la estructura con la convención arquitectónica del proyecto.
2. La entidad de dominio `Pokemon` vive en `src/core/entities` y expone un modelo limpio con estadísticas normalizadas.
3. La PokéAPI queda encapsulada en `src/data` mediante DTOs, `PokemonMapper` y un repositorio con caché nativa de Next.js.
4. Se añadió `src/services/pokeApi.ts` para concentrar la configuración de fetch, revalidación y manejo de errores.
5. La generación estática se configuró para los primeros 151 Pokémon con `generateStaticParams` y revalidación por hora.

## Resultado

- La home renderiza un grid de tarjetas a partir de entidades de dominio.
- La página de detalle consume la misma entidad y no conoce ningún DTO externo.
- La configuración de imágenes remotas ya permite usar el artwork oficial desde `raw.githubusercontent.com`.

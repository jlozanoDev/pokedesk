# Changelog

Todos los cambios importantes de este proyecto se documentarán en este archivo.

El formato está basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
y este proyecto sigue versionado de forma incremental.

## [Unreleased]

### Added
- Base de Pokédex en `src/` con Clean Architecture: entidad `Pokemon`, DTOs, mapper y repositorio desacoplado de la UI.
- Página principal y detalle dinámico en App Router con Server Components y generación estática para los primeros 151 Pokémon.
- Componentes de presentación `TypeBadge` y `PokemonCard` con `next/image` y estilos mobile-first en Tailwind.
- Capa de servicios para centralizar fetch, caché de Next.js y errores de integración con PokéAPI.

### Changed
- Migración de la app desde el scaffold inicial de `app/` en raíz hacia `src/app`.
- Configuración de `next.config.ts` para permitir imágenes remotas desde `raw.githubusercontent.com`.
- Ajuste de alias TypeScript `@/*` para resolver contra `src/*`.

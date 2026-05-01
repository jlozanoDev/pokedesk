# Changelog

Todos los cambios importantes de este proyecto se documentaran en este archivo.

El formato esta basado en [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/)
y este proyecto sigue versionado de forma incremental.

## [Unreleased]

### Added
- Buscador en la barra de controles de la pagina principal junto al selector cards/lista.
- Carga perezosa por scroll en la pagina principal para los modos card y lista.
- Selector de vista en la pagina principal para alternar entre modo cards y modo lista horizontal.
- Base de Pokedex en `src/` con Clean Architecture: entidad `Pokemon`, DTOs, mapper y repositorio desacoplado de la UI.
- Pagina principal y detalle dinamico en App Router con Server Components y generacion estatica para los primeros 151 Pokemon.
- Componentes de presentacion `TypeBadge` y `PokemonCard` con `next/image` y estilos mobile-first en Tailwind.
- Capa de servicios para centralizar fetch, cache de Next.js y errores de integracion con PokeAPI.

### Changed
- Ajuste del hero principal para mantener el titulo en una sola linea en escritorio.
- Los controles interactivos de vista y las filas/tarjetas de Pokemon muestran cursor de accion.
- Ajuste del modo lista para usar filas mas estrechas, con altura y peso debajo del nombre y badges posicionados arriba a la derecha.
- Migracion de la app desde el scaffold inicial de `app/` en raiz hacia `src/app`.
- Configuracion de `next.config.ts` para permitir imagenes remotas desde `raw.githubusercontent.com`.
- Ajuste de alias TypeScript `@/*` para resolver contra `src/*`.

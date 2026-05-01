# Selector de vista en la pagina principal

## Objetivo

Permitir alternar la lista de Pokemon de la home entre el modo card existente y un modo lista con filas horizontales.

## Decisiones tomadas

1. La pagina principal sigue siendo Server Component y mantiene el fetching mediante `PokemonRepository`.
2. La interaccion se encapsulo en `PokemonViewSwitcher`, un Client Component hoja que recibe entidades de dominio ya mapeadas.
3. El modo lista se implemento con `PokemonListItem`, una fila horizontal que reutiliza `TypeBadge`, `next/image` y helpers de formateo.

## Resultado

- La UI puede cambiar entre vista cards y lista sin acoplarse a los DTOs de la PokeAPI.
- La arquitectura mantiene la separacion entre datos, dominio y presentacion.

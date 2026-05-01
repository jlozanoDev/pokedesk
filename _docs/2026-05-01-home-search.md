# Buscador en la pagina principal

## Objetivo

Agregar un buscador junto al selector de vista cards/lista para filtrar rapidamente los Pokemon visibles.

## Decisiones tomadas

1. El buscador vive en `PokemonViewSwitcher`, el mismo Client Component que gestiona la interaccion de vista.
2. El filtro se aplica sobre los Pokemon ya cargados de forma perezosa.
3. La busqueda contempla nombre, numero con tres digitos y tipos.

## Resultado

- El usuario puede buscar sin acoplar la UI a la estructura de la PokeAPI.
- El selector de vista y el buscador quedan agrupados en la misma barra de control.

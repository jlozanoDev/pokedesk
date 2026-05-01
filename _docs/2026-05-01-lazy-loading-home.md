# Carga perezosa en la pagina principal

## Objetivo

Evitar cargar los 151 Pokemon de Kanto al entrar en la home y traer nuevos bloques conforme el usuario hace scroll.

## Decisiones tomadas

1. La pagina principal carga inicialmente 24 Pokemon desde el servidor.
2. Se agrego el endpoint interno `/api/pokemon` para devolver entidades de dominio paginadas.
3. `PokemonViewSwitcher` mantiene el estado de los Pokemon cargados y usa `IntersectionObserver` para solicitar mas datos.
4. El modo cards y el modo lista consumen el mismo arreglo incremental, por lo que ambos comparten la carga perezosa.

## Resultado

- La UI no conoce la estructura de la PokeAPI.
- La carga progresiva funciona igual al alternar entre cards y lista.
- La home reduce el coste inicial de datos e imagenes.

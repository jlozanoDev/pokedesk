# 📦 Pokedex Project - IA Guidelines & Rules

Este documento es la única fuente de verdad para las reglas de desarrollo, arquitectura y estándares del proyecto. El objetivo es construir una Pokedex utilizando Next.js y la PokéAPI siguiendo principios de Clean Architecture.

---

## 1. Stack Tecnológico Estricto
*   **Framework:** Next.js 14+ (App Router).
*   **Lenguaje:** TypeScript (Tipado estricto, sin uso de `any`).
*   **Estilos:** Tailwind CSS (Enfoque Mobile-first).
*   **Fetch:** API Nativa de Fetch con validación de tipos.
*   **Imágenes:** Uso obligatorio de `next/image` (configurar dominio `raw.githubusercontent.com`).

---

## 2. Arquitectura Limpia (Clean Architecture)
El proyecto debe dividirse en capas para separar la lógica de negocio de la infraestructura:

*   **Dominio (Core/Entities):** Modelos de datos puros. La aplicación habla el lenguaje de estas entidades, no el de la API externa.
*   **Datos (Data/Repositories):** Contiene la lógica de los Repositorios. Aquí se hace el fetch y se utiliza un **Mapper** para transformar la respuesta de la PokéAPI al modelo del Dominio.
*   **Presentación (Presentation):** 
    *   **Server Components (RSC):** Por defecto para fetching y renderizado inicial.
    *   **Client Components:** Solo para interactividad (filtros, animaciones, búsqueda).
*   **Patrón Repository:** El acceso a los datos siempre debe estar abstraído tras una interfaz.

---

## 3. Estructura de Directorios
```text
src/
├── app/              # Capa de Entrega: Rutas, Layouts y Server Pages
├── components/       # UI Layer: Componentes atómicos y moleculares
├── core/             # Capa de Dominio: Interfaces de Entidades (ej. Pokemon.ts)
├── data/             # Capa de Datos: 
│   ├── repositories/ # Implementación de llamadas a la API
│   └── mappers/      # Transformadores de API DTO a Core Entity
├── hooks/            # Lógica de cliente compartida
├── services/         # Instancia de fetch y configuración de API
└── utils/            # Helpers (formateo de strings, colores de tipos)
```

---

## 4. Convenciones de Código y Nomenclatura
*   **Archivos y Componentes:** Usar `PascalCase` para nombres de archivos que contengan componentes de React (ej. `PokemonCard.tsx`).
*   **Funciones y Variables:** Usar `camelCase` (ej. `getPokemonData`, `formatPokemonId`).
*   **Interfaces y Tipos:** Usar `PascalCase` y preferiblemente sin el prefijo `I` (ej. `Pokemon` en lugar de `IPokemon`), aunque depende del estándar del equipo. Tipos y DTOs bien definidos (ej. `PokemonResponseDTO`).
*   **TypeScript:** **PROHIBIDO** el uso de `any`. Se debe tipar todo estrictamente. Si el tipo es dinámico, usar Generics o `unknown`.
*   **Exportaciones:** 
    *   Páginas de Next.js (`page.tsx`, `layout.tsx`): `export default function...`
    *   Componentes UI y funciones: Preferir exportaciones nombradas (`export const MiComponente = ...`).

---

## 5. Convenciones de Next.js 14+
*   **Server Components por defecto:** Todo componente en la carpeta `app/` es un RSC por defecto. Úsalos para hacer fetch de datos de forma segura y rápida en el servidor.
*   **Uso estricto de `'use client'`:** Solo añadir la directiva en componentes que necesiten interactividad del usuario (`onClick`, `onChange`), hooks de estado/ciclo de vida (`useState`, `useEffect`) o APIs del navegador. Intenta que estos componentes sean hojas en tu árbol de componentes.
*   **Data Fetching & Caché:** Utilizar la API extendida de `fetch` de Next.js. Aprovechar opciones como `next: { revalidate: 3600 }` para Incremental Static Regeneration (ISR) o `cache: 'force-cache'` para datos estáticos.
*   **Imágenes Optimizadas:** Siempre usar el componente `<Image />` de `next/image` especificando `width` y `height`, o usando `fill` y sizes. Configurar el `next.config.js` para permitir el origen de las imágenes de la PokéAPI.

---

## 6. Convenciones de Tailwind CSS y Diseño
*   **Mobile-First:** Empezar siempre a estilizar para pantallas pequeñas y luego escalar hacia arriba usando los modificadores de Tailwind (`sm:`, `md:`, `lg:`).
*   **Orden de Clases:** Mantener un orden lógico y consistente de clases. Se sugiere usar la extensión/plugin `prettier-plugin-tailwindcss` para auto-ordenar las clases (Layout > Espaciado > Tamaño > Tipografía > Colores > Efectos).
*   **Sistema de Diseño:** Configurar los colores base de los tipos de Pokémon, fuentes principales y tamaños extendidos en el archivo `tailwind.config.ts`. No usar variables estáticas (`style={{ color: '#ff0000' }}`).
*   **Modularidad de UI:** Si un conjunto de clases de Tailwind se repite demasiado y no involucra lógica de negocio, considerar extraerlo en un componente reutilizable de UI.

---

## 7. Documentación Obligatoria (IA)
*   **Registro de Tareas:** El asistente (IA) tiene la obligación de documentar cada paso importante, decisión de diseño o implementación realizada.
*   **Formato Markdown:** Toda la documentación generada por el asistente debe escribirse y guardarse en archivos `.md`.
*   **Ubicación:** Guardar esta documentación estrictamente dentro de la carpeta `_docs/` del proyecto, manteniendo un orden claro y accesible.
*   **Changelog:** Cada cambio significativo en el proyecto debe quedar registrado obligatoriamente en el archivo `_docs/changelog.md` (o en la raíz) siguiendo las convenciones de [Keep a Changelog](https://keepachangelog.com/es-ES/1.0.0/).

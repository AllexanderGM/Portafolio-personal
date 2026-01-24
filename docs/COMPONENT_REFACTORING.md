# Guia de refactorizacion de componentes

## Objetivo
Mantener una arquitectura clara, escalable y consistente, aplicando principios SOLID, patron atomico cuando aplica, y una estructura mobile-first para estilos.

## Estructura recomendada
### 1) Modulo con patron atomico (cuando hay niveles claros de composicion)
Ejemplo: breadcrumb

```
src/library/breadcrumb/
  index.jsx
  index.scss
  hooks/
    useBreadcrumbItems.js
  components/
    atoms/
    molecules/
    organisms/
```

Regla: si el componente tiene atoms/molecules/organisms, mantener ese arbol. La logica de negocio va en hooks locales.

### 2) Modulo por intencion (cuando son componentes distintos)
Ejemplo: buttons

```
src/library/buttons/
  index.jsx
  primary/
    PrimaryButton.jsx
    index.jsx
  scroll/
    ScrollButton.jsx
    index.jsx
    index.scss
  to-top/
    ToTopButton.jsx
    index.jsx
    index.scss
```

Regla: si los componentes NO son variantes de un mismo componente, separarlos por carpeta propia.

## Public API y barrels
- Cada modulo expone un `index.jsx` como entrada publica.
- Si el modulo tiene estilos globales del modulo, crear `index.scss` y cargarlo en el `index.jsx`.
- Evitar archivos raiz con nombres de componente si actuan como barrel.

## Estilos (SCSS)
- Mobile-first: estilos base para mobile, luego ajustar en `@include responsive`.
- Cada selector debe manejar su propio `@include responsive` dentro del bloque del selector.
- No dejar SCSS sin import: todo estilo debe estar referenciado por el `index.jsx` o por el componente.

Ejemplo:
```
.scroll-button {
  display: none;

  @include responsive {
    display: block;
  }
}
```

## Nombres y convenciones
- Componentes: PascalCase (PrimaryButton, ScrollButton, ToTopButton).
- Carpetas: kebab-case (to-top, scroll).
- Clases CSS: descriptivas y alineadas al componente (scroll-button, to-top-button).
- Hooks: `useX` dentro de `hooks/`.

## Imports
- Preferir alias `@library/...` y barrels.
- Evitar rutas profundas o relativas largas.

## Checklist de refactorizacion
1) Definir si aplica patron atomico o separacion por intencion.
2) Crear `index.jsx` y `index.scss` como entradas.
3) Mover logica a hooks locales si crece el componente.
4) Alinear nombres de archivos, clases y componentes.
5) Asegurar estilos mobile-first con responsive por selector.
6) Actualizar imports para usar el barrel del modulo.

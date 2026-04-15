# Components

Componentes UI organizados con **Atomic Design**.

## Estructura

### Atoms (Nivel 1)
Componentes más básicos e indivisibles:
- Button, Input, Badge, Icon, Spinner, etc.

### Molecules (Nivel 2)
Combinación de atoms:
- FormField (Label + Input + Error)
- SearchBar, ProductPrice, StarRating, etc.

### Organisms (Nivel 3)
Secciones complejas de UI:
- Header, Footer, ProductCard, CartDrawer, etc.

### Templates (Nivel 4)
Layouts de página:
- StoreLayout, AdminLayout, AuthLayout

### Shared
Componentes compartidos que no encajan en la jerarquía atómica:
- ErrorBoundary, Seo, Breadcrumb, Pagination

## Convenciones

- Nombres en **PascalCase** (ProductCard.tsx)
- Cada componente en su propia carpeta
- Incluir: Component.tsx, Component.stories.tsx (Storybook), index.ts
- Props con TypeScript strict

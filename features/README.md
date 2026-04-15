# Features

Módulos organizados por funcionalidad (Feature-based architecture).

## Estructura de cada Feature

Cada feature contiene:

```
feature-name/
├── api/           # Funciones de API y React Query hooks
├── components/    # Componentes específicos del feature
├── hooks/         # Custom hooks del feature
├── types/         # TypeScript types
├── utils/         # Utilidades helper
└── store/         # Zustand stores (si aplica)
```

## Features actuales

- **products/** - Catálogo de productos
- **cart/** - Carrito de compras
- **checkout/** - Proceso de pago
- **orders/** - Gestión de pedidos
- **reviews/** - Sistema de reseñas
- **admin/** - Panel administrativo
- **home/** - Componentes de la home page

## Convenciones

- API functions: camelCase (getProducts.ts)
- Components: PascalCase (ProductFilters.tsx)
- Hooks: camelCase con prefijo use (useProductFilters.ts)
- Stores: camelCase con sufijo Store (cartStore.ts)

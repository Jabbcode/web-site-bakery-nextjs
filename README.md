# SwissDelight - Bakery E-commerce

Tienda online moderna de pastelería/panadería construida con Next.js 15, inspirada en la plantilla SwissDelight.

## 🚀 Stack Tecnológico

### Core

- **Next.js 15** - React framework con App Router
- **TypeScript** - 100% strict mode, sin `any`
- **Tailwind CSS 4** - Sistema de diseño SwissDelight
- **Prisma** - ORM para base de datos
- **Supabase** - PostgreSQL + Storage

### Autenticación y Pagos

- **Clerk** - Autenticación (Email, Google, Facebook)
- **Stripe** - Pagos multi-moneda (MXN, USD, EUR)

### Estado y Data Fetching

- **Zustand** - Estado global (UI, carrito)
- **TanStack Query** - Server state management
- **React Hook Form + Zod** - Formularios y validación

### Internacionalización

- **next-intl** - Soporte ES/EN

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Servidor desarrollo
npm run build        # Build producción
npm run lint         # ESLint
npm run test         # Playwright E2E
npm run storybook    # Storybook docs
```

## 🚧 Roadmap

### ✅ Fase 0: Setup (Completada)

- Next.js 15 + TypeScript strict
- Tailwind CSS con sistema de diseño
- ESLint + Prettier + Husky
- Storybook + Playwright
- GitHub Actions CI/CD

### 🔄 Fase 1: Fundación (Siguiente)

- Prisma + Supabase
- Clerk + Stripe
- React Query + Zustand

---

**Construido con ❤️ usando Next.js 15**

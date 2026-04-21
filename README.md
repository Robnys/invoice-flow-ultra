# InvoiceFlow - SaaS de Facturación Inteligente

InvoiceFlow es un SaaS de facturación inteligente y gestión de cobros que utiliza Inteligencia Artificial para ayudarte a cobrar más rápido.

## Características

- **Automatización Inteligente**: Envía recordatorios automáticos personalizados basados en el comportamiento de pago de cada cliente
- **Predicción de Pagos**: Anticipa qué facturas se pagarán tarde con análisis predictivo
- **Dashboard en Tiempo Real**: Visualiza el estado de tus facturas y las alertas de IA
- **Seguridad Garantizada**: Encriptación de nivel bancario y cumplimiento GDPR

## Stack Tecnológico

- **Framework**: Next.js 14 (App Router)
- **Estilos**: Tailwind CSS
- **Componentes**: Shadcn/UI
- **Base de Datos/Auth**: Supabase
- **Icons**: Lucide React

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura las variables de entorno en `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
   ```
4. Ejecuta el servidor de desarrollo:
   ```bash
   npm run dev
   ```

## Estructura del Proyecto

```
invoiceflow/
  app/                    # Páginas de Next.js 14 App Router
    dashboard/           # Dashboard principal
    globals.css          # Estilos globales
    layout.tsx           # Layout principal
    page.tsx             # Landing page
  components/            # Componentes reutilizables
    ui/                  # Componentes UI de Shadcn
      badge.tsx
      button.tsx
      card.tsx
      table.tsx
  lib/                   # Utilidades y configuración
    supabase.ts         # Cliente de Supabase
    utils.ts            # Utilidades generales
  .env.local            # Variables de entorno
  package.json          # Dependencias del proyecto
  tailwind.config.js    # Configuración de Tailwind
  tsconfig.json         # Configuración de TypeScript
```

## Desarrollo

El proyecto está configurado para ser un MVP funcional con:

- **Landing Page**: Página de aterrizaje minimalista y profesional
- **Dashboard**: Vista principal con tabla de facturas pendientes
- **Componentes UI**: Sistema de diseño profesional con Shadcn/UI
- **Datos Mock**: Datos de ejemplo para demostrar la funcionalidad

## Próximos Pasos

1. Conectar con Supabase real
2. Implementar autenticación de usuarios
3. Agregar funcionalidad de CRUD para facturas
4. Implementar sistema de notificaciones
5. Desarrollar algoritmos de predicción de IA
6. Agregar integración con pasarelas de pago
7. Implementar reportes y analytics

## Licencia

MIT License

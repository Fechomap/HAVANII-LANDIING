# Imágenes Compartidas - HAVANI

**Contenido:** Recursos visuales reutilizables entre todos los productos
**Objetivo:** Mantener consistencia visual y optimizar recursos

## Estructura

```
shared/
├── logos/
│   ├── havani-logo.svg
│   ├── havani-logo-white.svg
│   └── favicon/
├── icons/
│   ├── features/
│   ├── tech/
│   └── ui/
├── backgrounds/
│   ├── hero-gradient.webp
│   ├── section-patterns.webp
│   └── nebulas/
└── placeholders/
    ├── product-placeholder.webp
    └── avatar-placeholder.webp
```

## Contenido por Categoría

### `/logos/`
- **havani-logo.svg** - Logo principal (actual: logo-havani.svg)
- **havani-logo-white.svg** - Versión en blanco para fondos oscuros
- **favicon/** - Iconos de la aplicación en diferentes tamaños

### `/icons/`
- **features/** - Iconos para características de productos
- **tech/** - Iconos de tecnologías y partners
- **ui/** - Iconos de interfaz de usuario

### `/backgrounds/`
- **hero-gradient.webp** - Gradientes para hero sections
- **section-patterns.webp** - Patrones para secciones
- **nebulas/** - Efectos de nebulosa reutilizables

### `/placeholders/`
- **product-placeholder.webp** - Placeholder optimizado (400KB vs 2.6MB actual)
- **avatar-placeholder.webp** - Placeholder para testimonios

## Optimización

### Especificaciones
- **Logos:** SVG para escalabilidad perfecta
- **Icons:** SVG + WebP fallback para iconos complejos
- **Backgrounds:** WebP con compresión óptima
- **Placeholders:** WebP, máximo 400KB

### Uso Recomendado
```tsx
// Ejemplo de uso de logo compartido
import LogoHavani from '/images/shared/logos/havani-logo.svg';

// Ejemplo de placeholder optimizado
<img 
  src="/images/shared/placeholders/product-placeholder.webp" 
  alt="Producto" 
  loading="lazy"
/>
```

---
**Beneficio:** Centralizar recursos comunes reduce duplicación y mantiene consistencia visual en toda la aplicación.
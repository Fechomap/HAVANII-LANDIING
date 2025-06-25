# Estructura de Imágenes por Producto

Esta nueva estructura organiza las imágenes específicamente por producto, mejorando el rendimiento y la organización del proyecto.

## Estructura de Directorios

```
public/images/
├── automike/              # AutoMike - Automatización de Expedientes
├── neural-crane/          # NeuralCrane - Plataforma de Gestión con IA  
├── texmlbot-ivr/         # TeXML Bot IVR - Sistema de Respuesta de Voz
├── telegram-bot/         # Telegram Bot - Consultas y Cotizaciones
├── facturapisaas/        # FacturAPI SaaS - Facturación Electrónica
├── shared/               # Imágenes compartidas (logos, iconos)
├── tech/                 # Tecnologías y partners (existente)
└── [archivos comunes]    # logo-havani.svg, etc.
```

## Contenido por Directorio

### `/automike/`
**Producto:** AutoMike - Automatización de Expedientes
- `dashboard.webp` - Dashboard principal del sistema
- `workflow.webp` - Flujo de trabajo automatizado
- `integrations.webp` - Integraciones con sistemas externos
- `hero-mockup.webp` - Imagen principal para hero section

### `/neural-crane/`
**Producto:** NeuralCrane - Plataforma de Gestión con IA
- `ai-dashboard.webp` - Dashboard con IA activa
- `analytics.webp` - Análisis y métricas
- `predictions.webp` - Predicciones y insights
- `hero-mockup.webp` - Imagen principal para hero section

### `/texmlbot-ivr/`
**Producto:** TeXML Bot IVR - Sistema de Respuesta de Voz
- `call-interface.webp` - Interfaz de llamadas
- `voice-flow.webp` - Flujo de conversación por voz
- `phone-integration.webp` - Integración telefónica
- `hero-mockup.webp` - Imagen principal para hero section

### `/telegram-bot/`
**Producto:** Telegram Bot - Consultas y Cotizaciones
- `chat-interface.webp` - Interfaz de chat
- `bot-responses.webp` - Respuestas automatizadas
- `mobile-mockup.webp` - Mockup en dispositivo móvil
- `hero-mockup.webp` - Imagen principal para hero section

### `/facturapisaas/`
**Producto:** FacturAPI SaaS - Facturación Electrónica
- `invoice-dashboard.webp` - Dashboard de facturación
- `api-integration.webp` - Integración API
- `compliance.webp` - Cumplimiento fiscal
- `hero-mockup.webp` - Imagen principal para hero section

### `/shared/`
**Contenido:** Imágenes compartidas entre productos
- `havani-logo.svg` - Logo principal
- `icons/` - Iconos comunes
- `backgrounds/` - Fondos reutilizables
- `placeholders/` - Imágenes placeholder

## Optimización

### Especificaciones Técnicas
- **Formato:** WebP (mejor compresión)
- **Fallback:** JPG para compatibilidad
- **Resolución:** 
  - Hero images: 1200x800px máximo
  - Dashboard mockups: 1000x700px máximo
  - Icons: 64x64px, 128x128px, 256x256px
- **Compresión:** 85% calidad para WebP
- **Tamaño máximo:** 400KB por imagen (vs 2.6MB actual del placeholder.svg)

### Implementación Responsive
```html
<picture>
  <source srcset="/images/automike/dashboard.webp" type="image/webp">
  <img src="/images/automike/dashboard.jpg" alt="AutoMike Dashboard" />
</picture>
```

## Migración desde placeholder.svg

### Archivos a reemplazar:
- **Archivo actual:** `/placeholder.svg` (2.6MB)
- **Páginas afectadas:** AutoMike, TeXMLBotIVR, TelegramBot, NeuralCrane

### Referencias a actualizar:
1. `src/pages/AutoMike.tsx` - línea ~250
2. `src/pages/TeXMLBotIVR.tsx` - línea ~221  
3. `src/pages/TelegramBot.tsx` - línea ~216
4. `src/components/sections/NeuralCrane/HeroSection.tsx` - línea ~145

### Beneficios de la migración:
- **Rendimiento:** Reducción de ~2.2MB por imagen (2.6MB → 400KB)
- **Diferenciación:** Cada producto tendrá imágenes específicas
- **SEO:** Mejores alt texts y nombres descriptivos
- **UX:** Imágenes contextuales que reflejan cada producto

## Estado Actual

- ✅ **Estructura creada:** Directorios organizados por producto
- ⏳ **Contenido pendiente:** Imágenes específicas por producto
- ⏳ **Implementación pendiente:** Actualizar referencias en componentes
- ⏳ **Optimización pendiente:** Conversión a WebP y compresión

---
**Próximo paso:** Crear imágenes específicas para cada producto y actualizar las referencias en los componentes correspondientes.
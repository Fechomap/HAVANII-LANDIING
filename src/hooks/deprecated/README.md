# 📁 Hooks Deprecados

Esta carpeta contiene hooks que están siendo reemplazados por versiones optimizadas.

## ⚠️ Hooks Deprecados:

### `useParallax.ts`
- **Estado**: Deprecado
- **Reemplazado por**: `useScrollTrigger` + `useMinimalParallax`
- **Razón**: Problemas de rendimiento en mobile y no respeta `prefers-reduced-motion`

### `useIntersection.ts`  
- **Estado**: Deprecado
- **Reemplazado por**: `useScrollTrigger`
- **Razón**: API más simple y mejor rendimiento con framer-motion

### `useAnimation.ts`
- **Estado**: Deprecado  
- **Reemplazado por**: Componente `ScrollReveal`
- **Razón**: Demasiado complejo, mejor usar componentes declarativos

## 🔄 Proceso de Migración:

1. **Fase 1** ✅: Crear nuevos hooks y componentes
2. **Fase 2** 🔄: Migrar componentes uno por uno
3. **Fase 3** 📋: Eliminar hooks deprecados

## 💡 Guía Rápida:

```typescript
// ❌ ANTES
const ref = useIntersection(callback, options);

// ✅ DESPUÉS  
const { ref, isInView } = useScrollTrigger(options);

// ❌ ANTES
const ref = useParallax({ speed: 0.2 });

// ✅ DESPUÉS (solo si es necesario)
const { ref, style } = useMinimalParallax(0.1);

// ❌ ANTES
<motion.div animate={isVisible ? 'visible' : 'hidden'}>

// ✅ DESPUÉS
<ScrollReveal animation="fadeUp">
  <MyComponent />
</ScrollReveal>
```

## ⏰ Timeline de Eliminación:

- **Enero 2025**: Crear sistema nuevo (Fase 1) ✅
- **Febrero 2025**: Migrar todos los componentes (Fase 2)
- **Marzo 2025**: Eliminar hooks deprecados (Fase 3)

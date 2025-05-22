/**
 * @file hooks/index.ts
 * Barrel exports optimizado para todos los hooks de Havani
 * 
 * 🚀 NUEVOS HOOKS OPTIMIZADOS (Fase 1)
 * ✅ useScrollTrigger - Reemplaza useIntersection + useParallax
 * ✅ useAppleStyleScroll - Scroll suave estilo Apple
 * 
 * 🔄 HOOKS EXISTENTES MANTENIDOS
 * ✅ useDeviceInfo - Info del dispositivo
 * ✅ useHomeNavigation - Navegación con animación
 * ✅ use-toast - Sistema de notificaciones
 * 
 * ⚠️  HOOKS DEPRECADOS (mover a /deprecated)
 * ❌ useParallax - Reemplazado por useScrollTrigger
 * ❌ useIntersection - Reemplazado por useScrollTrigger
 * ❌ useAnimation - Reemplazado por ScrollReveal component
 */

// ==========================================
// 🚀 NUEVOS HOOKS OPTIMIZADOS (Fase 1)
// ==========================================

export { 
  useScrollTrigger, 
  useMinimalParallax 
} from './useScrollTrigger';

export { 
  useAppleStyleScroll,
  easeOutQuad,
  easeOutCubic,
  easeOutQuart,
  appleEasing,
  useScrollMomentum
} from './useAppleStyleScroll';

// ==========================================
// ✅ HOOKS EXISTENTES MANTENIDOS
// ==========================================

export { useDeviceInfo } from './useDeviceInfo';
export { useHomeNavigation } from './useHomeNavigation';
export { useToast, toast } from './use-toast';

// ==========================================
// 🔄 HOOKS DE TRANSICIÓN (Compatibilidad temporal)
// ==========================================

// IMPORTANTE: Estos hooks son archivos de transición temporales
// Mantienen compatibilidad durante la migración Fase 1 → Fase 2
// Muestran warnings de deprecación pero funcionan correctamente

// ⚠️  DEPRECATED: Usar useScrollTrigger en su lugar
export { useParallax } from './useParallax';

// ⚠️  DEPRECATED: Usar useScrollTrigger en su lugar  
export { useIntersection } from './useIntersection';

// ⚠️  DEPRECATED: Usar ScrollReveal component en su lugar
export { useAnimation } from './useAnimation';

// ==========================================
// 📚 UTILIDADES Y TIPOS
// ==========================================

// Tipos para los nuevos hooks
export type ScrollTriggerOptions = {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  amount?: number | 'some' | 'all';
};

export type AppleScrollOptions = {
  duration?: number;
  offset?: number;
  easing?: (t: number) => number;
};

export type AnimationType = 
  | 'fadeUp' 
  | 'fadeDown' 
  | 'fadeLeft' 
  | 'fadeRight' 
  | 'fadeIn'
  | 'scale'
  | 'slideUp'
  | 'slideLeft'
  | 'slideRight'
  | 'stagger';

// ==========================================
// 📋 GUÍA DE MIGRACIÓN
// ==========================================

/**
 * MIGRACIÓN RÁPIDA:
 * 
 * ANTES (useIntersection):
 * const ref = useIntersection(callback, { threshold: 0.5 });
 * 
 * DESPUÉS (useScrollTrigger):
 * const { ref, isInView } = useScrollTrigger({ threshold: 0.5 });
 * 
 * ---
 * 
 * ANTES (useParallax):
 * const ref = useParallax({ speed: 0.2 });
 * 
 * DESPUÉS (useMinimalParallax):
 * const { ref, style } = useMinimalParallax(0.1); // Solo si es necesario
 * 
 * ---
 * 
 * ANTES (useAnimation combinado):
 * const { ref, isInView, animate } = useAnimation({
 *   intersection: { threshold: 0.5 },
 *   parallax: { speed: 0.2 }
 * });
 * 
 * DESPUÉS (ScrollReveal component):
 * <ScrollReveal animation="fadeUp" threshold={0.5}>
 *   <MyComponent />
 * </ScrollReveal>
 * 
 * ---
 * 
 * ✅ ESTADO ACTUAL (Fase 1):
 * - Hooks antiguos → Archivos de transición temporales
 * - Nuevos hooks → Disponibles para usar
 * - Warnings en consola → Esperado y normal
 * - App funciona → Sin errores críticos
 */

// ==========================================
// 💡 MEJORES PRÁCTICAS
// ==========================================

/**
 * 1. ✅ ScrollReveal para nuevas animaciones (recomendado)
 * 2. ✅ useScrollTrigger para lógica personalizada (recomendado)  
 * 3. ⚠️  Hooks antiguos funcionan pero muestran warnings (temporal)
 * 4. ✅ useAppleStyleScroll para navegación suave (recomendado)
 * 5. ✅ Respeta prefers-reduced-motion automáticamente
 * 6. 🔄 Migración gradual: Fase 1 → Fase 2 → Fase 3
 */
/**
 * @file useParallax.ts - ARCHIVO DE TRANSICIÓN TEMPORAL
 * 
 * ⚠️  IMPORTANTE: Este archivo es temporal para mantener compatibilidad
 * durante la migración de Fase 1 → Fase 2
 * 
 * 🔄 ESTADO ACTUAL:
 * - Versión simplificada de useParallax
 * - Muestra warning de deprecación
 * - Será eliminado en Fase 3
 * 
 * ✅ USAR EN SU LUGAR: useMinimalParallax o ScrollReveal
 */

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Mostrar warning de deprecación en desarrollo
if (process.env.NODE_ENV === 'development') {
  console.warn(
    '⚠️  useParallax está deprecado. Usar useMinimalParallax o ScrollReveal en su lugar.\n' +
    'Ejemplo: const { ref, style } = useMinimalParallax(0.1);'
  );
}

interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

// Valores por defecto
const defaultOptions: ParallaxOptions = {
  speed: 0.5,
  direction: 'vertical',
  start: 'top bottom',
  end: 'bottom top',
  scrub: 1,
};

/**
 * @deprecated Usar useMinimalParallax o ScrollReveal en su lugar
 * Hook para efectos de parallax (versión simplificada)
 */
export function useParallax(options: ParallaxOptions = {}) {
  const config = { ...defaultOptions, ...options };
  const elementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Solo ejecutar en cliente, no en servidor
    if (typeof window === 'undefined') return;
    
    const element = elementRef.current;
    if (!element) return;
    
    // Verificar si estamos en desktop y si no prefiere reducir movimiento
    const isDesktop = window.innerWidth >= 1024;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // No aplicar parallax en mobile o si se prefiere reducir movimiento
    if (!isDesktop || prefersReducedMotion) {
      return;
    }
    
    // Calcular la distancia del movimiento (reducida para mejor rendimiento)
    const distance = Math.min(config.speed * 50, 50); // Máximo 50px
    
    // Configurar la propiedad a animar según la dirección
    const animationProps = config.direction === 'vertical' 
      ? { y: -distance } 
      : { x: -distance };
    
    const animationPropsEnd = config.direction === 'vertical' 
      ? { y: distance } 
      : { x: distance };
    
    // Crear la animación con GSAP (simplificada)
    const parallaxAnimation = gsap.fromTo(
      element,
      animationProps,
      {
        ...animationPropsEnd,
        ease: 'none',
        scrollTrigger: {
          trigger: element,
          start: config.start,
          end: config.end,
          scrub: config.scrub,
        },
      }
    );
    
    // Limpiar la animación cuando el componente se desmonte
    return () => {
      parallaxAnimation.kill();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
    
  }, [config]);
  
  return elementRef;
}
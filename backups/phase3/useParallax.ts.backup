/**
 * @file useParallax.ts - ARCHIVO DE TRANSICIÓN TEMPORAL
 * 
 * ⚠️  IMPORTANTE: Este archivo es temporal para mantener compatibilidad
 * durante la migración de Fase 1 → Fase 2
 * 
 * 🔄 ESTADO ACTUAL:
 * - Implementación básica para mantener compatibilidad
 * - Muestra warning de deprecación
 * - Será eliminado en Fase 3
 * 
 * ✅ USAR EN SU LUGAR: useMinimalParallax (en useScrollTrigger)
 */

import { useEffect, useRef, useState } from 'react';

// Mostrar warning de deprecación en desarrollo
if (process.env.NODE_ENV === 'development') {
  console.warn(
    '⚠️  useParallax está deprecado. Usar useMinimalParallax en su lugar.\n' +
    'Ejemplo: const { ref, style } = useMinimalParallax(0.1); // Muy sutil'
  );
}

/**
 * @deprecated Usar useMinimalParallax en su lugar
 * Hook para crear efectos de parallax
 * @param speed - Velocidad del parallax (negativo = opuesto al scroll)
 * @param direction - Dirección del parallax ('vertical' o 'horizontal')
 */
export function useParallax(speed: number = 0.1) {
  const ref = useRef<HTMLElement | null>(null);
  const [offset, setOffset] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      
      const scrollY = window.scrollY;
      const newOffset = scrollY * speed;
      setOffset(newOffset);
      
      if (ref.current) {
        ref.current.style.transform = `translateY(${newOffset}px)`;
      }
    };
    
    // Verificar preferencias de reducción de movimiento
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (!prefersReducedMotion) {
      window.addEventListener('scroll', handleScroll, { passive: true });
      // Iniciar con un valor correcto
      handleScroll();
    }
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [speed]);
  
  return ref;
}

// Exportar también como default para mantener compatibilidad
export default useParallax;

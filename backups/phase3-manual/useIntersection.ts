/**
 * @file useIntersection.ts - ARCHIVO DE TRANSICIÓN TEMPORAL
 * 
 * ⚠️  IMPORTANTE: Este archivo es temporal para mantener compatibilidad
 * durante la migración de Fase 1 → Fase 2
 * 
 * 🔄 ESTADO ACTUAL:
 * - Implementación básica para mantener compatibilidad
 * - Muestra warning de deprecación
 * - Será eliminado en Fase 3
 * 
 * ✅ USAR EN SU LUGAR: useScrollTrigger
 */

import { useEffect, useRef, useState, useCallback } from 'react';

// Mostrar warning de deprecación en desarrollo
if (process.env.NODE_ENV === 'development') {
  console.warn(
    '⚠️  useIntersection está deprecado. Usar useScrollTrigger en su lugar.\n' +
    'Ejemplo: const { ref, isInView } = useScrollTrigger({ threshold: 0.5 });'
  );
}

// Opciones para IntersectionObserver
interface IntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

// Valores por defecto
const defaultOptions: IntersectionOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.4,
  once: true,
};

/**
 * @deprecated Usar useScrollTrigger en su lugar
 * Hook para detectar cuando un elemento entra en el viewport
 */
export function useIntersection(
  callback: (entry: IntersectionObserverEntry) => void,
  options: IntersectionOptions = defaultOptions
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLElement | null>(null);
  const [hasIntersected, setHasIntersected] = useState(false);

  // Verificar preferencias de reducción de movimiento
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Función de callback para IntersectionObserver
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting) {
        callback(entry);
        
        // Si la opción once está activada, desconectar después de la primera intersección
        if (options.once) {
          setHasIntersected(true);
          
          if (observerRef.current && elementRef.current) {
            observerRef.current.unobserve(elementRef.current);
          }
        }
      }
    },
    [callback, options.once]
  );

  useEffect(() => {
    // Si ya ha intersectado y la opción once está activada, no hacer nada
    if (options.once && hasIntersected) return;

    const observer = new IntersectionObserver(handleIntersection, {
      root: options.root || null,
      rootMargin: options.rootMargin || '0px',
      threshold: options.threshold || 0.4,
    });
    
    observerRef.current = observer;

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    // Limpiar el observador cuando el componente se desmonte
    return () => {
      if (currentElement && observerRef.current) {
        observerRef.current.unobserve(currentElement);
      }
    };
  }, [handleIntersection, options, hasIntersected]);

  // Si prefers-reduced-motion está activado, ejecutar callback inmediatamente
  useEffect(() => {
    if (prefersReducedMotion && !hasIntersected && options.once) {
      // Crear un mock de IntersectionObserverEntry
      const mockEntry = {
        isIntersecting: true,
        target: elementRef.current,
        boundingClientRect: new DOMRect(),
        intersectionRatio: 1,
        intersectionRect: new DOMRect(),
        rootBounds: null,
        time: Date.now()
      } as unknown as IntersectionObserverEntry;
      
      callback(mockEntry);
      setHasIntersected(true);
    }
  }, [callback, hasIntersected, options.once, prefersReducedMotion]);

  return elementRef;
}

// Exportar también como default para mantener compatibilidad
export default useIntersection;

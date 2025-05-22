/**
 * @file useAnimation.ts - ARCHIVO DE TRANSICIÓN TEMPORAL
 * 
 * ⚠️  IMPORTANTE: Este archivo es temporal para mantener compatibilidad
 * durante la migración de Fase 1 → Fase 2
 * 
 * 🔄 ESTADO ACTUAL:
 * - Versión simplificada de useAnimation
 * - Muestra warning de deprecación
 * - Será eliminado en Fase 3
 * 
 * ✅ USAR EN SU LUGAR: ScrollReveal component
 */

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Mostrar warning de deprecación en desarrollo
if (process.env.NODE_ENV === 'development') {
  console.warn(
    '⚠️  useAnimation está deprecado. Usar ScrollReveal component en su lugar.\n' +
    'Ejemplo: <ScrollReveal animation="fadeUp"><MyComponent /></ScrollReveal>'
  );
}

// Tipos para las opciones
interface IntersectionOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
}

interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
}

interface UseAnimationOptions {
  intersection?: IntersectionOptions;
  parallax?: ParallaxOptions;
  onInView?: (entry: IntersectionObserverEntry) => void;
}

/**
 * @deprecated Usar ScrollReveal component en su lugar
 * Hook combinado para animación (versión simplificada)
 */
export function useAnimation(options: UseAnimationOptions = {}) {
  const { intersection, parallax, onInView } = options;
  const elementRef = useRef<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const gsapInstanceRef = useRef<gsap.core.Timeline | null>(null);
  
  // Verificar preferencias de reducción de movimiento
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Función de callback para IntersectionObserver
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting) {
        setIsInView(true);
        
        // Ejecutar callback si está definido
        if (onInView) {
          onInView(entry);
        }
        
        // Si once está activado, desconectar
        if (intersection?.once) {
          if (elementRef.current && observerRef.current) {
            observerRef.current.unobserve(elementRef.current);
          }
        }
      } else {
        if (!intersection?.once) {
          setIsInView(false);
        }
      }
    },
    [intersection?.once, onInView]
  );
  
  // Configurar IntersectionObserver
  useEffect(() => {
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }
    
    if (!intersection) return;
    
    const { root, rootMargin, threshold, once } = intersection;
    
    observerRef.current = new IntersectionObserver(handleIntersection, {
      root: root || null,
      rootMargin: rootMargin || '0px',
      threshold: threshold || 0.4,
    });
    
    const currentElement = elementRef.current;
    if (currentElement && observerRef.current) {
      observerRef.current.observe(currentElement);
    }
    
    return () => {
      if (currentElement && observerRef.current) {
        observerRef.current.unobserve(currentElement);
      }
    };
  }, [handleIntersection, intersection, prefersReducedMotion]);
  
  // Configurar efecto Parallax usando GSAP (simplificado)
  useEffect(() => {
    if (prefersReducedMotion || !parallax) return;
    
    const element = elementRef.current;
    if (!element) return;
    
    // Solo en desktop
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;
    
    const {
      speed = 0.2, // Reducido para mejor rendimiento
      direction = 'vertical',
    } = parallax;
    
    // Limpiar animación anterior
    if (gsapInstanceRef.current) {
      gsapInstanceRef.current.kill();
    }
    
    // Distancia reducida
    const distance = Math.min(speed * 30, 30); // Máximo 30px
    
    // Crear animación simplificada
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });
    
    if (direction === 'vertical') {
      tl.fromTo(element, 
        { y: -distance }, 
        { y: distance, ease: 'none' }
      );
    } else {
      tl.fromTo(element, 
        { x: -distance }, 
        { x: distance, ease: 'none' }
      );
    }
    
    gsapInstanceRef.current = tl;
    
    return () => {
      if (gsapInstanceRef.current) {
        gsapInstanceRef.current.kill();
      }
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [parallax, prefersReducedMotion]);
  
  // Función para animaciones personalizadas (simplificada)
  const animate = useCallback((animationProps: gsap.TweenVars, options?: gsap.TweenVars) => {
    if (elementRef.current) {
      return gsap.to(elementRef.current, { ...animationProps, ...options });
    }
    return null;
  }, []);
  
  return {
    ref: elementRef,
    isInView,
    animate,
  };
}
import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { IntersectionOptions, ParallaxOptions } from '@/types';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

/**
 * Hook unificado para animación que combina funcionalidades de
 * useIntersection y useParallax en una sola API simplificada.
 * 
 * @param options - Configuración de animación
 * @returns Objeto con ref para adjuntar al elemento, estado de visibilidad y métodos
 * 
 * @example
 * // Uso básico para intersection observer
 * const { ref, isInView } = useAnimation({ 
 *   intersection: { threshold: 0.5, once: true } 
 * });
 * 
 * // Uso con parallax
 * const { ref } = useAnimation({ 
 *   parallax: { speed: 0.2, direction: 'vertical' }
 * });
 * 
 * // Uso combinado
 * const { ref, isInView } = useAnimation({
 *   intersection: { threshold: 0.5 },
 *   parallax: { speed: 0.3 }
 * });
 */
export function useAnimation(options: {
  intersection?: IntersectionOptions;
  parallax?: ParallaxOptions;
  onInView?: (entry: IntersectionObserverEntry) => void;
}) {
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
        
        // Si la opción once está activada, desconectar después de la primera intersección
        if (intersection?.once) {
          if (elementRef.current && observerRef.current) {
            observerRef.current.unobserve(elementRef.current);
          }
        }
      } else {
        // Si no estamos usando "once", actualizar el estado
        if (!intersection?.once) {
          setIsInView(false);
        }
      }
    },
    [intersection?.once, onInView]
  );
  
  // Configurar IntersectionObserver
  useEffect(() => {
    // Si prefiere reducir el movimiento, no usar animaciones
    if (prefersReducedMotion) {
      setIsInView(true);
      return;
    }
    
    // Si no hay opciones de intersection, no hacer nada
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
  
  // Configurar efecto Parallax usando GSAP
  useEffect(() => {
    // Si prefiere reducir el movimiento o no hay opciones de parallax, no hacer nada
    if (prefersReducedMotion || !parallax) return;
    
    const element = elementRef.current;
    if (!element) return;
    
    // Solo aplicar parallax en desktop (≥1024px)
    const isDesktop = window.innerWidth >= 1024;
    if (!isDesktop) return;
    
    const {
      speed = 0.5,
      direction = 'vertical',
      start = 'top bottom',
      end = 'bottom top',
      scrub = 1,
    } = parallax;
    
    // Limpiar la animación anterior si existe
    if (gsapInstanceRef.current) {
      gsapInstanceRef.current.kill();
    }
    
    // Calcular la distancia del movimiento basada en la velocidad
    const distance = speed * 100; // Convertir a porcentaje
    
    // Configurar la propiedad a animar según la dirección
    const propY = direction === 'vertical' ? 'y' : null;
    const propX = direction === 'horizontal' ? 'x' : null;
    
    // Crear la animación con GSAP
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
      }
    });
    
    if (propY) {
      tl.fromTo(element, 
        { y: -distance }, 
        { y: distance, ease: 'none' }
      );
    }
    
    if (propX) {
      tl.fromTo(element, 
        { x: -distance }, 
        { x: distance, ease: 'none' }
      );
    }
    
    gsapInstanceRef.current = tl;
    
    // Limpiar la animación cuando el componente se desmonte
    return () => {
      if (gsapInstanceRef.current) {
        gsapInstanceRef.current.kill();
      }
      const triggers = ScrollTrigger.getAll();
      triggers.forEach(trigger => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [parallax, prefersReducedMotion]);
  
  // Función para realizar animaciones personalizadas en el elemento
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

export default useAnimation;
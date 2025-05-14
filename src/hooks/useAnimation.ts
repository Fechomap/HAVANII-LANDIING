import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IntersectionOptions, ParallaxOptions } from '../types';

// Registrar el plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Hook unificado que combina funcionalidades de useIntersection y useParallax
export function useAnimation(options: {
  intersection?: IntersectionOptions;
  parallax?: ParallaxOptions;
}) {
  const { intersection, parallax } = options;
  const elementRef = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Verificar preferencias de reducción de movimiento
  const prefersReducedMotion = 
    typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Función de callback para IntersectionObserver
  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      if (entry.isIntersecting) {
        setIsVisible(true);
        
        // Si la opción once está activada, desconectar después de la primera intersección
        if (intersection?.once) {
          // Desconectar el observador para liberar recursos
          if (elementRef.current && observer.current) {
            observer.current.unobserve(elementRef.current);
          }
        }
      }
    },
    [intersection?.once]
  );
  
  // Referencia al IntersectionObserver
  const observer = useRef<IntersectionObserver | null>(null);
  
  // Configurar IntersectionObserver
  useEffect(() => {
    if (!intersection || prefersReducedMotion) {
      setIsVisible(true);
      return;
    }
    
    const { root, rootMargin, threshold, once } = intersection;
    
    observer.current = new IntersectionObserver(handleIntersection, {
      root: root || null,
      rootMargin: rootMargin || '0px',
      threshold: threshold || 0.4,
    });
    
    if (elementRef.current) {
      observer.current.observe(elementRef.current);
    }
    
    return () => {
      if (elementRef.current && observer.current) {
        observer.current.unobserve(elementRef.current);
      }
    };
  }, [handleIntersection, intersection, prefersReducedMotion]);
  
  // Configurar efecto Parallax usando GSAP
  useEffect(() => {
    if (!parallax || prefersReducedMotion || !isVisible) return;
    
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
    
    // Calcular la distancia del movimiento basada en la velocidad
    const distance = speed * 100; // Convertir a porcentaje
    
    // Configurar la propiedad a animar según la dirección
    const propY = direction === 'vertical' ? 'y' : null;
    const propX = direction === 'horizontal' ? 'x' : null;
    
    // Crear la animación con GSAP
    const parallaxAnimation = gsap.fromTo(
      element,
      {
        [propY as string]: -distance, // Valor inicial
        [propX as string]: -distance,
      },
      {
        [propY as string]: distance, // Valor final
        [propX as string]: distance,
        ease: 'none', // Sin easing para un movimiento lineal
        scrollTrigger: {
          trigger: element,
          start,
          end,
          scrub,
        },
      }
    );
    
    // Limpiar la animación cuando el componente se desmonte
    return () => {
      parallaxAnimation.kill();
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isVisible, parallax, prefersReducedMotion]);
  
  return {
    ref: elementRef,
    isVisible,
  };
}

export default useAnimation;
/**
 * @hook useScrollTrigger
 * Hook optimizado para reemplazar useIntersection y useParallax
 * Implementa scroll-triggered animations estilo Apple con mejor rendimiento
 * 
 * @param options - Configuración del trigger
 * @returns Objeto con ref y estado de visibilidad
 * 
 * @example
 * const { ref, isInView } = useScrollTrigger({ 
 *   threshold: 0.3, 
 *   once: true 
 * });
 */

import { useRef } from 'react';
import { useInView, useScroll, useTransform } from 'framer-motion';

// Opciones específicas para el IntersectionObserver
interface ScrollTriggerOptions {
  threshold?: number;
  rootMargin?: string;
  once?: boolean;
  amount?: number | 'some' | 'all';
}

export function useScrollTrigger(options: ScrollTriggerOptions = {}) {
  const ref = useRef<HTMLElement>(null);
  
  const {
    threshold = 0.1,  // Más sensible que el anterior (era 0.4)
    rootMargin = "0px 0px -50px 0px",  // Trigger antes de que sea totalmente visible
    once = true,
    amount = threshold
  } = options;

  // Usar framer-motion's useInView optimizado
  const isInView = useInView(ref, {
    once,
    amount
    // No usamos rootMargin porque framer-motion usa 'amount' en su lugar
  });

  return { 
    ref, 
    isInView,
    // Función helper para animaciones condicionales
    getAnimationProps: (animation: string = 'fadeUp') => ({
      initial: getInitialState(animation),
      animate: isInView ? getAnimateState(animation) : getInitialState(animation),
      transition: getTransition()
    })
  };
}

// Estados de animación optimizados para cada tipo
const getInitialState = (animation: string) => {
  const states = {
    fadeUp: { opacity: 0, y: 20 },
    fadeDown: { opacity: 0, y: -20 },
    fadeLeft: { opacity: 0, x: -20 },
    fadeRight: { opacity: 0, x: 20 },
    fadeIn: { opacity: 0 },
    scale: { opacity: 0, scale: 0.95 },
    slideUp: { opacity: 0, y: 40 },
    slideLeft: { opacity: 0, x: 40 },
    slideRight: { opacity: 0, x: -40 }
  };
  
  return states[animation] || states.fadeUp;
};

const getAnimateState = (animation: string) => {
  const states = {
    fadeUp: { opacity: 1, y: 0 },
    fadeDown: { opacity: 1, y: 0 },
    fadeLeft: { opacity: 1, x: 0 },
    fadeRight: { opacity: 1, x: 0 },
    fadeIn: { opacity: 1 },
    scale: { opacity: 1, scale: 1 },
    slideUp: { opacity: 1, y: 0 },
    slideLeft: { opacity: 1, x: 0 },
    slideRight: { opacity: 1, x: 0 }
  };
  
  return states[animation] || states.fadeUp;
};

const getTransition = () => ({
  duration: 0.6,
  ease: [0.25, 0.8, 0.25, 1], // Apple-style easing
  type: "tween"
});

// Hook específico para efectos de parallax mínimos (solo cuando sea necesario)
export function useMinimalParallax(strength: number = 0.1) {
  const ref = useRef<HTMLElement>(null);
  
  // Solo en desktop y sin prefers-reduced-motion
  const shouldUseParallax = typeof window !== 'undefined' && 
    window.innerWidth >= 1024 && 
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (!shouldUseParallax) {
    return { ref, style: {} };
  }
  
  // Parallax muy sutil para elementos específicos
  const { scrollY } = useScroll();
  const y = useTransform(
    scrollY, 
    [0, 1000], 
    [0, -strength * 100]
  );
  
  return { 
    ref, 
    style: { y },
    // Optimizaciones de rendimiento
    className: "will-change-transform"
  };
}
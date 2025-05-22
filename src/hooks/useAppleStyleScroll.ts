/**
 * @hook useAppleStyleScroll
 * Hook para implementar scroll suave estilo Apple con mejor rendimiento
 * Reemplaza la funcionalidad de scroll personalizada en Header.tsx
 * 
 * @param options - Configuración del scroll
 * @returns Función de scroll optimizada
 * 
 * @example
 * const scrollTo = useAppleStyleScroll({ duration: 800 });
 * scrollTo('contacto');
 */

import { useCallback } from 'react';

interface AppleScrollOptions {
  duration?: number;
  offset?: number;
  easing?: (t: number) => number;
}

export function useAppleStyleScroll(options: AppleScrollOptions = {}) {
  const {
    duration = 600,
    offset = 80,
    easing = easeOutQuad
  } = options;
  
  const scrollToElement = useCallback((
    target: string | HTMLElement,
    customOffset?: number
  ) => {
    let targetElement: HTMLElement | null = null;
    
    // Determinar elemento objetivo
    if (typeof target === 'string') {
      // Si es string, buscar por ID
      targetElement = document.getElementById(target.replace('#', ''));
    } else {
      targetElement = target;
    }
    
    if (!targetElement) {
      console.warn(`Element ${target} not found`);
      return;
    }
    
    // Proporcionar feedback visual inmediato (micro-interacción)
    const currentScroll = window.scrollY;
    const feedbackScroll = currentScroll + (currentScroll < 300 ? 5 : -5);
    window.scrollTo(0, feedbackScroll);
    
    // Calcular posición objetivo
    const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - (customOffset || offset);
    
    // Configurar animación
    const startPosition = window.scrollY;
    const distance = offsetPosition - startPosition;
    let startTime: number | null = null;
    let lastPosition = startPosition;
    
    // Función de animación optimizada para 60fps
    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easing(progress);
      
      // Calcular nueva posición
      const newPosition = startPosition + distance * easedProgress;
      
      // Solo actualizar si hay cambio significativo (optimización)
      if (Math.abs(newPosition - lastPosition) > 0.5) {
        window.scrollTo({
          top: newPosition,
          behavior: 'auto' // Usar 'auto' para evitar conflictos con scroll nativo
        });
        lastPosition = newPosition;
      }
      
      // Continuar animación
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Asegurar posición exacta al final
        window.scrollTo({
          top: offsetPosition,
          behavior: 'auto'
        });
      }
    }
    
    // Iniciar animación
    requestAnimationFrame(animate);
    
  }, [duration, offset, easing]);
  
  // Función helper para scroll a top
  const scrollToTop = useCallback(() => {
    scrollToElement(document.body, 0);
  }, [scrollToElement]);
  
  // Función helper para navegación hash
  const handleHashNavigation = useCallback((hash: string, event?: React.MouseEvent) => {
    if (event) {
      event.preventDefault();
    }
    
    // Actualizar URL sin trigger de scroll nativo
    window.history.pushState({}, '', hash);
    
    // Scroll suave al elemento
    scrollToElement(hash);
  }, [scrollToElement]);
  
  return {
    scrollToElement,
    scrollToTop,
    handleHashNavigation
  };
}

// Funciones de easing optimizadas (Apple-style)
export const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t);

export const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);

export const easeOutQuart = (t: number): number => 1 - Math.pow(1 - t, 4);

// Easing personalizado de Apple para scroll
export const appleEasing = (t: number): number => {
  // Curva bezier equivalente a cubic-bezier(0.25, 0.8, 0.25, 1)
  return t < 0.5 
    ? 2 * t * t 
    : 1 - Math.pow(-2 * t + 2, 2) / 2;
};

// Hook adicional para scroll con momentum (opcional)
export function useScrollMomentum() {
  const scrollWithMomentum = useCallback((
    targetY: number,
    momentum: number = 0.1
  ) => {
    let currentY = window.scrollY;
    let velocity = 0;
    const friction = 0.95;
    const spring = 0.1;
    
    function animate() {
      const distance = targetY - currentY;
      
      // Aplicar física de spring
      velocity += distance * spring;
      velocity *= friction;
      currentY += velocity;
      
      window.scrollTo(0, currentY);
      
      // Continuar si hay movimiento significativo
      if (Math.abs(velocity) > 0.1 || Math.abs(distance) > 1) {
        requestAnimationFrame(animate);
      } else {
        // Posición final exacta
        window.scrollTo(0, targetY);
      }
    }
    
    animate();
  }, []);
  
  return { scrollWithMomentum };
}
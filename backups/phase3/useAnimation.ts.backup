/**
 * @file useAnimation.ts - ARCHIVO DE TRANSICIÓN TEMPORAL
 * 
 * ⚠️  IMPORTANTE: Este archivo es temporal para mantener compatibilidad
 * durante la migración de Fase 1 → Fase 2
 * 
 * 🔄 ESTADO ACTUAL:
 * - Implementación básica para mantener compatibilidad
 * - Muestra warning de deprecación
 * - Será eliminado en Fase 3
 * 
 * ✅ USAR EN SU LUGAR: ScrollReveal component
 */

import { useEffect, useRef, useState } from 'react';

// Mostrar warning de deprecación en desarrollo
if (process.env.NODE_ENV === 'development') {
  console.warn(
    '⚠️  useAnimation está deprecado. Usar ScrollReveal component en su lugar.\n' +
    'Ejemplo: <ScrollReveal animation="fadeUp"><MiComponente /></ScrollReveal>'
  );
}

// Tipo para los controles de animación
interface AnimationControls {
  start: (props: any) => void;
  stop: () => void;
  set: (props: any) => void;
}

/**
 * @deprecated Usar ScrollReveal component en su lugar
 * Hook para crear animaciones
 */
export function useAnimation(): AnimationControls {
  const [animating, setAnimating] = useState(false);
  const targetRef = useRef<HTMLElement | null>(null);
  
  // Implementación básica de controles de animación
  const controls: AnimationControls = {
    start: (props) => {
      setAnimating(true);
      if (targetRef.current) {
        const { opacity, y, x, scale } = props;
        
        const styles = targetRef.current.style;
        
        if (opacity !== undefined) {
          styles.opacity = opacity.toString();
        }
        
        if (y !== undefined || x !== undefined || scale !== undefined) {
          const transforms = [];
          
          if (y !== undefined) {
            transforms.push(`translateY(${y}px)`);
          }
          
          if (x !== undefined) {
            transforms.push(`translateX(${x}px)`);
          }
          
          if (scale !== undefined) {
            transforms.push(`scale(${scale})`);
          }
          
          styles.transform = transforms.join(' ');
        }
        
        // Añadir transición suave
        styles.transition = 'opacity 0.6s ease, transform 0.6s ease';
      }
    },
    stop: () => {
      setAnimating(false);
    },
    set: (props) => {
      if (targetRef.current) {
        const { opacity, y, x, scale } = props;
        
        const styles = targetRef.current.style;
        
        if (opacity !== undefined) {
          styles.opacity = opacity.toString();
        }
        
        if (y !== undefined || x !== undefined || scale !== undefined) {
          const transforms = [];
          
          if (y !== undefined) {
            transforms.push(`translateY(${y}px)`);
          }
          
          if (x !== undefined) {
            transforms.push(`translateX(${x}px)`);
          }
          
          if (scale !== undefined) {
            transforms.push(`scale(${scale})`);
          }
          
          styles.transform = transforms.join(' ');
        }
        
        // Sin transición para cambios inmediatos
        styles.transition = 'none';
      }
    }
  };
  
  return controls;
}

// Exportar también como default para mantener compatibilidad
export default useAnimation;

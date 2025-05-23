/**
 * @component ScrollReveal
 * Componente optimizado para animaciones de scroll-triggered
 * Reemplaza el uso combinado de useIntersection + useParallax
 * 
 * @example
 * <ScrollReveal animation="fadeUp" delay={0.2}>
 *   <h2>Mi título</h2>
 * </ScrollReveal>
 */

import React, { useMemo } from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollTrigger } from '@/hooks/useScrollTrigger';
import { useCallback } from 'react';

type AnimationType = 
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

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  rootMargin?: string;
  disabled?: boolean; // Para prefers-reduced-motion
  staggerChildren?: number; // Para animaciones stagger
  as?: keyof JSX.IntrinsicElements; // Elemento HTML a usar
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.6,
  threshold = 0.1,
  once = true,
  className = '',
  rootMargin = "0px 0px -50px 0px",
  disabled = false,
  staggerChildren = 0.1,
  as: Component = 'div'
}) => {
  // Verificar prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Deshabilitar animaciones si el usuario prefiere menos movimiento
  const shouldAnimate = !disabled && !prefersReducedMotion;
  
  // Hook de scroll trigger
  // Usar el hook useScrollTrigger con su API actual
  const { ref: internalRef, isInView } = useScrollTrigger({
    threshold,
    rootMargin,
    once,
  });
  
  // Callback para sincronizar la referencia interna con el elemento
  const refCallback = useCallback((element: HTMLElement | null) => {
    if (element) {
      // @ts-ignore - Necesario para compatibilidad
      internalRef.current = element;
    }
  }, [internalRef]);
  
  // Crear una ref compatible con div HTML estándar para elementos no animados
  const divRef = React.useRef<HTMLDivElement>(null);
  
  // Variantes de animación memoizadas para mejor rendimiento
  const variants: Variants = useMemo(() => {
    if (!shouldAnimate) {
      return {
        hidden: {},
        visible: {}
      };
    }
    
    const animationVariants = {
      fadeUp: {
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.8, 0.25, 1]
          }
        }
      },
      fadeDown: {
        hidden: { opacity: 0, y: -20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.8, 0.25, 1]
          }
        }
      },
      fadeLeft: {
        hidden: { opacity: 0, x: -30 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.8, 0.25, 1]
          }
        }
      },
      fadeRight: {
        hidden: { opacity: 0, x: 30 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.8, 0.25, 1]
          }
        }
      },
      fadeIn: {
        hidden: { opacity: 0 },
        visible: { 
          opacity: 1,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.8, 0.25, 1]
          }
        }
      },
      scale: {
        hidden: { opacity: 0, scale: 0.95 },
        visible: { 
          opacity: 1, 
          scale: 1,
          transition: {
            duration,
            delay,
            ease: [0.25, 0.8, 0.25, 1],
            type: "spring",
            bounce: 0.1
          }
        }
      },
      slideUp: {
        hidden: { opacity: 0, y: 40 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: duration * 1.2,
            delay,
            ease: [0.25, 0.8, 0.25, 1]
          }
        }
      },
      slideLeft: {
        hidden: { opacity: 0, x: 50 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: {
            duration: duration * 1.1,
            delay,
            ease: [0.25, 0.8, 0.25, 1]
          }
        }
      },
      slideRight: {
        hidden: { opacity: 0, x: -50 },
        visible: { 
          opacity: 1, 
          x: 0,
          transition: {
            duration: duration * 1.1,
            delay,
            ease: [0.25, 0.8, 0.25, 1]
          }
        }
      },
      stagger: {
        hidden: {},
        visible: {
          transition: {
            staggerChildren,
            delayChildren: delay
          }
        }
      }
    };
    
    return animationVariants[animation] || animationVariants.fadeUp;
  }, [animation, delay, duration, shouldAnimate, staggerChildren]);
  
  // Optimizaciones de rendimiento
  // No necesitamos sincronizar refs ya que usaremos la del componente directamente
  
  // Memoizar las variantes para mejorar rendimiento
  const motionProps = useMemo(() => ({
    variants,
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    style: {
      willChange: shouldAnimate ? 'transform, opacity' : 'auto',
      backfaceVisibility: 'hidden' as const,
      transform: 'translateZ(0)' // Forzar aceleración por hardware
    },
    className
  }), [variants, isInView, shouldAnimate, className]);
  
  // Si las animaciones están deshabilitadas, renderizar sin motion
  if (!shouldAnimate) {
    return (
      <div ref={divRef} className={className}>
        {children}
      </div>
    );
  }
  
  // Usar motion.div por defecto
  const MotionComponent = motion.div;
  
  // Asegurar que los props sean compatibles con el componente de motion
  return (
    <MotionComponent 
      ref={refCallback}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={{
        willChange: 'transform, opacity',
        backfaceVisibility: 'hidden' as const,
        transform: 'translateZ(0)'
      }}
      className={className}
    >
      {children}
    </MotionComponent>
  );
};

// Componente especializado para stagger de elementos
export const ScrollRevealStagger: React.FC<{
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}> = ({ 
  children, 
  staggerDelay = 0.1, 
  className = '' 
}) => {
  return (
    <ScrollReveal 
      animation="stagger" 
      staggerChildren={staggerDelay}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.6,
                ease: [0.25, 0.8, 0.25, 1]
              }
            }
          }}
        >
          {child}
        </motion.div>
      ))}
    </ScrollReveal>
  );
};

// Hook helper para usar ScrollReveal programáticamente
export function useScrollReveal(
  animation: AnimationType = 'fadeUp',
  options: Partial<ScrollRevealProps> = {}
) {
  const { ref, isInView } = useScrollTrigger({
    threshold: options.threshold || 0.1,
    once: options.once !== false,
    rootMargin: options.rootMargin || "0px 0px -50px 0px"
  });
  
  const animationProps = {
    initial: "hidden",
    animate: isInView ? "visible" : "hidden",
    variants: {
      hidden: getHiddenState(animation),
      visible: getVisibleState(animation, options.delay || 0, options.duration || 0.6)
    }
  };
  
  return { ref, isInView, animationProps };
}

// Helpers para estados de animación
function getHiddenState(animation: AnimationType) {
  const states = {
    fadeUp: { opacity: 0, y: 20 },
    fadeDown: { opacity: 0, y: -20 },
    fadeLeft: { opacity: 0, x: -30 },
    fadeRight: { opacity: 0, x: 30 },
    fadeIn: { opacity: 0 },
    scale: { opacity: 0, scale: 0.95 },
    slideUp: { opacity: 0, y: 40 },
    slideLeft: { opacity: 0, x: 50 },
    slideRight: { opacity: 0, x: -50 },
    stagger: {}
  };
  
  return states[animation];
}

function getVisibleState(animation: AnimationType, delay: number, duration: number) {
  const baseTransition = {
    duration,
    delay,
    ease: [0.25, 0.8, 0.25, 1]
  };
  
  const states = {
    fadeUp: { opacity: 1, y: 0, transition: baseTransition },
    fadeDown: { opacity: 1, y: 0, transition: baseTransition },
    fadeLeft: { opacity: 1, x: 0, transition: baseTransition },
    fadeRight: { opacity: 1, x: 0, transition: baseTransition },
    fadeIn: { opacity: 1, transition: baseTransition },
    scale: { 
      opacity: 1, 
      scale: 1, 
      transition: { 
        ...baseTransition, 
        type: "spring", 
        bounce: 0.1 
      } 
    },
    slideUp: { opacity: 1, y: 0, transition: { ...baseTransition, duration: duration * 1.2 } },
    slideLeft: { opacity: 1, x: 0, transition: { ...baseTransition, duration: duration * 1.1 } },
    slideRight: { opacity: 1, x: 0, transition: { ...baseTransition, duration: duration * 1.1 } },
    stagger: { transition: { staggerChildren: 0.1, delayChildren: delay } }
  };
  
  return states[animation];
}
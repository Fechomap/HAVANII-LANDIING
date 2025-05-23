import React, { ReactNode, CSSProperties } from 'react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';

interface AnimateOnScrollProps {
  children: ReactNode;
  animation?: 'fadeUp' | 'fadeIn' | 'scaleUp' | 'slideInLeft' | 'slideInRight';
  duration?: number;
  delay?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
  style?: CSSProperties;
}

/**
 * Componente que anima elementos cuando entran en la vista (reemplaza ScrollReveal)
 * Utiliza la API Intersection Observer mediante nuestro hook personalizado
 * para mejor rendimiento y experiencia de usuario
 */
export const AnimateOnScroll: React.FC<AnimateOnScrollProps> = ({
  children,
  animation = 'fadeUp',
  duration = 0.6,
  delay = 0,
  threshold = 0.2,
  triggerOnce = true,
  className = '',
  style = {},
}) => {
  // Utilizamos nuestro hook personalizado para detectar intersección
  const { ref, isVisible } = useIntersectionObserver({
    threshold,
    triggerOnce,
  });

  // Definir variantes de animación según el tipo seleccionado
  const variants = {
    fadeUp: {
      hidden: { y: 20, opacity: 0 },
      visible: { y: 0, opacity: 1 },
    },
    fadeIn: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    },
    scaleUp: {
      hidden: { scale: 0.95, opacity: 0 },
      visible: { scale: 1, opacity: 1 },
    },
    slideInLeft: {
      hidden: { x: -30, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
    slideInRight: {
      hidden: { x: 30, opacity: 0 },
      visible: { x: 0, opacity: 1 },
    },
  };

  // Optimizaciones de rendimiento inspiradas en nuestras mejoras previas para Swiper
  const optimizedStyle: CSSProperties = {
    willChange: 'transform, opacity',
    backfaceVisibility: 'hidden',
    transform: 'translateZ(0)', // Forzar compositing en GPU
    ...style,
  };

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial="hidden"
      animate={isVisible ? 'visible' : 'hidden'}
      variants={variants[animation]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1], // ease-out-quint para transiciones suaves
      }}
      className={className}
      style={optimizedStyle}
    >
      {children}
    </motion.div>
  );
};

export default AnimateOnScroll;

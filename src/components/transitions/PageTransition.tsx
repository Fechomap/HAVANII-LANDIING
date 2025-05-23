/**
 * @component PageTransition
 * Componente de transición global optimizado para toda la aplicación
 * Reemplaza transiciones manuales con sistema unificado
 * 
 * Características:
 * - Transiciones suaves entre páginas
 * - Respeta prefers-reduced-motion
 * - Optimizado para performance
 * - Compatible con React Router
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

// Configuración de variantes de animación
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02
  }
};

// Transiciones optimizadas para diferentes tipos de contenido
const pageTransition = {
  type: "tween",
  ease: [0.25, 0.8, 0.25, 1], // Apple-style easing
  duration: 0.4
};

// Transición rápida para usuarios que prefieren menos movimiento
const reducedMotionTransition = {
  type: "tween",
  ease: "easeOut",
  duration: 0.15
};

export const PageTransition: React.FC<PageTransitionProps> = ({ 
  children, 
  className = '' 
}) => {
  const location = useLocation();
  
  // Detectar preferencias de movimiento reducido
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Configuración condicional basada en preferencias del usuario
  const variants = prefersReducedMotion ? {
    initial: { opacity: 0 },
    in: { opacity: 1 },
    out: { opacity: 0 }
  } : pageVariants;
  
  const transition = prefersReducedMotion ? reducedMotionTransition : pageTransition;
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={variants}
        transition={transition}
        className={className}
        style={{
          willChange: 'opacity, transform',
          backfaceVisibility: 'hidden',
          transform: 'translateZ(0)' // Forzar aceleración por hardware
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Componente especializado para secciones dentro de páginas
export const SectionTransition: React.FC<{
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
}> = ({ 
  children, 
  delay = 0, 
  duration = 0.6,
  className = '' 
}) => {
  const prefersReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration,
        delay,
        ease: [0.25, 0.8, 0.25, 1]
      }}
      className={className}
      style={{
        willChange: 'opacity, transform',
        backfaceVisibility: 'hidden'
      }}
    >
      {children}
    </motion.div>
  );
};

// Hook personalizado para manejar transiciones programáticamente
export const usePageTransition = () => {
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  
  const startTransition = React.useCallback(() => {
    setIsTransitioning(true);
  }, []);
  
  const endTransition = React.useCallback(() => {
    setIsTransitioning(false);
  }, []);
  
  return {
    isTransitioning,
    startTransition,
    endTransition
  };
};

// Componente de loading optimizado para transiciones
export const TransitionLoader: React.FC<{
  isVisible: boolean;
  message?: string;
}> = ({ isVisible, message = 'Cargando...' }) => {
  if (!isVisible) return null;
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <div className="flex flex-col items-center gap-4 px-8 py-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
        {/* Spinner optimizado */}
        <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        <p className="text-white text-sm font-medium">{message}</p>
      </div>
    </motion.div>
  );
};

// Utilidad para crear transiciones personalizadas
export const createCustomTransition = (
  type: 'slide' | 'fade' | 'scale' | 'flip' = 'fade',
  direction: 'up' | 'down' | 'left' | 'right' = 'up',
  duration: number = 0.4
) => {
  const transitions = {
    slide: {
      initial: {
        opacity: 0,
        x: direction === 'left' ? -100 : direction === 'right' ? 100 : 0,
        y: direction === 'up' ? 50 : direction === 'down' ? -50 : 0
      },
      in: { opacity: 1, x: 0, y: 0 },
      out: {
        opacity: 0,
        x: direction === 'left' ? 100 : direction === 'right' ? -100 : 0,
        y: direction === 'up' ? -50 : direction === 'down' ? 50 : 0
      }
    },
    fade: {
      initial: { opacity: 0 },
      in: { opacity: 1 },
      out: { opacity: 0 }
    },
    scale: {
      initial: { opacity: 0, scale: 0.9 },
      in: { opacity: 1, scale: 1 },
      out: { opacity: 0, scale: 1.1 }
    },
    flip: {
      initial: { opacity: 0, rotateX: -90 },
      in: { opacity: 1, rotateX: 0 },
      out: { opacity: 0, rotateX: 90 }
    }
  };
  
  return {
    variants: transitions[type],
    transition: {
      duration,
      ease: [0.25, 0.8, 0.25, 1]
    }
  };
};

export default PageTransition;

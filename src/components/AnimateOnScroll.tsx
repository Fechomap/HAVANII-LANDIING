import React, { ReactNode, CSSProperties } from 'react';
import { ScrollReveal } from './ScrollReveal';

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
 * @deprecated Este componente está deprecado. Por favor, utiliza el componente ScrollReveal
 * para todas las animaciones nuevas. Este componente se mantiene solo para
 * compatibilidad con código existente.
 * 
 * Ejemplo de migración:
 * 
 * Antes:
 * <AnimateOnScroll animation="fadeUp" duration={0.6}>
 *   <Component />
 * </AnimateOnScroll>
 * 
 * Después:
 * <ScrollReveal animation="fadeUp" duration={0.6}>
 *   <Component />
 * </ScrollReveal>
 * 
 * ScrollReveal ofrece mejor rendimiento, optimizaciones para móviles
 * y respeta prefers-reduced-motion para accesibilidad.
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
  // Mapeo de tipos de animación entre AnimateOnScroll y ScrollReveal
  const mapAnimationType = (type: string): 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'fadeIn' | 'scale' | 'slideUp' | 'slideLeft' | 'slideRight' | 'stagger' => {
    const animationMap: Record<string, any> = {
      'fadeUp': 'fadeUp',
      'fadeIn': 'fadeIn',
      'scaleUp': 'scale',
      'slideInLeft': 'slideLeft',
      'slideInRight': 'slideRight'
    };
    
    return animationMap[type] || 'fadeUp';
  };
  
  // Usamos ScrollReveal internamente, adaptando la API para mantener compatibilidad
  return (
    <ScrollReveal
      animation={mapAnimationType(animation)}
      duration={duration}
      delay={delay}
      threshold={threshold}
      once={triggerOnce}
      className={className}
    >
      {children}
    </ScrollReveal>
  );
};

export default AnimateOnScroll;

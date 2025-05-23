/**
 * @component AppleStyleSection
 * Componente para crear secciones con efectos estilo Apple
 * Incluye parallax mínimo, scroll reveals y optimizaciones de rendimiento
 * 
 * @example
 * <AppleStyleSection
 *   id="servicios"
 *   background="gradient"
 *   parallaxStrength={0.1}
 * >
 *   <SectionContent />
 * </AppleStyleSection>
 */

import React, { useMemo, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from './ScrollReveal';
import { useMinimalParallax } from '@/hooks/useScrollTrigger';

type BackgroundType = 
  | 'none'
  | 'gradient'
  | 'noise'
  | 'pattern'
  | 'custom';

interface AppleStyleSectionProps {
  children: React.ReactNode;
  id?: string;
  className?: string;
  background?: BackgroundType;
  parallaxStrength?: number; // 0 = sin parallax, 0.1 = muy sutil, 0.3 = moderado
  enableParallax?: boolean;
  customBackground?: string;
  padding?: 'none' | 'small' | 'medium' | 'large';
  as?: keyof JSX.IntrinsicElements;
  
  // Props específicas para animación de entrada
  animateOnEnter?: boolean;
  staggerChildren?: number;
  
  // Props de accesibilidad
  'aria-labelledby'?: string;
  role?: string;
}

export const AppleStyleSection: React.FC<AppleStyleSectionProps> = ({
  children,
  id,
  className = '',
  background = 'none',
  parallaxStrength = 0,
  enableParallax = false,
  customBackground,
  padding = 'large',
  as: Component = 'section',
  animateOnEnter = true,
  staggerChildren = 0.1,
  ...accessibilityProps
}) => {
  // Hook de parallax mínimo (solo si está habilitado)
  const { ref: parallaxRef, style: parallaxStyle } = useMinimalParallax(
    enableParallax ? parallaxStrength : 0
  );
  
  // Clases de padding
  const paddingClasses = useMemo(() => {
    const paddingMap = {
      none: '',
      small: 'py-16 md:py-20',
      medium: 'py-20 md:py-28',
      large: 'py-28 md:py-36'
    };
    return paddingMap[padding];
  }, [padding]);
  
  // Clases de background
  const backgroundClasses = useMemo(() => {
    const backgroundMap = {
      none: '',
      gradient: 'bg-gradient-to-b from-[#0B0B0F] via-[#0D0D11] to-[#09090C]',
      noise: 'bg-[#0D0D11] relative',
      pattern: 'bg-[#0D0D11] relative',
      custom: ''
    };
    return backgroundMap[background];
  }, [background]);
  
  // Estilo de background personalizado
  const backgroundStyle = useMemo(() => {
    if (background === 'custom' && customBackground) {
      return { background: customBackground };
    }
    return {};
  }, [background, customBackground]);
  
  // Crear un div ref compatible
  const divRef = useRef<HTMLDivElement>(null);
  
  // Sincronizar referencias cuando sea necesario
  useEffect(() => {
    if (enableParallax && divRef.current) {
      // Aquí podríamos sincronizar las refs si fuera necesario
    }
  }, [enableParallax]);

  // Propiedades de estilo según sea necesario
  const styleProps = enableParallax 
    ? {
        ...backgroundStyle,
        willChange: "transform, opacity",
        backfaceVisibility: "hidden" as const,
        transform: "translateZ(0)"
      }
    : backgroundStyle;
  
  return (
    <div
      ref={divRef}
      id={id}
      className={`relative overflow-hidden ${backgroundClasses} ${paddingClasses} ${className}`}
      style={styleProps}
      {...accessibilityProps}
    >
      {/* Background Effects */}
      {background === 'noise' && <NoiseBackground />}
      {background === 'pattern' && <PatternBackground />}
      
      {/* Content with animation */}
      {animateOnEnter ? (
        <ScrollReveal animation="stagger" staggerChildren={staggerChildren}>
          <div className="relative z-10">
            {children}
          </div>
        </ScrollReveal>
      ) : (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  );
};

// Componente de fondo con ruido
const NoiseBackground: React.FC = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-[0.03]"
    style={{
      backgroundImage: 'url("/assets/noise.png")',
      backgroundBlendMode: 'overlay'
    }}
    aria-hidden="true"
  />
);

// Componente de fondo con patrón
const PatternBackground: React.FC = () => (
  <div 
    className="absolute inset-0 pointer-events-none opacity-10"
    style={{
      backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
      backgroundSize: '60px 60px'
    }}
    aria-hidden="true"
  />
);

// Componente especializado para Hero sections
export const AppleStyleHero: React.FC<{
  children: React.ReactNode;
  backgroundEffects?: React.ReactNode;
  className?: string;
}> = ({ children, backgroundEffects, className = '' }) => {
  return (
    <AppleStyleSection
      as="section"
      className={`min-h-screen flex flex-col ${className}`}
      background="custom"
      customBackground="linear-gradient(to bottom, #000000, #1a1a1a, #000000)"
      padding="none"
      enableParallax={true}
      parallaxStrength={0.05} // Muy sutil para el hero
      animateOnEnter={false} // Hero tiene sus propias animaciones
    >
      {/* Background effects (shooting stars, etc) */}
      {backgroundEffects}
      
      {/* Content */}
      <div className="relative z-10 flex-1">
        {children}
      </div>
    </AppleStyleSection>
  );
};

// Hook para crear secciones con scroll progresivo
export function useProgressiveReveal(totalSections: number = 3) {
  const sectionRefs = Array.from({ length: totalSections }, () => React.useRef(null));
  
  const createSectionProps = (index: number) => ({
    ref: sectionRefs[index],
    animateOnEnter: true,
    staggerChildren: 0.15 + (index * 0.05) // Incrementar delay por sección
  });
  
  return { sectionRefs, createSectionProps };
}

// Utilidad para crear divisores estilo Apple
export const AppleDivider: React.FC<{
  direction?: 'top' | 'bottom';
  color?: string;
  opacity?: number;
}> = ({ 
  direction = 'top', 
  color = 'rgba(255,255,255,0.04)',
  opacity = 1
}) => (
  <div 
    className={`absolute ${direction === 'top' ? 'top-0' : 'bottom-0'} left-0 w-full h-[120px] pointer-events-none z-0`}
    style={{ opacity }}
  >
    <svg 
      className="w-full h-full" 
      viewBox="0 0 1200 120" 
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path 
        d={direction === 'top' 
          ? "M0,0 C150,20 350,0 500,15 C650,30 700,60 900,50 C1050,40 1150,10 1200,0 L1200,120 L0,120 Z"
          : "M0,120 C150,100 350,120 500,105 C650,90 700,60 900,70 C1050,80 1150,110 1200,120 L1200,0 L0,0 Z"
        }
        fill={color}
      />
    </svg>
  </div>
);

// Container optimizado para el contenido principal
export const AppleContainer: React.FC<{
  children: React.ReactNode;
  size?: 'small' | 'medium' | 'large' | 'full';
  className?: string;
}> = ({ children, size = 'large', className = '' }) => {
  const sizeClasses = {
    small: 'max-w-4xl',
    medium: 'max-w-5xl', 
    large: 'max-w-6xl',
    full: 'max-w-7xl'
  };
  
  return (
    <div className={`
      ${sizeClasses[size]} 
      mx-auto 
      px-6 md:px-12 lg:px-24 
      ${className}
    `}>
      {children}
    </div>
  );
};
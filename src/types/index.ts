/**
 * Tipos centralizados para la aplicación Havani
 * Contiene interfaces y tipos comunes utilizados en varios componentes
 */

import type { IconName } from '@/components/ui/Icon';

// Tipos para elementos de sección
export interface SectionProps {
  id?: string;
  className?: string;
  children?: React.ReactNode;
}

// Configuración de animaciones
export interface AnimationProps {
  delay?: number;
  duration?: number;
  once?: boolean;
}

// Opciones para el hook useIntersection
export interface IntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

// Opciones para el hook useParallax
export interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  start?: string;
  end?: string;
  scrub?: boolean | number;
}

// Tipos para optimizador de imágenes
export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  onLoad?: () => void;
  priority?: boolean;
  placeholder?: 'blur' | 'empty' | 'none';
}

// Tipos para información de dispositivo
export interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowPowerDevice: boolean;
  prefersReducedMotion: boolean;
  connection: {
    effectiveType: string;
    saveData: boolean;
  };
}

// Tipos comunes para beneficios
export interface BenefitItem {
  icon: IconName;
  title: string;
  description: string;
  ariaLabel?: string;
}

// Tipos para productos
export interface ProductItem {
  name: string;
  description: string;
  icon: IconName;
  url: string;
}

// Tipos para servicios
export interface ServiceItem {
  name: string;
  description: string;
  icon: IconName;
}

// Tipos para testimonios
export interface TestimonialItem {
  quote: string;
  name: string;
  company?: string;
  image?: string;
}

// Tipos para pasos de proceso
export interface ProcessStep {
  title: string;
  description: string;
  icon: IconName;
  index: number;
}

// Animaciones
export type AnimationVariant = 
  | 'fade-in'
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale-in'
  | 'scale-out'
  | 'float'
  | 'pulse';

// Tipos para estados de UI
export interface UIState {
  isDarkMode: boolean;
  isMobileMenuOpen: boolean;
  isLoading: boolean;
}
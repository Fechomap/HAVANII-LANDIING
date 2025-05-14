// Tipos para secciones
export interface SectionProps {
  id?: string;
  className?: string;
}

// Importa el tipo IconName desde el archivo donde está definido
// import type { IconName } from '../components/Icon';
type IconName = string; // TODO: Reemplaza esto con la importación correcta cuando el archivo exista

// Tipos comunes para beneficios
export interface BenefitItem {
  icon: IconName; // Referenciar el tipo de Icon.tsx
  title: string;
  description: string;
}

// Tipos para componentes con animación
export interface AnimatedProps {
  delay?: number;
  duration?: number;
  once?: boolean;
}

// Tipos para hooks de animación
export interface IntersectionOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  once?: boolean;
}

export interface ParallaxOptions {
  speed?: number;
  direction?: 'vertical' | 'horizontal';
  start?: string;
  end?: string;
  scrub?: boolean | number;
}
import React from 'react';
import { 
  // ValueProp icons
  Square, 
  Lightbulb, 
  Zap, 
  Handshake,
  
  // Services icons
  Rocket,
  Bot,
  Laptop,
  Compass,
  
  // FlagshipProducts icons
  Route,
  FileText,
  Receipt,
  
  // Benefits icons
  Brain,
  Heart,
  
  // Misceláneos e iconos de UI
  ArrowRight,
  ArrowDown,
  ChevronRight,
  Check,
  X,
  Play,
  CheckCircle,
  Twitter,
  Linkedin,
  Menu,
  MoreHorizontal
} from 'lucide-react';

// Tipo centralizado para todos los nombres de iconos permitidos
export type IconName = 
  // ValueProp icons
  | 'simple' 
  | 'idea' 
  | 'speed' 
  | 'handshake'
  // Services icons
  | 'rocket'
  | 'robot'
  | 'laptop'
  | 'compass'
  // FlagshipProducts icons
  | 'route'
  | 'file-text'
  | 'receipt'
  // Benefits icons
  | 'brain-lightning'
  | 'clear'
  | 'handshake-heart'
  // UI icons
  | 'arrow-right'
  | 'arrow-down'
  | 'chevron-right'
  | 'check'
  | 'x'
  | 'play'
  | 'check-circle'
  | 'twitter'
  | 'linkedin'
  | 'menu'
  | 'more-horizontal';

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  'aria-hidden'?: boolean;
  onClick?: () => void;
}

/**
 * Componente unificado para iconos
 * Centraliza todos los iconos utilizados en la aplicación
 * 
 * @example
 * <Icon name="rocket" className="w-6 h-6 text-accent" />
 */
export const Icon: React.FC<IconProps> = ({ 
  name, 
  className = '', 
  size,
  'aria-hidden': ariaHidden = true,
  onClick
}) => {
  // Mapa unificado de todos los iconos
  const iconMap = {
    // ValueProp icons
    'simple': Square,
    'idea': Lightbulb,
    'speed': Zap,
    'handshake': Handshake,
    
    // Services icons
    'rocket': Rocket,
    'robot': Bot,
    'laptop': Laptop,
    'compass': Compass,
    
    // FlagshipProducts icons
    'route': Route,
    'file-text': FileText,
    'receipt': Receipt,
    
    // Benefits icons
    'brain-lightning': Brain,
    'clear': Heart,
    'handshake-heart': Handshake,
    
    // UI icons
    'arrow-right': ArrowRight,
    'arrow-down': ArrowDown,
    'chevron-right': ChevronRight,
    'check': Check,
    'x': X,
    'play': Play,
    'check-circle': CheckCircle,
    'twitter': Twitter,
    'linkedin': Linkedin,
    'menu': Menu,
    'more-horizontal': MoreHorizontal
  };

  const IconComponent = iconMap[name];
  
  // Si el icono no existe, mostrar advertencia en desarrollo
  if (!IconComponent && process.env.NODE_ENV !== 'production') {
    console.warn(`Icon "${name}" not found`);
    return null;
  }
  
  return IconComponent ? (
    <IconComponent 
      className={className}
      size={size} 
      aria-hidden={ariaHidden}
      onClick={onClick}
    />
  ) : null;
};

export default Icon;
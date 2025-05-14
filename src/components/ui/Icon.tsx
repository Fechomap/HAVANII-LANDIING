import React from 'react';
import { 
  // Iconos de ValueProp
  Square, 
  Lightbulb, 
  Zap, 
  Handshake,
  
  // Iconos de Services
  Rocket,
  Bot,
  Laptop,
  Compass,
  
  // Iconos de FlagshipProducts
  Route,
  FileText,
  Receipt,
  
  // Iconos de Benefits
  Brain,
  Heart
} from 'lucide-react';

// Tipos de iconos unificados
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
  | 'handshake-heart';

interface IconProps {
  name: IconName;
  className?: string;
  'aria-hidden'?: boolean;
}

export const Icon: React.FC<IconProps> = ({ 
  name, 
  className = '', 
  'aria-hidden': ariaHidden = true 
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
    'handshake-heart': Handshake
  };

  const IconComponent = iconMap[name];
  
  return <IconComponent 
    className={className} 
    aria-hidden={ariaHidden} 
  />;
};

export default Icon;
import { motion } from 'framer-motion';
import { BenefitIcon } from './BenefitIcon';
import type { Benefit } from './benefitsData';
import { useState, useCallback } from 'react';

const BenefitCard: React.FC<Benefit> = ({
  title,
  description,
  icon,
  illustration,
  ariaLabel
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Callbacks memoizados para mejor rendimiento
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);
  
  // Variantes simplificadas y más rápidas
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.95, // Reducido de 0.9 a 0.95
      y: 20 // Reducido de 32 a 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4, // Reducido de 0.65 a 0.4
        ease: "easeOut" // Cambio de 'linear' a 'easeOut'
      }
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      className="group relative flex flex-col items-center text-center px-8 py-14 rounded-[32px] bg-[#1E1F24] overflow-hidden shadow-[0_12px_28px_-8px_rgba(0,0,0,0.55)] hover:shadow-[0_16px_32px_-8px_rgba(123,97,255,0.15)] transition-shadow duration-300"
      role="article"
      tabIndex={0}
      aria-label={ariaLabel}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      // Optimizaciones críticas de rendimiento
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)',
        WebkitFontSmoothing: 'antialiased'
      }}
      // Optimización hover con GPU
      whileHover={{
        y: -4, // Reducido de -8 a -4
        transition: { duration: 0.2 }
      }}
    >
      {/* Icon Bubble optimizado */}
      <div 
        className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2A2B30] border border-white/10 backdrop-blur-[2px] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.4)]"
        style={{
          willChange: isHovered ? 'transform' : 'auto',
          backfaceVisibility: 'hidden',
          transform: isHovered ? 'translateZ(0) rotate(6deg) scale(1.05)' : 'translateZ(0)', // Reducido de scale(1.1) a scale(1.05)
          transition: 'transform 200ms ease-out' // Aumentado de 150ms a 200ms para suavidad
        }}
      >
        <BenefitIcon name={icon} className="w-8 h-8 stroke-[#7B61FF]" />
      </div>

      {/* Title */}
      <h3 className="relative z-10 mt-10 text-xl font-semibold text-white">
        {title}
      </h3>

      {/* Description */}
      <p className="relative z-10 mt-4 text-sm leading-relaxed text-[#BBBBBB]">
        {description}
      </p>

      {/* Accent underline optimizado */}
      <span 
        className="absolute bottom-0 left-1/2 h-[3px] bg-[#7B61FF]"
        style={{
          willChange: isHovered ? 'transform, width' : 'auto',
          backfaceVisibility: 'hidden',
          transform: 'translateX(-50%) translateZ(0)',
          transition: 'width 200ms ease-out', // Aumentado de 150ms a 200ms
          width: isHovered ? '100px' : '0px' // Reducido de 200px a 100px
        }}
      />

      {/* Glow effect en hover */}
      <div 
        className="absolute inset-0 rounded-[32px] bg-[#7B61FF]/5 opacity-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          willChange: 'opacity'
        }}
      />
    </motion.article>
  );
};

export default BenefitCard;
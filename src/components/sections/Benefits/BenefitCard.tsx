
import { motion } from 'framer-motion';
import { BenefitIcon } from './BenefitIcon';
import type { Benefit } from './benefitsData';
import { useState } from 'react';

const BenefitCard: React.FC<Benefit> = ({
  title,
  description,
  icon,
  illustration,
  ariaLabel
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 32 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.65,
        ease: 'linear'
      }
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      className="group relative flex flex-col items-center text-center px-8 py-14 rounded-[32px] bg-[#15161B] overflow-hidden shadow-[0_12px_28px_-8px_rgba(0,0,0,0.55)]"
      role="article"
      tabIndex={0}
      aria-label={ariaLabel}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        willChange: 'transform',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      {/* Abstract Illustration */}
      <img
        src={illustration}
        alt=""
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-[220px] h-[220px] pointer-events-none select-none md:block hidden"
        loading="lazy"
        decoding="async"
        style={{
          willChange: 'opacity',
          backfaceVisibility: 'hidden',
          opacity: isHovered ? 0.8 : 0.6,
          transition: 'opacity 150ms linear'
        }}
      />

      {/* Icon Bubble */}
      <div 
        className="relative z-10 flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-[2px] shadow-[0_4px_12px_-2px_rgba(0,0,0,0.4)]"
        style={{
          willChange: 'transform',
          backfaceVisibility: 'hidden',
          transform: isHovered ? 'translateZ(0) rotate(6deg) scale(1.1)' : 'translateZ(0)',
          transition: 'transform 150ms linear'
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

      {/* Accent underline */}
      <span 
        className="absolute bottom-0 left-1/2 h-[3px] bg-[#7B61FF]"
        style={{
          willChange: 'transform, width',
          backfaceVisibility: 'hidden',
          transform: 'translateX(-50%) translateZ(0)',
          transition: 'width 150ms linear',
          width: isHovered ? '200px' : '0px'
        }}
      />
    </motion.article>
  );
};

export default BenefitCard;

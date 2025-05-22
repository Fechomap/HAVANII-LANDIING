import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { benefits } from './benefitsData';
import BenefitCard from './BenefitCard';

const BenefitsSection = () => {
  const sectionRef = useRef(null);
  
  // Usar useInView de framer-motion directamente para mejor rendimiento
  const isInView = useInView(sectionRef, { 
    once: true, 
    amount: 0.2, // Reducido para activarse antes
    margin: "0px 0px -100px 0px" // Margen negativo para activación temprana
  });

  // Variantes optimizadas con duraciones más cortas
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1, // Reducido de 0.18 a 0.1
        delayChildren: 0.05 // Reducido de 0.1 a 0.05
      }
    }
  };

  // Variantes de heading más rápidas
  const headingVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4, // Reducido de 0.6 a 0.4
        ease: "easeOut" // Cambio de ease personalizado a preset
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-labelledby="kb-title"
      className="relative bg-[#0D0D11] overflow-hidden"
      style={{
        backgroundImage: 'url("/assets/noise.png")',
        backgroundBlendMode: 'overlay',
        // Optimizaciones de rendimiento
        willChange: isInView ? 'auto' : 'transform',
        backfaceVisibility: 'hidden',
        transform: 'translateZ(0)'
      }}
    >
      {/* Radial glow optimizado */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(123,97,255,0.06) 0%, transparent 70%)',
          filter: 'blur(80px)', // Reducido de 120px a 80px
          willChange: 'opacity'
        }}
      />

      <div className="relative max-w-[1240px] mx-auto px-6 md:px-12 lg:px-24 py-[140px] md:py-[180px] flex flex-col">
        {/* Título optimizado */}
        <motion.h2
          id="kb-title"
          className="text-center text-3xl md:text-4xl font-extrabold text-white"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={headingVariants}
        >
          La Diferencia Havani: Más Allá del Código
        </motion.h2>

        <motion.p 
          className="mt-6 text-center mx-auto max-w-[680px] text-[#BBBBBB] text-lg md:text-xl"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0, y: 10 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: {
                duration: 0.4,
                delay: 0.1,
                ease: "easeOut"
              }
            }
          }}
        >
          Elegir un partner tecnológico es clave; descubre por qué nuestro enfoque rompe el molde.
        </motion.p>

        {/* Grid de beneficios optimizado */}
        <motion.div
          className="relative mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            // Optimizaciones GPU
            willChange: isInView ? 'auto' : 'transform',
            backfaceVisibility: 'hidden',
            transform: 'translateZ(0)'
          }}
        >
          {benefits.map((benefit, index) => (
            <BenefitCard key={`benefit-${index}`} {...benefit} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;
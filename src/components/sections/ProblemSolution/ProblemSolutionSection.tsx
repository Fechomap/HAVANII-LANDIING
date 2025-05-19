import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useIntersection } from '@/hooks/useIntersection';
import { useParallax } from '@/hooks/useParallax';

const ProblemSolutionSection = () => {
  // Ref for the section to trigger animations when it's visible
  const sectionRef = useIntersection(
    (entry) => {
      if (entry.isIntersecting) {
        // Animation will be handled by Framer Motion
      }
    },
    { 
      root: null,
      rootMargin: '0px',
      threshold: 0.45,
      once: true
    }
  );
  
  // Ref for the image container to enable 3D tilt effect
  const imageRef = useRef<HTMLDivElement>(null);
  
  // Create a parallax effect for the image when scrolling
  const parallaxRef = useParallax({ speed: 0.25, direction: 'vertical' });

  // Animation variants for text elements
  const titleVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: [0.33, 0.66, 0.66, 1] }
    }
  };

  const problemVariants = {
    hidden: { opacity: 0, x: -32 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.55, delay: 0.15, ease: [0.23, 1, 0.32, 1] }
    }
  };

  const solutionVariants = {
    hidden: { opacity: 0, x: -32 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.55, delay: 0.3, ease: [0.23, 1, 0.32, 1] }
    }
  };
  
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, x: 44 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      x: 0, 
      transition: { duration: 0.8, delay: 0.4, ease: [0.33, 1.5, 0.5, 1] }
    }
  };

  // Handle mouse move for tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    
    const { clientX, clientY } = e;
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    
    // Apply tilt effect
    imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 6}deg) rotateX(${-y * 6}deg)`;
  };
  
  const handleMouseLeave = () => {
    if (!imageRef.current) return;
    
    // Reset transform on mouse leave
    imageRef.current.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
  };

  return (
    <section 
      ref={sectionRef}
      aria-labelledby="ps-title"
      className="relative bg-[#0B0B0F] overflow-hidden"
    >
      {/* Top decorative wave */}
      <svg 
        className="absolute top-0 left-0 w-full h-[120px]" 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path 
          d="M0,0 C150,20 350,0 500,15 C650,30 700,60 900,50 C1050,40 1150,10 1200,0 L1200,120 L0,120 Z" 
          fill="rgba(255,255,255,0.04)" 
        />
      </svg>
      
      {/* Main content container */}
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-[140px] md:py-[180px] grid grid-cols-1 lg:grid-cols-[52%_48%] gap-16 items-center">
        
        {/* Left column - Text content */}
        <div>
          <motion.h2 
            id="ps-title"
            className="text-3xl md:text-4xl font-extrabold leading-snug text-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={titleVariants}
          >
            Navegar el Desarrollo Puede Ser un Laberinto... Hasta Ahora.
          </motion.h2>
          
                      {/* Problem block */}
          <motion.div 
            className="relative pl-6 border-l-2 lg:border-l-[#FF5F5F]/70 border-l-[#FF5F5F] mt-10 group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={problemVariants}
          >
            {/* Usando texto alineado a la derecha en un contenedor de ancho fijo */}
            <div className="sr-only lg:not-sr-only lg:absolute lg:-left-[150px] lg:top-0 lg:w-[130px] lg:text-right">
              <span className="text-xs tracking-wider uppercase text-[#FF5F5F]">
                El problema
              </span>
            </div>
            <p className="text-[#FF5F5F]/90 lg:text-[#FF5F5F]/90 italic leading-relaxed">
              <span className="lg:hidden font-bold text-[#FF5F5F]">Problema: </span>
              Los equipos técnicos tradicionales complican todo: plazos eternos, comunicación confusa, y costos impredecibles. 
              Tu empresa queda atrapada entre tecnología incomprensible y promesas que nunca llegan a materializarse.
            </p>
            <div className="absolute left-[-2px] top-0 h-full w-[2px] bg-[#FF5F5F]/70 shadow-[0_0_8px_0_#FF5F5F] animate-pulse lg:animate-[pulse_0.8s_ease-in-out_1]" />
            {/* Línea de hover para EL PROBLEMA - similar a la de NUESTRA SOLUCIÓN */}
            <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-[#FF5F5F]/70 to-[#FF5F5F]/40 group-hover:w-full group-focus:w-full transition-all duration-250 ease-out" />
          </motion.div>
          
          {/* Solution block */}
          <motion.div 
            className="relative pl-6 border-l-2 lg:border-l-[#7B61FF]/70 border-l-[#7B61FF] mt-8 group"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={solutionVariants}
            tabIndex={0}
          >
            {/* Usando texto alineado a la derecha en un contenedor del mismo ancho fijo */}
            <div className="sr-only lg:not-sr-only lg:absolute lg:-left-[150px] lg:top-0 lg:w-[130px] lg:text-right">
              <span className="text-xs tracking-wider uppercase text-[#7B61FF]/80">
                Nuestra solución
              </span>
            </div>
            <p className="text-[#BBBBBB] leading-relaxed">
              <span className="lg:hidden font-bold text-[#7B61FF]">Solución: </span>
              Havani traduce la complejidad técnica en soluciones claras y efectivas. 
              Acortamos tiempos de entrega, simplificamos la comunicación y garantizamos costos predecibles. 
              Tu negocio avanza mientras nosotros nos encargamos del desarrollo, sin tanto rollo.
            </p>
            <div className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-[#7B61FF]/70 to-[#7B61FF]/40 group-hover:w-full group-focus:w-full transition-all duration-250 ease-out" />
          </motion.div>
        </div>
        
        {/* Right column - Illustration */}
        <motion.figure 
          ref={parallaxRef}
          className="relative order-last lg:order-none"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={imageVariants}
        >
          <div 
            ref={imageRef}
            className="relative rounded-3xl border border-white/6 shadow-[inset_0_0_20px_rgba(0,0,0,.25)] overflow-hidden transition-transform duration-300 ease-out will-change-transform"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="aspect-w-4 aspect-h-3">
              <img 
                src="/images/imageproblem.jpeg" 
                alt="Ilustración del problema y solución" 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            {/* Glow effect */}
            <div className="absolute -bottom-10 -right-10 w-[200px] h-[200px] rounded-full bg-[#7B61FF] opacity-20 blur-[140px] will-change-transform" />
          </div>
        </motion.figure>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
/**
 * @component HeroSection - Sección principal (Hero) de la landing page de Havani
 * Versión optimizada para mejor rendimiento y tiempos de carga
 */

import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useIntersection } from '@/hooks/useIntersection';
import { Play, ArrowDown } from 'lucide-react';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';

// Carga diferida del Header para priorizar los elementos visibles
const Header = lazy(() => import('./Header'));

// Componente minimalista para ser usado como fallback durante la carga
const HeaderSkeleton = () => (
  <header className="fixed top-0 inset-x-0 z-50 h-20 bg-black/30 backdrop-blur-sm">
    <div className="max-w-[1280px] mx-auto px-6 py-6 flex justify-between">
      <div className="w-32 h-8 bg-white/10 rounded animate-pulse"></div>
      <div className="hidden md:flex gap-4">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="w-20 h-8 bg-white/10 rounded animate-pulse"></div>
        ))}
      </div>
    </div>
  </header>
);

// Componente optimizado del Hero
const HeroSection = () => {
  // Estados para animaciones
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isContentLoaded, setIsContentLoaded] = useState(false);
  const [isHeaderVisible, setIsHeaderVisible] = useState(false);
  const controls = useAnimation();
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  
  // Obtener información del dispositivo para optimizaciones específicas
  const { isLowPowerDevice, isMobile, prefersReducedMotion } = useDeviceInfo();
  
  // Detectar intersección para iniciar animaciones solo cuando sea visible
  const elementRef = useIntersection((entry) => {
    if (entry.isIntersecting) {
      // Mostrar contenido principal
      setIsContentLoaded(true);
      
      // En dispositivos de baja potencia o con preferencia de reducción de movimiento,
      // mostrar directamente sin animación
      if (!isLowPowerDevice && !prefersReducedMotion) {
        controls.start('visible');
      }
    }
  });
  
  // Mostrar Header con un pequeño retraso para priorizar el contenido principal
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHeaderVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Manejar eventos de scroll de manera optimizada con throttling
  useEffect(() => {
    let lastScrollTime = 0;
    const scrollThreshold = 50; // ms
    
    const handleScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < scrollThreshold) return;
      lastScrollTime = now;
      
      if (window.scrollY > 8 && !hasScrolled) {
        setHasScrolled(true);
        
        // Ocultar indicador de scroll
        if (scrollIndicatorRef.current) {
          scrollIndicatorRef.current.style.opacity = '0';
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasScrolled]);
  
  // Manejar scroll suave al hacer clic en el indicador
  const handleScrollClick = () => {
    const valorSection = document.getElementById('valor');
    if (valorSection) {
      valorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Variantes de animación simplificadas - reducir complejidad para dispositivos lentos
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: isLowPowerDevice ? 0.02 : 0.06,
        delayChildren: 0.1,
      }
    }
  };
  
  // Definir variantes de animación solo si son necesarias
  const textVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      }
    }
  };
  
  const mockupVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      ref={elementRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      id="hero"
    >
      {/* Header con carga diferida */}
      {isHeaderVisible ? (
        <Suspense fallback={<HeaderSkeleton />}>
          <Header hasScrolled={hasScrolled} />
        </Suspense>
      ) : (
        <HeaderSkeleton />
      )}
      
      {/* Nebulosa de fondo - Optimizada */}
      {!isLowPowerDevice && (
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-full md:w-[120%] h-[80%] opacity-30 z-0"
          style={{
            background: 'radial-gradient(circle at center 20%, rgba(123, 97, 255, 0.4) 0%, rgba(0, 0, 0, 0) 70%)',
            filter: isMobile ? 'blur(80px)' : 'blur(120px)',
          }}
          aria-hidden="true"
        />
      )}
      
      {/* Grid principal - Renderizado condicional para mejor rendimiento */}
      <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[46%_54%] gap-8 px-6 md:px-12 lg:px-24 pt-36 pb-24 md:pt-44 md:pb-28">
        
        {/* Columna izquierda - Texto */}
        <motion.div
          variants={containerVariants}
          initial={prefersReducedMotion ? "visible" : "hidden"}
          animate={isContentLoaded ? "visible" : "hidden"}
          className="flex flex-col order-2 lg:order-1"
        >
          {/* Badge */}
          <motion.div 
            className="group inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/10 text-sm font-semibold text-white hover:bg-white/20 cursor-pointer"
            variants={textVariants}
          >
            Descubre Havani 
            <span className="ml-1">→</span>
          </motion.div>
          
          {/* Headline - Optimizado sin drop-shadow costosa */}
          <motion.h1 
            className="mt-4 text-[clamp(44px,6vw,72px)] font-extrabold leading-[1.1] text-white"
            variants={textVariants}
          >
            <span className="block">HAVANI</span>
            <span className="block">Desarrollo Sin Tanto Rollo.</span>
          </motion.h1>
          
          {/* Subtítulo */}
          <motion.p 
            className="mt-6 max-w-[540px] text-lg md:text-xl text-[#CCCCCC]"
            variants={textVariants}
          >
            Desarrollo a medida con un enfoque práctico y transparente. Entregamos innovación, velocidad y profesionalismo en cada línea de código.
          </motion.p>
          
          {/* Botones - Sin animaciones innecesarias */}
          <motion.div 
            className="flex flex-col md:flex-row gap-4 md:gap-6 mt-10"
            variants={textVariants}
          >
            {/* Botón primario */}
            <button
              className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold hover:shadow-lg transition-shadow duration-200 relative overflow-hidden group"
            >
              <span className="absolute inset-0 w-0 bg-[#7B61FF]/10 transition-all duration-300 group-hover:w-full"></span>
              <span className="relative z-10">Hablemos de tu Idea</span>
            </button>
            
            {/* Botón secundario */}
            <button
              className="px-8 py-4 rounded-full border border-white/40 text-white/90 hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <span className="flex items-center justify-center">
                <Play className="w-5 h-5" />
              </span>
              Watch Video
            </button>
          </motion.div>
        </motion.div>
        
        {/* Columna derecha - Mockup con optimizaciones */}
        <div className="relative order-1 lg:order-2">
          <motion.div 
            className="relative"
            variants={mockupVariants}
            initial={prefersReducedMotion ? "visible" : "hidden"}
            animate={isContentLoaded ? "visible" : "hidden"}
          >
            {/* Glow effect simplificado para mejor rendimiento */}
            {!isLowPowerDevice && (
              <div
                className="absolute inset-0 -z-10 opacity-60"
                style={{
                  background: 'radial-gradient(70% 50% at center center, rgba(123, 97, 255, 0.3) 0%, rgba(0, 0, 0, 0) 100%)',
                  filter: 'blur(60px)',
                }}
                aria-hidden="true"
              />
            )}
            
            {/* Imagen del mockup - Con lazy loading y dimensiones explícitas */}
            <img 
              src="/placeholder.svg"
              alt="Panel Havani" 
              width="760"
              height="480"
              className="w-full max-w-[760px] h-auto rounded-2xl border border-white/6 shadow-lg"
              loading="lazy"
              decoding="async"
            />
          </motion.div>
        </div>
      </div>
      
      {/* Indicador de scroll - Simplificado */}
      {!isMobile && (
        <div
          ref={scrollIndicatorRef}
          className="absolute left-1/2 -translate-x-1/2 bottom-8 z-20 flex items-center justify-center cursor-pointer opacity-80 hover:opacity-100 transition-opacity"
          onClick={handleScrollClick}
          aria-label="Ir a la siguiente sección"
        >
          <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center">
            <ArrowDown className="w-5 h-5 text-white/70" />
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
/**
 * @component HeroSection - Sección principal (Hero) de la landing page de Havani
 * Versión optimizada: mejor rendimiento + transiciones más fluidas
 */

import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Play, ArrowDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';
import HeroShootingStarsBackground from '@/components/HeroShootingStarsBackground';
import Header from './Header';

// Props para pasar funciones personalizadas
interface HeroSectionProps {
  onHomeClick?: (e: React.MouseEvent) => void;
}

// Componente optimizado del Hero
const HeroSection = ({ onHomeClick }: HeroSectionProps = {}) => {
  // Estados para animaciones y efectos
  const [hasScrolled, setHasScrolled] = useState(false);
  const controls = useAnimation();
  const heroRef = useRef(null);
  const isInView = useInView(heroRef, { once: true, amount: 0.2 });
  
  // Hook de navegación restaurado
  const { goToHome, isTransitioning, completeTransition } = useHomeNavigation();
  
  // Obtener información del dispositivo
  const { isMobile, prefersReducedMotion } = useDeviceInfo();
  
  // Manejar eventos de scroll con throttling para mejor rendimiento
  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = lastScrollY > 50;
          if (scrolled !== hasScrolled) {
            setHasScrolled(scrolled);
          }
          ticking = false;
        });
        
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);
  
  // Iniciar animaciones cuando la sección sea visible - optimizado
  useEffect(() => {
    if (isInView) {
      // Pequeño retraso para mejorar la percepción de carga
      const timer = setTimeout(() => {
        controls.start('visible');
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isInView, controls]);
  
  // Manejar scroll suave al hacer clic en el indicador - optimizado con RAF
  const handleScrollClick = useCallback(() => {
    const nextSection = document.querySelector('#valor');
    if (!nextSection) return;
    
    // Implementación personalizada de scroll suave para mejor rendimiento
    const startPosition = window.scrollY;
    const targetPosition = nextSection.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 800;
    let startTime: number | null = null;
    
    // Función de easing para scroll más natural
    const easeOutCubic = (t: number): number => 1 - Math.pow(1 - t, 3);
    
    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutCubic(progress);
      
      window.scrollTo(0, startPosition + distance * easeProgress);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    
    window.requestAnimationFrame(step);
  }, []);

  // Variantes de animación optimizadas y memoizadas
  const containerVariants = React.useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08, // Reducido para acelerar la carga
        delayChildren: 0.05,
      }
    }
  }), []);
  
  const textVariants = React.useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 15, // Reducido para animaciones más rápidas
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.4, // Reducido para mejor rendimiento
        ease: "easeOut",
      }
    }
  }), []);
  
  const mockupVariants = React.useMemo(() => ({
    hidden: { 
      opacity: 0, 
      scale: 0.95, 
      y: 10 // Reducido para animaciones más rápidas
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.5, // Reducido para mejor rendimiento
        ease: "easeOut",
        delay: 0.1
      }
    }
  }), []);

  return (
    <section 
      ref={heroRef}
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      id="hero"
    >
      {/* Componente de transición restaurado */}
      <HomeTransition 
        isActive={isTransitioning} 
        onComplete={completeTransition} 
      />
      
      {/* Header integrado */}
      <Header hasScrolled={hasScrolled} onHomeClick={onHomeClick} />
      
      {/* Fondo optimizado y con mejor rendimiento */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente base simple */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        
        {/* Componente de estrellas fugaces */}
        <div className="absolute inset-0 z-[1]">
          <HeroShootingStarsBackground />
        </div>
        
        {/* Nebulosa principal simplificada y optimizada */}
        <div 
          className="absolute top-0 left-1/2 w-[120%] h-[100%] opacity-30 z-[2]"
          style={{
            background: 'radial-gradient(circle at center 25%, rgba(123, 97, 255, 0.4) 0%, rgba(123, 97, 255, 0.1) 50%, transparent 70%)',
            filter: 'blur(60px)', // Reducido para mejor rendimiento
            transform: 'translateX(-50%)',
            willChange: 'opacity', // Optimización para GPU
            backfaceVisibility: 'hidden'
          }}
          aria-hidden="true"
        />
        
        {/* Grid de puntos sutil - optimizado */}
        <div 
          className="absolute inset-0 opacity-10 z-[3]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            willChange: 'opacity'
          }}
        />
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[46%_54%] gap-8 px-6 md:px-12 lg:px-24 pt-36 pb-24 md:pt-44 md:pb-28 flex-1 items-center">
        
        {/* Columna izquierda - Texto */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="flex flex-col order-2 lg:order-1"
        >
          {/* Badge optimizado */}
          <motion.div 
            variants={textVariants}
            className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold text-white hover:bg-white/15 cursor-pointer transition-colors duration-200 w-max"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
            style={{ willChange: "transform" }}
          >
            <Sparkles className="w-4 h-4 text-[#7B61FF]" />
            Descubre Havani 
            <span className="ml-1">→</span>
          </motion.div>
          
          {/* Headline principal con gradientes */}
          <motion.h1 
            variants={textVariants}
            className="mt-6 text-[clamp(48px,6vw,78px)] font-extrabold leading-[0.95] text-white"
          >
            <span className="block">
              <span className="bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
                HAVANI
              </span>
            </span>
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-[#7B61FF] to-[#9575FF] bg-clip-text text-transparent">
                Desarrollo Sin
              </span>
            </span>
            <span className="block">
              <span className="bg-gradient-to-r from-[#7B61FF] to-[#9575FF] bg-clip-text text-transparent">
                Tanto Rollo.
              </span>
            </span>
          </motion.h1>
          
          {/* Subtítulo */}
          <motion.p 
            variants={textVariants}
            className="mt-8 max-w-[540px] text-xl md:text-2xl text-gray-300 leading-relaxed font-light"
          >
            Desarrollo a medida con un enfoque 
            <span className="text-white font-medium"> práctico y transparente</span>. 
            Entregamos innovación, velocidad y profesionalismo en cada línea de código.
          </motion.p>
          
          {/* Botones optimizados */}
          <motion.div 
            variants={textVariants}
            className="flex flex-col md:flex-row gap-4 md:gap-6 mt-12"
          >
            {/* Botón primario optimizado */}
            <Link to="/#contacto" onClick={goToHome}>
              <motion.button
                className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#9575FF] text-white font-bold text-lg shadow-[0_8px_32px_rgba(123,97,255,0.3)] border border-[#7B61FF]/30 overflow-hidden"
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: "0 12px 40px rgba(123, 97, 255, 0.4)"
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.2 }}
                style={{ willChange: "transform" }}
              >
                {/* Efecto de brillo en hover - optimizado */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                <span className="relative z-10">Hablemos de tu Idea</span>
              </motion.button>
            </Link>
            
            {/* Botón secundario - optimizado */}
            <motion.button
              className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-colors duration-200 backdrop-blur-sm"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
              style={{ willChange: "transform" }}
            >
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                <Play className="w-4 h-4 ml-0.5" />
              </div>
              Watch Demo
            </motion.button>
          </motion.div>
          
          {/* Indicadores de confianza */}
          <motion.div
            variants={textVariants}
            className="mt-12 flex items-center gap-6 text-sm text-gray-400"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>En línea ahora</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span>Respuesta en 24h</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎯</span>
              <span>Sin compromisos</span>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Columna derecha - Mockup optimizado para rendimiento */}
        <motion.div 
          className="relative order-1 lg:order-2"
          variants={mockupVariants}
          initial="hidden"
          animate={controls}
          style={{ willChange: "transform, opacity" }}
        >
          {/* Efecto de resplandor simplificado y optimizado */}
          <div
            className="absolute inset-0 -z-10 opacity-40"
            style={{
              background: 'radial-gradient(70% 50% at center center, rgba(123, 97, 255, 0.25) 0%, transparent 100%)',
              filter: 'blur(40px)',
              willChange: 'opacity',
              transform: 'translateZ(0)'
            }}
          />
          
          {/* Container de la imagen - optimizado */}
          <motion.div 
            className="relative rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm"
            whileHover={{ 
              scale: 1.01,
              transition: { duration: 0.2 }
            }}
            style={{ willChange: "transform" }}
          >
            {/* Imagen del mockup - optimizada */}
            <img 
              src="/placeholder.svg"
              alt="Panel de control Havani - Dashboard principal"
              className="w-full h-auto"
              loading="eager"
              decoding="async"
              fetchPriority="high"
              style={{ transform: 'translateZ(0)' }}
            />
            
            {/* Overlay sutil */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />
          </motion.div>
        </motion.div>
      </div>
      
      {/* Indicador de scroll - optimizado */}
      {!isMobile && (
        <motion.div
          className="absolute left-1/2 bottom-8 z-20 flex flex-col items-center cursor-pointer group"
          onClick={handleScrollClick}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
          whileHover={{ y: -2 }}
          style={{ 
            willChange: "transform", 
            transform: "translateX(-50%)",
            backfaceVisibility: "hidden"
          }}
        >
          <div className="text-xs text-gray-400 mb-2 font-medium tracking-wider uppercase">
            Scroll para explorar
          </div>
          <motion.div 
            className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/50 transition-colors backdrop-blur-sm"
            animate={{ y: [0, 4, 0] }}
            transition={{ 
              duration: 1.5, 
              repeat: Infinity, 
              ease: "easeInOut",
              repeatType: "mirror" 
            }}
            style={{ willChange: "transform" }}
          >
            <ArrowDown className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

// Wrap component with React.memo to prevent unnecessary re-renders
export default memo(HeroSection);
/**
 * @component HeroSection - Sección principal (Hero) de la landing page de Havani
 * Versión COMPLETA: AnimateOnScroll + parallax + animaciones optimizadas
 */

import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import { useAppleStyleScroll } from '@/hooks/useAppleStyleScroll';
import { ScrollReveal } from '@/components/ScrollReveal';
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
  
  // Hook de navegación restaurado
  const { goToHome, isTransitioning, completeTransition } = useHomeNavigation();
  
  // Obtener información del dispositivo
  const { isMobile, prefersReducedMotion } = useDeviceInfo();
  
  // Hook para scroll suave Apple-style
  const { scrollToElement } = useAppleStyleScroll();
  
  // Parallax para nebulosa con Framer Motion
  const { scrollY } = useScroll();
  const nebulasY = useTransform(scrollY, [0, 1000], [0, -100]);
  const nebulasOpacity = useTransform(scrollY, [0, 500], [0.3, 0.1]);
  
  // Manejar eventos de scroll con throttling para mejor rendimiento
  useEffect(() => {
    // Inicializar el estado de scroll inmediatamente para evitar cambios bruscos
    setHasScrolled(window.scrollY > 50);
    
    let ticking = false;
    let lastScrollY = window.scrollY;
    
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
    
    // Usar { passive: true } para mejor rendimiento en Chrome
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasScrolled]);
  
  // Manejar scroll suave al hacer clic en el indicador - Apple style
  const handleScrollClick = useCallback(() => {
    scrollToElement('valor'); // Usar el nuevo hook de Apple scroll
  }, [scrollToElement]);

  return (
    <section 
      className="relative w-full min-h-screen overflow-hidden flex flex-col"
      id="hero"
    >
      {/* Header integrado - prioridad alta para interactividad */}
      <Header hasScrolled={hasScrolled} onHomeClick={onHomeClick} />
      
      {/* Componente de transición restaurado */}
      <HomeTransition 
        isActive={isTransitioning} 
        onComplete={completeTransition} 
      />
      
      {/* Fondo optimizado y con mejor rendimiento */}
      <div className="absolute inset-0 z-0">
        {/* Gradiente base simple */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
        
        {/* Componente de estrellas fugaces */}
        <div className="absolute inset-0 z-[1]">
          <HeroShootingStarsBackground />
        </div>
        
        {/* Nebulosa principal con parallax y animación */}
        <motion.div 
          style={{ 
            y: nebulasY,
            opacity: nebulasOpacity,
            willChange: "transform, opacity",
            backfaceVisibility: "hidden"
          }}
          className="absolute top-0 left-1/2 w-[120%] h-[100%] z-[2]"
          aria-hidden="true"
        >
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 2, -2, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            style={{
              background: 'radial-gradient(circle at center 25%, rgba(123, 97, 255, 0.4) 0%, rgba(123, 97, 255, 0.1) 50%, transparent 70%)',
              filter: 'blur(60px)',
              transform: 'translateX(-50%)',
              width: '100%',
              height: '100%',
              willChange: 'transform',
              backfaceVisibility: 'hidden'
            }}
          />
        </motion.div>
        
        {/* Grid de puntos con animación */}
        <motion.div 
          className="absolute inset-0 opacity-10 z-[3]"
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px', '0px 0px'],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
            willChange: 'background-position'
          }}
        />
      </div>
      
      {/* Contenido principal */}
      <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[46%_54%] gap-8 px-6 md:px-12 lg:px-24 pt-36 pb-24 md:pt-44 md:pb-28 flex-1 items-center">
        
        {/* Columna izquierda - Texto */}
        <div className="flex flex-col order-2 lg:order-1">
          
          {/* Badge optimizado con animaciones */}
          <ScrollReveal animation="fadeUp" duration={0.6} delay={0.1}>
            <motion.div 
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold text-white hover:bg-white/15 cursor-pointer transition-colors duration-200 w-max"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 32px rgba(123, 97, 255, 0.3)"
              }}
              animate={{
                boxShadow: [
                  "0 0 0 rgba(123, 97, 255, 0)",
                  "0 0 20px rgba(123, 97, 255, 0.1)",
                  "0 0 0 rgba(123, 97, 255, 0)"
                ]
              }}
              transition={{
                boxShadow: { duration: 3, repeat: Infinity }
              }}
            >
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-4 h-4 text-[#7B61FF]" />
              </motion.div>
              Descubre Havani 
              <motion.span 
                className="ml-1"
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </motion.div>
          </ScrollReveal>
          
          {/* Headline principal con gradientes */}
          <ScrollReveal animation="fadeUp" duration={0.8} delay={0.2}>
            <h1 className="mt-6 text-[clamp(48px,6vw,78px)] font-extrabold leading-[0.95] text-white">
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
            </h1>
          </ScrollReveal>
          
          {/* Subtítulo */}
          <ScrollReveal animation="fadeUp" duration={0.8} delay={0.4}>
            <p className="mt-8 max-w-[540px] text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              Desarrollo a medida con un enfoque 
              <span className="text-white font-medium"> práctico y transparente</span>. 
              Entregamos innovación, velocidad y profesionalismo en cada línea de código.
            </p>
          </ScrollReveal>
          
          {/* Botones optimizados */}
          <ScrollReveal animation="fadeUp" duration={0.8} delay={0.6}>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-12">
              {/* Botón primario optimizado */}
              <Link to="/#contacto" onClick={goToHome}>
                <motion.button 
                  className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#9575FF] text-white font-bold text-lg shadow-[0_8px_32px_rgba(123,97,255,0.3)] border border-[#7B61FF]/30 overflow-hidden"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 12px 40px rgba(123, 97, 255, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      "0 8px 32px rgba(123, 97, 255, 0.3)",
                      "0 12px 36px rgba(123, 97, 255, 0.4)",
                      "0 8px 32px rgba(123, 97, 255, 0.3)"
                    ]
                  }}
                  transition={{
                    boxShadow: { duration: 2, repeat: Infinity }
                  }}
                >
                  {/* Efecto de brillo mejorado */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: ["-100%", "100%"]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1
                    }}
                  />
                  <span className="relative z-10">Hablemos de tu Idea</span>
                </motion.button>
              </Link>
              
              {/* Botón secundario con animación */}
              <motion.button 
                className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-colors duration-200 backdrop-blur-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <motion.div 
                  className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Play className="w-4 h-4 ml-0.5" />
                </motion.div>
                Watch Demo
              </motion.button>
            </div>
          </ScrollReveal>
          
          {/* Indicadores de confianza con animaciones */}
          <ScrollReveal animation="fadeUp" duration={0.6} delay={0.8}>
            <div className="mt-12 flex items-center gap-6 text-sm text-gray-400">
              <motion.div 
                className="flex items-center gap-2"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <motion.div 
                  className="w-2 h-2 bg-green-400 rounded-full"
                  animate={{ 
                    scale: [1, 1.3, 1],
                    boxShadow: [
                      "0 0 0 rgba(34, 197, 94, 0)",
                      "0 0 8px rgba(34, 197, 94, 0.5)",
                      "0 0 0 rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span>En línea ahora</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  ⚡
                </motion.span>
                <span>Respuesta en 24h</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <motion.span
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  🎯
                </motion.span>
                <span>Sin compromisos</span>
              </motion.div>
            </div>
          </ScrollReveal>
        </div>
        
        {/* Columna derecha - Mockup optimizado para rendimiento */}
        <ScrollReveal 
          animation="slideLeft" 
          duration={1.0} 
          delay={0.4}
          className="relative order-1 lg:order-2"
        >
          {/* Efecto de resplandor mejorado */}
          <div
            className="absolute inset-0 -z-10 opacity-50"
            style={{
              background: 'radial-gradient(80% 60% at center center, rgba(123, 97, 255, 0.3) 0%, transparent 100%)',
              filter: 'blur(50px)',
              willChange: 'opacity',
              transform: 'translateZ(0)'
            }}
          />
          
          {/* Dashboard más grande y animado */}
          <motion.div 
            className="relative rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.4 }}
          >
            {/* Dashboard simulado con CSS - COLORES CONTRASTANTES */}
            <div className="relative w-full aspect-[5/4] bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 md:p-12">
              
              {/* Header del dashboard con animación */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <motion.div 
                    className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500"
                    animate={{ 
                      rotate: [0, 360],
                      boxShadow: [
                        "0 0 0 rgba(6, 182, 212, 0)",
                        "0 0 20px rgba(6, 182, 212, 0.4)",
                        "0 0 0 rgba(6, 182, 212, 0)"
                      ]
                    }}
                    transition={{ 
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                      boxShadow: { duration: 2, repeat: Infinity }
                    }}
                  />
                  <div className="text-white font-bold text-lg">Havani Dashboard</div>
                </div>
                <div className="flex gap-3">
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-red-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-yellow-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}
                  />
                  <motion.div 
                    className="w-4 h-4 rounded-full bg-green-400"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
              </div>
              
              {/* Contenido principal del dashboard */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Panel principal animado - CYAN/BLUE */}
                <motion.div 
                  className="col-span-2 h-40 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 backdrop-blur-sm p-6 relative overflow-hidden"
                  animate={{
                    background: [
                      "linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))",
                      "linear-gradient(to right, rgba(59, 130, 246, 0.2), rgba(6, 182, 212, 0.2))",
                      "linear-gradient(to right, rgba(6, 182, 212, 0.2), rgba(59, 130, 246, 0.2))"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <motion.div 
                    className="w-24 h-5 bg-white/30 rounded mb-4"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div 
                    className="w-40 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded shadow-lg"
                    animate={{ 
                      width: ["10rem", "12rem", "10rem"],
                      boxShadow: [
                        "0 4px 6px rgba(6, 182, 212, 0.2)",
                        "0 8px 25px rgba(6, 182, 212, 0.4)",
                        "0 4px 6px rgba(6, 182, 212, 0.2)"
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  <motion.div 
                    className="absolute bottom-6 right-6 text-3xl font-bold text-white"
                    animate={{ 
                      scale: [1, 1.1, 1],
                      color: ["#ffffff", "#06b6d4", "#ffffff"]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    +247%
                  </motion.div>
                </motion.div>
                
                {/* Panel lateral con métricas - ORANGE/AMBER */}
                <motion.div 
                  className="h-40 rounded-2xl bg-white/5 border border-orange-400/30 backdrop-blur-sm p-6"
                  animate={{
                    borderColor: [
                      "rgba(251, 146, 60, 0.3)",
                      "rgba(245, 158, 11, 0.5)",
                      "rgba(251, 146, 60, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  <div className="w-20 h-4 bg-orange-200/30 rounded mb-4" />
                  <div className="space-y-3">
                    <motion.div 
                      className="w-full h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded shadow-md"
                      animate={{ width: ["100%", "80%", "100%"] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                    <motion.div 
                      className="w-3/4 h-3 bg-gradient-to-r from-amber-400 to-yellow-400 rounded shadow-md"
                      animate={{ width: ["75%", "90%", "75%"] }}
                      transition={{ duration: 2.5, repeat: Infinity }}
                    />
                    <motion.div 
                      className="w-1/2 h-3 bg-gradient-to-r from-yellow-400 to-lime-400 rounded shadow-md"
                      animate={{ width: ["50%", "65%", "50%"] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              </div>
              
              {/* Charts animados mejorados */}
              <div className="grid grid-cols-3 gap-6">
                {/* Gráfico de barras - VERDE/TEAL */}
                <div className="h-32 rounded-2xl bg-white/5 border border-emerald-400/30 backdrop-blur-sm p-6">
                  <div className="flex items-end gap-2 h-full">
                    {[60, 80, 40, 90, 70, 95, 55].map((height, index) => (
                      <motion.div
                        key={index}
                        className="flex-1 rounded-t shadow-lg"
                        style={{
                          background: index % 2 === 0 
                            ? 'linear-gradient(to top, #10b981, #14b8a6)' 
                            : 'linear-gradient(to top, #14b8a6, #06b6d4)',
                        }}
                        animate={{ 
                          height: [`${height * 0.7}%`, `${height}%`, `${height * 0.8}%`, `${height}%`],
                          boxShadow: [
                            "0 0 0 rgba(16, 185, 129, 0)",
                            "0 4px 20px rgba(16, 185, 129, 0.3)",
                            "0 0 0 rgba(16, 185, 129, 0)"
                          ]
                        }}
                        transition={{ 
                          duration: 3, 
                          repeat: Infinity,
                          delay: index * 0.2 
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Gráfico circular - ROSA/PURPLE */}
                <div className="h-32 rounded-2xl bg-white/5 border border-pink-400/30 backdrop-blur-sm p-6 flex items-center justify-center">
                  <div className="relative">
                    <motion.div 
                      className="w-20 h-20 rounded-full border-4 border-pink-300/30"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div 
                      className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-pink-400 border-r-purple-400"
                      animate={{ 
                        rotate: [0, 270],
                        borderTopColor: ["#f472b6", "#a855f7", "#f472b6"],
                        borderRightColor: ["#a855f7", "#f472b6", "#a855f7"]
                      }}
                      transition={{ 
                        rotate: { duration: 2, repeat: Infinity },
                        borderTopColor: { duration: 3, repeat: Infinity },
                        borderRightColor: { duration: 3, repeat: Infinity }
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.span 
                        className="text-white font-bold text-sm"
                        animate={{ 
                          scale: [1, 1.1, 1],
                          color: ["#ffffff", "#f472b6", "#ffffff"]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        73%
                      </motion.span>
                    </div>
                  </div>
                </div>
                
                {/* Panel de estadísticas - AZUL/INDIGO */}
                <motion.div 
                  className="h-32 rounded-2xl bg-white/5 border border-blue-400/30 backdrop-blur-sm p-6"
                  animate={{
                    borderColor: [
                      "rgba(96, 165, 250, 0.3)",
                      "rgba(129, 140, 248, 0.5)",
                      "rgba(96, 165, 250, 0.3)"
                    ]
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <motion.div 
                    className="text-xs text-blue-200/80 mb-2 font-semibold"
                    animate={{ opacity: [0.8, 1, 0.8] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    LIVE DATA
                  </motion.div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">Users</span>
                      <motion.span 
                        className="text-cyan-400 font-bold"
                        animate={{ 
                          color: ["#22d3ee", "#06b6d4", "#22d3ee"],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        1,247
                      </motion.span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">Sales</span>
                      <motion.span 
                        className="text-blue-400 font-bold"
                        animate={{ 
                          color: ["#60a5fa", "#3b82f6", "#60a5fa"],
                          scale: [1, 1.05, 1]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                      >
                        $47.2K
                      </motion.span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">Growth</span>
                      <motion.span 
                        className="text-emerald-400 font-bold"
                        animate={{ 
                          color: ["#34d399", "#10b981", "#34d399"],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 1.8, repeat: Infinity }}
                      >
                        +12.7%
                      </motion.span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            
            {/* Overlay mejorado */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />
          </motion.div>
        </ScrollReveal>
      </div>
      
      {/* Indicador de scroll con más animación */}
      {!isMobile && (
        <ScrollReveal 
          animation="fadeUp" 
          delay={1.0} 
          duration={0.6}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.button
            onClick={handleScrollClick}
            className="flex flex-col items-center group"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div 
              className="text-xs text-gray-400 mb-2 font-medium tracking-wider uppercase"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              Scroll para explorar
            </motion.div>
            <motion.div 
              className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/50 transition-colors backdrop-blur-sm"
              animate={{ 
                borderColor: [
                  "rgba(255, 255, 255, 0.3)",
                  "rgba(123, 97, 255, 0.5)",
                  "rgba(255, 255, 255, 0.3)"
                ],
                boxShadow: [
                  "0 0 0 rgba(123, 97, 255, 0)",
                  "0 0 20px rgba(123, 97, 255, 0.3)",
                  "0 0 0 rgba(123, 97, 255, 0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ y: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowDown className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </motion.div>
            </motion.div>
          </motion.button>
        </ScrollReveal>
      )}
    </section>
  );
};

// Wrap component with React.memo to prevent unnecessary re-renders
export default memo(HeroSection);
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
  
  // Iniciar animaciones cuando la sección sea visible - optimizado para rendimiento inmediato
  useEffect(() => {
    if (isInView) {
      // Iniciar animaciones inmediatamente para mejor interactividad
      controls.start('visible');
    }
  }, [isInView, controls]);
  
  // Manejar scroll suave al hacer clic en el indicador - optimizado con RAF y para Chrome
  const handleScrollClick = useCallback(() => {
    const nextSection = document.querySelector('#valor');
    if (!nextSection) return;
    
    // Proporcionar feedback visual inmediato - pequeño movimiento para indicar respuesta
    const preScrollPosition = window.scrollY;
    const targetPreScroll = preScrollPosition + 5;
    window.scrollTo(0, targetPreScroll);
    
    // Implementación personalizada de scroll suave para mejor rendimiento
    const startPosition = window.scrollY;
    const targetPosition = nextSection.getBoundingClientRect().top + window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 600; // Reducido para mayor responsividad
    let startTime: number | null = null;
    let lastPosition = startPosition;
    
    // Función de easing para scroll más natural - optimizada para Chrome
    const easeOutQuad = (t: number): number => 1 - (1 - t) * (1 - t);
    
    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutQuad(progress);
      
      // Calcular nueva posición
      const newPosition = startPosition + distance * easeProgress;
      
      // Solo actualizar si hay un cambio significativo
      if (Math.abs(newPosition - lastPosition) > 1) {
        window.scrollTo({
          top: newPosition,
          behavior: 'auto' // Usar 'auto' en lugar de 'smooth' para evitar lag en Chrome
        });
        lastPosition = newPosition;
      }
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    
    // Iniciar la animación inmediatamente
    window.requestAnimationFrame(step);
  }, []);

  // Variantes de animación optimizadas y memoizadas - mejoradas para Chrome
  const containerVariants = React.useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05, // Aún más reducido para acelerar la carga
        delayChildren: 0.02,
      }
    }
  }), []);
  
  const textVariants = React.useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 10, // Reducido para animaciones más rápidas
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.3, // Reducido para mejor rendimiento en Chrome
        ease: "easeOut",
      }
    }
  }), []);
  
  const mockupVariants = React.useMemo(() => ({
    hidden: { 
      opacity: 0, 
      scale: 0.97, // Menos dramático para mejor rendimiento
      y: 5 // Reducido para animaciones más rápidas
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.4, // Reducido para mejor rendimiento en Chrome
        ease: "easeOut",
        delay: 0.05 // Reducido para respuesta más rápida
      }
    }
  }), []);

  return (
    <section 
      ref={heroRef}
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
{/* Reemplaza toda la sección del mockup por esto: */}
<motion.div 
  className="relative order-1 lg:order-2"
  variants={mockupVariants}
  initial="hidden"
  animate={controls}
  style={{ willChange: "transform, opacity" }}
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
    whileHover={{ 
      scale: 1.05,
      transition: { duration: 0.4 }
    }}
    style={{ willChange: "transform" }}
  >
    {/* Dashboard simulado con CSS - COLORES CONTRASTANTES */}
    <div className="relative w-full aspect-[5/4] bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 md:p-12">
      
      {/* Header del dashboard con animación */}
      <motion.div 
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="flex items-center gap-4">
          <motion.div 
            className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500"
            animate={{ 
              rotate: [0, 5, -5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <div className="text-white font-bold text-lg">Havani Dashboard</div>
        </div>
        <div className="flex gap-3">
          <motion.div 
            className="w-4 h-4 rounded-full bg-red-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div 
            className="w-4 h-4 rounded-full bg-yellow-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
          />
          <motion.div 
            className="w-4 h-4 rounded-full bg-green-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
          />
        </div>
      </motion.div>
      
      {/* Contenido principal del dashboard */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        {/* Panel principal animado - CYAN/BLUE */}
        <motion.div 
          className="col-span-2 h-40 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 backdrop-blur-sm p-6 relative overflow-hidden"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          {/* Animación de fondo que se mueve */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 to-transparent"
            animate={{ x: [-100, 100, -100] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div 
            className="w-24 h-5 bg-white/30 rounded mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <motion.div 
            className="w-40 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded shadow-lg"
            animate={{ 
              width: [160, 180, 160],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          
          {/* Números animados */}
          <motion.div 
            className="absolute bottom-6 right-6 text-3xl font-bold text-white"
            animate={{ 
              scale: [1, 1.1, 1],
              color: ["#ffffff", "#22d3ee", "#ffffff"]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            +247%
          </motion.div>
        </motion.div>
        
        {/* Panel lateral con métricas - ORANGE/AMBER */}
        <motion.div 
          className="h-40 rounded-2xl bg-white/5 border border-orange-400/30 backdrop-blur-sm p-6"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <motion.div 
            className="w-20 h-4 bg-orange-200/30 rounded mb-4"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.8, repeat: Infinity }}
          />
          <div className="space-y-3">
            <motion.div 
              className="w-full h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded shadow-md"
              animate={{ width: ["100%", "90%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <motion.div 
              className="w-3/4 h-3 bg-gradient-to-r from-amber-400 to-yellow-400 rounded shadow-md"
              animate={{ width: ["75%", "85%", "75%"] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
            />
            <motion.div 
              className="w-1/2 h-3 bg-gradient-to-r from-yellow-400 to-lime-400 rounded shadow-md"
              animate={{ width: ["50%", "60%", "50%"] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            />
          </div>
        </motion.div>
      </div>
      
      {/* Charts animados mejorados */}
      <div className="grid grid-cols-3 gap-6">
        {/* Gráfico de barras - VERDE/TEAL */}
        <motion.div 
          className="h-32 rounded-2xl bg-white/5 border border-emerald-400/30 backdrop-blur-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.5 }}
        >
          <div className="flex items-end gap-2 h-full">
            {[60, 80, 40, 90, 70, 95, 55].map((height, index) => (
              <motion.div
                key={index}
                className="flex-1 rounded-t shadow-lg"
                style={{
                  background: index % 2 === 0 
                    ? 'linear-gradient(to top, #10b981, #14b8a6)' 
                    : 'linear-gradient(to top, #14b8a6, #06b6d4)'
                }}
                initial={{ height: 0 }}
                animate={{ 
                  height: `${height}%`,
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{ 
                  duration: 0.8,
                  delay: 1.3 + index * 0.1,
                  opacity: { duration: 2, repeat: Infinity, delay: index * 0.2 }
                }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Gráfico circular - ROSA/PURPLE */}
        <motion.div 
          className="h-32 rounded-2xl bg-white/5 border border-pink-400/30 backdrop-blur-sm p-6 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.5 }}
        >
          <div className="relative">
            <motion.div 
              className="w-20 h-20 rounded-full border-4 border-pink-300/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            />
            <motion.div 
              className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-pink-400 border-r-purple-400"
              animate={{ rotate: [0, 270, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
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
        </motion.div>
        
        {/* Panel de estadísticas - AZUL/INDIGO */}
        <motion.div 
          className="h-32 rounded-2xl bg-white/5 border border-blue-400/30 backdrop-blur-sm p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div 
            className="text-xs text-blue-200/80 mb-2 font-semibold"
            animate={{ opacity: [0.6, 1, 0.6] }}
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
                  scale: [1, 1.05, 1],
                  color: ["#22d3ee", "#06b6d4", "#22d3ee"]
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                1,247
              </motion.span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Sales</span>
              <motion.span 
                className="text-blue-400 font-bold"
                animate={{ 
                  scale: [1, 1.05, 1],
                  color: ["#60a5fa", "#3b82f6", "#60a5fa"]
                }}
                transition={{ duration: 1.8, repeat: Infinity, delay: 0.3 }}
              >
                $47.2K
              </motion.span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-white/80 text-sm">Growth</span>
              <motion.span 
                className="text-emerald-400 font-bold"
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.8, 1, 0.8]
                }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
              >
                +12.7%
              </motion.span>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Efectos de resplandor interno animados */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-t from-cyan-400/10 via-transparent to-transparent pointer-events-none"
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      
      {/* Partículas flotantes con colores contrastantes */}
      <motion.div
        className="absolute top-10 right-10 w-2 h-2 bg-cyan-400 rounded-full shadow-lg"
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.2, 1]
        }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-1.5 h-1.5 bg-orange-400 rounded-full shadow-lg"
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.3, 1]
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 right-1/4 w-1 h-1 bg-pink-400 rounded-full shadow-lg"
        animate={{
          x: [0, 10, 0],
          opacity: [0.3, 1, 0.3],
          scale: [1, 1.4, 1]
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
      />
    </div>
    
    {/* Overlay mejorado */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />
    
    {/* Efecto de brillo en hover */}
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0"
      whileHover={{ 
        opacity: 1,
        x: ['-100%', '100%']
      }}
      transition={{ duration: 0.8 }}
    />
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
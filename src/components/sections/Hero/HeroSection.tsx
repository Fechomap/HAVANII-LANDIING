/**
 * @component HeroSection - Sección principal (Hero) de la landing page de Havani
 * Versión MIGRADA FASE 2: AnimateOnScroll + parallax mínimo + optimizaciones máximas
 */

import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import { Play, ArrowDown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import { useAppleStyleScroll } from '@/hooks/useAppleStyleScroll';
import { useMinimalParallax } from '@/hooks/useScrollTrigger';
import AnimateOnScroll from '@/components/AnimateOnScroll';
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
  
  // Parallax mínimo para nebulosa (solo en desktop)
  const { ref: nebulasRef, style: nebulasStyle } = useMinimalParallax(0.03); // Muy sutil
  
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
        
        {/* Nebulosa principal con parallax mínimo */}
        <div 
          ref={nebulasRef}
          style={nebulasStyle}
          className="absolute top-0 left-1/2 w-[120%] h-[100%] opacity-30 z-[2]"
          aria-hidden="true"
        >
          <div
            style={{
              background: 'radial-gradient(circle at center 25%, rgba(123, 97, 255, 0.4) 0%, rgba(123, 97, 255, 0.1) 50%, transparent 70%)',
              filter: 'blur(60px)',
              transform: 'translateX(-50%)',
              width: '100%',
              height: '100%',
              willChange: 'opacity',
              backfaceVisibility: 'hidden'
            }}
          />
        </div>
        
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
        <div className="flex flex-col order-2 lg:order-1">
          
          {/* Badge optimizado */}
          <AnimateOnScroll animation="fadeUp" duration={0.6} delay={0.1}>
            <div className="group inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-sm font-semibold text-white hover:bg-white/15 cursor-pointer transition-colors duration-200 w-max">
              <Sparkles className="w-4 h-4 text-[#7B61FF]" />
              Descubre Havani 
              <span className="ml-1">→</span>
            </div>
          </AnimateOnScroll>
          
          {/* Headline principal con gradientes */}
          <AnimateOnScroll animation="fadeUp" duration={0.8} delay={0.2}>
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
          </AnimateOnScroll>
          
          {/* Subtítulo */}
          <AnimateOnScroll animation="fadeUp" duration={0.8} delay={0.4}>
            <p className="mt-8 max-w-[540px] text-xl md:text-2xl text-gray-300 leading-relaxed font-light">
              Desarrollo a medida con un enfoque 
              <span className="text-white font-medium"> práctico y transparente</span>. 
              Entregamos innovación, velocidad y profesionalismo en cada línea de código.
            </p>
          </AnimateOnScroll>
          
          {/* Botones optimizados */}
          <AnimateOnScroll animation="fadeUp" duration={0.8} delay={0.6}>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-12">
              {/* Botón primario optimizado */}
              <Link to="/#contacto" onClick={goToHome}>
                <button className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#7B61FF] to-[#9575FF] text-white font-bold text-lg shadow-[0_8px_32px_rgba(123,97,255,0.3)] border border-[#7B61FF]/30 overflow-hidden hover:scale-105 transition-transform duration-300">
                  {/* Efecto de brillo en hover - optimizado */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-500" />
                  <span className="relative z-10">Hablemos de tu Idea</span>
                </button>
              </Link>
              
              {/* Botón secundario - optimizado */}
              <button className="group flex items-center justify-center gap-3 px-8 py-4 rounded-full border-2 border-white/30 text-white font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-colors duration-200 backdrop-blur-sm">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 group-hover:bg-white/30 transition-colors">
                  <Play className="w-4 h-4 ml-0.5" />
                </div>
                Watch Demo
              </button>
            </div>
          </AnimateOnScroll>
          
          {/* Indicadores de confianza */}
          <AnimateOnScroll animation="fadeUp" duration={0.6} delay={0.8}>
            <div className="mt-12 flex items-center gap-6 text-sm text-gray-400">
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
            </div>
          </AnimateOnScroll>
        </div>
        
        {/* Columna derecha - Mockup optimizado para rendimiento */}
        <AnimateOnScroll 
          animation="slideInLeft" 
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
          <div className="relative rounded-3xl border border-white/10 shadow-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm hover:scale-105 transition-transform duration-400">
            {/* Dashboard simulado con CSS - COLORES CONTRASTANTES */}
            <div className="relative w-full aspect-[5/4] bg-gradient-to-br from-gray-900 via-gray-800 to-black p-8 md:p-12">
              
              {/* Header del dashboard con animación */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 animate-pulse" />
                  <div className="text-white font-bold text-lg">Havani Dashboard</div>
                </div>
                <div className="flex gap-3">
                  <div className="w-4 h-4 rounded-full bg-red-400 animate-pulse" />
                  <div className="w-4 h-4 rounded-full bg-yellow-400 animate-pulse" style={{ animationDelay: '0.3s' }} />
                  <div className="w-4 h-4 rounded-full bg-green-400 animate-pulse" style={{ animationDelay: '0.6s' }} />
                </div>
              </div>
              
              {/* Contenido principal del dashboard */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Panel principal animado - CYAN/BLUE */}
                <div className="col-span-2 h-40 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 backdrop-blur-sm p-6 relative overflow-hidden">
                  <div className="w-24 h-5 bg-white/30 rounded mb-4 animate-pulse" />
                  <div className="w-40 h-8 bg-gradient-to-r from-cyan-400 to-blue-500 rounded shadow-lg" />
                  <div className="absolute bottom-6 right-6 text-3xl font-bold text-white animate-pulse">
                    +247%
                  </div>
                </div>
                
                {/* Panel lateral con métricas - ORANGE/AMBER */}
                <div className="h-40 rounded-2xl bg-white/5 border border-orange-400/30 backdrop-blur-sm p-6">
                  <div className="w-20 h-4 bg-orange-200/30 rounded mb-4" />
                  <div className="space-y-3">
                    <div className="w-full h-3 bg-gradient-to-r from-orange-400 to-amber-400 rounded shadow-md animate-pulse" />
                    <div className="w-3/4 h-3 bg-gradient-to-r from-amber-400 to-yellow-400 rounded shadow-md animate-pulse" />
                    <div className="w-1/2 h-3 bg-gradient-to-r from-yellow-400 to-lime-400 rounded shadow-md animate-pulse" />
                  </div>
                </div>
              </div>
              
              {/* Charts animados mejorados */}
              <div className="grid grid-cols-3 gap-6">
                {/* Gráfico de barras - VERDE/TEAL */}
                <div className="h-32 rounded-2xl bg-white/5 border border-emerald-400/30 backdrop-blur-sm p-6">
                  <div className="flex items-end gap-2 h-full">
                    {[60, 80, 40, 90, 70, 95, 55].map((height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t shadow-lg animate-pulse"
                        style={{
                          background: index % 2 === 0 
                            ? 'linear-gradient(to top, #10b981, #14b8a6)' 
                            : 'linear-gradient(to top, #14b8a6, #06b6d4)',
                          height: `${height}%`,
                          animationDelay: `${index * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Gráfico circular - ROSA/PURPLE */}
                <div className="h-32 rounded-2xl bg-white/5 border border-pink-400/30 backdrop-blur-sm p-6 flex items-center justify-center">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full border-4 border-pink-300/30 animate-spin" />
                    <div className="absolute inset-0 w-20 h-20 rounded-full border-4 border-transparent border-t-pink-400 border-r-purple-400 animate-pulse" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-white font-bold text-sm animate-pulse">73%</span>
                    </div>
                  </div>
                </div>
                
                {/* Panel de estadísticas - AZUL/INDIGO */}
                <div className="h-32 rounded-2xl bg-white/5 border border-blue-400/30 backdrop-blur-sm p-6">
                  <div className="text-xs text-blue-200/80 mb-2 font-semibold animate-pulse">
                    LIVE DATA
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">Users</span>
                      <span className="text-cyan-400 font-bold animate-pulse">1,247</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">Sales</span>
                      <span className="text-blue-400 font-bold animate-pulse">$47.2K</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">Growth</span>
                      <span className="text-emerald-400 font-bold animate-pulse">+12.7%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Overlay mejorado */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-white/5 pointer-events-none" />
          </div>
        </AnimateOnScroll>
      </div>
      
      {/* Indicador de scroll - optimizado */}
      {!isMobile && (
        <AnimateOnScroll 
          animation="fadeUp" 
          delay={1.0} 
          duration={0.6}
          className="absolute left-1/2 bottom-8 z-20 flex flex-col items-center cursor-pointer group"
          style={{ transform: "translateX(-50%)" }}
        >
          <button
            onClick={handleScrollClick}
            className="flex flex-col items-center group"
          >
            <div className="text-xs text-gray-400 mb-2 font-medium tracking-wider uppercase">
              Scroll para explorar
            </div>
            <div className="w-12 h-12 rounded-full border-2 border-white/30 flex items-center justify-center group-hover:border-white/50 transition-colors backdrop-blur-sm animate-bounce">
              <ArrowDown className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </div>
          </button>
        </AnimateOnScroll>
      )}
    </section>
  );
};

// Wrap component with React.memo to prevent unnecessary re-renders
export default memo(HeroSection);
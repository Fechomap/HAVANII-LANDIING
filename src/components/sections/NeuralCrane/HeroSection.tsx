import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { motion } from 'framer-motion';

const HeroSection = () => {
  const { goToHome } = useHomeNavigation();
  return (
    <section className="relative w-full min-h-[90vh] overflow-hidden flex flex-col pt-32 md:pt-48 pb-24">
      {/* Nebulosa glow - Optimizada para rendimiento */}
      <div 
        className="absolute top-[240px] left-[50%] w-[1800px] h-[900px] z-0"
        style={{
          background: '#7B61FF33',
          filter: 'blur(80px)',
          mixBlendMode: 'normal',
          willChange: 'opacity',
          transform: 'translate3d(-50%, 0, 0)',
          backfaceVisibility: 'hidden'
        }}
        aria-hidden="true"
      />
      {/* Grid principal */}
      <div className="relative z-10 max-w-[1280px] mx-auto grid grid-cols-1 lg:grid-cols-[46%_54%] gap-8 px-6 md:px-12 lg:px-24">
        {/* Columna izquierda - Texto */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "linear", repeatType: "mirror" }}
          className="flex flex-col"
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        >
          <div className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-white/10 text-sm font-semibold text-white hover:bg-white/20 w-max">
            Producto Estrella 
            <span 
              className="w-4 h-4 transform transition-transform duration-200 hover:translate-x-1"
              style={{ willChange: "transform" }}
            >
              →
            </span>
          </div>
          <h1 className="mt-4 text-[clamp(44px,6vw,76px)] font-extrabold leading-[1.1] text-white drop-shadow-[0_4px_24px_rgba(0,0,0,.5)]">
            <span className="block">Transforma tu</span>
            <span className="block text-[#7B61FF]">Operación</span>
            <span className="block text-2xl md:text-3xl mt-2">Gestión Inteligente de Grúas en Tiempo Real</span>
          </h1>
          <p className="mt-6 max-w-[540px] text-lg md:text-xl text-[#CCCCCC] tracking-tight">
            Sin trucos, sin sesgos, solo tecnología de verdad. Una flotilla sincronizada como una red inteligente, operando con precisión.
          </p>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <CheckCircle className="h-6 w-6 text-[#7B61FF]" />
              </div>
              <p className="text-[#BBBBBB]">
                <span className="text-white font-semibold">Asignación Automática y Precisa</span> con identificación del recurso óptimo en tiempo récord
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <CheckCircle className="h-6 w-6 text-[#7B61FF]" />
              </div>
              <p className="text-[#BBBBBB]">
                <span className="text-white font-semibold">Seguimiento en Tiempo Real</span> desde la asignación hasta la finalización
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <CheckCircle className="h-6 w-6 text-[#7B61FF]" />
              </div>
              <p className="text-[#BBBBBB]">
                <span className="text-white font-semibold">Optimización de Costos</span> y automatización de procesos críticos
              </p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <CheckCircle className="h-6 w-6 text-[#7B61FF]" />
              </div>
              <p className="text-[#BBBBBB]">
                <span className="text-white font-semibold">Reducción del Error Humano</span> mediante tarificación automatizada
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 mt-10">
            <Link to="/#contacto" onClick={(e) => {
              if (e.currentTarget.getAttribute('href')?.startsWith('/#')) {
                goToHome(e);
              }
            }}>
              <Button className="px-8 py-4 rounded-full bg-white text-[#7B61FF] font-bold shadow-[0_0_15px_rgba(123,97,255,0.3)] transition-all duration-200 hover:shadow-[0_0_25px_rgba(123,97,255,0.5)] hover:outline-[#7B61FF] hover:outline-2 hover:outline-offset-4 relative overflow-hidden group" style={{ willChange: "transform", transform: "translateZ(0)" }}>
                <span className="absolute inset-0 w-0 bg-[#7B61FF]/20 transition-all duration-200 group-hover:w-full" style={{ willChange: "width" }}></span>
                <span className="relative z-10">Solicitar Demo</span>
              </Button>
            </Link>
            <Link to="#pricing">
              <Button variant="outline" className="px-8 py-4 rounded-full border border-white/40 text-white/90 hover:bg-white hover:text-[#060E15] transition-colors" style={{ willChange: "transform", transform: "translateZ(0)" }}>
                Ver Planes y Precios
              </Button>
            </Link>
          </div>
        </motion.div>
        
        {/* Columna derecha - Mockup */}
        <motion.div 
          className="relative"
          initial={{ opacity: 0, scale: 0.88, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, ease: "linear", repeatType: "mirror" }}
          style={{ willChange: "transform", backfaceVisibility: "hidden", transform: "translateZ(0)" }}
        >
          {/* Glow effect para el mockup */}
          <div
            className="absolute inset-0 -z-10"
            style={{
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(123, 97, 255, 0.5) 0%, rgba(123, 97, 255, 0) 100%)',
              transform: 'translateY(40px)',
              filter: 'blur(120px)',
              willChange: 'transform, opacity'
            }}
            aria-hidden="true"
          />
          {/* Imagen del mockup */}
          <OptimizedImage
            src="/placeholder.svg"
            alt="Interfaz del sistema NeuralCrane con mapa de seguimiento de grúas en tiempo real"
            width={760}
            height={480}
            className="w-full max-w-[760px] h-auto rounded-[32px] border border-white/6 shadow-[0_40px_60px_-10px_rgba(0,0,0,.6)] translate-y-[40px]"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

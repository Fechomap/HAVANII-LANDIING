import React, { useRef } from 'react';
import { ScrollReveal } from '@/components/ScrollReveal';
import OptimizedImage from '@/components/ui/OptimizedImage';

const ProblemSolutionSection = () => {
  return (
    <section 
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
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-12 lg:px-24 py-[120px] sm:py-[140px] md:py-[180px] grid grid-cols-1 lg:grid-cols-[45%_55%] gap-8 sm:gap-12 lg:gap-16 items-start lg:items-center">
        
        {/* Left column - Text content */}
        <div>
          <ScrollReveal animation="fadeUp" duration={0.8}>
            <h2 
              id="ps-title"
              className="text-3xl md:text-4xl font-extrabold leading-snug text-white"
            >
              Navegar el Desarrollo Puede Ser un Laberinto... Hasta Ahora.
            </h2>
          </ScrollReveal>
          
          {/* Problem block */}
          <ScrollReveal animation="slideRight" delay={0.2} duration={0.7}>
            <div className="relative pl-6 border-l-2 lg:border-l-[#FF5F5F]/70 border-l-[#FF5F5F] mt-10 group">
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
            </div>
          </ScrollReveal>
          
          {/* Solution block */}
          <ScrollReveal animation="slideRight" delay={0.4} duration={0.7}>
            <div className="relative pl-6 border-l-2 lg:border-l-[#7B61FF]/70 border-l-[#7B61FF] mt-8 group" tabIndex={0}>
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
            </div>
          </ScrollReveal>
        </div>
        
        {/* Right column - Imagen completa del laberinto/cerebro */}
        <ScrollReveal animation="slideLeft" delay={0.6} duration={0.8}>
          <figure className="relative w-full flex justify-center">
            {/* Contenedor con altura fija para controlar tamaño y mostrar imagen completa */}
            <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] max-w-[500px] flex items-center justify-center rounded-3xl border border-white/10 overflow-visible">
              <OptimizedImage
                src="/images/imageproblem.webp"
                alt="Cerebro con circuitos electrónicos tipo laberinto y logotipo HAVANI central - Navegación del desarrollo tecnológico"
                width={1024}
                height={1024}
                className="max-w-full max-h-full object-contain rounded-2xl"
              />
              {/* Sombra sutil sin glow intenso */}
              <div className="absolute inset-0 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.4)] transition-all duration-300 pointer-events-none" />
            </div>
          </figure>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProblemSolutionSection;
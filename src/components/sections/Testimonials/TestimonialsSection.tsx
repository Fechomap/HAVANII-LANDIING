import { useEffect, useRef, useState } from "react";
import { testimonials } from "./testimonialsData";
import gsap from "gsap";
import { ScrollReveal } from "@/components/ScrollReveal";

// SVG Q mark
const QuoteMark = ({ className = "" }: { className?: string }) => (
  <svg className={className} width="40" height="40" viewBox="0 0 60 60" fill="none" aria-hidden="true">
    <path d="M44 12C50 13.0001 54 17.0001 54 25.0001C54 32.0001 50.0001 38.0001 43.0001 41.0001V32.0001C46.0001 31.0001 48.0001 29.0001 48.0001 26.0001C48 23.0001 46.0001 21.0001 43.0001 20.0001C43.0001 14.0001 44 12 44 12Z" fill="currentColor" fillOpacity="0.15"/>
    <path d="M16 12C22 13.0001 26 17.0001 26 25.0001C26 32.0001 22.0001 38.0001 15.0001 41.0001V32.0001C18.0001 31.0001 20.0001 29.0001 20.0001 26.0001C20 23.0001 18.0001 21.0001 15.0001 20.0001C15.0001 14.0001 16 12 16 12Z" fill="currentColor" fillOpacity="0.15"/>
  </svg>
);

// Crear grupos de testimonios para las tres filas
const createRowTestimonials = (testimonials) => {
  const row1 = [...testimonials];
  const row2 = [...testimonials].reverse();
  const row3 = [...testimonials].sort(() => Math.random() - 0.5);
  
  // Repetir 4 veces cada conjunto para tener suficientes elementos
  return [
    Array(4).fill(row1).flat(),
    Array(4).fill(row2).flat(),
    Array(4).fill(row3).flat()
  ];
};

// Componente de fila con efecto de pausa suave usando GSAP
const TestimonialRow = ({ items, direction = "left", speed = 340 }) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef(null);
  
  // Calcular el ancho total y la distancia de desplazamiento
  const containerWidth = items.length * 460;
  const distance = containerWidth * 0.65;
  
  useEffect(() => {
    // Limpiar cualquier animación anterior
    if (animationRef.current) {
      animationRef.current.kill();
    }
    
    // Configuración de la animación
    const duration = speed / 2; // Convertir duración a segundos para GSAP y hacerlo más lento
    
    // Obtener el elemento DOM
    const element = containerRef.current;
    if (!element) return;
    
    // Configurar la posición inicial
    gsap.set(element, {
      x: direction === "left" ? 0 : -distance,
      force3D: true, // Forzar aceleración 3D
      overwrite: true
    });
    
    // Crear animación continua
    const timeline = gsap.timeline({
      repeat: -1,
      yoyo: true, // Efecto de ida y vuelta para evitar saltos
      ease: "none", // Equivalente a "linear" pero más preciso en GSAP
      paused: isPaused
    });
    
    // Añadir la animación de movimiento
    timeline.to(element, {
      x: direction === "left" ? -distance : 0,
      duration,
      ease: "none",
      force3D: true
    });
    
    // Guardar referencia de la animación para poder pausarla/reanudarla
    animationRef.current = timeline;
    timeline.play();
    
    // Limpiar al desmontar
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, [direction, distance, speed]);
  
  // Efecto para manejar pausa/play al hacer hover
  useEffect(() => {
    if (!animationRef.current) return;
    
    if (isPaused) {
      // Reducir velocidad en lugar de pausar completamente
      gsap.to(animationRef.current, {
        timeScale: 0.3,
        duration: 0.5
      });
    } else {
      // Volver a velocidad normal
      gsap.to(animationRef.current, {
        timeScale: 1,
        duration: 0.5
      });
    }
  }, [isPaused]);

  return (
    <div 
      ref={containerRef}
      className="flex gap-5"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{ 
        width: `${containerWidth}px`,
        // Aplicar optimizaciones de rendimiento
        willChange: "transform",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
        transformStyle: "preserve-3d",
        WebkitTransformStyle: "preserve-3d"
      }}
    >
      {items.map((item, index) => (
        <div 
          key={index} 
          className="flex-shrink-0 w-[450px]"
        >
          <blockquote
            className="h-55 bg-[#15161B] rounded-xl px-5 py-5 shadow-md border border-white/10 relative group hover:border-[#7B61FF]/20 transition-all duration-500 text-left"
            role="group"
            aria-roledescription="testimonial"
          >
            <span className="absolute -top-3 -left-2 w-8 h-8 text-[#7B61FF]/15 rotate-180 select-none pointer-events-none">
              <QuoteMark className="w-full h-full" />
            </span>
            <p className="text-sm md:text-base leading-relaxed text-white mt-1">
              &ldquo;{item.quote}&rdquo;
            </p>
            <footer className="mt-3 text-[#7B61FF] font-medium text-sm">
              — {item.name}
            </footer>
          </blockquote>
        </div>
      ))}
    </div>
  );
};

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const rows = createRowTestimonials(testimonials);

  return (
    <section
      ref={sectionRef}
      aria-labelledby="test-title"
      id="testimonials"
      className="relative bg-[#0B0B0F] overflow-hidden"
      style={{ zIndex: 1 }}
    >
      {/* Glow background */}
      <div 
        className="pointer-events-none absolute bottom-[-18%] left-1/2 -translate-x-1/2 w-[540px] h-[540px] z-0"
        aria-hidden="true"
        style={{
          background: "radial-gradient(circle, rgba(123,97,255,0.04) 0%,rgba(123,97,255,0) 70%)",
          filter: "blur(320px)",
        }}
      />
      {/* Top divider wave */}
      <svg
        className="absolute top-0 left-0 w-full h-[100px] z-10 text-white/3"
        focusable="false"
        aria-hidden="true"
        viewBox="0 0 1440 110"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M0,0 Q400,110 900,90 Q1200,80 1440,110 L1440,0 L0,0 Z"
          fill="currentColor"
          opacity="0.03"
        />
      </svg>
      
      <div className="relative w-full mx-auto px-1 py-[120px] md:py-[140px] text-center z-20">
        
        {/* Header migrado con ScrollReveal */}
        <ScrollReveal animation="fadeUp" duration={0.8}>
          <h2
            id="test-title"
            className="text-3xl md:text-4xl font-extrabold text-white"
          >
            Ellos Ya Confían en Havani: Historias Reales
          </h2>
        </ScrollReveal>
        
        <ScrollReveal animation="fadeUp" delay={0.2} duration={0.8}>
          <p className="mt-6 text-[#BBBBBB] text-lg md:text-xl max-w-2xl mx-auto">
            Descubre cómo nuestro enfoque "Sin Tanto Rollo" transforma negocios como el tuyo.
          </p>
        </ScrollReveal>
        
        {/* Contenedor del carrusel con filas que se cruzan - MANTENER GSAP */}
        <div className="mt-12 relative overflow-hidden">
          {/* Máscaras de desvanecimiento en los bordes */}
          <div className="absolute left-0 top-0 h-full w-[150px] z-30 pointer-events-none" 
               style={{ 
                 background: 'linear-gradient(to right, #0B0B0F 0%, rgba(11, 11, 15, 0.9) 30%, rgba(11, 11, 15, 0.6) 60%, rgba(11, 11, 15, 0) 100%)' 
               }} 
               aria-hidden="true" 
          />
          <div className="absolute right-0 top-0 h-full w-[150px] z-30 pointer-events-none" 
               style={{ 
                 background: 'linear-gradient(to left, #0B0B0F 0%, rgba(11, 11, 15, 0.9) 30%, rgba(11, 11, 15, 0.6) 60%, rgba(11, 11, 15, 0) 100%)' 
               }} 
               aria-hidden="true" 
          />
          
          {/* Primera fila - Movimiento hacia la izquierda */}
          <div className="mb-6 overflow-hidden">
            <TestimonialRow 
              items={rows[0]} 
              direction="left" 
              speed={900}  // Aumentado a 900 para hacerlo mucho más lento
            />
          </div>
          
          {/* Segunda fila - Movimiento hacia la derecha */}
          <div className="relative mb-6 overflow-hidden z-10">
            <TestimonialRow 
              items={rows[1]} 
              direction="right" 
              speed={1100}  // Aumentado a 1100 para hacerlo mucho más lento
            />
          </div>
          
          {/* Tercera fila - Movimiento hacia la izquierda */}
          <div className="overflow-hidden">
            <TestimonialRow 
              items={rows[2]} 
              direction="left" 
              speed={1000}  // Aumentado a 1000 para hacerlo mucho más lento
            />
          </div>
        </div>
      </div>
      
      <style>{`
        /* Estilos sutiles para las tarjetas */
        blockquote {
          transform: translateZ(0);
          backface-visibility: hidden;
          transition: all 0.4s ease;
        }
        
        blockquote:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
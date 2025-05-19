import { useEffect, useRef, useState } from "react";
import { testimonials } from "./testimonialsData";
import { motion, useAnimation } from "framer-motion";

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

const TestimonialsSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  
  // Controles de animación para cada fila
  const row1Controls = useAnimation();
  const row2Controls = useAnimation();
  const row3Controls = useAnimation();
  
  // Crear las filas de testimonios
  const rows = createRowTestimonials(testimonials);

  // Iniciar animaciones al cargar el componente
  useEffect(() => {
    // Solo pausar si el usuario interactúa
    if (isPaused) {
      row1Controls.stop();
      row2Controls.stop();
      row3Controls.stop();
      return;
    }

    // Animación fila 1 (izquierda a derecha) - MUY LENTA
    const animateRow1 = async () => {
      await row1Controls.start({
        x: ["-110%", "0%"],
        transition: { 
          duration: 240, // Velocidad ajustada a 120 segundos
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop" 
        }
      });
    };

    // Animación fila 2 (derecha a izquierda) - MUY LENTA
    const animateRow2 = async () => {
      await row2Controls.start({
        x: ["0%", "-110%"],
        transition: { 
          duration: 240, // Velocidad ajustada a 120 segundos
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop" 
        }
      });
    };

    // Animación fila 3 (izquierda a derecha) - MUY LENTA
    const animateRow3 = async () => {
      await row3Controls.start({
        x: ["-110%", "0%"],
        transition: { 
          duration: 240, // Velocidad ajustada a 120 segundos
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop" 
        }
      });
    };

    // Iniciar todas las animaciones
    animateRow1();
    animateRow2();
    animateRow3();
  }, [isPaused, row1Controls, row2Controls, row3Controls]); // Eliminamos isVisible de las dependencias

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
      <div
        className="relative w-full mx-auto px-1 py-[120px] md:py-[140px] text-center z-20"
      >
        <h2
          id="test-title"
          className="text-3xl md:text-4xl font-extrabold text-white"
        >
          Ellos Ya Confían en Havani: Historias Reales
        </h2>
        <p className="mt-6 text-[#BBBBBB] text-lg md:text-xl max-w-2xl mx-auto">
          Descubre cómo nuestro enfoque "Sin Tanto Rollo" transforma negocios como el tuyo.
        </p>
        
        {/* Contenedor del carrusel con filas que se cruzan */}
        <div className="mt-12 relative overflow-hidden">
          {/* Primera fila - Movimiento hacia la derecha */}
          <div className="mb-6 overflow-hidden">
            <motion.div 
              className="flex gap-5"
              animate={row1Controls}
              initial={{ x: "-110%" }}
              style={{ width: `${rows[0].length * 460}px` }} // Ancho calculado para tarjetas más anchas
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {rows[0].map((item, index) => (
                <div 
                  key={`row1-${index}`} 
                  className="flex-shrink-0 w-[450px]"
                >
                  <blockquote
                    className="h-full bg-[#15161B] rounded-xl px-5 py-5 shadow-md border border-white/10 relative group hover:border-[#7B61FF]/20 transition-all duration-500 text-left"
                    role="group"
                    aria-roledescription="testimonial"
                  >
                    <span className="absolute -top-3 -left-2 w-8 h-8 text-[#7B61FF]/15 rotate-180 select-none pointer-events-none">
                      <QuoteMark className="w-full h-full" />
                    </span>
                    <p className="text-sm md:text-base leading-relaxed text-white mt-1">
                      &ldquo;{item.quote.length > 100 ? `${item.quote.substring(0, 100)}...` : item.quote}&rdquo;
                    </p>
                    <footer className="mt-3 text-[#7B61FF] font-medium text-sm">
                      — {item.name}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Segunda fila - Movimiento hacia la izquierda */}
          <div className="mb-6 overflow-hidden">
            <motion.div 
              className="flex gap-5"
              animate={row2Controls}
              initial={{ x: "0%" }}
              style={{ width: `${rows[1].length * 460}px` }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {rows[1].map((item, index) => (
                <div 
                  key={`row2-${index}`} 
                  className="flex-shrink-0 w-[450px]"
                >
                  <blockquote
                    className="h-full bg-[#15161B] rounded-xl px-5 py-5 shadow-md border border-white/10 relative group hover:border-[#7B61FF]/20 transition-all duration-500 text-left"
                    role="group"
                    aria-roledescription="testimonial"
                  >
                    <span className="absolute -top-3 -left-2 w-8 h-8 text-[#7B61FF]/15 rotate-180 select-none pointer-events-none">
                      <QuoteMark className="w-full h-full" />
                    </span>
                    <p className="text-sm md:text-base leading-relaxed text-white mt-1">
                      &ldquo;{item.quote.length > 100 ? `${item.quote.substring(0, 100)}...` : item.quote}&rdquo;
                    </p>
                    <footer className="mt-3 text-[#7B61FF] font-medium text-sm">
                      — {item.name}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Tercera fila - Movimiento hacia la derecha (como la primera) */}
          <div className="overflow-hidden">
            <motion.div 
              className="flex gap-5"
              animate={row3Controls}
              initial={{ x: "-110%" }}
              style={{ width: `${rows[2].length * 460}px` }}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {rows[2].map((item, index) => (
                <div 
                  key={`row3-${index}`} 
                  className="flex-shrink-0 w-[450px]"
                >
                  <blockquote
                    className="h-full bg-[#15161B] rounded-xl px-5 py-5 shadow-md border border-white/10 relative group hover:border-[#7B61FF]/20 transition-all duration-500 text-left"
                    role="group"
                    aria-roledescription="testimonial"
                  >
                    <span className="absolute -top-3 -left-2 w-8 h-8 text-[#7B61FF]/15 rotate-180 select-none pointer-events-none">
                      <QuoteMark className="w-full h-full" />
                    </span>
                    <p className="text-sm md:text-base leading-relaxed text-white mt-1">
                      &ldquo;{item.quote.length > 100 ? `${item.quote.substring(0, 100)}...` : item.quote}&rdquo;
                    </p>
                    <footer className="mt-3 text-[#7B61FF] font-medium text-sm">
                      — {item.name}
                    </footer>
                  </blockquote>
                </div>
              ))}
            </motion.div>
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
import { motion, Variants } from 'framer-motion';
import { useState, useEffect } from 'react';

const StorySection = () => {
  // Estado para controlar la animación del título
  const [isVisible, setIsVisible] = useState(false);
  
  // Activar animación al montar el componente
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Texto para animación letra por letra
  const titleText = "Nacimos \"Sin Tanto Rollo\"";
  
  // Definir tipo para las variantes de letra
  interface LetterVariants extends Variants {
    hidden: { opacity: number; y: number };
    visible: (i: number) => { opacity: number; y: number; transition: any };
    loop: (i: number) => any;
  }

  // Variantes para la animación inicial de las letras
  const letterVariants: LetterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    // Animación en bucle - efecto de onda
    loop: (i: number) => ({
      y: [0, -5, 0, -2, 0],
      scale: [1, 1.1, 1, 1.05, 1],
      color: ['#FFFFFF', '#FFA7FF', '#FFFFFF', '#A3C4FF', '#FFFFFF'],
      textShadow: [
        '0 0 0px rgba(255,255,255,0)',
        '0 0 8px rgba(255,167,255,0.5)',
        '0 0 0px rgba(255,255,255,0)',
        '0 0 8px rgba(163,196,255,0.5)',
        '0 0 0px rgba(255,255,255,0)'
      ],
      transition: {
        delay: i * 0.08,
        duration: 4,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: "easeInOut",
        times: [0, 0.25, 0.5, 0.75, 1]
      }
    })
  };
  
  // Variante especial para las comillas
  const quoteVariants: LetterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.04,
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1]
      }
    }),
    // Animación especial para las comillas
    loop: (i: number) => ({
      rotate: [0, 10, 0, -10, 0],
      scale: [1, 1.2, 1, 1.2, 1],
      color: ['#FFFFFF', '#FF9D6F', '#FFFFFF', '#FF9D6F', '#FFFFFF'],
      transition: {
        delay: i * 0.04,
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: "easeInOut"
      }
    })
  };
  
  // Definir tipo para las variantes del cohete
  interface RocketVariants extends Variants {
    hidden: { opacity: number; scale?: number };
    visible: { opacity: number; scale?: number; transition: any };
    loop: {
      x: string[];
      y: string[];
      rotate: string[];
      scale: number[];
      transition: {
        duration: number;
        ease: string;
        repeat: number;
        repeatType: 'loop';
        times: number[];
      };
    };
  }

  // Variantes para el emoji de estrella
  interface EmojiVariants extends Variants {
    hidden: { opacity: number; scale: number; rotate?: number; x?: number };
    visible: { [key: string]: any };
    loop: { [key: string]: any };
  }
  
  const emojiVariants: EmojiVariants = {
    hidden: { opacity: 0, scale: 0.5, rotate: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        delay: (titleText.length * 0.04) + 0.2,
        duration: 0.6,
        ease: [0, 0.55, 0.45, 1.4]
      }
    },
    loop: {
      rotate: [0, 10, -10, 0],
      scale: [1, 1.1, 1, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut',
        times: [0, 0.33, 0.66, 1]
      }
    }
  };

  // Variante para la bandera de México
  interface FlagVariants extends Variants {
    hidden: { opacity: number; x: number };
    visible: { [key: string]: any };
    loop: { [key: string]: any };
  }

  const flagVariants: FlagVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: (titleText.length * 0.04) + 1.3,
        duration: 0.4
      }
    },
    loop: {
      rotate: [0, 5, 0, -5, 0],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut'
      }
    }
  };

  // Variantes para la animación del cohete
  const rocketVariants: RocketVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: (titleText.length * 0.04) + 0.8,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    loop: {
      x: [
        '150px', '220px', '150px', '0px', '-150px', '-220px', '-150px', '0px', '150px'
      ],
      y: [
        '120px', '50px', '-20px', '-60px', '-20px', '50px', '120px', '150px', '120px'
      ],
      rotate: [
        '-30deg', '-60deg', '-120deg', '-180deg', '-240deg', '-300deg', '-330deg', '-360deg', '-390deg'
      ],
      scale: [1, 1.1, 1, 0.9, 1, 1.1, 1, 1.1, 1],
      transition: {
        duration: 15,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop' as const,
        times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]
      }
    }
  };

  return (
    <section
      aria-labelledby="story-title"
      className="relative bg-[#09090C] py-[140px] md:py-[180px] overflow-hidden"
    >
      {/* Fondo simplificado */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/60 to-transparent" />
      </div>

      {/* Content container */}
      <div className="max-w-[960px] mx-auto px-6 md:px-12 flex flex-col items-center text-center relative">
        {/* Título con animación letra por letra */}
        <h2
          id="story-title"
          className="relative z-10 text-3xl md:text-4xl font-extrabold text-white leading-snug flex flex-wrap justify-center"
        >
          {isVisible && titleText.split('').map((char, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={char === '"' ? quoteVariants : letterVariants}
              initial="hidden"
              animate={["visible", "loop"]}
              className={char === ' ' ? 'mr-2' : ''}
            >
              {char}
            </motion.span>
          ))}
          {/* Emoji con animación especial */}
          {isVisible && (
            <motion.span
              variants={emojiVariants}
              initial="hidden"
              animate={["visible", "loop"]}
              className="ml-3"
              aria-hidden="true"
            >
              ✨
            </motion.span>
          )}
        </h2>

        {/* Descripción y cohete con animación path */}
        <div className="relative w-full mt-16 mb-12">
          {/* Texto descripción en el centro */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.65, 
              delay: (titleText.length * 0.04) + 0.5, 
              ease: [0.22, 1, 0.36, 1] 
            }}
            className="text-lg md:text-xl text-[#BBBBBB] leading-relaxed 
                      max-w-[500px] mx-auto hover:text-white transition-colors duration-200"
          >
            Havani nació para desafiar la complejidad innecesaria... 
            soluciones reales, sin complicaciones.
          </motion.p>

          {/* Cohete animado con trayectoria */}
          <motion.div
            initial="hidden"
            animate={["visible", "loop"]}
            variants={rocketVariants}
            className="absolute"
            style={{
              top: "50%",
              left: "50%",
              x: "-50%", 
              y: "-50%",
              zIndex: 20,
              fontSize: "1.75rem"
            }}
            custom={0}
          >
            🚀
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.4, 
            delay: (titleText.length * 0.04) + 1.1
          }}
          className="relative z-10 text-sm tracking-wide uppercase text-[#7B61FF]/80 flex items-center"
        >
          Equipo Havani · México · Est. 2024
          <motion.span
            variants={flagVariants}
            initial="hidden"
            animate={["visible", "loop"]}
            className="ml-2"
          >
          </motion.span>
        </motion.p>
      </div>
    </section>
  );
};

export default StorySection;
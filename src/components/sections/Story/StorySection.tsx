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
    // Animación en bucle después de la aparición inicial
    loop: (i: number) => ({
      y: [0, -3, 0],
      color: ['#FFFFFF', '#FFFFFF', '#FFFFFF'],
      transition: {
        delay: i * 0.01,
        duration: 2,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut',
        times: [0, 0.5, 1]
      }
    })
  };
  
  // Definir tipo para las variantes de emojis
  interface EmojiVariants extends Variants {
    hidden: { opacity: number; scale: number; rotate?: number; x?: number };
    visible: { [key: string]: any };
    loop: { [key: string]: any };
  }
  
  // Variantes para la animación de los emojis
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

  // Definir tipo para las variantes del cohete
  interface RocketVariants extends Variants {
    hidden: { opacity: number; scale: number; x: number };
    visible: { [key: string]: any };
    loop: { [key: string]: any };
  }

  // Variantes para el emoji cohete
  const rocketVariants: RocketVariants = {
    hidden: { opacity: 0, scale: 0.8, x: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      transition: {
        delay: (titleText.length * 0.04) + 0.8,
        duration: 0.6,
        ease: [0, 0.55, 0.45, 1.4]
      }
    },
    loop: {
      x: [0, 5, 0],
      y: [0, -3, 0],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: 'loop' as const,
        ease: 'easeInOut'
      }
    }
  };

  // Definir tipo para las variantes de la bandera
  interface FlagVariants extends Variants {
    hidden: { opacity: number; x: number };
    visible: { [key: string]: any };
    loop: { [key: string]: any };
  }

  // Variantes para la bandera de México
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
              variants={letterVariants}
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

        {/* Descripción con efecto stagger */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.65, 
            delay: (titleText.length * 0.04) + 0.5, 
            ease: [0.22, 1, 0.36, 1] 
          }}
          className="relative z-10 mt-8 text-lg md:text-xl text-[#BBBBBB] leading-relaxed 
                     max-w-[760px] hover:text-white transition-colors duration-200"
        >
          Havani nació para desafiar la complejidad innecesaria... 
          soluciones reales, sin complicaciones.
          <motion.span
            variants={rocketVariants}
            initial="hidden"
            animate={["visible", "loop"]}
            className="inline-block ml-2"
          >
            🚀
          </motion.span>
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.4, 
            delay: (titleText.length * 0.04) + 1.1
          }}
          className="relative z-10 mt-10 text-sm tracking-wide uppercase text-[#7B61FF]/80 flex items-center"
        >
          Equipo Havani · México · Est. 2024
          <motion.span
            variants={flagVariants}
            initial="hidden"
            animate={["visible", "loop"]}
            className="ml-2"
          >
            🇲🇽
          </motion.span>
        </motion.p>
      </div>
    </section>
  );
};

export default StorySection;
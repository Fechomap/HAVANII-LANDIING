// src/components/transitions/HomeTransition.tsx
import React, { useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Matriz de símbolos tech (incluyendo código y elementos de programación)
const techSymbols = [
  "{", "}", "=>", "()", "[]", "<>", "/", "*", "&&", "||", "//", "/*", "*/", "+=", 
  "function", "return", "const", "let", "import", "export", "React", "useState", 
  "useEffect", "API", "async", "await", "props", "render", "<div>", "</div>", 
  "<App/>", "<Component/>", "interface", "type", "class", "extends", "implements"
];

interface HomeTransitionProps {
  isActive: boolean;
  onComplete: () => void;
}

const HomeTransition: React.FC<HomeTransitionProps> = ({ isActive, onComplete }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number>();

  // Configurar y ejecutar animación del canvas
  useEffect(() => {
    if (!isActive || !canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Configurar canvas para pantalla completa
    const resetCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resetCanvas();
    window.addEventListener('resize', resetCanvas);
    
    // Crear partículas iniciales
    const createParticles = () => {
      particlesRef.current = [];
      // Crear 150 partículas con posiciones aleatorias
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 14 + 8; // Tamaño variable para los textos
        const symbol = techSymbols[Math.floor(Math.random() * techSymbols.length)];
        const speedY = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.8 + 0.2;
        const hue = Math.random() * 40 + 240; // Colores en la gama de azules y morados
        
        particlesRef.current.push({
          x, y, size, symbol, speedY, opacity, hue
        });
      }
    };
    
    createParticles();
    
    // Función de animación principal
    const animate = () => {
      // Aplicar un desvanecimiento gradual a la pantalla
      ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Esto crea un "rastro" para las partículas
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Dibujar cada partícula
      particlesRef.current.forEach(particle => {
        // Color basado en opacidad y tono
        ctx.fillStyle = `hsla(${particle.hue}, 100%, 70%, ${particle.opacity})`;
        ctx.font = `${particle.size}px monospace`;
        ctx.fillText(particle.symbol, particle.x, particle.y);
        
        // Mover partícula hacia abajo
        particle.y += particle.speedY;
        
        // Reiniciar posición cuando sale de la pantalla
        if (particle.y > canvas.height) {
          particle.y = 0;
          particle.x = Math.random() * canvas.width;
        }
      });
      
      // Logo pulsante central (solo texto para simplicidad)
      const logoText = "HAVANI";
      ctx.font = "bold 64px 'Helvetica Neue', sans-serif";
      ctx.textAlign = "center";
      
      // Efecto de sombra brillante con el color de la marca
      const time = Date.now() / 1000;
      const pulseIntensity = (Math.sin(time * 2) * 0.5 + 0.5) * 30; // Pulsación entre 0 y 30
      
      ctx.shadowColor = `rgba(123, 97, 255, 0.8)`;
      ctx.shadowBlur = pulseIntensity;
      ctx.fillStyle = 'white';
      ctx.fillText(logoText, canvas.width / 2, canvas.height / 2);
      
      // Texto secundario con efecto typewriter
      const tagline = "DESARROLLO SIN TANTO ROLLO";
      const displayedTag = tagline.substring(0, Math.floor((Date.now() % 3000) / 3000 * tagline.length));
      
      ctx.font = "24px 'Helvetica Neue', sans-serif";
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
      ctx.shadowBlur = 0; // Quitar sombra para el subtítulo
      ctx.fillText(displayedTag, canvas.width / 2, canvas.height / 2 + 50);
      
      // Continuar la animación mientras estamos en transición
      if (isActive) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Iniciar animación
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Establecer un temporizador para completar la transición después de un tiempo
    const completionTimer = setTimeout(() => {
      onComplete();
    }, 1500);
    
    // Limpiar al desmontar
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      clearTimeout(completionTimer);
      window.removeEventListener('resize', resetCanvas);
    };
  }, [isActive, onComplete]);

  return (
    <>
      {/* Canvas de animación */}
      <AnimatePresence>
        {isActive && (
          <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[70] pointer-events-none"
          />
        )}
      </AnimatePresence>
      
      {/* Overlay de transición */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-[60] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(123, 97, 255, 0.15) 0%, rgba(0, 0, 0, 0.9) 70%)'
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default HomeTransition;
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface HeaderProps {
  hasScrolled: boolean;
}

// Matriz de símbolos tech (incluyendo código y elementos de programación)
const techSymbols = [
  "{", "}", "=>", "()", "[]", "<>", "/", "*", "&&", "||", "//", "/*", "*/", "+=", 
  "function", "return", "const", "let", "import", "export", "React", "useState", 
  "useEffect", "API", "async", "await", "props", "render", "<div>", "</div>", 
  "<App/>", "<Component/>", "interface", "type", "class", "extends", "implements"
];

const Header = ({ hasScrolled }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState('home');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  
  // Refs para el canvas y los efectos de animación
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<any[]>([]);
  const animationFrameRef = useRef<number>();
  
  const navLinks = [
    { name: 'Home', id: 'home', href: '/' },
    { name: 'Servicios', id: 'servicios', href: '#servicios' },
    { name: 'Proceso', id: 'proceso', href: '#proceso' },
    { name: 'Productos', id: 'productos', href: '#productos' },
    { name: 'Precios', id: 'precios', href: '/pricing' },
    { name: 'Contacto', id: 'contacto', href: '#final-cta' }
  ];
  
  const linkStyles = "relative px-4 py-2 text-white hover:text-white/90 transition-colors";
  
  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { duration: 0.2, ease: [0.25, 0.8, 0.25, 1] }
    }
  };

  // Configurar y ejecutar animación del canvas
  useEffect(() => {
    if (!isTransitioning || !canvasRef.current) return;
    
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
      if (isTransitioning) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };
    
    // Iniciar animación
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Limpiar al desmontar
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      window.removeEventListener('resize', resetCanvas);
    };
  }, [isTransitioning]);

  // Efecto para manejar la animación de superposición
  useEffect(() => {
    if (isTransitioning) {
      // Si estamos en transición, animamos la opacidad del overlay
      const overlayAnimation = setTimeout(() => {
        setOverlayOpacity(0);
        setIsTransitioning(false);
      }, 1500); // Tiempo aumentado para disfrutar más de la animación
      
      return () => clearTimeout(overlayAnimation);
    }
  }, [isTransitioning]);
  
  const smoothScrollTo = (targetPosition: number, duration: number = 800) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;
    
    const easeInOutQuad = (t: number): number => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };
    
    const scrollAnimation = (currentTime: number) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const easedProgress = easeInOutQuad(progress);
      
      window.scrollTo(0, startPosition + distance * easedProgress);
      
      if (timeElapsed < duration) {
        requestAnimationFrame(scrollAnimation);
      }
    };
    
    requestAnimationFrame(scrollAnimation);
  };
  
  const handleLinkClick = (id: string, href: string, e: React.MouseEvent) => {
    setActiveLink(id);
    
    // Caso especial mejorado para Home - transición elegante
    if (id === 'home') {
      e.preventDefault();
      
      // Iniciar la transición
      setIsTransitioning(true);
      setOverlayOpacity(1);
      
      // Después de un breve retraso, desplazarse al inicio
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'auto' // Instantáneo para que ocurra detrás del fade
        });
        
        // Actualizar URL si es necesario
        window.history.pushState({}, '', '/');
      }, 400);
      
      return;
    }
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        const headerOffset = -55;
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        
        smoothScrollTo(offsetPosition, 800);
        
        window.history.pushState({}, '', href);
      }
    }
  };
  
  return (
    <>
      {/* Canvas de animación - Solo visible durante la transición */}
      <AnimatePresence>
        {isTransitioning && (
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
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: overlayOpacity }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 bg-black z-[60] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle at center, rgba(123, 97, 255, 0.15) 0%, rgba(0, 0, 0, 0.9) 70%)'
            }}
          />
        )}
      </AnimatePresence>
      
      <header 
        id="site-nav" 
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
          hasScrolled 
            ? "bg-[rgba(0,0,0,.35)] backdrop-blur-sm" 
            : "bg-transparent"
        )}
        role="banner"
      >
        <div className="max-w-[1280px] mx-auto px-6 py-10 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-white flex items-center">
            <img 
              src="/images/logo-havani.svg" 
              alt="Havani Logo" 
              className="h-10 w-auto brightness-110 contrast-125"
            />
          </Link>
          
          {/* Navegación central - Links */}
          <nav className="flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.href}
                className={cn(
                  linkStyles,
                  activeLink === link.id && "rounded-full bg-white/[.12] text-white"
                )}
                onClick={(e) => handleLinkClick(link.id, link.href, e)}
              >
                {link.name}
                {/* Subrayado animado en hover (solo para links no activos) */}
                {activeLink !== link.id && (
                  <motion.span
                    className="absolute left-0 bottom-0 w-full h-0.5 bg-white/60"
                    initial="hidden"
                    whileHover="visible"
                    variants={underlineVariants}
                    style={{ originX: 0.5 }}
                  />
                )}
              </Link>
            ))}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
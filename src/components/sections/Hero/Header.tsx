import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface HeaderProps {
  hasScrolled: boolean;
}

const Header = ({ hasScrolled }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState('home');
  // Estados para controlar la animación de transición
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  
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

  // Efecto para manejar la animación de superposición
  useEffect(() => {
    if (isTransitioning) {
      // Si estamos en transición, animamos la opacidad del overlay
      const overlayAnimation = setTimeout(() => {
        setOverlayOpacity(0);
        setIsTransitioning(false);
      }, 800); // Tiempo suficiente para completar el desplazamiento
      
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
        
        // La superposición se desvanecerá por el efecto useEffect
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
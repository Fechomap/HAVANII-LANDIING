// src/components/sections/Hero/Header.tsx
import React, { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  hasScrolled: boolean;
  onHomeClick?: (e: React.MouseEvent) => void;
}

const Header = ({ hasScrolled, onHomeClick }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { goToHome } = useHomeNavigation();
  
  // Memoize navLinks to prevent recreating on each render
  const navLinks = React.useMemo(() => [
    { name: 'Home', id: 'home', href: '/' },
    { name: 'Servicios', id: 'servicios', href: '#servicios' },
    { name: 'Proceso', id: 'proceso', href: '#proceso' },
    { name: 'Productos', id: 'productos', href: '#productos' },
    { name: 'Contacto', id: 'contacto', href: '#contacto' }
  ], []);
  
  // Optimized scroll function with custom easing
  const scrollToElement = useCallback((elementId: string, offset: number = 80) => {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;
    
    // Custom smooth scroll with requestAnimationFrame for better performance
    const startPosition = window.scrollY;
    const distance = offsetPosition - startPosition;
    const duration = 1000;
    let startTime: number | null = null;
    
    // Easing function for smoother animation
    const easeOutQuint = (t: number): number => 1 - Math.pow(1 - t, 5);
    
    function step(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = easeOutQuint(progress);
      
      window.scrollTo(0, startPosition + distance * easeProgress);
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }
    
    window.requestAnimationFrame(step);
  }, []);
  
  const handleLinkClick = useCallback((id: string, href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveLink(id);
    setIsMobileMenuOpen(false);
    
    // Caso especial para Home - Forzamos la transición
    if (id === 'home') {
      // Si tenemos una función onHomeClick personalizada, la usamos
      if (onHomeClick) {
        console.log('Using custom onHomeClick function');
        onHomeClick(e);
      } else {
        // De lo contrario, usamos la función goToHome estándar
        console.log('Using standard goToHome function');
        goToHome(e);
      }
      return;
    }
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      scrollToElement(targetId);
      window.history.pushState({}, '', href);
    }
  }, [goToHome, scrollToElement]);
  
  // Memoize header variants for better performance
  const headerVariants = React.useMemo(() => ({
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.8, 0.25, 1] 
      }
    }
  }), []);

  return (
    <motion.header 
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
        hasScrolled 
          ? "bg-black/80 backdrop-blur-md border-b border-white/10 shadow-lg" 
          : "bg-transparent"
      )}
      initial="initial"
      animate="animate"
      variants={headerVariants}
      style={{ 
        willChange: "transform",
        backfaceVisibility: "hidden"
      }}
      role="banner"
    >
      <div className="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo mejorado */}
        <Link 
          to="/" 
          className="text-white flex items-center group"
          onClick={onHomeClick || goToHome}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative"
          >
            <img
              src="/images/logo-havani.svg"
              alt="Havani Logo"
              className="h-10 w-auto brightness-110 contrast-125 group-hover:brightness-125 transition-all duration-300"
            />
            {/* Efecto de brillo en hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          </motion.div>
        </Link>
        
        {/* Navegación Desktop - Optimizada */}
        <nav className="hidden md:flex items-center space-x-1">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.id}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: 0.05 * index, 
                duration: 0.4,
                ease: "easeOut"
              }}
              style={{ willChange: "transform, opacity" }}
            >
              <Link
                to={link.href}
                className={cn(
                  "relative px-4 py-2 text-white/90 hover:text-white transition-all duration-300 rounded-lg group",
                  activeLink === link.id && "text-white bg-white/10 backdrop-blur-sm"
                )}
                onClick={(e) => handleLinkClick(link.id, link.href, e)}
              >
                <span className="relative z-10">{link.name}</span>
                
                {/* Efecto de hover - Optimizado */}
                <div
                  className="absolute inset-0 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Indicador activo - Optimizado */}
                {activeLink === link.id && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-[#7B61FF]/20 to-[#9575FF]/20 rounded-lg border border-[#7B61FF]/30"
                    layoutId="activeIndicator"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    style={{ willChange: "transform" }}
                  />
                )}
              </Link>
            </motion.div>
          ))}
          
          {/* CTA Button - Optimizado */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            style={{ willChange: "transform, opacity" }}
          >
            <Link to="/#contacto" onClick={(e) => handleLinkClick('contacto', '#contacto', e)}>
              <motion.button
                className="ml-4 px-6 py-2 bg-gradient-to-r from-[#7B61FF] to-[#9575FF] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-colors duration-200 border border-[#7B61FF]/50"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(123, 97, 255, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                style={{ willChange: "transform" }}
              >
                Hablemos
              </motion.button>
            </Link>
          </motion.div>
        </nav>
        
        {/* Botón menú móvil */}
        <motion.button
          className="md:hidden text-white p-2 rounded-lg hover:bg-white/10 transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <AnimatePresence mode="wait">
            {isMobileMenuOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
      
      {/* Menú móvil - Optimizado */}
      <AnimatePresence mode="wait">
        {isMobileMenuOpen && (
          <motion.nav
            className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10"
            initial={{ opacity: 0, height: 0, transformOrigin: "top" }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ willChange: "opacity, height" }}
          >
            <div className="px-6 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <Link
                    to={link.href}
                    className={cn(
                      "block px-4 py-3 text-white/90 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-300",
                      activeLink === link.id && "text-white bg-[#7B61FF]/20 border border-[#7B61FF]/30"
                    )}
                    onClick={(e) => handleLinkClick(link.id, link.href, e)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
              
              {/* CTA móvil */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="pt-4"
              >
                <Link to="/#contacto" onClick={(e) => handleLinkClick('contacto', '#contacto', e)}>
                  <button className="w-full px-6 py-3 bg-gradient-to-r from-[#7B61FF] to-[#9575FF] text-white rounded-lg font-semibold">
                    Hablemos
                  </button>
                </Link>
              </motion.div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// Wrap component with React.memo to prevent unnecessary re-renders
export default memo(Header);
// src/components/sections/Hero/Header.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
import { useHomeNavigation } from '@/hooks/useHomeNavigation';
import HomeTransition from '@/components/transitions/HomeTransition';

interface HeaderProps {
  hasScrolled: boolean;
}

const Header = ({ hasScrolled }: HeaderProps) => {
  const [activeLink, setActiveLink] = useState('home');
  const { goToHome, isTransitioning, completeTransition } = useHomeNavigation();
  
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
    
    // Caso especial para Home - usar nuestro hook de navegación
    if (id === 'home') {
      goToHome(e);
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
      {/* Componente de transición */}
      <HomeTransition 
        isActive={isTransitioning} 
        onComplete={completeTransition} 
      />
      
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
          {/* Logo - también debe usar la transición */}
          <Link 
            to="/" 
            className="text-white flex items-center"
            onClick={goToHome}
          >
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
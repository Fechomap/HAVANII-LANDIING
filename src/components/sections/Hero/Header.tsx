/**
 * @component Header - Barra de navegación principal de Havani
 * Este componente implementa el header sticky con navegación, siguiendo el diseño de Pulsar.
 * Incluye enlaces de navegación, indicador de página activa y botón de inicio de sesión.
 * 
 * Prompt 1 - Hero
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

// Props para el componente Header
interface HeaderProps {
  hasScrolled: boolean;
}

const Header = ({ hasScrolled }: HeaderProps) => {
  // Estado para el link activo (por defecto 'home' en la landing)
  const [activeLink, setActiveLink] = useState('home');
  
  // Enlaces de navegación
  const navLinks = [
    { name: 'Home', id: 'home', href: '/' },
    { name: 'Servicios', id: 'servicios', href: '#servicios' },
    { name: 'Proceso', id: 'proceso', href: '#proceso' },
    { name: 'Productos', id: 'productos', href: '#productos' },
    { name: 'Precios', id: 'precios', href: '/pricing' },
    { name: 'Contacto', id: 'contacto', href: '#final-cta' }
  ];
  
  // Estilos para los enlaces de navegación
  const linkStyles = "relative px-4 py-2 text-white hover:text-white/90 transition-colors";
  
  // Variantes para la animación del subrayado
  const underlineVariants = {
    hidden: { scaleX: 0 },
    visible: { 
      scaleX: 1,
      transition: { 
        duration: 0.2,
        ease: [0.25, 0.8, 0.25, 1]
      }
    }
  };

  // Función para realizar un scroll suave personalizado
  const smoothScrollTo = (targetPosition: number, duration: number = 800) => {
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime: number | null = null;
    
    // Función de easing suave - easeInOutQuad
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
  // Update the handleLinkClick function in the Header component
  const handleLinkClick = (id: string, href: string, e: React.MouseEvent) => {
    setActiveLink(id);
    
    // Special case for Home - scroll to top
    if (id === 'home') {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
      // Update URL if needed
      window.history.pushState({}, '', '/');
      return;
    }
    
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        // Calcular la posición considerando el header fijo
        const headerOffset = -55; // Ajusta este valor según la altura de tu header
        const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - headerOffset;
        
        // Usar nuestra función de scroll suave personalizada
        smoothScrollTo(offsetPosition, 800);
        
        // Actualizar la URL sin recargar la página
        window.history.pushState({}, '', href);
      }
    }
    // Para enlaces que no son anclas, el comportamiento predeterminado se maneja automáticamente
  };
  
  return (
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
                  style={{ originX: 0.5 }} // Centrar origen para efecto desde el centro
                />
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
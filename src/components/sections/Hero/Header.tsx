
/**
 * @component Header - Barra de navegación principal de Havani
 * Este componente implementa el header sticky con navegación, siguiendo el diseño de Pulsar.
 * Incluye enlaces de navegación, indicador de página activa y botón de inicio de sesión.
 * 
 * Prompt 1 - Hero
 */

import React, { useState } from 'react';
import { motion, animate } from 'framer-motion';
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
    { name: 'Valor', id: 'valor', href: '#valor' },
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

  // Manejar el scroll al hacer clic en los enlaces
  const handleLinkClick = (id: string, href: string, e: React.MouseEvent) => {
    e.preventDefault();
    setActiveLink(id);
    
    if (href.startsWith('#')) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        // Calcular la posición considerando el header fijo
        const headerOffset = 100; // Ajusta este valor según la altura de tu header
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        // Definir una función de ease personalizada con dos rebotes
        const customBounceEase = (t: number): number => {
          // Valores ajustables para controlar los rebotes
          const bounce = 0.25; // Intensidad del rebote
          const frequency = 2.5; // Número de rebotes (ajusta para más o menos rebotes)
          
          // Fórmula para crear el efecto de rebote
          // Esta fórmula crea un efecto que comienza rápido y termina con rebotes
          const base = Math.max(0, 1 - t);
          return 1 - (Math.pow(base, 2) * Math.abs(Math.sin(t * frequency * Math.PI) * bounce));
        };
        
        // Usar Framer Motion con nuestra función de ease personalizada
        animate(window.scrollY, offsetPosition, {
          duration: 1.5, // Duración un poco más larga para apreciar los rebotes
          ease: customBounceEase,
          onUpdate: (value) => window.scrollTo(0, value)
        });
        
        // Actualizar la URL sin recargar la página
        window.history.pushState({}, '', href);
      }
    } else {
      // Para enlaces que no son anclas, navegar normalmente
      window.location.href = href;
    }
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

// src/hooks/useHomeNavigation.ts
import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Hook personalizado para manejar la navegación a la página de inicio con una animación
 * Puede ser usado en cualquier componente que contenga un botón o enlace al Home
 */
export function useHomeNavigation() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    // Forzamos la activación de la transición siempre
    setIsTransitioning(true);
    console.log('Transition activated:', isTransitioning);
    
    // Hacemos scroll al inicio inmediatamente
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    
    // Si ya estamos en la página principal, no necesitamos navegar
    // pero mantenemos la animación activa para que se vea
    if (location.pathname === '/') {
      // Programamos la finalización de la transición después de un tiempo
      // para que se vea la animación completa
      setTimeout(() => {
        setIsTransitioning(false);
      }, 2000);
    }
    // Si no estamos en la página principal, el completeTransition
    // se encargará de finalizar la transición y navegar
  }, [location.pathname]);

  // Esta función se llamará cuando termine la animación
  const completeTransition = useCallback(() => {
    if (isTransitioning) {
      // Navegamos a la página principal usando una ruta absoluta
      // solo si no estamos ya en la página principal
      if (location.pathname !== '/') {
        navigate('/', { replace: true });
      }
      setIsTransitioning(false);
    }
  }, [isTransitioning, navigate, location.pathname]);

  return {
    goToHome,
    isTransitioning,
    completeTransition
  };
}
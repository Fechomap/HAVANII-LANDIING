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
    
    // Verificamos si estamos en la página principal
    const isHome = location.pathname === '/';
    
    // Siempre activamos la transición, incluso si ya estamos en la página principal
    setIsTransitioning(true);
    
    // Si ya estamos en la página principal, solo hacemos scroll al inicio
    // pero mantenemos la animación activa
    if (isHome) {
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        });
      }, 100);
      return;
    }
    
    // Si venimos de otra página, también hacemos scroll al inicio
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    }, 100);
  }, [location.pathname]);

  // Esta función se llamará cuando termine la animación
  const completeTransition = useCallback(() => {
    if (isTransitioning) {
      // Navegamos a la página principal usando una ruta absoluta
      navigate('/', { replace: true });
      setIsTransitioning(false);
    }
  }, [isTransitioning, navigate]);

  return {
    goToHome,
    isTransitioning,
    completeTransition
  };
}
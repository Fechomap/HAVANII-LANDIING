// src/hooks/useHomeNavigation.ts
import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Hook personalizado para manejar la navegación a la página de inicio con una animación
 * Puede ser usado en cualquier componente que contenga un botón o enlace al Home
 */
export function useHomeNavigation() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const goToHome = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    // Iniciar transición
    setIsTransitioning(true);
    
    // Después de un breve retraso, realizar el scroll y navegación
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
      
      // Esta función se llamará cuando termine la animación
      const completeTransition = () => {
        navigate('/');
        setIsTransitioning(false);
      };
      
      // Para uso directo desde otros componentes
      return { isTransitioning, completeTransition };
    }, 400);
  }, [navigate]);

  return {
    goToHome,
    isTransitioning,
    completeTransition: () => setIsTransitioning(false)
  };
}
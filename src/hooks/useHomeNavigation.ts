// src/hooks/useHomeNavigation.ts
import { useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * Hook personalizado para manejar la navegación a la página de inicio con una animación
 * Puede ser usado en cualquier componente que contenga un botón o enlace al Home
 */
export function useHomeNavigation() {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [pendingHash, setPendingHash] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = useCallback((e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    
    // Extraer hash si existe en el enlace
    const href = (e?.currentTarget as HTMLAnchorElement)?.getAttribute('href');
    const hash = href?.includes('#') ? href.split('#')[1] : null;
    
    // Forzamos la activación de la transición siempre
    setIsTransitioning(true);
    
    // Guardamos el hash para usar después de la navegación
    if (hash) {
      setPendingHash(hash);
    }
    
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
        // Si hay hash, hacer scroll al elemento
        if (hash) {
          const element = document.getElementById(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
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
      
      // Si hay un hash pendiente, hacer scroll al elemento después de un pequeño delay
      if (pendingHash) {
        setTimeout(() => {
          const element = document.getElementById(pendingHash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
          setPendingHash(null);
        }, 500); // Pequeño delay para asegurar que la página se ha cargado completamente
      }
    }
  }, [isTransitioning, navigate, location.pathname, pendingHash]);

  return {
    goToHome,
    isTransitioning,
    completeTransition
  };
}
import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que fuerza a que cada página comience desde el inicio
 * sin animaciones ni comportamientos de scroll
 */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  // useLayoutEffect se ejecuta sincrónicamente ANTES del pintado del DOM
  // esto garantiza que el scroll se resetea antes de que el usuario vea cualquier contenido
  useLayoutEffect(() => {
    // Eliminar cualquier posición de scroll establecida
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0; // Para Safari
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

import { useState, useEffect, useRef, RefObject } from 'react';

/**
 * @deprecated Este hook está deprecado. Por favor, utiliza useScrollTrigger 
 * para todas las detecciones de visibilidad en scroll. Este hook se mantiene solo para
 * compatibilidad con código existente como AnimateOnScroll.
 * 
 * Ejemplo de migración:
 * 
 * Antes:
 * const { ref, isVisible } = useIntersectionObserver({ threshold: 0.2 });
 * 
 * Después:
 * const { ref, visible } = useScrollTrigger({ threshold: 0.2 });
 * 
 * useScrollTrigger ofrece mejor rendimiento, optimizaciones para móviles
 * y respeta prefers-reduced-motion para accesibilidad.
 */
export interface IntersectionObserverOptions {
  /** Margen alrededor del elemento (similar a CSS margin) */
  rootMargin?: string;
  /** Valor entre 0 y 1 que indica qué porcentaje del elemento debe ser visible */
  threshold?: number | number[];
  /** Si es true, el observador dejará de monitorear el elemento una vez que sea visible */
  triggerOnce?: boolean;
  /** Si es true, el elemento se considerará inicialmente como visible */
  initiallyVisible?: boolean;
}

/**
 * @deprecated Este hook está deprecado. Utiliza useScrollTrigger para nuevos desarrollos.
 * 
 * Hook personalizado que detecta cuando un elemento entra en el viewport
 * @param options Opciones de configuración para el IntersectionObserver
 * @returns Un objeto con la referencia del elemento, si es visible y una función para forzar visibilidad
 */
export function useIntersectionObserver({
  rootMargin = '0px',
  threshold = 0,
  triggerOnce = false,
  initiallyVisible = false,
}: IntersectionObserverOptions = {}) {
  // Estado para rastrear si el elemento es visible
  const [isVisible, setIsVisible] = useState<boolean>(initiallyVisible);
  // Referencia al elemento que queremos observar
  const ref = useRef<HTMLElement | null>(null);
  // Referencia para rastrear si la observación debe detenerse (cuando triggerOnce=true)
  const shouldUnobserve = useRef<boolean>(false);
  
  // Función para forzar visibilidad (útil para pruebas o animaciones iniciales)
  const forceVisible = () => setIsVisible(true);

  useEffect(() => {
    // Guardamos una referencia al elemento actual
    const element = ref.current;
    
    // Si no hay elemento, no hacemos nada
    if (!element) return;
    
    // Si ya estaba visible y triggerOnce es true, no creamos un observador
    if (shouldUnobserve.current) return;

    // Callback para cuando el elemento entre/salga del viewport
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries;
      
      // Actualizamos el estado de visibilidad
      setIsVisible(entry.isIntersecting);
      
      // Si el elemento es visible y solo debe activarse una vez, marcamos para dejar de observar
      if (entry.isIntersecting && triggerOnce) {
        shouldUnobserve.current = true;
        observer.unobserve(element);
      }
    };

    // Crear un nuevo IntersectionObserver con las opciones proporcionadas
    const observer = new IntersectionObserver(handleIntersection, {
      rootMargin,
      threshold,
    });
    
    // Comenzar a observar nuestro elemento
    observer.observe(element);
    
    // Limpieza: dejar de observar cuando el componente se desmonte
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [rootMargin, threshold, triggerOnce]);

  // Devolvemos la referencia y el estado de visibilidad
  return { ref, isVisible, forceVisible };
}

export default useIntersectionObserver;

import React, { useState, useEffect, useMemo } from 'react';
import type { OptimizedImageProps } from '@/types';
import { useDeviceInfo } from '@/hooks/useDeviceInfo';

/**
 * Componente OptimizedImage para estandarizar las buenas prácticas de carga de imágenes
 * Ofrece lazy loading, placeholder de carga, manejo de errores, y optimizaciones para dispositivos
 * 
 * @param {OptimizedImageProps} props - Propiedades del componente
 * @returns {JSX.Element} - Componente de imagen optimizado
 * 
 * @example
 * <OptimizedImage 
 *   src="/images/hero.webp" 
 *   alt="Hero image" 
 *   width={800} 
 *   height={600} 
 *   priority={false} 
 *   placeholder="blur" 
 * />
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  onLoad,
  priority = false,
  placeholder = 'blur',
  ...props
}) => {
  // Obtener información del dispositivo para optimizaciones adicionales
  const { isMobile, isLowPowerDevice, connection } = useDeviceInfo();
  
  // Establecer loading y decoding según priority y tipo de dispositivo
  if (priority) {
    loading = 'eager';
    decoding = 'sync';
  } else if (isLowPowerDevice || connection.saveData) {
    loading = 'lazy';
    decoding = 'async';
  }

  // Estado para manejar carga de imagen y fallback
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Imagen placeholder por defecto
  const placeholderSrc = '/placeholder.svg';
  
  // Determinar la imagen óptima para el dispositivo
  // (Podría ser una versión de menor resolución para móviles o conexiones lentas)
  const optimizedSrc = useMemo(() => {
    // Si hay error, usar el placeholder
    if (hasError) return placeholderSrc;
    
    // Si está guardando datos o es un dispositivo de baja potencia, usar versión ligera si existe
    if (connection.saveData || (isMobile && connection.effectiveType !== '4g')) {
      // Comprueba si existe una versión optimizada para móvil
      // Convención: imagen.jpg -> imagen.mobile.jpg
      const mobileSrc = src.replace(/(\.\w+)$/, '.mobile$1');
      
      // Aquí podrías verificar si la versión móvil existe
      // Para simplificar, usamos directamente src
      return src;
    }
    
    return src;
  }, [src, hasError, connection.saveData, connection.effectiveType, isMobile]);
  
  // Función para manejar la carga completa
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Función para manejar errores de carga
  const handleError = () => {
    console.warn(`Error loading image: ${src}`);
    setHasError(true);
  };
  
  // Efecto para prerenderizar la imagen si es prioritaria
  useEffect(() => {
    if (priority && optimizedSrc !== placeholderSrc) {
      const img = new Image();
      img.src = optimizedSrc;
    }
  }, [priority, optimizedSrc, placeholderSrc]);
  
  return (
    <div 
      className={`relative overflow-hidden ${className}`} 
      style={{ 
        width: width || 'auto', 
        height: height || 'auto',
        aspectRatio: width && height ? `${width}/${height}` : 'auto'
      }}
    >
      {/* Mostrar placeholder mientras carga o si hay error */}
      {(!isLoaded || hasError) && placeholder === 'blur' && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse" 
          style={{ 
            backdropFilter: 'blur(8px)',
            width: '100%',
            height: '100%'
          }}
          aria-hidden="true"
        />
      )}
      
      <img
        src={optimizedSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        onLoad={handleLoad}
        onError={handleError}
        className={`${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 w-full h-full object-cover`}
        {...props}
      />
    </div>
  );
};

// Uso de React.memo para evitar renderizados innecesarios
export default React.memo(OptimizedImage);
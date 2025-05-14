import React from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
  onLoad?: () => void;
  priority?: boolean;
  placeholder?: string;
}

/**
 * Componente OptimizedImage para estandarizar las buenas prácticas de carga de imágenes
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
  // Establecer loading y decoding según priority
  if (priority) {
    loading = 'eager';
    decoding = 'sync';
  }

  // Estado para manejar carga de imagen y fallback
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Tener una imagen placeholder por defecto
  const placeholderSrc = '/placeholder.svg';
  
  // Función para manejar la carga completa
  const handleLoad = () => {
    setIsLoaded(true);
    if (onLoad) onLoad();
  };
  
  // Función para manejar errores de carga
  const handleError = () => {
    setHasError(true);
  };
  
  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height }}>
      {/* Mostrar placeholder mientras carga o si hay error */}
      {(!isLoaded || hasError) && placeholder === 'blur' && (
        <div 
          className="absolute inset-0 bg-gray-200 animate-pulse" 
          style={{ 
            backdropFilter: 'blur(8px)',
            width: '100%',
            height: '100%'
          }}
        />
      )}
      
      <img
        src={hasError ? placeholderSrc : src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        decoding={decoding}
        onLoad={handleLoad}
        onError={handleError}
        className={`${className} ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300`}
        {...props}
      />
    </div>
  );
};

export default React.memo(OptimizedImage);
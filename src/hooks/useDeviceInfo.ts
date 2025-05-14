import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLowPowerDevice: boolean;
  prefersReducedMotion: boolean;
  connection: {
    effectiveType: string;
    saveData: boolean;
  };
}

/**
 * Hook para detectar información del dispositivo para optimizaciones de rendimiento
 */
export function useDeviceInfo(): DeviceInfo {
  // Valor por defecto para SSR
  const defaultDeviceInfo: DeviceInfo = {
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    isLowPowerDevice: false,
    prefersReducedMotion: false,
    connection: {
      effectiveType: '4g',
      saveData: false
    }
  };
  
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(defaultDeviceInfo);
  
  useEffect(() => {
    // Solo ejecutar en cliente
    if (typeof window === 'undefined') return;
    
    const updateDeviceInfo = () => {
      // Comprobar si es un dispositivo móvil
      const isMobile = window.innerWidth < 768 || 
        /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      
      // Comprobar si es una tablet
      const isTablet = (window.innerWidth >= 768 && window.innerWidth < 1024) || 
        /iPad|Tablet/i.test(navigator.userAgent);
      
      // Es desktop si no es móvil ni tablet
      const isDesktop = !isMobile && !isTablet;
      
      // Comprobar si es un dispositivo de baja potencia
      const isLowPowerDevice = 
        isMobile || 
        (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) ||
        (navigator.deviceMemory && navigator.deviceMemory < 4);
      
      // Comprobar preferencia de reducción de movimiento
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Comprobar conexión
      const connection = {
        effectiveType: '4g',
        saveData: false
      };
      
      // @ts-ignore - Navigator connection API no está en TypeScript estándar
      if (navigator.connection) {
        // @ts-ignore
        connection.effectiveType = navigator.connection.effectiveType || '4g';
        // @ts-ignore
        connection.saveData = navigator.connection.saveData || false;
      }
      
      setDeviceInfo({
        isMobile,
        isTablet,
        isDesktop,
        isLowPowerDevice,
        prefersReducedMotion,
        connection
      });
    };
    
    // Ejecutar inmediatamente
    updateDeviceInfo();
    
    // Actualizar en cambio de tamaño de ventana
    window.addEventListener('resize', updateDeviceInfo);
    
    // Limpiar al desmontar
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
    };
  }, []);
  
  return deviceInfo;
}

export default useDeviceInfo;
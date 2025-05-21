import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useDeviceInfo } from "@/hooks/useDeviceInfo";

/**
 * @component HeroShootingStarsBackground
 * Fondo de estrellas fugaces optimizado para la sección Hero.
 * Adaptativo a diferentes dispositivos y preferencias de usuario.
 */

// Constantes de configuración optimizadas
const STAR_COLOR = "rgba(255,255,255,0.93)";
const GLOW_COLOR = "rgba(255,255,255,0.68)";
const TRAIL_COLOR = "rgba(255,255,255,0.83)";
const GRADIENT_BG = [
  { color: "#1B1540", stop: 0 },
  { color: "#060E15", stop: 0.57 },
  { color: "#000000", stop: 1 }
];

// Tipo para estrellas
interface Star {
  x: number;
  y: number;
  angle: number;
  speed: number;
  trailLength: number;
  progress: number;
  size: number;
  opacity: number;
  alive: boolean;
}

const HeroShootingStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const animationFrameRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  
  // Usar useDeviceInfo para optimizaciones basadas en el dispositivo
  const { isMobile, isTablet, isLowPowerDevice, prefersReducedMotion } = useDeviceInfo();

  // Detectar navegador Chrome para ajustar parámetros que causan lags
  const isChrome = useMemo(() => {
    if (typeof navigator === "undefined") return false;
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
  }, []);

  // Ajustar animación según preferencias y visibilidad de la pestaña
  useEffect(() => {
    const updateAnimation = () => {
      if (prefersReducedMotion || document.hidden) {
        setShouldAnimate(false);
      } else {
        setShouldAnimate(true);
      }
    };

    updateAnimation();
    document.addEventListener("visibilitychange", updateAnimation);

    return () => {
      document.removeEventListener("visibilitychange", updateAnimation);
    };
  }, [prefersReducedMotion]);

  // Función memoizada para generar estrella
  const generateStar = useCallback((w: number, h: number): Star => {
    // Ajustar tamaño según dispositivo
    const sizeFactor = isLowPowerDevice ? 0.7 : 1;
    const size = (Math.random() * 2 + 1.5) * sizeFactor;
    
    const startX = Math.random() * w;
    const startY = Math.random() * h;
    
    // Ajustar ángulo para mejor visualización en diferentes dispositivos
    const angleBase = 150;
    const angleVariation = isMobile ? 20 : 0; // Más vertical en móvil
    const angle = ((angleBase + (Math.random() * angleVariation - angleVariation/2)) * Math.PI) / 180;
    
    const trailLength = Math.hypot(w, h) * (isMobile ? 1.2 : 1.56);
    
    // Ajustar velocidad según dispositivo
    let speedFactor = 1;
    if (isLowPowerDevice) speedFactor = 0.08;  // Muy lento para dispositivos de bajo rendimiento
    else if (isMobile) speedFactor = 0.1;     // Muy lento para móviles
    else if (isTablet) speedFactor = 0.15;    // Muy lento para tablets
    
    // Reducción drástica de la velocidad base (0.3) - aproximadamente 25% de la velocidad original
    const speed = (Math.random() * 0.2 + 0.8) * 0.8 * 0.85 * speedFactor * 0.3;
    
    return {
      x: startX,
      y: startY,
      angle,
      speed,
      trailLength,
      progress: 0,
      size,
      opacity: Math.random() * 0.2 + 0.8,
      alive: true
    };
  }, [isLowPowerDevice, isMobile, isTablet]);

  // Función memoizada para dibujar gradiente de fondo
  const drawBackgroundGradient = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    // Optimización: no redibujar el fondo completo en cada frame en dispositivos de baja potencia
    if (isLowPowerDevice) {
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);
      return;
    }
    
    // Gradiente completo para dispositivos potentes
    const grad = ctx.createRadialGradient(
      w * 0.5, h * 0.04, w * 0.20,
      w * 0.5, h * 0.55, w * 1
    );
    
    for (const stop of GRADIENT_BG) {
      grad.addColorStop(stop.stop, stop.color);
    }
    
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }, [isLowPowerDevice]);

  // Función memoizada para dibujar estrella con optimizaciones
  const drawStar = useCallback((ctx: CanvasRenderingContext2D, star: Star) => {
    const dx = Math.cos(star.angle) * star.trailLength * star.progress;
    const dy = Math.sin(star.angle) * star.trailLength * star.progress;
    const canvasHeight = ctx.canvas.height;

    const headX = star.x + dx;
    const headY = star.y + dy;

    const tailX = headX - dx * 0.3;
    const tailY = headY - dy * 0.3;
    
    // Optimización: No dibujar estrellas fuera del canvas
    if (
      headX < -50 || 
      headX > ctx.canvas.width + 50 || 
      headY < -50 || 
      headY > ctx.canvas.height + 50
    ) {
      return;
    }
    
    // Simplificar efectos en dispositivos de baja potencia
    if (isLowPowerDevice) {
      ctx.save();
      ctx.globalAlpha = star.opacity * 0.8;
      
      // Trazo simplificado sin gradiente ni sombra
      ctx.strokeStyle = TRAIL_COLOR;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(tailX, tailY);
      ctx.lineTo(headX, headY);
      ctx.stroke();
      
      // Cabeza simplificada
      ctx.beginPath();
      ctx.arc(headX, headY, star.size, 0, Math.PI * 2);
      ctx.fillStyle = STAR_COLOR;
      ctx.fill();
      ctx.restore();
      return;
    }
    
    // Versión completa con efectos para dispositivos potentes
    ctx.save();
    ctx.globalAlpha = star.opacity * 0.93;
    const trailGradient = ctx.createLinearGradient(tailX, tailY, headX, headY);
    trailGradient.addColorStop(0, 'rgba(255,255,255,0)');
    trailGradient.addColorStop(0.4, 'rgba(255,255,255,0.2)');
    trailGradient.addColorStop(0.7, 'rgba(255,255,255,0.6)');
    trailGradient.addColorStop(1, TRAIL_COLOR);
    
    ctx.strokeStyle = trailGradient;
    ctx.lineWidth = 1.5;
    ctx.shadowColor = GLOW_COLOR;
    ctx.shadowBlur = 10;
    ctx.beginPath();
    ctx.moveTo(tailX, tailY);
    ctx.lineTo(headX, headY);
    ctx.stroke();
    ctx.restore();

    ctx.save();
    const headOpacity = headY > canvasHeight * 0.8
      ? star.opacity * (0.8 + Math.random() * 0.2)
      : star.opacity;
    ctx.globalAlpha = headOpacity;
    ctx.beginPath();
    ctx.arc(headX, headY, star.size * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = STAR_COLOR;
    ctx.shadowColor = GLOW_COLOR;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.restore();
  }, [isLowPowerDevice]);

  // Efecto para gestionar la animación en el canvas
  useEffect(() => {
    if (!shouldAnimate) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Manejar redimensionamiento
    let resizeTimeout: NodeJS.Timeout;
    const throttledResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        // Forzar un reflow para evitar bloqueos al redimensionar
        requestAnimationFrame(() => {
          resizeCanvas();
        });
      }, 200);
    };
    
    const resizeCanvas = () => {
      // Establecer tamaño basado en el contenedor padre, no en la ventana completa
      const parent = canvas.parentElement;
      if (!parent) return;
      
      // Obtener el tamaño real del contenedor
      const rect = parent.getBoundingClientRect();
      
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      // Regenerar las estrellas para el nuevo tamaño
      starsRef.current = [];
    };
    
    window.addEventListener("resize", throttledResize);
    resizeCanvas();
    
    // Configuración de rendimiento y cantidad de estrellas según dispositivo
    const baseSpawnInterval = isLowPowerDevice ? 3000 : (isMobile ? 1500 : 400);
    const maxStars = isLowPowerDevice ? 5 : (isMobile ? 10 : 15);
    
    let lastTime = Date.now();
    let spawnAccumulator = 0;
    let spawnInterval = baseSpawnInterval;
    
    // Función de animación optimizada
    const animate = () => {
      const now = Date.now();
      const delta = now - lastTime;
      lastTime = now;
      
      const w = canvas.width;
      const h = canvas.height;
      
      // No dibujar si la pestaña no está visible
      if (document.hidden) return;
      
      // Limpiar canvas con el fondo
      ctx.clearRect(0, 0, w, h);
      if (starsRef.current.length > 0) {
        drawBackgroundGradient(ctx, w, h);
      }
      
      // Acumular tiempo para generación de estrellas
      spawnAccumulator += delta;
      
      // Generar nuevas estrellas a intervalos
      if (spawnAccumulator > spawnInterval && starsRef.current.length < maxStars) {
        starsRef.current.push(generateStar(w, h));
        spawnAccumulator = 0;
        spawnInterval = baseSpawnInterval + Math.random() * 100;
      }
      
      // Actualizar y filtrar estrellas en una sola pasada (optimización)
      const aliveStars: Star[] = [];
      for (const star of starsRef.current) {
        star.progress += delta * star.speed / 450;
        if (star.progress < 1) {
          drawStar(ctx, star);
          aliveStars.push(star);
        }
      }
      starsRef.current = aliveStars;
      
      // Continuar animación
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Iniciar loop de animación
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Limpieza al desmontar
    return () => {
      window.removeEventListener("resize", throttledResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resizeTimeout) clearTimeout(resizeTimeout);
    };
  }, [shouldAnimate, isLowPowerDevice, isMobile, isTablet, generateStar, drawBackgroundGradient, drawStar]);
  
  // No renderizar nada en modo sin animación
  if (!shouldAnimate) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};

// Uso de React.memo para evitar renderizados innecesarios
export default React.memo(HeroShootingStarsBackground);

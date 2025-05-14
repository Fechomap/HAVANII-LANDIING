import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";
import { useDeviceInfo } from "@/hooks/useDeviceInfo";

/**
 * @component ShootingStarsBackground
 * Fondo global de estrellas fugaces optimizado para rendimiento.
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

const ShootingStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const animationFrameRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);
  
  // Usar useDeviceInfo para optimizaciones basadas en el dispositivo
  const { isMobile, isTablet, isLowPowerDevice, prefersReducedMotion } = useDeviceInfo();

  // Ajustar animación basada en capacidades del dispositivo y preferencias
  useEffect(() => {
    if (prefersReducedMotion) {
      setShouldAnimate(false);
    } else {
      setShouldAnimate(true);
    }
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
    if (isLowPowerDevice) speedFactor = 0.3;
    else if (isMobile) speedFactor = 0.4;
    else if (isTablet) speedFactor = 0.6;
    
    const speed = (Math.random() * 0.2 + 0.8) * 0.8 * 0.85 * speedFactor;
    
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

  // Efecto principal de animación con optimizaciones
  useEffect(() => {
    if (!shouldAnimate) return;
    
    // Limpiar animación anterior si existe
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    let w = window.innerWidth;
    let h = window.innerHeight;
    
    // Reducir resolución del canvas en dispositivos de baja potencia
    if (isLowPowerDevice) {
      canvas.width = Math.floor(w * 0.75);
      canvas.height = Math.floor(h * 0.75);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    } else {
      canvas.width = w;
      canvas.height = h;
    }
    
    // Función para ajustar canvas al tamaño de la ventana
    const resizeCanvas = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      
      if (canvas) {
        if (isLowPowerDevice) {
          canvas.width = Math.floor(w * 0.75);
          canvas.height = Math.floor(h * 0.75);
          canvas.style.width = `${w}px`;
          canvas.style.height = `${h}px`;
        } else {
          canvas.width = w;
          canvas.height = h;
        }
      }
    };
    
    // Throttle para resize (optimización)
    let resizeTimeout: number;
    const throttledResize = () => {
      if (resizeTimeout) clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 200);
    };
    
    resizeCanvas();
    window.addEventListener("resize", throttledResize);
    
    let lastTime = performance.now();
    let spawnAccumulator = 0;
    
    // Ajustar parámetros según el dispositivo
    const baseSpawnInterval = isLowPowerDevice ? 1200 : isMobile ? 800 : 200;
    let spawnInterval = baseSpawnInterval;
    
    // Número máximo de estrellas según capacidad del dispositivo
    const maxStars = isLowPowerDevice ? 6 : isMobile ? 10 : isTablet ? 15 : 25;
    
    // Optimización: Frecuencia de actualización reducida para dispositivos de baja potencia
    const frameSkip = isLowPowerDevice ? 2 : 1; // Saltar frames en dispositivos lentos
    let frameCount = 0;
    
    // Función de animación principal optimizada
    const animate = (now: number) => {
      if (!canvas) return;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Skip frames para dispositivos lentos
      frameCount++;
      if (isLowPowerDevice && frameCount % frameSkip !== 0) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      
      // Calcular delta de tiempo para animación suave
      const delta = now - lastTime;
      lastTime = now;
      
      // Dibujar fondo solo cuando sea necesario (optimización)
      if (!isLowPowerDevice || frameCount % 5 === 0) {
        drawBackgroundGradient(ctx, w, h);
      } else {
        // En dispositivos lentos, solo limpiar el rastro de las estrellas
        ctx.fillStyle = 'rgba(0,0,0,0.15)';
        ctx.fillRect(0, 0, w, h);
      }
      
      // Acumular tiempo para generar nuevas estrellas
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
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};

// Uso de React.memo para evitar renderizados innecesarios
export default React.memo(ShootingStarsBackground);
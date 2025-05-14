import React, { useEffect, useRef, useState, useCallback, useMemo } from "react";

/**
 * @component ShootingStarsBackground
 * Fondo global de estrellas fugaces optimizado para rendimiento.
 */

// Constantes con configuración optimizada
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
  const [isLowPowerDevice, setIsLowPowerDevice] = useState(false);
  const animationFrameRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);

  // Detectar dispositivos de baja potencia y preferencias de reducción de movimiento
  useEffect(() => {
    // Verificar preferencias de reducción de movimiento
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Estimar si es un dispositivo de baja potencia
    const isLowEnd = 
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
      (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);
    
    if (prefersReducedMotion) {
      setShouldAnimate(false);
    } else if (isLowEnd) {
      setIsLowPowerDevice(true);
      // Sigue animando pero con menos estrellas/calidad
    } else {
      setShouldAnimate(true);
    }
  }, []);

  // Función memoizada para generar estrella (evita recreación en cada render)
  const generateStar = useCallback((w: number, h: number): Star => {
    const size = Math.random() * 2 + 1.5;
    const startX = Math.random() * w;
    const startY = Math.random() * h;
    const angle = (150 * Math.PI) / 180;
    const trailLength = Math.hypot(w, h) * 1.56;
    // Reducir velocidad en dispositivos de baja potencia
    const speedFactor = isLowPowerDevice ? 0.3 : 0.5;
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
  }, [isLowPowerDevice]);

  // Función memoizada para dibujar gradiente
  const drawBackgroundGradient = useCallback((ctx: CanvasRenderingContext2D, w: number, h: number) => {
    const grad = ctx.createRadialGradient(
      w * 0.5, h * 0.04, w * 0.20,
      w * 0.5, h * 0.55, w * 1
    );
    for (const stop of GRADIENT_BG) {
      grad.addColorStop(stop.stop, stop.color);
    }
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
  }, []);

  // Función memoizada para dibujar estrella
  const drawStar = useCallback((ctx: CanvasRenderingContext2D, star: Star) => {
    const dx = Math.cos(star.angle) * star.trailLength * star.progress;
    const dy = Math.sin(star.angle) * star.trailLength * star.progress;
    const canvasHeight = ctx.canvas.height;

    const headX = star.x + dx;
    const headY = star.y + dy;

    const tailX = headX - dx * 0.3;
    const tailY = headY - dy * 0.3;
    
    // Optimización: No dibujar estrellas que están fuera del canvas
    if (
      headX < -50 || 
      headX > ctx.canvas.width + 50 || 
      headY < -50 || 
      headY > ctx.canvas.height + 50
    ) {
      return;
    }
    
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
  }, []);

  // Efecto principal de animación
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
    
    // Función para ajustar canvas al tamaño de la ventana
    const resizeCanvas = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      if (canvas) {
        canvas.width = w;
        canvas.height = h;
      }
    };
    
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    
    let lastTime = performance.now();
    let spawnAccumulator = 0;
    
    // Ajustar intervalo según capacidad del dispositivo
    const baseSpawnInterval = isLowPowerDevice ? 1000 : 200;
    let spawnInterval = baseSpawnInterval;
    
    // Número máximo de estrellas según capacidad del dispositivo
    const maxStars = isLowPowerDevice ? 8 : 25;
    
    // Función de animación principal
    const animate = (now: number) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      
      // Dibujar fondo gradiente
      drawBackgroundGradient(ctx, w, h);
      
      // Calcular delta de tiempo para animación suave
      const delta = now - lastTime;
      lastTime = now;
      spawnAccumulator += delta;
      
      // Generar nuevas estrellas a intervalos y si no superamos el máximo
      if (spawnAccumulator > spawnInterval && starsRef.current.length < maxStars) {
        starsRef.current.push(generateStar(w, h));
        spawnAccumulator = 0;
        // Añadir variación al intervalo para un efecto más natural
        spawnInterval = baseSpawnInterval + Math.random() * 100;
      }
      
      // Actualizar progreso de cada estrella
      starsRef.current = starsRef.current.filter(star => {
        star.progress += delta * star.speed / 450;
        return star.progress < 1; // Mantener solo estrellas vivas
      });
      
      // Dibujar todas las estrellas activas
      starsRef.current.forEach(star => drawStar(ctx, star));
      
      // Continuar animación
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    // Iniciar loop de animación
    animationFrameRef.current = requestAnimationFrame(animate);
    
    // Limpieza al desmontar
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [shouldAnimate, isLowPowerDevice, generateStar, drawBackgroundGradient, drawStar]);
  
  // Rendimiento optimizado: No renderizar nada en modo sin animación
  if (!shouldAnimate) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen z-0 pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};

export default React.memo(ShootingStarsBackground);
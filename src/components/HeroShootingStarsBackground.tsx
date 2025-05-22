import React, { useEffect, useRef, useState } from "react";

// Constantes simples
const STAR_COLOR = "rgba(255,255,255,0.93)";
const GLOW_COLOR = "rgba(255,255,255,0.68)";
const TRAIL_COLOR = "rgba(255,255,255,0.83)";

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
}

const HeroShootingStarsBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const animationFrameRef = useRef<number>();
  const starsRef = useRef<Star[]>([]);

  // Pausar cuando la pestaña no está visible
  useEffect(() => {
    const handleVisibilityChange = () => {
      setShouldAnimate(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // Generar estrella simple
  const generateStar = (w: number, h: number): Star => {
    const size = Math.random() * 2 + 1.5;
    const startX = Math.random() * w;
    const startY = Math.random() * h;
    const angle = (150 * Math.PI) / 180; // Ángulo fijo diagonal
    const trailLength = Math.hypot(w, h) * 1.5;
    const speed = Math.random() * 0.2 + 0.8;
    
    return {
      x: startX,
      y: startY,
      angle,
      speed,
      trailLength,
      progress: 0,
      size,
      opacity: Math.random() * 0.2 + 0.8
    };
  };

  // Dibujar estrella con efectos
  const drawStar = (ctx: CanvasRenderingContext2D, star: Star) => {
    const dx = Math.cos(star.angle) * star.trailLength * star.progress;
    const dy = Math.sin(star.angle) * star.trailLength * star.progress;

    const headX = star.x + dx;
    const headY = star.y + dy;
    const tailX = headX - dx * 0.3;
    const tailY = headY - dy * 0.3;
    
    // No dibujar si está fuera del canvas
    if (headX < -50 || headX > ctx.canvas.width + 50 || 
        headY < -50 || headY > ctx.canvas.height + 50) {
      return;
    }
    
    // Dibujar cola con gradiente
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

    // Dibujar cabeza de la estrella
    ctx.save();
    ctx.globalAlpha = star.opacity;
    ctx.beginPath();
    ctx.arc(headX, headY, star.size * 1.2, 0, Math.PI * 2);
    ctx.fillStyle = STAR_COLOR;
    ctx.shadowColor = GLOW_COLOR;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.restore();
  };

  // Efecto principal de animación
  useEffect(() => {
    if (!shouldAnimate) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;
    
    // Redimensionar canvas
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      starsRef.current = [];
    };
    
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();
    
    // Configuración simple
    const SPAWN_INTERVAL = 500; // Cada 500ms
    const MAX_STARS = 12;
    
    let lastTime = Date.now();
    let spawnAccumulator = 0;
    
    // Loop de animación
    const animate = () => {
      const now = Date.now();
      const delta = now - lastTime;
      lastTime = now;
      
      const w = canvas.width;
      const h = canvas.height;
      
      // Limpiar canvas (fondo transparente)
      ctx.clearRect(0, 0, w, h);
      
      // Generar nuevas estrellas
      spawnAccumulator += delta;
      if (spawnAccumulator > SPAWN_INTERVAL && starsRef.current.length < MAX_STARS) {
        starsRef.current.push(generateStar(w, h));
        spawnAccumulator = 0;
      }
      
      // Actualizar y dibujar estrellas
      starsRef.current = starsRef.current.filter(star => {
        star.progress += delta * star.speed / 5000;
        
        if (star.progress < 1) {
          drawStar(ctx, star);
          return true;
        }
        return false;
      });
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animationFrameRef.current = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [shouldAnimate]);
  
  if (!shouldAnimate) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 pointer-events-none select-none"
      aria-hidden="true"
    />
  );
};

export default React.memo(HeroShootingStarsBackground);
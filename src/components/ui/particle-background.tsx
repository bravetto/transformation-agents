"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
}

interface ParticleBackgroundProps {
  className?: string;
  particleCount?: number;
  animationSpeed?: number;
  color?: string;
  maxOpacity?: number;
}

export function ParticleBackground({
  className,
  particleCount = 50,
  animationSpeed = 0.5,
  color = "#3b82f6",
  maxOpacity = 0.3,
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const animationFrameRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);

  // Initialize particles
  const initParticles = useCallback(
    (width: number, height: number) => {
      const particles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * animationSpeed,
          vy: (Math.random() - 0.5) * animationSpeed,
          opacity: Math.random() * maxOpacity,
          size: Math.random() * 2 + 1,
        });
      }

      return particles;
    },
    [particleCount, animationSpeed, maxOpacity],
  );

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = canvas;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    // Update and draw particles
    particlesRef.current.forEach((particle) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = width;
      if (particle.x > width) particle.x = 0;
      if (particle.y < 0) particle.y = height;
      if (particle.y > height) particle.y = 0;

      // Animate opacity
      particle.opacity =
        Math.sin(Date.now() * 0.001 + particle.x * 0.01) * maxOpacity;

      // Draw particle
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${hexToRgb(color)}, ${Math.abs(particle.opacity)})`;
      ctx.fill();
    });

    // Draw connections between nearby particles
    for (let i = 0; i < particlesRef.current.length; i++) {
      for (let j = i + 1; j < particlesRef.current.length; j++) {
        const dx = particlesRef.current[i].x - particlesRef.current[j].x;
        const dy = particlesRef.current[i].y - particlesRef.current[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          const opacity = (1 - distance / 100) * 0.1;
          ctx.beginPath();
          ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y);
          ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y);
          ctx.strokeStyle = `rgba(${hexToRgb(color)}, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, [maxOpacity, color]);

  // Convert hex color to rgb
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return "59, 130, 246"; // Default blue

    return [
      parseInt(result[1], 16),
      parseInt(result[2], 16),
      parseInt(result[3], 16),
    ].join(", ");
  };

  // Handle canvas resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Reinitialize particles for new dimensions
    particlesRef.current = initParticles(canvas.width, canvas.height);
  }, [initParticles]);

  // Use Intersection Observer to only animate when visible
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    observer.observe(canvas);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Initialize and start animation
  useEffect(() => {
    if (!isVisible) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set initial canvas size
    handleResize();

    // Initialize particles
    particlesRef.current = initParticles(canvas.width, canvas.height);

    // Start animation
    animate();

    // Add resize listener
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    isVisible,
    particleCount,
    animationSpeed,
    color,
    maxOpacity,
    handleResize,
    initParticles,
    animate,
  ]);

  // Don't render on mobile devices for performance
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      ),
    );
  }, []);

  if (isMobile) {
    return null; // Skip particles on mobile for better performance
  }

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none", className)}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}

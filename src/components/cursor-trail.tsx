"use client";

import { useEffect, useRef } from "react";
import { withErrorBoundary } from "@/components/with-error-boundary";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  word: string;
}

const HOPE_WORDS = [
  "Hope",
  "Healing",
  "Transform",
  "Bridge",
  "Second Chance",
  "Redemption",
  "Purpose",
  "Future",
];

function CursorTrailExported() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const lastEmit = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Emit particle occasionally
      const now = Date.now();
      if (now - lastEmit.current > 100) {
        particles.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 2,
          vy: (Math.random() - 0.5) * 2 - 1,
          life: 1,
          word:
            HOPE_WORDS[Math.floor(Math.random() * HOPE_WORDS.length)] || "Hope",
        });
        lastEmit.current = now;

        // Limit particles
        if (particles.current.length > 50) {
          particles.current.shift();
        }
      }
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particles.current = particles.current.filter((particle) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.05; // gravity
        particle.life -= 0.02;

        if (particle.life <= 0) return false;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = particle.life;
        ctx.fillStyle = particle.life > 0.5 ? "#FCD34D" : "#5B21B6";
        ctx.font = `${12 + particle.life * 8}px serif`;
        ctx.textAlign = "center";
        ctx.fillText(particle.word, particle.x, particle.y);
        ctx.restore();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: "multiply" }}
    />
  );
}

// Export with error boundary
export default withErrorBoundary(CursorTrailExported, {
  componentName: "cursor-trail",
  id: "cursor-trail",
});

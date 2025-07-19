"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface ParticleFieldProps {
  connections?: boolean;
  density?: number;
  color?: string;
  className?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
  connections = false,
  density = 50,
  color = "#ffffff",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<
    Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
    }>
  >([]);

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

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < density; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 3 + 1,
          opacity: Math.random() * 0.5 + 0.2,
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle, index) => {
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `${color}${Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")}`;
        ctx.fill();

        // Draw connections if enabled
        if (connections) {
          particlesRef.current.slice(index + 1).forEach((otherParticle) => {
            const dx = particle.x - otherParticle.x;
            const dy = particle.y - otherParticle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = `${color}${Math.floor(
                (1 - distance / 100) * 0.2 * 255,
              )
                .toString(16)
                .padStart(2, "0")}`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          });
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [connections, density, color]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
};

// Prophetic Countdown Component
interface PropheticCountdownProps {
  target: string;
  onMilestone?: (milestone: string) => void;
  className?: string;
}

export const PropheticCountdown: React.FC<PropheticCountdownProps> = ({
  target,
  onMilestone,
  className = "",
}) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(target);

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60),
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });

        // Check for milestones
        if (onMilestone) {
          if (days === 365) onMilestone("one_year_remaining");
          if (days === 100) onMilestone("100_days_remaining");
          if (days === 30) onMilestone("30_days_remaining");
          if (days === 7) onMilestone("final_week");
          if (days === 1) onMilestone("final_day");
        }
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        if (onMilestone) onMilestone("time_reached");
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [target, onMilestone]);

  return (
    <div className={`text-center ${className}`}>
      <div className="grid grid-cols-4 gap-4 md:gap-8">
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="text-3xl md:text-5xl font-bold text-white">
            {timeLeft.days.toString().padStart(2, "0")}
          </div>
          <div className="text-sm md:text-base text-white/60">Days</div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="text-3xl md:text-5xl font-bold text-white">
            {timeLeft.hours.toString().padStart(2, "0")}
          </div>
          <div className="text-sm md:text-base text-white/60">Hours</div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="text-3xl md:text-5xl font-bold text-white">
            {timeLeft.minutes.toString().padStart(2, "0")}
          </div>
          <div className="text-sm md:text-base text-white/60">Minutes</div>
        </div>
        <div className="bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="text-3xl md:text-5xl font-bold text-white">
            {timeLeft.seconds.toString().padStart(2, "0")}
          </div>
          <div className="text-sm md:text-base text-white/60">Seconds</div>
        </div>
      </div>
    </div>
  );
};

// Impact Multiplier Component
interface ImpactMultiplierProps {
  direct: number;
  multiplied: number;
  generational: number;
  className?: string;
}

export const ImpactMultiplier: React.FC<ImpactMultiplierProps> = ({
  direct,
  multiplied,
  generational,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-3 gap-6 ${className}`}>
      <div className="text-center">
        <div className="text-2xl font-bold text-gray-900 mb-2">
          {direct.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">Direct Impact</div>
        <div className="text-xs text-gray-500">Lives you touch</div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-amber-600 mb-2">
          {multiplied.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">Multiplied Impact</div>
        <div className="text-xs text-gray-500">Through your network</div>
      </div>

      <div className="text-center">
        <div className="text-2xl font-bold text-green-600 mb-2">
          {generational.toLocaleString()}
        </div>
        <div className="text-sm text-gray-600">Generational Impact</div>
        <div className="text-xs text-gray-500">Future generations</div>
      </div>
    </div>
  );
};

// Action Card Component
interface ActionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
  onClick: () => void;
  color: "amber" | "yellow" | "orange" | "green" | "blue";
  className?: string;
}

export const ActionCard: React.FC<ActionCardProps> = ({
  icon,
  title,
  description,
  action,
  onClick,
  color,
  className = "",
}) => {
  const colorClasses = {
    amber:
      "from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500",
    yellow:
      "from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500",
    orange:
      "from-orange-500 to-orange-600 hover:from-orange-400 hover:to-orange-500",
    green:
      "from-green-500 to-green-600 hover:from-green-400 hover:to-green-500",
    blue: "from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500",
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`
        bg-white rounded-xl shadow-lg p-6 cursor-pointer
        border-2 border-transparent hover:border-${color}-200
        transition-all duration-200 ${className}
      `}
    >
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`
          w-12 h-12 rounded-full bg-gradient-to-r ${colorClasses[color]}
          flex items-center justify-center text-white
        `}
        >
          {icon}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        </div>
      </div>

      <p className="text-gray-600 mb-6">{description}</p>

      <button
        className={`
        w-full py-3 bg-gradient-to-r ${colorClasses[color]}
        text-white font-semibold rounded-lg
        hover:shadow-lg transition-all duration-200
      `}
      >
        {action}
      </button>
    </motion.div>
  );
};

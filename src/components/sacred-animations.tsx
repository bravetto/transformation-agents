"use client";
"use client";

import { useRef, useState, useEffect } from "react";
import {
  useSpring,
  animated,
  useTrail,
  useChain,
  useSpringRef,
  config,
} from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

interface SacredRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "scale";
  className?: string;
  trigger?: boolean;
}

export function SacredReveal({
  children,
  delay = 0,
  direction = "up",
  className = "",
  trigger = true,
}: SacredRevealProps) {
  const getInitialTransform = () => {
    switch (direction) {
      case "up":
        return { transform: "translateY(50px)", opacity: 0 };
      case "down":
        return { transform: "translateY(-50px)", opacity: 0 };
      case "left":
        return { transform: "translateX(50px)", opacity: 0 };
      case "right":
        return { transform: "translateX(-50px)", opacity: 0 };
      case "scale":
        return { transform: "scale(0.8)", opacity: 0 };
      default:
        return { transform: "translateY(50px)", opacity: 0 };
    }
  };

  const springs = useSpring({
    from: getInitialTransform(),
    to: trigger
      ? { transform: "translateY(0px) translateX(0px) scale(1)", opacity: 1 }
      : getInitialTransform(),
    delay,
    config: config.gentle,
  });

  return (
    <animated.div style={springs} className={className}>
      {children}
    </animated.div>
  );
}

interface FloatingElementProps {
  children: React.ReactNode;
  intensity?: "gentle" | "medium" | "strong";
  className?: string;
}

export function FloatingElement({
  children,
  intensity = "gentle",
  className = "",
}: FloatingElementProps) {
  const intensitySettings = {
    gentle: { range: 5, duration: 4000 },
    medium: { range: 10, duration: 3000 },
    strong: { range: 15, duration: 2000 },
  };

  const settings = intensitySettings[intensity];

  const springs = useSpring({
    from: { transform: "translateY(0px) rotate(0deg)" },
    to: async (next) => {
      while (true) {
        await next({
          transform: `translateY(-${settings.range}px) rotate(2deg)`,
          config: { duration: settings.duration },
        });
        await next({
          transform: `translateY(${settings.range}px) rotate(-2deg)`,
          config: { duration: settings.duration },
        });
      }
    },
    config: config.slow,
  });

  return (
    <animated.div style={springs} className={className}>
      {children}
    </animated.div>
  );
}

interface DraggableTestimonyProps {
  children: React.ReactNode;
  onDragEnd?: (info: { offset: number; velocity: number }) => void;
  className?: string;
}

export function DraggableTestimony({
  children,
  onDragEnd,
  className = "",
}: DraggableTestimonyProps) {
  const [{ x, y, rotateZ, scale }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateZ: 0,
    scale: 1,
    config: config.wobbly,
  }));

  // Fix the bind function's return value usage
  const bind = useDrag(
    ({
      active,
      movement: [mx, my],
      velocity: [vx, vy],
      direction: [dx, dy],
    }) => {
      api.start({
        x: active ? mx : 0,
        y: active ? my : 0,
        rotateZ: active ? mx / 10 : 0,
        scale: active ? 1.05 : 1,
        immediate: active,
      });

      if (!active && onDragEnd) {
        onDragEnd({ offset: Math.abs(mx), velocity: Math.abs(vx) });
      }
    },
  );

  // Use bind's return value correctly
  const dragProps = bind();

  return (
    <animated.div
      {...dragProps}
      style={{
        x,
        y,
        rotateZ,
        scale,
        touchAction: "none",
        cursor: "grab",
      }}
      className={className}
    >
      {children}
    </animated.div>
  );
}

interface ParallaxScrollProps {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxScroll({
  children,
  speed = 0.5,
  className = "",
}: ParallaxScrollProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const springs = useSpring({
    transform: `translateY(${scrollY * speed}px)`,
    config: config.slow,
  });

  return (
    <animated.div style={springs} className={className}>
      {children}
    </animated.div>
  );
}

interface StaggeredRevealProps {
  children: React.ReactNode[];
  delay?: number;
  stagger?: number;
  className?: string;
  trigger?: boolean;
}

export function StaggeredReveal({
  children,
  delay = 0,
  stagger = 100,
  className = "",
  trigger = true,
}: StaggeredRevealProps) {
  const trail = useTrail(children.length, {
    from: { opacity: 0, transform: "translateY(30px)" },
    to: trigger
      ? { opacity: 1, transform: "translateY(0px)" }
      : { opacity: 0, transform: "translateY(30px)" },
    delay,
    config: config.gentle,
    trail: stagger,
  });

  return (
    <div className={className}>
      {trail.map((springs, index) => (
        <animated.div key={index} style={springs}>
          {children[index]}
        </animated.div>
      ))}
    </div>
  );
}

interface PulsingHeartProps {
  size?: number;
  intensity?: "gentle" | "strong";
  color?: string;
  onClick?: () => void;
  className?: string;
}

export function PulsingHeart({
  size = 24,
  intensity = "gentle",
  color = "#FCD34D",
  onClick,
  className = "",
}: PulsingHeartProps) {
  const [isClicked, setIsClicked] = useState(false);

  const pulseConfig =
    intensity === "gentle"
      ? { scale: [1, 1.1, 1], duration: 2000 }
      : { scale: [1, 1.3, 1], duration: 1000 };

  // Fix scale type issue by using from/to pattern
  const springs = useSpring({
    from: { scale: 1 },
    to: isClicked
      ? { scale: 1.5 }
      : { scale: intensity === "gentle" ? 1.1 : 1.3 },
    config: {
      ...config.wobbly,
      duration: isClicked ? 300 : pulseConfig.duration,
    },
    loop: !isClicked && { reverse: true },
    onRest: () => {
      if (isClicked) {
        setIsClicked(false);
      }
    },
  });

  const handleClick = () => {
    setIsClicked(true);
    onClick?.();
  };

  return (
    <animated.div
      style={{
        scale: springs.scale,
        cursor: onClick ? "pointer" : "default",
      }}
      onClick={handleClick}
      className={className}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill={color}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    </animated.div>
  );
}

interface ChainedAnimationProps {
  children: React.ReactNode[];
  className?: string;
  trigger?: boolean;
}

export function ChainedAnimation({
  children,
  className = "",
  trigger = true,
}: ChainedAnimationProps) {
  const springRef1 = useSpringRef();
  const springRef2 = useSpringRef();
  const springRef3 = useSpringRef();

  const { opacity: opacity1 } = useSpring({
    ref: springRef1,
    from: { opacity: 0 },
    to: trigger ? { opacity: 1 } : { opacity: 0 },
    config: config.gentle,
  });

  const { transform: transform2 } = useSpring({
    ref: springRef2,
    from: { transform: "translateY(50px)" },
    to: trigger
      ? { transform: "translateY(0px)" }
      : { transform: "translateY(50px)" },
    config: config.wobbly,
  });

  const { scale: scale3 } = useSpring({
    ref: springRef3,
    from: { scale: 0.8 },
    to: trigger ? { scale: 1 } : { scale: 0.8 },
    config: config.gentle,
  });

  useChain(
    trigger
      ? [springRef1, springRef2, springRef3]
      : [springRef3, springRef2, springRef1],
    [0, 0.3, 0.6],
  );

  return (
    <div className={className}>
      {children.map((child, index) => {
        if (index === 0) {
          return (
            <animated.div key={index} style={{ opacity: opacity1 }}>
              {child}
            </animated.div>
          );
        } else if (index === 1) {
          return (
            <animated.div key={index} style={{ transform: transform2 }}>
              {child}
            </animated.div>
          );
        } else {
          return (
            <animated.div key={index} style={{ scale: scale3 }}>
              {child}
            </animated.div>
          );
        }
      })}
    </div>
  );
}

interface MagneticButtonProps {
  children: React.ReactNode;
  strength?: number;
  className?: string;
  onClick?: () => void;
}

export function MagneticButton({
  children,
  strength = 0.3,
  className = "",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [{ x, y, rotateX, rotateY }, api] = useSpring(() => ({
    x: 0,
    y: 0,
    rotateX: 0,
    rotateY: 0,
    config: config.wobbly,
  }));

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    api.start({
      x: deltaX,
      y: deltaY,
      rotateX: -deltaY * 0.1,
      rotateY: deltaX * 0.1,
    });
  };

  const handleMouseLeave = () => {
    api.start({
      x: 0,
      y: 0,
      rotateX: 0,
      rotateY: 0,
    });
  };

  return (
    <animated.div
      ref={ref}
      style={{ x, y, rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      className={`cursor-pointer ${className}`}
    >
      {children}
    </animated.div>
  );
}

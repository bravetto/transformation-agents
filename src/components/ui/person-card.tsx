"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { withErrorBoundary } from '@/components/with-error-boundary';
import { getPersonImageData, staticBlurPlaceholders } from '@/data/person-images';

// Role type for the fallback images
export type PersonRole = 'lightworker' | 'messenger' | 'witness' | 'guardian' | 'default';

// Function to determine fallback image based on role
const getFallbackImage = (role: PersonRole = 'default') => {
  switch (role) {
    case 'lightworker':
      return '/images/fallbacks/lightworker-fallback.jpg';
    case 'messenger':
      return '/images/fallbacks/messenger-fallback.jpg';
    case 'witness':
      return '/images/fallbacks/witness-fallback.jpg';
    case 'guardian':
      return '/images/fallbacks/guardian-fallback.jpg';
    default:
      return '/images/fallbacks/default-fallback.jpg';
  }
};

// Generate initials from name
const getInitials = (name: string) => {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();
};

// Role-based colors for divine effects
const roleColors: Record<PersonRole, {
  primary: string;
  glow: string;
  gradient: string;
  glowClass: string;
}> = {
  lightworker: {
    primary: 'var(--lightworker-primary)',
    glow: 'var(--lightworker-glow)',
    gradient: 'from-amber-600 to-orange-500',
    glowClass: 'glow-lightworker'
  },
  messenger: {
    primary: 'var(--messenger-primary)',
    glow: 'var(--messenger-glow)',
    gradient: 'from-blue-600 to-sky-500',
    glowClass: 'glow-messenger'
  },
  witness: {
    primary: 'var(--witness-primary)',
    glow: 'var(--witness-glow)',
    gradient: 'from-emerald-600 to-teal-500',
    glowClass: 'glow-witness'
  },
  guardian: {
    primary: 'var(--guardian-primary)',
    glow: 'var(--guardian-glow)',
    gradient: 'from-amber-600 to-orange-500',
    glowClass: 'glow-guardian'
  },
  default: {
    primary: 'var(--courage-blue)',
    glow: 'var(--hope-gold)',
    gradient: 'from-blue-500 to-indigo-600',
    glowClass: 'glow-messenger'
  }
};

// Floating particles animation component
const FloatingParticles = ({ role, isHovered }: { role: PersonRole, isHovered: boolean }) => {
  const prefersReducedMotion = 
    typeof window !== 'undefined' ? 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;
  
  if (prefersReducedMotion) return null;
  
  // Get divine accent colors for the given role
  const getGlowColor = (roleType: PersonRole): string => {
    return roleType === 'lightworker' ? 'var(--lightworker-glow)' : 
           roleType === 'messenger' ? 'var(--messenger-glow)' : 
           roleType === 'witness' ? 'var(--witness-glow)' : 
           roleType === 'guardian' ? 'var(--guardian-glow)' : 'var(--hope-gold)';
  };
  
  const color = getGlowColor(role);
  const particleCount = 20; // Increased from 12
  
  return (
    <div className={cn(
      "absolute inset-0 overflow-hidden pointer-events-none transition-opacity duration-500",
      isHovered ? "opacity-100" : "opacity-0"
    )}>
      {[...Array(particleCount)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="absolute rounded-full blur-[1px] opacity-0"
          style={{
            width: isHovered ? `${Math.random() * 2 + 1}px` : '1.5px',
            height: isHovered ? `${Math.random() * 2 + 1}px` : '1.5px',
            left: `${Math.random() * 100}%`,
            bottom: `-5%`,
            opacity: isHovered ? 0.9 : 0, // Increased opacity
            backgroundColor: color,
            animation: isHovered ? 
              `floatUp ${2 + Math.random() * 3}s ease-out ${Math.random() * 2}s infinite` : 
              'none',
            filter: isHovered ? 'blur(1.5px)' : 'blur(1px)'
          }}
        />
      ))}
    </div>
  );
};

export interface PersonCardProps {
  id: string;
  slug: string;
  name: string;
  title: string;
  description?: string;
  imageSrc?: string;
  localImage?: boolean;
  role?: PersonRole;
  size?: 'small' | 'medium' | 'large' | 'featured';
  className?: string;
}

function PersonCard({
  id,
  slug,
  name,
  title,
  description,
  imageSrc,
  localImage = false,
  role = 'default',
  size = 'medium',
  className,
}: PersonCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  // Get the person's local image data if available
  const personImageData = localImage && id ? getPersonImageData(id, role) : undefined;
  
  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  // Define size-specific styles
  const sizeStyles = {
    small: {
      container: 'h-60',
      image: 'h-28 w-28',
      title: 'text-lg',
      content: 'p-4',
      description: 'line-clamp-2 text-xs',
    },
    medium: {
      container: 'h-80',
      image: 'h-36 w-36',
      title: 'text-xl',
      content: 'p-5',
      description: 'line-clamp-3 text-sm',
    },
    large: {
      container: 'h-96',
      image: 'h-48 w-48',
      title: 'text-2xl',
      content: 'p-6',
      description: 'line-clamp-4',
    },
    featured: {
      container: 'h-96 md:h-[32rem] col-span-2',
      image: 'h-48 w-48 md:h-64 md:w-64',
      title: 'text-3xl',
      content: 'p-6 md:p-8',
      description: 'md:line-clamp-6 text-base',
    },
  };

  // Role-based colors for fallback avatars
  const roleColors = {
    lightworker: 'bg-amber-600 text-white',
    messenger: 'bg-blue-600 text-white',
    witness: 'bg-emerald-600 text-white',
    guardian: 'bg-amber-600 text-white',
    default: 'bg-courage-blue text-white',
  };

  // Motion variants for animations with divine easing
  const divineEasing = [0.16, 1, 0.3, 1]; // cubic-bezier(0.16, 1, 0.3, 1)
  
  const cardVariants = {
    initial: { 
      y: 20,
      opacity: 0 
    },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: divineEasing
      }
    },
    hover: {
      y: -10, // Increased lift
      scale: prefersReducedMotion ? 1 : 1.05, // Increased from 1.03
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.3)', // Stronger shadow
      transition: {
        duration: 0.4,
        ease: divineEasing
      }
    }
  };

  const imageVariants = {
    initial: {
      scale: 1,
    },
    hover: {
      scale: prefersReducedMotion ? 1 : 1.1, // Increased from 1.08
      transition: {
        duration: 0.5,
        ease: divineEasing
      }
    }
  };

  // Determine the image sources in order of priority
  const getImageSource = () => {
    // First check for local image data
    if (personImageData) {
      // Use the display size by default or full size for featured cards
      return size === 'featured' ? personImageData.full : personImageData.display;
    }
    
    // Next check for remote image URL
    if (!imageError && imageSrc) {
      return imageSrc;
    }
    
    // Finally, use role-based fallback
    return getFallbackImage(role);
  };
  
  // Get the JPG fallback image source
  const getJpgFallbackSource = () => {
    if (personImageData) {
      // Use the display size by default or full size for featured cards
      return size === 'featured' ? personImageData.fullJpg : personImageData.displayJpg;
    }
    
    // Use role-based fallback if no personImageData
    return getFallbackImage(role);
  };
  
  // Get the appropriate blur data URL
  const getBlurDataURL = () => {
    if (personImageData?.blurDataURL) {
      return personImageData.blurDataURL;
    }
    
    // Use static placeholders based on role if no specific blur data
    return staticBlurPlaceholders[role] || staticBlurPlaceholders.default;
  };
  
  // Determine if we should use placeholder blur
  const shouldUseBlur = !!personImageData?.blurDataURL;
  
  // Determine the image source based on availability
  const imageSource = getImageSource();
  const jpgFallbackSource = getJpgFallbackSource();
    
  // Get role-specific colors
  const roleColor = roleColors[role] || roleColors.default;
  const divineColors = role in roleColors ? roleColors[role] : roleColors.default;

  // Get divine accent colors
  const divineAccent = {
    glowClass: role === 'lightworker' ? 'glow-lightworker' : 
              role === 'messenger' ? 'glow-messenger' : 
              role === 'witness' ? 'glow-witness' : 
              role === 'guardian' ? 'glow-guardian' : 'glow-messenger',
    gradient: role === 'lightworker' ? 'from-amber-600 to-orange-500' : 
             role === 'messenger' ? 'from-blue-600 to-sky-500' : 
             role === 'witness' ? 'from-emerald-600 to-teal-500' : 
             role === 'guardian' ? 'from-amber-600 to-orange-500' : 'from-blue-500 to-indigo-600',
    glow: role === 'lightworker' ? 'var(--lightworker-glow)' : 
         role === 'messenger' ? 'var(--messenger-glow)' : 
         role === 'witness' ? 'var(--witness-glow)' : 
         role === 'guardian' ? 'var(--guardian-glow)' : 'var(--hope-gold)'
  };

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "relative overflow-hidden rounded-xl glass transition-all ease-divine transform-gpu will-change-transform",
        sizeStyles[size].container,
        isHovered ? divineAccent.glowClass : "",
        className
      )}
    >
      <Link href={`/people/${slug}`} className="block h-full">
        {/* Divine glow overlay */}
        <div 
          className={cn(
            "absolute inset-0 opacity-70 z-0 transition-opacity duration-500 ease-divine",
            `bg-gradient-to-br ${divineAccent.gradient}`
          )}
          style={{
            opacity: isHovered ? 0.9 : 0.7,
            filter: isHovered ? 'brightness(1.2)' : 'brightness(1)',
          }}
        />

        {/* Floating particles effect */}
        <FloatingParticles role={role} isHovered={isHovered} />
        
        {/* Gradient overlay - changed to only cover bottom 30% */}
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black to-transparent rounded-b-xl" />
        
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <motion.div
            variants={imageVariants}
            className="w-full h-full"
          >
            {!imageError && (personImageData || imageSrc) ? (
              <>
                <picture>
                  {/* WebP source - primary format */}
                  <source srcSet={imageSource} type="image/webp" />
                  
                  {/* JPG fallback for browsers without WebP support */}
                  <source srcSet={jpgFallbackSource} type="image/jpeg" />
                  
                  {/* Image with all required props */}
                  <Image
                    src={imageSource}
                    alt={name}
                    fill
                    sizes={
                      size === 'small' 
                        ? '(max-width: 640px) 100vw, 150px' 
                        : size === 'medium' 
                          ? '(max-width: 768px) 100vw, 300px' 
                          : size === 'large' 
                            ? '(max-width: 1024px) 100vw, 450px' 
                            : '(max-width: 1280px) 100vw, 600px'
                    }
                    style={{ objectFit: 'cover' }}
                    className="opacity-90"
                    onError={() => setImageError(true)}
                    priority={size === 'featured'}
                    placeholder={shouldUseBlur ? "blur" : "empty"}
                    blurDataURL={shouldUseBlur ? getBlurDataURL() : undefined}
                  />
                </picture>
              </>
            ) : (
              <div className={cn(
                "w-full h-full flex items-center justify-center",
                roleColors[role]
              )}>
                <span className="text-6xl font-bold">{getInitials(name)}</span>
              </div>
            )}
          </motion.div>
        </div>
        
        {/* Content Overlay - moved to bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4">
          {/* Title */}
          <h3 className="text-lg font-bold text-white" style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}>
            {name}
          </h3>
          
          {/* Subtitle */}
          <p className="text-sm" style={{ 
            color: divineAccent.glow, 
            textShadow: '0 2px 6px rgba(0,0,0,0.9)'
          }}>
            {title}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

export default withErrorBoundary(PersonCard, {
  componentName: 'PersonCard',
  id: 'person-card'
}); 
"use client"

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Button } from '@/components/ui'
import { withErrorBoundary } from '@/components/with-error-boundary'
import { getPersonImageData } from '@/data/person-images'

export interface PersonHeroProps {
  name: string
  subtitle: string
  description: string
  imageSrc: string
  imageAlt: string
  personId?: string
  localImage?: boolean
  role?: string
  cta?: {
    text: string
    link: string
  }
  variant?: 'primary' | 'secondary' | 'tertiary'
}

function PersonHero({
  name,
  subtitle,
  description,
  imageSrc,
  imageAlt,
  personId,
  localImage = false,
  role = 'default',
  cta,
  variant = 'primary'
}: PersonHeroProps) {
  // Determine background styles based on variant
  const bgStyles = {
    primary: 'bg-courage-blue text-white',
    secondary: 'bg-hope-gold text-gentle-charcoal',
    tertiary: 'bg-growth-green text-white'
  }
  
  const currentBg = bgStyles[variant]
  
  // Check for local image
  const personImageData = localImage && personId ? getPersonImageData(personId, role) : undefined;
  const imageSource = personImageData ? personImageData.full : imageSrc;
  
  return (
    <section className={`relative overflow-hidden ${currentBg} py-16 md:py-24`}>
      {/* Background particle effect could be added here */}
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
              {name}
            </h1>
            
            <p className="text-xl md:text-2xl mb-6 opacity-90">
              {subtitle}
            </p>
            
            <div className="mb-8 text-lg leading-relaxed">
              <p>{description}</p>
            </div>
            
            {cta && (
              <Button variant={variant === 'primary' ? 'secondary' : 'primary'} size="lg" asChild>
                <a href={cta.link}>{cta.text}</a>
              </Button>
            )}
          </motion.div>
          
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="order-1 lg:order-2 flex justify-center"
          >
            <div className="relative h-80 w-80 md:h-96 md:w-96 rounded-full overflow-hidden border-4 border-white/30 shadow-2xl">
              <Image
                src={imageSource}
                alt={imageAlt}
                fill
                sizes="(max-width: 768px) 320px, 384px"
                style={{ objectFit: 'cover' }}
                priority
                placeholder={personImageData?.blurDataURL ? "blur" : "empty"}
                blurDataURL={personImageData?.blurDataURL}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default withErrorBoundary(PersonHero, {
  componentName: 'PersonHero',
  id: 'person-hero'
}) 
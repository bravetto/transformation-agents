'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Heading, Text, Button, Stack, Badge } from '@/components/ui';
import Link from 'next/link';
import { ArrowRight, Users, Calendar, Heart } from 'lucide-react';

export default function Hero() {
  const [daysSinceLaunch, setDaysSinceLaunch] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Calculate days since December 26, 2024
    const launchDate = new Date('2024-12-26');
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - launchDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDaysSinceLaunch(diffDays);
  }, []);

  if (!mounted) return null;

  return (
    <section className="relative bg-comfort-cream min-h-[90vh] flex items-center">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Truth Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-4 mb-8 justify-center md:justify-start"
          >
            <Badge variant="outline" className="bg-pure-white border-2 border-hope-gold text-gentle-charcoal px-4 py-2">
              <Users className="h-4 w-4 mr-2" />
              0 Graduates
            </Badge>
            <Badge variant="outline" className="bg-pure-white border-2 border-courage-blue text-gentle-charcoal px-4 py-2">
              <Calendar className="h-4 w-4 mr-2" />
              Day {daysSinceLaunch}
            </Badge>
            <Badge variant="outline" className="bg-pure-white border-2 border-growth-green text-gentle-charcoal px-4 py-2">
              <Heart className="h-4 w-4 mr-2" />
              100% Transparent
            </Badge>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Heading as="h1" size="h1" className="text-gentle-charcoal mb-6">
              Building Justice from{' '}
              <span className="text-hope-gold">Day One</span>
            </Heading>
            
            <Text size="xl" className="text-soft-shadow mb-8 max-w-3xl">
              We haven't transformed a single life yet. We don't have success stories. 
              What we have is truth: a professional team with lived experience, an evidence-based 
              vision, and the commitment to build with complete judicial transparency.
            </Text>

            <Stack direction="row" spacing="md" className="flex-wrap">
              <Link href="#truth">
                <Button variant="primary" size="lg" className="bg-hope-gold text-pure-white hover:bg-hope-gold/90">
                  Review Our Framework
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-2 border-gentle-charcoal text-gentle-charcoal hover:bg-soft-cloud">
                  Authorize Our Launch
                </Button>
              </Link>
            </Stack>
          </motion.div>

          {/* Live Building Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 p-6 bg-pure-white rounded-lg border border-quiet-stone"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-3 w-3 bg-growth-green rounded-full animate-pulse" />
              <Text weight="bold" className="text-gentle-charcoal">
                Building With Transparency
              </Text>
            </div>
            <Text size="sm" className="text-soft-shadow">
              You're witnessing the development of an evidence-based approach to justice. 
              Every protocol, every measurement, every outcome will be documented for the Court.
            </Text>
          </motion.div>

          {/* Truth Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-8 text-center md:text-left"
          >
            <Text size="lg" className="text-gentle-charcoal font-bold">
              "Zero graduates today means we measure honestly from the start."
            </Text>
            <Text className="text-soft-shadow mt-2">
              — The Bridge Project Team, Building with Integrity
            </Text>
          </motion.div>
        </div>
      </Container>
    </section>
  );
} 
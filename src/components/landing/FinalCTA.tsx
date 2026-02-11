'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export function FinalCTA() {
  return (
    <section className="py-20 md:py-28 bg-bg-primary relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-primary/15 blur-[100px]"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-secondary/15 blur-[80px]"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.15, 0.2, 0.15],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Heading */}
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Ready to Find Your{' '}
            <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-pink bg-clip-text text-transparent">
              Perfect Destination
            </span>
            ?
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="text-lg sm:text-xl text-text-secondary mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            It takes less than 60 seconds. No sign-up required. Just pure travel
            inspiration tailored to you.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Link href="/chat">
              <Button variant="primary" size="lg" className="animate-pulse-glow">
                <span>🚀</span>
                <span>Start Now - It&apos;s Free</span>
              </Button>
            </Link>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            className="flex flex-wrap items-center justify-center gap-6 mt-10 text-text-muted text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <span>⚡</span>
              <span>Results in 60 seconds</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🎯</span>
              <span>Personalized matches</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default FinalCTA;

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

export function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  const stats = [
    { icon: '🌍', text: '50,000+ trips matched' },
    { icon: '⭐', text: '4.9/5 rating' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-bg-primary" />
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-accent-primary/10 blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-accent-secondary/10 blur-[100px]"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/3 w-[400px] h-[400px] rounded-full bg-accent-pink/5 blur-[80px]"
          animate={{
            x: [0, 30, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-bg-secondary border border-white/10 text-sm text-text-secondary">
              <span className="w-2 h-2 rounded-full bg-travel-nature animate-pulse" />
              AI-Powered Travel Discovery
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-tight mb-6"
          >
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-pink bg-clip-text text-transparent">
              Escape
            </span>{' '}
            in 60 Seconds
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-10"
          >
            Your AI travel buddy asks a few quick questions and matches you with
            destinations you&apos;ll actually love. No endless scrolling, no overwhelm.
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={itemVariants} className="mb-12">
            <Link href="/chat">
              <Button variant="primary" size="lg">
                <span>✨</span>
                <span>Start Chatting</span>
                <span>→</span>
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-6 sm:gap-10"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex items-center gap-2 text-text-secondary"
              >
                <span className="text-xl">{stat.icon}</span>
                <span className="text-sm sm:text-base">{stat.text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;

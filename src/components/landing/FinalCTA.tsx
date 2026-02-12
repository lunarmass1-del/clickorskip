'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Plane, Shield, Clock, Star, TrendingDown, ExternalLink } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { affiliateLinks } from '@/data/affiliateLinks';

// Countdown timer for urgency
function UrgencyCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 42, seconds: 17 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-travel-sunset/10 border border-travel-sunset/30"
      initial={{ opacity: 0, y: -10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
    >
      <TrendingDown className="w-4 h-4 text-travel-sunset" />
      <span className="text-sm text-text-secondary">Flash sale ends in:</span>
      <div className="flex items-center gap-1">
        <span className="px-2 py-0.5 bg-travel-sunset/20 rounded text-travel-sunset font-mono font-bold text-sm">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-travel-sunset font-bold">:</span>
        <span className="px-2 py-0.5 bg-travel-sunset/20 rounded text-travel-sunset font-mono font-bold text-sm">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-travel-sunset font-bold">:</span>
        <span className="px-2 py-0.5 bg-travel-sunset/20 rounded text-travel-sunset font-mono font-bold text-sm">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    </motion.div>
  );
}

export function FinalCTA() {
  const [viewersNow, setViewersNow] = useState(134);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewersNow(prev => Math.max(95, prev + Math.floor(Math.random() * 7) - 3));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

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
          {/* Urgency Countdown */}
          <div className="mb-8">
            <UrgencyCountdown />
          </div>

          {/* Heading */}
          <motion.h2
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            Stop Scrolling.{' '}
            <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-pink bg-clip-text text-transparent">
              Start Traveling.
            </span>
          </motion.h2>

          {/* Loss aversion subtext */}
          <motion.p
            className="text-lg sm:text-xl text-text-secondary mb-4 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Every minute you wait, flight prices go up.
            <br />
            <span className="text-travel-nature font-semibold">
              Average savings: $287 when you book this week.
            </span>
          </motion.p>

          {/* Live viewers - urgency */}
          <motion.div
            className="flex items-center justify-center gap-2 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-travel-nature opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-travel-nature"></span>
            </span>
            <motion.span
              key={viewersNow}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
              className="text-sm text-text-muted"
            >
              {viewersNow} people searching for deals right now
            </motion.span>
          </motion.div>

          {/* Primary CTA - Quiz */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mb-6"
          >
            <Link href="/chat">
              <Button variant="primary" size="lg" className="animate-pulse-glow">
                <span>🚀</span>
                <span>Find My Perfect Trip - It&apos;s Free</span>
              </Button>
            </Link>
          </motion.div>

          {/* Secondary CTA - Direct Flights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mb-8"
          >
            <p className="text-text-muted text-sm mb-3">Already know where to go?</p>
            <a
              href={affiliateLinks.flights.getLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-travel-tropical/10 border border-travel-tropical/30 text-travel-tropical font-semibold hover:bg-travel-tropical/20 transition-all duration-300 hover:scale-105"
            >
              <Plane className="w-5 h-5" />
              Search Cheap Flights Now
              <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>

          {/* Trust badges - Enhanced */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-bg-secondary/50 border border-white/5">
              <Shield className="w-6 h-6 text-travel-nature" />
              <span className="text-xs text-text-muted text-center">100% Secure</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-bg-secondary/50 border border-white/5">
              <Clock className="w-6 h-6 text-accent-primary" />
              <span className="text-xs text-text-muted text-center">60 Second Quiz</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-bg-secondary/50 border border-white/5">
              <Star className="w-6 h-6 text-travel-sunset" />
              <span className="text-xs text-text-muted text-center">4.9/5 Rating</span>
            </div>
            <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-bg-secondary/50 border border-white/5">
              <span className="text-2xl">🌍</span>
              <span className="text-xs text-text-muted text-center">52K+ Trips Matched</span>
            </div>
          </motion.div>

          {/* Final FOMO message */}
          <motion.p
            className="mt-8 text-sm text-travel-sunset font-medium"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            animate={{ opacity: [1, 0.7, 1] }}
          >
            Limited time: Get up to 40% off when you book through our partners
          </motion.p>
        </motion.div>
      </Container>
    </section>
  );
}

export default FinalCTA;

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

// Live activity notification - Social proof that creates FOMO
function LiveActivityNotification() {
  const [notification, setNotification] = useState<{ name: string; destination: string; action: string; time: string } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const names = ['Sarah M.', 'Mike R.', 'Emma K.', 'David L.', 'Lisa T.', 'John B.', 'Amy S.', 'Chris W.', 'Jessica P.', 'Tom H.', 'Anna D.', 'James C.'];
  const destinations = ['Bali', 'Paris', 'Tokyo', 'Barcelona', 'Dubai', 'Rome', 'Santorini', 'Thailand', 'Maldives', 'Iceland'];
  const actions = ['just found their perfect match:', 'booked flights to', 'saved $342 on flights to', 'is heading to'];
  const times = ['just now', '2 min ago', '5 min ago', 'moments ago'];

  useEffect(() => {
    const showNotification = () => {
      const name = names[Math.floor(Math.random() * names.length)];
      const destination = destinations[Math.floor(Math.random() * destinations.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      const time = times[Math.floor(Math.random() * times.length)];
      setNotification({ name, destination, action, time });
      setIsVisible(true);

      setTimeout(() => setIsVisible(false), 4500);
    };

    const initialDelay = setTimeout(showNotification, 4000);
    const interval = setInterval(showNotification, 9000 + Math.random() * 6000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ opacity: 0, x: -100, y: 0 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-4 left-4 z-50 max-w-xs"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-secondary/95 backdrop-blur-sm border border-white/10 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-sm font-semibold text-white">
              {notification.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-text-primary font-medium">
                <span className="font-semibold">{notification.name}</span> {notification.action}
              </p>
              <p className="text-sm text-accent-primary font-bold">{notification.destination}</p>
            </div>
            <span className="text-xs text-text-muted whitespace-nowrap">{notification.time}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Countdown timer for urgency
function DealCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 47, seconds: 32 });

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
    <div className="flex items-center gap-2 text-sm">
      <span className="text-travel-sunset font-semibold">Deal ends in:</span>
      <div className="flex items-center gap-1">
        <span className="px-2 py-1 bg-travel-sunset/20 rounded text-travel-sunset font-mono font-bold">
          {String(timeLeft.hours).padStart(2, '0')}
        </span>
        <span className="text-travel-sunset">:</span>
        <span className="px-2 py-1 bg-travel-sunset/20 rounded text-travel-sunset font-mono font-bold">
          {String(timeLeft.minutes).padStart(2, '0')}
        </span>
        <span className="text-travel-sunset">:</span>
        <span className="px-2 py-1 bg-travel-sunset/20 rounded text-travel-sunset font-mono font-bold">
          {String(timeLeft.seconds).padStart(2, '0')}
        </span>
      </div>
    </div>
  );
}

export function Hero() {
  const [viewersCount, setViewersCount] = useState(127);
  const [tripsMatched, setTripsMatched] = useState(52847);

  useEffect(() => {
    // Simulate real-time viewer count
    const viewersInterval = setInterval(() => {
      setViewersCount(prev => Math.max(89, prev + Math.floor(Math.random() * 7) - 3));
    }, 3500);

    // Occasionally bump trips matched
    const tripsInterval = setInterval(() => {
      if (Math.random() > 0.6) {
        setTripsMatched(prev => prev + 1);
      }
    }, 5000);

    return () => {
      clearInterval(viewersInterval);
      clearInterval(tripsInterval);
    };
  }, []);

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

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      {/* Live Activity Notification - Social Proof */}
      <LiveActivityNotification />

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
          <motion.div variants={itemVariants} className="mb-8">
            <Link href="/chat">
              <Button variant="primary" size="lg">
                <span>✨</span>
                <span>Start Chatting</span>
                <span>→</span>
              </Button>
            </Link>
          </motion.div>

          {/* Secondary CTAs - Affiliate Quick Actions */}
          <motion.div variants={itemVariants} className="mb-12">
            <p className="text-text-muted text-sm mb-4">Or jump straight to deals:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              {/* Find Cheap Flights - Priority CTA */}
              <Link
                href="/go/flights"
                className="group relative w-full sm:w-auto"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-travel-tropical to-travel-sunset rounded-full opacity-60 group-hover:opacity-100 blur transition duration-300" />
                <div className="relative flex items-center justify-center gap-2 px-6 py-3 bg-bg-secondary rounded-full border border-white/10 group-hover:border-transparent transition-all duration-300">
                  <span className="text-lg">✈️</span>
                  <span className="text-text-primary font-medium">Find Cheap Flights</span>
                </div>
                <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-travel-sunset text-white text-xs font-bold rounded-full animate-pulse">
                  HOT
                </span>
              </Link>

              {/* Get Flight Compensation */}
              <Link
                href="/go/airhelp"
                className="group w-full sm:w-auto"
              >
                <div className="flex items-center justify-center gap-2 px-6 py-3 bg-bg-tertiary rounded-full border border-white/10 hover:border-travel-nature/50 hover:bg-travel-nature/10 transition-all duration-300">
                  <span className="text-lg">💰</span>
                  <span className="text-text-primary font-medium">Get Flight Compensation</span>
                </div>
                <p className="text-travel-nature text-xs mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Flight delayed? Get up to €600
                </p>
              </Link>
            </div>
            <p className="text-travel-sunset text-xs mt-4 animate-pulse">
              🔥 Prices dropping today! Book now & save
            </p>
          </motion.div>

          {/* Urgency Countdown */}
          <motion.div variants={itemVariants} className="mb-8">
            <DealCountdown />
          </motion.div>

          {/* Live Stats - Dynamic Social Proof */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8"
          >
            {/* Live trips counter */}
            <div className="flex items-center gap-2 text-text-secondary">
              <span className="text-xl">🌍</span>
              <motion.span
                key={tripsMatched}
                initial={{ opacity: 0.7, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-sm sm:text-base font-medium"
              >
                {tripsMatched.toLocaleString()}+ trips matched
              </motion.span>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-2 text-text-secondary">
              <span className="text-xl">⭐</span>
              <span className="text-sm sm:text-base">4.9/5 rating</span>
            </div>

            {/* Live viewers - Creates urgency */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-travel-nature/10 border border-travel-nature/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-travel-nature opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-travel-nature"></span>
              </span>
              <motion.span
                key={viewersCount}
                initial={{ opacity: 0.7 }}
                animate={{ opacity: 1 }}
                className="text-sm text-travel-nature font-medium"
              >
                {viewersCount} people browsing now
              </motion.span>
            </div>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            variants={itemVariants}
            className="mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6"
          >
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-secondary/50 border border-white/5">
              <span className="text-sm">🔒</span>
              <span className="text-xs text-text-muted">Secure & Private</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-secondary/50 border border-white/5">
              <span className="text-sm">✓</span>
              <span className="text-xs text-text-muted">Trusted by 50K+ travelers</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-bg-secondary/50 border border-white/5">
              <span className="text-sm">💳</span>
              <span className="text-xs text-text-muted">No payment required</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Hero;

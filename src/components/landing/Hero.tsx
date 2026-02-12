'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Container from '@/components/ui/Container';

// Countdown timer - Creates massive urgency
function DealCountdown() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 47, seconds: 33 });

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
          // Reset to create endless urgency
          hours = 2;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-1 font-mono">
      <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-red-400 font-bold text-lg sm:text-xl">
        {String(timeLeft.hours).padStart(2, '0')}
      </span>
      <span className="text-red-400 font-bold">:</span>
      <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-red-400 font-bold text-lg sm:text-xl">
        {String(timeLeft.minutes).padStart(2, '0')}
      </span>
      <span className="text-red-400 font-bold">:</span>
      <span className="px-2 py-1 bg-red-500/20 border border-red-500/30 rounded text-red-400 font-bold text-lg sm:text-xl">
        {String(timeLeft.seconds).padStart(2, '0')}
      </span>
    </div>
  );
}

// Live booking notification - FOMO creator
function LiveBookingNotification() {
  const [notification, setNotification] = useState<{ name: string; destination: string; saved: number } | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const data = [
    { name: 'Sarah M.', destination: 'Bali', saved: 342 },
    { name: 'Mike R.', destination: 'Tokyo', saved: 287 },
    { name: 'Emma K.', destination: 'Paris', saved: 198 },
    { name: 'David L.', destination: 'Barcelona', saved: 156 },
    { name: 'Lisa T.', destination: 'Dubai', saved: 423 },
    { name: 'John B.', destination: 'Rome', saved: 211 },
    { name: 'Amy S.', destination: 'Thailand', saved: 389 },
    { name: 'Chris W.', destination: 'Maldives', saved: 567 },
  ];

  useEffect(() => {
    const showNotification = () => {
      const item = data[Math.floor(Math.random() * data.length)];
      setNotification(item);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    };

    const initialDelay = setTimeout(showNotification, 3000);
    const interval = setInterval(showNotification, 8000);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(interval);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && notification && (
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          className="fixed bottom-4 left-4 z-50"
        >
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-bg-secondary/95 backdrop-blur-sm border border-white/10 shadow-xl">
            <div className="w-10 h-10 rounded-full bg-travel-nature flex items-center justify-center text-white font-bold">
              {notification.name.charAt(0)}
            </div>
            <div>
              <p className="text-sm text-text-primary">
                <span className="font-semibold">{notification.name}</span> just booked
              </p>
              <p className="text-sm">
                <span className="text-accent-primary font-bold">{notification.destination}</span>
                <span className="text-travel-nature ml-2">Saved ${notification.saved}</span>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Featured destination card with price
interface DealCardProps {
  destination: string;
  country: string;
  price: number;
  originalPrice: number;
  image: string;
  discount: number;
  slug: string;
}

function DealCard({ destination, country, price, originalPrice, image, discount, slug }: DealCardProps) {
  return (
    <Link href={`/go/flights/${slug}`} className="group block">
      <motion.div
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
        className="relative overflow-hidden rounded-2xl bg-bg-secondary border border-white/10 hover:border-accent-primary/50 transition-all duration-300"
      >
        {/* Discount badge */}
        <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
          -{discount}% OFF
        </div>

        {/* Image */}
        <div className="relative h-28 sm:h-32 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500"
            style={{ backgroundImage: `url(${image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-secondary via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          <h3 className="font-semibold text-text-primary text-base sm:text-lg">{destination}</h3>
          <p className="text-text-muted text-xs mb-2">{country}</p>

          <div className="flex items-baseline gap-2">
            <span className="text-xl sm:text-2xl font-bold text-accent-primary">${price}</span>
            <span className="text-sm text-text-muted line-through">${originalPrice}</span>
          </div>
          <p className="text-xs text-text-muted mt-1">Round trip from NYC</p>
        </div>

        {/* Hover CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-accent-primary to-accent-primary/80 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <span className="text-white font-semibold text-sm flex items-center justify-center gap-2">
            Book Now <span>→</span>
          </span>
        </div>
      </motion.div>
    </Link>
  );
}

export function Hero() {
  const [bookingCount, setBookingCount] = useState(217);

  useEffect(() => {
    const interval = setInterval(() => {
      setBookingCount(prev => prev + Math.floor(Math.random() * 3));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const deals = [
    { destination: 'Bali', country: 'Indonesia', price: 299, originalPrice: 499, discount: 40, image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', slug: 'bali' },
    { destination: 'Tokyo', country: 'Japan', price: 499, originalPrice: 799, discount: 38, image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', slug: 'tokyo' },
    { destination: 'Paris', country: 'France', price: 349, originalPrice: 549, discount: 36, image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', slug: 'paris' },
    { destination: 'Barcelona', country: 'Spain', price: 279, originalPrice: 449, discount: 38, image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400', slug: 'barcelona' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-16 pb-8 overflow-hidden">
      <LiveBookingNotification />

      {/* Background */}
      <div className="absolute inset-0 z-0 bg-bg-primary">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-accent-primary/8 blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-accent-secondary/8 blur-[80px]" />
      </div>

      <Container className="relative z-10">
        <div className="max-w-6xl mx-auto">

          {/* URGENCY BAR - First thing users see */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-6 p-3 sm:p-4 rounded-2xl bg-red-500/10 border border-red-500/20"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
              </span>
              <span className="text-red-400 font-semibold text-sm sm:text-base">FLASH SALE ENDS IN</span>
            </div>
            <DealCountdown />
            <div className="text-text-muted text-sm">
              <span className="text-travel-nature font-semibold">{bookingCount}</span> people booking right now
            </div>
          </motion.div>

          {/* HEADLINE - Punchy and benefit-focused */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary leading-tight mb-3">
              Stop Dreaming.{' '}
              <span className="bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-pink bg-clip-text text-transparent">
                Start Booking.
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto">
              Flight deals up to <span className="text-travel-sunset font-bold">50% OFF</span> - Prices increase at midnight
            </p>
          </motion.div>

          {/* DESTINATION CARDS - Immediate value above fold */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-8"
          >
            {deals.map((deal, index) => (
              <motion.div
                key={deal.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <DealCard {...deal} />
              </motion.div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            {/* Primary CTA */}
            <Link href="/chat" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-pink text-white font-bold text-lg rounded-full shadow-lg shadow-accent-primary/30 hover:shadow-accent-primary/50 transition-all duration-300"
              >
                Find My Perfect Deal →
              </motion.button>
            </Link>

            {/* Secondary CTA */}
            <Link href="/go/flights" className="w-full sm:w-auto">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto px-8 py-4 bg-bg-secondary border border-white/20 text-text-primary font-semibold text-lg rounded-full hover:border-accent-primary/50 transition-all duration-300"
              >
                See All Destinations
              </motion.button>
            </Link>
          </motion.div>

          {/* AirHelp Secondary CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-center mb-8"
          >
            <Link
              href="/go/airhelp"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-travel-nature/10 border border-travel-nature/20 hover:bg-travel-nature/20 transition-all duration-300"
            >
              <span className="text-travel-nature font-semibold text-sm">Flight delayed or cancelled?</span>
              <span className="text-white font-bold text-sm">Get up to EUR600 compensation →</span>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 text-sm text-text-muted"
          >
            <div className="flex items-center gap-2">
              <span className="text-yellow-400">★★★★★</span>
              <span>4.9/5 (2,847 reviews)</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✓</span>
              <span>Price match guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <span>🔒</span>
              <span>Secure booking</span>
            </div>
            <div className="flex items-center gap-2">
              <span>✈️</span>
              <span>50,000+ happy travelers</span>
            </div>
          </motion.div>

        </div>
      </Container>
    </section>
  );
}

export default Hero;

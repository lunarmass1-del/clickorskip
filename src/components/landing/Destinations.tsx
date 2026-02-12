'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, Clock, Zap, ArrowRight, Flame } from 'lucide-react';
import Container from '@/components/ui/Container';

interface Destination {
  name: string;
  image: string;
  price: string;
  originalPrice: string;
  seatsLeft: number;
  discount: number;
  category: 'beach' | 'city' | 'adventure';
}

const destinations: Destination[] = [
  {
    name: 'Cancun',
    image: 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=600&h=400&fit=crop',
    price: '$299',
    originalPrice: '$499',
    seatsLeft: 3,
    discount: 40,
    category: 'beach',
  },
  {
    name: 'Bali',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&h=400&fit=crop',
    price: '$449',
    originalPrice: '$749',
    seatsLeft: 2,
    discount: 40,
    category: 'beach',
  },
  {
    name: 'Paris',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=600&h=400&fit=crop',
    price: '$349',
    originalPrice: '$579',
    seatsLeft: 5,
    discount: 40,
    category: 'city',
  },
  {
    name: 'Tokyo',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=400&fit=crop',
    price: '$599',
    originalPrice: '$999',
    seatsLeft: 4,
    discount: 40,
    category: 'city',
  },
  {
    name: 'Dubai',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=400&fit=crop',
    price: '$399',
    originalPrice: '$665',
    seatsLeft: 3,
    discount: 40,
    category: 'city',
  },
  {
    name: 'Phuket',
    image: 'https://images.unsplash.com/photo-1589394815804-964ed0be2eb5?w=600&h=400&fit=crop',
    price: '$399',
    originalPrice: '$665',
    seatsLeft: 2,
    discount: 40,
    category: 'beach',
  },
  {
    name: 'Costa Rica',
    image: 'https://images.unsplash.com/photo-1518259102261-b40117eabbc9?w=600&h=400&fit=crop',
    price: '$279',
    originalPrice: '$465',
    seatsLeft: 4,
    discount: 40,
    category: 'adventure',
  },
  {
    name: 'Iceland',
    image: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&h=400&fit=crop',
    price: '$349',
    originalPrice: '$582',
    seatsLeft: 3,
    discount: 40,
    category: 'adventure',
  },
];

const filterOptions = [
  { id: 'all', label: 'All Deals', icon: Flame },
  { id: 'beach', label: 'Beach', icon: null },
  { id: 'city', label: 'City', icon: null },
  { id: 'adventure', label: 'Adventure', icon: null },
];

export function Destinations() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [travelersCount, setTravelersCount] = useState(847);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 47, seconds: 23 });

  // Increment travelers count randomly
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.6) {
        setTravelersCount(prev => prev + Math.floor(Math.random() * 3) + 1);
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section className="py-16 md:py-24 bg-bg-secondary/50">
      <Container>
        {/* Section header with countdown */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Flash sale badge with timer */}
          <motion.div
            className="inline-flex items-center gap-3 px-5 py-2.5 mb-6 rounded-full bg-gradient-to-r from-red-500/20 to-travel-sunset/20 border border-red-500/30"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-5 h-5 text-red-400 fill-red-400" />
            <span className="text-base font-bold text-white">
              FLASH SALE - Ends Tonight
            </span>
            <div className="flex items-center gap-1 font-mono text-sm bg-black/30 px-2 py-1 rounded">
              <Clock className="w-3.5 h-3.5 text-red-400" />
              <span className="text-red-400 font-bold">
                {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-3">
            Today&apos;s Deals
          </h2>
          <p className="text-lg text-travel-sunset font-semibold">
            40% OFF All Destinations - Limited Seats Available
          </p>
        </motion.div>

        {/* Filter pills */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          {filterOptions.map((filter) => (
            <a
              key={filter.id}
              href="/go/flights"
              onClick={(e) => {
                e.preventDefault();
                setActiveFilter(filter.id);
                window.open('/go/flights', '_blank');
              }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-gradient-to-r from-accent-primary to-accent-secondary text-white shadow-lg shadow-accent-primary/30'
                  : 'bg-white/5 hover:bg-white/10 text-text-secondary hover:text-white border border-white/10 hover:border-accent-primary/30'
              }`}
            >
              {filter.icon && <filter.icon className="w-4 h-4" />}
              {filter.label}
            </a>
          ))}
        </motion.div>

        {/* Destinations GRID - 2 cols mobile, 4 cols desktop */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.name}
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <a
                href="/go/flights"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group cursor-pointer"
              >
                {/* Card container */}
                <div className="relative aspect-[3/4] md:aspect-[4/5] rounded-2xl md:rounded-3xl overflow-hidden">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${destination.image})` }}
                  />

                  {/* Dark overlay - gets darker on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-black/20 group-hover:from-black via-black/60 transition-all duration-300" />

                  {/* DISCOUNT BADGE - Top Left - Always visible, pulsing */}
                  <motion.div
                    className="absolute top-2 left-2 md:top-3 md:left-3 z-10"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  >
                    <span className="px-2 py-1 md:px-3 md:py-1.5 rounded-full bg-red-500 text-white text-xs md:text-sm font-black shadow-lg shadow-red-500/50">
                      -{destination.discount}% OFF
                    </span>
                  </motion.div>

                  {/* SCARCITY BADGE - Top Right - Always visible */}
                  <div className="absolute top-2 right-2 md:top-3 md:right-3 z-10">
                    <span className={`px-2 py-1 md:px-2.5 md:py-1 rounded-full text-white text-[10px] md:text-xs font-bold shadow-lg ${
                      destination.seatsLeft <= 3 ? 'bg-red-600 animate-pulse' : 'bg-amber-500'
                    }`}>
                      Only {destination.seatsLeft} seats left
                    </span>
                  </div>

                  {/* Content - Bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-3 md:p-4">
                    {/* City name */}
                    <h3 className="text-lg md:text-xl font-bold text-white mb-1">
                      {destination.name}
                    </h3>

                    {/* Price - PROMINENT */}
                    <div className="flex items-baseline gap-2 mb-3">
                      <span className="text-xl md:text-2xl font-black text-travel-nature">
                        {destination.price}
                      </span>
                      <span className="text-sm text-text-muted line-through">
                        {destination.originalPrice}
                      </span>
                    </div>

                    {/* BOOK NOW button - appears more prominently on hover */}
                    <div className="relative overflow-hidden">
                      <motion.div
                        className="flex items-center justify-center gap-2 py-2.5 md:py-3 rounded-xl bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-sm md:text-base font-bold transition-all duration-300 group-hover:shadow-lg group-hover:shadow-accent-primary/40"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Plane className="w-4 h-4" />
                        Book Now
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </motion.div>
                    </div>
                  </div>

                  {/* Hover border glow */}
                  <div className="absolute inset-0 rounded-2xl md:rounded-3xl border-2 border-transparent group-hover:border-accent-primary/60 transition-colors duration-300" />
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Social proof - travelers count */}
        <motion.div
          className="flex items-center justify-center gap-2 mt-8 mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <Zap className="w-4 h-4 text-travel-sunset" />
          <motion.span
            className="text-travel-sunset font-semibold"
            key={travelersCount}
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
          >
            {travelersCount.toLocaleString()} travelers booked in the last hour
          </motion.span>
        </motion.div>

        {/* BIG CTA Button */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <motion.a
            href="/go/flights"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-accent-primary via-accent-secondary to-fuchsia-500 text-white text-lg font-bold shadow-xl shadow-accent-primary/30 hover:shadow-accent-primary/50 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plane className="w-5 h-5" />
            View All 50+ Destinations
            <ArrowRight className="w-5 h-5" />
          </motion.a>

          <p className="text-text-muted text-sm mt-4">
            Prices shown are round-trip. Sale ends at midnight.
          </p>
        </motion.div>
      </Container>
    </section>
  );
}

export default Destinations;

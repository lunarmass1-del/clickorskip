'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plane, ExternalLink, TrendingDown, Clock, Users } from 'lucide-react';
import Container from '@/components/ui/Container';
import { affiliateLinks } from '@/data/affiliateLinks';

interface Destination {
  name: string;
  emoji: string;
  image: string;
  vibe: string;
  price: string;
  originalPrice: string;
  seatsLeft: number;
  discount: number;
  bookedToday: number;
}

const destinations: Destination[] = [
  {
    name: 'Bali',
    emoji: '🌴',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop',
    vibe: 'Tropical Paradise',
    price: 'From $599',
    originalPrice: '$899',
    seatsLeft: 4,
    discount: 33,
    bookedToday: 47,
  },
  {
    name: 'Paris',
    emoji: '🗼',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    vibe: 'City of Love',
    price: 'From $449',
    originalPrice: '$679',
    seatsLeft: 7,
    discount: 34,
    bookedToday: 62,
  },
  {
    name: 'Tokyo',
    emoji: '🏯',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    vibe: 'Future & Tradition',
    price: 'From $699',
    originalPrice: '$1,049',
    seatsLeft: 3,
    discount: 33,
    bookedToday: 38,
  },
  {
    name: 'Dubai',
    emoji: '🏙️',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
    vibe: 'Luxury Oasis',
    price: 'From $549',
    originalPrice: '$799',
    seatsLeft: 5,
    discount: 31,
    bookedToday: 29,
  },
  {
    name: 'Rome',
    emoji: '🏛️',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop',
    vibe: 'Eternal City',
    price: 'From $449',
    originalPrice: '$649',
    seatsLeft: 6,
    discount: 31,
    bookedToday: 54,
  },
];

export function Destinations() {
  const [totalBooked, setTotalBooked] = useState(2847);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.5) {
        setTotalBooked(prev => prev + 1);
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-bg-secondary/50">
      <Container>
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          {/* Urgency banner */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-travel-sunset/10 border border-travel-sunset/20"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TrendingDown className="w-4 h-4 text-travel-sunset" />
            <span className="text-sm font-semibold text-travel-sunset">
              Flash Sale: Up to 35% OFF flights this week
            </span>
            <Clock className="w-4 h-4 text-travel-sunset" />
          </motion.div>

          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Trending Destinations
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto mb-4">
            Prices are dropping fast. Don&apos;t miss these deals!
          </p>

          {/* Social proof counter */}
          <div className="flex items-center justify-center gap-2 text-sm text-text-muted">
            <Users className="w-4 h-4" />
            <motion.span
              key={totalBooked}
              initial={{ opacity: 0.7 }}
              animate={{ opacity: 1 }}
            >
              {totalBooked.toLocaleString()} trips booked today
            </motion.span>
          </div>
        </motion.div>

        {/* Destinations horizontal scroll on mobile, grid on desktop */}
        <motion.div
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:grid md:grid-cols-5 md:gap-6 md:overflow-visible md:pb-0 scrollbar-hide"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {destinations.map((destination) => (
            <motion.div
              key={destination.name}
              variants={itemVariants}
              className="flex-shrink-0 w-[200px] md:w-auto snap-center"
              whileHover={{ y: -8 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <a
                href={affiliateLinks.flights.getLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative group cursor-pointer"
              >
                {/* Image container */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${destination.image})` }}
                  />

                  {/* Gradient overlay - darker on hover for better CTA visibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/95 group-hover:via-black/50 transition-all duration-300" />

                  {/* Discount badge - top left - ALWAYS VISIBLE */}
                  <div className="absolute top-3 left-3">
                    <motion.span
                      className="px-2 py-1 rounded-full bg-travel-sunset text-white text-xs font-bold shadow-lg"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      -{destination.discount}%
                    </motion.span>
                  </div>

                  {/* Scarcity badge - top right - ALWAYS VISIBLE */}
                  <div className="absolute top-3 right-3">
                    <span className={`px-2 py-1 rounded-full text-white text-xs font-bold shadow-lg ${
                      destination.seatsLeft <= 3 ? 'bg-red-500' : destination.seatsLeft <= 5 ? 'bg-amber-500' : 'bg-travel-nature'
                    }`}>
                      {destination.seatsLeft <= 3 ? 'Only ' : ''}{destination.seatsLeft} seats left
                    </span>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Emoji badge */}
                    <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-bg-tertiary/80 backdrop-blur-sm mb-3 group-hover:bg-accent-primary/30 transition-colors duration-300">
                      <span className="text-xl">{destination.emoji}</span>
                    </div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-text-primary">
                      {destination.name}
                    </h3>

                    {/* Price with strikethrough */}
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-text-muted line-through">{destination.originalPrice}</span>
                      <span className="text-sm font-bold text-travel-nature">{destination.price}</span>
                    </div>

                    {/* Vibe tag - transforms to CTA on hover */}
                    <div className="relative h-5 overflow-hidden">
                      <span className="block text-xs text-text-secondary transition-transform duration-300 group-hover:-translate-y-full">
                        {destination.bookedToday} booked today
                      </span>
                      <span className="absolute top-full left-0 flex items-center gap-1 text-xs font-semibold text-[#6366f1] transition-transform duration-300 group-hover:-translate-y-full">
                        <Plane className="w-3 h-3" />
                        Book Now
                        <ExternalLink className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-accent-primary/50 transition-colors duration-300" />

                  {/* Hover glow effect */}
                  <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-[inset_0_0_30px_rgba(99,102,241,0.15)]" />
                </div>
              </a>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action with FOMO */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          {/* Loss aversion message */}
          <motion.p
            className="text-travel-sunset text-sm font-medium mb-4"
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Prices go up tomorrow. Don&apos;t miss these deals!
          </motion.p>

          <p className="text-text-muted mb-4">
            ...and 500+ more destinations with exclusive discounts
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            {/* Primary CTA - Find flights */}
            <a
              href={affiliateLinks.flights.getLink()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-accent-primary to-accent-secondary text-white text-sm font-semibold shadow-lg shadow-accent-primary/25 hover:shadow-accent-primary/40 transition-all duration-300 hover:scale-105"
            >
              <Plane className="w-4 h-4" />
              Search All Flight Deals
              <ExternalLink className="w-3.5 h-3.5" />
            </a>

            {/* Secondary CTA - Quiz */}
            <a
              href="/chat"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent-primary/30 text-text-secondary hover:text-white text-sm font-medium transition-all duration-300"
            >
              Not sure? Take the quiz
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default Destinations;

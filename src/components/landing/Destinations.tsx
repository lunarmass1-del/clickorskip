'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';

interface Destination {
  name: string;
  emoji: string;
  image: string;
  vibe: string;
}

const destinations: Destination[] = [
  {
    name: 'Bali',
    emoji: '🌴',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&h=300&fit=crop',
    vibe: 'Tropical',
  },
  {
    name: 'Paris',
    emoji: '🗼',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop',
    vibe: 'Romantic',
  },
  {
    name: 'Tokyo',
    emoji: '🏯',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&h=300&fit=crop',
    vibe: 'Adventure',
  },
  {
    name: 'Dubai',
    emoji: '🏙️',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400&h=300&fit=crop',
    vibe: 'Luxury',
  },
  {
    name: 'Rome',
    emoji: '🏛️',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&h=300&fit=crop',
    vibe: 'Cultural',
  },
];

export function Destinations() {
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
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Popular Destinations
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Not sure where to go? Let us help you discover!
          </p>
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
              <div className="relative group cursor-pointer">
                {/* Image container */}
                <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
                  {/* Background image */}
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url(${destination.image})` }}
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* Emoji badge */}
                    <motion.div
                      className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-bg-tertiary/80 backdrop-blur-sm mb-3"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <span className="text-xl">{destination.emoji}</span>
                    </motion.div>

                    {/* Name */}
                    <h3 className="text-lg font-semibold text-text-primary">
                      {destination.name}
                    </h3>

                    {/* Vibe tag */}
                    <span className="text-xs text-text-secondary">
                      {destination.vibe}
                    </span>
                  </div>

                  {/* Hover border effect */}
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-accent-primary/50 transition-colors duration-300" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to action text */}
        <motion.p
          className="text-center text-text-muted mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          ...and 500+ more destinations waiting for you
        </motion.p>
      </Container>
    </section>
  );
}

export default Destinations;

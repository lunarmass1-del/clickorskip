'use client';

import { motion } from 'framer-motion';
import { Plane, Hotel, Ticket, Car, ExternalLink } from 'lucide-react';
import { Destination } from '@/types';
import { affiliateLinks, secondaryCtaConfig } from '@/data/affiliateLinks';

interface CTAButtonsProps {
  destination: Destination;
}

export default function CTAButtons({ destination }: CTAButtonsProps) {
  const destId = destination.id;

  const primaryCtas = [
    {
      id: 'flights',
      label: 'Find Cheap Flights',
      icon: Plane,
      link: affiliateLinks.flights.getLink(destId),
      gradient: 'from-blue-500 via-blue-600 to-cyan-500',
      description: 'Compare 100+ airlines',
    },
    {
      id: 'hotels',
      label: 'Book Hotels',
      icon: Hotel,
      link: affiliateLinks.hotels.getLink(destId),
      gradient: 'from-purple-500 via-purple-600 to-pink-500',
      description: 'Best price guarantee',
    },
    {
      id: 'tours',
      label: 'Tours & Activities',
      icon: Ticket,
      link: affiliateLinks.tours.getLink(destId),
      gradient: 'from-orange-500 via-orange-600 to-red-500',
      description: 'Skip-the-line tickets',
    },
    {
      id: 'cars',
      label: 'Rent a Car',
      icon: Car,
      link: affiliateLinks.cars.getLink(destId),
      gradient: 'from-green-500 via-green-600 to-emerald-500',
      description: 'Free cancellation',
    },
  ];

  return (
    <div className="space-y-4">
      {/* Section title */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-1">
          Start Planning Your Trip to {destination.name}
        </h3>
        <p className="text-sm text-zinc-400">
          Best deals from our trusted partners
        </p>
      </div>

      {/* Primary CTAs - 2x2 grid */}
      <div className="grid grid-cols-2 gap-3">
        {primaryCtas.map((cta, index) => (
          <motion.a
            key={cta.id}
            href={cta.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97 }}
            className={`
              relative group p-4 rounded-xl overflow-hidden
              bg-gradient-to-br ${cta.gradient}
              shadow-lg hover:shadow-xl transition-shadow
            `}
          >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
            <div className="relative">
              <cta.icon className="w-6 h-6 text-white mb-2" />
              <h4 className="font-semibold text-white text-sm">{cta.label}</h4>
              <p className="text-xs text-white/70 mt-0.5">{cta.description}</p>
            </div>
            <ExternalLink className="absolute top-3 right-3 w-4 h-4 text-white/50 group-hover:text-white/80 transition-colors" />
          </motion.a>
        ))}
      </div>

      {/* Secondary CTAs */}
      <div className="flex flex-wrap justify-center gap-2 pt-2">
        {secondaryCtaConfig.map((cta) => (
          <a
            key={cta.id}
            href={cta.getLink(destId)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-xs text-zinc-400 hover:text-white flex items-center gap-1.5"
          >
            <span>{cta.emoji}</span>
            {cta.label}
          </a>
        ))}
      </div>

      {/* Trust badge */}
      <p className="text-center text-xs text-zinc-500 pt-2">
        Prices updated in real-time from trusted partners
      </p>
    </div>
  );
}

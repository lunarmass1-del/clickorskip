'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check, Calendar, Plane } from 'lucide-react';
import { DestinationMatch } from '@/types';
import MatchScore from './MatchScore';

interface DestinationCardProps {
  match: DestinationMatch;
}

export default function DestinationCard({ match }: DestinationCardProps) {
  const { destination, matchPercent } = match;

  return (
    <motion.div
      className="card overflow-hidden p-0"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Image section */}
      <div className="relative h-64 sm:h-80">
        <Image
          src={destination.image}
          alt={destination.name}
          fill
          className="object-cover"
          priority
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#12121a] via-black/30 to-transparent" />

        {/* Match score badge */}
        <div className="absolute top-4 right-4">
          <MatchScore percentage={matchPercent} />
        </div>

        {/* Destination info overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-end gap-4">
            <div className="flex-1">
              <div className="text-4xl mb-2">{destination.emoji}</div>
              <h1 className="text-2xl sm:text-3xl font-bold font-heading text-shadow mb-1">
                {destination.name}
              </h1>
              <p className="text-[#a1a1aa]">{destination.country}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content section */}
      <div className="p-6 space-y-6">
        {/* Tagline */}
        <p className="text-lg text-[#a1a1aa] italic">&quot;{destination.tagline}&quot;</p>

        {/* Highlights */}
        <div>
          <h3 className="text-sm font-semibold text-[#71717a] uppercase tracking-wider mb-3">
            Why You&apos;ll Love It
          </h3>
          <ul className="space-y-2">
            {destination.highlights.map((highlight, index) => (
              <motion.li
                key={index}
                className="flex items-start gap-3"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
              >
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#22c55e]/20 flex items-center justify-center mt-0.5">
                  <Check className="w-3 h-3 text-[#22c55e]" />
                </div>
                <span className="text-[#e4e4e7]">{highlight}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Quick info */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="w-4 h-4 text-[#6366f1]" />
            <span className="text-[#a1a1aa]">Best time:</span>
            <span className="text-white">{destination.bestTime}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Plane className="w-4 h-4 text-[#8b5cf6]" />
            <span className="text-[#a1a1aa]">Flights:</span>
            <span className="text-white">{destination.avgFlightPrice}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

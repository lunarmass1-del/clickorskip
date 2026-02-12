'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Car, Ticket, Bus, ExternalLink, Clock, TrendingDown, Users, Zap, Shield, AlertCircle, ChevronDown, ChevronUp, DollarSign, Check } from 'lucide-react';
import { Destination } from '@/types';
import { affiliateLinks, ctaConfig, secondaryCtaConfig, completeYourTripConfig, airhelpConfig } from '@/data/affiliateLinks';

interface CTAButtonsProps {
  destination: Destination;
}

// Generate realistic-looking urgency stats
function useUrgencyStats() {
  const [stats, setStats] = useState({
    viewersNow: Math.floor(Math.random() * 50) + 20,
    bookedToday: Math.floor(Math.random() * 100) + 50,
    priceDropPercent: Math.floor(Math.random() * 25) + 15,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        viewersNow: Math.max(10, prev.viewersNow + Math.floor(Math.random() * 7) - 3),
        bookedToday: prev.bookedToday + (Math.random() > 0.7 ? 1 : 0),
        priceDropPercent: prev.priceDropPercent,
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return stats;
}

// AirHelp Upsell Component - HIGH CONVERSION!
function AirHelpUpsell() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show after a short delay to not overwhelm
    const timer = setTimeout(() => setIsVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="relative overflow-hidden rounded-2xl"
    >
      {/* Attention-grabbing gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20" />
      <div className="absolute inset-0 bg-[#0a0a0f]/80" />

      {/* Hot badge */}
      <motion.div
        className="absolute -top-1 -right-1 px-3 py-1 bg-gradient-to-r from-red-500 to-orange-500 text-xs font-bold text-white rounded-bl-xl rounded-tr-xl"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        HOT DEAL
      </motion.div>

      <div className="relative p-5">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
            <DollarSign className="w-7 h-7 text-white" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-white mb-1">
              {airhelpConfig.label}
            </h3>
            <p className="text-amber-400 font-semibold text-sm mb-2">
              {airhelpConfig.sublabel}
            </p>
            <p className="text-[#a1a1aa] text-sm leading-relaxed mb-3">
              {airhelpConfig.description}
            </p>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-2 mb-4">
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-green-500/10 text-green-400 text-xs">
                <Check className="w-3 h-3" /> FREE to check
              </span>
              <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs">
                <Shield className="w-3 h-3" /> No win, no fee
              </span>
            </div>

            {/* CTA Button */}
            <motion.a
              href={airhelpConfig.getLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold text-sm shadow-lg shadow-orange-500/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AlertCircle className="w-4 h-4" />
              {airhelpConfig.ctaText}
              <ExternalLink className="w-3.5 h-3.5" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function CTAButtons({ destination }: CTAButtonsProps) {
  const stats = useUrgencyStats();
  const [showAllServices, setShowAllServices] = useState(false);

  // Icon mapping
  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Plane,
    Car,
    Ticket,
    Bus,
  };

  return (
    <div className="space-y-4">
      {/* Urgency header */}
      <motion.div
        className="flex items-center justify-center gap-4 sm:gap-6 py-3 px-4 rounded-xl bg-[#22c55e]/10 border border-[#22c55e]/20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center gap-2">
          <div className="relative">
            <Users className="w-4 h-4 text-[#22c55e]" />
            <motion.div
              className="absolute -top-1 -right-1 w-2 h-2 bg-[#22c55e] rounded-full"
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
          <span className="text-xs sm:text-sm text-[#22c55e] font-medium">
            {stats.viewersNow} viewing
          </span>
        </div>
        <div className="w-px h-4 bg-[#22c55e]/30" />
        <div className="flex items-center gap-2">
          <TrendingDown className="w-4 h-4 text-[#22c55e]" />
          <span className="text-xs sm:text-sm text-[#22c55e] font-medium">
            Prices dropped {stats.priceDropPercent}%
          </span>
        </div>
      </motion.div>

      {/* HERO CTA - Flights (40% commission!) */}
      <motion.a
        href={affiliateLinks.flights.getLink()}
        target="_blank"
        rel="noopener noreferrer"
        className="relative block group overflow-hidden rounded-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02, y: -4 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#6366f1] bg-[length:200%_100%] animate-gradient" />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
        <motion.div
          className="absolute inset-0 rounded-2xl border-2 border-white/30"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        <div className="relative p-5 sm:p-6 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="p-2.5 sm:p-3 rounded-xl bg-white/20 backdrop-blur-sm">
              <Plane className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h4 className="text-lg sm:text-xl font-bold text-white">Find Cheap Flights</h4>
                <motion.span
                  className="px-2 py-0.5 rounded-full bg-[#22c55e] text-xs font-bold text-white"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  {stats.priceDropPercent}% OFF
                </motion.span>
              </div>
              <p className="text-white/80 text-xs sm:text-sm">
                Compare 100+ airlines to {destination.name}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <motion.div
              className="px-3 sm:px-4 py-2 rounded-xl bg-white text-[#6366f1] font-bold text-xs sm:text-sm flex items-center gap-1 sm:gap-2"
              whileHover={{ scale: 1.05 }}
            >
              Search
              <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </motion.div>
            <span className="text-xs text-white/60 hidden sm:block">{stats.bookedToday} booked today</span>
          </div>
        </div>
      </motion.a>

      {/* Secondary CTAs - 2x2 grid (prioritized by commission) */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        {ctaConfig.slice(1).map((cta, index) => {
          const IconComponent = iconMap[cta.icon] || Ticket;
          return (
            <motion.a
              key={cta.id}
              href={cta.getLink()}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className={`relative group p-4 rounded-xl overflow-hidden bg-gradient-to-br ${cta.color} shadow-lg hover:shadow-xl transition-shadow`}
            >
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              <div className="relative">
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6 text-white mb-2" />
                <h4 className="font-semibold text-white text-sm sm:text-base">{cta.label}</h4>
                <p className="text-xs text-white/80 mt-1">{cta.urgency}</p>
              </div>
            </motion.a>
          );
        })}
      </div>

      {/* AirHelp Upsell - HIGH COMMISSION! */}
      <AirHelpUpsell />

      {/* Quick action pills */}
      <div className="flex flex-wrap justify-center gap-2">
        {secondaryCtaConfig.map((cta) => (
          <motion.a
            key={cta.id}
            href={cta.getLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 sm:px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#6366f1]/50 transition-all text-xs sm:text-sm text-zinc-300 hover:text-white flex items-center gap-1.5 sm:gap-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{cta.emoji}</span>
            {cta.label}
          </motion.a>
        ))}
      </div>

      {/* Complete Your Trip - Expandable section */}
      <motion.div
        className="mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <button
          onClick={() => setShowAllServices(!showAllServices)}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-colors"
        >
          <span className="text-sm font-medium">
            {showAllServices ? 'Hide' : 'More'} Booking Options
          </span>
          {showAllServices ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        <AnimatePresence>
          {showAllServices && (
            <motion.div
              className="mt-4 space-y-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
            >
              {completeYourTripConfig.map((section) => (
                <div key={section.category}>
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2">
                    {section.category}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {section.items.map((item) => (
                      <a
                        key={item.id}
                        href={item.getLink()}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`px-3 py-2 rounded-lg bg-[#1a1a24] hover:bg-[#252532] border transition-all text-sm text-zinc-300 hover:text-white flex items-center gap-2 ${
                          (item as { hot?: boolean }).hot
                            ? 'border-orange-500/50 hover:border-orange-500'
                            : 'border-white/5 hover:border-[#6366f1]/30'
                        }`}
                      >
                        <span>{item.emoji}</span>
                        {item.label}
                        {(item as { badge?: string }).badge && (
                          <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                            (item as { hot?: boolean }).hot
                              ? 'bg-orange-500/20 text-orange-400'
                              : 'bg-[#6366f1]/20 text-[#6366f1]'
                          }`}>
                            {(item as { badge?: string }).badge}
                          </span>
                        )}
                        <ExternalLink className="w-3 h-3 text-zinc-500" />
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trust badges */}
      <div className="flex items-center justify-center gap-4 pt-2">
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Zap className="w-3.5 h-3.5" />
          Real-time prices
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Clock className="w-3.5 h-3.5" />
          Instant booking
        </div>
        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
          <Shield className="w-3.5 h-3.5" />
          Secure checkout
        </div>
      </div>
    </div>
  );
}

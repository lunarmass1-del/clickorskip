'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ctaConfig, secondaryCtaConfig } from '@/data/affiliateLinks';

interface AffiliateCTAProps {
  destinationId: string;
  destinationName: string;
}

export function AffiliateCTA({ destinationId, destinationName }: AffiliateCTAProps) {
  return (
    <div className="space-y-6">
      {/* Main Heading */}
      <div className="text-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
          Start Planning Your Trip to {destinationName}
        </h2>
        <p className="text-zinc-400">
          Book now and get the best deals from our trusted partners
        </p>
      </div>

      {/* Primary CTAs */}
      <div className="grid gap-4 md:grid-cols-2">
        {ctaConfig.map((cta, index) => (
          <motion.a
            key={cta.id}
            href={cta.getLink(destinationId)}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`
              relative group p-5 rounded-xl overflow-hidden
              bg-gradient-to-br ${cta.color}
              hover:shadow-lg hover:shadow-indigo-500/20
              transition-all duration-300
            `}
          >
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
            <div className="relative flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-2xl">{cta.emoji}</span>
                  <h3 className="text-lg font-bold text-white">{cta.label}</h3>
                </div>
                <p className="text-sm text-white/80">{cta.description}</p>
              </div>
              <ExternalLink className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
            </div>
          </motion.a>
        ))}
      </div>

      {/* Secondary CTAs */}
      <div className="flex flex-wrap justify-center gap-3 pt-4">
        {secondaryCtaConfig.map((cta) => (
          <a
            key={cta.id}
            href={cta.getLink(destinationId)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-sm text-zinc-300 hover:text-white flex items-center gap-2"
          >
            <span>{cta.emoji}</span>
            {cta.label}
          </a>
        ))}
      </div>

      {/* Trust Badge */}
      <div className="text-center pt-6 border-t border-white/5">
        <p className="text-xs text-zinc-500">
          Trusted by 100,000+ travelers. Prices updated in real-time.
        </p>
      </div>
    </div>
  );
}

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ImagePair } from './ImagePair';
import { VibeRound as VibeRoundType, VibeImage } from '@/data/vibeImages';

interface VibeRoundProps {
  round: VibeRoundType;
  onSelect: (image: VibeImage) => void;
  isActive: boolean;
  roundNumber: number;
  totalRounds: number;
}

export function VibeRound({
  round,
  onSelect,
  isActive,
  roundNumber,
  totalRounds,
}: VibeRoundProps) {
  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key={round.id}
          className="w-full flex flex-col items-center gap-6"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -40, scale: 0.95 }}
          transition={{
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
        >
          {/* Category Badge */}
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            {/* Round Counter */}
            <span className="text-xs sm:text-sm text-[#a1a1aa] font-medium tracking-wider uppercase">
              Round {roundNumber} of {totalRounds}
            </span>

            {/* Category Label */}
            <motion.div
              className="px-4 py-2 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 border border-[#6366f1]/30 backdrop-blur-sm"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span className="text-sm sm:text-base font-semibold bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent">
                {round.category}
              </span>
            </motion.div>
          </motion.div>

          {/* Question */}
          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
          >
            {round.question}
          </motion.h2>

          {/* Image Pair */}
          <motion.div
            className="w-full px-4 sm:px-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
          >
            <ImagePair
              imageA={round.imageA}
              imageB={round.imageB}
              onSelect={onSelect}
              disabled={!isActive}
            />
          </motion.div>

          {/* Tap Hint */}
          <motion.p
            className="text-xs sm:text-sm text-[#71717a] flex items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.4 }}
          >
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <TapIcon className="w-4 h-4" />
            </motion.span>
            Tap to choose your vibe
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Simple tap/touch icon
function TapIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </svg>
  );
}

export default VibeRound;

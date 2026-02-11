'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { VibeImage } from '@/data/vibeImages';

interface WildcardRoundProps {
  image: VibeImage;
  onSelect: (image: VibeImage | null) => void;
  isActive: boolean;
  duration?: number; // Duration in seconds, defaults to 3
}

export function WildcardRound({
  image,
  onSelect,
  isActive,
  duration = 3,
}: WildcardRoundProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [hasSelected, setHasSelected] = useState(false);
  const [isExpired, setIsExpired] = useState(false);

  // Handle selection
  const handleSelect = useCallback(() => {
    if (!hasSelected && !isExpired && isActive) {
      setHasSelected(true);
      onSelect(image);
    }
  }, [hasSelected, isExpired, isActive, image, onSelect]);

  // Countdown timer
  useEffect(() => {
    if (!isActive || hasSelected || isExpired) return;

    setTimeLeft(duration);
    setHasSelected(false);
    setIsExpired(false);

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0.1) {
          clearInterval(interval);
          setIsExpired(true);
          onSelect(null); // Auto-skip
          return 0;
        }
        return prev - 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isActive, duration, onSelect, hasSelected, isExpired]);

  // Reset state when becoming active
  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration);
      setHasSelected(false);
      setIsExpired(false);
    }
  }, [isActive, duration]);

  const progressPercentage = (timeLeft / duration) * 100;

  return (
    <AnimatePresence mode="wait">
      {isActive && (
        <motion.div
          key="wildcard-round"
          className="w-full flex flex-col items-center gap-6"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8, y: -30 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Wildcard Label */}
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <motion.div
              className="px-6 py-2 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#ef4444] shadow-lg shadow-[#f59e0b]/30"
              animate={{
                scale: [1, 1.05, 1],
                boxShadow: [
                  '0 10px 15px -3px rgba(245, 158, 11, 0.3)',
                  '0 15px 25px -3px rgba(245, 158, 11, 0.5)',
                  '0 10px 15px -3px rgba(245, 158, 11, 0.3)',
                ],
              }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span className="text-sm sm:text-base font-bold text-white tracking-wider flex items-center gap-2">
                <WildcardIcon className="w-5 h-5" />
                WILDCARD
                <WildcardIcon className="w-5 h-5" />
              </span>
            </motion.div>

            <span className="text-xs sm:text-sm text-[#a1a1aa] font-medium">
              Quick! Tap if this speaks to you
            </span>
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            className="relative w-full max-w-[200px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Timer Background */}
            <div className="h-2 bg-[#27272a] rounded-full overflow-hidden">
              {/* Timer Progress */}
              <motion.div
                className="h-full rounded-full"
                style={{
                  width: `${progressPercentage}%`,
                  background:
                    progressPercentage > 50
                      ? 'linear-gradient(90deg, #6366f1, #8b5cf6)'
                      : progressPercentage > 25
                      ? 'linear-gradient(90deg, #f59e0b, #ef4444)'
                      : 'linear-gradient(90deg, #ef4444, #dc2626)',
                }}
                transition={{ duration: 0.1 }}
              />
            </div>
            {/* Time Display */}
            <motion.span
              className="absolute -top-6 left-1/2 -translate-x-1/2 text-lg font-bold"
              style={{
                color:
                  progressPercentage > 50
                    ? '#6366f1'
                    : progressPercentage > 25
                    ? '#f59e0b'
                    : '#ef4444',
              }}
              animate={{ scale: timeLeft <= 1 ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 0.3, repeat: timeLeft <= 1 ? Infinity : 0 }}
            >
              {Math.ceil(timeLeft)}s
            </motion.span>
          </motion.div>

          {/* Image Card */}
          <motion.button
            className="relative w-full max-w-sm aspect-[3/4] rounded-3xl overflow-hidden focus:outline-none focus:ring-4 focus:ring-[#f59e0b]/50 disabled:cursor-not-allowed"
            onClick={handleSelect}
            disabled={hasSelected || isExpired}
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.5 }}
            whileHover={!hasSelected && !isExpired ? { scale: 1.02 } : {}}
            whileTap={!hasSelected && !isExpired ? { scale: 0.98 } : {}}
          >
            {/* Pulsing Border */}
            <motion.div
              className="absolute inset-0 rounded-3xl border-4 border-[#f59e0b] z-10"
              animate={{
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.01, 1],
              }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Image */}
            <div className="absolute inset-0">
              <Image
                src={image.url}
                alt={image.alt}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 400px"
                priority
              />
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

            {/* Vibe Label */}
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
              <motion.div
                className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-[#f59e0b]/80 to-[#ef4444]/80 backdrop-blur-sm"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-sm sm:text-base font-semibold text-white">
                  {image.vibe}
                </span>
              </motion.div>
            </div>

            {/* Tap Indicator Pulse */}
            {!hasSelected && !isExpired && (
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border-2 border-white/50"
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.8, 0, 0.8],
                }}
                transition={{ duration: 1.2, repeat: Infinity, ease: 'easeOut' }}
              />
            )}

            {/* Selected Overlay */}
            <AnimatePresence>
              {hasSelected && (
                <motion.div
                  className="absolute inset-0 bg-[#6366f1]/40 flex items-center justify-center z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.div
                    className="w-20 h-20 rounded-full bg-[#6366f1] flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  >
                    <CheckIcon className="w-10 h-10 text-white" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Skipped Overlay */}
            <AnimatePresence>
              {isExpired && !hasSelected && (
                <motion.div
                  className="absolute inset-0 bg-black/60 flex items-center justify-center z-20"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <motion.span
                    className="text-xl font-bold text-[#a1a1aa]"
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                  >
                    Skipped!
                  </motion.span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Instructions */}
          <motion.p
            className="text-xs sm:text-sm text-[#71717a] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {hasSelected
              ? 'Great choice! Bonus vibe added!'
              : isExpired
              ? 'Time ran out - moving on!'
              : "Tap the image to add this vibe, or wait to skip"}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Wildcard star icon
function WildcardIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

// Check icon for selection
function CheckIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

export default WildcardRound;

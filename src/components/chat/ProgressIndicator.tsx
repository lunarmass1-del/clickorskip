'use client';

import { motion } from 'framer-motion';

interface ProgressIndicatorProps {
  currentRound: number; // 0-indexed current round (0-7 for regular, 8 for wildcard)
  totalRounds: number; // Total regular rounds (typically 8)
  hasWildcard?: boolean; // Whether to show wildcard dot
  wildcardCompleted?: boolean; // Whether wildcard round is done
}

export function ProgressIndicator({
  currentRound,
  totalRounds,
  hasWildcard = true,
  wildcardCompleted = false,
}: ProgressIndicatorProps) {
  const totalDots = hasWildcard ? totalRounds + 1 : totalRounds;

  return (
    <motion.div
      className="flex items-center justify-center gap-2 py-4"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Regular Round Dots */}
      {Array.from({ length: totalRounds }).map((_, index) => {
        const isCompleted = index < currentRound;
        const isCurrent = index === currentRound;

        return (
          <ProgressDot
            key={`round-${index}`}
            isCompleted={isCompleted}
            isCurrent={isCurrent}
            index={index}
            isWildcard={false}
          />
        );
      })}

      {/* Wildcard Dot */}
      {hasWildcard && (
        <>
          {/* Separator */}
          <motion.div
            className="w-px h-4 bg-[#3f3f46] mx-1"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.3, duration: 0.3 }}
          />

          <ProgressDot
            isCompleted={wildcardCompleted}
            isCurrent={currentRound === totalRounds}
            index={totalRounds}
            isWildcard={true}
          />
        </>
      )}
    </motion.div>
  );
}

interface ProgressDotProps {
  isCompleted: boolean;
  isCurrent: boolean;
  index: number;
  isWildcard: boolean;
}

function ProgressDot({ isCompleted, isCurrent, index, isWildcard }: ProgressDotProps) {
  return (
    <motion.div
      className="relative"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        delay: index * 0.05,
        type: 'spring',
        stiffness: 500,
        damping: 30,
      }}
    >
      {/* Outer Ring for Current */}
      {isCurrent && (
        <motion.div
          className={`absolute inset-0 rounded-full ${
            isWildcard
              ? 'bg-gradient-to-r from-[#f59e0b] to-[#ef4444]'
              : 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]'
          }`}
          initial={{ scale: 1, opacity: 0.3 }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            width: isWildcard ? 16 : 12,
            height: isWildcard ? 16 : 12,
            margin: isWildcard ? -2 : 0,
          }}
        />
      )}

      {/* Main Dot */}
      <motion.div
        className={`relative rounded-full flex items-center justify-center transition-all duration-300 ${
          isWildcard ? 'w-4 h-4' : 'w-3 h-3'
        } ${
          isCompleted
            ? isWildcard
              ? 'bg-gradient-to-r from-[#f59e0b] to-[#ef4444]'
              : 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]'
            : isCurrent
            ? isWildcard
              ? 'bg-gradient-to-r from-[#f59e0b] to-[#ef4444] ring-2 ring-[#f59e0b]/50 ring-offset-2 ring-offset-[#0a0a0f]'
              : 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] ring-2 ring-[#6366f1]/50 ring-offset-2 ring-offset-[#0a0a0f]'
            : 'bg-[#3f3f46]'
        }`}
        animate={
          isCompleted
            ? {
                scale: [1, 1.2, 1],
              }
            : {}
        }
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
      >
        {/* Wildcard Star Icon (when completed or current) */}
        {isWildcard && (isCompleted || isCurrent) && (
          <motion.svg
            className="w-2.5 h-2.5 text-white"
            viewBox="0 0 24 24"
            fill="currentColor"
            initial={{ rotate: 0 }}
            animate={{ rotate: isCompleted ? 360 : 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <path d="M12 2l2.4 4.8 5.3.8-3.8 3.7.9 5.2-4.8-2.5-4.8 2.5.9-5.2-3.8-3.7 5.3-.8z" />
          </motion.svg>
        )}

        {/* Checkmark for completed regular rounds */}
        {!isWildcard && isCompleted && (
          <motion.svg
            className="w-2 h-2 text-white"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <polyline points="20 6 9 17 4 12" />
          </motion.svg>
        )}
      </motion.div>

      {/* Tooltip on hover */}
      <motion.div
        className="absolute -bottom-8 left-1/2 -translate-x-1/2 opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity"
        whileHover={{ opacity: 1 }}
      >
        <span className="text-xs text-[#71717a] whitespace-nowrap">
          {isWildcard ? 'Wildcard' : `Round ${index + 1}`}
        </span>
      </motion.div>
    </motion.div>
  );
}

// Alternative compact version for mobile
export function ProgressIndicatorCompact({
  currentRound,
  totalRounds,
  hasWildcard = true,
}: ProgressIndicatorProps) {
  const displayTotal = hasWildcard ? totalRounds + 1 : totalRounds;
  const displayCurrent = Math.min(currentRound + 1, displayTotal);

  return (
    <motion.div
      className="flex items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Progress Bar */}
      <div className="flex-1 h-1.5 bg-[#27272a] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(displayCurrent / displayTotal) * 100}%` }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        />
      </div>

      {/* Counter */}
      <span className="text-sm font-medium text-[#a1a1aa]">
        {displayCurrent}/{displayTotal}
      </span>
    </motion.div>
  );
}

export default ProgressIndicator;

'use client';

import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = (current / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-zinc-400">
          Question {Math.min(current + 1, total)} of {total}
        </span>
        <span className="text-xs text-indigo-400 font-medium">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1.5 bg-[#1a1a24] rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
        />
      </div>
    </div>
  );
}

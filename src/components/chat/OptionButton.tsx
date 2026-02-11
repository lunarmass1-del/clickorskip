'use client';

import { motion } from 'framer-motion';
import { ChatOption } from '@/types';

interface OptionButtonProps {
  option: ChatOption;
  index: number;
  onSelect: (option: ChatOption) => void;
  disabled?: boolean;
}

export function OptionButton({
  option,
  index,
  onSelect,
  disabled = false,
}: OptionButtonProps) {
  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={() => !disabled && onSelect(option)}
      disabled={disabled}
      className={`
        w-full p-4 rounded-xl text-left transition-all duration-200
        bg-[#1a1a24] border border-white/10
        ${
          disabled
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:border-indigo-500/50 hover:bg-indigo-500/10 cursor-pointer'
        }
      `}
    >
      <span className="text-sm md:text-base text-white">{option.text}</span>
    </motion.button>
  );
}

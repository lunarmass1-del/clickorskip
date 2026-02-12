'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
  linkToHome?: boolean;
}

export function Logo({ size = 'md', showIcon = true, linkToHome = true }: LogoProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl md:text-2xl',
    lg: 'text-2xl md:text-3xl',
  };

  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const LogoContent = (
    <motion.div
      className="flex items-center gap-2"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {showIcon && (
        <motion.div
          className={`${iconSizes[size]} rounded-xl bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center shadow-lg shadow-[#6366f1]/20`}
        >
          {/* Custom icon - airplane/compass hybrid */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-5 h-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Simplified plane pointing up-right */}
            <path
              d="M22 2L11 13"
              className="text-white"
            />
            <path
              d="M22 2L15 22L11 13L2 9L22 2Z"
              fill="currentColor"
              className="text-white/90"
            />
          </svg>
        </motion.div>
      )}
      <div className="flex flex-col leading-none">
        <span className={`${sizeClasses[size]} font-bold bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#d946ef] bg-clip-text text-transparent`}>
          ClickOrSkip
        </span>
        {size === 'lg' && (
          <span className="text-[10px] text-[#71717a] tracking-wider mt-0.5">
            FIND YOUR ESCAPE
          </span>
        )}
      </div>
    </motion.div>
  );

  if (linkToHome) {
    return <Link href="/">{LogoContent}</Link>;
  }

  return LogoContent;
}

export default Logo;

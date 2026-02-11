'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface MatchScoreProps {
  percentage: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function MatchScore({ percentage, size = 'md' }: MatchScoreProps) {
  const [displayedValue, setDisplayedValue] = useState(0);

  // Size configurations
  const sizes = {
    sm: { container: 60, stroke: 4, font: 'text-sm' },
    md: { container: 80, stroke: 5, font: 'text-xl' },
    lg: { container: 100, stroke: 6, font: 'text-2xl' },
  };

  const config = sizes[size];
  const radius = (config.container - config.stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  // Animate the counter
  useEffect(() => {
    const duration = 1500; // ms
    const steps = 60;
    const stepValue = percentage / steps;
    const stepDuration = duration / steps;

    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        setDisplayedValue(Math.round(stepValue * currentStep));
      } else {
        clearInterval(interval);
        setDisplayedValue(percentage);
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [percentage]);

  return (
    <motion.div
      className="relative inline-flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        type: 'spring',
        stiffness: 200,
        damping: 15,
        delay: 0.3,
      }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 rounded-full bg-[#22c55e]/20 blur-xl"
        style={{ width: config.container, height: config.container }}
      />

      {/* SVG Circle */}
      <svg
        width={config.container}
        height={config.container}
        className="transform -rotate-90"
      >
        {/* Background circle */}
        <circle
          cx={config.container / 2}
          cy={config.container / 2}
          r={radius}
          fill="rgba(18, 18, 26, 0.9)"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth={config.stroke}
        />

        {/* Progress circle */}
        <motion.circle
          cx={config.container / 2}
          cy={config.container / 2}
          r={radius}
          fill="transparent"
          stroke="url(#gradient)"
          strokeWidth={config.stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
        />

        {/* Gradient definition */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
      </svg>

      {/* Percentage text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={`${config.font} font-bold text-white`}>
          {displayedValue}%
        </span>
        <span className="text-[8px] uppercase tracking-wider text-[#71717a]">
          match
        </span>
      </div>
    </motion.div>
  );
}

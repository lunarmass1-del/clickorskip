'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { forwardRef } from 'react';

type CardPadding = 'none' | 'sm' | 'md' | 'lg';

interface CardProps extends Omit<HTMLMotionProps<'div'>, 'ref'> {
  padding?: CardPadding;
  hover?: boolean;
  glow?: boolean;
  children: React.ReactNode;
}

const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      padding = 'md',
      hover = false,
      glow = false,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = `
      bg-bg-secondary
      border border-white/5
      rounded-3xl
      transition-all duration-300
    `;

    const hoverStyles = hover
      ? 'hover:border-accent-primary/30 hover:bg-bg-secondary/80'
      : '';

    const glowStyles = glow ? 'shadow-glow' : '';

    return (
      <motion.div
        ref={ref}
        className={twMerge(
          clsx(
            baseStyles,
            paddingStyles[padding],
            hoverStyles,
            glowStyles,
            className
          )
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = 'Card';

export default Card;

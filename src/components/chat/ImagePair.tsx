'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { VibeImage } from '@/data/vibeImages';

interface ImagePairProps {
  imageA: VibeImage;
  imageB: VibeImage;
  onSelect: (image: VibeImage) => void;
  disabled?: boolean;
}

export function ImagePair({ imageA, imageB, onSelect, disabled = false }: ImagePairProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-2xl mx-auto">
      <ImageCard
        image={imageA}
        onSelect={onSelect}
        disabled={disabled}
        side="left"
      />
      <ImageCard
        image={imageB}
        onSelect={onSelect}
        disabled={disabled}
        side="right"
      />
    </div>
  );
}

interface ImageCardProps {
  image: VibeImage;
  onSelect: (image: VibeImage) => void;
  disabled: boolean;
  side: 'left' | 'right';
}

function ImageCard({ image, onSelect, disabled, side }: ImageCardProps) {
  return (
    <motion.button
      className="relative aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden group focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 focus:ring-offset-[#0a0a0f]"
      onClick={() => !disabled && onSelect(image)}
      disabled={disabled}
      initial={{ opacity: 0, x: side === 'left' ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as const }}
      whileHover={disabled ? {} : { scale: 1.02, y: -4 }}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={image.url}
          alt={image.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, 300px"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Hover Glow Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#6366f1]/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
        {/* Vibe Label */}
        <motion.div
          className="inline-block px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <span className="text-xs sm:text-sm font-medium text-white">
            {image.vibe}
          </span>
        </motion.div>
      </div>

      {/* Selection Ring on Hover */}
      <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-transparent group-hover:border-[#6366f1]/60 transition-colors duration-300" />

      {/* Click Indicator */}
      <motion.div
        className="absolute top-3 right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        whileHover={{ scale: 1.1 }}
      >
        <span className="text-white text-lg">+</span>
      </motion.div>
    </motion.button>
  );
}

export default ImagePair;

'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface AIChatStripProps {
  message: string;
  isTyping?: boolean;
  showAvatar?: boolean;
}

export function AIChatStrip({ message, isTyping = false, showAvatar = true }: AIChatStripProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  // Typewriter effect
  useEffect(() => {
    if (isTyping || !message) {
      setDisplayedText('');
      return;
    }

    setIsAnimating(true);
    setDisplayedText('');

    let index = 0;
    const timer = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        clearInterval(timer);
        setIsAnimating(false);
      }
    }, 25); // Speed of typing

    return () => clearInterval(timer);
  }, [message, isTyping]);

  return (
    <motion.div
      className="w-full max-w-2xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-start gap-3 p-4 rounded-2xl bg-[#1a1a24]/80 backdrop-blur-xl border border-white/5">
        {/* AI Avatar */}
        {showAvatar && (
          <motion.div
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          >
            <span className="text-lg">✨</span>
          </motion.div>
        )}

        {/* Message Content */}
        <div className="flex-1 min-h-[40px] flex items-center">
          <AnimatePresence mode="wait">
            {isTyping ? (
              <motion.div
                key="typing"
                className="flex items-center gap-1.5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 bg-[#6366f1] rounded-full"
                    animate={{
                      y: [0, -6, 0],
                      opacity: [0.5, 1, 0.5],
                    }}
                    transition={{
                      duration: 0.6,
                      repeat: Infinity,
                      delay: i * 0.15,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.p
                key="message"
                className="text-[#e4e4e7] text-sm sm:text-base leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {displayedText}
                {isAnimating && (
                  <motion.span
                    className="inline-block w-0.5 h-4 bg-[#6366f1] ml-0.5"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                  />
                )}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}

export default AIChatStrip;

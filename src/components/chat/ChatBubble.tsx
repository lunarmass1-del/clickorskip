'use client';

import { motion } from 'framer-motion';
import { useTypewriter } from '@/hooks/useTypewriter';

interface ChatBubbleProps {
  type: 'ai' | 'user';
  content: string;
  animate?: boolean;
  onTypingComplete?: () => void;
}

export function ChatBubble({
  type,
  content,
  animate = true,
  onTypingComplete,
}: ChatBubbleProps) {
  const { displayedText, isComplete } = useTypewriter({
    text: type === 'ai' && animate ? content : content,
    speed: type === 'ai' ? 20 : 0,
    onComplete: onTypingComplete,
  });

  const showText = type === 'ai' && animate ? displayedText : content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`flex ${type === 'user' ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`
          max-w-[85%] px-4 py-3 rounded-2xl whitespace-pre-line
          ${
            type === 'ai'
              ? 'bg-[#1a1a24] rounded-bl-sm text-white'
              : 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-br-sm text-white'
          }
        `}
      >
        <p className="text-sm md:text-base leading-relaxed">{showText}</p>
        {type === 'ai' && animate && !isComplete && (
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
            className="inline-block w-0.5 h-4 bg-indigo-400 ml-0.5 align-middle"
          />
        )}
      </div>
    </motion.div>
  );
}

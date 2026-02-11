'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { chatQuestions, transitionMessages } from '@/data/chatFlow';
import { destinations } from '@/data/destinations';
import { calculateMatches } from '@/lib/matching';
import { Message } from '@/types';
import { generateId } from '@/lib/utils';

// Typing indicator component
function TypingIndicator() {
  return (
    <div className="chat-ai inline-flex items-center gap-1 py-3 px-4">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 bg-[#a1a1aa] rounded-full"
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// Progress bar component
function ProgressBar({ progress, total }: { progress: number; total: number }) {
  const percentage = (progress / total) * 100;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-2 text-xs text-[#71717a]">
        <span>Question {progress} of {total}</span>
        <span>{Math.round(percentage)}%</span>
      </div>
      <div className="w-full h-2 bg-[#1a1a24] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
}

// Chat bubble component
function ChatBubble({
  message,
  isLatest,
}: {
  message: Message;
  isLatest: boolean;
}) {
  const isAI = message.type === 'ai';

  return (
    <motion.div
      className={`flex ${isAI ? 'justify-start' : 'justify-end'}`}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className={isAI ? 'chat-ai' : 'chat-user'}>
        <p className="whitespace-pre-wrap">{message.content}</p>
      </div>
    </motion.div>
  );
}

// Option button component
function OptionButton({
  text,
  onClick,
  index,
}: {
  text: string;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      className="btn-option w-full text-left"
      onClick={onClick}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      whileHover={{ scale: 1.02, borderColor: 'rgba(99, 102, 241, 0.5)' }}
      whileTap={{ scale: 0.98 }}
    >
      {text}
    </motion.button>
  );
}

export default function ChatPage() {
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('q1_vibe');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(1);
  const [showOptions, setShowOptions] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const totalQuestions = 6;

  // Initialize chat with first message
  useEffect(() => {
    const firstQuestion = chatQuestions['q1_vibe'];
    if (firstQuestion && messages.length === 0) {
      setIsTyping(true);
      setTimeout(() => {
        setMessages([
          {
            id: generateId(),
            type: 'ai',
            content: firstQuestion.aiMessage,
            timestamp: new Date(),
          },
        ]);
        setIsTyping(false);
        setTimeout(() => setShowOptions(true), 300);
      }, 1000);
    }
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping, showOptions]);

  // Handle option selection
  const handleOptionSelect = (optionId: string, optionText: string, optionScores: Record<string, number>) => {
    setShowOptions(false);

    // Add user message
    const userMessage: Message = {
      id: generateId(),
      type: 'user',
      content: optionText,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);

    // Update scores
    const newScores = { ...scores };
    Object.entries(optionScores).forEach(([key, value]) => {
      newScores[key] = (newScores[key] || 0) + value;
    });
    setScores(newScores);

    // Get current question and check for next
    const question = chatQuestions[currentQuestion];

    if (question.nextQuestion) {
      // Show typing indicator
      setIsTyping(true);

      setTimeout(() => {
        // Add transition message
        const randomTransition =
          transitionMessages[Math.floor(Math.random() * transitionMessages.length)];

        const nextQuestion = chatQuestions[question.nextQuestion!];

        const aiMessage: Message = {
          id: generateId(),
          type: 'ai',
          content: nextQuestion.aiMessage,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, aiMessage]);
        setCurrentQuestion(question.nextQuestion!);
        setProgress((prev) => Math.min(prev + 1, totalQuestions));
        setIsTyping(false);

        setTimeout(() => setShowOptions(true), 300);
      }, 1200);
    } else {
      // Chat is complete - calculate results
      setIsComplete(true);
      setIsTyping(true);

      setTimeout(() => {
        const finalMsg: Message = {
          id: generateId(),
          type: 'ai',
          content: "Amazing! 🎉\n\nI've analyzed your preferences and found your perfect match!\n\nLet me show you your dream destination...",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, finalMsg]);
        setIsTyping(false);

        // Calculate matches and store in sessionStorage
        const matches = calculateMatches(newScores, destinations);

        sessionStorage.setItem(
          'travelResults',
          JSON.stringify({
            matches: matches.slice(0, 3),
            scores: newScores,
            timestamp: new Date().toISOString(),
          })
        );

        // Redirect to results after a short delay
        setTimeout(() => {
          router.push('/result');
        }, 2000);
      }, 1500);
    }
  };

  const currentQuestionData = chatQuestions[currentQuestion];

  return (
    <div className="min-h-screen-safe bg-[#0a0a0f] flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5">
        <Container>
          <div className="flex items-center justify-between h-16">
            {/* Back button */}
            <Link href="/">
              <motion.button
                className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1a1a24] border border-white/5 text-[#a1a1aa] hover:text-white hover:border-white/10 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeft size={20} />
              </motion.button>
            </Link>

            {/* Logo */}
            <Link href="/">
              <span className="text-xl font-bold gradient-text">ClickOrSkip</span>
            </Link>

            {/* Progress indicator (mobile) */}
            <div className="w-10 h-10 flex items-center justify-center">
              <span className="text-sm text-[#71717a]">
                {progress}/{totalQuestions}
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="pb-3">
            <ProgressBar progress={progress} total={totalQuestions} />
          </div>
        </Container>
      </header>

      {/* Chat area */}
      <main className="flex-1 pt-32 pb-8 overflow-y-auto">
        <Container className="max-w-2xl">
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {messages.map((message, index) => (
                <ChatBubble
                  key={message.id}
                  message={message}
                  isLatest={index === messages.length - 1}
                />
              ))}
            </AnimatePresence>

            {/* Typing indicator */}
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
              >
                <TypingIndicator />
              </motion.div>
            )}

            {/* Options */}
            {showOptions && currentQuestionData && !isComplete && (
              <motion.div
                className="space-y-3 pt-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {currentQuestionData.options.map((option, index) => (
                  <OptionButton
                    key={option.id}
                    text={option.text}
                    onClick={() =>
                      handleOptionSelect(option.id, option.text, option.scores)
                    }
                    index={index}
                  />
                ))}
              </motion.div>
            )}

            {/* Loading indicator for results */}
            {isComplete && !isTyping && (
              <motion.div
                className="flex justify-center py-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <div className="flex items-center gap-3 text-[#a1a1aa]">
                  <motion.div
                    className="w-6 h-6 border-2 border-[#6366f1] border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                  <span>Finding your perfect match...</span>
                </div>
              </motion.div>
            )}

            <div ref={chatEndRef} />
          </div>
        </Container>
      </main>
    </div>
  );
}

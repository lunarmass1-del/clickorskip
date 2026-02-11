'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatBubble } from './ChatBubble';
import { OptionButton } from './OptionButton';
import { TypingIndicator } from './TypingIndicator';
import { ProgressBar } from './ProgressBar';
import { useChat } from '@/hooks/useChat';
import { chatQuestions, getRandomTransition } from '@/data/chatFlow';
import { ChatOption } from '@/types';

export function ChatContainer() {
  const router = useRouter();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const {
    messages,
    currentQuestion,
    scores,
    isTyping,
    progress,
    totalQuestions,
    addMessage,
    selectOption,
    setIsTyping,
  } = useChat();

  const [showOptions, setShowOptions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Scroll to bottom when messages change
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, scrollToBottom]);

  // Initialize first message
  useEffect(() => {
    if (messages.length === 0) {
      setIsTyping(true);
      const firstQuestion = chatQuestions['q1_vibe'];
      setTimeout(() => {
        setIsTyping(false);
        addMessage('ai', firstQuestion.aiMessage);
      }, 1000);
    }
  }, [messages.length, addMessage, setIsTyping]);

  // Handle typing complete - show options
  const handleTypingComplete = useCallback(() => {
    setTimeout(() => {
      setShowOptions(true);
    }, 300);
  }, []);

  // Handle option selection
  const handleOptionSelect = useCallback(
    (option: ChatOption) => {
      if (isProcessing) return;
      setIsProcessing(true);
      setShowOptions(false);

      // Add user message
      addMessage('user', option.text);

      // Process selection and get next question
      const nextQuestionId = selectOption(option);

      // Simulate AI thinking
      setTimeout(() => {
        setIsTyping(true);

        setTimeout(() => {
          setIsTyping(false);

          if (nextQuestionId) {
            // Show transition + next question
            const transition = getRandomTransition();
            const nextQuestion = chatQuestions[nextQuestionId];
            addMessage('ai', `${transition}\n\n${nextQuestion.aiMessage}`);
          } else {
            // Quiz complete - show final message and redirect
            addMessage(
              'ai',
              "Amazing! 🎉\n\nI've analyzed your preferences and found your perfect match!\n\nLet me show you your dream destination..."
            );

            // Save scores to sessionStorage and redirect
            setTimeout(() => {
              sessionStorage.setItem('travelScores', JSON.stringify(scores));
              router.push('/result');
            }, 2000);
          }

          setIsProcessing(false);
        }, 1500);
      }, 500);
    },
    [addMessage, selectOption, setIsTyping, isProcessing, scores, router]
  );

  const currentQuestionData = chatQuestions[currentQuestion];

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto">
      {/* Progress */}
      <div className="px-4 py-3 bg-[#12121a]/80 backdrop-blur-sm border-b border-white/5">
        <ProgressBar current={progress} total={totalQuestions} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
        <AnimatePresence mode="popLayout">
          {messages.map((message, index) => (
            <ChatBubble
              key={message.id}
              type={message.type}
              content={message.content}
              animate={index === messages.length - 1 && message.type === 'ai'}
              onTypingComplete={
                index === messages.length - 1 && message.type === 'ai'
                  ? handleTypingComplete
                  : undefined
              }
            />
          ))}
        </AnimatePresence>

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && <TypingIndicator />}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Options */}
      <AnimatePresence>
        {showOptions && currentQuestionData && !isProcessing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="p-4 space-y-2 bg-[#12121a]/80 backdrop-blur-sm border-t border-white/5"
          >
            {currentQuestionData.options.map((option, index) => (
              <OptionButton
                key={option.id}
                option={option}
                index={index}
                onSelect={handleOptionSelect}
                disabled={isProcessing}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

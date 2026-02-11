'use client';

import { useState, useCallback } from 'react';
import { Message, ChatOption } from '@/types';
import { chatQuestions } from '@/data/chatFlow';

interface UseChatReturn {
  messages: Message[];
  currentQuestion: string;
  scores: Record<string, number>;
  isTyping: boolean;
  progress: number;
  totalQuestions: number;
  addMessage: (type: 'ai' | 'user', content: string) => void;
  selectOption: (option: ChatOption) => string | null;
  setIsTyping: (typing: boolean) => void;
  reset: () => void;
}

const TOTAL_QUESTIONS = Object.keys(chatQuestions).length;

export function useChat(): UseChatReturn {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState('q1_vibe');
  const [scores, setScores] = useState<Record<string, number>>({});
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);

  const addMessage = useCallback((type: 'ai' | 'user', content: string) => {
    const newMessage: Message = {
      id: `${type}-${Date.now()}`,
      type,
      content,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const selectOption = useCallback((option: ChatOption): string | null => {
    // Update scores
    setScores((prev) => {
      const newScores = { ...prev };
      Object.entries(option.scores).forEach(([key, value]) => {
        newScores[key] = (newScores[key] || 0) + value;
      });
      return newScores;
    });

    // Get next question
    const question = chatQuestions[currentQuestion];
    const nextQuestionId = question?.nextQuestion;

    if (nextQuestionId) {
      setCurrentQuestion(nextQuestionId);
      setProgress((prev) => prev + 1);
      return nextQuestionId;
    } else {
      // Quiz complete
      setProgress(TOTAL_QUESTIONS);
      return null;
    }
  }, [currentQuestion]);

  const reset = useCallback(() => {
    setMessages([]);
    setCurrentQuestion('q1_vibe');
    setScores({});
    setIsTyping(false);
    setProgress(0);
  }, []);

  return {
    messages,
    currentQuestion,
    scores,
    isTyping,
    progress,
    totalQuestions: TOTAL_QUESTIONS,
    addMessage,
    selectOption,
    setIsTyping,
    reset,
  };
}

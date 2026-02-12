'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, Loader2, ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { destinations } from '@/data/destinations';
import { calculateMatches } from '@/lib/matching';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

interface AIConversationProps {
  onComplete: (scores: Record<string, number>) => void;
}

export function AIConversation({ onComplete }: AIConversationProps) {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [questionCount, setQuestionCount] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Initial greeting
  useEffect(() => {
    const greeting: Message = {
      id: 'greeting',
      role: 'assistant',
      content: "Hey there, traveler! I'm your AI travel buddy and I'm SO excited to help you find your perfect destination! Tell me - what's your ideal travel vibe? Beach & relaxation, culture & history, adventure & nature, or party & nightlife?",
    };
    setMessages([greeting]);
  }, []);

  // Send message to AI
  const sendMessage = useCallback(async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Try to call the AI API
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          userScores: scores,
        }),
      });

      const data = await response.json();

      if (data.fallback) {
        // AI unavailable - use fallback response
        const fallbackMessage: Message = {
          id: Date.now().toString() + '-ai',
          role: 'assistant',
          content: data.message,
        };
        setMessages(prev => [...prev, fallbackMessage]);
      } else {
        // AI response received
        const aiMessage: Message = {
          id: Date.now().toString() + '-ai',
          role: 'assistant',
          content: data.message,
        };
        setMessages(prev => [...prev, aiMessage]);

        // Update scores
        if (data.scores) {
          setScores(data.scores);
        }

        // Track question count
        const newCount = data.questionCount || questionCount + 1;
        setQuestionCount(newCount);

        // Check if we have enough info (5+ exchanges)
        if (newCount >= 5 || data.message.toLowerCase().includes('perfect match')) {
          setShowResults(true);
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      // Fallback to local processing
      const fallbackResponse = generateFallbackResponse(input, questionCount);
      const fallbackMessage: Message = {
        id: Date.now().toString() + '-ai',
        role: 'assistant',
        content: fallbackResponse.message,
      };
      setMessages(prev => [...prev, fallbackMessage]);
      setScores(prev => ({ ...prev, ...fallbackResponse.scores }));
      setQuestionCount(prev => prev + 1);

      if (questionCount >= 4) {
        setShowResults(true);
      }
    } finally {
      setIsLoading(false);
      inputRef.current?.focus();
    }
  }, [input, isLoading, messages, scores, questionCount]);

  // Handle "See Results" click
  const handleShowResults = useCallback(() => {
    // Calculate matches and store
    const matches = calculateMatches(scores, destinations);
    sessionStorage.setItem('travelResults', JSON.stringify({
      matches: matches.slice(0, 3),
      scores,
      timestamp: new Date().toISOString(),
    }));
    router.push('/result');
  }, [scores, router]);

  // Handle enter key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center mr-2 flex-shrink-0">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white rounded-br-sm'
                    : 'bg-[#1a1a24] text-white rounded-bl-sm border border-white/5'
                }`}
              >
                <p className="text-sm sm:text-base leading-relaxed">{message.content}</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div className="bg-[#1a1a24] rounded-2xl rounded-bl-sm px-4 py-3 border border-white/5">
              <div className="flex items-center gap-1">
                <motion.span
                  className="w-2 h-2 bg-[#6366f1] rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                />
                <motion.span
                  className="w-2 h-2 bg-[#8b5cf6] rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                />
                <motion.span
                  className="w-2 h-2 bg-[#d946ef] rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* Show Results Button */}
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center pt-4"
          >
            <motion.button
              onClick={handleShowResults}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white font-semibold rounded-full shadow-lg shadow-[#22c55e]/20"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Sparkles className="w-5 h-5" />
              See My Perfect Match!
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="p-4 border-t border-white/5 bg-[#0a0a0f]">
        <div className="flex items-center gap-2 max-w-xl mx-auto">
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Tell me about your dream trip..."
              className="w-full px-4 py-3 rounded-full bg-[#1a1a24] border border-white/10 text-white placeholder-[#71717a] focus:outline-none focus:border-[#6366f1] transition-colors"
              disabled={isLoading}
            />
          </div>
          <motion.button
            onClick={sendMessage}
            disabled={isLoading || !input.trim()}
            className="w-12 h-12 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex items-center justify-center text-white disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </motion.button>
        </div>
        <p className="text-center text-xs text-[#71717a] mt-2">
          Press Enter to send
        </p>
      </div>
    </div>
  );
}

// Fallback responses when AI is unavailable
function generateFallbackResponse(
  userInput: string,
  questionCount: number
): { message: string; scores: Record<string, number> } {
  const input = userInput.toLowerCase();
  const scores: Record<string, number> = {};

  // Extract scores from keywords
  if (/beach|relax|chill|sun|ocean/.test(input)) {
    scores.beach = 8;
    scores.tropical = 6;
  }
  if (/culture|history|museum|art/.test(input)) {
    scores.culture = 8;
  }
  if (/adventure|hiking|nature|outdoor/.test(input)) {
    scores.adventure = 8;
  }
  if (/party|nightlife|club|bar/.test(input)) {
    scores.nightlife = 8;
  }
  if (/budget|cheap|affordable/.test(input)) {
    scores.budget = 9;
  }
  if (/luxury|splurge|premium/.test(input)) {
    scores.luxury = 9;
  }
  if (/solo|alone/.test(input)) {
    scores.solo = 8;
  }
  if (/partner|couple|romantic/.test(input)) {
    scores.romantic = 9;
  }
  if (/family|kids/.test(input)) {
    scores.family = 9;
  }

  // Generate response based on question count
  const responses = [
    "Love it! That sounds amazing. Now tell me - what's your budget vibe? Are you looking for budget-friendly adventures, mid-range comfort, or full-on luxury?",
    "Perfect choice! How long are you thinking for this trip? Quick weekend getaway, about a week, or an extended adventure?",
    "Great! What weather are you dreaming of? Hot and sunny, mild and pleasant, or cool/cold vibes?",
    "Almost there! Last question - who's joining you on this adventure? Solo trip, with a partner, friends, or family?",
    "I've got everything I need! I found your PERFECT match - click the button below to see your dream destination with exclusive deals!",
  ];

  const message = responses[Math.min(questionCount, responses.length - 1)];

  return { message, scores };
}

export default AIConversation;

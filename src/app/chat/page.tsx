'use client';

import { useState, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, Sparkles, Clock, Users } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { vibeRounds, getAIReaction, VibeImage } from '@/data/vibeImages';
import { destinations } from '@/data/destinations';
import { calculateMatches } from '@/lib/matching';
import { ImagePair } from '@/components/chat/ImagePair';
import { AIChatStrip } from '@/components/chat/AIChatStrip';

// OPTIMIZED: Only 3 rounds for fast conversion
const QUICK_ROUNDS = [0, 2, 6]; // Energy, Culture, Vibe - most decisive questions
const TOTAL_ROUNDS = 3;
const TRANSITION_DELAY = 800; // Faster transitions

// Live deal messages to create urgency
const urgencyMessages = [
  { icon: Clock, text: "Flash sale: 40% off flights ending soon!" },
  { icon: Users, text: "2,847 people found their trip today" },
  { icon: Plane, text: "Prices dropping for spring getaways" },
];

// Destination teasers shown during quiz
function DestinationTeaser({
  scores,
  roundIndex
}: {
  scores: Record<string, number>;
  roundIndex: number;
}) {
  const matches = useMemo(() => {
    if (Object.keys(scores).length === 0) return [];
    return calculateMatches(scores, destinations).slice(0, 3);
  }, [scores]);

  if (matches.length === 0 || roundIndex === 0) return null;

  const topMatch = matches[0];

  return (
    <motion.div
      className="mt-4 p-3 rounded-xl bg-gradient-to-r from-[#6366f1]/10 to-[#8b5cf6]/10 border border-[#6366f1]/20"
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src={topMatch.destination.image}
            alt={topMatch.destination.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs text-[#8b5cf6] font-medium">Your top match is forming...</p>
          <p className="text-sm text-white font-semibold truncate">
            {topMatch.destination.emoji} {topMatch.destination.name}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <div className="h-1.5 flex-1 bg-[#1a1a24] rounded-full overflow-hidden max-w-[100px]">
              <motion.div
                className="h-full bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${topMatch.matchPercent}%` }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
            </div>
            <span className="text-xs text-[#22c55e] font-bold">{topMatch.matchPercent}%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Progress bar with step labels
function QuickProgressBar({
  currentRound,
  totalRounds
}: {
  currentRound: number;
  totalRounds: number;
}) {
  const steps = ['Pick', 'Match', 'Book!'];

  return (
    <div className="w-full max-w-xs">
      <div className="flex justify-between mb-2">
        {steps.map((step, i) => (
          <span
            key={step}
            className={`text-xs font-medium transition-colors ${
              i <= currentRound ? 'text-[#6366f1]' : 'text-[#52525b]'
            }`}
          >
            {step}
          </span>
        ))}
      </div>
      <div className="h-2 bg-[#1a1a24] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${((currentRound + 1) / totalRounds) * 100}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  );
}

// Urgency banner
function UrgencyBanner() {
  const [messageIndex, setMessageIndex] = useState(0);
  const message = urgencyMessages[messageIndex];
  const Icon = message.icon;

  // Rotate messages
  useState(() => {
    const interval = setInterval(() => {
      setMessageIndex(i => (i + 1) % urgencyMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  });

  return (
    <motion.div
      key={messageIndex}
      className="flex items-center justify-center gap-2 py-2 px-4 bg-[#22c55e]/10 border-y border-[#22c55e]/20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Icon className="w-4 h-4 text-[#22c55e]" />
      <span className="text-sm text-[#22c55e] font-medium">{message.text}</span>
    </motion.div>
  );
}

// Streamlined round display
function QuickRoundDisplay({
  round,
  roundIndex,
  onSelect,
  disabled,
  scores,
}: {
  round: typeof vibeRounds[0];
  roundIndex: number;
  onSelect: (image: VibeImage) => void;
  disabled: boolean;
  scores: Record<string, number>;
}) {
  return (
    <motion.div
      className="w-full flex flex-col items-center gap-4"
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      {/* Question - bigger and bolder */}
      <motion.h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold text-white text-center px-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        {round.question}
      </motion.h2>

      {/* Category hint */}
      <motion.p
        className="text-sm text-[#6366f1] font-medium"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
      >
        Question {roundIndex + 1} of {TOTAL_ROUNDS}
      </motion.p>

      {/* Image Pair - larger */}
      <motion.div
        className="w-full px-2 sm:px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ImagePair
          imageA={round.imageA}
          imageB={round.imageB}
          onSelect={onSelect}
          disabled={disabled}
        />
      </motion.div>

      {/* Tap to select */}
      <motion.p
        className="text-sm text-[#71717a]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        Tap the one that feels right
      </motion.p>

      {/* Destination teaser - builds excitement */}
      <DestinationTeaser scores={scores} roundIndex={roundIndex} />
    </motion.div>
  );
}

export default function ChatPage() {
  const router = useRouter();

  // State
  const [currentRound, setCurrentRound] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selections, setSelections] = useState<VibeImage[]>([]);
  const [aiMessage, setAiMessage] = useState("Pick the vibe that calls to you!");
  const [isComplete, setIsComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Get the actual round data from quick rounds
  const currentVibeRound = useMemo(() => {
    if (currentRound < TOTAL_ROUNDS) {
      return vibeRounds[QUICK_ROUNDS[currentRound]];
    }
    return null;
  }, [currentRound]);

  // Handle image selection
  const handleSelection = useCallback(
    (image: VibeImage) => {
      if (isTransitioning || isComplete) return;

      setIsTransitioning(true);
      setIsAiTyping(true);

      // Update scores
      const newScores = { ...scores };
      Object.entries(image.scores).forEach(([key, value]) => {
        newScores[key] = (newScores[key] || 0) + value;
      });
      setScores(newScores);

      // Track selection
      setSelections((prev) => [...prev, image]);

      // Quick AI reaction
      setTimeout(() => {
        setIsAiTyping(false);
        setAiMessage(getAIReaction(image.scores));

        // Move to next round quickly
        setTimeout(() => {
          const nextRound = currentRound + 1;

          if (nextRound >= TOTAL_ROUNDS) {
            // Quiz complete - calculate and show results
            completeQuiz(newScores);
          } else {
            setCurrentRound(nextRound);
            setIsTransitioning(false);

            // Exciting progression messages
            if (nextRound === 1) {
              setAiMessage("Great choice! One more...");
            } else if (nextRound === 2) {
              setAiMessage("Almost there! Final pick...");
            }
          }
        }, TRANSITION_DELAY);
      }, 400);
    },
    [currentRound, scores, isTransitioning, isComplete]
  );

  // Complete quiz and redirect
  const completeQuiz = useCallback(
    (finalScores: Record<string, number>) => {
      setIsComplete(true);
      setAiMessage("Found your perfect match! Loading deals...");

      // Calculate matches
      const matches = calculateMatches(finalScores, destinations);

      // Store results
      sessionStorage.setItem(
        'travelResults',
        JSON.stringify({
          matches: matches.slice(0, 3),
          scores: finalScores,
          timestamp: new Date().toISOString(),
        })
      );

      // Quick redirect to results
      setTimeout(() => {
        router.push('/result');
      }, 1500);
    },
    [router]
  );

  return (
    <div className="min-h-screen-safe bg-[#0a0a0f] flex flex-col">
      {/* Urgency banner at top */}
      <UrgencyBanner />

      {/* Compact header */}
      <header className="sticky top-0 z-50 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/5">
        <Container>
          <div className="flex items-center justify-between h-14 gap-4">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <span className="text-lg font-bold gradient-text">ClickOrSkip</span>
            </Link>

            {/* Progress */}
            <QuickProgressBar currentRound={currentRound} totalRounds={TOTAL_ROUNDS} />
          </div>
        </Container>
      </header>

      {/* Main content */}
      <main className="flex-1 py-6 sm:py-8 overflow-y-auto flex flex-col items-center justify-center">
        <Container className="max-w-xl">
          <AnimatePresence mode="wait">
            {!isComplete && currentVibeRound && (
              <QuickRoundDisplay
                key={`round-${currentRound}`}
                round={currentVibeRound}
                roundIndex={currentRound}
                onSelect={handleSelection}
                disabled={isTransitioning}
                scores={scores}
              />
            )}

            {isComplete && (
              <motion.div
                key="complete"
                className="flex flex-col items-center justify-center py-8"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <motion.div
                  className="w-20 h-20 mb-6 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex items-center justify-center"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  <Sparkles className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-white mb-2">Perfect Match Found!</h2>
                <p className="text-[#a1a1aa] text-center mb-4">
                  Loading exclusive deals for you...
                </p>
                <motion.div
                  className="flex items-center gap-2 text-[#22c55e]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-medium">Checking live prices...</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </main>

      {/* AI Chat Strip - Fixed at bottom */}
      <div className="sticky bottom-0 left-0 right-0 z-50 p-3 sm:p-4 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/95 to-transparent">
        <AIChatStrip message={aiMessage} isTyping={isAiTyping} />
      </div>
    </div>
  );
}

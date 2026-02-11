'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import { vibeRounds, getAIReaction, getRandomWildcard, VibeImage } from '@/data/vibeImages';
import { destinations } from '@/data/destinations';
import { calculateMatches } from '@/lib/matching';
import { ImagePair } from '@/components/chat/ImagePair';
import { AIChatStrip } from '@/components/chat/AIChatStrip';

// Constants
const TOTAL_ROUNDS = 8;
const WILDCARD_ROUND = 8; // Index 8 = wildcard (after 0-7 regular rounds)
const TRANSITION_DELAY = 1500; // ms before next round
const WILDCARD_TIME_LIMIT = 5; // seconds

// Progress Indicator Component (inline since it's simple)
function ProgressIndicator({
  currentRound,
  totalRounds,
}: {
  currentRound: number;
  totalRounds: number;
}) {
  return (
    <div className="flex items-center gap-1.5 sm:gap-2">
      {/* Regular round dots */}
      {Array.from({ length: totalRounds }).map((_, index) => (
        <motion.div
          key={index}
          className={`rounded-full transition-all duration-300 ${
            index < currentRound
              ? 'bg-[#6366f1] w-2 h-2 sm:w-2.5 sm:h-2.5'
              : index === currentRound
              ? 'bg-[#6366f1] w-3 h-3 sm:w-4 sm:h-4 ring-2 ring-[#6366f1]/30'
              : 'bg-[#27272a] w-2 h-2 sm:w-2.5 sm:h-2.5'
          }`}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.05 }}
        />
      ))}

      {/* Wildcard indicator (star) */}
      <div className="w-1" />
      <motion.div
        className={`flex items-center justify-center rounded-full transition-all duration-300 ${
          currentRound >= totalRounds
            ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] w-4 h-4 sm:w-5 sm:h-5'
            : 'bg-[#27272a] w-3 h-3 sm:w-4 sm:h-4'
        }`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: totalRounds * 0.05 }}
      >
        <span className={`text-xs ${currentRound >= totalRounds ? 'text-white' : 'text-[#52525b]'}`}>
          *
        </span>
      </motion.div>
    </div>
  );
}

// Vibe Round Component (inline for direct control)
function VibeRoundDisplay({
  round,
  onSelect,
  disabled,
}: {
  round: typeof vibeRounds[0];
  onSelect: (image: VibeImage) => void;
  disabled: boolean;
}) {
  return (
    <motion.div
      className="w-full flex flex-col items-center gap-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Category Badge */}
      <motion.div
        className="inline-block px-4 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/30"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-xs sm:text-sm font-medium text-[#6366f1]">
          {round.category}
        </span>
      </motion.div>

      {/* Question */}
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        {round.question}
      </motion.h2>

      {/* Image Pair */}
      <motion.div
        className="w-full px-4"
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

      {/* Tap hint */}
      <motion.p
        className="text-sm text-[#71717a] text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Tap the image that speaks to you
      </motion.p>
    </motion.div>
  );
}

// Wildcard Round Component
function WildcardRoundDisplay({
  onSelect,
  onTimeout,
  timeLimit = WILDCARD_TIME_LIMIT,
}: {
  onSelect: (image: VibeImage) => void;
  onTimeout: () => void;
  timeLimit?: number;
}) {
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [selectedImage, setSelectedImage] = useState<VibeImage | null>(null);
  const [wildcardOptions] = useState<VibeImage[]>(() => {
    // Generate 4 random wildcard images on mount
    const options: VibeImage[] = [];
    for (let i = 0; i < 4; i++) {
      options.push(getRandomWildcard());
    }
    return options;
  });

  // Countdown timer
  useEffect(() => {
    if (selectedImage) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedImage, onTimeout]);

  const handleSelect = useCallback(
    (image: VibeImage) => {
      if (selectedImage) return;
      setSelectedImage(image);
      onSelect(image);
    },
    [selectedImage, onSelect]
  );

  const progress = (timeLeft / timeLimit) * 100;

  return (
    <motion.div
      className="w-full flex flex-col items-center gap-6"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4 }}
    >
      {/* Wildcard Badge */}
      <motion.div
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20 border border-[#6366f1]/40"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <span className="text-lg">*</span>
        <span className="text-sm font-semibold text-[#a78bfa]">WILDCARD ROUND</span>
        <span className="text-lg">*</span>
      </motion.div>

      {/* Title */}
      <motion.h2
        className="text-xl sm:text-2xl md:text-3xl font-bold text-white text-center px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
      >
        Quick! Pick one before time runs out!
      </motion.h2>

      {/* Timer Bar */}
      <div className="w-full max-w-md px-4">
        <div className="relative h-2 bg-[#1a1a24] rounded-full overflow-hidden">
          <motion.div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-full"
            initial={{ width: '100%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        <div className="flex justify-center mt-2">
          <motion.span
            className={`text-2xl font-bold ${timeLeft <= 2 ? 'text-red-500' : 'text-[#6366f1]'}`}
            animate={timeLeft <= 2 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.3, repeat: timeLeft <= 2 ? Infinity : 0 }}
          >
            {timeLeft}s
          </motion.span>
        </div>
      </div>

      {/* Image Grid - 2x2 */}
      <motion.div
        className="w-full max-w-lg px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="grid grid-cols-2 gap-3">
          {wildcardOptions.map((image, index) => (
            <motion.button
              key={`${image.id}-${index}`}
              className={`relative aspect-square rounded-xl sm:rounded-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 focus:ring-offset-[#0a0a0f] ${
                selectedImage && selectedImage.id !== image.id ? 'opacity-40' : ''
              }`}
              onClick={() => handleSelect(image)}
              disabled={!!selectedImage}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                ...(selectedImage?.id === image.id ? { scale: 1.05 } : {}),
              }}
              transition={{ delay: 0.1 * index, duration: 0.3 }}
              whileHover={!selectedImage ? { scale: 1.05 } : {}}
              whileTap={!selectedImage ? { scale: 0.95 } : {}}
            >
              {/* Image */}
              <img
                src={image.url}
                alt={image.alt}
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Vibe Label */}
              <div className="absolute bottom-2 left-2 right-2">
                <span className="text-xs sm:text-sm font-medium text-white line-clamp-1">
                  {image.vibe}
                </span>
              </div>

              {/* Selected indicator */}
              {selectedImage?.id === image.id && (
                <motion.div
                  className="absolute inset-0 border-4 border-[#6366f1] rounded-xl sm:rounded-2xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                />
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ChatPage() {
  const router = useRouter();

  // State
  const [currentRound, setCurrentRound] = useState(0); // 0-7 = regular, 8 = wildcard
  const [scores, setScores] = useState<Record<string, number>>({});
  const [selections, setSelections] = useState<VibeImage[]>([]);
  const [aiMessage, setAiMessage] = useState("Let's find your perfect escape! What calls to you?");
  const [isComplete, setIsComplete] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAiTyping, setIsAiTyping] = useState(false);

  // Handle image selection for regular rounds
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

      // Show AI reaction after brief delay
      setTimeout(() => {
        setIsAiTyping(false);
        setAiMessage(getAIReaction(image.scores));

        // Move to next round after delay
        setTimeout(() => {
          const nextRound = currentRound + 1;

          if (nextRound > WILDCARD_ROUND) {
            // All rounds complete - calculate results
            completeQuiz(newScores);
          } else {
            setCurrentRound(nextRound);
            setIsTransitioning(false);

            // Set appropriate AI message for next round
            if (nextRound === WILDCARD_ROUND) {
              setAiMessage('One last thing... Bonus round!');
            } else if (nextRound < TOTAL_ROUNDS) {
              const nextQuestion = vibeRounds[nextRound].question;
              setAiMessage(nextQuestion);
            }
          }
        }, TRANSITION_DELAY);
      }, 500);
    },
    [currentRound, scores, isTransitioning, isComplete]
  );

  // Handle wildcard selection
  const handleWildcardSelect = useCallback(
    (image: VibeImage) => {
      if (isComplete) return;

      setIsAiTyping(true);

      // Update scores with wildcard selection
      const newScores = { ...scores };
      Object.entries(image.scores).forEach(([key, value]) => {
        newScores[key] = (newScores[key] || 0) + value;
      });
      setScores(newScores);
      setSelections((prev) => [...prev, image]);

      setTimeout(() => {
        setIsAiTyping(false);
        setAiMessage(getAIReaction(image.scores));

        setTimeout(() => {
          completeQuiz(newScores);
        }, TRANSITION_DELAY);
      }, 500);
    },
    [scores, isComplete]
  );

  // Handle wildcard timeout
  const handleWildcardTimeout = useCallback(() => {
    if (isComplete) return;

    setAiMessage("Time's up! Let me see what we've got...");
    setTimeout(() => {
      completeQuiz(scores);
    }, TRANSITION_DELAY);
  }, [scores, isComplete]);

  // Complete quiz and redirect
  const completeQuiz = useCallback(
    (finalScores: Record<string, number>) => {
      setIsComplete(true);
      setAiMessage("I've found your perfect destinations! Let me show you...");

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

      // Redirect after short delay
      setTimeout(() => {
        router.push('/result');
      }, 2000);
    },
    [router]
  );

  const isWildcardRound = currentRound === WILDCARD_ROUND;
  const currentVibeRound = currentRound < TOTAL_ROUNDS ? vibeRounds[currentRound] : null;

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

            {/* Progress indicator */}
            <ProgressIndicator currentRound={currentRound} totalRounds={TOTAL_ROUNDS} />
          </div>
        </Container>
      </header>

      {/* Main content area */}
      <main className="flex-1 pt-24 pb-32 overflow-y-auto flex flex-col items-center justify-center">
        <Container className="max-w-2xl">
          <AnimatePresence mode="wait">
            {!isComplete && !isWildcardRound && currentVibeRound && (
              <VibeRoundDisplay
                key={`round-${currentRound}`}
                round={currentVibeRound}
                onSelect={handleSelection}
                disabled={isTransitioning}
              />
            )}

            {!isComplete && isWildcardRound && (
              <WildcardRoundDisplay
                key="wildcard"
                onSelect={handleWildcardSelect}
                onTimeout={handleWildcardTimeout}
                timeLimit={WILDCARD_TIME_LIMIT}
              />
            )}

            {isComplete && (
              <motion.div
                key="complete"
                className="flex flex-col items-center justify-center py-12"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.div
                  className="w-16 h-16 mb-6 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] flex items-center justify-center"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                >
                  <span className="text-2xl text-white">*</span>
                </motion.div>
                <p className="text-lg text-[#a1a1aa] text-center">
                  Finding your perfect destinations...
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Container>
      </main>

      {/* AI Chat Strip - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/95 to-transparent">
        <AIChatStrip message={aiMessage} isTyping={isAiTyping} />
      </div>
    </div>
  );
}

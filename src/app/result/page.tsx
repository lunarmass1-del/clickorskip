'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, RefreshCw, Sparkles, Share2, Copy, Check, TrendingUp, Clock, Zap, Plane, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import DestinationCard from '@/components/result/DestinationCard';
import CTAButtons from '@/components/result/CTAButtons';
import ShareButtons from '@/components/result/ShareButtons';
import { DestinationMatch } from '@/types';
import { affiliateLinks } from '@/data/affiliateLinks';

interface StoredResults {
  matches: DestinationMatch[];
  scores: Record<string, number>;
  timestamp: string;
}

// Human-readable labels for vibe categories
const vibeLabels: Record<string, { label: string; emoji: string }> = {
  beach: { label: 'Beach Lover', emoji: '🏖️' },
  culture: { label: 'Culture Seeker', emoji: '🏛️' },
  adventure: { label: 'Adventure Spirit', emoji: '🧗' },
  nightlife: { label: 'Night Owl', emoji: '🌙' },
  food: { label: 'Foodie', emoji: '🍜' },
  budget: { label: 'Budget Savvy', emoji: '💰' },
  luxury: { label: 'Luxury Lover', emoji: '✨' },
  tropical: { label: 'Tropical Dreamer', emoji: '🌴' },
  cold: { label: 'Winter Wonderer', emoji: '❄️' },
  short: { label: 'Quick Escaper', emoji: '⚡' },
  long: { label: 'Extended Explorer', emoji: '🗺️' },
  solo: { label: 'Solo Wanderer', emoji: '🎒' },
  romantic: { label: 'Romance Seeker', emoji: '💕' },
  family: { label: 'Family Fun', emoji: '👨‍👩‍👧‍👦' },
};

// Get top N vibe categories from scores
function getTopVibes(scores: Record<string, number>, count: number = 3) {
  return Object.entries(scores)
    .filter(([key]) => vibeLabels[key])
    .sort((a, b) => b[1] - a[1])
    .slice(0, count)
    .map(([key, score]) => ({
      key,
      score,
      ...vibeLabels[key],
    }));
}

// Compact Vibe Profile (inline)
function VibeProfileCompact({ vibes }: { vibes: { key: string; score: number; label: string; emoji: string }[] }) {
  return (
    <motion.div
      className="flex flex-wrap justify-center gap-2 mb-6"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {vibes.map((vibe) => (
        <span
          key={vibe.key}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#1a1a24] border border-white/10 text-sm"
        >
          <span>{vibe.emoji}</span>
          <span className="text-white font-medium">{vibe.label}</span>
        </span>
      ))}
    </motion.div>
  );
}

// Other matches preview - compact
function OtherMatchCard({ match, onClick }: { match: DestinationMatch; onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="card overflow-hidden cursor-pointer group text-left w-full"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="h-28 bg-cover bg-center relative rounded-xl overflow-hidden"
        style={{ backgroundImage: `url(${match.destination.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div>
            <span className="text-lg mr-1">{match.destination.emoji}</span>
            <span className="font-semibold text-white text-shadow">{match.destination.name}</span>
          </div>
          <span className="text-sm font-bold text-[#22c55e]">
            {match.matchPercent}%
          </span>
        </div>
      </div>
    </motion.button>
  );
}

// Share Results button
function ShareResultsButton({
  topMatch,
  vibes
}: {
  topMatch: DestinationMatch;
  vibes: { label: string; emoji: string }[]
}) {
  const [copied, setCopied] = useState(false);

  const generateShareText = () => {
    const vibeText = vibes.map(v => `${v.emoji} ${v.label}`).join(', ');
    return `My travel personality: ${vibeText}\n\nMy perfect match: ${topMatch.destination.emoji} ${topMatch.destination.name} (${topMatch.matchPercent}% match!)\n\nFind yours at ClickOrSkip!`;
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My ClickOrSkip Travel Results',
          text: generateShareText(),
          url: window.location.origin,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      try {
        await navigator.clipboard.writeText(generateShareText());
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <motion.button
      onClick={handleShare}
      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white font-medium transition-colors"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {copied ? (
        <>
          <Check className="w-5 h-5 text-[#22c55e]" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="w-5 h-5" />
          Share Results
        </>
      )}
    </motion.button>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [results, setResults] = useState<StoredResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<DestinationMatch | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('travelResults');

    if (storedResults) {
      try {
        const parsed = JSON.parse(storedResults);
        setResults(parsed);
        setSelectedMatch(parsed.matches[0]);
      } catch (error) {
        console.error('Failed to parse results:', error);
        router.push('/chat');
      }
    } else {
      router.push('/chat');
    }

    setIsLoading(false);
  }, [router]);

  const handleTryAgain = () => {
    sessionStorage.removeItem('travelResults');
    router.push('/chat');
  };

  const handleSelectMatch = (match: DestinationMatch) => {
    setSelectedMatch(match);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-[#6366f1] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
      </div>
    );
  }

  if (!results || results.matches.length === 0 || !selectedMatch) {
    return (
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#a1a1aa] mb-4">No results found</p>
          <Link href="/chat">
            <Button variant="primary">Start Over</Button>
          </Link>
        </div>
      </div>
    );
  }

  const topVibes = getTopVibes(results.scores, 3);
  const otherMatches = results.matches.filter(m => m.destination.id !== selectedMatch.destination.id);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      {/* Compact header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-white/5">
        <Container>
          <div className="flex items-center justify-between h-14">
            <Link href="/" className="flex-shrink-0">
              <span className="text-lg font-bold gradient-text">ClickOrSkip</span>
            </Link>

            <motion.button
              onClick={handleTryAgain}
              className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Try Again</span>
            </motion.button>
          </div>
        </Container>
      </header>

      {/* Main content */}
      <main className="pt-20 pb-8">
        <Container className="max-w-2xl">
          {/* Success header */}
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 mb-3"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Sparkles className="w-4 h-4 text-[#22c55e]" />
              <span className="text-sm font-medium text-[#22c55e]">Perfect Match Found!</span>
            </motion.div>
          </motion.div>

          {/* Your vibe badges */}
          <VibeProfileCompact vibes={topVibes} />

          {/* Main destination card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <DestinationCard match={selectedMatch} />
          </motion.div>

          {/* CTA Buttons - IMMEDIATE after destination */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CTAButtons destination={selectedMatch.destination} />
          </motion.div>

          {/* Other matches */}
          {otherMatches.length > 0 && (
            <motion.div
              className="mt-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="h-px flex-1 bg-white/10" />
                <h2 className="text-sm font-medium text-[#a1a1aa]">Also Great For You</h2>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {otherMatches.map((match, index) => (
                  <motion.div
                    key={match.destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + index * 0.1 }}
                  >
                    <OtherMatchCard
                      match={match}
                      onClick={() => handleSelectMatch(match)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Share + Try Again */}
          <motion.div
            className="mt-8 mb-24 sm:mb-8 space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0 }}
          >
            <ShareResultsButton topMatch={selectedMatch} vibes={topVibes} />

            <div className="flex justify-center">
              <button
                onClick={handleTryAgain}
                className="text-sm text-[#71717a] hover:text-white transition-colors flex items-center gap-1.5"
              >
                <RefreshCw size={14} />
                Start fresh with new preferences
              </button>
            </div>
          </motion.div>
        </Container>
      </main>

      {/* Sticky Mobile CTA - Fixed at bottom on mobile */}
      <motion.div
        className="fixed bottom-0 left-0 right-0 z-50 sm:hidden"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className="bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f] to-transparent pt-4 pb-2 px-4">
          <a
            href={affiliateLinks.flights.getLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold shadow-lg shadow-[#6366f1]/30"
          >
            <Plane className="w-5 h-5" />
            <span>Find Flights to {selectedMatch.destination.name}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <p className="text-center text-xs text-zinc-500 mt-2">
            Compare prices from 100+ airlines
          </p>
        </div>
      </motion.div>
    </div>
  );
}

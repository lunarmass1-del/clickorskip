'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';
import Link from 'next/link';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import DestinationCard from '@/components/result/DestinationCard';
import CTAButtons from '@/components/result/CTAButtons';
import ShareButtons from '@/components/result/ShareButtons';
import { DestinationMatch } from '@/types';

interface StoredResults {
  matches: DestinationMatch[];
  scores: Record<string, number>;
  timestamp: string;
}

// Other matches preview card
function OtherMatchCard({ match }: { match: DestinationMatch }) {
  return (
    <motion.div
      className="card overflow-hidden cursor-pointer group"
      whileHover={{ y: -4, scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="h-32 bg-cover bg-center relative mb-4 rounded-xl overflow-hidden"
        style={{ backgroundImage: `url(${match.destination.image})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
          <div>
            <span className="text-lg mr-2">{match.destination.emoji}</span>
            <span className="font-semibold text-shadow">{match.destination.name}</span>
          </div>
          <span className="text-sm font-bold text-[#22c55e]">
            {match.matchPercent}%
          </span>
        </div>
      </div>
      <p className="text-sm text-[#a1a1aa] line-clamp-2">{match.destination.tagline}</p>
    </motion.div>
  );
}

export default function ResultPage() {
  const router = useRouter();
  const [results, setResults] = useState<StoredResults | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Read results from sessionStorage
    const storedResults = sessionStorage.getItem('travelResults');

    if (storedResults) {
      try {
        const parsed = JSON.parse(storedResults);
        setResults(parsed);
      } catch (error) {
        console.error('Failed to parse results:', error);
        router.push('/chat');
      }
    } else {
      // No results found, redirect to chat
      router.push('/chat');
    }

    setIsLoading(false);
  }, [router]);

  const handleTryAgain = () => {
    sessionStorage.removeItem('travelResults');
    router.push('/chat');
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

  if (!results || results.matches.length === 0) {
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

  const topMatch = results.matches[0];
  const otherMatches = results.matches.slice(1);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
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

            {/* Start Over button */}
            <motion.button
              onClick={handleTryAgain}
              className="flex items-center gap-2 text-sm text-[#a1a1aa] hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <RefreshCw size={16} />
              <span className="hidden sm:inline">Start Over</span>
            </motion.button>
          </div>
        </Container>
      </header>

      {/* Main content */}
      <main className="pt-24 pb-16">
        <Container className="max-w-2xl">
          {/* Success header */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 mb-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
            >
              <Sparkles className="w-4 h-4 text-[#22c55e]" />
              <span className="text-sm text-[#22c55e]">We Found Your Perfect Match!</span>
            </motion.div>
          </motion.div>

          {/* Main destination card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <DestinationCard match={topMatch} />
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="mt-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <CTAButtons destination={topMatch.destination} />
          </motion.div>

          {/* Other matches */}
          {otherMatches.length > 0 && (
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="h-px flex-1 bg-white/10" />
                <h2 className="text-lg font-semibold text-[#a1a1aa]">Other Great Matches</h2>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                {otherMatches.map((match, index) => (
                  <motion.div
                    key={match.destination.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                  >
                    <OtherMatchCard match={match} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Share section */}
          <motion.div
            className="mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="h-px flex-1 bg-white/10" />
              <h2 className="text-lg font-semibold text-[#a1a1aa]">Share Your Result</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <ShareButtons destination={topMatch.destination} matchPercent={topMatch.matchPercent} />
          </motion.div>

          {/* Try again button */}
          <motion.div
            className="mt-12 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
          >
            <Button variant="secondary" onClick={handleTryAgain} className="gap-2">
              <RefreshCw size={18} />
              Try Again
            </Button>
          </motion.div>
        </Container>
      </main>
    </div>
  );
}

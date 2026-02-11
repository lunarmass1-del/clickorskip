'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Twitter, Facebook, Link2, Check, Share2 } from 'lucide-react';
import { Destination } from '@/types';

interface ShareButtonsProps {
  destination: Destination;
  matchPercent: number;
}

export default function ShareButtons({ destination, matchPercent }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const [showNativeShare, setShowNativeShare] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.origin : 'https://clickorskip.online';
  const shareText = `I just found my perfect travel match: ${destination.name} (${matchPercent}% match)! Find yours at ClickOrSkip`;
  const hashtags = 'travel,wanderlust,vacation';

  // Check if native share is available
  const canNativeShare = typeof navigator !== 'undefined' && navigator.share;

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}&hashtags=${hashtags}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(`${shareText} - ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleNativeShare = async () => {
    if (canNativeShare) {
      try {
        await navigator.share({
          title: 'My ClickOrSkip Result',
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        // User cancelled or error
        console.log('Share cancelled');
      }
    }
  };

  return (
    <div className="flex items-center justify-center gap-3">
      {/* Native share button (mobile) */}
      {canNativeShare && (
        <motion.button
          onClick={handleNativeShare}
          className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1a1a24] border border-white/10 text-[#a1a1aa] hover:text-white hover:border-[#6366f1]/50 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          title="Share"
        >
          <Share2 className="w-5 h-5" />
        </motion.button>
      )}

      {/* Twitter */}
      <motion.button
        onClick={handleTwitterShare}
        className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1a1a24] border border-white/10 text-[#a1a1aa] hover:text-[#1DA1F2] hover:border-[#1DA1F2]/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Share on Twitter"
      >
        <Twitter className="w-5 h-5" />
      </motion.button>

      {/* Facebook */}
      <motion.button
        onClick={handleFacebookShare}
        className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1a1a24] border border-white/10 text-[#a1a1aa] hover:text-[#4267B2] hover:border-[#4267B2]/50 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Share on Facebook"
      >
        <Facebook className="w-5 h-5" />
      </motion.button>

      {/* Copy Link */}
      <motion.button
        onClick={handleCopyLink}
        className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#1a1a24] border border-white/10 text-[#a1a1aa] hover:text-white hover:border-white/20 transition-colors relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        title="Copy link"
      >
        <AnimatePresence mode="wait">
          {copied ? (
            <motion.div
              key="check"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Check className="w-5 h-5 text-[#22c55e]" />
            </motion.div>
          ) : (
            <motion.div
              key="link"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
            >
              <Link2 className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Copied tooltip */}
      <AnimatePresence>
        {copied && (
          <motion.div
            className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 rounded-lg bg-[#22c55e] text-white text-sm font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Copied!
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

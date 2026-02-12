'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plane, Mail, Gift, ArrowRight } from 'lucide-react';

interface EmailCaptureProps {
  delay?: number; // Delay in ms before showing
  trigger?: 'delay' | 'scroll' | 'exit'; // When to trigger
}

export function EmailCapture({ delay = 5000, trigger = 'delay' }: EmailCaptureProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if already dismissed or subscribed
    const dismissed = localStorage.getItem('emailPopupDismissed');
    const subscribed = localStorage.getItem('emailSubscribed');

    if (dismissed || subscribed) return;

    if (trigger === 'delay') {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      return () => clearTimeout(timer);
    }

    if (trigger === 'scroll') {
      const handleScroll = () => {
        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        if (scrollPercent > 50) {
          setIsVisible(true);
          window.removeEventListener('scroll', handleScroll);
        }
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }

    if (trigger === 'exit') {
      const handleMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setIsVisible(true);
          document.removeEventListener('mouseleave', handleMouseLeave);
        }
      };
      document.addEventListener('mouseleave', handleMouseLeave);
      return () => document.removeEventListener('mouseleave', handleMouseLeave);
    }
  }, [delay, trigger]);

  const handleClose = () => {
    setIsVisible(false);
    localStorage.setItem('emailPopupDismissed', Date.now().toString());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;

    setIsLoading(true);

    // Store email locally for now
    // TODO: Connect to Mailchimp/Brevo API later
    try {
      const emails = JSON.parse(localStorage.getItem('collectedEmails') || '[]');
      emails.push({
        email,
        timestamp: new Date().toISOString(),
        source: 'popup'
      });
      localStorage.setItem('collectedEmails', JSON.stringify(emails));
      localStorage.setItem('emailSubscribed', 'true');

      setIsSubmitted(true);

      // Close after showing success
      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } catch (error) {
      console.error('Failed to save email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 sm:inset-auto sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 sm:max-w-md sm:w-full z-50"
          >
            <div className="bg-gradient-to-br from-[#12121a] to-[#1a1a24] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-[#71717a] hover:text-white transition-colors z-10"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <>
                  {/* Header with gradient */}
                  <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] p-6 text-center">
                    <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
                      <Gift className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      Get Exclusive Flight Deals
                    </h3>
                    <p className="text-white/80 text-sm">
                      Up to 50% off flights, sent directly to your inbox
                    </p>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Benefits */}
                    <ul className="space-y-2 mb-5 text-sm">
                      <li className="flex items-center gap-2 text-[#a1a1aa]">
                        <Plane className="w-4 h-4 text-[#22c55e]" />
                        <span>Early access to flash sales</span>
                      </li>
                      <li className="flex items-center gap-2 text-[#a1a1aa]">
                        <Mail className="w-4 h-4 text-[#22c55e]" />
                        <span>Weekly deals roundup (no spam)</span>
                      </li>
                      <li className="flex items-center gap-2 text-[#a1a1aa]">
                        <Gift className="w-4 h-4 text-[#22c55e]" />
                        <span>Exclusive subscriber-only discounts</span>
                      </li>
                    </ul>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="w-full px-4 py-3 rounded-xl bg-[#0a0a0f] border border-white/10 text-white placeholder-[#71717a] focus:outline-none focus:border-[#6366f1] transition-colors"
                      />
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        {isLoading ? (
                          'Subscribing...'
                        ) : (
                          <>
                            Get Free Deals
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </form>

                    <p className="text-xs text-[#52525b] text-center mt-3">
                      No spam, ever. Unsubscribe anytime.
                    </p>
                  </div>
                </>
              ) : (
                /* Success State */
                <div className="p-8 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#22c55e]/20 flex items-center justify-center"
                  >
                    <svg className="w-8 h-8 text-[#22c55e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">You're In!</h3>
                  <p className="text-[#a1a1aa]">
                    Check your inbox for exclusive deals starting this week.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default EmailCapture;

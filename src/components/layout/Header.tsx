'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';

interface HeaderProps {
  progress?: number;
  totalSteps?: number;
}

export function Header({ progress, totalSteps = 6 }: HeaderProps) {
  const pathname = usePathname();
  const isLanding = pathname === '/';
  const isChatPage = pathname === '/chat';

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-bg-primary/80 backdrop-blur-xl border-b border-white/5"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <Container>
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Left side */}
          <div className="flex items-center gap-4">
            {!isLanding && (
              <Link href="/">
                <motion.button
                  className="flex items-center justify-center w-10 h-10 rounded-xl bg-bg-tertiary border border-white/5 text-text-secondary hover:text-text-primary hover:border-white/10 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ArrowLeft size={20} />
                </motion.button>
              </Link>
            )}

            {/* Logo */}
            <Link href="/">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ scale: 1.02 }}
              >
                <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-accent-primary via-accent-secondary to-accent-pink bg-clip-text text-transparent">
                  ClickOrSkip
                </span>
              </motion.div>
            </Link>
          </div>

          {/* Center - Progress (only on chat page) */}
          {isChatPage && progress !== undefined && (
            <div className="hidden sm:flex flex-col items-center gap-1">
              <span className="text-xs text-text-muted">
                Question {progress} of {totalSteps}
              </span>
              <div className="w-32 h-1.5 bg-bg-tertiary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(progress / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                />
              </div>
            </div>
          )}

          {/* Right side */}
          <div className="flex items-center gap-3">
            {isLanding && (
              <Link href="/chat">
                <Button variant="primary" size="sm">
                  Start Chat
                </Button>
              </Link>
            )}
          </div>
        </div>
      </Container>
    </motion.header>
  );
}

export default Header;

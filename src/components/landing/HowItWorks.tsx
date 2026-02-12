'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Plane } from 'lucide-react';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { affiliateLinks } from '@/data/affiliateLinks';

interface Step {
  icon: string;
  title: string;
  description: string;
  color: string;
}

const steps: Step[] = [
  {
    icon: '💬',
    title: 'Chat',
    description: 'Answer 6 quick questions about your travel preferences and vibe.',
    color: 'from-travel-tropical to-accent-primary',
  },
  {
    icon: '🎯',
    title: 'Match',
    description: 'Our AI analyzes thousands of destinations to find your perfect spot.',
    color: 'from-accent-primary to-accent-secondary',
  },
  {
    icon: '✈️',
    title: 'Book',
    description: 'Get the best deals on flights and hotels, all in one place.',
    color: 'from-accent-secondary to-accent-pink',
  },
];

export function HowItWorks() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as const,
      },
    },
  };

  return (
    <section className="py-20 md:py-28 bg-bg-primary">
      <Container>
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-text-primary mb-4">
            How It Works
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Three simple steps to your dream destination
          </p>
        </motion.div>

        {/* Steps grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {steps.map((step, index) => (
            <motion.div key={step.title} variants={itemVariants}>
              <Card
                hover
                className="h-full relative overflow-hidden group"
                padding="lg"
              >
                {/* Step number */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-bg-tertiary flex items-center justify-center">
                  <span className="text-sm font-medium text-text-muted">
                    {index + 1}
                  </span>
                </div>

                {/* Icon with gradient background */}
                <motion.div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-3xl">{step.icon}</span>
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {step.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {step.description}
                </p>

                {/* Subtle gradient line at bottom on hover */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Section - No dead ends */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className="text-text-muted text-sm mb-4">Ready to get started?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA - Quiz */}
            <Link href="/chat">
              <Button variant="primary" size="lg">
                <span>Start Now</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>

            {/* Secondary CTA - Direct to flights */}
            <a
              href={affiliateLinks.flights.getLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-travel-tropical/10 border border-travel-tropical/30 text-travel-tropical font-medium hover:bg-travel-tropical/20 transition-all duration-300 cursor-pointer"
            >
              <Plane className="w-4 h-4" />
              Or search flights directly
            </a>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}

export default HowItWorks;

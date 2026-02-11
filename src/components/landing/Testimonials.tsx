'use client';

import { motion } from 'framer-motion';
import Container from '@/components/ui/Container';
import Card from '@/components/ui/Card';

interface Testimonial {
  name: string;
  age: number;
  location: string;
  rating: number;
  text: string;
  avatar: string;
  destination: string;
}

const testimonials: Testimonial[] = [
  {
    name: 'Sarah Chen',
    age: 28,
    location: 'San Francisco',
    rating: 5,
    text: 'I was totally overwhelmed trying to plan my honeymoon. ClickOrSkip matched us with Santorini in literally one minute. Best trip of our lives!',
    avatar: 'SC',
    destination: 'Santorini',
  },
  {
    name: 'Marcus Johnson',
    age: 34,
    location: 'London',
    rating: 5,
    text: 'As a solo traveler, I never know where to go next. This app understood my adventure-seeking side and sent me to New Zealand. Absolutely incredible.',
    avatar: 'MJ',
    destination: 'New Zealand',
  },
  {
    name: 'Emma Rodriguez',
    age: 26,
    location: 'Miami',
    rating: 5,
    text: 'The AI actually gets what you want. I said "beach but not boring" and it suggested Tulum. Perfect match - cenotes, ruins, AND amazing beaches!',
    avatar: 'ER',
    destination: 'Tulum',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <span
          key={i}
          className={i < rating ? 'text-travel-sunset' : 'text-text-muted/30'}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export function Testimonials() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
            Loved by Travelers
          </h2>
          <p className="text-lg text-text-secondary max-w-xl mx-auto">
            Join thousands who found their perfect getaway
          </p>
        </motion.div>

        {/* Testimonials grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {testimonials.map((testimonial) => (
            <motion.div key={testimonial.name} variants={itemVariants}>
              <Card hover className="h-full" padding="lg">
                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Quote */}
                <p className="text-text-primary leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </p>

                {/* Author info */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent-primary to-accent-secondary flex items-center justify-center text-white font-semibold text-sm">
                    {testimonial.avatar}
                  </div>

                  <div>
                    <p className="font-medium text-text-primary">
                      {testimonial.name}, {testimonial.age}
                    </p>
                    <p className="text-sm text-text-muted">
                      {testimonial.location} → {testimonial.destination}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  );
}

export default Testimonials;

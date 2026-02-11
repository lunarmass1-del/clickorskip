'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, MessageCircle, Target, Plane, Star, MapPin, ArrowRight, Quote } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { destinations } from '@/data/destinations';

// Animation variants
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// Hero Section
function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-[#12121a] to-[#0a0a0f]" />

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#6366f1]/10 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8b5cf6]/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial="initial"
          animate="animate"
          variants={staggerContainer}
        >
          {/* Badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a24] border border-white/10 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[#6366f1]" />
            <span className="text-sm text-[#a1a1aa]">AI-Powered Travel Matching</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
          >
            <span className="font-heading">Find Your Perfect</span>
            <br />
            <span className="gradient-text font-heading">Escape in 60 Seconds</span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-[#a1a1aa] mb-10 max-w-2xl mx-auto"
          >
            Our AI travel buddy asks a few quick questions and matches you with your dream destination. Free, fun, and takes less than a minute!
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeInUp} className="mb-12">
            <Link href="/chat">
              <Button variant="primary" size="lg" className="text-lg px-10 py-5">
                <Sparkles className="w-5 h-5" />
                Start Chatting
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center gap-8 text-sm"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#6366f1]" />
              <span className="text-[#a1a1aa]">50,000+ trips matched</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-[#f97316]" />
              <span className="text-[#a1a1aa]">4.9/5 rating</span>
            </div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}

// How It Works Section
function HowItWorks() {
  const steps = [
    {
      icon: MessageCircle,
      title: 'Chat',
      description: 'Answer 6 quick questions about your travel preferences',
      color: '#6366f1',
    },
    {
      icon: Target,
      title: 'Match',
      description: 'We find your perfect destination from our curated list',
      color: '#8b5cf6',
    },
    {
      icon: Plane,
      title: 'Book',
      description: 'Get the best deals on flights and hotels instantly',
      color: '#d946ef',
    },
  ];

  return (
    <section className="section-padding bg-[#0a0a0f]">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-heading">
            How It Works
          </h2>
          <p className="text-[#a1a1aa] max-w-xl mx-auto">
            Three simple steps to your dream vacation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#6366f1]/50 to-transparent" />
              )}

              <div className="card text-center relative">
                {/* Step number */}
                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-[#1a1a24] border border-white/10 flex items-center justify-center text-sm font-bold text-[#a1a1aa]">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
                  style={{ backgroundColor: `${step.color}20` }}
                >
                  <step.icon className="w-8 h-8" style={{ color: step.color }} />
                </div>

                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-[#a1a1aa]">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Destinations Preview Section
function DestinationsPreview() {
  const featuredDestinations = destinations.slice(0, 5);

  return (
    <section className="section-padding bg-[#12121a]">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-heading">
            Popular Destinations
          </h2>
          <p className="text-[#a1a1aa] max-w-xl mx-auto">
            Not sure where to go? Let us help you discover!
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {featuredDestinations.map((dest, index) => (
            <motion.div
              key={dest.id}
              className="relative group cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <div className="aspect-[3/4] rounded-2xl overflow-hidden relative">
                <Image
                  src={dest.image}
                  alt={dest.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-2xl mb-1">{dest.emoji}</div>
                  <h3 className="font-semibold text-shadow">{dest.name}</h3>
                  <p className="text-sm text-[#a1a1aa]">{dest.country}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link href="/chat">
            <Button variant="secondary">
              Discover Your Match
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

// Testimonials Section
function Testimonials() {
  const testimonials = [
    {
      quote: "ClickOrSkip found me the perfect honeymoon spot! Santorini was everything we dreamed of and more.",
      author: "Sarah M.",
      location: "New York",
      rating: 5,
    },
    {
      quote: "I was skeptical at first, but the AI really understood what I was looking for. Bali was incredible!",
      author: "James T.",
      location: "London",
      rating: 5,
    },
    {
      quote: "As a solo traveler, I needed somewhere safe and exciting. Tokyo was the perfect recommendation!",
      author: "Emily R.",
      location: "Sydney",
      rating: 5,
    },
  ];

  return (
    <section className="section-padding bg-[#0a0a0f]">
      <Container>
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 font-heading">
            What Travelers Say
          </h2>
          <p className="text-[#a1a1aa] max-w-xl mx-auto">
            Join thousands of happy adventurers
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.author}
              className="card relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Quote className="w-8 h-8 text-[#6366f1]/30 mb-4" />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#f97316] text-[#f97316]" />
                ))}
              </div>

              <p className="text-[#a1a1aa] mb-6 italic">&quot;{testimonial.quote}&quot;</p>

              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-[#71717a]">{testimonial.location}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}

// Final CTA Section
function FinalCTA() {
  return (
    <section className="section-padding bg-[#12121a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#6366f1]/10 rounded-full blur-3xl" />
      </div>

      <Container className="relative z-10">
        <motion.div
          className="text-center max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 font-heading">
            Ready to Find Your
            <br />
            <span className="gradient-text">Perfect Destination?</span>
          </h2>
          <p className="text-lg text-[#a1a1aa] mb-10 max-w-xl mx-auto">
            Join over 50,000 travelers who found their dream vacation with ClickOrSkip. It only takes 60 seconds!
          </p>
          <Link href="/chat">
            <Button variant="primary" size="lg" className="text-lg px-12 py-5">
              <Sparkles className="w-5 h-5" />
              Start Now - It&apos;s Free
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 bg-[#0a0a0f] border-t border-white/5">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-sm text-[#71717a]">
            &copy; 2026 ClickOrSkip. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-sm text-[#71717a]">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Header />
      <Hero />
      <HowItWorks />
      <DestinationsPreview />
      <Testimonials />
      <FinalCTA />
      <Footer />
    </main>
  );
}

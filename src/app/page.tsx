'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Sparkles, MessageCircle, Target, Plane, Star, MapPin, ArrowRight, Quote, ExternalLink } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import Container from '@/components/ui/Container';
import Button from '@/components/ui/Button';
import { destinations } from '@/data/destinations';
import { affiliateLinks } from '@/data/affiliateLinks';

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
            className="text-lg sm:text-xl text-[#a1a1aa] mb-8 max-w-2xl mx-auto"
          >
            Pick 3 images. Get your perfect destination. Book at the best prices. It&apos;s that simple!
          </motion.p>

          {/* CTA Button */}
          <motion.div variants={fadeInUp} className="mb-6">
            <Link href="/chat">
              <motion.div
                className="inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button variant="primary" size="lg" className="text-lg px-10 py-5">
                  <Sparkles className="w-5 h-5" />
                  Find My Destination
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>

          {/* Secondary CTAs - Direct affiliate links */}
          <motion.div variants={fadeInUp} className="mb-6">
            <p className="text-[#71717a] text-sm mb-3">Or jump straight to deals:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href={affiliateLinks.flights.getLink()}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4] font-medium hover:bg-[#06b6d4]/20 transition-all duration-300 cursor-pointer"
              >
                <Plane className="w-4 h-4" />
                Find Cheap Flights
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href={affiliateLinks.airhelp.getLink()}
                className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] font-medium hover:bg-[#22c55e]/20 transition-all duration-300 cursor-pointer"
              >
                <span>💰</span>
                Flight Delayed? Get Compensation
              </a>
            </div>
          </motion.div>

          {/* Urgency text */}
          <motion.p
            variants={fadeInUp}
            className="text-sm text-[#22c55e] mb-10"
          >
            Flash sale: Up to 40% off flights this week
          </motion.p>

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
      title: 'Pick',
      description: 'Tap 3 images that match your vibe',
      color: '#6366f1',
    },
    {
      icon: Target,
      title: 'Match',
      description: 'AI finds your perfect destination instantly',
      color: '#8b5cf6',
    },
    {
      icon: Plane,
      title: 'Book',
      description: 'Get exclusive deals on flights & hotels',
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

        {/* CTA - No dead ends */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-[#71717a] text-sm mb-4">Ready to get started?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/chat">
              <Button variant="primary" size="lg">
                Start Now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <a
              href={affiliateLinks.flights.getLink()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4] font-medium hover:bg-[#06b6d4]/20 transition-all duration-300 cursor-pointer"
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
              className="relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
            >
              <a
                href={affiliateLinks.flights.getLink()}
                className="block cursor-pointer"
              >
                <div className="aspect-[3/4] rounded-2xl overflow-hidden relative border-2 border-transparent group-hover:border-[#6366f1]/50 transition-colors duration-300">
                  <Image
                    src={dest.image}
                    alt={dest.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-300" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="text-2xl mb-1">{dest.emoji}</div>
                    <h3 className="font-semibold text-shadow">{dest.name}</h3>
                    <p className="text-sm text-[#a1a1aa] group-hover:hidden">{dest.country}</p>
                    <p className="text-sm text-[#6366f1] font-medium hidden group-hover:flex items-center gap-1">
                      <Plane className="w-3 h-3" />
                      Find Flights
                      <ArrowRight className="w-3 h-3" />
                    </p>
                  </div>
                </div>
              </a>
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
      destination: "Santorini",
      rating: 5,
    },
    {
      quote: "I was skeptical at first, but the AI really understood what I was looking for. Bali was incredible!",
      author: "James T.",
      location: "London",
      destination: "Bali",
      rating: 5,
    },
    {
      quote: "As a solo traveler, I needed somewhere safe and exciting. Tokyo was the perfect recommendation!",
      author: "Emily R.",
      location: "Sydney",
      destination: "Tokyo",
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

              <div className="mb-4">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-[#71717a]">{testimonial.location}</p>
              </div>

              {/* CTA - Book this destination */}
              <a
                href={affiliateLinks.flights.getLink()}
                className="inline-flex items-center gap-2 text-sm text-[#6366f1] hover:text-[#8b5cf6] font-medium transition-colors duration-200 cursor-pointer group"
              >
                <Plane className="w-4 h-4" />
                <span>Book {testimonial.destination}</span>
                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-200" />
              </a>
            </motion.div>
          ))}
        </div>

        {/* Section CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <p className="text-[#71717a] text-sm mb-4">Want results like these?</p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-semibold hover:shadow-lg hover:shadow-[#6366f1]/25 transition-all duration-300 hover:scale-105 cursor-pointer"
          >
            Find My Perfect Match
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
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
          <p className="text-lg text-[#a1a1aa] mb-8 max-w-xl mx-auto">
            Join over 50,000 travelers who found their dream vacation with ClickOrSkip. It only takes 60 seconds!
          </p>

          {/* Primary CTA - Quiz */}
          <div className="mb-6">
            <Link href="/chat">
              <Button variant="primary" size="lg" className="text-lg px-12 py-5">
                <Sparkles className="w-5 h-5" />
                Start Now - It&apos;s Free
              </Button>
            </Link>
          </div>

          {/* Secondary CTA - Direct flights */}
          <div className="mb-6">
            <p className="text-[#71717a] text-sm mb-3">Already know where to go?</p>
            <a
              href={affiliateLinks.flights.getLink()}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#06b6d4]/10 border border-[#06b6d4]/30 text-[#06b6d4] font-semibold hover:bg-[#06b6d4]/20 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <Plane className="w-5 h-5" />
              Search Cheap Flights Now
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* FOMO text */}
          <p className="text-sm text-[#f97316]">
            Limited time: Get up to 40% off when you book through our partners
          </p>
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

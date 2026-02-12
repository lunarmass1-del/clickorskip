'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Plane, Clock, Users, Zap, ArrowRight, ExternalLink, Star, Shield, TrendingDown } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import Container from '@/components/ui/Container';
import { destinations } from '@/data/destinations';

// ==============================================
// HERO SECTION - IMMEDIATE HOOK WITH DEALS
// ==============================================
function Hero() {
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 47, seconds: 33 });
  const [viewers, setViewers] = useState(127);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(prev => prev + Math.floor(Math.random() * 3) - 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Top 4 deals to show immediately
  const topDeals = [
    { name: 'Bali', price: 299, oldPrice: 499, discount: 40, image: destinations[0]?.image || 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400', seats: 3 },
    { name: 'Paris', price: 399, oldPrice: 649, discount: 38, image: destinations[1]?.image || 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400', seats: 5 },
    { name: 'Tokyo', price: 549, oldPrice: 899, discount: 39, image: destinations[2]?.image || 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400', seats: 2 },
    { name: 'Cancun', price: 249, oldPrice: 449, discount: 44, image: destinations[4]?.image || 'https://images.unsplash.com/photo-1510097467424-192d713fd8b2?w=400', seats: 4 },
  ];

  return (
    <section className="relative min-h-screen bg-[#0a0a0f] pt-16 pb-8 overflow-hidden">
      {/* URGENCY BAR - First thing they see */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 py-2 px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-white text-sm font-medium">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
            </span>
            <span>FLASH SALE ENDS IN:</span>
          </div>
          <div className="flex items-center gap-1 font-mono font-bold text-lg">
            <span className="bg-black/30 px-2 py-1 rounded">{String(timeLeft.hours).padStart(2, '0')}</span>
            <span>:</span>
            <span className="bg-black/30 px-2 py-1 rounded">{String(timeLeft.minutes).padStart(2, '0')}</span>
            <span>:</span>
            <span className="bg-black/30 px-2 py-1 rounded">{String(timeLeft.seconds).padStart(2, '0')}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{viewers} people booking right now</span>
          </div>
        </div>
      </div>

      <Container className="pt-8">
        {/* Headline */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3">
            <span className="text-white">Stop Dreaming.</span>{' '}
            <span className="bg-gradient-to-r from-[#6366f1] to-[#d946ef] bg-clip-text text-transparent">Start Booking.</span>
          </h1>
          <p className="text-[#a1a1aa] text-lg">
            Up to <span className="text-[#22c55e] font-bold">50% OFF</span> flights — Prices increase at midnight
          </p>
        </div>

        {/* DEAL CARDS - Immediately visible, clickable */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {topDeals.map((deal, index) => (
            <motion.a
              key={deal.name}
              href="/go/flights"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -4 }}
            >
              {/* Image */}
              <div className="aspect-[4/5] relative">
                <Image src={deal.image} alt={deal.name} fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
              </div>

              {/* Discount badge */}
              <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                -{deal.discount}% OFF
              </div>

              {/* Seats left */}
              <div className="absolute top-2 right-2 px-2 py-1 bg-black/70 text-white text-xs rounded-full flex items-center gap-1">
                <Zap className="w-3 h-3 text-yellow-400" />
                {deal.seats} seats left
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="text-white font-bold text-lg">{deal.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-[#22c55e] font-bold text-xl">${deal.price}</span>
                  <span className="text-[#71717a] line-through text-sm">${deal.oldPrice}</span>
                </div>
                <p className="text-[#a1a1aa] text-xs">Round trip from NYC</p>

                {/* Hover CTA */}
                <div className="mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#6366f1] text-white text-sm font-semibold rounded-full">
                    Book Now <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* CTA BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
          {/* Primary - Flights */}
          <a
            href="/go/flights"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold text-lg rounded-full shadow-lg shadow-[#6366f1]/30 hover:shadow-xl hover:shadow-[#6366f1]/40 hover:scale-105 transition-all duration-300"
          >
            <Plane className="w-5 h-5" />
            Find Cheap Flights
            <ExternalLink className="w-4 h-4" />
          </a>

          {/* Secondary - Quiz */}
          <Link
            href="/chat"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 border border-white/20 text-white font-semibold rounded-full hover:bg-white/20 transition-all duration-300"
          >
            Not sure? Take the Quiz
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* AirHelp CTA */}
        <div className="text-center mb-8">
          <a
            href="/go/airhelp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] font-medium rounded-full hover:bg-[#22c55e]/20 transition-all"
          >
            <span>💰</span>
            Flight delayed? Get up to €600 compensation
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#a1a1aa]">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span>4.9/5 (12,847 reviews)</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-[#22c55e]" />
            <span>Price Match Guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-[#6366f1]" />
            <span>50,000+ happy travelers</span>
          </div>
        </div>
      </Container>
    </section>
  );
}

// ==============================================
// DEALS SECTION - More destinations, all clickable
// ==============================================
function DealsSection() {
  const [bookedToday, setBookedToday] = useState(847);

  useEffect(() => {
    const interval = setInterval(() => {
      setBookedToday(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const deals = [
    { name: 'Bali', country: 'Indonesia', price: 299, oldPrice: 499, discount: 40, seats: 3, image: destinations[0]?.image },
    { name: 'Paris', country: 'France', price: 399, oldPrice: 649, discount: 38, seats: 5, image: destinations[1]?.image },
    { name: 'Tokyo', country: 'Japan', price: 549, oldPrice: 899, discount: 39, seats: 2, image: destinations[2]?.image },
    { name: 'Barcelona', country: 'Spain', price: 349, oldPrice: 549, discount: 36, seats: 7, image: destinations[3]?.image },
    { name: 'Cancun', country: 'Mexico', price: 249, oldPrice: 449, discount: 44, seats: 4, image: destinations[4]?.image },
    { name: 'Dubai', country: 'UAE', price: 499, oldPrice: 799, discount: 38, seats: 6, image: destinations[5]?.image },
    { name: 'Rome', country: 'Italy', price: 379, oldPrice: 599, discount: 37, seats: 8, image: destinations[6]?.image },
    { name: 'Phuket', country: 'Thailand', price: 449, oldPrice: 749, discount: 40, seats: 3, image: destinations[7]?.image },
  ];

  return (
    <section className="py-12 bg-[#12121a]">
      <Container>
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">Today&apos;s Deals</h2>
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full animate-pulse">
                FLASH SALE
              </span>
            </div>
            <p className="text-[#a1a1aa]">Prices shown are round-trip. Sale ends at midnight.</p>
          </div>
          <div className="flex items-center gap-2 text-[#22c55e]">
            <Zap className="w-5 h-5" />
            <span className="font-semibold">{bookedToday} booked in the last hour</span>
          </div>
        </div>

        {/* Filter pills - all link to /go/flights */}
        <div className="flex flex-wrap gap-2 mb-6">
          {['🔥 All Deals', '🏖️ Beach', '🏙️ City', '🏔️ Adventure'].map((filter, i) => (
            <a
              key={filter}
              href="/go/flights"
              target="_blank"
              rel="noopener noreferrer"
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                i === 0
                  ? 'bg-[#6366f1] text-white'
                  : 'bg-white/5 text-[#a1a1aa] hover:bg-white/10 hover:text-white'
              }`}
            >
              {filter}
            </a>
          ))}
        </div>

        {/* Deals grid - ALL CLICKABLE */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
          {deals.map((deal, index) => (
            <motion.a
              key={deal.name}
              href="/go/flights"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative rounded-xl overflow-hidden cursor-pointer bg-[#1a1a24] border border-white/5 hover:border-[#6366f1]/50 transition-all duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
            >
              {/* Image */}
              <div className="aspect-[4/3] relative">
                <Image src={deal.image || ''} alt={deal.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a24] via-transparent to-transparent" />
              </div>

              {/* Discount badge */}
              <div className="absolute top-2 left-2 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
                -{deal.discount}%
              </div>

              {/* Seats left */}
              {deal.seats <= 5 && (
                <div className={`absolute top-2 right-2 px-2 py-1 text-white text-xs rounded-full flex items-center gap-1 ${
                  deal.seats <= 3 ? 'bg-red-500 animate-pulse' : 'bg-orange-500'
                }`}>
                  Only {deal.seats} left
                </div>
              )}

              {/* Content */}
              <div className="p-3">
                <h3 className="text-white font-bold">{deal.name}</h3>
                <p className="text-[#71717a] text-xs mb-2">{deal.country}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[#22c55e] font-bold text-lg">${deal.price}</span>
                    <span className="text-[#71717a] line-through text-sm ml-2">${deal.oldPrice}</span>
                  </div>
                  <span className="text-[#6366f1] text-sm font-medium group-hover:underline flex items-center gap-1">
                    Book <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Big CTA */}
        <div className="text-center">
          <a
            href="/go/flights"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold text-lg rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <Plane className="w-5 h-5" />
            View All 50+ Destinations
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </Container>
    </section>
  );
}

// ==============================================
// HOW IT WORKS - Brief, with CTA
// ==============================================
function HowItWorks() {
  return (
    <section className="py-12 bg-[#0a0a0f]">
      <Container>
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">How It Works</h2>
          <p className="text-[#a1a1aa]">Book your dream trip in 3 simple steps</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {[
            { icon: '🔍', title: 'Search', desc: 'Compare 100+ airlines instantly' },
            { icon: '💰', title: 'Save', desc: 'Find deals up to 50% off' },
            { icon: '✈️', title: 'Book', desc: 'Secure checkout in seconds' },
          ].map((step, i) => (
            <div key={step.title} className="text-center p-6 bg-[#1a1a24] rounded-xl border border-white/5">
              <div className="text-4xl mb-3">{step.icon}</div>
              <h3 className="text-white font-bold text-lg mb-1">{step.title}</h3>
              <p className="text-[#a1a1aa] text-sm">{step.desc}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <a
            href="/go/flights"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#6366f1] text-white font-semibold rounded-full hover:bg-[#5558e3] transition-all"
          >
            <Plane className="w-4 h-4" />
            Search Flights Now
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}

// ==============================================
// FINAL CTA
// ==============================================
function FinalCTA() {
  return (
    <section className="py-16 bg-gradient-to-b from-[#12121a] to-[#0a0a0f]">
      <Container>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Don&apos;t Miss These Deals
          </h2>
          <p className="text-[#a1a1aa] mb-6">
            Prices go up at midnight. Book now and save up to 50% on your next adventure.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a
              href="/go/flights"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white font-bold rounded-full shadow-lg hover:scale-105 transition-all"
            >
              <Plane className="w-5 h-5" />
              Find Cheap Flights
            </a>
            <a
              href="/go/airhelp"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] font-semibold rounded-full hover:bg-[#22c55e]/20 transition-all"
            >
              💰 Get Flight Compensation
            </a>
          </div>

          <p className="text-sm text-[#71717a]">
            Trusted by 50,000+ travelers worldwide
          </p>
        </div>
      </Container>
    </section>
  );
}

// ==============================================
// FOOTER
// ==============================================
function Footer() {
  return (
    <footer className="py-6 bg-[#0a0a0f] border-t border-white/5">
      <Container>
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#71717a]">
          <div>&copy; 2026 ClickOrSkip. All rights reserved.</div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}

// ==============================================
// MAIN PAGE
// ==============================================
export default function Home() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Header />
      <Hero />
      <DealsSection />
      <HowItWorks />
      <FinalCTA />
      <Footer />
    </main>
  );
}

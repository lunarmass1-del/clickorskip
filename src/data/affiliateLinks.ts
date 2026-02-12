// ============================================
// CLOAKED AFFILIATE LINKS - ClickOrSkip
// ============================================
// All links redirect through clickorskip.online/go/...
// Actual redirects defined in public/_redirects
// ============================================

// Simple cloaked URLs - no tracking IDs needed
export const affiliateLinks = {
  flights: {
    getLink: () => '/go/flights',
  },
  airhelp: {
    getLink: () => '/go/airhelp',
  },
  cars: {
    getLink: () => '/go/cars',
  },
  transfers: {
    getLink: () => '/go/transfers',
  },
  tours: {
    getLink: () => '/go/tours',
  },
  hotels: {
    getLink: () => '/go/hotels',
  },
};

// ============================================
// CTA BUTTONS CONFIG - Ordered by Commission
// Optimized for maximum click-through rate
// ============================================

export const ctaConfig = [
  {
    id: 'flights',
    label: 'Find Cheap Flights',
    emoji: '✈️',
    icon: 'Plane',
    description: 'Compare 100+ airlines',
    urgency: 'Save up to 40%!',
    color: 'from-blue-500 via-blue-600 to-cyan-500',
    priority: 1,
    getLink: () => '/go/flights',
  },
  {
    id: 'cars',
    label: 'Rent a Car',
    emoji: '🚗',
    icon: 'Car',
    description: 'Local rentals, best prices',
    urgency: 'Last 3 at this price!',
    color: 'from-green-500 via-green-600 to-emerald-500',
    priority: 2,
    getLink: () => '/go/cars',
  },
  {
    id: 'tours',
    label: 'Tours & Activities',
    emoji: '🎯',
    icon: 'Ticket',
    description: 'Skip-the-line tickets',
    urgency: '89% sell out!',
    color: 'from-orange-500 via-orange-600 to-red-500',
    priority: 3,
    getLink: () => '/go/tours',
  },
  {
    id: 'transfers',
    label: 'Airport Transfer',
    emoji: '🚐',
    icon: 'Bus',
    description: 'Pre-book & relax',
    urgency: 'Limited spots!',
    color: 'from-purple-500 via-purple-600 to-pink-500',
    priority: 4,
    getLink: () => '/go/transfers',
  },
];

// AirHelp Upsell - HIGH CONVERTING!
// Enhanced copy for maximum conversions
export const airhelpConfig = {
  id: 'airhelp',
  label: 'Flight Delayed or Cancelled?',
  sublabel: 'Claim up to €600 - Takes 2 minutes!',
  description: "83% of travelers don't claim the compensation they're owed. In the last 3 years, you may have missed out on hundreds of euros. Check now - it's completely FREE and takes just 2 minutes!",
  emoji: '💰',
  icon: 'AlertCircle',
  urgency: 'FREE to check',
  ctaText: 'Check If I\'m Owed Money',
  color: 'from-amber-500 via-orange-500 to-red-500',
  getLink: () => '/go/airhelp',
};

// Secondary quick-action pills
export const secondaryCtaConfig = [
  {
    id: 'hotels',
    label: 'Hotels',
    emoji: '🏨',
    getLink: () => '/go/hotels',
  },
  {
    id: 'transfers-alt',
    label: 'Airport Pickup',
    emoji: '🚕',
    getLink: () => '/go/transfers',
  },
  {
    id: 'tours-alt',
    label: 'Attractions',
    emoji: '🎟️',
    getLink: () => '/go/tours',
  },
];

// Complete your trip sections
export const completeYourTripConfig = [
  {
    category: 'Getting There',
    items: [
      { id: 'flights', label: 'Search Flights', emoji: '✈️', badge: 'Best Deals', getLink: () => '/go/flights' },
    ],
  },
  {
    category: 'Getting Around',
    items: [
      { id: 'cars', label: 'Rent a Car', emoji: '🚗', badge: 'Popular', getLink: () => '/go/cars' },
      { id: 'transfers', label: 'Airport Transfer', emoji: '🚐', getLink: () => '/go/transfers' },
    ],
  },
  {
    category: 'Things to Do',
    items: [
      { id: 'tours', label: 'Tours & Activities', emoji: '🎯', badge: 'Top Rated', getLink: () => '/go/tours' },
    ],
  },
  {
    category: 'Flight Issues?',
    items: [
      { id: 'airhelp', label: 'Claim Compensation', emoji: '💰', badge: 'FREE Check', hot: true, getLink: () => '/go/airhelp' },
    ],
  },
];

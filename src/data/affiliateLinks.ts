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
// ============================================

export const ctaConfig = [
  {
    id: 'flights',
    label: 'Find Cheap Flights',
    emoji: '✈️',
    icon: 'Plane',
    description: 'Compare 100+ airlines',
    urgency: 'Prices dropping now!',
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
    urgency: 'Free cancellation',
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
    urgency: 'Selling fast!',
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
    urgency: 'From $25',
    color: 'from-purple-500 via-purple-600 to-pink-500',
    priority: 4,
    getLink: () => '/go/transfers',
  },
];

// AirHelp Upsell - HIGH CONVERTING!
export const airhelpConfig = {
  id: 'airhelp',
  label: 'Flight Delayed or Cancelled?',
  sublabel: 'Get up to €600 compensation',
  description: "83% of travelers don't know they can claim compensation for delayed flights. Check if you're owed money - it's FREE!",
  emoji: '💰',
  icon: 'AlertCircle',
  urgency: 'FREE to check',
  ctaText: 'Check My Flights',
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
